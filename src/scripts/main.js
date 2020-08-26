import '../styles/vendors/bootstrap-reboot.css';
import '../styles/vendors/swiper.min.css';
import '../styles/style.scss';

import { ScrollObserver } from './libs/scroll.js';
import { TextAnimation,TweenTextAnimation } from './libs/text-animation.js';
import { HeroSlider } from './libs/hero-slider.js';
import { MobileMenu } from './libs/mobile-menu.js';


document.addEventListener('DOMContentLoaded', function () {
    const hero = new HeroSlider('.swiper-container');
    hero.start();

    const cb = function (el, inview) {
        if(inview) {
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    };

    const so = new ScrollObserver('.tween-animate-title', cb);

    const _inviewAnimation = function(el,inview){
        if(inview){
            el.classList.add('inview');

        }else{
            el.classList.remove('inview');


        }
    };

    const so2 = new ScrollObserver('.cover-slide', _inviewAnimation);

    const header = document.querySelector('.header');
    const _navAnimation = function(el,inview){
        if(inview){
            header.classList.remove('triggered');
        }else{
            header.classList.add('triggered');
        }
    };

    const so3 = new ScrollObserver('.nav-trigger', _navAnimation, {once: false});

    new MobileMenu();
});
