/**
 * ─────────────────────────────────────────────────────────────
 *  مولّد تصویرسازی‌های سبزینه
 *  همهٔ تصاویر فروشگاه (محصولات، دسته‌ها، بنرها، اینستاگرام)
 *  به‌صورت SVG با هویت یکدست سبز تولید می‌شوند.
 *  اجرا:  node scripts/generate-images.mjs
 * ─────────────────────────────────────────────────────────────
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const OUT = join(ROOT, 'public', 'images')
for (const d of ['products', 'categories', 'hero', 'instagram', 'lifestyle'])
  mkdirSync(join(OUT, d), { recursive: true })

/* ── پالت اکازیون: اشیاء روشن روی سطوح تیره + نارنجی ── */
const C = {
  mist: '#EEF3FE',
  sage: '#FFF0E3',
  cream: '#FFFFFF',
  paper: '#FAFAFA',
  paperDark: '#ECECEE',
  canvas: '#F2F2F4',
  canvasDark: '#E4E4E8',
  primary: '#0066FF',
  forest: '#0B0C10',
  mint: '#FF8A3D',
  mintSoft: '#FFD9B8',
  ink: '#0B0C10',
  white: '#FFFFFF',
  wood: '#4A505C',
  woodDark: '#333842',
  woodLight: '#616875',
  brass: '#FF8A3D',
  brassDark: '#D96A10',
  metal: '#8A8F98',
  flame: '#FF8A3D',
  flameDeep: '#FFE0C2',
  line: '#E7E8EC',
}

/* ── ابزارهای پایه ─────────────────────────────────── */
const svgDoc = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">${body}</svg>`

/** سایهٔ نرم زیر اشیاء — فضای محلی ۸۰۰×۸۰۰ */
const shadow = (cy = 660, rx = 185, ry = 20, o = 0.25) =>
  `<ellipse cx="400" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000000" opacity="${o}"/>`

/** برگ نوک‌تیز رو به بالا؛ (x,y) پایهٔ برگ */
const leaf = (x, y, s, fill, extra = '') =>
  `<path d="M ${x} ${y} C ${x - 22 * s} ${y - 16 * s} ${x - 24 * s} ${y - 50 * s} ${x} ${y - 64 * s} C ${x + 24 * s} ${y - 50 * s} ${x + 22 * s} ${y - 16 * s} ${x} ${y} Z" fill="${fill}" ${extra}/>`

/** ساقه با دو برگ (اسپرای کوچک) */
const sprig = (x, y, s, fill, rot = 0) => `
  <g transform="rotate(${rot} ${x} ${y})">
    <path d="M ${x} ${y} L ${x} ${y - 90 * s}" stroke="${fill}" stroke-width="${7 * s}" stroke-linecap="round" fill="none"/>
    ${leaf(x, y - 30 * s, 0.9 * s, fill)}
    ${leaf(x, y - 62 * s, 0.7 * s, fill)}
  </g>`

/** بخار فنجان */
const steam = (x, y, s = 1, color = '#FF9A55') => `
  <path d="M ${x} ${y} c ${-14 * s} ${-24 * s} ${14 * s} ${-42 * s} 0 ${-68 * s}" stroke="${color}" stroke-width="${9 * s}" fill="none" stroke-linecap="round" opacity=".65"/>
  <path d="M ${x + 42 * s} ${y + 6 * s} c ${-12 * s} ${-20 * s} ${12 * s} ${-36 * s} 0 ${-58 * s}" stroke="${color}" stroke-width="${8 * s}" fill="none" stroke-linecap="round" opacity=".3"/>`

/** ستارهٔ چهارپر */
const sparkle = (x, y, s, fill) =>
  `<path d="M ${x} ${y - 17 * s} Q ${x + 3.5 * s} ${y - 3.5 * s} ${x + 17 * s} ${y} Q ${x + 3.5 * s} ${y + 3.5 * s} ${x} ${y + 17 * s} Q ${x - 3.5 * s} ${y + 3.5 * s} ${x - 17 * s} ${y} Q ${x - 3.5 * s} ${y - 3.5 * s} ${x} ${y - 17 * s} Z" fill="${fill}"/>`

/** خوشهٔ سه‌نقطهٔ تزیینی */
const dots3 = (x, y, fill, o = 0.55) => `
  <circle cx="${x}" cy="${y}" r="9" fill="${fill}" opacity="${o}"/>
  <circle cx="${x + 30}" cy="${y + 18}" r="6.5" fill="${fill}" opacity="${o * 0.8}"/>
  <circle cx="${x + 12}" cy="${y + 40}" r="5" fill="${fill}" opacity="${o * 0.6}"/>`

/** جای‌گذاری شیء (فضای محلی ۸۰۰×۸۰) در صحنه */
const place = (body, x, y, s, rot = 0) =>
  `<g transform="translate(${x} ${y}) scale(${s})${rot ? ` rotate(${rot})` : ''} translate(-400 -400)">${body}</g>`

/* ── اشیاء (همه در فضای ۸۰۰×۸۰۰ حول مرکز) ─────────── */

