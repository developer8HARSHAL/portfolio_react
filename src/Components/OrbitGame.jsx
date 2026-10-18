import { useEffect, useRef, useState } from 'react'

const MAX_R = 116
const TILT = 0.5
const START_R = 72
const HORIZON = 20
const HOLE_R = HORIZON * 0.85
const ISCO = 42
const WAVE_SPEED = 55
const WAVE_EVERY = 6.5
const WAVE_PUSH = 14
const FALL_TIME = 1.3
const PIECES = 5
const CAPTURE = 16
const TARGET_SPEED = 0.45
const HIT = 9
const SHOVE = 60
const IMPULSE = 55
const DRAG = 1.2
const TOTAL = 5
const DEBRIS_BY_LEVEL = [0, 1, 1, 2, 3]
const COLORS = {
  bg: '#0b1020',
  ink: '#edf1f8',
  muted: '#9caac0',
  gold: '#a8b8df',
  line: 'rgba(190,207,239,.14)',
  danger: '#ca756f',
}

const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
const toXY = (r, a) => ({ x: Math.cos(a) * r, y: Math.sin(a) * r })
const circle = (ctx, x, y, r) => {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
}

/* ---------- game logic (no React, no canvas) ---------- */

const rand = (min, max) => min + Math.random() * (max - min)
const omega = (r) => 820 / r ** 1.5
const dist = (r1, a1, r2, a2) => {
  const p = toXY(r1, a1)
  const q = toXY(r2, a2)
  return Math.hypot(p.x - q.x, p.y - q.y)
}

function spawnDebris(count, targetR) {
  return Array.from({ length: count }, (_, i) => {
    let r = rand(44, 112)
    while (Math.abs(r - targetR) < 14) r = rand(44, 112)
    return {
      r,
      a: rand(0, Math.PI * 2),
      dir: i % 2 ? -1 : 1,
      shape: Array.from({ length: 7 }, () => rand(0.65, 1.15)),
    }
  })
}

function spawnTarget(s) {
  let r = rand(48, 110)
  while (Math.abs(r - s.r) < 16) r = rand(48, 110)
  s.target = { r, a: s.theta + Math.PI + rand(-0.6, 0.6) }
  s.debris = spawnDebris(DEBRIS_BY_LEVEL[s.collected], r)
  s.grace = 1
}

function createState() {
  const s = {
    phase: 'idle',
    r: START_R,
    vr: 0,
    theta: -Math.PI / 2,
    elapsed: 0,
    thrust: 0,
    flash: 0,
    grace: 0,
    collected: 0,
    target: null,
    debris: [],
    clock: 0,
    waves: [],
    fall: null,
    spawnFx: 0,
    waveClock: 3,
    flecks: Array.from({ length: 9 }, () => ({ r: rand(28, 68), a: rand(0, Math.PI * 2) })),
  }
  spawnTarget(s)
  return s
}

function thrust(s) {
  if (s.phase !== 'playing' || s.fall) return
  const depth = clamp((START_R - s.r) / (START_R - HORIZON), 0, 1)
  s.vr += IMPULSE * (1 + 0.5 * depth)
  s.thrust = 1
}

function checkTarget(s) {
  if (dist(s.r, s.theta, s.target.r, s.target.a) >= CAPTURE) return
  s.collected += 1
  if (s.collected >= TOTAL) s.phase = 'done'
  else spawnTarget(s)
}

function checkDebris(s) {
  if (s.grace > 0) return
  if (!s.debris.some((d) => dist(s.r, s.theta, d.r, d.a) < HIT)) return
  s.vr = -SHOVE
  s.grace = 0.7
  s.flash = 1
}

function stepWaves(s, dt) {
  s.waveClock -= dt
  if (s.waveClock <= 0) {
    s.waves.push({ rr: HOLE_R + 4, hit: false })
    s.waveClock = WAVE_EVERY
  }
  s.waves.forEach((w) => {
    w.rr += WAVE_SPEED * dt
  })
  s.waves = s.waves.filter((w) => w.rr < MAX_R + 30)
}

