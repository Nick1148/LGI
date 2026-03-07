// ============================================
// 나의 돈 쓰는 유형 - 메인 로직
// ============================================

const MoneyTypeTest = {
    currentQ: 0,
    answers: [],

    questions: [
        {
            text: '월급날! 통장에 돈이 들어왔다.\n가장 먼저 하는 일은?',
            options: [
                { text: '바로 위시리스트 폭격 시작 🛍️ 이 맛에 일하지~', type: 'flex' },
                { text: '일단 장바구니부터 비운다... 어? 벌써 반이 없네?', type: 'impulse' },
                { text: '자동이체 확인하고 이번 달 예산표 업데이트 📊', type: 'budget' },
                { text: '통장 잔고 캡처해서 뿌듯하게 저장 📸', type: 'squirrel' }
            ]
        },
        {
            text: '인스타에서 예쁜 카페를 발견했다.\n나의 반응은?',
            options: [
                { text: '당장 택시 타고 감. 인생은 한 번이니까! 🚕', type: 'flex' },
                { text: '일단 저장하고... 어? 근처에 있네? 바로 감 ㅋ', type: 'impulse' },
                { text: '가격대 확인하고 다음 달 카페 예산에 넣어둠', type: 'balance' },
                { text: '예쁘다~ 하고 집에서 믹스커피 탐 ☕', type: 'squirrel' }
            ]
        },
        {
            text: '친한 친구 생일이다.\n선물은?',
            options: [
                { text: '명품은 아니어도 확실하게! 감동 줄 거 사야지 💝', type: 'flex' },
                { text: '가성비 좋은 선물 + 손편지 조합으로 센스있게!', type: 'balance' },
                { text: '미리 정해둔 선물 예산 안에서 딱 맞게 구매', type: 'budget' },
                { text: '다이소에서 귀여운 거 조합... 마음이 중요하니까 🎁', type: 'squirrel' }
            ]
        },
        {
            text: '세일 70% 할인!\n마음에 드는 옷을 발견했다.',
            options: [
                { text: '70%?! 안 사면 손해지! 2개 삼 ㅋㅋ', type: 'impulse' },
                { text: '할인이든 뭐든 예쁘면 정가도 삽니다 💅', type: 'flex' },
                { text: '진짜 필요한지 3초 고민 후 하나만 겟', type: 'balance' },
                { text: '필요한 거 아니면 할인이어도 안 삼. 단호함.', type: 'budget' }
            ]
        },
        {
            text: '월말에 통장 잔고를 확인했더니\n생각보다 적다.',
            options: [
                { text: '뭐 어때~ 다음 달에 또 들어오는데 ㅎㅎ', type: 'flex' },
                { text: '어디에 썼지...? 카드값 보고 멘붕 옴 😱', type: 'impulse' },
                { text: '가계부 열어서 어디서 초과했는지 분석 시작', type: 'budget' },
                { text: '이런 일은 절대 없음. 매일 잔고 체크하니까 ✅', type: 'squirrel' }
            ]
        }
    ],

    results: {
        flex: {
            name: '플렉스 요정',
            emoji: '💸',
            description: 'YOLO가 인생 모토! 돈은 쓰라고 있는 것! 경험과 즐거움에 투자하는 타입. 인생은 한 번이니까!',
            walletStatus: '텅장',
            monthlyPattern: '월초: 부자 → 월말: 거지',
            spendingData: [95, 80, 70, 40, 10],
            traits: ['#YOLO', '#인생은한번', '#경험투자'],
            goodMatch: '🧮 가계부 박사',
            badMatch: '💸 또 다른 플렉스 요정'
        },
        budget: {
            name: '가계부 박사',
            emoji: '🧮',
            description: '1원까지 기록하는 완벽한 가계부 장인! 계획적인 소비와 철저한 관리로 재테크의 달인. 미래를 위한 투자에도 관심이 많아요.',
            walletStatus: '든든',
            monthlyPattern: '매달 일정한 지출 유지',
            spendingData: [40, 38, 42, 39, 41],
            traits: ['#가계부필수', '#계획소비', '#재테크관심'],
            goodMatch: '⚖️ 밸런스 마스터',
            badMatch: '🎰 충동구매 요정'
        },
        impulse: {
            name: '충동구매 요정',
            emoji: '🎰',
            description: '지금 안 사면 후회할 것 같아서... 결국 삽니다. 쇼핑이 스트레스 해소법인 당신! "이건 진짜 필요해"가 입버릇이에요.',
            walletStatus: '롤러코스터',
            monthlyPattern: '지출 그래프가 심전도',
            spendingData: [30, 90, 20, 85, 50],
            traits: ['#충동구매왕', '#지금안사면후회', '#쇼핑이힐링'],
            goodMatch: '🧮 가계부 박사',
            badMatch: '💸 플렉스 요정'
        },
        squirrel: {
            name: '저축 다람쥐',
            emoji: '🐿️',
            description: '아끼고 모으는 것이 행복! 세일도 안 하면 안 사고, 쿠폰 없으면 카페도 안 가는 극단적 절약파. 통장 잔고가 올라가는 게 최고의 기쁨!',
            walletStatus: '꽉 참',
            monthlyPattern: '매달 저축 목표 초과 달성',
            spendingData: [15, 12, 18, 10, 14],
            traits: ['#절약왕', '#쿠폰수집가', '#통장잔고가행복'],
            goodMatch: '⚖️ 밸런스 마스터',
            badMatch: '💸 플렉스 요정'
        },
        balance: {
            name: '밸런스 마스터',
            emoji: '⚖️',
            description: '쓸 때 쓰고 아낄 때 아끼는 완벽 밸런서! 가성비를 중요시하고, 필요한 곳에는 투자하지만 낭비는 하지 않는 현명한 소비자.',
            walletStatus: '안정',
            monthlyPattern: '적당한 지출 + 적당한 저축',
            spendingData: [50, 45, 55, 48, 50],
            traits: ['#가성비왕', '#현명한소비', '#밸런스장인'],
            goodMatch: '🧮 가계부 박사',
            badMatch: '🎰 충동구매 요정'
        }
    },

    init() {
        document.getElementById('startBtn').addEventListener('click', () => this.start());
    },

    start() {
        Analytics.testStart('money-type');
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
        Analytics.questionAnswer('money-type', this.currentQ, type);

        setTimeout(() => {
            if (this.currentQ < this.questions.length - 1) {
                this.showQuestion(this.currentQ + 1);
            } else {
                this.showCalculating();
            }
        }, 500);
    },

    spawnConfetti(btn) {
        const emojis = ['✨', '💰', '💵', '💳', '🪙'];
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
            { msg: '통장 내역 스캔 중... 💳', char: '💳', pct: 25 },
            { msg: '소비 패턴 분석 중... 📊', char: '📊', pct: 50 },
            { msg: '지갑 상태 확인 중... 👛', char: '👛', pct: 75 },
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
        let maxType = 'balance';
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
            return 'balance'; // 거의 모든 답 다름 → 밸런스 마스터
        }
        if (tied.length === 3) {
            return 'impulse'; // 답변이 고루 분산 → 충동구매 요정
        }

        return maxType;
    },

    buildSpendingGraph(data) {
        const weekLabels = ['1주', '2주', '3주', '4주', '5주'];
        return data.map((val, i) => `
            <div class="spending-bar-wrapper">
                <div class="spending-bar-bg">
                    <div class="spending-bar-fill" data-height="${val}" style="height: 0%"></div>
                </div>
                <span class="spending-bar-label">${weekLabels[i]}</span>
            </div>
        `).join('');
    },

    getWalletStatusClass(status) {
        const map = {
            '텅장': 'wallet-empty',
            '든든': 'wallet-full',
            '롤러코스터': 'wallet-roller',
            '꽉 참': 'wallet-packed',
            '안정': 'wallet-stable'
        };
        return map[status] || 'wallet-stable';
    },

    showResult() {
        document.getElementById('calcScreen').classList.remove('active');
        document.getElementById('calcScreen').style.display = 'none';

        const resultType = this.calculateResult();
        const r = this.results[resultType];
        const resultArea = document.getElementById('resultArea');
        resultArea.style.display = 'block';
        Analytics.resultView('money-type', resultType);

        resultArea.innerHTML = `
            <div class="result-container" id="resultCapture">
                <div class="result-title">당신의 소비 유형은...</div>

                <!-- 월렛 카드 -->
                <div class="wallet-card ${this.getWalletStatusClass(r.walletStatus)}">
                    <div class="wallet-card-inner">
                        <div class="wallet-chip"></div>
                        <div class="wallet-type-emoji">${r.emoji}</div>
                        <div class="wallet-type-name">${r.name}</div>
                        <div class="wallet-status">
                            <span class="wallet-status-label">지갑 상태</span>
                            <span class="wallet-status-value">${r.walletStatus}</span>
                        </div>
                        <div class="wallet-card-number">**** **** **** ${Math.floor(1000 + Math.random() * 9000)}</div>
                    </div>
                </div>

                <p class="result-description">${r.description}</p>

                <!-- 소비 패턴 그래프 -->
                <div class="spending-pattern-section">
                    <h4>📊 월간 소비 패턴</h4>
                    <p class="spending-pattern-text">${r.monthlyPattern}</p>
                    <div class="spending-graph">
                        ${this.buildSpendingGraph(r.spendingData)}
                    </div>
                </div>

                <!-- 특성 태그 -->
                <div class="trait-tags">
                    ${r.traits.map(t => `<span class="trait-tag">${t}</span>`).join('')}
                </div>

                <!-- 궁합 섹션 -->
                <div class="compatibility">
                    <h4>💕 소비 궁합</h4>
                    <p class="good-match">✅ 잘 맞는 유형: ${r.goodMatch}</p>
                    <p class="bad-match">⚠️ 주의할 유형: ${r.badMatch}</p>
                </div>
            </div>

            <!-- 공유 섹션 -->
            <div class="share-section">
                <p class="share-title">친구한테 공유하고 비교해봐!</p>
                <div class="share-buttons">
                    <button class="share-btn kakao" onclick="ShareManager.shareKakao('나의 돈 쓰는 유형 결과', '${r.emoji} ${r.name} - ${r.description.substring(0, 40)}...', '', '')">
                        💬 카카오톡
                    </button>
                    <button class="share-btn copy-link" onclick="ShareManager.copyLink()">
                        🔗 링크 복사
                    </button>
                    <button class="share-btn twitter" onclick="ShareManager.shareTwitter('나의 돈 쓰는 유형 결과: ${r.emoji} ${r.name}! 당신의 소비 유형은? #찐테스트 #돈쓰는유형')">
                        🐦 트위터
                    </button>
                    <button class="share-btn instagram" onclick="ShareManager.downloadResult('resultCapture', 'money-type-result.png')">
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
                <a href="../love-algorithm/" class="test-link-card">
                    <span class="emoji">💘</span>
                    <span class="title">나의 연애 알고리즘</span>
                    <span class="desc">당신의 연애 스타일은 어떤 알고리즘?</span>
                </a>
                <a href="../stress-temp/" class="test-link-card">
                    <span class="emoji">🌡️</span>
                    <span class="title">나의 스트레스 온도계</span>
                    <span class="desc">당신의 스트레스 온도는 지금 몇 도?</span>
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

        // 소비 그래프 애니메이션
        setTimeout(() => {
            document.querySelectorAll('.spending-bar-fill').forEach(bar => {
                bar.style.height = bar.dataset.height + '%';
            });
        }, 300);

        // 광고 초기화
        AdManager.init();
    }
};

document.addEventListener('DOMContentLoaded', () => MoneyTypeTest.init());
