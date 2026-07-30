$pdfPath = Join-Path (Get-Location) 'BAB 1\pertemuan3.pdf'
$jsPath = Join-Path (Get-Location) 'BAB 1\pertemuan3_data.js'

Write-Output "Reading $pdfPath..."
$bytes = [System.IO.File]::ReadAllBytes($pdfPath)
$b64 = [System.Convert]::ToBase64String($bytes)

Write-Output "Writing base64 to $jsPath..."
$jsContent = "window.PERTEMUAN3_PDF_DATA = `"$b64`";"
[System.IO.File]::WriteAllText($jsPath, $jsContent, [System.Text.Encoding]::UTF8)

Write-Output "Done! Data file generated successfully."
