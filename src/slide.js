import './slide.css';
import Hammer from 'hammerjs';

const elSlider = document.querySelector('.slider');
const slidesContainer = document.querySelector('.slides');
const elSliderBtnsContainer = document.querySelector('.slider-btns-container');
const slidesNumber = document.querySelectorAll('.slide').length;
let elSliderBtns;

const size = 222;
let pxToMove = 0;
let sliderSettings;
let screenWidth = window.innerWidth;
let buttonsNumber;
let revealedNumber;
let activeBtnNumber = 1;


//elements that shows settings
const elSizeSpan = document.querySelector('.size span');
const pxToMoveSpan = document.querySelector('.px-to-move span');
const revealedNumberSpan = document.querySelector('.revealed-number span');
const activeBtnNumberSpan = document.querySelector('.active-btn-number span');
const buttonsNumberSpan = document.querySelector('.buttons-number span');
const sliderSettingsBreakpointSpan = document.querySelector('.slider-settings-breakpoint span');
const sliderSettingsItemSpan = document.querySelector('.slider-settings-item span');
const sliderSettingsSlideMoveSpan = document.querySelector('.slider-settings-slide-move span');
const sliderSettingsSlideMarginSpan = document.querySelector('.slider-settings-slide-margin span');


const breakpoints = [
    {
        breakpoint: 2000,
        item: 6,
        slideMove: 3,
        slideMargin: 16,
    },
    {
        breakpoint: 1600,
        item: 4,
        slideMove: 3,
        slideMargin: 16,
    },
    {
        breakpoint: 950,
        item: 3,
        slideMove: 2,
        slideMargin: 16,
    },
    {
        breakpoint: 750,
        item: 2,
        slideMove: 1,
        slideMargin: 16,
    },
    {
        breakpoint: 520,
        item: 2,
        slideMove: 1,
        slideMargin: 16,
    },
    {
        breakpoint: 420,
        item: 1,
        slideMove: 1,
        slideMargin: 16,
    }
]

function setSliderSettings() {
    screenWidth = window.innerWidth;
    if (screenWidth > breakpoints[0].breakpoint) return sliderSettings = breakpoints[0];
    for (let i = 0; i < breakpoints.length; i++) {
        if (screenWidth <= breakpoints[i].breakpoint) sliderSettings = breakpoints[i];
    }
    revealedNumber = sliderSettings.item;
}



function setButtonsNumber() {
    buttonsNumber = Math.ceil(((slidesNumber - sliderSettings.item) / sliderSettings.slideMove) + 1);
}

function createSliderButtons() {
    const sliderBtns = [];
    for (let i = 0; i < buttonsNumber; i++) {

        let slidesToMove;
        let px;
        const elSliderBtn = document.createElement('li');

        if (i < buttonsNumber - 1) {
            //Standard button
            slidesToMove = sliderSettings.slideMove * i;
            px = -slidesToMove * (sliderSettings.slideMargin + size);
        } else {
            //Handles the last button px number(In case slidesNumber is not divided by  sliderSettings.slideMove)
            slidesToMove = slidesNumber - sliderSettings.item;
            px = -slidesToMove * (sliderSettings.slideMargin + size)
        }

        elSliderBtn.addEventListener('click', () =>  onBtnClick(px, i, slidesToMove));
        sliderBtns.push(elSliderBtn)
    }
    sliderBtns[0].classList.add('active')
    elSliderBtnsContainer.replaceChildren(...sliderBtns);
    elSliderBtns = elSliderBtnsContainer.children;
    activeBtnNumber = 1;
}


function setSliderWidth() {
    elSlider.style.width = `${(size * sliderSettings.item) + (sliderSettings.slideMargin * (sliderSettings.item - 1))}px`;
    slidesContainer.style.setProperty("transform", "translateX(0px)");
}

function culcRight() {
    //determines if we are in the last swipe available to the right and  changes the value slidesToMove accordingly
    let slidesToMove = (revealedNumber + sliderSettings.slideMove <= slidesNumber) ? sliderSettings.slideMove : slidesNumber - revealedNumber;
    revealedNumber += slidesToMove;
    let pxToMoveRight = -slidesToMove * (sliderSettings.slideMargin + size);
    return pxToMoveRight;
}

function culcLeft() {
        //determines if we are in the last swipe available to the left and  changes the value slidesToMove accordingly
    let slidesToMove = (revealedNumber !== slidesNumber) ? sliderSettings.slideMove : slidesNumber - (sliderSettings.item + (sliderSettings.slideMove * (activeBtnNumber - 2)));
    revealedNumber -= slidesToMove;
    let pxToMoveRight = slidesToMove * (sliderSettings.slideMargin + size);
    return pxToMoveRight;
}

function slideRight() {
    if (revealedNumber === slidesNumber) return
    pxToMove += culcRight();
    activeBtnNumber++;
    elSliderBtns[activeBtnNumber - 1].classList.toggle('active');
    elSliderBtns[activeBtnNumber - 2].classList.toggle('active');
}

function slideLeft() {
    if (revealedNumber === sliderSettings.item) return
    pxToMove += culcLeft();
    activeBtnNumber--;
    elSliderBtns[activeBtnNumber].classList.toggle('active');
    elSliderBtns[activeBtnNumber - 1].classList.toggle('active');
}



function move(direction) {
    requestAnimationFrame(() => {
        (direction === 'right') ? slideRight() : slideLeft();
        slidesContainer.style.setProperty("transform", `translateX(${pxToMove}px)`);
        updateSettingsToShow()
    })
}

function setSlider() {
    setSliderSettings();
    setButtonsNumber();
    createSliderButtons();
    setSliderWidth();
    pxToMove = 0;
    updateSettingsToShow()
}

function onBtnClick(px, idx, slidesMoved) {
    revealedNumber = sliderSettings.item + slidesMoved;
    pxToMove = px;
    elSliderBtns[activeBtnNumber -1].classList.remove('active');
    activeBtnNumber = idx + 1;
    elSliderBtns[idx].classList.add('active')
    slidesContainer.style.setProperty("transform", `translateX(${pxToMove}px)`);
    updateSettingsToShow()
}

function updateSettingsToShow(){
    elSizeSpan.innerText = size;
    pxToMoveSpan.innerText = pxToMove;
    revealedNumberSpan.innerText = revealedNumber;
    activeBtnNumberSpan.innerText = activeBtnNumber;
    buttonsNumberSpan.innerText = buttonsNumber;
    sliderSettingsBreakpointSpan.innerText = sliderSettings.breakpoint;
    sliderSettingsItemSpan.innerText = sliderSettings.item;
    sliderSettingsSlideMoveSpan.innerText = sliderSettings.slideMove;
    sliderSettingsSlideMarginSpan.innerText = sliderSettings.slideMargin;
}


function onInit() {

    requestAnimationFrame(setSlider);

    const hammer = new Hammer(elSlider);
    hammer.on('swipeleft', () => move('right'));
    hammer.on('swiperight', () => move('left'));


    let timeout;

    window.addEventListener('resize', function ( event ) {
    
        // If there's a timer, cancel it
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }
    
        // Setup the new requestAnimationFrame()
        timeout = window.requestAnimationFrame(function () {
    
            // Run our scroll functions
            setSlider()
        });
    
    }, false)

}





onInit();
//TODO
//add RTL