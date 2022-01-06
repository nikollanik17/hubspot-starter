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
includeComponent('slider');
