// ============================================
// 나의 연애 알고리즘 - 메인 로직
// ============================================

const LoveAlgorithmTest = {
    currentQ: 0,
    answers: [],

    questions: [
        {
            text: '썸 타는 상대에게 먼저 연락이 왔다.\n나의 반응은?',
            options: [
                { text: '읽자마자 바로 답장 + "언제 볼래?" 직행 🚀', type: 'direct' },
                { text: '일단 읽씹하고 30분 뒤에 쿨하게 답장', type: 'slow' },
                { text: '"앗 방금 봤어ㅋㅋ" 하면서 사실 즉시 봄', type: 'random' },
                { text: '답장 속도와 이모티콘 수로 호감도 분석 중', type: 'analyze' }
            ]
        },
        {
            text: '연인과 의견이 다를 때 나는?',
            options: [
                { text: '바로 말함. "나는 이게 맞다고 생각해"', type: 'direct' },
                { text: '일단 양보하는 척하다가 나중에 내 의견 관철', type: 'pushpull' },
                { text: '서로의 입장을 천천히 들어보고 조율', type: 'slow' },
                { text: '"오케이 네가 원하면 다 해줄게" 올인', type: 'allin' }
            ]
        },
        {
            text: '이상형을 고르는 기준은?',
            options: [
                { text: '스펙, 성격, 가치관 다 체크리스트로 관리함', type: 'analyze' },
                { text: '그냥 눈 마주치는 순간 "이 사람이다" 직감!', type: 'random' },
                { text: '성격 좋고 유머 있으면 바로 어필 시작', type: 'direct' },
                { text: '나한테 진심인 사람이면 다 좋아 💝', type: 'allin' }
            ]
        },
        {
            text: '100일 기념일, 나의 스타일은?',
            options: [
                { text: '깜짝 이벤트 + 편지 + 선물 풀코스 준비', type: 'allin' },
                { text: '"기념일이었어? 아 맞다~" 하면서 은근 떠봄', type: 'pushpull' },
                { text: '"100일 축하해!" 솔직하게 기념하자', type: 'direct' },
                { text: '조용히 분위기 좋은 곳에서 둘만의 시간', type: 'slow' }
            ]
        },
        {
            text: '이별 후 나는 어떤 편?',
            options: [
                { text: '최소 3개월은 혼자 있으면서 천천히 회복', type: 'slow' },
                { text: '왜 헤어졌는지 원인 분석 + 자기 개선 돌입', type: 'analyze' },
                { text: '"다시 만나면 좋겠다" 미련 폭발 모드', type: 'allin' },
                { text: 'SNS에 감성 사진 올리면서 새 인연 기다림', type: 'random' }
            ]
        }
    ],

    results: {
        direct: {
            name: '직진 알고리즘',
            emoji: '🚀',
            matchPct: 97,
            description: '좋으면 좋다고! 마음에 들면 바로 어필하는 직진 본능. 솔직하고 적극적인 연애 스타일로, 밀당은 모르지만 진심만큼은 확실합니다.',
            matchEmoji: '📱',
            traits: ['#직진본능', '#솔직담백', '#적극어필'],
            goodMatch: '🎯 분석 알고리즘',
            badMatch: '🎭 밀당 알고리즘'
        },
        slow: {
            name: '슬로우 알고리즘',
            emoji: '🐌',
            matchPct: 85,
            description: '천천히, 확실하게. 서두르지 않고 천천히 감정을 쌓아가는 타입. 깊은 신뢰를 기반으로 한 안정적인 연애를 추구합니다.',
            traits: ['#천천히확실하게', '#신뢰우선', '#안정추구'],
            goodMatch: '💝 올인 알고리즘',
            badMatch: '🚀 직진 알고리즘'
        },
        random: {
            name: '랜덤 알고리즘',
            emoji: '🎲',
            matchPct: 78,
            description: '운명적 만남을 믿는 로맨티스트! 계획보다는 느낌으로, 머리보다는 가슴으로 연애하는 타입입니다.',
            traits: ['#운명론자', '#느낌적느낌', '#로맨티스트'],
            goodMatch: '🎭 밀당 알고리즘',
            badMatch: '🎯 분석 알고리즘'
        },
        analyze: {
            name: '분석 알고리즘',
            emoji: '🎯',
            matchPct: 92,
            description: '데이터 기반 연애! 상대의 말과 행동을 분석하고, 가능성을 계산하는 전략가 타입. 신중하지만 한 번 빠지면 깊습니다.',
            traits: ['#연애전략가', '#신중파', '#관찰의달인'],
            goodMatch: '🚀 직진 알고리즘',
            badMatch: '🎲 랜덤 알고리즘'
        },
        pushpull: {
            name: '밀당 알고리즘',
            emoji: '🎭',
            matchPct: 88,
            description: '밀고 당기기의 달인! 적절한 거리감과 긴장감으로 상대의 마음을 사로잡는 연애 고수입니다.',
            traits: ['#밀당장인', '#푸시풀전문가', '#연애고수'],
            goodMatch: '🎲 랜덤 알고리즘',
            badMatch: '🚀 직진 알고리즘'
        },
        allin: {
            name: '올인 알고리즘',
            emoji: '💝',
            matchPct: 95,
            description: '사랑하면 올인! 한 번 빠지면 모든 걸 쏟아붓는 열정파. 연인을 세상에서 제일 소중하게 여기는 로맨틱한 타입입니다.',
            traits: ['#사랑에올인', '#열정연애', '#로맨틱폭격기'],
            goodMatch: '🐌 슬로우 알고리즘',
            badMatch: '🎭 밀당 알고리즘'
        }
    },

    init() {
        document.getElementById('startBtn').addEventListener('click', () => this.start());
    },

    start() {
        Analytics.testStart('love-algorithm');
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('progressContainer').style.display = 'block';
        document.getElementById('questionArea').style.display = 'block';
        this.showQuestion(0);
    },

    showQuestion(index) {
        this.currentQ = index;
        const q = this.questions[index];
        const area = document.getElementById('questionArea');

        // 프로그레스 업데이트
        const pct = ((index) / this.questions.length) * 100;
        document.getElementById('progressFill').style.width = pct + '%';
        document.getElementById('progressText').textContent = `${index + 1} / ${this.questions.length}`;

        area.innerHTML = `
            <div class="question-card">
                <div class="question-number">Q${index + 1}</div>
                <div class="question-text">${q.text.replace(/\n/g, '<br>')}</div>
                <div class="options">
                    ${q.options.map((opt, i) => `
                        <button class="option-btn" data-index="${i}" data-type="${opt.type}">
                            ${opt.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        area.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectOption(e));
        });
    },

    selectOption(e) {
        const btn = e.currentTarget;
        const type = btn.dataset.type;

        btn.classList.add('selected');
        const allBtns = btn.parentElement.querySelectorAll('.option-btn');
        allBtns.forEach(b => { b.style.pointerEvents = 'none'; });

        // 선택 confetti
        this.spawnConfetti(btn);

        this.answers.push(type);
        Analytics.questionAnswer('love-algorithm', this.currentQ, type);

        setTimeout(() => {
            if (this.currentQ < this.questions.length - 1) {
                this.showQuestion(this.currentQ + 1);
            } else {
                this.showCalculating();
            }
        }, 500);
    },

    spawnConfetti(btn) {
        const emojis = ['✨', '💘', '💕', '💗', '🌟'];
        for (let i = 0; i < 5; i++) {
            const span = document.createElement('span');
            span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            span.style.cssText = `
                position: absolute;
                font-size: ${0.6 + Math.random() * 0.6}rem;
                left: ${20 + Math.random() * 60}%;
                top: ${20 + Math.random() * 60}%;
                pointer-events: none;
                z-index: 10;
                animation: confettiPop 0.6s ease-out forwards;
            `;
            btn.appendChild(span);
            setTimeout(() => span.remove(), 700);
        }
    },

    showCalculating() {
        document.getElementById('questionArea').style.display = 'none';
        document.getElementById('progressContainer').style.display = 'none';
        document.getElementById('calcScreen').classList.add('active');

        document.getElementById('progressFill').style.width = '100%';

        const calcText = document.querySelector('.calc-text');
        const calcChar = document.getElementById('calcChar');
        const calcProgress = document.getElementById('calcProgress');

        const stages = [
            { msg: '연애 데이터 수집 중... 💘', char: '💘', pct: 25 },
            { msg: '알고리즘 분석 중... 🔍', char: '🔍', pct: 50 },
            { msg: '매칭 유형 계산 중... 💕', char: '💕', pct: 75 },
            { msg: '결과 생성 중... ✨', char: '✨', pct: 95 }
        ];
        let stageIndex = 0;

        if (calcProgress) calcProgress.style.width = stages[0].pct + '%';

        const stageInterval = setInterval(() => {
            stageIndex++;
            if (stageIndex < stages.length) {
                calcText.textContent = stages[stageIndex].msg;
                if (calcChar) calcChar.textContent = stages[stageIndex].char;
                if (calcProgress) calcProgress.style.width = stages[stageIndex].pct + '%';
            } else {
                clearInterval(stageInterval);
            }
        }, 600);

        setTimeout(() => {
            clearInterval(stageInterval);
            if (calcProgress) calcProgress.style.width = '100%';
            this.showResult();
        }, 2500);
    },

    calculateResult() {
        const counts = {};
        this.answers.forEach(type => {
            counts[type] = (counts[type] || 0) + 1;
        });

        // 가장 많은 답변 유형 찾기
        let maxType = 'direct';
        let maxCount = 0;

        Object.entries(counts).forEach(([type, count]) => {
            if (count > maxCount) {
                maxCount = count;
                maxType = type;
            }
        });

        // 동점인 경우 특수 처리
        const tied = Object.entries(counts).filter(([, c]) => c === maxCount);
        if (tied.length >= 4) {
            return 'random'; // 거의 모든 답 다름 → 랜덤 알고리즘
        }
        if (tied.length >= 3) {
            return 'pushpull'; // 답변이 고루 분산 → 밀당 알고리즘
        }

        return maxType;
    },

    showResult() {
        document.getElementById('calcScreen').classList.remove('active');
        document.getElementById('calcScreen').style.display = 'none';

        const resultType = this.calculateResult();
        const r = this.results[resultType];
        const resultArea = document.getElementById('resultArea');
        resultArea.style.display = 'block';
        Analytics.resultView('love-algorithm', resultType);

        resultArea.innerHTML = `
            <div class="result-container" id="resultCapture">
                <div class="result-title">당신의 연애 알고리즘은...</div>

                <!-- 매칭 앱 스타일 폰 프레임 -->
                <div class="phone-frame">
                    <div class="phone-notch"></div>
                    <div class="phone-screen">
                        <!-- 매칭 앱 상단 바 -->
                        <div class="app-top-bar">
                            <span class="app-logo">💘 LoveMatch</span>
                            <span class="app-status">매칭 완료!</span>
                        </div>

                        <!-- 프로필 카드 -->
                        <div class="profile-card">
                            <div class="profile-avatar">${r.emoji}</div>
                            <div class="profile-name">${r.name}</div>

                            <!-- 매칭 퍼센트 원형 인디케이터 -->
                            <div class="match-circle-wrap">
                                <div class="match-circle" id="matchCircle">
                                    <svg viewBox="0 0 100 100" class="match-svg">
                                        <circle class="match-bg-ring" cx="50" cy="50" r="42"/>
                                        <circle class="match-fill-ring" cx="50" cy="50" r="42" id="matchRing"
                                            stroke-dasharray="263.9" stroke-dashoffset="263.9"/>
                                    </svg>
                                    <div class="match-pct-inner">
                                        <span class="match-pct-num">${r.matchPct}</span>
                                        <span class="match-pct-sign">%</span>
                                    </div>
                                </div>
                                <div class="match-label">알고리즘 일치도</div>
                            </div>

                            <p class="profile-description">${r.description}</p>
                        </div>

                        <!-- 해시태그 traits -->
                        <div class="trait-tags">
                            ${r.traits.map(t => `<span class="trait-tag">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>

                <!-- 연애 궁합 섹션 -->
                <div class="compatibility">
                    <h4>💕 연애 궁합</h4>
                    <p class="good-match">✅ 잘 맞는 유형: ${r.goodMatch}</p>
                    <p class="bad-match">⚠️ 주의할 유형: ${r.badMatch}</p>
                </div>
            </div>

            <!-- 공유 섹션 -->
            <div class="share-section">
                <p class="share-title">친구한테 공유하고 비교해봐!</p>
                <div class="share-buttons">
                    <button class="share-btn kakao" onclick="ShareManager.shareKakao('나의 연애 알고리즘 결과', '${r.emoji} ${r.name} - ${r.description.substring(0, 40)}...', '', '')">
                        💬 카카오톡
                    </button>
                    <button class="share-btn copy-link" onclick="ShareManager.copyLink()">
                        🔗 링크 복사
                    </button>
                    <button class="share-btn twitter" onclick="ShareManager.shareTwitter('나의 연애 알고리즘 결과: ${r.emoji} ${r.name}! 당신의 연애 스타일은? #찐테스트 #연애알고리즘')">
                        🐦 트위터
                    </button>
                    <button class="share-btn instagram" onclick="ShareManager.downloadResult('resultCapture', 'love-algorithm-result.png')">
                        📸 이미지 저장
                    </button>
                </div>
            </div>

            <!-- 다른 테스트 추천 -->
            <div class="other-tests">
                <h3>다른 테스트도 해보세요!</h3>
                <a href="../brain-tabs/" class="test-link-card">
                    <span class="emoji">🧠</span>
                    <span class="title">나의 뇌 속 브라우저 탭</span>
                    <span class="desc">당신의 뇌에는 지금 탭이 몇 개 열려있을까?</span>
                </a>
                <a href="../social-battery/" class="test-link-card">
                    <span class="emoji">🔋</span>
                    <span class="title">나의 사회적 배터리 잔량</span>
                    <span class="desc">당신의 사회적 배터리는 지금 몇 %?</span>
                </a>
                <a href="../stress-temp/" class="test-link-card">
                    <span class="emoji">🌡️</span>
                    <span class="title">나의 스트레스 온도계</span>
                    <span class="desc">당신의 스트레스 온도는 지금 몇 도?</span>
                </a>
                <a href="../money-type/" class="test-link-card">
                    <span class="emoji">💰</span>
                    <span class="title">나의 돈 쓰는 유형</span>
                    <span class="desc">당신의 소비 성향은 어떤 유형?</span>
                </a>
            </div>

            <!-- 광고 슬롯 (미래 광고 영역) -->
            <div class="ad-slot" id="adSlotBottom"></div>

            <!-- 다시하기 -->
            <div style="margin-top:32px;">
                <button class="start-btn" onclick="location.reload()" style="font-size:0.95rem; padding:14px 36px;">
                    🔄 다시 테스트하기
                </button>
            </div>
        `;

        // 매칭 원형 게이지 애니메이션
        setTimeout(() => {
            const matchRing = document.getElementById('matchRing');
            if (matchRing) {
                const circumference = 2 * Math.PI * 42; // ~263.9
                const offset = circumference - (circumference * r.matchPct / 100);
                matchRing.style.strokeDashoffset = offset;
            }

            // 하트 파티클 효과
            this.spawnHeartParticles();
        }, 500);

        // 광고 초기화
        AdManager.init();
    },

    spawnHeartParticles() {
        const profileCard = document.querySelector('.profile-card');
        if (!profileCard) return;
        profileCard.style.position = 'relative';

        const particles = ['💘', '💕', '💗', '💖', '✨'];
        let count = 0;
        const interval = setInterval(() => {
            if (count >= 8) { clearInterval(interval); return; }
            const span = document.createElement('span');
            span.className = 'heart-particle';
            span.textContent = particles[Math.floor(Math.random() * particles.length)];
            span.style.left = (10 + Math.random() * 80) + '%';
            span.style.top = '-5px';
            span.style.setProperty('--drift', (Math.random() * 20 - 10) + 'px');
            profileCard.appendChild(span);
            setTimeout(() => span.remove(), 1500);
            count++;
        }, 300);
    }
};

document.addEventListener('DOMContentLoaded', () => LoveAlgorithmTest.init());
