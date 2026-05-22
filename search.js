let searchWordGlobal = '';

export function initGlobalSearch() {
    const inputDesktop = document.getElementById('searchinputheader');
    const inputMobile = document.getElementById('searchinputheader1');
    const mainForm = document.getElementById('searchformmain');
    const searchForm1 = document.getElementById('searchform');
    const searchForm2 = document.getElementById('searchform2');

    if (!inputDesktop || !inputMobile) return;

    const allInputs = [inputDesktop, inputMobile];

    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            inputDesktop.value = input.value;
            inputMobile.value = input.value;
        });

        input.addEventListener('focus', () => mainForm?.classList.add('active'));
        input.addEventListener('blur', () => mainForm?.classList.remove('active'));

        input.addEventListener('keyup', () => {
            const query = input.value.trim();
            if (query.length >= 2) {
                searchForm1?.classList.add('active');
                searchForm2?.classList.add('active');
                getSearchResult(query);
            } else {
                searchForm1?.classList.remove('active');
                searchForm2?.classList.remove('active');
            }
        });
    });

    // Обработка кликов по подсказкам поиска (Универсальное автоматическое закрытие)
    document.addEventListener('mousedown', (e) => {
        const searchItem = e.target.closest('.searchitem');
        if (!searchItem) return;

        const parentForm = searchItem.closest('#searchform') || searchItem.closest('#searchform2');
        if (!parentForm) return;

        e.preventDefault();
        e.stopPropagation();

        const targetContent = searchItem.getAttribute('hrefforbut');
        const inputVal = inputDesktop.value.trim();

        //console.log(`[SEARCH LOG 1] Клик зафиксирован. Статья: "${targetContent}", Слово: "${inputVal}"`);

        if (targetContent) {
            searchWordGlobal = inputVal;
            const targetUrl = `${window.location.origin}/help/?content=${encodeURIComponent(targetContent)}&searchword=${encodeURIComponent(inputVal)}`;
            
            if (window.location.pathname.includes('/help')) {
            //console.log('[SEARCH LOG 2] Страница help. Меняем URL:', targetUrl);
            window.history.pushState(null, '', targetUrl);
            
            const virtualArticleElement = document.createElement('div');
            virtualArticleElement.setAttribute('name', targetContent);

            if (typeof window.activateDocumentationArticle === 'function') {
                //console.log('[SEARCH LOG 3] Передаем управление в документацию...');
                window.activateDocumentationArticle(virtualArticleElement, inputVal);
            }

            // ========== 💡 ДОБАВЛЕННЫЙ БЛОК ДЛЯ ПОДСВЕТКИ В ДЕРЕВЕ ==========
            // 1. Сбрасываем старый активный пункт в меню
            const activeLinks = document.querySelectorAll('.header-navigaton-list .active');
            activeLinks.forEach(link => link.classList.remove('active'));

            // 2. Ищем и подсвечиваем новую ссылку. 
            // Так как у вас URL вида /help/?content=имя, ищем ссылку, которая ведет на этот же content
            const targetLink = document.querySelector(`.header-navigaton-list a[href*="content=${encodeURIComponent(targetContent)}"]`);
            if (targetLink) {
                targetLink.classList.add('active');
            } else {
                // Если точечная ссылка не найдена, подсвечиваем общий раздел /help
                const helpLink = document.querySelector('.header-navigaton-list a[href*="/help"]');
                helpLink?.classList.add('active');
            }
            // ==============================================================

            // 💡 ИСПРАВЛЕНО: Закрываем и полностью очищаем поиск ВЕЗДЕ
            clearSearch(); 
            
            if (typeof window.closeDocPanels === 'function') {
                window.closeDocPanels(); 
            }
        } else {
                //console.log('[SEARCH LOG 2] Переход на страницу help с другой страницы сайта...');
                window.location.href = targetUrl;
            }
        }
    });

    // 💡 ИСПРАВЛЕНО: Находим ВСЕ кнопки с классом .searchbutton2 или .headerbutton2
    const clearDataButtons = document.querySelectorAll('.searchbutton2, .headerbutton2');
    
    clearDataButtons.forEach(btn => {
        // 💡 ИСПРАВЛЕНО: Используем mousedown + e.preventDefault(), 
        // чтобы намертво заблокировать спадение фокуса с инпута (blur) при клике
        btn.addEventListener('mousedown', (e) => {
            e.preventDefault(); 
            e.stopPropagation();

            //console.log('[SEARCH LOG] Клик по одной из кнопок очистки. Сбрасываем текст...');
            softClearSearch();
        });
    });
} // Конец функции initGlobalSearch


