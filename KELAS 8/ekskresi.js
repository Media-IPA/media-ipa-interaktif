/**
 * SISTEM EKSKRESI MANUSIA - BAB 2 PERTEMUAN 8
 * Media Pembelajaran IPA Interaktif Kelas VIII
 * 
 * Modul ini mencakup:
 * 1. Halaman Awal & Peta Konsep Interaktif (4 Cabang Organ)
 * 2. Apersepsi (Pertanyaan Pemantik & Animasi Perjalanan Zat Sisa)
 * 3. Materi 1: Pengertian Sistem Ekskresi & Drag-Drop Klasifikasi
 * 4. Materi 2: Hubungan 4 Organ Ekskresi (Overview Tubuh Manusia)
 * 5. Organ 1: Kulit (Struktur, Proses, Zat, Gangguan, Labeling, Simulasi Olahraga vs Istirahat, Cek Pemahaman)
 * 6. Organ 2: Paru-paru (Struktur, Proses, Zat, Gangguan, Animasi Difusi Gas, Percobaan Uap Air di Kaca, Cek Pemahaman)
 * 7. Organ 3: Hati (Struktur, Proses Perombakan Eritrosit & Urea, Zat, Gangguan, Diagram Alur, Matching, Cek Pemahaman)
 * 8. Organ 4: Ginjal Nefron (Struktur Makroskopis/Mikroskopis, Drag-Drop Nefron, Cek Pemahaman)
 * 9. Organ 4: Ginjal Urine (3 Tahap Pembentukan Urine, Gangguan, Animasi 3 Tahap, Lab Simulasi Banyak vs Sedikit Minum, Cek Pemahaman)
 * 10. Latihan Interaktif: Tantangan Matrix & Kasus Medis
 * 11. Evaluasi Akhir: 10 Soal Pilihan Ganda Komprehensif Berbobot dengan Pembahasan
 */

