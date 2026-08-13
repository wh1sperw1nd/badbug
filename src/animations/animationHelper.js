import { Application, Container, Graphics, Sprite, Texture } from 'pixi.js';

export const randomBetween = (min, max) => min + Math.random() * (max - min);

export const rgbToHex = rgb => {
    const [r, g, b] = rgb.split(',').map(Number);
    return (r << 16) + (g << 8) + b;
};

export async function createApp(canvasId, width, height) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    const app = new Application();
    await app.init({
        canvas,
        width,
        height,
        backgroundAlpha:0,
        antialias:true,
        resolution:1,
        autoDensity:false
        // preference intentionally left unset: this pixi.js build's WebGPU
        // renderer silently drops Sprite.tint (glow sprites render pure
        // white instead of their tint color), so we let it auto-detect and
        // land on WebGL, where tinting is confirmed correct.
    });
    return app;
}

// A soft radial-gradient sprite standing in for the old canvas
// createRadialGradient blob: tint recolors it, scale sets its radius, and
// alpha reproduces the original's alpha / alpha*0.35 / 0 gradient stops.
const GLOW_TEXTURE_SIZE = 128;
export const GLOW_TEXTURE_RADIUS = GLOW_TEXTURE_SIZE / 2;

function createGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = GLOW_TEXTURE_SIZE;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(
        GLOW_TEXTURE_RADIUS, GLOW_TEXTURE_RADIUS, 0, GLOW_TEXTURE_RADIUS, GLOW_TEXTURE_RADIUS, GLOW_TEXTURE_RADIUS
    );
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.45, 'rgba(255,255,255,0.35)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, GLOW_TEXTURE_SIZE, GLOW_TEXTURE_SIZE);
    return Texture.from(canvas);
}

// Pooled sprite emitter standing in for the old immediate-mode drawGlow():
// beginFrame() resets the cursor, glow() claims the next pooled sprite
// instead of allocating one, and endFrame() hides whatever went unclaimed.
export function createGlowLayer() {
    const texture = createGlowTexture();
    const container = new Container();
    const pool = [];
    let cursor = 0;

    const beginFrame = () => {
        cursor = 0;
    };
    const endFrame = () => {
        for (let i = cursor; i < pool.length; i++) pool[i].visible = false;
    };
    const glow = (x, y, radius, color, alpha) => {
        if (alpha <= 0.002 || radius <= 0) return;
        let sprite = pool[cursor];
        if (!sprite) {
            sprite = new Sprite(texture);
            sprite.anchor.set(0.5);
            sprite.blendMode = 'add';
            pool.push(sprite);
            container.addChild(sprite);
        }
        sprite.visible = true;
        sprite.position.set(x, y);
        sprite.scale.set(radius / GLOW_TEXTURE_RADIUS);
        sprite.tint = rgbToHex(color);
        sprite.alpha = alpha;
        cursor++;
    };

    return { container, texture, glow, beginFrame, endFrame };
}

// One Graphics object rebuilt every tick for the rings, arcs, spokes and
// droplets that need real vector strokes/fills rather than a soft sprite.
export function createVectorLayer() {
    const graphics = new Graphics();
    graphics.blendMode = 'add';
    return graphics;
}

// Bridges startAnimations()'s synchronous stop-function contract (App.vue
// calls it immediately, possibly before the async PIXI init below resolves)
// with the async Application.init() that PIXI v8 requires.
export function createController(setup) {
    let stopped = false;
    let dispose = null;
    setup().then(fn => {
        if (!fn) return;
        if (stopped) fn();
        else dispose = fn;
    }).catch(err => console.error(err));

    return () => {
        stopped = true;
        dispose?.();
        dispose = null;
    };
}
