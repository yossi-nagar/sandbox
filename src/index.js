import './style.css';

document.querySelectorAll('.accordion').forEach(accordion => {
    let title = accordion.querySelector('.title'),
        content = accordion.querySelector('.content'),
        initialHeight = accordion.style.maxHeight;
    title.addEventListener('click', e => {
        if (!title.classList.contains('active')) {

            window.requestAnimationFrame(ts => {
                title.classList.add('active');
                title.classList.remove('not-active');
                let maxHeight = accordion.getBoundingClientRect().height + content.getBoundingClientRect().height;
                accordion.style.maxHeight = `${maxHeight}px`;
            });
        } else {

            window.requestAnimationFrame(ts => {
                title.classList.add('not-active');
                title.classList.remove('active');
                accordion.style.maxHeight = initialHeight;
            });
        }
    })
})
