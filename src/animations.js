export function startAnimations() {
    const CFG = {
        showFire:true,
        fireIntensity:0.5,
        fireSpeed:0.65,
        showWater:true,
        waterIntensity:0.45,
        showGlow:true,
        glowIntensity:1,
        redArcRotation:40,
        showSmoke:true,
        smokeIntensity:1.5
    };

    const cv = document.getElementById('fx');
    if (!cv) return () => {};
    const ctx = cv.getContext('2d');
    const W = 1449;
    const H = 1237;
    // anchor points in image space (1449x1237)
    const A = {
        nozzle:{ x:352, y:268 },
        gear:{ x:150, y:81, r:30 },
        speaker:{ x:470, y:335, r:60 },
        sphere:{ x:692, y:248, r:72 },
        orbVent:{ x:686, y:128 },
        drip:{ x:688, y:322 },
        dripEnd:470,
        greenA:{ x:1186, y:381, r:28 },
        greenB:{ x:1192, y:1048, r:15 }
    };
    const rnd = (a, b) => a + Math.random() * (b - a);
    const fire = [];
    const embers = [];
    const smoke = [];
    const drops = [];
    const ripples = [];
    let t = 0;
    let raf = 0;
    let last = performance.now();
    const glow = (x, y, r, col, a) => {
        if (a <= 0.002) return;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${col},${a})`);
        g.addColorStop(0.45, `rgba(${col},${a * 0.35})`);
        g.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    };
    // jet fires leftward out of the nozzle, then lifts as it loses speed
    const spawnFire = n => {
        for (let i = 0; i < n; i++) {
            const s = rnd(-1, 1);
            const sf = CFG.fireSpeed ?? 1;
            const sp = rnd(3.2, 5.4) * sf;
            fire.push({
                x:A.nozzle.x + rnd(-4, 2),
                y:A.nozzle.y + s * 3,
                vx:-sp,
                vy:(s * 2 + rnd(-0.25, 0.15)) * sf,
                r:rnd(6, 12),
                life:0,
                max:rnd(0.5, 1.0) / Math.max(0.35, sf),
                ph:rnd(0, 6.28),
                sf
            });
        }
    };
    const spawnEmber = () => embers.push({
        x:A.nozzle.x + rnd(-6, 0),
        y:A.nozzle.y + rnd(-4, 4),
        vx:rnd(-4.2, -2.2),
        vy:rnd(-0.6, 0.4),
        r:rnd(1, 2.2),
        life:0,
        max:rnd(1.3, 2.6),
        ph:rnd(0, 6.28)
    });
    const spawnSmoke = (x, y, tint, scale) => smoke.push({
        x:x + rnd(-8, 8),
        y,
        vx:rnd(-0.15, 0.35),
        vy:rnd(-0.9, -0.45),
        r:rnd(10, 20) * scale,
        grow:rnd(14, 26) * scale,
        tint,
        life:0,
        max:rnd(2.4, 4.2),
        ph:rnd(0, 6.28),
        sw:rnd(0.4, 1.1)
    });
    const tick = now => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        t += dt;
        const on = (k, d) => (CFG[k] ?? d) !== false;
        let q = CFG.smokeIntensity ?? 1;
        ctx.clearRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'lighter';
        // ---- smoke (drawn first, sits behind flame/glow) ----
        if (on('showSmoke', true)) {
            if (Math.random() < 0.35 * q) spawnSmoke(A.nozzle.x - rnd(60, 130), A.nozzle.y - 30, '190,180,175', 1);
            if (Math.random() < 0.30 * q) spawnSmoke(A.greenA.x + 6, A.greenA.y - 20, '150,200,140', 0.85);
            if (Math.random() < 0.28 * q) spawnSmoke(A.orbVent.x + rnd(-22, 22), A.orbVent.y, '175,205,215', 0.8);
            if (Math.random() < 0.22 * q) spawnSmoke(A.greenB.x, A.greenB.y - 14, '150,200,140', 0.6);
        }
        for (let i = smoke.length - 1; i >= 0; i--) {
            const p = smoke[i];
            p.life += dt;
            if (p.life > p.max) {
                smoke.splice(i, 1);
                continue;
            }
            const u = p.life / p.max;
            p.x += (p.vx + Math.sin(t * p.sw + p.ph) * 0.35) * dt * 60;
            p.y += p.vy * dt * 60 * (1 - u * 0.35);
            const a = Math.sin(u * Math.PI) * 0.085 * q;
            glow(p.x, p.y, p.r + p.grow * u, p.tint, a);
        }
        // ---- fire ----
        q = CFG.fireIntensity ?? 1;
        if (on('showFire', true)) {
            spawnFire(Math.random() < 0.4 ? 3 : 4);
            if (Math.random() < 0.5) spawnEmber();
        }
        for (let i = fire.length - 1; i >= 0; i--) {
            const p = fire[i];
            p.life += dt;
            if (p.life > p.max) {
                fire.splice(i, 1);
                continue;
            }
            const u = p.life / p.max;
            p.vx *= (1 - 0.7 * dt);
            // jet holds its line
            p.vy -= (0.35 + u * 1.1) * dt * (p.sf || 1);
            p.x += (p.vx + Math.sin(t * 5 + p.ph) * 0.08) * dt * 60;
            p.y += (p.vy + Math.sin(t * 3.5 + p.ph) * 0.1) * dt * 60;
            const r = (p.r + u * 9) * (1 - u * 0.3);
            const a = (1 - u) * (1 - u) * 0.5 * q;
            const col = u < 0.28 ? '255,242,190' : u < 0.6 ? '255,150,40' : '205,50,10';
            glow(p.x, p.y, r, col, a);
        }
        for (let i = embers.length - 1; i >= 0; i--) {
            const p = embers[i];
            p.life += dt;
            if (p.life > p.max) {
                embers.splice(i, 1);
                continue;
            }
            const u = p.life / p.max;
            p.vx *= (1 - 1.8 * dt);
            p.vy -= 1.4 * dt;
            p.x += (p.vx + Math.sin(t * 2 + p.ph) * 0.6) * dt * 60;
            p.y += p.vy * dt * 60;
            const fl = 0.55 + 0.45 * Math.sin(t * 14 + p.ph);
            glow(p.x, p.y, p.r * 3.5, '255,170,60', (1 - u) * 0.55 * fl * q);
        }
        // fire base bloom
        if (on('showFire', true)) {
            const fk = 0.75 + 0.25 * Math.sin(t * 7.3) + 0.12 * Math.sin(t * 17.1);
            glow(A.nozzle.x - 70, A.nozzle.y - 8, 110, '255,110,25', 0.15 * fk * q);
            glow(A.nozzle.x - 14, A.nozzle.y, 34, '255,215,130', 0.30 * fk * q);
        }
        // ---- glowing hardware ----
        q = CFG.glowIntensity ?? 1;
        if (on('showGlow', true)) {
            // top-left vent: molten core breathing, with heat flicker
            const gk = 0.6 + 0.4 * Math.sin(t * 1.7) + 0.14 * Math.sin(t * 11.3) + 0.08 * Math.sin(t * 23.7);
            glow(A.gear.x, A.gear.y, A.gear.r * 1.35, '255,105,25', 0.22 * gk * q);
            glow(A.gear.x, A.gear.y, A.gear.r * 0.62, '255,180,90', 0.26 * gk * q);
            glow(A.gear.x, A.gear.y, A.gear.r * 0.28, '255,235,190', 0.24 * gk * q);
            for (let i = 0; i < 2; i++) {
                const u = ((t * 0.42) + i / 2) % 1;
                ctx.strokeStyle = `rgba(255,140,50,${(1 - u) * 0.22 * q})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(A.gear.x, A.gear.y, A.gear.r * (0.4 + u * 0.6), 0, Math.PI * 2);
                ctx.stroke();
            }
            // speaker cone: red pulse driving concentric waves
            // only the left arc glows, matching the painted red crescent
            const sk = 0.99 + 0.45 * Math.sin(t * 2.4 + 1.2);
            const rot = ((CFG.redArcRotation ?? 0) * Math.PI) / 5;
            const a0 = Math.PI * 0.5 + rot;
            const a1 = Math.PI * 1.74 + rot;
            // soft bloom hugging the painted crescent
            for (let i = 0; i < 3; i++) {
                ctx.strokeStyle = `rgba(235,25,30,${(0.16 - i * 0.04) * sk * q})`;
                ctx.lineWidth = 10 + i * 12;
                ctx.beginPath();
                ctx.arc(A.speaker.x, A.speaker.y, A.speaker.r * 0.86, a0, a1);
                ctx.stroke();
            }
            ctx.strokeStyle = `rgba(255,80,70,${0.26 * sk * q})`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(A.speaker.x, A.speaker.y, A.speaker.r * 0.86, a0, a1);
            ctx.stroke();
            for (let i = 0; i < 2; i++) {
                const u = ((t * 0.55) + i / 2) % 1;
                ctx.strokeStyle = `rgba(255,60,55,${(1 - u) * 0.28 * q})`;
                ctx.lineWidth = 3 - u * 1.6;
                ctx.beginPath();
                ctx.arc(A.speaker.x, A.speaker.y, A.speaker.r * (0.86 + u * 0.45), a0, a1);
                ctx.stroke();
            }
            const ga = 0.65 + 0.35 * Math.sin(t * 2.6);
            glow(A.greenA.x, A.greenA.y, A.greenA.r * 3.2, '120,235,60', 0.20 * ga * q);
            glow(A.greenA.x, A.greenA.y, A.greenA.r * 1.1, '200,255,150', 0.22 * ga * q);
            const gb = 0.6 + 0.4 * Math.sin(t * 2.6 + 2.1);
            glow(A.greenB.x, A.greenB.y, A.greenB.r * 3.6, '120,235,60', 0.20 * gb * q);
            glow(A.greenB.x, A.greenB.y, A.greenB.r * 1.2, '200,255,150', 0.22 * gb * q);
        }
        // ---- water sphere ----
        q = CFG.waterIntensity ?? 1;
        if (on('showWater', true)) {
            const S = A.sphere;
            ctx.save();
            ctx.beginPath();
            ctx.arc(S.x, S.y, S.r, 0, Math.PI * 2);
            ctx.clip();
            for (let i = 0; i < 5; i++) {
                const yy = S.y + 12 + i * 11 + Math.sin(t * 1.4 + i) * 3;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(150,245,255,${(0.16 - i * 0.022) * q})`;
                ctx.lineWidth = 2.2 - i * 0.25;
                for (let x = -S.r; x <= S.r; x += 6) {
                    const yv = yy + Math.sin(x * 0.06 + t * 2.2 + i * 1.7) * (3 + i) + Math.sin(x * 0.13 - t * 1.3) * 2;
                    x === -S.r ? ctx.moveTo(S.x + x, yv) : ctx.lineTo(S.x + x, yv);
                }
                ctx.stroke();
            }
            glow(S.x + Math.sin(t * 0.8) * 14, S.y - 18 + Math.cos(t * 1.1) * 6, 46, '160,250,255', 0.14 * q);
            ctx.restore();
            glow(S.x, S.y, S.r * 2.0, '60,200,235', (0.10 + 0.03 * Math.sin(t * 1.6)) * q);
            // falling stream + droplets
            if (Math.random() < 0.55 * q) drops.push({
                x:A.drip.x + rnd(-3, 3),
                y:A.drip.y + 40,
                v:rnd(2.6, 4.2),
                r:rnd(1.6, 3.2)
            });
            for (let i = drops.length - 1; i >= 0; i--) {
                const d = drops[i];
                d.y += d.v * dt * 60;
                d.v += 9 * dt;
                if (d.y > A.dripEnd) {
                    drops.splice(i, 1);
                    ripples.push({ x:d.x + rnd(-8, 8), y:A.dripEnd, r:2, life:0 });
                    continue;
                }
                const u = (d.y - A.drip.y) / (A.dripEnd - A.drip.y);
                ctx.fillStyle = `rgba(120,215,255,${(0.5 - u * 0.25) * q})`;
                ctx.beginPath();
                ctx.ellipse(d.x, d.y, d.r * 0.55, d.r * 1.9, 0, 0, Math.PI * 2);
                ctx.fill();
                glow(d.x, d.y, d.r * 4, '90,190,255', 0.10 * q);
            }
            for (let i = ripples.length - 1; i >= 0; i--) {
                const p = ripples[i];
                p.life += dt;
                if (p.life > 1.1) {
                    ripples.splice(i, 1);
                    continue;
                }
                const u = p.life / 1.1;
                ctx.strokeStyle = `rgba(120,215,255,${(1 - u) * 0.22 * q})`;
                ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.ellipse(p.x, p.y, 6 + u * 34, (6 + u * 34) * 0.22, 0, 0, Math.PI * 2);
                ctx.stroke();
            }
            glow(A.drip.x, A.dripEnd, 40, '70,170,235', (0.10 + 0.03 * Math.sin(t * 3)) * q);
        }
        raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
}
