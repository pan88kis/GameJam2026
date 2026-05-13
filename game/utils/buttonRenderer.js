import { CONFIG } from '../config.js';

export function isInsideBounds(px, py, bounds) {
    return px >= bounds.x && px <= bounds.x + bounds.width &&
           py >= bounds.y && py <= bounds.y + bounds.height;
}

export function drawHoverButton(ctx, image, bounds, mouseX, mouseY, frames) {
    const hovered = isInsideBounds(mouseX, mouseY, bounds);
    let drawY = bounds.y + Math.sin(frames * CONFIG.button.bobFrequency) * CONFIG.button.bobAmplitude;

    if (hovered) {
        drawY += CONFIG.button.hoverOffset;
        ctx.filter = CONFIG.button.hoverFilter;
    }

    if (image.complete) {
        ctx.drawImage(image, bounds.x, drawY, bounds.width, bounds.height);
    }

    ctx.filter = 'none';
}
