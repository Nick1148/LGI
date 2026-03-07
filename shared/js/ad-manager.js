// ============================================
// 광고 슬롯 관리자
// 지원: Google AdSense + 카카오 애드핏
// config.js에서 ADS_ENABLED: true로 변경 후 사용
// ============================================

const AdManager = {
    _adFitLoaded: false,

    init() {
        if (!SITE_CONFIG.ADS_ENABLED) return;

        // 카카오 애드핏 SDK 로드
        if (SITE_CONFIG.ADFIT_UNIT_ID && !this._adFitLoaded) {
            this._loadAdFit();
        }

        document.querySelectorAll('.ad-slot').forEach(slot => {
            slot.classList.add('active');

            if (SITE_CONFIG.ADFIT_UNIT_ID) {
                // 카카오 애드핏 배너 삽입
                const ins = document.createElement('ins');
                ins.className = 'kakao_ad_area';
                ins.style.display = 'none';
                ins.setAttribute('data-ad-unit', SITE_CONFIG.ADFIT_UNIT_ID);
                ins.setAttribute('data-ad-width', '320');
                ins.setAttribute('data-ad-height', '100');
                slot.appendChild(ins);
            } else if (SITE_CONFIG.ADSENSE_CLIENT_ID) {
                // Google AdSense 배너 삽입
                const ins = document.createElement('ins');
                ins.className = 'adsbygoogle';
                ins.style.display = 'block';
                ins.setAttribute('data-ad-client', SITE_CONFIG.ADSENSE_CLIENT_ID);
                ins.setAttribute('data-ad-format', 'auto');
                ins.setAttribute('data-full-width-responsive', 'true');
                slot.appendChild(ins);
                if (typeof adsbygoogle !== 'undefined') {
                    (adsbygoogle = window.adsbygoogle || []).push({});
                }
            }
        });
    },

    _loadAdFit() {
        if (this._adFitLoaded) return;
        const script = document.createElement('script');
        script.src = 'https://t1.daumcdn.net/kas/static/ba.min.js';
        script.async = true;
        document.head.appendChild(script);
        this._adFitLoaded = true;
    }
};
