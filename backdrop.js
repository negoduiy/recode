const DOM = { fon: null, elem: null, blss: null, imgMain: null, indicator: null, yak: null };
let isScrolling = false;

export function initBackdrop() {
    DOM.fon = document.getElementById("fon");
    DOM.elem = document.getElementById("elem");
    DOM.blss = document.getElementById("blss");
    DOM.imgMain = document.getElementById("imgmaiin");
    DOM.indicator = document.querySelector('.scroll-indicator');
    DOM.yak = document.getElementById("yak");

    fonAnimation();
    updateScrollIndicator();
    initMainCardObserver(); // Запуск IntersectionObserver для анимации появления главных карточек

    if (DOM.yak) {
        DOM.yak.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                fonAnimation();
                updateScrollIndicator();
                if (DOM.yak) DOM.yak.classList.toggle('active', window.scrollY > 600);
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });
}

function fonAnimation() {
    if (!DOM.fon || !DOM.elem || !DOM.blss || !DOM.imgMain) return;
    const rect = DOM.imgMain.getBoundingClientRect();
    const scrollPercent = (window.scrollY / (window.innerHeight + (rect.height / 2))) * 100;

    const percent11 = 1 + (scrollPercent / 15 - 1);
    DOM.fon.style.filter = percent11 <= 0 ? "blur(0px)" : (percent11 >= 10 ? "blur(100px)" : `blur(${percent11}px)`);

    const percent1 = 0.4 - (scrollPercent / 60 - 1);
    DOM.elem.style.scale = percent1 <= 0 ? "0" : (percent1 >= 1 ? "1" : percent1);

    const percent2 = 0.5 - (scrollPercent / 35 - 1);
    DOM.elem.style.opacity = percent2 <= 0 ? "0" : (percent2 >= 1 ? "1" : percent2);

    if (scrollPercent <= 50) {
        const percent3 = 0.4 - (scrollPercent / 35 - 1);
        DOM.blss.style.opacity = percent3 <= 0 ? "0" : (percent3 >= 1 ? "1" : percent3);
    } else {
        const percent4 = -0.6 + (scrollPercent / 35 - 1);
        DOM.blss.style.opacity = percent4 <= 0 ? "0" : (percent4 >= 1 ? "1" : percent4);
    }
}

function updateScrollIndicator() {
    if (!DOM.indicator) return;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    if (documentHeight - windowHeight <= 0) return;
    DOM.indicator.style.width = `${(window.scrollY / (documentHeight - windowHeight)) * 100}%`;
}

// Перенесено сюда, так как это базовая анимация появления блоков на главной
export function initMainCardObserver() {
    const items = document.querySelectorAll('.advantages-form:not(.active)');
    if (!items.length) return;

    let delay = 0;
    let timeoutId = null;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                if (entry.boundingClientRect.top < 0) {
                    item.classList.add('active');
                } else {
                    setTimeout(() => item.classList.add('active'), delay);
                    delay += 50;
                }
                observer.unobserve(item);
            }
        });
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => { delay = 0; }, 100);
    }, { rootMargin: '0px 0px 150px 0px' });

    items.forEach(item => observer.observe(item));
}
