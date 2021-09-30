'use strict';

import gsap from 'gsap';

if (gsap) {
    $(function () {
        const resource = $('.resource');
        // let swap = false;

        if (resource.length > 0) {
            // const changeClasses = () => {
            //     let red = $('.resource__block-red')[0];
            //     let black = $('.resource__block-black')[0];

            //     if (!swap) {
            //         red.classList.add('swap');
            //         black.classList.add('swap');
            //     } else {
            //         red.classList.remove('swap');
            //         black.classList.remove('swap');
            //     }
            //     swap = !swap;
            // }

            // ScrollTrigger.create({
            //     target: '.resource__block',
            //     start: 'top top',
            //     markers: true,
            //     // end: document.innerHeight,
            //     onToggle: () => changeClasses(),
            // });
        }
    });
}
