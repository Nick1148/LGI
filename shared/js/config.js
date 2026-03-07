// ============================================
// 사이트 설정 - 도메인 이전 시 여기만 수정
// ============================================
const SITE_CONFIG = {
    // 도메인 변경 시 이 값만 수정하면 됨
    // GitHub Pages: 'https://nick1148.github.io/LGI'
    // 커스텀 도메인: 'https://yourdomain.com'
    BASE_URL: '',  // 상대경로 사용을 위해 빈 문자열

    // OG 태그용 절대 URL (SNS 공유 시 필요)
    OG_BASE_URL: 'https://nick1148.github.io/LGI',

    // Google Analytics 4 측정 ID
    // GA4 콘솔에서 발급받은 후 여기에 입력
    GA_MEASUREMENT_ID: 'G-XXXXXXXXXX',

    // 카카오 SDK 키 (도메인 등록 후 활성화)
    KAKAO_APP_KEY: '',

    // 광고 설정
    ADS_ENABLED: false,  // 도메인 구매 + 광고 승인 후 true로 변경
    ADSENSE_CLIENT_ID: '',
    // 카카오 애드핏: https://adfit.kakao.com 에서 매체 등록 후 단위 ID 입력
    // 승인까지 영업일 1~2일 소요, 최소 출금 5만원
    ADFIT_UNIT_ID: '',

    // 사이트 정보
    SITE_NAME: '찐테스트',
    SITE_DESCRIPTION: '나를 알아보는 바이럴 심리테스트',

    // 테스트 목록
    TESTS: [
        {
            id: 'brain-tabs',
            title: '나의 뇌 속 브라우저 탭',
            description: '당신의 뇌에는 지금 탭이 몇 개 열려있을까?',
            path: './brain-tabs/',
            ogImage: './assets/og-brain-tabs.png',
            emoji: '🧠'
        },
        {
            id: 'social-battery',
            title: '나의 사회적 배터리 잔량',
            description: '당신의 사회적 배터리는 지금 몇 %?',
            path: './social-battery/',
            ogImage: './assets/og-social-battery.png',
            emoji: '🔋'
        },
        {
            id: 'love-algorithm',
            title: '나의 연애 알고리즘',
            description: '당신의 연애 스타일은 어떤 알고리즘?',
            path: './love-algorithm/',
            ogImage: './assets/og-love-algorithm.png',
            emoji: '💘'
        },
        {
            id: 'stress-temp',
            title: '나의 스트레스 온도계',
            description: '당신의 스트레스 온도는 지금 몇 도?',
            path: './stress-temp/',
            ogImage: './assets/og-stress-temp.png',
            emoji: '🌡️'
        },
        {
            id: 'money-type',
            title: '나의 돈 쓰는 유형',
            description: '당신의 소비 성향은 어떤 유형?',
            path: './money-type/',
            ogImage: './assets/og-money-type.png',
            emoji: '💰'
        }
    ]
};
