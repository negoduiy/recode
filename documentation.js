// 💡 Добавляем локальную переменную в самый верх файла documentation.js (к другим переменным)
let currentSearchQuery = ''; 

export function initDocumentation() {
    // 1. Проверяем, открыта ли страница help (Ваша оригинальная логика)
    const isHelpPage = window.location.href.split('/')[3] === 'help';

    const search1 = document.querySelector('.headersearch');
    const search2 = document.querySelector('.headersearchtwo');

    if (isHelpPage) {
        if (search2) search2.classList.add('active');
        if (search1) search1.classList.add('active');
    } else {
        if (search2) search2.classList.remove('active');
        if (search1) search1.classList.remove('active');
        return; 
    }

    // 2. Появление сайдбаров на ПК при загрузке (Ваша sdbrlvis)
    showSidebarsOnLoad();

    // 3. Инициализируем мобильные кнопки с правильными ID и логикой
    initMobileSidebars();

    // 4. Поиск внутри документации
    initDocSearchMobile();

    // 5. анимация открытия саб меню в дереве
    OpenSubMenuTree();

    // 6. фильтрация дерева
    initTreeFilter();

    // 7. функция отображения контента записей из дерева
    initArticlesNavigation();
}

// Инициализация фильтра дерева меню
export function initTreeFilter() {
    const filterInput = document.getElementById('filterinput');
    const brush = document.getElementById('clearbut');

    if (!filterInput) return;

    // Живой поиск при вводе текста
    filterInput.addEventListener('input', filtered);

    // Клик по крестику очистки (Функция clearfffin)
    if (brush) {
        brush.addEventListener('click', () => {
            filterInput.value = '';
            filtered();
        });
    }
}

// Универсальное управление высотой папки при фильтрации
function toggleFolderHeight(btn, ul, show, targetHeight = 0) {
    if (!ul || !btn) return;

    const buttonAnimate = ul.closest('li')?.querySelector('div');

    if (show) {
        ul.classList.add('active');
        btn.classList.add('active');
        if (buttonAnimate) buttonAnimate.classList.add('active');
        
        // Устанавливаем точную высоту под отфильтрованные элементы
        ul.style.height = targetHeight ? `${targetHeight}px` : `${ul.scrollHeight}px`;
        
        // Переводим в auto, чтобы не ломался адаптив, если раскрыли полностью
        setTimeout(() => { 
            if (ul.classList.contains('active') && !targetHeight) ul.style.height = 'auto'; 
        }, 500);
    } else {
        ul.style.height = `${ul.offsetHeight}px`;
        ul.offsetHeight; // Быстрый Reflow
        ul.style.height = '0px';
        
        ul.classList.remove('active');
        btn.classList.remove('active');
        if (buttonAnimate) buttonAnimate.classList.remove('active');
    }
}

// Функция фильтрации дерева меню (Оптимизированная filtered)
function filtered() {
    const filterInput = document.getElementById('filterinput');
    const brush = document.getElementById('clearbut');
    const itemFrames = document.querySelectorAll('.gyasdjlk');
    const ullistFrames = document.querySelectorAll('.sub-menu');
    
    if (!filterInput) return;
    
    const filterValue = filterInput.value.toLowerCase().trim();
    const isEmpty = filterValue === '';

    // Управляем видимостью крестика очистки
    if (brush) {
        brush.classList.toggle('active', !isEmpty);
    }

    // 1. Фильтруем сами текстовые элементы (записи и рубрики)
    itemFrames.forEach(item => {
        if (isEmpty) {
            item.classList.remove('finderedclose');
        } else {
            const itemName = item.textContent.toLowerCase();
            item.classList.toggle('finderedclose', !itemName.includes(filterValue));
        }
    });

    // 2. Управляем раскрытием списков ul
    ullistFrames.forEach(ul => {
        const parentLi = ul.parentElement;
        if (!parentLi) return;

        const itm = parentLi.querySelector('a')?.querySelector('.gyasdjlk');
        const childItems = ul.querySelectorAll('.gyasdjlk');
        
        if (isEmpty) {
            // Если поиск пустой, возвращаем меню в исходное состояние
            parentLi.classList.remove('filtered');
            
            // Проверяем, есть ли внутри папки активная (открытая в данный момент) статья
            const hasActiveArticle = ul.querySelector('li.active') || ul.classList.contains('active-route');
            
            toggleFolderHeight(itm, ul, hasActiveArticle);
        } else {
            // Если в поиске что-то введено
            let visibleCount = 0;
            let totalHeight = 0;

            // Считаем только видимые элементы и их высоту
            childItems.forEach(child => {
                if (!child.classList.contains('finderedclose')) {
                    visibleCount++;
                    // Находим родительский li для точного расчета высоты строки
                    const li = child.closest('li');
                    if (li) totalHeight += li.scrollHeight;
                }
            });

            if (visibleCount <= 0) {
                // Если в папке нет совпадений — скрываем её
                parentLi.classList.add('filtered');
                toggleFolderHeight(itm, ul, false);
            } else {
                // Если совпадения есть — раскрываем папку на высоту видимых элементов
                parentLi.classList.remove('filtered');
                toggleFolderHeight(itm, ul, true, totalHeight);
            }
        }
    });
}

