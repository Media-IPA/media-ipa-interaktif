// State Data
let attendanceData = JSON.parse(localStorage.getItem('ipaApp_attendance')) || [];
let gradesData = JSON.parse(localStorage.getItem('ipaApp_grades')) || [];
let isLoggedIn = false;

// DOM Elements
const pages = {
    home: document.getElementById('homePage'),
    student: document.getElementById('studentPage'),
    teacher: document.getElementById('teacherDashboard')
};

// Nav buttons
const navHomeBtn = document.getElementById('navHomeBtn');
const navLoginBtn = document.getElementById('navLoginBtn');
const navLogoutBtn = document.getElementById('navLogoutBtn');

// Page action buttons
const startLearningBtn = document.getElementById('startLearningBtn');
const loginGuruHeroBtn = document.getElementById('loginGuruHeroBtn');
const backToHomeBtn = document.getElementById('backToHomeBtn');

// Modal Elements
const loginModal = document.getElementById('loginModal');
const closeLogin = document.getElementById('closeLogin');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderAttendance();
    renderGrades();
});

// Routing / View Management
function showPage(pageName) {
    Object.values(pages).forEach(p => {
        if(p) p.classList.add('hidden');
    });
    if(pages[pageName]) {
        pages[pageName].classList.remove('hidden');
        pages[pageName].classList.add('active');
    }
    
    // Update nav active state
    navHomeBtn.classList.toggle('active', pageName === 'home');
}

// Navigation Events
navHomeBtn.addEventListener('click', () => showPage('home'));
startLearningBtn.addEventListener('click', () => showPage('student'));
backToHomeBtn.addEventListener('click', () => showPage('home'));

// Login Modal Events
const openLogin = () => {
    if(isLoggedIn) {
        showPage('teacher');
    } else {
        loginModal.classList.remove('hidden');
        loginError.classList.add('hidden');
    }
};

navLoginBtn.addEventListener('click', openLogin);
loginGuruHeroBtn.addEventListener('click', openLogin);

closeLogin.addEventListener('click', () => {
    loginModal.classList.add('hidden');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'guru' && pass === '123') {
        isLoggedIn = true;
        loginModal.classList.add('hidden');
        navLoginBtn.classList.add('hidden');
        navLogoutBtn.classList.remove('hidden');
        loginForm.reset();
        showPage('teacher');
    } else {
        loginError.classList.remove('hidden');
    }
});

navLogoutBtn.addEventListener('click', () => {
    isLoggedIn = false;
    navLoginBtn.classList.remove('hidden');
    navLogoutBtn.classList.add('hidden');
    showPage('home');
});

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