function mug({ glaze = C.primary, glazeLight, inner, pattern = 'none', withSteam = false, saucer = false }) {
  const light = glazeLight ?? glaze
  const dark = inner ?? C.forest
  const bodyPath = 'M265 320 H535 V570 Q535 625 480 625 H320 Q265 625 265 570 Z'
  let patternSvg = ''
  if (pattern === 'dots') {
    patternSvg = `<g clip-path="url(#mugClip)" fill="${C.primary}">
      <circle cx="352" cy="420" r="13"/><circle cx="446" cy="402" r="10"/>
      <circle cx="398" cy="492" r="11"/><circle cx="474" cy="500" r="8"/>
      <circle cx="330" cy="546" r="9"/><circle cx="420" cy="566" r="7"/></g>`
  } else if (pattern === 'leaf') {
    patternSvg = `<g clip-path="url(#mugClip)">
      ${leaf(400, 520, 2.4, C.mint)}
      ${leaf(356, 540, 1.1, C.primary)}
      ${leaf(452, 536, 1.0, C.primary)}</g>`
  } else if (pattern === 'rim') {
    patternSvg = `<g clip-path="url(#mugClip)"><rect x="265" y="430" width="270" height="46" fill="${C.paper}" opacity=".9"/></g>`
  }
  return `
    ${shadow(662)}
    ${saucer ? `<ellipse cx="400" cy="648" rx="215" ry="30" fill="${C.paper}"/><ellipse cx="400" cy="644" rx="175" ry="22" fill="${C.paperDark}"/>` : ''}
    <circle cx="575" cy="448" r="52" fill="none" stroke="${glaze}" stroke-width="32"/>
    <clipPath id="mugClip"><path d="${bodyPath}"/></clipPath>
    <path d="${bodyPath}" fill="${glaze}"/>
    ${patternSvg}
    <rect x="292" y="360" width="22" height="168" rx="11" fill="${C.white}" opacity=".28"/>
    <ellipse cx="400" cy="320" rx="135" ry="26" fill="${light}"/>
    <ellipse cx="400" cy="320" rx="110" ry="17" fill="${dark}"/>
    ${withSteam ? steam(352, 288) : ''}`
}

function notebook({ cover = C.paper, band = C.forest, small = false }) {
  const s = small ? 0.8 : 1
  const x = 400 - 170 * s
  const y = 290
  const w = 340 * s
  const h = 440
  return `
    ${shadow(752, 150, 16)}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="24" fill="${cover}" stroke="#E3E3E3" stroke-width="3"/>
    <rect x="${x}" y="${y}" width="${46 * s}" height="${h}" rx="20" fill="${C.paperDark}"/>
    <rect x="${x + w - 18}" y="${y}" width="14" height="${h}" fill="${band}" opacity=".85"/>
    ${leaf(400 + 20 * s, 470, 1.7, C.mint, 'opacity=".85"')}
    <rect x="${400 - 70 * s}" y="560" width="${140 * s}" height="10" rx="5" fill="${C.mintSoft}"/>
    <rect x="${400 - 50 * s}" y="584" width="${100 * s}" height="10" rx="5" fill="${C.mintSoft}" opacity=".7"/>`
}

function stickerSheet({ style = 'nature' }) {
  const items =
    style === 'nature'
      ? [
          leaf(300, 350, 1.15, C.primary),
          mushroom(400, 352),
          tree(500, 354),
          snail(300, 462),
          acorn(400, 464),
          flower(500, 466),
        ].join('')
      : [
          star(300, 340, C.brass),
          moon(400, 342),
          squiggle(500, 344),
          heart(300, 462),
          star(400, 452, C.primary),
          lightning(500, 464),
        ].join('')
  return `
    ${shadow(630, 195, 18)}
    <rect x="205" y="205" width="390" height="390" rx="30" fill="#F4F4F4" stroke="${C.line}" stroke-width="3"/>
    <rect x="205" y="205" width="390" height="390" rx="30" fill="none" stroke="${C.mintSoft}" stroke-width="2" stroke-dasharray="4 10" opacity=".7"/>
    ${items}`
}

const stickerBg = (x, y) =>
  `<circle cx="${x}" cy="${y}" r="47" fill="${C.white}" stroke="${C.line}" stroke-width="2"/>`

const mushroom = (x, y) => `${stickerBg(x, y)}
  <rect x="${x - 10}" y="${y - 4}" width="20" height="26" rx="9" fill="${C.paper}"/>
  <path d="M ${x - 26} ${y - 2} Q ${x} ${y - 44} ${x + 26} ${y - 2} Z" fill="${C.primary}"/>
  <circle cx="${x - 10}" cy="${y - 14}" r="4.5" fill="${C.white}" opacity=".9"/>
  <circle cx="${x + 8}" cy="${y - 20}" r="3.5" fill="${C.white}" opacity=".9"/>`

const tree = (x, y) => `${stickerBg(x, y)}
  <rect x="${x - 5}" y="${y - 2}" width="10" height="22" rx="4" fill="${C.woodDark}"/>
  <path d="M ${x - 24} ${y - 4} L ${x} ${y - 40} L ${x + 24} ${y - 4} Z" fill="${C.mint}"/>
  <path d="M ${x - 17} ${y - 22} L ${x} ${y - 48} L ${x + 17} ${y - 22} Z" fill="${C.primary}"/>`

const snail = (x, y) => `${stickerBg(x, y)}
  <path d="M ${x - 26} ${y + 18} Q ${x} ${y + 2} ${x + 26} ${y + 18} L ${x + 26} ${y + 24} L ${x - 26} ${y + 24} Z" fill="${C.canvas}"/>
  <circle cx="${x + 4}" cy="${y + 2}" r="17" fill="none" stroke="${C.primary}" stroke-width="6"/>
  <circle cx="${x + 4}" cy="${y + 2}" r="6" fill="${C.mint}"/>
  <path d="M ${x - 22} ${y + 16} L ${x - 26} ${y - 2}" stroke="${C.woodDark}" stroke-width="5" stroke-linecap="round"/>
  <path d="M ${x - 12} ${y + 14} L ${x - 9} ${y - 6}" stroke="${C.woodDark}" stroke-width="5" stroke-linecap="round"/>`

