import { CONFIG } from '../config.js';
import { loadImages } from '../utils/imageLoader.js';
import { isInsideBounds } from '../utils/buttonRenderer.js';
import { shouldHideDuringBlink, isDeathFrozen } from '../utils/deathAnimation.js';

const bugImages = loadImages(CONFIG.assets.bugs);

export class Bug {
    constructor(canvas, grassY) {
        this.size = CONFIG.bug.size;
        this.x = Math.random() * (canvas.width - this.size - CONFIG.bug.hitboxPadding) + CONFIG.bug.edgePadding;
        this.y = grassY + CONFIG.bug.spawnYOffset;

        this.vy = -(Math.random() * CONFIG.bug.launchSpeedRange + CONFIG.bug.minLaunchSpeed);
        this.vx = (Math.random() - 0.5) * CONFIG.bug.horizontalSpeedRange;

        this.gravity = CONFIG.bug.gravity;
        this.isDead = false;
        this.deathTimer = 0;

        this.img = bugImages[Math.floor(Math.random() * bugImages.length)];
    }

    update() {
        if (this.isDead) {
            this.deathTimer++;
            if (isDeathFrozen(this.deathTimer)) return;
        }

        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx) {
        if (!this.img.complete) return;
        if (this.isDead && shouldHideDuringBlink(this.deathTimer)) return;

        ctx.save();
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        if (this.isDead) ctx.scale(1, -1);
        ctx.drawImage(this.img, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }

    kill() {
        this.isDead = true;
        this.deathTimer = 0;
        this.vy = CONFIG.death.fallSpeed;
        this.vx = 0;
        this.gravity = 0;
    }
}

export class BugManager {
    constructor(game) {
        this.game = game;
        this.bugs = [];
    }

    spawn() {
        const spawnRate = Math.max(
            CONFIG.bug.minSpawnRate,
            CONFIG.bug.maxSpawnRate - this.game.score * CONFIG.bug.spawnRateScoreMultiplier
        );
        if (this.game.frames % spawnRate === 0) {
            this.bugs.push(new Bug(this.game.canvas, this.game.envHandler.grassY));
        }
    }

    updateAndDraw() {
        for (let i = this.bugs.length - 1; i >= 0; i--) {
            const bug = this.bugs[i];
            bug.update();
            bug.draw(this.game.ctx);
            if (bug.y > this.game.canvas.height + bug.size) {
                this.bugs.splice(i, 1);
            }
        }
    }

    checkHit(mouseX, mouseY) {
        for (let i = this.bugs.length - 1; i >= 0; i--) {
            const bug = this.bugs[i];
            if (bug.isDead) continue;

            const hitBounds = { x: bug.x, y: bug.y, width: bug.size, height: bug.size };
            if (isInsideBounds(mouseX, mouseY, hitBounds) && mouseY < this.game.envHandler.grassY) {
                bug.kill();
                return true;
            }
        }
        return false;
    }
}
