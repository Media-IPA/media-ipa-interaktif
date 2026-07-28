// State Data
function safeParse(key, defaultVal) {
    try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : defaultVal;
    } catch(e) {
        return defaultVal;
    }
}
let attendanceData = safeParse('ipaApp_attendance', []);
let gradesData = safeParse('ipaApp_grades', []);

let isLoggedIn = false;
try {
    isLoggedIn = localStorage.getItem('ipaApp_isLoggedIn') === 'true';
} catch(e) {}

// DOM Elements
const teacherDashboard = document.getElementById('teacherDashboard');
const navLogoutBtn = document.getElementById('navLogoutBtn');

// Modal Elements
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    updateViewState();
    renderAttendance();
    renderGrades();
});

// View Management
function updateViewState() {
    if (isLoggedIn) {
        if(loginModal) loginModal.classList.add('hidden');
        if(teacherDashboard) teacherDashboard.classList.remove('hidden');
        if(navLogoutBtn) navLogoutBtn.classList.remove('hidden');
    } else {
        if(loginModal) loginModal.classList.remove('hidden');
        if(teacherDashboard) teacherDashboard.classList.add('hidden');
        if(navLogoutBtn) navLogoutBtn.classList.add('hidden');
    }
}

// Login Modal Events
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value.trim().toLowerCase();
        const pass = document.getElementById('password').value.trim();

        if (user === 'guru' && pass === '123') {
            isLoggedIn = true;
            try { localStorage.setItem('ipaApp_isLoggedIn', 'true'); } catch(e) {}
            loginForm.reset();
            loginError.classList.add('hidden');
            updateViewState();
        } else {
            loginError.classList.remove('hidden');
        }
    });
}

if (navLogoutBtn) {
    navLogoutBtn.addEventListener('click', () => {
        isLoggedIn = false;
        try { localStorage.setItem('ipaApp_isLoggedIn', 'false'); } catch(e) {}
        updateViewState();
    });
}

// Sidebar Tab Management
const menuItems = document.querySelectorAll('.menu-item');
const tabContents = document.querySelectorAll('.tab-content');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class
        menuItems.forEach(mi => mi.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.add('hidden'));
        
        // Add active class
        item.classList.add('active');
        const targetId = item.getAttribute('data-target');
        document.getElementById(targetId).classList.remove('hidden');
    });
});

// Helper: Get Day Name from Date string
function getDayName(dateString) {
    const date = new Date(dateString);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[date.getDay()];
}

// ============== ATTENDANCE CRUD ==============
const attendanceForm = document.getElementById('attendanceForm');
const attendanceTableBody = document.querySelector('#attendanceTable tbody');
const attIdInput = document.getElementById('attId');
const attNameInput = document.getElementById('attName');
const attDateInput = document.getElementById('attDate');
const attStatusInput = document.getElementById('attStatus');
const formAttendanceTitle = document.getElementById('formAttendanceTitle');
const attCancelBtn = document.getElementById('attCancelBtn');

function renderAttendance() {
    attendanceTableBody.innerHTML = '';
    if(attendanceData.length === 0) {
        attendanceTableBody.innerHTML = '<tr><td colspan="6" class="text-center">Belum ada data kehadiran</td></tr>';
        return;
    }

    attendanceData.forEach((item, index) => {
        const tr = document.createElement('tr');
        const statusClass = `status-${item.status.toLowerCase()}`;
        
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.day}</td>
            <td>${item.date}</td>
            <td><span class="status-badge ${statusClass}">${item.status}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon edit" onclick="editAttendance(${item.id})"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-icon delete" onclick="deleteAttendance(${item.id})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        attendanceTableBody.appendChild(tr);
    });
}

attendanceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = attIdInput.value;
    const name = attNameInput.value;
    const date = attDateInput.value;
    const status = attStatusInput.value;
    const day = getDayName(date);

    if (id) {
        // Edit
        const index = attendanceData.findIndex(item => item.id == id);
        if(index !== -1) {
            attendanceData[index] = { id: parseInt(id), name, date, day, status };
        }
    } else {
        // Add
        const newId = attendanceData.length > 0 ? Math.max(...attendanceData.map(a => a.id)) + 1 : 1;
        attendanceData.push({ id: newId, name, date, day, status });
    }

    saveAttendance();
    resetAttForm();
});

