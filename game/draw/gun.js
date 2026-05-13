import { CONFIG } from '../config.js';
import { Bobbing } from '../utils/bobbing.js';
import { loadImage, loadImageSequence } from '../utils/imageLoader.js';

const gunIdle = loadImage(CONFIG.assets.gun.idle);
const gunFiring = loadImage(CONFIG.assets.gun.firing);
const muzzleImages = loadImageSequence(CONFIG.assets.gun.muzzlePrefix, CONFIG.gun.muzzleFrameCount);

export function drawGun(game) {
    const centerX = game.canvas.width / 2;
    const isShooting = game.flashTimer > 0;

    if (!game.gunState) {
        game.gunState = {
            frames: game.frames,
            mouseX: game.mouseX,
            mouseY: game.mouseY
        };
    }

    if (!isShooting) {
        game.gunState.frames++;
        game.gunState.mouseX = game.mouseX;
        game.gunState.mouseY = game.mouseY;
    }

    const mouseSway = Bobbing.getMouseSway(
        game.gunState.mouseX, game.gunState.mouseY,
        game.canvas.width, game.canvas.height,
        CONFIG.gun.mouseSwayFactor
    );

    const breathing = Bobbing.getBreathing(
        game.gunState.frames,
        CONFIG.gun.breathingFreqX, CONFIG.gun.breathingAmpX,
        CONFIG.gun.breathingFreqY, CONFIG.gun.breathingAmpY
    );

    game.ctx.save();
    game.ctx.translate(
        centerX + mouseSway.x + breathing.x,
        game.canvas.height + mouseSway.y + breathing.y
    );

    const gunImg = isShooting ? gunFiring : gunIdle;
    const scale = Bobbing.getScale(game.gunState.frames, CONFIG.gun.defaultScale, CONFIG.gun.scaleFrequency, CONFIG.gun.scaleAmplitude);

    let width = 0;
    let height = 0;
    if (gunImg.complete) {
        width = gunImg.width * scale;
        height = gunImg.height * scale;
    }

    if (game.flashTimer > 0) {
        const flashY = gunImg.complete ? -height : CONFIG.gun.fallbackFlashY;

        let frameIndex = Math.floor(((CONFIG.gun.flashFrames - game.flashTimer) / CONFIG.gun.flashFrames) * muzzleImages.length);
        frameIndex = Math.max(0, Math.min(muzzleImages.length - 1, frameIndex));

        const muzzleImg = muzzleImages[frameIndex];
        if (muzzleImg.complete) {
            const muzzleWidth = muzzleImg.width * scale * CONFIG.gun.muzzleScale;
            const muzzleHeight = muzzleImg.height * scale * CONFIG.gun.muzzleScale;
            game.ctx.drawImage(muzzleImg, -muzzleWidth / 2, flashY - muzzleHeight / 2, muzzleWidth, muzzleHeight);
        }
    }

    if (gunImg.complete) {
        game.ctx.drawImage(gunImg, -width / 2, -height, width, height);
    }

    game.ctx.restore();
}
