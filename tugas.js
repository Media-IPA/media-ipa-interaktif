/* =========================================================
   PORTAL PENGUMPULAN TUGAS & PENILAIAN SISWA & GURU
   ========================================================= */

(function () {
    // Standard Curriculum Structure
    const CURRICULUM_DATA = {
        'Kelas 7': {
            'bab1': { title: 'Bab 1 - Hakikat Ilmu IPA & Pengukuran', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] },
            'bab2': { title: 'Bab 2 - Wujud Zat & Perubahannya', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] },
            'bab3': { title: 'Bab 3 - Suhu, Pemuaian & Kalor', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] },
            'bab4': { title: 'Bab 4 - Gaya dan Gerak', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] },
            'bab5': { title: 'Bab 5 - Klasifikasi Makhluk Hidup', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] },
            'bab6': { title: 'Bab 6 - Ekologi & Keanekaragaman Hayati', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] },
            'bab7': { title: 'Bab 7 - Bumi dan Tata Surya', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] }
        },
        'Kelas 8': {
            'bab1': { title: 'Bab 1 - Pengenalan Sel', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] },
            'bab2': { title: 'Bab 2 - Struktur & Fungsi Tubuh', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4', 'Pertemuan 5', 'Pertemuan 6'] },
            'bab3': { title: 'Bab 3 - Usaha, Energi & Pesawat Sederhana', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] },
            'bab4': { title: 'Bab 4 - Getaran, Gelombang & Cahaya', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] },
            'bab5': { title: 'Bab 5 - Unsur, Senyawa & Campuran', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] },
            'bab6': { title: 'Bab 6 - Struktur Bumi & Perkembangan', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] }
        },
        'Kelas 9': {
            'bab1': { title: 'Bab 1 - Pertumbuhan & Perkembangan', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] },
            'bab2': { title: 'Bab 2 - Sistem Koordinasi & Reproduksi', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] },
            'bab3': { title: 'Bab 3 - Tekanan Zat & Penerapannya', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] },
            'bab4': { title: 'Bab 4 - Listrik & Kemagnetan', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] },
            'bab5': { title: 'Bab 5 - Pewarisan Sifat & Bioteknologi', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] },
            'bab6': { title: 'Bab 6 - Isu-Isu Lingkungan', meetings: ['Pertemuan 1', 'Pertemuan 2', 'Pertemuan 3', 'Pertemuan 4'] }
        }
    };

    window.MEDIA_IPA_CURRICULUM = CURRICULUM_DATA;

    // Storage Utilities
    function getAssignments() {
        try {
            return JSON.parse(localStorage.getItem('ipaApp_assignments')) || [];
        } catch (e) {
            return [];
        }
    }

    function saveAssignments(data) {
        try {
            localStorage.setItem('ipaApp_assignments', JSON.stringify(data));
        } catch (e) {
            alert('Penyimpanan browser penuh! Hapus beberapa tugas lama terlebih dahulu.');
        }
    }

    // Auto Detect Class from URL
    function detectDefaultClass() {
        const path = window.location.pathname.toUpperCase();
        if (path.includes('KELAS 7') || path.includes('KELAS%207')) return 'Kelas 7';
        if (path.includes('KELAS 8') || path.includes('KELAS%208')) return 'Kelas 8';
        if (path.includes('KELAS 9') || path.includes('KELAS%209')) return 'Kelas 9';
        return 'Kelas 7';
    }

    // Global Auto-Submit Function for Quizzes
    window.kirimNilaiKuisKeGuru = function(params) {
        const {
            kelas = detectDefaultClass(),
            babKey = 'bab1',
            babTitle = 'Bab 1',
            pertemuan = 'Pertemuan 1',
            category = 'mandiri', // 'mandiri' or 'kelompok'
            studentName = 'Siswa',
            teamMembers = [],
            title = 'Hasil Kuis Interaktif',
            score = 100,
            notes = ''
        } = params;

        const newTugas = {
            id: Date.now(),
            kelas,
            babKey,
            babTitle,
            pertemuan,
            category,
            studentName,
            teamMembers: Array.isArray(teamMembers) ? teamMembers : [studentName],
            type: 'quiz',
            title,
            scoreInput: score,
            grade: score, // Auto score for interactive quizzes
            feedback: 'Nilai Kuis Interaktif (Otomatis Tersimpan)',
            imageData: '',
            notes: notes || `Skor Kuis Interaktif: ${score}/100`,
            submittedAt: new Date().toLocaleString('id-ID'),
            timestamp: Date.now()
        };

        const assignments = getAssignments();
        assignments.unshift(newTugas);
        saveAssignments(assignments);

        alert(`Berhasil mengirimkan Nilai Kuis (${score}) atas nama ${studentName} ke Portal Guru!`);
    };

    // Inject Student Portal UI (Disabled as requested)
    function injectUI() {
        return;

        const modalHTML = `
        <!-- Floating Button -->
        <button id="btnOpenTugasFloating" class="btn-tugas-floating" title="Portal Pengumpulan Tugas Siswa">
            <i class="fa-solid fa-cloud-arrow-up"></i>
            <span>Portal Tugas</span>
        </button>

        <!-- Assignment Portal Modal -->
        <div id="tugasPortalModal" class="tugas-modal-overlay">
            <div class="tugas-modal-container">
                <div class="tugas-modal-header">
                    <h3><i class="fa-solid fa-graduation-cap"></i> Portal Pengumpulan Tugas & Kuis Siswa</h3>
                    <button class="tugas-modal-close" id="btnCloseTugasModal">&times;</button>
                </div>

                <div class="tugas-tabs-nav">
                    <button class="tugas-tab-btn active" data-tab="tabPapanTulis">
                        <i class="fa-solid fa-chalkboard"></i> Papan Tulis Digital
                    </button>
                    <button class="tugas-tab-btn" data-tab="tabUploadFoto">
                        <i class="fa-solid fa-camera"></i> Upload LKPD Manual (Foto)
                    </button>
                    <button class="tugas-tab-btn" data-tab="tabKirimKuis">
                        <i class="fa-solid fa-trophy"></i> Input Nilai Kuis / Kelompok
                    </button>
                    <button class="tugas-tab-btn" data-tab="tabRiwayatTugas">
                        <i class="fa-solid fa-clock-rotate-left"></i> Riwayat Tugas Saya
                    </button>
                </div>

                <div class="tugas-modal-body">
                    
                    <!-- TAB 1: PAPAN TULIS DIGITAL -->
                    <div id="tabPapanTulis" class="tugas-tab-content active">
                        <p style="font-size:0.88rem; color:#94a3b8; margin-bottom: 0.8rem;">
                            Gunakan papan tulis digital untuk menggambar diagram, rumus, atau LKPD interaktif. Hasil gambar akan terkirim ke Guru.
                        </p>

                        <!-- Whiteboard Toolbar -->
                        <div class="wb-toolbar">
                            <div class="wb-tool-group">
                                <button class="wb-tool-btn active" id="wbToolPen" title="Pen / Pensil"><i class="fa-solid fa-pen"></i></button>
                                <button class="wb-tool-btn" id="wbToolEraser" title="Penghapus"><i class="fa-solid fa-eraser"></i></button>
                                <button class="wb-tool-btn" id="wbToolText" title="Tambah Teks"><i class="fa-solid fa-font"></i></button>
                            </div>

                            <div class="wb-tool-group">
                                <span style="font-size:0.8rem; color:#cbd5e1;">Warna:</span>
                                <div class="wb-color-swatch active" data-color="#000000" style="background:#000000;" title="Hitam"></div>
                                <div class="wb-color-swatch" data-color="#0284c7" style="background:#0284c7;" title="Biru"></div>
                                <div class="wb-color-swatch" data-color="#ef4444" style="background:#ef4444;" title="Merah"></div>
                                <div class="wb-color-swatch" data-color="#10b981" style="background:#10b981;" title="Hijau"></div>
                                <div class="wb-color-swatch" data-color="#a855f7" style="background:#a855f7;" title="Ungu"></div>
                            </div>

                            <div class="wb-tool-group">
                                <span style="font-size:0.8rem; color:#cbd5e1;">Ukuran:</span>
                                <select id="wbLineWidth" style="padding: 4px 8px; border-radius: 8px; background: rgba(0,0,0,0.5); color:#fff; border: 1px solid rgba(255,255,255,0.2);">
                                    <option value="2">Tipis (2px)</option>
                                    <option value="5" selected>Sedang (5px)</option>
                                    <option value="10">Tebal (10px)</option>
                                    <option value="20">Sangat Tebal (20px)</option>
                                </select>
                            </div>

                            <div class="wb-tool-group">
                                <span style="font-size:0.8rem; color:#cbd5e1;">Latar:</span>
                                <select id="wbBgType" style="padding: 4px 8px; border-radius: 8px; background: rgba(0,0,0,0.5); color:#fff; border: 1px solid rgba(255,255,255,0.2);">
                                    <option value="blank">Polos</option>
                                    <option value="grid">Kotak / Grid</option>
                                    <option value="line">Garis Buku</option>
                                </select>
                            </div>

                            <div class="wb-tool-group">
                                <button class="wb-tool-btn" id="wbClearBtn" title="Hapus Semua Canvas"><i class="fa-solid fa-trash-can"></i></button>
                            </div>
                        </div>

                        <!-- Canvas Area -->
                        <div class="wb-canvas-wrapper" id="wbWrapper">
                            <canvas id="wbCanvas"></canvas>
                        </div>

                        <!-- Whiteboard Submit Form -->
                        <form id="formSubmitWb">
                            <!-- Category Switcher -->
                            <div class="category-switcher">
                                <button type="button" class="category-btn active" data-cat="mandiri" data-target-form="formSubmitWb">
                                    <i class="fa-solid fa-user"></i> Tugas Mandiri
                                </button>
                                <button type="button" class="category-btn" data-cat="kelompok" data-target-form="formSubmitWb">
                                    <i class="fa-solid fa-users"></i> Tugas Kelompok
                                </button>
                            </div>

                            <div class="tugas-form-grid">
                                <div class="tugas-form-group">
                                    <label>Kelas *</label>
                                    <select id="wbClassSelect" required></select>
                                </div>
                                <div class="tugas-form-group">
                                    <label>Bab Pembelajaran *</label>
                                    <select id="wbBabSelect" required></select>
                                </div>
                                <div class="tugas-form-group">
                                    <label>Pertemuan Ke- *</label>
                                    <select id="wbPertemuanSelect" required></select>
                                </div>
                            </div>

                            <div class="tugas-form-group">
                                <label id="wbNameLabel">Nama Lengkap Siswa *</label>
                                <input type="text" id="wbStudentName" placeholder="Contoh: Budi Santoso" required>
                            </div>

                            <div class="tugas-form-group field-kelompok" id="wbTeamGroup" style="display:none;">
                                <label>Daftar Anggota Kelompok (Dipisahkan Koma)</label>
                                <input type="text" id="wbTeamMembers" placeholder="Contoh: Budi, Siti, Rizky, Doni">
                            </div>

                            <div class="tugas-form-group">
                                <label>Judul Tugas / LKPD *</label>
                                <input type="text" id="wbTitle" placeholder="Contoh: Gambar Sel Hewan & Tumbuhan" required>
                            </div>

                            <div class="tugas-form-group">
                                <label>Catatan / Keterangan (Opsional)</label>
                                <textarea id="wbNotes" rows="2" placeholder="Tuliskan catatan tambahan jika ada..."></textarea>
                            </div>

                            <button type="submit" class="btn-tugas-submit">
                                <i class="fa-solid fa-paper-plane"></i> Kumpulkan Tugas Papan Tulis
                            </button>
                        </form>
                    </div>

                    <!-- TAB 2: UPLOAD LKPD FOTO MANUAL -->
                    <div id="tabUploadFoto" class="tugas-tab-content">
                        <p style="font-size:0.88rem; color:#94a3b8; margin-bottom: 0.8rem;">
                            Foto lembar LKPD atau catatan kertas kamu, lalu unggah di bawah ini untuk dinilai Guru.
                        </p>

                        <!-- Dropzone -->
                        <div class="tugas-dropzone" id="fotoDropzone">
                            <i class="fa-solid fa-cloud-arrow-up"></i>
                            <p>Klik atau Seret Foto LKPD ke Sini</p>
                            <span>Format gambar: JPG, PNG, WEBP (Otomatis Dikompresi)</span>
                            <input type="file" id="fotoFileInput" class="tugas-file-input" accept="image/*" capture="environment">
                        </div>

                        <!-- Image Preview -->
                        <div class="tugas-preview-container" id="fotoPreviewBox">
                            <img id="fotoPreviewImg" src="" alt="Preview LKPD">
                            <button class="tugas-preview-remove" id="btnRemoveFoto"><i class="fa-solid fa-xmark"></i> Ganti Foto</button>
                        </div>

                        <!-- Photo Submit Form -->
                        <form id="formSubmitFoto" style="margin-top: 1rem;">
                            <!-- Category Switcher -->
                            <div class="category-switcher">
                                <button type="button" class="category-btn active" data-cat="mandiri" data-target-form="formSubmitFoto">
                                    <i class="fa-solid fa-user"></i> Tugas Mandiri
                                </button>
                                <button type="button" class="category-btn" data-cat="kelompok" data-target-form="formSubmitFoto">
                                    <i class="fa-solid fa-users"></i> Tugas Kelompok
                                </button>
                            </div>

                            <div class="tugas-form-grid">
                                <div class="tugas-form-group">
                                    <label>Kelas *</label>
                                    <select id="fotoClassSelect" required></select>
                                </div>
                                <div class="tugas-form-group">
                                    <label>Bab Pembelajaran *</label>
                                    <select id="fotoBabSelect" required></select>
                                </div>
                                <div class="tugas-form-group">
                                    <label>Pertemuan Ke- *</label>
                                    <select id="fotoPertemuanSelect" required></select>
                                </div>
                            </div>

                            <div class="tugas-form-group">
                                <label id="fotoNameLabel">Nama Lengkap Siswa *</label>
                                <input type="text" id="fotoStudentName" placeholder="Contoh: Siti Aisyah" required>
                            </div>

                            <div class="tugas-form-group field-kelompok" id="fotoTeamGroup" style="display:none;">
                                <label>Daftar Anggota Kelompok (Dipisahkan Koma)</label>
                                <input type="text" id="fotoTeamMembers" placeholder="Contoh: Siti, Rani, Maya, Dina">
                            </div>

                            <div class="tugas-form-group">
                                <label>Judul LKPD / Tugas Foto *</label>
                                <input type="text" id="fotoTitle" placeholder="Contoh: LKPD Laporan Praktikum Wujud Zat" required>
                            </div>

                            <div class="tugas-form-group">
                                <label>Catatan / Keterangan (Opsional)</label>
                                <textarea id="fotoNotes" rows="2" placeholder="Catatan tambahan..."></textarea>
                            </div>

                            <button type="submit" class="btn-tugas-submit">
                                <i class="fa-solid fa-upload"></i> Kumpulkan Tugas LKPD Foto
                            </button>
                        </form>
                    </div>

                    <!-- TAB 3: INPUT NILAI KUIS INTERAKTIF / KELOMPOK -->
                    <div id="tabKirimKuis" class="tugas-tab-content">
                        <p style="font-size:0.88rem; color:#94a3b8; margin-bottom: 0.8rem;">
                            Kirimkan hasil kuis interaktif atau kompetisi kelompok yang telah diselesaikan ke Portal Guru.
                        </p>

                        <form id="formSubmitKuis">
                            <div class="category-switcher">
                                <button type="button" class="category-btn active" data-cat="mandiri" data-target-form="formSubmitKuis">
                                    <i class="fa-solid fa-user"></i> Kuis Mandiri
                                </button>
                                <button type="button" class="category-btn" data-cat="kelompok" data-target-form="formSubmitKuis">
                                    <i class="fa-solid fa-users"></i> Kuis Kelompok
                                </button>
                            </div>

                            <div class="tugas-form-grid">
                                <div class="tugas-form-group">
                                    <label>Kelas *</label>
                                    <select id="kuisClassSelect" required></select>
                                </div>
                                <div class="tugas-form-group">
                                    <label>Bab Pembelajaran *</label>
                                    <select id="kuisBabSelect" required></select>
                                </div>
                                <div class="tugas-form-group">
                                    <label>Pertemuan Ke- *</label>
                                    <select id="kuisPertemuanSelect" required></select>
                                </div>
                            </div>

                            <div class="tugas-form-group">
                                <label id="kuisNameLabel">Nama Lengkap Siswa *</label>
                                <input type="text" id="kuisStudentName" placeholder="Contoh: Ahmad Rizky" required>
                            </div>

                            <div class="tugas-form-group field-kelompok" id="kuisTeamGroup" style="display:none;">
                                <label>Daftar Anggota Kelompok (Dipisahkan Koma)</label>
                                <input type="text" id="kuisTeamMembers" placeholder="Contoh: Ahmad, Farhan, Dewi, Linda">
                            </div>

                            <div class="tugas-form-grid">
                                <div class="tugas-form-group">
                                    <label>Judul Kuis / Kompetisi *</label>
                                    <input type="text" id="kuisTitle" placeholder="Contoh: Kuis Kompetisi Wujud Zat" required>
                                </div>
                                <div class="tugas-form-group">
                                    <label>Nilai / Skor Kuis (0 - 100) *</label>
                                    <input type="number" id="kuisScore" min="0" max="100" placeholder="100" required>
                                </div>
                            </div>

                            <div class="tugas-form-group">
                                <label>Catatan Hasil Kuis (Opsional)</label>
                                <textarea id="kuisNotes" rows="2" placeholder="Contoh: Berhasil menjawab 10 dari 10 soal dengan benar."></textarea>
                            </div>

                            <button type="submit" class="btn-tugas-submit" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
                                <i class="fa-solid fa-trophy"></i> Kirim Nilai Kuis ke Guru
                            </button>
                        </form>
                    </div>

                    <!-- TAB 4: RIWAYAT TUGAS SAYA -->
                    <div id="tabRiwayatTugas" class="tugas-tab-content">
                        <div id="riwayatContainer" class="tugas-history-grid"></div>
                    </div>

                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Populate Cascade Dropdowns for Class -> Bab -> Pertemuan
    function initCascadeDropdowns(prefix) {
        const classSelect = document.getElementById(`${prefix}ClassSelect`);
        const babSelect = document.getElementById(`${prefix}BabSelect`);
        const pertSelect = document.getElementById(`${prefix}PertemuanSelect`);

        if (!classSelect || !babSelect || !pertSelect) return;

        // Populate Classes
        classSelect.innerHTML = Object.keys(CURRICULUM_DATA).map(cls => 
            `<option value="${cls}">${cls}</option>`
        ).join('');

        const defaultCls = detectDefaultClass();
        classSelect.value = defaultCls;

        function updateBabs() {
            const selectedCls = classSelect.value;
            const babsObj = CURRICULUM_DATA[selectedCls] || {};
            
            babSelect.innerHTML = Object.keys(babsObj).map(key => 
                `<option value="${key}">${babsObj[key].title}</option>`
            ).join('');

            updateMeetings();
        }

        function updateMeetings() {
            const selectedCls = classSelect.value;
            const selectedBabKey = babSelect.value;
            const babsObj = CURRICULUM_DATA[selectedCls] || {};
            const meetings = (babsObj[selectedBabKey] && babsObj[selectedBabKey].meetings) ? babsObj[selectedBabKey].meetings : ['Pertemuan 1'];

            pertSelect.innerHTML = meetings.map(m => 
                `<option value="${m}">${m}</option>`
            ).join('');
        }

        classSelect.addEventListener('change', updateBabs);
        babSelect.addEventListener('change', updateMeetings);

        updateBabs();
    }

    // Category Switcher Logic (Mandiri vs Kelompok)
    function initCategorySwitchers() {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetFormId = btn.getAttribute('data-target-form');
                const form = document.getElementById(targetFormId);
                if (!form) return;

                const cat = btn.getAttribute('data-cat');
                form.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                form.setAttribute('data-current-cat', cat);

                const prefix = targetFormId === 'formSubmitWb' ? 'wb' :
                               targetFormId === 'formSubmitFoto' ? 'foto' : 'kuis';

                const nameLabel = document.getElementById(`${prefix}NameLabel`);
                const teamGroup = document.getElementById(`${prefix}TeamGroup`);
                const nameInput = document.getElementById(`${prefix}StudentName`);

                if (cat === 'kelompok') {
                    if (nameLabel) nameLabel.innerText = 'Nama Kelompok *';
                    if (nameInput) nameInput.placeholder = 'Contoh: Kelompok 1 (Newton)';
                    if (teamGroup) teamGroup.style.display = 'flex';
                } else {
                    if (nameLabel) nameLabel.innerText = 'Nama Lengkap Siswa *';
                    if (nameInput) nameInput.placeholder = 'Contoh: Budi Santoso';
                    if (teamGroup) teamGroup.style.display = 'none';
                }
            });
        });
    }

    // Whiteboard Canvas State & Logic
    let canvas, ctx;
    let isDrawing = false;
    let currentTool = 'pen';
    let currentColor = '#000000';
    let currentLineWidth = 5;
    let currentBg = 'blank';
    let uploadedFotoBase64 = null;

    function initCanvas() {
        canvas = document.getElementById('wbCanvas');
        if (!canvas) return;

        ctx = canvas.getContext('2d');

        function resizeCanvas() {
            const wrapper = document.getElementById('wbWrapper');
            if (!wrapper) return;
            
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(canvas, 0, 0);

            canvas.width = wrapper.clientWidth;
            canvas.height = wrapper.clientHeight;

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(tempCanvas, 0, 0);
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function getCoords(e) {
            const rect = canvas.getBoundingClientRect();
            if (e.touches && e.touches.length > 0) {
                return {
                    x: e.touches[0].clientX - rect.left,
                    y: e.touches[0].clientY - rect.top
                };
            }
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }

        function startDrawing(e) {
            if (currentTool === 'text') {
                const pos = getCoords(e);
                const text = prompt('Masukkan Teks untuk Papan Tulis:');
                if (text && text.trim() !== '') {
                    ctx.font = `${currentLineWidth * 4 + 14}px 'Outfit', sans-serif`;
                    ctx.fillStyle = currentColor;
                    ctx.fillText(text, pos.x, pos.y);
                }
                return;
            }

            isDrawing = true;
            const pos = getCoords(e);
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            e.preventDefault();
        }

        function draw(e) {
            if (!isDrawing) return;
            const pos = getCoords(e);

            ctx.lineWidth = currentLineWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            if (currentTool === 'eraser') {
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = currentLineWidth * 3;
            } else {
                ctx.strokeStyle = currentColor;
            }

            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            e.preventDefault();
        }

        function stopDrawing() {
            isDrawing = false;
            ctx.beginPath();
        }

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', stopDrawing);

        canvas.addEventListener('touchstart', startDrawing, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', stopDrawing);

        // Toolbar Events
        document.getElementById('wbToolPen').addEventListener('click', () => {
            currentTool = 'pen';
            updateActiveTool('wbToolPen');
        });
        document.getElementById('wbToolEraser').addEventListener('click', () => {
            currentTool = 'eraser';
            updateActiveTool('wbToolEraser');
        });
        document.getElementById('wbToolText').addEventListener('click', () => {
            currentTool = 'text';
            updateActiveTool('wbToolText');
        });

        function updateActiveTool(btnId) {
            document.querySelectorAll('.wb-tool-btn').forEach(btn => {
                if (btn.id === 'wbToolPen' || btn.id === 'wbToolEraser' || btn.id === 'wbToolText') {
                    btn.classList.remove('active');
                }
            });
            document.getElementById(btnId).classList.add('active');
        }

        document.querySelectorAll('.wb-color-swatch').forEach(swatch => {
            swatch.addEventListener('click', () => {
                document.querySelectorAll('.wb-color-swatch').forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
                currentColor = swatch.getAttribute('data-color');
            });
        });

        document.getElementById('wbLineWidth').addEventListener('change', (e) => {
            currentLineWidth = parseInt(e.target.value);
        });

        document.getElementById('wbBgType').addEventListener('change', (e) => {
            currentBg = e.target.value;
            const wrapper = document.getElementById('wbWrapper');
            wrapper.className = `wb-canvas-wrapper ${currentBg === 'grid' ? 'grid-bg' : currentBg === 'line' ? 'line-bg' : ''}`;
        });

        document.getElementById('wbClearBtn').addEventListener('click', () => {
            if (confirm('Hapus seluruh gambaran di papan tulis?')) {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        });
    }

    // Photo Compression Helper
    function compressAndReadImage(file, callback) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const maxDim = 1000;
                let width = img.width;
                let height = img.height;

                if (width > maxDim || height > maxDim) {
                    if (width > height) {
                        height = Math.round((height * maxDim) / width);
                        width = maxDim;
                    } else {
                        width = Math.round((width * maxDim) / height);
                        height = maxDim;
                    }
                }

                const cvs = document.createElement('canvas');
                cvs.width = width;
                cvs.height = height;
                const cCtx = cvs.getContext('2d');
                cCtx.drawImage(img, 0, 0, width, height);

                const base64 = cvs.toDataURL('image/jpeg', 0.75);
                callback(base64);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Photo Upload Setup
    function initPhotoUpload() {
        const dropzone = document.getElementById('fotoDropzone');
        const fileInput = document.getElementById('fotoFileInput');
        const previewBox = document.getElementById('fotoPreviewBox');
        const previewImg = document.getElementById('fotoPreviewImg');
        const removeBtn = document.getElementById('btnRemoveFoto');

        if (!dropzone) return;

        dropzone.addEventListener('click', () => fileInput.click());
        dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
        dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFile(e.dataTransfer.files[0]);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
            }
        });

        function handleFile(file) {
            if (!file.type.startsWith('image/')) {
                alert('File harus berupa gambar (JPG, PNG, WEBP).');
                return;
            }
            compressAndReadImage(file, (base64) => {
                uploadedFotoBase64 = base64;
                previewImg.src = base64;
                previewBox.style.display = 'block';
                dropzone.style.display = 'none';
            });
        }

        removeBtn.addEventListener('click', () => {
            uploadedFotoBase64 = null;
            previewImg.src = '';
            previewBox.style.display = 'none';
            dropzone.style.display = 'block';
            fileInput.value = '';
        });
    }

    // Render Student Submission History
    function renderHistory() {
        const container = document.getElementById('riwayatContainer');
        if (!container) return;

        const assignments = getAssignments();

        if (assignments.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align:center; padding:3rem 1rem; color:#64748b;">
                    <i class="fa-solid fa-folder-open" style="font-size:3rem; margin-bottom:1rem; color:#334155;"></i>
                    <p>Belum ada tugas atau nilai kuis yang dikumpulkan dari perangkat ini.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = assignments.map(item => `
            <div class="tugas-history-card">
                <div class="tugas-history-header">
                    <span class="tugas-badge-type ${item.type}">
                        ${item.type === 'whiteboard' ? 'Papan Tulis' : item.type === 'photo' ? 'Foto LKPD' : 'Nilai Kuis'}
                    </span>
                    <span style="font-size:0.75rem; color:#94a3b8;">${item.submittedAt}</span>
                </div>
                <h4 style="font-size:1rem; margin:4px 0; color:#f8fafc;">${item.title}</h4>
                <p style="font-size:0.82rem; color:#cbd5e1; margin:0;">
                    <i class="fa-solid fa-bookmark" style="margin-right:4px;"></i> ${item.kelas} — ${item.babTitle} (${item.pertemuan})
                </p>
                <p style="font-size:0.82rem; color:#cbd5e1; margin:0;">
                    <i class="fa-solid ${item.category === 'kelompok' ? 'fa-users' : 'fa-user'}" style="margin-right:4px;"></i> 
                    ${item.studentName} ${item.teamMembers && item.teamMembers.length > 1 ? `<small>(${item.teamMembers.join(', ')})</small>` : ''}
                </p>

                ${item.imageData ? `<img src="${item.imageData}" alt="Preview" class="tugas-history-thumb" onclick="window.viewTugasImage('${item.imageData}')">` : ''}

                ${item.notes ? `<p style="font-size:0.8rem; color:#94a3b8; font-style:italic; margin:0;">"${item.notes}"</p>` : ''}

                <div class="tugas-grade-box ${item.grade !== null && item.grade !== undefined ? '' : 'pending'}">
                    ${item.grade !== null && item.grade !== undefined ? 
                        `<i class="fa-solid fa-star"></i> Nilai: ${item.grade}/100 ${item.feedback ? `<br><small style="font-weight:normal; color:#cbd5e1;">Feedback Guru: ${item.feedback}</small>` : ''}` :
                        `<i class="fa-solid fa-hourglass-half"></i> Belum Dinilai oleh Guru`
                    }
                </div>
            </div>
        `).join('');
    }

    // Modal Image Zoom
    window.viewTugasImage = function(src) {
        if (!src) return;
        const imgModal = document.createElement('div');
        imgModal.className = 'tugas-img-modal';
        imgModal.innerHTML = `<img src="${src}" alt="Zoom"><span style="position:absolute; top:20px; right:25px; color:#fff; font-size:2rem; cursor:pointer;">&times;</span>`;
        imgModal.onclick = () => document.body.removeChild(imgModal);
        document.body.appendChild(imgModal);
    };

    // Global Modal Opener
    window.openTugasModal = function(tabName) {
        const modal = document.getElementById('tugasPortalModal');
        if (modal) {
            modal.classList.add('active');
            if (tabName) {
                const btn = document.querySelector(`.tugas-tab-btn[data-tab="${tabName}"]`);
                if (btn) btn.click();
            }
            if (tabName === 'tabRiwayatTugas') {
                renderHistory();
            }
        }
    };

    // Init & Events
    document.addEventListener('DOMContentLoaded', () => {
        injectUI();
        initCascadeDropdowns('wb');
        initCascadeDropdowns('foto');
        initCascadeDropdowns('kuis');
        initCategorySwitchers();
        initCanvas();
        initPhotoUpload();

        const floatingBtn = document.getElementById('btnOpenTugasFloating');
        const modal = document.getElementById('tugasPortalModal');
        const closeBtn = document.getElementById('btnCloseTugasModal');

        if (floatingBtn) floatingBtn.addEventListener('click', () => window.openTugasModal());
        if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));

        const tabBtns = document.querySelectorAll('.tugas-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tugas-tab-content').forEach(tc => tc.classList.remove('active'));

                btn.classList.add('active');
                const targetTab = btn.getAttribute('data-tab');
                document.getElementById(targetTab).classList.add('active');

                if (targetTab === 'tabRiwayatTugas') {
                    renderHistory();
                }
            });
        });

        // Submit 1: Whiteboard
        const formWb = document.getElementById('formSubmitWb');
        if (formWb) {
            formWb.addEventListener('submit', (e) => {
                e.preventDefault();
                const kelas = document.getElementById('wbClassSelect').value;
                const babKey = document.getElementById('wbBabSelect').value;
                const babsObj = CURRICULUM_DATA[kelas] || {};
                const babTitle = babsObj[babKey] ? babsObj[babKey].title : 'Bab Pembelajaran';
                const pertemuan = document.getElementById('wbPertemuanSelect').value;
                const category = formWb.getAttribute('data-current-cat') || 'mandiri';

                const studentName = document.getElementById('wbStudentName').value.trim();
                const teamMembersRaw = document.getElementById('wbTeamMembers')?.value || '';
                const teamMembers = category === 'kelompok' ? teamMembersRaw.split(',').map(s => s.trim()).filter(Boolean) : [studentName];
                
                const title = document.getElementById('wbTitle').value.trim();
                const notes = document.getElementById('wbNotes').value.trim();
                const imageData = canvas.toDataURL('image/png');

                const newTugas = {
                    id: Date.now(),
                    kelas, babKey, babTitle, pertemuan, category,
                    studentName, teamMembers,
                    type: 'whiteboard', title, notes, imageData,
                    submittedAt: new Date().toLocaleString('id-ID'), timestamp: Date.now(),
                    grade: null, feedback: ''
                };

                const assignments = getAssignments();
                assignments.unshift(newTugas);
                saveAssignments(assignments);

                alert('Tugas Papan Tulis Digital berhasil dikumpulkan!');
                formWb.reset();
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                document.querySelector('.tugas-tab-btn[data-tab="tabRiwayatTugas"]').click();
            });
        }

        // Submit 2: Photo LKPD
        const formFoto = document.getElementById('formSubmitFoto');
        if (formFoto) {
            formFoto.addEventListener('submit', (e) => {
                e.preventDefault();
                if (!uploadedFotoBase64) {
                    alert('Silakan foto atau pilih gambar lembar LKPD terlebih dahulu!');
                    return;
                }
                const kelas = document.getElementById('fotoClassSelect').value;
                const babKey = document.getElementById('fotoBabSelect').value;
                const babsObj = CURRICULUM_DATA[kelas] || {};
                const babTitle = babsObj[babKey] ? babsObj[babKey].title : 'Bab Pembelajaran';
                const pertemuan = document.getElementById('fotoPertemuanSelect').value;
                const category = formFoto.getAttribute('data-current-cat') || 'mandiri';

                const studentName = document.getElementById('fotoStudentName').value.trim();
                const teamMembersRaw = document.getElementById('fotoTeamMembers')?.value || '';
                const teamMembers = category === 'kelompok' ? teamMembersRaw.split(',').map(s => s.trim()).filter(Boolean) : [studentName];

                const title = document.getElementById('fotoTitle').value.trim();
                const notes = document.getElementById('fotoNotes').value.trim();

                const newTugas = {
                    id: Date.now(),
                    kelas, babKey, babTitle, pertemuan, category,
                    studentName, teamMembers,
                    type: 'photo', title, notes, imageData: uploadedFotoBase64,
                    submittedAt: new Date().toLocaleString('id-ID'), timestamp: Date.now(),
                    grade: null, feedback: ''
                };

                const assignments = getAssignments();
                assignments.unshift(newTugas);
                saveAssignments(assignments);

                alert('Tugas LKPD Foto Manual berhasil dikumpulkan!');
                formFoto.reset();
                document.getElementById('btnRemoveFoto').click();
                document.querySelector('.tugas-tab-btn[data-tab="tabRiwayatTugas"]').click();
            });
        }

        // Submit 3: Quiz Score / Competition Group
        const formKuis = document.getElementById('formSubmitKuis');
        if (formKuis) {
            formKuis.addEventListener('submit', (e) => {
                e.preventDefault();
                const kelas = document.getElementById('kuisClassSelect').value;
                const babKey = document.getElementById('kuisBabSelect').value;
                const babsObj = CURRICULUM_DATA[kelas] || {};
                const babTitle = babsObj[babKey] ? babsObj[babKey].title : 'Bab Pembelajaran';
                const pertemuan = document.getElementById('kuisPertemuanSelect').value;
                const category = formKuis.getAttribute('data-current-cat') || 'mandiri';

                const studentName = document.getElementById('kuisStudentName').value.trim();
                const teamMembersRaw = document.getElementById('kuisTeamMembers')?.value || '';
                const teamMembers = category === 'kelompok' ? teamMembersRaw.split(',').map(s => s.trim()).filter(Boolean) : [studentName];

                const title = document.getElementById('kuisTitle').value.trim();
                const score = parseInt(document.getElementById('kuisScore').value) || 0;
                const notes = document.getElementById('kuisNotes').value.trim();

                window.kirimNilaiKuisKeGuru({
                    kelas, babKey, babTitle, pertemuan, category,
                    studentName, teamMembers, title, score, notes
                });

                formKuis.reset();
                document.querySelector('.tugas-tab-btn[data-tab="tabRiwayatTugas"]').click();
            });
        }

        // Register Service Worker for PWA Support across Android & iOS
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
                let swPath = 'sw.js';
                if (window.location.pathname.includes('/bab') || window.location.pathname.includes('/akses-guru')) {
                    swPath = '../../sw.js';
                } else if (window.location.pathname.includes('/KELAS ')) {
                    swPath = '../sw.js';
                }
                navigator.serviceWorker.register(swPath).then(function (reg) {
                    console.log('[PWA] ServiceWorker registered successfully:', reg.scope);
                }).catch(function (err) {
                    console.warn('[PWA] ServiceWorker registration notice:', err);
                });
            });
        }
    });
})();