const acorn = (x, y) => `${stickerBg(x, y)}
  <path d="M ${x - 16} ${y - 8} Q ${x} ${y + 34} ${x + 16} ${y - 8} Z" fill="${C.paper}"/>
  <path d="M ${x - 20} ${y - 8} Q ${x} ${y - 26} ${x + 20} ${y - 8} Q ${x} ${y + 2} ${x - 20} ${y - 8} Z" fill="${C.woodDark}"/>
  <rect x="${x - 2.5}" y="${y - 30}" width="5" height="10" rx="2.5" fill="${C.woodDark}"/>`

const flower = (x, y) => `${stickerBg(x, y)}
  ${[0, 72, 144, 216, 288]
    .map(
      (a) =>
        `<ellipse cx="${x}" cy="${y - 17}" rx="9" ry="16" fill="${C.mint}" transform="rotate(${a} ${x} ${y})"/>`,
    )
    .join('')}
  <circle cx="${x}" cy="${y}" r="9" fill="${C.brass}"/>`

const star = (x, y, fill) => `${stickerBg(x, y)}
  <path d="M ${x} ${y - 26} L ${x + 7} ${y - 8} L ${x + 26} ${y - 8} L ${x + 11} ${y + 4} L ${x + 16} ${y + 22} L ${x} ${y + 11} L ${x - 16} ${y + 22} L ${x - 11} ${y + 4} L ${x - 26} ${y - 8} L ${x - 7} ${y - 8} Z" fill="${fill}"/>`

const moon = (x, y) => `${stickerBg(x, y)}
  <path d="M ${x + 8} ${y - 26} A 26 26 0 1 0 ${x + 8} ${y + 26} A 20 20 0 1 1 ${x + 8} ${y - 26} Z" fill="${C.brass}"/>`

const squiggle = (x, y) => `${stickerBg(x, y)}
  <path d="M ${x - 26} ${y + 12} Q ${x - 14} ${y - 18} ${x} ${y + 4} Q ${x + 14} ${y + 22} ${x + 26} ${y - 10}" stroke="${C.primary}" stroke-width="7" fill="none" stroke-linecap="round"/>`

const heart = (x, y) => `${stickerBg(x, y)}
  <path d="M ${x} ${y + 20} C ${x - 30} ${y - 2} ${x - 22} ${y - 26} ${x} ${y - 10} C ${x + 22} ${y - 26} ${x + 30} ${y - 2} ${x} ${y + 20} Z" fill="${C.mint}"/>`

const lightning = (x, y) => `${stickerBg(x, y)}
  <path d="M ${x + 6} ${y - 26} L ${x - 14} ${y + 2} L ${x - 1} ${y + 2} L ${x - 8} ${y + 26} L ${x + 14} ${y - 4} L ${x + 1} ${y - 4} Z" fill="${C.flame}"/>`

function keychainWood() {
  return `
    ${shadow(640, 135, 16)}
    <path d="M330 290 h150 a0 0 0 0 1 0 0 v180 a115 115 0 0 1 -230 0 v-180 a0 0 0 0 1 0 0 Z" fill="none"/>
    <rect x="330" y="288" width="150" height="240" rx="72" fill="${C.wood}"/>
    <path d="M352 420 q14 8 28 0 M352 470 q14 8 28 0 M352 520 q14 8 28 0" stroke="${C.woodDark}" stroke-width="4" fill="none" opacity=".35" stroke-linecap="round"/>
    ${leaf(405, 540, 1.7, C.mint, 'opacity=".9"')}
    <circle cx="405" cy="345" r="17" fill="none" stroke="${C.metal}" stroke-width="8"/>
    <circle cx="462" cy="322" r="46" fill="none" stroke="${C.brass}" stroke-width="10"/>`
}

function keychainBrass() {
  return `
    ${shadow(660, 130, 16)}
    <circle cx="400" cy="300" r="48" fill="none" stroke="${C.metal}" stroke-width="10"/>
    <rect x="392" y="340" width="16" height="42" rx="8" fill="${C.brass}"/>
    <polygon points="500,470 445,565 335,565 280,470 335,375 445,375" fill="${C.brass}"/>
    <polygon points="500,470 445,565 335,565 280,470 335,375 445,375" fill="${C.white}" opacity=".12"/>
    <circle cx="400" cy="470" r="34" fill="none" stroke="${C.brassDark}" stroke-width="5"/>
    <circle cx="400" cy="470" r="12" fill="${C.brassDark}"/>`
}

function candleholder() {
  return `
    ${shadow(655, 140, 16)}
    <path d="M290 618 A110 128 0 0 1 510 618 Z" fill="${C.paper}" stroke="#E3E3E3" stroke-width="3"/>
    <path d="M330 560 q70 22 140 0 M318 600 q82 24 164 0" stroke="#E3E3E3" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="400" cy="400" r="64" fill="${C.flame}" opacity=".16"/>
    <rect x="374" y="408" width="52" height="96" rx="10" fill="${C.white}" stroke="${C.line}" stroke-width="3"/>
    <path d="M400 348 C 417 369 415 391 400 402 C 385 391 383 369 400 348 Z" fill="${C.flame}"/>
    <path d="M400 366 C 408 377 407 388 400 394 C 393 388 392 377 400 366 Z" fill="${C.flameDeep}"/>`
}

