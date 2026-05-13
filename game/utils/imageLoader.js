export function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

export function loadImages(srcArray) {
    return srcArray.map(loadImage);
}

export function loadImageSequence(prefix, count, suffix = '.png') {
    const images = [];
    for (let i = 1; i <= count; i++) {
        images.push(loadImage(`${prefix}${i}${suffix}`));
    }
    return images;
}

export function onAllLoaded(images, callback) {
    let remaining = images.length;
    if (remaining === 0) {
        callback();
        return;
    }
    const onLoad = () => {
        remaining--;
        if (remaining === 0) callback();
    };
    images.forEach(img => {
        if (img.complete) {
            onLoad();
        } else {
            img.onload = onLoad;
        }
    });
}
