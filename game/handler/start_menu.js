import { CONFIG } from '../config.js';
import { loadImage, onAllLoaded } from '../utils/imageLoader.js';
import { drawOutlinedText } from '../utils/textRenderer.js';
import { drawHoverButton, isInsideBounds } from '../utils/buttonRenderer.js';

export class StartMenu {
    constructor(game) {
        this.game = game;

        this.backgroundImg = loadImage(CONFIG.assets.env.background);
        this.grassImg = loadImage(CONFIG.assets.env.grass);
        this.startButtonImg = loadImage(CONFIG.assets.ui.startButton);
        this.crosshairImg = loadImage(CONFIG.assets.ui.crosshair);
        this.logoImg = loadImage(CONFIG.assets.ui.logo);
        this.sunImg = loadImage(CONFIG.assets.env.sun);
        this.soundOnImg = loadImage(CONFIG.assets.ui.soundOn);
        this.soundOffImg = loadImage(CONFIG.assets.ui.soundOff);

        this.buttonBounds = {
            x: (game.canvas.width - CONFIG.button.width) / 2,
            y: game.canvas.height * 0.7,
            width: CONFIG.button.width,
            height: CONFIG.button.height,
        };

        this.soundButtonBounds = {
            x: game.canvas.width - CONFIG.soundButton.width - CONFIG.soundButton.paddingRight,
            y: game.canvas.height - CONFIG.soundButton.height - CONFIG.soundButton.paddingBottom,
            width: CONFIG.soundButton.width,
            height: CONFIG.soundButton.height,
        };

        this.bgMusic = new Audio(CONFIG.assets.music.menu);
        this.bgMusic.loop = true;
        this.bgMusic.volume = 1;
        this.isMuted = true;
        this.bgMusic.muted = this.isMuted;

        const startMusic = () => {
            if (!this.game.isGameRunning) {
                this.bgMusic.play().catch(e => console.warn("Audio play failed:", e));
            }
            window.removeEventListener('click', startMusic);
            window.removeEventListener('keydown', startMusic);
        };

        this.bgMusic.play().catch(() => {
            window.addEventListener('click', startMusic);
            window.addEventListener('keydown', startMusic);
        });

        this.isLoaded = false;
        onAllLoaded(
            [this.backgroundImg, this.grassImg, this.sunImg, this.startButtonImg, this.crosshairImg, this.logoImg, this.soundOnImg, this.soundOffImg],
            () => { this.isLoaded = true; }
        );

        this.frames = 0;

        this.handleMouseDown = this.handleMouseDown.bind(this);
        game.canvas.addEventListener('mousedown', this.handleMouseDown);
    }

    draw() {
        if (!this.isLoaded) {
            this.game.ctx.fillStyle = '#87CEEB';
            this.game.ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
            return;
        }

        this.game.ctx.drawImage(this.backgroundImg, 0, 0, this.game.canvas.width, this.game.canvas.height);

        const bobY = Math.sin(this.frames * CONFIG.env.sun.bobFrequency) * CONFIG.env.sun.bobAmplitude;
        this.game.ctx.drawImage(this.sunImg, CONFIG.env.sun.x, CONFIG.env.sun.y + bobY);

        const grassHeight = CONFIG.env.grassHeight;
        this.game.ctx.drawImage(this.grassImg, 0, this.game.canvas.height - grassHeight, this.game.canvas.width, grassHeight);

        this.game.cloudManager.update();

        if (this.logoImg.complete) {
            const logoWidth = CONFIG.logo.width;
            const logoHeight = (this.logoImg.height / this.logoImg.width) * logoWidth;
            const logoX = (this.game.canvas.width - logoWidth) / 2 + CONFIG.logo.xOffset;
            const logoBaseY = (this.game.canvas.height - logoHeight) / 2 + CONFIG.logo.yOffset;
            const logoBobY = logoBaseY + Math.sin(this.frames * CONFIG.logo.bobFrequency) * CONFIG.logo.bobAmplitude;
            this.game.ctx.drawImage(this.logoImg, logoX, logoBobY, logoWidth, logoHeight);
        }

        drawHoverButton(
            this.game.ctx, this.startButtonImg, this.buttonBounds,
            this.game.mouseX, this.game.mouseY, this.frames
        );

        const currentSoundImg = this.isMuted ? this.soundOffImg : this.soundOnImg;
        if (currentSoundImg.complete) {
            drawHoverButton(
                this.game.ctx, currentSoundImg, this.soundButtonBounds,
                this.game.mouseX, this.game.mouseY, this.frames
            );
        }

        drawOutlinedText(
            this.game.ctx,
            `BEST:${this.game.highScore}`,
            this.game.canvas.width - CONFIG.highScore.paddingRight,
            CONFIG.highScore.paddingTop,
            { align: 'right', font: `${CONFIG.ui.fontSize}px ${CONFIG.ui.fontFamily}` }
        );

        if (this.crosshairImg.complete) {
            const width = this.crosshairImg.width * CONFIG.ui.crosshairScale;
            const height = this.crosshairImg.height * CONFIG.ui.crosshairScale;
            this.game.ctx.drawImage(this.crosshairImg, this.game.mouseX - width / 2, this.game.mouseY - height / 2, width, height);
        }

        this.frames++;
    }

    handleMouseDown(event) {
        if (event.button !== 0) return;
        if (this.game.isGameRunning) return;

        if (isInsideBounds(this.game.mouseX, this.game.mouseY, this.soundButtonBounds)) {
            event.stopImmediatePropagation();
            this.isMuted = !this.isMuted;
            this.bgMusic.muted = this.isMuted;
            return;
        }

        if (isInsideBounds(this.game.mouseX, this.game.mouseY, this.buttonBounds)) {
            event.stopImmediatePropagation();
            this.game.canvas.removeEventListener('mousedown', this.handleMouseDown);
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
            this.game.startActualGame();
        }
    }
}
