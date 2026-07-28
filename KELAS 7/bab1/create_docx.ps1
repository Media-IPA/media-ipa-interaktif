$word = $null
try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $doc = $word.Documents.Add()
    $selection = $word.Selection

    # Document Title
    $selection.Font.Name = "Arial"
    $selection.Font.Size = 18
    $selection.Font.Bold = 1
    $selection.Font.Color = 0x006600 # Dark Green
    $selection.ParagraphFormat.Alignment = 1 # Center
    $selection.TypeText("KUNCI JAWABAN LKPD KONVERSI SATUAN`n")
    $selection.Font.Size = 14
    $selection.Font.Color = 0x555555
    $selection.TypeText("IPA KELAS 7 - BESARAN DAN PENGUKURAN`n`n")

    $selection.ParagraphFormat.Alignment = 0 # Left

    # Section A
    $selection.Font.Size = 14
    $selection.Font.Bold = 1
    $selection.Font.Color = 0x006600
    $selection.TypeText("A. Konversi Satuan Panjang`n")
    $selection.Font.Size = 11
    $selection.Font.Bold = 0
    $selection.Font.Color = 0x000000

    $soalA = @(
        "1. 5 km = 5.000 m",
        "2. 300 cm = 3 m",
        "3. 250 cm = 2 m dan 50 cm (atau 2,5 m)",
        "4. 4.000 m = 4 km",
        "5. 15 cm = 150 mm",
        "6. 7 km = 700.000 cm",
        "7. 850 cm = 8 m 50 cm (atau 8,5 m)",
        "8. 2 m + 150 cm = 200 cm + 150 cm = 350 cm",
        "9. 1.200 m = 1,2 km (atau 1 km 200 m)",
        "10. 250 mm = 25 cm"
    )
    foreach ($s in $soalA) {
        $selection.TypeText("   " + $s + "`n")
    }
    $selection.TypeText("`n")

    # Section B
    $selection.Font.Size = 14
    $selection.Font.Bold = 1
    $selection.Font.Color = 0x006600
    $selection.TypeText("B. Konversi Satuan Massa`n")
    $selection.Font.Size = 11
    $selection.Font.Bold = 0
    $selection.Font.Color = 0x000000

    $soalB = @(
        "1. 3 ton = 3.000 kg",
        "2. 2.500 g = 2 kg dan 500 g (atau 2,5 kg)",
        "3. 5 kuintal = 500 kg",
        "4. 2 kg = 2.000 g",
        "5. 4.000 mg = 4 g",
        "6. 7 kg = 7.000.000 mg",
        "7. 2 ton + 3 kuintal = 2.000 kg + 300 kg = 2.300 kg",
        "8. 2.300 kg = 2,3 ton (atau 2 ton 300 kg)",
        "9. 750 g memerlukan 250 g lagi untuk mencapai 1 kg",
        "10. 500 mg x 10 = 5.000 mg = 5 g"
    )
    foreach ($s in $soalB) {
        $selection.TypeText("   " + $s + "`n")
    }
    $selection.TypeText("`n")

    # Section C
    $selection.Font.Size = 14
    $selection.Font.Bold = 1
    $selection.Font.Color = 0x006600
    $selection.TypeText("C. Konversi Satuan Waktu`n")
    $selection.Font.Size = 11
    $selection.Font.Bold = 0
    $selection.Font.Color = 0x000000

    $soalC = @(
        "1. 3 hari = 72 jam",
        "2. 2 jam = 120 menit",
        "3. 5 menit = 300 sekon",
        "4. 7.200 sekon = 2 jam",
        "5. 90 menit = 1,5 jam (atau 1 jam 30 menit)",
        "6. 180 menit = 3 jam",
        "7. 2 hari + 5 jam = 48 jam + 5 jam = 53 jam",
        "8. 150 menit = 2 jam 30 menit (atau 2,5 jam)",
        "9. 300 sekon = 5 menit",
        "10. 10.800 sekon = 3 jam"
    )
    foreach ($s in $soalC) {
        $selection.TypeText("   " + $s + "`n")
    }

    $outPath = "d:\MEDIA IPA\KELAS 7\bab1\Kunci_Jawaban_LKPD_Konversi_Satuan_Kelas_7.docx"
    $wdFormatDocumentDefault = 16
    $doc.SaveAs([ref]$outPath, [ref]$wdFormatDocumentDefault)
    $doc.Close()
    Write-Host "DOCX_CREATED_SUCCESS: $outPath"
} catch {
    Write-Host "COM_ERROR: $_"
} finally {
    if ($word) {
        $word.Quit()
    }
}