function editAttendance(id) {
    const item = attendanceData.find(a => a.id === id);
    if(item) {
        attIdInput.value = item.id;
        attNameInput.value = item.name;
        attDateInput.value = item.date;
        attStatusInput.value = item.status;
        formAttendanceTitle.innerText = 'Edit Kehadiran';
        attCancelBtn.style.display = 'inline-block';
        window.scrollTo(0, 0);
    }
}

function deleteAttendance(id) {
    if(confirm('Apakah Anda yakin ingin menghapus data ini?')) {
        attendanceData = attendanceData.filter(a => a.id !== id);
        saveAttendance();
    }
}

function resetAttForm() {
    attendanceForm.reset();
    attIdInput.value = '';
    formAttendanceTitle.innerText = 'Tambah Kehadiran';
    attCancelBtn.style.display = 'none';
}

attCancelBtn.addEventListener('click', resetAttForm);

function saveAttendance() {
    localStorage.setItem('ipaApp_attendance', JSON.stringify(attendanceData));
    renderAttendance();
}

// ============== GRADES CRUD ==============
const gradeForm = document.getElementById('gradeForm');
const gradesTableBody = document.querySelector('#gradesTable tbody');
const grIdInput = document.getElementById('grId');
const grNameInput = document.getElementById('grName');
const grTPInput = document.getElementById('grTP');
const grUHInput = document.getElementById('grUH');
const grSTSInput = document.getElementById('grSTS');
const grSASInput = document.getElementById('grSAS');
const formGradeTitle = document.getElementById('formGradeTitle');
const grCancelBtn = document.getElementById('grCancelBtn');

function calculateRapor(tp, uh, sts, sas) {
    const avg = (parseFloat(tp) + parseFloat(uh) + parseFloat(sts) + parseFloat(sas)) / 4;
    return avg.toFixed(1);
}

function getPredikat(rapor) {
    if(rapor >= 90) return 'A (Sangat Baik)';
    if(rapor >= 80) return 'B (Baik)';
    if(rapor >= 70) return 'C (Cukup)';
    return 'D (Kurang)';
}

function renderGrades() {
    gradesTableBody.innerHTML = '';
    if(gradesData.length === 0) {
        gradesTableBody.innerHTML = '<tr><td colspan="9" class="text-center">Belum ada data nilai</td></tr>';
        return;
    }

    gradesData.forEach((item, index) => {
        const rapor = calculateRapor(item.tp, item.uh, item.sts, item.sas);
        const predikat = getPredikat(rapor);
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.tp}</td>
            <td>${item.uh}</td>
            <td>${item.sts}</td>
            <td>${item.sas}</td>
            <td><strong>${rapor}</strong></td>
            <td>${predikat}</td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon edit" onclick="editGrade(${item.id})"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-icon delete" onclick="deleteGrade(${item.id})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        gradesTableBody.appendChild(tr);
    });
}

gradeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = grIdInput.value;
    const name = grNameInput.value;
    const tp = grTPInput.value;
    const uh = grUHInput.value;
    const sts = grSTSInput.value;
    const sas = grSASInput.value;

    if (id) {
        // Edit
        const index = gradesData.findIndex(item => item.id == id);
        if(index !== -1) {
            gradesData[index] = { id: parseInt(id), name, tp, uh, sts, sas };
        }
    } else {
        // Add
        const newId = gradesData.length > 0 ? Math.max(...gradesData.map(g => g.id)) + 1 : 1;
        gradesData.push({ id: newId, name, tp, uh, sts, sas });
    }

    saveGrades();
    resetGradeForm();
});

function editGrade(id) {
    const item = gradesData.find(g => g.id === id);
    if(item) {
        grIdInput.value = item.id;
        grNameInput.value = item.name;
        grTPInput.value = item.tp;
        grUHInput.value = item.uh;
        grSTSInput.value = item.sts;
        grSASInput.value = item.sas;
        formGradeTitle.innerText = 'Edit Nilai';
        grCancelBtn.style.display = 'inline-block';
        window.scrollTo(0, 0);
    }
}