function tote({ body = C.canvas, dark = C.canvasDark }) {
  return `
    ${shadow(690, 165, 17)}
    <path d="M310 332 C 310 238 490 238 490 332" stroke="${dark}" stroke-width="13" fill="none" stroke-linecap="round"/>
    <path d="M285 330 L515 330 L542 668 L258 668 Z" fill="${body}"/>
    <path d="M285 330 L515 330" stroke="${dark}" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/>
    <rect x="338" y="474" width="124" height="112" rx="14" fill="${dark}" opacity=".55"/>
    <path d="M350 486 L450 486" stroke="${C.white}" stroke-width="3" stroke-dasharray="2 8" opacity=".7" stroke-linecap="round"/>
    <circle cx="400" cy="530" r="10" fill="${C.wood}"/>`
}

function giftBox({ box = C.primary, lid = C.forest, ribbon = C.paper, big = false }) {
  const y = big ? 360 : 380
  return `
    ${shadow(650, 175, 18)}
    <rect x="250" y="${y}" width="300" height="240" rx="18" fill="${box}"/>
    <rect x="250" y="${y}" width="300" height="240" rx="18" fill="${C.white}" opacity=".06"/>
    <rect x="230" y="${y - 44}" width="340" height="72" rx="18" fill="${lid}"/>
    <rect x="372" y="${y - 44}" width="56" height="312" fill="${ribbon}"/>
    <ellipse cx="352" cy="${y - 52}" rx="46" ry="20" fill="${ribbon}" transform="rotate(-24 352 ${y - 52})"/>
    <ellipse cx="448" cy="${y - 52}" rx="46" ry="20" fill="${ribbon}" transform="rotate(24 448 ${y - 52})"/>
    <circle cx="400" cy="${y - 48}" r="15" fill="${C.paperDark}"/>
    ${sparkle(295, y - 110, 0.9, C.brass)}
    ${sparkle(520, y - 70, 0.7, C.mint)}
    ${sparkle(545, y - 130, 0.5, C.mint)}`
}

function planter() {
  const leaves = [-72, -43, -14, 14, 43, 72]
    .map(
      (a, i) =>
        `<g transform="rotate(${a} 400 470)">${leaf(400, 470, 1.05, i % 2 ? C.mint : C.primary)}</g>`,
    )
    .join('')
  return `
    ${shadow(665, 140, 16)}
    ${leaves}
    <circle cx="400" cy="462" r="17" fill="${C.mintSoft}"/>
    <rect x="316" y="466" width="168" height="36" rx="12" fill="${C.primary}"/>
    <path d="M322 502 L478 502 L462 648 L338 648 Z" fill="${C.paper}" stroke="#E3E3E3" stroke-width="3"/>`
}

function vase() {
  return `
    ${shadow(668, 130, 15)}
    <path d="M368 306 H432 C 432 352 508 378 508 470 C 508 560 464 648 400 648 C 336 648 292 560 292 470 C 292 378 368 352 368 306 Z" fill="#0B57D0"/>
    <path d="M340 420 C 336 470 348 530 368 570" stroke="${C.white}" stroke-width="12" stroke-linecap="round" fill="none" opacity=".3"/>
    <ellipse cx="400" cy="306" rx="34" ry="9" fill="#062E6F"/>
    <path d="M396 300 C 380 240 330 218 318 172" stroke="${C.woodDark}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M404 300 C 416 234 462 210 470 158" stroke="${C.woodDark}" stroke-width="7" fill="none" stroke-linecap="round"/>
    ${leaf(318, 176, 0.55, C.mint)}
    ${leaf(470, 162, 0.55, C.mint)}
    ${leaf(352, 220, 0.45, C.mintSoft)}`
}

function frameArt() {
  return `
    ${shadow(735, 140, 14)}
    <rect x="250" y="255" width="300" height="400" rx="10" fill="${C.wood}"/>
    <rect x="250" y="255" width="300" height="400" rx="10" fill="none" stroke="${C.woodDark}" stroke-width="3" opacity=".4"/>
    <rect x="274" y="279" width="252" height="352" rx="4" fill="${C.white}"/>
    ${leaf(400, 552, 3.3, C.mint)}
    <path d="M400 552 L400 448" stroke="${C.primary}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="352" cy="352" r="10" fill="${C.mint}"/>
    <circle cx="452" cy="338" r="7" fill="${C.mint}"/>`
}

function teaSet() {
  return `
    ${shadow(678, 235, 18)}
    <circle cx="360" cy="520" r="108" fill="${C.paper}" stroke="#E3E3E3" stroke-width="3"/>
    <path d="M258 496 C 218 486 206 450 222 424 L 250 442 C 244 462 250 478 262 488 Z" fill="${C.paper}" stroke="#E3E3E3" stroke-width="3"/>
    <path d="M462 480 C 512 470 522 540 470 556" stroke="#E3E3E3" stroke-width="16" fill="none" stroke-linecap="round"/>
    <ellipse cx="360" cy="424" rx="62" ry="17" fill="${C.paperDark}"/>
    <circle cx="360" cy="410" r="11" fill="${C.wood}"/>
    <g>
      <ellipse cx="580" cy="612" rx="72" ry="12" fill="${C.paperDark}"/>
      <circle cx="616" cy="576" r="24" fill="none" stroke="${C.paper}" stroke-width="11"/>
      <path d="M548 540 H612 V584 Q612 606 588 606 H572 Q548 606 548 584 Z" fill="${C.paper}" stroke="#E3E3E3" stroke-width="3"/>
      <ellipse cx="580" cy="540" rx="32" ry="8" fill="${C.paperDark}"/>
    </g>
    <g>
      <circle cx="490" cy="640" r="20" fill="none" stroke="${C.mint}" stroke-width="10"/>
      <path d="M452 616 H492 V644 Q492 660 472 660 H452 Z" fill="${C.mint}"/>
      <ellipse cx="470" cy="616" rx="26" ry="7" fill="${C.mintSoft}"/>
    </g>`
}