function pushWaves(s) {
  s.waves.forEach((w) => {
    if (w.hit || Math.abs(w.rr - s.r) > 5) return
    w.hit = true
    s.vr += WAVE_PUSH
  })
}

function startFall(s) {
  s.fall = { t: 0, r0: s.r, theta0: s.theta }
  s.flash = 1
  s.waves.push({ rr: HOLE_R + 2, hit: true })
}

function stepSwallow(s, dt) {
  s.fall.t += dt
  s.flash = Math.max(s.flash, 0.7 * (1 - s.fall.t / FALL_TIME))
  if (s.fall.t < FALL_TIME) return
  s.fall = null
  s.r = START_R
  s.vr = 0
  s.grace = 1
  s.spawnFx = 1
}

function stepFall(s, dt) {
  const plunge = s.r < ISCO ? ((ISCO - s.r) / (ISCO - HORIZON)) ** 2 * 120 : 0
  const pull = 14 + 900 / s.r + plunge
  s.vr += (-pull - DRAG * s.vr) * dt
  s.r = clamp(s.r + s.vr * dt, 0, MAX_R)
  if (s.r === MAX_R && s.vr > 0) s.vr = 0
  if (s.r < HORIZON + 4) startFall(s)
}

function step(s, dt) {
  s.theta += omega(s.r) * dt
  s.target.a += TARGET_SPEED * dt
  s.debris.forEach((d) => {
    d.a += d.dir * omega(d.r) * dt
  })
  s.thrust = Math.max(0, s.thrust - dt * 4)
  s.flash = Math.max(0, s.flash - dt * 2.5)
  s.grace = Math.max(0, s.grace - dt)
  s.clock += dt
  s.spawnFx = Math.max(0, s.spawnFx - dt * 1.25)
  stepWaves(s, dt)
  s.flecks.forEach((f) => {
    f.a += 0.5 * omega(f.r) * dt
  })
  if (s.phase !== 'playing') return
  s.elapsed += dt
  if (s.fall) {
    stepSwallow(s, dt)
    return
  }
  stepFall(s, dt)
  checkDebris(s)
  pushWaves(s)
  checkTarget(s)
}

/* ---------- drawing ---------- */

const lerp = (a, b, t) => a + (b - a) * t
const STOPS = [[246, 236, 208], [213, 180, 119], [122, 90, 48]]

function diskColor(t, alpha) {
  const k = t < 0.5 ? 0 : 1
  const u = t < 0.5 ? t * 2 : (t - 0.5) * 2
  const c = STOPS[k].map((v, i) => Math.round(lerp(v, STOPS[k + 1][i], u)))
  return `rgba(${c[0]},${c[1]},${c[2]},${alpha})`
}

function seeded(seed) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const project = (r, a, cx, cy, S) => ({
  x: cx + Math.cos(a) * r * S,
  y: cy + Math.sin(a) * r * S * TILT,
})
const sprite = (S, r, a) => Math.max(S, 1.5) * (1 + 0.18 * ((Math.sin(a) * r) / MAX_R))
const tidal = (r) => clamp((ISCO + 10 - r) / (ISCO + 10 - HORIZON), 0, 1)

function makeLayer(width, height, dpr) {
  const c = document.createElement('canvas')
  c.width = Math.round(width * dpr)
  c.height = Math.round(height * dpr)
  const g = c.getContext('2d')
  g.setTransform(dpr, 0, 0, dpr, 0, 0)
  return { c, g }
}

