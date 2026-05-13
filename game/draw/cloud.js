import { CONFIG } from '../config.js';
import { Bobbing } from '../utils/bobbing.js';
import { loadImages } from '../utils/imageLoader.js';

const cloudImages = loadImages(CONFIG.assets.clouds);

export class Cloud {
    constructor(canvas, frames, startX = null) {
        this.canvas = canvas;
        this.img = cloudImages[Math.floor(Math.random() * cloudImages.length)];
        this.y = Math.random() * (canvas.height * CONFIG.cloud.maxYFraction);

        this.depth = Math.random() * CONFIG.cloud.depthRange + CONFIG.cloud.minDepth;
        this.vx = (Math.random() * CONFIG.cloud.speedRange + CONFIG.cloud.minSpeed)
                  * this.depth
                  * (Math.random() < 0.5 ? 1 : -1);

        this.x = startX !== null
            ? startX
            : (this.vx > 0 ? -CONFIG.cloud.offscreenSpawnMargin : canvas.width + CONFIG.cloud.offscreenSpawnMargin);

        this.baseScale = (Math.random() * CONFIG.cloud.scaleRange + CONFIG.cloud.minScale) * this.depth;
        this.spawnFrame = frames;
    }

    update() {
        this.x += this.vx;
    }

    getRenderProps(frames) {
        const age = frames - this.spawnFrame;
        const swayY = Bobbing.getSway(age, CONFIG.cloud.swayFrequency, CONFIG.cloud.swayAmplitude);
        const scale = Bobbing.getScale(age, this.baseScale, CONFIG.cloud.scaleFrequency, CONFIG.cloud.scaleAmplitude);

        const width = this.img.complete ? this.img.width * scale : 0;
        const height = this.img.complete ? this.img.height * scale : 0;

        return {
            x: this.x - width / 2,
            y: this.y + swayY - height / 2,
            width,
            height,
        };
    }

    draw(ctx, frames) {
        if (!this.img.complete) return;
        const props = this.getRenderProps(frames);
        ctx.drawImage(this.img, props.x, props.y, props.width, props.height);
    }

    isOffscreen() {
        const margin = CONFIG.cloud.offscreenRemoveMargin;
        return (this.vx > 0 && this.x > this.canvas.width + margin)
            || (this.vx < 0 && this.x < -margin);
    }

    isPointObscured(px, py, frames) {
        if (!this.img.complete) return false;
        const props = this.getRenderProps(frames);
        return px > props.x && px < props.x + props.width
            && py > props.y && py < props.y + props.height;
    }
}

export class CloudManager {
    constructor(game) {
        this.game = game;
        this.clouds = [];
        this.spawnTimer = 0;

        const initialCount = Math.floor(Math.random() * (CONFIG.cloud.initialMaxCount - CONFIG.cloud.initialMinCount + 1)) + CONFIG.cloud.initialMinCount;
        for (let i = 0; i < initialCount; i++) {
            const randomX = Math.random() * game.canvas.width;
            this.clouds.push(new Cloud(game.canvas, game.frames, randomX));
        }
    }

    spawnCloud() {
        if (this.clouds.length < CONFIG.cloud.maxCount) {
            if (this.spawnTimer <= 0) {
                this.clouds.push(new Cloud(this.game.canvas, this.game.frames));
                this.spawnTimer = Math.floor(Math.random() * CONFIG.cloud.spawnDelayRange) + CONFIG.cloud.minSpawnDelay;
            } else {
                this.spawnTimer--;
            }
        }
    }

    update() {
        this.spawnCloud();
        this.clouds.sort((a, b) => a.depth - b.depth);

        for (let i = this.clouds.length - 1; i >= 0; i--) {
            const cloud = this.clouds[i];
            cloud.update();
            cloud.draw(this.game.ctx, this.game.frames);
            if (cloud.isOffscreen()) {
                this.clouds.splice(i, 1);
            }
        }
    }

    isPointObscured(px, py, frames) {
        return this.clouds.some(cloud => cloud.isPointObscured(px, py, frames));
    }
}
