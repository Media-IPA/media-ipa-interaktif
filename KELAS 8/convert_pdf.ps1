$null = [System.Reflection.Assembly]::LoadWithPartialName("System.Runtime.WindowsRuntime")
[Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.Streams.DataReader, Windows.Storage.Streams, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.Streams.DataWriter, Windows.Storage.Streams, ContentType = WindowsRuntime] | Out-Null

$pdfPath = Join-Path (Get-Location) 'BAB 1\pertemuan3.pdf'
$outDir = Join-Path (Get-Location) 'image\BAB 1\TP3_slides'
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force }

$asTaskMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' } | Select-Object -First 1

function Await-Op ($asyncOp) {
    $genericMethod = $asTaskMethod.MakeGenericMethod($asyncOp.GetType().GetGenericArguments()[0])
    $task = $genericMethod.Invoke($null, @($asyncOp))
    $task.Wait()
    return $task.Result
}

function Await-Action ($asyncAction) {
    $actionMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction' } | Select-Object -First 1
    $task = $actionMethod.Invoke($null, @($asyncAction))
    $task.Wait()
}

$file = Await-Op ([Windows.Storage.StorageFile]::GetFileFromPathAsync($pdfPath))
$pdf = Await-Op ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($file))

Write-Output "Pages count: $($pdf.PageCount)"

for ($i = 0; $i -lt $pdf.PageCount; $i++) {
    $page = $pdf.GetPage($i)
    $stream = new-object Windows.Storage.Streams.InMemoryRandomAccessStream
    $opts = new-object Windows.Data.Pdf.PdfPageRenderOptions
    $opts.DestinationWidth = 1920
    
    Await-Action ($page.RenderToStreamAsync($stream, $opts))
    
    $outPath = Join-Path $outDir "slide_$($i+1).png"
    $outFile = Await-Op ([Windows.Storage.StorageFolder]::GetFolderFromPathAsync($outDir)).CreateFileAsync("slide_$($i+1).png", [Windows.Storage.CreationCollisionOption]::ReplaceExisting)
    $fileStream = Await-Op ($outFile.OpenAsync([Windows.Storage.FileAccessMode]::ReadWrite))
    
    $reader = new-object Windows.Storage.Streams.DataReader($stream.GetInputStreamAt(0))
    $null = Await-Op ($reader.LoadAsync($stream.Size))
    $bytes = new-object byte[] $stream.Size
    $reader.ReadBytes($bytes)
    
    $writer = new-object Windows.Storage.Streams.DataWriter($fileStream)
    $writer.WriteBytes($bytes)
    $null = Await-Op ($writer.StoreAsync())
    Await-Action ($fileStream.FlushAsync())
    
    $fileStream.Dispose()
    $stream.Dispose()
    Write-Output "Saved slide_$($i+1).png"
}
