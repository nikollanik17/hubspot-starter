'use strict';

import Swiper from 'swiper';
// import gsap from 'gsap';
// import { debounce,mediaQuery } from './utils';

if (Swiper) {
    $(function () {
        // ---- ALL SLIDERS -----
        const sliderMomentumRatio = 0.455;
        const IsInitialized = (ele) => ele.hasClass('swiper-container-initialized');
        const swiperInstances = {
            category:         { instance: null, init: false },
            big:              { instance: null, init: false },
        };

        // const swiperState = (slider, swiperInstance, setup) => {
        //     if (mediaQuery('(max-width: 991px)')) {
        //         if (!swiperInstance.init) {
        //             swiperInstance.init = true;
        //             setup();
        //         }
        //     }
        //     if (mediaQuery('(min-width: 992px)')) {
        //         if (swiperInstance.init) {
        //             swiperInstance.instance.destroy();
        //             swiperInstance.init = false;
        //         }
        //     }
        // };

        // --------  BIG SLIDER --------

        const bigSlider = $('.big-slider__slider');

        function setupBigSlider () {
            const currentNumber = $('.big-slider__current-active');
            swiperInstances.big.instance = new Swiper(bigSlider[0], { // eslint-disable-line
                slidesPerView: 'auto',
                spaceBetween: 50,
                freeMode: false,
                freeModeMomentumRatio: sliderMomentumRatio,
                centeredSlides: true,
                loop: true,
                on: {
                    slideChange: function () {
                        if (swiperInstances.big.instance) {
                            console.log($('.big-slider__current-active').attr('data-length'));
                            currentNumber.text(swiperInstances.big.instance.activeIndex % parseInt(currentNumber.attr('data-length')) + 1);
                        }
                    }
                },
                pagination: {
                    el: '.big-slider__progress',
                    type: 'progressbar',
                    progressbarFillClass: 'big-slider__bar',
                    modifierClass: 'big-slider__bar--',
                    renderProgressbar: function (progressbarFillClass) {
                        return '<span class="' + progressbarFillClass + '"></span>';
                    },
                },
            });
        }

        if (bigSlider.length > 0) {
            if (!IsInitialized(bigSlider)) {
                setupBigSlider();
            }
        }

        // -------- CATEGORY SLIDER --------
        const categorySlider = $('.category-slider__slider');

        function setupCategorySlider () {
            swiperInstances.category.instance = new Swiper(categorySlider[0], { // eslint-disable-line
                slidesPerView: 'auto',
                freeMode: true,
                freeModeMomentumRatio: sliderMomentumRatio,
                pagination: {
                    el: '.category-slider__progress',
                    type: 'progressbar',
                    progressbarFillClass: 'category-slider__bar',
                    modifierClass: 'category-slider__bar--',
                    renderProgressbar: function (progressbarFillClass) {
                        return '<span class="' + progressbarFillClass + '"></span>';
                    },
                }
            });
        }

        if (categorySlider.length > 0) {
            if (!IsInitialized(categorySlider)) {
                setupCategorySlider();
            }
        }
    });
}
