// 0. DATA SOAL TP1 UNTUK PAPAN TULIS INTERAKTIF
const TP1_QUESTIONS = [
    {
        id: 1, type: "pg", typeLabel: "PG",
        text: "Sel merupakan unit terkecil kehidupan. Sel adalah ...",
        options: ["A. Bagian terbesar organisme", "B. Unit struktural & fungsional terkecil makhluk hidup", "C. Kumpulan jaringan", "D. Zat kimia penyusun tubuh"],
        correct: 1
    },
    {
        id: 2, type: "isian", typeLabel: "Isian Singkat",
        text: "Robert Hooke menamai ruang-ruang kecil pada gabus dengan istilah 'sel', dari bahasa Latin 'cellula' yang artinya ....",
        correctAnswers: ["ruangan kecil", "kamar kecil", "ruang kecil", "cellula", "ruang-ruang kecil", "kamar-kamar kecil"]
    },
    {
        id: 3, type: "bs", typeLabel: "Benar / Salah",
        text: "Teori sel yang menyatakan semua makhluk hidup tersusun atas sel dikemukakan Schleiden & Schwann tahun 1839.",
        correct: "B"
    },
    {
        id: 4, type: "pg_kompleks", typeLabel: "PG Kompleks",
        text: "Ciri organisme uniseluler (pilih semua yang benar):",
        options: [
            { id: "A", text: "Tubuh tersusun atas 1 sel" },
            { id: "B", text: "Contoh: Amoeba & bakteri" },
            { id: "C", text: "Tubuh tersusun banyak sel yang bekerja sama" },
            { id: "D", text: "Seluruh aktivitas hidup dilakukan 1 sel" },
            { id: "E", text: "Contoh: manusia & hewan" }
        ],
        correct: ["A", "B", "D"]
    },
    {
        id: 5, type: "jodoh", typeLabel: "Menjodohkan",
        text: "Jodohkan tokoh dengan penemuannya:",
        leftItems: [
            { id: 1, label: "1. Robert Hooke" },
            { id: 2, label: "2. Leeuwenhoek" },
            { id: 3, label: "3. Schleiden & Schwann" },
            { id: 4, label: "4. Virchow" }
        ],
        rightItems: [
            { id: "a", label: "a. Sel berasal dari sel sebelumnya" },
            { id: "b", label: "b. Pertama mengamati & menamai sel" },
            { id: "c", label: "c. Mengamati organisme uniseluler hidup pertama" },
            { id: "d", label: "d. Teori sel: sel unit dasar kehidupan" }
        ],
        correct: { 1: "b", 2: "c", 3: "d", 4: "a" }
    },
    {
        id: 6, type: "pg", typeLabel: "PG",
        text: "Bagian sel yang mengatur keluar-masuknya zat adalah ...",
        options: ["A. Inti sel", "B. Sitoplasma", "C. Membran sel", "D. Dinding sel"],
        correct: 2
    },
    {
        id: 7, type: "bs", typeLabel: "Benar / Salah",
        text: "Leeuwenhoek pertama mengamati organisme hidup bersel satu dengan mikroskop buatannya sendiri.",
        correct: "B"
    },
    {
        id: 8, type: "isian", typeLabel: "Isian Singkat",
        text: "Ilmuwan yang menyatakan semua sel berasal dari sel sebelumnya adalah ....",
        correctAnswers: ["rudolf virchow", "virchow", "r. virchow"]
    },
    {
        id: 9, type: "pg", typeLabel: "PG",
        text: "Cairan tempat berlangsungnya reaksi kimia antara membran & inti sel disebut ...",
        options: ["A. Nukleus", "B. Sitoplasma", "C. Membran sel", "D. Vakuola"],
        correct: 1
    },
    {
        id: 10, type: "pg_kompleks", typeLabel: "PG Kompleks",
        text: "Tiga bagian utama sel meliputi (pilih semua yang benar):",
        options: [
            { id: "A", text: "Membran sel" },
            { id: "B", text: "Kloroplas" },
            { id: "C", text: "Sitoplasma" },
            { id: "D", text: "Inti sel" },
            { id: "E", text: "Ribosom" }
        ],
        correct: ["A", "C", "D"]
    },
    {
        id: 11, type: "bs", typeLabel: "Benar / Salah",
        text: "Manusia termasuk organisme multiseluler karena tersusun atas banyak sel.",
        correct: "B"
    },
    {
        id: 12, type: "pg", typeLabel: "PG",
        text: "Bagian sel yang mengatur aktivitas & menyimpan materi genetik adalah ...",
        options: ["A. Membran sel", "B. Sitoplasma", "C. Inti sel", "D. Dinding sel"],
        correct: 2
    },
    {
        id: 13, type: "isian", typeLabel: "Isian Singkat",
        text: "Teori sel Schleiden & Schwann dicetuskan pada tahun ....",
        correctAnswers: ["1839"]
    },
    {
        id: 14, type: "pg", typeLabel: "PG",
        text: "Contoh organisme uniseluler adalah ...",
        options: ["A. Kucing", "B. Amoeba", "C. Pohon mangga", "D. Ikan"],
        correct: 1
    },
    {
        id: 15, type: "pg_kompleks", typeLabel: "PG Kompleks",
        text: "Contoh organisme multiseluler (pilih semua yang benar):",
        options: [
            { id: "A", text: "Manusia" },
            { id: "B", text: "Bakteri" },
            { id: "C", text: "Kucing" },
            { id: "D", text: "Pohon mangga" },
            { id: "E", text: "Paramecium" }
        ],
        correct: ["A", "C", "D"]
    },
    {
        id: 16, type: "bs", typeLabel: "Benar / Salah",
        text: "Amoeba adalah contoh organisme multiseluler karena tersusun atas banyak sel.",
        correct: "S"
    },
    {
        id: 17, type: "pg", typeLabel: "PG",
        text: "Robert Hooke mengamati sel gabus menggunakan alat bernama ...",
        options: ["A. Teleskop", "B. Mikroskop", "C. Termometer", "D. Barometer"],
        correct: 1
    },
    {
        id: 18, type: "isian", typeLabel: "Isian Singkat",
        text: "Kata 'sel' berasal dari bahasa Latin 'cellula' yang artinya ....",
        correctAnswers: ["ruangan kecil", "kamar kecil", "ruang kecil", "cellula", "ruang-ruang kecil", "kamar-kamar kecil"]
    },
    {
        id: 19, type: "pg", typeLabel: "PG",
        text: "Robert Hooke mengamati struktur sel pada gabus pada tahun ...",
        options: ["A. 1665", "B. 1674", "C. 1839", "D. 1855"],
        correct: 0
    },
    {
        id: 20, type: "pg_kompleks", typeLabel: "PG Kompleks",
        text: "Pernyataan yang benar tentang sel (pilih semua yang benar):",
        options: [
            { id: "A", text: "Unit terkecil makhluk hidup" },
            { id: "B", text: "Semua makhluk hidup tersusun sel" },
            { id: "C", text: "Hanya dimiliki manusia" },
            { id: "D", text: "Dapat diamati dengan mikroskop" },
            { id: "E", text: "Tidak punya bagian penyusun" }
        ],
        correct: ["A", "B", "D"]
    },
    {
        id: 21, type: "bs", typeLabel: "Benar / Salah",
        text: "Sitoplasma adalah tempat berbagai organel sel melakukan aktivitasnya.",
        correct: "B"
    },
    {
        id: 22, type: "pg", typeLabel: "PG",
        text: "Perbedaan utama uniseluler & multiseluler terletak pada...",
        options: ["A. Warna tubuh", "B. Jumlah sel penyusun", "C. Tempat hidup", "D. Ukuran tubuh saja"],
        correct: 1
    },
    {
        id: 23, type: "isian", typeLabel: "Isian Singkat",
        text: "Prinsip 'omnis cellula e cellula' dikemukakan oleh ....",
        correctAnswers: ["rudolf virchow", "virchow", "r. virchow"]
    },
    {
        id: 24, type: "pg", typeLabel: "PG",
        text: "Bagian sel yang melindungi & membungkus seluruh isi sel adalah ...",
        options: ["A. Inti sel", "B. Membran sel", "C. Sitoplasma", "D. Nukleolus"],
        correct: 1
    },
    {
        id: 25, type: "pg_kompleks", typeLabel: "PG Kompleks",
        text: "Tokoh dalam sejarah penemuan sel (pilih semua yang benar):",
        options: [
            { id: "A", text: "Robert Hooke (1665)" },
            { id: "B", text: "Leeuwenhoek (1674)" },
            { id: "C", text: "Isaac Newton (1687)" },
            { id: "D", text: "Schleiden & Schwann (1839)" },
            { id: "E", text: "Virchow (1855)" }
        ],
        correct: ["A", "B", "D", "E"]
    }
];

// 1. DATA MATERI & KUIS PEMBELAJARAN
const CHAPTERS_DATA = {
    1: {
        title: "Pengenalan Sel",
        tag: "BAB 1",
        subject: "Biologi",
        themeColor: "var(--color-bio-sel)",
        badgeName: "Sitologi Master",
        badgeIcon: "🔬",
        meetings: [
            {
                id: 1,
                title: "Pertemuan 1",
                subtitle: "Konsep Sel & Struktur Dasar",
                desc: "Apersepsi, definisi sel, sejarah penemuan, bagian utama sel, dan LKPD TP.1 (Slide 1 - 5)",
                slides: [
                    {
                        title: "Apersepsi: Mengenal Sel",
                        content: ``,
                        visualType: "apersepsi-sel",
                        visualTitle: "Apersepsi — Mengenal Sel"
                    },
                    {
                        title: "1. Pengertian Sel",
                        content: `
                            <p>Sel adalah <strong>unit terkecil dari makhluk hidup</strong> yang mampu menjalankan fungsi kehidupan, seperti metabolisme, pertumbuhan, reproduksi, dan respons terhadap rangsangan.</p>
                            <div class="highlight-box" style="--slide-accent: var(--color-bio-sel)">
                                <span>Definisi Kunci</span>
                                <p>Sel = Unit struktural + Unit fungsional terkecil kehidupan. Setiap aktivitas kehidupan bermula dari sel!</p>
                            </div>
                            <ul>
                                <li>🦠 <strong>Uniseluler:</strong> Organisme yang hanya terdiri dari <em>satu sel</em>. Contoh: Bakteri, Amoeba.</li>
                                <li>🌿 <strong>Multiseluler:</strong> Organisme yang terdiri dari <em>banyak sel</em>. Contoh: Tumbuhan, Hewan, Manusia.</li>
                            </ul>
                        `,
                        visualType: "img-viewer",
                        imgSrc: "image/BAB 1/1.png",
                        imgCaption: "Konsep & Pengertian Sel (Gambar 1.1)",
                        visualTitle: "Sel: Unit Terkecil Kehidupan"
                    },
                    {
                        title: "2. Sejarah Penemuan Sel",
                        content: `
                            <p>Penemuan sel adalah perjalanan saintifik yang luar biasa, dimulai dari rasa ingin tahu para ilmuwan besar:</p>
                            <ol>
                                <li>🔬 <strong>Robert Hooke (1665):</strong> Orang pertama yang mengamati sel melalui mikroskop dan memberi istilah <em>"sel"</em> setelah melihat struktur pada gabus.</li>
                                <li>💧 <strong>Anton van Leeuwenhoek (1674):</strong> Mengamati organisme uniseluler hidup pertama kali menggunakan mikroskop sederhana buatannya.</li>
                                <li>📜 <strong>Schleiden & Schwann (1839):</strong> Menyatakan <em>Teori Sel</em> — semua makhluk hidup tersusun atas sel, dan sel adalah unit dasar kehidupan.</li>
                                <li>⚗️ <strong>Rudolf Virchow (1855):</strong> Menambahkan konsep bahwa semua sel berasal dari sel sebelumnya (<em>omnis cellula e cellula</em>).</li>
                            </ol>
                        `,
                        visualType: "img-viewer",
                        imgSrc: "image/BAB 1/2.png",
                        imgCaption: "Sejarah & Tokoh Penemu Sel (Gambar 1.2)",
                        visualTitle: "Garis Waktu Penemuan Sel"
                    },
                    {
                        title: "3. Bagian-Bagian Utama Sel",
                        content: `
                            <p>Secara umum, sel memiliki tiga bagian besar yang menjadi fondasi strukturnya:</p>
                            <ul>
                                <li>🧱 <strong>Membran Sel:</strong> Lapisan tipis yang mengelilingi sel. Fungsi: <em>Mengatur keluar-masuknya zat</em> ke dalam dan ke luar sel.</li>
                                <li>🌊 <strong>Sitoplasma:</strong> Cairan di dalam sel yang mengandung organel. Fungsi: <em>Tempat berlangsungnya reaksi kimia sel</em>.</li>
                                <li>🧬 <strong>Inti Sel (Nukleus):</strong> Berisi DNA dan dikelilingi membran inti. Fungsi: <em>Mengontrol aktivitas sel</em> dan menyimpan informasi genetik.</li>
                            </ul>
                            <div class="highlight-box" style="--slide-accent: var(--color-bio-sel)">
                                <span>Analogi Mudah</span>
                                <p>Bayangkan sel seperti sebuah kota: Membran sel = tembok kota, Sitoplasma = jalanan kota, Nukleus = istana pusat pemerintahan.</p>
                            </div>
                        `,
                        visualType: "img-viewer",
                        imgSrc: "image/BAB 1/3.png",
                        imgCaption: "Struktur & Bagian Utama Sel (Gambar 1.3)",
                        visualTitle: "Struktur Dasar Sel"
                    },
                    {
                        title: "4. Papan Tulis Interaktif: LKPD TP.1",
                        content: `
                            <p><strong>Panduan Pengerjaan:</strong></p>
                            <ol style="margin-left: 1.2rem; margin-bottom: 0.8rem;">
                                <li>Cetak atau unduh dokumen <strong>LKPD Manual TP.1 (PDF)</strong> terlebih dahulu.</li>
                                <li>Kerjakan soal-soal pada lembar LKPD manual secara mandiri atau berdiskusi dengan tim kelompok.</li>
                                <li>Salin dan masukkan jawaban kelompokmu pada <strong>Papan Tulis Interaktif</strong> di sebelah kiri!</li>
                            </ol>
                            <div class="pdf-download-card">
                                <div class="pdf-info">
                                    <i data-lucide="file-text" class="pdf-icon"></i>
                                    <div>
                                        <h4>Dokumen LKPD TP.1 (Konsep Sel)</h4>
                                        <p>Format PDF Siap Cetak • 25 Soal Evaluasi</p>
                                    </div>
                                </div>
                                <button id="btn-download-pdf-tp1" class="btn-pdf-download ripple">
                                    <i data-lucide="download"></i>
                                    <span>Buka / Unduh LKPD PDF</span>
                                </button>
                            </div>
                            <div class="highlight-box" style="--slide-accent: var(--color-bio-sel); margin-top: 0.8rem;">
                                <span>Fitur Papan Tulis Interaktif</span>
                                <ul style="margin-left: 1rem; margin-top: 0.4rem;">
                                    <li>🔒 <strong>Sistem Verifikasi:</strong> Jawaban yang benar akan otomatis <strong>TERKUNCI</strong>.</li>
                                    <li>⚠️ <strong>Umpan Balik Instan:</strong> Jawaban salah akan menampilkan notifikasi agar dapat diperbaiki.</li>
                                    <li>👥 <strong>Multi-Kelompok:</strong> Pengerjaan dibagi 2 kelompok dengan area scroll independen.</li>
                                </ul>
                            </div>
                        `,
                        visualType: "interactive-whiteboard-tp1",
                        visualTitle: "Papan Tulis Interaktif (Kelompok 1 & 2)"
                    }
                ]
            },
            {
                id: 2,
                title: "Pertemuan 2",
                subtitle: "PPT Interaktif & Kuis Kombinasi Sel",
                desc: "Tayangan slide PowerPoint TP 2.pptx dan Kuis Kolaborasi Kombinasi (Tabel & Gambar Organel Sel)",
                slides: [
                    {
                        title: "1. Presentasi PPT Interaktif — TP 2.pptx",
                        content: ``,
                        visualType: "ppt-player",
                        initialSlide: 0,
                        visualTitle: "PowerPoint Interaktif: TP 2.pptx (8 Slide)"
                    },
                    {
                        title: "2. Kuis Interaktif: Tabel & Memasangkan Gambar Organel Sel",
                        content: `
                            <p><strong>Panduan Kuis Kolaborasi & Evaluasi Sel:</strong></p>
                            <ol style="margin-left: 1.2rem; margin-bottom: 0.8rem;">
                                <li>Slide ini menggabungkan <strong>Kuis 1 (Tabel Perbandingan)</strong> dan <strong>Kuis 2 (Memasangkan Gambar Organel)</strong>.</li>
                                <li>Kelompok 1 & Kelompok 2 dapat berganti antara Kuis Tabel dan Kuis Gambar secara mandiri pada area kelompok masing-masing tanpa harus menunggu kelompok lain selesai.</li>
                                <li><strong>Skor Maksimal:</strong> Total 52 Poin per kelompok (36 Poin Kuis Tabel + 16 Poin Kuis Gambar).</li>
                                <li>Klik <code>Periksa G1</code> / <code>Periksa G2</code> untuk menguji hasil pengerjaan kelompokmu!</li>
                            </ol>
                            <div class="highlight-box" style="--slide-accent: var(--color-bio-sel)">
                                <span>Sistem Kuis Mandiri Dual Group</span>
                                <p>Gunakan tab <strong>📊 Kuis 1 (Tabel)</strong> & <strong>🖼️ Kuis 2 (Gambar)</strong> pada kolom kelompokmu untuk berpindah kuis kapan saja!</p>
                            </div>
                        `,
                        visualType: "cell-combined-quiz",
                        visualTitle: "Kuis Kolaborasi: Tabel & Memasangkan Gambar Organel Sel (Kelompok 1 & 2)"
                    }
                ]
            },
            {
                id: 3,
                title: "Pertemuan 3",
                subtitle: "Presentasi PDF Interaktif & TTS Spesialisasi Sel",
                desc: "Tayangan slide PDF pertemuan3.pdf (8 Slide) & Teka-Teki Silang (TTS) Spesialisasi Sel (Kelompok 1 & 2)",
                slides: [
                    {
                        title: "1. Presentasi Slide PDF Interaktif — pertemuan3.pdf",
                        content: ``,
                        visualType: "pdf-player",
                        pdfUrl: "BAB 1/pertemuan3.pdf",
                        initialSlide: 0,
                        visualTitle: "Presentasi PDF Interaktif: pertemuan3.pdf (8 Slide)"
                    },
                    {
                        title: "2. Teka-Teki Silang Interaktif: Spesialisasi Sel (Kelompok 1 & 2)",
                        content: `
                            <p><strong>Panduan Teka-Teki Silang (TTS) Spesialisasi Sel:</strong></p>
                            <ol style="margin-left: 1.2rem; margin-bottom: 0.8rem;">
                                <li><strong>Pembagian 2 Kelompok:</strong> Kelas dibagi menjadi Kelompok 1 dan Kelompok 2. Setiap kelompok mendapat papan TTS mandiri dengan susunan 10 soal berbeda (Total 20 Soal).</li>
                                <li><strong>Sumber Materi:</strong> Semua jawaban mengacu pada Buku Siswa IPA Kelas VIII Halaman 17–21 (Uniseluler, Multiseluler, Organisme, Spesialisasi Sel Tumbuhan & Hewan).</li>
                                <li><strong>Cara Mengerjakan:</strong> Ketik huruf pada kotak TTS di panel sebelah kiri. Gunakan tombol <em>Periksa Jawaban</em> untuk mengecek kebenaran. Kotak hijau berarti BENAR, merah berarti SALAH.</li>
                            </ol>
                            <div class="highlight-box" style="--slide-accent: var(--color-bio-sel)">
                                <span>Tantangan Kolaborasi Dual Group</span>
                                <p>Kerjakan papan TTS kelompokmu pada panel interaktif sebelah kiri dan berlombalah menyelesaikan 10 soal!</p>
                            </div>
                        `,
                        visualType: "tts-cell-specialization",
                        visualTitle: "Teka-Teki Silang Interaktif: Spesialisasi Sel (2 Kelompok)"
                    }
                ]
            },
            {
                id: 4,
                title: "Pertemuan 4",
                subtitle: "Belum Ada Materi",
                desc: "Materi untuk Pertemuan 4 masih kosong.",
                slides: []
            }
        ],
        quiz: [
            {
                question: "Siapakah ilmuwan pertama yang mengamati sel dan memberi nama 'sel' pada tahun 1665?",
                options: ["Anton van Leeuwenhoek", "Rudolf Virchow", "Robert Hooke", "Matthias Schleiden"],
                answer: 2,
                explanation: "Robert Hooke (1665) adalah orang pertama yang mengamati sel melalui mikroskop pada irisan gabus dan memberi istilah 'sel' karena mirip kamar biarawan (cellula)."
            },
            {
                question: "Proses pergerakan zat dari konsentrasi tinggi ke konsentrasi rendah TANPA memerlukan energi disebut...",
                options: ["Transport aktif", "Osmosis", "Difusi", "Endositosis"],
                answer: 2,
                explanation: "Difusi adalah pergerakan molekul dari konsentrasi tinggi ke rendah secara spontan tanpa memerlukan energi (ATP). Contohnya masuknya O₂ ke dalam sel."
            },
            {
                question: "Organel manakah yang HANYA dimiliki oleh sel tumbuhan dan berfungsi untuk fotosintesis?",
                options: ["Mitokondria", "Kloroplas", "Ribosom", "Lisosom"],
                answer: 1,
                explanation: "Kloroplas adalah organel khusus sel tumbuhan yang mengandung klorofil untuk menyerap cahaya matahari dan melakukan fotosintesis."
            },
            {
                question: "Urutan tingkat organisasi kehidupan dari yang terkecil ke terbesar yang BENAR adalah...",
                options: ["Organ → Jaringan → Sel → Organisme", "Sel → Jaringan → Organ → Sistem Organ → Organisme", "Jaringan → Sel → Organ → Organisme", "Sel → Organ → Jaringan → Organisme"],
                answer: 1,
                explanation: "Urutan yang benar: Sel → Jaringan → Organ → Sistem Organ → Organisme. Sel-sel yang serupa membentuk jaringan, jaringan membentuk organ, dan seterusnya."
            },
            {
                question: "Apa produk utama yang dihasilkan dari proses RESPIRASI SELULER di dalam sel?",
                options: ["Glukosa dan Oksigen", "Karbon dioksida saja", "Energi (ATP), CO₂, dan H₂O", "Klorofil dan ATP"],
                answer: 2,
                explanation: "Respirasi seluler memecah glukosa + O₂ untuk menghasilkan Energi (ATP) + CO₂ + H₂O. Rumus: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP."
            }
        ]
    },
    2: {
        title: "Struktur dan Fungsi Tubuh Makhluk Hidup",
        tag: "BAB 2",
        subject: "Biologi",
        themeColor: "var(--color-bio-tubuh)",
        badgeName: "Fisiologi Anatomis",
        badgeIcon: "🫁",
        slides: [
            {
                title: "Makanan, Zat Gizi & Pencernaan",
                content: `
                    <p>Tubuh kita memerlukan nutrisi untuk pertumbuhan, energi, dan perbaikan sel. Zat makanan tersebut meliputi karbohidrat, protein, lemak, vitamin, mineral, dan air.</p>
                    <p><strong>Sistem Pencernaan Manusia:</strong></p>
                    <ul>
                        <li><strong>Mekanik:</strong> Penghancuran makanan oleh gigi di rongga mulut.</li>
                        <li><strong>Kimiawi:</strong> Pemecahan senyawa kompleks menjadi zat sederhana dibantu oleh <em>enzim pencernaan</em> (seperti amilase, pepsin, lipase).</li>
                    </ul>
                `,
                visualType: "info-digestive",
                visualTitle: "Sistem Pencernaan Manusia"
            },
            {
                title: "Sistem Organ Utama Tubuh",
                content: `
                    <p>Kehidupan manusia ditopang oleh koordinasi sistem organ yang kompleks:</p>
                    <ul>
                        <li><strong>Sistem Pernapasan:</strong> Memasukkan oksigen (O₂) dan mengeluarkan karbon dioksida (CO₂) melalui Hidung → Tenggorokan → Paru-paru (Alveolus).</li>
                        <li><strong>Sistem Peredaran Darah:</strong> Memompa darah kaya oksigen dan nutrisi ke seluruh tubuh via Jantung, Pembuluh Darah, dan Sel Darah.</li>
                        <li><strong>Sistem Ekskresi:</strong> Pembuangan sisa metabolisme yang beracun via Ginjal (urin), Kulit (keringat), Paru-paru (CO₂), Hati (cairan empedu).</li>
                    </ul>
                    <div class="highlight-box" style="--slide-accent: var(--color-bio-tubuh)">
                        <span>Interaksi Visual</span>
                        <p>Klik penanda berkedip di panel visual sebelah kiri untuk mengetahui fungsi dari masing-masing organ vital tubuh kita!</p>
                    </div>
                `,
                visualType: "sim-organ",
                visualTitle: "Pemetaan Sistem Organ Vital"
            },
            {
                title: "Gangguan pada Sistem Tubuh",
                content: `
                    <p>Kelalaian dalam menjaga pola hidup sehat dapat menyebabkan kelainan pada tubuh:</p>
                    <ol>
                        <li><strong>Pencernaan:</strong> Maag (peradangan lambung akibat asam berlebih), Konstipasi (kurang serat).</li>
                        <li><strong>Pernapasan:</strong> Asma (penyempitan saluran napas), Tuberkulosis (infeksi bakteri TBC).</li>
                        <li><strong>Ekskresi:</strong> Gagal Ginjal (kerusakan nefron), Batu Ginjal (kristalisasi kalsium).</li>
                    </ol>
                `,
                visualType: "info-disease",
                visualTitle: "Analisis Kelainan Medis"
            },
            {
                title: "Saatnya Menguji Pemahaman!",
                content: `
                    <p>Mari ukur pemahamanmu mengenai sistem organ tubuh manusia.</p>
                    <p>Selesaikan kuis 3 nomor berikut dengan teliti untuk memvalidasi pengetahuanmu tentang pencernaan, peredaran darah, dan ekskresi.</p>
                    <div class="highlight-box" style="--slide-accent: var(--color-bio-tubuh)">
                        <span>Badge Menantimu</span>
                        <p>Dapatkan skor sempurna untuk membuka badge <strong>"Fisiologi Anatomis" 🫁</strong>!</p>
                    </div>
                `,
                visualType: "quiz-start",
                visualTitle: "Kuis Evaluasi Bab 2"
            }
        ],
        quiz: [
            {
                question: "Manakah enzim di rongga mulut yang berfungsi mengubah amilum menjadi maltosa?",
                options: ["Pepsin", "Amilase (Ptialin)", "Lipase", "Tripsin"],
                answer: 1,
                explanation: "Enzim amilase (ptialin) dihasilkan oleh kelenjar ludah dan memecah karbohidrat (amilum) menjadi gula sederhana di rongga mulut."
            },
            {
                question: "Bagian paru-paru manakah yang berfungsi sebagai tempat pertukaran oksigen dan karbon dioksida?",
                options: ["Bronkus", "Trakea", "Alveolus", "Pleura"],
                answer: 2,
                explanation: "Alveolus adalah kantung udara kecil di ujung bronkiolus yang dikelilingi kapiler darah, tempat difusi gas O2 dan CO2 berlangsung."
            },
            {
                question: "Organ ekskresi manakah yang berfungsi untuk menyaring darah dan menghasilkan urin?",
                options: ["Hati", "Ginjal", "Paru-paru", "Kulit"],
                answer: 1,
                explanation: "Ginjal berfungsi sebagai organ penyaring darah utama untuk membuang urea, air berlebih, dan garam dalam bentuk urin."
            }
        ]
    },
    3: {
        title: "Usaha, Energi dan Pesawat Sederhana",
        tag: "BAB 3",
        subject: "Fisika",
        themeColor: "var(--color-phys-energi)",
        badgeName: "Mekanika Terapan",
        badgeIcon: "⚙️",
        slides: [
            {
                title: "Konsep Usaha dan Energi",
                content: `
                    <p>Dalam sains, <strong>Usaha ($W$)</strong> didefinisikan sebagai perkalian gaya yang searah perpindahan dengan jarak perpindahannya.</p>
                    <div class="highlight-box" style="--slide-accent: var(--color-phys-energi)">
                        <span>Rumus Fisika</span>
                        \\[W = F \\times s\\]
                        <p style="font-size:0.8rem; margin-top:0.5rem;">$W$ = Usaha (Joule), $F$ = Gaya (Newton), $s$ = Perpindahan (Meter)</p>
                    </div>
                    <p>Usaha hanya terjadi jika gaya menyebabkan benda <strong>berpindah tempat</strong>. Jika kamu mendorong dinding sekuat tenaga tetapi dinding tetap diam, secara fisika usahamu bernilai <strong>nol</strong>.</p>
                `,
                visualType: "info-physics-intro",
                visualTitle: "Visualisasi Gaya & Perpindahan"
            },
            {
                title: "Pesawat Sederhana: Jenis & Manfaat",
                content: `
                    <p>Pesawat sederhana adalah alat bantu mekanik yang memudahkan usaha manusia dengan cara mengubah arah atau besar gaya.</p>
                    <ul>
                        <li><strong>Tuas / Pengungkit:</strong> Terdiri atas titik tumpu, titik beban, dan titik kuasa.</li>
                        <li><strong>Bidang Miring:</strong> Memperkecil gaya kuasa dengan memperpanjang lintasan miring ($s$).</li>
                        <li><strong>Katrol:</strong> Mengubah arah gaya (katrol tetap) atau melipatgandakan gaya (katrol bebas).</li>
                        <li><strong>Roda Berporos:</strong> Mempercepat kecepatan gerak (contoh: sepeda, gir).</li>
                    </ul>
                `,
                visualType: "info-simple-machines",
                visualTitle: "Klasifikasi Pesawat Sederhana"
            },
            {
                title: "Simulasi Interaktif Pengungkit (Tuas)",
                content: `
                    <p>Keuntungan mekanis ($KM$) pengungkit ditentukan oleh rasio panjang lengan kuasa ($L_k$) dibanding lengan beban ($L_b$).</p>
                    <div class="highlight-box" style="--slide-accent: var(--color-phys-energi)">
                        <span>Persamaan Tuas</span>
                        \\[W \\times L_b = F \\times L_k\\]
                        <p style="font-size:0.8rem; margin-top:0.5rem;">$W$ = Berat beban, $F$ = Gaya Kuasa, $L_b$ = Lengan Beban, $L_k$ = Lengan Kuasa</p>
                    </div>
                    <p><strong>Eksperimen:</strong> Geser slider lengan beban dan lengan kuasa di panel kiri untuk melihat perubahan gaya kuasa yang diperlukan!</p>
                `,
                visualType: "sim-lever",
                visualTitle: "Eksperimen Interaktif Hukum Tuas"
            },
            {
                title: "Tes Kemampuan Mekanikamu!",
                content: `
                    <p>Sudah siap menguji pemahaman fisikamu?</p>
                    <p>Kuis ini terdiri dari soal-soal hitungan sederhana mengenai rumus usaha dan keuntungan mekanis pesawat sederhana.</p>
                    <div class="highlight-box" style="--slide-accent: var(--color-phys-energi)">
                        <span>Piala Penghargaan</span>
                        <p>Jawab semua soal dengan tepat untuk merebut badge kehormatan <strong>"Mekanika Terapan" ⚙️</strong>!</p>
                    </div>
                `,
                visualType: "quiz-start",
                visualTitle: "Kuis Evaluasi Bab 3"
            }
        ],
        quiz: [
            {
                question: "Sebuah balok ditarik dengan gaya 20 N sehingga berpindah sejauh 5 meter. Berapa usaha yang dilakukan pada balok?",
                options: ["4 Joule", "25 Joule", "100 Joule", "15 Joule"],
                answer: 2,
                explanation: "W = F * s = 20 N * 5 m = 100 Joule."
            },
            {
                question: "Pesawat sederhana jenis apakah yang memanfaatkan prinsip memperpanjang lintasan miring untuk memperkecil gaya?",
                options: ["Katrol Tetap", "Roda Berporos", "Bidang Miring", "Pengungkit Jenis I"],
                answer: 2,
                explanation: "Bidang miring mengurangi gaya yang dibutuhkan untuk mengangkat benda dengan cara mendistribusikan beban sepanjang lintasan miring."
            },
            {
                question: "Pada pengungkit, jika lengan kuasa (Lk) lebih panjang dari lengan beban (Lb), maka gaya kuasa yang diperlukan akan...",
                options: ["Lebih besar dari beban", "Lebih kecil dari beban", "Sama dengan berat beban", "Nol"],
                answer: 1,
                explanation: "Jika Lk > Lb, maka Keuntungan Mekanis > 1, sehingga Gaya Kuasa (F) yang diperlukan menjadi lebih kecil daripada berat beban (W)."
            }
        ]
    },
    4: {
        title: "Getaran, Gelombang dan Cahaya",
        tag: "BAB 4",
        subject: "Fisika",
        themeColor: "var(--color-phys-gelombang)",
        badgeName: "Wave Navigator",
        badgeIcon: "🌊",
        slides: [
            {
                title: "Getaran & Parameter Dasarnya",
                content: `
                    <p><strong>Getaran</strong> adalah gerakan bolak-balik secara periodik (teratur) melalui titik kesetimbangan. Contoh klasik getaran adalah ayunan bandul jam dinding.</p>
                    <ul>
                        <li><strong>Amplitudo ($A$):</strong> Simpangan terjauh dari titik kesetimbangan.</li>
                        <li><strong>Frekuensi ($f$):</strong> Jumlah getaran yang terjadi dalam satu detik (Hertz/Hz).</li>
                        <li><strong>Periode ($T$):</strong> Waktu yang diperlukan untuk melakukan satu getaran penuh.</li>
                    </ul>
                    <div class="highlight-box" style="--slide-accent: var(--color-phys-gelombang)">
                        <span>Hubungan Frekuensi & Periode</span>
                        \\[f = \\frac{1}{T} \\quad \\text{atau} \\quad T = \\frac{1}{f}\\]
                    </div>
                `,
                visualType: "info-vibration",
                visualTitle: "Getaran Bandul Periodik"
            },
            {
                title: "Gelombang Transversal & Longitudinal",
                content: `
                    <p><strong>Gelombang</strong> adalah getaran yang merambat membawa energi tanpa memindahkan medium perantaranya.</p>
                    <ol>
                        <li><strong>Gelombang Transversal:</strong> Arah rambat tegak lurus arah getar (contoh: gelombang air, tali, cahaya). Memiliki bukit dan lembah.</li>
                        <li><strong>Gelombang Longitudinal:</strong> Arah rambat sejajar arah getar (contoh: gelombang suara, slinki). Memiliki rapatan dan renggangan.</li>
                    </ol>
                    <p><strong>Instruksi Visual:</strong> Sesuaikan amplitudo dan frekuensi gelombang sinus pada simulator di panel kiri!</p>
                `,
                visualType: "sim-wave",
                visualTitle: "Simulator Gelombang Dinamis"
            },
            {
                title: "Cahaya, Pembiasan, dan Alat Optik",
                content: `
                    <p>Cahaya adalah gelombang elektromagnetik transversal yang dapat merambat tanpa medium (ruang hampa).</p>
                    <p><strong>Sifat Cahaya:</strong> Merambat lurus, menembus benda bening, dapat dipantulkan (refleksi), dan dapat dibiaskan (refraksi).</p>
                    <div class="highlight-box" style="--slide-accent: var(--color-phys-gelombang)">
                        <span>Hukum Pembiasan Snellius</span>
                        <p>Cahaya yang merambat dari medium kurang rapat ke medium lebih rapat (misalnya dari udara ke air) akan dibiaskan mendekati garis normal.</p>
                    </div>
                `,
                visualType: "info-light",
                visualTitle: "Fenomena Pembiasan Cahaya"
            },
            {
                title: "Uji Kompetensi Gelombang & Cahaya",
                content: `
                    <p>Mari uji pengetahuan fisikamu mengenai teori getaran, jenis-jenis gelombang, serta sifat optik cahaya.</p>
                    <p>Selesaikan 3 nomor soal kuis interaktif berikut untuk memastikan pemahaman teoritis dan analitismu.</p>
                    <div class="highlight-box" style="--slide-accent: var(--color-phys-gelombang)">
                        <span>Gelar Kelulusan</span>
                        <p>Sukses menjawab benar semua soal akan menganugerahkan badge <strong>"Wave Navigator" 🌊</strong>!</p>
                    </div>
                `,
                visualType: "quiz-start",
                visualTitle: "Kuis Evaluasi Bab 4"
            }
        ],
        quiz: [
            {
                question: "Jika sebuah bandul melakukan 40 getaran dalam waktu 10 detik, berapakah frekuensi getaran tersebut?",
                options: ["0.25 Hz", "4 Hz", "400 Hz", "40 Hz"],
                answer: 1,
                explanation: "Frekuensi (f) = Jumlah Getaran (n) / Waktu (t) = 40 / 10 = 4 Hz."
            },
            {
                question: "Manakah contoh gelombang longitudinal dalam kehidupan sehari-hari?",
                options: ["Gelombang cahaya matahari", "Gelombang bunyi di udara", "Gelombang pada tali jemuran", "Gelombang air laut"],
                answer: 1,
                explanation: "Bunyi adalah gelombang longitudinal yang merambat melalui kompresi (rapatan) dan ekspansi (renggangan) partikel udara."
            },
            {
                question: "Peristiwa pensil terlihat patah saat dimasukkan ke dalam gelas berisi air adalah bukti sifat cahaya yaitu...",
                options: ["Pemantulan", "Merambat Lurus", "Pembiasan", "Pemisahan (Dispersi)"],
                answer: 2,
                explanation: "Perbedaan kerapatan optik udara dan air membelokkan jalannya cahaya (pembiasan), sehingga pensil tampak patah."
            }
        ]
    },
    5: {
        title: "Unsur, Senyawa dan Campuran",
        tag: "BAB 5",
        subject: "Kimia",
        themeColor: "var(--color-chem-materi)",
        badgeName: "Ahli Alkimia Modern",
        badgeIcon: "🧪",
        slides: [
            {
                title: "Klasifikasi Materi",
                content: `
                    <p>Semua benda di alam semesta yang menempati ruang dan memiliki massa disebut <strong>materi</strong>. Berdasarkan komposisinya, materi dibagi menjadi:</p>
                    <ul>
                        <li><strong>Zat Tunggal:</strong> Zat murni yang terdiri dari satu jenis materi.
                            <ul>
                                <li><strong>Unsur:</strong> Zat tunggal terkecil yang tidak dapat dibagi lagi secara kimia biasa (contoh: Emas (Au), Oksigen (O), Hidrogen (H)).</li>
                                <li><strong>Senyawa:</strong> Gabungan dua atau lebih unsur kimia yang berbeda melalui ikatan kimia dengan perbandingan tetap (contoh: Air (H₂O), Karbondioksida (CO₂)).</li>
                            </ul>
                        </li>
                    </ul>
                `,
                visualType: "info-chemistry-intro",
                visualTitle: "Bagan Klasifikasi Materi Zat"
            },
            {
                title: "Perbedaan Senyawa & Campuran",
                content: `
                    <p>Meskipun sama-sama gabungan zat, keduanya memiliki sifat yang bertolak belakang:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Karakteristik</th>
                                <th>Senyawa</th>
                                <th>Campuran</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pembentukan</td>
                                <td>Reaksi Kimia</td>
                                <td>Fisika Biasa</td>
                            </tr>
                            <tr>
                                <td>Sifat Asal Zat</td>
                                <td>Hilang/Berubah</td>
                                <td>Tetap Ada</td>
                            </tr>
                            <tr>
                                <td>Pemisahan</td>
                                <td>Kimiawi saja</td>
                                <td>Fisik (Penyaringan)</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="highlight-box" style="--slide-accent: var(--color-chem-materi)">
                        <span>Visualizer Molekul</span>
                        <p>Pilih senyawa kimia di panel visual kiri untuk memvisualisasikan bagaimana atom berikatan membentuk molekul senyawa!</p>
                    </div>
                `,
                visualType: "sim-chemistry",
                visualTitle: "Pemodelan Molekul Senyawa"
            },
            {
                title: "Campuran Homogen & Heterogen",
                content: `
                    <p>Campuran dibedakan berdasarkan kemudahan partikel penyusunnya menyatu:</p>
                    <ol>
                        <li><strong>Campuran Homogen (Larutan):</strong> Campuran yang serba sama di setiap bagiannya, zat pelarut dan terlarut tidak dapat dibedakan lagi secara kasat mata (contoh: Larutan gula, udara, kuningan).</li>
                        <li><strong>Campuran Heterogen:</strong> Campuran yang zat penyusunnya masih dapat dibedakan dengan jelas karena tidak menyatu sempurna (contoh: Air kopi, campuran minyak dan air, air pasir).</li>
                    </ol>
                `,
                visualType: "info-mixtures",
                visualTitle: "Klasifikasi Campuran"
            },
            {
                title: "Uji Keahlian Kimia Kimu!",
                content: `
                    <p>Apakah kamu sudah menguasai klasifikasi materi atom, unsur, senyawa dan jenis campuran?</p>
                    <p>Uji pemahaman teoritis kimiamu melalui 3 pertanyaan kuis seru berikut.</p>
                    <div class="highlight-box" style="--slide-accent: var(--color-chem-materi)">
                        <span>Tantangan Emas</span>
                        <p>Kumpulkan poin sempurna dan dapatkan lencana <strong>"Ahli Alkimia Modern" 🧪</strong>!</p>
                    </div>
                `,
                visualType: "quiz-start",
                visualTitle: "Kuis Evaluasi Bab 5"
            }
        ],
        quiz: [
            {
                question: "Zat tunggal yang secara kimia biasa tidak dapat diuraikan lagi menjadi zat lain yang lebih sederhana disebut...",
                options: ["Campuran", "Unsur", "Senyawa", "Larutan"],
                answer: 1,
                explanation: "Unsur adalah zat tunggal murni yang merupakan bahan dasar penyusun materi dan tidak bisa disederhanakan lagi secara kimia."
            },
            {
                question: "Manakah di bawah ini yang dikategorikan sebagai zat senyawa kimia?",
                options: ["Emas murni (Au)", "Garam dapur (NaCl)", "Air kopi", "Udara bersih"],
                answer: 1,
                explanation: "Garam dapur (Natrium Klorida / NaCl) dibentuk dari penggabungan unsur Natrium dan Klorin melalui ikatan kimia kimiawi."
            },
            {
                question: "Campuran homogen yang zat terlarutnya tidak dapat dibedakan lagi dengan pelarutnya disebut...",
                options: ["Suspensi", "Koloid", "Larutan", "Campuran Kasar"],
                answer: 2,
                explanation: "Larutan adalah campuran homogen sempurna antara zat terlarut dan pelarut sehingga tampak menyatu secara seragam."
            }
        ]
    },
    6: {
        title: "Struktur Bumi dan Perkembangannya",
        tag: "BAB 6",
        subject: "Geologi",
        themeColor: "var(--color-earth-bumi)",
        badgeName: "Geofisikawan Handal",
        badgeIcon: "🌋",
        slides: [
            {
                title: "Lapisan Utama Bumi",
                content: `
                    <p>Bumi kita tidak padat merata, melainkan berlapis-lapis mirip bawang bombai dengan karakteristik berbeda:</p>
                    <ol>
                        <li><strong>Kerak Bumi (Crust):</strong> Lapisan terluar tempat kita hidup. Sangat tipis (5-70 km). Terdiri dari lempeng samudera & benua.</li>
                        <li><strong>Mantel Bumi (Mantle):</strong> Lapisan terbesar (tebal &plusmn; 2.900 km). Berisi batuan semi-cair panas bersuhu tinggi.</li>
                        <li><strong>Inti Luar (Outer Core):</strong> Lapisan cair tebal terdiri dari besi & nikel cair, bersuhu mencapai 4.000&deg;C.</li>
                        <li><strong>Inti Dalam (Inner Core):</strong> Bola logam padat akibat tekanan sangat tinggi, suhunya menyamai permukaan matahari (5.400&deg;C).</li>
                    </ol>
                `,
                visualType: "sim-earth",
                visualTitle: "Penampang Lapisan Bumi"
            },
            {
                title: "Lempeng Tektonik & Pergeserannya",
                content: `
                    <p>Kerak bumi terpecah menjadi lempeng-lempeng tektonik yang selalu bergerak lambat akibat arus konveksi di bawah mantel bumi.</p>
                    <p><strong>Jenis Batas Lempeng:</strong></p>
                    <ul>
                        <li><strong>Konvergen:</strong> Dua lempeng saling bertumbukan (menyebabkan terbentuknya gunung api & palung laut).</li>
                        <li><strong>Divergen:</strong> Dua lempeng saling menjauh (menyebabkan magma naik dan membentuk lantai samudera baru).</li>
                        <li><strong>Transform (Sesar):</strong> Lempeng bergeseran secara sejajar (menyebabkan gempa bumi kuat tanpa magma).</li>
                    </ul>
                `,
                visualType: "info-tectonics",
                visualTitle: "Pergerakan Lempeng Litosfer"
            },
            {
                title: "Gempa Bumi & Mitigasi Bencana",
                content: `
                    <p>Indonesia berada di zona <em>Ring of Fire</em> (Cincin Api Pasifik), pertemuan 3 lempeng tektonik aktif utama dunia (Indo-Australia, Eurasia, Pasifik).</p>
                    <div class="highlight-box" style="--slide-accent: var(--color-earth-bumi)">
                        <span>Mitigasi Gempa Bumi</span>
                        <p>1. <strong>Saat Gempa:</strong> Lindungi kepala di bawah meja kokoh, jauhi kaca dan benda gantung.</p>
                        <p>2. <strong>Sesudah Gempa:</strong> Evakuasi ke titik kumpul terbuka, waspadai potensi tsunami jika tinggal di pesisir pantai.</p>
                    </div>
                `,
                visualType: "info-earthquake",
                visualTitle: "Cincin Api Pasifik & Gempa"
            },
            {
                title: "Uji Pemahaman Kebumianmu!",
                content: `
                    <p>Selamat! Kamu telah mencapai bab terakhir pembelajaran.</p>
                    <p>Mari tuntaskan petualangan belajarmu dengan menjawab 3 kuis terakhir tentang geologi bumi.</p>
                    <div class="highlight-box" style="--slide-accent: var(--color-earth-bumi)">
                        <span>Lencana Terakhir</span>
                        <p>Dapatkan nilai sempurna untuk meraih badge pamungkas <strong>"Geofisikawan Handal" 🌋</strong>!</p>
                    </div>
                `,
                visualType: "quiz-start",
                visualTitle: "Kuis Evaluasi Bab 6"
            }
        ],
        quiz: [
            {
                question: "Lapisan bumi yang wujudnya berupa logam padat yang sangat panas dan berada di pusat bumi adalah...",
                options: ["Kerak Bumi", "Inti Dalam", "Mantel Bumi", "Inti Luar"],
                answer: 1,
                explanation: "Inti dalam adalah bola logam besi-nikel padat karena mendapat tekanan gravitasi yang luar biasa dari lapisan di atasnya."
            },
            {
                question: "Pergerakan lempeng tektonik yang saling bertumbukan dinamakan...",
                options: ["Divergen", "Konvergen", "Transform", "Sesar mendatar"],
                answer: 1,
                explanation: "Konvergen adalah batas gerakan lempeng yang saling mendekat dan bertumbukan, sering kali memicu gempa bumi dan pegunungan vulkanik."
            },
            {
                question: "Mengapa wilayah Indonesia sering mengalami gempa bumi tektonik?",
                options: ["Berada di garis khatulistiwa", "Dilalui angin topan muson tropis", "Terletak di pertemuan 3 lempeng tektonik utama", "Memiliki banyak sungai besar"],
                answer: 2,
                explanation: "Indonesia berada di pertemuan Lempeng Indo-Australia, Eurasia, dan Pasifik yang aktif bertabrakan sehingga rawan gempa."
            }
        ]
    }
};

// 2. AUDIO SYNTHESIZER ENGINE (Web Audio API)
const AudioSynth = {
    ctx: null,
    enabled: true,

    init() {
        if (this.ctx) return;
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        } catch (e) {
            console.warn("Web Audio API tidak didukung pada browser ini.");
        }
    },

    toggle() {
        this.enabled = !this.enabled;
        this.init();
        return this.enabled;
    },

    playTone(freq, type, duration, volume = 0.1) {
        if (!this.enabled || !this.ctx) return;
        
        // Resume context if suspended (browser security autoplays)
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = type; // 'sine', 'square', 'sawtooth', 'triangle'
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
        // Exponential decay envelope
        gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    },

    // Audio SFX Preset
    playClick() {
        this.init();
        this.playTone(600, 'sine', 0.15, 0.15);
    },

    playSweep() {
        this.init();
        if (!this.enabled || !this.ctx) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.3);

        gainNode.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
    },

    playCorrect() {
        this.init();
        const now = this.ctx ? this.ctx.currentTime : 0;
        // Arpeggio chord C major
        setTimeout(() => this.playTone(523.25, 'sine', 0.25, 0.1), 0); // C5
        setTimeout(() => this.playTone(659.25, 'sine', 0.25, 0.1), 100); // E5
        setTimeout(() => this.playTone(783.99, 'sine', 0.25, 0.1), 200); // G5
        setTimeout(() => this.playTone(1046.50, 'sine', 0.4, 0.15), 300); // C6
    },

    playWrong() {
        this.init();
        if (!this.enabled || !this.ctx) return;
        this.playTone(150, 'sawtooth', 0.3, 0.25);
    },

    playTriumph() {
        this.init();
        if (!this.enabled || !this.ctx) return;
        const chords = [392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51]; // G4, C5, E5, G5, C6, E6
        chords.forEach((freq, idx) => {
            setTimeout(() => {
                this.playTone(freq, 'triangle', 0.5, 0.12);
            }, idx * 120);
        });
    }
};

// 3. CANVAS PARTICLE SYSTEM ENGINE
const ParticleEngine = {
    canvas: null,
    ctx: null,
    particles: [],
    animationId: null,
    currentTheme: 'default', // 'default', 'bio', 'phys', 'chem', 'earth'

    init() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
        this.start();
    },

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createParticles();
    },

    setTheme(theme) {
        this.currentTheme = theme;
        this.createParticles();
    },

    createParticles() {
        this.particles = [];
        const count = Math.min(Math.floor(window.innerWidth / 15), 80);
        
        for (let i = 0; i < count; i++) {
            this.particles.push(this.spawnParticle());
        }
    },

    spawnParticle() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const p = {
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 3 + 1,
            color: 'rgba(99, 102, 241, 0.2)',
            type: 'dot',
            extra: {}
        };

        // Theme modifications
        if (this.currentTheme === 'bio') {
            p.color = Math.random() > 0.5 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(52, 211, 153, 0.2)';
            p.size = Math.random() * 8 + 4; // larger biological blobs
            p.type = 'cell';
            p.extra = {
                pulseSpeed: Math.random() * 0.05 + 0.01,
                angle: Math.random() * Math.PI
            };
        } else if (this.currentTheme === 'phys') {
            p.color = Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.25)';
            p.vx = (Math.random() - 0.5) * 1.5; // faster electrical energy
            p.vy = (Math.random() - 0.5) * 1.5;
            p.type = 'energy';
        } else if (this.currentTheme === 'chem') {
            p.color = 'rgba(168, 85, 247, 0.25)';
            p.size = Math.random() * 4 + 2;
            p.type = 'atom';
            p.extra = {
                orbitRadius: Math.random() * 20 + 10,
                orbitSpeed: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.03 + 0.01),
                angle: Math.random() * Math.PI * 2
            };
        } else if (this.currentTheme === 'earth') {
            p.color = Math.random() > 0.5 ? 'rgba(245, 158, 11, 0.25)' : 'rgba(239, 68, 68, 0.2)';
            p.vy = -Math.random() * 0.5 - 0.1; // rising magma ashes
            p.vx = (Math.random() - 0.5) * 0.3;
            p.size = Math.random() * 5 + 1;
            p.type = 'ash';
        }

        return p;
    },

    start() {
        const loop = () => {
            this.update();
            this.draw();
            this.animationId = requestAnimationFrame(loop);
        };
        loop();
    },

    update() {
        const w = this.canvas.width;
        const h = this.canvas.height;

        this.particles.forEach(p => {
            if (p.type === 'atom') {
                p.extra.angle += p.extra.orbitSpeed;
                p.x += p.vx;
                p.y += p.vy;
            } else if (p.type === 'ash') {
                p.x += p.vx;
                p.y += p.vy;
                if (p.y < -10) {
                    p.y = h + 10;
                    p.x = Math.random() * w;
                }
            } else {
                p.x += p.vx;
                p.y += p.vy;
            }

            // Boundary wrap around
            if (p.x < -20) p.x = w + 20;
            if (p.x > w + 20) p.x = -20;
            if (p.y < -20 && p.type !== 'ash') p.y = h + 20;
            if (p.y > h + 20 && p.type !== 'ash') p.y = -20;
        });
    },

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            this.ctx.beginPath();
            if (p.type === 'cell') {
                // Biological cell (circle with nucleolus outline)
                p.extra.angle += p.extra.pulseSpeed;
                const r = p.size + Math.sin(p.extra.angle) * 1.5;
                this.ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color;
                this.ctx.fill();
                // inner nucleus
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, r * 0.35, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                this.ctx.fill();
            } else if (p.type === 'atom') {
                // Draw atom core
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color;
                this.ctx.fill();
                // Draw orbiting electrons path
                this.ctx.beginPath();
                this.ctx.ellipse(p.x, p.y, p.extra.orbitRadius, p.extra.orbitRadius * 0.4, Math.PI / 4, 0, Math.PI * 2);
                this.ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
                this.ctx.lineWidth = 1;
                this.ctx.stroke();

                // Electron dot
                const ex = p.x + Math.cos(p.extra.angle) * p.extra.orbitRadius;
                const ey = p.y + Math.sin(p.extra.angle) * p.extra.orbitRadius * 0.4;
                this.ctx.beginPath();
                this.ctx.arc(ex, ey, 2, 0, Math.PI * 2);
                this.ctx.fillStyle = '#c084fc';
                this.ctx.fill();
            } else {
                // Default dot
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color;
                this.ctx.fill();
            }
        });
    }
};

// 4. MAIN APP STATE & CONTROLLER
const App = {
    // State Variables
    currentScreen: 'cover', // 'cover', 'dashboard', 'workspace'
    currentChapterId: null,
    currentMeetingIdx: 0,
    currentSlideIdx: 0,
    
    // User Session Stats (stored in memory)
    stats: {
        completedChapters: {}, // chapterId: true/false
        quizScores: {},       // chapterId: score
        unlockedBadges: [],   // list of badge names
    },

    // Wave Simulator state (Bab 4)
    waveState: {
        amplitude: 40,
        frequency: 0.02,
        phase: 0,
        animId: null
    },

    // Init function
    init() {
        // Elements Binding
        this.bindEvents();
        
        // Init Background Particles
        ParticleEngine.init();
        ParticleEngine.setTheme('default');

        // Init Theme from localStorage
        this.initTheme();
    },

    // Theme Management
    initTheme() {
        const saved = localStorage.getItem('ipa-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', saved);
        this.updateThemeIcon(saved);
    },

    toggleTheme() {
        const html = document.documentElement;
        const current = html.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('ipa-theme', next);
        this.updateThemeIcon(next);
    },

    updateThemeIcon(theme) {
        const icon = document.getElementById('theme-icon');
        if (!icon) return;
        if (theme === 'light') {
            icon.setAttribute('data-lucide', 'moon');
        } else {
            icon.setAttribute('data-lucide', 'sun');
        }
        lucide.createIcons();
    },

    bindEvents() {
        // Start Button
        document.getElementById('btn-start').addEventListener('click', () => {
            AudioSynth.playSweep();
            this.switchScreen('dashboard');
            // Langsung tampilkan modal pemilihan BAB
            setTimeout(() => this.showChaptersModal(true), 300);
        });

        // Theme Toggle Button
        const btnTheme = document.getElementById('btn-theme-toggle');
        if (btnTheme) {
            btnTheme.addEventListener('click', () => {
                AudioSynth.playClick();
                this.toggleTheme();
            });
        }

        // Open Chapters Modal Button
        document.getElementById('btn-open-chapters').addEventListener('click', () => {
            AudioSynth.playClick();
            this.showChaptersModal(true);
        });

        // Close Chapters Modal Button
        document.getElementById('btn-close-modal').addEventListener('click', () => {
            AudioSynth.playClick();
            this.showChaptersModal(false);
        });

        // Click outside chapter modal to close
        document.getElementById('chapter-modal').addEventListener('click', (e) => {
            if (e.target.id === 'chapter-modal') {
                this.showChaptersModal(false);
            }
        });

        // Close Meeting Modal Button
        const btnCloseMeeting = document.getElementById('btn-close-meeting-modal');
        if (btnCloseMeeting) {
            btnCloseMeeting.addEventListener('click', () => {
                AudioSynth.playClick();
                this.showMeetingModal(false);
            });
        }

        // Click outside meeting modal to close
        const meetingModal = document.getElementById('meeting-modal');
        if (meetingModal) {
            meetingModal.addEventListener('click', (e) => {
                if (e.target.id === 'meeting-modal') {
                    this.showMeetingModal(false);
                }
            });
        }

        // Switch Meeting Pill button inside workspace
        const btnSwitchMeeting = document.getElementById('btn-switch-meeting');
        if (btnSwitchMeeting) {
            btnSwitchMeeting.addEventListener('click', () => {
                AudioSynth.playClick();
                if (this.currentChapterId) {
                    this.openMeetingModal(this.currentChapterId);
                }
            });
        }

        // Back to Dashboard from Workspace Button
        document.getElementById('btn-back-dashboard').addEventListener('click', () => {
            AudioSynth.playClick();
            this.exitWorkspace();
        });

        // Prev & Next Slide Buttons
        document.getElementById('btn-prev-slide').addEventListener('click', () => this.navigateSlide(-1));
        document.getElementById('btn-next-slide').addEventListener('click', () => this.navigateSlide(1));

        // Sound Toggle buttons
        const toggleSound = () => {
            const enabled = AudioSynth.toggle();
            const icons = [document.querySelector('#btn-sound-toggle i'), document.querySelector('#btn-sound-toggle-ws i')];
            icons.forEach(icon => {
                if (icon) {
                    icon.setAttribute('data-lucide', enabled ? 'volume-2' : 'volume-x');
                }
            });
            lucide.createIcons();
            if (enabled) AudioSynth.playClick();
        };
        document.getElementById('btn-sound-toggle').addEventListener('click', toggleSound);
        document.getElementById('btn-sound-toggle-ws').addEventListener('click', toggleSound);

        // Quick chapter items clicking
        document.querySelectorAll('.quick-chapter-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.getAttribute('data-chapter'));
                const chData = CHAPTERS_DATA[id];
                if (chData && chData.meetings && chData.meetings.length > 0) {
                    this.openMeetingModal(id);
                } else {
                    this.startChapter(id);
                }
            });
        });

        // Modal chapter cards clicking
        document.querySelectorAll('.modal-chapter-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.getAttribute('data-chapter'));
                const chData = CHAPTERS_DATA[id];
                this.showChaptersModal(false);
                if (chData && chData.meetings && chData.meetings.length > 0) {
                    this.openMeetingModal(id);
                } else {
                    this.startChapter(id);
                }
            });
        });

        // Global delegate for PDF LKPD buttons
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('#btn-download-pdf-tp1, #btn-open-pdf-top, .btn-pdf-download, .btn-pdf-toggle');
            if (btn) {
                e.preventDefault();
                AudioSynth.playClick();
                this.generateTP1PDF();
            }
        });
    },

    // Navigation and screen control
    switchScreen(screenName) {
        this.currentScreen = screenName;
        
        document.getElementById('cover-screen').className = screenName === 'cover' ? 'active-screen' : 'hidden';
        document.getElementById('dashboard-screen').className = screenName === 'dashboard' ? '' : 'hidden';
        document.getElementById('presentation-workspace').className = screenName === 'workspace' ? '' : 'hidden';

        // Background Particles theme matching
        if (screenName === 'cover' || screenName === 'dashboard') {
            ParticleEngine.setTheme('default');
        }
    },

    showChaptersModal(show) {
        const modal = document.getElementById('chapter-modal');
        if (show) {
            modal.classList.remove('hidden');
        } else {
            modal.classList.add('hidden');
        }
    },

    showMeetingModal(show) {
        const modal = document.getElementById('meeting-modal');
        if (!modal) return;
        if (show) {
            modal.classList.remove('hidden');
        } else {
            modal.classList.add('hidden');
        }
    },

    openMeetingModal(chapterId) {
        const chData = CHAPTERS_DATA[chapterId];
        if (!chData || !chData.meetings) return;

        const titleElem = document.getElementById('meeting-modal-ch-title');
        if (titleElem) {
            titleElem.innerText = `${chData.tag}: ${chData.title}`;
        }

        const container = document.getElementById('meetings-cards-container');
        if (container) {
            container.innerHTML = chData.meetings.map((m, idx) => {
                const hasSlides = m.slides && m.slides.length > 0;
                const isCurrent = (this.currentChapterId === chapterId && this.currentMeetingIdx === idx && this.currentScreen === 'workspace');
                const tagText = hasSlides ? `Tersedia • ${m.slides.length} Slide` : 'Belum Ada Materi';
                const tagClass = hasSlides ? 'meeting-tag' : 'meeting-tag empty-tag';
                const cardClass = `meeting-card ${hasSlides ? '' : 'empty-card'} ${isCurrent ? 'active-meeting' : ''}`;
                
                return `
                    <div class="${cardClass}" style="--accent-color: ${chData.themeColor}" data-meeting-idx="${idx}">
                        <div class="meeting-card-top">
                            <span class="${tagClass}">${m.title}</span>
                            <span style="font-size:0.75rem; color: var(--text-muted);">${tagText}</span>
                        </div>
                        <div class="meeting-card-body">
                            <h4>${m.subtitle || m.title}</h4>
                            <p>${m.desc || ''}</p>
                        </div>
                        <div class="meeting-card-footer">
                            <span>${hasSlides ? 'Buka Pertemuan' : 'Buka (Kosong)'}</span>
                            <i data-lucide="arrow-right"></i>
                        </div>
                    </div>
                `;
            }).join('');

            container.querySelectorAll('.meeting-card').forEach(card => {
                card.addEventListener('click', () => {
                    AudioSynth.playClick();
                    const meetingIdx = parseInt(card.getAttribute('data-meeting-idx'), 10);
                    this.showMeetingModal(false);
                    this.startChapter(chapterId, meetingIdx);
                });
            });

            lucide.createIcons();
        }

        this.showMeetingModal(true);
    },

    getCurrentSlides() {
        const chData = CHAPTERS_DATA[this.currentChapterId];
        if (!chData) return [];
        if (chData.meetings && chData.meetings.length > 0) {
            const meeting = chData.meetings[this.currentMeetingIdx || 0];
            return meeting ? meeting.slides : [];
        }
        return chData.slides || [];
    },

    // Chapter Session Start
    startChapter(id, meetingIdx = 0) {
        this.currentChapterId = id;
        this.currentMeetingIdx = meetingIdx;
        this.currentSlideIdx = 0;
        
        // Play Audio transition
        AudioSynth.playSweep();

        // Match Particle System Theme to Subject
        const chData = CHAPTERS_DATA[id];
        if (id === 1 || id === 2) ParticleEngine.setTheme('bio');
        else if (id === 3 || id === 4) ParticleEngine.setTheme('phys');
        else if (id === 5) ParticleEngine.setTheme('chem');
        else if (id === 6) ParticleEngine.setTheme('earth');

        this.switchScreen('workspace');
        this.renderSlide();
    },

    exitWorkspace() {
        // Stop any active simulations loops
        if (this.waveState.animId) {
            cancelAnimationFrame(this.waveState.animId);
            this.waveState.animId = null;
        }

        // Restore normal grid layout
        const wsGrid = document.querySelector('.workspace-grid');
        const contentPanel = document.querySelector('.content-panel');
        if (wsGrid) wsGrid.classList.remove('wb-fullwidth-mode');
        if (contentPanel) contentPanel.classList.remove('hidden');

        this.updateDashboardStats();
        this.switchScreen('dashboard');
    },

    // Slide Rendering
    renderSlide() {
        const chData = CHAPTERS_DATA[this.currentChapterId];
        const slides = this.getCurrentSlides();
        const pillBtn = document.getElementById('btn-switch-meeting');
        const meetingNameSpan = document.getElementById('ws-meeting-name');

        // Set Slide Accent Color Variable
        document.getElementById('presentation-workspace').style.setProperty('--slide-accent', chData.themeColor);

        if (chData.meetings && chData.meetings.length > 0) {
            const meeting = chData.meetings[this.currentMeetingIdx || 0];
            if (pillBtn) pillBtn.classList.remove('hidden');
            if (meetingNameSpan) meetingNameSpan.innerText = meeting ? meeting.title : `Pertemuan ${this.currentMeetingIdx + 1}`;
            document.getElementById('ws-badge').innerText = chData.tag;
        } else {
            if (pillBtn) pillBtn.classList.add('hidden');
            document.getElementById('ws-badge').innerText = chData.tag;
        }

        document.getElementById('ws-title').innerText = chData.title;

        // Handle Empty Slides (e.g. Pertemuan 2, 3, 4)
        if (!slides || slides.length === 0) {
            const meeting = chData.meetings ? chData.meetings[this.currentMeetingIdx || 0] : null;
            const mTitle = meeting ? meeting.title : `Pertemuan ${this.currentMeetingIdx + 1}`;

            document.getElementById('slide-num').innerText = `${mTitle} (Belum Ada Materi)`;
            
            const wsGrid = document.querySelector('.workspace-grid');
            const contentPanel = document.querySelector('.content-panel');
            if (wsGrid) wsGrid.classList.remove('wb-fullwidth-mode');
            if (contentPanel) contentPanel.classList.remove('hidden');

            const contentArea = document.getElementById('slide-content-area');
            contentArea.innerHTML = `
                <div class="empty-meeting-wrapper">
                    <div class="empty-meeting-icon">
                        <i data-lucide="folder-open"></i>
                    </div>
                    <h3>Materi ${mTitle} Belum Tersedia</h3>
                    <p>Materi pembelajaran untuk <strong>${mTitle}</strong> belum diisi. Saat ini materi yang sudah siap adalah <strong>Pertemuan 1</strong> (Slide 1 - 5).</p>
                    <div style="display:flex; gap:0.75rem; flex-wrap:wrap; justify-content:center; margin-top:0.5rem;">
                        <button class="btn-primary ripple" onclick="App.startChapter(${this.currentChapterId}, 0)">
                            <i data-lucide="play"></i>
                            <span>Buka Pertemuan 1</span>
                        </button>
                        <button class="btn-nav ripple" onclick="App.openMeetingModal(${this.currentChapterId})">
                            <i data-lucide="calendar"></i>
                            <span>Pilih Pertemuan Lain</span>
                        </button>
                    </div>
                </div>
            `;

            const viewport = document.getElementById('viewport-content');
            document.getElementById('panel-title').innerText = `${mTitle} — Kosong`;
            viewport.innerHTML = `
                <div class="fallback-placeholder">
                    <i data-lucide="inbox" class="placeholder-icon" style="color: var(--text-muted)"></i>
                    <p style="font-size: 0.95rem; color: var(--text-secondary); margin-top:0.5rem;">Belum ada visualisasi pada ${mTitle}.</p>
                </div>
            `;

            document.getElementById('btn-prev-slide').disabled = true;
            document.getElementById('btn-next-slide').disabled = true;
            document.getElementById('slide-dots-container').innerHTML = '';
            lucide.createIcons();
            return;
        }

        const slide = slides[this.currentSlideIdx];
        document.getElementById('slide-num').innerText = `Slide ${this.currentSlideIdx + 1} dari ${slides.length}`;

        // 2. Render Text Content Panel
        const contentArea = document.getElementById('slide-content-area');
        contentArea.innerHTML = `
            <h2>${slide.title}</h2>
            <div class="slide-body-inner">
                ${slide.content}
            </div>
        `;

        // 3. Render Visual Simulator Panel & Handle Full-Width for Interactive Whiteboard & Apersepsi
        const wsGrid = document.querySelector('.workspace-grid');
        const contentPanel = document.querySelector('.content-panel');
        const isFullWidthSlide = (slide.visualType === 'interactive-whiteboard-tp1' || slide.visualType === 'apersepsi-sel' || slide.visualType === 'ppt-player' || slide.visualType === 'pdf-player' || slide.visualType === 'cell-specialization-sim' || slide.visualType === 'tts-cell-specialization' || slide.visualType === 'cell-comparison-table-quiz' || slide.visualType === 'cell-diagram-matching-quiz' || slide.visualType === 'cell-combined-quiz');

        if (isFullWidthSlide) {
            if (wsGrid) wsGrid.classList.add('wb-fullwidth-mode');
            if (contentPanel) contentPanel.classList.add('hidden');
        } else {
            if (wsGrid) wsGrid.classList.remove('wb-fullwidth-mode');
            if (contentPanel) contentPanel.classList.remove('hidden');
        }

        const viewport = document.getElementById('viewport-content');
        document.getElementById('panel-title').innerText = slide.visualTitle;
        
        // Stop any active animation loop
        if (this.waveState.animId) {
            cancelAnimationFrame(this.waveState.animId);
            this.waveState.animId = null;
        }

        viewport.innerHTML = ''; // clear viewport
        this.renderVisualComponent(slide.visualType, viewport);

        // 4. Update Navigation Buttons
        const prevBtn = document.getElementById('btn-prev-slide');
        const nextBtn = document.getElementById('btn-next-slide');
        
        prevBtn.disabled = this.currentSlideIdx === 0;
        nextBtn.disabled = false;
        
        // If last slide, change Next button text to "Dashboard" or "Kuis"
        const isLastSlide = this.currentSlideIdx === slides.length - 1;
        const nextBtnSpan = nextBtn.querySelector('span');
        const nextBtnIcon = nextBtn.querySelector('i');
        
        if (isLastSlide && slide.visualType !== 'ppt-player') {
            nextBtn.classList.remove('next-highlight');
            nextBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            nextBtnSpan.innerText = 'Dashboard';
            nextBtnIcon.setAttribute('data-lucide', 'home');
        } else {
            nextBtn.className = 'btn-nav-slide next-highlight';
            nextBtn.style.background = '';
            if (slides[this.currentSlideIdx + 1] && slides[this.currentSlideIdx + 1].visualType === 'quiz-start') {
                nextBtnSpan.innerText = 'Mulai Kuis';
                nextBtnIcon.setAttribute('data-lucide', 'check-circle');
            } else {
                nextBtnSpan.innerText = 'Selanjutnya';
                nextBtnIcon.setAttribute('data-lucide', 'chevron-right');
            }
        }

        // Render Slide Dots Indicators
        const dotsContainer = document.getElementById('slide-dots-container');
        dotsContainer.innerHTML = '';
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.className = `dot ${idx === this.currentSlideIdx ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                AudioSynth.playClick();
                this.currentSlideIdx = idx;
                this.renderSlide();
            });
            dotsContainer.appendChild(dot);
        });

        // Trigger math expression rendering (LaTeX)
        if (window.MathJax) {
            MathJax.typesetPromise([contentArea]);
        }

        // Listener untuk tombol Download / Buka LKPD PDF TP.1
        const btnPdf = document.getElementById('btn-download-pdf-tp1');
        if (btnPdf) {
            btnPdf.addEventListener('click', () => {
                AudioSynth.playClick();
                this.generateTP1PDF();
            });
        }

        lucide.createIcons();
    },

    navigateSlide(direction) {
        const slides = this.getCurrentSlides();
        if (!slides || slides.length === 0) return;

        const currentSlideObj = slides[this.currentSlideIdx];
        if (currentSlideObj && currentSlideObj.visualType === 'pdf-player' && this.pdfPlayerGoToSlide) {
            const totalPDFSlides = 8;
            const currentPDFSlide = this.currentPDFSlideIdx || 0;

            if (direction === 1) {
                if (currentPDFSlide < totalPDFSlides - 1) {
                    this.pdfPlayerGoToSlide(currentPDFSlide + 1);
                    return;
                } else {
                    if (this.currentSlideIdx < slides.length - 1) {
                        AudioSynth.playClick();
                        this.currentSlideIdx++;
                        this.renderSlide();
                        return;
                    } else {
                        this.stats.completedChapters[this.currentChapterId] = true;
                        this.exitWorkspace();
                        return;
                    }
                }
            } else if (direction === -1) {
                if (currentPDFSlide > 0) {
                    this.pdfPlayerGoToSlide(currentPDFSlide - 1);
                    return;
                } else if (this.currentSlideIdx > 0) {
                    AudioSynth.playClick();
                    this.currentSlideIdx--;
                    this.renderSlide();
                    return;
                }
            }
        }

        if (currentSlideObj && currentSlideObj.visualType === 'ppt-player' && this.pptPlayerGoToSlide) {
            const totalPPTSlides = 8;
            const currentPPTSlide = this.currentPPTSlideIdx || 0;

            if (direction === 1) {
                if (currentPPTSlide < totalPPTSlides - 1) {
                    this.pptPlayerGoToSlide(currentPPTSlide + 1);
                    return;
                } else {
                    // Reached last slide of PPT: advance to next workspace slide (Kuis) if available
                    if (this.currentSlideIdx < slides.length - 1) {
                        AudioSynth.playClick();
                        this.currentSlideIdx++;
                        this.renderSlide();
                        return;
                    } else {
                        this.stats.completedChapters[this.currentChapterId] = true;
                        this.exitWorkspace();
                        return;
                    }
                }
            } else if (direction === -1) {
                if (currentPPTSlide > 0) {
                    this.pptPlayerGoToSlide(currentPPTSlide - 1);
                    return;
                } else if (this.currentSlideIdx > 0) {
                    AudioSynth.playClick();
                    this.currentSlideIdx--;
                    this.renderSlide();
                    return;
                }
            }
        }

        // If next clicked on last slide, exit back to dashboard
        if (direction === 1 && this.currentSlideIdx === slides.length - 1) {
            this.stats.completedChapters[this.currentChapterId] = true;
            this.exitWorkspace();
            return;
        }

        AudioSynth.playClick();
        this.currentSlideIdx += direction;
        
        // Clamp indices
        if (this.currentSlideIdx < 0) this.currentSlideIdx = 0;
        if (this.currentSlideIdx >= slides.length) this.currentSlideIdx = slides.length - 1;

        this.renderSlide();
    },

    // RENDER INTERACTIVE WIDGETS
    renderVisualComponent(type, container) {
        const slides = this.getCurrentSlides();
        const slide = slides ? slides[this.currentSlideIdx] : null;

        switch (type) {
            case 'img-viewer':
                const imgSrc = slide ? slide.imgSrc : '';
                const imgCaption = slide ? (slide.imgCaption || slide.visualTitle) : '';
                container.innerHTML = `
                    <div class="visual-img-container">
                        <div class="visual-img-wrapper" id="btn-zoom-img">
                            <img src="${imgSrc}" alt="${imgCaption}" class="visual-slide-img" />
                            <div class="visual-img-overlay">
                                <i data-lucide="zoom-in"></i>
                                <span>Klik untuk Memperbesar Gambar</span>
                            </div>
                        </div>
                        <div class="visual-img-caption">
                            <i data-lucide="image" style="color:var(--slide-accent)"></i>
                            <span>${imgCaption}</span>
                        </div>
                    </div>
                `;
                const zoomBtn = container.querySelector('#btn-zoom-img');
                if (zoomBtn) {
                    zoomBtn.addEventListener('click', () => {
                        AudioSynth.playClick();
                        this.openImageModal(imgSrc, imgCaption);
                    });
                }
                break;

            case 'apersepsi-sel':
                container.innerHTML = `
                <div class="apersepsi-fullpage">

                    <!-- HEADER -->
                    <div class="ap-header">
                        <div class="ap-badge">🔬 APERSEPSI</div>
                        <h1 class="ap-main-title">Sebelum Belajar Sel…<br><span>Bayangkan Ini Dulu!</span></h1>
                        <p class="ap-intro">Pernah lihat bangunan? Nah, <strong>sel</strong> itu mirip dengan bata pada bangunan — tapi untuk makhluk hidup!</p>
                    </div>

                    <!-- ANALOGI CARDS -->
                    <div class="ap-cards">

                        <div class="ap-card" style="--ap-color:#10b981">
                            <div class="ap-card-icon">🏠</div>
                            <div class="ap-card-body">
                                <div class="ap-card-label">ANALOGI</div>
                                <div class="ap-card-title">Rumah dari Bata</div>
                                <div class="ap-card-desc">
                                    Rumah dibangun dari ribuan <strong>bata kecil</strong>.<br>
                                    Tubuhmu dibangun dari triliunan <strong>sel kecil</strong>.<br>
                                    <em>Satu bata ≈ satu sel!</em>
                                </div>
                            </div>
                        </div>

                        <div class="ap-card" style="--ap-color:#6366f1">
                            <div class="ap-card-icon">🧩</div>
                            <div class="ap-card-body">
                                <div class="ap-card-label">ANALOGI</div>
                                <div class="ap-card-title">Puzzle Raksasa</div>
                                <div class="ap-card-desc">
                                    Bayangkan tubuhmu adalah <strong>puzzle</strong>.<br>
                                    Setiap keping puzzle = <strong>satu sel</strong>.<br>
                                    Tanpa kepingnya, gambar tidak akan utuh!
                                </div>
                            </div>
                        </div>

                        <div class="ap-card" style="--ap-color:#f59e0b">
                            <div class="ap-card-icon">🏙️</div>
                            <div class="ap-card-body">
                                <div class="ap-card-label">ANALOGI</div>
                                <div class="ap-card-title">Kota Mini yang Hidup</div>
                                <div class="ap-card-desc">
                                    Sel itu seperti <strong>kota kecil</strong> yang lengkap:<br>
                                    🏛️ Inti sel = Balai Kota (pusat perintah)<br>
                                    🏭 Mitokondria = Pembangkit listrik<br>
                                    🚪 Membran sel = Pintu gerbang kota
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- FAKTA KEREN -->
                    <div class="ap-fact-bar">
                        <div class="ap-fact">
                            <span class="ap-fact-num">37,2 T</span>
                            <span class="ap-fact-label">jumlah sel dalam tubuh manusia</span>
                        </div>
                        <div class="ap-fact-divider"></div>
                        <div class="ap-fact">
                            <span class="ap-fact-num">0,01 mm</span>
                            <span class="ap-fact-label">rata-rata ukuran sel manusia</span>
                        </div>
                        <div class="ap-fact-divider"></div>
                        <div class="ap-fact">
                            <span class="ap-fact-num">200+</span>
                            <span class="ap-fact-label">jenis sel berbeda di tubuh kita</span>
                        </div>
                    </div>

                    <!-- PERTANYAAN PEMANTIK -->
                    <div class="ap-question">
                        <div class="ap-q-icon">💡</div>
                        <div class="ap-q-text">
                            <strong>Pertanyaan Pemantik:</strong>
                            Jika satu sel rusak, apakah tubuhmu langsung sakit? Menurutmu, mengapa?
                        </div>
                    </div>

                </div>
                `;
                break;

            case 'interactive-whiteboard-tp1':
                this.initInteractiveWhiteboardTP1(container);
                break;

            case 'cell-comparison-table-quiz':
                this.initCellComparisonQuiz(container);
                break;

            case 'cell-diagram-matching-quiz':
                this.initCellDiagramMatchingQuiz(container);
                break;

            case 'cell-combined-quiz':
                this.initCellCombinedQuiz(container);
                break;

            case 'info-default':
                container.innerHTML = `
                    <div class="fallback-placeholder">
                        <i data-lucide="book-open" class="placeholder-icon" style="color: var(--slide-accent)"></i>
                        <p style="font-size: 1.1rem; color: white;">Mari pelajari materi ini dengan teliti</p>
                    </div>
                `;
                break;
            
            case 'info-organelles':
                container.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; gap:1.5rem; text-align:center; padding: 2rem;">
                        <i data-lucide="microscope" style="width: 72px; height: 72px; color: var(--color-bio-sel); animation: bounce 3s infinite;"></i>
                        <h4 style="font-size: 1.1rem; font-family: var(--font-display);">Eksplorasi Sel Organisme</h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 320px;">Organel terkecil memiliki struktur fungsional yang menyerupai organ manusia skala mikroskopis.</p>
                    </div>
                `;
                break;

            case 'sim-cell':
                this.initCellSimulator(container);
                break;

            case 'info-digestive':
                container.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; gap:1.5rem; text-align:center; padding: 2rem;">
                        <i data-lucide="activity" style="width: 72px; height: 72px; color: var(--color-bio-tubuh); animation: pulseScale 2s infinite;"></i>
                        <h4 style="font-size: 1.1rem; font-family: var(--font-display);">Metabolisme Nutrisi</h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 320px;">Makanan dicerna oleh tubuh secara mekanis dan kimiawi guna menyerap glukosa, asam amino, dan energi.</p>
                    </div>
                `;
                break;

            case 'sim-organ':
                this.initOrganSimulator(container);
                break;

            case 'info-disease':
                container.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; gap:1.5rem; text-align:center; padding: 2rem;">
                        <i data-lucide="shield-alert" style="width: 72px; height: 72px; color: var(--color-bio-tubuh);"></i>
                        <h4 style="font-size: 1.1rem; font-family: var(--font-display);">Pencegahan Patologis</h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 320px;">Olahraga teratur, minum air putih minimal 2 liter per hari, dan diet tinggi serat mencegah maag dan gagal ginjal.</p>
                    </div>
                `;
                break;

            case 'info-physics-intro':
                container.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; gap:1.5rem; text-align:center; padding: 2rem;">
                        <i data-lucide="zap" style="width: 72px; height: 72px; color: var(--color-phys-energi); animation: bounce 3s infinite;"></i>
                        <h4 style="font-size: 1.1rem; font-family: var(--font-display);">Hukum Newton & Usaha</h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 320px;">Usaha ($W$) terjadi jika gaya ($F$) menghasilkan perpindahan posisi sejauh ($s$).</p>
                    </div>
                `;
                break;

            case 'info-simple-machines':
                container.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; gap:1.5rem; text-align:center; padding: 2rem;">
                        <i data-lucide="settings" style="width: 72px; height: 72px; color: var(--color-phys-energi); animation: spin 15s infinite linear;"></i>
                        <h4 style="font-size: 1.1rem; font-family: var(--font-display);">Mekanisme Efisiensi Kerja</h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 320px;">Pesawat sederhana membantu mengalikan gaya kuasa manusia sehingga mempermudah pekerjaan berat.</p>
                    </div>
                `;
                break;

            case 'sim-lever':
                this.initLeverSimulator(container);
                break;

            case 'info-vibration':
                container.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; gap:1.5rem; text-align:center; padding: 2rem;">
                        <i data-lucide="clock" style="width: 72px; height: 72px; color: var(--color-phys-gelombang); animation: bounce 2s infinite;"></i>
                        <h4 style="font-size: 1.1rem; font-family: var(--font-display);">Frekuensi & Waktu Getar</h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 320px;">Satu getaran penuh didefinisikan sebagai gerak bandul dari titik awal kembali ke titik awal (A-B-C-B-A).</p>
                    </div>
                `;
                break;

            case 'sim-wave':
                this.initWaveSimulator(container);
                break;

            case 'info-light':
                container.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; gap:1.5rem; text-align:center; padding: 2rem;">
                        <i data-lucide="sun" style="width: 72px; height: 72px; color: var(--color-phys-gelombang); animation: pulseScale 4s infinite;"></i>
                        <h4 style="font-size: 1.1rem; font-family: var(--font-display);">Sifat Refraksi Cahaya</h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 320px;">Pembiasan cahaya terjadi akibat perbedaan indeks bias kecepatan cahaya saat melewati medium yang berbeda.</p>
                    </div>
                `;
                break;

            case 'info-chemistry-intro':
                container.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; gap:1.5rem; text-align:center; padding: 2rem;">
                        <i data-lucide="atom" class="icon-spin" style="width: 72px; height: 72px; color: var(--color-chem-materi);"></i>
                        <h4 style="font-size: 1.1rem; font-family: var(--font-display);">Sistem Periodik Unsur</h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 320px;">Unsur diidentifikasikan oleh jumlah proton intinya, disusun rapi dalam Tabel Periodik Unsur.</p>
                    </div>
                `;
                break;

            case 'sim-chemistry':
                this.initChemistrySimulator(container);
                break;

            case 'info-mixtures':
                container.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; gap:1.5rem; text-align:center; padding: 2rem;">
                        <i data-lucide="flame" style="width: 72px; height: 72px; color: var(--color-chem-materi); animation: bounce 3s infinite;"></i>
                        <h4 style="font-size: 1.1rem; font-family: var(--font-display);">Pemisahan Campuran Fisika</h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 320px;">Metode filtrasi (penyaringan), distilasi (penyulingan), dan evaporasi didasarkan pada sifat fisik zat penyusun campuran.</p>
                    </div>
                `;
                break;

            case 'sim-earth':
                this.initEarthSimulator(container);
                break;

            case 'info-tectonics':
                container.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; gap:1.5rem; text-align:center; padding: 2rem;">
                        <i data-lucide="mountain" style="width: 72px; height: 72px; color: var(--color-earth-bumi); animation: pulseScale 3s infinite;"></i>
                        <h4 style="font-size: 1.1rem; font-family: var(--font-display);">Konveksi Mantel & Orogenesis</h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 320px;">Suhu ekstrem di mantel bumi menimbulkan arus konveksi magma cair yang menggeser lempeng kerak bumi di atasnya.</p>
                    </div>
                `;
                break;

            case 'info-earthquake':
                container.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; gap:1.5rem; text-align:center; padding: 2rem;">
                        <i data-lucide="shield-alert" style="width: 72px; height: 72px; color: var(--color-earth-bumi);"></i>
                        <h4 style="font-size: 1.1rem; font-family: var(--font-display);">Mitigasi Aman Gempa</h4>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 320px;">Mengingat kondisi geologis Indonesia, edukasi mitigasi kebencanaan sejak dini sangat penting untuk menyelamatkan jiwa.</p>
                    </div>
                `;
                break;

            case 'ppt-player':
                const initialSlide = slide && slide.initialSlide ? slide.initialSlide : 0;
                this.initPPTPlayer(container, initialSlide);
                break;

            case 'pdf-player':
                const initPdfSlide = slide && slide.initialSlide ? slide.initialSlide : 0;
                const pdfUrl = slide && slide.pdfUrl ? slide.pdfUrl : 'BAB 1/pertemuan3.pdf';
                this.initPDFPlayer(container, pdfUrl, initPdfSlide);
                break;

            case 'tts-cell-specialization':
            case 'cell-specialization-sim':
                this.initTTSCellSpecialization(container);
                break;

            case 'quiz-start':
                this.initQuizPanel(container);
                break;

            default:
                container.innerHTML = `
                    <div class="fallback-placeholder">
                        <i data-lucide="orbit" class="placeholder-icon icon-spin"></i>
                        <p>Simulasi Interaktif</p>
                    </div>
                `;
        }
        lucide.createIcons();
    },

    /* PPT PLAYER COMPONENT (TP 2.pptx) */
    initPPTPlayer(container, initialSlide = 0) {
        const totalSlides = 8;
        const slidesData = Array.from({ length: totalSlides }, (_, i) => ({
            src: `image/BAB 1/TP2_slides/slide_${i + 1}.png`,
            num: i + 1,
            title: `Slide ${i + 1}`
        }));

        let currentSlide = Math.min(Math.max(0, initialSlide), totalSlides - 1);
        let autoplayTimer = null;
        let isPlaying = false;

        container.innerHTML = `
            <div class="ppt-player-wrapper" style="width: 100%; height: 100%;">
                <!-- MAIN VIEWPORT DISPLAY -->
                <div class="ppt-viewport" id="ppt-viewport-el" style="width: 100%; height: 100%;">
                    <img id="ppt-main-img" src="${slidesData[currentSlide].src}" alt="Slide ${currentSlide + 1}" class="ppt-slide-image" title="Klik untuk Lanjut ke Slide Berikutnya" />
                    
                    <button id="btn-ppt-fs-prev" class="ppt-fs-nav-btn ppt-fs-nav-prev" title="Slide Sebelumnya (Panah Kiri)">
                        <i data-lucide="chevron-left"></i>
                    </button>
                    <button id="btn-ppt-fs-next" class="ppt-fs-nav-btn ppt-fs-nav-next" title="Slide Selanjutnya (Panah Kanan / Klik)">
                        <i data-lucide="chevron-right"></i>
                    </button>

                    <div class="ppt-header-badge">
                        <i data-lucide="presentation"></i>
                        <span>TP 2.pptx &bull; Pertemuan 2</span>
                    </div>

                    <button id="btn-ppt-jump-quiz" class="ppt-quiz-jump-btn ripple" title="Langsung Buka Kuis Perbandingan Sel">
                        <i data-lucide="help-circle"></i>
                        <span>Kuis Perbandingan Sel</span>
                    </button>

                    <div class="ppt-fs-counter-badge" id="ppt-fs-counter">
                        <span id="ppt-fs-slide-num">${currentSlide + 1}</span> / ${totalSlides}
                    </div>

                    <button id="btn-ppt-fullscreen-mode" class="ppt-fullscreen-btn" title="Layar Penuh Slide">
                        <i data-lucide="maximize-2" id="ppt-fs-icon"></i>
                    </button>
                </div>

                <!-- CONTROLS BAR -->
                <div class="ppt-controls-bar">
                    <button id="btn-ppt-prev" class="ppt-ctrl-btn ripple" title="Slide Sebelumnya">
                        <i data-lucide="chevron-left"></i>
                        <span>Prev</span>
                    </button>

                    <button id="btn-ppt-play" class="ppt-ctrl-btn ppt-play-btn ripple" title="Tayangkan Slide Otomatis">
                        <i data-lucide="play" id="ppt-play-icon"></i>
                        <span id="ppt-play-text">Putar</span>
                    </button>

                    <div class="ppt-select-wrapper">
                        <select id="ppt-slide-dropdown" class="ppt-dropdown">
                            ${slidesData.map((s, idx) => `<option value="${idx}" ${idx === currentSlide ? 'selected' : ''}>Slide ${s.num} / ${totalSlides}</option>`).join('')}
                        </select>
                    </div>

                    <button id="btn-ppt-next" class="ppt-ctrl-btn ripple" title="Slide Selanjutnya">
                        <span>Next</span>
                        <i data-lucide="chevron-right"></i>
                    </button>

                    <a href="BAB 1/TP 2.pptx" download="TP 2.pptx" class="ppt-download-btn ripple" title="Unduh File PowerPoint Original">
                        <i data-lucide="file-down"></i>
                        <span>Unduh</span>
                    </a>
                </div>

                <!-- THUMBNAILS RIBBON -->
                <div class="ppt-thumbnails-ribbon" id="ppt-thumbs-ribbon">
                    ${slidesData.map((s, idx) => `
                        <div class="ppt-thumb-item ${idx === currentSlide ? 'active' : ''}" data-index="${idx}">
                            <img src="${s.src}" alt="Slide ${s.num}" />
                            <span class="thumb-number">${s.num}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        lucide.createIcons();

        const imgElem = container.querySelector('#ppt-main-img');
        const dropdownElem = container.querySelector('#ppt-slide-dropdown');
        const prevBtn = container.querySelector('#btn-ppt-prev');
        const nextBtn = container.querySelector('#btn-ppt-next');
        const playBtn = container.querySelector('#btn-ppt-play');
        const playText = container.querySelector('#ppt-play-text');
        const fullBtn = container.querySelector('#btn-ppt-fullscreen-mode');
        const thumbsRibbon = container.querySelector('#ppt-thumbs-ribbon');
        const fsPrevBtn = container.querySelector('#btn-ppt-fs-prev');
        const fsNextBtn = container.querySelector('#btn-ppt-fs-next');
        const fsNum = container.querySelector('#ppt-fs-slide-num');
        const jumpQuizBtn = container.querySelector('#btn-ppt-jump-quiz');

        if (jumpQuizBtn) {
            jumpQuizBtn.addEventListener('click', () => {
                AudioSynth.playClick();
                this.currentSlideIdx = 1;
                this.renderSlide();
            });
        }

        const goToSlide = (idx) => {
            if (idx < 0) idx = totalSlides - 1;
            if (idx >= totalSlides) idx = 0;
            currentSlide = idx;
            this.currentPPTSlideIdx = currentSlide;

            // Opacity transition
            imgElem.style.opacity = '0.3';
            setTimeout(() => {
                imgElem.src = slidesData[currentSlide].src;
                imgElem.alt = `Slide ${currentSlide + 1}`;
                imgElem.style.opacity = '1';
            }, 120);

            dropdownElem.value = currentSlide;
            if (fsNum) fsNum.textContent = currentSlide + 1;

            const nextBtnWs = document.getElementById('btn-next-slide');
            if (nextBtnWs) {
                const nextBtnSpan = nextBtnWs.querySelector('span');
                const nextBtnIcon = nextBtnWs.querySelector('i');
                const slides = this.getCurrentSlides();
                const hasMoreSlides = slides && (this.currentSlideIdx < slides.length - 1);

                if (currentSlide === totalSlides - 1) {
                    if (hasMoreSlides) {
                        nextBtnWs.className = 'btn-nav-slide next-highlight';
                        nextBtnWs.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                        if (nextBtnSpan) nextBtnSpan.innerText = 'Buka Kuis Perbandingan Sel';
                        if (nextBtnIcon) nextBtnIcon.setAttribute('data-lucide', 'check-circle');
                    } else {
                        nextBtnWs.classList.remove('next-highlight');
                        nextBtnWs.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                        if (nextBtnSpan) nextBtnSpan.innerText = 'Dashboard';
                        if (nextBtnIcon) nextBtnIcon.setAttribute('data-lucide', 'home');
                    }
                } else {
                    nextBtnWs.className = 'btn-nav-slide next-highlight';
                    nextBtnWs.style.background = '';
                    if (nextBtnSpan) nextBtnSpan.innerText = 'Selanjutnya';
                    if (nextBtnIcon) nextBtnIcon.setAttribute('data-lucide', 'chevron-right');
                }
                lucide.createIcons();
            }

            const prevBtnWs = document.getElementById('btn-prev-slide');
            if (prevBtnWs) {
                prevBtnWs.disabled = (currentSlide === 0);
            }

            const thumbs = thumbsRibbon.querySelectorAll('.ppt-thumb-item');
            thumbs.forEach((t, i) => {
                if (i === currentSlide) {
                    t.classList.add('active');
                    t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                } else {
                    t.classList.remove('active');
                }
            });

            AudioSynth.playClick();
        };

        this.pptPlayerGoToSlide = goToSlide;
        goToSlide(currentSlide);

        const togglePlay = () => {
            if (isPlaying) {
                clearInterval(autoplayTimer);
                isPlaying = false;
                playText.textContent = "Putar";
                playBtn.classList.remove('playing');
            } else {
                isPlaying = true;
                playText.textContent = "Jeda";
                playBtn.classList.add('playing');
                autoplayTimer = setInterval(() => {
                    goToSlide(currentSlide + 1);
                }, 3500);
            }
        };

        prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
        playBtn.addEventListener('click', togglePlay);

        if (fsPrevBtn) fsPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); goToSlide(currentSlide - 1); });
        if (fsNextBtn) fsNextBtn.addEventListener('click', (e) => { e.stopPropagation(); goToSlide(currentSlide + 1); });

        imgElem.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });

        dropdownElem.addEventListener('change', (e) => {
            goToSlide(parseInt(e.target.value, 10));
        });

        thumbsRibbon.querySelectorAll('.ppt-thumb-item').forEach(item => {
            item.addEventListener('click', () => {
                const idx = parseInt(item.getAttribute('data-index'), 10);
                goToSlide(idx);
            });
        });

        fullBtn.addEventListener('click', () => {
            const viewport = container.querySelector('#ppt-viewport-el');
            if (!document.fullscreenElement) {
                if (viewport.requestFullscreen) viewport.requestFullscreen();
                else if (viewport.webkitRequestFullscreen) viewport.webkitRequestFullscreen();
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
            }
        });

        // Global Keydown Handler for Slide Navigation
        const handleKeyDown = (e) => {
            const viewport = container.querySelector('#ppt-viewport-el');
            if (document.fullscreenElement === viewport || container.contains(document.activeElement) || (document.fullscreenElement && document.fullscreenElement.contains(container))) {
                if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
                    e.preventDefault();
                    goToSlide(currentSlide + 1);
                } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                    e.preventDefault();
                    goToSlide(currentSlide - 1);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
    },

    /* INTERACTIVE PDF PRESENTATION PLAYER COMPONENT (pertemuan3.pdf) */
    initPDFPlayer(container, pdfUrl = 'BAB 1/pertemuan3.pdf', initialSlide = 0) {
        const encodedPdfUrl = encodeURI(pdfUrl);
        let currentSlide = initialSlide;
        let pdfDocObj = null;
        let totalSlides = 8;
        let isRendering = false;
        let pagePending = null;
        let autoplayTimer = null;
        let isPlaying = false;
        let useIframeFallback = false;

        container.innerHTML = `
            <div class="ppt-player-wrapper" style="width: 100%; height: 100%;">
                <!-- MAIN VIEWPORT DISPLAY -->
                <div class="ppt-viewport" id="pdf-viewport-el" style="width: 100%; height: 100%; position: relative; overflow: hidden; background: #0f172a;">
                    <div id="pdf-loading-spinner-inline" class="pdf-spinner-container" style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0.8rem; color:#94a3b8; width:100%; height:100%;">
                        <i data-lucide="loader" class="icon-spin" style="width:42px; height:42px; color:var(--color-bio-sel);"></i>
                        <p style="font-size:0.95rem; font-weight:600; color:#e2e8f0;">Memuat Presentasi PDF (pertemuan3.pdf)...</p>
                    </div>

                    <canvas id="pdf-inline-canvas" style="max-width: 100%; max-height: 100%; object-fit: contain; transition: opacity 0.2s ease-in-out; display:none; cursor:pointer;" title="Klik untuk Lanjut ke Slide Berikutnya"></canvas>
                    
                    <iframe id="pdf-fallback-iframe" src="" style="width:100%; height:100%; border:none; display:none; border-radius:12px; background:#ffffff;" title="PDF Slide View"></iframe>

                    <button id="btn-pdf-fs-prev" class="ppt-fs-nav-btn ppt-fs-nav-prev" title="Slide Sebelumnya (Panah Kiri)">
                        <i data-lucide="chevron-left"></i>
                    </button>
                    <button id="btn-pdf-fs-next" class="ppt-fs-nav-btn ppt-fs-nav-next" title="Slide Selanjutnya (Panah Kanan / Klik)">
                        <i data-lucide="chevron-right"></i>
                    </button>

                    <div class="ppt-header-badge" style="color: #10b981;">
                        <i data-lucide="file-text"></i>
                        <span>pertemuan3.pdf &bull; Pertemuan 3</span>
                    </div>

                    <button id="btn-pdf-jump-sim" class="ppt-quiz-jump-btn ripple" title="Langsung Buka Teka-Teki Silang Spesialisasi Sel (2 Kelompok)">
                        <i data-lucide="grid"></i>
                        <span>TTS Spesialisasi Sel (2 Kelompok)</span>
                    </button>

                    <div class="ppt-fs-counter-badge" id="pdf-fs-counter">
                        <span id="pdf-fs-slide-num">${currentSlide + 1}</span> / <span id="pdf-fs-total-num">${totalSlides}</span>
                    </div>

                    <button id="btn-pdf-fullscreen-mode" class="ppt-fullscreen-btn" title="Layar Penuh Slide">
                        <i data-lucide="maximize-2" id="pdf-fs-icon"></i>
                    </button>
                </div>

                <!-- CONTROLS BAR -->
                <div class="ppt-controls-bar">
                    <button id="btn-pdf-prev" class="ppt-ctrl-btn ripple" title="Slide Sebelumnya">
                        <i data-lucide="chevron-left"></i>
                        <span>Prev</span>
                    </button>

                    <button id="btn-pdf-play" class="ppt-ctrl-btn ppt-play-btn ripple" title="Tayangkan Slide Otomatis">
                        <i data-lucide="play" id="pdf-play-icon"></i>
                        <span id="pdf-play-text">Putar</span>
                    </button>

                    <div class="ppt-select-wrapper">
                        <select id="pdf-slide-dropdown" class="ppt-dropdown">
                            ${Array.from({ length: totalSlides }, (_, i) => `<option value="${i}" ${i === currentSlide ? 'selected' : ''}>Slide ${i + 1} / ${totalSlides}</option>`).join('')}
                        </select>
                    </div>

                    <button id="btn-pdf-next" class="ppt-ctrl-btn ripple" title="Slide Selanjutnya">
                        <span>Next</span>
                        <i data-lucide="chevron-right"></i>
                    </button>

                    <a href="${encodedPdfUrl}" target="_blank" download="pertemuan3.pdf" class="ppt-download-btn ripple" title="Buka / Unduh File Presentasi PDF Original">
                        <i data-lucide="external-link"></i>
                        <span>Buka / Unduh PDF</span>
                    </a>
                </div>

                <!-- THUMBNAILS / SLIDE RIBBON -->
                <div class="ppt-thumbnails-ribbon" id="pdf-thumbs-ribbon">
                    ${Array.from({ length: totalSlides }, (_, i) => `
                        <div class="ppt-thumb-item ${i === currentSlide ? 'active' : ''}" data-index="${i}" style="display:flex; align-items:center; justify-content:center; background:#1e293b; color:#ffffff; font-weight:bold; font-size:0.8rem; border-radius:6px; min-width:80px; cursor:pointer;">
                            <span>Slide ${i + 1}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        lucide.createIcons();

        const canvas = container.querySelector('#pdf-inline-canvas');
        const iframeFallback = container.querySelector('#pdf-fallback-iframe');
        const spinner = container.querySelector('#pdf-loading-spinner-inline');
        const dropdownElem = container.querySelector('#pdf-slide-dropdown');
        const prevBtn = container.querySelector('#btn-pdf-prev');
        const nextBtn = container.querySelector('#btn-pdf-next');
        const playBtn = container.querySelector('#btn-pdf-play');
        const playText = container.querySelector('#pdf-play-text');
        const fullBtn = container.querySelector('#btn-pdf-fullscreen-mode');
        const thumbsRibbon = container.querySelector('#pdf-thumbs-ribbon');
        const fsPrevBtn = container.querySelector('#btn-pdf-fs-prev');
        const fsNextBtn = container.querySelector('#btn-pdf-fs-next');
        const fsNum = container.querySelector('#pdf-fs-slide-num');
        const fsTotal = container.querySelector('#pdf-fs-total-num');
        const jumpSimBtn = container.querySelector('#btn-pdf-jump-sim');

        if (jumpSimBtn) {
            jumpSimBtn.addEventListener('click', () => {
                AudioSynth.playClick();
                this.currentSlideIdx = 1;
                this.renderSlide();
            });
        }

        const enableIframeFallback = (startPage = 1) => {
            useIframeFallback = true;
            if (spinner) spinner.style.display = 'none';
            if (canvas) canvas.style.display = 'none';
            if (iframeFallback) {
                iframeFallback.style.display = 'block';
                iframeFallback.src = `${encodedPdfUrl}#page=${startPage}&view=Fit&toolbar=0&navpanes=0&scrollbar=0`;
            }
        };

        const renderPDFPage = (num) => {
            if (useIframeFallback) {
                if (iframeFallback) {
                    iframeFallback.src = `${encodedPdfUrl}#page=${num}&view=Fit&toolbar=0&navpanes=0&scrollbar=0`;
                }
                return;
            }

            if (!pdfDocObj) return;
            if (isRendering) {
                pagePending = num;
                return;
            }
            isRendering = true;

            pdfDocObj.getPage(num).then(page => {
                const ctx = canvas.getContext('2d');
                const viewportEl = container.querySelector('#pdf-viewport-el');
                const viewWidth = (viewportEl && viewportEl.clientWidth) ? (viewportEl.clientWidth - 30) : 870;
                const viewHeight = (viewportEl && viewportEl.clientHeight) ? (viewportEl.clientHeight - 30) : 470;
                
                const dpr = window.devicePixelRatio || 1;
                const unscaled = page.getViewport({ scale: 1.0 });
                
                // Calculate exact 1-page fit scale so entire slide fits in frame without scrollbars
                const scaleX = viewWidth / unscaled.width;
                const scaleY = viewHeight / unscaled.height;
                const fitScale = Math.min(scaleX, scaleY);

                const viewport = page.getViewport({ scale: fitScale * dpr });
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                canvas.style.width = `${Math.floor(unscaled.width * fitScale)}px`;
                canvas.style.height = `${Math.floor(unscaled.height * fitScale)}px`;

                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };

                page.render(renderContext).promise.then(() => {
                    isRendering = false;
                    if (spinner) spinner.style.display = 'none';
                    canvas.style.display = 'block';

                    if (pagePending !== null) {
                        const nextNum = pagePending;
                        pagePending = null;
                        renderPDFPage(nextNum);
                    }
                });
            }).catch(err => {
                console.warn("Falling back to embedded iframe rendering due to canvas render error:", err);
                isRendering = false;
                enableIframeFallback(num);
            });
        };

        const goToSlide = (idx) => {
            if (idx < 0) idx = totalSlides - 1;
            if (idx >= totalSlides) idx = 0;
            const isNext = idx > currentSlide || (currentSlide === totalSlides - 1 && idx === 0);
            currentSlide = idx;
            this.currentPDFSlideIdx = currentSlide;

            // Horizontal transition animation effect
            const activeEl = useIframeFallback ? iframeFallback : canvas;
            if (activeEl) {
                activeEl.style.transition = 'none';
                activeEl.style.transform = isNext ? 'translateX(50px)' : 'translateX(-50px)';
                activeEl.style.opacity = '0.4';
                requestAnimationFrame(() => {
                    activeEl.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-in-out';
                    activeEl.style.transform = 'translateX(0)';
                    activeEl.style.opacity = '1';
                });
            }

            if (useIframeFallback) {
                enableIframeFallback(currentSlide + 1);
            } else if (pdfDocObj) {
                renderPDFPage(currentSlide + 1);
            }

            if (dropdownElem) dropdownElem.value = currentSlide;
            if (fsNum) fsNum.textContent = currentSlide + 1;

            const nextBtnWs = document.getElementById('btn-next-slide');
            if (nextBtnWs) {
                const nextBtnSpan = nextBtnWs.querySelector('span');
                const nextBtnIcon = nextBtnWs.querySelector('i');
                const slides = this.getCurrentSlides();
                const hasMoreSlides = slides && (this.currentSlideIdx < slides.length - 1);

                if (currentSlide === totalSlides - 1) {
                    if (hasMoreSlides) {
                        nextBtnWs.className = 'btn-nav-slide next-highlight';
                        nextBtnWs.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                        if (nextBtnSpan) nextBtnSpan.innerText = 'Buka TTS Spesialisasi Sel';
                        if (nextBtnIcon) nextBtnIcon.setAttribute('data-lucide', 'grid');
                    } else {
                        nextBtnWs.classList.remove('next-highlight');
                        nextBtnWs.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                        if (nextBtnSpan) nextBtnSpan.innerText = 'Dashboard';
                        if (nextBtnIcon) nextBtnIcon.setAttribute('data-lucide', 'home');
                    }
                } else {
                    nextBtnWs.className = 'btn-nav-slide next-highlight';
                    nextBtnWs.style.background = '';
                    if (nextBtnSpan) nextBtnSpan.innerText = 'Selanjutnya';
                    if (nextBtnIcon) nextBtnIcon.setAttribute('data-lucide', 'chevron-right');
                }
                lucide.createIcons();
            }

            const prevBtnWs = document.getElementById('btn-prev-slide');
            if (prevBtnWs) {
                prevBtnWs.disabled = (currentSlide === 0);
            }

            if (thumbsRibbon) {
                const thumbs = thumbsRibbon.querySelectorAll('.ppt-thumb-item');
                thumbs.forEach((t, i) => {
                    if (i === currentSlide) {
                        t.classList.add('active');
                        t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    } else {
                        t.classList.remove('active');
                    }
                });
            }

            AudioSynth.playClick();
        };

        this.pdfPlayerGoToSlide = goToSlide;

        // Touch Swipe & Drag Handler for Sideways Sliding
        const viewportEl = container.querySelector('#pdf-viewport-el');
        let touchStartX = 0;
        let touchStartY = 0;

        if (viewportEl) {
            viewportEl.addEventListener('touchstart', (e) => {
                if (e.touches && e.touches.length === 1) {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                }
            }, { passive: true });

            viewportEl.addEventListener('touchend', (e) => {
                if (e.changedTouches && e.changedTouches.length === 1) {
                    const touchEndX = e.changedTouches[0].clientX;
                    const touchEndY = e.changedTouches[0].clientY;
                    const diffX = touchEndX - touchStartX;
                    const diffY = touchEndY - touchStartY;

                    // Trigger horizontal slide transition if horizontal swipe > 40px
                    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
                        if (diffX < 0) {
                            goToSlide(currentSlide + 1); // Swipe left -> Next slide
                        } else {
                            goToSlide(currentSlide - 1); // Swipe right -> Prev slide
                        }
                    }
                }
            }, { passive: true });
        }

        // Load PDF Document via PDF.js with in-memory base64 support for 100% offline & zero-CORS rendering
        if (typeof pdfjsLib !== 'undefined') {
            let pdfPromise = null;
            window.PDF_DATA_STORE = window.PDF_DATA_STORE || {};
            if (window.PERTEMUAN3_PDF_DATA) {
                window.PDF_DATA_STORE['BAB 1/pertemuan3.pdf'] = window.PERTEMUAN3_PDF_DATA;
            }

            const targetB64 = window.PDF_DATA_STORE[pdfUrl] || (pdfUrl.includes('pertemuan3.pdf') ? window.PERTEMUAN3_PDF_DATA : null);

            if (targetB64) {
                try {
                    const rawData = atob(targetB64);
                    const uint8Arr = new Uint8Array(rawData.length);
                    for (let i = 0; i < rawData.length; i++) {
                        uint8Arr[i] = rawData.charCodeAt(i);
                    }
                    pdfPromise = pdfjsLib.getDocument({ data: uint8Arr }).promise;
                } catch (e) {
                    console.warn("Base64 PDF decode error, falling back to URL fetch:", e);
                    pdfPromise = pdfjsLib.getDocument(encodedPdfUrl).promise;
                }
            } else {
                pdfPromise = pdfjsLib.getDocument(encodedPdfUrl).promise;
            }

            pdfPromise.then(pdfDoc => {
                pdfDocObj = pdfDoc;
                totalSlides = pdfDoc.numPages;
                if (fsTotal) fsTotal.textContent = totalSlides;

                if (dropdownElem) {
                    dropdownElem.innerHTML = Array.from({ length: totalSlides }, (_, i) => 
                        `<option value="${i}" ${i === currentSlide ? 'selected' : ''}>Slide ${i + 1} / ${totalSlides}</option>`
                    ).join('');
                }

                if (thumbsRibbon) {
                    thumbsRibbon.innerHTML = Array.from({ length: totalSlides }, (_, i) => `
                        <div class="ppt-thumb-item ${i === currentSlide ? 'active' : ''}" data-index="${i}" style="display:flex; align-items:center; justify-content:center; background:#1e293b; color:#ffffff; font-weight:bold; font-size:0.8rem; border-radius:6px; min-width:80px; cursor:pointer;">
                            <span>Slide ${i + 1}</span>
                        </div>
                    `).join('');

                    thumbsRibbon.querySelectorAll('.ppt-thumb-item').forEach(item => {
                        item.addEventListener('click', () => {
                            const idx = parseInt(item.getAttribute('data-index'), 10);
                            goToSlide(idx);
                        });
                    });
                }

                goToSlide(currentSlide);
            }).catch(err => {
                console.warn("PDF.js loading blocked or failed. Switching to browser embedded iframe viewer:", err);
                enableIframeFallback(currentSlide + 1);
            });
        } else {
            enableIframeFallback(currentSlide + 1);
        }

        const togglePlay = () => {
            if (isPlaying) {
                clearInterval(autoplayTimer);
                isPlaying = false;
                if (playText) playText.textContent = "Putar";
                if (playBtn) playBtn.classList.remove('playing');
            } else {
                isPlaying = true;
                if (playText) playText.textContent = "Jeda";
                if (playBtn) playBtn.classList.add('playing');
                autoplayTimer = setInterval(() => {
                    goToSlide(currentSlide + 1);
                }, 3500);
            }
        };

        if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
        if (playBtn) playBtn.addEventListener('click', togglePlay);

        if (fsPrevBtn) fsPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); goToSlide(currentSlide - 1); });
        if (fsNextBtn) fsNextBtn.addEventListener('click', (e) => { e.stopPropagation(); goToSlide(currentSlide + 1); });

        if (canvas) {
            canvas.addEventListener('click', () => {
                goToSlide(currentSlide + 1);
            });
        }

        if (dropdownElem) {
            dropdownElem.addEventListener('change', (e) => {
                goToSlide(parseInt(e.target.value, 10));
            });
        }

        if (fullBtn) {
            fullBtn.addEventListener('click', () => {
                const viewport = container.querySelector('#pdf-viewport-el');
                if (!document.fullscreenElement) {
                    if (viewport.requestFullscreen) viewport.requestFullscreen();
                    else if (viewport.webkitRequestFullscreen) viewport.webkitRequestFullscreen();
                } else {
                    if (document.exitFullscreen) document.exitFullscreen();
                }
            });
        }
    },

    /* SIMULATOR 3: SPESIALISASI SEL & TRANSPOR MEMBRAN (DIFUSI & OSMOSIS) */
    initCellSpecializationSim(container) {
        container.innerHTML = `
            <div class="cell-spec-sim-wrapper" style="width:100%; height:100%; display:flex; flex-direction:column; gap:0.75rem; padding:0.5rem; box-sizing:border-box;">
                <!-- NAVIGATION TABS -->
                <div class="cell-spec-tabs" style="display:flex; gap:0.5rem; background:rgba(15, 23, 42, 0.8); padding:0.4rem; border-radius:10px; border:1px solid rgba(255,255,255,0.1);">
                    <button class="spec-tab-btn active" data-tab="tab-spec">🔬 Spesialisasi Sel</button>
                    <button class="spec-tab-btn" data-tab="tab-osmosis">💧 Lab Simulasi Osmosis & Difusi</button>
                    <button class="spec-tab-btn" data-tab="tab-quiz">✍️ Kuis Kolaborasi Kelompok</button>
                </div>

                <!-- TAB CONTENT PANELS -->
                <div class="cell-spec-tab-contents" style="flex:1; position:relative; overflow-y:auto; background:#090d16; border-radius:12px; border:1px solid rgba(255,255,255,0.12); padding:1rem;">
                    <!-- TAB 1: SPESIALISASI SEL -->
                    <div id="tab-spec" class="spec-tab-panel active">
                        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:1rem;">
                            <div class="spec-cell-card card-interactive" data-cell="eritrosit">
                                <div style="font-size:2rem; margin-bottom:0.5rem;">🔴</div>
                                <h4 style="color:#ef4444; margin:0 0 0.4rem 0;">Sel Darah Merah (Eritrosit)</h4>
                                <p style="font-size:0.8rem; color:#cbd5e1; margin:0;">Bentuk bikonkav tanpa inti sel, memaksimalkan ruang untuk <strong>Hemoglobin</strong> dalam mengangkut $O_2$.</p>
                            </div>
                            <div class="spec-cell-card card-interactive" data-cell="neuron">
                                <div style="font-size:2rem; margin-bottom:0.5rem;">⚡</div>
                                <h4 style="color:#3b82f6; margin:0 0 0.4rem 0;">Sel Saraf (Neuron)</h4>
                                <p style="font-size:0.8rem; color:#cbd5e1; margin:0;">Memiliki akson & dendrit panjang untuk menghantarkan <strong>impuls listrik</strong> ke seluruh tubuh.</p>
                            </div>
                            <div class="spec-cell-card card-interactive" data-cell="stomata">
                                <div style="font-size:2rem; margin-bottom:0.5rem;">🍃</div>
                                <h4 style="color:#10b981; margin:0 0 0.4rem 0;">Stomata & Sel Penjaga</h4>
                                <p style="font-size:0.8rem; color:#cbd5e1; margin:0;">Pori-pori daun yang mengontrol pertukaran gas ($CO_2$/$O_2$) dan transpirasi air.</p>
                            </div>
                            <div class="spec-cell-card card-interactive" data-cell="akar">
                                <div style="font-size:2rem; margin-bottom:0.5rem;">🌱</div>
                                <h4 style="color:#f59e0b; margin:0 0 0.4rem 0;">Sel Bulu Akar</h4>
                                <p style="font-size:0.8rem; color:#cbd5e1; margin:0;">Pelonggaran epidermis akar untuk memperluas bidang penyerapan air dan hara tanah.</p>
                            </div>
                            <div class="spec-cell-card card-interactive" data-cell="otot">
                                <div style="font-size:2rem; margin-bottom:0.5rem;">💪</div>
                                <h4 style="color:#ec4899; margin:0 0 0.4rem 0;">Sel Otot (Miofibril)</h4>
                                <p style="font-size:0.8rem; color:#cbd5e1; margin:0;">Kaya akan aktin & miosin yang memungkinkan kontraksi dan relaksasi gerakan.</p>
                            </div>
                            <div class="spec-cell-card card-interactive" data-cell="xilem">
                                <div style="font-size:2rem; margin-bottom:0.5rem;">🪵</div>
                                <h4 style="color:#8b5cf6; margin:0 0 0.4rem 0;">Xilem & Floem</h4>
                                <p style="font-size:0.8rem; color:#cbd5e1; margin:0;">Xilem mengangkut air dari akar; Floem edarkan hasil fotosintesis dari daun.</p>
                            </div>
                        </div>

                        <!-- DETAIL BOX -->
                        <div id="spec-detail-box" style="margin-top:1rem; padding:1rem; background:rgba(15,23,42,0.9); border-radius:10px; border:1px solid var(--color-bio-sel); display:none;">
                            <h4 id="spec-detail-title" style="margin:0 0 0.5rem 0; color:var(--color-bio-sel);">Pilih Salah Satu Sel di Atas</h4>
                            <p id="spec-detail-desc" style="font-size:0.85rem; color:#e2e8f0; margin:0;"></p>
                        </div>
                    </div>

                    <!-- TAB 2: SIMULASI OSMOSIS & DIFUSI -->
                    <div id="tab-osmosis" class="spec-tab-panel" style="display:none;">
                        <div style="display:grid; grid-template-columns: 260px 1fr; gap:1rem; height:100%;">
                            <!-- CONTROLS -->
                            <div style="background:rgba(15,23,42,0.8); padding:1rem; border-radius:10px; border:1px solid rgba(255,255,255,0.1); display:flex; flex-direction:column; gap:0.8rem;">
                                <div>
                                    <label style="font-size:0.8rem; color:#94a3b8; font-weight:bold; display:block; margin-bottom:0.4rem;">1. Jenis Sel Target:</label>
                                    <select id="osmosis-cell-type" class="ppt-dropdown" style="width:100%;">
                                        <option value="plant">🌿 Sel Tumbuhan (Punya Dinding Sel)</option>
                                        <option value="animal">🐾 Sel Hewan (Membran Sel)</option>
                                    </select>
                                </div>

                                <div>
                                    <label style="font-size:0.8rem; color:#94a3b8; font-weight:bold; display:block; margin-bottom:0.4rem;">2. Konsentrasi Larutan Luar:</label>
                                    <select id="osmosis-sol-type" class="ppt-dropdown" style="width:100%;">
                                        <option value="hypo">💧 Hipotonik (Air Murni / Encer)</option>
                                        <option value="iso">⚖️ Isotonik (Normal / Seimbang)</option>
                                        <option value="hyper">🧂 Hipertonik (Air Garam Pekat)</option>
                                    </select>
                                </div>

                                <div id="osmosis-status-box" style="padding:0.8rem; background:rgba(16,185,129,0.15); border:1px solid #10b981; border-radius:8px; font-size:0.8rem; color:#ffffff; margin-top:auto;">
                                    <strong>Efek Osmosis:</strong>
                                    <p id="osmosis-status-text" style="margin:0.3rem 0 0 0; color:#34d399;">Air masuk ke dalam sel. Sel tumbuhan menjadi Turgid (Kaku & Segar).</p>
                                </div>
                            </div>

                            <!-- LIVE CANVAS ANIMATOR -->
                            <div style="position:relative; background:#020617; border-radius:10px; border:1px solid rgba(255,255,255,0.1); overflow:hidden; display:flex; align-items:center; justify-content:center;">
                                <canvas id="osmosis-anim-canvas" width="500" height="320" style="width:100%; height:100%;"></canvas>
                            </div>
                        </div>
                    </div>

                    <!-- TAB 3: KUIS KOLABORASI KELOMPOK -->
                    <div id="tab-quiz" class="spec-tab-panel" style="display:none;">
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
                            <!-- KELOMPOK 1 -->
                            <div style="background:rgba(15,23,42,0.8); padding:1rem; border-radius:10px; border:1px solid rgba(16,185,129,0.3);">
                                <h4 style="color:#10b981; margin:0 0 0.8rem 0; display:flex; align-items:center; justify-between;">
                                    <span>👥 Kelompok 1 — Lembar Uji</span>
                                    <span id="score-g1" style="font-size:0.8rem; background:#065f46; padding:2px 8px; border-radius:12px;">Skor: 0</span>
                                </h4>
                                <div style="display:flex; flex-direction:column; gap:0.6rem; font-size:0.8rem;">
                                    <div>
                                        <p style="margin:0 0 0.3rem 0;">1. Sel yang tidak memiliki inti sel dan berfungsi mengangkut oksigen adalah ...</p>
                                        <input type="text" id="q1-g1" placeholder="Jawaban kelompok 1..." style="width:100%; padding:0.4rem; border-radius:6px; background:#1e293b; border:1px solid #334155; color:#fff;" />
                                    </div>
                                    <div>
                                        <p style="margin:0 0 0.3rem 0;">2. Perpindahan molekul air melintasi membran semipermeabel disebut ...</p>
                                        <input type="text" id="q2-g1" placeholder="Jawaban kelompok 1..." style="width:100%; padding:0.4rem; border-radius:6px; background:#1e293b; border:1px solid #334155; color:#fff;" />
                                    </div>
                                    <button id="btn-check-g1" class="btn-primary ripple" style="margin-top:0.5rem; padding:0.4rem;">Periksa Kelompok 1</button>
                                </div>
                            </div>

                            <!-- KELOMPOK 2 -->
                            <div style="background:rgba(15,23,42,0.8); padding:1rem; border-radius:10px; border:1px solid rgba(59,130,246,0.3);">
                                <h4 style="color:#3b82f6; margin:0 0 0.8rem 0; display:flex; align-items:center; justify-between;">
                                    <span>👥 Kelompok 2 — Lembar Uji</span>
                                    <span id="score-g2" style="font-size:0.8rem; background:#1e40af; padding:2px 8px; border-radius:12px;">Skor: 0</span>
                                </h4>
                                <div style="display:flex; flex-direction:column; gap:0.6rem; font-size:0.8rem;">
                                    <div>
                                        <p style="margin:0 0 0.3rem 0;">1. Pori-pori pada permukaan daun yang mengatur pertukaran gas dinamakan ...</p>
                                        <input type="text" id="q1-g2" placeholder="Jawaban kelompok 2..." style="width:100%; padding:0.4rem; border-radius:6px; background:#1e293b; border:1px solid #334155; color:#fff;" />
                                    </div>
                                    <div>
                                        <p style="margin:0 0 0.3rem 0;">2. Peristiwa mengkerutnya sel hewan di dalam larutan garam hipertonik disebut ...</p>
                                        <input type="text" id="q2-g2" placeholder="Jawaban kelompok 2..." style="width:100%; padding:0.4rem; border-radius:6px; background:#1e293b; border:1px solid #334155; color:#fff;" />
                                    </div>
                                    <button id="btn-check-g2" class="btn-primary ripple" style="margin-top:0.5rem; padding:0.4rem; background:linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);">Periksa Kelompok 2</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        lucide.createIcons();

        // TAB SWITCHING LOGIC
        const tabBtns = container.querySelectorAll('.spec-tab-btn');
        const tabPanels = container.querySelectorAll('.spec-tab-panel');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                AudioSynth.playClick();
                const targetTab = btn.getAttribute('data-tab');
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanels.forEach(p => p.style.display = 'none');
                btn.classList.add('active');
                const activePanel = container.querySelector('#' + targetTab);
                if (activePanel) activePanel.style.display = 'block';
            });
        });

        // CELL CARDS INTERACTION
        const cellCards = container.querySelectorAll('.spec-cell-card');
        const detailBox = container.querySelector('#spec-detail-box');
        const detailTitle = container.querySelector('#spec-detail-title');
        const detailDesc = container.querySelector('#spec-detail-desc');

        const cellDetails = {
            eritrosit: { title: "🔴 Sel Darah Merah (Eritrosit)", desc: "Adaptasi Khusus: Berbentuk bikonkav dan tidak memiliki inti sel pada saat dewasa. Hal ini memberikan ruang maksimal bagi molekul Hemoglobin untuk mengikat Oksigen ($O_2$) secara optimal dari paru-paru ke seluruh sel jaringan tubuh." },
            neuron: { title: "⚡ Sel Saraf (Neuron)", desc: "Adaptasi Khusus: Memiliki juluran sitoplasma berupa Dendrit (menerima sinyal) dan Akson panjang (mengirimkan impuls). Memungkinkan komunikasi cepat antar otak, sumsum tulang belakang, dan organ tubuh." },
            stomata: { title: "🍃 Stomata & Sel Penjaga", desc: "Adaptasi Khusus: Sepasang sel penjaga berbentuk ginjal yang membuka dan menutup celah pori stomata berdasarkan tekanan turgor sel. Berfungsi penting untuk pertukaran gas $CO_2$ (fotosintesis) & $O_2$ (respirasi) serta penguapan air (transpirasi)." },
            akar: { title: "🌱 Sel Bulu Akar", desc: "Adaptasi Khusus: Sel epidermis akar yang membentuk juluran panjang seperti rambut halus. Memperluas area permukaan kontak dengan tanah secara signifikan untuk memaksimalkan penyerapan air dan garam mineral." },
            otot: { title: "💪 Sel Otot (Muskel)", desc: "Adaptasi Khusus: Mengandung serat protein khusus (aktin dan miosin) serta kaya akan Mitokondria. Mampu berkontraksi (memendek) dan relaksasi (memanjang) untuk menghasilkan gerakan mekanis tubuh." },
            xilem: { title: "🪵 Pembuluh Xilem & Floem", desc: "Adaptasi Khusus: Xilem tersusun dari sel-sel mati berdinding tebal berkayu (lignin) yang membentuk pipa kontinyu mengangkut air dan mineral dari akar ke daun. Floem terdiri dari sel hidup berdinding tapis mengedarkan gula hasil fotosintesis ke seluruh bagian tumbuhan." }
        };

        cellCards.forEach(card => {
            card.addEventListener('click', () => {
                AudioSynth.playClick();
                const cellType = card.getAttribute('data-cell');
                const info = cellDetails[cellType];
                if (info && detailBox) {
                    detailTitle.innerHTML = info.title;
                    detailDesc.innerHTML = info.desc;
                    detailBox.style.display = 'block';
                    if (window.MathJax) MathJax.typesetPromise([detailDesc]);
                }
            });
        });

        // OSMOSIS SIMULATOR ANIMATION CANVAS
        const osmCanvas = container.querySelector('#osmosis-anim-canvas');
        const cellTypeSelect = container.querySelector('#osmosis-cell-type');
        const solTypeSelect = container.querySelector('#osmosis-sol-type');
        const statusText = container.querySelector('#osmosis-status-text');

        if (osmCanvas) {
            const ctx = osmCanvas.getContext('2d');
            let animId = null;
            let time = 0;

            const updateStatus = () => {
                const cType = cellTypeSelect.value;
                const sType = solTypeSelect.value;

                if (cType === 'plant') {
                    if (sType === 'hypo') statusText.innerText = "💧 Air masuk ke dalam sel. Tekanan turgor meningkat, sel tumbuhan menjadi TURGID (Kaku & Segar).";
                    else if (sType === 'iso') statusText.innerText = "⚖️ Konsentrasi seimbang. Sel dalam kondisi flaksid (normal).";
                    else statusText.innerText = "🧂 Air keluar dari sel. Membran sel terlepas dari dinding sel (PLASMOLISIS).";
                } else {
                    if (sType === 'hypo') statusText.innerText = "💧 Air terus masuk ke dalam sel hewan. Sel menggembung dan PECAH (HEMOLISIS / LISIS).";
                    else if (sType === 'iso') statusText.innerText = "⚖️ Konsentrasi air seimbang. Sel hewan dalam kondisi normal.";
                    else statusText.innerText = "🧂 Air keluar dari sel hewan. Sel mengkerut dan keriput (KRENASI).";
                }
            };

            const drawOsmosis = () => {
                ctx.clearRect(0, 0, osmCanvas.width, osmCanvas.height);
                time += 0.05;

                const cType = cellTypeSelect ? cellTypeSelect.value : 'plant';
                const sType = solTypeSelect ? solTypeSelect.value : 'hypo';
                const cx = osmCanvas.width / 2;
                const cy = osmCanvas.height / 2;

                // Environment Solution Background Color
                let solColor = 'rgba(14, 165, 233, 0.15)';
                if (sType === 'hyper') solColor = 'rgba(234, 179, 8, 0.25)';
                else if (sType === 'iso') solColor = 'rgba(59, 130, 246, 0.2)';
                ctx.fillStyle = solColor;
                ctx.fillRect(0, 0, osmCanvas.width, osmCanvas.height);

                // Draw Water / Solute Particles
                const particleCount = (sType === 'hyper') ? 40 : 20;
                for (let i = 0; i < particleCount; i++) {
                    const px = (cx - 180 + (i * 37 + time * 20) % 360);
                    const py = (cy - 100 + (i * 23 + Math.sin(time + i) * 15) % 200);
                    ctx.beginPath();
                    ctx.arc(px, py, (sType === 'hyper' && i % 2 === 0) ? 5 : 3, 0, Math.PI * 2);
                    ctx.fillStyle = (sType === 'hyper' && i % 2 === 0) ? 'rgba(234, 179, 8, 0.8)' : 'rgba(56, 189, 248, 0.8)';
                    ctx.fill();
                }

                // Cell Shape & Scale based on Osmosis Effect
                let cellRadiusX = 90;
                let cellRadiusY = 60;
                if (sType === 'hypo') { cellRadiusX = 110; cellRadiusY = 75; }
                else if (sType === 'hyper') { cellRadiusX = 70; cellRadiusY = 45; }

                ctx.save();
                ctx.translate(cx, cy);

                // Cell Wall (Plant Cell Only)
                if (cType === 'plant') {
                    ctx.strokeStyle = '#10b981';
                    ctx.lineWidth = 6;
                    ctx.strokeRect(-120, -85, 240, 170);
                }

                // Cell Membrane
                ctx.beginPath();
                ctx.ellipse(0, 0, cellRadiusX, cellRadiusY, 0, 0, Math.PI * 2);
                ctx.fillStyle = (cType === 'plant') ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)';
                ctx.fill();
                ctx.strokeStyle = (cType === 'plant') ? '#34d399' : '#f87171';
                ctx.lineWidth = 3;
                ctx.stroke();

                // Nucleus
                ctx.beginPath();
                ctx.arc(0, 0, 22, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(147, 51, 234, 0.8)';
                ctx.fill();
                ctx.restore();

                animId = requestAnimationFrame(drawOsmosis);
            };

            if (cellTypeSelect) cellTypeSelect.addEventListener('change', () => { updateStatus(); });
            if (solTypeSelect) solTypeSelect.addEventListener('change', () => { updateStatus(); });
            updateStatus();
            drawOsmosis();
        }

        // QUIZ COLLABORATION LOGIC
        const btnCheckG1 = container.querySelector('#btn-check-g1');
        const btnCheckG2 = container.querySelector('#btn-check-g2');

        if (btnCheckG1) {
            btnCheckG1.addEventListener('click', () => {
                const ans1 = (container.querySelector('#q1-g1').value || '').toLowerCase().trim();
                const ans2 = (container.querySelector('#q2-g1').value || '').toLowerCase().trim();
                let score = 0;

                if (ans1.includes('eritrosit') || ans1.includes('sel darah merah') || ans1.includes('darah merah')) score += 50;
                if (ans2.includes('osmosis') || ans2.includes('osmosiss')) score += 50;

                container.querySelector('#score-g1').innerText = `Skor: ${score}`;
                if (score === 100) {
                    AudioSynth.playCorrect();
                    alert("🎉 Selamat Kelompok 1! Semua jawaban BENAR (100 Poin)!");
                } else {
                    AudioSynth.playWrong();
                    alert(`Skor Kelompok 1: ${score}/100. Periksa kembali jawabanmu!`);
                }
            });
        }

        if (btnCheckG2) {
            btnCheckG2.addEventListener('click', () => {
                const ans1 = (container.querySelector('#q1-g2').value || '').toLowerCase().trim();
                const ans2 = (container.querySelector('#q2-g2').value || '').toLowerCase().trim();
                let score = 0;

                if (ans1.includes('stomata') || ans1.includes('sel penjaga') || ans1.includes('stoma')) score += 50;
                if (ans2.includes('krenasi') || ans2.includes('crenation') || ans2.includes('mengerut')) score += 50;

                container.querySelector('#score-g2').innerText = `Skor: ${score}`;
                if (score === 100) {
                    AudioSynth.playCorrect();
                    alert("🎉 Selamat Kelompok 2! Semua jawaban BENAR (100 Poin)!");
                } else {
                    AudioSynth.playWrong();
                    alert(`Skor Kelompok 2: ${score}/100. Periksa kembali jawabanmu!`);
                }
            });
        }
    },

    /* SIMULATOR 1: CELL STRUCTURE */
    initCellSimulator(container) {
        container.innerHTML = `
            <div class="cell-simulator">
                <div class="cell-toggle-btn">
                    <button class="btn-toggle-sub active" id="btn-cell-plant">🌿 Sel Tumbuhan (3D)</button>
                    <button class="btn-toggle-sub" id="btn-cell-animal">🐾 Sel Hewan</button>
                </div>
                <div class="cell-display-area" id="cell-svg-container">
                    <!-- Content loaded dynamically -->
                </div>
                <div class="organelle-desc-box" id="cell-desc-box">
                    <h5>Arahkan kursor ke organel sel</h5>
                    <p>Klik atau sorot bagian berwarna pada gambar sel untuk melihat fungsi organel tersebut.</p>
                </div>
            </div>
        `;

        const renderCellSvg = (type) => {
            const isPlant = type === 'plant';
            const containerSvg = document.getElementById('cell-svg-container');
            const descBox = document.getElementById('cell-desc-box');

            if (isPlant) {
                // Show Sketchfab 3D Plant Cell embed
                descBox.style.display = 'none';
                containerSvg.style.height = '340px';
                containerSvg.innerHTML = `
                    <div style="width:100%;height:100%;border-radius:var(--radius-md);overflow:hidden;background:#0a0d16;">
                        <iframe
                            title="Sel Tumbuhan"
                            frameborder="0"
                            allowfullscreen
                            mozallowfullscreen="true"
                            webkitallowfullscreen="true"
                            allow="autoplay; fullscreen; xr-spatial-tracking"
                            xr-spatial-tracking
                            execution-while-out-of-viewport
                            execution-while-not-rendered
                            web-share
                            src="https://sketchfab.com/models/8694bdda0afc4886b005da10fefae8ad/embed?autospin=1&autostart=1&ui_theme=dark"
                            style="width:100%;height:100%;border:none;border-radius:var(--radius-md);"
                        ></iframe>
                    </div>
                    <p style="font-size:11px;color:var(--text-muted);text-align:center;margin-top:4px;">
                        Model 3D <a href="https://sketchfab.com/3d-models/sel-tumbuhan-8694bdda0afc4886b005da10fefae8ad" target="_blank" rel="nofollow" style="color:#1CAAD9;font-weight:600;">Sel Tumbuhan</a> oleh Astari28 di Sketchfab — Putar & Zoom bebas!
                    </p>
                `;
            } else {
                // Show Sketchfab 3D Animal Cell embed
                descBox.style.display = 'none';
                containerSvg.style.height = '340px';
                containerSvg.innerHTML = `
                    <div style="width:100%;height:100%;border-radius:var(--radius-md);overflow:hidden;background:#0a0d16;">
                        <iframe
                            title="Sel Hewan"
                            frameborder="0"
                            allowfullscreen
                            mozallowfullscreen="true"
                            webkitallowfullscreen="true"
                            allow="autoplay; fullscreen; xr-spatial-tracking"
                            xr-spatial-tracking
                            execution-while-out-of-viewport
                            execution-while-not-rendered
                            web-share
                            src="https://sketchfab.com/models/a1084f376880435d8dbd314ff4ec1caa/embed?autospin=1&autostart=1&ui_theme=dark"
                            style="width:100%;height:100%;border:none;border-radius:var(--radius-md);"
                        ></iframe>
                    </div>
                    <p style="font-size:11px;color:var(--text-muted);text-align:center;margin-top:4px;">
                        Model 3D <a href="https://sketchfab.com/3d-models/sel-hewan-a1084f376880435d8dbd314ff4ec1caa" target="_blank" rel="nofollow" style="color:#1CAAD9;font-weight:600;">Sel Hewan</a> oleh YohanAurinoBrianPatria di Sketchfab — Putar &amp; Zoom bebas!
                    </p>
                `;
            }
        };

        // Default: show 3D plant cell on load
        renderCellSvg('plant');

        const btnPlant = document.getElementById('btn-cell-plant');
        const btnAnimal = document.getElementById('btn-cell-animal');

        btnPlant.addEventListener('click', () => {
            AudioSynth.playClick();
            btnPlant.classList.add('active');
            btnAnimal.classList.remove('active');
            renderCellSvg('plant');
        });

        btnAnimal.addEventListener('click', () => {
            AudioSynth.playClick();
            btnAnimal.classList.add('active');
            btnPlant.classList.remove('active');
            renderCellSvg('animal');
        });
    },

    /* SIMULATOR 2: HUMAN ORGANS */
    initOrganSimulator(container) {
        container.innerHTML = `
            <div class="organ-simulator">
                <div class="organ-interactive-view">
                    <!-- Silhouette SVG of human torso -->
                    <svg viewBox="0 0 100 120" style="height:90%; max-height:260px;" class="body-silhouette">
                        <path d="M 50,10 C 53,10 56,12 55,18 C 54,23 58,26 62,28 C 66,32 68,38 68,44 L 68,75 C 68,85 64,115 50,115 C 36,115 32,85 32,75 L 32,44 C 32,38 34,32 38,28 C 42,26 46,23 45,18 C 44,12 47,10 50,10 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
                    </svg>

                    <!-- Organ Hotspot Markers -->
                    <!-- 1. Mouth/Saliva -->
                    <div class="organ-marker" style="top: 15%; left: 50%;" data-name="Mulut (Sistem Pencernaan)" data-desc="Pencernaan mekanis dengan gigi dan kimiawi dengan enzim amilase (ptialin) untuk merubah zat pati menjadi gula."></div>
                    <!-- 2. Lungs -->
                    <div class="organ-marker" style="top: 36%; left: 42%;" data-name="Paru-Paru (Sistem Pernapasan)" data-desc="Tempat pertukaran gas pernapasan. Di dalam alveolus, oksigen diikat oleh hemoglobin darah dan karbon dioksida dilepaskan ke udara hembusan."></div>
                    <!-- 3. Heart -->
                    <div class="organ-marker" style="top: 38%; left: 52%;" data-name="Jantung (Sistem Peredaran Darah)" data-desc="Pompa otot yang memompa darah beroksigen dari paru-paru ke seluruh sel tubuh (sirkulasi sistemik) dan mengirim darah kotor kembali ke paru-paru (sirkulasi pulmonal)."></div>
                    <!-- 4. Stomach -->
                    <div class="organ-marker" style="top: 55%; left: 45%;" data-name="Lambung (Sistem Pencernaan)" data-desc="Mengaduk makanan dan merendamnya dalam Asam Lambung (HCl) untuk membunuh kuman. Enzim pepsin memecah protein menjadi pepton."></div>
                    <!-- 5. Kidneys -->
                    <div class="organ-marker" style="top: 70%; left: 55%;" data-name="Ginjal (Sistem Ekskresi)" data-desc="Dua organ berbentuk kacang merah penyaring limbah urea dan racun dari darah. Menghasilkan urin yang dikirim ke kandung kemih."></div>
                </div>
                <div class="organelle-desc-box" id="organ-desc-box" style="position:relative; width:100%; border-radius:var(--radius-sm);">
                    <h5>Sentuh penanda organ merah berkedip</h5>
                    <p>Sorot penanda lingkaran di atas torso tubuh untuk melihat penamaan organ dan kontribusinya pada sistem biologis manusia.</p>
                </div>
            </div>
        `;

        container.querySelectorAll('.organ-marker').forEach(marker => {
            const showOrganInfo = () => {
                const name = marker.getAttribute('data-name');
                const desc = marker.getAttribute('data-desc');
                document.getElementById('organ-desc-box').innerHTML = `
                    <h5 style="color: var(--color-bio-tubuh); font-family: var(--font-display);">${name}</h5>
                    <p>${desc}</p>
                `;
            };
            
            marker.addEventListener('mouseover', showOrganInfo);
            marker.addEventListener('touchstart', (e) => {
                e.preventDefault();
                AudioSynth.playClick();
                showOrganInfo();
            });
        });
    },

    /* SIMULATOR 3: LEVER PHYSICS */
    initLeverSimulator(container) {
        container.innerHTML = `
            <div class="lever-simulator">
                <div class="simulation-canvas-area">
                    <svg viewBox="0 0 200 100" class="physics-graphic" id="lever-svg">
                        <!-- Fulcrum (Titik Tumpu) -->
                        <polygon points="100,75 92,90 108,90" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
                        <!-- Lever Plank (Papan Jungkat-jungkit) -->
                        <line x1="40" y1="75" x2="160" y2="75" stroke="#374151" stroke-width="6" stroke-linecap="round" id="lever-plank" />
                        
                        <!-- Load Weight Box (Beban) -->
                        <rect x="50" y="55" width="20" height="20" fill="#3b82f6" stroke="#2563eb" stroke-width="1" id="lever-load-box" />
                        <text x="60" y="68" fill="white" font-size="9" font-weight="700" text-anchor="middle" id="lever-load-txt">Beban</text>
                        
                        <!-- Force Arrow (Gaya Kuasa) -->
                        <g id="lever-force-arrow">
                            <line x1="140" y1="35" x2="140" y2="70" stroke="#ef4444" stroke-width="3" marker-end="url(#arrow)" />
                            <text x="140" y="30" fill="#ef4444" font-size="9" font-weight="700" text-anchor="middle">Gaya (F)</text>
                        </g>

                        <!-- SVG Marker for Arrow -->
                        <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                            </marker>
                        </defs>
                    </svg>
                </div>
                <div class="sim-controls-panel">
                    <div class="control-group">
                        <label>Beban ($W$): <span id="val-load" class="control-val">100 N</span></label>
                        <input type="range" id="input-load" min="50" max="250" value="100" />
                    </div>
                    <div class="control-group">
                        <label>Lengan Beban ($L_b$): <span id="val-lb" class="control-val">50 cm</span></label>
                        <input type="range" id="input-lb" min="20" max="90" value="50" />
                    </div>
                    <div class="control-group">
                        <label>Lengan Kuasa ($L_k$): <span id="val-lk" class="control-val">50 cm</span></label>
                        <input type="range" id="input-lk" min="20" max="90" value="50" />
                    </div>
                </div>
                <div class="organelle-desc-box" style="position:relative; width:100%; border-radius:var(--radius-sm);" id="lever-math-box">
                    <h5>Gaya Diperlukan: F = 100.0 Newton</h5>
                    <p>Keuntungan Mekanis (KM) = 1.00. (Usaha lebih mudah jika Lengan Kuasa lebih panjang daripada Lengan Beban).</p>
                </div>
            </div>
        `;

        const loadInput = document.getElementById('input-load');
        const lbInput = document.getElementById('input-lb');
        const lkInput = document.getElementById('input-lk');

        const updateLeverSim = () => {
            const W = parseFloat(loadInput.value);
            const Lb = parseFloat(lbInput.value);
            const Lk = parseFloat(lkInput.value);

            // Update label readouts
            document.getElementById('val-load').innerText = `${W} N`;
            document.getElementById('val-lb').innerText = `${Lb} cm`;
            document.getElementById('val-lk').innerText = `${Lk} cm`;

            // Calculate Required Force: F = W * Lb / Lk
            const F = (W * Lb) / Lk;
            const KM = Lk / Lb;

            // Render equations text
            document.getElementById('lever-math-box').innerHTML = `
                <h5 style="color: var(--color-phys-energi); font-family: var(--font-display);">Gaya Diperlukan: F = ${F.toFixed(1)} Newton</h5>
                <p>Keuntungan Mekanis (KM) = <strong>${KM.toFixed(2)}</strong>. (W * Lb = F * Lk → ${W} N * ${Lb} cm = ${F.toFixed(0)} N * ${Lk} cm).</p>
            `;

            if (window.MathJax) {
                MathJax.typesetPromise([document.getElementById('lever-math-box')]);
            }

            // Animate SVG elements based on values
            const fulcrumX = 100;
            const pxPerCm = 0.6; // Scale cm lengths to SVG coordinate space
            
            const plankLeft = fulcrumX - (Lb * pxPerCm);
            const plankRight = fulcrumX + (Lk * pxPerCm);

            const plank = document.getElementById('lever-plank');
            plank.setAttribute('x1', plankLeft);
            plank.setAttribute('x2', plankRight);

            const loadBox = document.getElementById('lever-load-box');
            const boxWidth = 14 + (W / 30); // box grows slightly with weight
            loadBox.setAttribute('x', plankLeft + 2);
            loadBox.setAttribute('y', 75 - boxWidth);
            loadBox.setAttribute('width', boxWidth);
            loadBox.setAttribute('height', boxWidth);

            const loadTxt = document.getElementById('lever-load-txt');
            loadTxt.setAttribute('x', plankLeft + 2 + (boxWidth/2));
            loadTxt.setAttribute('y', 75 - (boxWidth/2) + 3);

            const forceArrow = document.getElementById('lever-force-arrow');
            // Move force arrow to right edge of plank
            const arrowLine = forceArrow.querySelector('line');
            arrowLine.setAttribute('x1', plankRight - 2);
            arrowLine.setAttribute('x2', plankRight - 2);
            // Height of arrow matches required force scaled
            const arrowH = Math.min(20 + (F / 5), 55);
            arrowLine.setAttribute('y1', 75 - arrowH);
            arrowLine.setAttribute('y2', 71); // stop just above plank

            const forceTxt = forceArrow.querySelector('text');
            forceTxt.setAttribute('x', plankRight - 2);
            forceTxt.setAttribute('y', 75 - arrowH - 5);
        };

        // Bind sliders
        loadInput.addEventListener('input', updateLeverSim);
        lbInput.addEventListener('input', updateLeverSim);
        lkInput.addEventListener('input', updateLeverSim);

        updateLeverSim();
    },

    /* SIMULATOR 4: WAVE GENERATOR */
    initWaveSimulator(container) {
        container.innerHTML = `
            <div class="wave-simulator">
                <canvas class="wave-display-canvas" id="wave-canvas"></canvas>
                <div class="sim-controls-panel">
                    <div class="control-group">
                        <label>Amplitudo: <span id="val-wave-amp" class="control-val">40</span></label>
                        <input type="range" id="input-wave-amp" min="10" max="70" value="40" />
                    </div>
                    <div class="control-group">
                        <label>Frekuensi: <span id="val-wave-freq" class="control-val">0.02</span></label>
                        <input type="range" id="input-wave-freq" min="5" max="50" value="20" step="1" />
                    </div>
                </div>
            </div>
        `;

        const canvas = document.getElementById('wave-canvas');
        const canvasCtx = canvas.getContext('2d');
        
        // Resize canvas to parent viewport size
        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.clientWidth - 30; // padding offset
            canvas.height = 180;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const ampInput = document.getElementById('input-wave-amp');
        const freqInput = document.getElementById('input-wave-freq');

        ampInput.addEventListener('input', () => {
            this.waveState.amplitude = parseFloat(ampInput.value);
            document.getElementById('val-wave-amp').innerText = this.waveState.amplitude;
        });

        freqInput.addEventListener('input', () => {
            const raw = parseFloat(freqInput.value);
            this.waveState.frequency = raw / 1000;
            document.getElementById('val-wave-freq').innerText = this.waveState.frequency.toFixed(3);
        });

        // Wave animation rendering loop
        const drawWave = () => {
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw axis line
            canvasCtx.beginPath();
            canvasCtx.moveTo(0, canvas.height / 2);
            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            canvasCtx.lineWidth = 1;
            canvasCtx.stroke();

            // Draw Sine Wave
            canvasCtx.beginPath();
            canvasCtx.strokeStyle = 'var(--color-phys-gelombang)';
            canvasCtx.lineWidth = 3;
            canvasCtx.shadowColor = 'var(--color-phys-gelombang)';
            canvasCtx.shadowBlur = 10;

            const midY = canvas.height / 2;
            const amp = this.waveState.amplitude;
            const freq = this.waveState.frequency;
            
            for (let x = 0; x < canvas.width; x++) {
                // Sine wave equation: y = A * sin(k*x - omega*t)
                const y = midY + Math.sin(x * freq + this.waveState.phase) * amp;
                if (x === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }
            }
            canvasCtx.stroke();
            canvasCtx.shadowBlur = 0; // reset glow shadow

            // Animate phase offset to make it scroll
            this.waveState.phase -= 0.05;

            this.waveState.animId = requestAnimationFrame(drawWave);
        };

        drawWave();
    },

    /* SIMULATOR 5: CHEMISTRY MOLECULE BUILDER */
    initChemistrySimulator(container) {
        container.innerHTML = `
            <div class="chemistry-simulator">
                <div class="chemical-cards-grid">
                    <div class="chem-card active" data-mol="h2o">
                        <h5>Air ($H_2O$)</h5>
                        <p>Senyawa Hidrogen & Oksigen</p>
                    </div>
                    <div class="chem-card" data-mol="co2">
                        <h5>Karbondioksida ($CO_2$)</h5>
                        <p>Senyawa Karbon & Oksigen</p>
                    </div>
                    <div class="chem-card" data-mol="ch4">
                        <h5>Metana ($CH_4$)</h5>
                        <p>Senyawa Karbon & Hidrogen</p>
                    </div>
                    <div class="chem-card" data-mol="o2">
                        <h5>Oksigen ($O_2$)</h5>
                        <p>Molekul Unsur</p>
                    </div>
                </div>
                <div class="molecule-visualization" id="molecule-canvas-box">
                    <!-- Molecule graphic gets generated here -->
                </div>
            </div>
        `;

        if (window.MathJax) {
            MathJax.typesetPromise([container]);
        }

        const renderMolecule = (type) => {
            const box = document.getElementById('molecule-canvas-box');
            let svgHtml = '';

            if (type === 'h2o') {
                svgHtml = `
                    <svg viewBox="0 0 100 80" style="width: 75%; height: 75%; max-height: 180px;">
                        <!-- Bonds -->
                        <line x1="50" y1="40" x2="28" y2="55" stroke="rgba(255,255,255,0.4)" stroke-width="3" />
                        <line x1="50" y1="40" x2="72" y2="55" stroke="rgba(255,255,255,0.4)" stroke-width="3" />
                        <!-- Oxygen (O) Center -->
                        <circle cx="50" cy="40" r="14" fill="#ef4444" stroke="#dc2626" stroke-width="1.5" />
                        <text x="50" y="44" fill="white" font-size="12" font-weight="700" text-anchor="middle">O</text>
                        <!-- Hydrogens (H) -->
                        <circle cx="28" cy="55" r="9" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
                        <text x="28" y="58" fill="#1e293b" font-size="8" font-weight="700" text-anchor="middle">H</text>
                        <circle cx="72" cy="55" r="9" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
                        <text x="72" y="75" fill="var(--text-muted)" font-size="7" text-anchor="middle"></text>
                        <text x="72" y="58" fill="#1e293b" font-size="8" font-weight="700" text-anchor="middle">H</text>
                    </svg>
                `;
            } else if (type === 'co2') {
                svgHtml = `
                    <svg viewBox="0 0 100 80" style="width: 80%; height: 80%; max-height: 180px;">
                        <!-- Double Bonds -->
                        <!-- Left -->
                        <line x1="50" y1="38" x2="20" y2="38" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
                        <line x1="50" y1="42" x2="20" y2="42" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
                        <!-- Right -->
                        <line x1="50" y1="38" x2="80" y2="38" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
                        <line x1="50" y1="42" x2="80" y2="42" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
                        <!-- Carbon (C) Center -->
                        <circle cx="50" cy="40" r="14" fill="#374151" stroke="#1f2937" stroke-width="1.5" />
                        <text x="50" y="44" fill="white" font-size="12" font-weight="700" text-anchor="middle">C</text>
                        <!-- Oxygens (O) -->
                        <circle cx="20" cy="40" r="11" fill="#ef4444" stroke="#dc2626" stroke-width="1.5" />
                        <text x="20" y="44" fill="white" font-size="10" font-weight="700" text-anchor="middle">O</text>
                        <circle cx="80" cy="40" r="11" fill="#ef4444" stroke="#dc2626" stroke-width="1.5" />
                        <text x="80" y="44" fill="white" font-size="10" font-weight="700" text-anchor="middle">O</text>
                    </svg>
                `;
            } else if (type === 'ch4') {
                svgHtml = `
                    <svg viewBox="0 0 100 80" style="width: 80%; height: 80%; max-height: 180px;">
                        <!-- Bonds -->
                        <line x1="50" y1="40" x2="50" y2="18" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" />
                        <line x1="50" y1="40" x2="50" y2="62" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" />
                        <line x1="50" y1="40" x2="22" y2="40" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" />
                        <line x1="50" y1="40" x2="78" y2="40" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" />
                        <!-- Carbon (C) Center -->
                        <circle cx="50" cy="40" r="13" fill="#374151" stroke="#1f2937" stroke-width="1.5" />
                        <text x="50" y="44" fill="white" font-size="11" font-weight="700" text-anchor="middle">C</text>
                        <!-- Hydrogens -->
                        <circle cx="50" cy="18" r="8" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
                        <text x="50" y="21" fill="#1e293b" font-size="8" font-weight="700" text-anchor="middle">H</text>
                        <circle cx="50" cy="62" r="8" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
                        <text x="50" y="65" fill="#1e293b" font-size="8" font-weight="700" text-anchor="middle">H</text>
                        <circle cx="22" cy="40" r="8" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
                        <text x="22" y="43" fill="#1e293b" font-size="8" font-weight="700" text-anchor="middle">H</text>
                        <circle cx="78" cy="40" r="8" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
                        <text x="78" y="43" fill="#1e293b" font-size="8" font-weight="700" text-anchor="middle">H</text>
                    </svg>
                `;
            } else if (type === 'o2') {
                svgHtml = `
                    <svg viewBox="0 0 100 80" style="width: 80%; height: 80%; max-height: 180px;">
                        <!-- Double Bond between O=O -->
                        <line x1="35" y1="37" x2="65" y2="37" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
                        <line x1="35" y1="43" x2="65" y2="43" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
                        <!-- Oxygen 1 -->
                        <circle cx="35" cy="40" r="13" fill="#ef4444" stroke="#dc2626" stroke-width="1.5" />
                        <text x="35" y="44" fill="white" font-size="11" font-weight="700" text-anchor="middle">O</text>
                        <!-- Oxygen 2 -->
                        <circle cx="65" cy="40" r="13" fill="#ef4444" stroke="#dc2626" stroke-width="1.5" />
                        <text x="65" y="44" fill="white" font-size="11" font-weight="700" text-anchor="middle">O</text>
                    </svg>
                `;
            }

            box.innerHTML = svgHtml;
        };

        renderMolecule('h2o');

        container.querySelectorAll('.chem-card').forEach(card => {
            card.addEventListener('click', () => {
                AudioSynth.playClick();
                container.querySelectorAll('.chem-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                
                const type = card.getAttribute('data-mol');
                renderMolecule(type);
            });
        });
    },

    /* SIMULATOR 6: EARTH STRUCTURE LAYERS */
    initEarthSimulator(container) {
        container.innerHTML = `
            <div class="earth-simulator">
                <div class="earth-layers-visual">
                    <!-- Layer 1: Crust -->
                    <div class="earth-layer layer-crust" data-name="Kerak Bumi (Crust)" data-depth="5 - 70 km" data-temp="Up to 900°C" data-comp="Silikat, Granit, Basalt" data-info="Lapisan paling tipis di mana benua dan samudra berada. Merupakan batu padat dingin tempat seluruh kehidupan berlindung.">
                        <!-- Layer 2: Mantle -->
                        <div class="earth-layer layer-mantle" data-name="Mantel Bumi (Mantle)" data-depth="~2.900 km" data-temp="1000°C - 3700°C" data-comp="Peridotit, Silikon, Magnesium" data-info="Lapisan tebal batuan silikat semi-cair kental panas. Arus konveksi magma terjadi di sini, menggerakkan lempeng tektonik.">
                            <!-- Layer 3: Outer Core -->
                            <div class="earth-layer layer-outer-core" data-name="Inti Luar Bumi (Outer Core)" data-depth="2.900 - 5.150 km" data-temp="4000°C - 5000°C" data-comp="Besi Cair, Nikel Cair" data-info="Logam cair yang berputar lambat. Gerakan aliran besi cair di sini bertanggung jawab membangkitkan medan magnet bumi.">
                                <!-- Layer 4: Inner Core -->
                                <div class="earth-layer layer-inner-core" data-name="Inti Dalam Bumi (Inner Core)" data-depth="5.150 - 6.370 km" data-temp="~5400°C" data-comp="Besi Padat, Nikel Padat" data-info="Bola logam pekat padat bersuhu setara permukaan matahari. Tetap padat karena tekanan gravitasi bumi yang luar biasa."></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="organelle-desc-box" id="earth-desc-box" style="position:relative; width:100%; border-radius:var(--radius-sm);">
                    <h5>Klik lapisan Bumi untuk menganalisis</h5>
                    <p>Pilih salah satu lingkaran warna mewakili kerak, mantel, inti luar, atau inti dalam untuk meneliti data geologinya.</p>
                </div>
            </div>
        `;

        container.querySelectorAll('.earth-layer').forEach(layer => {
            const showLayerInfo = (e) => {
                e.stopPropagation(); // prevent nested click bubbling
                
                const name = layer.getAttribute('data-name');
                const depth = layer.getAttribute('data-depth');
                const temp = layer.getAttribute('data-temp');
                const comp = layer.getAttribute('data-comp');
                const info = layer.getAttribute('data-info');

                document.getElementById('earth-desc-box').innerHTML = `
                    <h5 style="color: var(--color-earth-bumi); font-family: var(--font-display);">${name}</h5>
                    <p style="font-size:0.8rem; color:#f59e0b; margin-bottom:0.35rem;">
                        <strong>Ketebalan:</strong> ${depth} | <strong>Suhu:</strong> ${temp} | <strong>Komposisi:</strong> ${comp}
                    </p>
                    <p>${info}</p>
                `;
            };

            layer.addEventListener('click', (e) => {
                AudioSynth.playClick();
                showLayerInfo(e);
            });

            layer.addEventListener('touchstart', (e) => {
                e.preventDefault();
                AudioSynth.playClick();
                showLayerInfo(e);
            });
        });
    },

    /* 5. QUIZ INTERACTION PANEL */
    initQuizPanel(container) {
        const chData = CHAPTERS_DATA[this.currentChapterId];
        const quiz = chData.quiz;
        let score = 0;
        let currentQIdx = 0;

        const renderQuestion = () => {
            const q = quiz[currentQIdx];
            container.innerHTML = `
                <div class="quiz-container">
                    <div class="quiz-question-header">
                        <span class="quiz-badge">Pertanyaan ${currentQIdx + 1} dari ${quiz.length}</span>
                        <span class="quiz-score-live">Skor Live: ${score}</span>
                    </div>
                    <div class="quiz-question-text">${q.question}</div>
                    <div class="quiz-options-list" id="quiz-options-box">
                        ${q.options.map((opt, idx) => `
                            <button class="quiz-option-btn" data-idx="${idx}">
                                <i data-lucide="circle" style="width: 16px; height: 16px;"></i>
                                <span>${opt}</span>
                            </button>
                        `).join('')}
                    </div>
                    <div class="quiz-feedback-box hidden" id="quiz-feedback-box">
                        <!-- feedback text -->
                    </div>
                </div>
            `;
            lucide.createIcons();

            // Bind Options
            const buttons = container.querySelectorAll('.quiz-option-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const chosenIdx = parseInt(btn.getAttribute('data-idx'));
                    handleAnswer(chosenIdx, btn, buttons);
                });
            });
        };

        const handleAnswer = (chosenIdx, clickedBtn, allButtons) => {
            const q = quiz[currentQIdx];
            const isCorrect = chosenIdx === q.answer;
            
            // Disable all buttons to freeze choice
            allButtons.forEach(btn => btn.disabled = true);

            // Show feedback
            const feedbackBox = document.getElementById('quiz-feedback-box');
            feedbackBox.classList.remove('hidden');

            if (isCorrect) {
                AudioSynth.playCorrect();
                score += 10;
                clickedBtn.classList.add('correct');
                clickedBtn.querySelector('i').setAttribute('data-lucide', 'check-circle-2');
                
                feedbackBox.className = "quiz-feedback-box correct-bg";
                feedbackBox.innerHTML = `
                    <h5 style="font-weight: 700; margin-bottom: 0.25rem;">Benar sekali! 🎉</h5>
                    <p>${q.explanation}</p>
                `;
            } else {
                AudioSynth.playWrong();
                clickedBtn.classList.add('wrong');
                clickedBtn.querySelector('i').setAttribute('data-lucide', 'x-circle');
                
                // Highlight the correct one in green
                allButtons[q.answer].classList.add('correct');
                allButtons[q.answer].querySelector('i').setAttribute('data-lucide', 'check-circle-2');

                feedbackBox.className = "quiz-feedback-box wrong-bg";
                feedbackBox.innerHTML = `
                    <h5 style="font-weight: 700; margin-bottom: 0.25rem;">Kurang Tepat! 😅</h5>
                    <p>${q.explanation}</p>
                `;
            }
            lucide.createIcons();

            // Add button to go to next question or complete
            const nextQBtn = document.createElement('button');
            nextQBtn.className = 'btn-primary ripple';
            nextQBtn.style.marginTop = '1rem';
            nextQBtn.style.alignSelf = 'flex-end';
            
            const isLastQuestion = currentQIdx === quiz.length - 1;
            nextQBtn.innerHTML = `
                <span>${isLastQuestion ? 'Lihat Hasil' : 'Pertanyaan Berikutnya'}</span>
                <i data-lucide="${isLastQuestion ? 'award' : 'arrow-right'}"></i>
            `;
            
            feedbackBox.appendChild(nextQBtn);
            lucide.createIcons();

            nextQBtn.addEventListener('click', () => {
                AudioSynth.playClick();
                if (isLastQuestion) {
                    showCompleteScreen();
                } else {
                    currentQIdx++;
                    renderQuestion();
                }
            });
        };

        const showCompleteScreen = () => {
            const maxScore = quiz.length * 10;
            const percentage = (score / maxScore) * 100;
            const perfectScore = score === maxScore;
            
            // Save scores to stats
            App.stats.quizScores[App.currentChapterId] = score;

            // Badge rewards logic
            const badgeAdded = perfectScore && !App.stats.unlockedBadges.includes(chData.badgeName);
            if (badgeAdded) {
                App.stats.unlockedBadges.push(chData.badgeName);
                AudioSynth.playTriumph();
            }

            container.innerHTML = `
                <div class="quiz-complete-card">
                    <i data-lucide="trophy" class="quiz-complete-icon"></i>
                    <h3 style="font-family:var(--font-display); font-size:1.6rem; font-weight:700;">Kuis Selesai!</h3>
                    <p style="color:var(--text-secondary); max-width: 300px;">Kamu berhasil menyelesaikan evaluasi bab dengan baik.</p>
                    
                    <div style="font-size:2.2rem; font-family:var(--font-display); font-weight:800; color:var(--slide-accent);">
                        ${score} / ${maxScore} <span style="font-size:1rem; color:var(--text-muted); font-weight:300;">Poin</span>
                    </div>

                    ${badgeAdded ? `
                        <div class="quiz-badge-award">
                            <span class="quiz-badge-icon">${chData.badgeIcon}</span>
                            <span class="quiz-badge-name">${chData.badgeName}</span>
                            <span style="font-size:0.7rem; color:var(--text-secondary);">Unlocked! Sempurna.</span>
                        </div>
                    ` : perfectScore ? `
                        <div style="font-size:0.8rem; color:#10b981; font-weight:600;">Lencana ${chData.badgeIcon} sudah dikoleksi sebelumnya.</div>
                    ` : `
                        <p style="font-size:0.8rem; color:var(--text-muted);">Jawab benar semua pertanyaan untuk mendapatkan Badge Lencana Kehormatan Bab!</p>
                    `}

                    <div class="quiz-actions" style="margin-top:1rem;">
                        <button class="btn-nav" id="btn-quiz-retry"><i data-lucide="rotate-ccw"></i> Coba Kuis Lagi</button>
                    </div>
                </div>
            `;
            lucide.createIcons();

            document.getElementById('btn-quiz-retry').addEventListener('click', () => {
                AudioSynth.playClick();
                score = 0;
                currentQIdx = 0;
                renderQuestion();
            });
        };

        renderQuestion();
    },

    // Stat tracking calculations
    updateDashboardStats() {
        const keys = Object.keys(CHAPTERS_DATA);
        
        // Progress percentage calculation
        const completedCount = Object.keys(this.stats.completedChapters).filter(k => this.stats.completedChapters[k]).length;
        const progressPercent = Math.round((completedCount / keys.length) * 100);
        document.getElementById('stat-progress').innerText = `${progressPercent}%`;

        // Total score calculation
        let totalScore = 0;
        Object.keys(this.stats.quizScores).forEach(k => {
            totalScore += this.stats.quizScores[k];
        });
        document.getElementById('stat-score').innerText = totalScore;

        // Badge count update
        const badgeCount = this.stats.unlockedBadges.length;
        document.getElementById('stat-badges').innerText = `${badgeCount}/6`;
    },

    /* PAPAN TULIS INTERAKTIF LKPD TP.1 (2 KELOMPOK) */
    initInteractiveWhiteboardTP1(container) {
        if (!this.whiteboardState) {
            this.whiteboardState = {
                group1: {}, // qId: true (locked)
                group2: {}
            };
        }
        if (!this.whiteboardInputs) {
            this.whiteboardInputs = {
                group1: {}, // qId: saved input value
                group2: {}
            };
        }
        if (!this.whiteboardActiveQ) {
            this.whiteboardActiveQ = {
                group1: 1,
                group2: 1
            };
        }
        if (!this.whiteboardExpanded) {
            this.whiteboardExpanded = { group1: {}, group2: {} };
            for (let i = 1; i <= TP1_QUESTIONS.length; i++) {
                this.whiteboardExpanded.group1[i] = true;
                this.whiteboardExpanded.group2[i] = true;
            }
        }

        const wbState = this.whiteboardState;
        const wbInputs = this.whiteboardInputs;
        const wbExpanded = this.whiteboardExpanded;

        container.innerHTML = `
            <div class="wb-wrapper">
                <div class="wb-header-bar">
                    <div class="wb-group-badge g1">
                        <div class="wb-group-title"><i data-lucide="users"></i> Kelompok 1</div>
                        <div class="wb-bar-track"><div class="wb-bar-fill" id="wb-bar-g1" style="width:0%"></div></div>
                        <span class="wb-count-text" id="wb-txt-g1">0/25 Terkunci</span>
                    </div>

                    <div class="wb-center-title">
                        <i data-lucide="sparkles" class="icon-spin"></i>
                        <span>Papan Tulis Interaktif TP.1</span>
                        <button id="btn-show-guide-modal" class="btn-guide-toggle ripple" title="Buka Panduan Pengerjaan LKPD">
                            <i data-lucide="help-circle"></i>
                            <span>Panduan Pengerjaan</span>
                        </button>
                        <button id="btn-wb-fullscreen" class="btn-fs-wb ripple" title="Toggle Layar Penuh Papan Tulis">
                            <i data-lucide="maximize" id="wb-fs-icon"></i>
                            <span>Layar Penuh</span>
                        </button>
                        <button id="btn-open-pdf-top" class="btn-pdf-toggle ripple" title="Buka / Cetak Dokumen LKPD PDF">
                            <i data-lucide="file-text"></i>
                            <span>Cetak LKPD PDF</span>
                        </button>
                        <button id="btn-show-key-modal" class="btn-key-toggle ripple" title="Lihat Kunci Jawaban Guru">
                            <i data-lucide="key"></i>
                            <span>Kunci Jawaban</span>
                        </button>
                    </div>

                    <div class="wb-group-badge g2">
                        <div class="wb-group-title"><i data-lucide="users"></i> Kelompok 2</div>
                        <div class="wb-bar-track"><div class="wb-bar-fill" id="wb-bar-g2" style="width:0%"></div></div>
                        <span class="wb-count-text" id="wb-txt-g2">0/25 Terkunci</span>
                    </div>
                </div>

                <!-- Toast Alert Notification Container -->
                <div id="wb-toast-area" class="wb-toast-area"></div>

                <!-- Panduan Pengerjaan Modal -->
                <div id="wb-guide-modal" class="modal-overlay hidden">
                    <div class="modal-container card animate-zoom-in" style="max-width: 680px;">
                        <button id="btn-close-guide-modal" class="btn-close">&times;</button>
                        <div class="modal-header">
                            <i data-lucide="book-open" class="header-icon" style="color: #38bdf8;"></i>
                            <div>
                                <h3>Panduan Pengerjaan LKPD TP.1</h3>
                                <p>Petunjuk penggunaan Papan Tulis Interaktif untuk Kelompok 1 & 2</p>
                            </div>
                        </div>
                        <div class="modal-body" style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
                            <ol style="margin-left: 1.2rem; margin-bottom: 1rem; display:flex; flex-direction:column; gap:0.5rem;">
                                <li><strong>Cetak / Unduh LKPD Manual:</strong> Cetak atau unduh dokumen <strong>LKPD Manual TP.1 (PDF)</strong> terlebih dahulu untuk dibahas bersama tim.</li>
                                <li><strong>Kerjakan Bersama Kelompok:</strong> Diskusikan dan kerjakan 25 soal evaluasi konsep sel pada lembar fisik/manual.</li>
                                <li><strong>Input Jawaban:</strong> Salin dan masukkan jawaban kelompokmu menggunakan <strong>Keyboard Layar Interaktif</strong> masing-masing kelompok!</li>
                            </ol>
                            <div class="pdf-download-card" style="margin-bottom: 0.8rem;">
                                <div class="pdf-info">
                                    <i data-lucide="file-text" class="pdf-icon"></i>
                                    <div>
                                        <h4>Dokumen LKPD TP.1 (Konsep Sel)</h4>
                                        <p>Format PDF Siap Cetak • 25 Soal Evaluasi</p>
                                    </div>
                                </div>
                                <button id="btn-download-pdf-modal-guide" class="btn-pdf-download ripple">
                                    <i data-lucide="download"></i>
                                    <span>Buka / Unduh LKPD PDF</span>
                                </button>
                            </div>
                            <div class="highlight-box" style="--slide-accent: var(--color-bio-sel); margin-top: 0.8rem;">
                                <span>Fitur Papan Tulis Interaktif</span>
                                <ul style="margin-left: 1rem; margin-top: 0.4rem;">
                                    <li>🔒 <strong>Sistem Verifikasi:</strong> Jawaban yang benar akan otomatis <strong>TERKUNCI</strong>.</li>
                                    <li>⚠️ <strong>Umpan Balik Instan:</strong> Jawaban salah akan menampilkan notifikasi agar dapat diperbaiki.</li>
                                    <li>👥 <strong>Multi-Kelompok:</strong> Pengerjaan dibagi 2 kelompok dengan area scroll & keyboard independen.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Kunci Jawaban Modal -->
                <div id="wb-key-modal" class="modal-overlay hidden">
                    <div class="modal-container card animate-zoom-in" style="max-width: 750px;">
                        <button id="btn-close-key-modal" class="btn-close">&times;</button>
                        <div class="modal-header">
                            <i data-lucide="key" class="header-icon" style="color: #f59e0b;"></i>
                            <div>
                                <h3>Kunci Jawaban Guru (LKPD TP.1)</h3>
                                <p>Referensi jawaban 25 nomor soal untuk verifikasi pengerjaan kelompok</p>
                            </div>
                        </div>
                        <div class="modal-body" style="max-height: 60vh; overflow-y: auto;">
                            <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
                                <thead>
                                    <tr style="background: rgba(255,255,255,0.08); color: var(--text-primary); text-align: left;">
                                        <th style="padding: 8px;">No</th>
                                        <th style="padding: 8px;">Tipe</th>
                                        <th style="padding: 8px;">Kunci Jawaban Tepat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${TP1_QUESTIONS.map(q => {
                                        let keyStr = '';
                                        if (q.type === 'pg') keyStr = q.options[q.correct];
                                        else if (q.type === 'isian') keyStr = q.correctAnswers.join(' / ');
                                        else if (q.type === 'bs') keyStr = q.correct === 'B' ? 'Benar (B)' : 'Salah (S)';
                                        else if (q.type === 'pg_kompleks') keyStr = q.correct.join(', ');
                                        else if (q.type === 'jodoh') keyStr = `1-${q.correct[1]}, 2-${q.correct[2]}, 3-${q.correct[3]}, 4-${q.correct[4]}`;
                                        
                                        return `
                                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                                <td style="padding: 8px; font-weight: bold; color: var(--color-bio-sel);">#${q.id}</td>
                                                <td style="padding: 8px; color: var(--text-secondary);">${q.typeLabel}</td>
                                                <td style="padding: 8px; color: #38bdf8; font-weight: 600;">${keyStr}</td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="wb-columns-layout">
                    <!-- KELOMPOK 1 COLUMN -->
                    <div class="wb-group-column g1-theme">
                        <div class="wb-col-top">
                            <div style="display:flex; align-items:center; gap:0.5rem;">
                                <span class="wb-col-badge g1-bg">Kelompok 1</span>
                                <span class="wb-col-sub" id="kb-target-g1">Target Keyboard: Soal #1</span>
                            </div>
                            <button class="btn-kb-toggle ripple" id="btn-toggle-kb-g1" title="Sembunyikan/Tampilkan Keyboard Kelompok 1">
                                <i data-lucide="keyboard"></i>
                            </button>
                        </div>

                        <!-- WORDWALL NUMBER TILES GRID (1-25) -->
                        <div class="wb-tiles-grid" id="wb-tiles-g1"></div>

                        <!-- ACTIVE QUESTION VIEWER -->
                        <div class="wb-active-q-container" id="wb-active-q-g1"></div>

                        <!-- VIRTUAL KEYBOARD KELOMPOK 1 -->
                        <div class="wb-keyboard-panel g1-kb" id="kb-panel-g1">
                            <div class="kb-rows">
                                <div class="kb-row">
                                    <button class="kb-key key-opt" data-key="A">A</button>
                                    <button class="kb-key key-opt" data-key="B">B</button>
                                    <button class="kb-key key-opt" data-key="C">C</button>
                                    <button class="kb-key key-opt" data-key="D">D</button>
                                    <button class="kb-key key-opt" data-key="E">E</button>
                                    <button class="kb-key key-num" data-key="1">1</button>
                                    <button class="kb-key key-num" data-key="2">2</button>
                                    <button class="kb-key key-num" data-key="3">3</button>
                                    <button class="kb-key key-num" data-key="4">4</button>
                                    <button class="kb-key key-num" data-key="5">5</button>
                                </div>
                                <div class="kb-row">
                                    <button class="kb-key" data-key="Q">Q</button>
                                    <button class="kb-key" data-key="W">W</button>
                                    <button class="kb-key" data-key="E">E</button>
                                    <button class="kb-key" data-key="R">R</button>
                                    <button class="kb-key" data-key="T">T</button>
                                    <button class="kb-key" data-key="Y">Y</button>
                                    <button class="kb-key" data-key="U">U</button>
                                    <button class="kb-key" data-key="I">I</button>
                                    <button class="kb-key" data-key="O">O</button>
                                    <button class="kb-key" data-key="P">P</button>
                                </div>
                                <div class="kb-row">
                                    <button class="kb-key" data-key="A">A</button>
                                    <button class="kb-key" data-key="S">S</button>
                                    <button class="kb-key" data-key="D">D</button>
                                    <button class="kb-key" data-key="F">F</button>
                                    <button class="kb-key" data-key="G">G</button>
                                    <button class="kb-key" data-key="H">H</button>
                                    <button class="kb-key" data-key="J">J</button>
                                    <button class="kb-key" data-key="K">K</button>
                                    <button class="kb-key" data-key="L">L</button>
                                    <button class="kb-key key-num" data-key="0">0</button>
                                </div>
                                <div class="kb-row">
                                    <button class="kb-key" data-key="Z">Z</button>
                                    <button class="kb-key" data-key="X">X</button>
                                    <button class="kb-key" data-key="C">C</button>
                                    <button class="kb-key" data-key="V">V</button>
                                    <button class="kb-key" data-key="B">B</button>
                                    <button class="kb-key" data-key="N">N</button>
                                    <button class="kb-key" data-key="M">M</button>
                                    <button class="kb-key key-action key-space" data-key="SPACE">Space</button>
                                    <button class="kb-key key-action key-back" data-key="BACKSPACE">⌫</button>
                                    <button class="kb-key key-action key-send" data-key="SUBMIT">↵ Kirim</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- KELOMPOK 2 COLUMN -->
                    <div class="wb-group-column g2-theme">
                        <div class="wb-col-top">
                            <div style="display:flex; align-items:center; gap:0.5rem;">
                                <span class="wb-col-badge g2-bg">Kelompok 2</span>
                                <span class="wb-col-sub" id="kb-target-g2">Target Keyboard: Soal #1</span>
                            </div>
                            <button class="btn-kb-toggle ripple" id="btn-toggle-kb-g2" title="Sembunyikan/Tampilkan Keyboard Kelompok 2">
                                <i data-lucide="keyboard"></i>
                            </button>
                        </div>

                        <!-- WORDWALL NUMBER TILES GRID (1-25) -->
                        <div class="wb-tiles-grid" id="wb-tiles-g2"></div>

                        <!-- ACTIVE QUESTION VIEWER -->
                        <div class="wb-active-q-container" id="wb-active-q-g2"></div>

                        <!-- VIRTUAL KEYBOARD KELOMPOK 2 -->
                        <div class="wb-keyboard-panel g2-kb" id="kb-panel-g2">
                            <div class="kb-rows">
                                <div class="kb-row">
                                    <button class="kb-key key-opt" data-key="A">A</button>
                                    <button class="kb-key key-opt" data-key="B">B</button>
                                    <button class="kb-key key-opt" data-key="C">C</button>
                                    <button class="kb-key key-opt" data-key="D">D</button>
                                    <button class="kb-key key-opt" data-key="E">E</button>
                                    <button class="kb-key key-num" data-key="1">1</button>
                                    <button class="kb-key key-num" data-key="2">2</button>
                                    <button class="kb-key key-num" data-key="3">3</button>
                                    <button class="kb-key key-num" data-key="4">4</button>
                                    <button class="kb-key key-num" data-key="5">5</button>
                                </div>
                                <div class="kb-row">
                                    <button class="kb-key" data-key="Q">Q</button>
                                    <button class="kb-key" data-key="W">W</button>
                                    <button class="kb-key" data-key="E">E</button>
                                    <button class="kb-key" data-key="R">R</button>
                                    <button class="kb-key" data-key="T">T</button>
                                    <button class="kb-key" data-key="Y">Y</button>
                                    <button class="kb-key" data-key="U">U</button>
                                    <button class="kb-key" data-key="I">I</button>
                                    <button class="kb-key" data-key="O">O</button>
                                    <button class="kb-key" data-key="P">P</button>
                                </div>
                                <div class="kb-row">
                                    <button class="kb-key" data-key="A">A</button>
                                    <button class="kb-key" data-key="S">S</button>
                                    <button class="kb-key" data-key="D">D</button>
                                    <button class="kb-key" data-key="F">F</button>
                                    <button class="kb-key" data-key="G">G</button>
                                    <button class="kb-key" data-key="H">H</button>
                                    <button class="kb-key" data-key="J">J</button>
                                    <button class="kb-key" data-key="K">K</button>
                                    <button class="kb-key" data-key="L">L</button>
                                    <button class="kb-key key-num" data-key="0">0</button>
                                </div>
                                <div class="kb-row">
                                    <button class="kb-key" data-key="Z">Z</button>
                                    <button class="kb-key" data-key="X">X</button>
                                    <button class="kb-key" data-key="C">C</button>
                                    <button class="kb-key" data-key="V">V</button>
                                    <button class="kb-key" data-key="B">B</button>
                                    <button class="kb-key" data-key="N">N</button>
                                    <button class="kb-key" data-key="M">M</button>
                                    <button class="kb-key key-action key-space" data-key="SPACE">Space</button>
                                    <button class="kb-key key-action key-back" data-key="BACKSPACE">⌫</button>
                                    <button class="kb-key key-action key-send" data-key="SUBMIT">↵ Kirim</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        lucide.createIcons();

        // 1. FULLSCREEN TOGGLE LISTENER FOR BOARD
        const btnWbFs = document.getElementById('btn-wb-fullscreen');
        if (btnWbFs) {
            btnWbFs.addEventListener('click', () => {
                AudioSynth.playClick();
                const wbWrapper = document.querySelector('.wb-wrapper');
                if (wbWrapper) {
                    wbWrapper.classList.toggle('wb-fullscreen');
                    const isFs = wbWrapper.classList.contains('wb-fullscreen');
                    const icon = document.getElementById('wb-fs-icon');
                    if (icon) icon.setAttribute('data-lucide', isFs ? 'minimize' : 'maximize');
                    const span = btnWbFs.querySelector('span');
                    if (span) span.textContent = isFs ? 'Keluar Penuh' : 'Layar Penuh';
                    lucide.createIcons();
                }
                FullscreenController.toggle();
            });
        }

        // 2. TOGGLE KEYBOARD PANELS
        const btnToggleKbG1 = document.getElementById('btn-toggle-kb-g1');
        if (btnToggleKbG1) {
            btnToggleKbG1.addEventListener('click', () => {
                AudioSynth.playClick();
                const panel = document.getElementById('kb-panel-g1');
                if (panel) panel.classList.toggle('hidden');
            });
        }
        const btnToggleKbG2 = document.getElementById('btn-toggle-kb-g2');
        if (btnToggleKbG2) {
            btnToggleKbG2.addEventListener('click', () => {
                AudioSynth.playClick();
                const panel = document.getElementById('kb-panel-g2');
                if (panel) panel.classList.toggle('hidden');
            });
        }

        const updateGroupProgress = () => {
            const countG1 = Object.keys(wbState.group1).filter(k => wbState.group1[k]).length;
            const countG2 = Object.keys(wbState.group2).filter(k => wbState.group2[k]).length;
            
            const pctG1 = Math.round((countG1 / TP1_QUESTIONS.length) * 100);
            const pctG2 = Math.round((countG2 / TP1_QUESTIONS.length) * 100);

            const bar1 = document.getElementById('wb-bar-g1');
            const txt1 = document.getElementById('wb-txt-g1');
            if (bar1 && txt1) {
                bar1.style.width = `${pctG1}%`;
                txt1.innerText = `${countG1}/25 Terkunci`;
            }

            const bar2 = document.getElementById('wb-bar-g2');
            const txt2 = document.getElementById('wb-txt-g2');
            if (bar2 && txt2) {
                bar2.style.width = `${pctG2}%`;
                txt2.innerText = `${countG2}/25 Terkunci`;
            }
        };

        const tileColors = [
            '#0284c7', '#ef4444', '#f97316', '#16a34a',
            '#a855f7', '#2563eb', '#06b6d4', '#ea580c',
            '#3b82f6', '#ec4899', '#10b981', '#f59e0b',
            '#6366f1', '#d97706', '#0284c7', '#ef4444',
            '#f97316', '#16a34a', '#a855f7', '#2563eb',
            '#06b6d4', '#ea580c', '#3b82f6', '#ec4899', '#10b981'
        ];

        const renderGroupView = (groupKey) => {
            const tilesEl = document.getElementById(groupKey === 'group1' ? 'wb-tiles-g1' : 'wb-tiles-g2');
            const activeQBoxEl = document.getElementById(groupKey === 'group1' ? 'wb-active-q-g1' : 'wb-active-q-g2');
            if (!tilesEl || !activeQBoxEl) return;

            const currentActiveId = this.whiteboardActiveQ[groupKey] || 1;

            // 1. Render 25 Wordwall-Style Number Tiles
            tilesEl.innerHTML = TP1_QUESTIONS.map((q, idx) => {
                const isLocked = !!wbState[groupKey][q.id];
                const isSelected = (q.id === currentActiveId);
                const color = tileColors[idx % tileColors.length];

                return `
                    <button class="wb-tile ${isLocked ? 'is-locked' : ''} ${isSelected ? 'is-selected' : ''}" 
                            style="${!isLocked ? `background: ${color};` : ''}"
                            data-qid="${q.id}"
                            title="Soal #${q.id} [${q.typeLabel}] ${isLocked ? '(Terkunci)' : ''}">
                        ${q.id}
                    </button>
                `;
            }).join('');

            // Attach click listener for tiles
            tilesEl.querySelectorAll('.wb-tile').forEach(tileBtn => {
                tileBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    AudioSynth.playClick();
                    const qId = parseInt(tileBtn.getAttribute('data-qid'));
                    this.whiteboardActiveQ[groupKey] = qId;
                    renderGroupView(groupKey);
                    
                    const inputEl = document.getElementById(`input-${groupKey}-${qId}`);
                    if (inputEl) inputEl.focus();
                });
            });

            // 2. Render Active Question Details Card
            const q = TP1_QUESTIONS.find(item => item.id === currentActiveId);
            const isLocked = !!wbState[groupKey][q.id];
            const savedVal = wbInputs[groupKey][q.id] !== undefined ? wbInputs[groupKey][q.id] : '';

            let optionsHTML = '';
            if (q.type === 'pg') {
                optionsHTML = `
                    <div class="wb-q-options-grid">
                        ${q.options.map((opt, idx) => {
                            const letter = String.fromCharCode(65 + idx);
                            const isChoiceSelected = (savedVal.toUpperCase() === letter);
                            return `
                                <button class="wb-option-card ${isChoiceSelected ? 'is-selected' : ''} ${isLocked ? 'is-disabled' : ''}" data-letter="${letter}">
                                    <span class="opt-letter">${letter}</span>
                                    <span class="opt-text">${opt}</span>
                                </button>
                            `;
                        }).join('')}
                    </div>
                `;
            } else if (q.type === 'pg_kompleks') {
                optionsHTML = `
                    <div class="wb-q-options-grid">
                        ${q.options.map(opt => `
                            <div class="wb-option-card" style="cursor:default;">
                                <span class="opt-letter">${opt.id}</span>
                                <span class="opt-text">${opt.text}</span>
                            </div>
                        `).join('')}
                    </div>
                    <p style="font-size:0.72rem; color:var(--text-muted); margin-top:0.3rem;">💡 Ketik gabungan huruf opsi pilihanmu (misalnya: <strong>ABD</strong>)</p>
                `;
            } else if (q.type === 'jodoh') {
                optionsHTML = `
                    <div class="wb-matching-grid">
                        <div class="match-col">
                            <strong style="color:var(--text-muted); font-size:0.75rem; margin-bottom:0.2rem; display:block;">Pernyataan:</strong>
                            ${q.leftItems.map(l => `<div class="match-item">${l.label}</div>`).join('')}
                        </div>
                        <div class="match-col">
                            <strong style="color:var(--text-muted); font-size:0.75rem; margin-bottom:0.2rem; display:block;">Pasangan:</strong>
                            ${q.rightItems.map(r => `<div class="match-item">${r.label}</div>`).join('')}
                        </div>
                    </div>
                    <p style="font-size:0.72rem; color:var(--text-muted); margin-top:0.3rem;">💡 Ketik urutan huruf pasangan (misalnya: <strong>bcda</strong>)</p>
                `;
            }

            let placeholderText = '';
            if (q.type === 'pg') placeholderText = 'Ketik A / B / C / D atau klik opsi di atas...';
            else if (q.type === 'isian') placeholderText = 'Ketik jawaban isian singkat...';
            else if (q.type === 'bs') placeholderText = 'Ketik B (Benar) / S (Salah)...';
            else if (q.type === 'pg_kompleks') placeholderText = 'Gabungan huruf opsi (misal: ABD)...';
            else if (q.type === 'jodoh') placeholderText = 'Urutan huruf pasangan (misal: bcda)...';

            activeQBoxEl.innerHTML = `
                <div class="wb-q-active-card card ${isLocked ? 'is-locked-card' : ''}">
                    <div class="wb-q-card-header">
                        <div style="display:flex; align-items:center; gap:0.4rem;">
                            <span class="wb-q-num-badge">Soal #${q.id}</span>
                            <span class="wb-q-tag">${q.typeLabel}</span>
                        </div>
                        ${isLocked ? `
                            <span class="wb-status-locked-tag"><i data-lucide="lock" style="width:13px; height:13px;"></i> TERKUNCI</span>
                        ` : `
                            <span class="wb-status-open-tag"><i data-lucide="edit-3" style="width:13px; height:13px;"></i> Terbuka</span>
                        `}
                    </div>

                    <div class="wb-q-text-body">
                        ${q.text}
                    </div>

                    ${optionsHTML}

                    <div class="wb-q-card-footer">
                        ${isLocked ? `
                            <div class="wb-locked-banner-compact" style="width:100%; justify-content:center; padding:0.5rem; background:rgba(16,185,129,0.2);">
                                <i data-lucide="check-circle-2" style="width:16px; height:16px;"></i>
                                <span>JAWABAN BENAR & TERKUNCI</span>
                            </div>
                        ` : `
                            <div class="wb-ans-input-wrapper">
                                <input type="text" id="input-${groupKey}-${q.id}" class="wb-text-field-sm is-active-input" placeholder="${placeholderText}" value="${savedVal}" readonly inputmode="none" autocomplete="off">
                                <button class="btn-wb-submit-sm ripple" id="btn-submit-${groupKey}-${q.id}" title="Kirim Jawaban Soal #${q.id}">
                                    <span>Kirim</span>
                                    <i data-lucide="send"></i>
                                </button>
                            </div>
                        `}

                        <div class="wb-card-nav-row">
                            <button class="btn-card-nav" id="btn-prev-q-${groupKey}" ${q.id === 1 ? 'disabled' : ''}>
                                <i data-lucide="chevron-left"></i> Soal #${q.id - 1}
                            </button>
                            <span style="font-size:0.75rem; color:var(--text-muted);">Nomor ${q.id} dari ${TP1_QUESTIONS.length}</span>
                            <button class="btn-card-nav" id="btn-next-q-${groupKey}" ${q.id === 25 ? 'disabled' : ''}>
                                Soal #${q.id + 1} <i data-lucide="chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;

            lucide.createIcons();

            // Event listener for input box changes
            if (!isLocked) {
                const inputEl = document.getElementById(`input-${groupKey}-${q.id}`);
                if (inputEl) {
                    inputEl.addEventListener('input', (e) => {
                        wbInputs[groupKey][q.id] = e.target.value;
                    });
                    inputEl.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            wbInputs[groupKey][q.id] = e.target.value;
                            this.verifyAnswer(groupKey, q, groupKey === 'group1' ? 'wb-scroll-g1' : 'wb-scroll-g2');
                        }
                    });
                }

                const submitBtn = document.getElementById(`btn-submit-${groupKey}-${q.id}`);
                if (submitBtn) {
                    submitBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.verifyAnswer(groupKey, q, groupKey === 'group1' ? 'wb-scroll-g1' : 'wb-scroll-g2');
                    });
                }

                // Option cards clicking (for PG)
                activeQBoxEl.querySelectorAll('.wb-option-card[data-letter]').forEach(optCard => {
                    optCard.addEventListener('click', () => {
                        AudioSynth.playClick();
                        const letter = optCard.getAttribute('data-letter');
                        wbInputs[groupKey][q.id] = letter;
                        if (inputEl) inputEl.value = letter;
                        activeQBoxEl.querySelectorAll('.wb-option-card[data-letter]').forEach(c => c.classList.remove('is-selected'));
                        optCard.classList.add('is-selected');
                    });
                });
            }

            // Prev / Next card navigation
            const prevBtn = document.getElementById(`btn-prev-q-${groupKey}`);
            const nextBtn = document.getElementById(`btn-next-q-${groupKey}`);

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    AudioSynth.playClick();
                    if (q.id > 1) {
                        this.whiteboardActiveQ[groupKey] = q.id - 1;
                        renderGroupView(groupKey);
                    }
                });
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    AudioSynth.playClick();
                    if (q.id < 25) {
                        this.whiteboardActiveQ[groupKey] = q.id + 1;
                        renderGroupView(groupKey);
                    }
                });
            }
        };

        // BIND VIRTUAL KEYBOARD HANDLERS FOR EACH GROUP
        const setupVirtualKeyboard = (groupKey) => {
            const kbPanel = document.getElementById(`kb-panel-${groupKey === 'group1' ? 'g1' : 'g2'}`);
            if (!kbPanel) return;

            const findActiveQId = () => {
                const activeId = this.whiteboardActiveQ[groupKey];
                if (activeId && !wbState[groupKey][activeId]) {
                    return activeId;
                }
                const firstUnlocked = TP1_QUESTIONS.find(q => !wbState[groupKey][q.id]);
                if (firstUnlocked) {
                    this.whiteboardActiveQ[groupKey] = firstUnlocked.id;
                    return firstUnlocked.id;
                }
                return activeId || 1;
            };

            const updateTargetLabel = () => {
                const qId = findActiveQId();
                const label = document.getElementById(`kb-target-${groupKey === 'group1' ? 'g1' : 'g2'}`);
                if (label) {
                    if (qId) label.innerText = `Target Keyboard: Soal #${qId}`;
                    else label.innerText = `Semua Soal Terkunci! 🎉`;
                }
            };

            updateTargetLabel();

            kbPanel.querySelectorAll('.kb-key').forEach(keyBtn => {
                keyBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    AudioSynth.playClick();

                    const qId = findActiveQId();
                    if (!qId) return;

                    const questionObj = TP1_QUESTIONS.find(q => q.id === qId);
                    const inputEl = document.getElementById(`input-${groupKey}-${qId}`);
                    const keyVal = keyBtn.getAttribute('data-key');
                    const scrollContainerId = groupKey === 'group1' ? 'wb-scroll-g1' : 'wb-scroll-g2';

                    if (keyVal === 'SUBMIT') {
                        if (inputEl) wbInputs[groupKey][qId] = inputEl.value;
                        this.verifyAnswer(groupKey, questionObj, scrollContainerId);
                    } else if (keyVal === 'BACKSPACE') {
                        let current = inputEl ? inputEl.value : (wbInputs[groupKey][qId] || '');
                        current = current.slice(0, -1);
                        if (inputEl) inputEl.value = current;
                        wbInputs[groupKey][qId] = current;

                        const activeQBoxEl = document.getElementById(groupKey === 'group1' ? 'wb-active-q-g1' : 'wb-active-q-g2');
                        if (activeQBoxEl) {
                            activeQBoxEl.querySelectorAll('.wb-option-card[data-letter]').forEach(c => {
                                if (c.getAttribute('data-letter') === current.toUpperCase()) c.classList.add('is-selected');
                                else c.classList.remove('is-selected');
                            });
                        }
                    } else if (keyVal === 'SPACE') {
                        let current = inputEl ? inputEl.value : (wbInputs[groupKey][qId] || '');
                        current += ' ';
                        if (inputEl) inputEl.value = current;
                        wbInputs[groupKey][qId] = current;
                    } else {
                        let current = inputEl ? inputEl.value : (wbInputs[groupKey][qId] || '');
                        if (questionObj && questionObj.type === 'pg') {
                            current = keyVal;
                        } else {
                            current += keyVal;
                        }
                        if (inputEl) inputEl.value = current;
                        wbInputs[groupKey][qId] = current;

                        const activeQBoxEl = document.getElementById(groupKey === 'group1' ? 'wb-active-q-g1' : 'wb-active-q-g2');
                        if (activeQBoxEl) {
                            activeQBoxEl.querySelectorAll('.wb-option-card[data-letter]').forEach(c => {
                                if (c.getAttribute('data-letter') === current.toUpperCase()) c.classList.add('is-selected');
                                else c.classList.remove('is-selected');
                            });
                        }
                    }

                    if (inputEl) {
                        inputEl.focus();
                    }
                });
            });
        };

        renderGroupView('group1');
        renderGroupView('group2');
        setupVirtualKeyboard('group1');
        setupVirtualKeyboard('group2');

        // Prevent touchmove events in group columns from scrolling adjacent elements or parent page
        container.querySelectorAll('.wb-group-column').forEach(col => {
            col.addEventListener('touchmove', (e) => {
                e.stopPropagation();
            }, { passive: true });
        });

        // Physical Keyboard Event Listener for IFP / PC
        if (!this._wbKeyHandlerBound) {
            this._wbKeyHandlerBound = true;
            window.addEventListener('keydown', (e) => {
                const activeSlide = this.currentSlide;
                if (!activeSlide || activeSlide.visualType !== 'interactive-whiteboard-tp1') return;

                if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') && !e.target.readOnly) return;

                const groupKey = 'group1';
                const qId = this.whiteboardActiveQ[groupKey] || 1;
                if (this.whiteboardState[groupKey][qId]) return;

                const questionObj = TP1_QUESTIONS.find(q => q.id === qId);
                const inputEl = document.getElementById(`input-${groupKey}-${qId}`);

                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.verifyAnswer(groupKey, questionObj, 'wb-scroll-g1');
                } else if (e.key === 'Backspace') {
                    e.preventDefault();
                    let cur = inputEl ? inputEl.value : (this.whiteboardInputs[groupKey][qId] || '');
                    cur = cur.slice(0, -1);
                    if (inputEl) inputEl.value = cur;
                    this.whiteboardInputs[groupKey][qId] = cur;
                } else if (e.key === ' ') {
                    e.preventDefault();
                    let cur = inputEl ? inputEl.value : (this.whiteboardInputs[groupKey][qId] || '');
                    cur += ' ';
                    if (inputEl) inputEl.value = cur;
                    this.whiteboardInputs[groupKey][qId] = cur;
                } else if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
                    e.preventDefault();
                    let cur = inputEl ? inputEl.value : (this.whiteboardInputs[groupKey][qId] || '');
                    if (questionObj && questionObj.type === 'pg') {
                        cur = e.key.toUpperCase();
                    } else {
                        cur += e.key;
                    }
                    if (inputEl) inputEl.value = cur;
                    this.whiteboardInputs[groupKey][qId] = cur;
                }
            });
        }

        updateGroupProgress();

        // Panduan Pengerjaan Modal Event Listeners
        const btnShowGuide = document.getElementById('btn-show-guide-modal');
        const btnCloseGuide = document.getElementById('btn-close-guide-modal');
        const modalGuide = document.getElementById('wb-guide-modal');

        if (btnShowGuide && modalGuide) {
            btnShowGuide.addEventListener('click', () => {
                AudioSynth.playClick();
                modalGuide.classList.remove('hidden');
            });
        }

        if (btnCloseGuide && modalGuide) {
            btnCloseGuide.addEventListener('click', () => {
                AudioSynth.playClick();
                modalGuide.classList.add('hidden');
            });
        }

        const btnGuidePdf = document.getElementById('btn-download-pdf-modal-guide');
        if (btnGuidePdf) {
            btnGuidePdf.addEventListener('click', () => {
                AudioSynth.playClick();
                if (modalGuide) modalGuide.classList.add('hidden');
                this.generateTP1PDF();
            });
        }

        // Kunci Jawaban Modal Event Listeners
        const btnShowKey = document.getElementById('btn-show-key-modal');
        const btnCloseKey = document.getElementById('btn-close-key-modal');
        const modalKey = document.getElementById('wb-key-modal');

        if (btnShowKey && modalKey) {
            btnShowKey.addEventListener('click', () => {
                AudioSynth.playClick();
                modalKey.classList.remove('hidden');
            });
        }

        if (btnCloseKey && modalKey) {
            btnCloseKey.addEventListener('click', () => {
                AudioSynth.playClick();
                modalKey.classList.add('hidden');
            });
        }
    },

    verifyAnswer(groupKey, question, scrollContainerId) {
        const q = question;
        const gName = groupKey === 'group1' ? 'Kelompok 1' : 'Kelompok 2';
        const inputEl = document.getElementById(`input-${groupKey}-${q.id}`);
        const rawVal = inputEl ? inputEl.value.trim() : (this.whiteboardInputs[groupKey][q.id] || '').trim();

        if (!rawVal) {
            this.showWhiteboardToast(`⚠️ ${gName}: Silakan ketik jawaban pada Soal #${q.id} terlebih dahulu!`, true);
            return;
        }

        let isCorrect = false;

        if (q.type === 'pg') {
            const expectedLetter = String.fromCharCode(65 + q.correct); // 0 -> 'A', 1 -> 'B', 2 -> 'C', 3 -> 'D'
            let userLetter = '';
            const standaloneMatch = rawVal.toUpperCase().match(/\b[A-D]\b/);
            if (standaloneMatch) {
                userLetter = standaloneMatch[0];
            } else {
                const allMatches = rawVal.toUpperCase().match(/[A-D]/g);
                userLetter = allMatches ? allMatches[allMatches.length - 1] : '';
            }
            isCorrect = (userLetter === expectedLetter);
        } else if (q.type === 'pg_kompleks') {
            const expectedStr = q.correct.slice().sort().join('');
            const matches = rawVal.toUpperCase().match(/[A-E]/g);
            const validOptions = q.options.map(o => o.id);
            const userLetters = matches ? matches.filter(m => validOptions.includes(m)) : [];
            const userStr = Array.from(new Set(userLetters)).sort().join('');
            isCorrect = (userStr === expectedStr);
        } else if (q.type === 'isian') {
            const norm = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
            const valNorm = norm(rawVal);
            isCorrect = q.correctAnswers.some(ans => {
                const cleanAns = norm(ans);
                return valNorm === cleanAns || valNorm.includes(cleanAns) || cleanAns.includes(valNorm);
            });
        } else if (q.type === 'bs') {
            const valLower = rawVal.toLowerCase();
            let userChoice = '';
            if (valLower.startsWith('b') || valLower.includes('benar')) userChoice = 'B';
            else if (valLower.startsWith('s') || valLower.includes('salah')) userChoice = 'S';
            else userChoice = rawVal.toUpperCase();
            isCorrect = (userChoice === q.correct);
        } else if (q.type === 'jodoh') {
            const expectedSeq = `${q.correct[1]}${q.correct[2]}${q.correct[3]}${q.correct[4]}`.toLowerCase();
            const matches = rawVal.toLowerCase().match(/[a-d]/g);
            const userSeq = matches ? matches.join('') : '';
            isCorrect = (userSeq === expectedSeq);
        }

        if (isCorrect) {
            AudioSynth.playTriumph();
            this.whiteboardState[groupKey][q.id] = true;

            // Calculate remaining unlocked questions
            const lockedCount = Object.keys(this.whiteboardState[groupKey]).filter(k => this.whiteboardState[groupKey][k]).length;
            const remainingCount = TP1_QUESTIONS.length - lockedCount;

            // Announce voice notification for correct answer
            let voiceMsg = '';
            if (remainingCount > 0) {
                voiceMsg = `${gName} benar! Tersisa ${remainingCount} soal lagi.`;
            } else {
                voiceMsg = `Luarrr biasa! ${gName} telah menyelesaikan seluruh 25 soal!`;
            }
            this.speakVoiceNotification(voiceMsg);

            // Auto-advance target question for virtual keyboard to next unlocked question
            const nextUnlocked = TP1_QUESTIONS.find(item => item.id > q.id && !this.whiteboardState[groupKey][item.id]) 
                              || TP1_QUESTIONS.find(item => !this.whiteboardState[groupKey][item.id]);
            if (nextUnlocked) {
                this.whiteboardActiveQ[groupKey] = nextUnlocked.id;
            }

            // Re-render question cards & update stats
            this.initInteractiveWhiteboardTP1(document.getElementById('viewport-content'));

            // Apresiasi Notifikasi Jawaban Benar
            const praises = [
                "🎉 HEBAT BANGET! Jawaban Sempurna!",
                "🌟 LUAR BIASA! Jawaban Tepat 100%!",
                "🏆 KERJA BAGUS! Pertahankan Semangat!",
                "✨ FANTASTIS! Jawaban Benar & Terkunci!",
                "👏 SANGAT BAGUS! Poin Berhasil Diraih!"
            ];
            const praiseText = praises[(q.id - 1) % praises.length];
            this.showWhiteboardToast(`${praiseText} (${gName} - Tersisa ${remainingCount} Soal)`, false);
        } else {
            AudioSynth.playWrong();
            const voiceMsg = `${gName} salah. Coba periksa kembali jawabannya.`;
            this.speakVoiceNotification(voiceMsg);

            this.showWhiteboardToast(`❌ Jawaban ${gName} untuk Soal #${q.id} belum tepat. Periksa kembali LKPD kalian!`, true);
        }
    },

    speakVoiceNotification(text) {
        if ('speechSynthesis' in window) {
            try {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'id-ID';
                utterance.rate = 1.0;
                utterance.pitch = 1.1;

                const voices = window.speechSynthesis.getVoices();
                const idVoice = voices.find(v => v.lang && (v.lang.includes('id') || v.lang.includes('ID')));
                if (idVoice) utterance.voice = idVoice;

                window.speechSynthesis.speak(utterance);
            } catch (err) {
                console.warn('SpeechSynthesis error:', err);
            }
        }
    },

    showWhiteboardToast(message, isError) {
        const area = document.getElementById('wb-toast-area');
        if (!area) return;

        const toast = document.createElement('div');
        toast.className = `wb-toast ${isError ? 'toast-error' : 'toast-success'} animate-toast`;
        toast.innerHTML = `
            <i data-lucide="${isError ? 'alert-triangle' : 'check-circle-2'}" class="toast-icon"></i>
            <span>${message}</span>
        `;
        area.appendChild(toast);
        lucide.createIcons();

        setTimeout(() => {
            toast.classList.add('toast-fadeout');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    },

    /* KUIS TABEL PERBANDINGAN SEL HEWAN & TUMBUHAN (SPLIT SCREEN LAYAR TERPISAH KELOMPOK 1 & 2) */
    initCellComparisonQuiz(container) {
        if (!this.cellQuizSelectionsGroup1) {
            this.cellQuizSelectionsGroup1 = {};
        }
        if (!this.cellQuizSelectionsGroup2) {
            this.cellQuizSelectionsGroup2 = {};
        }

        if (!this.cellQuizShuffledFunctions) {
            const rawFunctions = [
                { id: "f1", text: "Memberikan bentuk kaku & perlindungan mekanis luar sel" },
                { id: "f2", text: "Mengatur lalu lintas transpor zat keluar & masuk sel" },
                { id: "f3", text: "Pusat pengendali kegiatan sel & pembawa informasi genetik (DNA)" },
                { id: "f4", text: "Cairan sel tempat organel melayang & tempat reaksi metabolisme" },
                { id: "f5", text: "Pembangkit energi sel (respirasi selular menghasilkan ATP)" },
                { id: "f6", text: "Tempat fotosintesis mengubah cahaya matahari jadi glukosa" },
                { id: "f7", text: "Penyimpan cadangan makanan, air, & menjaga tekanan turgor" },
                { id: "f8", text: "Sintesis protein selular" },
                { id: "f9", text: "Transportasi zat, sintesis protein & lipid" },
                { id: "f10", text: "Pengemasan, pemrosesan, & sekresi produk selular" },
                { id: "f11", text: "Pencernaan intraselular & pembuangan bagian sel rusak" },
                { id: "f12", text: "Mengatur pembentukan spindel saat pembelahan sel" }
            ];
            for (let i = rawFunctions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [rawFunctions[i], rawFunctions[j]] = [rawFunctions[j], rawFunctions[i]];
            }
            this.cellQuizShuffledFunctions = rawFunctions;
        }

        const FUNCTIONS_LIST = this.cellQuizShuffledFunctions;

        const CELL_COMPARISON_DATA = [
            { id: 1, name: "Dinding Sel", icon: "shield", correctFuncId: "f1", funcText: "Memberikan bentuk kaku & perlindungan mekanis luar sel", hewan: "tidak_ada", tumbuhan: "ada", desc: "Dinding sel (mengandung selulosa) hanya ada pada sel tumbuhan untuk menyokong struktur kaku. Sel hewan tidak memiliki dinding sel." },
            { id: 2, name: "Membran Sel (Membran Plasma)", icon: "layers", correctFuncId: "f2", funcText: "Mengatur lalu lintas transpor zat keluar & masuk sel", hewan: "ada", tumbuhan: "ada", desc: "Kedua jenis sel memiliki membran sel sebagai selaput pemisah lingkungan dalam dan luar sel." },
            { id: 3, name: "Inti Sel (Nukleus)", icon: "disc", correctFuncId: "f3", funcText: "Pusat pengendali kegiatan sel & pembawa informasi genetik (DNA)", hewan: "ada", tumbuhan: "ada", desc: "Sebagai organisme eukariotik, sel hewan dan sel tumbuhan memiliki nukleus terbungkus membran inti." },
            { id: 4, name: "Sitoplasma", icon: "droplet", correctFuncId: "f4", funcText: "Cairan sel tempat organel melayang & tempat reaksi metabolisme", hewan: "ada", tumbuhan: "ada", desc: "Sitoplasma merupakan matriks cair tempat terjadinya berbagai aktivitas biokimia sel pada kedua sel." },
            { id: 5, name: "Mitokondria", icon: "zap", correctFuncId: "f5", funcText: "Pembangkit energi sel (respirasi selular menghasilkan ATP)", hewan: "ada", tumbuhan: "ada", desc: "Baik sel hewan maupun tumbuhan membutuhkan mitokondria untuk pembentukan energi selular." },
            { id: 6, name: "Kloroplas (Plastida)", icon: "sun", correctFuncId: "f6", funcText: "Tempat fotosintesis mengubah cahaya matahari jadi glukosa", hewan: "tidak_ada", tumbuhan: "ada", desc: "Hanya dimiliki tumbuhan (autotrof). Sel hewan tidak berfotosintesis sehingga tidak memiliki kloroplas." },
            { id: 7, name: "Vakuola Utama (Besar)", icon: "box", correctFuncId: "f7", funcText: "Penyimpan cadangan makanan, air, & menjaga tekanan turgor", hewan: "tidak_ada", tumbuhan: "ada", desc: "Tumbuhan memiliki vakuola tunggal berukuran sangat besar. Pada sel hewan, vakuola tidak ada (atau berukuran mikro/sementara)." },
            { id: 8, name: "Ribosom", icon: "cpu", correctFuncId: "f8", funcText: "Sintesis protein selular", hewan: "ada", tumbuhan: "ada", desc: "Sintesis protein terjadi di ribosom yang terdapat pada sel hewan dan tumbuhan." },
            { id: 9, name: "Retikulum Endoplasma (RE)", icon: "git-merge", correctFuncId: "f9", funcText: "Transportasi zat, sintesis protein & lipid", hewan: "ada", tumbuhan: "ada", desc: "Sistem membran RE terdapat pada kedua jenis sel." },
            { id: 10, name: "Badan Golgi / Diktiosom", icon: "package", correctFuncId: "f10", funcText: "Pengemasan, pemrosesan, & sekresi produk selular", hewan: "ada", tumbuhan: "ada", desc: "Kedua sel memiliki badan golgi (disebut diktiosom pada sel tumbuhan)." },
            { id: 11, name: "Lisosom", icon: "trash-2", correctFuncId: "f11", funcText: "Pencernaan intraselular & pembuangan bagian sel rusak", hewan: "ada", tumbuhan: "tidak_ada", desc: "Umumnya hanya ditemukan pada sel hewan untuk pencernaan enzimatis." },
            { id: 12, name: "Sentriol / Sentrosom", icon: "crosshair", correctFuncId: "f12", funcText: "Mengatur pembentukan spindel saat pembelahan sel", hewan: "ada", tumbuhan: "tidak_ada", desc: "Sentriol merupakan pembentuk spindel pembelahan khas pada sel hewan." }
        ];

        let cG1 = 0;
        let cG2 = 0;
        const totalPerGroup = 36; // 12 items * 3 dropdowns

        CELL_COMPARISON_DATA.forEach(item => {
            const userF1 = this.cellQuizSelectionsGroup1[`f_${item.id}`] || "";
            const userH1 = this.cellQuizSelectionsGroup1[`h_${item.id}`] || "";
            const userT1 = this.cellQuizSelectionsGroup1[`t_${item.id}`] || "";
            if (userF1 === item.correctFuncId) cG1++;
            if (userH1 === item.hewan) cG1++;
            if (userT1 === item.tumbuhan) cG1++;

            const userF2 = this.cellQuizSelectionsGroup2[`f_${item.id}`] || "";
            const userH2 = this.cellQuizSelectionsGroup2[`h_${item.id}`] || "";
            const userT2 = this.cellQuizSelectionsGroup2[`t_${item.id}`] || "";
            if (userF2 === item.correctFuncId) cG2++;
            if (userH2 === item.hewan) cG2++;
            if (userT2 === item.tumbuhan) cG2++;
        });

        container.innerHTML = `
            <div class="cell-quiz-wrapper" id="cell-quiz-wrapper-el">
                <div class="cell-quiz-header">
                    <div class="cell-quiz-title-box">
                        <div class="cell-quiz-icon-badge">
                            <i data-lucide="columns"></i>
                        </div>
                        <div>
                            <h3>Kuis Interaktif Kolaborasi (Layar Terpisah 2 Kelompok)</h3>
                            <p>Kelompok 1 (Kiri) & Kelompok 2 (Kanan) mengerjakan 12 Organel pada area scroll layar masing-masing</p>
                        </div>
                    </div>

                    <div class="group-score-bar">
                        <div class="group-score-pill g1" title="Skor Kelompok 1">
                            <i data-lucide="user-check"></i>
                            <span>Kelompok 1: <strong id="score-g1-num">${cG1} / ${totalPerGroup} Poin</strong></span>
                        </div>
                        <div class="group-score-pill g2" title="Skor Kelompok 2">
                            <i data-lucide="user-check"></i>
                            <span>Kelompok 2: <strong id="score-g2-num">${cG2} / ${totalPerGroup} Poin</strong></span>
                        </div>
                        <button id="btn-cell-quiz-fs" class="btn-fullscreen-cover ripple" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;" title="Layar Penuh Kuis">
                            <i data-lucide="maximize" id="cell-quiz-fs-icon"></i>
                            <span>Layar Penuh</span>
                        </button>
                        <button id="btn-cell-quiz-hint" class="cell-quiz-btn cell-quiz-btn-hint ripple" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;">
                            <i data-lucide="help-circle"></i>
                            <span>Kunci Jawaban</span>
                        </button>
                    </div>
                </div>

                <!-- SPLIT CONTAINER (2 INDEPENDENT SCROLLING COLUMNS) -->
                <div class="cell-quiz-split-container">
                    <!-- COLUMN KELOMPOK 1 -->
                    <div class="cell-quiz-group-column g1">
                        <div class="cell-quiz-column-header">
                            <div class="cell-quiz-column-title" style="color: #10b981;">
                                <i data-lucide="shield"></i>
                                <span>KELOMPOK 1</span>
                            </div>
                            <div style="display: flex; gap: 0.4rem;">
                                <button class="cell-quiz-btn cell-quiz-btn-check btn-check-g1 ripple" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">
                                    <i data-lucide="check-circle"></i> Periksa G1
                                </button>
                                <button class="cell-quiz-btn cell-quiz-btn-reset btn-reset-g1 ripple" style="padding: 0.35rem 0.6rem; font-size: 0.78rem;" title="Reset Kelompok 1">
                                    <i data-lucide="rotate-ccw"></i>
                                </button>
                            </div>
                        </div>

                        <!-- INDEPENDENT SCROLL AREA G1 -->
                        <div class="cell-quiz-group-scroll" id="wb-scroll-g1">
                            ${CELL_COMPARISON_DATA.map((item) => {
                                const selF = this.cellQuizSelectionsGroup1[`f_${item.id}`] || "";
                                const selH = this.cellQuizSelectionsGroup1[`h_${item.id}`] || "";
                                const selT = this.cellQuizSelectionsGroup1[`t_${item.id}`] || "";

                                const isFCorrect = selF === item.correctFuncId;
                                const isHCorrect = selH === item.hewan;
                                const isTCorrect = selT === item.tumbuhan;

                                const fClass = selF !== "" ? (isFCorrect ? "sel-correct" : "sel-wrong") : "";
                                const hClass = selH !== "" ? (isHCorrect ? "sel-correct" : "sel-wrong") : "";
                                const tClass = selT !== "" ? (isTCorrect ? "sel-correct" : "sel-wrong") : "";

                                return `
                                    <div class="cell-quiz-card">
                                        <div class="cell-quiz-card-header">
                                            <span class="cell-quiz-card-num">#${item.id}</span>
                                            <div class="cell-organelle-name">
                                                <div class="cell-organelle-icon"><i data-lucide="${item.icon}"></i></div>
                                                <span>${item.name}</span>
                                            </div>
                                        </div>
                                        <div class="cell-quiz-card-body">
                                            <div class="cell-quiz-field">
                                                <label>Fungsi Utama Sel:</label>
                                                ${isFCorrect ? `
                                                    <div class="cell-quiz-locked-badge" title="Jawaban Benar & Terkunci">
                                                        <i data-lucide="check-circle-2"></i>
                                                        <span>✔ Terkunci (Benar)</span>
                                                    </div>
                                                ` : `
                                                    <select class="cell-quiz-select ${fClass}" data-group="g1" data-key="f_${item.id}" data-correct="${item.correctFuncId}">
                                                        <option value="" ${selF === "" ? "selected" : ""}>-- Pilih Fungsi --</option>
                                                        ${FUNCTIONS_LIST.map(f => `<option value="${f.id}" ${selF === f.id ? "selected" : ""}>${f.text}</option>`).join('')}
                                                    </select>
                                                `}
                                            </div>
                                            <div class="cell-quiz-field-row">
                                                <div class="cell-quiz-field">
                                                    <label>Sel Hewan:</label>
                                                    ${isHCorrect ? `
                                                        <div class="cell-quiz-locked-badge" title="Jawaban Benar & Terkunci">
                                                            <i data-lucide="check-circle-2"></i>
                                                            <span>✔ Ada/Tidak</span>
                                                        </div>
                                                    ` : `
                                                        <select class="cell-quiz-select ${hClass}" data-group="g1" data-key="h_${item.id}" data-correct="${item.hewan}">
                                                            <option value="" ${selH === "" ? "selected" : ""}>-- Pilih --</option>
                                                            <option value="ada" ${selH === "ada" ? "selected" : ""}>Ada</option>
                                                            <option value="tidak_ada" ${selH === "tidak_ada" ? "selected" : ""}>Tidak Ada</option>
                                                        </select>
                                                    `}
                                                </div>
                                                <div class="cell-quiz-field">
                                                    <label>Sel Tumbuhan:</label>
                                                    ${isTCorrect ? `
                                                        <div class="cell-quiz-locked-badge" title="Jawaban Benar & Terkunci">
                                                            <i data-lucide="check-circle-2"></i>
                                                            <span>✔ Ada/Tidak</span>
                                                        </div>
                                                    ` : `
                                                        <select class="cell-quiz-select ${tClass}" data-group="g1" data-key="t_${item.id}" data-correct="${item.tumbuhan}">
                                                            <option value="" ${selT === "" ? "selected" : ""}>-- Pilih --</option>
                                                            <option value="ada" ${selT === "ada" ? "selected" : ""}>Ada</option>
                                                            <option value="tidak_ada" ${selT === "tidak_ada" ? "selected" : ""}>Tidak Ada</option>
                                                        </select>
                                                    `}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- COLUMN KELOMPOK 2 -->
                    <div class="cell-quiz-group-column g2">
                        <div class="cell-quiz-column-header">
                            <div class="cell-quiz-column-title" style="color: #06b6d4;">
                                <i data-lucide="box"></i>
                                <span>KELOMPOK 2</span>
                            </div>
                            <div style="display: flex; gap: 0.4rem;">
                                <button class="cell-quiz-btn cell-quiz-btn-check btn-check-g2 ripple" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">
                                    <i data-lucide="check-circle"></i> Periksa G2
                                </button>
                                <button class="cell-quiz-btn cell-quiz-btn-reset btn-reset-g2 ripple" style="padding: 0.35rem 0.6rem; font-size: 0.78rem;" title="Reset Kelompok 2">
                                    <i data-lucide="rotate-ccw"></i>
                                </button>
                            </div>
                        </div>

                        <!-- INDEPENDENT SCROLL AREA G2 -->
                        <div class="cell-quiz-group-scroll" id="wb-scroll-g2">
                            ${CELL_COMPARISON_DATA.map((item) => {
                                const selF = this.cellQuizSelectionsGroup2[`f_${item.id}`] || "";
                                const selH = this.cellQuizSelectionsGroup2[`h_${item.id}`] || "";
                                const selT = this.cellQuizSelectionsGroup2[`t_${item.id}`] || "";

                                const isFCorrect = selF === item.correctFuncId;
                                const isHCorrect = selH === item.hewan;
                                const isTCorrect = selT === item.tumbuhan;

                                const fClass = selF !== "" ? (isFCorrect ? "sel-correct" : "sel-wrong") : "";
                                const hClass = selH !== "" ? (isHCorrect ? "sel-correct" : "sel-wrong") : "";
                                const tClass = selT !== "" ? (isTCorrect ? "sel-correct" : "sel-wrong") : "";

                                return `
                                    <div class="cell-quiz-card">
                                        <div class="cell-quiz-card-header">
                                            <span class="cell-quiz-card-num">#${item.id}</span>
                                            <div class="cell-organelle-name">
                                                <div class="cell-organelle-icon"><i data-lucide="${item.icon}"></i></div>
                                                <span>${item.name}</span>
                                            </div>
                                        </div>
                                        <div class="cell-quiz-card-body">
                                            <div class="cell-quiz-field">
                                                <label>Fungsi Utama Sel:</label>
                                                ${isFCorrect ? `
                                                    <div class="cell-quiz-locked-badge" title="Jawaban Benar & Terkunci">
                                                        <i data-lucide="check-circle-2"></i>
                                                        <span>✔ Terkunci (Benar)</span>
                                                    </div>
                                                ` : `
                                                    <select class="cell-quiz-select ${fClass}" data-group="g2" data-key="f_${item.id}" data-correct="${item.correctFuncId}">
                                                        <option value="" ${selF === "" ? "selected" : ""}>-- Pilih Fungsi --</option>
                                                        ${FUNCTIONS_LIST.map(f => `<option value="${f.id}" ${selF === f.id ? "selected" : ""}>${f.text}</option>`).join('')}
                                                    </select>
                                                `}
                                            </div>
                                            <div class="cell-quiz-field-row">
                                                <div class="cell-quiz-field">
                                                    <label>Sel Hewan:</label>
                                                    ${isHCorrect ? `
                                                        <div class="cell-quiz-locked-badge" title="Jawaban Benar & Terkunci">
                                                            <i data-lucide="check-circle-2"></i>
                                                            <span>✔ Ada/Tidak</span>
                                                        </div>
                                                    ` : `
                                                        <select class="cell-quiz-select ${hClass}" data-group="g2" data-key="h_${item.id}" data-correct="${item.hewan}">
                                                            <option value="" ${selH === "" ? "selected" : ""}>-- Pilih --</option>
                                                            <option value="ada" ${selH === "ada" ? "selected" : ""}>Ada</option>
                                                            <option value="tidak_ada" ${selH === "tidak_ada" ? "selected" : ""}>Tidak Ada</option>
                                                        </select>
                                                    `}
                                                </div>
                                                <div class="cell-quiz-field">
                                                    <label>Sel Tumbuhan:</label>
                                                    ${isTCorrect ? `
                                                        <div class="cell-quiz-locked-badge" title="Jawaban Benar & Terkunci">
                                                            <i data-lucide="check-circle-2"></i>
                                                            <span>✔ Ada/Tidak</span>
                                                        </div>
                                                    ` : `
                                                        <select class="cell-quiz-select ${tClass}" data-group="g2" data-key="t_${item.id}" data-correct="${item.tumbuhan}">
                                                            <option value="" ${selT === "" ? "selected" : ""}>-- Pilih --</option>
                                                            <option value="ada" ${selT === "ada" ? "selected" : ""}>Ada</option>
                                                            <option value="tidak_ada" ${selT === "tidak_ada" ? "selected" : ""}>Tidak Ada</option>
                                                        </select>
                                                    `}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        lucide.createIcons();

        // Prevent touchmove scroll leaks between columns
        container.querySelectorAll('.cell-quiz-group-scroll').forEach(col => {
            col.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
        });

        // Dropdown selection listeners for G1 and G2
        const selects = container.querySelectorAll('.cell-quiz-select');
        selects.forEach(select => {
            select.addEventListener('change', (e) => {
                const group = e.target.getAttribute('data-group');
                const key = e.target.getAttribute('data-key');
                const val = e.target.value;
                const correctVal = e.target.getAttribute('data-correct');

                if (val === "") return;

                if (val === correctVal) {
                    // Correct Answer!
                    if (group === 'g1') {
                        this.cellQuizSelectionsGroup1[key] = val;
                    } else {
                        this.cellQuizSelectionsGroup2[key] = val;
                    }

                    AudioSynth.playCorrect();
                    this.speakVoiceNotification("Benar!");

                    // In-place DOM transformation to PRESERVE FULLSCREEN & avoid re-render DOM destruction!
                    const parentField = e.target.parentElement;
                    if (parentField) {
                        const labelText = key.startsWith('f_') ? 'Fungsi Utama Sel:' : (key.startsWith('h_') ? 'Sel Hewan:' : 'Sel Tumbuhan:');
                        const badgeText = key.startsWith('f_') ? '✔ Terkunci (Benar)' : '✔ Ada/Tidak';
                        
                        parentField.innerHTML = `
                            <label>${labelText}</label>
                            <div class="cell-quiz-locked-badge" title="Jawaban Benar & Terkunci">
                                <i data-lucide="check-circle-2"></i>
                                <span>${badgeText}</span>
                            </div>
                        `;
                        lucide.createIcons();
                    }

                    // Recalculate and update scores live in-place
                    let countG1 = 0;
                    let countG2 = 0;
                    CELL_COMPARISON_DATA.forEach(item => {
                        if ((this.cellQuizSelectionsGroup1[`f_${item.id}`] || "") === item.correctFuncId) countG1++;
                        if ((this.cellQuizSelectionsGroup1[`h_${item.id}`] || "") === item.hewan) countG1++;
                        if ((this.cellQuizSelectionsGroup1[`t_${item.id}`] || "") === item.tumbuhan) countG1++;

                        if ((this.cellQuizSelectionsGroup2[`f_${item.id}`] || "") === item.correctFuncId) countG2++;
                        if ((this.cellQuizSelectionsGroup2[`h_${item.id}`] || "") === item.hewan) countG2++;
                        if ((this.cellQuizSelectionsGroup2[`t_${item.id}`] || "") === item.tumbuhan) countG2++;
                    });

                    const sg1 = container.querySelector('#score-g1-num');
                    const sg2 = container.querySelector('#score-g2-num');
                    if (sg1) sg1.innerText = `${countG1} / ${totalPerGroup} Poin`;
                    if (sg2) sg2.innerText = `${countG2} / ${totalPerGroup} Poin`;

                    this.showWhiteboardToast(`✅ Jawaban ${group === 'g1' ? 'Kelompok 1' : 'Kelompok 2'} BENAR & Terkunci!`, false);
                } else {
                    // Wrong Answer!
                    AudioSynth.playWrong();
                    this.speakVoiceNotification("Salah!");

                    e.target.classList.remove('sel-correct');
                    e.target.classList.add('sel-wrong');

                    this.showWhiteboardToast(`❌ Pilihan ${group === 'g1' ? 'Kelompok 1' : 'Kelompok 2'} kurang tepat! Coba lagi.`, true);
                }
            });
        });

        // Check button G1
        const btnCheckG1 = container.querySelector('.btn-check-g1');
        if (btnCheckG1) {
            btnCheckG1.addEventListener('click', () => {
                let correct = 0;
                let empty = 0;

                container.querySelectorAll('.cell-quiz-select[data-group="g1"]').forEach(select => {
                    const val = select.value;
                    const correctVal = select.getAttribute('data-correct');
                    select.classList.remove('sel-correct', 'sel-wrong');
                    if (val === "") empty++;
                    else if (val === correctVal) {
                        select.classList.add('sel-correct');
                        correct++;
                    } else {
                        select.classList.add('sel-wrong');
                    }
                });

                if (empty > 0) {
                    AudioSynth.playWrong();
                    this.showWhiteboardToast(`⚠️ Kelompok 1 masih memiliki ${empty} soal belum diisi!`, true);
                    return;
                }

                const pct = Math.round((correct / totalPerGroup) * 100);
                if (correct === totalPerGroup) {
                    AudioSynth.playSuccess();
                    this.stats.score += 75;
                    this.updateHeaderStats();
                    this.showWhiteboardToast(`🎉 KERJA BAGUS KELOMPOK 1! Jawaban 100% Sempurna! Bonus +75 Poin!`, false);
                } else if (correct >= 27) {
                    AudioSynth.playCorrect();
                    this.showWhiteboardToast(`👍 Sangat Bagus Kelompok 1! ${correct} dari ${totalPerGroup} tepat (${pct}%).`, false);
                } else {
                    AudioSynth.playWrong();
                    this.showWhiteboardToast(`💡 Kelompok 1: ${correct} dari ${totalPerGroup} tepat. Periksa pilihan merah!`, true);
                }
            });
        }

        // Check button G2
        const btnCheckG2 = container.querySelector('.btn-check-g2');
        if (btnCheckG2) {
            btnCheckG2.addEventListener('click', () => {
                let correct = 0;
                let empty = 0;

                container.querySelectorAll('.cell-quiz-select[data-group="g2"]').forEach(select => {
                    const val = select.value;
                    const correctVal = select.getAttribute('data-correct');
                    select.classList.remove('sel-correct', 'sel-wrong');
                    if (val === "") empty++;
                    else if (val === correctVal) {
                        select.classList.add('sel-correct');
                        correct++;
                    } else {
                        select.classList.add('sel-wrong');
                    }
                });

                if (empty > 0) {
                    AudioSynth.playWrong();
                    this.showWhiteboardToast(`⚠️ Kelompok 2 masih memiliki ${empty} soal belum diisi!`, true);
                    return;
                }

                const pct = Math.round((correct / totalPerGroup) * 100);
                if (correct === totalPerGroup) {
                    AudioSynth.playSuccess();
                    this.stats.score += 75;
                    this.updateHeaderStats();
                    this.showWhiteboardToast(`🎉 KERJA BAGUS KELOMPOK 2! Jawaban 100% Sempurna! Bonus +75 Poin!`, false);
                } else if (correct >= 27) {
                    AudioSynth.playCorrect();
                    this.showWhiteboardToast(`👍 Sangat Bagus Kelompok 2! ${correct} dari ${totalPerGroup} tepat (${pct}%).`, false);
                } else {
                    AudioSynth.playWrong();
                    this.showWhiteboardToast(`💡 Kelompok 2: ${correct} dari ${totalPerGroup} tepat. Periksa pilihan merah!`, true);
                }
            });
        }

        // Reset G1
        const btnResetG1 = container.querySelector('.btn-reset-g1');
        if (btnResetG1) {
            btnResetG1.addEventListener('click', () => {
                AudioSynth.playClick();
                this.cellQuizSelectionsGroup1 = {};
                this.cellQuizShuffledFunctions = null; // Re-shuffle options on reset
                const isFs = !!document.fullscreenElement;
                this.initCellComparisonQuiz(container);
                if (isFs) {
                    const wrapper = container.querySelector('#cell-quiz-wrapper-el');
                    if (wrapper && wrapper.requestFullscreen) wrapper.requestFullscreen();
                }
            });
        }

        // Reset G2
        const btnResetG2 = container.querySelector('.btn-reset-g2');
        if (btnResetG2) {
            btnResetG2.addEventListener('click', () => {
                AudioSynth.playClick();
                this.cellQuizSelectionsGroup2 = {};
                this.cellQuizShuffledFunctions = null; // Re-shuffle options on reset
                const isFs = !!document.fullscreenElement;
                this.initCellComparisonQuiz(container);
                if (isFs) {
                    const wrapper = container.querySelector('#cell-quiz-wrapper-el');
                    if (wrapper && wrapper.requestFullscreen) wrapper.requestFullscreen();
                }
            });
        }

        // Fullscreen toggle
        const btnFs = container.querySelector('#btn-cell-quiz-fs');
        if (btnFs) {
            btnFs.addEventListener('click', () => {
                AudioSynth.playClick();
                const wrapper = container.querySelector('#cell-quiz-wrapper-el');
                if (!document.fullscreenElement) {
                    if (wrapper.requestFullscreen) wrapper.requestFullscreen();
                    else if (wrapper.webkitRequestFullscreen) wrapper.webkitRequestFullscreen();
                } else {
                    if (document.exitFullscreen) document.exitFullscreen();
                }
            });
        }

        // Hint modal button
        const btnHint = container.querySelector('#btn-cell-quiz-hint');
        if (btnHint) {
            btnHint.addEventListener('click', () => {
                AudioSynth.playClick();
                this.openCellHintModal(CELL_COMPARISON_DATA);
            });
        }
    },

    openCellHintModal(cellData) {
        let modalEl = document.getElementById('cell-hint-modal-el');
        if (!modalEl) {
            modalEl = document.createElement('div');
            modalEl.id = 'cell-hint-modal-el';
            modalEl.className = 'cell-hint-modal';
            document.body.appendChild(modalEl);
        }

        modalEl.innerHTML = `
            <div class="cell-hint-content">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.75rem;">
                    <h3 style="font-family:var(--font-display); font-size:1.2rem; color:var(--color-bio-sel); display:flex; align-items:center; gap:0.5rem; margin:0;">
                        <i data-lucide="book-open"></i> Kunci & Penjelasan Organel Sel
                    </h3>
                    <button id="btn-close-cell-hint" class="btn-close">&times;</button>
                </div>

                <div style="display:flex; flex-direction:column; gap:0.75rem; max-height:60vh; overflow-y:auto; padding-right:0.4rem;">
                    ${cellData.map(item => `
                        <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:0.85rem;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem; flex-wrap:wrap; gap:0.4rem;">
                                <strong style="color:var(--text-primary); font-size:0.95rem; display:flex; align-items:center; gap:0.4rem;">
                                    <i data-lucide="${item.icon}" style="color:var(--color-bio-sel);"></i> ${item.name}
                                </strong>
                                <div style="display:flex; gap:0.4rem; font-size:0.75rem;">
                                    <span style="padding:2px 8px; border-radius:12px; background:${item.hewan === 'ada' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; color:${item.hewan === 'ada' ? '#10b981' : '#ef4444'}; font-weight:600;">
                                        Hewan: ${item.hewan === 'ada' ? 'Ada' : 'Tidak Ada'}
                                    </span>
                                    <span style="padding:2px 8px; border-radius:12px; background:${item.tumbuhan === 'ada' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; color:${item.tumbuhan === 'ada' ? '#10b981' : '#ef4444'}; font-weight:600;">
                                        Tumbuhan: ${item.tumbuhan === 'ada' ? 'Ada' : 'Tidak Ada'}
                                    </span>
                                </div>
                            </div>
                            <p style="font-size:0.85rem; color:#10b981; font-weight:600; margin:0.2rem 0 0.4rem 0;">💡 Fungsi Utama: ${item.funcText}</p>
                            <p style="font-size:0.82rem; color:var(--text-secondary); margin:0; line-height:1.4;">${item.desc}</p>
                        </div>
                    `).join('')}
                </div>

                <div style="display:flex; justify-content:flex-end; border-top:1px solid rgba(255,255,255,0.1); padding-top:0.75rem;">
                    <button id="btn-close-cell-hint-2" class="btn-primary ripple" style="padding:0.4rem 1.2rem; font-size:0.85rem;">Tutup</button>
                </div>
            </div>
        `;

        lucide.createIcons();

        const closeModal = () => {
            AudioSynth.playClick();
            modalEl.classList.add('hidden');
        };

        modalEl.classList.remove('hidden');
        modalEl.querySelector('#btn-close-cell-hint').addEventListener('click', closeModal);
        modalEl.querySelector('#btn-close-cell-hint-2').addEventListener('click', closeModal);
        modalEl.addEventListener('click', (e) => {
            if (e.target === modalEl) closeModal();
        });
    },

    initCellDiagramMatchingQuiz(container) {
        if (!this.diagramMatchingGroup1) this.diagramMatchingGroup1 = {};
        if (!this.diagramMatchingGroup2) this.diagramMatchingGroup2 = {};
        if (!this.diagramMatchingActiveTab) this.diagramMatchingActiveTab = 'all';

        const DIAGRAM_TARGETS = [
            // Sel Tumbuhan (8 Target Boxes)
            { id: "t1", title: "Organel 1 Sel Tumbuhan (Kiri Atas)", section: "Sel Tumbuhan", correct: "Mitokondria", left: 1.0, top: 19.3, width: 24.0, height: 4.2 },
            { id: "t2", title: "Organel 2 Sel Tumbuhan (Kiri Tengah)", section: "Sel Tumbuhan", correct: "Vakoula", altCorrect: ["Vakuola"], left: 1.0, top: 31.8, width: 24.0, height: 4.2 },
            { id: "t3", title: "Organel 3 Sel Tumbuhan (Kiri Bawah)", section: "Sel Tumbuhan", correct: "Diktiosom", altCorrect: ["Badan Golgi"], left: 1.0, top: 42.5, width: 24.0, height: 4.2 },
            { id: "t4", title: "Organel 4 Sel Tumbuhan (Kanan Atas)", section: "Sel Tumbuhan", correct: "Retikulum endoplasma halus", left: 70.0, top: 19.8, width: 27.5, height: 4.2 },
            { id: "t5", title: "Organel 5 Sel Tumbuhan (Kanan Atas-Mid)", section: "Sel Tumbuhan", correct: "Badan Mikro", left: 70.0, top: 25.2, width: 18.5, height: 3.5 },
            { id: "t6", title: "Organel 6 Sel Tumbuhan (Kanan Tengah)", section: "Sel Tumbuhan", correct: "Retikulum endoplasma kasar", left: 73.0, top: 28.8, width: 25.0, height: 4.2 },
            { id: "t7", title: "Organel 7 Sel Tumbuhan (Kanan Bawah-Mid)", section: "Sel Tumbuhan", correct: "Ribosom", left: 73.5, top: 35.0, width: 24.5, height: 4.2 },
            { id: "t8", title: "Organel 8 Sel Tumbuhan (Kanan Bawah)", section: "Sel Tumbuhan", correct: "Plastida/Kloroplas", altCorrect: ["Kloroplas", "Plastida"], left: 73.5, top: 41.8, width: 24.5, height: 4.2 },

            // Sel Hewan (8 Target Boxes)
            { id: "h1", title: "Organel 1 Sel Hewan (Kiri Atas)", section: "Sel Hewan", correct: "Lisosom", left: 12.2, top: 70.8, width: 12.5, height: 4.2 },
            { id: "h2", title: "Organel 2 Sel Hewan (Kiri Tengah)", section: "Sel Hewan", correct: "Mitokondria", left: 8.5, top: 77.4, width: 16.0, height: 4.2 },
            { id: "h3", title: "Organel 3 Sel Hewan (Kiri Bawah-Mid)", section: "Sel Hewan", correct: "Sentrosom", left: 1.0, top: 82.2, width: 23.5, height: 4.2 },
            { id: "h4", title: "Organel 4 Sel Hewan (Kiri Bawah)", section: "Sel Hewan", correct: "Badan Golgi", altCorrect: ["Diktiosom"], left: 1.0, top: 87.8, width: 23.5, height: 4.2 },
            { id: "h5", title: "Organel 5 Sel Hewan (Kanan Atas)", section: "Sel Hewan", correct: "Retikulum endoplasma halus", left: 70.0, top: 65.2, width: 28.5, height: 5.5 },
            { id: "h6", title: "Organel 6 Sel Hewan (Kanan Atas-Mid)", section: "Sel Hewan", correct: "Badan Mikro", left: 71.5, top: 75.0, width: 26.5, height: 4.2 },
            { id: "h7", title: "Organel 7 Sel Hewan (Kanan Tengah)", section: "Sel Hewan", correct: "Retikulum endoplasma kasar", left: 70.8, top: 80.8, width: 27.5, height: 4.2 },
            { id: "h8", title: "Organel 8 Sel Hewan (Kanan Bawah)", section: "Sel Hewan", correct: "Ribosom", left: 71.2, top: 87.0, width: 26.0, height: 4.2 }
        ];

        const ORGANELLE_OPTIONS = [
            "",
            "Mitokondria",
            "Vakoula",
            "Diktiosom",
            "Retikulum endoplasma halus",
            "Badan Mikro",
            "Retikulum endoplasma kasar",
            "Ribosom",
            "Plastida/Kloroplas",
            "Lisosom",
            "Sentrosom",
            "Badan Golgi"
        ];

        const checkCorrect = (target, val) => {
            if (!val) return false;
            if (val === target.correct) return true;
            if (target.altCorrect && target.altCorrect.includes(val)) return true;
            return false;
        };

        let cG1 = 0;
        let cG2 = 0;
        DIAGRAM_TARGETS.forEach(target => {
            if (checkCorrect(target, this.diagramMatchingGroup1[target.id])) cG1++;
            if (checkCorrect(target, this.diagramMatchingGroup2[target.id])) cG2++;
        });

        const activeTab = this.diagramMatchingActiveTab;

        container.innerHTML = `
            <div class="cell-quiz-wrapper diagram-quiz-wrapper" id="diagram-quiz-wrapper-el">
                <div class="cell-quiz-header">
                    <div class="cell-quiz-title-box">
                        <div class="cell-quiz-icon-badge" style="background: rgba(16, 185, 129, 0.2); color: #10b981;">
                            <i data-lucide="image"></i>
                        </div>
                        <div>
                            <h3>Kuis Visual: Memasangkan Label Organel Sel (Mode 2 Kelompok)</h3>
                            <p>Pilih nama organel sel yang tepat pada setiap kotak kosong gambar Sel Tumbuhan & Sel Hewan</p>
                        </div>
                    </div>

                    <div class="group-score-bar">
                        <div class="group-score-pill g1" title="Skor Kelompok 1">
                            <i data-lucide="user-check"></i>
                            <span>Kelompok 1: <strong id="diagram-score-g1-num">${cG1} / 16 Poin</strong></span>
                        </div>
                        <div class="group-score-pill g2" title="Skor Kelompok 2">
                            <i data-lucide="user-check"></i>
                            <span>Kelompok 2: <strong id="diagram-score-g2-num">${cG2} / 16 Poin</strong></span>
                        </div>
                        <button id="btn-diagram-quiz-fs" class="btn-fullscreen-cover ripple" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;" title="Layar Penuh Kuis">
                            <i data-lucide="maximize" id="diagram-quiz-fs-icon"></i>
                            <span>Layar Penuh</span>
                        </button>
                        <button id="btn-diagram-quiz-hint" class="cell-quiz-btn cell-quiz-btn-hint ripple" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;">
                            <i data-lucide="eye"></i>
                            <span>Kunci Jawaban</span>
                        </button>
                    </div>
                </div>

                <!-- TAB SWITCHER FOR MOBILE / DUAL VIEW -->
                <div class="cell-quiz-tabs">
                    <button class="cell-quiz-tab-btn ${activeTab === 'all' ? 'active tab-all' : ''}" data-tab="all">
                        <i data-lucide="columns"></i> <span>Tampilan Bersamaan (2 Kelompok)</span>
                    </button>
                    <button class="cell-quiz-tab-btn ${activeTab === 'g1' ? 'active tab-g1' : ''}" data-tab="g1">
                        <i data-lucide="shield"></i> <span>Fokus Kelompok 1</span>
                    </button>
                    <button class="cell-quiz-tab-btn ${activeTab === 'g2' ? 'active tab-g2' : ''}" data-tab="g2">
                        <i data-lucide="zap"></i> <span>Fokus Kelompok 2</span>
                    </button>
                </div>

                <!-- SPLIT CONTAINER FOR THE 2 GROUPS -->
                <div class="cell-quiz-split-container">
                    <!-- KELOMPOK 1 COLUMN -->
                    <div class="cell-quiz-group-column g1" style="display: ${activeTab === 'g2' ? 'none' : 'flex'};">
                        <div class="cell-quiz-column-header">
                            <div class="cell-quiz-column-title" style="color: #10b981;">
                                <i data-lucide="shield"></i>
                                <span>KELOMPOK 1 (KIRI)</span>
                            </div>
                            <div style="display: flex; gap: 0.4rem;">
                                <button class="cell-quiz-btn cell-quiz-btn-check btn-diagram-check-g1 ripple" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">
                                    <i data-lucide="check-circle"></i> Periksa G1
                                </button>
                                <button class="cell-quiz-btn cell-quiz-btn-reset btn-diagram-reset-g1 ripple" style="padding: 0.35rem 0.6rem; font-size: 0.78rem;" title="Reset Kelompok 1">
                                    <i data-lucide="rotate-ccw"></i>
                                </button>
                            </div>
                        </div>

                        <div class="cell-quiz-group-scroll">
                            <div class="diagram-quiz-container">
                                <img src="image/BAB 1/sel_unlabeled_quiz.png" alt="Sel Hewan & Tumbuhan Interaktif G1" class="diagram-quiz-img" />
                                ${DIAGRAM_TARGETS.map(t => {
                                    const val = this.diagramMatchingGroup1[t.id] || "";
                                    const isSubmitted = this.diagramMatchingGroup1Submitted;
                                    const isRight = checkCorrect(t, val);
                                    let cls = "diagram-select-overlay";
                                    if (isSubmitted && val !== "") {
                                        cls += isRight ? " sel-correct" : " sel-wrong";
                                    }
                                    return `
                                        <select class="${cls}" data-group="g1" data-target="${t.id}" title="${t.title}"
                                            style="left: ${t.left}%; top: ${t.top}%; width: ${t.width}%; height: ${t.height}%;">
                                            <option value="">-- Pilih --</option>
                                            ${ORGANELLE_OPTIONS.filter(opt => opt !== "").map(opt => `
                                                <option value="${opt}" ${val === opt ? 'selected' : ''}>${opt}</option>
                                            `).join('')}
                                        </select>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- KELOMPOK 2 COLUMN -->
                    <div class="cell-quiz-group-column g2" style="display: ${activeTab === 'g1' ? 'none' : 'flex'};">
                        <div class="cell-quiz-column-header">
                            <div class="cell-quiz-column-title" style="color: #06b6d4;">
                                <i data-lucide="zap"></i>
                                <span>KELOMPOK 2 (KANAN)</span>
                            </div>
                            <div style="display: flex; gap: 0.4rem;">
                                <button class="cell-quiz-btn cell-quiz-btn-check btn-diagram-check-g2 ripple" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">
                                    <i data-lucide="check-circle"></i> Periksa G2
                                </button>
                                <button class="cell-quiz-btn cell-quiz-btn-reset btn-diagram-reset-g2 ripple" style="padding: 0.35rem 0.6rem; font-size: 0.78rem;" title="Reset Kelompok 2">
                                    <i data-lucide="rotate-ccw"></i>
                                </button>
                            </div>
                        </div>

                        <div class="cell-quiz-group-scroll">
                            <div class="diagram-quiz-container">
                                <img src="image/BAB 1/sel_unlabeled_quiz.png" alt="Sel Hewan & Tumbuhan Interaktif G2" class="diagram-quiz-img" />
                                ${DIAGRAM_TARGETS.map(t => {
                                    const val = this.diagramMatchingGroup2[t.id] || "";
                                    const isSubmitted = this.diagramMatchingGroup2Submitted;
                                    const isRight = checkCorrect(t, val);
                                    let cls = "diagram-select-overlay";
                                    if (isSubmitted && val !== "") {
                                        cls += isRight ? " sel-correct" : " sel-wrong";
                                    }
                                    return `
                                        <select class="${cls}" data-group="g2" data-target="${t.id}" title="${t.title}"
                                            style="left: ${t.left}%; top: ${t.top}%; width: ${t.width}%; height: ${t.height}%;">
                                            <option value="">-- Pilih --</option>
                                            ${ORGANELLE_OPTIONS.filter(opt => opt !== "").map(opt => `
                                                <option value="${opt}" ${val === opt ? 'selected' : ''}>${opt}</option>
                                            `).join('')}
                                        </select>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        const wrapper = container.querySelector('#diagram-quiz-wrapper-el');

        wrapper.querySelectorAll('.cell-quiz-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.getAttribute('data-tab');
                this.diagramMatchingActiveTab = tab;
                this.initCellDiagramMatchingQuiz(container);
            });
        });

        wrapper.querySelectorAll('.diagram-select-overlay').forEach(sel => {
            sel.addEventListener('change', (e) => {
                const group = e.target.getAttribute('data-group');
                const targetId = e.target.getAttribute('data-target');
                const val = e.target.value;

                if (group === 'g1') {
                    this.diagramMatchingGroup1[targetId] = val;
                } else if (group === 'g2') {
                    this.diagramMatchingGroup2[targetId] = val;
                }

                let scG1 = 0;
                let scG2 = 0;
                DIAGRAM_TARGETS.forEach(t => {
                    if (checkCorrect(t, this.diagramMatchingGroup1[t.id])) scG1++;
                    if (checkCorrect(t, this.diagramMatchingGroup2[t.id])) scG2++;
                });

                const scG1El = wrapper.querySelector('#diagram-score-g1-num');
                const scG2El = wrapper.querySelector('#diagram-score-g2-num');
                if (scG1El) scG1El.innerText = `${scG1} / 16 Poin`;
                if (scG2El) scG2El.innerText = `${scG2} / 16 Poin`;
            });
        });

        const btnCheckG1 = wrapper.querySelector('.btn-diagram-check-g1');
        if (btnCheckG1) {
            btnCheckG1.addEventListener('click', () => {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
                this.diagramMatchingGroup1Submitted = true;
                this.initCellDiagramMatchingQuiz(container);

                let scG1 = 0;
                DIAGRAM_TARGETS.forEach(t => {
                    if (checkCorrect(t, this.diagramMatchingGroup1[t.id])) scG1++;
                });

                if (scG1 === 16) {
                    if (typeof AudioSynth !== 'undefined' && AudioSynth.playSuccess) AudioSynth.playSuccess();
                    alert("🎉 Selamat Kelompok 1! Seluruh 16 Organel Sel Hewan & Tumbuhan berhasil dipasangkan dengan SEMPURNA! (Skor: 16/16)");
                } else {
                    alert(`Kelompok 1 mendapatkan skor ${scG1} / 16 Poin! Periksa kotak merah dan perbaiki pilihanmu.`);
                }
            });
        }

        const btnCheckG2 = wrapper.querySelector('.btn-diagram-check-g2');
        if (btnCheckG2) {
            btnCheckG2.addEventListener('click', () => {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
                this.diagramMatchingGroup2Submitted = true;
                this.initCellDiagramMatchingQuiz(container);

                let scG2 = 0;
                DIAGRAM_TARGETS.forEach(t => {
                    if (checkCorrect(t, this.diagramMatchingGroup2[t.id])) scG2++;
                });

                if (scG2 === 16) {
                    if (typeof AudioSynth !== 'undefined' && AudioSynth.playSuccess) AudioSynth.playSuccess();
                    alert("🎉 Selamat Kelompok 2! Seluruh 16 Organel Sel Hewan & Tumbuhan berhasil dipasangkan dengan SEMPURNA! (Skor: 16/16)");
                } else {
                    alert(`Kelompok 2 mendapatkan skor ${scG2} / 16 Poin! Periksa kotak merah dan perbaiki pilihanmu.`);
                }
            });
        }

        const btnResetG1 = wrapper.querySelector('.btn-diagram-reset-g1');
        if (btnResetG1) {
            btnResetG1.addEventListener('click', () => {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
                this.diagramMatchingGroup1 = {};
                this.diagramMatchingGroup1Submitted = false;
                this.initCellDiagramMatchingQuiz(container);
            });
        }

        const btnResetG2 = wrapper.querySelector('.btn-diagram-reset-g2');
        if (btnResetG2) {
            btnResetG2.addEventListener('click', () => {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
                this.diagramMatchingGroup2 = {};
                this.diagramMatchingGroup2Submitted = false;
                this.initCellDiagramMatchingQuiz(container);
            });
        }

        const btnFs = wrapper.querySelector('#btn-diagram-quiz-fs');
        if (btnFs) {
            btnFs.addEventListener('click', () => {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
                if (!document.fullscreenElement) {
                    wrapper.requestFullscreen().catch(err => alert("Layar Penuh tidak dapat diaktifkan."));
                } else {
                    if (document.exitFullscreen) document.exitFullscreen();
                }
            });
        }

        const btnHint = wrapper.querySelector('#btn-diagram-quiz-hint');
        if (btnHint) {
            btnHint.addEventListener('click', () => {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
                this.openDiagramImageHintModal();
            });
        }
    },

    openDiagramImageHintModal() {
        let modalEl = document.getElementById('diagram-hint-modal-el');
        if (!modalEl) {
            modalEl = document.createElement('div');
            modalEl.id = 'diagram-hint-modal-el';
            modalEl.className = 'diagram-hint-modal';
            document.body.appendChild(modalEl);
        }

        modalEl.innerHTML = `
            <div class="diagram-hint-content">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding:0.85rem 1.2rem; background:rgba(30,41,59,0.9);">
                    <h3 style="font-family:var(--font-display); font-size:1.1rem; color:var(--color-bio-sel); display:flex; align-items:center; gap:0.5rem; margin:0;">
                        <i data-lucide="image"></i> Kunci Jawaban: Diagram Organel Sel Hewan & Tumbuhan
                    </h3>
                    <button id="btn-close-diagram-hint" class="btn-close" style="font-size:1.5rem; cursor:pointer;">&times;</button>
                </div>

                <div style="padding: 1rem; flex: 1; overflow-y: auto; text-align: center;">
                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
                        Berikut adalah gambar referensi kunci jawaban organel sel tumbuhan (atas) dan sel hewan (bawah):
                    </p>
                    <img src="image/BAB 1/sel_labeled_answer.jpg" alt="Kunci Jawaban Organel Sel" style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2px solid rgba(255,255,255,0.1);" />
                </div>
            </div>
        `;

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        const btnClose = modalEl.querySelector('#btn-close-diagram-hint');
        if (btnClose) {
            btnClose.addEventListener('click', () => {
                modalEl.remove();
            });
        }
        modalEl.addEventListener('click', (e) => {
            if (e.target === modalEl) modalEl.remove();
        });
    },

    /* TEKA-TEKI SILANG (TTS) SPESIALISASI SEL - DUAL GROUP WITH INDEPENDENT VIRTUAL KEYBOARDS */
    initTTSCellSpecialization(container) {
        // Both Kelompok 1 and Kelompok 2 use the exact same 10-question dataset (Data B)
        const ttsData = {
            "rows": 17, "cols": 14,
            "grid": [
                [null, null, null, null, null, null, "S", "A", "R", "A", "F", null, null, null],
                [null, null, null, null, "F", null, "T", null, null, null, null, null, null, null],
                [null, null, null, null, "O", null, "O", "T", "O", "T", null, null, null, null],
                [null, null, null, null, "T", null, "M", null, null, null, null, null, null, null],
                [null, null, null, null, "O", null, "A", null, null, null, "R", null, null, null],
                [null, null, null, null, "S", "I", "T", "O", "P", "L", "A", "S", "M", "A"],
                [null, null, null, null, "I", null, "A", null, null, null, "M", null, "I", null],
                [null, null, null, null, "N", null, null, null, null, null, "B", null, "T", null],
                [null, null, null, null, "T", null, null, null, null, null, "U", null, "O", null],
                ["N", "U", "K", "L", "E", "U", "S", null, null, null, "T", null, "K", null],
                [null, null, null, null, "S", null, null, "P", null, null, null, null, "O", null],
                [null, null, null, null, "I", null, null, "E", "U", "G", "L", "E", "N", "A"],
                [null, null, null, null, "S", null, null, "N", null, null, null, null, "D", null],
                [null, null, null, null, null, null, null, "J", null, null, null, null, "R", null],
                [null, null, null, null, null, null, null, "A", null, null, null, null, "I", null],
                [null, null, null, null, null, null, null, "G", null, null, null, null, "A", null],
                [null, null, null, null, null, null, null, "A", null, null, null, null, null, null]
            ],
            "words": [
                {"word": "STOMATA", "clue": "Bagian tumbuhan yang mengambil gas CO₂ dan melepaskan O₂", "row": 0, "col": 6, "dir": "V", "number": 1},
                {"word": "SARAF", "clue": "Sel panjang berbentuk serabut untuk menghantarkan impuls ke otak", "row": 0, "col": 6, "dir": "H", "number": 1},
                {"word": "FOTOSINTESIS", "clue": "Proses pembuatan makanan pada tumbuhan yang butuh air dari akar", "row": 1, "col": 4, "dir": "V", "number": 2},
                {"word": "OTOT", "clue": "Jenis sel kaya mitokondria untuk menghasilkan energi gerak", "row": 2, "col": 6, "dir": "H", "number": 3},
                {"word": "RAMBUT", "clue": "Sel akar ___, memperbesar permukaan penyerapan air", "row": 4, "col": 10, "dir": "V", "number": 4},
                {"word": "SITOPLASMA", "clue": "Bagian cairan sel yang memanjang membentuk sel saraf", "row": 5, "col": 4, "dir": "H", "number": 5},
                {"word": "MITOKONDRIA", "clue": "Organel sel penghasil energi, melimpah pada sel otot", "row": 5, "col": 12, "dir": "V", "number": 6},
                {"word": "NUKLEUS", "clue": "Organel yang hilang pada sel darah merah dewasa agar mengikat oksigen", "row": 9, "col": 0, "dir": "H", "number": 7},
                {"word": "PENJAGA", "clue": "Sel ___ di sekitar stomata penentu membuka-menutup stomata", "row": 10, "col": 7, "dir": "V", "number": 8},
                {"word": "EUGLENA", "clue": "Contoh organisme Protista uniseluler yang hidup di air sungai", "row": 11, "col": 7, "dir": "H", "number": 9}
            ]
        };

        container.innerHTML = `
            <div class="tts-wrapper card" id="tts-fullscreen-wrapper">
                <header class="tts-header">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                        <div style="text-align:left;">
                            <div class="tts-eyebrow">IPA &bull; Kelas VIII &bull; Bab 1 Pengenalan Sel &bull; Hal. 17–21</div>
                            <h2 class="tts-title" style="margin:2px 0;">Kompetisi TTS Spesialisasi Sel (Kelompok 1 vs Kelompok 2)</h2>
                            <p class="tts-sub" style="margin:0;">Setiap kelompok mendapatkan papan TTS 10 Soal yang sama & Keyboard Virtual masing-masing. Berlombalah menyelesaikan papan TTS!</p>
                        </div>
                        <div style="display:flex; gap:0.5rem; align-items:center;">
                            <button id="btn-tts-fullscreen" class="btn-primary ripple" style="padding:0.45rem 1rem; font-size:0.82rem; background:linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color:#fff; border-radius:999px; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
                                <i data-lucide="maximize" id="tts-fs-icon"></i>
                                <span>Layar Penuh</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div class="tts-arena">
                    <!-- KELOMPOK 1 PANEL (GREEN ACCENT) -->
                    <div class="tts-panel left" id="panelA" style="position:relative;">
                        <div class="tts-panel-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                            <span class="tts-group-tag">Kelompok 1</span>
                            <span class="tts-score-badge ok" id="scoreA">0 / 10 Soal</span>
                        </div>
                        <!-- INDEPENDENT SCROLLABLE BODY FOR KELOMPOK 1 -->
                        <div class="tts-panel-scroll">
                            <h3 class="tts-panel-title">Spesialisasi Sel Tumbuhan &amp; Hewan</h3>
                            <div class="tts-panel-sub">Sentuh kotak pada papan untuk mengetik (Keyboard Melayang)</div>
                            <div class="tts-grid-container">
                                <div class="tts-grid" id="gridA"></div>
                            </div>
                            <div class="tts-clue-cols">
                                <div class="tts-clue-group">
                                    <h4>Mendatar</h4>
                                    <ol id="acrossA"></ol>
                                </div>
                                <div class="tts-clue-group">
                                    <h4>Menurun</h4>
                                    <ol id="downA"></ol>
                                </div>
                            </div>
                            <div class="tts-controls">
                                <button class="tts-btn ripple" data-check="A"><i data-lucide="check-circle"></i> Periksa</button>
                                <button class="tts-btn secondary ripple" data-reveal="A"><i data-lucide="key"></i> Kunci</button>
                                <button class="tts-btn secondary ripple" data-reset="A"><i data-lucide="rotate-ccw"></i> Reset</button>
                            </div>
                            <div id="statusA" class="tts-status"></div>
                        </div>

                        <!-- FLOATING POPUP KEYPAD KELOMPOK 1 -->
                        <div class="tts-popover-keypad hidden" id="popoverKeypadA">
                            <div class="tts-popover-header">
                                <span style="color:#34d399;"><i data-lucide="keyboard" style="width:14px; height:14px; display:inline;"></i> Keyboard Melayang Kelompok 1</span>
                                <button class="tts-popover-close" data-close-keypad="A">&times;</button>
                            </div>
                            <div class="tts-popover-preview">
                                Kotak Aktif: <strong id="previewBoxA">-</strong>
                            </div>
                            <div class="tts-vkb-grid" id="vkbA"></div>
                        </div>
                    </div>

                    <!-- KELOMPOK 2 PANEL (RED ACCENT) -->
                    <div class="tts-panel right" id="panelB" style="position:relative;">
                        <div class="tts-panel-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                            <span class="tts-group-tag">Kelompok 2</span>
                            <span class="tts-score-badge ok" id="scoreB">0 / 10 Soal</span>
                        </div>
                        <!-- INDEPENDENT SCROLLABLE BODY FOR KELOMPOK 2 -->
                        <div class="tts-panel-scroll">
                            <h3 class="tts-panel-title">Spesialisasi Sel Tumbuhan &amp; Hewan</h3>
                            <div class="tts-panel-sub">Sentuh kotak pada papan untuk mengetik (Keyboard Melayang)</div>
                            <div class="tts-grid-container">
                                <div class="tts-grid" id="gridB"></div>
                            </div>
                            <div class="tts-clue-cols">
                                <div class="tts-clue-group">
                                    <h4>Mendatar</h4>
                                    <ol id="acrossB"></ol>
                                </div>
                                <div class="tts-clue-group">
                                    <h4>Menurun</h4>
                                    <ol id="downB"></ol>
                                </div>
                            </div>
                            <div class="tts-controls">
                                <button class="tts-btn ripple" data-check="B"><i data-lucide="check-circle"></i> Periksa</button>
                                <button class="tts-btn secondary ripple" data-reveal="B"><i data-lucide="key"></i> Kunci</button>
                                <button class="tts-btn secondary ripple" data-reset="B"><i data-lucide="rotate-ccw"></i> Reset</button>
                            </div>
                            <div id="statusB" class="tts-status"></div>
                        </div>

                        <!-- FLOATING POPUP KEYPAD KELOMPOK 2 -->
                        <div class="tts-popover-keypad hidden" id="popoverKeypadB">
                            <div class="tts-popover-header">
                                <span style="color:#fb7185;"><i data-lucide="keyboard" style="width:14px; height:14px; display:inline;"></i> Keyboard Melayang Kelompok 2</span>
                                <button class="tts-popover-close" data-close-keypad="B">&times;</button>
                            </div>
                            <div class="tts-popover-preview">
                                Kotak Aktif: <strong id="previewBoxB">-</strong>
                            </div>
                            <div class="tts-vkb-grid" id="vkbB"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        lucide.createIcons();

        const inputsA = {};
        const inputsB = {};
        let activeInputA = null;
        let activeInputB = null;

        const updateCellSelection = (inp, groupKey) => {
            const inputStore = groupKey === 'A' ? inputsA : inputsB;
            Object.values(inputStore).forEach(i => i.classList.remove('is-selected-cell'));
            if (inp) {
                inp.classList.add('is-selected-cell');
                if (groupKey === 'A') activeInputA = inp;
                else activeInputB = inp;

                // Open Floating Popover Keypad for this group
                const keypadEl = container.querySelector('#popoverKeypad' + groupKey);
                const previewEl = container.querySelector('#previewBox' + groupKey);
                if (keypadEl) keypadEl.classList.remove('hidden');
                if (previewEl) {
                    const r = +inp.dataset.row + 1;
                    const c = +inp.dataset.col + 1;
                    if (inp.dataset.locked === 'true') {
                        previewEl.textContent = `[ 🔒 Terkunci ] (Baris ${r}, Kolom ${c})`;
                    } else {
                        previewEl.textContent = `[ ${inp.value || '_'} ] (Baris ${r}, Kolom ${c})`;
                    }
                }
            }
        };

        const buildBoard = (data, gridElId, acrossElId, downElId, inputStore, groupKey) => {
            const gridEl = container.querySelector('#' + gridElId);
            if (!gridEl) return;

            gridEl.style.gridTemplateColumns = `repeat(${data.cols}, 27px)`;
            gridEl.style.gridTemplateRows = `repeat(${data.rows}, 27px)`;

            const numberAt = {};
            data.words.forEach(w => { numberAt[`${w.row},${w.col}`] = w.number; });

            for (let r = 0; r < data.rows; r++) {
                for (let c = 0; c < data.cols; c++) {
                    const ch = data.grid[r][c];
                    const cellDiv = document.createElement('div');
                    if (ch) {
                        cellDiv.className = 'tts-cell';
                        const key = `${r},${c}`;
                        if (numberAt[key]) {
                            const num = document.createElement('span');
                            num.className = 'num';
                            num.textContent = numberAt[key];
                            cellDiv.appendChild(num);
                        }
                        const inp = document.createElement('input');
                        inp.maxLength = 1;
                        inp.dataset.row = r;
                        inp.dataset.col = c;
                        inp.dataset.answer = ch;
                        inp.autocomplete = 'off';
                        inp.setAttribute('inputmode', 'none'); // Disables native OS touch soft keyboard popup
                        inp.readOnly = true; // Prevents OS soft keyboard popping up on IFP/touchscreens
                        cellDiv.appendChild(inp);
                        inputStore[key] = inp;
                    } else {
                        cellDiv.style.background = 'transparent';
                        cellDiv.style.visibility = 'hidden';
                    }
                    gridEl.appendChild(cellDiv);
                }
            }

            Object.values(inputStore).forEach(inp => {
                inp.addEventListener('click', (e) => {
                    e.stopPropagation();
                    updateCellSelection(inp, groupKey);
                });

                inp.addEventListener('focus', () => {
                    updateCellSelection(inp, groupKey);
                });
            });

            const across = data.words.filter(w => w.dir === 'H').sort((a, b) => a.number - b.number);
            const down = data.words.filter(w => w.dir === 'V').sort((a, b) => a.number - b.number);
            const acrossList = container.querySelector('#' + acrossElId);
            const downList = container.querySelector('#' + downElId);

            if (acrossList) {
                across.forEach(w => {
                    const li = document.createElement('li');
                    li.innerHTML = `<b>${w.number}.</b> ${w.clue} <i>(${w.word.length} huruf)</i>`;
                    acrossList.appendChild(li);
                });
            }

            if (downList) {
                down.forEach(w => {
                    const li = document.createElement('li');
                    li.innerHTML = `<b>${w.number}.</b> ${w.clue} <i>(${w.word.length} huruf)</i>`;
                    downList.appendChild(li);
                });
            }
        };

        buildBoard(ttsData, 'gridA', 'acrossA', 'downA', inputsA, 'A');
        buildBoard(ttsData, 'gridB', 'acrossB', 'downB', inputsB, 'B');

        // Helper function to check and lock completed correct words without instant green flash
        const checkAndLockWords = (groupKey) => {
            const inputStore = groupKey === 'A' ? inputsA : inputsB;
            let solvedWords = 0;

            ttsData.words.forEach(w => {
                let isWordCorrect = true;
                const wordCells = [];

                for (let i = 0; i < w.word.length; i++) {
                    const r = w.dir === 'H' ? w.row : w.row + i;
                    const c = w.dir === 'H' ? w.col + i : w.col;
                    const cellInp = inputStore[`${r},${c}`];
                    if (cellInp) wordCells.push(cellInp);

                    if (!cellInp || cellInp.value !== cellInp.dataset.answer) {
                        isWordCorrect = false;
                    }
                }

                if (isWordCorrect) {
                    solvedWords++;
                    // Lock all cells of this word
                    wordCells.forEach(cellInp => {
                        cellInp.dataset.locked = 'true';
                        cellInp.classList.add('cell-locked');
                    });
                }
            });

            const scoreBadge = container.querySelector('#score' + groupKey);
            if (scoreBadge) {
                scoreBadge.textContent = `${solvedWords} / 10 Soal`;
                if (solvedWords === 10) {
                    scoreBadge.className = 'tts-score-badge ok locked-full';
                    scoreBadge.textContent = `🎉 10 / 10 Soal Selesai!`;
                }
            }
            return solvedWords;
        };

        // Virtual Keyboard Building Function for Floating Popover
        const buildVirtualKeyboard = (vkbElId, inputStore, groupKey) => {
            const vkbEl = container.querySelector('#' + vkbElId);
            if (!vkbEl) return;

            const KEYS = [
                'A','B','C','D','E','F','G','H','I','J',
                'K','L','M','N','O','P','Q','R','S','T',
                'U','V','W','X','Y','Z','←','RESET'
            ];

            KEYS.forEach(key => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = `tts-vkb-key ${key.length > 1 ? 'action-key' : ''}`;
                btn.textContent = key;

                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();

                    let targetInput = (groupKey === 'A') ? activeInputA : activeInputB;

                    if (!targetInput || !container.contains(targetInput)) {
                        targetInput = Object.values(inputStore).find(inp => inp.dataset.locked !== 'true') || Object.values(inputStore)[0];
                    }

                    if (!targetInput) return;

                    // If cell is already locked (correct answer), do not allow modifying
                    if (targetInput.dataset.locked === 'true') {
                        // Advance to next unlocked cell
                        const r = +targetInput.dataset.row, c = +targetInput.dataset.col;
                        const right = inputStore[`${r},${c + 1}`];
                        const down = inputStore[`${r + 1},${c}`];
                        if (right && right.dataset.locked !== 'true') updateCellSelection(right, groupKey);
                        else if (down && down.dataset.locked !== 'true') updateCellSelection(down, groupKey);
                        return;
                    }

                    if (key === '←') {
                        targetInput.value = '';
                        targetInput.classList.remove('correct', 'wrong');
                        const r = +targetInput.dataset.row, c = +targetInput.dataset.col;
                        const left = inputStore[`${r},${c - 1}`];
                        if (left && left.dataset.locked !== 'true') {
                            updateCellSelection(left, groupKey);
                        }
                    } else if (key === 'RESET') {
                        Object.values(inputStore).forEach(inp => {
                            if (inp.dataset.locked !== 'true') {
                                inp.value = '';
                                inp.classList.remove('correct', 'wrong');
                            }
                        });
                        checkAndLockWords(groupKey);
                        const keypadEl = container.querySelector('#popoverKeypad' + groupKey);
                        if (keypadEl) keypadEl.classList.add('hidden');
                    } else {
                        targetInput.value = key;
                        targetInput.classList.remove('correct', 'wrong');

                        // Check if word is now completed & correct (locks it without green flash)
                        checkAndLockWords(groupKey);

                        const r = +targetInput.dataset.row, c = +targetInput.dataset.col;
                        const right = inputStore[`${r},${c + 1}`];
                        const down = inputStore[`${r + 1},${c}`];
                        if (right && right.dataset.locked !== 'true') {
                            updateCellSelection(right, groupKey);
                        } else if (down && down.dataset.locked !== 'true') {
                            updateCellSelection(down, groupKey);
                        }
                    }
                });

                vkbEl.appendChild(btn);
            });
        };

        buildVirtualKeyboard('vkbA', inputsA, 'A');
        buildVirtualKeyboard('vkbB', inputsB, 'B');

        // Close Floating Keypad Event Listeners
        container.querySelectorAll('[data-close-keypad]').forEach(btn => {
            btn.addEventListener('click', () => {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
                const g = btn.dataset.closeKeypad;
                const keypadEl = container.querySelector('#popoverKeypad' + g);
                if (keypadEl) keypadEl.classList.add('hidden');
            });
        });

        const checkBoard = (inputStore, statusElId, scoreElId) => {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
            let correctCount = 0;
            const filled = Object.values(inputStore).filter(i => i.value);
            const total = Object.values(inputStore).length;

            Object.values(inputStore).forEach(inp => {
                inp.classList.remove('correct', 'wrong');
                if (!inp.value) return;
                if (inp.value === inp.dataset.answer) { inp.classList.add('correct'); correctCount++; }
                else { inp.classList.add('wrong'); }
            });

            // Calculate completed words count out of 10
            let solvedWords = 0;
            ttsData.words.forEach(w => {
                let isWordComplete = true;
                for (let i = 0; i < w.word.length; i++) {
                    const r = w.dir === 'H' ? w.row : w.row + i;
                    const c = w.dir === 'H' ? w.col + i : w.col;
                    const cellInp = inputStore[`${r},${c}`];
                    if (!cellInp || cellInp.value !== cellInp.dataset.answer) {
                        isWordComplete = false;
                        break;
                    }
                }
                if (isWordComplete) solvedWords++;
            });

            const scoreBadge = container.querySelector('#' + scoreElId);
            if (scoreBadge) scoreBadge.textContent = `${solvedWords} / 10 Soal`;

            const status = container.querySelector('#' + statusElId);
            if (!status) return;
            if (filled.length === 0) {
                status.textContent = 'Isi dulu kotak-kotaknya, ya!'; status.className = 'tts-status no';
            } else if (correctCount === total) {
                status.textContent = `🎉 MANTAP JUARA! Semua 10 Soal TTS Benar Sempurna!`; status.className = 'tts-status ok';
            } else {
                status.textContent = `${solvedWords}/10 Soal Selesai (${correctCount}/${filled.length} kotak benar). Cek lagi kotak merah.`; status.className = 'tts-status no';
            }
        };

        const revealBoard = (inputStore, statusElId, scoreElId) => {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
            Object.values(inputStore).forEach(inp => {
                inp.value = inp.dataset.answer;
                inp.classList.remove('wrong');
                inp.classList.add('correct');
            });
            const scoreBadge = container.querySelector('#' + scoreElId);
            if (scoreBadge) scoreBadge.textContent = '10 / 10 Soal';
            const status = container.querySelector('#' + statusElId);
            if (status) {
                status.textContent = 'Kunci jawaban ditampilkan (10/10 Soal).'; status.className = 'tts-status ok';
            }
        };

        const resetBoard = (inputStore, statusElId, scoreElId) => {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
            Object.values(inputStore).forEach(inp => { inp.value = ''; inp.classList.remove('correct', 'wrong'); });
            const scoreBadge = container.querySelector('#' + scoreElId);
            if (scoreBadge) scoreBadge.textContent = '0 / 10 Soal';
            const status = container.querySelector('#' + statusElId);
            if (status) status.textContent = '';
        };

        container.querySelectorAll('[data-check]').forEach(btn => {
            btn.addEventListener('click', () => {
                const g = btn.dataset.check;
                checkBoard(g === 'A' ? inputsA : inputsB, g === 'A' ? 'statusA' : 'statusB', g === 'A' ? 'scoreA' : 'scoreB');
            });
        });

        container.querySelectorAll('[data-reveal]').forEach(btn => {
            btn.addEventListener('click', () => {
                const g = btn.dataset.reveal;
                revealBoard(g === 'A' ? inputsA : inputsB, g === 'A' ? 'statusA' : 'statusB', g === 'A' ? 'scoreA' : 'scoreB');
            });
        });

        container.querySelectorAll('[data-reset]').forEach(btn => {
            btn.addEventListener('click', () => {
                const g = btn.dataset.reset;
                resetBoard(g === 'A' ? inputsA : inputsB, g === 'A' ? 'statusA' : 'statusB', g === 'A' ? 'scoreA' : 'scoreB');
            });
        });

        // Fullscreen Toggle Handler
        const fsBtn = container.querySelector('#btn-tts-fullscreen');
        if (fsBtn) {
            fsBtn.addEventListener('click', () => {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
                const wrapper = container.querySelector('#tts-fullscreen-wrapper');
                if (!document.fullscreenElement) {
                    if (wrapper && wrapper.requestFullscreen) wrapper.requestFullscreen();
                    else if (wrapper && wrapper.webkitRequestFullscreen) wrapper.webkitRequestFullscreen();
                } else {
                    if (document.exitFullscreen) document.exitFullscreen();
                }
            });
        }
    },

    initCellCombinedQuiz(container) {
        if (!this.cellQuizSelectionsGroup1) this.cellQuizSelectionsGroup1 = {};
        if (!this.cellQuizSelectionsGroup2) this.cellQuizSelectionsGroup2 = {};
        if (!this.diagramMatchingGroup1) this.diagramMatchingGroup1 = {};
        if (!this.diagramMatchingGroup2) this.diagramMatchingGroup2 = {};
        if (!this.combinedQuizTabG1) this.combinedQuizTabG1 = 'tabel';
        if (!this.combinedQuizTabG2) this.combinedQuizTabG2 = 'tabel';
        if (!this.combinedMainViewTab) this.combinedMainViewTab = 'split';

        if (!this.cellQuizShuffledFunctions) {
            const rawFunctions = [
                { id: "f1", text: "Memberikan bentuk kaku & perlindungan mekanis luar sel" },
                { id: "f2", text: "Mengatur lalu lintas transpor zat keluar & masuk sel" },
                { id: "f3", text: "Pusat pengendali kegiatan sel & pembawa informasi genetik (DNA)" },
                { id: "f4", text: "Cairan sel tempat organel melayang & tempat reaksi metabolisme" },
                { id: "f5", text: "Pembangkit energi sel (respirasi selular menghasilkan ATP)" },
                { id: "f6", text: "Tempat fotosintesis mengubah cahaya matahari jadi glukosa" },
                { id: "f7", text: "Penyimpan cadangan makanan, air, & menjaga tekanan turgor" },
                { id: "f8", text: "Sintesis protein selular" },
                { id: "f9", text: "Transportasi zat, sintesis protein & lipid" },
                { id: "f10", text: "Pengemasan, pemrosesan, & sekresi produk selular" },
                { id: "f11", text: "Pencernaan intraselular & pembuangan bagian sel rusak" },
                { id: "f12", text: "Mengatur pembentukan spindel saat pembelahan sel" }
            ];
            for (let i = rawFunctions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [rawFunctions[i], rawFunctions[j]] = [rawFunctions[j], rawFunctions[i]];
            }
            this.cellQuizShuffledFunctions = rawFunctions;
        }

        const FUNCTIONS_LIST = this.cellQuizShuffledFunctions;
        const CELL_COMPARISON_DATA = [
            { id: 1, name: "Dinding Sel", icon: "shield", correctFuncId: "f1", funcText: "Memberikan bentuk kaku & perlindungan mekanis luar sel", hewan: "tidak_ada", tumbuhan: "ada", desc: "Dinding sel (mengandung selulosa) hanya ada pada sel tumbuhan untuk menyokong struktur kaku. Sel hewan tidak memiliki dinding sel." },
            { id: 2, name: "Membran Sel (Membran Plasma)", icon: "layers", correctFuncId: "f2", funcText: "Mengatur lalu lintas transpor zat keluar & masuk sel", hewan: "ada", tumbuhan: "ada", desc: "Kedua jenis sel memiliki membran sel sebagai selaput pemisah lingkungan dalam dan luar sel." },
            { id: 3, name: "Inti Sel (Nukleus)", icon: "disc", correctFuncId: "f3", funcText: "Pusat pengendali kegiatan sel & pembawa informasi genetik (DNA)", hewan: "ada", tumbuhan: "ada", desc: "Sebagai organisme eukariotik, sel hewan dan sel tumbuhan memiliki nukleus terbungkus membran inti." },
            { id: 4, name: "Sitoplasma", icon: "droplet", correctFuncId: "f4", funcText: "Cairan sel tempat organel melayang & tempat reaksi metabolisme", hewan: "ada", tumbuhan: "ada", desc: "Sitoplasma merupakan matriks cair tempat terjadinya berbagai aktivitas biokimia sel pada kedua sel." },
            { id: 5, name: "Mitokondria", icon: "zap", correctFuncId: "f5", funcText: "Pembangkit energi sel (respirasi selular menghasilkan ATP)", hewan: "ada", tumbuhan: "ada", desc: "Baik sel hewan maupun tumbuhan membutuhkan mitokondria untuk pembentukan energi selular." },
            { id: 6, name: "Kloroplas (Plastida)", icon: "sun", correctFuncId: "f6", funcText: "Tempat fotosintesis mengubah cahaya matahari jadi glukosa", hewan: "tidak_ada", tumbuhan: "ada", desc: "Hanya dimiliki tumbuhan (autotrof). Sel hewan tidak berfotosintesis sehingga tidak memiliki kloroplas." },
            { id: 7, name: "Vakuola Utama (Besar)", icon: "box", correctFuncId: "f7", funcText: "Penyimpan cadangan makanan, air, & menjaga tekanan turgor", hewan: "tidak_ada", tumbuhan: "ada", desc: "Tumbuhan memiliki vakuola tunggal berukuran sangat besar. Pada sel hewan, vakuola tidak ada (atau berukuran mikro/sementara)." },
            { id: 8, name: "Ribosom", icon: "cpu", correctFuncId: "f8", funcText: "Sintesis protein selular", hewan: "ada", tumbuhan: "ada", desc: "Sintesis protein terjadi di ribosom yang terdapat pada sel hewan dan tumbuhan." },
            { id: 9, name: "Retikulum Endoplasma (RE)", icon: "git-merge", correctFuncId: "f9", funcText: "Transportasi zat, sintesis protein & lipid", hewan: "ada", tumbuhan: "ada", desc: "Sistem membran RE terdapat pada kedua jenis sel." },
            { id: 10, name: "Badan Golgi / Diktiosom", icon: "package", correctFuncId: "f10", funcText: "Pengemasan, pemrosesan, & sekresi produk selular", hewan: "ada", tumbuhan: "ada", desc: "Kedua sel memiliki badan golgi (disebut diktiosom pada sel tumbuhan)." },
            { id: 11, name: "Lisosom", icon: "trash-2", correctFuncId: "f11", funcText: "Pencernaan intraselular & pembuangan bagian sel rusak", hewan: "ada", tumbuhan: "tidak_ada", desc: "Umumnya hanya ditemukan pada sel hewan untuk pencernaan enzimatis." },
            { id: 12, name: "Sentriol / Sentrosom", icon: "crosshair", correctFuncId: "f12", funcText: "Mengatur pembentukan spindel saat pembelahan sel", hewan: "ada", tumbuhan: "tidak_ada", desc: "Sentriol merupakan pembentuk spindel pembelahan khas pada sel hewan." }
        ];

        const DIAGRAM_TARGETS = [
            { id: "t1", title: "Organel 1 Sel Tumbuhan (Kiri Atas)", section: "Sel Tumbuhan", correct: "Mitokondria", left: 1.0, top: 19.3, width: 24.0, height: 4.2 },
            { id: "t2", title: "Organel 2 Sel Tumbuhan (Kiri Tengah)", section: "Sel Tumbuhan", correct: "Vakoula", altCorrect: ["Vakuola"], left: 1.0, top: 31.8, width: 24.0, height: 4.2 },
            { id: "t3", title: "Organel 3 Sel Tumbuhan (Kiri Bawah)", section: "Sel Tumbuhan", correct: "Diktiosom", altCorrect: ["Badan Golgi"], left: 1.0, top: 42.5, width: 24.0, height: 4.2 },
            { id: "t4", title: "Organel 4 Sel Tumbuhan (Kanan Atas)", section: "Sel Tumbuhan", correct: "Retikulum endoplasma halus", left: 70.0, top: 19.8, width: 27.5, height: 4.2 },
            { id: "t5", title: "Organel 5 Sel Tumbuhan (Kanan Atas-Mid)", section: "Sel Tumbuhan", correct: "Badan Mikro", left: 70.0, top: 25.2, width: 18.5, height: 3.5 },
            { id: "t6", title: "Organel 6 Sel Tumbuhan (Kanan Tengah)", section: "Sel Tumbuhan", correct: "Retikulum endoplasma kasar", left: 73.0, top: 28.8, width: 25.0, height: 4.2 },
            { id: "t7", title: "Organel 7 Sel Tumbuhan (Kanan Bawah-Mid)", section: "Sel Tumbuhan", correct: "Ribosom", left: 73.5, top: 35.0, width: 24.5, height: 4.2 },
            { id: "t8", title: "Organel 8 Sel Tumbuhan (Kanan Bawah)", section: "Sel Tumbuhan", correct: "Plastida/Kloroplas", altCorrect: ["Kloroplas", "Plastida"], left: 73.5, top: 41.8, width: 24.5, height: 4.2 },
            { id: "h1", title: "Organel 1 Sel Hewan (Kiri Atas)", section: "Sel Hewan", correct: "Lisosom", left: 12.2, top: 70.8, width: 12.5, height: 4.2 },
            { id: "h2", title: "Organel 2 Sel Hewan (Kiri Tengah)", section: "Sel Hewan", correct: "Mitokondria", left: 8.5, top: 77.4, width: 16.0, height: 4.2 },
            { id: "h3", title: "Organel 3 Sel Hewan (Kiri Bawah-Mid)", section: "Sel Hewan", correct: "Sentrosom", left: 1.0, top: 82.2, width: 23.5, height: 4.2 },
            { id: "h4", title: "Organel 4 Sel Hewan (Kiri Bawah)", section: "Sel Hewan", correct: "Badan Golgi", altCorrect: ["Diktiosom"], left: 1.0, top: 87.8, width: 23.5, height: 4.2 },
            { id: "h5", title: "Organel 5 Sel Hewan (Kanan Atas)", section: "Sel Hewan", correct: "Retikulum endoplasma halus", left: 70.0, top: 65.2, width: 28.5, height: 5.5 },
            { id: "h6", title: "Organel 6 Sel Hewan (Kanan Atas-Mid)", section: "Sel Hewan", correct: "Badan Mikro", left: 71.5, top: 75.0, width: 26.5, height: 4.2 },
            { id: "h7", title: "Organel 7 Sel Hewan (Kanan Tengah)", section: "Sel Hewan", correct: "Retikulum endoplasma kasar", left: 70.8, top: 80.8, width: 27.5, height: 4.2 },
            { id: "h8", title: "Organel 8 Sel Hewan (Kanan Bawah)", section: "Sel Hewan", correct: "Ribosom", left: 71.2, top: 87.0, width: 26.0, height: 4.2 }
        ];

        const ORGANELLE_OPTIONS = [
            "",
            "Mitokondria",
            "Vakoula",
            "Diktiosom",
            "Retikulum endoplasma halus",
            "Badan Mikro",
            "Retikulum endoplasma kasar",
            "Ribosom",
            "Plastida/Kloroplas",
            "Lisosom",
            "Sentrosom",
            "Badan Golgi"
        ];

        const checkDiagramCorrect = (target, val) => {
            if (!val) return false;
            if (val === target.correct) return true;
            if (target.altCorrect && target.altCorrect.includes(val)) return true;
            return false;
        };

        let cG1_tabel = 0;
        let cG2_tabel = 0;
        CELL_COMPARISON_DATA.forEach(item => {
            if (this.cellQuizSelectionsGroup1[`f_${item.id}`] === item.correctFuncId) cG1_tabel++;
            if (this.cellQuizSelectionsGroup1[`h_${item.id}`] === item.hewan) cG1_tabel++;
            if (this.cellQuizSelectionsGroup1[`t_${item.id}`] === item.tumbuhan) cG1_tabel++;

            if (this.cellQuizSelectionsGroup2[`f_${item.id}`] === item.correctFuncId) cG2_tabel++;
            if (this.cellQuizSelectionsGroup2[`h_${item.id}`] === item.hewan) cG2_tabel++;
            if (this.cellQuizSelectionsGroup2[`t_${item.id}`] === item.tumbuhan) cG2_tabel++;
        });

        let cG1_gambar = 0;
        let cG2_gambar = 0;
        DIAGRAM_TARGETS.forEach(t => {
            if (checkDiagramCorrect(t, this.diagramMatchingGroup1[t.id])) cG1_gambar++;
            if (checkDiagramCorrect(t, this.diagramMatchingGroup2[t.id])) cG2_gambar++;
        });

        const totalG1 = cG1_tabel + cG1_gambar;
        const totalG2 = cG2_tabel + cG2_gambar;

        const mainTab = this.combinedMainViewTab;
        const tabG1 = this.combinedQuizTabG1;
        const tabG2 = this.combinedQuizTabG2;

        container.innerHTML = `
            <div class="cell-quiz-wrapper diagram-quiz-wrapper" id="combined-quiz-wrapper-el">
                <div class="cell-quiz-header">
                    <div class="cell-quiz-title-box">
                        <div class="cell-quiz-icon-badge" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(6, 182, 212, 0.25)); color: #10b981;">
                            <i data-lucide="layers"></i>
                        </div>
                        <div>
                            <h3>Kuis Interaktif Kolaborasi (Kuis Tabel & Kuis Gambar Sel)</h3>
                            <p>Setiap kelompok dapat mengerjakan & berganti kuis secara mandiri tanpa menunggu kelompok lain selesai!</p>
                        </div>
                    </div>

                    <div class="group-score-bar">
                        <div class="group-score-pill g1" title="Skor Total Kelompok 1 (Tabel: ${cG1_tabel}/36, Gambar: ${cG1_gambar}/16)">
                            <i data-lucide="shield"></i>
                            <span>Kelompok 1: <strong id="comb-score-g1-num">${totalG1} / 52 Poin</strong></span>
                        </div>
                        <div class="group-score-pill g2" title="Skor Total Kelompok 2 (Tabel: ${cG2_tabel}/36, Gambar: ${cG2_gambar}/16)">
                            <i data-lucide="zap"></i>
                            <span>Kelompok 2: <strong id="comb-score-g2-num">${totalG2} / 52 Poin</strong></span>
                        </div>
                        <button id="btn-combined-quiz-fs" class="btn-fullscreen-cover ripple" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;" title="Layar Penuh Kuis">
                            <i data-lucide="maximize" id="comb-quiz-fs-icon"></i>
                            <span>Layar Penuh</span>
                        </button>
                        <button id="btn-combined-quiz-hint" class="cell-quiz-btn cell-quiz-btn-hint ripple" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;">
                            <i data-lucide="help-circle"></i>
                            <span>Kunci Jawaban</span>
                        </button>
                    </div>
                </div>

                <!-- MAIN GLOBAL VIEW CONTROLLER -->
                <div class="cell-quiz-tabs">
                    <button class="cell-quiz-tab-btn ${mainTab === 'split' ? 'active tab-all' : ''}" data-main-tab="split">
                        <i data-lucide="columns"></i> <span>Mode Mandiri (Split 2 Kelompok)</span>
                    </button>
                    <button class="cell-quiz-tab-btn ${mainTab === 'tabel' ? 'active tab-g1' : ''}" data-main-tab="tabel">
                        <i data-lucide="table"></i> <span>Tampilan Kuis 1 (Tabel Perbandingan)</span>
                    </button>
                    <button class="cell-quiz-tab-btn ${mainTab === 'gambar' ? 'active tab-g2' : ''}" data-main-tab="gambar">
                        <i data-lucide="image"></i> <span>Tampilan Kuis 2 (Gambar Organel)</span>
                    </button>
                </div>

                <!-- SPLIT CONTAINER FOR 2 GROUPS -->
                <div class="cell-quiz-split-container">
                    <!-- KELOMPOK 1 COLUMN -->
                    <div class="cell-quiz-group-column g1">
                        <div class="cell-quiz-column-header">
                            <div class="cell-quiz-column-title" style="color: #10b981;">
                                <i data-lucide="shield"></i>
                                <span>KELOMPOK 1</span>
                                <span style="font-size:0.75rem; font-weight:600; opacity:0.85; margin-left:4px;">(${totalG1}/52 Pts)</span>
                            </div>
                            <div style="display: flex; gap: 0.4rem;">
                                <button class="cell-quiz-btn cell-quiz-btn-check btn-comb-check-g1 ripple" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">
                                    <i data-lucide="check-circle"></i> Periksa G1
                                </button>
                                <button class="cell-quiz-btn cell-quiz-btn-reset btn-comb-reset-g1 ripple" style="padding: 0.35rem 0.6rem; font-size: 0.78rem;" title="Reset Kelompok 1">
                                    <i data-lucide="rotate-ccw"></i>
                                </button>
                            </div>
                        </div>

                        <!-- INDEPENDENT SUB-TAB SELECTOR FOR KELOMPOK 1 -->
                        <div class="group-subtab-bar">
                            <button class="group-subtab-btn ${(mainTab === 'tabel' || (mainTab === 'split' && tabG1 === 'tabel')) ? 'active g1-active' : ''}" data-group="g1" data-quiz-tab="tabel">
                                <i data-lucide="table"></i> Kuis 1: Tabel (${cG1_tabel}/36 Pts)
                            </button>
                            <button class="group-subtab-btn ${(mainTab === 'gambar' || (mainTab === 'split' && tabG1 === 'gambar')) ? 'active g1-active' : ''}" data-group="g1" data-quiz-tab="gambar">
                                <i data-lucide="image"></i> Kuis 2: Gambar (${cG1_gambar}/16 Pts)
                            </button>
                        </div>

                        <!-- SCROLL AREA KELOMPOK 1 -->
                        <div class="cell-quiz-group-scroll" id="comb-scroll-g1">
                            ${(mainTab === 'tabel' || (mainTab === 'split' && tabG1 === 'tabel')) ? `
                                <!-- KUIS 1: TABEL PERBANDINGAN G1 -->
                                ${CELL_COMPARISON_DATA.map((item) => {
                                    const selF = this.cellQuizSelectionsGroup1[`f_${item.id}`] || "";
                                    const selH = this.cellQuizSelectionsGroup1[`h_${item.id}`] || "";
                                    const selT = this.cellQuizSelectionsGroup1[`t_${item.id}`] || "";
                                    const fClass = selF !== "" ? (selF === item.correctFuncId ? "sel-correct" : "sel-wrong") : "";
                                    const hClass = selH !== "" ? (selH === item.hewan ? "sel-correct" : "sel-wrong") : "";
                                    const tClass = selT !== "" ? (selT === item.tumbuhan ? "sel-correct" : "sel-wrong") : "";

                                    return `
                                        <div class="cell-quiz-card">
                                            <div class="cell-quiz-card-header">
                                                <span class="cell-quiz-card-num">#${item.id}</span>
                                                <div class="cell-organelle-name">
                                                    <div class="cell-organelle-icon"><i data-lucide="${item.icon}"></i></div>
                                                    <span>${item.name}</span>
                                                </div>
                                            </div>

                                            <div class="cell-quiz-card-body">
                                                <div class="cell-quiz-field">
                                                    <label>💡 Fungsi Utama:</label>
                                                    <select class="cell-quiz-select ${fClass}" data-group="g1" data-field="f_${item.id}">
                                                        <option value="">-- Pilih Fungsi Organel --</option>
                                                        ${FUNCTIONS_LIST.map(f => `
                                                            <option value="${f.id}" ${selF === f.id ? 'selected' : ''}>${f.text}</option>
                                                        `).join('')}
                                                    </select>
                                                </div>

                                                <div class="cell-quiz-field-row">
                                                    <div class="cell-quiz-field" style="flex: 1;">
                                                        <label>🦁 Sel Hewan:</label>
                                                        <select class="cell-quiz-select ${hClass}" data-group="g1" data-field="h_${item.id}">
                                                            <option value="">-- Pilih --</option>
                                                            <option value="ada" ${selH === 'ada' ? 'selected' : ''}>Ada</option>
                                                            <option value="tidak_ada" ${selH === 'tidak_ada' ? 'selected' : ''}>Tidak Ada</option>
                                                        </select>
                                                    </div>
                                                    <div class="cell-quiz-field" style="flex: 1;">
                                                        <label>🌿 Sel Tumbuhan:</label>
                                                        <select class="cell-quiz-select ${tClass}" data-group="g1" data-field="t_${item.id}">
                                                            <option value="">-- Pilih --</option>
                                                            <option value="ada" ${selT === 'ada' ? 'selected' : ''}>Ada</option>
                                                            <option value="tidak_ada" ${selT === 'tidak_ada' ? 'selected' : ''}>Tidak Ada</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            ` : `
                                <!-- KUIS 2: GAMBAR ORGANEL G1 -->
                                <div class="diagram-quiz-container">
                                    <img src="image/BAB 1/sel_unlabeled_quiz.png" alt="Sel Hewan & Tumbuhan G1" class="diagram-quiz-img" />
                                    ${DIAGRAM_TARGETS.map(t => {
                                        const val = this.diagramMatchingGroup1[t.id] || "";
                                        const isSubmitted = this.diagramMatchingGroup1Submitted;
                                        const isRight = checkDiagramCorrect(t, val);
                                        let cls = "diagram-select-overlay";
                                        if (isSubmitted && val !== "") {
                                            cls += isRight ? " sel-correct" : " sel-wrong";
                                        }
                                        return `
                                            <select class="${cls}" data-group="g1" data-diagram-target="${t.id}" title="${t.title}"
                                                style="left: ${t.left}%; top: ${t.top}%; width: ${t.width}%; height: ${t.height}%;">
                                                <option value="">-- Pilih --</option>
                                                ${ORGANELLE_OPTIONS.filter(opt => opt !== "").map(opt => `
                                                    <option value="${opt}" ${val === opt ? 'selected' : ''}>${opt}</option>
                                                `).join('')}
                                            </select>
                                        `;
                                    }).join('')}
                                </div>
                            `}
                        </div>
                    </div>

                    <!-- KELOMPOK 2 COLUMN -->
                    <div class="cell-quiz-group-column g2">
                        <div class="cell-quiz-column-header">
                            <div class="cell-quiz-column-title" style="color: #06b6d4;">
                                <i data-lucide="zap"></i>
                                <span>KELOMPOK 2</span>
                                <span style="font-size:0.75rem; font-weight:600; opacity:0.85; margin-left:4px;">(${totalG2}/52 Pts)</span>
                            </div>
                            <div style="display: flex; gap: 0.4rem;">
                                <button class="cell-quiz-btn cell-quiz-btn-check btn-comb-check-g2 ripple" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">
                                    <i data-lucide="check-circle"></i> Periksa G2
                                </button>
                                <button class="cell-quiz-btn cell-quiz-btn-reset btn-comb-reset-g2 ripple" style="padding: 0.35rem 0.6rem; font-size: 0.78rem;" title="Reset Kelompok 2">
                                    <i data-lucide="rotate-ccw"></i>
                                </button>
                            </div>
                        </div>

                        <!-- INDEPENDENT SUB-TAB SELECTOR FOR KELOMPOK 2 -->
                        <div class="group-subtab-bar">
                            <button class="group-subtab-btn ${(mainTab === 'tabel' || (mainTab === 'split' && tabG2 === 'tabel')) ? 'active g2-active' : ''}" data-group="g2" data-quiz-tab="tabel">
                                <i data-lucide="table"></i> Kuis 1: Tabel (${cG2_tabel}/36 Pts)
                            </button>
                            <button class="group-subtab-btn ${(mainTab === 'gambar' || (mainTab === 'split' && tabG2 === 'gambar')) ? 'active g2-active' : ''}" data-group="g2" data-quiz-tab="gambar">
                                <i data-lucide="image"></i> Kuis 2: Gambar (${cG2_gambar}/16 Pts)
                            </button>
                        </div>

                        <!-- SCROLL AREA KELOMPOK 2 -->
                        <div class="cell-quiz-group-scroll" id="comb-scroll-g2">
                            ${(mainTab === 'tabel' || (mainTab === 'split' && tabG2 === 'tabel')) ? `
                                <!-- KUIS 1: TABEL PERBANDINGAN G2 -->
                                ${CELL_COMPARISON_DATA.map((item) => {
                                    const selF = this.cellQuizSelectionsGroup2[`f_${item.id}`] || "";
                                    const selH = this.cellQuizSelectionsGroup2[`h_${item.id}`] || "";
                                    const selT = this.cellQuizSelectionsGroup2[`t_${item.id}`] || "";
                                    const fClass = selF !== "" ? (selF === item.correctFuncId ? "sel-correct" : "sel-wrong") : "";
                                    const hClass = selH !== "" ? (selH === item.hewan ? "sel-correct" : "sel-wrong") : "";
                                    const tClass = selT !== "" ? (selT === item.tumbuhan ? "sel-correct" : "sel-wrong") : "";

                                    return `
                                        <div class="cell-quiz-card">
                                            <div class="cell-quiz-card-header">
                                                <span class="cell-quiz-card-num">#${item.id}</span>
                                                <div class="cell-organelle-name">
                                                    <div class="cell-organelle-icon"><i data-lucide="${item.icon}"></i></div>
                                                    <span>${item.name}</span>
                                                </div>
                                            </div>

                                            <div class="cell-quiz-card-body">
                                                <div class="cell-quiz-field">
                                                    <label>💡 Fungsi Utama:</label>
                                                    <select class="cell-quiz-select ${fClass}" data-group="g2" data-field="f_${item.id}">
                                                        <option value="">-- Pilih Fungsi Organel --</option>
                                                        ${FUNCTIONS_LIST.map(f => `
                                                            <option value="${f.id}" ${selF === f.id ? 'selected' : ''}>${f.text}</option>
                                                        `).join('')}
                                                    </select>
                                                </div>

                                                <div class="cell-quiz-field-row">
                                                    <div class="cell-quiz-field" style="flex: 1;">
                                                        <label>🦁 Sel Hewan:</label>
                                                        <select class="cell-quiz-select ${hClass}" data-group="g2" data-field="h_${item.id}">
                                                            <option value="">-- Pilih --</option>
                                                            <option value="ada" ${selH === 'ada' ? 'selected' : ''}>Ada</option>
                                                            <option value="tidak_ada" ${selH === 'tidak_ada' ? 'selected' : ''}>Tidak Ada</option>
                                                        </select>
                                                    </div>
                                                    <div class="cell-quiz-field" style="flex: 1;">
                                                        <label>🌿 Sel Tumbuhan:</label>
                                                        <select class="cell-quiz-select ${tClass}" data-group="g2" data-field="t_${item.id}">
                                                            <option value="">-- Pilih --</option>
                                                            <option value="ada" ${selT === 'ada' ? 'selected' : ''}>Ada</option>
                                                            <option value="tidak_ada" ${selT === 'tidak_ada' ? 'selected' : ''}>Tidak Ada</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            ` : `
                                <!-- KUIS 2: GAMBAR ORGANEL G2 -->
                                <div class="diagram-quiz-container">
                                    <img src="image/BAB 1/sel_unlabeled_quiz.png" alt="Sel Hewan & Tumbuhan G2" class="diagram-quiz-img" />
                                    ${DIAGRAM_TARGETS.map(t => {
                                        const val = this.diagramMatchingGroup2[t.id] || "";
                                        const isSubmitted = this.diagramMatchingGroup2Submitted;
                                        const isRight = checkDiagramCorrect(t, val);
                                        let cls = "diagram-select-overlay";
                                        if (isSubmitted && val !== "") {
                                            cls += isRight ? " sel-correct" : " sel-wrong";
                                        }
                                        return `
                                            <select class="${cls}" data-group="g2" data-diagram-target="${t.id}" title="${t.title}"
                                                style="left: ${t.left}%; top: ${t.top}%; width: ${t.width}%; height: ${t.height}%;">
                                                <option value="">-- Pilih --</option>
                                                ${ORGANELLE_OPTIONS.filter(opt => opt !== "").map(opt => `
                                                    <option value="${opt}" ${val === opt ? 'selected' : ''}>${opt}</option>
                                                `).join('')}
                                            </select>
                                        `;
                                    }).join('')}
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        const wrapper = container.querySelector('#combined-quiz-wrapper-el');

        wrapper.querySelectorAll('.cell-quiz-tab-btn[data-main-tab]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.getAttribute('data-main-tab');
                this.combinedMainViewTab = tab;
                this.initCellCombinedQuiz(container);
            });
        });

        wrapper.querySelectorAll('.group-subtab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const group = e.currentTarget.getAttribute('data-group');
                const quizTab = e.currentTarget.getAttribute('data-quiz-tab');
                if (group === 'g1') this.combinedQuizTabG1 = quizTab;
                if (group === 'g2') this.combinedQuizTabG2 = quizTab;
                this.initCellCombinedQuiz(container);
            });
        });

        wrapper.querySelectorAll('.cell-quiz-select[data-field]').forEach(sel => {
            sel.addEventListener('change', (e) => {
                const group = e.target.getAttribute('data-group');
                const field = e.target.getAttribute('data-field');
                const val = e.target.value;
                if (group === 'g1') this.cellQuizSelectionsGroup1[field] = val;
                if (group === 'g2') this.cellQuizSelectionsGroup2[field] = val;

                this.updateCombinedScoresDisplay(wrapper, CELL_COMPARISON_DATA, DIAGRAM_TARGETS, checkDiagramCorrect);
            });
        });

        wrapper.querySelectorAll('.diagram-select-overlay[data-diagram-target]').forEach(sel => {
            sel.addEventListener('change', (e) => {
                const group = e.target.getAttribute('data-group');
                const targetId = e.target.getAttribute('data-diagram-target');
                const val = e.target.value;
                if (group === 'g1') this.diagramMatchingGroup1[targetId] = val;
                if (group === 'g2') this.diagramMatchingGroup2[targetId] = val;

                this.updateCombinedScoresDisplay(wrapper, CELL_COMPARISON_DATA, DIAGRAM_TARGETS, checkDiagramCorrect);
            });
        });

        const btnCheckG1 = wrapper.querySelector('.btn-comb-check-g1');
        if (btnCheckG1) {
            btnCheckG1.addEventListener('click', () => {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
                this.diagramMatchingGroup1Submitted = true;
                this.initCellCombinedQuiz(container);

                let scTabel = 0;
                CELL_COMPARISON_DATA.forEach(item => {
                    if (this.cellQuizSelectionsGroup1[`f_${item.id}`] === item.correctFuncId) scTabel++;
                    if (this.cellQuizSelectionsGroup1[`h_${item.id}`] === item.hewan) scTabel++;
                    if (this.cellQuizSelectionsGroup1[`t_${item.id}`] === item.tumbuhan) scTabel++;
                });

                let scGambar = 0;
                DIAGRAM_TARGETS.forEach(t => {
                    if (checkDiagramCorrect(t, this.diagramMatchingGroup1[t.id])) scGambar++;
                });

                const total = scTabel + scGambar;
                if (total === 52) {
                    if (typeof AudioSynth !== 'undefined' && AudioSynth.playSuccess) AudioSynth.playSuccess();
                    alert("🎉 SEMPURNA! Kelompok 1 berhasil meraih skor 52 / 52 Poin (Kuis Tabel 36/36 & Kuis Gambar 16/16)!");
                } else {
                    alert(`📊 Hasil Kelompok 1:\n- Kuis 1 (Tabel): ${scTabel} / 36 Poin\n- Kuis 2 (Gambar): ${scGambar} / 16 Poin\nTotal Skor: ${total} / 52 Poin`);
                }
            });
        }

        const btnCheckG2 = wrapper.querySelector('.btn-comb-check-g2');
        if (btnCheckG2) {
            btnCheckG2.addEventListener('click', () => {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
                this.diagramMatchingGroup2Submitted = true;
                this.initCellCombinedQuiz(container);

                let scTabel = 0;
                CELL_COMPARISON_DATA.forEach(item => {
                    if (this.cellQuizSelectionsGroup2[`f_${item.id}`] === item.correctFuncId) scTabel++;
                    if (this.cellQuizSelectionsGroup2[`h_${item.id}`] === item.hewan) scTabel++;
                    if (this.cellQuizSelectionsGroup2[`t_${item.id}`] === item.tumbuhan) scTabel++;
                });

                let scGambar = 0;
                DIAGRAM_TARGETS.forEach(t => {
                    if (checkDiagramCorrect(t, this.diagramMatchingGroup2[t.id])) scGambar++;
                });

                const total = scTabel + scGambar;
                if (total === 52) {
                    if (typeof AudioSynth !== 'undefined' && AudioSynth.playSuccess) AudioSynth.playSuccess();
                    alert("🎉 SEMPURNA! Kelompok 2 berhasil meraih skor 52 / 52 Poin (Kuis Tabel 36/36 & Kuis Gambar 16/16)!");
                } else {
                    alert(`📊 Hasil Kelompok 2:\n- Kuis 1 (Tabel): ${scTabel} / 36 Poin\n- Kuis 2 (Gambar): ${scGambar} / 16 Poin\nTotal Skor: ${total} / 52 Poin`);
                }
            });
        }

        const btnResetG1 = wrapper.querySelector('.btn-comb-reset-g1');
        if (btnResetG1) {
            btnResetG1.addEventListener('click', () => {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
                this.cellQuizSelectionsGroup1 = {};
                this.diagramMatchingGroup1 = {};
                this.diagramMatchingGroup1Submitted = false;
                this.initCellCombinedQuiz(container);
            });
        }

        const btnResetG2 = wrapper.querySelector('.btn-comb-reset-g2');
        if (btnResetG2) {
            btnResetG2.addEventListener('click', () => {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
                this.cellQuizSelectionsGroup2 = {};
                this.diagramMatchingGroup2 = {};
                this.diagramMatchingGroup2Submitted = false;
                this.initCellCombinedQuiz(container);
            });
        }

        const btnFs = wrapper.querySelector('#btn-combined-quiz-fs');
        if (btnFs) {
            btnFs.addEventListener('click', () => {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
                if (!document.fullscreenElement) {
                    if (wrapper.requestFullscreen) {
                        wrapper.requestFullscreen().then(() => {
                            wrapper.classList.add('is-quiz-fullscreen');
                        }).catch(() => {
                            wrapper.classList.toggle('is-quiz-fullscreen');
                        });
                    } else {
                        wrapper.classList.toggle('is-quiz-fullscreen');
                    }
                } else {
                    if (document.exitFullscreen) document.exitFullscreen();
                    wrapper.classList.remove('is-quiz-fullscreen');
                }
            });
        }

        const handleFsChange = () => {
            if (document.fullscreenElement === wrapper) {
                wrapper.classList.add('is-quiz-fullscreen');
            } else {
                wrapper.classList.remove('is-quiz-fullscreen');
            }
        };
        document.removeEventListener('fullscreenchange', handleFsChange);
        document.addEventListener('fullscreenchange', handleFsChange);


        const btnHint = wrapper.querySelector('#btn-combined-quiz-hint');
        if (btnHint) {
            btnHint.addEventListener('click', () => {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
                this.openCombinedHintModal(CELL_COMPARISON_DATA);
            });
        }
    },

    updateCombinedScoresDisplay(wrapper, cellData, diagramTargets, checkDiagramCorrect) {
        let scG1_tabel = 0;
        let scG2_tabel = 0;
        cellData.forEach(item => {
            if (this.cellQuizSelectionsGroup1[`f_${item.id}`] === item.correctFuncId) scG1_tabel++;
            if (this.cellQuizSelectionsGroup1[`h_${item.id}`] === item.hewan) scG1_tabel++;
            if (this.cellQuizSelectionsGroup1[`t_${item.id}`] === item.tumbuhan) scG1_tabel++;

            if (this.cellQuizSelectionsGroup2[`f_${item.id}`] === item.correctFuncId) scG2_tabel++;
            if (this.cellQuizSelectionsGroup2[`h_${item.id}`] === item.hewan) scG2_tabel++;
            if (this.cellQuizSelectionsGroup2[`t_${item.id}`] === item.tumbuhan) scG2_tabel++;
        });

        let scG1_gambar = 0;
        let scG2_gambar = 0;
        diagramTargets.forEach(t => {
            if (checkDiagramCorrect(t, this.diagramMatchingGroup1[t.id])) scG1_gambar++;
            if (checkDiagramCorrect(t, this.diagramMatchingGroup2[t.id])) scG2_gambar++;
        });

        const totalG1 = scG1_tabel + scG1_gambar;
        const totalG2 = scG2_tabel + scG2_gambar;

        const scG1El = wrapper.querySelector('#comb-score-g1-num');
        const scG2El = wrapper.querySelector('#comb-score-g2-num');
        if (scG1El) scG1El.innerText = `${totalG1} / 52 Poin`;
        if (scG2El) scG2El.innerText = `${totalG2} / 52 Poin`;
    },

    openCombinedHintModal(cellData) {
        let modalEl = document.getElementById('combined-hint-modal-el');
        if (!modalEl) {
            modalEl = document.createElement('div');
            modalEl.id = 'combined-hint-modal-el';
            modalEl.className = 'diagram-hint-modal';
            document.body.appendChild(modalEl);
        }

        modalEl.innerHTML = `
            <div class="diagram-hint-content" style="max-width: 820px;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding:0.85rem 1.2rem; background:rgba(30,41,59,0.9);">
                    <h3 style="font-family:var(--font-display); font-size:1.1rem; color:var(--color-bio-sel); display:flex; align-items:center; gap:0.5rem; margin:0;">
                        <i data-lucide="book-open"></i> Kunci Jawaban & Penjelasan Kuis Organel Sel
                    </h3>
                    <button id="btn-close-comb-hint" class="btn-close" style="font-size:1.5rem; cursor:pointer;">&times;</button>
                </div>

                <div style="display:flex; flex-direction:column; gap:1rem; padding:1.2rem; flex:1; overflow-y:auto;">
                    <!-- SECTION 1: GAMBAR DIAGRAM -->
                    <div>
                        <h4 style="color:#10b981; margin:0 0 0.5rem 0; font-family:var(--font-display); font-size:1rem; display:flex; align-items:center; gap:0.4rem;">
                            <i data-lucide="image"></i> 1. Kunci Jawaban Diagram Organel Sel
                        </h4>
                        <img src="image/BAB 1/sel_labeled_answer.jpg" alt="Kunci Jawaban Organel Sel" style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2px solid rgba(255,255,255,0.1);" />
                    </div>

                    <hr style="border:0; border-top:1px solid rgba(255,255,255,0.1); margin:0.5rem 0;" />

                    <!-- SECTION 2: TABEL FUNGSI -->
                    <div>
                        <h4 style="color:#06b6d4; margin:0 0 0.75rem 0; font-family:var(--font-display); font-size:1rem; display:flex; align-items:center; gap:0.4rem;">
                            <i data-lucide="table"></i> 2. Penjelasan Fungsi & Keberadaan Organel
                        </h4>
                        <div style="display:flex; flex-direction:column; gap:0.65rem;">
                            ${cellData.map(item => `
                                <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:0.75rem;">
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem; flex-wrap:wrap; gap:0.4rem;">
                                        <strong style="color:var(--text-primary); font-size:0.9rem; display:flex; align-items:center; gap:0.4rem;">
                                            <i data-lucide="${item.icon}" style="color:var(--color-bio-sel);"></i> ${item.name}
                                        </strong>
                                        <div style="display:flex; gap:0.4rem; font-size:0.72rem;">
                                            <span style="padding:2px 8px; border-radius:12px; background:${item.hewan === 'ada' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; color:${item.hewan === 'ada' ? '#10b981' : '#ef4444'}; font-weight:600;">
                                                Hewan: ${item.hewan === 'ada' ? 'Ada' : 'Tidak Ada'}
                                            </span>
                                            <span style="padding:2px 8px; border-radius:12px; background:${item.tumbuhan === 'ada' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; color:${item.tumbuhan === 'ada' ? '#10b981' : '#ef4444'}; font-weight:600;">
                                                Tumbuhan: ${item.tumbuhan === 'ada' ? 'Ada' : 'Tidak Ada'}
                                            </span>
                                        </div>
                                    </div>
                                    <p style="font-size:0.82rem; color:#10b981; font-weight:600; margin:0.2rem 0 0.3rem 0;">💡 Fungsi: ${item.funcText}</p>
                                    <p style="font-size:0.8rem; color:var(--text-secondary); margin:0; line-height:1.35;">${item.desc}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        const btnClose = modalEl.querySelector('#btn-close-comb-hint');
        if (btnClose) {
            btnClose.addEventListener('click', () => modalEl.remove());
        }
        modalEl.addEventListener('click', (e) => {
            if (e.target === modalEl) modalEl.remove();
        });
    },

    /* CETAK / DOWNLOAD LKPD MANUAL TP.1 PDF */
    generateTP1PDF() {
        let modal = document.getElementById('pdf-preview-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'pdf-preview-modal';
            modal.className = 'modal-overlay hidden';
            document.body.appendChild(modal);
        }

        const questionsHTML = TP1_QUESTIONS.map(q => {
            let bodyHTML = '';
            if (q.type === 'pg') {
                bodyHTML = `<div class="pdf-options" style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-left:10px; font-size:12px;">${q.options.map(o => `<div>[ &nbsp; ] ${o}</div>`).join('')}</div>`;
            } else if (q.type === 'isian') {
                bodyHTML = `<div class="pdf-fill-line" style="margin-top:5px; font-style:italic; font-size:12px;">Jawab: __________________________________________________</div>`;
            } else if (q.type === 'bs') {
                bodyHTML = `<div class="pdf-bs" style="margin-top:4px; font-weight:bold; font-size:12px;">Pilihan: ( &nbsp; B &nbsp; / &nbsp; S &nbsp; )</div>`;
            } else if (q.type === 'pg_kompleks') {
                bodyHTML = `<div class="pdf-options" style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-left:10px; font-size:12px;">${q.options.map(o => `<div>[ &nbsp; ] (${o.id}) ${o.text}</div>`).join('')}</div>`;
            } else if (q.type === 'jodoh') {
                bodyHTML = `
                    <div class="pdf-matching" style="margin-top:4px; border:1px dashed #666; padding:6px;">
                        <table style="width:100%; font-size:12px; border-collapse:collapse; color:#000;">
                            <tr>
                                <td style="width:45%; vertical-align:top;">
                                    ${q.leftItems.map(l => `<div>${l.label}</div>`).join('')}
                                </td>
                                <td style="width:55%; vertical-align:top;">
                                    ${q.rightItems.map(r => `<div>${r.label}</div>`).join('')}
                                </td>
                            </tr>
                        </table>
                        <div style="margin-top:6px; font-weight:bold; font-size:12px;">Pasangan: 1-___ &nbsp;&nbsp; 2-___ &nbsp;&nbsp; 3-___ &nbsp;&nbsp; 4-___</div>
                    </div>
                `;
            }

            return `
                <div class="pdf-q-item" style="margin-bottom:14px; page-break-inside:avoid;">
                    <div class="pdf-q-title" style="font-weight:bold; font-size:13px; margin-bottom:2px;"><strong>Soal No. ${q.id}</strong> [${q.typeLabel}]</div>
                    <div class="pdf-q-text" style="font-size:13px; margin-bottom:5px;">${q.text}</div>
                    ${bodyHTML}
                </div>
            `;
        }).join('');

        const fullDocumentHTML = `
            <div style="text-align:center; border-bottom:3px double #000; padding-bottom:10px; margin-bottom:15px;">
                <h2 style="margin:0 0 4px 0; font-size:18px; text-transform:uppercase; color:#000;">LEMBAR KERJA PESERTA DIDIK (LKPD) MANUAL</h2>
                <h3 style="margin:0 0 4px 0; font-size:15px; color:#000;">TUGAS PEMBELAJARAN (TP.1) : KONSEP & STRUKTUR SEL</h3>
                <p style="margin:0; font-size:12px; font-style:italic; color:#333;">Mata Pelajaran: IPA / Biologi | Kelas VIII SMP/MTs | Total: 25 Soal Evaluasi</p>
            </div>

            <div style="display:flex; justify-content:space-between; border:1px solid #000; padding:8px 12px; margin-bottom:15px; font-weight:bold; font-size:12px; color:#000;">
                <div>NAMA KELOMPOK / SISWA: ___________________________</div>
                <div>KELAS: __________</div>
                <div>NO. ABSEN: _____</div>
            </div>

            <p style="font-size:11px; margin-bottom:15px; font-style:italic; color:#444;">
                * Petunjuk: Isilah jawaban pada lembar LKPD manual ini terlebih dahulu. Setelah selesai, kumpulkan dan masukkan hasilnya pada Papan Tulis Interaktif di layar presentasi!
            </p>

            ${questionsHTML}

            <div style="margin-top:30px; text-align:right; color:#000; font-size:12px; page-break-inside:avoid;">
                <p>Tanggal Pengerjaan: ___________________________</p>
                <p style="margin-top:40px;">Tanda Tangan Guru / Pembimbing: ____________________</p>
            </div>
        `;

        modal.innerHTML = `
            <div class="modal-container card animate-zoom-in" style="max-width: 950px; width: 95%; max-height: 90vh; display:flex; flex-direction:column; background: #0f172a; border: 1px solid rgba(255,255,255,0.2);">
                <button id="btn-close-pdf-modal" class="btn-close">&times;</button>
                <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center; flex-shrink:0; padding: 1rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <div style="display:flex; align-items:center; gap:0.75rem;">
                        <i data-lucide="file-text" class="header-icon" style="color: #10b981; width: 28px; height: 28px;"></i>
                        <div>
                            <h3 style="margin:0; font-size: 1.1rem; color: #ffffff;">Dokumen LKPD Manual TP.1 (Siap Cetak PDF)</h3>
                            <p style="margin:0; font-size: 0.8rem; color: var(--text-secondary);">25 Soal Evaluasi Konsep Sel — Siap Dicetak untuk Peserta Didik</p>
                        </div>
                    </div>
                    <div style="display:flex; gap:0.5rem;">
                        <button id="btn-print-pdf-win" class="btn-primary ripple" style="padding: 0.5rem 1rem; font-size: 0.85rem; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);">
                            <i data-lucide="external-link"></i>
                            <span>Buka Jendela Cetak PDF</span>
                        </button>
                        <button id="btn-print-pdf-direct" class="btn-primary ripple" style="padding: 0.5rem 1.1rem; font-size: 0.85rem; background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                            <i data-lucide="printer"></i>
                            <span>Cetak Langsung</span>
                        </button>
                    </div>
                </div>
                <div class="modal-body" style="flex:1; overflow-y:auto; background:#ffffff; color:#000000; padding:2.5rem; border-radius:8px; margin: 1rem; font-family:'Times New Roman', Times, serif;" id="pdf-printable-area">
                    ${fullDocumentHTML}
                </div>
            </div>
        `;

        lucide.createIcons();
        modal.classList.remove('hidden');
        modal.style.display = 'flex';

        document.getElementById('btn-close-pdf-modal').addEventListener('click', () => {
            AudioSynth.playClick();
            modal.classList.add('hidden');
            modal.style.display = 'none';
        });

        // Handler Cetak Langsung
        document.getElementById('btn-print-pdf-direct').addEventListener('click', () => {
            AudioSynth.playClick();
            window.print();
        });

        // Handler Buka Jendela Cetak Baru (Print Window popup)
        document.getElementById('btn-print-pdf-win').addEventListener('click', () => {
            AudioSynth.playClick();
            const printWin = window.open('', '_blank', 'width=900,height=800');
            if (printWin) {
                printWin.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>LKPD TP.1 Konsep Sel - Siap Cetak</title>
                        <style>
                            body { font-family: 'Times New Roman', Times, serif; padding: 2cm; background: #fff; color: #000; }
                            @page { size: A4; margin: 1.5cm; }
                            .pdf-q-item { page-break-inside: avoid; }
                        </style>
                    </head>
                    <body>
                        ${fullDocumentHTML}
                        <script>
                            window.onload = function() {
                                window.print();
                            };
                        </script>
                    </body>
                    </html>
                `);
                printWin.document.close();
            } else {
                window.print();
            }
        });
    },

    openImageModal(src, caption) {
        let modal = document.getElementById('image-zoom-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'image-zoom-modal';
            modal.className = 'modal-overlay hidden';
            document.body.appendChild(modal);
        }
        modal.innerHTML = `
            <div class="modal-container card animate-zoom-in" style="max-width: 90vw; max-height: 90vh; padding: 1.5rem; display:flex; flex-direction:column; align-items:center; background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255,255,255,0.2); z-index: 10000;">
                <button id="btn-close-img-modal" class="btn-close">&times;</button>
                <h4 style="margin-bottom:1rem; color:white; font-size:1.1rem; display:flex; align-items:center; gap:0.5rem;">
                    <i data-lucide="image" style="color:var(--slide-accent)"></i>
                    <span>${caption}</span>
                </h4>
                <div style="flex:1; width:100%; display:flex; justify-content:center; align-items:center; overflow:hidden;">
                    <img src="${src}" alt="${caption}" style="max-width:100%; max-height:75vh; object-fit:contain; border-radius:8px; box-shadow: 0 10px 30px rgba(0,0,0,0.6);" />
                </div>
            </div>
        `;
        lucide.createIcons();
        modal.classList.remove('hidden');
        modal.style.display = 'flex';

        document.getElementById('btn-close-img-modal').addEventListener('click', () => {
            AudioSynth.playClick();
            modal.classList.add('hidden');
            modal.style.display = 'none';
        });
    }
};

// ============================================================
// FULLSCREEN CONTROLLER
// ============================================================
const FullscreenController = {
    isFullscreen: false,

    init() {
        // Bind all three fullscreen buttons
        const btnCover   = document.getElementById('btn-fullscreen-cover');
        const btnHeader  = document.getElementById('btn-fullscreen-header');
        const btnFloat   = document.getElementById('btn-fullscreen-float');

        if (btnCover)  btnCover.addEventListener('click',  () => this.toggle());
        if (btnHeader) btnHeader.addEventListener('click', () => this.toggle());
        if (btnFloat)  btnFloat.addEventListener('click',  () => this.toggle());

        // Listen for external fullscreen changes (e.g. user presses Esc)
        document.addEventListener('fullscreenchange',       () => this.onStateChange());
        document.addEventListener('webkitfullscreenchange', () => this.onStateChange());
        document.addEventListener('mozfullscreenchange',    () => this.onStateChange());
        document.addEventListener('msfullscreenchange',     () => this.onStateChange());
    },

    toggle() {
        if (!this.isFullscreen) {
            this.enter();
        } else {
            this.exit();
        }
    },

    enter() {
        const el = document.documentElement;
        if (el.requestFullscreen)            el.requestFullscreen();
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
        else if (el.mozRequestFullScreen)    el.mozRequestFullScreen();
        else if (el.msRequestFullscreen)     el.msRequestFullscreen();
    },

    exit() {
        if (document.exitFullscreen)            document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen)  document.mozCancelFullScreen();
        else if (document.msExitFullscreen)     document.msExitFullscreen();
    },

    onStateChange() {
        this.isFullscreen = !!(
            document.fullscreenElement       ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement    ||
            document.msFullscreenElement
        );
        this.updateIcons();
    },

    updateIcons() {
        // Switch icon: maximize <-> minimize
        const iconName = this.isFullscreen ? 'minimize' : 'maximize';

        const iconIds = ['fs-cover-icon', 'fs-header-icon', 'fs-float-icon'];
        iconIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.setAttribute('data-lucide', iconName);
            }
        });

        // Re-render Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Update tooltip labels
        const label = this.isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh';
        ['btn-fullscreen-cover', 'btn-fullscreen-header', 'btn-fullscreen-float'].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.title = label;
                // Update inner text span for cover button
                const span = btn.querySelector('span');
                if (span) span.textContent = this.isFullscreen ? 'Keluar Penuh' : 'Layar Penuh';
            }
        });
    }
};

// Start the app once DOM content is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    App.init();
    FullscreenController.init();
});

/* ============================================================
   INTERACTIVE PDF PRESENTATION SLIDE VIEWER ENGINE
   ============================================================ */
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let pdfScale = 1.2;

if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

function renderPdfPage(num) {
    const canvas = document.getElementById('pdf-render-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!pdfDoc || !ctx) return;
    
    pageRendering = true;

    pdfDoc.getPage(num).then(function(page) {
        const viewport = page.getViewport({ scale: pdfScale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        const renderTask = page.render(renderContext);

        renderTask.promise.then(function() {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPdfPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });

    const pageBadge = document.getElementById('pdf-page-num-display');
    if (pageBadge) {
        pageBadge.textContent = `Slide ${num} / ${pdfDoc.numPages}`;
    }
    const zoomText = document.getElementById('pdf-zoom-level');
    if (zoomText) {
        zoomText.textContent = `${Math.round(pdfScale * 100)}%`;
    }
}

function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPdfPage(num);
    }
}

function onPrevPdfPage() {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
}

function onNextPdfPage() {
    if (!pdfDoc || pageNum >= pdfDoc.numPages) return;
    pageNum++;
    queueRenderPage(pageNum);
}

window.openPdfPresentation = function(pdfUrl, title = 'Presentasi Slide PDF') {
    const modal = document.getElementById('pdf-viewer-modal');
    const titleEl = document.getElementById('pdf-doc-title');
    const spinner = document.getElementById('pdf-loading-spinner');
    const viewportArea = document.getElementById('pdf-viewport-area');
    const encodedPdfUrl = encodeURI(pdfUrl);
    
    if (titleEl) titleEl.textContent = title;
    if (modal) modal.classList.remove('hidden');
    if (spinner) spinner.classList.remove('hidden');

    pageNum = 1;
    pdfScale = 1.2;

    const fallbackToIframe = () => {
        if (spinner) spinner.classList.add('hidden');
        if (viewportArea) {
            let iframe = viewportArea.querySelector('#pdf-modal-fallback-iframe');
            if (!iframe) {
                iframe = document.createElement('iframe');
                iframe.id = 'pdf-modal-fallback-iframe';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = 'none';
                iframe.style.borderRadius = '8px';
                iframe.style.background = '#ffffff';
                viewportArea.appendChild(iframe);
            }
            const wrapper = viewportArea.querySelector('#pdf-canvas-wrapper');
            if (wrapper) wrapper.style.display = 'none';
            iframe.style.display = 'block';
            iframe.src = `${encodedPdfUrl}#toolbar=1&navpanes=1`;
        }
    };

    if (typeof pdfjsLib === 'undefined') {
        fallbackToIframe();
        return;
    }

    let modalPdfPromise = null;
    window.PDF_DATA_STORE = window.PDF_DATA_STORE || {};
    if (window.PERTEMUAN3_PDF_DATA) {
        window.PDF_DATA_STORE['BAB 1/pertemuan3.pdf'] = window.PERTEMUAN3_PDF_DATA;
    }

    const targetB64Modal = window.PDF_DATA_STORE[pdfUrl] || (pdfUrl.includes('pertemuan3.pdf') ? window.PERTEMUAN3_PDF_DATA : null);

    if (targetB64Modal) {
        try {
            const rawData = atob(targetB64Modal);
            const uint8Arr = new Uint8Array(rawData.length);
            for (let i = 0; i < rawData.length; i++) {
                uint8Arr[i] = rawData.charCodeAt(i);
            }
            modalPdfPromise = pdfjsLib.getDocument({ data: uint8Arr }).promise;
        } catch (e) {
            modalPdfPromise = pdfjsLib.getDocument(encodedPdfUrl).promise;
        }
    } else {
        modalPdfPromise = pdfjsLib.getDocument(encodedPdfUrl).promise;
    }

    modalPdfPromise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        if (spinner) spinner.classList.add('hidden');
        const wrapper = viewportArea ? viewportArea.querySelector('#pdf-canvas-wrapper') : null;
        const iframe = viewportArea ? viewportArea.querySelector('#pdf-modal-fallback-iframe') : null;
        if (wrapper) wrapper.style.display = 'flex';
        if (iframe) iframe.style.display = 'none';
        renderPdfPage(pageNum);
    }).catch(function(err) {
        console.warn('CORS or loading error in modal PDF viewer, falling back to native iframe:', err);
        fallbackToIframe();
    });
};

window.closePdfPresentation = function() {
    const modal = document.getElementById('pdf-viewer-modal');
    if (modal) modal.classList.add('hidden');
    pdfDoc = null;
};

// Global Event Listeners for PDF Viewer
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('pdf-prev-btn');
    const nextBtn = document.getElementById('pdf-next-btn');
    const closeBtn = document.getElementById('pdf-close-btn');
    const zoomInBtn = document.getElementById('pdf-zoom-in');
    const zoomOutBtn = document.getElementById('pdf-zoom-out');
    const fsBtn = document.getElementById('pdf-fullscreen-btn');

    if (prevBtn) prevBtn.addEventListener('click', onPrevPdfPage);
    if (nextBtn) nextBtn.addEventListener('click', onNextPdfPage);
    if (closeBtn) closeBtn.addEventListener('click', window.closePdfPresentation);

    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            if (pdfScale < 3.0) {
                pdfScale += 0.2;
                queueRenderPage(pageNum);
            }
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            if (pdfScale > 0.5) {
                pdfScale -= 0.2;
                queueRenderPage(pageNum);
            }
        });
    }

    if (fsBtn) {
        fsBtn.addEventListener('click', () => {
            const modalContainer = document.querySelector('.pdf-modal-container');
            if (!document.fullscreenElement) {
                if (modalContainer && modalContainer.requestFullscreen) modalContainer.requestFullscreen();
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
            }
        });
    }

    // Keyboard navigation (ArrowRight, ArrowLeft, Space, Escape)
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('pdf-viewer-modal');
        if (!modal || modal.classList.contains('hidden')) return;

        if (e.key === 'ArrowRight' || e.key === 'Space') {
            e.preventDefault();
            onNextPdfPage();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            onPrevPdfPage();
        } else if (e.key === 'Escape') {
            window.closePdfPresentation();
        }
    });
});