// открытие и закрытие главного мобильного меню навигации сайта
export function initMobileNavigationMenu() {
    const openMenuBtn = document.querySelector('.headerbutton2'); // кнопка открытия мобильного меню
    const mobileMenu = document.getElementById('hjgkq');        // Само мобильное меню
    const listMenuBtns = document.getElementById('7u3qf9eqw9'); // кнопки навигации мобильного меню
    const blurOverlay = document.getElementById('blured-f');    // Подложка размытия фона

    const closeMenuBtn = document.querySelector('#hjgkq .headerbutton'); // кнопка закрытия мобильного меню

    // 1. Открытие меню — Функция gyque()
    if (openMenuBtn && mobileMenu && listMenuBtns) {
        openMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Сначала закрываем все открытые панели документации (левую, правую, поиск)
            closeAllSidebars();

            // Теперь открываем главное мобильное меню навигации
            mobileMenu.classList.add('active');
            openMenuBtn.classList.add('active');
            listMenuBtns.classList.add('active');
            if (blurOverlay) blurOverlay.classList.add('active');
        });
    }

    // 2. Закрытие меню — Функция gyque2()
    // Срабатывает при клике на подложку ИЛИ на кнопку закрытия внутри меню
    if (blurOverlay) {
        blurOverlay.addEventListener('click', closeAllSidebars);
    }
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllSidebars();
        });
    }
}

// отображение сайдбаров при открытии документации
function showSidebarsOnLoad() {
    const leftPanel = document.getElementById('sdbrl');         
    const rightPanel = document.getElementById('sdbrr');        
    const mainTextFrame = document.getElementById('frame-main-text'); 

    if (leftPanel) leftPanel.classList.add('active');
    if (rightPanel) rightPanel.classList.add('active');
    if (mainTextFrame) mainTextFrame.classList.add('active');
}

// открытие и закрытие левого и правого сайдбара
function initMobileSidebars() {
    const leftMobileBtn = document.querySelector('.qrwgihuyjodk1');  // Левая мобильная кнопка
    const rightMobileBtn = document.querySelector('.qrwgihuyjodk2'); // Правая мобильная кнопка

    const leftbtnpanelclose = document.querySelector('.qehjlkof1');// кнопка закрытия левого сайдбара
    const rightbtnpanelclose = document.querySelector('#sdbrr .qehjlkof2');// кнопка закрытия правого сайдбара

    const leftPanel = document.getElementById('sdbrl');     // Левый сайдбар
    const rightPanel = document.getElementById('sdbrr');    // Правый сайдбар
    const blurOverlay = document.getElementById('blured-f'); // Подложка размытия фона

    // 1. Клик по левой кнопке — Функция fnc1() (Открытие/закрытие левого сайдбара)
    if (leftMobileBtn && leftPanel) {
        leftMobileBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Если открыт правый сайдбар — закрываем его перед открытием левого
            if (rightPanel) rightPanel.classList.remove('sdbrr-open');

            // Переключаем класс sdbrl-open на левой панели
            leftPanel.classList.toggle('sdbrl-open');

            // Управляем подложкой размытия фона
            if (leftPanel.classList.contains('sdbrl-open')) {
                if (blurOverlay) blurOverlay.classList.add('active');
            } else {
                if (blurOverlay) blurOverlay.classList.remove('active');
            }
            
        });
    }

    // 2. Клик по правой кнопке — Функция fnc2() (Открытие/закрытие правого сайдбара)
    if (rightMobileBtn && rightPanel) {
        rightMobileBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Если открыт левый сайдбар — закрываем его перед открытием правого
            if (leftPanel) leftPanel.classList.remove('sdbrl-open');

            // Переключаем класс sdbrr-open на правой панели
            rightPanel.classList.toggle('sdbrr-open');

            // Управляем подложкой размытия фона
            if (rightPanel.classList.contains('sdbrr-open')) {
                if (blurOverlay) blurOverlay.classList.add('active');
            } else {
                if (blurOverlay) blurOverlay.classList.remove('active');
            }
        });
    }

    // 3. Функция ПОЛНОГО ЗАКРЫТИЯ
    // Срабатывает при клике на подложку размытия фона
    if (blurOverlay && leftbtnpanelclose && rightbtnpanelclose) {
        blurOverlay.addEventListener('click', closeAllSidebars);
        leftbtnpanelclose.addEventListener('click', closeAllSidebars);
        rightbtnpanelclose.addEventListener('click', closeAllSidebars);
    }
}

