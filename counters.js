export function initCounters() {
    const triggerElement = document.getElementById('n');
    const counters = document.querySelectorAll('.counter');
    if (!triggerElement || !counters.length) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                startCounting(counters);
                observer.unobserve(triggerElement);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px' });

    observer.observe(triggerElement);
}

function startCounting(counters) {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target') || 0;
        const parentBlock = counter.closest('.advantages-form'); 
        const pElement = parentBlock?.querySelector('p');
        
        if (pElement && pElement.innerText.trim() === 'Конверсия') {
            const percentageSign = counter.parentElement?.querySelector('.procentage');
            if (percentageSign) percentageSign.innerText = '%';
        }

        const step = Math.ceil(target / 50) || 1; 

        const updateCount = () => {
            const current = +counter.innerText || 0;
            if (current < target) {
                counter.innerText = Math.min(target, current + step);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}
