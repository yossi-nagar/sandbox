import './slide.css';
import Hammer from 'hammerjs';


function getSliderSettings() {
    let sliderSettings;
    let screenWidth = window.innerWidth;
    if (screenWidth > breakpoints[0].breakpoint) return sliderSettings = breakpoints[0];
    for (let i = 0; i < breakpoints.length; i++) {
        if (screenWidth <= breakpoints[i].breakpoint) sliderSettings = breakpoints[i];
    }
    return sliderSettings;
}


class Slider {


    constructor(sliderSettings, isRTL) {
        this.slideWidth = sliderSettings.slideWidth;
        this.item = sliderSettings.item;
        this.slideMove = sliderSettings.slideMove;
        this.slideMargin = sliderSettings.slideMargin;
        this.slidesNumber;

        this.pxToMove = 0;
        this.activeBtnNumber = 1;
        this.revealedNumber = sliderSettings.item;
        this.buttonsNumber = this.getButtonsNumber();
        this.screenWidth;

        this.elSlider; //maybe can be deleted because we declare it once again the RAF
        this.elSlidesContainer;
        this.elSliderBtnsContainer;
        this.elSliderBtns;

        requestAnimationFrame(() => {
            this.screenWidth = window.innerWidth;
            this.elSlider = document.querySelector('.slider');
            this.elSlidesContainer = document.querySelector('.slides');
            this.elSliderBtnsContainer = document.querySelector('.slider-btns-container');
            this.slidesNumber = document.querySelectorAll('.slide').length;
            this.buttonsNumber = this.getButtonsNumber();
            this.createSliderButtons();
            this.setSliderWidth();
            this.pxToMove = 0;

            if(isRTL) this.setRTL();

            const hammer = new Hammer(this.elSlider);
            hammer.on('swipeleft', () => this.move(isRTL ? 'left' : 'right'));
            hammer.on('swiperight', () => this.move(isRTL ? 'right' : 'left'));
        });


        
    }

    getButtonsNumber() {
        return Math.ceil(((this.slidesNumber - this.item) / this.slideMove) + 1);
    }

    createSliderButtons() {
        const sliderBtns = [];
        for (let i = 0; i < this.buttonsNumber; i++) {

            let slidesToMove;
            let px;
            const elSliderBtn = document.createElement('li');

            if (i < this.buttonsNumber - 1) {
                //Standard button
                slidesToMove = this.slideMove * i;
                px = -slidesToMove * (this.slideMargin + this.slideWidth);
            } else {
                //Handles the last button px number(In case slidesNumber is not divided by  sliderSettings.slideMove)
                slidesToMove = this.slidesNumber - this.item;
                px = -slidesToMove * (this.slideMargin + this.slideWidth)
            }

            elSliderBtn.addEventListener('click', () => this.onBtnClick(px, i, slidesToMove));
            sliderBtns.push(elSliderBtn);
        }
        sliderBtns[0].classList.add('active');
        this.elSliderBtnsContainer.replaceChildren(...sliderBtns);
        this.elSliderBtns = this.elSliderBtnsContainer.children;
        this.activeBtnNumber = 1;
    }

    setSliderWidth() {
        this.elSlider.style.width = `${(this.slideWidth * this.item) + (this.slideMargin * (this.item - 1))}px`;
        this.elSlidesContainer.style.setProperty("transform", "translateX(0px)");
    }

    setRTL(){
        this.elSlider.classList.add('mirror-flip');
        const elSlides = Array.from(this.elSlidesContainer.children);
        elSlides.forEach(slide => slide.classList.add('mirror-flip'));
        this.elSliderBtnsContainer.classList.add('mirror-flip');
    }

    calcRight() {
        //determines if we are in the last swipe available to the right and  changes the value slidesToMove accordingly
        let slidesToMove = (this.revealedNumber + this.slideMove <= this.slidesNumber) ? this.slideMove : this.slidesNumber - this.revealedNumber;
        this.revealedNumber += slidesToMove;
        let pxToMoveRight = -slidesToMove * (this.slideMargin + this.slideWidth);
        return pxToMoveRight;
    }
    
    calcLeft() {
        //determines if we are in the first swipe to the left and changes the value slidesToMove accordingly
        let slidesToMove = (this.revealedNumber !== this.slidesNumber) ? this.slideMove : this.slidesNumber - (this.item + (this.slideMove * (this.activeBtnNumber - 2)));
        this.revealedNumber -= slidesToMove;
        let pxToMoveRight = slidesToMove * (this.slideMargin + this.slideWidth);
        return pxToMoveRight;
    }
    
    slideRight() {
        if (this.revealedNumber === this.slidesNumber) return
        this.pxToMove += this.calcRight();
        this.activeBtnNumber++;
        this.elSliderBtns[this.activeBtnNumber - 1].classList.toggle('active');
        this.elSliderBtns[this.activeBtnNumber - 2].classList.toggle('active');
    }
    
    slideLeft() {
        if (this.revealedNumber === this.item) return
        this.pxToMove += this.calcLeft();
        this.activeBtnNumber--;
        this.elSliderBtns[this.activeBtnNumber].classList.toggle('active');
        this.elSliderBtns[this.activeBtnNumber - 1].classList.toggle('active');
    }

    move(direction) {
        requestAnimationFrame(() => {
            (direction === 'right') ? this.slideRight() : this.slideLeft();
            this.elSlidesContainer.style.setProperty("transform", `translateX(${this.pxToMove}px)`);
        })
    }

    onBtnClick(px, idx, slidesMoved) {
        this.revealedNumber = this.item + slidesMoved;
        this.pxToMove = px;
        requestAnimationFrame(() => {
            this.elSliderBtns[this.activeBtnNumber - 1].classList.remove('active');
            this.activeBtnNumber = idx + 1;
            this.elSliderBtns[idx].classList.add('active')
            this.elSlidesContainer.style.setProperty("transform", `translateX(${this.pxToMove}px)`);
        })
    }
    
}

const breakpoints = [
    {
        breakpoint: 2000,
        item: 6,
        slideMove: 3,
        slideMargin: 16,
        slideWidth: 222
    },
    {
        breakpoint: 1600,
        item: 4,
        slideMove: 3,
        slideMargin: 16,
        slideWidth: 222
    },
    {
        breakpoint: 950,
        item: 3,
        slideMove: 2,
        slideMargin: 16,
        slideWidth: 222
    },
    {
        breakpoint: 750,
        item: 2,
        slideMove: 1,
        slideMargin: 16,
        slideWidth: 222
    },
    {
        breakpoint: 520,
        item: 2,
        slideMove: 1,
        slideMargin: 16,
        slideWidth: 222
    },
    {
        breakpoint: 420,
        item: 1,
        slideMove: 1,
        slideMargin: 16,
        slideWidth: 222
    }
]



requestAnimationFrame(()=>{
    const settings = getSliderSettings();

    new Slider(settings, false);

    //RTL DEMO
    // document.body.classList.add('ar');
    // new Slider(settings, true);
})