async function getSearchResult(myText) {
    try {
        const response = await fetch(`${window.location.origin}/wp-content/themes/acadtopoplan/search.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `const=${encodeURIComponent(myText)}`
        });
        if (!response.ok) throw new Error('Ошибка сети');
        const rawText = await response.text();
        renderSearchOutput(rawText.replace(/&nbsp;/g, " "));
    } catch (error) {
        console.error('Ошибка fetch в поиске:', error);
    }
}

function renderSearchOutput(serverData) {
    const searchForm1 = document.getElementById("searchform");
    const searchForm2 = document.getElementById("searchform2");
    if (!searchForm1 || !searchForm2) return;

    const words = serverData.split(" -/CUTTINGFILE/- ");
    let htmlOutput = "";

    words.forEach(word => {
        if (!word.trim()) return;
        const resultArray = word.split("-cutting-");

        if (resultArray[0] === 'К сожалению, ничего не найдено.') {
            htmlOutput += `<div class="notfound"><p class="titlefromsearch">${resultArray[0]}</p></div>`;
        } else {
            const articleTitle = resultArray[0]; 
            const textContext = resultArray[1];  
            let articleSlug = resultArray[2] || '';

            if (!articleSlug || articleSlug.includes('http')) {
                articleSlug = resultArray.find(item => item && item.startsWith('help-')) || resultArray[0];
            }

            const arr = textContext ? textContext.split('|SLICE|') : [];
            const firstText = arr[0] ? arr[0].split(' ') : [];
            const secondText = arr[2] ? arr[2].split(' ') : [];
            const keyword = arr[1] || '';

            const slicedFirst = firstText.slice(-5).join(' ');
            const slicedSecond = secondText.slice(0, 8).join(' ');

            htmlOutput += `
            <div class="searchitem" hrefforbut="${articleSlug.trim()}">
                <p class="titlefromsearch">${articleTitle}</p>
                <a class="linkersearch">${slicedFirst} <span>${keyword}</span> ${slicedSecond}</a>
            </div>`;
        }
    });

    searchForm1.innerHTML = htmlOutput;
    searchForm2.innerHTML = htmlOutput;
}

// 💡 Очистка полей, скрытие выпадашек и уменьшение формы поиска в шапке
export function clearSearch() {
    const inputDesktop = document.getElementById('searchinputheader');
    const inputMobile = document.getElementById('searchinputheader1');
    const searchForm1 = document.getElementById('searchform');
    const searchForm2 = document.getElementById('searchform2');
    
    // 💡 Находим главный контейнер формы поиска в шапке ПК
    const mainForm = document.getElementById('searchformmain'); 

    if (inputDesktop) {
        inputDesktop.value = "";
        inputDesktop.blur(); // 💡 Снимаем фокус (мигающий курсор) с десктопного инпута
    }
    if (inputMobile) {
        inputMobile.value = "";
        inputMobile.blur();  // Снимаем фокус с мобильного инпута
    }

    // Скрываем списки подсказок
    if (searchForm1) searchForm1.classList.remove('active');
    if (searchForm2) searchForm2.classList.remove('active');
    
    // 💡 ИСПРАВЛЕНО: Принудительно убираем активный класс с самой формы на ПК, 
    // чтобы она мгновенно уменьшилась до исходных размеров в шапке сайта
    if (mainForm) mainForm.classList.remove('active');
}


// 💡 УЛЬТРА-ПЛАВНАЯ ПОДСВЕТКА И ЦЕНТРИРОВАНИЕ (ДВУСТОРОННЯЯ АНИМАЦИЯ ЧЕРЕЗ LERP)
window.searcher = function(specificWord) {
    const urlParams = new URLSearchParams(window.location.search);
    const substring = (specificWord || searchWordGlobal || urlParams.get('searchword') || '').trim();
    const postContainer = document.getElementById('postforsite');

    if (!substring || !postContainer) return;

    if (CSS.highlights) {
        CSS.highlights.delete("search-word-highlight");
    }
    
    document.documentElement.style.removeProperty('--js-highlight-bg');
    document.documentElement.style.removeProperty('--js-highlight-color');

    const selection = window.getSelection();
    selection.removeAllRanges();

    const startRange = document.createRange();
    startRange.selectNodeContents(postContainer);
    startRange.collapse(true);
    selection.addRange(startRange);

    const isFound = window.find(substring, false, false, true, false, false, false);

    if (isFound && selection.rangeCount > 0) {
        const foundRange = selection.getRangeAt(0);
        const rect = foundRange.getBoundingClientRect();
        
        if (rect && rect.top !== 0) {
            const targetY = rect.top + window.pageYOffset;
            const vh = window.innerHeight || document.documentElement.clientHeight || 0;
            
            window.scrollTo({
                top: targetY - vh / 2,
                behavior: 'smooth'
            });

            if (CSS.highlights) {
                const highlight = new Highlight(foundRange);
                CSS.highlights.set("search-word-highlight", highlight);

                const fadeInDuration = 300;
                const holdDuration = 2000;
                const fadeOutDuration = 300;
                const totalDuration = fadeInDuration + holdDuration + fadeOutDuration;
                
                const startTime = performance.now();
                const rootStyle = window.getComputedStyle(document.documentElement);
                
                // Утилита для парсинга RGB
                const parseToRGB = (cssVariable) => {
                    const tempDiv = document.createElement('div');
                    tempDiv.style.color = rootStyle.getPropertyValue(cssVariable).trim();
                    document.body.appendChild(tempDiv);
                    const rgb = window.getComputedStyle(tempDiv).color.match(/\d+/g).map(Number);
                    document.body.removeChild(tempDiv);
                    return rgb.slice(0, 3);
                };

                const activeBG = parseToRGB('--color-active');      // Фон подложки
                const linkColor = parseToRGB('--color-link');      // Фирменный синий цвет букв
                const targetColor = parseToRGB('--color-other-text'); // Дефолтный текст статьи

                function animateFade(now) {
                    const elapsed = now - startTime;

                    if (elapsed < fadeInDuration) {
                        // 1. 💡 ФАЗА ПОЯВЛЕНИЯ: Плавно зажигаем фон и красим текст из дефолтного в синий
                        const progress = elapsed / fadeInDuration; // От 0 до 1

                        const currentR = Math.round(targetColor[0] + (linkColor[0] - targetColor[0]) * progress);
                        const currentG = Math.round(targetColor[1] + (linkColor[1] - targetColor[1]) * progress);
                        const currentB = Math.round(targetColor[2] + (linkColor[2] - targetColor[2]) * progress);

                        document.documentElement.style.setProperty('--js-highlight-bg', `rgba(${activeBG[0]}, ${activeBG[1]}, ${activeBG[2]}, ${progress})`);
                        document.documentElement.style.setProperty('--js-highlight-color', `rgb(${currentR}, ${currentG}, ${currentB})`);
                        
                        requestAnimationFrame(animateFade);
                    } 
                    else if (elapsed < fadeInDuration + holdDuration) {
                        // 2. 💡 ФАЗА УДЕРЖАНИЯ: Горим на максимуме яркости
                        document.documentElement.style.setProperty('--js-highlight-bg', `rgba(${activeBG[0]}, ${activeBG[1]}, ${activeBG[2]}, 1)`);
                        document.documentElement.style.setProperty('--js-highlight-color', `rgba(${linkColor[0]}, ${linkColor[1]}, ${linkColor[2]}, 1)`);
                        
                        requestAnimationFrame(animateFade);
                    } 
                    else if (elapsed < totalDuration) {
                        // 3. 💡 ФАЗА ЗАТУХАНИЯ: Растворяем фон в ноль и возвращаем цвет букв к основному тексту
                        const progress = (elapsed - (fadeInDuration + holdDuration)) / fadeOutDuration; // От 0 до 1
                        const opacity = 1 - progress; // От 1 до 0

                        const currentR = Math.round(linkColor[0] + (targetColor[0] - linkColor[0]) * progress);
                        const currentG = Math.round(linkColor[1] + (targetColor[1] - linkColor[1]) * progress);
                        const currentB = Math.round(linkColor[2] + (targetColor[2] - linkColor[2]) * progress);

                        document.documentElement.style.setProperty('--js-highlight-bg', `rgba(${activeBG[0]}, ${activeBG[1]}, ${activeBG[2]}, ${opacity})`);
                        document.documentElement.style.setProperty('--js-highlight-color', `rgb(${currentR}, ${currentG}, ${currentB})`);
                        
                        requestAnimationFrame(animateFade);
                    } 
                    else {
                        // Очистка памяти по окончании анимации
                        CSS.highlights.delete("search-word-highlight");
                        document.documentElement.style.removeProperty('--js-highlight-bg');
                        document.documentElement.style.removeProperty('--js-highlight-color');
                    }
                }

                requestAnimationFrame(animateFade);
            }
        }

        selection.removeAllRanges();
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        selection.removeAllRanges();
    }
};

/**
 * 💡 Мягкая очистка: стирает текст и результаты поиска, 
 * но НЕ закрывает форму #searchformmain и НЕ снимает фокус (.blur)
 */
function softClearSearch() {
    const inputDesktop = document.getElementById('searchinputheader');
    const inputMobile = document.getElementById('searchinputheader1');
    const searchForm1 = document.getElementById('searchform');
    const searchForm2 = document.getElementById('searchform2');

    if (inputDesktop) inputDesktop.value = "";
    if (inputMobile) inputMobile.value = "";

    if (searchForm1) searchForm1.classList.remove('active');
    if (searchForm2) searchForm2.classList.remove('active');
    
    // Инпуты НЕ вызывают .blur(), а класс active с #searchformmain НЕ удаляется.
    // Благодаря mousedown инпут продолжит мигать курсором, а поиск останется развернут!
}