function deleteGrade(id) {
    if(confirm('Apakah Anda yakin ingin menghapus data nilai ini?')) {
        gradesData = gradesData.filter(g => g.id !== id);
        saveGrades();
    }
}

function resetGradeForm() {
    gradeForm.reset();
    grIdInput.value = '';
    formGradeTitle.innerText = 'Tambah Nilai';
    grCancelBtn.style.display = 'none';
}

grCancelBtn.addEventListener('click', resetGradeForm);

function saveGrades() {
    localStorage.setItem('ipaApp_grades', JSON.stringify(gradesData));
    renderGrades();
}

// Sub-tab switching logic
const subTabBtns = document.querySelectorAll('.sub-tab-btn');
const subTabContents = document.querySelectorAll('.sub-tab-content');

subTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Find siblings in the same parent sub-tabs container
        const parent = btn.closest('.sub-tabs');
        if(!parent) return;
        
        parent.querySelectorAll('.sub-tab-btn').forEach(b => {
            b.classList.remove('active');
            b.classList.add('outline');
            b.style.background = 'transparent';
            if (b.dataset.subtarget === 'subGradesData') {
                b.style.color = 'var(--primary)';
                b.style.border = '1px solid var(--primary)';
            } else {
                b.style.color = 'var(--accent)';
                b.style.border = '1px solid var(--accent)';
            }
        });
        
        btn.classList.add('active');
        btn.classList.remove('outline');
        if (btn.dataset.subtarget === 'subGradesData') {
            btn.style.background = 'var(--primary)';
            btn.style.color = 'white';
        } else {
            btn.style.background = 'var(--accent)';
            btn.style.color = 'white';
        }

        // Switch contents
        subTabContents.forEach(tc => tc.classList.add('hidden'));
        document.getElementById(btn.dataset.subtarget).classList.remove('hidden');
    });
});

// AI Copilot Logic
const aiSoalForm = document.getElementById('aiSoalForm');
const aiLoading = document.getElementById('aiLoading');
const aiLoadingText = document.getElementById('aiLoadingText');
const aiOutput = document.getElementById('aiOutput');
const aiGeneratedQuestions = document.getElementById('aiGeneratedQuestions');
const lblExamType = document.getElementById('lblExamType');
const btnResetAI = document.getElementById('btnResetAI');
const qTypeError = document.getElementById('qTypeError');

