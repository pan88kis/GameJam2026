import { CONFIG } from '../config.js';
import { loadImage } from '../utils/imageLoader.js';
import { drawOutlinedText } from '../utils/textRenderer.js';

const crosshairImg = loadImage(CONFIG.assets.ui.crosshair);

export function drawUI(game, isGameOver = false) {
    game.ctx.imageSmoothingEnabled = false;

    if (!isGameOver) {
        drawOutlinedText(game.ctx, `SCORE: ${game.score}`, CONFIG.ui.scoreX, CONFIG.ui.scoreY);

        const timerValue = Math.max(0, Math.ceil(game.timerSeconds));
        drawOutlinedText(game.ctx, `TIME: ${timerValue}`, game.canvas.width - CONFIG.ui.timerPadding, CONFIG.ui.timerY, {
            align: 'right',
        });

        game.ctx.textAlign = 'left';
    }

    if (crosshairImg.complete) {
        const width = crosshairImg.width * CONFIG.ui.crosshairScale;
        const height = crosshairImg.height * CONFIG.ui.crosshairScale;
        game.ctx.drawImage(crosshairImg, game.mouseX - width / 2, game.mouseY - height / 2, width, height);
    }
}
