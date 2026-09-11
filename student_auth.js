/* =========================================================
   SISTEM LISENSI & OTENTIKASI SISWA WARD-IPA
   ========================================================= */

(function () {
    // 1. DAFTAR NAMA & KODE LISENSI SISWA (ROSTER)
    // Silakan masukkan/kirimkan daftar siswa Anda di sini nanti:
    const STUDENT_ROSTER = [
        // Contoh Siswa Kelas 7
        { name: "Amira", code: "amira7", class: "7" },
        { name: "Andi", code: "andi7", class: "7" },
        { name: "Bagus", code: "bagus7", class: "7" },

        // Contoh Siswa Kelas 8
        { name: "Budi", code: "budi8", class: "8" },
        { name: "Bella", code: "bella8", class: "8" },

        // Contoh Siswa Kelas 9
        { name: "Citra", code: "citra9", class: "9" },
        { name: "Cahyo", code: "cahyo9", class: "9" },

        // Lisensi Guru / Master Key (Akses Semua Kelas)
        { name: "Guru IPA", code: "GURU2026", class: "all" }
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
        const cleanName = (nameInput || '').trim();
        const cleanCode = (codeInput || '').trim().toLowerCase();

        if (!cleanName || !cleanCode) {
            return { valid: false, message: 'Harap isi Nama Siswa dan Kode Lisensi!' };
        }

        // A. Cek Master Key Guru
        if (cleanCode === 'guru2026' || cleanCode === 'guru-ward') {
            return {
                valid: true,
                student: { name: cleanName || 'Guru', code: cleanCode, class: 'all', role: 'teacher' }
            };
        }

        // B. Cek terhadap Roster Resmi
        const found = STUDENT_ROSTER.find(s => 
            s.name.toLowerCase() === cleanName.toLowerCase() && 
            s.code.toLowerCase() === cleanCode
        );

        if (found) {
            return {
                valid: true,
                student: { name: found.name, code: found.code, class: found.class, role: 'student' }
            };
        }

        // C. Fallback Aturan Pola Kode (Jika belum ada di Roster resmi):
        // Misal: Jika kode diakhiri/mengandung angka 7 -> Kelas 7, 8 -> Kelas 8, 9 -> Kelas 9
        let detectedClass = null;
        if (cleanCode.endsWith('7') || cleanCode.includes('7')) detectedClass = '7';
        else if (cleanCode.endsWith('8') || cleanCode.includes('8')) detectedClass = '8';
        else if (cleanCode.endsWith('9') || cleanCode.includes('9')) detectedClass = '9';

        if (detectedClass) {
            return {
                valid: true,
                student: { name: cleanName, code: cleanCode, class: detectedClass, role: 'student' }
            };
        }

        return {
            valid: false,
            message: 'Kode Lisensi tidak valid! Pastikan kode memuat digit kelas (contoh: amira7 untuk Kelas 7).'
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

    // Export API Global
    window.WARD_AUTH = {
        getActiveStudent,
        setActiveStudent,
        logoutStudent,
        validateLicense,
        checkClassAccess
    };

    // 4. INJEKSI MODAL LOGIN & BADGE STATUS SISWA
    function injectAuthUI() {
        if (document.getElementById('wardStudentAuthModal')) return;

        const authModalHTML = `
        <div id="wardStudentAuthModal" class="tugas-modal-overlay" style="z-index: 99999;">
            <div class="tugas-modal-container" style="max-width: 440px; padding: 0;">
                <div class="tugas-modal-header" style="background: linear-gradient(135deg, #0284c7, #4f46e5); color: white; border-top-left-radius: 24px; border-top-right-radius: 24px;">
                    <h3><i class="fa-solid fa-key"></i> Aktivasi Lisensi Siswa</h3>
                    <button type="button" id="btnCloseAuthModal" class="tugas-close-btn" style="color: white; background: transparent; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
                </div>
                <div style="padding: 1.8rem;">
                    <p style="color: #94a3b8; font-size: 0.92rem; margin-bottom: 1.2rem; line-height: 1.5;">
                        Masukkan Nama dan Kode Lisensi Kelas Anda untuk membuka akses media pembelajaran WARD-IPA.
                    </p>
                    
                    <form id="wardAuthForm">
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Nama Siswa</label>
                            <input type="text" id="wardAuthStudentName" placeholder="Contoh: Amira" required 
                                style="width: 100%; padding: 12px 14px; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; color: white; font-size: 0.95rem; outline: none;">
                        </div>

                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Kode Lisensi (Sesuai Kelas)</label>
                            <input type="text" id="wardAuthStudentCode" placeholder="Contoh: amira7 (Untuk Kelas 7)" required 
                                style="width: 100%; padding: 12px 14px; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; color: white; font-size: 0.95rem; outline: none;">
                            <small style="color: #64748b; font-size: 0.78rem; display: block; margin-top: 5px;">
                                *Angka 7 pada kode menandakan Kelas 7, 8 untuk Kelas 8, dan 9 untuk Kelas 9.
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

        if (btnClose) {
            btnClose.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('wardAuthStudentName').value;
                const code = document.getElementById('wardAuthStudentCode').value;
                const errDiv = document.getElementById('wardAuthError');

                const res = validateLicense(name, code);
                if (res.valid) {
                    setActiveStudent(res.student);
                    errDiv.style.display = 'none';
                    modal.classList.remove('active');
                    alert(`Selamat datang ${res.student.name}! Lisensi Kelas ${res.student.class === 'all' ? 'Semua Kelas (Guru)' : res.student.class} Terverifikasi 🎉`);
                    window.location.reload();
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
                background: rgba(15, 23, 42, 0.85);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.15);
                padding: 6px 14px;
                border-radius: 50px;
                color: #f8fafc;
                font-size: 0.85rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
            `;
            document.body.appendChild(bar);
        }

        if (active) {
            const classLabel = active.class === 'all' ? 'Guru' : `Kelas ${active.class}`;
            bar.innerHTML = `
                <span style="color: #38bdf8;"><i class="fa-solid fa-user-check"></i> ${active.name} (${classLabel})</span>
                <button type="button" id="btnWardLogout" style="background: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.4); padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; cursor: pointer; font-weight: 600;">
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
                <button type="button" id="btnWardLoginOpen" style="background: linear-gradient(135deg, #0284c7, #4f46e5); color: white; border: none; padding: 6px 14px; border-radius: 20px; font-size: 0.82rem; cursor: pointer; font-weight: 700; display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-key"></i> Masuk / Input Lisensi
                </button>
            `;

            document.getElementById('btnWardLoginOpen').addEventListener('click', () => {
                const modal = document.getElementById('wardStudentAuthModal');
                if (modal) modal.classList.add('active');
            });
        }
    }

    // Inisialisasi Otomatis saat DOM Siap
    document.addEventListener('DOMContentLoaded', () => {
        injectAuthUI();
        updateStudentStatusBar();
    });
})();
