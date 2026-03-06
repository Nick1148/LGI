// ============================================
// 나의 뇌 속 브라우저 탭 - 메인 로직
// ============================================

const BrainTabsTest = {
    currentQ: 0,
    answers: [],

    questions: [
        {
            text: '일요일 밤, 내일 출근인데\n갑자기 드는 생각은?',
            options: [
                { text: '내일 뭐 입지... 아 그리고 점심 뭐 먹지', type: 'multi' },
                { text: '갑자기 3년 뒤 내 모습이 궁금해진다', type: 'future' },
                { text: '아까 본 릴스가 자꾸 생각남', type: 'popup' },
                { text: '별 생각 없이 천장 봄', type: 'sleep' }
            ]
        },
        {
            text: '친구가 고민 상담을 요청했다.\n나의 반응은?',
            options: [
                { text: '들으면서 동시에 해결책 3개를 구상 중', type: 'multi' },
                { text: '공감하면서도 "근데 나도 비슷한 게 있는데..."', type: 'switch' },
                { text: '100% 몰입해서 듣고 있음', type: 'sleep' },
                { text: '듣다가 갑자기 다른 생각이 떠오름', type: 'popup' }
            ]
        },
        {
            text: '샤워할 때 주로 하는 생각은?',
            options: [
                { text: '오늘 있었던 일 + 내일 계획 + 주말 약속 동시 처리', type: 'multi' },
                { text: '갑자기 초등학교 때 창피했던 기억이 소환됨', type: 'popup' },
                { text: '무의식적으로 노래 부르거나 아무 생각 없음', type: 'sleep' },
                { text: '방금 본 유튜브 영상 내용을 머릿속으로 정리', type: 'bg' }
            ]
        },
        {
            text: '잠들기 직전,\n머릿속 상태는?',
            options: [
                { text: '생각이 꼬리에 꼬리를 물어서 잠이 안 옴', type: 'multi' },
                { text: '"아 내일 그거 해야 하는데" 하나가 계속 맴돔', type: 'future' },
                { text: '이불 덮으면 3분 안에 잠듦', type: 'sleep' },
                { text: 'ASMR이나 영상 틀어놔야 잠듦', type: 'bg' }
            ]
        },
        {
            text: '카페에서 공부/작업 중일 때 나는?',
            options: [
                { text: '옆 테이블 대화 + 음악 + 작업 동시 처리 가능', type: 'multi' },
                { text: '집중하다가 갑자기 핸드폰 들여다봄', type: 'popup' },
                { text: '이어폰 끼고 완전 몰입 모드', type: 'focus' },
                { text: '30분 작업 → 인스타 10분 → 작업 반복', type: 'switch' }
            ]
        }
    ],

    results: {
        overload: {
            name: '과부하 브라우저',
            emoji: '🔥',
            tabCount: '47+',
            ram: 95,
            ramClass: 'high',
            description: 'RAM 부족 경고! 당신의 뇌는 항상 과부하 상태입니다. 생각이 끊이질 않고, 한 가지에 집중하기보다 모든 걸 동시에 처리하려는 타입.',
            tabs: [
                { favicon: '📋', title: '내일 할 일.todo', active: true },
                { favicon: '🍜', title: '점심 뭐먹지 - 검색' },
                { favicon: '💭', title: '아까 그 대화 복기.exe' },
                { favicon: '📅', title: '이번 주 약속 정리' },
                { favicon: '🎵', title: 'Spotify - 플레이리스트' },
                { favicon: '🛒', title: '쿠팡 - 장바구니' },
                { favicon: '💡', title: '갑자기 떠오른 아이디어.txt' },
                { favicon: '😰', title: '쓸데없는 고민.exe' }
            ],
            traits: ['#멀티태스킹_장인', '#잠들기_힘든_뇌', '#생각이_직업'],
            goodMatch: '절전 모드 타입 (서로 밸런스를 잡아줌)',
            badMatch: '또 다른 과부하 브라우저 (같이 있으면 뇌 폭발)'
        },
        efficient: {
            name: '효율형 브라우저',
            emoji: '🎯',
            tabCount: '3~5',
            ram: 32,
            ramClass: 'low',
            description: '필요한 탭만 딱딱 열어두는 미니멀리스트. 쓸데없는 탭은 바로 닫고, 지금 필요한 것에 집중하는 효율의 달인.',
            tabs: [
                { favicon: '📌', title: '지금 해야 할 일', active: true },
                { favicon: '📖', title: '읽고 있는 글' },
                { favicon: '🔍', title: '필요한 검색 하나' }
            ],
            traits: ['#집중력_甲', '#미니멀리스트', '#효율_중시'],
            goodMatch: '탭 순환러 (정리해주는 역할)',
            badMatch: '팝업 탭 전문가 (예측불가가 스트레스)'
        },
        switcher: {
            name: '탭 순환러',
            emoji: '🌀',
            tabCount: '15~20',
            ram: 67,
            ramClass: 'medium',
            description: '열어두고 안 보는 탭 전문가. 닫기는 불안해서 못 닫고, "나중에 볼 거야"라고 하면서 결국 안 봅니다.',
            tabs: [
                { favicon: '📰', title: '3일 전 기사 (안 읽음)' },
                { favicon: '🛒', title: '쿠팡 - 관심상품', active: true },
                { favicon: '📺', title: '나중에 볼 영상 (47개)' },
                { favicon: '📝', title: '시작도 안 한 메모' },
                { favicon: '🔖', title: '저장만 한 레시피' },
                { favicon: '📚', title: '읽을 책 리스트.hwp' }
            ],
            traits: ['#디지털_쌓기_장인', '#닫기_불안증', '#나중에_할게'],
            goodMatch: '효율형 브라우저 (정리를 도와줌)',
            badMatch: '절전 모드 (이해를 못 함)'
        },
        sleep: {
            name: '절전 모드',
            emoji: '💤',
            tabCount: '1~2',
            ram: 12,
            ramClass: 'low',
            description: '뇌 배터리 절약의 달인. 멀티태스킹? 그게 뭔데? 하나에 집중하거나, 아예 아무 생각이 없는 평화로운 뇌.',
            tabs: [
                { favicon: '😌', title: '아무 생각 없음.zen', active: true }
            ],
            traits: ['#평화로운_뇌', '#잠이_보약', '#심플_이즈_베스트'],
            goodMatch: '과부하 브라우저 (반대 매력)',
            badMatch: '탭 순환러 (답답해할 수 있음)'
        },
        popup: {
            name: '팝업 탭 전문가',
            emoji: '🎪',
            tabCount: '???',
            ram: 78,
            ramClass: 'high',
            description: '예고 없이 새 탭이 열리는 예측불가 뇌. 갑자기 과거 기억이 소환되거나, 엉뚱한 생각이 튀어나옵니다.',
            tabs: [
                { favicon: '💭', title: '갑자기 생각난 초등학교 기억' },
                { favicon: '🎵', title: '머릿속에 맴도는 노래.mp3', active: true },
                { favicon: '😳', title: '3년 전 흑역사.zip' },
                { favicon: '🤔', title: '우주는 어디까지일까.exe' },
                { favicon: '🍕', title: '갑자기 먹고 싶은 피자' }
            ],
            traits: ['#예측불가_뇌', '#창의력_폭발', '#산만한_천재'],
            goodMatch: '효율형 브라우저 (잡아주는 역할)',
            badMatch: '또 다른 팝업형 (대화 산으로 감)'
        },
        background: {
            name: '백그라운드 러너',
            emoji: '🔄',
            tabCount: '8~12',
            ram: 55,
            ramClass: 'medium',
            description: '겉으론 조용하지만 뒤에서 조용히 돌아가는 탭이 다수. 겉보기엔 멍 때리는 것 같지만 사실 뇌는 바쁘게 돌아가고 있습니다.',
            tabs: [
                { favicon: '🖥️', title: '겉으로 보이는 화면', active: true },
                { favicon: '⚙️', title: '(백그라운드) 고민 처리 중...' },
                { favicon: '🔄', title: '(백그라운드) 감정 정리.exe' },
                { favicon: '📊', title: '(백그라운드) 인생 계획 v3.2' },
                { favicon: '🎧', title: '(백그라운드) BGM 재생 중' }
            ],
            traits: ['#겉멍_속바쁨', '#내면_복잡', '#조용한_사색가'],
            goodMatch: '팝업 탭 전문가 (서로의 내면을 이해)',
            badMatch: '절전 모드 (진짜 멍인 줄 오해)'
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

        // 선택 애니메이션
        btn.classList.add('selected');
        const allBtns = btn.parentElement.querySelectorAll('.option-btn');
        allBtns.forEach(b => { b.style.pointerEvents = 'none'; });

        this.answers.push(type);

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

        // 프로그레스 100%
        document.getElementById('progressFill').style.width = '100%';

        setTimeout(() => {
            this.showResult();
        }, 2000);
    },

    calculateResult() {
        const counts = {};
        this.answers.forEach(type => {
            counts[type] = (counts[type] || 0) + 1;
        });

        // 유형 매핑
        const typeMap = {
            'multi': 'overload',
            'future': 'background',
            'popup': 'popup',
            'sleep': 'sleep',
            'focus': 'efficient',
            'switch': 'switcher',
            'bg': 'background'
        };

        // 가장 많은 답변 유형 찾기
        let maxType = 'multi';
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
            return 'popup'; // 거의 모든 답 다름 → 팝업 전문가
        }
        if (tied.length === 3) {
            return 'switcher'; // 답변이 고루 분산 → 탭 순환러
        }

        return typeMap[maxType] || 'switcher';
    },

    showResult() {
        document.getElementById('calcScreen').classList.remove('active');
        document.getElementById('calcScreen').style.display = 'none';

        const resultType = this.calculateResult();
        const r = this.results[resultType];
        const resultArea = document.getElementById('resultArea');
        resultArea.style.display = 'block';

        resultArea.innerHTML = `
            <div class="result-container" id="resultCapture">
                <div class="result-title">당신의 뇌 속 브라우저는...</div>
                <div class="tab-count-display">${r.tabCount}</div>
                <div class="tab-count-label">개의 탭이 열려있습니다</div>

                <div class="result-type-name">${r.emoji} ${r.name}</div>
                <p class="result-description">${r.description}</p>

                <!-- 브라우저 UI -->
                <div class="browser-window">
                    <div class="browser-top-bar">
                        <div class="browser-dots">
                            <span class="browser-dot red"></span>
                            <span class="browser-dot yellow"></span>
                            <span class="browser-dot green"></span>
                        </div>
                        <span class="browser-title-text">나의 뇌.brain</span>
                    </div>
                    <div class="tab-bar" id="tabBar">
                        ${r.tabs.map((tab, i) => `
                            <div class="tab-item ${tab.active ? 'active-tab' : ''}" style="animation-delay: ${i * 0.1}s">
                                <span class="tab-favicon">${tab.favicon}</span>
                                <span>${tab.title}</span>
                                <span class="tab-close">✕</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="browser-content">
                        <div class="browser-address-bar">
                            <span class="lock-icon">🔒</span>
                            <span>brain://my-thoughts/${resultType}</span>
                        </div>
                        <div class="result-main-text">${r.name}</div>
                        <div class="result-sub-text">${r.description}</div>

                        <div class="ram-usage">
                            <div class="ram-label">
                                <span>🖥️ RAM 사용량</span>
                                <span>${r.ram}%</span>
                            </div>
                            <div class="ram-bar">
                                <div class="ram-fill ${r.ramClass}" id="ramFill" style="width: 0%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="trait-tags">
                    ${r.traits.map(t => `<span class="trait-tag">${t}</span>`).join('')}
                </div>

                <div class="compatibility">
                    <h4>💕 브라우저 궁합</h4>
                    <p class="good-match">✅ 잘 맞는 유형: ${r.goodMatch}</p>
                    <p class="bad-match">⚠️ 주의할 유형: ${r.badMatch}</p>
                </div>
            </div>

            <!-- 공유 섹션 -->
            <div class="share-section">
                <p class="share-title">친구한테 공유하고 비교해봐!</p>
                <div class="share-buttons">
                    <button class="share-btn kakao" onclick="ShareManager.shareKakao('나의 뇌 속 브라우저 탭 결과', '${r.emoji} ${r.name} - ${r.description.substring(0, 40)}...', '', '')">
                        💬 카카오톡
                    </button>
                    <button class="share-btn copy-link" onclick="ShareManager.copyLink()">
                        🔗 링크 복사
                    </button>
                    <button class="share-btn twitter" onclick="ShareManager.shareTwitter('나의 뇌 속 브라우저 탭 결과: ${r.emoji} ${r.name}! 당신의 뇌에는 탭이 몇 개? #찐테스트 #뇌속탭')">
                        🐦 트위터
                    </button>
                    <button class="share-btn instagram" onclick="ShareManager.downloadResult('resultCapture', 'brain-tabs-result.png')">
                        📸 이미지 저장
                    </button>
                </div>
            </div>

            <!-- 다른 테스트 추천 -->
            <div class="other-tests">
                <h3>다른 테스트도 해보세요!</h3>
                <a href="../social-battery/" class="test-link-card">
                    <span class="emoji">🔋</span>
                    <span class="title">나의 사회적 배터리 잔량</span>
                    <span class="desc">당신의 사회적 배터리는 지금 몇 %?</span>
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

        // RAM 게이지 애니메이션
        setTimeout(() => {
            const ramFill = document.getElementById('ramFill');
            if (ramFill) ramFill.style.width = r.ram + '%';
        }, 500);

        // 광고 초기화
        AdManager.init();
    }
};

document.addEventListener('DOMContentLoaded', () => BrainTabsTest.init());
