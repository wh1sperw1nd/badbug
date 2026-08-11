const randomBetween = (min, max) => min + Math.random() * (max - min);

const createGlowPainter = ctx => (x, y, radius, color, alpha) => {
    if (alpha <= 0.002 || radius <= 0) return;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(${color},${alpha})`);
    gradient.addColorStop(0.45, `rgba(${color},${alpha * 0.35})`);
    gradient.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
};

function startSceneAnimations() {
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

    const canvas = document.getElementById('fx');
    if (!canvas) return () => {};
    const ctx = canvas.getContext('2d');
    const WIDTH = 1449;
    const HEIGHT = 1237;
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
    const drawGlow = createGlowPainter(ctx);
    const flames = [];
    const embers = [];
    const smoke = [];
    const drops = [];
    const ripples = [];
    let elapsed = 0;
    let frameId = 0;
    let lastFrameTime = performance.now();
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
    const tick = now => {
        // Clamped at both ends: rAF hands back the frame's start time, which
        // can predate the performance.now() captured on the way in, and a
        // negative delta runs particle life backwards into negative radii.
        const delta = Math.max(0, Math.min(0.05, (now - lastFrameTime) / 1000));
        lastFrameTime = now;
        elapsed += delta;
        const isEnabled = (key, fallback) => (config[key] ?? fallback) !== false;
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.globalCompositeOperation = 'lighter';
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
            drawGlow(particle.x, particle.y, particle.radius + particle.growth * progress, particle.tint, alpha);
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
            drawGlow(particle.x, particle.y, radius, color, alpha);
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
            drawGlow(particle.x, particle.y, particle.radius * 3.5, '255,170,60', (1 - progress) * 0.55 * flicker * fireIntensity);
        }
        // fire base bloom
        if (isEnabled('showFire', true)) {
            const baseFlicker = 0.75 + 0.25 * Math.sin(elapsed * 7.3) + 0.12 * Math.sin(elapsed * 17.1);
            drawGlow(anchors.nozzle.x - 70, anchors.nozzle.y - 8, 110, '255,110,25', 0.15 * baseFlicker * fireIntensity);
            drawGlow(anchors.nozzle.x - 14, anchors.nozzle.y, 34, '255,215,130', 0.30 * baseFlicker * fireIntensity);
        }
        // ---- glowing hardware ----
        const glowIntensity = config.glowIntensity ?? 1;
        if (isEnabled('showGlow', true)) {
            // top-left vent: molten core breathing, with heat flicker
            const ventFlicker = 0.6 + 0.4 * Math.sin(elapsed * 1.7) + 0.14 * Math.sin(elapsed * 11.3) + 0.08 * Math.sin(elapsed * 23.7);
            drawGlow(anchors.gear.x, anchors.gear.y, anchors.gear.radius * 1.35, '255,105,25', 0.22 * ventFlicker * glowIntensity);
            drawGlow(anchors.gear.x, anchors.gear.y, anchors.gear.radius * 0.62, '255,180,90', 0.26 * ventFlicker * glowIntensity);
            drawGlow(anchors.gear.x, anchors.gear.y, anchors.gear.radius * 0.28, '255,235,190', 0.24 * ventFlicker * glowIntensity);
            for (let i = 0; i < 2; i++) {
                const progress = ((elapsed * 0.42) + i / 2) % 1;
                ctx.strokeStyle = `rgba(255,140,50,${(1 - progress) * 0.22 * glowIntensity})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(anchors.gear.x, anchors.gear.y, anchors.gear.radius * (0.4 + progress * 0.6), 0, Math.PI * 2);
                ctx.stroke();
            }
            // speaker cone: red pulse driving concentric waves
            // only the left arc glows, matching the painted red crescent
            const speakerPulse = 0.99 + 0.45 * Math.sin(elapsed * 2.4 + 1.2);
            const arcRotation = ((config.redArcRotation ?? 0) * Math.PI) / 5;
            const arcStart = Math.PI * 0.5 + arcRotation;
            const arcEnd = Math.PI * 1.74 + arcRotation;
            // soft bloom hugging the painted crescent
            for (let i = 0; i < 3; i++) {
                ctx.strokeStyle = `rgba(235,25,30,${(0.16 - i * 0.04) * speakerPulse * glowIntensity})`;
                ctx.lineWidth = 10 + i * 12;
                ctx.beginPath();
                ctx.arc(anchors.speaker.x, anchors.speaker.y, anchors.speaker.radius * 0.86, arcStart, arcEnd);
                ctx.stroke();
            }
            ctx.strokeStyle = `rgba(255,80,70,${0.26 * speakerPulse * glowIntensity})`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(anchors.speaker.x, anchors.speaker.y, anchors.speaker.radius * 0.86, arcStart, arcEnd);
            ctx.stroke();
            for (let i = 0; i < 2; i++) {
                const progress = ((elapsed * 0.55) + i / 2) % 1;
                ctx.strokeStyle = `rgba(255,60,55,${(1 - progress) * 0.28 * glowIntensity})`;
                ctx.lineWidth = 3 - progress * 1.6;
                ctx.beginPath();
                ctx.arc(anchors.speaker.x, anchors.speaker.y, anchors.speaker.radius * (0.86 + progress * 0.45), arcStart, arcEnd);
                ctx.stroke();
            }
            const upperLampPulse = 0.65 + 0.35 * Math.sin(elapsed * 2.6);
            drawGlow(anchors.greenLampUpper.x, anchors.greenLampUpper.y, anchors.greenLampUpper.radius * 3.2, '120,235,60', 0.20 * upperLampPulse * glowIntensity);
            drawGlow(anchors.greenLampUpper.x, anchors.greenLampUpper.y, anchors.greenLampUpper.radius * 1.1, '200,255,150', 0.22 * upperLampPulse * glowIntensity);
            const lowerLampPulse = 0.6 + 0.4 * Math.sin(elapsed * 2.6 + 2.1);
            drawGlow(anchors.greenLampLower.x, anchors.greenLampLower.y, anchors.greenLampLower.radius * 3.6, '120,235,60', 0.20 * lowerLampPulse * glowIntensity);
            drawGlow(anchors.greenLampLower.x, anchors.greenLampLower.y, anchors.greenLampLower.radius * 1.2, '200,255,150', 0.22 * lowerLampPulse * glowIntensity);
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
            drawGlow(emblem.x, emblem.y, emblem.radius * 4.2, '120,235,60', 0.17 * pulse * radiationIntensity);
            drawGlow(emblem.x, emblem.y, emblem.radius * 1.8, '170,245,80', 0.20 * pulse * radiationIntensity);
            drawGlow(emblem.x, emblem.y, emblem.radius * 0.8, '225,255,170', 0.24 * pulse * radiationIntensity);
            for (let i = 0; i < 2; i++) {
                const progress = ((elapsed * 0.34) + i / 2) % 1;
                ctx.strokeStyle = `rgba(140,240,70,${(1 - progress) * 0.20 * radiationIntensity})`;
                ctx.lineWidth = 2 - progress * 1.2;
                ctx.beginPath();
                ctx.arc(emblem.x, emblem.y, emblem.radius * (0.9 + progress * 2.4), 0, Math.PI * 2);
                ctx.stroke();
            }
        }
        // ---- water sphere ----
        const waterIntensity = config.waterIntensity ?? 1;
        if (isEnabled('showWater', true)) {
            const sphere = anchors.sphere;
            ctx.save();
            ctx.beginPath();
            ctx.arc(sphere.x, sphere.y, sphere.radius, 0, Math.PI * 2);
            ctx.clip();
            for (let i = 0; i < 5; i++) {
                const waveY = sphere.y + 12 + i * 11 + Math.sin(elapsed * 1.4 + i) * 3;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(150,245,255,${(0.16 - i * 0.022) * waterIntensity})`;
                ctx.lineWidth = 2.2 - i * 0.25;
                for (let x = -sphere.radius; x <= sphere.radius; x += 6) {
                    const pointY = waveY + Math.sin(x * 0.06 + elapsed * 2.2 + i * 1.7) * (3 + i) + Math.sin(x * 0.13 - elapsed * 1.3) * 2;
                    x === -sphere.radius ? ctx.moveTo(sphere.x + x, pointY) : ctx.lineTo(sphere.x + x, pointY);
                }
                ctx.stroke();
            }
            drawGlow(sphere.x + Math.sin(elapsed * 0.8) * 14, sphere.y - 18 + Math.cos(elapsed * 1.1) * 6, 46, '160,250,255', 0.14 * waterIntensity);
            ctx.restore();
            drawGlow(sphere.x, sphere.y, sphere.radius * 2.0, '60,200,235', (0.10 + 0.03 * Math.sin(elapsed * 1.6)) * waterIntensity);
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
                ctx.fillStyle = `rgba(120,215,255,${(0.5 - progress * 0.25) * waterIntensity})`;
                ctx.beginPath();
                ctx.ellipse(drop.x, drop.y, drop.radius * 0.55, drop.radius * 1.9, 0, 0, Math.PI * 2);
                ctx.fill();
                drawGlow(drop.x, drop.y, drop.radius * 4, '90,190,255', 0.10 * waterIntensity);
            }
            for (let i = ripples.length - 1; i >= 0; i--) {
                const ripple = ripples[i];
                ripple.life += delta;
                if (ripple.life > 1.1) {
                    ripples.splice(i, 1);
                    continue;
                }
                const progress = ripple.life / 1.1;
                ctx.strokeStyle = `rgba(120,215,255,${(1 - progress) * 0.22 * waterIntensity})`;
                ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.ellipse(ripple.x, ripple.y, 6 + progress * 34, (6 + progress * 34) * 0.22, 0, 0, Math.PI * 2);
                ctx.stroke();
            }
            drawGlow(anchors.drip.x, anchors.dripEnd, 40, '70,170,235', (0.10 + 0.03 * Math.sin(elapsed * 3)) * waterIntensity);
        }
        frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
        cancelAnimationFrame(frameId);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    };
}

function startIceAnimations() {
    const config = {
        showVapor:true,
        vaporIntensity:1,
        showRime:true,
        rimeIntensity:1,
        showGlints:true,
        glintIntensity:1,
        showMeltwater:true,
        meltwaterIntensity:0.5
    };

    const canvas = document.getElementById('fx-ice');
    if (!canvas) return () => {};
    const ctx = canvas.getContext('2d');
    const WIDTH = 545;
    const HEIGHT = 235;
    // anchor points in foot_line.png space (545x235)
    const anchors = {
        column:{ x:308, halfWidth:22 },
        ledgeY:140,
        // the crust of ice shards sitting along the top edge of the black bar
        shardBand:{ xStart:220, xEnd:407, yTop:128, yBottom:158 },
        barTop:154,
        // the two painted meltwater streams that run to the bottom edge
        streams:[{ x:290, halfWidth:4 }, { x:315, halfWidth:2 }]
    };
    const drawGlow = createGlowPainter(ctx);
    const vapor = [];
    const glints = [];
    const meltwater = [];
    let elapsed = 0;
    let frameId = 0;
    let lastFrameTime = performance.now();

    // Cold vapour, so it behaves opposite to the scene's smoke: it rolls off
    // the ice and sinks, creeping outward along the bar instead of rising.
    const spawnVapor = () => {
        const offCrust = Math.random() < 0.6;
        const originX = offCrust
            ? randomBetween(anchors.shardBand.xStart, anchors.shardBand.xEnd)
            : anchors.column.x + randomBetween(-anchors.column.halfWidth, anchors.column.halfWidth);
        vapor.push({
            x:originX,
            y:offCrust
                ? randomBetween(anchors.shardBand.yTop, anchors.shardBand.yBottom)
                : randomBetween(24, anchors.ledgeY),
            // drifts away from the column, so the mist spreads rather than piling up
            vx:Math.sign(originX - anchors.column.x || 1) * randomBetween(0.08, 0.4),
            vy:randomBetween(0.04, 0.26),
            radius:randomBetween(8, 18),
            growth:randomBetween(18, 36),
            life:0,
            maxLife:randomBetween(2.6, 5.0),
            phase:randomBetween(0, 6.28),
            swayRate:randomBetween(0.25, 0.7)
        });
    };

    const spawnGlint = () => {
        const onShards = Math.random() < 0.65;
        glints.push({
            x:onShards
                ? randomBetween(anchors.shardBand.xStart, anchors.shardBand.xEnd)
                : anchors.column.x + randomBetween(-anchors.column.halfWidth, anchors.column.halfWidth),
            y:onShards
                ? randomBetween(anchors.shardBand.yTop, anchors.shardBand.yBottom)
                : randomBetween(6, anchors.ledgeY),
            radius:randomBetween(1.1, 2.6),
            life:0,
            maxLife:randomBetween(0.45, 1.15)
        });
    };

    const spawnMeltwater = () => {
        const downStream = Math.random() < 0.7;
        const stream = anchors.streams[(Math.random() * anchors.streams.length) | 0];
        meltwater.push({
            x:downStream
                ? stream.x + randomBetween(-stream.halfWidth, stream.halfWidth)
                : randomBetween(anchors.shardBand.xStart, anchors.shardBand.xEnd),
            y:downStream ? anchors.barTop : anchors.shardBand.yBottom,
            velocity:randomBetween(0.4, 0.9),
            radius:randomBetween(1.2, 2.4)
        });
    };

    const tick = now => {
        const delta = Math.max(0, Math.min(0.05, (now - lastFrameTime) / 1000));
        lastFrameTime = now;
        elapsed += delta;
        const isEnabled = (key, fallback) => (config[key] ?? fallback) !== false;
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.globalCompositeOperation = 'lighter';
        // ---- cold vapour rolling off the ice ----
        const vaporIntensity = config.vaporIntensity ?? 1;
        if (isEnabled('showVapor', true) && Math.random() < 0.28 * vaporIntensity) spawnVapor();
        for (let i = vapor.length - 1; i >= 0; i--) {
            const puff = vapor[i];
            puff.life += delta;
            if (puff.life > puff.maxLife) {
                vapor.splice(i, 1);
                continue;
            }
            const progress = puff.life / puff.maxLife;
            puff.x += (puff.vx + Math.sin(elapsed * puff.swayRate + puff.phase) * 0.22) * delta * 60;
            // sinks a little faster as it spreads and cools
            puff.y += puff.vy * delta * 60 * (1 + progress * 0.6);
            // low per puff: 'lighter' stacks every overlapping one, so the
            // mist builds from ~30 of these rather than from any single puff
            const alpha = Math.sin(progress * Math.PI) * 0.05 * vaporIntensity;
            drawGlow(puff.x, puff.y, puff.radius + puff.growth * progress, '190,225,245', alpha);
        }
        // ---- rime: frozen crust hazing along the shard band and the column ----
        const rimeIntensity = config.rimeIntensity ?? 1;
        if (isEnabled('showRime', true)) {
            const breathe = 0.7 + 0.3 * Math.sin(elapsed * 0.9);
            // pale haze sitting on the crust, each patch breathing out of step
            for (let i = 0; i < 5; i++) {
                const patchX = anchors.shardBand.xStart + ((anchors.shardBand.xEnd - anchors.shardBand.xStart) * i) / 4;
                const shimmer = 0.65 + 0.35 * Math.sin(elapsed * 1.1 + i * 1.7);
                drawGlow(patchX, anchors.shardBand.yBottom - 6, 40, '175,220,240', 0.07 * shimmer * rimeIntensity);
            }
            drawGlow(anchors.column.x, anchors.ledgeY, 70, '120,200,240', 0.10 * breathe * rimeIntensity);
            // a slow highlight sliding down the column, like light over ice
            const sheenY = ((elapsed * 22) % (anchors.ledgeY + 90)) - 45;
            drawGlow(anchors.column.x, sheenY, 26, '215,245,255', 0.13 * rimeIntensity);
            for (const stream of anchors.streams) {
                drawGlow(stream.x, HEIGHT - 26, 24, '120,200,240', 0.06 * breathe * rimeIntensity);
            }
        }
        // ---- ice crystals catching the light ----
        const glintIntensity = config.glintIntensity ?? 1;
        if (isEnabled('showGlints', true) && Math.random() < 0.5 * glintIntensity) spawnGlint();
        ctx.lineWidth = 1;
        for (let i = glints.length - 1; i >= 0; i--) {
            const glint = glints[i];
            glint.life += delta;
            if (glint.life > glint.maxLife) {
                glints.splice(i, 1);
                continue;
            }
            const progress = glint.life / glint.maxLife;
            const alpha = Math.sin(progress * Math.PI) * 0.75 * glintIntensity;
            drawGlow(glint.x, glint.y, glint.radius * 4, '170,235,255', alpha * 0.35);
            // crossed spokes read as a crystal facet rather than a round dot
            const spoke = glint.radius * 3.4 * (1 - progress * 0.35);
            ctx.strokeStyle = `rgba(235,252,255,${alpha * 0.8})`;
            ctx.beginPath();
            ctx.moveTo(glint.x - spoke, glint.y);
            ctx.lineTo(glint.x + spoke, glint.y);
            ctx.moveTo(glint.x, glint.y - spoke);
            ctx.lineTo(glint.x, glint.y + spoke);
            ctx.stroke();
            ctx.fillStyle = `rgba(240,253,255,${alpha})`;
            ctx.beginPath();
            ctx.arc(glint.x, glint.y, glint.radius * 0.7 * (1 - progress * 0.4), 0, Math.PI * 2);
            ctx.fill();
        }
        // ---- the odd thaw drop working its way down ----
        const meltwaterIntensity = config.meltwaterIntensity ?? 1;
        if (isEnabled('showMeltwater', true) && Math.random() < 0.22 * meltwaterIntensity) spawnMeltwater();
        for (let i = meltwater.length - 1; i >= 0; i--) {
            const drop = meltwater[i];
            drop.y += drop.velocity * delta * 60;
            drop.velocity += 5 * delta;
            if (drop.y > HEIGHT) {
                meltwater.splice(i, 1);
                continue;
            }
            // fade out before the bottom edge so drops don't get guillotined
            const fade = drop.y > HEIGHT - 30 ? (HEIGHT - drop.y) / 30 : 1;
            ctx.fillStyle = `rgba(190,238,255,${0.5 * fade * meltwaterIntensity})`;
            ctx.beginPath();
            ctx.ellipse(drop.x, drop.y, drop.radius * 0.5, drop.radius * 1.7, 0, 0, Math.PI * 2);
            ctx.fill();
            drawGlow(drop.x, drop.y, drop.radius * 4, '120,205,255', 0.12 * fade * meltwaterIntensity);
        }
        frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
        cancelAnimationFrame(frameId);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    };
}

export function startAnimations() {
    const stops = [startSceneAnimations(), startIceAnimations()];

    return () => stops.forEach(stop => stop());
}
