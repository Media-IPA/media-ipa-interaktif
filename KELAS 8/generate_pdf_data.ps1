# Script Otomatis Konversi Semua File PDF ke Data JS (Offline Zero-CORS)
Write-Output "Mencari semua file PDF di folder materi..."

$baseDir = Get-Location
$pdfFiles = Get-ChildItem -Path $baseDir -Recurse -Filter "*.pdf"
$storeContent = "window.PDF_DATA_STORE = window.PDF_DATA_STORE || {};`n"

foreach ($file in $pdfFiles) {
    $relativePath = $file.FullName.Replace("$baseDir\", "").Replace("\", "/")
    Write-Output "Proses PDF: $relativePath"
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $b64 = [System.Convert]::ToBase64String($bytes)
    $storeContent += "window.PDF_DATA_STORE['$relativePath'] = `"$b64`";`n"
}

$outFile = Join-Path $baseDir "pdf_data.js"
[System.IO.File]::WriteAllText($outFile, $storeContent, [System.Text.Encoding]::UTF8)
Write-Output "Selesai! File pdf_data.js berhasil dibuat untuk $($pdfFiles.Count) PDF."
