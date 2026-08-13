import { Container, Graphics, Sprite } from 'pixi.js';
import { createApp, createGlowLayer, createVectorLayer, randomBetween, rgbToHex, GLOW_TEXTURE_RADIUS } from './animationHelper.js';

export async function setupScene() {
    const config = {
        showFire:true,
        fireIntensity:0.5,
        fireSpeed:0.65,
        showWater:true,
        waterIntensity:0.45,
        showGlow:true,
        glowIntensity:1,
        redArcRotation:40,
        showSmoke:true,
        smokeIntensity:1.5,
        showRadiation:true,
        radiationIntensity:1
    };

    const app = await createApp('fx', 1449, 1237);
    if (!app) return null;

    // anchor points in image space (1449x1237)
    const anchors = {
        nozzle:{ x:352, y:268 },
        gear:{ x:150, y:81, radius:30 },
        speaker:{ x:470, y:335, radius:60 },
        sphere:{ x:692, y:248, radius:72 },
        orbVent:{ x:686, y:128 },
        drip:{ x:688, y:322 },
        dripEnd:470,
        greenLampUpper:{ x:1186, y:381, radius:28 },
        greenLampLower:{ x:1192, y:1048, radius:15 },
        radiationEmblem:{ x:976, y:980, radius:15 }
    };

    const glowLayer = createGlowLayer();
    const glow = glowLayer.glow;
    const vector = createVectorLayer();
    app.stage.addChild(vector, glowLayer.container);

    // The water sphere's wave lines and highlight are the only draws that
    // need real clipping, so they get their own masked sub-container.
    const sphere = anchors.sphere;
    const waterMask = new Graphics().circle(sphere.x, sphere.y, sphere.radius).fill(0xffffff);
    const waterClip = new Container();
    waterClip.mask = waterMask;
    const waterWaves = new Graphics();
    waterWaves.blendMode = 'add';
    const waterHighlight = new Sprite(glowLayer.texture);
    waterHighlight.anchor.set(0.5);
    waterHighlight.blendMode = 'add';
    waterHighlight.visible = false;
    waterClip.addChild(waterWaves, waterHighlight);
    app.stage.addChild(waterMask, waterClip);

    // draws one sine-wave stroke across the sphere's clipped width; pulled
    // out of tick() so the x-sweep doesn't push the block past max-depth
    const strokeWaveLine = (i, waterIntensity, elapsed) => {
        const waveY = sphere.y + 12 + i * 11 + Math.sin(elapsed * 1.4 + i) * 3;
        const pointYAt = x => waveY + Math.sin(x * 0.06 + elapsed * 2.2 + i * 1.7) * (3 + i) + Math.sin(x * 0.13 - elapsed * 1.3) * 2;
        waterWaves.moveTo(sphere.x - sphere.radius, pointYAt(-sphere.radius));
        for (let x = -sphere.radius + 6; x <= sphere.radius; x += 6) waterWaves.lineTo(sphere.x + x, pointYAt(x));
        waterWaves.stroke({ width:2.2 - i * 0.25, color:rgbToHex('150,245,255'), alpha:(0.16 - i * 0.022) * waterIntensity });
    };

    const flames = [];
    const embers = [];
    const smoke = [];
    const drops = [];
    const ripples = [];
    let elapsed = 0;

    // jet fires leftward out of the nozzle, then lifts as it loses speed
    const spawnFlames = count => {
        for (let i = 0; i < count; i++) {
            const spread = randomBetween(-1, 1);
            const speedFactor = config.fireSpeed ?? 1;
            const speed = randomBetween(3.2, 5.4) * speedFactor;
            flames.push({
                x:anchors.nozzle.x + randomBetween(-4, 2),
                y:anchors.nozzle.y + spread * 3,
                vx:-speed,
                vy:(spread * 2 + randomBetween(-0.25, 0.15)) * speedFactor,
                radius:randomBetween(6, 12),
                life:0,
                maxLife:randomBetween(0.5, 1.0) / Math.max(0.35, speedFactor),
                phase:randomBetween(0, 6.28),
                speedFactor
            });
        }
    };
    const spawnEmber = () => embers.push({
        x:anchors.nozzle.x + randomBetween(-6, 0),
        y:anchors.nozzle.y + randomBetween(-4, 4),
        vx:randomBetween(-4.2, -2.2),
        vy:randomBetween(-0.6, 0.4),
        radius:randomBetween(1, 2.2),
        life:0,
        maxLife:randomBetween(1.3, 2.6),
        phase:randomBetween(0, 6.28)
    });
    const spawnSmoke = (x, y, tint, scale) => smoke.push({
        x:x + randomBetween(-8, 8),
        y,
        vx:randomBetween(-0.15, 0.35),
        vy:randomBetween(-0.9, -0.45),
        radius:randomBetween(10, 20) * scale,
        growth:randomBetween(14, 26) * scale,
        tint,
        life:0,
        maxLife:randomBetween(2.4, 4.2),
        phase:randomBetween(0, 6.28),
        swayRate:randomBetween(0.4, 1.1)
    });

    const tick = () => {
        // Clamped at both ends: a stalled tab can hand back a huge deltaMS
        // on resume, and there is no reason to ever run particle life backwards.
        const delta = Math.max(0, Math.min(0.05, app.ticker.deltaMS / 1000));
        elapsed += delta;
        const isEnabled = (key, fallback) => (config[key] ?? fallback) !== false;

        vector.clear();
        glowLayer.beginFrame();

        // ---- smoke (drawn first, sits behind flame/glow) ----
        const smokeIntensity = config.smokeIntensity ?? 1;
        if (isEnabled('showSmoke', true)) {
            if (Math.random() < 0.35 * smokeIntensity) spawnSmoke(anchors.nozzle.x - randomBetween(60, 130), anchors.nozzle.y - 30, '190,180,175', 1);
            if (Math.random() < 0.30 * smokeIntensity) spawnSmoke(anchors.greenLampUpper.x + 6, anchors.greenLampUpper.y - 20, '150,200,140', 0.85);
            if (Math.random() < 0.28 * smokeIntensity) spawnSmoke(anchors.orbVent.x + randomBetween(-22, 22), anchors.orbVent.y, '175,205,215', 0.8);
            if (Math.random() < 0.22 * smokeIntensity) spawnSmoke(anchors.greenLampLower.x, anchors.greenLampLower.y - 14, '150,200,140', 0.6);
        }
        for (let i = smoke.length - 1; i >= 0; i--) {
            const particle = smoke[i];
            particle.life += delta;
            if (particle.life > particle.maxLife) {
                smoke.splice(i, 1);
                continue;
            }
            const progress = particle.life / particle.maxLife;
            particle.x += (particle.vx + Math.sin(elapsed * particle.swayRate + particle.phase) * 0.35) * delta * 60;
            particle.y += particle.vy * delta * 60 * (1 - progress * 0.35);
            const alpha = Math.sin(progress * Math.PI) * 0.085 * smokeIntensity;
            glow(particle.x, particle.y, particle.radius + particle.growth * progress, particle.tint, alpha);
        }
        // ---- fire ----
        const fireIntensity = config.fireIntensity ?? 1;
        if (isEnabled('showFire', true)) {
            spawnFlames(Math.random() < 0.4 ? 3 : 4);
            if (Math.random() < 0.5) spawnEmber();
        }
        for (let i = flames.length - 1; i >= 0; i--) {
            const particle = flames[i];
            particle.life += delta;
            if (particle.life > particle.maxLife) {
                flames.splice(i, 1);
                continue;
            }
            const progress = particle.life / particle.maxLife;
            particle.vx *= (1 - 0.7 * delta);
            // jet holds its line
            particle.vy -= (0.35 + progress * 1.1) * delta * (particle.speedFactor || 1);
            particle.x += (particle.vx + Math.sin(elapsed * 5 + particle.phase) * 0.08) * delta * 60;
            particle.y += (particle.vy + Math.sin(elapsed * 3.5 + particle.phase) * 0.1) * delta * 60;
            const radius = (particle.radius + progress * 9) * (1 - progress * 0.3);
            const alpha = (1 - progress) * (1 - progress) * 0.5 * fireIntensity;
            const color = progress < 0.28 ? '255,242,190' : progress < 0.6 ? '255,150,40' : '205,50,10';
            glow(particle.x, particle.y, radius, color, alpha);
        }
        for (let i = embers.length - 1; i >= 0; i--) {
            const particle = embers[i];
            particle.life += delta;
            if (particle.life > particle.maxLife) {
                embers.splice(i, 1);
                continue;
            }
            const progress = particle.life / particle.maxLife;
            particle.vx *= (1 - 1.8 * delta);
            particle.vy -= 1.4 * delta;
            particle.x += (particle.vx + Math.sin(elapsed * 2 + particle.phase) * 0.6) * delta * 60;
            particle.y += particle.vy * delta * 60;
            const flicker = 0.55 + 0.45 * Math.sin(elapsed * 14 + particle.phase);
            glow(particle.x, particle.y, particle.radius * 3.5, '255,170,60', (1 - progress) * 0.55 * flicker * fireIntensity);
        }
        // fire base bloom
        if (isEnabled('showFire', true)) {
            const baseFlicker = 0.75 + 0.25 * Math.sin(elapsed * 7.3) + 0.12 * Math.sin(elapsed * 17.1);
            glow(anchors.nozzle.x - 70, anchors.nozzle.y - 8, 110, '255,110,25', 0.15 * baseFlicker * fireIntensity);
            glow(anchors.nozzle.x - 14, anchors.nozzle.y, 34, '255,215,130', 0.30 * baseFlicker * fireIntensity);
        }
        // ---- glowing hardware ----
        const glowIntensity = config.glowIntensity ?? 1;
        if (isEnabled('showGlow', true)) {
            // top-left vent: molten core breathing, with heat flicker
            const ventFlicker = 0.6 + 0.4 * Math.sin(elapsed * 1.7) + 0.14 * Math.sin(elapsed * 11.3) + 0.08 * Math.sin(elapsed * 23.7);
            glow(anchors.gear.x, anchors.gear.y, anchors.gear.radius * 1.35, '255,105,25', 0.22 * ventFlicker * glowIntensity);
            glow(anchors.gear.x, anchors.gear.y, anchors.gear.radius * 0.62, '255,180,90', 0.26 * ventFlicker * glowIntensity);
            glow(anchors.gear.x, anchors.gear.y, anchors.gear.radius * 0.28, '255,235,190', 0.24 * ventFlicker * glowIntensity);
            for (let i = 0; i < 2; i++) {
                const progress = ((elapsed * 0.42) + i / 2) % 1;
                vector.circle(anchors.gear.x, anchors.gear.y, anchors.gear.radius * (0.4 + progress * 0.6))
                    .stroke({ width:1.5, color:rgbToHex('255,140,50'), alpha:(1 - progress) * 0.22 * glowIntensity });
            }
            // speaker cone: red pulse driving concentric waves
            // only the left arc glows, matching the painted red crescent
            const speakerPulse = 0.99 + 0.45 * Math.sin(elapsed * 2.4 + 1.2);
            const arcRotation = ((config.redArcRotation ?? 0) * Math.PI) / 5;
            const arcStart = Math.PI * 0.5 + arcRotation;
            const arcEnd = Math.PI * 1.74 + arcRotation;
            // soft bloom hugging the painted crescent
            // arc() is the raw canvas-style primitive: unlike circle()/ellipse(),
            // it continues from wherever the path last left off, so it needs its
            // own beginPath() before each independent arc or it draws a stray
            // connecting line back to whatever shape was drawn before it
            for (let i = 0; i < 3; i++) {
                vector.beginPath().arc(anchors.speaker.x, anchors.speaker.y, anchors.speaker.radius * 0.86, arcStart, arcEnd)
                    .stroke({ width:10 + i * 12, color:rgbToHex('235,25,30'), alpha:(0.16 - i * 0.04) * speakerPulse * glowIntensity });
            }
            vector.beginPath().arc(anchors.speaker.x, anchors.speaker.y, anchors.speaker.radius * 0.86, arcStart, arcEnd)
                .stroke({ width:4, color:rgbToHex('255,80,70'), alpha:0.26 * speakerPulse * glowIntensity });
            for (let i = 0; i < 2; i++) {
                const progress = ((elapsed * 0.55) + i / 2) % 1;
                vector.beginPath().arc(anchors.speaker.x, anchors.speaker.y, anchors.speaker.radius * (0.86 + progress * 0.45), arcStart, arcEnd)
                    .stroke({ width:3 - progress * 1.6, color:rgbToHex('255,60,55'), alpha:(1 - progress) * 0.28 * glowIntensity });
            }
            const upperLampPulse = 0.65 + 0.35 * Math.sin(elapsed * 2.6);
            glow(anchors.greenLampUpper.x, anchors.greenLampUpper.y, anchors.greenLampUpper.radius * 3.2, '120,235,60', 0.20 * upperLampPulse * glowIntensity);
            glow(anchors.greenLampUpper.x, anchors.greenLampUpper.y, anchors.greenLampUpper.radius * 1.1, '200,255,150', 0.22 * upperLampPulse * glowIntensity);
            const lowerLampPulse = 0.6 + 0.4 * Math.sin(elapsed * 2.6 + 2.1);
            glow(anchors.greenLampLower.x, anchors.greenLampLower.y, anchors.greenLampLower.radius * 3.6, '120,235,60', 0.20 * lowerLampPulse * glowIntensity);
            glow(anchors.greenLampLower.x, anchors.greenLampLower.y, anchors.greenLampLower.radius * 1.2, '200,255,150', 0.22 * lowerLampPulse * glowIntensity);
        }
        // ---- radiation trefoil ----
        // slow breathing core, with a sharper spike every few seconds so it
        // reads as a warning lamp rather than another steady green bulb
        const radiationIntensity = config.radiationIntensity ?? 1;
        if (isEnabled('showRadiation', true)) {
            const emblem = anchors.radiationEmblem;
            const breathe = 0.55 + 0.45 * Math.sin(elapsed * 1.9);
            const spike = Math.pow(Math.max(0, Math.sin(elapsed * 0.7 + 1.1)), 12);
            const pulse = breathe + spike * 0.9;
            glow(emblem.x, emblem.y, emblem.radius * 4.2, '120,235,60', 0.17 * pulse * radiationIntensity);
            glow(emblem.x, emblem.y, emblem.radius * 1.8, '170,245,80', 0.20 * pulse * radiationIntensity);
            glow(emblem.x, emblem.y, emblem.radius * 0.8, '225,255,170', 0.24 * pulse * radiationIntensity);
            for (let i = 0; i < 2; i++) {
                const progress = ((elapsed * 0.34) + i / 2) % 1;
                vector.circle(emblem.x, emblem.y, emblem.radius * (0.9 + progress * 2.4))
                    .stroke({ width:2 - progress * 1.2, color:rgbToHex('140,240,70'), alpha:(1 - progress) * 0.20 * radiationIntensity });
            }
        }
        // ---- water sphere ----
        const waterIntensity = config.waterIntensity ?? 1;
        const showWater = isEnabled('showWater', true);
        waterClip.visible = showWater;
        waterHighlight.visible = showWater;
        if (showWater) {
            waterWaves.clear();
            for (let i = 0; i < 5; i++) strokeWaveLine(i, waterIntensity, elapsed);
            waterHighlight.position.set(sphere.x + Math.sin(elapsed * 0.8) * 14, sphere.y - 18 + Math.cos(elapsed * 1.1) * 6);
            waterHighlight.scale.set(46 / GLOW_TEXTURE_RADIUS);
            waterHighlight.tint = rgbToHex('160,250,255');
            waterHighlight.alpha = 0.14 * waterIntensity;

            glow(sphere.x, sphere.y, sphere.radius * 2.0, '60,200,235', (0.10 + 0.03 * Math.sin(elapsed * 1.6)) * waterIntensity);
            // falling stream + droplets
            if (Math.random() < 0.55 * waterIntensity) drops.push({
                x:anchors.drip.x + randomBetween(-3, 3),
                y:anchors.drip.y + 40,
                velocity:randomBetween(2.6, 4.2),
                radius:randomBetween(1.6, 3.2)
            });
            for (let i = drops.length - 1; i >= 0; i--) {
                const drop = drops[i];
                drop.y += drop.velocity * delta * 60;
                drop.velocity += 9 * delta;
                if (drop.y > anchors.dripEnd) {
                    drops.splice(i, 1);
                    ripples.push({ x:drop.x + randomBetween(-8, 8), y:anchors.dripEnd, radius:2, life:0 });
                    continue;
                }
                const progress = (drop.y - anchors.drip.y) / (anchors.dripEnd - anchors.drip.y);
                vector.ellipse(drop.x, drop.y, drop.radius * 0.55, drop.radius * 1.9)
                    .fill({ color:rgbToHex('120,215,255'), alpha:(0.5 - progress * 0.25) * waterIntensity });
                glow(drop.x, drop.y, drop.radius * 4, '90,190,255', 0.10 * waterIntensity);
            }
            for (let i = ripples.length - 1; i >= 0; i--) {
                const ripple = ripples[i];
                ripple.life += delta;
                if (ripple.life > 1.1) {
                    ripples.splice(i, 1);
                    continue;
                }
                const progress = ripple.life / 1.1;
                const rippleRadius = 6 + progress * 34;
                vector.ellipse(ripple.x, ripple.y, rippleRadius, rippleRadius * 0.22)
                    .stroke({ width:1.4, color:rgbToHex('120,215,255'), alpha:(1 - progress) * 0.22 * waterIntensity });
            }
            glow(anchors.drip.x, anchors.dripEnd, 40, '70,170,235', (0.10 + 0.03 * Math.sin(elapsed * 3)) * waterIntensity);
        }

        glowLayer.endFrame();
    };

    app.ticker.add(tick);

    return () => {
        app.ticker.remove(tick);
        app.destroy(false, { children:true, texture:true });
    };
}