// закрытие левого и правого сайдбара, убираем блюр фона
export function closeAllSidebars() {
    const leftPanel = document.getElementById('sdbrl');
    const rightPanel = document.getElementById('sdbrr');
    const blurOverlay = document.getElementById('blured-f');
    const mobilePanel = document.getElementById('searcher');
    const mobileMenu = document.getElementById('hjgkq');
    const listMenuBtns = document.getElementById('7u3qf9eqw9');
    const openSearchBtn = document.querySelector('.headersearchtwo'); 

    if (leftPanel) leftPanel.classList.remove('sdbrl-open');
    if (rightPanel) rightPanel.classList.remove('sdbrr-open');
    if (blurOverlay) blurOverlay.classList.remove('active');
    if (mobilePanel) mobilePanel.classList.remove('sdbrr-open');

    if (mobileMenu) mobileMenu.classList.remove('active');
    if (listMenuBtns) listMenuBtns.classList.remove('active');
    if (openSearchBtn) openSearchBtn.classList.remove('inactive');
}

// Выставляем её также в глобальное окно window
window.closeDocPanels = closeAllSidebars;


// открытие поиска на мобилке
function initDocSearchMobile() {
    const openSearchBtn = document.querySelector('.headersearchtwo'); 

    const rightbtnpanelclose = document.querySelector('#searcher .qehjlkof2');// кнопка закрытия правого сайдбара
    
    const searchPanel = document.getElementById('searcher'); // Окно поиска документации
    const blurOverlay = document.getElementById('blured-f');  // Подложка размытия фона

    // 1. Открытие поиска — Функция fnc6()
    if (openSearchBtn && searchPanel) {
        openSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Открываем окно поиска и активируем размытие фона, убираем видимость кнопки
            searchPanel.classList.add('sdbrr-open');
            if (blurOverlay) blurOverlay.classList.add('active');
            openSearchBtn.classList.add('inactive');
        });
    }

    // 2. Функция ПОЛНОГО ЗАКРЫТИЯ
    // Срабатывает при клике на подложку размытия фона
    if (blurOverlay && rightbtnpanelclose) {
        blurOverlay.addEventListener('click', closeAllSidebars);
        rightbtnpanelclose.addEventListener('click', closeAllSidebars);
    }
}

// 1. УПРАВЛЕНИЕ ПАПКАМИ РУБРИК (Раскрытие и закрытие)
function OpenSubMenuTree() {
    const treeMenu = document.getElementById('mainulist');
    if (!treeMenu) return;

    // Принудительно скрываем все подменю ul при загрузке сайта
    treeMenu.querySelectorAll('.menu-item ul').forEach(ul => {
        ul.style.height = '0px';
        ul.style.overflow = 'hidden';
    });

    treeMenu.addEventListener('click', (e) => {
        // Ищем клик именно по кнопке-рубрике (у которой есть класс родителя рубрик)
        const btn = e.target.closest('.menu-item > a');
        if (!btn) return;

        const ul = btn.closest('li')?.querySelector('ul');
        if (!ul) return; 

        e.preventDefault(); // Отменяем переход, так как это папка, а не статья

        const isOpen = ul.classList.toggle('active');
        btn.classList.toggle('active', isOpen);

        const buttonAnimate = ul.closest('li')?.querySelector('div');

        if (isOpen) {
            if (buttonAnimate) buttonAnimate.classList.add('active');
            ul.style.height = `${ul.scrollHeight}px`;
            setTimeout(() => { 
                if(ul.classList.contains('active')) ul.style.height = 'auto'; 
            }, 500);
        } else {
            if (buttonAnimate) buttonAnimate.classList.remove('active');
            ul.style.height = `${ul.offsetHeight}px`;
            ul.offsetHeight; // Быстрый Reflow
            ul.style.height = '0px';
        }
    });
}

