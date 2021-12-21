import './slide.css';
import Hammer from 'hammerjs';


const slidesContainer = document.querySelector('.slides');
const size = 190;
let step = 0;
const slidesNumber = document.querySelectorAll('.slide').length;
const leftBtn = document.getElementById("leftBtn"), rightBtn = document.getElementById('rightBtn');


function move(direction) {
    requestAnimationFrame(() => {

        step = direction === 'right' ? step - 1 : step + 1;
        console.log(`step is: ${step}`);

        leftBtn.disabled = step >= 0;
        rightBtn.disabled = step <= -(slidesNumber - 1);
        slidesContainer.style.setProperty("transform", `translateX(${step * size}px)`);

    })
}
window.move = move;
const hammer = new Hammer(document.querySelector('.slider'));
hammer.on('swiperight', () => move('right'));

hammer.on('swipeleft', () => move('left'));