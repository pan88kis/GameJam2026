import { CONFIG } from '../config.js';
import { isInsideBounds } from '../utils/buttonRenderer.js';

export function setupEventListeners(game) {
    game.canvas.addEventListener('mousemove', (event) => {
        const rect = game.canvas.getBoundingClientRect();
        const scaleX = game.canvas.width / rect.width;
        const scaleY = game.canvas.height / rect.height;
        game.mouseX = (event.clientX - rect.left) * scaleX;
        game.mouseY = (event.clientY - rect.top) * scaleY;
    });

    game.canvas.addEventListener('mousedown', (event) => {
        if (event.button !== 0) return;
        if (!game.isGameRunning) return;

        if (game.isGameOver) {
            const revealTime = CONFIG.gameOver.fadeDuration + CONFIG.gameOver.waitDuration;
            if (game.gameOverTimer > revealTime && isInsideBounds(game.mouseX, game.mouseY, game.backButtonBounds)) {
                game.resetToMenu();
            }
            return;
        }

        game.shoot();
    });


    game.canvas.addEventListener('mouseup', () => {
        game.isShooting = false;
    });
}