// Переменные для отслеживания состояния скролла, чтобы не вызывать лишние пересчеты стилей
let isScrollingToHeader = false;

// 2. УПРАВЛЕНИЕ СТАТЬЯМИ (Клик по записям и AJAX загрузка)
export function initArticlesNavigation() {
    const treeMenu = document.getElementById('mainulist');
    if (!treeMenu) return;

    // Перехватываем клики на всем дереве меню mainulist
    treeMenu.addEventListener('click', (e) => {
        // 1. Ищем внутренний div, который содержит атрибут name (наша запись)
        const gyasdjlkDiv = e.target.closest('.gyasdjlk');
        if (!gyasdjlkDiv) return;

        // 2. Проверяем, лежит ли этот div внутри элемента списка статей (.zapis)
        const isArticle = gyasdjlkDiv.closest('.zapis');
        
        if (isArticle) {
            // 3. Мгновенно блокируем стандартное обновление страницы браузером!
            e.preventDefault();
            e.stopPropagation();

            const name = gyasdjlkDiv.getAttribute('name');
            if (!name || name === 'null') return;

            // 4. Передаем в функцию активации САМ ТЕГ С КЛАССОМ .gyasdjlk, 
            // так как следующая логика (хлебные крошки и FETCH) берет name именно оттуда
            activateArticle(gyasdjlkDiv);
        }
    });

    // 💡 НОВОЕ: Перехватываем клики по элементам "Хлебных крошек" (.childlink)
    // Избавляемся от inline-вызовов onclick="alshgfl(this)"
    const breadcrumbsContainer = document.getElementById('linkerfile');
    if (breadcrumbsContainer) {
        breadcrumbsContainer.addEventListener('click', (e) => {
            // Ищем, пришелся ли клик по элементу с классом .childlink
            const childLink = e.target.closest('.childlink');
            if (!childLink) return;

            e.preventDefault();
            e.stopPropagation();

            // Считываем имя статьи из атрибута hrefforbut (Ваша логика)
            const targetName = childLink.getAttribute('hrefforbut');
            if (!targetName || targetName === 'null') return;

            // 🎯 Связываем хлебную крошку с боковым деревом меню:
            // Находим в меню соответствующий div.gyasdjlk по значению name
            const correspondingMenuArticle = document.querySelector(`#mainulist .gyasdjlk[name="${targetName}"]`);

            if (correspondingMenuArticle) {
                // Если статья найдена в меню, активируем её (раскроется папка, обновятся стрелочки)
                activateArticle(correspondingMenuArticle);
            } else {
                // Предохранитель: если в меню статья не найдена, подгружаем контент напрямую 
                // через создание виртуального элемента с атрибутом name
                const virtualElement = document.createElement('div');
                virtualElement.setAttribute('name', targetName);
                activateArticle(virtualElement);
            }
        });
    }

    // Слушатели кнопок Вперед/Назад и скролла остаются без изменений
    const btnLeft = document.getElementById('dbf-but-l');
    const btnRight = document.getElementById('dbf-but-r');
    if (btnLeft) btnLeft.addEventListener('click', () => navigatePrevNext('prev'));
    if (btnRight) btnRight.addEventListener('click', () => navigatePrevNext('next'));

    initTableOfContentsScroll();
    routeArticleFromUrl();
    window.addEventListener('popstate', routeArticleFromUrl);
        
    // Мост-экспорт
    window.activateDocumentationArticle = (el, searchWord = '') => {
        //console.log('[DOC LOG 1] Глобальный мост window.activateDocumentationArticle СРАБОТАЛ! Слово:', searchWord);
        // Записываем слово в переменную модуля до вызова активации
        currentSearchQuery = searchWord; 
        activateArticle(el);
    };
    
    //console.log('[DOC LOG START] Навигация статей документации успешно инициализирована.');
}


