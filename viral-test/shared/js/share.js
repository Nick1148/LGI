// ============================================
// 공유 기능 모듈
// ============================================

const ShareManager = {
    // 링크 복사
    copyLink(url) {
        const shareUrl = url || window.location.href;
        navigator.clipboard.writeText(shareUrl).then(() => {
            ShareManager.showToast('링크가 복사되었습니다!');
        }).catch(() => {
            // fallback
            const input = document.createElement('input');
            input.value = shareUrl;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            ShareManager.showToast('링크가 복사되었습니다!');
        });
    },

    // 카카오톡 공유 (도메인 등록 후 활성화)
    shareKakao(title, description, imageUrl, linkUrl) {
        if (!SITE_CONFIG.KAKAO_APP_KEY) {
            // 카카오 SDK 미설정 시 링크 복사로 대체
            ShareManager.copyLink(linkUrl || window.location.href);
            ShareManager.showToast('카카오톡 공유 준비 중! 링크가 복사되었습니다.');
            return;
        }

        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: title,
                description: description,
                imageUrl: imageUrl,
                link: {
                    mobileWebUrl: linkUrl || window.location.href,
                    webUrl: linkUrl || window.location.href,
                },
            },
            buttons: [
                {
                    title: '테스트 하러 가기',
                    link: {
                        mobileWebUrl: linkUrl || window.location.href,
                        webUrl: linkUrl || window.location.href,
                    },
                },
            ],
        });
    },

    // 트위터 공유
    shareTwitter(text, url) {
        const shareUrl = url || window.location.href;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, '_blank', 'width=550,height=420');
    },

    // 결과 이미지 다운로드 (인스타 스토리용)
    async downloadResult(elementId, filename) {
        try {
            const element = document.getElementById(elementId);
            if (!element) return;

            // html2canvas CDN 로드 확인
            if (typeof html2canvas === 'undefined') {
                ShareManager.showToast('이미지 생성 기능을 불러오는 중...');
                return;
            }

            const canvas = await html2canvas(element, {
                backgroundColor: '#0a0a0f',
                scale: 2,
                useCORS: true
            });

            const link = document.createElement('a');
            link.download = filename || 'my-result.png';
            link.href = canvas.toDataURL('image/png');
            link.click();

            ShareManager.showToast('이미지가 저장되었습니다! 인스타 스토리에 올려보세요 ✨');
        } catch (e) {
            ShareManager.showToast('이미지 저장에 실패했습니다.');
        }
    },

    // 토스트 알림
    showToast(message, duration) {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.add('show');

        clearTimeout(ShareManager._toastTimer);
        ShareManager._toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, duration || 2500);
    },

    _toastTimer: null
};
