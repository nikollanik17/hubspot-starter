'use strict';

import Helpers from './helpers';

class LazyImageLoader {
    static get OBSERVER_SUPPORTED () {
        return ('IntersectionObserver' in window);
    }

    static get PENDING_CLASS () {
        return 'lazy-image--pending';
    }

    static get HANDLED_CLASS () {
        return 'lazy-image--loaded';
    }

    static get LOADED_CLASS () {
        return 'lazy-image__actual';
    }

    static get REVEAL_CLASS () {
        return 'fade-in';
    }

    static get THRESHOLD () {
        return 0.1;
    }

    static init () {
        if (this.llInstance) {
            this.llInstance.llDisconnect();
        }

        this.llCount = 0;
        this.llInstance = new LazyImageLoader();
    }

    constructor () {
        var images = document.querySelectorAll(`.${LazyImageLoader.PENDING_CLASS}`);
        const config = {
            root: null,
            rootMargin: '60px 0px',
            threshold: LazyImageLoader.THRESHOLD
        };

        if (!LazyImageLoader.OBSERVER_SUPPORTED) {
            this.llLoadImagesDefault(images);
            return;
        }

        this.llCount = images.length;
        this.llIntersected = this.llIntersected.bind(this);
        this.llObserver = new IntersectionObserver(this.llIntersected, config);

        images.forEach(image => {
            if (image.classList.contains(LazyImageLoader.HANDLED_CLASS)) {
                return;
            }

            this.llObserver.observe(image);
        });
    }

    llDisconnect () {
        if (!this.llObserver) {
            return;
        }

        this.llObserver.disconnect();
    }

    llIntersected (entries) {
        entries.forEach((entry) => {
            if (entry.intersectionRatio < 0) {
                return;
            }
            if (entry.isIntersecting) {
                this.llCount--;
                this.llPreloadImage(entry.target);
                this.llObserver.unobserve(entry.target);
            }
        });

        if (this.llCount > 0) {
            return;
        }

        this.llObserver.disconnect();
    }

    llPreloadImage (image) {
        const src = image.dataset.srcset;
        if (!src) {
            return;
        }

        return Helpers.doImagePreload(src).then(() => this.llTagImage(image, src));
    }

    llLoadImagesDefault (images) {
        Array.from(images).forEach(image => this.llPreloadImage(image));
    }

    llTagImage (img, src) {
        const el = img.querySelector('.lazy-image__content');
        if (!el) {
            return;
        }

        if (!img) {
            return;
        }

        var newImg = new Image();
        newImg.classList.add(LazyImageLoader.LOADED_CLASS);
        newImg.srcset = src;
        newImg.classList.add(LazyImageLoader.REVEAL_CLASS);
        newImg.alt = el.alt;
        img.appendChild(newImg);

        img.dataset.srcset = '';
        img.classList.remove(LazyImageLoader.PENDING_CLASS);
        img.classList.add(LazyImageLoader.HANDLED_CLASS);
    }
}

export default LazyImageLoader;