// 💡 ИСПРАВЛЕННАЯ ФУНКЦИЯ: Загрузка контента статьи через FETCH
async function loadArticleContent(articleElement) {
    const postContainer = document.getElementById('postforsite');
    if (!postContainer) return;

    const articleName = articleElement.getAttribute('name');
    //console.log(`[DOC LOG 2] Функция loadArticleContent вызвана для статьи: "${articleName}"`);

    // 💡 ИСПРАВЛЕНО: Проверяем наше сохраненное слово напрямую из переменной модуля, а не из URL
    const searchWord = currentSearchQuery || new URLSearchParams(window.location.search).get('searchword');

    if (!searchWord) {
        //console.log('[DOC LOG 3] Поискового слова нет. Запускаем стандартный скролл наверх.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        //console.log(`[DOC LOG 3] Обнаружено слово поиска: "${searchWord}". Скролл наверх ОТМЕНЕН.`);
    }

    try {
        const response = await fetch(`${window.location.origin}/wp-content/themes/acadtopoplan/hello.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `const=${encodeURIComponent(articleName)}`
        });

        if (!response.ok) throw new Error('Ошибка сети');
        
        const htmlText = await response.text();
        postContainer.innerHTML = htmlText;
        //console.log('[DOC LOG 4] Текст статьи успешно внедрен в #postforsite');

        // Построение правого оглавления
        updateArticleTableOfContents(); 

        if (searchWord) {
            //console.log('[DOC LOG 5] Заводим таймер ожидания на 350мс для вызова window.searcher()...');
            setTimeout(() => {
                if (typeof window.searcher === 'function') {
                    //console.log('[DOC LOG 6] Время вышло. Вызываем window.searcher().');
                    window.searcher(searchWord);
                    
                    // Очищаем переменную после успешного поиска, чтобы при обычных кликах по дереву скролл наверх возвращался
                    currentSearchQuery = ''; 
                } else {
                    //console.error('[DOC LOG ERROR] Ошибка: window.searcher не найден в window!');
                }
            }, 200);
        }
      
    } catch (error) {
        //console.error('[DOC LOG ERROR] Критический сбой загрузки контента:', error);
        postContainer.innerHTML = '<p>Ошибка получения данных. Пожалуйста, обновите страницу.</p>';
    }
}



// Автоматическое сканирование H3 и вывод их в правый сайдбар (Ваша FindContents)
function updateArticleTableOfContents() {
    const output = document.getElementById('output');
    const postContainer = document.getElementById('postforsite');
    if (!output || !postContainer) return;

    output.innerHTML = ''; // Очищаем старое оглавление
    const h3Elements = postContainer.querySelectorAll('h3');

    h3Elements.forEach((h3, index) => {
        if (!h3.id) {
            h3.id = `heading-h3-index-${index}`;
        }

        // 💡 ИСПРАВЛЕНО: Создаем структуру строго под ваш HTML-шаблон
        const li = document.createElement('li');
        li.className = 'content-link-frame'; // Родительский класс фрейма
        li.dataset.targetId = h3.id;         // Системный маркер для скролла

        const a = document.createElement('a');
        a.className = 'link2';               // Класс самой ссылки
        a.textContent = h3.textContent.trim(); // Текст заголовка

        li.appendChild(a);
        output.appendChild(li);
    });
}

// 💡 Активация вкладки и обновление интерфейса (Строго по вашей логике asde12)
function activateArticle(element) {
    if (!element) return;

    const name = element.getAttribute('name');
    const mainUl = document.getElementById('mainulist');

    // 1. Хлебные крошки
    const linkerFile = document.getElementById('linkerfile');
    const childHome = document.getElementById('childhome');
    const parentBreadcrumb = document.getElementById('parent');
    const childBreadcrumb = document.getElementById('child');

    // Находим оригинальный текст внутри тега .myclassfortext (без мусора и пробелов)
    const elementText = element.querySelector('.myclassfortext')?.innerText.trim() || element.innerText.trim();

    if (element.parentElement?.parentElement?.parentElement?.id === 'mainulist') {
        if (linkerFile) linkerFile.classList.remove('active');
    } else {
        const doc1 = document.getElementById('1');
        if (childHome && doc1) {
            childHome.innerText = doc1.querySelector('.myclassfortext')?.innerText.trim() || doc1.innerText.trim();
            childHome.setAttribute('hrefforbut', doc1.getAttribute('name'));
        }

        if (linkerFile) linkerFile.classList.add('active');
        
        // Находим родительскую рубрику
        const parentTitle = element.closest('.menu-item-has-children')?.querySelector('.gyasdjlk')?.innerText.trim();
        if (parentBreadcrumb && parentTitle) parentBreadcrumb.innerText = parentTitle;
        if (childBreadcrumb) {
            childBreadcrumb.innerText = elementText;
            childBreadcrumb.setAttribute('hrefforbut', name);
        }
    }

    // 2. Скроллим наверх
    if (typeof window.gotop === 'function') window.gotop();

    // 3. Обновляем URL в браузере
    window.history.pushState(null, '', `?content=${name}`);

    // 4. Запускаем AJAX-подгрузку контента
    loadArticleContent(element);

    // 5. Закрываем мобильные сайдбары
    if (typeof closeAllSidebars === 'function') closeAllSidebars();

    // 6. Обновляем кнопки Вперед / Назад под статьей
    updatePrevNextButtons(element);

    // 7. 💡 ИСПРАВЛЕНО: Возвращаем оригинальный сброс и добавление классов
    document.querySelectorAll('.zapis').forEach(item => item.classList.remove('active'));
    
    // В вашем коде: e.parentElement.parentElement.classList.add('active');
    // С учетом клика по gyasdjlk это li.zapis -> a -> div.gyasdjlk
    const liZapis = element.closest('.zapis');
    if (liZapis) liZapis.classList.add('active');
}

// 💡 Управление кнопками "Вперед" / "Назад" (Строго по вашей логике)
function updatePrevNextButtons(currentElement) {
    const items = Array.from(document.querySelectorAll('.zapis'));
    const currentId = parseInt(currentElement.id);
    if (isNaN(currentId)) return;

    const previousId = currentId - 1;
    const nextId = currentId + 1;

    const btnLeft = document.getElementById("dbf-but-l");
    const btnRight = document.getElementById("dbf-but-r");

    // Кнопка НАЗАД
    const prevEl = document.getElementById(previousId.toString());
    const prevDiv = prevEl?.querySelector('.gyasdjlk') || prevEl;
    if (prevDiv && previousId >= 1) {
        if (btnLeft) btnLeft.classList.add('active');
        const textL = document.getElementById("dbf-but-l-t");
        const hrefL = document.getElementById("dbf-but-l-href");
        
        // 💡 Используем чистый innerText.trim()
        if (textL) textL.innerText = prevDiv.querySelector('.myclassfortext')?.innerText.trim() || prevDiv.innerText.trim();
        if (hrefL) hrefL.setAttribute('hrefforbut', prevDiv.getAttribute('name'));
    } else {
        if (btnLeft) btnLeft.classList.remove('active');
    }

    // Кнопка ВПЕРЕД
    const nextEl = document.getElementById(nextId.toString());
    const nextDiv = nextEl?.querySelector('.gyasdjlk') || nextEl;
    if (nextDiv && nextId <= items.length) {
        if (btnRight) btnRight.classList.add('active');
        const textR = document.getElementById("dbf-but-r-t");
        const hrefR = document.getElementById("dbf-but-r-href");
        
        // 💡 Используем чистый innerText.trim()
        if (textR) textR.innerText = nextDiv.querySelector('.myclassfortext')?.innerText.trim() || nextDiv.innerText.trim();
        if (hrefR) hrefR.setAttribute('hrefforbut', nextDiv.getAttribute('name'));
    } else {
        if (btnRight) btnRight.classList.remove('active');
    }
}

// 💡 Клик по кнопкам "Вперед" / "Назад" под статьей
function navigatePrevNext(direction) {
    // Находим текущий активный div.gyasdjlk внутри активной статьи
    const activeZapis = document.querySelector('.zapis.active .gyasdjlk');
    if (!activeZapis) return;

    const currentId = parseInt(activeZapis.id);
    const targetId = direction === 'next' ? currentId + 1 : currentId - 1;
    
    // Ищем целевой div по его числовому ID
    const targetDiv = document.getElementById(targetId.toString());

    if (targetDiv) {
        const parentUl = targetDiv.closest('ul');
        const parentBtn = parentUl?.parentElement?.querySelector('a')?.querySelector('.gyasdjlk');
        
        if (parentUl && !parentUl.classList.contains('active') && typeof toggleFolderHeight === 'function') {
            toggleFolderHeight(parentBtn, parentUl, true);
        }

        activateArticle(targetDiv);
    }
}


// 💡 Маршрутизатор страниц при загрузке сайта (Замена finder)
function routeArticleFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const contentParam = urlParams.get('content');

    const isHelpPage = window.location.href.split('/')[3] === 'help';
    if (!isHelpPage) return;

    if (!contentParam) {
        // Если параметра 'content' в URL нет — принудительно открываем первую статью
        const firstArticle = document.getElementById('1');
        if (firstArticle) activateArticle(firstArticle);
    } else {
        // Если параметр есть — находим статью по имени
        const targetArticle = document.querySelector(`.zapis[name="${contentParam}"]`) || document.querySelector(`[name="${contentParam}"]`);
        if (!targetArticle) return;

        // Делаем активным родительский контейнер li
        targetArticle.parentElement?.parentElement?.classList.add('active');
        activateArticle(targetArticle);

        // Автоматически раскрываем папку рубрики, в которой лежит эта статья
        const parentUl = targetArticle.closest('ul');
        const parentBtn = parentUl?.parentElement?.querySelector('a')?.querySelector('.gyasdjlk');
        
        if (parentUl && parentBtn && !parentUl.classList.contains('active') && typeof toggleFolderHeight === 'function') {
            toggleFolderHeight(parentBtn, parentUl, true);
        }
    }
}

// Оптимизированная инициализация кликов и скролла правого оглавления
function initTableOfContentsScroll() {
    const output = document.getElementById('output');
    if (!output) return;

    // 1. КЛИКИ ПО ПУНКТАМ СОДЕРЖАНИЯ (Замена вашей функции GetLink)
    output.addEventListener('click', (e) => {
        // Ловим клик по родительскому элементу li с классом .content-link-frame
        const liElement = e.target.closest('.content-link-frame');
        if (!liElement) return;

        const targetId = liElement.dataset.targetId;
        const targetH3 = document.getElementById(targetId);
        const header = document.getElementById('header');

        if (targetH3) {
            window.setScrollingToHeaderFlag(true);

            const offsetY = (header ? header.getBoundingClientRect().height : 0) + 20;
            const targetY = targetH3.getBoundingClientRect().top + window.pageYOffset - offsetY;

            window.scrollTo({
                top: targetY,
                behavior: 'smooth'
            });

            // 💡 ИСПРАВЛЕНО: Сбрасываем активные классы строго с элементов .content-link-frame
            output.querySelectorAll('.content-link-frame').forEach(item => item.classList.remove('active'));
            liElement.classList.add('active');

            setTimeout(() => window.setScrollingToHeaderFlag(false), 800);
        }
    });

    // 2. ПОДСВЕТКА ПРИ СКРОЛЛЕ СТРАНИЦЫ
    window.addEventListener("scroll", () => {
        if (isScrollingToHeader) return;

        const postForSite = document.getElementById("postforsite");
        const header = document.getElementById('header');
        if (!postForSite) return;

        const h3Elements = postForSite.querySelectorAll("h3");
        const outputLinks = output.querySelectorAll('.content-link-frame');
        if (!h3Elements.length || !outputLinks.length) return;

        const offsetY = (header ? header.getBoundingClientRect().height : 0) + 21;
        let lastVisibleH3 = null;

        for (let h3 of h3Elements) {
            if (h3.getBoundingClientRect().top - offsetY < 0) {
                lastVisibleH3 = h3;
            } else {
                break; 
            }
        }

        if (lastVisibleH3) {
            outputLinks.forEach(link => {
                // 💡 ИСПРАВЛЕНО: Подсвечиваем класс active на самом элементе .content-link-frame
                const isMatch = link.dataset.targetId === lastVisibleH3.id;
                link.classList.toggle('active', isMatch);
            });
        }
    }, { passive: true });
}


// Вспомогательный метод для внешнего управления флагом скролла (если потребуется при клике по оглавлению)
window.setScrollingToHeaderFlag = function(value) {
    isScrollingToHeader = value;
};
