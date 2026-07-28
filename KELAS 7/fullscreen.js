document.addEventListener('DOMContentLoaded', () => {
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
});
