/* =========================================================
   SISTEM LISENSI & OTENTIKASI SISWA WARD-IPA
   ========================================================= */

(function () {
    // 1. DAFTAR NAMA & KODE LISENSI RESMI SISWA (ROSTER)
    const STUDENT_ROSTER = [
        // ================= KELAS 7 (20 SISWA) =================
        { name: "Akifa Naila", code: "akifa7", altCodes: ["akifanaila7"], class: "7" },
        { name: "Alif", code: "alif7", altCodes: [], class: "7" },
        { name: "Arrazak", code: "arrazak7", altCodes: [], class: "7" },
        { name: "David", code: "david7", altCodes: [], class: "7" },
        { name: "Humairah", code: "humairah7", altCodes: [], class: "7" },
        { name: "Irmawati", code: "irmawati7", altCodes: [], class: "7" },
        { name: "Karmila", code: "karmila7", altCodes: [], class: "7" },
        { name: "Laila Nurfadila", code: "laila7", altCodes: ["lailanurfadila7"], class: "7" },
        { name: "Lutfi", code: "lutfi7", altCodes: [], class: "7" },
        { name: "Mipta", code: "mipta7", altCodes: [], class: "7" },
        { name: "Miska Maulida", code: "miska7", altCodes: ["miskamaulida7"], class: "7" },
        { name: "Muhammad Dzaky Al-Gazaly", code: "dzaky7", altCodes: ["muhammaddzaky7", "dzakyalgazaly7"], class: "7" },
        { name: "Muhammad Fikri", code: "fikri7", altCodes: ["muhammadfikri7"], class: "7" },
        { name: "Muhammad Sulipan", code: "sulipan7", altCodes: ["muhammadsulipan7"], class: "7" },
        { name: "Muhammad Yahya", code: "yahya7", altCodes: ["muhammadyahya7"], class: "7" },
        { name: "Nadila", code: "nadila7", altCodes: [], class: "7" },
        { name: "Najwa Hasana", code: "najwa7", altCodes: ["najwahasana7"], class: "7" },
        { name: "Viona Azzahra", code: "viona7", altCodes: ["vionaazzahra7"], class: "7" },
        { name: "Mulyadi", code: "mulyadi7", altCodes: [], class: "7" },
        { name: "Muhsin", code: "muhsin7", altCodes: [], class: "7" },

        // ================= KELAS 8 (10 SISWA) =================
        { name: "Ahmad Dhani", code: "dhani8", altCodes: ["ahmaddhani8"], class: "8" },
        { name: "Ahmad Ridwan", code: "ridwan8", altCodes: ["ahmadridwan8"], class: "8" },
        { name: "Azisatul Ginaya", code: "azisatul8", altCodes: ["azisatulginaya8"], class: "8" },
        { name: "Fikran", code: "fikran8", altCodes: [], class: "8" },
        { name: "Khairul Umam", code: "umam8", altCodes: ["khairulumam8"], class: "8" },
        { name: "Moh Alif", code: "mohalif8", altCodes: ["alif8"], class: "8" },
        { name: "Nur Afika", code: "afika8", altCodes: ["nurafika8"], class: "8" },
        { name: "Nurul Hidayah", code: "nurul8", altCodes: ["nurulhidayah8"], class: "8" },
        { name: "Reski Wahyuni", code: "reski8", altCodes: ["reskiwahyuni8"], class: "8" },
        { name: "Muhammad Fadil", code: "fadil8", altCodes: ["muhammadfadil8"], class: "8" },

        // ================= KELAS 9 (9 SISWA) =================
        { name: "Ahmad Rifki", code: "rifki9", altCodes: ["ahmadrifki9"], class: "9" },
        { name: "Dimos", code: "dimos9", altCodes: [], class: "9" },
        { name: "Elisna", code: "elisna9", altCodes: [], class: "9" },
        { name: "Fatur Rahman", code: "fatur9", altCodes: ["faturrahman9"], class: "9" },
        { name: "Firda", code: "firda9", altCodes: [], class: "9" },
        { name: "Iranti", code: "iranti9", altCodes: [], class: "9" },
        { name: "Riswan", code: "riswan9", altCodes: [], class: "9" },
        { name: "Sabila", code: "sabila9", altCodes: [], class: "9" },
        { name: "Sulfikram", code: "sulfikram9", altCodes: [], class: "9" },

        // Lisensi Guru / Master Key (Akses Semua Kelas)
        { name: "Guru IPA", code: "GURU2026", altCodes: ["guru-ward"], class: "all" }
    ];

    window.WARD_STUDENT_ROSTER = STUDENT_ROSTER;

    // Helper: Storage Access
    function getActiveStudent() {
        try {
            const data = localStorage.getItem('ward_active_student');
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    }

    function setActiveStudent(student) {
        try {
            localStorage.setItem('ward_active_student', JSON.stringify(student));
        } catch (e) {
            console.error('Gagal menyimpan sesi siswa:', e);
        }
    }

    function logoutStudent() {
        localStorage.removeItem('ward_active_student');
        window.location.reload();
    }

    // 2. LOGIKA VALIDASI LISENSI SISWA
    function validateLicense(nameInput, codeInput) {
        const cleanName = (nameInput || '').trim().toLowerCase();
        const cleanCode = (codeInput || '').trim().toLowerCase();

        if (!cleanCode) {
            return { valid: false, message: 'Harap isi Kode Lisensi!' };
        }

        // A. Cek Master Key Guru
        if (cleanCode === 'guru2026' || cleanCode === 'guru-ward') {
            return {
                valid: true,
                student: { name: nameInput.trim() || 'Guru IPA', code: cleanCode, class: 'all', role: 'teacher' }
            };
        }

        // B. Cek terhadap Roster Resmi
        const found = STUDENT_ROSTER.find(s => {
            const matchCode = s.code.toLowerCase() === cleanCode || (s.altCodes && s.altCodes.some(ac => ac.toLowerCase() === cleanCode));
            const nameWords = s.name.toLowerCase().split(' ');
            const inputWords = cleanName.split(' ');
            const matchName = !cleanName || s.name.toLowerCase().includes(cleanName) || nameWords.some(w => inputWords.includes(w));
            return matchCode && matchName;
        }) || STUDENT_ROSTER.find(s => 
            s.code.toLowerCase() === cleanCode || (s.altCodes && s.altCodes.some(ac => ac.toLowerCase() === cleanCode))
        );

        if (found) {
            return {
                valid: true,
                student: { name: nameInput.trim() || found.name, officialName: found.name, code: found.code, class: found.class, role: 'student' }
            };
        }

        // C. Fallback Aturan Pola Kode:
        let detectedClass = null;
        if (cleanCode.endsWith('7') || cleanCode.includes('7')) detectedClass = '7';
        else if (cleanCode.endsWith('8') || cleanCode.includes('8')) detectedClass = '8';
        else if (cleanCode.endsWith('9') || cleanCode.includes('9')) detectedClass = '9';

        if (detectedClass) {
            return {
                valid: true,
                student: { name: nameInput.trim() || 'Siswa', code: cleanCode, class: detectedClass, role: 'student' }
            };
        }

        return {
            valid: false,
            message: 'Kode Lisensi tidak valid! Gunakan kode nama + digit kelas (misal: akifa7 untuk Kelas 7, dhani8 untuk Kelas 8, rifki9 untuk Kelas 9).'
        };
    }

    // 3. CEK HAK AKSES KELAS
    function checkClassAccess(targetClass) {
        const active = getActiveStudent();
        if (!active) return { allowed: false, reason: 'not_logged_in' };
        if (active.class === 'all' || active.class === String(targetClass)) {
            return { allowed: true, student: active };
        }
        return {
            allowed: false,
            reason: 'wrong_class',
            student: active,
            message: `Akses Ditolak 🚫: Halo ${active.name}! Lisensi Anda terdaftar untuk Kelas ${active.class}. Anda tidak dapat membuka Portal Kelas ${targetClass}.`
        };
    }

    function showAuthModal(targetClass) {
        injectAuthUI();
        const modal = document.getElementById('wardStudentAuthModal');
        if (modal) {
            if (targetClass) {
                modal.setAttribute('data-target-class', targetClass);
            }
            modal.style.display = 'flex';
            modal.classList.add('active');
        }
    }

    function hideAuthModal() {
        const modal = document.getElementById('wardStudentAuthModal');
        if (modal) {
            modal.classList.remove('active');
            modal.style.display = 'none';
        }
    }

    // Export API Global
    window.WARD_AUTH = {
        getActiveStudent,
        setActiveStudent,
        logoutStudent,
        validateLicense,
        checkClassAccess,
        showAuthModal,
        hideAuthModal
    };

    // 4. INJEKSI MODAL LOGIN & BADGE STATUS SISWA
    function injectAuthUI() {
        if (document.getElementById('wardStudentAuthModal')) return;

        // Build Dropdown Options grouped by class
        const k7Options = STUDENT_ROSTER.filter(s => s.class === '7').map(s => `<option value="${s.name}" data-code="${s.code}">${s.name} (Kelas 7)</option>`).join('');
        const k8Options = STUDENT_ROSTER.filter(s => s.class === '8').map(s => `<option value="${s.name}" data-code="${s.code}">${s.name} (Kelas 8)</option>`).join('');
        const k9Options = STUDENT_ROSTER.filter(s => s.class === '9').map(s => `<option value="${s.name}" data-code="${s.code}">${s.name} (Kelas 9)</option>`).join('');

        const authModalHTML = `
        <div id="wardStudentAuthModal" class="tugas-modal-overlay" style="z-index: 99999; display: none;">
            <div class="tugas-modal-container" style="max-width: 460px; padding: 0; border-radius: 24px; box-shadow: 0 25px 50px rgba(0,0,0,0.8);">
                <div class="tugas-modal-header" style="background: linear-gradient(135deg, #0284c7, #4f46e5); color: white; border-top-left-radius: 24px; border-top-right-radius: 24px; padding: 1.2rem 1.5rem;">
                    <h3 style="font-size: 1.2rem; font-weight: 700; margin: 0; color: #ffffff; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-key"></i> Input Lisensi / Masuk Siswa
                    </h3>
                    <button type="button" id="btnCloseAuthModal" class="tugas-close-btn" style="color: white; background: transparent; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
                </div>
                <div style="padding: 1.8rem;">
                    <p style="color: #94a3b8; font-size: 0.92rem; margin-bottom: 1.2rem; line-height: 1.5;">
                        Pilih nama Anda di bawah atau ketik Nama & Kode Lisensi Anda untuk masuk.
                    </p>
                    
                    <form id="wardAuthForm">
                        <div style="margin-bottom: 1.2rem;">
                            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Pilih Nama Siswa Terdaftar</label>
                            <select id="wardAuthStudentSelect" style="width: 100%; padding: 12px 14px; background: #0f172a; border: 1px solid rgba(255,255,255,0.25); border-radius: 12px; color: white; font-size: 0.95rem; outline: none; cursor: pointer;">
                                <option value="">-- Pilih Nama Siswa Dari Daftar --</option>
                                <optgroup label="📗 KELAS 7">${k7Options}</optgroup>
                                <optgroup label="📘 KELAS 8">${k8Options}</optgroup>
                                <optgroup label="📙 KELAS 9">${k9Options}</optgroup>
                            </select>
                        </div>

                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Nama Siswa</label>
                            <input type="text" id="wardAuthStudentName" placeholder="Ketik atau pilih dari daftar di atas" required 
                                style="width: 100%; padding: 12px 14px; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; color: white; font-size: 0.95rem; outline: none;">
                        </div>

                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Kode Lisensi Siswa</label>
                            <input type="text" id="wardAuthStudentCode" placeholder="Contoh: akifa7, dhani8, rifki9" required 
                                style="width: 100%; padding: 12px 14px; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; color: white; font-size: 0.95rem; outline: none;">
                            <small style="color: #64748b; font-size: 0.78rem; display: block; margin-top: 5px;">
                                *Gunakan digit 7 untuk Kelas 7, 8 untuk Kelas 8, dan 9 untuk Kelas 9.
                            </small>
                        </div>

                        <div id="wardAuthError" style="display: none; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #fca5a5; padding: 10px; border-radius: 10px; font-size: 0.85rem; margin-bottom: 1.2rem;"></div>

                        <button type="submit" class="btn primary-btn" style="width: 100%; padding: 12px; font-weight: 700; border-radius: 12px; background: linear-gradient(135deg, #0284c7, #3b82f6); color: white; border: none; cursor: pointer; font-size: 1rem;">
                            <i class="fa-solid fa-right-to-bracket"></i> Masuk & Verifikasi Lisensi
                        </button>
                    </form>
                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Event listeners modal
        const modal = document.getElementById('wardStudentAuthModal');
        const form = document.getElementById('wardAuthForm');
        const btnClose = document.getElementById('btnCloseAuthModal');
        const selectName = document.getElementById('wardAuthStudentSelect');
        const inputName = document.getElementById('wardAuthStudentName');
        const inputCode = document.getElementById('wardAuthStudentCode');

        if (selectName) {
            selectName.addEventListener('change', () => {
                const selectedOpt = selectName.options[selectName.selectedIndex];
                if (selectedOpt && selectedOpt.value) {
                    inputName.value = selectedOpt.value;
                    const code = selectedOpt.getAttribute('data-code');
                    if (code) inputCode.value = code;
                }
            });
        }

        if (btnClose) {
            btnClose.addEventListener('click', () => {
                hideAuthModal();
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = inputName.value;
                const code = inputCode.value;
                const errDiv = document.getElementById('wardAuthError');

                const res = validateLicense(name, code);
                if (res.valid) {
                    setActiveStudent(res.student);
                    errDiv.style.display = 'none';
                    hideAuthModal();

                    const targetClass = modal.getAttribute('data-target-class');
                    if (targetClass && (res.student.class === 'all' || res.student.class === targetClass)) {
                        window.location.href = `./KELAS ${targetClass}/index.html`;
                    } else {
                        alert(`Selamat datang ${res.student.name}! Lisensi Kelas ${res.student.class === 'all' ? 'Semua Kelas (Guru)' : res.student.class} Terverifikasi 🎉`);
                        window.location.reload();
                    }
                } else {
                    errDiv.textContent = res.message;
                    errDiv.style.display = 'block';
                }
            });
        }
    }

    // Update Status Bar Siswa Aktif di Top Header
    function updateStudentStatusBar() {
        const active = getActiveStudent();
        let bar = document.getElementById('wardActiveStudentBar');

        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'wardActiveStudentBar';
            bar.style.cssText = `
                position: fixed;
                top: max(12px, env(safe-area-inset-top));
                right: max(16px, env(safe-area-inset-right));
                z-index: 9998;
                background: rgba(15, 23, 42, 0.9);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                padding: 8px 16px;
                border-radius: 50px;
                color: #f8fafc;
                font-size: 0.88rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 12px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            `;
            document.body.appendChild(bar);
        }

        if (active) {
            const classLabel = active.class === 'all' ? 'Guru IPA' : `Kelas ${active.class}`;
            bar.innerHTML = `
                <span style="color: #38bdf8;"><i class="fa-solid fa-user-check"></i> ${active.name} (${classLabel})</span>
                <button type="button" id="btnWardLogout" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.4); padding: 4px 12px; border-radius: 20px; font-size: 0.78rem; cursor: pointer; font-weight: 600;">
                    Keluar / Ganti
                </button>
            `;

            document.getElementById('btnWardLogout').addEventListener('click', () => {
                if (confirm(`Apakah Anda yakin ingin keluar dari akun ${active.name}?`)) {
                    logoutStudent();
                }
            });
        } else {
            bar.innerHTML = `
                <button type="button" id="btnWardLoginOpen" style="background: linear-gradient(135deg, #0284c7, #4f46e5); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; cursor: pointer; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(2,132,199,0.4);">
                    <i class="fa-solid fa-key"></i> Masuk / Input Lisensi Siswa
                </button>
            `;

            document.getElementById('btnWardLoginOpen').addEventListener('click', () => {
                showAuthModal();
            });
        }
    }

    // Inisialisasi Otomatis saat DOM Siap
    document.addEventListener('DOMContentLoaded', () => {
        injectAuthUI();
        updateStudentStatusBar();
    });
})();
