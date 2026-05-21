export function initAdvantages() {
    // Инициализируем аккордеон преимуществ для блока faq-3
    initAdvantagesAccordion('faq-3');
}

function initAdvantagesAccordion(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const navs = container.querySelectorAll('nav');

    navs.forEach(nav => {
        const item = nav.parentElement;
        if (!item) return;

        nav.addEventListener("transitionend", () => {
            if (nav.style.height !== '0px') {
                nav.style.height = "auto";
            }
        });

        item.addEventListener('click', (event) => {
            if (event.target.closest('nav') && event.target !== nav) return;

            const isActive = item.classList.contains('active');
            
            // 🛑 ИСКЛЮЧЕНИЕ: Если пункт уже активен, запрещаем его закрывать
            if (isActive) return;

            // Сворачиваем остальные открытые пункты преимуществ
            navs.forEach(otherNav => {
                const otherItem = otherNav.parentElement;
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherNav.style.height = `${otherNav.offsetHeight}px`;
                    otherNav.clientTop; 
                    otherNav.style.height = "0px";
                    otherItem.classList.remove('active');
                }
            });

            // Открываем текущий пункт преимуществ
            item.classList.add('active');
            nav.style.height = `${nav.scrollHeight}px`;
        });
    });

    // Авто-открытие первого пункта преимуществ при старте
    const firstForm = container.querySelector('.advantages-form .vopros-otvet-form');
    if (firstForm) {
        const firstNav = firstForm.querySelector('nav');
        if (firstNav) {
            firstForm.classList.add('active');
            firstNav.style.height = "auto";
        }
    }
}
