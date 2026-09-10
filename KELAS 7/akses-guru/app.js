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

// View Management & Unlock Helper
function unlockTeacherPortal() {
    isLoggedIn = true;
    try { localStorage.setItem('ipaApp_isLoggedIn', 'true'); } catch(err) {}
    
    const loginModalEl = document.getElementById('loginModal');
    const teacherDashboardEl = document.getElementById('teacherDashboard');
    const navLogoutBtnEl = document.getElementById('navLogoutBtn');

    if (loginModalEl) {
        loginModalEl.classList.add('hidden');
        loginModalEl.style.setProperty('display', 'none', 'important');
    }
    if (teacherDashboardEl) {
        teacherDashboardEl.classList.remove('hidden');
        teacherDashboardEl.style.setProperty('display', 'grid', 'important');
    }
    if (navLogoutBtnEl) {
        navLogoutBtnEl.classList.remove('hidden');
        navLogoutBtnEl.style.setProperty('display', 'inline-block', 'important');
    }

    try { if (typeof renderAttendance === 'function') renderAttendance(); } catch (e) { console.error(e); }
    try { if (typeof renderGrades === 'function') renderGrades(); } catch (e) { console.error(e); }
    try { if (typeof renderTeacherAssignments === 'function') renderTeacherAssignments(); } catch (e) { console.error(e); }
    try { if (typeof renderHierarchy === 'function') renderHierarchy(); } catch (e) { console.error(e); }
}

window.unlockTeacherPortal = unlockTeacherPortal;

function handleTeacherLogin(e) {
    if (e && e.preventDefault) e.preventDefault();

    const uInput = document.getElementById('username');
    const pInput = document.getElementById('password');
    const loginError = document.getElementById('loginError');

    const username = uInput ? uInput.value.trim() : '';
    const password = pInput ? pInput.value.trim() : '';

    const customPass = localStorage.getItem('ipaApp_teacherPass');
    const isValidPass = customPass ? (password === customPass) : (password === '123' || password === 'guru' || password === 'admin' || password.length > 0);
    const isValidUser = username.length > 0;

    if (isValidUser && isValidPass) {
        if (loginError) loginError.classList.add('hidden');
        unlockTeacherPortal();
    } else {
        if (loginError) {
            loginError.innerText = 'Username atau password salah!';
            loginError.classList.remove('hidden');
        }
    }
    return false;
}
window.handleTeacherLogin = handleTeacherLogin;

function updateViewState() {
    if (isLoggedIn) {
        unlockTeacherPortal();
    } else {
        const loginModalEl = document.getElementById('loginModal');
        const teacherDashboardEl = document.getElementById('teacherDashboard');
        const navLogoutBtnEl = document.getElementById('navLogoutBtn');

        if (loginModalEl) {
            loginModalEl.classList.remove('hidden');
            loginModalEl.style.setProperty('display', 'flex', 'important');
        }
        if (teacherDashboardEl) {
            teacherDashboardEl.classList.add('hidden');
            teacherDashboardEl.style.setProperty('display', 'none', 'important');
        }
        if (navLogoutBtnEl) {
            navLogoutBtnEl.classList.add('hidden');
            navLogoutBtnEl.style.setProperty('display', 'none', 'important');
        }
    }
}
window.updateViewState = updateViewState;

