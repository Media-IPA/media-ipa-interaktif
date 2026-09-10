/* =========================================================
   PORTAL PENGUMPULAN TUGAS - MEDIA IPA INTERAKTIF
   (Papan Tulis Digital & Upload LKPD Manual Foto)
   ========================================================= */

(function () {
    // Utility functions for Storage
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
            alert('Penyimpanan penuh! Hapus beberapa tugas lama terlebih dahulu.');
        }
    }

    // Determine current default class from pathname or page context
    function detectDefaultClass() {
        const path = window.location.pathname.toUpperCase();
        if (path.includes('KELAS 7') || path.includes('KELAS%207')) return 'Kelas 7';
        if (path.includes('KELAS 8') || path.includes('KELAS%208')) return 'Kelas 8';
        if (path.includes('KELAS 9') || path.includes('KELAS%209')) return 'Kelas 9';
        return 'Kelas 7';
    }

    // Inject HTML Modal & Floating Button into DOM
    function injectUI() {
        if (document.getElementById('tugasPortalModal')) return;

        const modalHTML = `
        <!-- Floating Button -->
        <button id="btnOpenTugasFloating" class="btn-tugas-floating" title="Kumpulkan Tugas (Papan Tulis & LKPD Foto)">
            <i class="fa-solid fa-cloud-arrow-up"></i>
            <span>Kumpulkan Tugas</span>
        </button>

        <!-- Assignment Portal Modal -->
        <div id="tugasPortalModal" class="tugas-modal-overlay">
            <div class="tugas-modal-container">
                <div class="tugas-modal-header">
                    <h3><i class="fa-solid fa-graduation-cap"></i> Portal Pengumpulan Tugas</h3>
                    <button class="tugas-modal-close" id="btnCloseTugasModal">&times;</button>
                </div>

                <div class="tugas-tabs-nav">
                    <button class="tugas-tab-btn active" data-tab="tabPapanTulis">
                        <i class="fa-solid fa-chalkboard"></i> Papan Tulis Digital
                    </button>
                    <button class="tugas-tab-btn" data-tab="tabUploadFoto">
                        <i class="fa-solid fa-camera"></i> Upload LKPD Manual (Foto)
                    </button>
                    <button class="tugas-tab-btn" data-tab="tabRiwayatTugas">
                        <i class="fa-solid fa-clock-rotate-left"></i> Riwayat Tugas Saya
                    </button>
                </div>

                <div class="tugas-modal-body">
                    <!-- TAB 1: PAPAN TULIS DIGITAL -->
                    <div id="tabPapanTulis" class="tugas-tab-content active">
                        <p style="font-size:0.9rem; color:#94a3b8; margin-bottom: 1rem;">
                            Gunakan papan tulis digital di bawah ini untuk mengerjakan tugas menggambar, menulis rumus, atau membuat diagram.
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
                            <div class="tugas-form-grid">
                                <div class="tugas-form-group">
                                    <label>Nama Lengkap Siswa *</label>
                                    <input type="text" id="wbStudentName" placeholder="Contoh: Ahmad Rizky" required>
                                </div>
                                <div class="tugas-form-group">
                                    <label>Kelas *</label>
                                    <select id="wbClassSelect" required>
                                        <option value="Kelas 7">Kelas 7</option>
                                        <option value="Kelas 8">Kelas 8</option>
                                        <option value="Kelas 9">Kelas 9</option>
                                    </select>
                                </div>
                            </div>
                            <div class="tugas-form-group">
                                <label>Judul Tugas / Materi *</label>
                                <input type="text" id="wbTitle" placeholder="Contoh: Gambar Sel Hewan - Bab 1" required>
                            </div>
                            <div class="tugas-form-group">
                                <label>Catatan / Keterangan (Opsional)</label>
                                <textarea id="wbNotes" rows="2" placeholder="Tuliskan keterangan jawaban jika ada..."></textarea>
                            </div>
                            <button type="submit" class="btn-tugas-submit">
                                <i class="fa-solid fa-paper-plane"></i> Kumpulkan Tugas Papan Tulis
                            </button>
                        </form>
                    </div>

                    <!-- TAB 2: UPLOAD LKPD FOTO MANUAL -->
                    <div id="tabUploadFoto" class="tugas-tab-content">
                        <p style="font-size:0.9rem; color:#94a3b8; margin-bottom: 1rem;">
                            Foto lembar LKPD atau catatan manual kamu dengan kamera HP/tablet, lalu unggah di bawah ini.
                        </p>

                        <!-- Dropzone -->
                        <div class="tugas-dropzone" id="fotoDropzone">
                            <i class="fa-solid fa-cloud-arrow-up"></i>
                            <p>Klik atau Seret Foto LKPD ke Sini</p>
                            <span>Format gambar: JPG, PNG, WEBP (Otomatis Dioptimalkan)</span>
                            <input type="file" id="fotoFileInput" class="tugas-file-input" accept="image/*" capture="environment">
                        </div>

                        <!-- Image Preview -->
                        <div class="tugas-preview-container" id="fotoPreviewBox">
                            <img id="fotoPreviewImg" src="" alt="Preview LKPD">
                            <button class="tugas-preview-remove" id="btnRemoveFoto"><i class="fa-solid fa-xmark"></i> Ganti Foto</button>
                        </div>

                        <!-- Photo Submit Form -->
                        <form id="formSubmitFoto" style="margin-top: 1rem;">
                            <div class="tugas-form-grid">
                                <div class="tugas-form-group">
                                    <label>Nama Lengkap Siswa *</label>
                                    <input type="text" id="fotoStudentName" placeholder="Contoh: Siti Aisyah" required>
                                </div>
                                <div class="tugas-form-group">
                                    <label>Kelas *</label>
                                    <select id="fotoClassSelect" required>
                                        <option value="Kelas 7">Kelas 7</option>
                                        <option value="Kelas 8">Kelas 8</option>
                                        <option value="Kelas 9">Kelas 9</option>
                                    </select>
                                </div>
                            </div>
                            <div class="tugas-form-group">
                                <label>Judul LKPD / Tugas *</label>
                                <input type="text" id="fotoTitle" placeholder="Contoh: LKPD Wujud Zat Bab 2" required>
                            </div>
                            <div class="tugas-form-group">
                                <label>Catatan / Keterangan (Opsional)</label>
                                <textarea id="fotoNotes" rows="2" placeholder="Keterangan tambahan untuk guru..."></textarea>
                            </div>
                            <button type="submit" class="btn-tugas-submit">
                                <i class="fa-solid fa-upload"></i> Kumpulkan Tugas LKPD Foto
                            </button>
                        </form>
                    </div>

                    <!-- TAB 3: RIWAYAT TUGAS SAYA -->
                    <div id="tabRiwayatTugas" class="tugas-tab-content">
                        <div id="riwayatContainer" class="tugas-history-grid">
                            <!-- Dynamic Content -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Whiteboard Canvas State & Logic
    let canvas, ctx;
    let isDrawing = false;
    let currentTool = 'pen'; // 'pen', 'eraser', 'text'
    let currentColor = '#000000';
    let currentLineWidth = 5;
    let currentBg = 'blank';
    let uploadedFotoBase64 = null;

    function initCanvas() {
        canvas = document.getElementById('wbCanvas');
        if (!canvas) return;

        ctx = canvas.getContext('2d');

        // Resize Canvas to container bounds
        function resizeCanvas() {
            const wrapper = document.getElementById('wbWrapper');
            if (!wrapper) return;
            
            // Save current drawing
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(canvas, 0, 0);

            canvas.width = wrapper.clientWidth;
            canvas.height = wrapper.clientHeight;

            // Fill white background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Restore drawing
            ctx.drawImage(tempCanvas, 0, 0);
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Drawing Event Handlers (Mouse & Touch)
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
                const text = prompt('Masukkan Teks yang ingin ditambahkan ke papan tulis:');
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

        // Add listeners
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', stopDrawing);

        canvas.addEventListener('touchstart', startDrawing, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', stopDrawing);

        // Toolbar Button Events
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

        // Color Swatches
        document.querySelectorAll('.wb-color-swatch').forEach(swatch => {
            swatch.addEventListener('click', () => {
                document.querySelectorAll('.wb-color-swatch').forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
                currentColor = swatch.getAttribute('data-color');
            });
        });

        // Line Width
        document.getElementById('wbLineWidth').addEventListener('change', (e) => {
            currentLineWidth = parseInt(e.target.value);
        });

        // Background Change
        document.getElementById('wbBgType').addEventListener('change', (e) => {
            currentBg = e.target.value;
            const wrapper = document.getElementById('wbWrapper');
            wrapper.className = `wb-canvas-wrapper ${currentBg === 'grid' ? 'grid-bg' : currentBg === 'line' ? 'line-bg' : ''}`;
        });

        // Clear Canvas
        document.getElementById('wbClearBtn').addEventListener('click', () => {
            if (confirm('Hapus seluruh gambaran di papan tulis?')) {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        });
    }

    // Compress Image File before base64 saving
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

                // JPEG 0.75 quality for super lightweight Base64 string (~80-150KB)
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

        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });

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
                alert('File harus berupa foto/gambar (JPG, PNG, WEBP).');
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
                    <p>Belum ada tugas yang dikumpulkan dari perangkat ini.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = assignments.map(item => `
            <div class="tugas-history-card">
                <div class="tugas-history-header">
                    <span class="tugas-badge-type ${item.type}">
                        ${item.type === 'whiteboard' ? 'Papan Tulis' : 'Foto LKPD'}
                    </span>
                    <span style="font-size:0.75rem; color:#94a3b8;">${item.submittedAt}</span>
                </div>
                <h4 style="font-size:1rem; margin:4px 0; color:#f8fafc;">${item.title}</h4>
                <p style="font-size:0.82rem; color:#cbd5e1; margin:0;">
                    <i class="fa-solid fa-user" style="margin-right:4px;"></i> ${item.studentName} (${item.kelas})
                </p>
                
                <img src="${item.imageData}" alt="Preview" class="tugas-history-thumb" onclick="window.viewTugasImage('${item.imageData}')">

                ${item.notes ? `<p style="font-size:0.8rem; color:#94a3b8; font-style:italic; margin:0;">"${item.notes}"</p>` : ''}

                <div class="tugas-grade-box ${item.grade !== null && item.grade !== undefined ? '' : 'pending'}">
                    ${item.grade !== null && item.grade !== undefined ? 
                        `<i class="fa-solid fa-star"></i> Nilai: ${item.grade}/100 ${item.feedback ? `<br><small style="font-weight:normal; color:#cbd5e1;">Catatan Guru: ${item.feedback}</small>` : ''}` :
                        `<i class="fa-solid fa-hourglass-half"></i> Belum Dinilai oleh Guru`
                    }
                </div>
            </div>
        `).join('');
    }

    // Modal Zoom Image Handler
    window.viewTugasImage = function(src) {
        const imgModal = document.createElement('div');
        imgModal.className = 'tugas-img-modal';
        imgModal.innerHTML = `<img src="${src}" alt="Zoom"><span style="position:absolute; top:20px; right:25px; color:#fff; font-size:2rem; cursor:pointer;">&times;</span>`;
        imgModal.onclick = () => document.body.removeChild(imgModal);
        document.body.appendChild(imgModal);
    };

    // Global helper to open modal from any button in the app
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

    // Main Bindings & Initialization
    document.addEventListener('DOMContentLoaded', () => {
        injectUI();
        initCanvas();
        initPhotoUpload();

        const defaultClass = detectDefaultClass();
        const wbSelect = document.getElementById('wbClassSelect');
        const fotoSelect = document.getElementById('fotoClassSelect');
        if (wbSelect) wbSelect.value = defaultClass;
        if (fotoSelect) fotoSelect.value = defaultClass;

        // Modal Open / Close Events
        const floatingBtn = document.getElementById('btnOpenTugasFloating');
        const modal = document.getElementById('tugasPortalModal');
        const closeBtn = document.getElementById('btnCloseTugasModal');

        if (floatingBtn) floatingBtn.addEventListener('click', () => window.openTugasModal());
        if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));

        // Tab Switching
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

        // Form Submit 1: Whiteboard
        const formWb = document.getElementById('formSubmitWb');
        if (formWb) {
            formWb.addEventListener('submit', (e) => {
                e.preventDefault();
                const studentName = document.getElementById('wbStudentName').value.trim();
                const kelas = document.getElementById('wbClassSelect').value;
                const title = document.getElementById('wbTitle').value.trim();
                const notes = document.getElementById('wbNotes').value.trim();

                // Export Canvas as PNG Base64
                const imageData = canvas.toDataURL('image/png');

                const newTugas = {
                    id: Date.now(),
                    studentName,
                    kelas,
                    type: 'whiteboard',
                    title,
                    notes,
                    imageData,
                    submittedAt: new Date().toLocaleString('id-ID'),
                    timestamp: Date.now(),
                    grade: null,
                    feedback: ''
                };

                const assignments = getAssignments();
                assignments.unshift(newTugas);
                saveAssignments(assignments);

                alert('Tugas Papan Tulis Digital berhasil dikumpulkan!');
                formWb.reset();
                if (wbSelect) wbSelect.value = defaultClass;

                // Clear canvas
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Switch to History Tab
                document.querySelector('.tugas-tab-btn[data-tab="tabRiwayatTugas"]').click();
            });
        }

        // Form Submit 2: Photo LKPD
        const formFoto = document.getElementById('formSubmitFoto');
        if (formFoto) {
            formFoto.addEventListener('submit', (e) => {
                e.preventDefault();
                if (!uploadedFotoBase64) {
                    alert('Silakan pilih atau foto lembar LKPD terlebih dahulu!');
                    return;
                }

                const studentName = document.getElementById('fotoStudentName').value.trim();
                const kelas = document.getElementById('fotoClassSelect').value;
                const title = document.getElementById('fotoTitle').value.trim();
                const notes = document.getElementById('fotoNotes').value.trim();

                const newTugas = {
                    id: Date.now(),
                    studentName,
                    kelas,
                    type: 'photo',
                    title,
                    notes,
                    imageData: uploadedFotoBase64,
                    submittedAt: new Date().toLocaleString('id-ID'),
                    timestamp: Date.now(),
                    grade: null,
                    feedback: ''
                };

                const assignments = getAssignments();
                assignments.unshift(newTugas);
                saveAssignments(assignments);

                alert('Tugas Foto LKPD Manual berhasil dikumpulkan!');
                formFoto.reset();
                if (fotoSelect) fotoSelect.value = defaultClass;
                document.getElementById('btnRemoveFoto').click();

                // Switch to History Tab
                document.querySelector('.tugas-tab-btn[data-tab="tabRiwayatTugas"]').click();
            });
        }
    });
})();
