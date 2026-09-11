/* =========================================================
   ENGINE DRILLING SOAL RUMAH WARD-IPA
   ========================================================= */

(function () {
    let currentQuizState = {
        kelas: 'Kelas 7',
        babKey: 'bab1',
        questions: [],
        currentIndex: 0,
        score: 0,
        answers: [],
        studentName: ''
    };

    function injectDrillingModalHTML() {
        if (document.getElementById('wardDrillingModal')) return;

        const modalHTML = `
        <div id="wardDrillingModal" class="tugas-modal-overlay" style="z-index: 99996;">
            <div class="tugas-modal-container" style="max-width: 720px; min-height: 480px;">
                <div class="tugas-modal-header" style="background: linear-gradient(135deg, #0284c7, #059669); color: white;">
                    <h3 id="drillingHeaderTitle"><i class="fa-solid fa-bullseye"></i> Drilling Soal Rumah</h3>
                    <button type="button" id="btnCloseDrillingModal" class="tugas-close-btn" style="color: white; background: transparent; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
                </div>
                <div class="tugas-modal-body" style="padding: 1.5rem; position: relative;">
                    <!-- Quiz Progress Bar -->
                    <div style="margin-bottom: 1.2rem; background: rgba(255,255,255,0.1); height: 8px; border-radius: 10px; overflow: hidden;">
                        <div id="drillingProgressBar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #38bdf8, #34d399); transition: width 0.3s ease;"></div>
                    </div>

                    <!-- Question Container -->
                    <div id="drillingQuestionArea">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <span id="drillingQuestionNumber" style="font-size: 0.85rem; font-weight: 700; color: #38bdf8; background: rgba(56,189,248,0.15); padding: 4px 12px; border-radius: 20px;">Soal 1 dari 5</span>
                            <span id="drillingStudentBadge" style="font-size: 0.85rem; color: #94a3b8; font-weight: 600;"><i class="fa-solid fa-user"></i> Siswa</span>
                        </div>

                        <h4 id="drillingQuestionText" style="font-size: 1.1rem; line-height: 1.6; color: #f8fafc; margin-bottom: 1.5rem; font-weight: 600;">
                            Pertanyaan...
                        </h4>

                        <!-- Options List -->
                        <div id="drillingOptionsContainer" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 1.5rem;">
                            <!-- Dynamic Options -->
                        </div>

                        <!-- Feedback / Explanation Box -->
                        <div id="drillingExplanationBox" style="display: none; padding: 12px 16px; border-radius: 12px; font-size: 0.9rem; margin-bottom: 1.2rem; line-height: 1.5;">
                        </div>

                        <div style="display: flex; justify-content: flex-end;">
                            <button type="button" id="btnNextDrilling" class="btn primary-btn" style="padding: 10px 24px; border-radius: 12px; font-weight: 700; background: #0284c7; color: white; border: none; cursor: pointer; display: none;">
                                Soal Selanjutnya <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Score Result Container -->
                    <div id="drillingResultArea" style="display: none; text-align: center; padding: 2rem 1rem;">
                        <div style="font-size: 3.5rem; color: #34d399; margin-bottom: 0.5rem;">
                            <i class="fa-solid fa-trophy"></i>
                        </div>
                        <h2 style="font-size: 1.8rem; font-weight: 800; color: white; margin-bottom: 0.5rem;">Latihan Selesai!</h2>
                        <p style="color: #94a3b8; font-size: 1rem; margin-bottom: 1.5rem;">Hasil Drilling Soal Rumah telah dicatat dan terkirim otomatis ke Portal Guru.</p>

                        <div style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 1.5rem; max-width: 380px; margin: 0 auto 2rem auto;">
                            <div style="font-size: 0.9rem; color: #94a3b8; margin-bottom: 6px;">Skor Akhir Anda</div>
                            <div id="drillingFinalScore" style="font-size: 3.2rem; font-weight: 800; color: #38bdf8;">100</div>
                            <div id="drillingScoreFeedback" style="font-weight: 600; font-size: 0.95rem; color: #34d399; margin-top: 6px;">Luar biasa! Pertahankan prestasi Anda!</div>
                        </div>

                        <button type="button" id="btnCloseResultModal" class="btn primary-btn" style="padding: 12px 28px; font-size: 1rem; font-weight: 700; border-radius: 12px; background: linear-gradient(135deg, #0284c7, #3b82f6); color: white; border: none; cursor: pointer;">
                            <i class="fa-solid fa-check"></i> Selesai & Kembali
                        </button>
                    </div>

                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Bind Close Buttons
        document.getElementById('btnCloseDrillingModal').addEventListener('click', closeDrillingModal);
        document.getElementById('btnCloseResultModal').addEventListener('click', closeDrillingModal);
    }

    function openDrillingModal(kelas, babKey) {
        // 1. Cek Otentikasi Siswa
        if (window.WARD_AUTH) {
            const active = window.WARD_AUTH.getActiveStudent();
            if (!active) {
                if (window.WARD_AUTH.showAuthModal) {
                    window.WARD_AUTH.showAuthModal();
                }
                return;
            }

            const check = window.WARD_AUTH.checkClassAccess(kelas.replace('Kelas ', ''));
            if (!check.allowed) {
                alert(check.message);
                return;
            }
            currentQuizState.studentName = active.name;
        }

        // 2. Ambil Soal dari Data Bank
        const classData = window.WARD_DRILLING_DATA ? window.WARD_DRILLING_DATA[kelas] : null;
        const babData = classData ? classData[babKey] : null;

        if (!babData || !babData.questions || babData.questions.length === 0) {
            alert(`Soal Drilling untuk ${kelas} ${babKey.toUpperCase()} sedang disiapkan.`);
            return;
        }

        injectDrillingModalHTML();

        currentQuizState.kelas = kelas;
        currentQuizState.babKey = babKey;
        currentQuizState.questions = babData.questions;
        currentQuizState.currentIndex = 0;
        currentQuizState.score = 0;
        currentQuizState.answers = [];

        document.getElementById('drillingHeaderTitle').innerHTML = `<i class="fa-solid fa-bullseye"></i> ${babData.title}`;
        document.getElementById('drillingQuestionArea').style.display = 'block';
        document.getElementById('drillingResultArea').style.display = 'none';

        renderQuestion();

        const modal = document.getElementById('wardDrillingModal');
        if (modal) modal.classList.add('active');
    }

    function renderQuestion() {
        const q = currentQuizState.questions[currentQuizState.currentIndex];
        const total = currentQuizState.questions.length;

        document.getElementById('drillingProgressBar').style.width = `${((currentQuizState.currentIndex) / total) * 100}%`;
        document.getElementById('drillingQuestionNumber').textContent = `Soal ${currentQuizState.currentIndex + 1} dari ${total}`;
        document.getElementById('drillingStudentBadge').innerHTML = `<i class="fa-solid fa-user"></i> ${currentQuizState.studentName}`;
        document.getElementById('drillingQuestionText').textContent = q.question;

        const optionsContainer = document.getElementById('drillingOptionsContainer');
        optionsContainer.innerHTML = '';

        const explanationBox = document.getElementById('drillingExplanationBox');
        explanationBox.style.display = 'none';

        const btnNext = document.getElementById('btnNextDrilling');
        btnNext.style.display = 'none';

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.style.cssText = `
                width: 100%;
                text-align: left;
                padding: 14px 18px;
                border-radius: 14px;
                background: rgba(30, 41, 59, 0.8);
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: #f8fafc;
                font-size: 0.95rem;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 12px;
            `;
            btn.innerHTML = `<span style="width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.1); display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; color: #38bdf8;">${String.fromCharCode(65 + idx)}</span> <span>${opt}</span>`;

            btn.addEventListener('click', () => handleOptionSelect(idx, btn));
            optionsContainer.appendChild(btn);
        });
    }

    function handleOptionSelect(selectedIndex, selectedBtn) {
        const q = currentQuizState.questions[currentQuizState.currentIndex];
        const isCorrect = selectedIndex === q.answer;

        if (isCorrect) currentQuizState.score++;

        // Disable all option buttons
        const container = document.getElementById('drillingOptionsContainer');
        const buttons = container.querySelectorAll('button');
        buttons.forEach((btn, idx) => {
            btn.disabled = true;
            btn.style.cursor = 'default';
            if (idx === q.answer) {
                btn.style.background = 'rgba(16, 185, 129, 0.2)';
                btn.style.borderColor = '#10b981';
                btn.style.color = '#6ee7b7';
            } else if (idx === selectedIndex) {
                btn.style.background = 'rgba(239, 68, 68, 0.2)';
                btn.style.borderColor = '#ef4444';
                btn.style.color = '#fca5a5';
            }
        });

        // Show Explanation
        const expBox = document.getElementById('drillingExplanationBox');
        expBox.style.display = 'block';
        if (isCorrect) {
            expBox.style.background = 'rgba(16, 185, 129, 0.15)';
            expBox.style.border = '1px solid rgba(16, 185, 129, 0.4)';
            expBox.style.color = '#a7f3d0';
            expBox.innerHTML = `<strong><i class="fa-solid fa-circle-check"></i> Jawaban Tepat!</strong><br>${q.explanation}`;
        } else {
            expBox.style.background = 'rgba(239, 68, 68, 0.15)';
            expBox.style.border = '1px solid rgba(239, 68, 68, 0.4)';
            expBox.style.color = '#fca5a5';
            expBox.innerHTML = `<strong><i class="fa-solid fa-circle-xmark"></i> Jawaban Kurang Tepat.</strong><br>Jawaban benar: <strong>${q.options[q.answer]}</strong>.<br>${q.explanation}`;
        }

        const btnNext = document.getElementById('btnNextDrilling');
        btnNext.style.display = 'inline-flex';
        btnNext.onclick = () => {
            currentQuizState.currentIndex++;
            if (currentQuizState.currentIndex < currentQuizState.questions.length) {
                renderQuestion();
            } else {
                finishDrillingQuiz();
            }
        };
    }

    function finishDrillingQuiz() {
        document.getElementById('drillingProgressBar').style.width = '100%';
        document.getElementById('drillingQuestionArea').style.display = 'none';

        const totalQ = currentQuizState.questions.length;
        const scorePercent = Math.round((currentQuizState.score / totalQ) * 100);

        document.getElementById('drillingFinalScore').textContent = scorePercent;

        const feedbackEl = document.getElementById('drillingScoreFeedback');
        if (scorePercent >= 80) {
            feedbackEl.textContent = '🎉 Luar Biasa! Pemahaman materi Anda sangat mantap!';
            feedbackEl.style.color = '#34d399';
        } else if (scorePercent >= 60) {
            feedbackEl.textContent = '👍 Bagus! Terus latih materi ini di rumah!';
            feedbackEl.style.color = '#fbbf24';
        } else {
            feedbackEl.textContent = '💪 Tetap semangat! Pelajari kembali materi bab ini dan coba lagi!';
            feedbackEl.style.color = '#fca5a5';
        }

        document.getElementById('drillingResultArea').style.display = 'block';

        // Auto Send Score to Teacher Portal
        if (window.kirimNilaiKuisKeGuru) {
            window.kirimNilaiKuisKeGuru({
                kelas: currentQuizState.kelas,
                babKey: currentQuizState.babKey,
                babTitle: `Drilling Soal Rumah (${currentQuizState.babKey.toUpperCase()})`,
                pertemuan: 'Latihan Rumah',
                category: 'mandiri',
                studentName: currentQuizState.studentName,
                title: `Hasil Drilling Soal Rumah - ${currentQuizState.babKey.toUpperCase()}`,
                score: scorePercent,
                notes: `Menjawab benar ${currentQuizState.score} dari ${totalQ} soal.`
            });
        }
    }

    function closeDrillingModal() {
        const modal = document.getElementById('wardDrillingModal');
        if (modal) modal.classList.remove('active');
    }

    // Export API Global
    window.openDrillingModal = openDrillingModal;
})();
