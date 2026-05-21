export function initNavigation() {
    const parent = document.querySelector('.header-navigaton-list');
    if (!parent) return; 

    const currentPath = window.location.pathname.replace(/\/$/, "");
    const links = parent.querySelectorAll("li a");
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        try {
            const linkUrl = new URL(href, window.location.origin);
            const linkPath = linkUrl.pathname.replace(/\/$/, "");

            if ((linkPath === "" || linkPath === "/") && currentPath !== "") return;

            if (currentPath === linkPath) {
                link.classList.add('active');
            }
        } catch (e) {
            if (href === window.location.hash) link.classList.add('active');
        }
    });
}
