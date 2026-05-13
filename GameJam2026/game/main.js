import { GameHandler } from './handler/game.js';
import { CONFIG } from './config.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const game = new GameHandler(canvas, ctx);

const frameDuration = 1000 / CONFIG.gameplay.targetFps;
let lastTime = performance.now();
let accumulator = 0;

// Bloque le clic droit et certains raccourcis d'inspection / affichage source.
// Note : ce n'est qu'une protection contre les utilisateurs non-techniques,
// on ne peut pas empêcher complètement l'inspection dans un navigateur.
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (
        event.key === 'F12' ||
        (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(key)) ||
        (event.ctrlKey && key === 'u') ||
        (event.ctrlKey && key === 's') ||
        (event.ctrlKey && key === 'r') ||
        (event.metaKey && ['i', 'j', 'c', 'u'].includes(key))
    ) {
        event.preventDefault();
        event.stopPropagation();
    }
});

function gameLoop(now) {
    const elapsed = now - lastTime;
    lastTime = now;

    // Cap accumulated time to prevent spiral-of-death after tab switch / long pause
    accumulator += Math.min(elapsed, frameDuration * 5);

    while (accumulator >= frameDuration) {
        game.update();
        accumulator -= frameDuration;
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
