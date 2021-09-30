'use strict';

// ---------- Image / css assets ------------

require.context('./assets/', true, /\.(svg|png|jpe?g)$/);
require('./assets/styles/main.scss');

const includeComponent = (script) => require(`./assets/scripts/components/${script}.js`);

// -------------- Lazy load -----------------

/*
 * import LazyImageLoader from './assets/scripts/components/lazyimageloader.js';
 * LazyImageLoader.init();
 */

// ----------- Custom scripts ---------------
includeComponent('header');
// includeComponent('imageSlider');
// includeComponent('countUp');
// includeComponent('slider');
// includeComponent('accordion');
// includeComponent('map');
// includeComponent('header');
// includeComponent('changeList');
// includeComponent('contentSlider');
// includeComponent('imageZoom');
// includeComponent('resource');
// includeComponent('checklist');
// includeComponent('benefits');
// includeComponent('categorySlider');
// includeComponent('globalAnimations');
// includeComponent('boxImage');
