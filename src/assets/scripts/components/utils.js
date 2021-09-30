'use strict';

import gsap from 'gsap';

export const debounce = (func, wait, immediate) => {
    var timeout;
    if (typeof func !== 'undefined') {
        return function () {
            var context = this;
            var args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    } else {
        console.warn('A function is undefined! Debounce might not work as intended: ', func);
    }
};

export const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;

    if (typeof func !== 'undefined') {
        return function () {
            const context = this;
            const args = arguments;

            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);

                lastFunc = setTimeout(function () {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    } else {
        console.warn('A function is undefined! Throttle might not work as intended: ', func);
    }
};

export const lerp = (start, end, amt) => {
    return (1 - amt) * start + amt * end;
};

export const clamp = (min, val, max) => {
    return Math.min(Math.max(val, min), max);
};

export const irandom = (max) => Math.floor(Math.random() * Math.floor(max));
export const seconds = (ms) => ms * 1000;

export const mediaQuery = (query) => (window.matchMedia(query)).matches;

export const stbScrollTo = (ele, speed = 200) => {
    if (gsap) {
        gsap.registerPlugin(ScrollToPlugin); // eslint-disable-line

        gsap.to(window, {
            duration: speed / 1000,
            ease: 'Power3.easeOut',
            scrollTo: {
                y: $(ele).offset().top
            }
        });
    } else {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(ele).offset().top
        }, speed);
    }
};