function drawStars(g, width, height, S) {
  const rnd = seeded(7)
  const cx = width / 2
  const cy = height / 2
  const rh = HOLE_R * S
  const bend = 0.6 * (1.3 * rh) ** 2
  const count = Math.round((width * height) / 5000)
  g.fillStyle = COLORS.ink
  for (let i = 0; i < count; i += 1) {
    let x = rnd() * width
    let y = rnd() * height
    const d = Math.hypot(x - cx, y - cy) || 1
    if (d < rh * 4) {
      x = cx + ((x - cx) / d) * (d + bend / d)
      y = cy + ((y - cy) / d) * (d + bend / d)
    }
    g.globalAlpha = 0.2 + rnd() * 0.5
    const size = rnd() > 0.92 ? 1.8 : 1.1
    g.fillRect(x, y, size, size)
  }
  g.globalAlpha = 1
}

function drawJetCones(g, width, height, S) {
  const cx = width / 2
  const cy = height / 2
  const jetH = (height / 2 - 10) * 0.96
  const jetW = 6 * S
  const grad1 = g.createLinearGradient(cx, cy, cx, cy - jetH)
  grad1.addColorStop(0, 'rgba(168,184,223,.18)')
  grad1.addColorStop(0.5, 'rgba(168,184,223,.06)')
  grad1.addColorStop(1, 'rgba(168,184,223,0)')
  g.beginPath()
  g.moveTo(cx - jetW, cy)
  g.lineTo(cx + jetW, cy)
  g.lineTo(cx + 2, cy - jetH)
  g.lineTo(cx - 2, cy - jetH)
  g.closePath()
  g.fillStyle = grad1
  g.fill()
  const grad2 = g.createLinearGradient(cx, cy, cx, cy + jetH)
  grad2.addColorStop(0, 'rgba(168,184,223,.18)')
  grad2.addColorStop(0.5, 'rgba(168,184,223,.06)')
  grad2.addColorStop(1, 'rgba(168,184,223,0)')
  g.beginPath()
  g.moveTo(cx - jetW, cy)
  g.lineTo(cx + jetW, cy)
  g.lineTo(cx + 2, cy + jetH)
  g.lineTo(cx - 2, cy + jetH)
  g.closePath()
  g.fillStyle = grad2
  g.fill()
}

function buildLayers(width, height, S, dpr) {
  const back = makeLayer(width, height, dpr)
  back.g.fillStyle = COLORS.bg
  back.g.fillRect(0, 0, width, height)
  drawStars(back.g, width, height, S)
  drawJetCones(back.g, width, height, S)

  const front = makeLayer(width, height, dpr)
  const cx = width / 2
  const cy = height / 2
  const diskRings = 18
  for (let i = diskRings; i >= 0; i -= 1) {
    const t = i / diskRings
    const rOuter = lerp(HOLE_R + 3, MAX_R + 4, t)
    const rInner = lerp(HOLE_R + 3, MAX_R + 4, Math.max(0, t - 1 / diskRings))
    front.g.beginPath()
    front.g.ellipse(cx, cy, rOuter * S, rOuter * S * TILT, 0, 0, Math.PI * 2)
    front.g.ellipse(cx, cy, rInner * S, rInner * S * TILT, 0, 0, Math.PI * 2)
    front.g.fillStyle = diskColor(t, t < 0.15 ? t / 0.15 * 0.28 : lerp(0.28, 0, (t - 0.15) / 0.85))
    front.g.fill('evenodd')
  }
  return { back: back.c, front: front.c }
}

