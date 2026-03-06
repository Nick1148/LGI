// ============================================
// 다크모드 테마 관리
// ============================================

(function() {
    const STORAGE_KEY = 'jjintest-theme';

    function getPreferred() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const toggle = document.getElementById('themeToggle');
        if (toggle) toggle.textContent = theme === 'dark' ? '🌙' : '☀️';
        localStorage.setItem(STORAGE_KEY, theme);
    }

    // 초기 적용 (깜빡임 방지)
    apply(getPreferred());

    // 토글 버튼 이벤트
    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.getElementById('themeToggle');
        if (!toggle) return;

        // 초기 아이콘 설정
        const current = document.documentElement.getAttribute('data-theme');
        toggle.textContent = current === 'dark' ? '🌙' : '☀️';

        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            apply(next);

            // 부드러운 전환 효과
            toggle.style.transform = 'scale(1.3) rotate(360deg)';
            setTimeout(() => { toggle.style.transform = ''; }, 300);
        });
    });

    // 시스템 테마 변경 감지
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            apply(e.matches ? 'dark' : 'light');
        }
    });
})();
