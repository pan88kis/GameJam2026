import { CONFIG } from '../config.js';

export function shouldHideDuringBlink(deathTimer) {
    if (deathTimer < CONFIG.death.blinkThreshold) return false;
    return Math.floor(deathTimer / CONFIG.death.blinkInterval) % 2 === 0;
}

export function isDeathFrozen(deathTimer) {
    return deathTimer < CONFIG.death.freezeFrames;
}
