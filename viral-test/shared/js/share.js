// ============================================
// 공유 기능 모듈
// ============================================

const ShareManager = {
    // 링크 복사 + confetti
    copyLink(url) {
        const shareUrl = url || window.location.href;
        navigator.clipboard.writeText(shareUrl).then(() => {
            ShareManager.showToast('링크가 복사되었습니다!');
            ShareManager.spawnCopyConfetti();
        }).catch(() => {
            const input = document.createElement('input');
            input.value = shareUrl;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            ShareManager.showToast('링크가 복사되었습니다!');
            ShareManager.spawnCopyConfetti();
        });
    },

    // 복사 시 confetti 폭발
    spawnCopyConfetti() {
        const emojis = ['🎉', '✨', '💖', '⭐', '🌟', '💫', '🎊'];
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        for (let i = 0; i < 12; i++) {
            const span = document.createElement('span');
            span.className = 'copy-confetti-particle';
            span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            const angle = (Math.PI * 2 * i) / 12;
            const dist = 60 + Math.random() * 80;
            span.style.left = cx + 'px';
            span.style.top = cy + 'px';
            span.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
            span.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
            document.body.appendChild(span);
            setTimeout(() => span.remove(), 900);
        }
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

    // 결과 이미지 다운로드 (프리미엄 워터마크 포함)
    async downloadResult(elementId, filename) {
        try {
            const element = document.getElementById(elementId);
            if (!element) return;

            if (typeof html2canvas === 'undefined') {
                ShareManager.showToast('이미지 생성 기능을 불러오는 중...');
                return;
            }

            const bgColor = getComputedStyle(document.body).backgroundColor || '#FFF8F9';
            const canvas = await html2canvas(element, {
                backgroundColor: bgColor,
                scale: 2,
                useCORS: true
            });

            // 프리미엄 프레임 + 워터마크 그리기
            const ctx = canvas.getContext('2d');
            const w = canvas.width;
            const h = canvas.height;

            // 하단 워터마크 바
            const barH = 56;
            const gradient = ctx.createLinearGradient(0, h - barH, w, h);
            gradient.addColorStop(0, 'rgba(192, 132, 252, 0.08)');
            gradient.addColorStop(1, 'rgba(249, 168, 212, 0.08)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, h - barH, w, barH);

            // 워터마크 텍스트
            ctx.fillStyle = 'rgba(192, 132, 252, 0.5)';
            ctx.font = '600 22px Pretendard, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('찐테스트 ✦ jjin-test', w / 2, h - 20);

            // 상단 프레임 라인
            const topGrad = ctx.createLinearGradient(0, 0, w, 0);
            topGrad.addColorStop(0, '#C084FC');
            topGrad.addColorStop(1, '#F9A8D4');
            ctx.fillStyle = topGrad;
            ctx.fillRect(0, 0, w, 6);

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
