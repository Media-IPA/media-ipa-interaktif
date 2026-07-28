$baseDir = "d:\MEDIA IPA"
$files = Get-ChildItem -Path $baseDir -Filter *.html -Recurse

$watermarkSnippet = @"
    <div style="position: fixed; bottom: 10px; right: 10px; background: rgba(0,0,0,0.6); color: white; padding: 6px 12px; border-radius: 8px; font-size: 11px; font-family: sans-serif; font-weight: bold; pointer-events: none; z-index: 9999; backdrop-filter: blur(4px); user-select: none;">
        &copy; MediaIpaByWardi2026
    </div>
</body>
"@

$count = 0
foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        
        # Check if watermark already exists to avoid duplicates
        if ($content -notmatch 'MediaIpaByWardi2026') {
            # Find </body> explicitly and replace it
            if ($content -match '</body>') {
                $content = $content -ireplace '</body>', $watermarkSnippet
                [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
                Write-Host "Watermark ditambahkan ke: $($file.Name)"
                $count++
            }
        }
    } catch {
        Write-Host "Error memproses $($file.Name): $_"
    }
}

Write-Host "`nSelesai! Berhasil menambahkan watermark ke $count file HTML."
