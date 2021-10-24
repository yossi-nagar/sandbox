import './style.css';

// let accordion = document.querySelector('.accordion'),
//     title = accordion.querySelector('.title'),
//     content = accordion.querySelector('.content');


// function slideDown(timestamp) {
//     let accordionHeight = accordion.getBoundingClientRect().height;
//     let contentHeight = content.getBoundingClientRect().height;
//     console.log(accordionHeight, contentHeight)
//     accordion.style.maxHeight = `${accordionHeight+contentHeight}px`;
// }
// title.addEventListener('click', e => {
    
//     window.requestAnimationFrame(slideDown);
// });

document.querySelectorAll('.accordion').forEach(accordion => {
    let title = accordion.querySelector('.title'),
    content = accordion.querySelector('.content'),
    initialHeight = accordion.style.maxHeight;
    title.addEventListener('click', e => {
        if(!accordion.classList.contains('active')) {
            accordion.classList.add('active');
            window.requestAnimationFrame(ts => {
                let maxHeight = accordion.getBoundingClientRect().height + content.getBoundingClientRect().height;
                accordion.style.maxHeight = `${maxHeight}px`;
            });
        } else {
            accordion.classList.remove('active');
            window.requestAnimationFrame(ts => {
                accordion.style.maxHeight = initialHeight;
            });
        }
    })
})