if (aiSoalForm) {
    aiSoalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get checked types
        const checkedTypes = Array.from(document.querySelectorAll('input[name="qType"]:checked')).map(cb => cb.value);
        if (checkedTypes.length === 0) {
            qTypeError.classList.remove('hidden');
            return;
        }
        qTypeError.classList.add('hidden');

        const examType = document.getElementById('aiExamType').value;
        const topic = document.getElementById('aiTopic').value;
        const count = parseInt(document.getElementById('aiCount').value) || 5;
        const difficulty = document.getElementById('aiDifficulty').value;

        // Hide form, show loading
        aiSoalForm.style.display = 'none';
        aiLoading.classList.remove('hidden');
        lblExamType.innerText = examType;
        
        const loadingTexts = [
            "AI sedang menganalisis materi...",
            "Menyesuaikan tingkat kesulitan " + difficulty + "...",
            "Menyusun kombinasi tipe soal...",
            "Menghasilkan butir soal dan kunci...",
            "Memfinalisasi soal..."
        ];
        
        let step = 0;
        const loadInterval = setInterval(() => {
            step++;
            if(step < loadingTexts.length) {
                aiLoadingText.innerText = loadingTexts[step];
            }
        }, 800);

        // Database AI Simulasi (Smart Mock AI)
        const mockQuestionBank = [
            // BAB 1: Besaran dan Pengukuran
            { bab: 1, type: "Pilihan Ganda", topic: "besaran pengukuran mikroskop", q: "Perhatikan mikroskop berikut. Bagian yang berfungsi untuk mengatur fokus bayangan secara halus ditunjukkan oleh...", img: "../assets/q_mikroskop.png", options: ["A. Lensa Okuler", "B. Mikrometer", "C. Makrometer", "D. Revolver"], ans: "B" },
            { bab: 1, type: "Benar/Salah", topic: "besaran pokok turunan massa", q: "Massa adalah besaran turunan yang diturunkan dari besaran pokok panjang.", ans: "Salah" },
            { bab: 1, type: "Isian Singkat", topic: "besaran pokok satuan", q: "Satuan standar internasional (SI) untuk besaran pokok suhu adalah...", ans: "Kelvin" },
            
            // BAB 2: Wujud Zat
            { bab: 2, type: "Pilihan Ganda Kompleks", topic: "wujud zat perubahan wujud melepaskan kalor", q: "Pilih 2 pernyataan yang benar mengenai perubahan wujud zat yang MELEPASKAN kalor!", options: ["Air membeku menjadi es", "Es mencair menjadi air", "Uap air mengembun menjadi air", "Kapur barus menyublim"], ans: [0, 2] },
            { bab: 2, type: "Pilihan Ganda", topic: "wujud gas padat cair partikel", q: "Jarak antar partikel yang sangat renggang dan gaya tarik antar partikel yang sangat lemah merupakan karakteristik dari zat berwujud...", options: ["A. Padat", "B. Cair", "C. Gas", "D. Plasma"], ans: "C" },

            // BAB 3: Suhu dan Kalor
            { bab: 3, type: "Pilihan Ganda", topic: "suhu termometer celcius fahrenheit kelvin kalor", q: "Perbandingan skala Celcius, Fahrenheit, dan Kelvin pada termometer menunjukkan titik didih air normal pada skala Fahrenheit adalah...", img: "../assets/q_suhu.png", options: ["A. 100°F", "B. 212°F", "C. 373°F", "D. 80°F"], ans: "B" },
            { bab: 3, type: "Benar/Salah", topic: "kalor perpindahan konduksi konveksi radiasi", q: "Perpindahan panas dari matahari ke bumi yang melewati ruang hampa udara terjadi secara konduksi.", ans: "Salah" },
            { bab: 3, type: "Menjodohkan", topic: "perpindahan kalor konduksi konveksi radiasi", q: "Jodohkan fenomena berikut dengan jenis perpindahan panasnya!", pairs: [{ p: "Ujung sendok logam terasa panas saat mengaduk kopi", o: ["Konduksi", "Konveksi", "Radiasi"] }, { p: "Badan terasa hangat saat berada di dekat api unggun", o: ["Konduksi", "Konveksi", "Radiasi"] }] },

            // BAB 4: Gaya dan Gerak
            { bab: 4, type: "Isian Singkat", topic: "gaya gerak gesek", q: "Gaya yang bekerja berlawanan arah dengan arah gerak benda yang saling bersentuhan disebut gaya...", ans: "Gesek" },
            { bab: 4, type: "Pilihan Ganda", topic: "gaya newton percepatan", q: "Hukum II Newton menyatakan bahwa percepatan sebuah benda berbanding lurus dengan gaya total yang bekerja padanya dan berbanding terbalik dengan...", options: ["A. Kecepatannya", "B. Massanya", "C. Volumenya", "D. Berat jenisnya"], ans: "B" },

            // BAB 5: Klasifikasi Makhluk Hidup
            { bab: 5, type: "Menjodohkan", topic: "klasifikasi makhluk hidup taksonomi hewan", q: "Jodohkan nama hewan berikut dengan kelas taksonominya yang tepat!", pairs: [{ p: "1. Burung Merpati", o: ["Amfibi", "Aves", "Mamalia"] }, { p: "2. Kucing", o: ["Amfibi", "Aves", "Mamalia"] }, { p: "3. Katak", o: ["Amfibi", "Aves", "Mamalia"] }] },
            { bab: 5, type: "Benar/Salah", topic: "klasifikasi tumbuhan monokotil dikotil", q: "Tumbuhan dikotil memiliki ciri khas yaitu tulang daun sejajar atau melengkung.", ans: "Salah" },

            // BAB 6: Interaksi Lingkungan
            { bab: 6, type: "Pilihan Ganda", topic: "interaksi ekosistem makhluk hidup simbiosis", q: "Interaksi antara ikan badut dan anemon laut, di mana ikan badut mendapat perlindungan dan anemon mendapat sisa makanan, merupakan contoh simbiosis...", options: ["A. Parasitisme", "B. Komensalisme", "C. Mutualisme", "D. Amensalisme"], ans: "C" },
            { bab: 6, type: "Pilihan Ganda Kompleks", topic: "komponen abiotik biotik ekosistem", q: "Manakah dari komponen berikut yang termasuk komponen abiotik dalam suatu ekosistem? (Pilih semua yang benar)", options: ["Cahaya Matahari", "Bakteri Pengurai", "Air", "Jamur"], ans: [0, 2] },

            // BAB 7: Tata Surya
            { bab: 7, type: "Pilihan Ganda", topic: "tata surya planet matahari bumi", q: "Perhatikan ilustrasi tata surya berikut. Planet terbesar dalam sistem tata surya kita adalah...", img: "../assets/q_tata_surya.png", options: ["A. Bumi", "B. Jupiter", "C. Saturnus", "D. Uranus"], ans: "B" },
            { bab: 7, type: "Isian Singkat", topic: "tata surya planet merah mars", q: "Planet yang dijuluki sebagai Planet Merah karena kandungan debu besinya adalah...", ans: "Mars" },
            { bab: 7, type: "Benar/Salah", topic: "tata surya satelit bulan bumi", q: "Bulan memancarkan cahayanya sendiri pada malam hari.", ans: "Salah" }
        ];

        // Simulate AI generation delay
        setTimeout(() => {
            clearInterval(loadInterval);
            aiLoading.classList.add('hidden');
            aiOutput.classList.remove('hidden');
            
            aiGeneratedQuestions.innerHTML = '';

            // Smart Search Algorithm
            const topicWords = topic.toLowerCase().split(/\s+/).filter(w => w.length > 2);
            let pool = mockQuestionBank.filter(q => checkedTypes.includes(q.type));
            
            // Score pool based on topic words matching
            pool.forEach(q => {
                let score = 0;
                if (topic.toLowerCase().includes("semua bab")) {
                    score = Math.random() * 10; // Randomize heavily for "semua bab"
                } else {
                    topicWords.forEach(w => {
                        if (q.topic.includes(w) || q.q.toLowerCase().includes(w)) score += 5;
                    });
                    if (score === 0) score = Math.random(); // If no strict match, assign small random score
                }
                q._score = score;
            });

            // Sort by score descending and take top N
            pool.sort((a, b) => b._score - a._score);
            let selectedQs = pool.slice(0, count);

            // If we don't have enough matches, fallback to random from requested types
            if (selectedQs.length < count) {
                // Not possible with current mock size if count > 17, but good enough for prototype.
            }

            // Shuffle selected slightly
            selectedQs.sort(() => Math.random() - 0.5);

            selectedQs.forEach((item, index) => {
                let i = index + 1;
                let qType = item.type;
                
                const qCard = document.createElement('div');
                qCard.className = 'glass-card';
                qCard.style.padding = '1.5rem';
                qCard.style.position = 'relative';
                qCard.style.background = 'white';
                
                let qHtml = `<span class="badge" style="position: absolute; top: 1.5rem; right: 1.5rem; background: var(--accent); font-size: 0.7rem;">${qType}</span>
                             <h4 style="margin-bottom: 1rem; color: var(--primary);">Soal ${i} (Bab ${item.bab})</h4>`;
                
                if (item.img) {
                    qHtml += `<div style="margin-bottom: 1rem; text-align: center;"><img src="${item.img}" style="max-height: 200px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);"></div>`;
                }

                qHtml += `<p style="margin-bottom: 1.25rem; font-weight: 500; font-size: 1.05rem;">${item.q}</p>`;
                
                if (qType === 'Pilihan Ganda') {
                    qHtml += `<div style="display: flex; flex-direction: column; gap: 0.8rem; margin-left: 1rem;">`;
                    item.options.forEach((opt, idx) => {
                        qHtml += `<label style="cursor: pointer; padding: 0.5rem; border-radius: 8px; transition: 0.2s; background: rgba(0,0,0,0.02);"><input type="radio" name="q${i}"> ${opt}</label>`;
                    });
                    qHtml += `</div>`;
                } else if (qType === 'Menjodohkan') {
                    qHtml += `<div style="display: flex; gap: 2rem;">
                        <ul style="list-style:none; flex:1; display:flex; flex-direction:column; gap:0.8rem;">`;
                    item.pairs.forEach(pair => {
                        let optHtml = `<option value="">Pilih Jawaban...</option>`;
                        pair.o.forEach(o => optHtml += `<option>${o}</option>`);
                        qHtml += `<li style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.02); padding: 0.8rem 1rem; border-radius: 8px;">
                            <span style="font-weight: 500;">${pair.p}</span>
                            <select style="padding: 0.5rem; border-radius: 6px; border: 1px solid rgba(0,0,0,0.2); outline: none;">${optHtml}</select>
                        </li>`;
                    });
                    qHtml += `</ul></div>`;
                } else if (qType === 'Benar/Salah') {
                    qHtml += `<div style="display: flex; gap: 1rem; margin-top: 1rem;">
                        <button type="button" class="btn btn-sm bs-btn" style="background: rgba(16, 185, 129, 0.1); color: #059669; border: 1px solid rgba(16, 185, 129, 0.3);">Benar</button>
                        <button type="button" class="btn btn-sm bs-btn" style="background: rgba(239, 68, 68, 0.1); color: #dc2626; border: 1px solid rgba(239, 68, 68, 0.3);">Salah</button>
                    </div>`;
                } else if (qType === 'Pilihan Ganda Kompleks') {
                    qHtml += `<p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.8rem; background: rgba(59,130,246,0.1); padding: 0.5rem; border-radius: 6px; display: inline-block;"><i class="fa-solid fa-circle-info"></i> Pilih 2 atau lebih jawaban yang benar</p>
                    <div style="display: flex; flex-direction: column; gap: 0.8rem; margin-left: 1rem;">`;
                    item.options.forEach((opt, idx) => {
                        qHtml += `<label style="cursor: pointer; padding: 0.5rem; border-radius: 8px; background: rgba(0,0,0,0.02);"><input type="checkbox"> ${opt}</label>`;
                    });
                    qHtml += `</div>`;
                } else if (qType === 'Isian Singkat') {
                    qHtml += `<input type="text" placeholder="Ketik jawaban di sini..." style="width: 100%; padding: 1rem 1.25rem; border-radius: 8px; border: 1.5px solid rgba(0,0,0,0.1); outline: none; font-size: 1rem;">`;
                }

                qCard.innerHTML = qHtml;
                aiGeneratedQuestions.appendChild(qCard);

                // Interactivity for Benar/Salah buttons
                if (qType === 'Benar/Salah') {
                    const btns = qCard.querySelectorAll('.bs-btn');
                    btns.forEach(b => {
                        b.addEventListener('click', (ev) => {
                            btns.forEach(x => { x.style.opacity = '0.5'; x.style.transform = 'scale(0.95)'; });
                            ev.target.style.opacity = '1';
                            ev.target.style.transform = 'scale(1)';
                            ev.target.style.fontWeight = 'bold';
                        });
                    });
                }
            }

        }, 4500);
    });

    if(btnResetAI) {
        btnResetAI.addEventListener('click', () => {
            aiOutput.classList.add('hidden');
            aiSoalForm.style.display = 'block';
            aiLoadingText.innerText = "AI sedang menganalisis materi...";
        });
    }
}

// Fullscreen Toggle Logic
const fullscreenBtn = document.getElementById('fullscreenBtn');
if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Gagal masuk mode layar penuh: ${err.message}`);
            });
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
            fullscreenBtn.setAttribute('title', 'Keluar Layar Penuh');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
                fullscreenBtn.setAttribute('title', 'Mode Layar Penuh');
            }
        }
    });
}
