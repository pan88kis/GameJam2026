import { CONFIG } from '../config.js';

export function drawOutlinedText(ctx, text, x, y, options = {}) {
    const {
        fillColor = 'white',
        outlineColor = 'black',
        font = `${CONFIG.ui.fontSize}px ${CONFIG.ui.fontFamily}`,
        align = 'left',
        offsets = CONFIG.ui.outlineOffsets,
    } = options;

    ctx.font = font;
    ctx.textAlign = align;

    ctx.fillStyle = outlineColor;
    for (const offset of offsets) {
        ctx.fillText(text, x + offset.x, y + offset.y);
    }

    ctx.fillStyle = fillColor;
    ctx.fillText(text, x, y);
}
