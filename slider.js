let currentIndex = 1; 
let count = 0;
let intervalId = null;
let isRunning = false;
let isMoving = false;
let firstPosX = 0;
let distance = 0;
let isTransitioned = false;
const slideDuration = 5000;
let originalSlidesCount = 0; 

export function initSliders() {
    const slidesTrack = document.getElementById('slider-slides');
    const dotsContainer = document.querySelector('.list-items-dots');
    const container = document.querySelector('.slider-item-container');

    if (!slidesTrack || !container) return;

    // Аппаратная блокировка системного drag-and-drop браузера
    fixDraggableElements(slidesTrack);

    // Подготовка бесконечной структуры
    setupInfiniteSlides(slidesTrack, dotsContainer);

    // Принудительно настраиваем тач-поведение через CSS, чтобы слайдер свайпался на телефонах
    container.style.touchAction = 'pan-y'; // Разрешаем скролл экрана по вертикали, но забираем горизонтальный свайп
    slidesTrack.style.willChange = 'transform';

    updateSlider(slidesTrack, false); 
    startCounter(slidesTrack);

    initSwipeEvents(container, slidesTrack);
    initSliderNavObserver();
}

function fixDraggableElements(slidesTrack) {
    slidesTrack.querySelectorAll('img, a').forEach(el => {
        el.setAttribute('draggable', 'false');
        el.style.userSelect = 'none';
        el.style.webkitUserSelect = 'none';
        el.addEventListener('dragstart', (e) => e.preventDefault());
    });
}

function setupInfiniteSlides(slidesTrack, dotsContainer) {
    // Удаляем старые клоны, если они уже были (защита от дублирования при повторных вызовах)
    slidesTrack.querySelectorAll('.slider-slide-clone').forEach(clone => clone.remove());

    const slides = Array.from(slidesTrack.querySelectorAll('.slider-slide'));
    originalSlidesCount = slides.length;
    if (originalSlidesCount === 0) return;

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[originalSlidesCount - 1].cloneNode(true);

    firstClone.classList.add('slider-slide-clone');
    lastClone.classList.add('slider-slide-clone');

    fixDraggableElements(firstClone);
    fixDraggableElements(lastClone);

    slidesTrack.appendChild(firstClone);
    slidesTrack.insertBefore(lastClone, slides[0]);

    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < originalSlidesCount; i++) {
            const dot = document.createElement('li');
            dot.classList.add('item-dot');
            const dotit = document.createElement('div');
            dotit.classList.add('dot');
            const progressbar = document.createElement('div');
            progressbar.classList.add('progress-bar');
            
            dotit.appendChild(progressbar);
            dot.appendChild(dotit);
            dot.addEventListener('click', () => moveToSlide(slidesTrack, i + 1));
            dotsContainer.appendChild(dot);
        }
    }
}

function updateSlider(slidesTrack, withAnimation = true) {
    if (!slidesTrack) return;
    slidesTrack.style.transition = withAnimation ? 'transform 0.5s ease' : 'none';
    slidesTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    let dotActiveIndex = currentIndex - 1;
    if (currentIndex === 0) dotActiveIndex = originalSlidesCount - 1;
    if (currentIndex === originalSlidesCount + 1) dotActiveIndex = 0;

    document.querySelectorAll('.item-dot').forEach((dot, index) => {
        const isActive = index === dotActiveIndex;
        dot.classList.toggle('active', isActive);
        if (!isActive) {
            const pb = dot.querySelector('.progress-bar');
            if (pb) pb.style.width = '0%';
        }
    });
}

function moveToSlide(slidesTrack, index) {
    if (currentIndex !== index) {
        currentIndex = index;
        updateSlider(slidesTrack, true);
        count = 0;
    }
}

// 💡 ИСПРАВЛЕНО: Бесшовная подмена индекса без анимации
function handleLoopFix(slidesTrack) {
    if (currentIndex >= originalSlidesCount + 1) {
        currentIndex = 1;
        updateSlider(slidesTrack, false);
    }
    if (currentIndex <= 0) {
        currentIndex = originalSlidesCount;
        updateSlider(slidesTrack, false);
    }
}

function stopCounter() {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
    }
}

function startCounter(slidesTrack) {
    if (!slidesTrack || isRunning) return;
    isRunning = true;
    intervalId = setInterval(() => {
        count += 100;
        const activeDot = document.querySelector('.item-dot.active');
        if (activeDot) {
            const progressBar = activeDot.querySelector('.progress-bar');
            if (progressBar) progressBar.style.width = `${count * 0.02}%`;
        }

        if (count >= slideDuration) {
            count = 0;
            currentIndex++;
            updateSlider(slidesTrack, true);
        }
    }, 100);
}

