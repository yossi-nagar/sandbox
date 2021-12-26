import './menu.css'

const raf = window.requestAnimationFrame;
document.querySelectorAll('.toggle').forEach(item => {
    const subMenu = item.querySelector('.submenu');
    const x = item.querySelector('.x');
    raf(() => {
        const initialHeight = item.getBoundingClientRect().height;
        let accordionHeight;
        item.addEventListener('click', ev => {
            ev.preventDefault();
            if (!item.classList.contains('expanded')) {
                raf(() => {
                    
                    item.style.height = `${initialHeight}px`;
                    item.style.overflow = 'hidden';
                    item.style.transition = "height 0.5s ease-out";
                    item.dataset.initialHeight = initialHeight;
                    raf(() => {
                        subMenu.style.display = 'block';
                        raf(() => {
                            if (!accordionHeight) {
                                accordionHeight = subMenu.scrollHeight;
                            }
                            
                            item.style.height = `${accordionHeight+initialHeight}px`;
                            item.classList.add('expanded');
                            x.classList.add('x-rotated');
    
                        })
                    })
                })
            } else {
                raf(() => {
                    item.style.height = `${item.dataset.initialHeight}px`;
                    x.classList.remove('x-rotated');
                    item.classList.remove('expanded');
                    item.addEventListener('transitionend', function handler(ev) {
                        item.removeEventListener('transitionend', handler);
                        subMenu.style.display = 'none';
                    })
                })
            }
        })
    })
    
})