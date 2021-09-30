'use strict';

const doImagePreload = url => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.srcset = url;
        image.onload = resolve;
        image.onerror = reject;
    });
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const assert = (predicate, message) => {
    if (predicate) {
        return;
    }

    throw new Error(message);
};

export default {
    assert, clamp, doImagePreload
};