function initSwipeEvents(container, slidesTrack) {
    slidesTrack.addEventListener('transitionrun', () => { isTransitioned = true; });
    slidesTrack.addEventListener('transitionend', () => { 
        isTransitioned = false; 
        handleLoopFix(slidesTrack); 
    });

    let activeLinkHref = '';
    let startTransformX = 0; 
    let wasTransitioningWhenStarted = false;
    let isTouch = false;

    // Жесткая блокировка кликов при свайпе
    slidesTrack.querySelectorAll('.slider-slide').forEach(slide => {
        slide.addEventListener('click', (e) => {
            if (Math.abs(distance) > 10 || wasTransitioningWhenStarted) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });

    // 💡 ИСПРАВЛЕНО: Универсальное чтение координат для тача и мыши
    const getX = (e) => e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;

    function startSwipe(e) {
        isTouch = e.type === 'touchstart';
        
        // Аварийный сброс клонов
        handleLoopFix(slidesTrack);

        wasTransitioningWhenStarted = isTransitioned; 
        
        const slide = e.target.closest('.slider-slide');
        activeLinkHref = slide ? slide.getAttribute('href') : '';

        isMoving = true;
        firstPosX = getX(e);
        distance = wasTransitioningWhenStarted ? 999 : 0; 

        // Идеальный расчёт без дёрганий на мобильных:
        // Базово берём теоретическую позицию текущего слайда в пикселях
        startTransformX = -currentIndex * container.offsetWidth;

        // Если слайдер перехвачен в полёте, вычисляем, насколько далеко он успел улететь.
        // Корректируем точку старта, чтобы движение мыши продолжилось плавно без прыжков.
        if (wasTransitioningWhenStarted) {
            const style = window.getComputedStyle(slidesTrack);
            const matrix = new WebKitCSSMatrix(style.transform);
            const currentMatrixX = Math.round(matrix.m41);
            
            // Если разница между полётом и сеткой небольшая, плавно компенсируем её
            if (Math.abs(currentMatrixX - startTransformX) < container.offsetWidth) {
                startTransformX = currentMatrixX;
            }
        }

        slidesTrack.style.transition = 'none';
        slidesTrack.style.transform = `translateX(${startTransformX}px)`;
        stopCounter();
    }




    function moveSwipe(e) {
        if (!isMoving) return;
        
        const currentX = getX(e);
        const currentDistance = firstPosX - currentX; 
        
        // 💡 ИСПРАВЛЕНО: На телефонах, если мы свайпаем горизонтально, глушим вертикальный скролл страницы
        if (Math.abs(currentDistance) > 10 && e.cancelable) {
            e.preventDefault();
        }

        distance = wasTransitioningWhenStarted ? (currentDistance + 999) : currentDistance;
        slidesTrack.style.transform = `translateX(${startTransformX - currentDistance}px)`;
    }

    function endSwipe() {
        if (!isMoving) return;
        isMoving = false;
        
        slidesTrack.style.transition = 'transform 0.5s ease';

        const sliderWidth = container.offsetWidth || 1;
        const actualHandDistance = wasTransitioningWhenStarted ? (distance - 999) : distance;
        
        // Вычисляем процент сдвига относительно всей ширины слайдера
        const percent = (actualHandDistance / sliderWidth) * 100;

        // 💡 ИСПРАВЛЕНО: Увеличили порог до 35%. 
        // Теперь слайд переключится только при уверенном, длинном свайпе.
        if (percent >= 25) { 
            currentIndex++;
            updateSlider(slidesTrack, true);
        } else if (percent <= -25) {
            currentIndex--;
            updateSlider(slidesTrack, true);
        } else {
            // Если протащили мало (меньше 35%), слайд плавно вернётся на своё место
            if (!wasTransitioningWhenStarted && Math.abs(distance) <= 5 && activeLinkHref) {
                window.location.href = activeLinkHref;
            } else {
                updateSlider(slidesTrack, true);
            }
        }

        setTimeout(() => { 
            distance = 0; 
            wasTransitioningWhenStarted = false;
        }, 50);
        
        count = 0;
        startCounter(slidesTrack);
    }

    // События мыши (ПК)
    container.addEventListener('mousedown', startSwipe);
    window.addEventListener('mousemove', moveSwipe);
    window.addEventListener('mouseup', endSwipe);

    // 💡 ИСПРАВЛЕНО: Убрали passive: true, чтобы JS мог перехватить управление тачем на мобильных
    container.addEventListener('touchstart', startSwipe, { passive: false });
    container.addEventListener('touchmove', moveSwipe, { passive: false });
    container.addEventListener('touchend', endSwipe);
    container.addEventListener('touchcancel', endSwipe);
}

export function initSliderNavObserver() {
    const items = document.querySelectorAll('.position-fr');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const item = entry.target;
            if (entry.isIntersecting) {
                const left = item.querySelector('.form-list-items-dots-l');
                const right = item.querySelector('.form-list-items-dots-r');
                const formApple = item.querySelector('.form-apple');

                if (left && right && formApple) {
                    const maxWidth = left.scrollWidth + 15 + right.scrollWidth;
                    const currentWidth = window.getComputedStyle(formApple).width;

                    item.classList.add('active');
                    formApple.style.setProperty('--start-width', `${maxWidth}px`);
                    formApple.style.setProperty('--current-width', currentWidth);
                }
            } else {
                item.classList.remove('active');
            }
        });
    }, { rootMargin: '-100px 0px -100px 0px' });

    items.forEach(item => observer.observe(item));
}

window.rrr = function(e) {
    if (!e) return;
    const slidesTrack = document.getElementById('slider-slides');
    if (!e.classList.contains('active')) {
        e.classList.add("active");
        stopCounter();
    } else {
        e.classList.remove("active");
        if (slidesTrack) startCounter(slidesTrack);
    }
};
