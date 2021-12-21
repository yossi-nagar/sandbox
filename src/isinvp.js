
import './isinvp.css';
const elem = document.getElementById('my-element');
window.isInViewPort = function () {
    window.requestAnimationFrame(() => {
        var bounding = elem.getBoundingClientRect(),
            windowWidth = window.innerWidth || document.documentElement.clientWidth,
            windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if ((bounding.top >= 0 && bounding.top < windowHeight) && bounding.left >= 0 && bounding.right <= windowWidth /*&& bounding.bottom <= windowHeight*/) {

            alert('Element is in the viewport!');
        } else {

            alert('Element is NOT in the viewport!');
        }
    })

}