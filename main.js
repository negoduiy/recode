import { initBackdrop, initMainCardObserver } from './modules/backdrop.js';
import { initCounters } from './modules/counters.js';
import { initFaq } from './modules/faq.js';
import { initAdvantages } from './modules/advantages.js';
import { initNavigation } from './modules/navigation.js';
import { initSliders, initSliderNavObserver } from './modules/slider.js';
import { initTheme } from './modules/theme.js';
import { initDocumentation, initMobileNavigationMenu } from './modules/documentation.js';
import { initGlobalSearch } from './modules/search.js';

window.addEventListener('DOMContentLoaded', () => {
    try { initBackdrop(); } catch (e) { console.error(e); }                // фоновые анимации (+основная, скролл индикатор)
    try { initCounters(); } catch (e) { console.error(e); }                // анимация счетчиков "Почему AcadTopoPlan?"
    try { initFaq(); } catch (e) { console.error(e); }                     // анимация faq
    try { initAdvantages(); } catch (e) { console.error(e); }              // анимация преимуществ
    try { initNavigation(); } catch (e) { console.error(e); }              // анимаиця выбора страницы сайта
    try { initSliders(); } catch (e) { console.error(e); }                 // анимация и работа слайдера
    try { initTheme(); } catch (e) { console.error(e); }                   // анимация смены темы сайта
    try { initDocumentation(); } catch (e) { console.error(e); }           // документация
    try { initMobileNavigationMenu(); } catch (e) { console.error(e); }    // анимаиция и работа мобильного меню
    try { initGlobalSearch(); } catch (e) { console.log(e); }              // глобалбный поиск
});

window.addEventListener('resize', () => {
    try { initMainCardObserver(); } catch (e) {}
});