function drawTargetOrbit(ctx, cx, cy, S, s) {
  ctx.beginPath()
  ctx.ellipse(cx, cy, s.target.r * S, s.target.r * S * TILT, 0, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(168,184,223,.18)'
  ctx.lineWidth = 1
  ctx.setLineDash([4, 6])
  ctx.stroke()
  ctx.setLineDash([])
}

function drawWaves(ctx, cx, cy, S, s) {
  s.waves.forEach((w) => {
    const alpha = clamp(1 - (w.rr - HOLE_R) / (MAX_R - HOLE_R), 0, 1) * 0.4
    if (alpha < 0.01) return
    ctx.beginPath()
    ctx.ellipse(cx, cy, w.rr * S, w.rr * S * TILT, 0, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(168,184,223,${alpha})`
    ctx.lineWidth = 1.5
    ctx.stroke()
  })
}

function drawIsco(ctx, cx, cy, S) {
  ctx.beginPath()
  ctx.ellipse(cx, cy, ISCO * S, ISCO * S * TILT, 0, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(202,117,111,.35)'
  ctx.lineWidth = 1
  ctx.setLineDash([3, 5])
  ctx.stroke()
  ctx.setLineDash([])
}

function drawHole(ctx, cx, cy, S, s, fx) {
  const flash = fx ? s.flash : 0
  if (flash > 0.01) {
    circle(ctx, cx, cy, (HOLE_R + 10) * S)
    const gf = ctx.createRadialGradient(cx, cy, 0, cx, cy, (HOLE_R + 10) * S)
    gf.addColorStop(0, `rgba(255,255,255,${flash * 0.6})`)
    gf.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gf
    ctx.fill()
  }
  ctx.beginPath()
  ctx.ellipse(cx, cy, HOLE_R * S, HOLE_R * S * TILT, 0, 0, Math.PI * 2)
  const gd = ctx.createRadialGradient(cx - 2 * S, cy - 1 * S, 0, cx, cy, HOLE_R * S * 1.05)
  gd.addColorStop(0, '#000000')
  gd.addColorStop(0.7, '#000000')
  gd.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = gd
  ctx.fill()
}

function drawJetKnots(ctx, cx, cy, S, s, jetH) {
  const knotCount = 5
  for (let i = 0; i < knotCount; i += 1) {
    const phase = ((s.clock * 0.6 + i / knotCount) % 1)
    const y = cy - phase * jetH
    const alpha = Math.sin(phase * Math.PI) * 0.5
    const size = (1 + Math.sin(phase * Math.PI) * 1.5) * S
    circle(ctx, cx, y, size)
    ctx.fillStyle = `rgba(168,184,223,${alpha})`
    ctx.fill()
    circle(ctx, cx, cy + (cy - y), size * 0.7)
    ctx.fillStyle = `rgba(168,184,223,${alpha * 0.6})`
    ctx.fill()
  }
}

function drawDebris(ctx, cx, cy, S, d) {
  const p = project(d.r, d.a, cx, cy, S)
  const u = sprite(S, d.r, d.a)
  const k = tidal(d.r)
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(d.a + d.dir * 0.5)
  ctx.scale(u, u * (1 - 0.5 * k * Math.abs(Math.sin(d.a))))
  ctx.globalAlpha = 1 - 0.4 * k
  ctx.beginPath()
  const sides = d.shape.length
  for (let j = 0; j < sides; j += 1) {
    const angle = (j / sides) * Math.PI * 2
    const rr = d.shape[j] * 3
    if (j === 0) ctx.moveTo(Math.cos(angle) * rr, Math.sin(angle) * rr)
    else ctx.lineTo(Math.cos(angle) * rr, Math.sin(angle) * rr)
  }
  ctx.closePath()
  ctx.fillStyle = COLORS.danger
  ctx.fill()
  ctx.restore()
}

function drawBeacon(ctx, cx, cy, S, s, fx) {
  const p = project(s.target.r, s.target.a, cx, cy, S)
  const u = sprite(S, s.target.r, s.target.a)
  const pulse = fx ? 0.5 + 0.5 * Math.sin(s.clock * 4) : 1
  ctx.save()
  ctx.translate(p.x, p.y)
  if (fx && s.spawnFx > 0) {
    ctx.globalAlpha = s.spawnFx * 0.5
    circle(ctx, 0, 0, 10 * u * (1 - s.spawnFx * 0.5))
    ctx.fillStyle = COLORS.gold
    ctx.fill()
  }
  ctx.globalAlpha = 0.5 + 0.5 * pulse
  circle(ctx, 0, 0, 4 * u)
  ctx.strokeStyle = COLORS.gold
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.globalAlpha = 1
  circle(ctx, 0, 0, 1.5 * u)
  ctx.fillStyle = COLORS.gold
  ctx.fill()
  ctx.restore()
}

function drawShip(ctx, cx, cy, S, s, fx) {
  const p = project(s.r, s.theta, cx, cy, S)
  const u = sprite(S, s.r, s.theta)
  const k = tidal(s.r)
  const tangentAngle = s.theta + Math.PI / 2
  const toHole = Math.atan2(-Math.sin(s.theta) * TILT, -Math.cos(s.theta))
  const heading = Math.atan2(-Math.sin(tangentAngle) * TILT, Math.cos(tangentAngle))

  if (fx && s.thrust > 0) {
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(heading)
    const tl = 8 + 14 * s.thrust
    const grad = ctx.createLinearGradient(-tl, 0, 0, 0)
    grad.addColorStop(0, 'rgba(249,115,22,0)')
    grad.addColorStop(1, `rgba(249,115,22,${0.7 * s.thrust})`)
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.moveTo(0, -2 * u)
    ctx.lineTo(-tl, 0)
    ctx.lineTo(0, 2 * u)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(toHole)
  ctx.scale(1 + 1.4 * k, 1 / Math.sqrt(1 + 1.4 * k))
  ctx.rotate(heading - toHole)
  ctx.scale(u, u)
  ctx.globalAlpha = (1 - 0.4 * k) * (1 - 0.6 * s.spawnFx)
  ctx.fillStyle = `rgb(${Math.round(lerp(238, 212, k))},${Math.round(lerp(234, 111, k))},${Math.round(lerp(225, 93, k))})`
  ctx.beginPath()
  ctx.moveTo(6, 0)
  ctx.lineTo(-4, -3.6)
  ctx.lineTo(-2.2, 0)
  ctx.lineTo(-4, 3.6)
  ctx.closePath()
  ctx.fill()
  ctx.fillStyle = COLORS.gold
  circle(ctx, 0.8, 0, 1)
  ctx.fill()
  ctx.restore()
}

function drawPieces(ctx, cx, cy, S, s, front) {
  const f = s.fall
  const u = Math.max(S, 1.5)
  for (let i = 0; i < PIECES; i += 1) {
    const p = clamp((f.t - i * 0.07) / (FALL_TIME - 0.4), 0, 1)
    const a = f.theta0 + i * 0.22 + 6 * p + 8 * p * p
    if (p >= 1 || (Math.sin(a) >= 0) !== front) continue
    const pt = project(f.r0 * (1 - p) ** 1.6 + 2, a, cx, cy, S)
    const len = (2.5 + 10 * p) * u
    const wid = (1.8 * (1 - p) + 0.5) * u
    ctx.save()
    ctx.translate(pt.x, pt.y)
    ctx.rotate(Math.atan2(-Math.sin(a) * TILT, -Math.cos(a)))
    ctx.globalAlpha = 1 - p ** 1.5
    ctx.fillStyle = `rgb(${Math.round(lerp(238, 212, p))},${Math.round(lerp(234, 111, p))},${Math.round(lerp(225, 93, p))})`
    ctx.fillRect(-len, -wid / 2, len * 2, wid)
    ctx.restore()
  }
}

function drawFleck(ctx, cx, cy, S, f) {
  const p = project(f.r, f.a, cx, cy, S)
  ctx.fillStyle = 'rgba(246,236,208,.85)'
  circle(ctx, p.x, p.y, Math.max(1, 0.7 * S))
  ctx.fill()
}

function drawBodies(ctx, cx, cy, S, s, fx, front) {
  const side = (a) => (Math.sin(a) >= 0) === front
  s.flecks.forEach((f) => side(f.a) && drawFleck(ctx, cx, cy, S, f))
  s.debris.forEach((d) => side(d.a) && drawDebris(ctx, cx, cy, S, d))
  if (side(s.target.a)) drawBeacon(ctx, cx, cy, S, s, fx)
  if (s.fall) drawPieces(ctx, cx, cy, S, s, front)
  else if (side(s.theta)) drawShip(ctx, cx, cy, S, s, fx)
}

function drawLabels(ctx, view) {
  const { width, height, S } = view
  if (width < 640) return
  const cx = width / 2
  const cy = height / 2
  const jetY = cy - (height / 2 - 10) * 0.75
  ctx.font = '10px ui-monospace, monospace'
  ctx.textBaseline = 'middle'
  ctx.strokeStyle = 'rgba(190,207,239,.3)'
  ctx.fillStyle = 'rgba(190,207,239,.6)'
  ctx.lineWidth = 1
  const note = (text, x1, y1, x2, y2, align) => {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.textAlign = align
    ctx.fillText(text, x2 + (align === 'left' ? 5 : -5), y2)
  }
  note('last stable orbit', cx + ISCO * S, cy, cx + 72 * S + 14, cy, 'left')
  note('accretion disk', cx - 72 * S, cy, cx - 72 * S - 14, cy, 'right')
  note('relativistic jet', cx + 2.5 * S, jetY, cx + 2.5 * S + 28, jetY - 14, 'left')
}

function draw(ctx, view, s, fx) {
  const { width, height, S, layers } = view
  const cx = width / 2
  const cy = height / 2
  const shake = fx && s.fall ? 2.5 * (1 - s.fall.t / FALL_TIME) : 0
  ctx.save()
  ctx.translate((Math.random() - 0.5) * shake * 2, (Math.random() - 0.5) * shake * 2)
  ctx.drawImage(layers.back, 0, 0, width, height)
  drawTargetOrbit(ctx, cx, cy, S, s)
  drawWaves(ctx, cx, cy, S, s)
  drawBodies(ctx, cx, cy, S, s, fx, false)
  if (fx) drawJetKnots(ctx, cx, cy, S, s, height / 2 - 10)
  drawHole(ctx, cx, cy, S, s, fx)
  ctx.drawImage(layers.front, 0, 0, width, height)
  drawIsco(ctx, cx, cy, S)
  drawBodies(ctx, cx, cy, S, s, fx, true)
  if (s.phase !== 'playing') drawLabels(ctx, view)
  ctx.restore()
}

/* ---------- overlay ---------- */

function Overlay({ ui, onStart, links }) {
  const done = ui.phase === 'done'
  return (
    <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/10 bg-[#0b1020]/90 px-4 py-3 sm:px-5">
      {done ? (
        <>
          <p className="text-sm" aria-live="polite">
            <span className="font-semibold">{TOTAL} signals in {ui.seconds}s.</span>{' '}
            <span className="text-white/60">Now see what I build.</span>
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={onStart} className="text-xs text-white/45 underline underline-offset-4 hover:text-white/80">
              Play again
            </button>
            <a href={links.contact} className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/80 hover:border-white/50">
              Get in touch
            </a>
            <a href={links.projects} className="rounded-full bg-[#a8b8df] px-4 py-1.5 text-sm font-semibold text-[#111827]">
              View projects
            </a>
          </div>
        </>
      ) : (
        <>
          <p className="max-w-xl text-sm text-white/70">
            Tap or press Space to climb to a wider orbit. Gravity pulls you back in. Catch the signal, avoid the red
            debris, and stay above the dashed orbit.
          </p>
          <button type="button" onClick={onStart} className="rounded-full bg-[#a8b8df] px-5 py-1.5 text-sm font-semibold text-[#111827]">
            Start
          </button>
        </>
      )}
    </div>
  )
}

/* ---------- component ---------- */

// ── New props ──────────────────────────────────────────────────────────────
// autoStart  — when true, starts the game automatically 350ms after mount.
//              Driven by BlackHolePortal so the game begins as the launch
//              overlay fades in, making the ship appear to "arrive".
// hideOverlay — suppress the built-in idle/done overlay when the parent
//               (BlackHolePortal) is managing entry/exit UX itself.
// onDone     — called once when the player collects all 5 signals.

function OrbitGame({
  className = '',
  projectsHref = '#project',
  contactHref = '#contact',
  autoStart = false,
  hideOverlay = false,
  onDone,
}) {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  if (!stateRef.current) stateRef.current = createState()
  const visibleRef = useRef(true)
  const uiKeyRef = useRef('')
  const [ui, setUi] = useState({ phase: 'idle', collected: 0, seconds: 0 })

  // Keep onDone stable inside the rAF loop without re-running the main effect
  const onDoneRef = useRef(onDone)
  useEffect(() => { onDoneRef.current = onDone }, [onDone])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return undefined

    const fx = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let view = { width: 1, height: 300, S: 1, layers: null }
    let raf = 0
    let last = 0

    const resize = () => {
      const width = Math.max(1, canvas.getBoundingClientRect().width)
      const height = clamp(Math.round(width * 0.46), 300, 440)
      const S = Math.min(3.2, (width / 2 - 20) / MAX_R, (height / 2 - 16) / (MAX_R * TILT))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      view = { width, height, S, layers: buildLayers(width, height, S, dpr) }
    }

    const syncUi = (s) => {
      const next = {
        phase: s.phase,
        collected: s.collected,
        seconds: Math.floor(s.elapsed),
      }
      const key = `${next.phase}|${next.collected}|${next.seconds}`
      if (key === uiKeyRef.current) return
      uiKeyRef.current = key
      // Fire onDone exactly once when the game transitions to 'done'
      if (s.phase === 'done' && onDoneRef.current) onDoneRef.current()
      setUi(next)
    }

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (document.hidden || !visibleRef.current) return
      const s = stateRef.current
      step(s, dt)
      draw(ctx, view, s, fx)
      syncUi(s)
    }

    const resizeObserver = new ResizeObserver(resize)
    const intersection = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting
    })
    resizeObserver.observe(canvas)
    intersection.observe(canvas)
    resize()
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      intersection.disconnect()
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code !== 'Space' || event.repeat) return
      const s = stateRef.current
      if (s.phase !== 'playing' || !visibleRef.current || document.activeElement !== canvasRef.current) return
      event.preventDefault()
      thrust(s)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Auto-start: fires when autoStart flips true (i.e. when BlackHolePortal's
  // launch overlay fades and phase becomes 'playing'). The 350ms delay lets
  // the canvas finish its first resize/draw cycle before the ship appears.
  useEffect(() => {
    if (!autoStart) return undefined
    const t = setTimeout(() => {
      stateRef.current = createState()
      stateRef.current.phase = 'playing'
      canvasRef.current?.focus({ preventScroll: true })
    }, 350)
    return () => clearTimeout(t)
  }, [autoStart])

  const start = () => {
    stateRef.current = createState()
    stateRef.current.phase = 'playing'
    canvasRef.current?.focus({ preventScroll: true })
  }

  return (
    <section className={`overflow-hidden bg-[#0b1020] text-[#edf1f8] ${className}`} aria-label="Orbit, a small game">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-xs">
        <span className="text-white/50">Orbit</span>
        <span className="tabular-nums text-[#a8b8df]">
          {ui.collected}/{TOTAL} signals, {ui.seconds}s
        </span>
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          role="application"
          tabIndex={0}
          aria-label="Orbit game. Tap or press Space to move to a wider orbit and collect signals; avoid red debris."
          onPointerDown={() => {
            canvasRef.current?.focus({ preventScroll: true })
            thrust(stateRef.current)
          }}
          className="block h-[300px] w-full touch-pan-y select-none outline-none"
        />

        {ui.phase !== 'playing' && !hideOverlay && (
          <Overlay ui={ui} onStart={start} links={{ projects: projectsHref, contact: contactHref }} />
        )}
      </div>
    </section>
  )
}

export default OrbitGame