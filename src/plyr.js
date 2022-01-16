import Plyr from "plyr";
import 'plyr/dist/plyr.css';
const videoId = 'aYTCh4T0JB0';

// const player = new Plyr('#player', {
//     ratio: '16:9',
//     // autoplay: false,
//     // tooltips: {
//     //     controls: true,
//     //     seek: true
//     // },
//     captions: {
//         active: true
//     }
// });
const baseUrl = 'https://content.webapi-services.net/video-reviews';

function playerFactory(lang) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', data => {
        window.player = new VideoPlayer(xhr.response, lang);
    });
    xhr.open('GET', `${baseUrl}/${lang}/index.json`, true);
    xhr.send();
}

export class VideoPlayer {
    constructor(videos, lang) {
        this.lang = lang;
        this.movies = videos.sort((a, b) => {
            return Date.parse(a.date) <= Date.parse(b.date) ? -1 : 1;
        });

        this.currentMovie = this.movies[0];
        this.currentIndex = 0;

        let video = document.createElement('video');
        video.id = 'player';
        video.controls = true;
        video.playsInline = true;
        video.crossOrigin = true;
        video.poster = this.currentMovie.poster || 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg';
        let source = document.createElement('source');
        source.src = `${baseUrl}/${this.lang}/${this.currentMovie.name}`;
        source.type = 'video/mp4';
        video.appendChild(source);
        document.querySelector('.container').appendChild(video);
        this.player = new Plyr(video, {
            ratio: '16:9',
            captions: {
                active: true
            }
        });

        this.showNext = this.showNext.bind(this);


    }

    showNext(step) {
        let next = step !== undefined ? step : this.currentIndex + 1;
        if (next < this.movies.length) {
            this.currentMovie = this.movies[next];
            this.currentIndex = next;
            console.log(this.currentMovie.name)
            this.player.source = {
                type: 'video',
                poster: this.currentMovie.poster || 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg',
                sources: [{
                    type: 'video/mp4',
                    src: `${baseUrl}/${this.lang}/${this.currentMovie.name}`
                }]
            }
        }
    }
}

playerFactory('en');