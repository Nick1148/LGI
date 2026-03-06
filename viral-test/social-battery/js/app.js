// ============================================
// 사회적 배터리 잔량 - 메인 로직
// ============================================

const SocialBatteryTest = {
    currentQ: 0,
    score: 50, // 기본 50%에서 시작
    answers: [],

    questions: [
        {
            text: '금요일 퇴근 후, 친구에게서\n"오늘 술 한잔?" 연락이 왔다.',
            options: [
                { text: '오 좋아! 어디로 갈까?', score: 20, label: '+20%' },
                { text: '누구 오는데? 멤버 보고 결정', score: 5, label: '+5%' },
                { text: '아... 오늘은 좀... (하지만 거절 못 함)', score: -10, label: '-10%' },
                { text: '읽씹 후 넷플릭스 켬', score: -20, label: '-20%' }
            ]
        },
        {
            text: '단톡방에 30개의\n안 읽은 메시지가 있다.',
            options: [
                { text: '바로 확인하고 대화에 참여', score: 10, label: '+10%' },
                { text: '슬쩍 읽고 중요한 것만 답장', score: 0, label: '±0%' },
                { text: '나중에 읽어야지... (3일 후에도 안 읽음)', score: -15, label: '-15%' },
                { text: '단톡방 알림 이미 꺼놨음', score: -25, label: '-25%' }
            ]
        },
        {
            text: '엘리베이터에서\n아는 사람을 마주쳤다.',
            options: [
                { text: '반갑게 인사하고 근황 토크', score: 15, label: '+15%' },
                { text: '가볍게 목인사 + 미소', score: 5, label: '+5%' },
                { text: '핸드폰 보는 척', score: -10, label: '-10%' },
                { text: '계단으로 간다', score: -30, label: '-30%' }
            ]
        },
        {
            text: '회사/학교에서\n팀 프로젝트를 하게 됐다.',
            options: [
                { text: '리더 자청! 역할 분배까지 함', score: 20, label: '+20%' },
                { text: '주어진 역할은 잘 해내는 팀원', score: 5, label: '+5%' },
                { text: '혼자 할 수 있는 파트 선택', score: -5, label: '-5%' },
                { text: '왜 굳이 팀으로... (내면의 비명)', score: -20, label: '-20%' }
            ]
        },
        {
            text: '오랜만에 만난 모임에서\n새로운 사람을 소개받았다.',
            options: [
                { text: '먼저 말 걸고 인스타 교환', score: 15, label: '+15%' },
                { text: '상대가 말 걸면 반응 좋게 대화', score: 5, label: '+5%' },
                { text: '옆에서 듣고만 있다가 슬쩍 빠짐', score: -15, label: '-15%' },
                { text: '화장실 간다고 하고 5분간 숨쉬기', score: -25, label: '-25%' }
            ]
        }
    ],

    results: {
        full: {
            range: [80, 100],
            name: '완충 소셜킹',
            emoji: '⚡',
            icon: '⚡',
            color: '#10b981',
            levelClass: 'level-100',
            description: '사람 만나는 게 충전! 약속 없는 주말이 더 불안한 타입. 에너지가 넘쳐서 주변 사람들까지 충전시켜 줍니다.',
            chargeMethods: [
                { emoji: '🎉', title: '대규모 모임 참석', text: '사람이 많을수록 더 신남' },
                { emoji: '📱', title: '새로운 사람과 연락', text: '인맥 확장이 취미' },
                { emoji: '🎤', title: '노래방/파티', text: '소리 지르면서 에너지 UP' }
            ],
            goodMatch: '⚡ 완충 소셜킹 (에너지 시너지!)',
            badMatch: '💀 방전 히키코모리 (이해 불가)'
        },
        good: {
            range: [60, 79],
            name: '양호한 사교인',
            emoji: '🔋',
            icon: '🔋',
            color: '#34d399',
            levelClass: 'level-80',
            description: '적당히 만나고 적당히 쉬는 밸런스형. 사회생활도 잘하지만 혼자만의 시간도 소중히 여기는 건강한 타입.',
            chargeMethods: [
                { emoji: '☕', title: '소수 친한 친구와 카페', text: '2~3명이 딱 좋아' },
                { emoji: '🎬', title: '같이 영화 보기', text: '옆에 있지만 각자의 시간' },
                { emoji: '🚶', title: '산책하며 대화', text: '부담 없는 가벼운 만남' }
            ],
            goodMatch: '🪫 절전모드 사회인 (서로 존중)',
            badMatch: '⚡ 완충 소셜킹 (너무 부담될 수 있음)'
        },
        saving: {
            range: [40, 59],
            name: '절전모드 사회인',
            emoji: '🪫',
            icon: '🪫',
            color: '#f59e0b',
            levelClass: 'level-60',
            description: '사회생활은 하지만 집이 최고. 약속 취소되면 내심 기뻐하는 타입. 에너지 관리가 중요합니다.',
            chargeMethods: [
                { emoji: '🏠', title: '집에서 혼자 쉬기', text: '넷플릭스 + 배달이면 충전 완료' },
                { emoji: '🎧', title: '음악 들으며 멍 때리기', text: '아무것도 안 하는 게 충전' },
                { emoji: '🐱', title: '반려동물과 시간 보내기', text: '말 안 해도 되는 존재가 최고' }
            ],
            goodMatch: '🔋 양호한 사교인 (적당한 거리감)',
            badMatch: '⚡ 완충 소셜킹 (에너지 뱀파이어...)'
        },
        low: {
            range: [20, 39],
            name: '저전력 경고',
            emoji: '🔴',
            icon: '🔴',
            color: '#f97316',
            levelClass: 'level-20',
            description: '사회적 에너지 위험 수준! 충전이 시급합니다. 최소 3일은 혼자 시간이 필요한 상태.',
            chargeMethods: [
                { emoji: '🛏️', title: '이불 속 완전 격리', text: '최소 하루는 아무도 안 만나기' },
                { emoji: '📵', title: '핸드폰 비행기 모드', text: '연락 차단이 최고의 충전' },
                { emoji: '🍜', title: '혼밥/혼영', text: '혼자서 즐기는 시간' }
            ],
            goodMatch: '🪫 절전모드 사회인 (서로의 공간 존중)',
            badMatch: '⚡ 완충 소셜킹 (같이 있으면 방전 가속)'
        },
        dead: {
            range: [0, 19],
            name: '방전 히키코모리',
            emoji: '💀',
            icon: '💀',
            color: '#ef4444',
            levelClass: 'level-0',
            description: '배터리 나감. 현재 사회와 연결 해제됨. 이불 속이 세상의 전부. 하지만 괜찮아요, 충전만 하면 됩니다.',
            chargeMethods: [
                { emoji: '🌙', title: '최소 일주일 완전 충전', text: '급한 연락 외 모두 거절' },
                { emoji: '🎮', title: '게임/취미에 몰입', text: '좋아하는 것에 에너지 쏟기' },
                { emoji: '😴', title: '낮잠의 왕이 되기', text: '자는 게 최고의 충전법' }
            ],
            goodMatch: '💀 방전 히키코모리 (말 안 해도 통하는 사이)',
            badMatch: '⚡ 완충 소셜킹 (다른 행성 사람)'
        }
    },

    init() {
        document.getElementById('startBtn').addEventListener('click', () => this.start());
    },

    start() {
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('progressContainer').style.display = 'block';
        document.getElementById('questionArea').style.display = 'block';
        this.showQuestion(0);
    },

    showQuestion(index) {
        this.currentQ = index;
        const q = this.questions[index];
        const area = document.getElementById('questionArea');

        const pct = ((index) / this.questions.length) * 100;
        document.getElementById('progressFill').style.width = pct + '%';
        document.getElementById('progressText').textContent = `${index + 1} / ${this.questions.length}`;

        area.innerHTML = `
            <div class="question-card">
                <div class="question-number">Q${index + 1}</div>
                <div class="question-text">${q.text.replace(/\n/g, '<br>')}</div>
                <div class="options">
                    ${q.options.map((opt, i) => {
                        const cls = opt.score > 0 ? 'positive' : opt.score < 0 ? 'negative' : 'neutral';
                        return `
                            <button class="option-btn" data-index="${i}" data-score="${opt.score}">
                                ${opt.text}
                                <span class="battery-change ${cls}">🔋${opt.label}</span>
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        area.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectOption(e));
        });
    },

    selectOption(e) {
        const btn = e.currentTarget;
        const score = parseInt(btn.dataset.score);

        btn.classList.add('selected');
        btn.parentElement.querySelectorAll('.option-btn').forEach(b => {
            b.style.pointerEvents = 'none';
        });

        this.score += score;
        this.answers.push(score);

        setTimeout(() => {
            if (this.currentQ < this.questions.length - 1) {
                this.showQuestion(this.currentQ + 1);
            } else {
                this.showCalculating();
            }
        }, 400);
    },

    showCalculating() {
        document.getElementById('questionArea').style.display = 'none';
        document.getElementById('progressContainer').style.display = 'none';
        document.getElementById('calcScreen').classList.add('active');
        document.getElementById('progressFill').style.width = '100%';

        setTimeout(() => this.showResult(), 2000);
    },

    calculateResult() {
        // 점수를 0~100 범위로 클램프
        const finalScore = Math.max(0, Math.min(100, this.score));

        let resultType;
        if (finalScore >= 80) resultType = 'full';
        else if (finalScore >= 60) resultType = 'good';
        else if (finalScore >= 40) resultType = 'saving';
        else if (finalScore >= 20) resultType = 'low';
        else resultType = 'dead';

        return { type: resultType, percent: finalScore };
    },

    showResult() {
        document.getElementById('calcScreen').classList.remove('active');
        document.getElementById('calcScreen').style.display = 'none';

        const { type, percent } = this.calculateResult();
        const r = this.results[type];
        const resultArea = document.getElementById('resultArea');
        resultArea.style.display = 'block';

        const isLow = percent < 40;

        resultArea.innerHTML = `
            <div class="result-container" id="resultCapture">
                <div class="result-title">당신의 사회적 배터리는...</div>

                <!-- 스마트폰 프레임 + 배터리 -->
                <div class="phone-frame">
                    <div class="phone-notch"></div>
                    <div class="phone-status-bar">
                        <span>사회적 에너지</span>
                        <span>${r.emoji}</span>
                    </div>
                    <div class="battery-container">
                        <div class="battery-cap"></div>
                        <div class="battery-outer">
                            <div class="battery-fill ${r.levelClass}" id="batteryFill" style="height: 0%"></div>
                            <div class="battery-percent" id="batteryPercent">0%</div>
                        </div>
                    </div>
                </div>

                <div class="result-type-name">${r.emoji} ${r.name}</div>
                <p class="result-description">${r.description}</p>

                ${isLow ? `
                    <div class="low-battery-warning">
                        <p>⚠️ 배터리 부족 경고!<br>충전이 필요합니다. 아래 충전 방법을 참고하세요.</p>
                    </div>
                ` : ''}

                <!-- 충전 방법 -->
                <div class="charge-section">
                    <h3>⚡ 나만의 충전 방법</h3>
                    ${r.chargeMethods.map(c => `
                        <div class="charge-card">
                            <span class="charge-emoji">${c.emoji}</span>
                            <div class="charge-text">
                                <strong>${c.title}</strong>
                                ${c.text}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- 궁합 -->
                <div class="match-section">
                    <h4>🔌 배터리 궁합</h4>
                    <div class="match-item">
                        <span class="match-icon">✅</span>
                        <span>잘 맞는 유형: ${r.goodMatch}</span>
                    </div>
                    <div class="match-item">
                        <span class="match-icon">⚠️</span>
                        <span>주의할 유형: ${r.badMatch}</span>
                    </div>
                </div>
            </div>

            <!-- 공유 -->
            <div class="share-section">
                <p class="share-title">친구한테 공유하고 비교해봐!</p>
                <div class="share-buttons">
                    <button class="share-btn kakao" onclick="ShareManager.shareKakao('나의 사회적 배터리 잔량', '${r.emoji} ${r.name} (${percent}%) - ${r.description.substring(0, 40)}...', '', '')">
                        💬 카카오톡
                    </button>
                    <button class="share-btn copy-link" onclick="ShareManager.copyLink()">
                        🔗 링크 복사
                    </button>
                    <button class="share-btn twitter" onclick="ShareManager.shareTwitter('나의 사회적 배터리: ${r.emoji} ${r.name} (${percent}%)! 당신의 배터리는? #찐테스트 #사회적배터리')">
                        🐦 트위터
                    </button>
                    <button class="share-btn instagram" onclick="ShareManager.downloadResult('resultCapture', 'social-battery-result.png')">
                        📸 이미지 저장
                    </button>
                </div>
            </div>

            <!-- 다른 테스트 -->
            <div class="other-tests">
                <h3>다른 테스트도 해보세요!</h3>
                <a href="../brain-tabs/" class="test-link-card">
                    <span class="emoji">🧠</span>
                    <span class="title">나의 뇌 속 브라우저 탭</span>
                    <span class="desc">당신의 뇌에는 지금 탭이 몇 개 열려있을까?</span>
                </a>
            </div>

            <!-- 광고 슬롯 -->
            <div class="ad-slot" id="adSlotBottom"></div>

            <!-- 다시하기 -->
            <div style="margin-top:32px;">
                <button class="start-btn" onclick="location.reload()" style="font-size:0.95rem; padding:14px 36px;">
                    🔄 다시 테스트하기
                </button>
            </div>
        `;

        // 배터리 채우기 애니메이션
        setTimeout(() => {
            const fill = document.getElementById('batteryFill');
            const percentEl = document.getElementById('batteryPercent');
            if (fill) fill.style.height = percent + '%';

            // 숫자 카운트업 애니메이션
            let current = 0;
            const target = percent;
            const step = Math.ceil(target / 40);
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                if (percentEl) percentEl.textContent = current + '%';
            }, 30);
        }, 500);

        AdManager.init();
    }
};

document.addEventListener('DOMContentLoaded', () => SocialBatteryTest.init());
