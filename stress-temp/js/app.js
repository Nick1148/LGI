// ============================================
// 스트레스 온도계 - 메인 로직 (귀여운 버전)
// ============================================

const StressTempTest = {
    currentQ: 0,
    score: 50, // 기본 50에서 시작
    answers: [],

    questions: [
        {
            text: '마감이 3시간 남았는데\n아직 반도 못 했다. 나의 반응은?',
            options: [
                { text: '심장이 터질 것 같아... 일단 패닉 🫨', score: 20 },
                { text: '오히려 집중력 MAX! 불꽃 타자 시작 ⌨️', score: 5 },
                { text: '에이~ 어떻게든 되겠지 ㅋㅋ', score: -10 },
                { text: '마감? 그게 뭐 어쨌다고~ 🥱', score: -20 }
            ]
        },
        {
            text: '상사/교수가 내 결과물에\n"다시 해와"라고 했다.',
            options: [
                { text: '속에서 용암이 부글부글... 폭발 5초 전 🌋', score: 20 },
                { text: '짜증나지만 일단 참고 수정하자... 😤', score: 10 },
                { text: '피드백이니까 감사하죠~ 성장의 기회! 📝', score: -5 },
                { text: '아 네~ (이미 딴 생각 중) 🫥', score: -20 }
            ]
        },
        {
            text: '친한 친구가 약속을\n3번째 취소했다.',
            options: [
                { text: '진심 화남. 단톡방에 장문 작성 중... 😡', score: 15 },
                { text: '서운하긴 한데... 다음엔 꼭 보자 🥲', score: 5 },
                { text: '바쁘겠지 뭐~ 이해이해 ㅎㅎ', score: -10 },
                { text: '오 집에서 쉴 수 있겠다 럭키비키 🍀', score: -25 }
            ]
        },
        {
            text: '지하철에서 옆 사람이\n내 발을 밟고 사과 안 했다.',
            options: [
                { text: '하... 뒤통수 노려보기 + 속으로 욕 3단 콤보 🔥', score: 20 },
                { text: '째려보다가 한숨 쉬고 참음 😮‍💨', score: 5 },
                { text: '뭐 일부러 그런 건 아니겠지~ 🤷', score: -10 },
                { text: '에? 발 밟혔나? 몰랐음 ㅋㅋ 🫠', score: -15 }
            ]
        },
        {
            text: '기대했던 주말 계획이\n갑자기 취소됐다.',
            options: [
                { text: '진심 현타... SNS에 의미심장한 글 올림 😢', score: 15 },
                { text: '아쉽지만 다른 계획 세우자! 플랜B 가동 📋', score: 5 },
                { text: '오히려 좋아~ 집콕 찬스! 🏠', score: -15 },
                { text: '이불 속이 천국... 감사합니다 🛏️', score: -20 }
            ]
        }
    ],

    results: {
        volcano: {
            range: [80, 100],
            name: '폭발 화산',
            emoji: '🌋',
            icon: '🌋',
            temp: '100°C',
            color: '#FF6B6B',
            levelClass: 'level-100',
            description: '스트레스가 쌓이면 바로 폭발! 감정을 숨기지 않고 직접적으로 표현하는 타입. 화나면 참을 수 없지만, 한 번 터지면 금방 풀리는 스타일!',
            coolingMethods: [
                { emoji: '🥊', title: '격한 운동으로 불태우기', text: '복싱이든 러닝이든 에너지를 태워버려!' },
                { emoji: '🏔️', title: '자연 속에서 소리 지르기', text: '산 정상에서 야호~ 하면 속이 뻥' },
                { emoji: '📝', title: '감정 일기 폭풍 쓰기', text: '속에 담지 말고 다 꺼내버려요' }
            ],
            goodMatch: '🫧 무반응 젤리',
            badMatch: '🌋 폭발 화산'
        },
        pressure: {
            range: [60, 79],
            name: '압력밥솥',
            emoji: '🫕',
            icon: '🫕',
            temp: '80°C',
            color: '#FFA07A',
            levelClass: 'level-80',
            description: '겉으로는 괜찮은 척하지만 속으로는 부글부글. 참고 참다가 한 번에 터지는 타입! 가끔은 조금씩 풀어주는 연습이 필요해요.',
            coolingMethods: [
                { emoji: '🗣️', title: '친한 친구에게 수다 폭발', text: '말하면 반은 해결! TMI 폭격 가자' },
                { emoji: '🎧', title: '플레이리스트 크게 틀기', text: '이어폰 말고 스피커로 풀볼륨!' },
                { emoji: '🛁', title: '따뜻한 반신욕 + 입욕제', text: '물리적 이완이 최고의 쿨링법' }
            ],
            goodMatch: '🍵 따뜻한 차',
            badMatch: '🌋 폭발 화산'
        },
        warmtea: {
            range: [40, 59],
            name: '따뜻한 차',
            emoji: '🍵',
            icon: '🍵',
            temp: '60°C',
            color: '#FFD93D',
            levelClass: 'level-60',
            description: '스트레스를 적당히 느끼고 적당히 표현하는 밸런스형! 감정 조절을 잘하고, 자기만의 해소법을 알고 있는 건강한 타입이에요.',
            coolingMethods: [
                { emoji: '☕', title: '카페에서 혼자만의 시간', text: '조용히 생각 정리하면 리프레시 완료' },
                { emoji: '🎬', title: '좋아하는 영화/드라마 정주행', text: '다른 세계로 잠시 탈출~' },
                { emoji: '🚶', title: '동네 한 바퀴 산책', text: '가벼운 움직임이 최고의 약' }
            ],
            goodMatch: '🫕 압력밥솥',
            badMatch: '🫧 무반응 젤리'
        },
        ice: {
            range: [20, 39],
            name: '냉동 아이스',
            emoji: '🧊',
            icon: '🧊',
            temp: '20°C',
            color: '#74C0FC',
            levelClass: 'level-20',
            description: '감정을 깊이 숨기는 냉정파. 스트레스를 받아도 겉으로 티를 안 내지만, 속으로는 많이 생각하는 타입. 가끔은 표현해주세요!',
            coolingMethods: [
                { emoji: '🎮', title: '게임에 풀 몰입', text: '생각을 다른 곳으로 보내버리기' },
                { emoji: '🐱', title: '반려동물과 눈 맞춤', text: '말 없이도 위로가 되는 존재' },
                { emoji: '📱', title: '유튜브/틱톡 무한 스크롤', text: '멍 때리기가 최고의 힐링' }
            ],
            goodMatch: '🍵 따뜻한 차',
            badMatch: '🫕 압력밥솥'
        },
        jelly: {
            range: [0, 19],
            name: '무반응 젤리',
            emoji: '🫧',
            icon: '🫧',
            temp: '0°C',
            color: '#B2F2BB',
            levelClass: 'level-0',
            description: '스트레스? 그게 뭔데 먹는 건데? 대부분의 상황에서 스트레스를 거의 안 받는 무적 타입! 주변에서 부러워하는 멘탈의 소유자.',
            coolingMethods: [
                { emoji: '😴', title: '그냥 자기', text: '자고 나면 다 괜찮아~ 꿀잠이 최고' },
                { emoji: '🍕', title: '맛있는 거 시켜 먹기', text: '스트레스? 먹으면서 해소 ㅋㅋ' },
                { emoji: '🎵', title: '콧노래 부르며 일상 즐기기', text: '이미 쿨하지만 더 쿨하게~' }
            ],
            goodMatch: '🌋 폭발 화산',
            badMatch: '🍵 따뜻한 차'
        }
    },

    init() {
        document.getElementById('startBtn').addEventListener('click', () => this.start());
    },

    start() {
        Analytics.testStart('stress-temp');
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
                    ${q.options.map((opt, i) => `
                        <button class="option-btn" data-index="${i}" data-score="${opt.score}">
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
        const score = parseInt(btn.dataset.score);

        btn.classList.add('selected');
        btn.parentElement.querySelectorAll('.option-btn').forEach(b => {
            b.style.pointerEvents = 'none';
        });

        // 선택 시 미니 confetti
        this.spawnConfetti(btn);

        this.score += score;
        this.answers.push(score);
        Analytics.questionAnswer('stress-temp', this.currentQ, score);

        setTimeout(() => {
            if (this.currentQ < this.questions.length - 1) {
                this.showQuestion(this.currentQ + 1);
            } else {
                this.showCalculating();
            }
        }, 500);
    },

    spawnConfetti(btn) {
        const emojis = ['🌡️', '🔥', '❄️', '💨', '✨'];
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
            { msg: '스트레스 수치 측정 중... 🌡️', char: '🌡️', pct: 25 },
            { msg: '감정 온도 분석 중... 💭', char: '💭', pct: 50 },
            { msg: '쿨링 방법 찾는 중... ❄️', char: '❄️', pct: 75 },
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
        const finalScore = Math.max(0, Math.min(100, this.score));

        let resultType;
        if (finalScore >= 80) resultType = 'volcano';
        else if (finalScore >= 60) resultType = 'pressure';
        else if (finalScore >= 40) resultType = 'warmtea';
        else if (finalScore >= 20) resultType = 'ice';
        else resultType = 'jelly';

        return { type: resultType, percent: finalScore };
    },

    showResult() {
        document.getElementById('calcScreen').classList.remove('active');
        document.getElementById('calcScreen').style.display = 'none';

        const { type, percent } = this.calculateResult();
        const r = this.results[type];
        const resultArea = document.getElementById('resultArea');
        resultArea.style.display = 'block';
        Analytics.resultView('stress-temp', type);

        const isHigh = percent >= 60;
        const tempValue = percent;

        // 유형 미리보기 그리드 생성
        const allTypes = Object.values(this.results);
        const teaserGrid = allTypes.map(t => {
            const isCurrent = t.name === r.name;
            return `
                <div class="type-teaser-card ${isCurrent ? 'current' : ''}">
                    <span class="teaser-emoji">${t.emoji}</span>
                    <span class="teaser-name">${isCurrent ? t.name : '???'}</span>
                </div>
            `;
        }).join('');

        // 높은 온도일수록 steam 파티클 표시
        const steamParticles = isHigh ? `
            <div class="steam-particles">
                <span class="steam-particle" style="--delay: 0s; --x: -10px;">💨</span>
                <span class="steam-particle" style="--delay: 0.5s; --x: 10px;">💨</span>
                <span class="steam-particle" style="--delay: 1s; --x: -5px;">💨</span>
            </div>
        ` : '';

        resultArea.innerHTML = `
            <div class="result-container" id="resultCapture">
                <div class="result-title">당신의 스트레스 온도는...</div>

                <!-- 온도계 프레임 -->
                <div class="thermometer-frame">
                    ${steamParticles}
                    <div class="thermometer-container">
                        <div class="thermometer-scale">
                            <span class="scale-mark" style="bottom: 100%;">100°C</span>
                            <span class="scale-mark" style="bottom: 75%;">75°C</span>
                            <span class="scale-mark" style="bottom: 50%;">50°C</span>
                            <span class="scale-mark" style="bottom: 25%;">25°C</span>
                            <span class="scale-mark" style="bottom: 0%;">0°C</span>
                        </div>
                        <div class="thermometer-outer">
                            <div class="thermometer-fill ${r.levelClass}" id="thermoFill" style="height: 0%"></div>
                            <div class="thermometer-temp" id="thermoTemp">0°C</div>
                        </div>
                        <div class="thermometer-bulb ${r.levelClass}">
                            <div class="bulb-inner ${r.levelClass}"></div>
                        </div>
                    </div>
                    <div class="thermometer-emoji">${r.emoji}</div>
                </div>

                <div class="result-type-name">${r.emoji} ${r.name}</div>
                <p class="result-description">${r.description}</p>

                ${isHigh ? `
                    <div class="high-temp-warning">
                        <p>쿨링이 필요해요! ❄️<br>아래 쿨링 방법을 참고해보세요.</p>
                    </div>
                ` : ''}

                <!-- 쿨링 방법 -->
                <div class="cooling-section">
                    <h3>나만의 쿨링 방법 ❄️</h3>
                    ${r.coolingMethods.map(c => `
                        <div class="cooling-card">
                            <span class="cooling-emoji">${c.emoji}</span>
                            <div class="cooling-text">
                                <strong>${c.title}</strong>
                                ${c.text}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- 궁합 -->
                <div class="match-section">
                    <h4>🌡️ 온도 궁합</h4>
                    <div class="match-item">
                        <span class="match-icon">💖</span>
                        <div class="match-info">
                            <div class="match-label">잘 맞는 유형</div>
                            <div class="match-name">${r.goodMatch}</div>
                        </div>
                    </div>
                    <div class="match-item">
                        <span class="match-icon">💔</span>
                        <div class="match-info">
                            <div class="match-label">주의할 유형</div>
                            <div class="match-name">${r.badMatch}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 바이럴 CTA -->
            <div class="viral-cta">
                <p class="viral-cta-title">🌡️ 친구의 스트레스 온도는?</p>
                <p class="viral-cta-desc">
                    나와 잘 맞는 유형: <strong>${r.goodMatch}</strong><br>
                    친구나 연인의 온도가 궁금하다면?
                </p>
                <button class="viral-cta-btn" onclick="ShareManager.copyLink()">
                    🔗 테스트 공유하기
                </button>
            </div>

            <!-- 유형 미리보기 -->
            <div class="type-teaser-section">
                <h3>총 5가지 온도가 있어요!</h3>
                <div class="type-teaser-grid">
                    ${teaserGrid}
                </div>
            </div>

            <!-- 공유 -->
            <div class="share-section">
                <p class="share-title">나는 ${r.emoji} ${r.name}이래! 너는 몇 도야? 🌡️</p>
                <div class="share-buttons">
                    <button class="share-btn kakao" onclick="ShareManager.shareKakao('나의 스트레스 온도계', '${r.emoji} ${r.name} - 당신의 스트레스 온도는? 너도 측정해봐! 🌡️', '', '')">
                        💬 카카오톡
                    </button>
                    <button class="share-btn copy-link" onclick="ShareManager.copyLink()">
                        🔗 링크 복사
                    </button>
                    <button class="share-btn twitter" onclick="ShareManager.shareTwitter('나의 스트레스 온도계: ${r.emoji} ${r.name}! 너는 몇 도야? 🌡️ #스트레스온도계 #찐테스트')">
                        🐦 트위터
                    </button>
                    <button class="share-btn instagram" onclick="ShareManager.downloadResult('resultCapture', 'stress-temp-result.png')">
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
                <a href="../social-battery/" class="test-link-card">
                    <span class="emoji">🔋</span>
                    <span class="title">나의 사회적 배터리 유형</span>
                    <span class="desc">당신의 사회적 배터리는 지금 몇 %?</span>
                </a>
                <a href="../love-algorithm/" class="test-link-card">
                    <span class="emoji">💘</span>
                    <span class="title">나의 연애 알고리즘</span>
                    <span class="desc">당신의 연애 스타일은 어떤 알고리즘?</span>
                </a>
                <a href="../money-type/" class="test-link-card">
                    <span class="emoji">💰</span>
                    <span class="title">나의 돈 쓰는 유형</span>
                    <span class="desc">당신의 소비 성향은 어떤 유형?</span>
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

        // 온도계 채우기 애니메이션
        setTimeout(() => {
            const fill = document.getElementById('thermoFill');
            const tempEl = document.getElementById('thermoTemp');
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
                if (tempEl) tempEl.textContent = current + '°C';
            }, 30);
        }, 500);

        AdManager.init();
    }
};

document.addEventListener('DOMContentLoaded', () => StressTempTest.init());
