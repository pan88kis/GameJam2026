export class Bobbing {
    static getBreathing(frames, freqX, ampX, freqY, ampY) {
        return {
            x: freqX ? Math.sin(frames * freqX) * ampX : 0,
            y: freqY ? Math.cos(frames * freqY) * ampY : 0
        };
    }

    static getSway(frames, freq, amp) {
        return Math.sin(frames * freq) * amp;
    }

    static getMouseSway(mouseX, mouseY, canvasWidth, canvasHeight, factor) {
        return {
            x: (mouseX - canvasWidth / 2) * factor,
            y: (mouseY - canvasHeight / 2) * factor
        };
    }

    static getScale(frames, baseScale, freq, amp) {
        return baseScale * (1 + Math.sin(frames * freq) * amp);
    }
}
