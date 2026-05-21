let isImagesPreloaded = false;

export function initFaq() {
    // Инициализируем аккордеон вопросов и ответов (с картинками)
    initFaqAccordion('faq-2', true);  

    // Инициализируем кнопку "Показать все"
    initFaqShowMore();
}

function initFaqAccordion(faqId, handleImages = false) {
    const faqContainer = document.getElementById(faqId);
    if (!faqContainer) return;

    const navs = faqContainer.querySelectorAll('nav');
    const output = document.getElementById('output');

    // Предзагрузка картинок в #output
    if (handleImages && output && !isImagesPreloaded) {
        navs.forEach(nav => {
            const imgInNav = nav.querySelector('img');
            if (imgInNav) {
                const newImg = document.createElement('img');
                newImg.src = imgInNav.src;
                newImg.className = 'fade-out';
                output.appendChild(newImg);
            }
        });
        isImagesPreloaded = true;
    }

    navs.forEach(nav => {
        const item = nav.parentElement;
        if (!item) return;

        nav.addEventListener("transitionend", () => {
            if (nav.style.height !== '0px') nav.style.height = "auto";
        });

        item.addEventListener('click', (event) => {
            if (event.target.closest('nav') && event.target !== nav) return;

            const isActive = item.classList.contains('active');
            
            // 🛑 ИСКЛЮЧЕНИЕ: Если пункт уже активен, запрещаем его закрывать
            if (isActive) return;

            // Сворачиваем остальные открытые пункты
            navs.forEach(otherNav => {
                const otherItem = otherNav.parentElement;
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherNav.style.height = `${otherNav.offsetHeight}px`;
                    otherNav.clientTop; 
                    otherNav.style.height = "0px";
                    otherItem.classList.remove('active');
                }
            });

            // Открываем текущий пункт
            item.classList.add('active');
            nav.style.height = `${nav.scrollHeight}px`;

            // Меняем картинку на фоне
            if (handleImages && output) {
                const currentImgSrc = nav.querySelector('img')?.src;
                output.querySelectorAll('img').forEach(outImg => {
                    outImg.classList.toggle('fade-in', outImg.src === currentImgSrc);
                });
            }
        });
    });

    // Авто-открытие первого пункта при старте
    const firstForm = faqContainer.querySelector('.advantages-form .vopros-otvet-form');
    if (firstForm) {
        const firstNav = firstForm.querySelector('nav');
        if (firstNav) {
            firstForm.classList.add('active');
            firstNav.style.height = "auto";
            if (handleImages && output) {
                const startImgSrc = firstNav.querySelector('img')?.src;
                setTimeout(() => {
                    const outImg = output.querySelector(`img[src="${startImgSrc}"]`);
                    if (outImg) outImg.classList.add('fade-in');
                }, 50);
            }
        }
    }
}

function initFaqShowMore() {
    const textElement = document.getElementById('button-faq-text');
    const cards = document.querySelectorAll('.faq .advantages-form');
    if (!textElement || cards.length <= 5) return;

    const toggleContainer = textElement.parentElement; 
    if (!toggleContainer) return;

    let showAll = false;

    cards.forEach((card, index) => {
        if (index >= 5) card.style.display = 'none';
    });

    toggleContainer.addEventListener('click', (e) => {
        e.preventDefault();
        showAll = !showAll;
        for (let i = 5; i < cards.length; i++) {
            cards[i].style.display = showAll ? 'flex' : 'none';
        }
        textElement.textContent = showAll ? 'Показать первые 5' : 'Показать все';
    });
}
