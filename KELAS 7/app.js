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

// Page action buttons
const startLearningBtn = document.getElementById('startLearningBtn');
const loginGuruHeroBtn = document.getElementById('loginGuruHeroBtn');
const backToHomeBtn = document.getElementById('backToHomeBtn');



// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Other initializations can go here
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
