import { createApp, createGlowLayer, createVectorLayer, randomBetween, rgbToHex } from './animationHelper.js';

export async function setupIce() {
    const config = {
        showVapor:true,
        vaporIntensity:1,
        showRime:true,
        rimeIntensity:1,
        showGlints:true,
        glintIntensity:0.2,
        // frozen, so only the occasional thaw drop rather than running water
        showMeltwater:true,
        meltwaterIntensity:0.5
    };

    const app = await createApp('fx-ice', 545, 235);
    if (!app) return null;

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

    const glowLayer = createGlowLayer();
    const glow = glowLayer.glow;
    const vector = createVectorLayer();
    app.stage.addChild(vector, glowLayer.container);

    const vapor = [];
    const glints = [];
    const meltwater = [];
    let elapsed = 0;

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

    const tick = () => {
        const delta = Math.max(0, Math.min(0.05, app.ticker.deltaMS / 1000));
        elapsed += delta;
        const isEnabled = (key, fallback) => (config[key] ?? fallback) !== false;

        vector.clear();
        glowLayer.beginFrame();

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
            // low per puff: additive blending stacks every overlapping one, so
            // the mist builds from ~30 of these rather than from any single puff
            const alpha = Math.sin(progress * Math.PI) * 0.05 * vaporIntensity;
            glow(puff.x, puff.y, puff.radius + puff.growth * progress, '190,225,245', alpha);
        }
        // ---- rime: frozen crust hazing along the shard band and the column ----
        const rimeIntensity = config.rimeIntensity ?? 1;
        if (isEnabled('showRime', true)) {
            const breathe = 0.7 + 0.3 * Math.sin(elapsed * 0.9);
            // pale haze sitting on the crust, each patch breathing out of step
            for (let i = 0; i < 5; i++) {
                const patchX = anchors.shardBand.xStart + ((anchors.shardBand.xEnd - anchors.shardBand.xStart) * i) / 4;
                const shimmer = 0.65 + 0.35 * Math.sin(elapsed * 1.1 + i * 1.7);
                glow(patchX, anchors.shardBand.yBottom - 6, 40, '175,220,240', 0.07 * shimmer * rimeIntensity);
            }
            glow(anchors.column.x, anchors.ledgeY, 70, '120,200,240', 0.10 * breathe * rimeIntensity);
            // a slow highlight sliding down the column, like light over ice
            const sheenY = ((elapsed * 22) % (anchors.ledgeY + 90)) - 45;
            glow(anchors.column.x, sheenY, 26, '215,245,255', 0.13 * rimeIntensity);
            for (const stream of anchors.streams) {
                glow(stream.x, HEIGHT - 26, 24, '120,200,240', 0.06 * breathe * rimeIntensity);
            }
        }
        // ---- ice crystals catching the light ----
        const glintIntensity = config.glintIntensity ?? 1;
        if (isEnabled('showGlints', true) && Math.random() < 0.5 * glintIntensity) spawnGlint();
        for (let i = glints.length - 1; i >= 0; i--) {
            const glint = glints[i];
            glint.life += delta;
            if (glint.life > glint.maxLife) {
                glints.splice(i, 1);
                continue;
            }
            const progress = glint.life / glint.maxLife;
            const alpha = Math.sin(progress * Math.PI) * 0.75 * glintIntensity;
            glow(glint.x, glint.y, glint.radius * 4, '170,235,255', alpha * 0.35);
            // crossed spokes read as a crystal facet rather than a round dot
            const spoke = glint.radius * 3.4 * (1 - progress * 0.35);
            vector.moveTo(glint.x - spoke, glint.y).lineTo(glint.x + spoke, glint.y)
                .moveTo(glint.x, glint.y - spoke).lineTo(glint.x, glint.y + spoke)
                .stroke({ width:1, color:rgbToHex('235,252,255'), alpha:alpha * 0.8 });
            vector.circle(glint.x, glint.y, glint.radius * 0.7 * (1 - progress * 0.4))
                .fill({ color:rgbToHex('240,253,255'), alpha });
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
            vector.ellipse(drop.x, drop.y, drop.radius * 0.5, drop.radius * 1.7)
                .fill({ color:rgbToHex('190,238,255'), alpha:0.5 * fade * meltwaterIntensity });
            glow(drop.x, drop.y, drop.radius * 4, '120,205,255', 0.12 * fade * meltwaterIntensity);
        }

        glowLayer.endFrame();
    };

    app.ticker.add(tick);

    return () => {
        app.ticker.remove(tick);
        app.destroy(false, { children:true, texture:true });
    };
}
