export const CONFIG = {

    gameplay: {
        timerDuration: 20,
        startFadeDuration: 60,
        startWaitDuration: 120,
        targetFps: 60,
    },

    death: {
        fallSpeed: 1.2,
        freezeFrames: 15,
        blinkInterval: 12,
        blinkThreshold: 10,
    },

    bug: {
        size: 20,
        minSpawnRate: 30,
        maxSpawnRate: 120,
        spawnRateScoreMultiplier: 2,
        minLaunchSpeed: 2,
        launchSpeedRange: 1.5,
        horizontalSpeedRange: 1.5,
        gravity: 0.05,
        spawnYOffset: 2,
        edgePadding: 4,
        hitboxPadding: 8,
    },

    butterfly: {
        size: 20,
        minSpawnDelay: 600,
        maxSpawnDelay: 1200,
        amplitudeX: 15,
        amplitudeY: 10,
        frequency: 0.015,
        driftSpeed: 0.5,
        animationSpeed: 10,
        scoreValue: 5,
    },

    cloud: {
        maxCount: 4,
        initialMinCount: 2,
        initialMaxCount: 4,
        minSpawnDelay: 60,
        spawnDelayRange: 60,
        offscreenSpawnMargin: 100,
        offscreenRemoveMargin: 200,
        minDepth: 0.5,
        depthRange: 0.5,
        minSpeed: 0.1,
        speedRange: 0.2,
        minScale: 0.4,
        scaleRange: 0.4,
        swayFrequency: 0.02,
        swayAmplitude: 3,
        scaleFrequency: 0.05,
        scaleAmplitude: 0.1,
        maxYFraction: 1 / 3,
    },

    env: {
        grassHeight: 30,
        sun: {
            x: 15,
            y: 15,
            bobFrequency: 0.06,
            bobAmplitude: 1,
        },
    },

    gun: {
        defaultScale: 0.8,
        scaleFrequency: 0.04,
        scaleAmplitude: 0.05,
        mouseSwayFactor: 0.05,
        breathingFreqX: 0.05,
        breathingAmpX: 1,
        breathingFreqY: 0.025,
        breathingAmpY: 1,
        muzzleScale: 0.5,
        muzzleFrameCount: 6,
        fallbackFlashY: -15,
        flashFrames: 20,
    },

    ui: {
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 7,
        crosshairScale: 1,
        scoreX: 4,
        scoreY: 10,
        timerPadding: 4,
        timerY: 10,
        outlineOffsets: [
            { x: -1, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: -1 },
            { x: 0, y: 1 },
        ],
    },

    button: {
        width: 80,
        height: 25,
        bobFrequency: 0.05,
        bobAmplitude: 1,
        hoverOffset: 2,
        hoverFilter: 'brightness(80%)',
    },

    soundButton: {
        width: 36,
        height: 36,
        paddingBottom: -10,
        paddingRight: -10,
    },

    gameOver: {
        fadeDuration: 60,
        waitDuration: 60,
        menuButtonYOffset: 25,
        scoreLeftX: 0.3,
        scoreRightX: 0.7,
        trophyTiers: [
            { threshold: 100, key: 'bronze' },
            { threshold: 130, key: 'silver' },
            { threshold: 160, key: 'gold' },
        ],
        scoreY: 75,
        scoreLabelOffsetY: -15,
        trophyY: 5,
        trophySpacing: 10,
    },

    highScore: {
        paddingRight: 4,
        paddingTop: 12,
    },

    logo: {
        width: 100,
        xOffset: -5,
        yOffset: -5,
        bobFrequency: 0.05,
        bobAmplitude: 1,
    },

    assets: {
        bugs: [
            'game/graphics/bugs/302.png',
            'game/graphics/bugs/404.png',
            'game/graphics/bugs/500.png',
            'game/graphics/bugs/gelb.png',
        ],
        clouds: [
            'game/graphics/clouds/1.png',
        ],
        gun: {
            idle: 'game/graphics/gun/a.png',
            firing: 'game/graphics/gun/b.png',
            muzzlePrefix: 'game/graphics/gun/muzzle_',
        },
        env: {
            background: 'game/graphics/env/background.png',
            grass: 'game/graphics/env/grass.png',
            sun: 'game/graphics/env/sun.png',
        },
        ui: {
            crosshair: 'game/graphics/ui/crosshair.png',
            startButton: 'game/graphics/ui/start.png',
            menuButton: 'game/graphics/ui/menu.png',
            logo: 'game/graphics/ui/logo.png',
            soundOn: 'game/graphics/sound/sound.png',
            soundOff: 'game/graphics/sound/muted.png',
        },
        butterfly: [
            'game/graphics/butterfly/Gold Butterfly.png',
            'game/graphics/butterfly/unfolded Gold Butterfly.png',
        ],
        trophy: {
            bronze: 'game/graphics/trophy/bronze.png',
            silver: 'game/graphics/trophy/silver.png',
            gold: 'game/graphics/trophy/gold.png',
            outline: 'game/graphics/trophy/outline.png',
        },
        music: {
            menu: 'game/audio/music/menu.mp3',
            gameplay: 'game/audio/music/gameplay.mp3',
        },
        sfx: {
            gun: [
                'game/audio/sfx/gun/a.wav',
                'game/audio/sfx/gun/b.wav',
                'game/audio/sfx/gun/c.wav',
                'game/audio/sfx/gun/d.wav',
            ],
        },
    },
};