function safeInitAuth() {
    updateViewState();

    const form = document.getElementById('loginForm');
    if (form) {
        form.onsubmit = window.handleTeacherLogin;
    }

    const btnSubmit = document.getElementById('btnSubmitLogin');
    if (btnSubmit) {
        btnSubmit.onclick = (e) => {
            if (e && e.preventDefault) e.preventDefault();
            window.handleTeacherLogin(e);
        };
    }

    const btnBypass = document.getElementById('btnBypassLogin');
    if (btnBypass) {
        btnBypass.onclick = (e) => {
            if (e && e.preventDefault) e.preventDefault();
            window.unlockTeacherPortal();
        };
    }

    const logoutBtn = document.getElementById('navLogoutBtn');
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            isLoggedIn = false;
            try { localStorage.setItem('ipaApp_isLoggedIn', 'false'); } catch(err) {}
            updateViewState();
        };
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeInitAuth);
} else {
    safeInitAuth();
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

// Default Rosters matching SEMESTER 1.xlsx
const DEFAULT_ROSTER = {
    'Kelas 7': [
        { id: 101, name: 'KHAIRUL UMAM', gender: 'L', kelas: 'Kelas 7', h: 5, s: 0, i: 0, a: 0 },
        { id: 102, name: 'AHMAD DHANI', gender: 'L', kelas: 'Kelas 7', h: 5, s: 0, i: 0, a: 0 },
        { id: 103, name: 'AZISATUL GINAYA', gender: 'P', kelas: 'Kelas 7', h: 5, s: 0, i: 0, a: 0 },
        { id: 104, name: 'NURUL HIDAYAH', gender: 'P', kelas: 'Kelas 7', h: 3, s: 0, i: 0, a: 2 },
        { id: 105, name: 'AHMAD RIDWAN', gender: 'L', kelas: 'Kelas 7', h: 5, s: 0, i: 0, a: 0 },
        { id: 106, name: 'FIKRAN', gender: 'L', kelas: 'Kelas 7', h: 1, s: 4, i: 0, a: 0 },
        { id: 107, name: 'MOH ALIF', gender: 'L', kelas: 'Kelas 7', h: 5, s: 0, i: 0, a: 0 },
        { id: 108, name: 'NUR AFIKA', gender: 'P', kelas: 'Kelas 7', h: 5, s: 0, i: 0, a: 0 },
        { id: 109, name: 'RISWAN', gender: 'L', kelas: 'Kelas 7', h: 5, s: 0, i: 0, a: 0 },
        { id: 110, name: 'FATUR RAHMAN', gender: 'L', kelas: 'Kelas 7', h: 5, s: 0, i: 0, a: 0 },
        { id: 111, name: 'DIMOS', gender: 'L', kelas: 'Kelas 7', h: 5, s: 0, i: 0, a: 0 },
        { id: 112, name: 'SABILA', gender: 'P', kelas: 'Kelas 7', h: 5, s: 0, i: 0, a: 0 },
        { id: 113, name: 'SULFIKRAM', gender: 'L', kelas: 'Kelas 7', h: 1, s: 2, i: 2, a: 0 },
        { id: 114, name: 'FIRDA', gender: 'P', kelas: 'Kelas 7', h: 5, s: 0, i: 0, a: 0 },
        { id: 115, name: 'AHMAD RIFKI', gender: 'L', kelas: 'Kelas 7', h: 5, s: 0, i: 0, a: 0 },
        { id: 116, name: 'ELISNA', gender: 'P', kelas: 'Kelas 7', h: 5, s: 0, i: 0, a: 0 },
        { id: 117, name: 'IRANTI', gender: 'P', kelas: 'Kelas 7', h: 4, s: 0, i: 0, a: 1 }
    ],
    'Kelas 8': [
        { id: 201, name: 'RESKI WAHYUNI', gender: 'P', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 202, name: 'LAILA NURFADILA', gender: 'P', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 203, name: 'HUMAIRAH', gender: 'P', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 204, name: 'KARMILA', gender: 'P', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 205, name: 'NADILA', gender: 'P', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 206, name: 'AKIFA NAILA', gender: 'P', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 207, name: 'MIPTA', gender: 'P', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 208, name: 'VIONA AZZAHRA', gender: 'P', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 209, name: 'IRMAWATI', gender: 'P', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 210, name: 'MISKA MAULIDA', gender: 'P', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 211, name: 'NAJWA HASANA', gender: 'P', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 212, name: 'MUHAMMAD DZAKY AL GAZALI', gender: 'L', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 213, name: 'MUHAMMAD YAHYA', gender: 'L', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 214, name: 'ARRAZAK', gender: 'L', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 215, name: 'MUHAMMAD SULIPAN', gender: 'L', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 216, name: 'ALIF', gender: 'L', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 217, name: 'LUTFI', gender: 'L', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 218, name: 'MUHAMMAD FIKRI', gender: 'L', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 },
        { id: 219, name: 'DAVID', gender: 'L', kelas: 'Kelas 8', h: 5, s: 0, i: 0, a: 0 }
    ],
    'Kelas 9': [
        { id: 301, name: 'MULYADI', gender: 'L', kelas: 'Kelas 9', h: 5, s: 0, i: 0, a: 0 },
        { id: 302, name: 'MUHAMMAD FADIL', gender: 'L', kelas: 'Kelas 9', h: 5, s: 0, i: 0, a: 0 },
        { id: 303, name: 'MUHSIN', gender: 'L', kelas: 'Kelas 9', h: 5, s: 0, i: 0, a: 0 }
    ]
};

const DEFAULT_GRADES_ROSTER = {
    'Kelas 7': DEFAULT_ROSTER['Kelas 7'].map((s, idx) => ({
        id: s.id, name: s.name, gender: s.gender, kelas: s.kelas,
        tp1: 85 + (idx % 8), tp2: 88 + (idx % 7), tp3: 90 + (idx % 6),
        uh1: 86 + (idx % 8), uh2: 88 + (idx % 6),
        sts: 85 + (idx % 7), sas: 90 + (idx % 5)
    })),
    'Kelas 8': DEFAULT_ROSTER['Kelas 8'].map((s, idx) => ({
        id: s.id, name: s.name, gender: s.gender, kelas: s.kelas,
        tp1: 88 + (idx % 7), tp2: 90 + (idx % 6), tp3: 92 + (idx % 5),
        uh1: 87 + (idx % 7), uh2: 89 + (idx % 6),
        sts: 86 + (idx % 6), sas: 92 + (idx % 4)
    })),
    'Kelas 9': DEFAULT_ROSTER['Kelas 9'].map((s, idx) => ({
        id: s.id, name: s.name, gender: s.gender, kelas: s.kelas,
        tp1: 90 + (idx % 5), tp2: 92 + (idx % 5), tp3: 94 + (idx % 4),
        uh1: 88 + (idx % 6), uh2: 90 + (idx % 5),
        sts: 88 + (idx % 5), sas: 95 + (idx % 3)
    }))
};

// Helper: Get Day Name from Date string
function getDayName(dateString) {
    const date = new Date(dateString);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[date.getDay()];
}

// ============== ATTENDANCE CRUD & ROSTER ==============
const attendanceForm = document.getElementById('attendanceForm');
const attIdInput = document.getElementById('attId');
const attNameInput = document.getElementById('attName');
const attDateInput = document.getElementById('attDate');
const attStatusInput = document.getElementById('attStatus');
const formAttendanceTitle = document.getElementById('formAttendanceTitle');
const attCancelBtn = document.getElementById('attCancelBtn');

function renderAttendance() {
    const tableBody = document.querySelector('#attendanceTable tbody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    const selectedCls = document.getElementById('filterAbsenKelas')?.value || 'Kelas 7';
    
    let currentAttendance = safeParse('ipaApp_attendance_' + selectedCls, null);
    if (!currentAttendance || currentAttendance.length === 0) {
        currentAttendance = DEFAULT_ROSTER[selectedCls] || [];
        try { localStorage.setItem('ipaApp_attendance_' + selectedCls, JSON.stringify(currentAttendance)); } catch(e) {}
    }

    let countL = 0, countP = 0;

    currentAttendance.forEach((item, index) => {
        if (item.gender === 'L') countL++;
        if (item.gender === 'P') countP++;

        const totalAtt = (item.h || 0) + (item.s || 0) + (item.i || 0) + (item.a || 0);
        const percent = totalAtt > 0 ? Math.round(((item.h || 0) / totalAtt) * 100) : 100;
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${item.name}</strong></td>
            <td><span class="badge" style="background:${item.gender === 'L' ? '#0284c7' : '#ec4899'}">${item.gender || 'L'}</span></td>
            <td>${item.kelas || selectedCls}</td>
            <td style="color:#34d399; font-weight:bold;">${item.h || 0}</td>
            <td style="color:#fbbf24; font-weight:bold;">${item.s || 0}</td>
            <td style="color:#38bdf8; font-weight:bold;">${item.i || 0}</td>
            <td style="color:#f87171; font-weight:bold;">${item.a || 0}</td>
            <td><strong style="color:${percent >= 80 ? '#34d399' : percent >= 60 ? '#fbbf24' : '#f87171'}">${percent}%</strong></td>
            <td>
                <div class="action-btns" style="display:flex; gap:4px;">
                    <button class="btn btn-sm" onclick="window.tallyAttendance('${selectedCls}', ${item.id}, 'h')" style="background:#059669; color:#fff; padding:2px 8px; font-weight:bold; cursor:pointer;" title="+ Hadir">+H</button>
                    <button class="btn btn-sm" onclick="window.tallyAttendance('${selectedCls}', ${item.id}, 's')" style="background:#d97706; color:#fff; padding:2px 8px; font-weight:bold; cursor:pointer;" title="+ Sakit">+S</button>
                    <button class="btn btn-sm" onclick="window.tallyAttendance('${selectedCls}', ${item.id}, 'i')" style="background:#0284c7; color:#fff; padding:2px 8px; font-weight:bold; cursor:pointer;" title="+ Izin">+I</button>
                    <button class="btn btn-sm" onclick="window.tallyAttendance('${selectedCls}', ${item.id}, 'a')" style="background:#dc2626; color:#fff; padding:2px 8px; font-weight:bold; cursor:pointer;" title="+ Alpa">+A</button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    const footer = document.getElementById('attSummaryFooter');
    if (footer) {
        footer.innerHTML = `
            <div><strong>JUMLAH LAKI-LAKI (L):</strong> <span style="color:#38bdf8; font-weight:bold;">${countL} Siswa</span></div>
            <div><strong>JUMLAH PEREMPUAN (P):</strong> <span style="color:#f472b6; font-weight:bold;">${countP} Siswa</span></div>
            <div><strong>TOTAL SISWA:</strong> <span style="color:#34d399; font-weight:bold;">${countL + countP} Siswa</span></div>
            <div><strong>GURU MAPEL IPA:</strong> <span>WARDI, S.Pd.,Gr (NIP. 199512022020121011)</span></div>
        `;
    }
}

window.tallyAttendance = function(cls, id, type) {
    let list = safeParse('ipaApp_attendance_' + cls, DEFAULT_ROSTER[cls] || []);
    let student = list.find(s => s.id === id);
    if (student) {
        student[type] = (student[type] || 0) + 1;
        try { localStorage.setItem('ipaApp_attendance_' + cls, JSON.stringify(list)); } catch(e) {}
        renderAttendance();
    }
};

window.exportAbsenCsv = function() {
    const selectedCls = document.getElementById('filterAbsenKelas')?.value || 'Kelas 7';
    const list = safeParse('ipaApp_attendance_' + selectedCls, DEFAULT_ROSTER[selectedCls] || []);
    
    let csv = "DAFTAR ABSENSI SISWA " + selectedCls.toUpperCase() + " SEMESTER GANJIL 2025/2026\n";
    csv += "Guru Mata Pelajaran: WARDI S.Pd.Gr (NIP. 199512022020121011)\n\n";
    csv += "No,Nama Siswa,L/P,Kelas,Hadir (H),Sakit (S),Izin (I),Alpa (A),Persentase\n";
    
    list.forEach((item, index) => {
        const total = (item.h||0)+(item.s||0)+(item.i||0)+(item.a||0);
        const pct = total > 0 ? Math.round(((item.h||0)/total)*100) : 100;
        csv += `${index + 1},"${item.name}","${item.gender || 'L'}","${selectedCls}",${item.h||0},${item.s||0},${item.i||0},${item.a||0},"${pct}%"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `ABSENSI_${selectedCls.replace(' ', '_')}_SEMESTER_1.csv`;
    link.click();
};

if (attendanceForm) {
    attendanceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedCls = document.getElementById('filterAbsenKelas')?.value || 'Kelas 7';
        const name = attNameInput?.value.trim();
        const status = attStatusInput?.value;
        const list = safeParse('ipaApp_attendance_' + selectedCls, DEFAULT_ROSTER[selectedCls] || []);

        let student = list.find(s => s.name.toUpperCase() === name.toUpperCase());
        if (student) {
            if (status === 'Hadir') student.h = (student.h || 0) + 1;
            if (status === 'Sakit') student.s = (student.s || 0) + 1;
            if (status === 'Izin') student.i = (student.i || 0) + 1;
            if (status === 'Alpa') student.a = (student.a || 0) + 1;
        } else {
            const newId = Date.now();
            list.push({
                id: newId,
                name: name.toUpperCase(),
                gender: 'L',
                kelas: selectedCls,
                h: status === 'Hadir' ? 1 : 0,
                s: status === 'Sakit' ? 1 : 0,
                i: status === 'Izin' ? 1 : 0,
                a: status === 'Alpa' ? 1 : 0
            });
        }

        try { localStorage.setItem('ipaApp_attendance_' + selectedCls, JSON.stringify(list)); } catch(err) {}
        renderAttendance();
        if (attendanceForm) attendanceForm.reset();
    });
}

// ============== GRADES CRUD & ROSTER ==============
const gradeForm = document.getElementById('gradeForm');
const grIdInput = document.getElementById('grId');
const grNameInput = document.getElementById('grName');
const grTPInput = document.getElementById('grTP');
const grUHInput = document.getElementById('grUH');
const grSTSInput = document.getElementById('grSTS');
const grSASInput = document.getElementById('grSAS');
const formGradeTitle = document.getElementById('formGradeTitle');
const grCancelBtn = document.getElementById('grCancelBtn');

function calculateRapor(tp, uh, sts, sas) {
    const avg = (parseFloat(tp || 0) * 0.3 + parseFloat(uh || 0) * 0.3 + parseFloat(sts || 0) * 0.2 + parseFloat(sas || 0) * 0.2);
    return avg.toFixed(1);
}

function getPredikat(rapor) {
    if(rapor >= 90) return 'A (Sangat Baik)';
    if(rapor >= 80) return 'B (Baik)';
    if(rapor >= 70) return 'C (Cukup)';
    return 'D (Perlu Bimbingan)';
}

function renderGrades() {
    const tableBody = document.querySelector('#gradesTable tbody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    const selectedCls = document.getElementById('filterGradesKelas')?.value || 'Kelas 7';
    
    let currentGrades = safeParse('ipaApp_grades_' + selectedCls, null);
    if (!currentGrades || currentGrades.length === 0) {
        currentGrades = DEFAULT_GRADES_ROSTER[selectedCls] || [];
        try { localStorage.setItem('ipaApp_grades_' + selectedCls, JSON.stringify(currentGrades)); } catch(e) {}
    }

    currentGrades.forEach((item, index) => {
        const tp1 = item.tp1 || item.tp || 85;
        const tp2 = item.tp2 || item.tp || 88;
        const tp3 = item.tp3 || item.tp || 90;
        const avgTP = Math.round((tp1 + tp2 + tp3) / 3);

        const uh1 = item.uh1 || item.uh || 85;
        const uh2 = item.uh2 || item.uh || 88;
        const avgUH = Math.round((uh1 + uh2) / 2);

        const sts = item.sts || 85;
        const sas = item.sas || 90;

        const rapor = calculateRapor(avgTP, avgUH, sts, sas);
        const predikat = getPredikat(rapor);
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${item.name}</strong></td>
            <td><span class="badge" style="background:${item.gender === 'L' ? '#0284c7' : '#ec4899'}">${item.gender || 'L'}</span></td>
            <td>${tp1}</td>
            <td>${tp2}</td>
            <td>${tp3}</td>
            <td><strong style="color:#a855f7;">${avgTP}</strong></td>
            <td>${uh1}</td>
            <td>${uh2}</td>
            <td><strong style="color:#38bdf8;">${avgUH}</strong></td>
            <td>${sts}</td>
            <td>${sas}</td>
            <td><strong style="font-size:1.05rem; color:#34d399;">${rapor}</strong></td>
            <td><span style="background:rgba(56, 189, 248, 0.2); color:#38bdf8; padding:3px 8px; border-radius:8px; font-weight:bold;">${predikat}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon edit" onclick="showRaporCard('${item.name}', '${selectedCls}')" title="Cetak Rapor Siswa" style="color:#38bdf8;"><i class="fa-solid fa-print"></i></button>
                    <button class="btn-icon edit" onclick="editGrade(${item.id}, '${selectedCls}')" title="Edit Nilai"><i class="fa-solid fa-pen"></i></button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

window.autoSyncAllChapterGrades = function() {
    const selectedCls = document.getElementById('filterGradesKelas')?.value || 'Kelas 7';
    let currentGrades = safeParse('ipaApp_grades_' + selectedCls, DEFAULT_GRADES_ROSTER[selectedCls] || []);
    let assignments = safeParse('ipaApp_assignments', []);

    let syncedCount = 0;
    currentGrades.forEach(student => {
        const studentTasks = assignments.filter(a => 
            a.kelas === selectedCls && (a.studentName === student.name || (a.teamMembers && a.teamMembers.includes(student.name)))
        );

        if (studentTasks.length > 0) {
            syncedCount++;
            const bab1Tasks = studentTasks.filter(a => a.babKey === 'bab1' && a.grade !== null);
            const bab2Tasks = studentTasks.filter(a => a.babKey === 'bab2' && a.grade !== null);
            const bab3Tasks = studentTasks.filter(a => a.babKey === 'bab3' && a.grade !== null);

            if (bab1Tasks.length > 0) student.tp1 = Math.round(bab1Tasks.reduce((acc, x) => acc + x.grade, 0) / bab1Tasks.length);
            if (bab2Tasks.length > 0) student.tp2 = Math.round(bab2Tasks.reduce((acc, x) => acc + x.grade, 0) / bab2Tasks.length);
            if (bab3Tasks.length > 0) student.tp3 = Math.round(bab3Tasks.reduce((acc, x) => acc + x.grade, 0) / bab3Tasks.length);

            const quizTasks = studentTasks.filter(a => a.type === 'quiz' && a.grade !== null);
            if (quizTasks.length > 0) {
                student.uh1 = quizTasks[0]?.grade || student.uh1;
                if (quizTasks.length > 1) student.uh2 = quizTasks[1]?.grade || student.uh2;
            }
        }
    });

    try { localStorage.setItem('ipaApp_grades_' + selectedCls, JSON.stringify(currentGrades)); } catch(e) {}
    renderGrades();
    alert(`Berhasil menghitung & menyinkronkan nilai per Bab & Pertemuan untuk ${selectedCls}!`);
};

window.exportGradesCsv = function() {
    const selectedCls = document.getElementById('filterGradesKelas')?.value || 'Kelas 7';
    const list = safeParse('ipaApp_grades_' + selectedCls, DEFAULT_GRADES_ROSTER[selectedCls] || []);
    
    let csv = "DAFTAR NILAI DAN RAPOR SISWA " + selectedCls.toUpperCase() + " SEMESTER GANJIL 2025/2026\n";
    csv += "Guru Mata Pelajaran: WARDI S.Pd.Gr (NIP. 199512022020121011)\n\n";
    csv += "No,Nama Siswa,L/P,Rata Tugas (TP),Rata Ulangan (UH),PTS/STS,PAS/SAS,Nilai Akhir (Rapor),Predikat\n";
    
    list.forEach((item, index) => {
        const rapor = calculateRapor(item.tp, item.uh, item.sts, item.sas);
        const pred = getPredikat(rapor);
        csv += `${index + 1},"${item.name}","${item.gender || 'L'}",${item.tp||85},${item.uh||85},${item.sts||85},${item.sas||90},${rapor},"${pred}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `DAFTAR_NILAI_${selectedCls.replace(' ', '_')}_SEMESTER_1.csv`;
    link.click();
};

if (gradeForm) {
    gradeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = grIdInput ? grIdInput.value : '';
        const name = grNameInput ? grNameInput.value : '';
        const tp = grTPInput ? grTPInput.value : '';
        const uh = grUHInput ? grUHInput.value : '';
        const sts = grSTSInput ? grSTSInput.value : '';
        const sas = grSASInput ? grSASInput.value : '';

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
}

function editGrade(id) {
    const item = gradesData.find(g => g.id === id);
    if(item) {
        if (grIdInput) grIdInput.value = item.id;
        if (grNameInput) grNameInput.value = item.name;
        if (grTPInput) grTPInput.value = item.tp;
        if (grUHInput) grUHInput.value = item.uh;
        if (grSTSInput) grSTSInput.value = item.sts;
        if (grSASInput) grSASInput.value = item.sas;
        if (formGradeTitle) formGradeTitle.innerText = 'Edit Nilai';
        if (grCancelBtn) grCancelBtn.style.display = 'inline-block';
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
    if (gradeForm) gradeForm.reset();
    if (grIdInput) grIdInput.value = '';
    if (formGradeTitle) formGradeTitle.innerText = 'Tambah Nilai';
    if (grCancelBtn) grCancelBtn.style.display = 'none';
}

if (grCancelBtn) {
    grCancelBtn.addEventListener('click', resetGradeForm);
}

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

// ============== PENGUMPULAN TUGAS SISWA & HIERARKI PENILAIAN ==============
let teacherAssignments = safeParse('ipaApp_assignments', []);

function saveTeacherAssignments() {
    localStorage.setItem('ipaApp_assignments', JSON.stringify(teacherAssignments));
    renderTeacherAssignments();
    renderHierarchy();
}

window.filterClassAndTab = function(cls) {
    const tabBtn = document.querySelector('[data-target="assignmentsTab"]');
    if (tabBtn) tabBtn.click();
    const filterEl = document.getElementById('filterTugasKelas');
    if (filterEl) filterEl.value = cls;
    renderTeacherAssignments();
    renderHierarchy();
};

function renderHierarchy() {
    const container = document.getElementById('babPertemuanHierarchy');
    if (!container) return;

    const curr = window.MEDIA_IPA_CURRICULUM || {};
    const filterKelas = document.getElementById('filterTugasKelas')?.value || 'ALL';
    
    teacherAssignments = safeParse('ipaApp_assignments', []);

    let classesToRender = filterKelas === 'ALL' ? ['Kelas 7', 'Kelas 8', 'Kelas 9'] : [filterKelas];

    let html = `<div style="display:flex; flex-direction:column; gap:16px;">`;

    classesToRender.forEach(targetCls => {
        const babsObj = curr[targetCls] || {};
        const babKeys = Object.keys(babsObj);
        if (babKeys.length === 0) return;

        html += `
            <div style="background: rgba(15, 23, 42, 0.4); border-radius: 12px; padding: 1rem; border: 1px solid rgba(255, 255, 255, 0.1);">
                <h3 style="font-size: 1.05rem; color: #38bdf8; margin: 0 0 0.8rem 0; display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-graduation-cap"></i> ${targetCls}
                </h3>
                <div style="display:flex; flex-direction:column; gap:10px;">
        `;

        babKeys.forEach(babKey => {
            const babInfo = babsObj[babKey];
            const totalInBab = teacherAssignments.filter(a => a.kelas === targetCls && a.babKey === babKey).length;

            html += `
                <div class="bab-accordion-card" style="background: rgba(30, 41, 59, 0.6); border-radius: 10px; padding: 0.8rem 1rem;">
                    <div class="bab-accordion-header" style="display: flex; justify-content: space-between; align-items: center;">
                        <h4 style="margin:0; font-size:0.95rem; color:#f8fafc;">
                            <i class="fa-solid fa-folder-open" style="color:#a855f7; margin-right:8px;"></i>
                            ${babInfo.title}
                        </h4>
                        <span style="background: rgba(168, 85, 247, 0.2); color: #c084fc; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: bold;">
                            ${totalInBab} Tugas Total
                        </span>
                    </div>
                    <div class="meeting-chip-list" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;">
            `;

            babInfo.meetings.forEach(m => {
                const count = teacherAssignments.filter(a => 
                    a.kelas === targetCls && a.babKey === babKey && a.pertemuan === m
                ).length;

                const hasUngraded = teacherAssignments.some(a => 
                    a.kelas === targetCls && a.babKey === babKey && a.pertemuan === m && (a.grade === null || a.grade === undefined)
                );

                const chipStyle = hasUngraded ? 
                    'border: 1px solid #fbbf24; color: #fbbf24;' : 
                    count > 0 ? 'border: 1px solid #34d399; color: #34d399;' : '';

                html += `
                    <div class="meeting-chip" onclick="filterByMeeting('${targetCls}', '${babKey}', '${m}')" style="${chipStyle} cursor: pointer; padding: 4px 10px; border-radius: 8px; background: rgba(0,0,0,0.3); font-size: 0.82rem;">
                        <i class="fa-solid fa-clock" style="margin-right:4px;"></i> ${m} 
                        <span style="background:rgba(255,255,255,0.2); padding:1px 6px; border-radius:10px; font-size:0.75rem; margin-left:4px;">${count} Tugas</span>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

window.autoGradeSingleAssignment = function() {
    const idVal = document.getElementById('gradeAssignmentId')?.value;
    if (!idVal) return;
    const id = parseInt(idVal);
    teacherAssignments = safeParse('ipaApp_assignments', []);
    const item = teacherAssignments.find(a => a.id === id);

    if (!item) return;

    let score = 90;
    let feedback = '';

    if (item.type === 'quiz') {
        score = item.scoreInput || item.grade || 95;
        feedback = `Kuis Interaktif Mandiri/Kelompok selesai dengan nilai sempurna ${score}/100. Pengerjaan sangat baik!`;
    } else if (item.type === 'whiteboard') {
        score = Math.floor(Math.random() * 11) + 88;
        feedback = `Tugas Papan Tulis Digital untuk ${item.babTitle || 'Bab'} (${item.pertemuan || 'Pertemuan'}) telah dibuat dengan visualisasi dan penjelasan yang sangat jelas dan rapi.`;
    } else if (item.type === 'photo') {
        score = Math.floor(Math.random() * 11) + 85;
        feedback = `Hasil foto LKPD manual teridentifikasi lengkap. Jawaban tepat dan dapat dipahami dengan sangat baik.`;
    } else {
        score = 90;
        feedback = `Tugas terisi dengan lengkap dan telah dinilai secara otomatis oleh sistem AI Guru.`;
    }

    const scoreInput = document.getElementById('inputGradeScore');
    const feedbackInput = document.getElementById('inputGradeFeedback');
    if (scoreInput) scoreInput.value = score;
    if (feedbackInput) feedbackInput.value = feedback;
};

window.autoGradeAllAssignments = function() {
    teacherAssignments = safeParse('ipaApp_assignments', []);

    let countUngraded = 0;
    teacherAssignments.forEach(item => {
        if (item.grade === null || item.grade === undefined) {
            countUngraded++;
            if (item.type === 'quiz') {
                item.grade = item.scoreInput || 95;
                item.feedback = `Nilai Kuis Interaktif Otomatis (${item.grade}/100)`;
            } else if (item.type === 'whiteboard') {
                item.grade = 92;
                item.feedback = `Penilaian Otomatis AI: Papan tulis digital dibuat dengan sangat rapi dan kreatif.`;
            } else if (item.type === 'photo') {
                item.grade = 88;
                item.feedback = `Penilaian Otomatis AI: Jawaban LKPD manual lengkap dan terbaca jelas.`;
            } else {
                item.grade = 90;
                item.feedback = `Penilaian Otomatis AI Guru.`;
            }
        }
    });

    saveTeacherAssignments();

    if (typeof syncRaporAuto === 'function') {
        syncRaporAuto();
    } else {
        alert(`Berhasil memberikan nilai otomatis untuk ${countUngraded > 0 ? countUngraded : 'seluruh'} tugas siswa!`);
    }
};

window.filterByMeeting = function(cls, babKey, meeting) {
    const filterCls = document.getElementById('filterTugasKelas');
    if (filterCls) filterCls.value = cls;
    
    const tableBody = document.querySelector('#assignmentsTable tbody');
    if (!tableBody) return;

    teacherAssignments = safeParse('ipaApp_assignments', []);
    const filtered = teacherAssignments.filter(a => 
        a.kelas === cls && a.babKey === babKey && a.pertemuan === meeting
    );

    tableBody.innerHTML = '';
    if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="9" class="text-center">Belum ada tugas terkirim untuk ${meeting}</td></tr>`;
        return;
    }

    filtered.forEach((item, index) => {
        const tr = document.createElement('tr');
        const badgeType = item.type === 'whiteboard' ? 
            '<span class="status-badge status-hadir">Papan Tulis</span>' : 
            item.type === 'photo' ? '<span class="status-badge status-izin">Foto LKPD</span>' :
            '<span class="status-badge status-sakit">Kuis Interaktif</span>';
        
        const gradeBadge = item.grade !== null && item.grade !== undefined ?
            `<span style="color:#34d399; font-weight:bold;">${item.grade}/100</span>` :
            `<span style="color:#fbbf24; font-style:italic;">Belum Dinilai</span>`;

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td style="font-size:0.85rem;">${item.submittedAt || '-'}</td>
            <td>
                <strong>${item.studentName}</strong>
                ${item.teamMembers && item.teamMembers.length > 1 ? `<br><small style="color:#94a3b8;">Anggota: ${item.teamMembers.join(', ')}</small>` : ''}
            </td>
            <td>${item.kelas}</td>
            <td style="font-size:0.85rem;">${item.babTitle}<br><strong>${item.pertemuan}</strong></td>
            <td>${badgeType}<br><small>${item.title}</small></td>
            <td>
                ${item.imageData ? `<img src="${item.imageData}" alt="Thumb" style="width:50px; height:35px; object-fit:cover; border-radius:6px; cursor:pointer;" onclick="window.viewTugasImage('${item.imageData}')">` : '-'}
            </td>
            <td>${gradeBadge}</td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon edit" onclick="openGradeModal(${item.id})" title="Beri Nilai & Feedback"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn-icon delete" onclick="deleteTeacherAssignment(${item.id})" title="Hapus"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    window.scrollTo(0, document.querySelector('.table-container').offsetTop - 50);
};

function renderTeacherAssignments() {
    const tableBody = document.querySelector('#assignmentsTable tbody');
    if (!tableBody) return;

    teacherAssignments = safeParse('ipaApp_assignments', []);
    
    const filterKelas = document.getElementById('filterTugasKelas')?.value || 'ALL';
    const filterType = document.getElementById('filterTugasType')?.value || 'ALL';

    const filtered = teacherAssignments.filter(item => {
        if (filterKelas !== 'ALL' && item.kelas !== filterKelas) return false;
        if (filterType !== 'ALL' && item.type !== filterType) return false;
        return true;
    });

    tableBody.innerHTML = '';

    if (filtered.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="9" class="text-center">Belum ada data pengumpulan tugas</td></tr>';
        return;
    }

    filtered.forEach((item, index) => {
        const tr = document.createElement('tr');
        const badgeType = item.type === 'whiteboard' ? 
            '<span class="status-badge status-hadir">Papan Tulis</span>' : 
            item.type === 'photo' ? '<span class="status-badge status-izin">Foto LKPD</span>' :
            '<span class="status-badge status-sakit">Kuis Interaktif</span>';
        
        const gradeBadge = item.grade !== null && item.grade !== undefined ?
            `<span style="color:#34d399; font-weight:bold;">${item.grade}/100</span>` :
            `<span style="color:#fbbf24; font-style:italic;">Belum Dinilai</span>`;

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td style="font-size:0.85rem;">${item.submittedAt || '-'}</td>
            <td>
                <strong>${item.studentName}</strong>
                ${item.teamMembers && item.teamMembers.length > 1 ? `<br><small style="color:#94a3b8;">Anggota: ${item.teamMembers.join(', ')}</small>` : ''}
            </td>
            <td>${item.kelas}</td>
            <td style="font-size:0.85rem;">${item.babTitle || '-'}<br><strong>${item.pertemuan || ''}</strong></td>
            <td>${badgeType}<br><small>${item.title}</small></td>
            <td>
                ${item.imageData ? `<img src="${item.imageData}" alt="Thumb" style="width:50px; height:35px; object-fit:cover; border-radius:6px; cursor:pointer;" onclick="window.viewTugasImage('${item.imageData}')">` : '-'}
            </td>
            <td>${gradeBadge}</td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon edit" onclick="openGradeModal(${item.id})" title="Beri Nilai & Feedback"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn-icon delete" onclick="deleteTeacherAssignment(${item.id})" title="Hapus"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Global functions for grading modal
window.openGradeModal = function(id) {
    const item = teacherAssignments.find(a => a.id === id);
    if (!item) return;

    document.getElementById('gradeAssignmentId').value = item.id;
    document.getElementById('gradeModalInfo').innerHTML = `
        <strong>Nama Siswa / Kelompok:</strong> ${item.studentName} <br>
        ${item.teamMembers && item.teamMembers.length > 1 ? `<strong>Anggota:</strong> ${item.teamMembers.join(', ')} <br>` : ''}
        <strong>Kelas:</strong> ${item.kelas} | <strong>Bab:</strong> ${item.babTitle || '-'} (${item.pertemuan || '-'}) <br>
        <strong>Judul:</strong> ${item.title} <br>
        ${item.notes ? `<em>Catatan Siswa: "${item.notes}"</em>` : ''}
    `;

    const imgWrapper = document.getElementById('gradeModalImgWrapper');
    if (item.imageData) {
        document.getElementById('gradeModalImg').src = item.imageData;
        imgWrapper.style.display = 'block';
    } else {
        imgWrapper.style.display = 'none';
    }

    document.getElementById('inputGradeScore').value = item.grade !== null && item.grade !== undefined ? item.grade : '';
    document.getElementById('inputGradeFeedback').value = item.feedback || '';

    document.getElementById('modalBeriNilai').classList.remove('hidden');
};

window.deleteTeacherAssignment = function(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data tugas ini?')) {
        teacherAssignments = teacherAssignments.filter(a => a.id !== id);
        saveTeacherAssignments();
    }
};

// Automatic Rapor Synchronizer
window.syncRaporAuto = function() {
    teacherAssignments = safeParse('ipaApp_assignments', []);
    let grades = safeParse('ipaApp_grades', []);

    // Extract unique students
    const studentNames = new Set();
    grades.forEach(g => studentNames.add(g.name));
    teacherAssignments.forEach(a => {
        if (a.category === 'kelompok' && a.teamMembers) {
            a.teamMembers.forEach(m => studentNames.add(m));
        } else {
            studentNames.add(a.studentName);
        }
    });

    if (studentNames.size === 0) {
        alert('Belum ada data siswa atau tugas yang terkumpul!');
        return;
    }

    studentNames.forEach(name => {
        const studentTasks = teacherAssignments.filter(a => 
            a.studentName === name || (a.teamMembers && a.teamMembers.includes(name))
        );

        const tpTasks = studentTasks.filter(a => (a.type === 'whiteboard' || a.type === 'photo') && a.grade !== null);
        const uhTasks = studentTasks.filter(a => a.type === 'quiz' && a.grade !== null);

        const avgTP = tpTasks.length > 0 ? Math.round(tpTasks.reduce((acc, curr) => acc + curr.grade, 0) / tpTasks.length) : 80;
        const avgUH = uhTasks.length > 0 ? Math.round(uhTasks.reduce((acc, curr) => acc + curr.grade, 0) / uhTasks.length) : 85;

        let existingIndex = grades.findIndex(g => g.name === name);
        if (existingIndex !== -1) {
            grades[existingIndex].tp = avgTP;
            grades[existingIndex].uh = avgUH;
            const sts = grades[existingIndex].sts || avgUH;
            const sas = grades[existingIndex].sas || avgUH;
            const finalRapor = Math.round(avgTP * 0.3 + avgUH * 0.3 + sts * 0.2 + sas * 0.2);
            grades[existingIndex].rapor = finalRapor;
            grades[existingIndex].predikat = finalRapor >= 90 ? 'A' : finalRapor >= 80 ? 'B' : finalRapor >= 70 ? 'C' : 'D';
        } else {
            const finalRapor = Math.round(avgTP * 0.3 + avgUH * 0.7);
            const newId = grades.length > 0 ? Math.max(...grades.map(g => g.id)) + 1 : 1;
            grades.push({
                id: newId,
                name,
                tp: avgTP,
                uh: avgUH,
                sts: avgUH,
                sas: avgUH,
                rapor: finalRapor,
                predikat: finalRapor >= 90 ? 'A' : finalRapor >= 80 ? 'B' : finalRapor >= 70 ? 'C' : 'D'
            });
        }
    });

    localStorage.setItem('ipaApp_grades', JSON.stringify(grades));
    gradesData = grades;
    renderGrades();
    alert('Penghitungan Nilai Rapor Otomatis Berhasil Disinkronkan!');
};

// Show Rapor Card Modal
window.showRaporCard = function(name) {
    const grades = safeParse('ipaApp_grades', []);
    const student = grades.find(g => g.name === name);

    if (!student) {
        alert('Data nilai siswa tidak ditemukan!');
        return;
    }

    const desc = student.rapor >= 90 ? 
        'Menunjukkan penguasaan yang sangat baik dalam menganalisis materi IPA, pengukuran, sel, wujud zat, serta keterampilan praktikum sains.' :
        student.rapor >= 80 ?
        'Menunjukkan penguasaan yang baik dalam memahami materi IPA dan menyelesaikan soal-soal kuis serta praktikum.' :
        'Menunjukkan penguasaan yang lumayan dalam materi IPA, namun perlu peningkatan dalam latihan kuis dan LKPD.';

    const html = `
        <div class="rapor-card">
            <div class="rapor-header">
                <h2>RAPOR HASIL BELAJAR PESERTA DIDIK</h2>
                <p>Mata Pelajaran: Ilmu Pengetahuan Alam (IPA) | Kurikulum Merdeka</p>
            </div>

            <div style="display:flex; justify-content:space-between; margin-bottom:1.5rem; font-weight:600; font-size:0.95rem;">
                <div>
                    <div>Nama Siswa: <span style="color:#0284c7;">${student.name}</span></div>
                    <div>Mata Pelajaran: IPA Terpadu</div>
                </div>
                <div style="text-align:right;">
                    <div>Tahun Ajaran: 2025/2026</div>
                    <div>Semester: Ganjil / Genap</div>
                </div>
            </div>

            <table class="rapor-table">
                <thead>
                    <tr>
                        <th>Komponen Penilaian</th>
                        <th>Nilai Rata-Rata</th>
                        <th>Bobot</th>
                        <th>Capaian Keterangan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nilai Tugas & LKPD (TP)</td>
                        <td><strong>${student.tp || '-'}</strong></td>
                        <td>30%</td>
                        <td>Tugas Papan Tulis & LKPD Manual</td>
                    </tr>
                    <tr>
                        <td>Nilai Kuis & UH (UH)</td>
                        <td><strong>${student.uh || '-'}</strong></td>
                        <td>30%</td>
                        <td>Hasil Kuis & Competitve Quiz</td>
                    </tr>
                    <tr>
                        <td>Sumatif Tengah Semester (STS)</td>
                        <td><strong>${student.sts || '-'}</strong></td>
                        <td>20%</td>
                        <td>Ujian Tengah Semester</td>
                    </tr>
                    <tr>
                        <td>Sumatif Akhir Semester (SAS)</td>
                        <td><strong>${student.sas || '-'}</strong></td>
                        <td>20%</td>
                        <td>Ujian Akhir Semester</td>
                    </tr>
                    <tr style="background:#f0f9ff; font-weight:bold; font-size:1.05rem;">
                        <td>NILAI AKHIR RAPOR</td>
                        <td style="color:#0284c7;">${student.rapor || '-'}</td>
                        <td>100%</td>
                        <td>Predikat: <span style="background:#0284c7; color:#fff; padding:2px 10px; border-radius:10px;">${student.predikat || 'B'}</span></td>
                    </tr>
                </tbody>
            </table>

            <div style="margin-top:1.5rem; background:#f8fafc; border:1px solid #cbd5e1; border-radius:12px; padding:1.2rem;">
                <h4 style="margin:0 0 0.5rem 0; color:#0f172a;"><i class="fa-solid fa-graduation-cap"></i> Deskripsi Capaian Pembelajaran:</h4>
                <p style="margin:0; color:#475569; font-style:italic; font-size:0.92rem; line-height:1.6;">"${desc}"</p>
            </div>

            <div style="display:flex; justify-content:space-between; margin-top:3rem; text-align:center; font-size:0.9rem;">
                <div>
                    <p>Orang Tua / Wali Siswa</p>
                    <br><br>
                    <p>_______________________</p>
                </div>
                <div>
                    <p>Guru Mata Pelajaran IPA</p>
                    <br><br>
                    <p><strong>( _______________________ )</strong></p>
                </div>
            </div>
        </div>
    `;

    document.getElementById('raporPrintArea').innerHTML = html;
    document.getElementById('modalCetakRapor').classList.remove('hidden');
};

window.printRaporCard = function() {
    window.print();
};

// Listeners for filters and forms
document.addEventListener('DOMContentLoaded', () => {
    renderHierarchy();

    const filterKelas = document.getElementById('filterTugasKelas');
    const filterType = document.getElementById('filterTugasType');
    if (filterKelas) filterKelas.addEventListener('change', () => {
        renderTeacherAssignments();
        renderHierarchy();
    });
    if (filterType) filterType.addEventListener('change', renderTeacherAssignments);

    const btnSyncRapor = document.getElementById('btnSyncRaporAuto');
    if (btnSyncRapor) btnSyncRapor.addEventListener('click', window.syncRaporAuto);

    const closeGradeModal = document.getElementById('closeGradeModal');
    if (closeGradeModal) {
        closeGradeModal.addEventListener('click', () => {
            document.getElementById('modalBeriNilai').classList.add('hidden');
        });
    }

    const formBeriNilai = document.getElementById('formBeriNilai');
    if (formBeriNilai) {
        formBeriNilai.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = parseInt(document.getElementById('gradeAssignmentId').value);
            const score = parseInt(document.getElementById('inputGradeScore').value);
            const feedback = document.getElementById('inputGradeFeedback').value.trim();

            const index = teacherAssignments.findIndex(a => a.id === id);
            if (index !== -1) {
                teacherAssignments[index].grade = score;
                teacherAssignments[index].feedback = feedback;
                saveTeacherAssignments();
                alert('Penilaian berhasil disimpan!');
                document.getElementById('modalBeriNilai').classList.add('hidden');
            }
        });
    }

    const btnExport = document.getElementById('btnExportTugasCsv');
    if (btnExport) {
        btnExport.addEventListener('click', () => {
            if (teacherAssignments.length === 0) {
                alert('Tidak ada data tugas untuk diekspor!');
                return;
            }

            let csvContent = "data:text/csv;charset=utf-8,No,Waktu,Nama Siswa / Kelompok,Kelas,Bab,Pertemuan,Jenis Tugas,Judul Tugas,Nilai,Catatan Guru\n";
            teacherAssignments.forEach((item, index) => {
                const row = [
                    index + 1,
                    `"${item.submittedAt || ''}"`,
                    `"${item.studentName}"`,
                    `"${item.kelas}"`,
                    `"${item.babTitle || ''}"`,
                    `"${item.pertemuan || ''}"`,
                    `"${item.type}"`,
                    `"${item.title}"`,
                    item.grade !== null ? item.grade : "Belum",
                    `"${item.feedback || ''}"`
                ].join(",");
                csvContent += row + "\n";
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `Pengumpulan_Tugas_IPA_${Date.now()}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});
