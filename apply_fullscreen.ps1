$baseDir = "d:\MEDIA IPA"
for ($i = 1; $i -le 7; $i++) {
    $indexPath = Join-Path $baseDir "bab$i\index.html"
    if (Test-Path $indexPath) {
        $content = Get-Content $indexPath -Raw -Encoding UTF8
        
        $btnHtml = '<button id="fullscreenBtn" class="nav-btn outline" title="Mode Layar Penuh" style="margin-right: 5px; text-decoration:none;"><i class="fa-solid fa-expand"></i></button>'
        
        if ($content -notmatch 'id="fullscreenBtn"') {
            $content = $content -replace '<div class="nav-links">\s*<a href="\.\./index\.html"', ('<div class="nav-links">' + "`r`n            " + $btnHtml + "`r`n            " + '<a href="../index.html"')
        }
        
        $scriptHtml = '<script src="../fullscreen.js"></script>' + "`r`n" + '</body>'
        if ($content -notmatch 'fullscreen\.js') {
            $content = $content -replace '</body>', $scriptHtml
        }
        
        [System.IO.File]::WriteAllText($indexPath, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated bab$i"
    }
}
Write-Host "Done."
