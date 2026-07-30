Add-Type -AssemblyName System.Drawing
Get-ChildItem 'BAB 1\*.png' | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    Write-Output "$($_.Name) -> $($img.Width) x $($img.Height)"
    $img.Dispose()
}
