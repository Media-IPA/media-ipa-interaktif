# Script Otomatis Konversi PDF Kelas 9 ke Data JS (Offline Zero-CORS PPT)
Write-Host "Mencari semua file PDF di folder KELAS 9..."

$baseDir = "d:\MEDIA IPA\KELAS 9"
$pdfFiles = Get-ChildItem -Path $baseDir -Recurse -Filter "*.pdf"
$storeContent = "window.PDF_DATA_STORE = window.PDF_DATA_STORE || {};`n"

foreach ($file in $pdfFiles) {
    $rel = $file.FullName
    if ($rel.ToLower().StartsWith($baseDir.ToLower())) {
        $rel = $rel.Substring($baseDir.Length).TrimStart('\').Replace('\', '/')
    }
    $relativePath = "./$rel"
    Write-Host "Proses PDF key: '$relativePath' ($([math]::Round($file.Length / 1MB, 2)) MB)"
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $b64 = [System.Convert]::ToBase64String($bytes)
    $storeContent += "window.PDF_DATA_STORE['$relativePath'] = `"$b64`";`n"
}

$outFile = Join-Path $baseDir "pdf_data.js"
[System.IO.File]::WriteAllText($outFile, $storeContent, [System.Text.Encoding]::UTF8)
Write-Host "Selesai! File pdf_data.js berhasil dibuat untuk $($pdfFiles.Count) PDF."
