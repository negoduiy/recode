export function initTheme() {
    const themeToggleBtn = document.querySelector('#header .headerbutton');
    if (!themeToggleBtn) return;

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-color-theme');
        const newTheme = (currentTheme === 'light') ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-color-theme', newTheme);
        localStorage.setItem('color-theme', newTheme);
    });
}
