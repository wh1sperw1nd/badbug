import { createController } from './animationHelper.js';
import { setupScene } from './scene.js';
import { setupIce } from './ice.js';

export function startAnimations() {
    const stops = [createController(setupScene), createController(setupIce)];

    return () => stops.forEach(stop => stop());
}
