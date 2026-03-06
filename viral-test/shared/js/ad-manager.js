// ============================================
// 광고 슬롯 관리자
// 현재: 비활성 상태 (구조만 준비)
// 추후: AdSense/애드핏 코드 삽입 후 활성화
// ============================================

const AdManager = {
    init() {
        if (!SITE_CONFIG.ADS_ENABLED) return;

        document.querySelectorAll('.ad-slot').forEach(slot => {
            slot.classList.add('active');
            // 추후 여기에 AdSense/애드핏 코드 삽입
            // 예: slot.innerHTML = '<ins class="adsbygoogle" ...></ins>';
        });
    }
};