function penHolder() {
  const pens = [
    { x: 372, rot: -16, fill: C.primary },
    { x: 400, rot: 0, fill: C.brass },
    { x: 428, rot: 14, fill: C.mintSoft },
  ]
  return `
    ${shadow(668, 130, 15)}
    ${pens
      .map(
        ({ x, rot, fill }) => `
      <g transform="rotate(${rot} ${x} 430)">
        <rect x="${x - 7}" y="300" width="14" height="135" rx="7" fill="${fill}"/>
        <circle cx="${x}" cy="304" r="5" fill="${C.white}" opacity=".5"/>
      </g>`,
      )
      .join('')}
    <ellipse cx="400" cy="432" rx="102" ry="22" fill="${C.woodLight}"/>
    <ellipse cx="400" cy="428" rx="84" ry="16" fill="${C.woodDark}"/>
    <rect x="300" y="428" width="200" height="200" rx="14" fill="${C.wood}"/>
    <path d="M318 500 q20 10 40 0 M318 550 q20 10 40 0" stroke="${C.woodDark}" stroke-width="4" fill="none" opacity=".3" stroke-linecap="round"/>`
}

function coasters() {
  const stack = [0, 1, 2, 3]
    .map(
      (i) =>
        `<rect x="${268 + i * 7}" y="${566 - i * 20}" width="264" height="26" rx="13" fill="${i % 2 ? '#3A3A3A' : C.wood}"/>`,
    )
    .join('')
  return `
    ${shadow(640, 165, 16)}
    <g transform="rotate(-9 400 490)">
      <rect x="292" y="390" width="26" height="176" rx="13" fill="${C.woodLight}"/>
      ${leaf(305, 520, 1.05, C.mint, 'opacity=".8"')}
    </g>
    ${stack}
    ${leaf(400, 566, 1.0, C.mint, 'opacity=".8"')}`
}

function wallet() {
  return `
    ${shadow(600, 150, 16)}
    <g transform="rotate(12 585 380)">
      <rect x="540" y="300" width="92" height="140" rx="14" fill="${C.paper}" stroke="${C.line}" stroke-width="3"/>
      <rect x="556" y="330" width="60" height="12" rx="6" fill="${C.mint}"/>
    </g>
    <rect x="252" y="352" width="290" height="204" rx="26" fill="#0B57D0"/>
    <path d="M252 400 Q252 352 300 352 H494 Q542 352 542 400 L542 420 H252 Z" fill="#E4E4E8"/>
    <rect x="272" y="366" width="250" height="176" rx="18" fill="none" stroke="${C.paperDark}" stroke-width="3" stroke-dasharray="3 9" opacity=".8"/>
    <circle cx="397" cy="470" r="13" fill="${C.brass}"/>
    <rect x="368" y="424" width="58" height="8" rx="4" fill="${C.paper}" opacity=".6"/>`
}

function mirror() {
  return `
    ${shadow(676, 130, 14)}
    <path d="M330 664 Q400 596 470 664" stroke="${C.woodDark}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <rect x="394" y="540" width="12" height="76" rx="6" fill="${C.woodDark}"/>
    <circle cx="400" cy="400" r="152" fill="${C.wood}"/>
    <circle cx="400" cy="400" r="126" fill="${C.mist}"/>
    <path d="M330 470 A 96 96 0 0 1 356 330" stroke="${C.white}" stroke-width="13" fill="none" stroke-linecap="round" opacity=".85"/>
    <path d="M470 348 A 110 110 0 0 1 488 400" stroke="${C.white}" stroke-width="8" fill="none" stroke-linecap="round" opacity=".5"/>`
}

function posterSet() {
  const poster = (x, y, rot, motif) => `
    <g transform="rotate(${rot} ${x + 88} ${y + 122})">
      <rect x="${x}" y="${y}" width="176" height="244" rx="8" fill="${C.white}" stroke="${C.line}" stroke-width="3"/>
      ${motif}
    </g>`
  return `
    ${shadow(700, 190, 16)}
    ${poster(232, 300, -7, `<circle cx="${320}" cy="${392}" r="42" fill="none" stroke="${C.mint}" stroke-width="10"/>`)}
    ${poster(316, 282, 0, `${leaf(404, 470, 2.2, C.primary)}`)}
    ${poster(404, 306, 6, `<path d="M ${446} ${476} q 24 -30 48 0 t 48 0" stroke="${C.brass}" stroke-width="9" fill="none" stroke-linecap="round"/>`)}`
}