const EkskresiModule = {
    // Internal States for Interactive Widgets
    state: {
        apersepsi: { q1: null, q2: null },
        animStep: 1,
        animPlaying: false,
        animTimer: null,
        dragDropDefinisi: {
            assigned: {}, // { item_id: 'ekskresi' | 'bukan' }
            checked: false,
            score: 0
        },
        kulitSim: {
            activity: 'istirahat', // 'istirahat', 'sedang', 'berat'
            sweatRate: 15,
            bodyTemp: 36.8
        },
        kulitLabeling: {
            answers: {},
            checked: false
        },
        paruDifusi: {
            mode: 'tarik', // 'tarik' | 'buang'
            fogOpacity: 0
        },
        hatiAlur: {
            currentStep: 1
        },
        hatiMatching: {
            selectedLeft: null,
            matchedPairs: {},
            completed: false
        },
        nefronDrag: {
            slots: {},
            checked: false
        },
        urineStage: 1, // 1: Filtrasi, 2: Reabsorpsi, 3: Augmentasi
        urineHydration: 4, // 1 to 8 glasses
        quizzes: {
            kulit: {},
            paru: {},
            hati: {},
            ginjalStruktur: {},
            ginjalProses: {}
        },
        evaluasi: {
            answers: {},
            submitted: false,
            score: 0
        }
    },

    // Global navigation helper to jump directly to any slide of Pertemuan 8
    navTo(slideIdx) {
        if (!window.App) return;
        const slides = window.App.getCurrentSlides();
        if (!slides || slides.length === 0) return;

        if (typeof slideIdx === 'string') {
            const idx = slides.findIndex(s => s.visualType === slideIdx);
            if (idx !== -1) return window.App.goToSlide(idx);
        }

        const typeMap = [
            'ekskresi-home',
            'ekskresi-apersepsi',
            'ekskresi-definisi',
            'ekskresi-tubuh-overview',
            'ekskresi-kulit',
            'ekskresi-paru',
            'ekskresi-hati',
            'ekskresi-ginjal-struktur',
            'ekskresi-ginjal-proses',
            'ekskresi-latihan',
            'ekskresi-lkpd',
            'ekskresi-evaluasi'
        ];

        if (typeof slideIdx === 'number' && slideIdx >= 0 && slideIdx < typeMap.length) {
            const vType = typeMap[slideIdx];
            const foundIdx = slides.findIndex(s => s.visualType === vType);
            if (foundIdx !== -1) return window.App.goToSlide(foundIdx);
        }

        if (typeof slideIdx === 'number') {
            window.App.goToSlide(slideIdx);
        }
    },

    // Shared Top Navigation Bar across Ekskresi slides
    renderNavBar(activeSlideIdx) {
        const menuItems = [
            { idx: 0, type: 'ekskresi-home', label: 'Beranda', icon: 'home' },
            { idx: 0, type: 'ekskresi-home', label: 'Tujuan', icon: 'target', anchor: 'sec-tujuan' },
            { idx: 0, type: 'ekskresi-home', label: 'Peta Materi', icon: 'network', anchor: 'sec-peta' },
            { idx: 1, type: 'ekskresi-apersepsi', label: 'Apersepsi', icon: 'sparkles' },
            { idx: 2, type: 'ekskresi-definisi', label: 'Pengertian', icon: 'book-open' },
            { idx: 3, type: 'ekskresi-tubuh-overview', label: 'Tubuh & 4 Organ', icon: 'user' },
            { idx: 4, type: 'ekskresi-kulit', label: 'Kulit', icon: 'shield' },
            { idx: 5, type: 'ekskresi-paru', label: 'Paru-Paru', icon: 'wind' },
            { idx: 6, type: 'ekskresi-hati', label: 'Hati', icon: 'activity' },
            { idx: 7, type: 'ekskresi-ginjal-struktur', label: 'Nefron Ginjal', icon: 'git-commit' },
            { idx: 8, type: 'ekskresi-ginjal-proses', label: 'Pembentukan Urine', icon: 'droplet' },
            { idx: 9, type: 'ekskresi-latihan', label: 'Latihan', icon: 'puzzle' },
            { idx: 10, type: 'ekskresi-lkpd', label: 'LKPD Interaktif', icon: 'clipboard-list' },
            { idx: 11, type: 'ekskresi-evaluasi', label: 'Evaluasi', icon: 'check-circle' }
        ];

        return `
            <div class="ekskresi-topbar">
                <div class="ekskresi-topbar-brand">
                    <span class="ekskresi-badge-pill">PERTEMUAN 8</span>
                    <span class="ekskresi-brand-title">SISTEM EKSKRESI</span>
                </div>
                <div class="ekskresi-nav-scroll">
                    ${menuItems.map(m => {
                        const isActive = (m.type === activeSlideIdx || m.idx === activeSlideIdx) && !m.anchor;
                        return `
                            <button class="ekskresi-nav-btn ${isActive ? 'active' : ''}" onclick="EkskresiModule.handleMenuClick('${m.type}', '${m.anchor || ''}')">
                                <i data-lucide="${m.icon}"></i>
                                <span>${m.label}</span>
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    handleMenuClick(target, anchor) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        this.navTo(target);
        if (anchor) {
            setTimeout(() => {
                const el = document.getElementById(anchor);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        }
    },

    // Main Dispatcher
    render(type, container, slide, appInstance) {
        let html = '';
        switch (type) {
            case 'ekskresi-home':
                html = this.renderSlideHome();
                break;
            case 'ekskresi-apersepsi':
                html = this.renderSlideApersepsi();
                break;
            case 'ekskresi-definisi':
                html = this.renderSlideDefinisi();
                break;
            case 'ekskresi-tubuh-overview':
                html = this.renderSlideTubuhOverview();
                break;
            case 'ekskresi-kulit':
                html = this.renderSlideKulit();
                break;
            case 'ekskresi-paru':
                html = this.renderSlideParu();
                break;
            case 'ekskresi-hati':
                html = this.renderSlideHati();
                break;
            case 'ekskresi-ginjal-struktur':
                html = this.renderSlideGinjalStruktur();
                break;
            case 'ekskresi-ginjal-proses':
                html = this.renderSlideGinjalProses();
                break;
            case 'ekskresi-latihan':
                html = this.renderSlideLatihan();
                break;
            case 'ekskresi-lkpd':
                html = this.renderSlideLKPD();
                break;
            case 'ekskresi-evaluasi':
                html = this.renderSlideEvaluasi();
                break;
            default:
                html = `<div class="ekskresi-container"><p>Slide Ekskresi tidak ditemukan.</p></div>`;
        }

        container.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();

        // Attach dynamic interactive event handlers after DOM is mounted
        this.bindEvents(type, container);
    },

    /* =========================================================================
       1. SLIDE 1: HALAMAN AWAL & PETA KONSEP INTERAKTIF
       ========================================================================= */
    renderSlideHome() {
        return `
            <div class="ekskresi-fullpage" id="ekskresi-page-home">
                ${this.renderNavBar(0)}

                <div class="ekskresi-hero-card">
                    <div class="hero-left">
                        <span class="hero-tag"><i data-lucide="sparkles"></i> Media Interaktif IPA Kelas 8 • Pertemuan 8</span>
                        <h1 class="hero-title">SISTEM EKSKRESI MANUSIA</h1>
                        <p class="hero-desc">
                            Setiap detik, miliaran sel tubuhmu bekerja menghasilkan energi dan limbah metabolisme. 
                            Temukan bagaimana <strong>Kulit, Paru-paru, Hati,</strong> dan <strong>Ginjal</strong> bekerja sama 
                            menyaring zat sisa beracun demi menjaga keseimbangan cairan tubuh (<em>homeostasis</em>)!
                        </p>
                        <div class="hero-btn-row">
                            <button class="btn-hero-primary" onclick="EkskresiModule.navTo(1)">
                                <i data-lucide="play-circle"></i>
                                <span>Mulai Apersepsi</span>
                            </button>
                            <button class="btn-hero-secondary" onclick="EkskresiModule.handleMenuClick(0, 'sec-peta')">
                                <i data-lucide="network"></i>
                                <span>Jelajahi Peta Konsep</span>
                            </button>
                            <button class="btn-hero-secondary" onclick="EkskresiModule.navTo(3)">
                                <i data-lucide="user"></i>
                                <span>Anatomi Tubuh</span>
                            </button>
                        </div>
                    </div>
                    <div class="hero-right">
                        <div class="hero-organ-visual">
                            <div class="organ-float-badge b-kulit" onclick="EkskresiModule.navTo(4)" title="Buka Materi Kulit">
                                <span class="badge-icon">🧴</span>
                                <div>
                                    <strong>Kulit</strong>
                                    <small>Keringat & NaCl</small>
                                </div>
                            </div>
                            <div class="organ-float-badge b-paru" onclick="EkskresiModule.navTo(5)" title="Buka Materi Paru-Paru">
                                <span class="badge-icon">🫁</span>
                                <div>
                                    <strong>Paru-Paru</strong>
                                    <small>CO₂ & Uap H₂O</small>
                                </div>
                            </div>
                            <div class="organ-float-badge b-hati" onclick="EkskresiModule.navTo(6)" title="Buka Materi Hati">
                                <span class="badge-icon">🥩</span>
                                <div>
                                    <strong>Hati</strong>
                                    <small>Empedu & Urea</small>
                                </div>
                            </div>
                            <div class="organ-float-badge b-ginjal" onclick="EkskresiModule.navTo(7)" title="Buka Materi Ginjal">
                                <span class="badge-icon">🫘</span>
                                <div>
                                    <strong>Ginjal</strong>
                                    <small>Urine & Filtrasi</small>
                                </div>
                            </div>
                            <div class="hero-center-circle">
                                <i data-lucide="activity" class="pulse-icon"></i>
                                <span>HOMEOSTASIS</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TUJUAN PEMBELAJARAN -->
                <div class="ekskresi-section" id="sec-tujuan">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="target"></i> Capaian Belajar</div>
                        <h2>Tujuan Pembelajaran</h2>
                        <p>Setelah menyelesaikan pertemuan interaktif ini, kamu diharapkan mampu:</p>
                    </div>
                    <div class="tujuan-grid">
                        <div class="tujuan-card">
                            <div class="tujuan-num">1</div>
                            <div class="tujuan-content">
                                <h4>Menjelaskan Pengertian Sistem Ekskresi</h4>
                                <p>Memahami konsep pengeluaran zat sisa metabolisme sel serta membedakannya secara tepat dari peristiwa <em>defekasi</em> dan <em>sekresi</em>.</p>
                            </div>
                        </div>
                        <div class="tujuan-card">
                            <div class="tujuan-num">2</div>
                            <div class="tujuan-content">
                                <h4>Mengidentifikasi 4 Organ Ekskresi & Zat Sisanya</h4>
                                <p>Mengenali peran penting <strong>Kulit</strong> (keringat), <strong>Paru-paru</strong> (CO₂ & uap air), <strong>Hati</strong> (getah empedu & urea), dan <strong>Ginjal</strong> (urine).</p>
                            </div>
                        </div>
                        <div class="tujuan-card">
                            <div class="tujuan-num">3</div>
                            <div class="tujuan-content">
                                <h4>Menganalisis Struktur & Mekanisme Ekskresi</h4>
                                <p>Menguraikan proses pembentukan keringat, difusi alveolus, siklus ornitin & perombakan eritrosit, serta 3 tahap pembentukan urine di nefron ginjal.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PETA KONSEP INTERAKTIF -->
                <div class="ekskresi-section" id="sec-peta">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="network"></i> Navigasi Cepat</div>
                        <h2>Peta Konsep Interaktif Sistem Ekskresi</h2>
                        <p>Klik salah satu cabang organ di bawah ini untuk langsung menuju materi pembahasannya!</p>
                    </div>

                    <div class="concept-map-container">
                        <!-- Node Pusat -->
                        <div class="c-node c-center">
                            <div class="c-node-icon"><i data-lucide="sparkles"></i></div>
                            <h3>SISTEM EKSKRESI</h3>
                            <p>Pembuangan zat sisa metabolisme yang tidak berguna & beracun</p>
                        </div>

                        <!-- 4 Cabang -->
                        <div class="concept-branches-grid">
                            <!-- Cabang 1: Kulit -->
                            <div class="c-branch-card card-kulit" onclick="EkskresiModule.navTo(4)">
                                <div class="branch-top">
                                    <span class="branch-badge">ORGAN 1</span>
                                    <span class="branch-icon">🧴</span>
                                </div>
                                <h4>Kulit (Integumen)</h4>
                                <p class="branch-desc">Kelenjar keringat mengeluarkan keringat untuk membuang zat sisa dan mengatur suhu tubuh.</p>
                                <div class="branch-tags">
                                    <span class="tag-sisa">Air (H₂O)</span>
                                    <span class="tag-sisa">Garam (NaCl)</span>
                                    <span class="tag-sisa">Urea</span>
                                </div>
                                <div class="branch-footer">
                                    <span>Buka Materi Kulit</span>
                                    <i data-lucide="arrow-right"></i>
                                </div>
                            </div>

                            <!-- Cabang 2: Paru-paru -->
                            <div class="c-branch-card card-paru" onclick="EkskresiModule.navTo(5)">
                                <div class="branch-top">
                                    <span class="branch-badge">ORGAN 2</span>
                                    <span class="branch-icon">🫁</span>
                                </div>
                                <h4>Paru-Paru (Pulmo)</h4>
                                <p class="branch-desc">Alveolus melakukan difusi gas dan membuang zat sisa respirasi seluler saat ekspirasi.</p>
                                <div class="branch-tags">
                                    <span class="tag-sisa">Karbon Dioksida (CO₂)</span>
                                    <span class="tag-sisa">Uap Air (H₂O)</span>
                                </div>
                                <div class="branch-footer">
                                    <span>Buka Materi Paru-Paru</span>
                                    <i data-lucide="arrow-right"></i>
                                </div>
                            </div>

                            <!-- Cabang 3: Hati -->
                            <div class="c-branch-card card-hati" onclick="EkskresiModule.navTo(6)">
                                <div class="branch-top">
                                    <span class="branch-badge">ORGAN 3</span>
                                    <span class="branch-icon">🥩</span>
                                </div>
                                <h4>Hati (Hepar)</h4>
                                <p class="branch-desc">Merombak sel darah merah rusak, menetralkan racun, dan mengubah amonia menjadi urea.</p>
                                <div class="branch-tags">
                                    <span class="tag-sisa">Empedu (Bilirubin)</span>
                                    <span class="tag-sisa">Urea</span>
                                </div>
                                <div class="branch-footer">
                                    <span>Buka Materi Hati</span>
                                    <i data-lucide="arrow-right"></i>
                                </div>
                            </div>

                            <!-- Cabang 4: Ginjal -->
                            <div class="c-branch-card card-ginjal" onclick="EkskresiModule.navTo(7)">
                                <div class="branch-top">
                                    <span class="branch-badge">ORGAN 4</span>
                                    <span class="branch-icon">🫘</span>
                                </div>
                                <h4>Ginjal (Ren)</h4>
                                <p class="branch-desc">Nefron menyaring darah melalui 3 tahap (filtrasi, reabsorpsi, augmentasi) membentuk urine.</p>
                                <div class="branch-tags">
                                    <span class="tag-sisa">Urine</span>
                                    <span class="tag-sisa">Urea & Asam Urat</span>
                                    <span class="tag-sisa">Kelebihan Garam</span>
                                </div>
                                <div class="branch-footer">
                                    <span>Buka Materi Ginjal</span>
                                    <i data-lucide="arrow-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /* =========================================================================
       2. SLIDE 2: APERSEPSI & ANIMASI PERJALANAN ZAT SISA
       ========================================================================= */
    renderSlideApersepsi() {
        return `
            <div class="ekskresi-fullpage" id="ekskresi-page-apersepsi">
                ${this.renderNavBar(1)}

                <div class="ekskresi-header-banner">
                    <span class="banner-badge"><i data-lucide="help-circle"></i> Apersepsi & Rasa Ingin Tahu</span>
                    <h2>Mengapa Tubuh Kita Mengeluarkan Cairan?</h2>
                    <p>Sebelum mendalami materi organ ekskresi, mari renungkan dua fenomena biologis yang sering kita alami setiap hari!</p>
                </div>

                <div class="apersepsi-interactive-grid">
                    <!-- Pertanyaan Pemantik 1 -->
                    <div class="ap-question-card" id="card-ap1">
                        <div class="ap-card-header">
                            <span class="ap-badge-q">Pertanyaan 1</span>
                            <h3>💦 Mengapa badan kita basah oleh keringat saat berolahraga atau kepanasan?</h3>
                        </div>
                        <p class="ap-subtext">Pilih salah satu dugaan jawabanmu di bawah ini:</p>
                        <div class="ap-options-group" data-q="q1">
                            <button class="ap-opt-btn" onclick="EkskresiModule.answerApersepsi('q1', 1)">
                                <span class="opt-label">A</span>
                                <span>Karena tubuh menyerap uap air dari udara luar secara berlebihan.</span>
                            </button>
                            <button class="ap-opt-btn" onclick="EkskresiModule.answerApersepsi('q1', 2)">
                                <span class="opt-label">B</span>
                                <span>Untuk menurunkan suhu tubuh akibat panas metabolisme saat otot bekerja keras (termoregulasi).</span>
                            </button>
                            <button class="ap-opt-btn" onclick="EkskresiModule.answerApersepsi('q1', 3)">
                                <span class="opt-label">C</span>
                                <span>Karena kulit ingin membuang kelebihan lemak secara spontan.</span>
                            </button>
                        </div>
                        <div class="ap-feedback-box hidden" id="feedback-q1"></div>
                    </div>

                    <!-- Pertanyaan Pemantik 2 -->
                    <div class="ap-question-card" id="card-ap2">
                        <div class="ap-card-header">
                            <span class="ap-badge-q">Pertanyaan 2</span>
                            <h3>🟡 Mengapa air urine kita berwarna kuning keemasan, bukan bening seperti air biasa?</h3>
                        </div>
                        <p class="ap-subtext">Pilih salah satu dugaan jawabanmu di bawah ini:</p>
                        <div class="ap-options-group" data-q="q2">
                            <button class="ap-opt-btn" onclick="EkskresiModule.answerApersepsi('q2', 1)">
                                <span class="opt-label">A</span>
                                <span>Karena urine menyerap zat pewarna kuning langsung dari makanan instan.</span>
                            </button>
                            <button class="ap-opt-btn" onclick="EkskresiModule.answerApersepsi('q2', 2)">
                                <span class="opt-label">B</span>
                                <span>Mengandung zat pigmen urobilin hasil penguraian sel darah merah tua di hati yang disaring oleh ginjal.</span>
                            </button>
                            <button class="ap-opt-btn" onclick="EkskresiModule.answerApersepsi('q2', 3)">
                                <span class="opt-label">C</span>
                                <span>Akibat asam lambung yang bocor masuk ke dalam pembuluh ginjal.</span>
                            </button>
                        </div>
                        <div class="ap-feedback-box hidden" id="feedback-q2"></div>
                    </div>
                </div>

                <!-- ANIMASI INTERAKTIF PERJALANAN ZAT SISA DALAM TUBUH -->
                <div class="ekskresi-section" style="margin-top: 1.5rem;">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="video"></i> Animasi Interaktif (1-2 Menit)</div>
                        <h2>Perjalanan Zat Sisa di Dalam Tubuh Manusia</h2>
                        <p>Tekan tombol putar atau klik setiap tahapan untuk melihat bagaimana limbah sel diproses hingga keluar dari tubuh!</p>
                    </div>

                    <div class="journey-anim-card">
                        <div class="anim-controls-bar">
                            <div class="anim-playback-btns">
                                <button class="btn-anim-play" id="btn-toggle-anim" onclick="EkskresiModule.toggleAnimPlay()">
                                    <i data-lucide="play" id="icon-anim-play"></i>
                                    <span id="txt-anim-play">Mulai Animasi Otomatis</span>
                                </button>
                                <button class="btn-anim-step" onclick="EkskresiModule.resetAnim()">
                                    <i data-lucide="rotate-ccw"></i>
                                    <span>Reset</span>
                                </button>
                            </div>
                            <div class="anim-step-pills">
                                <button class="step-pill active" data-step="1" onclick="EkskresiModule.setAnimStep(1)">1. Metabolisme Sel</button>
                                <button class="step-pill" data-step="2" onclick="EkskresiModule.setAnimStep(2)">2. Aliran Darah</button>
                                <button class="step-pill" data-step="3" onclick="EkskresiModule.setAnimStep(3)">3. Filtrasi Organ</button>
                                <button class="step-pill" data-step="4" onclick="EkskresiModule.setAnimStep(4)">4. Pembuangan</button>
                            </div>
                        </div>

                        <div class="anim-canvas-view" id="anim-stage-container">
                            <!-- Stage Visual SVG Rendering -->
                            <div class="stage-visual" id="stage-visual-content">
                                ${this.getAnimStepHtml(1)}
                            </div>
                        </div>

                        <div class="anim-explanation-box" id="anim-explanation-text">
                            <h4>Tahap 1: Pembentukan Zat Sisa di Triliunan Sel Tubuh</h4>
                            <p>Setiap kali sel membakar nutrisi (glukosa) dengan oksigen untuk membuat energi, sel juga memproduksi limbah beracun berupa karbon dioksida ($CO_2$), amonia hasil pembongkaran protein, serta panas berlebih.</p>
                        </div>
                    </div>
                </div>

                <div class="slide-next-prompt">
                    <span>Sudah paham konsep pemantiknya? Lanjutkan ke pengertian sistem ekskresi:</span>
                    <button class="btn-slide-nav-next" onclick="EkskresiModule.navTo(2)">
                        <span>Materi 1: Pengertian Ekskresi</span>
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    },

    /* =========================================================================
       3. SLIDE 3: MATERI 1 - PENGERTIAN SISTEM EKSKRESI & DRAG-DROP
       ========================================================================= */
    renderSlideDefinisi() {
        return `
            <div class="ekskresi-fullpage" id="ekskresi-page-definisi">
                ${this.renderNavBar(2)}

                <div class="ekskresi-header-banner">
                    <span class="banner-badge"><i data-lucide="book-open"></i> Materi 1: Konsep Dasar</span>
                    <h2>Pengertian Sistem Ekskresi</h2>
                    <p>Memahami definisi sains ekskresi dan membedakannya dari sekresi maupun defekasi.</p>
                </div>

                <div class="definisi-grid">
                    <div class="concept-definition-card">
                        <div class="card-icon-big">⚗️</div>
                        <h3>Konsep Inti Ekskresi</h3>
                        <p class="main-definition-quote">
                            <strong>Sistem Ekskresi</strong> adalah sistem organ tubuh yang bertugas mengeluarkan 
                            <strong>zat sisa hasil metabolisme sel</strong> yang sudah tidak digunakan lagi oleh tubuh dan bersifat racun jika tertimbun.
                        </p>
                        <div class="highlight-info-box">
                            <i data-lucide="alert-triangle"></i>
                            <div>
                                <strong>Mengapa Harus Dikeluarkan?</strong>
                                <p>Jika zat seperti urea, amonia, dan asam urat menumpuk di darah, derajat keasaman (pH) tubuh akan rusak dan menyebabkan keracunan seluler (<em>uremia</em>) bahkan kematian.</p>
                            </div>
                        </div>
                    </div>

                    <!-- TABEL PERBANDINGAN: EKSKRESI vs DEFEKASI vs SEKRESI -->
                    <div class="comparison-table-wrapper">
                        <h3>Tabel Perbandingan 3 Proses Pengeluaran Zat</h3>
                        <p class="table-sub">Banyak siswa sering tertukar! Cermati perbedaannya pada tabel di bawah ini:</p>
                        <div class="table-responsive">
                            <table class="ekskresi-table">
                                <thead>
                                    <tr>
                                        <th>Pembeda</th>
                                        <th class="col-ekskresi">Ekskresi</th>
                                        <th class="col-defekasi">Defekasi</th>
                                        <th class="col-sekresi">Sekresi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Definisi</strong></td>
                                        <td>Pengeluaran zat sisa metabolisme seluler</td>
                                        <td>Pengeluaran sisa makanan yang tidak dicerna</td>
                                        <td>Pengeluaran zat oleh kelenjar yang masih berfungsi</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Asal Zat</strong></td>
                                        <td>Reaksi kimia di dalam sel tubuh</td>
                                        <td>Saluran pencernaan (usus besar)</td>
                                        <td>Kelenjar endokrin & eksokrin</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Sifat Zat</strong></td>
                                        <td>Racun (harus segera dibuang)</td>
                                        <td>Limbah padat saluran cerna</td>
                                        <td>Sangat berguna bagi fungsi tubuh</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Organ Pelaksana</strong></td>
                                        <td>Kulit, Paru-paru, Hati, Ginjal</td>
                                        <td>Anus & Rektum</td>
                                        <td>Kelenjar ludah, pankreas, tiroid, dll</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Contoh Zat</strong></td>
                                        <td><span class="badge-tag-green">Urine, Keringat, CO₂, Empedu</span></td>
                                        <td><span class="badge-tag-orange">Feses (Tinja)</span></td>
                                        <td><span class="badge-tag-blue">Air liur, Enzim, Hormon, Air mata</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- AKTIVITAS INTERAKTIF: DRAG AND DROP KLASIFIKASI ZAT -->
                <div class="ekskresi-section" style="margin-top: 1.5rem;">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="hand"></i> Aktivitas Interaktif</div>
                        <h2>Tantangan Klasifikasi: Ekskresi atau Bukan Ekskresi?</h2>
                        <p>Seret (drag) atau klik kartu zat di bawah ini ke wadah kelompok yang tepat, lalu klik <strong>Periksa Jawaban</strong>!</p>
                    </div>

                    <div class="dragdrop-game-wrapper">
                        <!-- Source Items -->
                        <div class="dd-source-pool" id="dd-source-pool">
                            <!-- Items dynamically placed here -->
                        </div>

                        <!-- Drop Zones -->
                        <div class="dd-drop-zones">
                            <!-- Zone 1: Ekskresi -->
                            <div class="dd-drop-zone zone-ekskresi" id="zone-ekskresi" data-target="ekskresi">
                                <div class="zone-header">
                                    <span class="zone-icon">✅</span>
                                    <h4>Zat Sistem Ekskresi</h4>
                                    <small>Sisa metabolisme sel yang harus dibuang</small>
                                </div>
                                <div class="zone-slot" id="slot-ekskresi"></div>
                            </div>

                            <!-- Zone 2: Bukan Ekskresi -->
                            <div class="dd-drop-zone zone-bukan" id="zone-bukan" data-target="bukan">
                                <div class="zone-header">
                                    <span class="zone-icon">❌</span>
                                    <h4>Bukan Ekskresi (Sekresi / Defekasi)</h4>
                                    <small>Sisa makanan tak tercerna atau getah kelenjar berguna</small>
                                </div>
                                <div class="zone-slot" id="slot-bukan"></div>
                            </div>
                        </div>

                        <!-- Action controls -->
                        <div class="dd-actions-bar">
                            <button class="btn-primary ripple" onclick="EkskresiModule.checkDragDropDefinisi()">
                                <i data-lucide="check"></i>
                                <span>Periksa Jawaban</span>
                            </button>
                            <button class="btn-nav ripple" onclick="EkskresiModule.resetDragDropDefinisi()">
                                <i data-lucide="rotate-ccw"></i>
                                <span>Atur Ulang (Reset)</span>
                            </button>
                            <div class="dd-score-badge" id="dd-score-text">Skor: 0 / 8</div>
                        </div>
                        <div class="dd-feedback-area hidden" id="dd-feedback-box"></div>
                    </div>
                </div>

                <div class="slide-next-prompt">
                    <span>Langkah berikutnya: Kenali posisi 4 organ ekskresi pada tubuh manusia!</span>
                    <button class="btn-slide-nav-next" onclick="EkskresiModule.navTo(3)">
                        <span>Materi 2: Anatomi 4 Organ Tubuh</span>
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    },

    /* =========================================================================
       4. SLIDE 4: MATERI 2 - OVERVIEW ANATOMI TUBUH & 4 ORGAN EKSKRESI
       ========================================================================= */
    renderSlideTubuhOverview() {
        return `
            <div class="ekskresi-fullpage" id="ekskresi-page-tubuh">
                ${this.renderNavBar(3)}

                <div class="ekskresi-header-banner">
                    <span class="banner-badge"><i data-lucide="user"></i> Materi 2: Anatomi Organ Ekskresi</span>
                    <h2>Eksplorasi 4 Organ Ekskresi Manusia</h2>
                    <p>Klik titik organ pada tubuh manusia atau pilih tab organ di bawah untuk melihat ringkasan dan membuka materi lengkapnya!</p>
                </div>

                <div class="tubuh-overview-grid">
                    <!-- Interactive Torso Silhouette -->
                    <div class="torso-panel card">
                        <div class="torso-instructions">
                            <i data-lucide="pointer"></i> Sentuh / klik penanda organ bercahaya pada tubuh
                        </div>
                        <div class="torso-canvas-wrapper">
                            <svg viewBox="0 0 200 320" class="torso-svg">
                                <!-- Torso Silhouette -->
                                <path d="M 100 25 C 115 25 125 35 125 50 C 125 65 115 75 100 75 C 85 75 75 65 75 50 C 75 35 85 25 100 25 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
                                <path d="M 85 75 L 85 88 L 45 105 L 35 180 L 48 185 L 60 120 L 70 120 L 68 230 L 80 230 L 85 300 L 98 300 L 98 230 L 102 230 L 102 300 L 115 300 L 120 230 L 132 230 L 130 120 L 140 120 L 152 185 L 165 180 L 155 105 L 115 88 L 115 75 Z" fill="rgba(52, 211, 153, 0.05)" stroke="rgba(52, 211, 153, 0.3)" stroke-width="1.8" />
                            </svg>

                            <!-- Hotspot Markers -->
                            <!-- 1. Kulit -->
                            <div class="torso-hotspot hs-kulit" style="top: 38%; left: 24%;" onclick="EkskresiModule.selectTorsoOrgan('kulit')" title="Kulit (Permukaan Tubuh)">
                                <span class="hotspot-ping"></span>
                                <span class="hotspot-dot">🧴</span>
                                <span class="hotspot-label">1. Kulit</span>
                            </div>

                            <!-- 2. Paru-Paru -->
                            <div class="torso-hotspot hs-paru" style="top: 36%; left: 50%;" onclick="EkskresiModule.selectTorsoOrgan('paru')" title="Paru-Paru (Rongga Dada)">
                                <span class="hotspot-ping"></span>
                                <span class="hotspot-dot">🫁</span>
                                <span class="hotspot-label">2. Paru-Paru</span>
                            </div>

                            <!-- 3. Hati -->
                            <div class="torso-hotspot hs-hati" style="top: 48%; left: 45%;" onclick="EkskresiModule.selectTorsoOrgan('hati')" title="Hati (Rongga Perut Kanan)">
                                <span class="hotspot-ping"></span>
                                <span class="hotspot-dot">🥩</span>
                                <span class="hotspot-label">3. Hati</span>
                            </div>

                            <!-- 4. Ginjal -->
                            <div class="torso-hotspot hs-ginjal" style="top: 58%; left: 54%;" onclick="EkskresiModule.selectTorsoOrgan('ginjal')" title="Ginjal (Kanan & Kiri Pinggang)">
                                <span class="hotspot-ping"></span>
                                <span class="hotspot-dot">🫘</span>
                                <span class="hotspot-label">4. Ginjal</span>
                            </div>
                        </div>
                    </div>

                    <!-- Organ Detail Card Preview -->
                    <div class="organ-detail-panel card" id="organ-detail-panel">
                        <div class="organ-tabs-row">
                            <button class="organ-tab-btn active" id="tab-btn-kulit" onclick="EkskresiModule.selectTorsoOrgan('kulit')">🧴 1. Kulit</button>
                            <button class="organ-tab-btn" id="tab-btn-paru" onclick="EkskresiModule.selectTorsoOrgan('paru')">🫁 2. Paru-Paru</button>
                            <button class="organ-tab-btn" id="tab-btn-hati" onclick="EkskresiModule.selectTorsoOrgan('hati')">🥩 3. Hati</button>
                            <button class="organ-tab-btn" id="tab-btn-ginjal" onclick="EkskresiModule.selectTorsoOrgan('ginjal')">🫘 4. Ginjal</button>
                        </div>

                        <div class="organ-preview-body" id="organ-preview-content">
                            <!-- Filled dynamically by selectTorsoOrgan -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    selectTorsoOrgan(organKey) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        document.querySelectorAll('.organ-tab-btn').forEach(b => b.classList.remove('active'));
        const btn = document.getElementById(`tab-btn-${organKey}`);
        if (btn) btn.classList.add('active');

        const data = {
            kulit: {
                title: "1. Kulit (Integumen)",
                icon: "🧴",
                color: "#10b981",
                slideIdx: 4,
                peran: "Organ terluas tubuh yang mengekskresikan keringat untuk membuang sisa metabolisme garam, urea, serta mengatur suhu tubuh (termoregulasi).",
                struktur: "Epidermis (kulit ari), Dermis (kulit jangat dengan kelenjar keringat), Hipodermis (lemak), dan pori-pori.",
                zatSisa: "Air (H₂O), Garam mineral (NaCl), sedikit Urea dan asam laktat.",
                gangguan: "Biang keringat (miliaria), jerawat, dermatitis / eksim."
            },
            paru: {
                title: "2. Paru-Paru (Pulmo)",
                icon: "🫁",
                color: "#06b6d4",
                slideIdx: 5,
                peran: "Organ pernapasan yang berperan mengeluarkan karbon dioksida dan uap air sisa respirasi seluler melalui proses difusi di alveolus.",
                struktur: "Saluran pernapasan, bronkus, bronkiolus, dan jutaan kantung udara berdinding tipis (alveolus).",
                zatSisa: "Karbon dioksida (CO₂) dan Uap air (H₂O).",
                gangguan: "Asma, bronkitis, tuberkulosis (TBC), pneumonia."
            },
            hati: {
                title: "3. Hati (Hepar)",
                icon: "🥩",
                color: "#f59e0b",
                slideIdx: 6,
                peran: "Kelenjar terbesar tubuh yang merombak sel darah merah rusak menjadi zat warna empedu (bilirubin), mendetoksifikasi racun, serta mengubah amonia menjadi urea.",
                struktur: "Lobus kanan, lobus kiri, kantung empedu (vesica fellea), saluran empedu, dan sel Kupffer.",
                zatSisa: "Getah empedu (pigmen bilirubin & biliverdin) dan Urea.",
                gangguan: "Hepatitis, sirosis hati, sakit kuning (jaundice/ikterus)."
            },
            ginjal: {
                title: "4. Ginjal (Ren)",
                icon: "🫘",
                color: "#8b5cf6",
                slideIdx: 7,
                peran: "Organ ekskresi utama penyaring darah yang menyaring 180 liter cairan darah per hari untuk membentuk urine dan menjaga keseimbangan osmotik.",
                struktur: "Korteks, medula, pelvis renalis, dan ~1 juta unit nefron (glomerulus, kapsul Bowman, TKP, lengkung Henle, TKD, tubulus kolektivus).",
                zatSisa: "Urine sesungguhnya (Urea, asam urat, kelebihan air, garam NaCl, amonia).",
                gangguan: "Batu ginjal, nefritis, gagal ginjal, diabetes insipidus."
            }
        }[organKey];

        if (!data) return;

        const content = document.getElementById('organ-preview-content');
        if (content) {
            content.innerHTML = `
                <div class="preview-header" style="border-left: 4px solid ${data.color}">
                    <span class="preview-icon">${data.icon}</span>
                    <div>
                        <h3>${data.title}</h3>
                        <p>${data.peran}</p>
                    </div>
                </div>

                <div class="preview-spec-grid">
                    <div class="spec-box">
                        <span class="spec-label">🔬 Struktur Kunci</span>
                        <p>${data.struktur}</p>
                    </div>
                    <div class="spec-box">
                        <span class="spec-label">💧 Zat Sisa Dikeluarkan</span>
                        <p><strong>${data.zatSisa}</strong></p>
                    </div>
                    <div class="spec-box">
                        <span class="spec-label">⚠️ Gangguan / Penyakit</span>
                        <p>${data.gangguan}</p>
                    </div>
                </div>

                <div class="preview-cta">
                    <button class="btn-primary ripple" style="background:${data.color};" onclick="EkskresiModule.navTo(${data.slideIdx})">
                        <span>Buka Pembahasan Lengkap ${data.title.split(' ')[1]}</span>
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            `;
            if (window.lucide) window.lucide.createIcons();
        }
    },

    /* =========================================================================
       5. SLIDE 5: ORGAN EKSKRESI 1 - KULIT (INTEGUMEN)
       ========================================================================= */
    renderSlideKulit() {
        return `
            <div class="ekskresi-fullpage" id="ekskresi-page-kulit">
                ${this.renderNavBar(4)}

                <div class="ekskresi-header-banner" style="border-color: #10b981;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
                        <div>
                            <span class="banner-badge" style="background:rgba(16,185,129,0.2); color:#34d399;"><i data-lucide="shield"></i> Organ Ekskresi 1</span>
                            <h2>KULIT (Integumen)</h2>
                            <p>Struktur anatomi, mekanisme termoregulasi keringat, zat sisa, dan gangguannya.</p>
                        </div>
                        <div class="organ-nav-quick">
                            <button class="btn-organ-pill active">🧴 Kulit</button>
                            <button class="btn-organ-pill" onclick="EkskresiModule.navTo(5)">🫁 Paru-Paru</button>
                            <button class="btn-organ-pill" onclick="EkskresiModule.navTo(6)">🥩 Hati</button>
                            <button class="btn-organ-pill" onclick="EkskresiModule.navTo(7)">🫘 Ginjal</button>
                        </div>
                    </div>
                </div>

                <!-- 7 Pola Terstruktur: Pengantar, Struktur, Proses, Zat, Gangguan, Interaktif, Cek Pemahaman -->
                <div class="organ-structured-grid">
                    <!-- 1. Pengantar -->
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">📖</span> <h4>1. Pengantar & Peran Ekskresi</h4></div>
                        <p>Kulit adalah organ terluar dan terluas tubuh manusia (~2 m²). Selain sebagai pelindung mekanis dari kuman dan dehidrasi, kulit berperan penting dalam sistem ekskresi dengan <strong>mengeluarkan keringat</strong>.</p>
                        <p>Fungsi ekskresi keringat berkaitan erat dengan <strong>termoregulasi</strong>: saat suhu tubuh naik, penguapan keringat dari permukaan kulit menyerap panas sehingga suhu tubuh kembali normal (~37°C).</p>
                    </div>

                    <!-- 2. Struktur Kulit -->
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">🔬</span> <h4>2. Struktur Anatomi Kulit</h4></div>
                        <ul class="styled-list">
                            <li><strong>Epidermis (Kulit Ari):</strong> Lapisan terluar. Terdiri dari stratum korneum (lapisan tanduk yang mati & mengelupas) dan stratum germinativum yang terus membelah dan mengandung pigmen melanin.</li>
                            <li><strong>Dermis (Kulit Jangat):</strong> Lapisan tengah yang tebal. Mengandung <em>kelenjar keringat (glandula sudorifera)</em>, kelenjar minyak (sebasea), pembuluh darah kapiler, dan ujung saraf peraba.</li>
                            <li><strong>Hipodermis (Subkutan):</strong> Lapisan dasar berupa jaringan lemak (adiposa) sebagai penahan suhu dan cadangan energi.</li>
                            <li><strong>Pori-pori:</strong> Muara saluran kelenjar keringat di permukaan kulit.</li>
                        </ul>
                    </div>

                    <!-- 3. Proses Pengeluaran Keringat -->
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">⚙️</span> <h4>3. Proses Pembentukan Keringat</h4></div>
                        <p>Kelenjar keringat berbentuk gulungan pipa di dermis menyerap air, garam, dan urea dari pembuluh darah kapiler di sekitarnya. Saat hipotalamus di otak mendeteksi kenaikan suhu tubuh (akibat olahraga, cuaca panas, atau demam), hipotalamus mengirim impuls saraf untuk melebarkan pembuluh darah kapiler dan memicu kelenjar keringat memompa keringat keluar melalui pori-pori.</p>
                    </div>

                    <!-- 4. Zat Sisa & 5. Gangguan -->
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">💧</span> <h4>4. Zat Sisa & 5. Gangguan Kulit</h4></div>
                        <div class="two-sub-col">
                            <div>
                                <h5>Zat Sisa yang Dikeluarkan:</h5>
                                <div class="tag-cloud">
                                    <span class="badge-tag-green">Air (H₂O ~99%)</span>
                                    <span class="badge-tag-green">Garam (NaCl ~0.5%)</span>
                                    <span class="badge-tag-green">Sedikit Urea & Asam Laktat</span>
                                </div>
                            </div>
                            <div style="margin-top:0.8rem;">
                                <h5>Gangguan & Penyakit Kulit:</h5>
                                <ul class="bullet-list-sm">
                                    <li><strong>Biang Keringat (Miliaria):</strong> Pori kelenjar keringat tersumbat debu/sel kulit mati sehingga keringat terperangkap memicu bintik merah gatal.</li>
                                    <li><strong>Jerawat (Acne):</strong> Pori kelenjar minyak tersumbat sebum dan terinfeksi bakteri <em>Propionibacterium acnes</em>.</li>
                                    <li><strong>Dermatitis (Eksim):</strong> Peradangan kulit gatal, merah, dan bersisik akibat alergi atau kontak zat kimia iritan.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 6. INTERAKTIF KHUSUS KULIT -->
                <div class="ekskresi-section" style="margin-top: 1.5rem;">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="sliders"></i> Aktivitas Interaktif Kulit</div>
                        <h2>Lab Interaktif: Labeling & Simulasi Termoregulasi</h2>
                        <p>Coba dua aktivitas berikut: Labeli lapisan kulit dan uji simulasi perubahan keringat saat berolahraga vs istirahat!</p>
                    </div>

                    <div class="kulit-interactive-grid">
                        <!-- Interaktif 1: Diagram Labeling Lapisan Kulit -->
                        <div class="interactive-box card">
                            <div class="box-title">
                                <i data-lucide="tag"></i>
                                <span>Aktivitas 1: Labeling Lapisan & Struktur Kulit</span>
                            </div>
                            <p class="box-sub">Pilih nama bagian yang tepat untuk setiap nomor pada diagram kulit:</p>
                            
                            <div class="kulit-diagram-area">
                                <svg viewBox="0 0 400 240" class="kulit-svg">
                                    <!-- Stratum Corneum / Epidermis -->
                                    <rect x="20" y="20" width="360" height="35" fill="#fef3c7" stroke="#d97706" stroke-width="2" rx="4"/>
                                    <text x="35" y="42" fill="#92400e" font-size="12" font-weight="800">1. Lapisan Terluar (Epidermis)</text>
                                    
                                    <!-- Dermis -->
                                    <rect x="20" y="55" width="360" height="115" fill="#ecfdf5" stroke="#059669" stroke-width="2" rx="4"/>
                                    <text x="35" y="80" fill="#065f46" font-size="12" font-weight="800">2. Lapisan Tengah Tebal (Dermis)</text>
                                    
                                    <!-- Sweat Gland Tube coiled in dermis -->
                                    <path d="M 120 20 L 120 90 Q 120 130 140 135 Q 160 140 150 155 Q 135 170 120 150 Z" fill="none" stroke="#0284c7" stroke-width="5" stroke-linecap="round"/>
                                    <circle cx="120" cy="20" r="4" fill="#0284c7"/>
                                    
                                    <!-- Hair follicle & sebaceous gland -->
                                    <path d="M 280 15 L 250 140" stroke="#7c3aed" stroke-width="4"/>
                                    <ellipse cx="265" cy="85" rx="12" ry="8" fill="#eab308" fill-opacity="0.8"/>

                                    <!-- Blood vessel capillaries -->
                                    <path d="M 40 140 Q 90 125 140 140 T 240 135 T 340 140" fill="none" stroke="#dc2626" stroke-width="3"/>
                                    <path d="M 40 148 Q 90 133 140 148 T 240 143 T 340 148" fill="none" stroke="#2563eb" stroke-width="3"/>

                                    <!-- Subcutaneous / Hypodermis Fat Cells -->
                                    <rect x="20" y="170" width="360" height="55" fill="#fef9c3" stroke="#ca8a04" stroke-width="2" rx="4"/>
                                    <text x="35" y="200" fill="#854d0e" font-size="12" font-weight="800">3. Lapisan Lemak Dasar (Hipodermis)</text>
                                </svg>
                            </div>

                            <div class="label-selectors-grid">
                                <div class="label-sel-item">
                                    <label>Nomor 1:</label>
                                    <select id="sel-kulit-1" class="ekskresi-select" onchange="EkskresiModule.setKulitLabel(1, this.value)">
                                        <option value="">-- Pilih Jawaban --</option>
                                        <option value="epidermis">Epidermis (Kulit Ari)</option>
                                        <option value="dermis">Dermis (Kulit Jangat)</option>
                                        <option value="hipodermis">Hipodermis (Jaringan Lemak)</option>
                                        <option value="kelenjar">Kelenjar Keringat</option>
                                    </select>
                                </div>
                                <div class="label-sel-item">
                                    <label>Nomor 2:</label>
                                    <select id="sel-kulit-2" class="ekskresi-select" onchange="EkskresiModule.setKulitLabel(2, this.value)">
                                        <option value="">-- Pilih Jawaban --</option>
                                        <option value="epidermis">Epidermis (Kulit Ari)</option>
                                        <option value="dermis">Dermis (Kulit Jangat)</option>
                                        <option value="hipodermis">Hipodermis (Jaringan Lemak)</option>
                                        <option value="kelenjar">Kelenjar Keringat</option>
                                    </select>
                                </div>
                                <div class="label-sel-item">
                                    <label>Nomor 3:</label>
                                    <select id="sel-kulit-3" class="ekskresi-select" onchange="EkskresiModule.setKulitLabel(3, this.value)">
                                        <option value="">-- Pilih Jawaban --</option>
                                        <option value="epidermis">Epidermis (Kulit Ari)</option>
                                        <option value="dermis">Dermis (Kulit Jangat)</option>
                                        <option value="hipodermis">Hipodermis (Jaringan Lemak)</option>
                                        <option value="kelenjar">Kelenjar Keringat</option>
                                    </select>
                                </div>
                            </div>
                            <div style="margin-top: 0.8rem; display:flex; gap:0.5rem; align-items:center;">
                                <button class="btn-primary ripple" onclick="EkskresiModule.checkKulitLabeling()">Periksa Label</button>
                                <span id="label-kulit-feedback" style="font-weight:600; font-size:0.85rem;"></span>
                            </div>
                        </div>

                        <!-- Interaktif 2: Simulasi Olahraga vs Istirahat -->
                        <div class="interactive-box card">
                            <div class="box-title">
                                <i data-lucide="flame"></i>
                                <span>Aktivitas 2: Simulasi Olahraga vs Istirahat</span>
                            </div>
                            <p class="box-sub">Pilih tingkat aktivitas fisik untuk melihat respon pembuluh darah, suhu tubuh, dan laju tetesan keringat:</p>

                            <div class="sim-mode-toggle">
                                <button class="btn-mode active" id="btn-mode-istirahat" onclick="EkskresiModule.setKulitSim('istirahat')">
                                    <span>🛋️ Mode Istirahat</span>
                                </button>
                                <button class="btn-mode" id="btn-mode-sedang" onclick="EkskresiModule.setKulitSim('sedang')">
                                    <span>🚶 Jalan Santai</span>
                                </button>
                                <button class="btn-mode" id="btn-mode-berat" onclick="EkskresiModule.setKulitSim('berat')">
                                    <span>🏃 Olahraga Berat / Lari</span>
                                </button>
                            </div>

                            <div class="sim-meters-row">
                                <div class="meter-card">
                                    <span class="m-label">Suhu Tubuh</span>
                                    <span class="m-val" id="val-kulit-temp">36.8 °C</span>
                                    <small id="sub-kulit-temp">Normal Homeostasis</small>
                                </div>
                                <div class="meter-card">
                                    <span class="m-label">Kapiler Dermis</span>
                                    <span class="m-val" id="val-kulit-vaso" style="color:#38bdf8;">Konstriksi (Normal)</span>
                                    <small id="sub-kulit-vaso">Aliran darah biasa</small>
                                </div>
                                <div class="meter-card">
                                    <span class="m-label">Laju Keringat</span>
                                    <span class="m-val" id="val-kulit-rate" style="color:#10b981;">15 mL/jam</span>
                                    <small id="sub-kulit-rate">Keringat basal minimal</small>
                                </div>
                            </div>

                            <!-- Visual Pores with droplets -->
                            <div class="pores-visual-box" id="pores-visual-box">
                                <div class="pore-tube"><div class="sweat-drop drop-1"></div></div>
                                <div class="pore-tube"><div class="sweat-drop drop-2"></div></div>
                                <div class="pore-tube"><div class="sweat-drop drop-3"></div></div>
                                <div class="pore-tube"><div class="sweat-drop drop-4"></div></div>
                                <div class="pore-tube"><div class="sweat-drop drop-5"></div></div>
                            </div>
                            <p class="sim-explain-footer" id="kulit-sim-explain">
                                Pada saat istirahat santai, aktivitas metabolik otot rendah. Pembuluh kapiler dermis berdiameter normal dan kelenjar keringat hanya mengeluarkan sedikit cairan untuk melembapkan kulit.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- 7. CEK PEMAHAMAN KULIT (3 Soal Singkat) -->
                <div class="ekskresi-section" style="margin-top: 1.5rem;">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="check-square"></i> Cek Pemahaman</div>
                        <h2>Uji Cepat Materi Kulit</h2>
                        <p>Jawab 3 pertanyaan kilat di bawah ini untuk menguji penguasaanmu:</p>
                    </div>

                    <div class="quiz-mini-grid">
                        ${this.renderMiniQuizItem('kulit', 1, 
                            'Bagian kulit tempat terdapatnya kelenjar keringat dan pembuluh darah adalah...',
                            ['Epidermis (kulit ari)', 'Dermis (kulit jangat)', 'Stratum korneum', 'Kelenjar sebasea'],
                            1,
                            'Tepat sekali! Kelenjar keringat, pembuluh darah kapiler, dan folikel rambut berada di lapisan Dermis (kulit jangat).'
                        )}
                        ${this.renderMiniQuizItem('kulit', 2, 
                            'Komponen zat sisa utama yang dikeluarkan melalui kelenjar keringat adalah...',
                            ['Glukosa dan asam amino', 'Air, garam mineral (NaCl), dan sedikit urea', 'Empedu dan asam urat tinggi', 'Hormon dan enzim pencernaan'],
                            1,
                            'Benar! Keringat tersusun atas ~99% air, garam NaCl (~0.5%), dan sedikit urea sisa perombakan protein.'
                        )}
                        ${this.renderMiniQuizItem('kulit', 3, 
                            'Bagian otak yang bertindak sebagai termostat pengatur produksi keringat saat kepanasan adalah...',
                            ['Otak besar (Serebrum)', 'Hipotalamus', 'Otak kecil (Serebelum)', 'Medula oblongata'],
                            1,
                            'Hebat! Hipotalamus memantau suhu darah dan memicu respons pengeluaran keringat saat suhu tubuh meningkat.'
                        )}
                    </div>
                </div>

                <div class="slide-next-prompt">
                    <span>Lanjutkan eksplorasi ke organ ekskresi kedua: Paru-paru!</span>
                    <button class="btn-slide-nav-next" onclick="EkskresiModule.navTo(5)">
                        <span>Organ 2: Paru-Paru (Pulmo)</span>
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    },

    /* =========================================================================
       6. SLIDE 6: ORGAN EKSKRESI 2 - PARU-PARU (PULMO)
       ========================================================================= */
    renderSlideParu() {
        return `
            <div class="ekskresi-fullpage" id="ekskresi-page-paru">
                ${this.renderNavBar(5)}

                <div class="ekskresi-header-banner" style="border-color: #06b6d4;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
                        <div>
                            <span class="banner-badge" style="background:rgba(6,182,212,0.2); color:#22d3ee;"><i data-lucide="wind"></i> Organ Ekskresi 2</span>
                            <h2>PARU-PARU (Pulmo)</h2>
                            <p>Struktur percabangan, difusi gas ekspirasi di alveolus, zat sisa CO₂ & H₂O, dan gangguannya.</p>
                        </div>
                        <div class="organ-nav-quick">
                            <button class="btn-organ-pill" onclick="EkskresiModule.navTo(4)">🧴 Kulit</button>
                            <button class="btn-organ-pill active">🫁 Paru-Paru</button>
                            <button class="btn-organ-pill" onclick="EkskresiModule.navTo(6)">🥩 Hati</button>
                            <button class="btn-organ-pill" onclick="EkskresiModule.navTo(7)">🫘 Ginjal</button>
                        </div>
                    </div>
                </div>

                <!-- 7 Pola Terstruktur: Pengantar, Struktur, Proses, Zat, Gangguan, Interaktif, Cek Pemahaman -->
                <div class="organ-structured-grid">
                    <!-- 1. Pengantar -->
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">📖</span> <h4>1. Pengantar & Peran Ekskresi</h4></div>
                        <p>Paru-paru merupakan organ respirasi sekaligus organ ekskresi. Seluruh sel tubuh menggunakan oksigen untuk memecah molekul makanan dalam proses <strong>respirasi seluler aerobik</strong>:</p>
                        <div class="chem-formula-box">
                            $$C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + \\text{ATP (Energi)}$$
                        </div>
                        <p>Dua zat sampingan dari reaksi tersebut, yaitu <strong>gas karbon dioksida ($CO_2$)</strong> dan <strong>uap air ($H_2O$)</strong>, bersifat racun bagi sel jika dibiarkan dan harus segera dibuang oleh paru-paru.</p>
                    </div>

                    <!-- 2. Struktur Paru-paru -->
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">🔬</span> <h4>2. Struktur Saluran & Alveolus</h4></div>
                        <ul class="styled-list">
                            <li><strong>Saluran Pernapasan:</strong> Trakea (batang tenggorokan) bercabang menjadi dua <em>Bronkus</em> (kanan & kiri), lalu bercabang lagi menjadi saluran mikroskopis <em>Bronkiolus</em>.</li>
                            <li><strong>Alveolus (Kantung Udara):</strong> Berjumlah sekitar 300 juta kantung mikroskopis pada orang dewasa. Memiliki dinding epitel selapis yang sangat tipis dan diselimuti jaring-jaring kapiler darah.</li>
                            <li>Luas permukaan alveolus mencapai ~80 m² (hampir seluas lapangan tenis!), memaksimalkan laju difusi pertukaran gas.</li>
                        </ul>
                    </div>

                    <!-- 3. Proses Pengeluaran Gas -->
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">⚙️</span> <h4>3. Mekanisme Difusi saat Ekspirasi</h4></div>
                        <p>Karbon dioksida dari sel diangkut darah sebagian besar dalam bentuk ion bikarbonat ($HCO_3^-$ ~70%), terikat hemoglobin darah ($HbCO_2$ ~20%), dan larut di plasma darah (~10%).</p>
                        <p>Di kapiler alveolus, terjadi proses <strong>difusi gas</strong> karena perbedaan tekanan parsial: $CO_2$ bergerak dari kapiler darah (tekanan tinggi) menuju rongga alveolus (tekanan rendah). Saat diafragma berelaksasi dan rongga dada mengecil (<strong>ekspirasi</strong>), gas $CO_2$ dan uap air dihembuskan keluar tubuh.</p>
                    </div>

                    <!-- 4. Zat Sisa & 5. Gangguan -->
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">💧</span> <h4>4. Zat Sisa & 5. Gangguan Paru-Paru</h4></div>
                        <div class="two-sub-col">
                            <div>
                                <h5>Zat Sisa yang Dikeluarkan:</h5>
                                <div class="tag-cloud">
                                    <span class="badge-tag-blue">Karbon Dioksida (CO₂)</span>
                                    <span class="badge-tag-blue">Uap Air (H₂O)</span>
                                </div>
                            </div>
                            <div style="margin-top:0.8rem;">
                                <h5>Gangguan & Penyakit Paru-Paru:</h5>
                                <ul class="bullet-list-sm">
                                    <li><strong>Asma:</strong> Penyempitan bronkus akibat hipersensitivitas alergi atau udara dingin.</li>
                                    <li><strong>Bronkitis:</strong> Peradangan mukosa saluran bronkus karena infeksi atau asap rokok.</li>
                                    <li><strong>TBC (Tuberkulosis):</strong> Infeksi bakteri <em>Mycobacterium tuberculosis</em> yang merusak alveolus.</li>
                                    <li><strong>Pneumonia:</strong> Radang alveolus terisi cairan/nanah akibat infeksi bakteri <em>Streptococcus</em>.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 6. INTERAKTIF KHUSUS PARU-PARU -->
                <div class="ekskresi-section" style="margin-top: 1.5rem;">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="activity"></i> Aktivitas Interaktif Paru-Paru</div>
                        <h2>Animasi Difusi Alveolus & Pembuktian Uap Air</h2>
                        <p>Jalankan simulasi pertukaran molekul gas dan buktikan keberadaan uap air pada cermin kaca!</p>
                    </div>

                    <div class="paru-interactive-grid">
                        <!-- Interaktif 1: Animasi Alveolus Tarik vs Buang Napas -->
                        <div class="interactive-box card">
                            <div class="box-title">
                                <i data-lucide="wind"></i>
                                <span>Aktivitas 1: Animasi Aliran O₂ dan CO₂ di Alveolus</span>
                            </div>
                            <p class="box-sub">Klik tombol <strong>Tarik Napas</strong> atau <strong>Buang Napas</strong> untuk mengamati pertukaran molekul:</p>

                            <div class="paru-breath-btns">
                                <button class="btn-breath active" id="btn-tarik-napas" onclick="EkskresiModule.setParuDifusiMode('tarik')">
                                    <i data-lucide="arrow-down-circle"></i>
                                    <span>Tarik Napas (Inspirasi: O₂ Masuk)</span>
                                </button>
                                <button class="btn-breath" id="btn-buang-napas" onclick="EkskresiModule.setParuDifusiMode('buang')">
                                    <i data-lucide="arrow-up-circle"></i>
                                    <span>Buang Napas (Ekspirasi: CO₂ & H₂O Keluar)</span>
                                </button>
                            </div>

                            <div class="alveolus-stage" id="alveolus-stage-anim">
                                <div class="alveolus-sac" id="alveolus-sac">
                                    <span class="sac-label">Rongga Alveolus</span>
                                    <!-- Dynamic gas molecules -->
                                    <div class="gas-particles-wrapper" id="gas-particles-wrapper">
                                        <!-- Molecule elements created in JS -->
                                    </div>
                                </div>
                                <div class="blood-capillary-strip">
                                    <span class="capillary-label">Kapiler Darah Paru-Paru (Eritrosit)</span>
                                    <div class="capillary-flow">
                                        <div class="rbc-cell">Hb</div>
                                        <div class="rbc-cell">Hb</div>
                                        <div class="rbc-cell">Hb</div>
                                    </div>
                                </div>
                            </div>
                            <div class="difusi-explanation-box" id="difusi-explanation-text">
                                <strong>Fase Inspirasi:</strong> Udara bersih kaya Oksigen (O₂) masuk mengisi rongga alveolus. Oksigen berdifusi menembus membran tipis alveolus menuju kapiler darah dan diikat oleh hemoglobin eritrosit.
                            </div>
                        </div>

                        <!-- Interaktif 2: Percobaan Virtual Hembuskan Napas ke Kaca -->
                        <div class="interactive-box card">
                            <div class="box-title">
                                <i data-lucide="mirror"></i>
                                <span>Aktivitas 2: Eksperimen Sederhana Hembusan Napas ke Kaca</span>
                            </div>
                            <p class="box-sub">Buktikan bahwa paru-paru mengeluarkan uap air ($H_2O$) dengan menghembuskan napas ke permukaan cermin!</p>

                            <div class="mirror-experiment-view">
                                <div class="mirror-frame" id="mirror-frame" onclick="EkskresiModule.wipeMirror()">
                                    <div class="mirror-reflection">
                                        <span class="mirror-guide">Cermin Kaca Datar Bening</span>
                                    </div>
                                    <div class="mirror-fog" id="mirror-fog">
                                        <div class="water-drops-grid">
                                            <span>💧</span><span>💧</span><span>💧</span><span>💧</span>
                                        </div>
                                        <span class="fog-text">Kaca Mengembun (Tetesan Uap H₂O)</span>
                                    </div>
                                </div>
                            </div>

                            <div class="mirror-controls">
                                <button class="btn-primary ripple" onclick="EkskresiModule.blowMirror()">
                                    <i data-lucide="wind"></i>
                                    <span>Hembuskan Napas ke Kaca!</span>
                                </button>
                                <button class="btn-nav ripple" onclick="EkskresiModule.wipeMirror()">
                                    <i data-lucide="sparkles"></i>
                                    <span>Usap / Bersihkan Kaca</span>
                                </button>
                            </div>
                            <div class="mirror-fact-box" id="mirror-fact-box">
                                💡 <strong>Fakta Sains:</strong> Mengapa cermin mengembun? Udara hangat dari paru-paru mengandung uap air jenuh ($H_2O$). Saat mengenai permukaan cermin yang suhunya lebih dingin, uap air tersebut mengalami <em>kondensasi (pengembunan)</em> menjadi butiran air cair mikroskopis!
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 7. CEK PEMAHAMAN PARU-PARU (3 Soal Singkat) -->
                <div class="ekskresi-section" style="margin-top: 1.5rem;">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="check-square"></i> Cek Pemahaman</div>
                        <h2>Uji Cepat Materi Paru-Paru</h2>
                        <p>Jawab 3 pertanyaan kilat di bawah ini untuk menguji penguasaanmu:</p>
                    </div>

                    <div class="quiz-mini-grid">
                        ${this.renderMiniQuizItem('paru', 1, 
                            'Dua zat sisa metabolisme yang diekskresikan oleh organ paru-paru adalah...',
                            ['Karbon dioksida (CO₂) dan uap air (H₂O)', 'Karbon monoksida (CO) dan asam urat', 'Oksigen (O₂) dan nitrogen', 'Urea dan garam NaCl'],
                            0,
                            'Tepat sekali! Paru-paru membuang CO₂ dan H₂O yang merupakan hasil sampingan dari respirasi aerobik seluler.'
                        )}
                        ${this.renderMiniQuizItem('paru', 2, 
                            'Tempat spesifik terjadinya proses pertukaran dan difusi gas di dalam paru-paru adalah...',
                            ['Trakea', 'Bronkus utama', 'Alveolus', 'Pleura parietal'],
                            2,
                            'Benar! Alveolus berdinding selapis epitel pipih sangat tipis dan diselubungi kapiler darah sehingga difusi gas berlangsung cepat.'
                        )}
                        ${this.renderMiniQuizItem('paru', 3, 
                            'Saat kita menghembuskan napas ke permukaan kaca dan kaca mengembun, hal tersebut membuktikan bahwa...',
                            ['Udara pernapasan bersuhu sangat dingin', 'Paru-paru mengeluarkan uap air (H₂O)', 'Paru-paru melepaskan minyak kulit', 'Kaca bereaksi dengan oksigen'],
                            1,
                            'Hebat! Pengembunan kaca membuktikan adanya uap air (H₂O) dalam udara ekspirasi paru-paru.'
                        )}
                    </div>
                </div>

                <div class="slide-next-prompt">
                    <span>Lanjutkan eksplorasi ke organ ekskresi ketiga: Hati (Hepar)!</span>
                    <button class="btn-slide-nav-next" onclick="EkskresiModule.navTo(6)">
                        <span>Organ 3: Hati (Hepar)</span>
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    },

    /* =========================================================================
       7. SLIDE 7: ORGAN EKSKRESI 3 - HATI (HEPAR)
       ========================================================================= */
    renderSlideHati() {
        return `
            <div class="ekskresi-fullpage" id="ekskresi-page-hati">
                ${this.renderNavBar(6)}

                <div class="ekskresi-header-banner" style="border-color: #f59e0b;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
                        <div>
                            <span class="banner-badge" style="background:rgba(245,158,11,0.2); color:#fbbf24;"><i data-lucide="activity"></i> Organ Ekskresi 3</span>
                            <h2>HATI (Hepar)</h2>
                            <p>Struktur lobus & kantung empedu, perombakan eritrosit tua, detoksifikasi racun, dan sintesis urea.</p>
                        </div>
                        <div class="organ-nav-quick">
                            <button class="btn-organ-pill" onclick="EkskresiModule.navTo(4)">🧴 Kulit</button>
                            <button class="btn-organ-pill" onclick="EkskresiModule.navTo(5)">🫁 Paru-Paru</button>
                            <button class="btn-organ-pill active">🥩 Hati</button>
                            <button class="btn-organ-pill" onclick="EkskresiModule.navTo(7)">🫘 Ginjal</button>
                        </div>
                    </div>
                </div>

                <!-- 7 Pola Terstruktur: Pengantar, Struktur, Proses, Zat, Gangguan, Interaktif, Cek Pemahaman -->
                <div class="organ-structured-grid">
                    <!-- 1. Pengantar -->
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">📖</span> <h4>1. Pengantar & Peran Ekskresi</h4></div>
                        <p>Hati adalah kelenjar terbesar dalam tubuh manusia dengan bobot sekitar 1,5 kg di rongga perut kanan atas. Hati menjalankan lebih dari 500 fungsi kimiawi!</p>
                        <p>Dalam sistem ekskresi, peran utama hati adalah <strong>merombak sel darah merah (eritrosit) yang telah rusak/tua</strong>, <strong>menetralkan racun (detoksifikasi)</strong>, serta <strong>mengubah amonia beracun menjadi urea</strong> yang aman dibuang oleh ginjal.</p>
                    </div>

                    <!-- 2. Struktur Hati -->
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">🔬</span> <h4>2. Struktur Anatomi Hati</h4></div>
                        <ul class="styled-list">
                            <li><strong>Lobus Kanan & Lobus Kiri:</strong> Bagian utama jaringan parenkim hati yang tersusun atas jutaan sel hepatosit.</li>
                            <li><strong>Kantung Empedu (Vesica Fellea):</strong> Kantung kecil di bawah hati tempat menampung dan memekatkan getah empedu hasil sekresi hepatosit.</li>
                            <li><strong>Saluran Empedu (Duktus Koledokus):</strong> Menyalurkan cairan empedu menuju duodenum (usus dua belas jari).</li>
                            <li><strong>Sel Kupffer (Histiosit):</strong> Sel makrofag khusus pada dinding kapiler sinusoid hati yang bertugas memfagositosis (memakan) eritrosit rusak dan bakteri.</li>
                        </ul>
                    </div>

                    <!-- 3. Proses Ekskresi di Hati -->
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">⚙️</span> <h4>3. Proses Perombakan Eritrosit & Urea</h4></div>
                        <p>Eritrosit memiliki umur sekitar 120 hari. Sel yang sudah tua dihancurkan oleh sel Kupffer di hati. Hemoglobin dipecah menjadi tiga bagian:</p>
                        <ol class="styled-list">
                            <li><strong>Zat Besi (Fe):</strong> Disimpan di hati atau dikirim kembali ke sumsum merah tulang untuk membentuk sel darah baru.</li>
                            <li><strong>Globin:</strong> Didaur ulang menjadi asam amino untuk sintesis protein baru tubuh.</li>
                            <li><strong>Hemin:</strong> Diubah menjadi pigmen hijau <em>biliverdin</em>, lalu menjadi pigmen kuning-oranye <em>bilirubin</em>. Bilirubin dialirkan ke empedu $\rightarrow$ usus besar diubah bakteri menjadi <strong>sterkobilin</strong> (pewarna feses cokelat) dan <strong>urobilin</strong> (pewarna urine kuning).</li>
                        </ol>
                        <p style="margin-top:0.5rem;">Selain itu, amonia ($NH_3$) beracun dari pembongkaran asam amino diubah melalui <strong>siklus ornitin</strong> menjadi <strong>urea</strong> yang jauh lebih aman dan larut air.</p>
                    </div>

                    <!-- 4. Zat Sisa & 5. Gangguan -->
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">💧</span> <h4>4. Zat Sisa & 5. Gangguan Hati</h4></div>
                        <div class="two-sub-col">
                            <div>
                                <h5>Zat Sisa yang Dihasilkan:</h5>
                                <div class="tag-cloud">
                                    <span class="badge-tag-orange">Getah Empedu (Bilirubin & Biliverdin)</span>
                                    <span class="badge-tag-orange">Urea (CO(NH₂)₂)</span>
                                </div>
                            </div>
                            <div style="margin-top:0.8rem;">
                                <h5>Gangguan & Penyakit Hati:</h5>
                                <ul class="bullet-list-sm">
                                    <li><strong>Hepatitis:</strong> Peradangan hati yang umumnya disebabkan oleh virus Hepatitis (A, B, C, D, E) atau racun kimia.</li>
                                    <li><strong>Sirosis Hati:</strong> Kerusakan jaringan hati yang mengeras dan digantikan oleh jaringan parut permanen.</li>
                                    <li><strong>Penyakit Kuning (Jaundice):</strong> Kulit dan bola mata menguning akibat kadar bilirubin menumpuk tinggi dalam darah karena saluran empedu tersumbat atau kerusakan sel hati.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 6. INTERAKTIF KHUSUS HATI -->
                <div class="ekskresi-section" style="margin-top: 1.5rem;">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="git-branch"></i> Aktivitas Interaktif Hati</div>
                        <h2>Diagram Alur Perombakan Eritrosit & Matching Fungsi</h2>
                        <p>Klik langkah alur perombakan sel darah merah rusak dan pasangkan fungsi hati dengan hasilnya!</p>
                    </div>

                    <div class="hati-interactive-grid">
                        <!-- Interaktif 1: Diagram Alur Klik Per Langkah -->
                        <div class="interactive-box card">
                            <div class="box-title">
                                <i data-lucide="git-commit"></i>
                                <span>Aktivitas 1: Alur Sel Darah Merah Rusak sampai Keluar Bersama Feses & Urine</span>
                            </div>
                            <p class="box-sub">Klik tombol langkah 1 sampai 5 untuk melihat transformasi biokimia perombakan eritrosit:</p>

                            <div class="step-nav-buttons">
                                <button class="step-btn active" id="btn-hati-step-1" onclick="EkskresiModule.setHatiStep(1)">1. Eritrosit Tua</button>
                                <button class="step-btn" id="btn-hati-step-2" onclick="EkskresiModule.setHatiStep(2)">2. Hemin Dipecah</button>
                                <button class="step-btn" id="btn-hati-step-3" onclick="EkskresiModule.setHatiStep(3)">3. Jadi Bilirubin</button>
                                <button class="step-btn" id="btn-hati-step-4" onclick="EkskresiModule.setHatiStep(4)">4. Ke Usus Halus</button>
                                <button class="step-btn" id="btn-hati-step-5" onclick="EkskresiModule.setHatiStep(5)">5. Feses & Urine</button>
                            </div>

                            <div class="alur-hati-viewport" id="alur-hati-viewport">
                                ${this.getHatiStepHtml(1)}
                            </div>
                        </div>

                        <!-- Interaktif 2: Matching Fungsi Hati dengan Hasilnya -->
                        <div class="interactive-box card">
                            <div class="box-title">
                                <i data-lucide="link"></i>
                                <span>Aktivitas 2: Pasangkan Fungsi Hati dengan Hasil Senyawanya</span>
                            </div>
                            <p class="box-sub">Klik satu kartu fungsi di sebelah kiri, lalu klik kartu hasil yang sesuai di sebelah kanan:</p>

                            <div class="matching-game-container">
                                <div class="matching-col" id="match-col-left">
                                    <div class="match-item left-item" data-id="hemin" onclick="EkskresiModule.selectMatchLeft('hemin')">
                                        Perombakan senyawa hemin eritrosit
                                    </div>
                                    <div class="match-item left-item" data-id="amonia" onclick="EkskresiModule.selectMatchLeft('amonia')">
                                        Perombakan gas amonia beracun
                                    </div>
                                    <div class="match-item left-item" data-id="racun" onclick="EkskresiModule.selectMatchLeft('racun')">
                                        Penguraian racun hidrogen peroksida (H₂O₂)
                                    </div>
                                    <div class="match-item left-item" data-id="pewarna_feses" onclick="EkskresiModule.selectMatchLeft('pewarna_feses')">
                                        Bilirubin yang mengalami oksidasi di usus besar
                                    </div>
                                </div>

                                <div class="matching-col" id="match-col-right">
                                    <div class="match-item right-item" data-id="amonia" onclick="EkskresiModule.selectMatchRight('amonia')">
                                        Urea (aman disaring ginjal)
                                    </div>
                                    <div class="match-item right-item" data-id="hemin" onclick="EkskresiModule.selectMatchRight('hemin')">
                                        Bilirubin & Biliverdin (empedu)
                                    </div>
                                    <div class="match-item right-item" data-id="pewarna_feses" onclick="EkskresiModule.selectMatchRight('pewarna_feses')">
                                        Sterkobilin (warna cokelat feses)
                                    </div>
                                    <div class="match-item right-item" data-id="racun" onclick="EkskresiModule.selectMatchRight('racun')">
                                        Air (H₂O) dan Gas O₂ (oleh katalase)
                                    </div>
                                </div>
                            </div>
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.8rem;">
                                <span id="matching-feedback-text" style="font-size:0.85rem; font-weight:600; color:#94a3b8;">
                                    Pasangkan semua 4 fungsi di atas!
                                </span>
                                <button class="btn-nav ripple" onclick="EkskresiModule.resetMatchingHati()">Reset Pasangan</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 7. CEK PEMAHAMAN HATI (3 Soal Singkat) -->
                <div class="ekskresi-section" style="margin-top: 1.5rem;">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="check-square"></i> Cek Pemahaman</div>
                        <h2>Uji Cepat Materi Hati</h2>
                        <p>Jawab 3 pertanyaan kilat di bawah ini untuk menguji penguasaanmu:</p>
                    </div>

                    <div class="quiz-mini-grid">
                        ${this.renderMiniQuizItem('hati', 1, 
                            'Pigmen empedu bilirubin dan biliverdin merupakan hasil penguraian dari bagian hemoglobin sel darah merah berupa...',
                            ['Globin', 'Zat besi (Fe)', 'Hemin', 'Asam amino'],
                            2,
                            'Tepat sekali! Hemin dari hemoglobin dioksidasi menjadi biliverdin lalu direduksi menjadi bilirubin (zat warna empedu).'
                        )}
                        ${this.renderMiniQuizItem('hati', 2, 
                            'Mengapa senyawa amonia (NH₃) sisa pembongkaran protein harus diubah menjadi urea oleh hati?',
                            ['Karena amonia sangat beracun bagi sel saraf & otak', 'Agar urine berbau wangi', 'Karena amonia tidak dapat larut dalam cairan tubuh', 'Untuk memicu rasa lapar'],
                            0,
                            'Benar! Amonia bersifat sangat toksik. Hati mengubahnya menjadi urea yang jauh lebih aman untuk dialirkan lewat darah ke ginjal.'
                        )}
                        ${this.renderMiniQuizItem('hati', 3, 
                            'Penyakit kuning (jaundice) terjadi akibat penumpukan zat warna berlebih di dalam darah yang disebut...',
                            ['Melanin', 'Bilirubin', 'Klorofil', 'Hemoglobin'],
                            1,
                            'Hebat! Penumpukan pigmen bilirubin akibat kerusakan sel hati atau sumbatan saluran empedu menyebabkan kulit dan sklera mata menguning.'
                        )}
                    </div>
                </div>

                <div class="slide-next-prompt">
                    <span>Lanjutkan ke organ ekskresi utama: Ginjal (Bagian 1: Struktur Nefron)!</span>
                    <button class="btn-slide-nav-next" onclick="EkskresiModule.navTo(7)">
                        <span>Organ 4: Ginjal (Struktur Nefron)</span>
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    },

    /* =========================================================================
       8. SLIDE 8: ORGAN EKSKRESI 4 - GINJAL (STRUKTUR NEFRON)
       ========================================================================= */
    renderSlideGinjalStruktur() {
        return `
            <div class="ekskresi-fullpage" id="ekskresi-page-ginjal-struktur">
                ${this.renderNavBar(7)}

                <div class="ekskresi-header-banner" style="border-color: #8b5cf6;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
                        <div>
                            <span class="banner-badge" style="background:rgba(139,92,246,0.2); color:#c084fc;"><i data-lucide="git-commit"></i> Organ Ekskresi 4 (Bagian 1)</span>
                            <h2>GINJAL: Struktur & Anatomi Nefron</h2>
                            <p>Struktur makroskopis ginjal, pelvis, ureter, serta jutaan unit fungsional penyaring darah (Nefron).</p>
                        </div>
                        <div class="organ-nav-quick">
                            <button class="btn-organ-pill" onclick="EkskresiModule.navTo(4)">🧴 Kulit</button>
                            <button class="btn-organ-pill" onclick="EkskresiModule.navTo(5)">🫁 Paru-Paru</button>
                            <button class="btn-organ-pill" onclick="EkskresiModule.navTo(6)">🥩 Hati</button>
                            <button class="btn-organ-pill active">🫘 Ginjal</button>
                        </div>
                    </div>
                </div>

                <div class="organ-structured-grid">
                    <!-- Pengantar Ginjal -->
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">📖</span> <h4>1. Pengantar & Peran Ginjal</h4></div>
                        <p>Ginjal adalah organ ekskresi utama manusia berjumlah sepasang berbentuk kacang merah di bagian pinggang kanan dan kiri tulang belakang. Ginjal menyaring sekitar <strong>180 liter darah</strong> setiap harinya untuk membuang limbah nitrogen (urea, asam urat, amonia) dan mempertahankan keseimbangan air dan elektrolit darah.</p>
                    </div>

                    <!-- Struktur Makroskopis -->
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">🔬</span> <h4>2. Struktur Makroskopis Ginjal</h4></div>
                        <ul class="styled-list">
                            <li><strong>Korteks Renalis (Kulit Ginjal):</strong> Lapisan terluar yang mengandung jutaan badan Malpighi dan tubulus nefron.</li>
                            <li><strong>Medula Renalis (Sumsum Ginjal):</strong> Lapisan tengah berbentuk kerucut piramida (*pyramis renalis*) tempat berjalannya lengkung Henle dan tubulus kolektivus.</li>
                            <li><strong>Pelvis Renalis (Rongga Ginjal):</strong> Ruang corong penampung urine sebelum dialirkan ke Ureter $\rightarrow$ Kandung Kemih (Vesica Urinaria) $\rightarrow$ Uretra.</li>
                        </ul>
                    </div>

                    <!-- Struktur Mikroskopis: Nefron -->
                    <div class="info-block card" style="grid-column: 1 / -1;">
                        <div class="ib-header"><span class="ib-icon">🧬</span> <h4>3. Unit Fungsional Mikroskopis: NEFRON (~1 Juta per Ginjal)</h4></div>
                        <div class="nefron-parts-list-grid">
                            <div class="nefron-p-card">
                                <h5>1. Glomerulus</h5>
                                <p>Anyaman pembuluh kapiler darah bertekanan tinggi dengan pori-pori mikroskopis untuk menyaring darah.</p>
                            </div>
                            <div class="nefron-p-card">
                                <h5>2. Kapsul Bowman</h5>
                                <p>Mangkuk berdinding ganda melingkupi glomerulus. Kapsul Bowman + Glomerulus = <strong>Badan Malpighi</strong>.</p>
                            </div>
                            <div class="nefron-p-card">
                                <h5>3. Tubulus Kontortus Proksimal (TKP)</h5>
                                <p>Saluran berkelok pertama, tempat penyerapan kembali zat berguna (100% glukosa & asam amino).</p>
                            </div>
                            <div class="nefron-p-card">
                                <h5>4. Lengkung Henle (Ansa Henle)</h5>
                                <p>Saluran berbentuk huruf U menjorok ke medula, mengatur keseimbangan air dan ion garam.</p>
                            </div>
                            <div class="nefron-p-card">
                                <h5>5. Tubulus Kontortus Distal (TKD)</h5>
                                <p>Saluran berkelok kedua, tempat pelepasan zat buangan berlebih (augmentasi).</p>
                            </div>
                            <div class="nefron-p-card">
                                <h5>6. Tubulus Kolektivus</h5>
                                <p>Pipa pengumpul yang menyalurkan urine sesungguhnya menuju pelvis ginjal.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- INTERAKTIF: DRAG AND DROP LABELING NEFRON -->
                <div class="ekskresi-section" style="margin-top: 1.5rem;">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="tag"></i> Aktivitas Interaktif Nefron</div>
                        <h2>Labeling Anatomi Nefron Ginjal</h2>
                        <p>Pasangkan nama bagian nefron pada kotak label yang sesuai pada diagram di bawah ini:</p>
                    </div>

                    <div class="nefron-interactive-card card">
                        <div class="nefron-diagram-wrapper">
                            <svg viewBox="0 0 520 280" class="nefron-svg-diagram">
                                <!-- Background zones -->
                                <rect x="10" y="10" width="500" height="150" fill="#f5f3ff" rx="8" stroke="#ddd6fe" stroke-width="1.5"/>
                                <text x="20" y="32" fill="#5b21b6" font-size="12" font-weight="800">ZONA KORTEKS GINJAL</text>
                                
                                <rect x="10" y="165" width="500" height="105" fill="#fffbeb" rx="8" stroke="#fde68a" stroke-width="1.5"/>
                                <text x="20" y="187" fill="#92400e" font-size="12" font-weight="800">ZONA MEDULA GINJAL</text>

                                <!-- Glomerulus & Bowman -->
                                <circle cx="85" cy="80" r="28" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
                                <path d="M 60 70 Q 75 90 90 75 T 105 85" stroke="#dc2626" stroke-width="3" fill="none"/>
                                <path d="M 60 85 C 60 115 110 115 110 85 C 110 55 60 55 60 85" fill="none" stroke="#d97706" stroke-width="2.5"/>

                                <!-- TKP Loop -->
                                <path d="M 110 85 Q 140 60 170 85 T 200 80 T 220 110" fill="none" stroke="#059669" stroke-width="6" stroke-linecap="round"/>

                                <!-- Loop of Henle descending & ascending -->
                                <path d="M 220 110 L 220 230 Q 240 250 260 230 L 260 110" fill="none" stroke="#2563eb" stroke-width="5" stroke-linecap="round"/>

                                <!-- TKD Loop -->
                                <path d="M 260 110 Q 300 70 340 90 T 380 80 T 410 95" fill="none" stroke="#db2777" stroke-width="6" stroke-linecap="round"/>

                                <!-- Collecting duct -->
                                <line x1="410" y1="35" x2="410" y2="255" stroke="#ca8a04" stroke-width="9" stroke-linecap="round"/>
                                <line x1="410" y1="95" x2="430" y2="95" stroke="#db2777" stroke-width="5"/>
                                <text x="420" y="270" fill="#854d0e" font-size="12" font-weight="800">Menuju Pelvis ➔</text>
                            </svg>

                            <!-- Interactive Drop Pins -->
                            <div class="nefron-pin-slot" style="top: 24%; left: 16%;" data-target="badan_malpighi" id="slot-nefron-1">
                                <span class="slot-num">1</span>
                                <span class="slot-val">Pilih Bagian</span>
                            </div>

                            <div class="nefron-pin-slot" style="top: 18%; left: 36%;" data-target="tkp" id="slot-nefron-2">
                                <span class="slot-num">2</span>
                                <span class="slot-val">Pilih Bagian</span>
                            </div>

                            <div class="nefron-pin-slot" style="top: 75%; left: 46%;" data-target="henle" id="slot-nefron-3">
                                <span class="slot-num">3</span>
                                <span class="slot-val">Pilih Bagian</span>
                            </div>

                            <div class="nefron-pin-slot" style="top: 20%; left: 66%;" data-target="tkd" id="slot-nefron-4">
                                <span class="slot-num">4</span>
                                <span class="slot-val">Pilih Bagian</span>
                            </div>

                            <div class="nefron-pin-slot" style="top: 45%; left: 83%;" data-target="kolektivus" id="slot-nefron-5">
                                <span class="slot-num">5</span>
                                <span class="slot-val">Pilih Bagian</span>
                            </div>
                        </div>

                        <!-- Dropdown Selectors -->
                        <div class="nefron-select-panel">
                            <h4>Cocokkan Label Nomor 1 sampai 5:</h4>
                            <div class="nefron-sel-row">
                                <div class="n-sel-col">
                                    <label>Nomor 1 (Glomerulus + Kapsul Bowman):</label>
                                    <select class="ekskresi-select" onchange="EkskresiModule.setNefronLabel(1, this.value)">
                                        <option value="">-- Pilih --</option>
                                        <option value="badan_malpighi">Badan Malpighi</option>
                                        <option value="tkp">Tubulus Kontortus Proksimal (TKP)</option>
                                        <option value="henle">Lengkung Henle</option>
                                        <option value="tkd">Tubulus Kontortus Distal (TKD)</option>
                                        <option value="kolektivus">Tubulus Kolektivus</option>
                                    </select>
                                </div>
                                <div class="n-sel-col">
                                    <label>Nomor 2 (Saluran berkelok pertama):</label>
                                    <select class="ekskresi-select" onchange="EkskresiModule.setNefronLabel(2, this.value)">
                                        <option value="">-- Pilih --</option>
                                        <option value="badan_malpighi">Badan Malpighi</option>
                                        <option value="tkp">Tubulus Kontortus Proksimal (TKP)</option>
                                        <option value="henle">Lengkung Henle</option>
                                        <option value="tkd">Tubulus Kontortus Distal (TKD)</option>
                                        <option value="kolektivus">Tubulus Kolektivus</option>
                                    </select>
                                </div>
                                <div class="n-sel-col">
                                    <label>Nomor 3 (Saluran berbentuk U ke medula):</label>
                                    <select class="ekskresi-select" onchange="EkskresiModule.setNefronLabel(3, this.value)">
                                        <option value="">-- Pilih --</option>
                                        <option value="badan_malpighi">Badan Malpighi</option>
                                        <option value="tkp">Tubulus Kontortus Proksimal (TKP)</option>
                                        <option value="henle">Lengkung Henle</option>
                                        <option value="tkd">Tubulus Kontortus Distal (TKD)</option>
                                        <option value="kolektivus">Tubulus Kolektivus</option>
                                    </select>
                                </div>
                                <div class="n-sel-col">
                                    <label>Nomor 4 (Saluran berkelok kedua):</label>
                                    <select class="ekskresi-select" onchange="EkskresiModule.setNefronLabel(4, this.value)">
                                        <option value="">-- Pilih --</option>
                                        <option value="badan_malpighi">Badan Malpighi</option>
                                        <option value="tkp">Tubulus Kontortus Proksimal (TKP)</option>
                                        <option value="henle">Lengkung Henle</option>
                                        <option value="tkd">Tubulus Kontortus Distal (TKD)</option>
                                        <option value="kolektivus">Tubulus Kolektivus</option>
                                    </select>
                                </div>
                                <div class="n-sel-col">
                                    <label>Nomor 5 (Saluran pengumpul lurus):</label>
                                    <select class="ekskresi-select" onchange="EkskresiModule.setNefronLabel(5, this.value)">
                                        <option value="">-- Pilih --</option>
                                        <option value="badan_malpighi">Badan Malpighi</option>
                                        <option value="tkp">Tubulus Kontortus Proksimal (TKP)</option>
                                        <option value="henle">Lengkung Henle</option>
                                        <option value="tkd">Tubulus Kontortus Distal (TKD)</option>
                                        <option value="kolektivus">Tubulus Kolektivus</option>
                                    </select>
                                </div>
                            </div>
                            <div style="margin-top: 1rem; display:flex; gap:0.8rem; align-items:center;">
                                <button class="btn-primary ripple" onclick="EkskresiModule.checkNefronLabeling()">Periksa Jawaban</button>
                                <span id="nefron-feedback-text" style="font-weight:600; font-size:0.9rem;"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CEK PEMAHAMAN NEFRON (3 Soal Singkat) -->
                <div class="ekskresi-section" style="margin-top: 1.5rem;">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="check-square"></i> Cek Pemahaman</div>
                        <h2>Uji Cepat Struktur Nefron Ginjal</h2>
                        <p>Jawab 3 pertanyaan kilat di bawah ini:</p>
                    </div>

                    <div class="quiz-mini-grid">
                        ${this.renderMiniQuizItem('ginjalStruktur', 1, 
                            'Dua struktur nefron yang bersatu menyusun Badan Malpighi adalah...',
                            ['Glomerulus dan Kapsul Bowman', 'TKP dan TKD', 'Lengkung Henle dan Tubulus Kolektivus', 'Korteks dan Medula'],
                            0,
                            'Tepat sekali! Glomerulus (anyaman kapiler darah) dibungkus oleh Kapsul Bowman membentuk Badan Malpighi.'
                        )}
                        ${this.renderMiniQuizItem('ginjalStruktur', 2, 
                            'Saluran berbentuk huruf U yang membentang menembus ke dalam lapisan medula ginjal adalah...',
                            ['Tubulus kontortus proksimal', 'Lengkung Henle', 'Tubulus kolektivus', 'Ureter'],
                            1,
                            'Benar! Lengkung Henle (Ansa Henle) berbentuk U dengan bagian desenden (turun) dan asenden (naik).'
                        )}
                        ${this.renderMiniQuizItem('ginjalStruktur', 3, 
                            'Bagian corong rongga ginjal yang menampung aliran urine dari seluruh tubulus kolektivus sebelum dialirkan ke ureter adalah...',
                            ['Korteks', 'Kapsul Bowman', 'Pelvis Renalis', 'Kandung Kemih'],
                            2,
                            'Hebat! Pelvis Renalis (rongga ginjal) bertindak sebagai muara corong utama sebelum urine mengalir melalui saluran ureter.'
                        )}
                    </div>
                </div>

                <div class="slide-next-prompt">
                    <span>Lanjutkan ke tahap penting berikutnya: Proses 3 Tahap Pembentukan Urine!</span>
                    <button class="btn-slide-nav-next" onclick="EkskresiModule.navTo(8)">
                        <span>Organ 4: Pembentukan Urine & Regulasi Cairan</span>
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    },

    /* =========================================================================
       9. SLIDE 9: ORGAN EKSKRESI 4 - GINJAL (PROSES URINE & REGULASI)
       ========================================================================= */
    renderSlideGinjalProses() {
        return `
            <div class="ekskresi-fullpage" id="ekskresi-page-ginjal-proses">
                ${this.renderNavBar(8)}

                <div class="ekskresi-header-banner" style="border-color: #8b5cf6;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
                        <div>
                            <span class="banner-badge" style="background:rgba(139,92,246,0.2); color:#c084fc;"><i data-lucide="droplet"></i> Organ Ekskresi 4 (Bagian 2)</span>
                            <h2>GINJAL: 3 Tahap Pembentukan Urine & Regulasi Cairan</h2>
                            <p>Filtrasi, Reabsorpsi, Augmentasi, Pengaruh Hormon ADH, serta Gangguan / Penyakit Ginjal.</p>
                        </div>
                        <div class="organ-nav-quick">
                            <button class="btn-organ-pill" onclick="EkskresiModule.navTo(4)">🧴 Kulit</button>
                            <button class="btn-organ-pill" onclick="EkskresiModule.navTo(5)">🫁 Paru-Paru</button>
                            <button class="btn-organ-pill" onclick="EkskresiModule.navTo(6)">🥩 Hati</button>
                            <button class="btn-organ-pill active">🫘 Ginjal</button>
                        </div>
                    </div>
                </div>

                <!-- 3 TAHAP UTAMA PEMBENTUKAN URINE (TABEL RESUME) -->
                <div class="ekskresi-section">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="list"></i> Rangkuman Materi Utama</div>
                        <h2>Tiga Tahap Pembentukan Urine di Nefron</h2>
                        <p>Hafalkan urutan tempat, proses, dan hasil filtrat pada tabel berikut:</p>
                    </div>

                    <div class="table-responsive">
                        <table class="ekskresi-table">
                            <thead>
                                <tr>
                                    <th>Tahap</th>
                                    <th>Tempat Terjadi</th>
                                    <th>Mekanisme Proses</th>
                                    <th>Filtrat yang Dihasilkan</th>
                                    <th>Kandungan Zat</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong class="text-s1">1. Filtrasi</strong><br>(Penyaringan)</td>
                                    <td>Glomerulus & Kapsul Bowman</td>
                                    <td>Penyaringan darah bertekanan tinggi. Sel darah dan protein besar tertahan di kapiler darah.</td>
                                    <td><span class="badge-tag-blue">Urine Primer</span><br>(Filtrat Glomerulus)</td>
                                    <td>Air, glukosa, asam amino, garam, urea. (<em>TIDAK ADA sel darah & protein darah!</em>)</td>
                                </tr>
                                <tr>
                                    <td><strong class="text-s1">2. Reabsorpsi</strong><br>(Penyerapan Kembali)</td>
                                    <td>Tubulus Kontortus Proksimal (TKP) & Lengkung Henle</td>
                                    <td>Zat berguna diserap kembali secara aktif/pasif ke kapiler darah peritubuler: 100% glukosa & asam amino diserap di TKP.</td>
                                    <td><span class="badge-tag-green">Urine Sekunder</span><br>(Filtrat Tubulus)</td>
                                    <td>Air, garam, urea, asam urat, zat warna empedu. (<em>TIDAK BOLEH ADA glukosa/asam amino pada orang sehat!</em>)</td>
                                </tr>
                                <tr>
                                    <td><strong class="text-s1">3. Augmentasi</strong><br>(Pengumpulan / Pembuangan)</td>
                                    <td>Tubulus Kontortus Distal (TKD) & Tubulus Kolektivus</td>
                                    <td>Penambahan zat sisa berlebih dari kapiler ke dalam filtrat (ion H⁺, K⁺, sisa obat antibiotik, amonia, kreatinin).</td>
                                    <td><span class="badge-tag-orange">Urine Sesungguhnya</span><br>(Urine Final)</td>
                                    <td>Air (~95%), urea (~2%), garam, pigmen urobilin, amonia, asam urat. Dialirkan ke kandung kemih.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- GANGGUAN / PENYAKIT PADA GINJAL -->
                <div class="organ-structured-grid" style="margin-top: 1.5rem;">
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">⚠️</span> <h4>Batu Ginjal (Nefrolitiasis)</h4></div>
                        <p>Terbentuknya kristal endapan garam kalsium oksalat atau asam urat di dalam rongga ginjal (pelvis) atau saluran ureter. Menyebabkan rasa nyeri luar biasa saat kencing dan dapat memicu urine berdarah (hematuria).</p>
                    </div>
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">⚠️</span> <h4>Nefritis</h4></div>
                        <p>Peradangan pada nefron (khususnya glomerulus) akibat infeksi bakteri <em>Streptococcus</em>. Akibatnya, pori glomerulus rusak sehingga protein darah bocor ke urine dan menyebabkan pembengkakan tubuh (edema).</p>
                    </div>
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">⚠️</span> <h4>Gagal Ginjal</h4></div>
                        <p>Kondisi saat kedua ginjal kehilangan kemampuan menyaring limbah metabolisme secara memadai. Penderita memerlukan tindakan cuci darah rutin (<strong>hemodialisis</strong>) atau transplantasi ginjal.</p>
                    </div>
                    <div class="info-block card">
                        <div class="ib-header"><span class="ib-icon">⚠️</span> <h4>Diabetes Insipidus</h4></div>
                        <p>Penyakit akibat <strong>kekurangan hormon ADH (Antidiuretic Hormone)</strong> dari kelenjar hipofisis. Akibatnya penyerapan air di tubulus ginjal gagal, penderita buang air kecil sangat sering (hingga 20-30 liter/hari) dan selalu dehidrasi.</p>
                    </div>
                </div>

                <!-- INTERAKTIF: ANIMASI 3 TAHAP & LAB BANYAK VS SEDIKIT MINUM -->
                <div class="ekskresi-section" style="margin-top: 1.5rem;">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="sliders"></i> Aktivitas Interaktif Ginjal</div>
                        <h2>Animasi 3 Tahap & Lab Simulasi Hidrasi Urine</h2>
                        <p>Pelajari visualisasi tahapan filtrasi-reabsorpsi-augmentasi dan eksplorasi pengaruh jumlah minum air terhadap volume dan warna urine!</p>
                    </div>

                    <div class="ginjal-interactive-grid">
                        <!-- Interaktif 1: Animasi 3 Tahap Pembentukan Urine -->
                        <div class="interactive-box card">
                            <div class="box-title">
                                <i data-lucide="layers"></i>
                                <span>Aktivitas 1: Animasi 3 Tahap Pembentukan Urine</span>
                            </div>
                            <p class="box-sub">Pilih salah satu tombol tahap di bawah untuk melihat proses dinamisnya:</p>

                            <div class="stage-step-bar">
                                <button class="btn-stage-step active" id="btn-u-stage-1" onclick="EkskresiModule.setUrineStage(1)">
                                    <span>1. Filtrasi (Glomerulus)</span>
                                </button>
                                <button class="btn-stage-step" id="btn-u-stage-2" onclick="EkskresiModule.setUrineStage(2)">
                                    <span>2. Reabsorpsi (TKP)</span>
                                </button>
                                <button class="btn-stage-step" id="btn-u-stage-3" onclick="EkskresiModule.setUrineStage(3)">
                                    <span>3. Augmentasi (TKD)</span>
                                </button>
                            </div>

                            <div class="urine-anim-view" id="urine-anim-view">
                                ${this.getUrineStageHtml(1)}
                            </div>
                        </div>

                        <!-- Interaktif 2: Lab Simulasi Banyak vs Sedikit Minum -->
                        <div class="interactive-box card">
                            <div class="box-title">
                                <i data-lucide="flask-conical"></i>
                                <span>Aktivitas 2: Lab Simulasi Hidrasi (Banyak vs Sedikit Minum)</span>
                            </div>
                            <p class="box-sub">Geser slider asupan air untuk melihat respon hormon ADH, volume, dan warna urine:</p>

                            <div class="hydration-control-group">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <label style="font-weight:700;">Asupan Air Minum Harian:</label>
                                    <span class="hyd-val-badge" id="hyd-glasses-text">4 Gelas / Hari</span>
                                </div>
                                <input type="range" min="1" max="8" value="4" step="1" class="ekskresi-slider" id="slider-hydration" oninput="EkskresiModule.setHydrationLevel(this.value)">
                                <div class="hyd-scale-ticks">
                                    <span>1 Gelas (Dehidrasi Berat)</span>
                                    <span>4 Gelas (Kurang)</span>
                                    <span>8 Gelas (Optimal Sehat)</span>
                                </div>
                            </div>

                            <!-- Laboratory Flask Visualization -->
                            <div class="hyd-results-panel">
                                <div class="flask-visual-col">
                                    <div class="urine-flask">
                                        <div class="flask-liquid" id="flask-liquid-fill" style="height: 50%; background: #facc15;"></div>
                                        <span class="flask-ml-badge" id="flask-ml-text">1.200 mL</span>
                                    </div>
                                    <small style="margin-top:0.3rem; color:var(--text-muted);">Labu Ukur Urine / 24 Jam</small>
                                </div>

                                <div class="hyd-metrics-col">
                                    <div class="hyd-stat-card">
                                        <span class="st-lbl">Kadar Hormon ADH:</span>
                                        <span class="st-val" id="stat-adh-text" style="color:#38bdf8;">Sedang (Stabil)</span>
                                        <small id="stat-adh-sub">Menyerap air cukup seimbang</small>
                                    </div>
                                    <div class="hyd-stat-card">
                                        <span class="st-lbl">Warna & Kepekatan Urine:</span>
                                        <span class="st-val" id="stat-color-text" style="color:#eab308;">Kuning Cerah</span>
                                        <small id="stat-color-sub">Kadar urobilin normal</small>
                                    </div>
                                    <div class="hyd-stat-card">
                                        <span class="st-lbl">Status Hidrasi Tubuh:</span>
                                        <span class="st-val" id="stat-status-text" style="color:#10b981;">Cukup Terhidrasi</span>
                                        <small id="stat-status-sub">Pertahankan asupan air harian</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CEK PEMAHAMAN GINJAL PROSES (3 Soal Singkat) -->
                <div class="ekskresi-section" style="margin-top: 1.5rem;">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="check-square"></i> Cek Pemahaman</div>
                        <h2>Uji Cepat Pembentukan Urine & Regulasi</h2>
                        <p>Jawab 3 pertanyaan kilat di bawah ini:</p>
                    </div>

                    <div class="quiz-mini-grid">
                        ${this.renderMiniQuizItem('ginjalProses', 1, 
                            'Kandungan zat yang terdapat pada urine primer tetapi sudah tidak ditemukan lagi pada urine sekunder orang sehat adalah...',
                            ['Air dan garam mineral', 'Urea dan asam urat', 'Glukosa dan asam amino', 'Urobilin'],
                            2,
                            'Tepat sekali! Glukosa dan asam amino 100% diserap kembali pada tahap reabsorpsi di Tubulus Kontortus Proksimal (TKP).'
                        )}
                        ${this.renderMiniQuizItem('ginjalProses', 2, 
                            'Tahap pelepasan ion berlebih (H⁺, K⁺) dan sisa obat-obatan dari kapiler ke dalam tubulus distal disebut...',
                            ['Filtrasi', 'Reabsorpsi', 'Augmentasi', 'Inspirasi'],
                            2,
                            'Benar! Tahap Augmentasi terjadi di TKD untuk membuang sisa racun dan obat menjadi urine sesungguhnya.'
                        )}
                        ${this.renderMiniQuizItem('ginjalProses', 3, 
                            'Seorang pasien mengeluarkan urine dalam jumlah sangat melimpah (hingga 20 liter/hari) dan sering haus. Pasien ini menderita...',
                            ['Batu ginjal', 'Nefritis', 'Diabetes insipidus', 'Biang keringat'],
                            2,
                            'Hebat! Diabetes Insipidus disebabkan oleh kekurangan hormon Antidiuretik (ADH), menyebabkan reabsorpsi air di tubulus ginjal gagal total.'
                        )}
                    </div>
                </div>

                <div class="slide-next-prompt">
                    <span>Lanjutkan ke tantangan latihan interaktif komprehensif!</span>
                    <button class="btn-slide-nav-next" onclick="EkskresiModule.navTo(9)">
                        <span>Slide Latihan Interaktif</span>
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    },

    /* =========================================================================
       10. SLIDE 10: LATIHAN INTERAKTIF - TANTANGAN MATRIX & KASUS MEDIS
       ========================================================================= */
    renderSlideLatihan() {
        return `
            <div class="ekskresi-fullpage" id="ekskresi-page-latihan">
                ${this.renderNavBar(9)}

                <div class="ekskresi-header-banner" style="border-color: #3b82f6;">
                    <span class="banner-badge" style="background:rgba(59,130,246,0.2); color:#60a5fa;"><i data-lucide="puzzle"></i> Latihan Interaktif</span>
                    <h2>Tantangan Asah Nalar Sistem Ekskresi</h2>
                    <p>Uji pemahaman integratifmu melalui tebak matriks organ dan analisis kasus detektif medis IPA!</p>
                </div>

                <!-- TANTANGAN 1: MATRIKS ORGAN EKSKRESI -->
                <div class="ekskresi-section">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="table"></i> Tantangan 1</div>
                        <h2>Matriks Organ, Zat Sisa, dan Gangguan</h2>
                        <p>Lengkapi pilihan pada sel tabel berikut untuk mendapatkan 100 Poin!</p>
                    </div>

                    <div class="table-responsive card">
                        <table class="ekskresi-table">
                            <thead>
                                <tr>
                                    <th>Organ Ekskresi</th>
                                    <th>Bagian / Unit Pelaksana</th>
                                    <th>Zat Sisa yang Dikeluarkan</th>
                                    <th>Gangguan / Penyakit Terkait</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>1. Kulit</strong></td>
                                    <td>
                                        <select class="ekskresi-select" id="mat-sel-1">
                                            <option value="">-- Pilih --</option>
                                            <option value="kelenjar_keringat">Kelenjar Keringat (Dermis)</option>
                                            <option value="alveolus">Alveolus</option>
                                            <option value="nefron">Nefron</option>
                                        </select>
                                    </td>
                                    <td>Air, Garam (NaCl), sedikit Urea</td>
                                    <td>
                                        <select class="ekskresi-select" id="mat-sel-2">
                                            <option value="">-- Pilih --</option>
                                            <option value="biang_keringat">Biang Keringat & Jerawat</option>
                                            <option value="batu_ginjal">Batu Ginjal</option>
                                            <option value="asma">Asma</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>2. Paru-Paru</strong></td>
                                    <td>Alveolus & Saluran Pernapasan</td>
                                    <td>
                                        <select class="ekskresi-select" id="mat-sel-3">
                                            <option value="">-- Pilih --</option>
                                            <option value="co2_h2o">CO₂ dan Uap Air (H₂O)</option>
                                            <option value="empedu">Getah Empedu</option>
                                            <option value="feses">Feses</option>
                                        </select>
                                    </td>
                                    <td>Asma, Bronkitis, TBC, Pneumonia</td>
                                </tr>
                                <tr>
                                    <td><strong>3. Hati</strong></td>
                                    <td>Sel Kupffer & Kantung Empedu</td>
                                    <td>
                                        <select class="ekskresi-select" id="mat-sel-4">
                                            <option value="">-- Pilih --</option>
                                            <option value="empedu_urea">Getah Empedu (Bilirubin) & Urea</option>
                                            <option value="keringat">Keringat & Garam</option>
                                            <option value="air_liur">Air Liur</option>
                                        </select>
                                    </td>
                                    <td>Hepatitis, Sirosis, Sakit Kuning</td>
                                </tr>
                                <tr>
                                    <td><strong>4. Ginjal</strong></td>
                                    <td>
                                        <select class="ekskresi-select" id="mat-sel-5">
                                            <option value="">-- Pilih --</option>
                                            <option value="nefron">Nefron (Glomerulus, Tubulus)</option>
                                            <option value="kulit_ari">Stratum Korneum</option>
                                            <option value="trakea">Trakea</option>
                                        </select>
                                    </td>
                                    <td>Urine (Air, Urea, Asam Urat, Garam)</td>
                                    <td>Batu Ginjal, Nefritis, Gagal Ginjal</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="margin-top:1rem; display:flex; gap:0.8rem; align-items:center;">
                        <button class="btn-primary ripple" onclick="EkskresiModule.checkMatrixChallenge()">
                            <i data-lucide="check-circle"></i>
                            <span>Periksa Matriks</span>
                        </button>
                        <span id="matriks-feedback-text" style="font-weight:700; font-size:0.9rem;"></span>
                    </div>
                </div>

                <!-- TANTANGAN 2: KASUS DETEKTIF MEDIS IPA -->
                <div class="ekskresi-section" style="margin-top: 1.5rem;">
                    <div class="sec-header">
                        <div class="sec-badge"><i data-lucide="search"></i> Tantangan 2</div>
                        <h2>Studi Kasus Detektif Medis IPA</h2>
                        <p>Analisis gejala klinis berikut menggunakan konsep sistem ekskresi yang sudah kamu pelajari:</p>
                    </div>

                    <div class="case-study-grid">
                        <!-- Kasus 1 -->
                        <div class="case-card card">
                            <span class="case-badge">Kasus A: Hasil Laboratorium Urine</span>
                            <h4>Uji Glukosa Positif pada Urine Pasien</h4>
                            <p>
                                Seorang pasien menjalani uji laboratorium urine. Sampel urine ditetesi larutan <strong>Benedict</strong> lalu dipanaskan, 
                                dan hasilnya berubah warna menjadi <strong>merah bata</strong> (menandakan adanya kandungan glukosa).
                            </p>
                            <p class="case-question">Pada orang sehat, glukosa seharusnya diserap kembali di bagian nefron mana?</p>
                            <div class="case-options" data-case="c1">
                                <button class="btn-case-opt" onclick="EkskresiModule.answerCase('c1', 'A')">
                                    <span>A. Glomerulus saat tahap filtrasi</span>
                                </button>
                                <button class="btn-case-opt" onclick="EkskresiModule.answerCase('c1', 'B')">
                                    <span>B. Tubulus Kontortus Proksimal (TKP) saat tahap reabsorpsi</span>
                                </button>
                                <button class="btn-case-opt" onclick="EkskresiModule.answerCase('c1', 'C')">
                                    <span>C. Tubulus Kolektivus saat tahap augmentasi</span>
                                </button>
                            </div>
                            <div class="case-feedback-box hidden" id="case-fb-c1"></div>
                        </div>

                        <!-- Kasus 2 -->
                        <div class="case-card card">
                            <span class="case-badge">Kasus B: Bertahan di Udara Dingin</span>
                            <h4>Mengapa di Puncak Gunung Sering Kencing tapi Jarang Berkeringat?</h4>
                            <p>
                                Saat berkemah di dataran tinggi yang bersuhu sangat dingin (10°C), para pendaki merasakan keinginan buang air kecil lebih sering, 
                                namun kulit mereka hampir tidak mengeluarkan keringat sama sekali.
                            </p>
                            <p class="case-question">Bagaimana penjelasan mekanisme ekskresi terkait peristiwa ini?</p>
                            <div class="case-options" data-case="c2">
                                <button class="btn-case-opt" onclick="EkskresiModule.answerCase('c2', 'A')">
                                    <span>A. Kapiler kulit menyempit untuk menahan panas, keringat ditekan, sehingga kelebihan cairan dialihkan dibuang melalui ginjal.</span>
                                </button>
                                <button class="btn-case-opt" onclick="EkskresiModule.answerCase('c2', 'B')">
                                    <span>B. Udara dingin membekukan kelenjar empedu di hati sehingga ginjal bekerja dua kali lipat.</span>
                                </button>
                                <button class="btn-case-opt" onclick="EkskresiModule.answerCase('c2', 'C')">
                                    <span>C. Paru-paru berhenti membuang karbon dioksida sehingga dialihkan ke urine.</span>
                                </button>
                            </div>
                            <div class="case-feedback-box hidden" id="case-fb-c2"></div>
                        </div>
                    </div>
                </div>

                <div class="slide-next-prompt">
                    <span>Lanjutkan ke Lembar Kerja Peserta Didik (LKPD):</span>
                    <button class="btn-slide-nav-next" onclick="EkskresiModule.navTo('ekskresi-lkpd')">
                        <span>LKPD Interaktif (Mode 1-4 Kelompok)</span>
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    },

    /* =========================================================================
       11. SLIDE 11: LKPD INTERAKTIF SISTEM EKSKRESI (MODE 1 - 4 KELOMPOK)
       ========================================================================= */
    renderSlideLKPD() {
        return `
            <div class="ekskresi-fullpage" id="ekskresi-page-lkpd" style="padding:0; display:flex; flex-direction:column; height:100%; overflow:hidden;">
                ${this.renderNavBar('ekskresi-lkpd')}

                <div class="lkpd-app-root" style="flex:1 1 0%; min-height:0;">
                    <!-- Top Control Bar -->
                    <header class="lkpd-header-bar">
                        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:10px;">
                            <!-- Brand -->
                            <div style="display:flex; align-items:center; gap:8px;">
                                <span style="font-size:1.6rem;">🫁</span>
                                <div>
                                    <h3 style="font-size:0.95rem; font-weight:800; color:#0f172a; margin:0; line-height:1.2;">LKPD Interaktif: Sistem Ekskresi</h3>
                                    <p style="font-size:0.72rem; color:#64748b; margin:0; font-weight:600;">Mode Kolaborasi Multi-Kelompok • Layar Mandiri Tanpa Gangguan Scroll</p>
                                </div>
                            </div>

                            <!-- Mode Switcher -->
                            <div style="display:flex; align-items:center; background:#f1f5f9; padding:3px; border-radius:10px; border:1px solid #cbd5e1;">
                                <button id="lkpd-mode-btn-1" onclick="EkskresiModule.setLKPDMode(1)" class="mode-btn-active" style="padding:4px 10px; border-radius:7px; font-size:0.75rem; font-weight:700; border:none; cursor:pointer;">
                                    👤 Individu
                                </button>
                                <button id="lkpd-mode-btn-2" onclick="EkskresiModule.setLKPDMode(2)" style="padding:4px 10px; border-radius:7px; font-size:0.75rem; font-weight:700; border:none; cursor:pointer; background:transparent; color:#475569;">
                                    👥 2 Kelompok
                                </button>
                                <button id="lkpd-mode-btn-3" onclick="EkskresiModule.setLKPDMode(3)" style="padding:4px 10px; border-radius:7px; font-size:0.75rem; font-weight:700; border:none; cursor:pointer; background:transparent; color:#475569;">
                                    👥 3 Kelompok
                                </button>
                                <button id="lkpd-mode-btn-4" onclick="EkskresiModule.setLKPDMode(4)" style="padding:4px 10px; border-radius:7px; font-size:0.75rem; font-weight:700; border:none; cursor:pointer; background:transparent; color:#475569;">
                                    👥 4 Kelompok
                                </button>
                                <button id="lkpd-btn-toggle-grid4" onclick="EkskresiModule.toggleLKPDMode4Grid()" style="display:none; margin-left:4px; padding:3px 8px; border-radius:6px; font-size:0.7rem; font-weight:700; background:#e0e7ff; color:#4338ca; border:1px solid #c7d2fe; cursor:pointer;">
                                    Grid 2x2
                                </button>
                            </div>

                            <!-- Action Buttons -->
                            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                                <div style="display:flex; background:#f1f5f9; padding:2px; border-radius:8px; border:1px solid #cbd5e1;">
                                    <button onclick="EkskresiModule.setGlobalLKPDTab(1)" style="padding:4px 8px; font-size:0.72rem; font-weight:700; border:none; border-radius:6px; background:transparent; color:#334155; cursor:pointer;" title="Pindah semua ke Poster">
                                        📑 Semua LKPD 1
                                    </button>
                                    <button onclick="EkskresiModule.setGlobalLKPDTab(2)" style="padding:4px 8px; font-size:0.72rem; font-weight:700; border:none; border-radius:6px; background:transparent; color:#334155; cursor:pointer;" title="Pindah semua ke Soal">
                                        📝 Semua LKPD 2
                                    </button>
                                </div>

                                <label for="lkpd-img-upload" style="display:flex; align-items:center; gap:4px; padding:4px 9px; background:#f1f5f9; color:#334155; font-size:0.75rem; font-weight:600; border-radius:8px; border:1px solid #cbd5e1; cursor:pointer;">
                                    <i data-lucide="upload" style="width:14px; height:14px;"></i>
                                    <span>Unggah Gambar</span>
                                </label>
                                <input id="lkpd-img-upload" type="file" accept="image/*" style="display:none;" onchange="EkskresiModule.handleLKPDImageUpload(event)" />

                                <button onclick="EkskresiModule.checkAllLKPDLeaderboard()" style="display:flex; align-items:center; gap:4px; padding:4px 11px; background:#059669; color:#ffffff; font-size:0.75rem; font-weight:700; border-radius:8px; border:none; cursor:pointer; box-shadow:0 2px 4px rgba(5,150,105,0.3);">
                                    <i data-lucide="check-circle-2" style="width:14px; height:14px;"></i>
                                    <span>Periksa Semua</span>
                                </button>

                                <button onclick="EkskresiModule.resetAllLKPDGroups()" style="padding:4px 9px; background:#e2e8f0; color:#334155; font-size:0.75rem; font-weight:600; border-radius:8px; border:none; cursor:pointer;">
                                    Reset
                                </button>

                                <button onclick="EkskresiModule.navTo('ekskresi-evaluasi')" style="display:flex; align-items:center; gap:4px; padding:4px 10px; background:#4f46e5; color:#ffffff; font-size:0.75rem; font-weight:700; border-radius:8px; border:none; cursor:pointer;">
                                    <span>Evaluasi</span>
                                    <i data-lucide="arrow-right" style="width:13px; height:13px;"></i>
                                </button>
                            </div>
                        </div>
                    </header>

                    <!-- Multi-Group Viewport -->
                    <main id="lkpd-grid-viewport" class="lkpd-grid-viewport grid-mode-1"></main>

                    <!-- Leaderboard Modal -->
                    <div id="lkpd-leaderboard-modal" style="display:none; position:fixed; inset:0; z-index:9999; background:rgba(15,23,42,0.8); backdrop-filter:blur(4px); align-items:center; justify-content:center; padding:16px;">
                        <div style="background:#ffffff; border-radius:18px; max-width:500px; width:100%; padding:22px; box-shadow:0 20px 40px rgba(0,0,0,0.3); border:1px solid #cbd5e1;">
                            <div style="display:flex; align-items:center; justify-content:space-between; padding-bottom:12px; border-bottom:1px solid #f1f5f9;">
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="font-size:2rem;">🏆</span>
                                    <div>
                                        <h3 style="font-size:1.05rem; font-weight:800; color:#0f172a; margin:0;">Hasil Evaluasi Seluruh Kelompok</h3>
                                        <p style="font-size:0.75rem; color:#64748b; margin:0;">Peringkat & Ringkasan Nilai LKPD Interaktif</p>
                                    </div>
                                </div>
                                <button onclick="EkskresiModule.closeLKPDLeaderboard()" style="background:transparent; border:none; font-size:1.2rem; cursor:pointer; color:#94a3b8; font-weight:800;">✕</button>
                            </div>
                            <div id="lkpd-leaderboard-rank-list" style="margin:16px 0; display:flex; flex-direction:column; gap:10px;"></div>
                            <div style="padding-top:12px; border-top:1px solid #f1f5f9; display:flex; justify-content:flex-end;">
                                <button onclick="EkskresiModule.closeLKPDLeaderboard()" style="padding:6px 16px; background:#4f46e5; color:#ffffff; font-weight:700; font-size:0.8rem; border-radius:8px; border:none; cursor:pointer;">
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Virtual Keyboard Drawer -->
                    <div id="lkpd-keyboard-drawer" style="position:fixed; bottom:0; left:0; right:0; z-index:9998; background:rgba(15,23,42,0.96); backdrop-filter:blur(8px); border-top:1px solid #334155; padding:12px; box-shadow:0 -10px 25px rgba(0,0,0,0.5); transform:translateY(100%); transition:transform 0.25s cubic-bezier(0.16,1,0.3,1);">
                        <div style="max-width:580px; margin:0 auto;">
                            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span id="lkpd-active-kb-badge" style="padding:2px 8px; border-radius:6px; font-size:0.75rem; font-weight:800; background:#4f46e5; color:#ffffff;">Kelompok 1</span>
                                    <span style="font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:#a5b4fc;">Mengetik Soal <span id="lkpd-active-question-num">1</span></span>
                                </div>
                                <button onclick="EkskresiModule.closeLKPDKeyboard()" style="padding:4px 10px; background:#059669; color:#ffffff; font-weight:700; font-size:0.75rem; border-radius:8px; border:none; cursor:pointer;">
                                    ✓ Selesai
                                </button>
                            </div>

                            <div style="background:#1e293b; border-radius:10px; padding:6px 12px; border:1px solid #475569; display:flex; align-items:center; justify-content:space-between; min-height:40px; margin-bottom:10px;">
                                <span id="lkpd-keyboard-preview-text" style="font-size:1.05rem; font-weight:800; color:#fde047; font-family:monospace; letter-spacing:0.05em;">|</span>
                                <button onclick="EkskresiModule.keyInputClearLKPD()" style="font-size:0.72rem; color:#f87171; font-weight:600; background:transparent; border:none; cursor:pointer;">Hapus Semua</button>
                            </div>

                            <!-- Keyboard Grid -->
                            <div style="display:flex; flex-direction:column; gap:5px; user-select:none;">
                                <div style="display:flex; justify-content:center; gap:4px;">
                                    ${['Q','W','E','R','T','Y','U','I','O','P'].map(k => `<button onclick="EkskresiModule.keyPressLKPD('${k}')" class="v-key" style="min-width:30px; flex:1; max-width:48px; height:36px; background:#334155; color:#ffffff; font-weight:800; font-size:0.9rem; border-radius:6px; border:none; cursor:pointer;">${k}</button>`).join('')}
                                </div>
                                <div style="display:flex; justify-content:center; gap:4px;">
                                    ${['A','S','D','F','G','H','J','K','L'].map(k => `<button onclick="EkskresiModule.keyPressLKPD('${k}')" class="v-key" style="min-width:30px; flex:1; max-width:48px; height:36px; background:#334155; color:#ffffff; font-weight:800; font-size:0.9rem; border-radius:6px; border:none; cursor:pointer;">${k}</button>`).join('')}
                                </div>
                                <div style="display:flex; justify-content:center; gap:4px;">
                                    <button onclick="EkskresiModule.keyPressLKPD('-')" class="v-key" style="min-width:28px; flex:1; max-width:42px; height:36px; background:#334155; color:#ffffff; font-weight:800; font-size:0.85rem; border-radius:6px; border:none; cursor:pointer;">-</button>
                                    ${['Z','X','C','V','B','N','M'].map(k => `<button onclick="EkskresiModule.keyPressLKPD('${k}')" class="v-key" style="min-width:30px; flex:1; max-width:48px; height:36px; background:#334155; color:#ffffff; font-weight:800; font-size:0.9rem; border-radius:6px; border:none; cursor:pointer;">${k}</button>`).join('')}
                                    <button onclick="EkskresiModule.keyPressLKPD(',')" class="v-key" style="min-width:28px; flex:1; max-width:42px; height:36px; background:#334155; color:#ffffff; font-weight:800; font-size:0.85rem; border-radius:6px; border:none; cursor:pointer;">,</button>
                                    <button onclick="EkskresiModule.keyBackspaceLKPD()" class="v-key" style="padding:0 10px; height:36px; background:#be123c; color:#ffffff; font-weight:800; font-size:0.85rem; border-radius:6px; border:none; cursor:pointer;">⌫</button>
                                </div>
                                <div style="display:flex; justify-content:center; gap:6px; padding-top:2px;">
                                    <button onclick="EkskresiModule.keyPressLKPD(' ')" class="v-key" style="flex:1; max-width:280px; height:36px; background:#4338ca; color:#ffffff; font-weight:800; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.1em; border-radius:6px; border:none; cursor:pointer;">Spasi</button>
                                    <button onclick="EkskresiModule.closeLKPDKeyboard()" class="v-key" style="padding:0 16px; height:36px; background:#059669; color:#ffffff; font-weight:800; font-size:0.75rem; border-radius:6px; border:none; cursor:pointer;">Simpan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /* =========================================================================
       12. SLIDE 12: EVALUASI AKHIR SISTEM EKSKRESI (10 SOAL BERBOBOT)
       ========================================================================= */
    renderSlideEvaluasi() {
        const questions = this.getEvaluasiQuestions();
        return `
            <div class="ekskresi-fullpage" id="ekskresi-page-evaluasi">
                ${this.renderNavBar(10)}

                <div class="ekskresi-header-banner" style="border-color: #10b981;">
                    <span class="banner-badge" style="background:rgba(16,185,129,0.2); color:#34d399;"><i data-lucide="award"></i> Evaluasi Akhir</span>
                    <h2>Evaluasi Pemahaman Materi Sistem Ekskresi</h2>
                    <p>Kerjakan 10 soal pilihan ganda komprehensif berikut. Klik <strong>Kirim & Lihat Nilai</strong> untuk mendapatkan skor dan pembahasannya!</p>
                </div>

                <div class="evaluasi-quiz-wrapper">
                    <div class="eval-progress-bar-container">
                        <div class="eval-progress-bar" id="eval-progress-fill" style="width: 0%;"></div>
                    </div>
                    <div class="eval-status-info">
                        <span id="eval-answered-count">0 dari 10 Soal Dijawab</span>
                        <span id="eval-score-preview">Skor Maksimal: 100 Poin</span>
                    </div>

                    <div class="eval-questions-list">
                        ${questions.map((q, idx) => `
                            <div class="eval-q-card card" id="eval-qcard-${idx}">
                                <div class="eval-q-header">
                                    <span class="q-num-badge">Soal ${idx + 1}</span>
                                    <span class="q-tag-topic">${q.topic}</span>
                                </div>
                                <h4 class="eval-q-text">${q.text}</h4>
                                <div class="eval-opts-list">
                                    ${q.options.map((opt, optIdx) => `
                                        <button class="eval-opt-btn" id="eval-opt-${idx}-${optIdx}" onclick="EkskresiModule.setEvalAnswer(${idx}, ${optIdx})">
                                            <span class="opt-char">${['A', 'B', 'C', 'D'][optIdx]}</span>
                                            <span>${opt}</span>
                                        </button>
                                    `).join('')}
                                </div>
                                <div class="eval-explanation-box hidden" id="eval-exp-${idx}">
                                    <strong>Pembahasan:</strong> ${q.explanation}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="eval-submit-panel">
                        <button class="btn-primary btn-submit-eval ripple" id="btn-submit-eval" onclick="EkskresiModule.submitEvaluasi()">
                            <i data-lucide="check-circle-2"></i>
                            <span>Kirim & Periksa Skor Evaluasi</span>
                        </button>
                    </div>

                    <!-- Certificate / Final Score Modal Card -->
                    <div class="eval-result-card card hidden" id="eval-result-card">
                        <div class="result-header">
                            <span class="result-trophy-icon">🏆</span>
                            <h3>Hasil Evaluasi Sistem Ekskresi</h3>
                            <div class="result-score-circle">
                                <span class="score-number" id="final-score-val">0</span>
                                <small>/ 100</small>
                            </div>
                            <p class="result-verdict" id="final-verdict-text">Nilai Sempurna!</p>
                        </div>
                        <div class="result-actions">
                            <button class="btn-primary ripple" onclick="EkskresiModule.resetEvaluasi()">
                                <i data-lucide="rotate-ccw"></i>
                                <span>Ulangi Evaluasi</span>
                            </button>
                            <button class="btn-nav ripple" onclick="EkskresiModule.navTo(0)">
                                <i data-lucide="home"></i>
                                <span>Kembali ke Beranda</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /* =========================================================================
       HELPER DATA & LOGIC METHODS
       ========================================================================= */
    getAnimStepHtml(step) {
        switch (step) {
            case 1:
                return `
                    <div class="anim-step-view animate-fade">
                        <svg viewBox="0 0 360 180" class="anim-svg">
                            <rect x="30" y="25" width="300" height="130" rx="16" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
                            <text x="180" y="55" fill="#065f46" font-size="14" font-weight="800" text-anchor="middle">Sel-Sel Tubuh (Metabolisme)</text>
                            
                            <!-- Glucose + O2 in -->
                            <rect x="50" y="75" width="110" height="35" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
                            <text x="105" y="97" fill="#0369a1" font-size="11" font-weight="700" text-anchor="middle">Glukosa + O₂</text>

                            <!-- Waste out -->
                            <rect x="200" y="75" width="110" height="35" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1.5"/>
                            <text x="255" y="97" fill="#b91c1c" font-size="11" font-weight="700" text-anchor="middle">CO₂ + Urea + Panas</text>
                            <path d="M 165 92 L 195 92" stroke="#d97706" stroke-width="3" marker-end="url(#arrow)"/>
                        </svg>
                    </div>
                `;
            case 2:
                return `
                    <div class="anim-step-view animate-fade">
                        <svg viewBox="0 0 360 180" class="anim-svg">
                            <path d="M 30 90 C 100 30, 260 150, 330 90" fill="none" stroke="#ef4444" stroke-width="14" stroke-linecap="round"/>
                            <text x="180" y="50" fill="#991b1b" font-size="14" font-weight="800" text-anchor="middle">Aliran Darah Mengangkut Zat Sisa</text>
                            <circle cx="90" cy="72" r="12" fill="#b91c1c"><animate attributeName="cx" values="60;300;60" dur="4s" repeatCount="indefinite"/></circle>
                            <circle cx="160" cy="100" r="12" fill="#b91c1c"><animate attributeName="cx" values="100;340;100" dur="4s" repeatCount="indefinite"/></circle>
                        </svg>
                    </div>
                `;
            case 3:
                return `
                    <div class="anim-step-view animate-fade">
                        <svg viewBox="0 0 360 180" class="anim-svg">
                            <rect x="30" y="30" width="65" height="110" rx="10" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
                            <text x="62" y="72" font-size="20" text-anchor="middle">🧴</text>
                            <text x="62" y="105" fill="#065f46" font-size="11" font-weight="800" text-anchor="middle">Kulit</text>

                            <rect x="110" y="30" width="65" height="110" rx="10" fill="#ecfeff" stroke="#0891b2" stroke-width="1.5"/>
                            <text x="142" y="72" font-size="20" text-anchor="middle">🫁</text>
                            <text x="142" y="105" fill="#0e7490" font-size="11" font-weight="800" text-anchor="middle">Paru</text>

                            <rect x="190" y="30" width="65" height="110" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>
                            <text x="222" y="72" font-size="20" text-anchor="middle">🥩</text>
                            <text x="222" y="105" fill="#92400e" font-size="11" font-weight="800" text-anchor="middle">Hati</text>

                            <rect x="270" y="30" width="65" height="110" rx="10" fill="#f5f3ff" stroke="#7c3aed" stroke-width="1.5"/>
                            <text x="302" y="72" font-size="20" text-anchor="middle">🫘</text>
                            <text x="302" y="105" fill="#5b21b6" font-size="11" font-weight="800" text-anchor="middle">Ginjal</text>
                        </svg>
                    </div>
                `;
            case 4:
                return `
                    <div class="anim-step-view animate-fade">
                        <svg viewBox="0 0 360 180" class="anim-svg">
                            <rect x="35" y="25" width="290" height="130" rx="14" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
                            <text x="180" y="55" fill="#1e40af" font-size="14" font-weight="800" text-anchor="middle">Pembuangan ke Luar Tubuh</text>
                            <text x="75" y="95" fill="#065f46" font-size="11" font-weight="700">• Keringat (Kulit)</text>
                            <text x="75" y="125" fill="#0e7490" font-size="11" font-weight="700">• CO₂ & Uap H₂O (Napas)</text>
                            <text x="195" y="95" fill="#92400e" font-size="11" font-weight="700">• Empedu (Feses)</text>
                            <text x="195" y="125" fill="#5b21b6" font-size="11" font-weight="700">• Urine Final (Ginjal)</text>
                        </svg>
                    </div>
                `;
            default:
                return ``;
        }
    },

    setAnimStep(step) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        this.state.animStep = step;
        document.querySelectorAll('.step-pill').forEach(p => {
            p.classList.toggle('active', parseInt(p.getAttribute('data-step'), 10) === step);
        });

        const stage = document.getElementById('stage-visual-content');
        if (stage) stage.innerHTML = this.getAnimStepHtml(step);

        const expBox = document.getElementById('anim-explanation-text');
        const descList = [
            "Tahap 1: Pembentukan Zat Sisa di Sel Tubuh. Setiap pembakaran glukosa dan protein menghasilkan racun sampingan (CO₂, asam amonia, air, dan panas).",
            "Tahap 2: Pengangkutan oleh Darah. Pembuluh darah membawa zat sisa menuju 4 stasiun penyaring tubuh.",
            "Tahap 3: Filtrasi oleh 4 Organ. Kulit menyaring keringat, Paru-paru menyaring CO₂, Hati merombak eritrosit & racun, Ginjal menyaring darah menjadi urine.",
            "Tahap 4: Pembuangan ke Luar Tubuh. Zat sisa dikeluarkan secara teratur sehingga tubuh tetap seimbang, bugar, dan terbebas dari racun (Homeostasis)."
        ];
        if (expBox) expBox.innerHTML = `<h4>Tahap ${step}</h4><p>${descList[step - 1]}</p>`;
    },

    toggleAnimPlay() {
        if (this.state.animPlaying) {
            clearInterval(this.state.animTimer);
            this.state.animPlaying = false;
            document.getElementById('txt-anim-play').innerText = "Mulai Animasi Otomatis";
            document.getElementById('icon-anim-play').setAttribute('data-lucide', 'play');
        } else {
            this.state.animPlaying = true;
            document.getElementById('txt-anim-play').innerText = "Jeda (Pause)";
            document.getElementById('icon-anim-play').setAttribute('data-lucide', 'pause');
            this.state.animTimer = setInterval(() => {
                let next = this.state.animStep + 1;
                if (next > 4) next = 1;
                this.setAnimStep(next);
            }, 3000);
        }
        if (window.lucide) window.lucide.createIcons();
    },

    resetAnim() {
        if (this.state.animTimer) clearInterval(this.state.animTimer);
        this.state.animPlaying = false;
        const btnTxt = document.getElementById('txt-anim-play');
        if (btnTxt) btnTxt.innerText = "Mulai Animasi Otomatis";
        this.setAnimStep(1);
    },

    answerApersepsi(questionKey, choiceIdx) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        this.state.apersepsi[questionKey] = choiceIdx;

        const group = document.querySelector(`.ap-options-group[data-q="${questionKey}"]`);
        if (group) {
            group.querySelectorAll('.ap-opt-btn').forEach((btn, idx) => {
                btn.classList.remove('selected', 'correct-opt', 'wrong-opt');
                if (idx + 1 === choiceIdx) {
                    btn.classList.add('selected');
                }
            });
        }

        const fb = document.getElementById(`feedback-${questionKey}`);
        if (!fb) return;
        fb.classList.remove('hidden');

        if (questionKey === 'q1') {
            if (choiceIdx === 2) {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playCorrect) AudioSynth.playCorrect();
                fb.className = "ap-feedback-box fb-correct";
                fb.innerHTML = `<strong>Jawabanmu Tepat Sekali! 🎉</strong><br>Keringat dikeluarkan untuk <em>termoregulasi</em>. Saat otot bekerja, suhu tubuh meningkat. Hipotalamus memerintahkan kelenjar keringat mengeluarkan air dan garam. Ketika keringat menguap dari permukaan kulit, panas tubuh ikut terserap dan suhu kembali seimbang (~37°C).`;
            } else {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playWrong) AudioSynth.playWrong();
                fb.className = "ap-feedback-box fb-wrong";
                fb.innerHTML = `<strong>Kurang Tepat. Coba pikirkan kembali! 🤔</strong><br>Keringat bukan berasal dari udara luar atau pembuangan lemak langsung, melainkan cara tubuh mendinginkan diri dari panas aktivitas otot. Jawaban yang tepat adalah <strong>B</strong>.`;
            }
        } else if (questionKey === 'q2') {
            if (choiceIdx === 2) {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playCorrect) AudioSynth.playCorrect();
                fb.className = "ap-feedback-box fb-correct";
                fb.innerHTML = `<strong>Hebat! Analisismu Benar! 🎉</strong><br>Warna kuning pada urine berasal dari pigmen <strong>urobilin</strong>. Pigmen ini terbentuk ketika sel darah merah yang telah tua (umur ~120 hari) dirombak oleh hati menjadi bilirubin, dialirkan ke usus, diserap kembali ke darah, dan akhirnya disaring oleh ginjal ke dalam urine!`;
            } else {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playWrong) AudioSynth.playWrong();
                fb.className = "ap-feedback-box fb-wrong";
                fb.innerHTML = `<strong>Belum Tepat. Simak faktanya! 🤔</strong><br>Warna kuning urine bukan berasal dari pewarna makanan atau asam lambung, melainkan pigmen <em>urobilin</em> hasil daur ulang sel darah merah di hati. Jawaban yang benar adalah <strong>B</strong>.`;
            }
        }
    },

    /* Drag and Drop Definisi Logic */
    initDragDropDefinisi() {
        const pool = document.getElementById('dd-source-pool');
        if (!pool) return;

        const items = [
            { id: 'item_co2', name: 'Karbon Dioksida (CO₂)', type: 'ekskresi' },
            { id: 'item_urea', name: 'Urea', type: 'ekskresi' },
            { id: 'item_keringat', name: 'Keringat', type: 'ekskresi' },
            { id: 'item_empedu', name: 'Cairan Empedu (Bilirubin)', type: 'ekskresi' },
            { id: 'item_feses', name: 'Feses (Tinja)', type: 'bukan' },
            { id: 'item_saliva', name: 'Air Liur (Enzim Ptialin)', type: 'bukan' },
            { id: 'item_insulin', name: 'Hormon Insulin', type: 'bukan' },
            { id: 'item_hcl', name: 'Asam Lambung (HCl)', type: 'bukan' }
        ];

        // Shuffle items
        items.sort(() => Math.random() - 0.5);

        pool.innerHTML = items.map(item => `
            <div class="dd-item card-interactive" draggable="true" id="${item.id}" data-type="${item.type}" onclick="EkskresiModule.toggleAssignDefinisi('${item.id}', '${item.type}')">
                <span class="dd-item-name">${item.name}</span>
                <span class="dd-drag-icon">⋮⋮</span>
            </div>
        `).join('');

        this.state.dragDropDefinisi.items = items;
        this.state.dragDropDefinisi.assigned = {};
    },

    toggleAssignDefinisi(itemId, correctType) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        const currentTarget = this.state.dragDropDefinisi.assigned[itemId];
        let nextTarget = 'ekskresi';
        if (!currentTarget) nextTarget = 'ekskresi';
        else if (currentTarget === 'ekskresi') nextTarget = 'bukan';
        else nextTarget = null; // unassign back to pool

        const elem = document.getElementById(itemId);
        if (!elem) return;

        if (nextTarget === 'ekskresi') {
            document.getElementById('slot-ekskresi').appendChild(elem);
            this.state.dragDropDefinisi.assigned[itemId] = 'ekskresi';
        } else if (nextTarget === 'bukan') {
            document.getElementById('slot-bukan').appendChild(elem);
            this.state.dragDropDefinisi.assigned[itemId] = 'bukan';
        } else {
            document.getElementById('dd-source-pool').appendChild(elem);
            delete this.state.dragDropDefinisi.assigned[itemId];
        }
    },

    checkDragDropDefinisi() {
        const assigned = this.state.dragDropDefinisi.assigned;
        const items = this.state.dragDropDefinisi.items || [];
        let score = 0;

        items.forEach(item => {
            const el = document.getElementById(item.id);
            if (!el) return;
            el.classList.remove('item-correct', 'item-wrong');

            if (assigned[item.id] === item.type) {
                score++;
                el.classList.add('item-correct');
            } else if (assigned[item.id]) {
                el.classList.add('item-wrong');
            }
        });

        const scoreText = document.getElementById('dd-score-text');
        if (scoreText) scoreText.innerText = `Skor: ${score} / ${items.length}`;

        const fb = document.getElementById('dd-feedback-box');
        if (!fb) return;
        fb.classList.remove('hidden');

        if (score === items.length) {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playCorrect) AudioSynth.playCorrect();
            fb.className = "dd-feedback-area fb-correct";
            fb.innerHTML = `<strong>Luar Biasa! Skor Sempurna (8/8)! 🎉</strong><br>Kamu berhasil membedakan zat sisa metabolisme (Ekskresi: CO₂, Urea, Keringat, Empedu) dengan sisa pencernaan (Feses/Defekasi) dan getah kelenjar fungsional (Enzim, Hormon, Asam lambung/Sekresi).`;
        } else {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playWrong) AudioSynth.playWrong();
            fb.className = "dd-feedback-area fb-wrong";
            fb.innerHTML = `<strong>Skor kamu: ${score} / ${items.length}.</strong><br>Perhatikan: <em>Feses</em> adalah defekasi (sisa pencernaan yang tidak diserap), sedangkan <em>enzim, air liur, dan hormon</em> adalah sekresi (masih berguna bagi tubuh). Silakan perbaiki kartu yang berwarna merah!`;
        }
    },

    resetDragDropDefinisi() {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        this.initDragDropDefinisi();
        const scoreText = document.getElementById('dd-score-text');
        if (scoreText) scoreText.innerText = "Skor: 0 / 8";
        const fb = document.getElementById('dd-feedback-box');
        if (fb) fb.classList.add('hidden');
    },

    /* Kulit Simulation */
    setKulitSim(activity) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        this.state.kulitSim.activity = activity;

        document.querySelectorAll('.sim-mode-toggle .btn-mode').forEach(b => b.classList.remove('active'));
        const activeBtn = document.getElementById(`btn-mode-${activity}`);
        if (activeBtn) activeBtn.classList.add('active');

        const tempElem = document.getElementById('val-kulit-temp');
        const subTemp = document.getElementById('sub-kulit-temp');
        const vasoElem = document.getElementById('val-kulit-vaso');
        const subVaso = document.getElementById('sub-kulit-vaso');
        const rateElem = document.getElementById('val-kulit-rate');
        const subRate = document.getElementById('sub-kulit-rate');
        const expElem = document.getElementById('kulit-sim-explain');
        const poresBox = document.getElementById('pores-visual-box');

        if (activity === 'istirahat') {
            tempElem.innerText = "36.8 °C";
            tempElem.style.color = "#34d399";
            subTemp.innerText = "Normal Homeostasis";
            vasoElem.innerText = "Konstriksi (Normal)";
            vasoElem.style.color = "#38bdf8";
            subVaso.innerText = "Aliran darah dermis stabil";
            rateElem.innerText = "15 mL/jam";
            subRate.innerText = "Keringat basal minimal";
            expElem.innerText = "Saat istirahat santai, aktivitas metabolik otot rendah. Pembuluh kapiler dermis berdiameter normal dan kelenjar keringat hanya mengeluarkan sedikit cairan untuk melembapkan kulit.";
            if (poresBox) poresBox.className = "pores-visual-box rate-low";
        } else if (activity === 'sedang') {
            tempElem.innerText = "37.5 °C";
            tempElem.style.color = "#f59e0b";
            subTemp.innerText = "Hangat (Aktivitas Ringan)";
            vasoElem.innerText = "Dilatasi Ringan";
            vasoElem.style.color = "#f59e0b";
            subVaso.innerText = "Aliran darah mulai meningkat";
            rateElem.innerText = "250 mL/jam";
            subRate.innerText = "Keringat mulai mengalir";
            expElem.innerText = "Saat jalan santai, otot mulai memproduksi panas ekstra. Hipotalamus memerintahkan pelebaran pembuluh kapiler dermis dan kelenjar keringat mulai memompa tetesan keringat untuk mendinginkan kulit.";
            if (poresBox) poresBox.className = "pores-visual-box rate-med";
        } else if (activity === 'berat') {
            tempElem.innerText = "38.6 °C";
            tempElem.style.color = "#ef4444";
            subTemp.innerText = "Tinggi (Panas Metabolisme Ekstrem)";
            vasoElem.innerText = "Vasodilatasi Maksimal";
            vasoElem.style.color = "#ef4444";
            subVaso.innerText = "Kulit memerah, panas diradiasikan";
            rateElem.innerText = "1.200 mL/jam";
            subRate.innerText = "Keringat deras mengalir";
            expElem.innerText = "Saat lari cepat atau olahraga intens, pembakaran energi otot menghasilkan lonjakan panas besar! Pembuluh kapiler dermis melebar maksimal (kulit memerah) dan kelenjar keringat memompa hingga 1-2 liter keringat per jam untuk mencegah sengatan panas (heatstroke).";
            if (poresBox) poresBox.className = "pores-visual-box rate-high";
        }
    },

    setKulitLabel(num, val) {
        this.state.kulitLabeling.answers[num] = val;
    },

    checkKulitLabeling() {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        const a1 = this.state.kulitLabeling.answers[1];
        const a2 = this.state.kulitLabeling.answers[2];
        const a3 = this.state.kulitLabeling.answers[3];

        const fb = document.getElementById('label-kulit-feedback');
        if (!fb) return;

        if (a1 === 'epidermis' && a2 === 'dermis' && a3 === 'hipodermis') {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playCorrect) AudioSynth.playCorrect();
            fb.style.color = "#10b981";
            fb.innerText = "Luar Biasa! Jawabanmu 100% Benar! (1: Epidermis, 2: Dermis, 3: Hipodermis)";
        } else {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playWrong) AudioSynth.playWrong();
            fb.style.color = "#ef4444";
            fb.innerText = "Masih ada yang keliru. Petunjuk: Lapisan terluar = Epidermis, tengah = Dermis, dasar berlemak = Hipodermis.";
        }
    },

    /* Paru-paru Difusi Mode */
    setParuDifusiMode(mode) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        this.state.paruDifusi.mode = mode;

        document.getElementById('btn-tarik-napas').classList.toggle('active', mode === 'tarik');
        document.getElementById('btn-buang-napas').classList.toggle('active', mode === 'buang');

        const exp = document.getElementById('difusi-explanation-text');
        const sac = document.getElementById('alveolus-sac');
        const wrapper = document.getElementById('gas-particles-wrapper');

        if (mode === 'tarik') {
            if (sac) sac.classList.add('sac-expanded');
            if (exp) {
                exp.innerHTML = `<strong>Fase Inspirasi (Tarik Napas):</strong> Alveolus mengembang. Udara kaya Oksigen ($O_2$) mengalir masuk. Molekul $O_2$ (biru) berdifusi melintasi membran tipis alveolus menuju kapiler darah dan diikat erat oleh hemoglobin sel darah merah.`;
            }
            if (wrapper) {
                wrapper.innerHTML = `
                    <div class="gas-particle p-o2 p1">O₂</div>
                    <div class="gas-particle p-o2 p2">O₂</div>
                    <div class="gas-particle p-o2 p3">O₂</div>
                    <div class="gas-particle p-o2 p4">O₂</div>
                `;
            }
        } else {
            if (sac) sac.classList.remove('sac-expanded');
            if (exp) {
                exp.innerHTML = `<strong>Fase Ekspirasi (Buang Napas):</strong> Otot dada relaksasi dan alveolus mengempis. Gas Karbon Dioksida ($CO_2$, merah) dan Uap Air ($H_2O$, butiran biru muda) berdifusi keluar dari kapiler darah menuju rongga alveolus lalu dihembuskan keluar tubuh!`;
            }
            if (wrapper) {
                wrapper.innerHTML = `
                    <div class="gas-particle p-co2 p1">CO₂</div>
                    <div class="gas-particle p-co2 p2">CO₂</div>
                    <div class="gas-particle p-h2o p3">H₂O</div>
                    <div class="gas-particle p-h2o p4">H₂O</div>
                `;
            }
        }
    },

    blowMirror() {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playSweep) AudioSynth.playSweep();
        const fog = document.getElementById('mirror-fog');
        if (fog) {
            fog.style.opacity = '1';
            fog.style.transform = 'scale(1)';
        }
    },

    wipeMirror() {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        const fog = document.getElementById('mirror-fog');
        if (fog) {
            fog.style.opacity = '0';
            fog.style.transform = 'scale(0.95)';
        }
    },

    /* Hati Step Alur */
    setHatiStep(step) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        this.state.hatiAlur.currentStep = step;

        document.querySelectorAll('.step-nav-buttons .step-btn').forEach(b => b.classList.remove('active'));
        const btn = document.getElementById(`btn-hati-step-${step}`);
        if (btn) btn.classList.add('active');

        const view = document.getElementById('alur-hati-viewport');
        if (view) view.innerHTML = this.getHatiStepHtml(step);
    },

    getHatiStepHtml(step) {
        switch (step) {
            case 1:
                return `
                    <div class="alur-step-card animate-fade">
                        <div class="alur-icon">🩸</div>
                        <h4>Langkah 1: Sel Darah Merah (Eritrosit) Tua</h4>
                        <p>Eritrosit memiliki masa hidup sekitar <strong>120 hari</strong>. Sel yang sudah tua, rapuh, atau rusak ditangkap oleh sel makrofag khusus di hati (<strong>Sel Kupffer</strong>).</p>
                    </div>
                `;
            case 2:
                return `
                    <div class="alur-step-card animate-fade">
                        <div class="alur-icon">✂️</div>
                        <h4>Langkah 2: Pemecahan Molekul Hemoglobin</h4>
                        <p>Hemoglobin dipecah menjadi 3 fraksi penting:<br>
                        1. <strong>Zat Besi (Fe):</strong> Disimpan di hati atau dikirim ke sumsum tulang untuk sel baru.<br>
                        2. <strong>Globin:</strong> Dirombak menjadi asam amino untuk metabolisme protein tubuh.<br>
                        3. <strong>Hemin:</strong> Senyawa cincin porfirin yang akan diubah menjadi zat warna.</p>
                    </div>
                `;
            case 3:
                return `
                    <div class="alur-step-card animate-fade">
                        <div class="alur-icon">🧪</div>
                        <h4>Langkah 3: Perubahan Hemin Menjadi Bilirubin</h4>
                        <p>Hemin dioksidasi oleh enzim menjadi pigmen hijau <strong>Biliverdin</strong>, lalu segera direduksi menjadi pigmen kuning-keemasan <strong>Bilirubin</strong>. Bilirubin dialirkan dan disimpan sementara di <strong>kantung empedu</strong>.</p>
                    </div>
                `;
            case 4:
                return `
                    <div class="alur-step-card animate-fade">
                        <div class="alur-icon">🫗</div>
                        <h4>Langkah 4: Penyaluran ke Usus Halus</h4>
                        <p>Saat tubuh mencerna makanan (terutama lemak), getah empedu disemprotkan melalui saluran empedu ke usus dua belas jari (duodenum) untuk mengemulsi lemak makanan.</p>
                    </div>
                `;
            case 5:
                return `
                    <div class="alur-step-card animate-fade">
                        <div class="alur-icon">💩 🟡</div>
                        <h4>Langkah 5: Diubah Jadi Pewarna Feses & Urine</h4>
                        <p>Di usus besar, bakteri usus mengubah bilirubin menjadi urobilinogen, lalu dipecah menjadi:<br>
                        • <strong>Sterkobilin:</strong> Memberi warna cokelat khas pada <strong>feses</strong> saat defekasi.<br>
                        • <strong>Urobilin:</strong> Diserap kembali ke aliran darah, dibawa ke ginjal, dan mewarnai <strong>urine</strong> menjadi kuning!</p>
                    </div>
                `;
            default:
                return ``;
        }
    },

    /* Matching Hati */
    selectMatchLeft(id) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        document.querySelectorAll('#match-col-left .match-item').forEach(el => el.classList.remove('selected'));
        const target = document.querySelector(`#match-col-left .match-item[data-id="${id}"]`);
        if (target) target.classList.add('selected');
        this.state.hatiMatching.selectedLeft = id;
    },

    selectMatchRight(id) {
        const leftId = this.state.hatiMatching.selectedLeft;
        if (!leftId) return;

        if (leftId === id) {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playCorrect) AudioSynth.playCorrect();
            this.state.hatiMatching.matchedPairs[leftId] = true;
            
            const lElem = document.querySelector(`#match-col-left .match-item[data-id="${leftId}"]`);
            const rElem = document.querySelector(`#match-col-right .match-item[data-id="${id}"]`);
            if (lElem) lElem.classList.add('matched');
            if (rElem) rElem.classList.add('matched');

            this.state.hatiMatching.selectedLeft = null;
            document.querySelectorAll('#match-col-left .match-item').forEach(el => el.classList.remove('selected'));

            const count = Object.keys(this.state.hatiMatching.matchedPairs).length;
            const fb = document.getElementById('matching-feedback-text');
            if (count === 4) {
                if (fb) {
                    fb.style.color = "#10b981";
                    fb.innerText = "Luar Biasa! Semua 4 pasangan fungsi hati berhasil dicocokkan dengan sempurna! 🎉";
                }
            } else if (fb) {
                fb.style.color = "#38bdf8";
                fb.innerText = `Bagus! ${count} dari 4 pasangan cocok. Lanjutkan!`;
            }
        } else {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playWrong) AudioSynth.playWrong();
            const fb = document.getElementById('matching-feedback-text');
            if (fb) {
                fb.style.color = "#ef4444";
                fb.innerText = "Pasangan belum tepat. Ingat kembali senyawa hasil reaksi fungsi tersebut!";
            }
        }
    },

    resetMatchingHati() {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        this.state.hatiMatching = { selectedLeft: null, matchedPairs: {}, completed: false };
        document.querySelectorAll('.matching-game-container .match-item').forEach(el => {
            el.classList.remove('selected', 'matched');
        });
        const fb = document.getElementById('matching-feedback-text');
        if (fb) {
            fb.style.color = "#94a3b8";
            fb.innerText = "Pasangkan semua 4 fungsi di atas!";
        }
    },

    /* Nefron Labeling */
    setNefronLabel(num, val) {
        this.state.nefronDrag.slots[num] = val;
    },

    checkNefronLabeling() {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        const s = this.state.nefronDrag.slots;
        const fb = document.getElementById('nefron-feedback-text');
        if (!fb) return;

        if (s[1] === 'badan_malpighi' && s[2] === 'tkp' && s[3] === 'henle' && s[4] === 'tkd' && s[5] === 'kolektivus') {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playCorrect) AudioSynth.playCorrect();
            fb.style.color = "#10b981";
            fb.innerText = "Hebat! Semua 5 bagian nefron teridentifikasi dengan tepat (1: Badan Malpighi, 2: TKP, 3: Lengkung Henle, 4: TKD, 5: Tubulus Kolektivus)!";
        } else {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playWrong) AudioSynth.playWrong();
            fb.style.color = "#ef4444";
            fb.innerText = "Masih ada label yang salah. Cermati alur: Glomerulus ➔ TKP ➔ Lengkung Henle ➔ TKD ➔ Kolektivus.";
        }
    },

    /* Urine Formation Stages */
    setUrineStage(stage) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        this.state.urineStage = stage;

        document.querySelectorAll('.stage-step-bar .btn-stage-step').forEach(b => b.classList.remove('active'));
        const btn = document.getElementById(`btn-u-stage-${stage}`);
        if (btn) btn.classList.add('active');

        const view = document.getElementById('urine-anim-view');
        if (view) view.innerHTML = this.getUrineStageHtml(stage);
    },

    getUrineStageHtml(stage) {
        switch (stage) {
            case 1:
                return `
                    <div class="u-stage-card animate-fade">
                        <div class="u-stage-header">
                            <span class="u-badge">Tahap 1: FILTRASI</span>
                            <h4>Penyaringan Darah di Glomerulus & Kapsul Bowman</h4>
                        </div>
                        <div class="u-stage-body">
                            <p>Darah dari arteriol aferen masuk dengan tekanan tinggi ke dalam anyaman kapiler glomerulus. Molekul kecil (air, glukosa, asam amino, garam, urea) terdorong keluar menembus membran pori masuk ke Kapsul Bowman.</p>
                            <div class="u-product-badge">
                                <strong>Hasil: URINE PRIMER (Filtrat Glomerulus)</strong>
                                <small>Komposisinya mirip plasma darah TANPA sel darah merah dan protein darah besar.</small>
                            </div>
                        </div>
                    </div>
                `;
            case 2:
                return `
                    <div class="u-stage-card animate-fade">
                        <div class="u-stage-header">
                            <span class="u-badge" style="background:#10b981;">Tahap 2: REABSORPSI</span>
                            <h4>Penyerapan Kembali Zat Berguna di TKP & Lengkung Henle</h4>
                        </div>
                        <div class="u-stage-body">
                            <p>Urine primer mengalir ke Tubulus Kontortus Proksimal. Tubuh tidak boleh membuang nutrisi berharga! Sel epitel TKP menyerap kembali <strong>100% glukosa</strong> dan <strong>100% asam amino</strong> secara aktif kembali ke kapiler darah peritubuler. Air diserap secara osmosis dan garam diserap di Lengkung Henle.</p>
                            <div class="u-product-badge" style="border-color:#10b981; background:rgba(16,185,129,0.1);">
                                <strong>Hasil: URINE SEKUNDER (Filtrat Tubulus)</strong>
                                <small>Mengandung air, urea, garam, pigmen empedu. TIDAK ADA LAGI glukosa atau asam amino!</small>
                            </div>
                        </div>
                    </div>
                `;
            case 3:
                return `
                    <div class="u-stage-card animate-fade">
                        <div class="u-stage-header">
                            <span class="u-badge" style="background:#f59e0b;">Tahap 3: AUGMENTASI</span>
                            <h4>Pengeluaran / Penambahan Zat Sisa di TKD & Kolektivus</h4>
                        </div>
                        <div class="u-stage-body">
                            <p>Urine sekunder masuk ke Tubulus Kontortus Distal. Di sini, darah kapiler membuang sisa-sisa racun tambahan yang tidak dibutuhkan lagi, seperti ion hidrogen ($H^+$), kalium ($K^+$), amonia, kreatinin, dan sisa obat-obatan (misal penisilin).</p>
                            <div class="u-product-badge" style="border-color:#f59e0b; background:rgba(245,158,11,0.1);">
                                <strong>Hasil: URINE SESUNGGUHNYA (Urine Final)</strong>
                                <small>Mengandung ~95% air, urea, garam, asam urat, amonia, dan urobilin. Dialirkan ke pelvis ➔ ureter ➔ kandung kemih.</small>
                            </div>
                        </div>
                    </div>
                `;
            default:
                return ``;
        }
    },

    /* Hydration Simulator */
    setHydrationLevel(val) {
        val = parseInt(val, 10);
        this.state.urineHydration = val;

        const glassesTxt = document.getElementById('hyd-glasses-text');
        if (glassesTxt) glassesTxt.innerText = `${val} Gelas / Hari`;

        const fill = document.getElementById('flask-liquid-fill');
        const mlTxt = document.getElementById('flask-ml-text');
        const adhTxt = document.getElementById('stat-adh-text');
        const adhSub = document.getElementById('stat-adh-sub');
        const colTxt = document.getElementById('stat-color-text');
        const colSub = document.getElementById('stat-color-sub');
        const statTxt = document.getElementById('stat-status-text');
        const statSub = document.getElementById('stat-status-sub');

        if (val <= 2) {
            // Dehidrasi
            if (fill) { fill.style.height = "25%"; fill.style.background = "#d97706"; }
            if (mlTxt) mlTxt.innerText = "400 mL";
            if (adhTxt) { adhTxt.innerText = "Sangat Tinggi (Maksimal)"; adhTxt.style.color = "#ef4444"; }
            if (adhSub) adhSub.innerText = "Hipofisis menahan air habis-habisan agar tidak dehidrasi";
            if (colTxt) { colTxt.innerText = "Kuning Pekat / Jingga Tua"; colTxt.style.color = "#d97706"; }
            if (colSub) colSub.innerText = "Urobilin sangat terkonsentrasi & pekat";
            if (statTxt) { statTxt.innerText = "⚠️ Dehidrasi Berat"; statTxt.style.color = "#ef4444"; }
            if (statSub) statSub.innerText = "Bahaya! Segera minum air putih untuk mencegah kristal batu ginjal";
        } else if (val <= 5) {
            // Sedang / Normal
            if (fill) { fill.style.height = "55%"; fill.style.background = "#facc15"; }
            if (mlTxt) mlTxt.innerText = "1.200 mL";
            if (adhTxt) { adhTxt.innerText = "Sedang (Stabil)"; adhTxt.style.color = "#38bdf8"; }
            if (adhSub) adhSub.innerText = "Keseimbangan cairan tubuh terjaga";
            if (colTxt) { colTxt.innerText = "Kuning Cerah Transparan"; colTxt.style.color = "#eab308"; }
            if (colSub) colSub.innerText = "Kadar kepekatan urobilin normal";
            if (statTxt) { statTxt.innerText = "✅ Cukup Terhidrasi"; statTxt.style.color = "#10b981"; }
            if (statSub) statSub.innerText = "Kondisi kerja ginjal sehat dan stabil";
        } else {
            // Banyak Minum / Optimal
            if (fill) { fill.style.height = "85%"; fill.style.background = "#fef08a"; }
            if (mlTxt) mlTxt.innerText = "2.200 mL";
            if (adhTxt) { adhTxt.innerText = "Rendah (Dihambat)"; adhTxt.style.color = "#10b981"; }
            if (adhSub) adhSub.innerText = "Air diserap sedikit di tubulus, kelebihan dibuang lancar";
            if (colTxt) { colTxt.innerText = "Kuning Pucat Bening"; colTxt.style.color = "#a3e635"; }
            if (colSub) colSub.innerText = "Urobilin sangat encer dalam cairan berlimpah";
            if (statTxt) { statTxt.innerText = "🌟 Sangat Optimal & Sehat"; statTxt.style.color = "#10b981"; }
            if (statSub) statSub.innerText = "Ginjal bekerja optimal membuang racun!";
        }
    },

    /* Matrix Challenge */
    checkMatrixChallenge() {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        const m1 = document.getElementById('mat-sel-1').value;
        const m2 = document.getElementById('mat-sel-2').value;
        const m3 = document.getElementById('mat-sel-3').value;
        const m4 = document.getElementById('mat-sel-4').value;
        const m5 = document.getElementById('mat-sel-5').value;

        const fb = document.getElementById('matriks-feedback-text');
        if (!fb) return;

        if (m1 === 'kelenjar_keringat' && m2 === 'biang_keringat' && m3 === 'co2_h2o' && m4 === 'empedu_urea' && m5 === 'nefron') {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playCorrect) AudioSynth.playCorrect();
            fb.style.color = "#10b981";
            fb.innerText = "Luar Biasa! Semua isian matriks organ 100% Benar! (Skor: 100 Poin)";
        } else {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playWrong) AudioSynth.playWrong();
            fb.style.color = "#ef4444";
            fb.innerText = "Masih ada pilihan yang belum tepat. Periksa kembali pasangan organ, zat sisa, dan gangguannya!";
        }
    },

    answerCase(caseKey, opt) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        const group = document.querySelector(`.case-options[data-case="${caseKey}"]`);
        if (group) {
            group.querySelectorAll('.btn-case-opt').forEach(b => b.classList.remove('selected'));
        }

        const fb = document.getElementById(`case-fb-${caseKey}`);
        if (!fb) return;
        fb.classList.remove('hidden');

        if (caseKey === 'c1') {
            if (opt === 'B') {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playCorrect) AudioSynth.playCorrect();
                fb.className = "case-feedback-box fb-correct";
                fb.innerHTML = `<strong>Tepat Sekali! Analisis Medis Akurat! 🎉</strong><br>Pada orang sehat, glukosa lolos pada tahap filtrasi di glomerulus, tetapi <strong>100% diserap kembali (reabsorpsi) di Tubulus Kontortus Proksimal (TKP)</strong>. Jika glukosa ditemukan di urine, berarti kadar gula darah melebihi ambang batas ginjal (<em>Diabetes Melitus</em>) sehingga TKP tidak mampu menyerap seluruhnya.`;
            } else {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playWrong) AudioSynth.playWrong();
                fb.className = "case-feedback-box fb-wrong";
                fb.innerHTML = `<strong>Belum Tepat.</strong> Glukosa memang lolos di glomerulus saat filtrasi, tetapi harus diserap kembali di <strong>TKP saat tahap reabsorpsi (Pilihan B)</strong>.`;
            }
        } else if (caseKey === 'c2') {
            if (opt === 'A') {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playCorrect) AudioSynth.playCorrect();
                fb.className = "case-feedback-box fb-correct";
                fb.innerHTML = `<strong>Sangat Tepat! Pemahaman Fisiologismu Luar Biasa! 🎉</strong><br>Di udara dingin, tubuh harus menghemat panas dengan melakukan <em>vasokonstriksi</em> (penyempitan pembuluh darah di dermis kulit) sehingga keringat berkurang drastis. Akibatnya, kelebihan cairan tubuh tidak bisa keluar lewat kulit dan dialihkan untuk disaring serta dibuang oleh ginjal dalam bentuk urine.`;
            } else {
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playWrong) AudioSynth.playWrong();
                fb.className = "case-feedback-box fb-wrong";
                fb.innerHTML = `<strong>Kurang Tepat.</strong> Udara dingin menyebabkan vasokonstriksi kapiler kulit sehingga produksi keringat ditekan untuk menjaga panas. Kelebihan cairan tubuh dialihkan untuk dibuang lewat ginjal (Pilihan A).`;
            }
        }
    },

    /* Mini Quiz Renderer for Organ Slides */
    renderMiniQuizItem(category, num, question, options, correctIdx, explanation) {
        return `
            <div class="mini-q-card card">
                <span class="mini-q-num">Soal ${num}</span>
                <p class="mini-q-text">${question}</p>
                <div class="mini-q-opts">
                    ${options.map((opt, idx) => `
                        <button class="mini-opt-btn" onclick="EkskresiModule.answerMiniQuiz('${category}', ${num}, ${idx}, ${correctIdx}, '${explanation.replace(/'/g, "\\'")}')">
                            <span class="mini-opt-letter">${['A', 'B', 'C', 'D'][idx]}</span>
                            <span>${opt}</span>
                        </button>
                    `).join('')}
                </div>
                <div class="mini-feedback-box hidden" id="mini-fb-${category}-${num}"></div>
            </div>
        `;
    },

    answerMiniQuiz(category, num, selectedIdx, correctIdx, explanation) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        const fb = document.getElementById(`mini-fb-${category}-${num}`);
        if (!fb) return;
        fb.classList.remove('hidden');

        if (selectedIdx === correctIdx) {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playCorrect) AudioSynth.playCorrect();
            fb.className = "mini-feedback-box fb-correct";
            fb.innerHTML = `<strong>Jawaban Benar! 🎉</strong> ${explanation}`;
        } else {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playWrong) AudioSynth.playWrong();
            fb.className = "mini-feedback-box fb-wrong";
            fb.innerHTML = `<strong>Belum Tepat. 🤔</strong> ${explanation}`;
        }
    },

    /* Evaluasi Final Questions (10 Soal) */
    getEvaluasiQuestions() {
        return [
            {
                topic: "Konsep Ekskresi",
                text: "Peristiwa pengeluaran zat-zat sisa hasil metabolisme kimiawi sel yang sudah tidak berguna dan bersifat racun bagi tubuh disebut...",
                options: [
                    "Defekasi",
                    "Ekskresi",
                    "Sekresi",
                    "Respirasi"
                ],
                correct: 1,
                explanation: "Ekskresi adalah proses pembuangan zat sisa hasil metabolisme seluler (urine, keringat, CO₂, empedu). Defekasi adalah pengeluaran sisa makanan (feses), dan sekresi adalah pengeluaran zat berguna oleh kelenjar."
            },
            {
                topic: "Ekskresi vs Defekasi",
                text: "Feses tidak digolongkan sebagai zat ekskresi karena...",
                options: [
                    "Berasal dari sisa makanan yang tidak dicerna di saluran pencernaan, bukan hasil metabolisme sel",
                    "Berbentuk zat padat",
                    "Dikeluarkan melalui organ ginjal",
                    "Masih dapat diserap kembali oleh darah"
                ],
                correct: 0,
                explanation: "Feses adalah sisa pencernaan mekanis & kimiawi di lumen usus yang tidak diserap (proses defekasi), bukan limbah reaksi kimia di dalam sitoplasma sel tubuh."
            },
            {
                topic: "Kulit & Termoregulasi",
                text: "Saat berolahraga berat pada siang hari, badan mengeluarkan banyak keringat. Fungsi utama pengeluaran keringat tersebut adalah...",
                options: [
                    "Mengurangi bobot lemak tubuh secara instan",
                    "Menurunkan suhu tubuh melalui proses penguapan air keringat dari kulit",
                    "Meningkatkan kadar air di dalam pembuluh darah",
                    "Membuang seluruh cadangan protein tubuh"
                ],
                correct: 1,
                explanation: "Penguapan keringat di kulit menyerap panas laten dari tubuh sehingga suhu inti tubuh turun kembali normal (~37°C), sebuah proses vital yang disebut termoregulasi."
            },
            {
                topic: "Struktur Kulit",
                text: "Kelenjar keringat (glandula sudorifera) dan pembuluh darah kapiler pada anatomi kulit manusia terletak di lapisan...",
                options: [
                    "Stratum korneum",
                    "Epidermis",
                    "Dermis (kulit jangat)",
                    "Kutikula"
                ],
                correct: 2,
                explanation: "Dermis (kulit jangat) merupakan lapisan tengah yang kaya akan kelenjar keringat, kelenjar minyak, pembuluh darah, dan ujung saraf sensorik."
            },
            {
                topic: "Paru-Paru",
                text: "Zat sisa metabolisme yang diekskresikan oleh paru-paru pada saat ekspirasi adalah...",
                options: [
                    "Karbon dioksida (CO₂) dan uap air (H₂O)",
                    "Oksigen (O₂) dan nitrogen",
                    "Urea dan amonia",
                    "Asam urat dan getah empedu"
                ],
                correct: 0,
                explanation: "Respirasi aerobik sel memecah glukosa dengan O₂ menghasilkan energi serta zat sisa CO₂ dan H₂O yang dihembuskan keluar lewat paru-paru."
            },
            {
                topic: "Hati & Perombakan Sel Darah",
                text: "Pigmen empedu bilirubin yang memberi warna kekuningan pada feses dan urine dihasilkan oleh hati dari perombakan...",
                options: [
                    "Trombosit yang telah membeku",
                    "Hemin pada sel darah merah (eritrosit) yang telah tua atau rusak",
                    "Sel darah putih (leukosit) yang melawan kuman",
                    "Kolesterol berlebih di dalam darah"
                ],
                correct: 1,
                explanation: "Eritrosit yang berusia ~120 hari dihancurkan oleh sel Kupffer di hati. Bagian hemin diubah menjadi biliverdin lalu bilirubin yang menjadi zat warna empedu."
            },
            {
                topic: "Fungsi Hati",
                text: "Gas amonia (NH₃) yang bersifat sangat beracun dari pemecahan protein akan diubah oleh hati menjadi senyawa yang lebih aman dan larut air berupa...",
                options: [
                    "Asam klorida (HCl)",
                    "Urea",
                    "Glukosa",
                    "Hemoglobin"
                ],
                correct: 1,
                explanation: "Melalui siklus ornitin di hati, amonia beracun direaksikan dengan CO₂ menghasilkan urea (CO(NH₂)₂) yang aman untuk dialirkan lewat darah ke ginjal."
            },
            {
                topic: "Tahap Pembentukan Urine",
                text: "Proses filtrasi darah di glomerulus menghasilkan filtrat yang disebut...",
                options: [
                    "Urine sesungguhnya",
                    "Urine sekunder",
                    "Urine primer (filtrat glomerulus)",
                    "Getah empedu"
                ],
                correct: 2,
                explanation: "Filtrasi di glomerulus dan Kapsul Bowman menghasilkan Urine Primer yang masih mengandung molekul kecil berguna seperti glukosa dan asam amino, tetapi bebas dari sel darah & protein besar."
            },
            {
                topic: "Reabsorpsi Nefron",
                text: "Pada orang sehat, glukosa dan asam amino yang terdapat pada urine primer akan diserap kembali seluruhnya (100%) ke dalam darah di bagian...",
                options: [
                    "Tubulus Kontortus Proksimal (TKP)",
                    "Tubulus Kontortus Distal (TKD)",
                    "Tubulus Kolektivus",
                    "Pelvis Renalis"
                ],
                correct: 0,
                explanation: "Reabsorpsi zat berguna berlangsung intensif di Tubulus Kontortus Proksimal (TKP). Glukosa dan asam amino diserap kembali secara aktif ke kapiler darah peritubuler."
            },
            {
                topic: "Gangguan Sistem Ekskresi",
                text: "Penyakit yang ditandai dengan produksi urine dalam jumlah yang sangat banyak (dapat mencapai 20-30 liter per hari) dan encer akibat kekurangan hormon ADH disebut...",
                options: [
                    "Diabetes melitus",
                    "Diabetes insipidus",
                    "Batu ginjal",
                    "Nefritis"
                ],
                correct: 1,
                explanation: "Diabetes Insipidus disebabkan oleh defisiensi hormon Antidiuretik (ADH), sehingga dinding tubulus ginjal tidak dapat menyerap kembali air secara optimal dan urine keluar sangat melimpah."
            }
        ];
    },

    setEvalAnswer(qIdx, optIdx) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        this.state.evaluasi.answers[qIdx] = optIdx;

        const card = document.getElementById(`eval-qcard-${qIdx}`);
        if (!card) return;

        card.querySelectorAll('.eval-opt-btn').forEach((b, idx) => {
            b.classList.toggle('selected', idx === optIdx);
        });

        // Update answered count
        const answeredCount = Object.keys(this.state.evaluasi.answers).length;
        const countTxt = document.getElementById('eval-answered-count');
        if (countTxt) countTxt.innerText = `${answeredCount} dari 10 Soal Dijawab`;

        const fill = document.getElementById('eval-progress-fill');
        if (fill) fill.style.width = `${(answeredCount / 10) * 100}%`;
    },

    submitEvaluasi() {
        const questions = this.getEvaluasiQuestions();
        const answers = this.state.evaluasi.answers;

        if (Object.keys(answers).length < questions.length) {
            alert(`Kamu baru menjawab ${Object.keys(answers).length} dari ${questions.length} soal. Silakan jawab semua soal terlebih dahulu!`);
            return;
        }

        let correctCount = 0;
        questions.forEach((q, idx) => {
            const userAns = answers[idx];
            const isCorrect = (userAns === q.correct);
            if (isCorrect) correctCount++;

            const exp = document.getElementById(`eval-exp-${idx}`);
            if (exp) exp.classList.remove('hidden');

            const card = document.getElementById(`eval-qcard-${idx}`);
            if (card) {
                card.querySelectorAll('.eval-opt-btn').forEach((btn, optIdx) => {
                    if (optIdx === q.correct) {
                        btn.classList.add('correct-ans');
                    } else if (optIdx === userAns) {
                        btn.classList.add('wrong-ans');
                    }
                });
            }
        });

        const score = correctCount * 10;
        this.state.evaluasi.score = score;
        this.state.evaluasi.submitted = true;

        const resultCard = document.getElementById('eval-result-card');
        const scoreVal = document.getElementById('final-score-val');
        const verdict = document.getElementById('final-verdict-text');

        if (scoreVal) scoreVal.innerText = score;
        if (verdict) {
            if (score === 100) verdict.innerText = "🌟 Luar Biasa! Pemahamanmu Sempurna (100 Poin)!";
            else if (score >= 80) verdict.innerText = "🎉 Sangat Baik! Kamu Menguasai Materi Sistem Ekskresi!";
            else if (score >= 70) verdict.innerText = "👍 Cukup Baik! Pelajari kembali poin pembahasan yang keliru.";
            else verdict.innerText = "📚 Jangan Menyerah! Baca ulang materi dan coba evaluasi lagi.";
        }

        if (resultCard) {
            resultCard.classList.remove('hidden');
            resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        const btnSubmit = document.getElementById('btn-submit-eval');
        if (btnSubmit) btnSubmit.classList.add('hidden');

        if (score >= 80) {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playTriumph) AudioSynth.playTriumph();
        } else {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playCorrect) AudioSynth.playCorrect();
        }
    },

    resetEvaluasi() {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        this.state.evaluasi.answers = {};
        this.state.evaluasi.submitted = false;
        this.state.evaluasi.score = 0;

        document.querySelectorAll('.eval-opt-btn').forEach(b => {
            b.classList.remove('selected', 'correct-ans', 'wrong-ans');
        });
        document.querySelectorAll('.eval-explanation-box').forEach(e => {
            e.classList.add('hidden');
        });

        const resultCard = document.getElementById('eval-result-card');
        if (resultCard) resultCard.classList.add('hidden');

        const btnSubmit = document.getElementById('btn-submit-eval');
        if (btnSubmit) btnSubmit.classList.remove('hidden');

        const countTxt = document.getElementById('eval-answered-count');
        if (countTxt) countTxt.innerText = "0 dari 10 Soal Dijawab";

        const fill = document.getElementById('eval-progress-fill');
        if (fill) fill.style.width = "0%";
    },

    // =========================================================================
    // LKPD INTERAKTIF MULTI-KELOMPOK (1 - 4 KELOMPOK)
    // =========================================================================
    lkpdOrganBank: {
        kulit: ["Epidermis", "Dermis", "Kelenjar keringat", "Pembuluh darah", "Jaringan Lemak Kulit Bawah"],
        paru: ["Trakea", "Bronkus", "Alveolus", "Paru-paru kanan", "Paru-paru kiri"],
        hati: ["Lobus kanan", "Lobus kiri", "Kantung empedu", "Pembuluh darah"],
        ginjal: ["Korteks", "Medula", "Pelvis", "Arteri", "Vena", "Ureter"]
    },

    lkpdMatchingKey: {
        1: "D", // Kulit -> D
        2: "B", // Ginjal -> B
        3: "A", // Hati -> A
        4: "E", // Paru-paru -> E
        5: "C"  // Ureter -> C
    },

    lkpdGroupMeta: [
        { id: 'g1', num: 1, label: 'Kelompok 1', themeClass: 'group-theme-1', badgeBg: 'background:#dcfce7; color:#166534; border:1px solid #86efac;' },
        { id: 'g2', num: 2, label: 'Kelompok 2', themeClass: 'group-theme-2', badgeBg: 'background:#e0f2fe; color:#0369a1; border:1px solid #7dd3fc;' },
        { id: 'g3', num: 3, label: 'Kelompok 3', themeClass: 'group-theme-3', badgeBg: 'background:#f3e8ff; color:#6b21a8; border:1px solid #d8b4fe;' },
        { id: 'g4', num: 4, label: 'Kelompok 4', themeClass: 'group-theme-4', badgeBg: 'background:#fef3c7; color:#92400e; border:1px solid #fcd34d;' }
    ],

    lkpdState: {
        mode: 1, // 1, 2, 3, 4
        isMode4Grid: false,
        posterSrc1: "Organ Anatomy Worksheet Poster1.png",
        posterSrc2: "LKPD_Sistem_Ekskresi.png",
        activeKb: { groupId: null, qId: null },
        kbListenerAttached: false,
        groups: {
            g1: { tab: 1, organAnswers: {}, isianValues: {1:'',2:'',3:'',4:'',5:''}, bsAnswers: {1:'',2:'',3:'',4:'',5:''}, connections: {}, activeStartDot: null, selectedDragChip: null, isDrawing: false, mousePos: {x:0, y:0}, scoreTab1: null, scoreTab2: null },
            g2: { tab: 1, organAnswers: {}, isianValues: {1:'',2:'',3:'',4:'',5:''}, bsAnswers: {1:'',2:'',3:'',4:'',5:''}, connections: {}, activeStartDot: null, selectedDragChip: null, isDrawing: false, mousePos: {x:0, y:0}, scoreTab1: null, scoreTab2: null },
            g3: { tab: 1, organAnswers: {}, isianValues: {1:'',2:'',3:'',4:'',5:''}, bsAnswers: {1:'',2:'',3:'',4:'',5:''}, connections: {}, activeStartDot: null, selectedDragChip: null, isDrawing: false, mousePos: {x:0, y:0}, scoreTab1: null, scoreTab2: null },
            g4: { tab: 1, organAnswers: {}, isianValues: {1:'',2:'',3:'',4:'',5:''}, bsAnswers: {1:'',2:'',3:'',4:'',5:''}, connections: {}, activeStartDot: null, selectedDragChip: null, isDrawing: false, mousePos: {x:0, y:0}, scoreTab1: null, scoreTab2: null }
        }
    },

    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },

    initLKPDWidget(container) {
        if (!this.lkpdState.kbListenerAttached) {
            this.lkpdState.kbListenerAttached = true;
            window.addEventListener('keydown', (e) => {
                const { groupId, qId } = this.lkpdState.activeKb;
                if (!groupId || !qId) return;

                if (e.key === 'Backspace') {
                    e.preventDefault();
                    this.keyBackspaceLKPD();
                } else if (e.key === 'Escape' || e.key === 'Enter') {
                    e.preventDefault();
                    this.closeLKPDKeyboard();
                } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    e.preventDefault();
                    this.keyPressLKPD(e.key);
                }
            });

            window.addEventListener('resize', () => {
                for (let i = 0; i < this.lkpdState.mode; i++) {
                    this.resizeLKPDCanvas(this.lkpdGroupMeta[i].id);
                }
            });
        }

        this.applyLKPDGridLayout();
    },

    setLKPDMode(num) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        this.lkpdState.mode = num;

        for (let i = 1; i <= 4; i++) {
            const b = document.getElementById(`lkpd-mode-btn-${i}`);
            if (b) {
                if (i === num) {
                    b.className = 'mode-btn-active';
                    b.style.backgroundColor = '#4f46e5';
                    b.style.color = '#ffffff';
                } else {
                    b.className = '';
                    b.style.backgroundColor = 'transparent';
                    b.style.color = '#475569';
                }
            }
        }

        const gridToggleBtn = document.getElementById('lkpd-btn-toggle-grid4');
        if (gridToggleBtn) {
            gridToggleBtn.style.display = num === 4 ? 'inline-block' : 'none';
        }

        this.applyLKPDGridLayout();
    },

    toggleLKPDMode4Grid() {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        this.lkpdState.isMode4Grid = !this.lkpdState.isMode4Grid;
        const b = document.getElementById('lkpd-btn-toggle-grid4');
        if (b) b.textContent = this.lkpdState.isMode4Grid ? '4 Kolom' : 'Grid 2x2';
        this.applyLKPDGridLayout();
    },

    applyLKPDGridLayout() {
        const viewport = document.getElementById('lkpd-grid-viewport');
        if (!viewport) return;

        viewport.className = 'lkpd-grid-viewport';
        const mode = this.lkpdState.mode;

        if (mode === 1) {
            viewport.classList.add('grid-mode-1');
        } else if (mode === 2) {
            viewport.classList.add('grid-mode-2');
        } else if (mode === 3) {
            viewport.classList.add('grid-mode-3');
        } else if (mode === 4) {
            viewport.classList.add(this.lkpdState.isMode4Grid ? 'grid-mode-4-grid' : 'grid-mode-4-col');
        }

        this.renderActiveLKPDPanels();
    },

    renderActiveLKPDPanels() {
        const viewport = document.getElementById('lkpd-grid-viewport');
        if (!viewport) return;
        viewport.innerHTML = '';

        const mode = this.lkpdState.mode;

        for (let i = 0; i < mode; i++) {
            const g = this.lkpdGroupMeta[i];
            const state = this.lkpdState.groups[g.id];
            const card = document.createElement('div');
            card.id = `lkpd-card-${g.id}`;
            card.className = `lkpd-group-card ${g.themeClass}`;

            const groupTitle = mode === 1 ? '👤 Mode Mandiri / Individu' : g.label;

            card.innerHTML = `
                <!-- Group Card Header -->
                <div class="lkpd-group-card-header">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span style="display:inline-flex; align-items:center; padding:3px 10px; border-radius:999px; font-size:0.75rem; font-weight:800; ${g.badgeBg}">
                            ${groupTitle}
                        </span>
                        <!-- Per-Group Tab Switcher -->
                        <div style="display:flex; align-items:center; background:#f1f5f9; padding:2px; border-radius:8px; border:1px solid #cbd5e1;">
                            <button id="lkpd-tab-btn-1-${g.id}" onclick="EkskresiModule.switchLKPDGroupTab('${g.id}', 1)" style="padding:3px 8px; border-radius:6px; font-size:0.7rem; font-weight:700; border:none; cursor:pointer; ${state.tab === 1 ? 'background:#ffffff; color:#4338ca; box-shadow:0 1px 3px rgba(0,0,0,0.1);' : 'background:transparent; color:#64748b;'}">
                                📑 Poster
                            </button>
                            <button id="lkpd-tab-btn-2-${g.id}" onclick="EkskresiModule.switchLKPDGroupTab('${g.id}', 2)" style="padding:3px 8px; border-radius:6px; font-size:0.7rem; font-weight:700; border:none; cursor:pointer; ${state.tab === 2 ? 'background:#ffffff; color:#4338ca; box-shadow:0 1px 3px rgba(0,0,0,0.1);' : 'background:transparent; color:#64748b;'}">
                                📝 Soal
                            </button>
                        </div>
                    </div>

                    <div style="display:flex; align-items:center; gap:6px;">
                        <span id="lkpd-score-badge-${g.id}" style="font-size:0.72rem; font-weight:800; color:#1e293b; background:#f1f5f9; padding:3px 8px; border-radius:6px; border:1px solid #cbd5e1;">
                            Skor: ${state.tab === 1 ? (state.scoreTab1 !== null ? state.scoreTab1 : '-') : (state.scoreTab2 !== null ? state.scoreTab2 : '-')}/100
                        </span>
                        <button onclick="EkskresiModule.checkLKPDGroupAnswers('${g.id}')" style="padding:3px 9px; background:#059669; color:#ffffff; font-weight:700; font-size:0.72rem; border-radius:6px; border:none; cursor:pointer; box-shadow:0 2px 4px rgba(5,150,105,0.25);">
                            Periksa
                        </button>
                        <button onclick="EkskresiModule.resetLKPDGroup('${g.id}')" style="padding:3px 7px; background:#e2e8f0; color:#334155; font-weight:600; font-size:0.72rem; border-radius:6px; border:none; cursor:pointer;">
                            Reset
                        </button>
                    </div>
                </div>

                <!-- CRITICAL: Independent Scroll Container -->
                <div class="lkpd-group-scroll-area" id="lkpd-scroll-area-${g.id}">

                    <!-- Score Result Card Per Group -->
                    <div id="lkpd-score-card-${g.id}" style="display:none; margin-bottom:10px; padding:10px 14px; background:#ffffff; border:1px solid #cbd5e1; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.04);">
                        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
                            <div style="display:flex; align-items:center; gap:8px;">
                                <span id="lkpd-score-emoji-${g.id}" style="font-size:1.8rem;">🎉</span>
                                <div>
                                    <h4 id="lkpd-score-head-${g.id}" style="font-size:0.85rem; font-weight:800; color:#0f172a; margin:0;">Hasil Penilaian</h4>
                                    <p id="lkpd-score-sub-${g.id}" style="font-size:0.7rem; color:#64748b; margin:0;"></p>
                                </div>
                            </div>
                            <div id="lkpd-score-total-${g.id}" style="font-size:1.3rem; font-weight:900; color:#059669;">100/100</div>
                        </div>
                    </div>

                    <!-- TAB 1: POSTER ANATOMI ORGAN -->
                    <div id="lkpd-tab-sec-1-${g.id}" style="display:${state.tab === 1 ? 'block' : 'none'};">
                        <div style="background:#ffffff; padding:6px 10px; border-radius:10px; border:1px solid #e2e8f0; box-shadow:0 1px 3px rgba(0,0,0,0.03); margin-bottom:8px; display:flex; align-items:center; justify-content:space-between; font-size:0.72rem;">
                            <span style="font-weight:700; color:#334155;">Pilihlah nama organ pada label dropdown:</span>
                            <span style="font-weight:800; color:#4338ca; background:#e0e7ff; padding:2px 8px; border-radius:6px;">20 Label Organ</span>
                        </div>

                        <div class="poster-container" style="border:1px solid #cbd5e1;">
                            <img 
                                id="lkpd-poster-img-1-${g.id}" 
                                src="${this.lkpdState.posterSrc1}" 
                                alt="Poster 1 Anatomi Organ" 
                                class="poster-img"
                                onerror="EkskresiModule.showLKPDFallbackPoster(1, '${g.id}')"
                            />

                            <!-- KULIT (5 Slot) -->
                            <div class="label-slot" style="top: 7.0%; left: 40.5%; width: 14.5%; height: 4.4%;">
                                <select id="p1_kulit_1_${g.id}" data-cat="kulit" data-ans="Epidermis" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                            <div class="label-slot" style="top: 17.5%; left: 41.5%; width: 14.5%; height: 4.4%;">
                                <select id="p1_kulit_2_${g.id}" data-cat="kulit" data-ans="Dermis" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                            <div class="label-slot" style="top: 27.5%; left: 41.5%; width: 14.5%; height: 4.4%;">
                                <select id="p1_kulit_3_${g.id}" data-cat="kulit" data-ans="Kelenjar keringat" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                            <div class="label-slot" style="top: 38.0%; left: 41.5%; width: 14.5%; height: 4.4%;">
                                <select id="p1_kulit_4_${g.id}" data-cat="kulit" data-ans="Pembuluh darah" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                            <div class="label-slot" style="top: 46.5%; left: 39.0%; width: 15.0%; height: 4.4%;">
                                <select id="p1_kulit_5_${g.id}" data-cat="kulit" data-ans="Jaringan Lemak Kulit Bawah" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>

                            <!-- PARU-PARU (5 Slot) -->
                            <div class="label-slot" style="top: 8.5%; left: 88.0%; width: 14.2%; height: 4.4%;">
                                <select id="p1_paru_1_${g.id}" data-cat="paru" data-ans="Trakea" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                            <div class="label-slot" style="top: 18.2%; left: 91.5%; width: 13.5%; height: 4.4%;">
                                <select id="p1_paru_2_${g.id}" data-cat="paru" data-ans="Bronkus" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                            <div class="label-slot" style="top: 30.0%; left: 92.5%; width: 13.0%; height: 4.4%;">
                                <select id="p1_paru_3_${g.id}" data-cat="paru" data-ans="Alveolus" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                            <div class="label-slot" style="top: 44.5%; left: 92.5%; width: 13.0%; height: 4.4%;">
                                <select id="p1_paru_4_${g.id}" data-cat="paru" data-ans="Paru-paru kiri" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                            <div class="label-slot" style="top: 36.0%; left: 59.8%; width: 14.5%; height: 4.4%;">
                                <select id="p1_paru_5_${g.id}" data-cat="paru" data-ans="Paru-paru kanan" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>

                            <!-- HATI (4 Slot) -->
                            <div class="label-slot" style="top: 60.5%; left: 24.8%; width: 14.0%; height: 4.4%;">
                                <select id="p1_hati_1_${g.id}" data-cat="hati" data-ans="Lobus kanan" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                            <div class="label-slot" style="top: 63.5%; left: 41.5%; width: 14.0%; height: 4.4%;">
                                <select id="p1_hati_2_${g.id}" data-cat="hati" data-ans="Lobus kiri" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                            <div class="label-slot" style="top: 94.8%; left: 13.5%; width: 14.5%; height: 4.4%;">
                                <select id="p1_hati_3_${g.id}" data-cat="hati" data-ans="Kantung empedu" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                            <div class="label-slot" style="top: 92.2%; left: 42.0%; width: 14.5%; height: 4.4%;">
                                <select id="p1_hati_4_${g.id}" data-cat="hati" data-ans="Pembuluh darah" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>

                            <!-- GINJAL (6 Slot) -->
                            <div class="label-slot" style="top: 58.0%; left: 88.5%; width: 14.5%; height: 4.4%;">
                                <select id="p1_ginjal_1_${g.id}" data-cat="ginjal" data-ans="Korteks" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                            <div class="label-slot" style="top: 66.5%; left: 90.0%; width: 14.2%; height: 4.4%;">
                                <select id="p1_ginjal_2_${g.id}" data-cat="ginjal" data-ans="Medula" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                            <div class="label-slot" style="top: 76.0%; left: 90.0%; width: 14.2%; height: 4.4%;">
                                <select id="p1_ginjal_3_${g.id}" data-cat="ginjal" data-ans="Pelvis" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                            <div class="label-slot" style="top: 75.0%; left: 63.0%; width: 11.5%; height: 4.4%;">
                                <select id="p1_ginjal_4_${g.id}" data-cat="ginjal" data-ans="Arteri" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                            <div class="label-slot" style="top: 85.5%; left: 57.5%; width: 13.0%; height: 4.4%;">
                                <select id="p1_ginjal_5_${g.id}" data-cat="ginjal" data-ans="Vena" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                            <div class="label-slot" style="top: 96.0%; left: 87.5%; width: 14.5%; height: 4.4%;">
                                <select id="p1_ginjal_6_${g.id}" data-cat="ginjal" data-ans="Ureter" class="interactive-select organ-p1-select-${g.id}"><option value="">Pilih...</option></select>
                            </div>
                        </div>
                    </div>

                    <!-- TAB 2: SOAL LATIHAN SISTEM EKSKRESI -->
                    <div id="lkpd-tab-sec-2-${g.id}" style="display:${state.tab === 2 ? 'block' : 'none'};">
                        <!-- Chips Bar -->
                        <div style="background:#ffffff; padding:6px 10px; border-radius:10px; border:1px solid #e2e8f0; box-shadow:0 1px 3px rgba(0,0,0,0.03); margin-bottom:8px; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:6px;">
                            <div style="display:flex; align-items:center; gap:6px;">
                                <span style="font-size:0.68rem; font-weight:800; color:#64748b; text-transform:uppercase;">Pilihan (B/S):</span>
                                <div 
                                    class="chip-drag" 
                                    style="padding:3px 8px; background:#10b981; color:#ffffff; font-weight:900; font-size:0.75rem; border-radius:6px; border:1px solid #059669; cursor:grab;" 
                                    draggable="true" 
                                    ondragstart="EkskresiModule.handleLKPDDragStart(event, '${g.id}', 'Benar')"
                                    onclick="EkskresiModule.selectLKPDChipForTap('${g.id}', 'Benar')">
                                    ✓ B
                                </div>
                                <div 
                                    class="chip-drag" 
                                    style="padding:3px 8px; background:#ef4444; color:#ffffff; font-weight:900; font-size:0.75rem; border-radius:6px; border:1px solid #dc2626; cursor:grab;" 
                                    draggable="true" 
                                    ondragstart="EkskresiModule.handleLKPDDragStart(event, '${g.id}', 'Salah')"
                                    onclick="EkskresiModule.selectLKPDChipForTap('${g.id}', 'Salah')">
                                    ✕ S
                                </div>
                            </div>
                            <div style="font-size:0.7rem; color:#64748b; display:flex; align-items:center; gap:6px;">
                                <span>Garis: <b id="lkpd-connected-count-${g.id}" style="color:#4f46e5;">0/5</b></span>
                                <button onclick="EkskresiModule.clearLKPDLines('${g.id}')" style="padding:2px 6px; background:#ffe4e6; color:#e11d48; border:1px solid #fecdd3; border-radius:4px; font-size:0.65rem; font-weight:700; cursor:pointer;">
                                    Hapus
                                </button>
                            </div>
                        </div>

                        <!-- Poster 2 Container -->
                        <div id="lkpd2-container-${g.id}" class="poster-container" style="border:1px solid #cbd5e1; position:relative;">
                            <img 
                                id="lkpd-poster-img-2-${g.id}" 
                                src="${this.lkpdState.posterSrc2}" 
                                alt="LKPD Soal Ekskresi" 
                                class="poster-img"
                                onerror="EkskresiModule.showLKPDFallbackPoster(2, '${g.id}')"
                            />

                            <!-- BAGIAN 1: ISIAN SINGKAT -->
                            <div id="box-isian-${g.id}-1" onclick="EkskresiModule.openLKPDKeyboard('${g.id}', 1)" class="custom-input-box" style="top: 26.2%; left: 24.5%; width: 20%; height: 2.2%;" data-ans="ginjal">
                                <span class="placeholder-text text-slate-400 font-normal italic">Ketik...</span>
                            </div>
                            <div id="box-isian-${g.id}-2" onclick="EkskresiModule.openLKPDKeyboard('${g.id}', 2)" class="custom-input-box" style="top: 31.2%; left: 33.0%; width: 23%; height: 2.2%;" data-ans="air, garam mineral, dan sedikit urea">
                                <span class="placeholder-text text-slate-400 font-normal italic">Ketik...</span>
                            </div>
                            <div id="box-isian-${g.id}-3" onclick="EkskresiModule.openLKPDKeyboard('${g.id}', 3)" class="custom-input-box" style="top: 36.2%; left: 24.5%; width: 20%; height: 2.2%;" data-ans="paru-paru">
                                <span class="placeholder-text text-slate-400 font-normal italic">Ketik...</span>
                            </div>
                            <div id="box-isian-${g.id}-4" onclick="EkskresiModule.openLKPDKeyboard('${g.id}', 4)" class="custom-input-box" style="top: 41.2%; left: 19.5%; width: 22%; height: 2.2%;" data-ans="bilirubin">
                                <span class="placeholder-text text-slate-400 font-normal italic">Ketik...</span>
                            </div>
                            <div id="box-isian-${g.id}-5" onclick="EkskresiModule.openLKPDKeyboard('${g.id}', 5)" class="custom-input-box" style="top: 46.2%; left: 21.0%; width: 20%; height: 2.2%;" data-ans="ureter">
                                <span class="placeholder-text text-slate-400 font-normal italic">Ketik...</span>
                            </div>

                            <!-- BAGIAN 2: BENAR ATAU SALAH -->
                            <div id="bs-slot-${g.id}-1" data-slot="1" data-ans="Benar" class="bs-drop-slot" style="top: 59.8%; left: 47.0%; width: 3.8%; height: 2.8%;"
                                 ondragover="EkskresiModule.handleLKPDDragOver(event)" ondragleave="EkskresiModule.handleLKPDDragLeave(event)" ondrop="EkskresiModule.handleLKPDDrop(event, '${g.id}', 1)" onclick="EkskresiModule.handleLKPDSlotClick('${g.id}', 1)"></div>
                            <div id="bs-slot-${g.id}-2" data-slot="2" data-ans="Salah" class="bs-drop-slot" style="top: 65.0%; left: 47.0%; width: 3.8%; height: 2.8%;"
                                 ondragover="EkskresiModule.handleLKPDDragOver(event)" ondragleave="EkskresiModule.handleLKPDDragLeave(event)" ondrop="EkskresiModule.handleLKPDDrop(event, '${g.id}', 2)" onclick="EkskresiModule.handleLKPDSlotClick('${g.id}', 2)"></div>
                            <div id="bs-slot-${g.id}-3" data-slot="3" data-ans="Benar" class="bs-drop-slot" style="top: 69.8%; left: 47.0%; width: 3.8%; height: 2.8%;"
                                 ondragover="EkskresiModule.handleLKPDDragOver(event)" ondragleave="EkskresiModule.handleLKPDDragLeave(event)" ondrop="EkskresiModule.handleLKPDDrop(event, '${g.id}', 3)" onclick="EkskresiModule.handleLKPDSlotClick('${g.id}', 3)"></div>
                            <div id="bs-slot-${g.id}-4" data-slot="4" data-ans="Benar" class="bs-drop-slot" style="top: 74.6%; left: 47.0%; width: 3.8%; height: 2.8%;"
                                 ondragover="EkskresiModule.handleLKPDDragOver(event)" ondragleave="EkskresiModule.handleLKPDDragLeave(event)" ondrop="EkskresiModule.handleLKPDDrop(event, '${g.id}', 4)" onclick="EkskresiModule.handleLKPDSlotClick('${g.id}', 4)"></div>
                            <div id="bs-slot-${g.id}-5" data-slot="5" data-ans="Benar" class="bs-drop-slot" style="top: 79.5%; left: 47.0%; width: 3.8%; height: 2.8%;"
                                 ondragover="EkskresiModule.handleLKPDDragOver(event)" ondragleave="EkskresiModule.handleLKPDDragLeave(event)" ondrop="EkskresiModule.handleLKPDDrop(event, '${g.id}', 5)" onclick="EkskresiModule.handleLKPDSlotClick('${g.id}', 5)"></div>

                            <!-- BAGIAN 3: MENJODOHKAN (TARIK GARIS CANVAS) -->
                            <canvas id="match-canvas-${g.id}" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:20;"></canvas>

                            <!-- Titik Kiri (1 - 5) -->
                            <div id="dot-left-${g.id}-1" class="match-dot" style="top: 31.4%; left: 77.0%;" data-side="left" data-index="1" title="Kulit"></div>
                            <div id="dot-left-${g.id}-2" class="match-dot" style="top: 45.0%; left: 77.0%;" data-side="left" data-index="2" title="Ginjal"></div>
                            <div id="dot-left-${g.id}-3" class="match-dot" style="top: 58.2%; left: 77.0%;" data-side="left" data-index="3" title="Hati"></div>
                            <div id="dot-left-${g.id}-4" class="match-dot" style="top: 72.4%; left: 77.0%;" data-side="left" data-index="4" title="Paru-paru"></div>
                            <div id="dot-left-${g.id}-5" class="match-dot" style="top: 84.4%; left: 77.0%;" data-side="left" data-index="5" title="Ureter"></div>

                            <!-- Titik Kanan (A - E) -->
                            <div id="dot-right-${g.id}-A" class="match-dot" style="top: 31.4%; left: 81.3%;" data-side="right" data-code="A" title="Hati"></div>
                            <div id="dot-right-${g.id}-B" class="match-dot" style="top: 44.8%; left: 81.3%;" data-side="right" data-code="B" title="Ginjal"></div>
                            <div id="dot-right-${g.id}-C" class="match-dot" style="top: 57.0%; left: 81.3%;" data-side="right" data-code="C" title="Ureter"></div>
                            <div id="dot-right-${g.id}-D" class="match-dot" style="top: 71.0%; left: 81.3%;" data-side="right" data-code="D" title="Kulit"></div>
                            <div id="dot-right-${g.id}-E" class="match-dot" style="top: 84.4%; left: 81.3%;" data-side="right" data-code="E" title="Paru-paru"></div>
                        </div>
                    </div>

                </div>
            `;

            viewport.appendChild(card);
            this.initLKPDGroupDropdowns(g.id);
            this.setupLKPDLineDrawing(g.id);
            this.restoreLKPDGroupInputs(g.id);
        }

        setTimeout(() => {
            for (let i = 0; i < mode; i++) {
                this.resizeLKPDCanvas(this.lkpdGroupMeta[i].id);
            }
        }, 80);
    },

    switchLKPDGroupTab(gid, tabNum) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        const state = this.lkpdState.groups[gid];
        state.tab = tabNum;

        const s1 = document.getElementById(`lkpd-tab-sec-1-${gid}`);
        const s2 = document.getElementById(`lkpd-tab-sec-2-${gid}`);
        const b1 = document.getElementById(`lkpd-tab-btn-1-${gid}`);
        const b2 = document.getElementById(`lkpd-tab-btn-2-${gid}`);
        const scoreBadge = document.getElementById(`lkpd-score-badge-${gid}`);

        if (tabNum === 1) {
            if (s1) s1.style.display = 'block';
            if (s2) s2.style.display = 'none';
            if (b1) { b1.style.background = '#ffffff'; b1.style.color = '#4338ca'; b1.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; }
            if (b2) { b2.style.background = 'transparent'; b2.style.color = '#64748b'; b2.style.boxShadow = 'none'; }
            if (scoreBadge) scoreBadge.textContent = `Skor: ${state.scoreTab1 !== null ? state.scoreTab1 : '-'}/100`;
        } else {
            if (s1) s1.style.display = 'none';
            if (s2) s2.style.display = 'block';
            if (b2) { b2.style.background = '#ffffff'; b2.style.color = '#4338ca'; b2.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; }
            if (b1) { b1.style.background = 'transparent'; b1.style.color = '#64748b'; b1.style.boxShadow = 'none'; }
            if (scoreBadge) scoreBadge.textContent = `Skor: ${state.scoreTab2 !== null ? state.scoreTab2 : '-'}/100`;
            setTimeout(() => this.resizeLKPDCanvas(gid), 60);
        }
    },

    setGlobalLKPDTab(tabNum) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        for (let i = 0; i < this.lkpdState.mode; i++) {
            this.switchLKPDGroupTab(this.lkpdGroupMeta[i].id, tabNum);
        }
    },

    initLKPDGroupDropdowns(gid) {
        const state = this.lkpdState.groups[gid];
        const selects = document.querySelectorAll(`.organ-p1-select-${gid}`);
        const shuffled = {
            kulit: this.shuffle(this.lkpdOrganBank.kulit),
            paru: this.shuffle(this.lkpdOrganBank.paru),
            hati: this.shuffle(this.lkpdOrganBank.hati),
            ginjal: this.shuffle(this.lkpdOrganBank.ginjal)
        };

        selects.forEach(sel => {
            const cat = sel.getAttribute('data-cat');
            const list = shuffled[cat] || [];
            sel.innerHTML = '<option value="">Pilih...</option>';
            list.forEach(item => {
                const opt = document.createElement('option');
                opt.value = item;
                opt.textContent = item;
                sel.appendChild(opt);
            });

            if (state.organAnswers[sel.id]) {
                sel.value = state.organAnswers[sel.id];
            }

            sel.addEventListener('change', () => {
                state.organAnswers[sel.id] = sel.value;
                sel.classList.remove('correct', 'wrong');
            });
        });
    },

    restoreLKPDGroupInputs(gid) {
        const state = this.lkpdState.groups[gid];

        for (let i = 1; i <= 5; i++) {
            const b = document.getElementById(`box-isian-${gid}-${i}`);
            const text = state.isianValues[i] || '';
            if (b) {
                if (text.trim() === '') {
                    b.innerHTML = '<span class="placeholder-text text-slate-400 font-normal italic">Ketik...</span>';
                } else {
                    b.textContent = text;
                }
            }
            this.applyLKPDBsAnswer(gid, i, state.bsAnswers[i] || '');
        }

        this.updateLKPDConnectedBadge(gid);
    },

    openLKPDKeyboard(gid, qNum) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        this.lkpdState.activeKb = { groupId: gid, qId: qNum };

        document.querySelectorAll(`.custom-input-box`).forEach(el => el.classList.remove('active-focus'));
        const activeEl = document.getElementById(`box-isian-${gid}-${qNum}`);
        if (activeEl) activeEl.classList.add('active-focus');

        const gMeta = this.lkpdGroupMeta.find(g => g.id === gid);
        const groupLabel = this.lkpdState.mode === 1 ? 'Mode Mandiri' : (gMeta ? gMeta.label : gid);
        const badge = document.getElementById('lkpd-active-kb-badge');
        if (badge) badge.textContent = groupLabel;

        const numEl = document.getElementById('lkpd-active-question-num');
        if (numEl) numEl.textContent = qNum;

        this.updateLKPDKeyboardPreview();

        const drawer = document.getElementById('lkpd-keyboard-drawer');
        if (drawer) drawer.style.transform = 'translateY(0)';
    },

    closeLKPDKeyboard() {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        const drawer = document.getElementById('lkpd-keyboard-drawer');
        if (drawer) drawer.style.transform = 'translateY(100%)';

        const { groupId, qId } = this.lkpdState.activeKb;
        if (groupId && qId) {
            const activeEl = document.getElementById(`box-isian-${groupId}-${qId}`);
            if (activeEl) activeEl.classList.remove('active-focus');
        }
        this.lkpdState.activeKb = { groupId: null, qId: null };
    },

    updateLKPDKeyboardPreview() {
        const { groupId, qId } = this.lkpdState.activeKb;
        if (!groupId || !qId) return;

        const text = this.lkpdState.groups[groupId].isianValues[qId] || '';
        const preview = document.getElementById('lkpd-keyboard-preview-text');
        if (preview) preview.textContent = text ? text : '|';

        const box = document.getElementById(`box-isian-${groupId}-${qId}`);
        if (box) {
            box.classList.remove('correct', 'wrong');
            if (text.trim() === '') {
                box.innerHTML = '<span class="placeholder-text text-slate-400 font-normal italic">Ketik...</span>';
            } else {
                box.textContent = text;
            }
        }
    },

    keyPressLKPD(char) {
        const { groupId, qId } = this.lkpdState.activeKb;
        if (!groupId || !qId) return;

        let cur = this.lkpdState.groups[groupId].isianValues[qId] || '';
        if (cur.length === 0 || cur.endsWith(' ') || cur.endsWith(', ')) {
            cur += char.toUpperCase();
        } else {
            cur += char.toLowerCase();
        }
        this.lkpdState.groups[groupId].isianValues[qId] = cur;
        this.updateLKPDKeyboardPreview();
    },

    keyBackspaceLKPD() {
        const { groupId, qId } = this.lkpdState.activeKb;
        if (!groupId || !qId) return;

        let cur = this.lkpdState.groups[groupId].isianValues[qId] || '';
        if (cur.length > 0) {
            this.lkpdState.groups[groupId].isianValues[qId] = cur.slice(0, -1);
            this.updateLKPDKeyboardPreview();
        }
    },

    keyInputClearLKPD() {
        const { groupId, qId } = this.lkpdState.activeKb;
        if (!groupId || !qId) return;
        this.lkpdState.groups[groupId].isianValues[qId] = '';
        this.updateLKPDKeyboardPreview();
    },

    handleLKPDDragStart(ev, gid, val) {
        ev.dataTransfer.setData('text/plain', val);
        ev.dataTransfer.setData('group-id', gid);
        this.lkpdState.groups[gid].selectedDragChip = val;
    },

    handleLKPDDragOver(ev) {
        ev.preventDefault();
        ev.currentTarget.classList.add('drag-over');
    },

    handleLKPDDragLeave(ev) {
        ev.currentTarget.classList.remove('drag-over');
    },

    handleLKPDDrop(ev, gid, slotNum) {
        ev.preventDefault();
        ev.currentTarget.classList.remove('drag-over');
        const val = ev.dataTransfer.getData('text/plain') || this.lkpdState.groups[gid].selectedDragChip;
        this.applyLKPDBsAnswer(gid, slotNum, val);
    },

    selectLKPDChipForTap(gid, val) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        this.lkpdState.groups[gid].selectedDragChip = val;
    },

    handleLKPDSlotClick(gid, slotNum) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        const state = this.lkpdState.groups[gid];
        if (state.selectedDragChip) {
            this.applyLKPDBsAnswer(gid, slotNum, state.selectedDragChip);
        } else {
            const cur = state.bsAnswers[slotNum];
            if (!cur) this.applyLKPDBsAnswer(gid, slotNum, 'Benar');
            else if (cur === 'Benar') this.applyLKPDBsAnswer(gid, slotNum, 'Salah');
            else this.applyLKPDBsAnswer(gid, slotNum, '');
        }
    },

    applyLKPDBsAnswer(gid, slotNum, val) {
        this.lkpdState.groups[gid].bsAnswers[slotNum] = val;
        const slot = document.getElementById(`bs-slot-${gid}-${slotNum}`);
        if (!slot) return;

        slot.classList.remove('filled-b', 'filled-s', 'correct', 'wrong');
        if (val === 'Benar') {
            slot.textContent = 'B';
            slot.classList.add('filled-b');
        } else if (val === 'Salah') {
            slot.textContent = 'S';
            slot.classList.add('filled-s');
        } else {
            slot.textContent = '';
        }
    },

    resizeLKPDCanvas(gid) {
        const container = document.getElementById(`lkpd2-container-${gid}`);
        const canvas = document.getElementById(`match-canvas-${gid}`);
        if (!container || !canvas) return;

        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        this.redrawLKPDLines(gid);
    },

    getLKPDDotCenter(el, gid) {
        const container = document.getElementById(`lkpd2-container-${gid}`);
        if (!container || !el) return { x: 0, y: 0 };
        const cRect = container.getBoundingClientRect();
        const dRect = el.getBoundingClientRect();
        return {
            x: (dRect.left + dRect.width / 2) - cRect.left,
            y: (dRect.top + dRect.height / 2) - cRect.top
        };
    },

    redrawLKPDLines(gid) {
        const canvas = document.getElementById(`match-canvas-${gid}`);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const state = this.lkpdState.groups[gid];

        for (const [leftIdx, rightCode] of Object.entries(state.connections)) {
            const leftDot = document.getElementById(`dot-left-${gid}-${leftIdx}`);
            const rightDot = document.getElementById(`dot-right-${gid}-${rightCode}`);
            if (leftDot && rightDot) {
                const p1 = this.getLKPDDotCenter(leftDot, gid);
                const p2 = this.getLKPDDotCenter(rightDot, gid);
                this.drawSmoothLKPDLine(ctx, p1.x, p1.y, p2.x, p2.y, '#3b82f6', 3.5);
            }
        }

        if (state.isDrawing && state.activeStartDot) {
            const p1 = this.getLKPDDotCenter(state.activeStartDot, gid);
            this.drawSmoothLKPDLine(ctx, p1.x, p1.y, state.mousePos.x, state.mousePos.y, '#f59e0b', 3.5, true);
        }

        this.updateLKPDConnectedBadge(gid);
    },

    drawSmoothLKPDLine(ctx, x1, y1, x2, y2, color, width, dashed = false) {
        ctx.save();
        ctx.beginPath();
        if (dashed) ctx.setLineDash([5, 5]);
        ctx.moveTo(x1, y1);

        const midX = (x1 + x2) / 2;
        ctx.bezierCurveTo(midX, y1, midX, y2, x2, y2);

        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x2, y2, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    },

    updateLKPDConnectedBadge(gid) {
        const state = this.lkpdState.groups[gid];
        const count = Object.keys(state.connections).length;
        const counterEl = document.getElementById(`lkpd-connected-count-${gid}`);
        if (counterEl) counterEl.textContent = `${count}/5`;

        document.querySelectorAll(`#lkpd2-container-${gid} .match-dot`).forEach(d => {
            d.classList.remove('connected', 'active');
        });

        for (const [leftIdx, rightCode] of Object.entries(state.connections)) {
            document.getElementById(`dot-left-${gid}-${leftIdx}`)?.classList.add('connected');
            document.getElementById(`dot-right-${gid}-${rightCode}`)?.classList.add('connected');
        }

        if (state.activeStartDot) {
            state.activeStartDot.classList.add('active');
        }
    },

    setupLKPDLineDrawing(gid) {
        const container = document.getElementById(`lkpd2-container-${gid}`);
        if (!container) return;

        const dots = container.querySelectorAll('.match-dot');
        const state = this.lkpdState.groups[gid];

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
                const side = dot.getAttribute('data-side');

                if (!state.activeStartDot) {
                    state.activeStartDot = dot;
                    state.isDrawing = false;
                    this.redrawLKPDLines(gid);
                } else {
                    const startSide = state.activeStartDot.getAttribute('data-side');
                    if (startSide !== side) {
                        const leftDot = startSide === 'left' ? state.activeStartDot : dot;
                        const rightDot = startSide === 'right' ? state.activeStartDot : dot;
                        const leftIdx = leftDot.getAttribute('data-index');
                        const rightCode = rightDot.getAttribute('data-code');
                        state.connections[leftIdx] = rightCode;
                    }
                    state.activeStartDot = null;
                    this.redrawLKPDLines(gid);
                }
            });

            dot.addEventListener('mousedown', (e) => this.startDragLKPDLine(e, gid, dot));
            dot.addEventListener('touchstart', (e) => this.startDragLKPDLine(e, gid, dot), { passive: false });
        });

        container.addEventListener('mousemove', (e) => {
            if (!state.isDrawing) return;
            const rect = container.getBoundingClientRect();
            state.mousePos.x = e.clientX - rect.left;
            state.mousePos.y = e.clientY - rect.top;
            this.redrawLKPDLines(gid);
        });

        container.addEventListener('touchmove', (e) => {
            if (!state.isDrawing) return;
            const touch = e.touches[0];
            const rect = container.getBoundingClientRect();
            state.mousePos.x = touch.clientX - rect.left;
            state.mousePos.y = touch.clientY - rect.top;
            this.redrawLKPDLines(gid);
        }, { passive: false });

        container.addEventListener('mouseup', (e) => this.endDragLKPDLine(e, gid));
        container.addEventListener('touchend', (e) => this.endDragLKPDLine(e, gid));
    },

    startDragLKPDLine(e, gid, dot) {
        e.preventDefault();
        const state = this.lkpdState.groups[gid];
        state.activeStartDot = dot;
        state.isDrawing = true;

        const container = document.getElementById(`lkpd2-container-${gid}`);
        const rect = container.getBoundingClientRect();
        const pos = e.touches ? e.touches[0] : e;
        state.mousePos.x = pos.clientX - rect.left;
        state.mousePos.y = pos.clientY - rect.top;
        this.redrawLKPDLines(gid);
    },

    endDragLKPDLine(e, gid) {
        const state = this.lkpdState.groups[gid];
        if (!state.isDrawing || !state.activeStartDot) return;
        state.isDrawing = false;

        const pos = e.changedTouches ? e.changedTouches[0] : e;
        const targetEl = document.elementFromPoint(pos.clientX, pos.clientY);

        if (targetEl && targetEl.classList.contains('match-dot')) {
            const startSide = state.activeStartDot.getAttribute('data-side');
            const targetSide = targetEl.getAttribute('data-side');

            if (startSide !== targetSide) {
                const leftDot = startSide === 'left' ? state.activeStartDot : targetEl;
                const rightDot = startSide === 'right' ? state.activeStartDot : targetEl;
                state.connections[leftDot.getAttribute('data-index')] = rightDot.getAttribute('data-code');
            }
        }

        state.activeStartDot = null;
        this.redrawLKPDLines(gid);
    },

    clearLKPDLines(gid) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        this.lkpdState.groups[gid].connections = {};
        this.redrawLKPDLines(gid);
    },

    checkLKPDGroupAnswers(gid) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playSweep) AudioSynth.playSweep();
        const state = this.lkpdState.groups[gid];
        if (state.tab === 1) {
            this.checkLKPDTab1(gid);
        } else {
            this.checkLKPDTab2(gid);
        }
    },

    checkLKPDTab1(gid) {
        const state = this.lkpdState.groups[gid];
        const selects = document.querySelectorAll(`.organ-p1-select-${gid}`);
        let total = selects.length;
        let correct = 0;

        selects.forEach(sel => {
            const ans = (sel.value || '').trim().toLowerCase();
            const expected = (sel.getAttribute('data-ans') || '').trim().toLowerCase();
            sel.classList.remove('correct', 'wrong');

            if (ans && ans === expected) {
                correct++;
                sel.classList.add('correct');
            } else {
                sel.classList.add('wrong');
            }
        });

        const score = Math.round((correct / total) * 100);
        state.scoreTab1 = score;

        this.showLKPDGroupScoreBanner(
            gid,
            `LKPD 1: Poster Organ`,
            score,
            `Menjawab benar ${correct} dari ${total} label organ.`
        );

        const badge = document.getElementById(`lkpd-score-badge-${gid}`);
        if (badge) badge.textContent = `Skor: ${score}/100`;

        if (score >= 80) {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playTriumph) AudioSynth.playTriumph();
        } else {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playCorrect) AudioSynth.playCorrect();
        }
    },

    checkLKPDTab2(gid) {
        const state = this.lkpdState.groups[gid];
        let scoreA = 0;
        let scoreB = 0;
        let scoreC = 0;

        // 1. Isian Singkat
        for (let i = 1; i <= 5; i++) {
            const box = document.getElementById(`box-isian-${gid}-${i}`);
            const user = (state.isianValues[i] || '').trim().toLowerCase();
            box?.classList.remove('correct', 'wrong');

            let isCorrect = false;
            if (i === 1 && user.includes('ginjal')) isCorrect = true;
            if (i === 2 && (user.includes('air') || user.includes('garam') || user.includes('keringat') || user.includes('urea'))) isCorrect = true;
            if (i === 3 && (user.includes('paru') || user.includes('pulmo'))) isCorrect = true;
            if (i === 4 && (user.includes('bilirubin') || user.includes('empedu'))) isCorrect = true;
            if (i === 5 && user.includes('ureter')) isCorrect = true;

            if (isCorrect) {
                scoreA++;
                box?.classList.add('correct');
            } else {
                box?.classList.add('wrong');
            }
        }

        // 2. Benar Salah
        for (let i = 1; i <= 5; i++) {
            const slot = document.getElementById(`bs-slot-${gid}-${i}`);
            const expected = slot?.getAttribute('data-ans');
            const user = state.bsAnswers[i];
            slot?.classList.remove('correct', 'wrong');

            if (user && user.toLowerCase() === expected.toLowerCase()) {
                scoreB++;
                slot?.classList.add('correct');
            } else {
                slot?.classList.add('wrong');
            }
        }

        // 3. Menjodohkan
        for (let i = 1; i <= 5; i++) {
            const paired = state.connections[i];
            if (paired && paired === this.lkpdMatchingKey[i]) {
                scoreC++;
            }
        }

        const totalCorrect = scoreA + scoreB + scoreC;
        const totalQuestions = 15;
        const score = Math.round((totalCorrect / totalQuestions) * 100);
        state.scoreTab2 = score;

        this.showLKPDGroupScoreBanner(
            gid,
            `LKPD 2: Soal Ekskresi`,
            score,
            `Isian: ${scoreA}/5 | Benar-Salah: ${scoreB}/5 | Menjodohkan: ${scoreC}/5`
        );

        const badge = document.getElementById(`lkpd-score-badge-${gid}`);
        if (badge) badge.textContent = `Skor: ${score}/100`;

        if (score >= 80) {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playTriumph) AudioSynth.playTriumph();
        } else {
            if (typeof AudioSynth !== 'undefined' && AudioSynth.playCorrect) AudioSynth.playCorrect();
        }
    },

    showLKPDGroupScoreBanner(gid, title, score, detail) {
        const banner = document.getElementById(`lkpd-score-card-${gid}`);
        const head = document.getElementById(`lkpd-score-head-${gid}`);
        const sub = document.getElementById(`lkpd-score-sub-${gid}`);
        const total = document.getElementById(`lkpd-score-total-${gid}`);
        const emoji = document.getElementById(`lkpd-score-emoji-${gid}`);

        if (!banner) return;
        banner.style.display = 'block';
        head.textContent = title;
        sub.textContent = detail;
        total.textContent = `${score}/100`;

        if (score === 100) {
            emoji.textContent = '🏆';
            total.style.color = '#059669';
        } else if (score >= 70) {
            emoji.textContent = '🌟';
            total.style.color = '#0284c7';
        } else {
            emoji.textContent = '💪';
            total.style.color = '#d97706';
        }

        banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },

    resetLKPDGroup(gid) {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        const state = this.lkpdState.groups[gid];
        const card = document.getElementById(`lkpd-score-card-${gid}`);
        if (card) card.style.display = 'none';

        if (state.tab === 1) {
            state.organAnswers = {};
            state.scoreTab1 = null;
            document.querySelectorAll(`.organ-p1-select-${gid}`).forEach(s => {
                s.value = '';
                s.classList.remove('correct', 'wrong');
            });
            this.initLKPDGroupDropdowns(gid);
        } else {
            state.isianValues = { 1: '', 2: '', 3: '', 4: '', 5: '' };
            state.bsAnswers = { 1: '', 2: '', 3: '', 4: '', 5: '' };
            state.connections = {};
            state.scoreTab2 = null;

            for (let i = 1; i <= 5; i++) {
                const b = document.getElementById(`box-isian-${gid}-${i}`);
                if (b) {
                    b.className = 'custom-input-box';
                    b.innerHTML = '<span class="placeholder-text text-slate-400 font-normal italic">Ketik...</span>';
                }
                const s = document.getElementById(`bs-slot-${gid}-${i}`);
                if (s) {
                    s.className = 'bs-drop-slot';
                    s.textContent = '';
                }
            }
            this.clearLKPDLines(gid);
            this.closeLKPDKeyboard();
        }

        const badge = document.getElementById(`lkpd-score-badge-${gid}`);
        if (badge) badge.textContent = `Skor: -/100`;
    },

    resetAllLKPDGroups() {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        for (let i = 0; i < this.lkpdState.mode; i++) {
            this.resetLKPDGroup(this.lkpdGroupMeta[i].id);
        }
    },

    checkAllLKPDLeaderboard() {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playSweep) AudioSynth.playSweep();
        const results = [];
        const mode = this.lkpdState.mode;

        for (let i = 0; i < mode; i++) {
            const g = this.lkpdGroupMeta[i];
            this.checkLKPDTab1(g.id);
            this.checkLKPDTab2(g.id);

            const s1 = this.lkpdState.groups[g.id].scoreTab1 || 0;
            const s2 = this.lkpdState.groups[g.id].scoreTab2 || 0;
            const avg = Math.round((s1 + s2) / 2);

            results.push({
                id: g.id,
                label: mode === 1 ? 'Siswa Mandiri' : g.label,
                scoreTab1: s1,
                scoreTab2: s2,
                totalAvg: avg
            });
        }

        results.sort((a, b) => b.totalAvg - a.totalAvg);

        const rankList = document.getElementById('lkpd-leaderboard-rank-list');
        if (!rankList) return;
        rankList.innerHTML = '';

        const medals = ['🥇', '🥈', '🥉', '🎗️'];

        results.forEach((r, idx) => {
            const item = document.createElement('div');
            item.style.cssText = 'display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border-radius:12px; border:1px solid #e2e8f0; background:#f8fafc;';
            item.innerHTML = `
                <div style="display:flex; align-items:center; gap:10px;">
                    <span style="font-size:1.6rem;">${medals[idx] || '⭐'}</span>
                    <div>
                        <div style="font-weight:800; font-size:0.9rem; color:#0f172a;">${r.label}</div>
                        <div style="font-size:0.75rem; color:#64748b;">LKPD 1: ${r.scoreTab1} | LKPD 2: ${r.scoreTab2}</div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <span style="font-size:0.65rem; text-transform:uppercase; font-weight:800; color:#94a3b8;">Rerata</span>
                    <div style="font-size:1.25rem; font-weight:900; color:#4f46e5;">${r.totalAvg}/100</div>
                </div>
            `;
            rankList.appendChild(item);
        });

        const modal = document.getElementById('lkpd-leaderboard-modal');
        if (modal) modal.style.display = 'flex';

        if (typeof AudioSynth !== 'undefined' && AudioSynth.playTriumph) AudioSynth.playTriumph();
    },

    closeLKPDLeaderboard() {
        if (typeof AudioSynth !== 'undefined' && AudioSynth.playClick) AudioSynth.playClick();
        const modal = document.getElementById('lkpd-leaderboard-modal');
        if (modal) modal.style.display = 'none';
    },

    handleLKPDImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.lkpdState.posterSrc1 = e.target.result;
            this.lkpdState.posterSrc2 = e.target.result;
            for (let i = 0; i < this.lkpdState.mode; i++) {
                const gid = this.lkpdGroupMeta[i].id;
                const img1 = document.getElementById(`lkpd-poster-img-1-${gid}`);
                const img2 = document.getElementById(`lkpd-poster-img-2-${gid}`);
                if (img1) img1.src = this.lkpdState.posterSrc1;
                if (img2) img2.src = this.lkpdState.posterSrc2;
                setTimeout(() => this.resizeLKPDCanvas(gid), 80);
            }
        };
        reader.readAsDataURL(file);
    },

    showLKPDFallbackPoster(type, gid) {
        const img = document.getElementById(`lkpd-poster-img-${type}-${gid}`);
        if (!img) return;

        if (type === 1) {
            if (!img.dataset.triedJpg) {
                img.dataset.triedJpg = 'true';
                img.src = 'Organ Anatomy Worksheet Poster1.jpg';
            } else {
                img.src = 'Organ Anatomy Worksheet Poster1.svg';
            }
        } else {
            if (!img.dataset.triedJpg) {
                img.dataset.triedJpg = 'true';
                img.src = 'LKPD_Sistem_Ekskresi.jpg';
            } else {
                img.src = 'LKPD_Sistem_Ekskresi.svg';
            }
        }
    },

    // Post-render DOM binding
    bindEvents(type, container) {
        if (type === 'ekskresi-definisi') {
            this.initDragDropDefinisi();
        } else if (type === 'ekskresi-tubuh-overview') {
            this.selectTorsoOrgan('kulit');
        } else if (type === 'ekskresi-kulit') {
            this.setKulitSim('istirahat');
        } else if (type === 'ekskresi-paru') {
            this.setParuDifusiMode('tarik');
        } else if (type === 'ekskresi-hati') {
            this.setHatiStep(1);
        } else if (type === 'ekskresi-ginjal-proses') {
            this.setUrineStage(1);
            this.setHydrationLevel(4);
        } else if (type === 'ekskresi-lkpd') {
            this.initLKPDWidget(container);
        }
    }
};

// Expose globally
window.EkskresiModule = EkskresiModule;