function deskSet() {
  return `
    ${shadow(660, 230, 16)}
    <g transform="translate(-215 88) scale(.62)">
      <ellipse cx="400" cy="432" rx="102" ry="22" fill="${C.woodLight}"/>
      <ellipse cx="400" cy="428" rx="84" ry="16" fill="${C.woodDark}"/>
      <g transform="rotate(-14 380 430)"><rect x="373" y="300" width="14" height="135" rx="7" fill="${C.primary}"/></g>
      <rect x="300" y="428" width="200" height="200" rx="14" fill="${C.wood}"/>
    </g>
    <rect x="352" y="560" width="180" height="54" rx="12" fill="${C.woodLight}"/>
    <rect x="368" y="542" width="16" height="60" rx="8" fill="${C.primary}" transform="rotate(-18 376 572)"/>
    <circle cx="620" cy="588" r="47" fill="${C.wood}"/>
    <circle cx="620" cy="588" r="30" fill="${C.mist}"/>
    ${leaf(620, 602, 0.6, C.mint, 'opacity=".8"')}`
}

function mugDuo() {
  const mugA = mug({ glaze: C.primary, pattern: 'rim', inner: C.forest })
  const mugB = mug({ glaze: C.paper, glazeLight: C.paperDark, inner: C.paperDark, pattern: 'dots' })
  return `
    ${shadow(668, 235, 18)}
    ${place(mugB, 505, 470, 0.82, 4)}
    ${place(mugA, 320, 480, 0.86, -4)}
    ${sparkle(590, 300, 0.7, C.mint)}
    ${sparkle(230, 330, 0.55, C.brass)}`
}

function giftCozy() {
  return `
    ${giftBox({})}
    <g transform="rotate(10 560 430)">
      <rect x="520" y="360" width="88" height="128" rx="14" fill="${C.paper}" stroke="${C.line}" stroke-width="3"/>
      <circle cx="518" cy="372" r="5" fill="none" stroke="${C.brass}" stroke-width="3"/>
      ${leaf(564, 460, 1.15, C.mint)}
    </g>`
}

function giftDesk() {
  return `
    ${giftBox({ box: C.forest, lid: C.primary, ribbon: C.mint })}
    <g transform="rotate(-8 240 420)">
      <rect x="196" y="330" width="110" height="150" rx="12" fill="${C.paper}" stroke="${C.line}" stroke-width="3"/>
      <rect x="214" y="368" width="74" height="10" rx="5" fill="${C.mintSoft}"/>
    </g>`
}

/* ── صحنه‌ها ───────────────────────────────────────── */

const bgCircles = (tones) =>
  tones
    .map(
      ({ cx, cy, r, fill, o }) =>
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="${o}"/>`,
    )
    .join('')

function heroScene({ bg, circles, objects, decor }) {
  return svgDoc(
    1200,
    900,
    `<rect width="1200" height="900" fill="${bg}"/>
     ${circles}
     ${objects}
     ${decor ?? ''}`,
  )
}

const hero1 = heroScene({
  bg: C.sage,
  circles: bgCircles([
    { cx: 980, cy: 160, r: 250, fill: C.white, o: 0.5 },
    { cx: 90, cy: 830, r: 190, fill: C.white, o: 0.35 },
    { cx: 1130, cy: 800, r: 120, fill: C.mint, o: 0.25 },
  ]),
  objects: `
    ${place(mug({ glaze: C.primary, pattern: 'leaf', withSteam: true }), 610, 500, 1.0)}
    ${place(notebook({}), 1000, 690, 0.45)}
    ${sprig(280, 420, 1.5, C.primary, -12)}
    ${sprig(1030, 330, 1.1, C.forest, 14)}`,
  decor: `${dots3(320, 240, C.mint)}${dots3(880, 720, C.mint, .5)}${sparkle(930, 240, 1.0, C.brass)}`,
})

const hero2 = heroScene({
  bg: C.white,
  circles: bgCircles([
    { cx: 210, cy: 150, r: 200, fill: C.sage, o: 0.9 },
    { cx: 1060, cy: 120, r: 150, fill: C.mint, o: 0.35 },
  ]),
  objects: `
    <rect x="60" y="660" width="1080" height="16" rx="8" fill="${C.paperDark}"/>
    <rect x="60" y="676" width="1080" height="224" fill="${C.paperDark}" opacity=".3"/>
    ${place(notebook({}), 330, 560, 0.62)}
    ${place(mug({ glaze: C.paper, glazeLight: C.paperDark, inner: C.coffee ?? '#2A2A2A', pattern: 'dots', withSteam: true }), 700, 560, 0.6)}
    ${place(planter(), 1020, 560, 0.58)}
    ${place(penHolder(), 120, 700, 0.34)}`,
  decor: `${dots3(950, 260, C.primary)}${sparkle(180, 300, 0.8, C.brass)}${sparkle(560, 220, 0.6, C.mint)}`,
})

const hero3 = heroScene({
  bg: C.forest,
  circles: bgCircles([
    { cx: 240, cy: 180, r: 230, fill: C.white, o: 0.07 },
    { cx: 1080, cy: 780, r: 260, fill: C.mint, o: 0.1 },
  ]),
  objects: `
    ${place(giftBox({ box: C.primary, lid: '#262626', ribbon: C.paper, big: true }), 620, 540, 1.05)}
    ${sprig(300, 430, 1.6, C.mint, -10)}
    ${sprig(950, 380, 1.2, C.mintSoft, 12)}
    ${place(mug({ glaze: C.paper, glazeLight: C.paperDark, inner: C.paperDark }), 990, 680, 0.4)}`,
  decor: `${sparkle(360, 250, 1.1, C.flame)}${sparkle(880, 210, 0.8, C.flame)}${sparkle(240, 620, 0.6, C.mint)}${dots3(1010, 300, C.mintSoft, .5)}`,
})

const promoGift = svgDoc(
  1200,
  1000,
  `<rect width="1200" height="1000" fill="${C.mist}"/>
   ${bgCircles([
     { cx: 1050, cy: 200, r: 240, fill: C.white, o: 0.55 },
     { cx: 120, cy: 880, r: 200, fill: C.sage, o: 0.5 },
   ])}
   ${place(giftBox({ box: C.primary, lid: C.forest, ribbon: C.paper, big: true }), 620, 560, 1.15)}
   ${place(mug({ glaze: C.paper, glazeLight: C.paperDark, inner: C.paperDark, pattern: 'dots' }), 1010, 640, 0.42)}
   ${sprig(300, 470, 1.7, C.primary, -12)}
   ${sparkle(340, 260, 1.0, C.brass)}
   ${sparkle(900, 300, 0.7, C.mint)}
   ${dots3(940, 800, C.primary, .35)}`,
)

const aboutStudio = svgDoc(
  1200,
  800,
  `<rect width="1200" height="800" fill="${C.sage}"/>
   ${bgCircles([{ cx: 1060, cy: 120, r: 170, fill: C.white, o: 0.5 }, { cx: 120, cy: 720, r: 150, fill: C.white, o: 0.35 }])}
   <rect x="140" y="330" width="920" height="18" rx="9" fill="${C.wood}"/>
   <rect x="170" y="348" width="14" height="180" rx="7" fill="${C.woodDark}" opacity=".5"/>
   <rect x="1016" y="348" width="14" height="180" rx="7" fill="${C.woodDark}" opacity=".5"/>
   ${place(planter(), 300, 210, 0.42)}
   ${place(vase(), 470, 205, 0.38)}
   ${place(frameArt(), 700, 195, 0.34)}
   ${place(mug({ glaze: C.primary, pattern: 'leaf' }), 940, 215, 0.36)}
   <rect x="140" y="600" width="920" height="18" rx="9" fill="${C.wood}"/>
   ${place(giftBox({}), 330, 500, 0.5)}
   ${place(stickerSheet({}), 600, 500, 0.42)}
   ${place(teaSet(), 900, 495, 0.42)}
   ${dots3(1060, 480, C.mint, .5)}
   ${sparkle(160, 180, 0.9, C.brass)}`,
)

/* ── اینستاگرام (مربع) ────────────────────────────── */
const instaScene = (bg, body) =>
  svgDoc(800, 800, `<rect width="800" height="800" fill="${bg}"/>${body}`)

const insta = [
  instaScene(C.mist, `
    ${bgCircles([{ cx: 640, cy: 190, r: 150, fill: C.white, o: 0.6 }])}
    ${place(mug({ glaze: C.primary, withSteam: true }), 400, 460, 0.95)}
    ${sprig(640, 420, 1.2, C.mint, 10)}
    ${dots3(180, 250, C.primary)}`),
  instaScene(C.sage, `
    ${place(notebook({}), 430, 430, 0.8)}
    ${place(mug({ glaze: C.paper, glazeLight: C.paperDark, inner: '#2A2A2A', pattern: 'dots' }), 230, 560, 0.5)}
    ${place(penHolder(), 610, 560, 0.42)}`),
  instaScene(C.mist, `
    ${place(giftCozy(), 410, 470, 0.9)}
    ${sparkle(650, 250, 1.0, C.brass)}
    ${sprig(180, 380, 1.3, C.primary, -14)}`),
  instaScene(C.sage, `
    ${place(planter(), 270, 480, 0.72)}
    ${place(planter(), 540, 500, 0.5)}
    ${place(vase(), 470, 300, 0.3)}`),
  instaScene(C.mist, `
    <rect x="120" y="520" width="560" height="16" rx="8" fill="${C.paperDark}"/>
    ${place(frameArt(), 280, 330, 0.42)}
    ${place(mug({ glaze: C.forest, inner: C.ink }), 560, 420, 0.42)}
    ${place(planter(), 430, 540, 0.3)}
    ${dots3(620, 200, C.primary)}`),
  instaScene(C.sage, `
    ${place(giftBox({ box: C.forest, lid: C.primary, ribbon: C.mint }), 410, 460, 0.85)}
    ${sparkle(600, 280, 0.9, C.brass)}
    ${sparkle(230, 320, 0.6, C.mint)}
    ${dots3(590, 620, C.mint, .5)}`),
]

/* ── تصاویر لایف‌استایل (گالری محصول) ─────────────── */
const lifeScene = (bg, body) =>
  svgDoc(800, 800, `<rect width="800" height="800" fill="${bg}"/>${body}`)

const lifestyle = [
  lifeScene(C.mist, `
    ${place(mug({ glaze: C.primary, withSteam: true, saucer: true }), 420, 470, 0.85)}
    <rect x="150" y="560" width="180" height="34" rx="8" fill="${C.mint}" opacity=".8"/>
    <rect x="170" y="526" width="180" height="34" rx="8" fill="${C.mintSoft}"/>
    ${dots3(620, 260, C.primary)}`),
  lifeScene(C.sage, `
    ${place(notebook({}), 420, 450, 0.78)}
    ${place(mug({ glaze: C.paper, glazeLight: C.paperDark, inner: '#2A2A2A' }), 620, 560, 0.42)}
    <rect x="200" y="600" width="240" height="12" rx="6" fill="${C.brass}" opacity=".7" transform="rotate(-24 320 606)"/>`),
  lifeScene(C.mist, `
    <rect x="130" y="480" width="540" height="16" rx="8" fill="${C.paperDark}"/>
    ${place(vase(), 300, 330, 0.5)}
    ${place(frameArt(), 560, 320, 0.38)}
    ${place(planter(), 440, 470, 0.3)}`),
  lifeScene(C.sage, `
    ${place(giftDesk(), 420, 470, 0.85)}
    ${sparkle(620, 280, 0.8, C.brass)}`),
  lifeScene(C.mist, `
    ${place(planter(), 300, 470, 0.7)}
    ${place(vase(), 540, 460, 0.62)}
    ${sprig(170, 420, 1.1, C.primary, -12)}`),
  lifeScene(C.sage, `
    ${place(coasters(), 500, 480, 0.72)}
    ${place(penHolder(), 260, 480, 0.55)}`),
  lifeScene(C.mist, `
    ${place(teaSet(), 420, 470, 0.8)}
    ${steam(360, 380, 1.1)}`),
  lifeScene(C.sage, `
    ${place(giftBox({}), 420, 460, 0.85)}
    ${sparkle(250, 280, 0.9, C.brass)}
    ${sparkle(600, 350, 0.6, C.mint)}
    ${dots3(580, 620, C.mint, .5)}`),
]

/* ── دسته‌بندی‌ها (۱۰۰۰×۷۵۰، پس‌زمینهٔ شفاف) ──────── */
const catScene = (body) => svgDoc(1000, 750, body)

const cats = {
  mug: catScene(`
    ${place(mug({ glaze: C.primary, pattern: 'leaf', withSteam: true }), 500, 390, 0.85)}`),
  accessory: catScene(`
    ${place(tote({}), 420, 380, 0.72)}
    ${place(wallet(), 680, 430, 0.5)}`),
  gift: catScene(`
    ${place(giftBox({}), 500, 380, 0.8)}`),
  decor: catScene(`
    ${place(vase(), 420, 370, 0.62)}
    ${place(candleholder(), 660, 430, 0.52)}`),
  desk: catScene(`
    ${place(notebook({}), 420, 380, 0.6)}
    ${place(penHolder(), 660, 430, 0.46)}`),
  sticker: catScene(`
    ${place(stickerSheet({}), 500, 375, 0.8)}`),
  keychain: catScene(`
    ${place(keychainWood(), 400, 375, 0.78)}
    ${place(keychainBrass(), 660, 420, 0.55)}`),
  special: catScene(`
    ${place(teaSet(), 500, 380, 0.68)}`),
}

/* ── محصولات ───────────────────────────────────────── */
const productArt = {
  'mug-sabzineh': mug({ glaze: C.primary, pattern: 'leaf', withSteam: true }),
  'mug-minimal-green': mug({ glaze: C.mint, glazeLight: C.mintSoft, inner: C.primary, pattern: 'rim' }),
  'keychain-wood': keychainWood(),
  'sticker-nature-pack': stickerSheet({ style: 'nature' }),
  'notebook-minimal': notebook({}),
  'candleholder-ceramic': candleholder(),
  'bag-fabric': tote({}),
  'desk-accessory-set': deskSet(),
  'mug-leaf': mug({ glaze: C.paper, glazeLight: C.paperDark, inner: C.paperDark, pattern: 'leaf' }),
  'mug-dotted': mug({ glaze: C.paper, glazeLight: C.paperDark, inner: C.paperDark, pattern: 'dots' }),
  'mug-duo-set': mugDuo(),
  'keychain-brass': keychainBrass(),
  'sticker-doodle-pack': stickerSheet({ style: 'doodle' }),
  'notebook-pocket': notebook({ small: true, cover: C.mist, band: C.primary }),
  'pen-holder': penHolder(),
  'coaster-set': coasters(),
  'planter-mini': planter(),
  'vase-matte': vase(),
  'wall-art-leaf': frameArt(),
  'tea-set-ceramic': teaSet(),
  'gift-box-cozy': giftCozy(),
  'gift-box-desk': giftDesk(),
  'tote-bag-cream': tote({ body: '#EFE9DA', dark: '#DCD2BA' }),
  'wallet-vegan': wallet(),
  'desk-mirror': mirror(),
  'poster-set': posterSet(),
}

/* ── نوشتن فایل‌ها ────────────────────────────────── */
const files = {
  'hero/hero-1.svg': hero1,
  'hero/hero-2.svg': hero2,
  'hero/hero-3.svg': hero3,
  'promo-gift.svg': promoGift,
  'about-1.svg': aboutStudio,
  ...Object.fromEntries(insta.map((s, i) => [`instagram/insta-${i + 1}.svg`, s])),
  ...Object.fromEntries(lifestyle.map((s, i) => [`lifestyle/lifestyle-${i + 1}.svg`, s])),
  ...Object.fromEntries(
    Object.entries(cats).map(([slug, s]) => [`categories/cat-${slug}.svg`, s]),
  ),
  ...Object.fromEntries(
    Object.entries(productArt).map(([slug, s]) => [`products/${slug}.svg`, s]),
  ),
}

let count = 0
for (const [rel, content] of Object.entries(files)) {
  const doc = typeof content === 'string' && content.startsWith('<svg') ? content : svgDoc(800, 800, content)
  writeFileSync(join(OUT, rel), doc, 'utf8')
  count++
}
console.log(`generated ${count} svg files in public/images`)
