/* ==========================================================
   z_studio_crochet : données des créations + illustrations
   ----------------------------------------------------------
   Pour mettre une vraie photo sur une création, ajoute
   photo: 'mon-image.jpg' dans sa fiche ci-dessous :
   la photo remplace alors le dessin partout sur le site.
   ========================================================== */
const ZSC = (() => {
  const INK = '#4A2C35';

  /* ---------- Les créations (à remplacer par les tiennes) ---------- */
  const CATS = [
    { id: 'doudous', label: 'Doudous' },
    { id: 'accessoires', label: 'Accessoires' },
    { id: 'maison', label: 'Maison' },
    { id: 'vetements', label: 'Vêtements' }
  ];

  const CREATIONS = [
    { id: 'ourson', name: 'Ourson Guimauve', cat: 'doudous', kind: 'bear', colors: ['#E9CDB5', '#FFF4E6', '#F49AB2'], bg: '#FCE7EA', matiere: 'Coton doux', isNew: true,
      desc: 'Un ourson tout rond, avec son nœud et ses joues roses. Le compagnon idéal des siestes et des câlins.' },
    { id: 'panda', name: 'Panda Dragée', cat: 'doudous', kind: 'bear', colors: ['#EFC3C6', '#FFFFFF', '#F49AB2'], bg: '#FCE7EA', matiere: 'Fil chenille velours',
      photo: 'images/panda-dragee.jpg',
      desc: 'Un petit panda rose et blanc, les bras grands ouverts pour un câlin. Tout moelleux, il tient dans le creux de la main.' },
    { id: 'requin', name: 'Requin Bleuet', cat: 'doudous', colors: ['#7E9BDB', '#FFFFFF', '#C9CDD6'], bg: '#E8EEF8', matiere: 'Fil chenille velours',
      photo: 'images/requin-bleuet.jpg',
      desc: 'Un requin bleu au ventre blanc et aux petites dents, qui n’a de féroce que l’allure. Parfait pour les amoureux de l’océan.' },
    { id: 'bonnet', name: 'Bonnet Nuage', cat: 'accessoires', kind: 'beanie', colors: ['#F6C1CE', '#F9DCE3', '#D9C9F2'], bg: '#FFF1E8', matiere: 'Laine douce', isNew: true,
      desc: 'Un bonnet à côtes surmonté d’un gros pompon, pour les matins frais et les balades d’hiver.' },
    { id: 'granny', name: 'Carré Granny', cat: 'maison', kind: 'granny', colors: ['#F6C1CE', '#D9C9F2', '#FCEBB0'], bg: '#FFF8EC', matiere: 'Coton et laine',
      desc: 'Le motif granny en version pastel, à poser sur un fauteuil ou à assembler pour créer un plaid.' },
    { id: 'chouchous', name: 'Duo de chouchous', cat: 'accessoires', kind: 'scrunchie', colors: ['#F6C1CE', '#CBEBD9', '#FFF4E6'], bg: '#FFF6F0', matiere: 'Coton mercerisé',
      desc: 'Deux chouchous bien froncés, doux pour les cheveux et assortis à toutes les tenues.' },
    { id: 'bouquet', name: 'Bouquet Éternel', cat: 'maison', kind: 'bouquet', colors: ['#F49AB2', '#FFF4E6', '#D9C9F2'], bg: '#FDF0F3', matiere: 'Coton', isNew: true,
      desc: 'Des fleurs au crochet qui ne fanent jamais, à offrir ou à garder sur sa table de chevet.' },
    { id: 'plaid', name: 'Plaid Cocon', cat: 'maison', kind: 'blanket', colors: ['#F9DCE3', '#FFF4E6', '#D9C9F2'], bg: '#F3EEFB', matiere: 'Laine douce',
      desc: 'Une couverture moelleuse aux carrés pastel, pour les soirées sous la couette avec un chocolat chaud.' },
    { id: 'coeur', name: 'Porte-clés Cœur', cat: 'accessoires', kind: 'heart', colors: ['#F49AB2', '#FFD3DE', '#FFF4E6'], bg: '#FFF8EC', matiere: 'Coton',
      desc: 'Un petit cœur souriant à accrocher à ses clés ou à son sac. Une jolie idée de cadeau.' },
    { id: 'cardigan', name: 'Cardigan Dragée', cat: 'vetements', kind: 'cardigan', colors: ['#F9DCE3', '#FFF4E6', '#E46A8C'], bg: '#FCEFF2', matiere: 'Laine douce',
      desc: 'Un gilet au point bobble, tout doux et un brin rétro, avec ses boutons framboise.' },
    { id: 'panier', name: 'Panier à pelotes', cat: 'maison', kind: 'basket', colors: ['#E9CDB5', '#F6C1CE', '#D9C9F2'], bg: '#FFF4E6', matiere: 'Coton épais',
      desc: 'Un panier rayé pour ranger pelotes, crochets et petits trésors, à poser au pied du canapé.' },
    { id: 'bob', name: 'Bob Fraise', cat: 'vetements', kind: 'bucket', colors: ['#F6A9BC', '#F9DCE3', '#FFF4E6'], bg: '#EEF7F1', matiere: 'Coton',
      desc: 'Un bob tout rond façon fraise, avec ses petites feuilles, pour les beaux jours.' }
  ];

  /* Couleurs proposées dans les commandes sur mesure */
  const SWATCHES = [
    { name: 'Rose dragée', hex: '#F6C1CE' }, { name: 'Rose poudré', hex: '#F9DCE3' },
    { name: 'Framboise', hex: '#E46A8C' }, { name: 'Lilas', hex: '#D9C9F2' },
    { name: 'Lavande', hex: '#BFA9E6' }, { name: 'Pêche', hex: '#FFD3BC' },
    { name: 'Crème', hex: '#FFF4E6' }, { name: 'Latte', hex: '#E9CDB5' },
    { name: 'Menthe', hex: '#CBEBD9' }, { name: 'Ciel', hex: '#CFE3F7' },
    { name: 'Beurre', hex: '#FCEBB0' }, { name: 'Nuage', hex: '#F2EEEE' }
  ];

  /* ---------- Outils de dessin ---------- */
  function mix(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const t = amt < 0 ? 0 : 255, p = Math.abs(amt);
    const ch = (v) => Math.round(v + (t - v) * p);
    const r = ch(n >> 16), g = ch((n >> 8) & 255), b = ch(n & 255);
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }
  const layer = (tag, attrs, fill, pat) =>
    `<${tag} ${attrs} fill="${fill}"/>` + (pat ? `<${tag} ${attrs} fill="url(#zsc-${pat})"/>` : '');
  const P = (d, fill, pat) => layer('path', `d="${d}"`, fill, pat);
  const C = (cx, cy, r, fill, pat) => layer('circle', `cx="${cx}" cy="${cy}" r="${r}"`, fill, pat);
  const E = (cx, cy, rx, ry, fill, pat, rot) =>
    layer('ellipse', `cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"${rot ? ` transform="rotate(${rot} ${cx} ${cy})"` : ''}`, fill, pat);
  const R = (x, y, w, h, rx, fill, pat) => layer('rect', `x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"`, fill, pat);
  const line = (d, col, w) => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const shadow = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="13" fill="${INK}" fill-opacity=".07"/>`;
  const eyes = (x1, x2, y, r) => C(x1, y, r, INK) + C(x2, y, r, INK) + C(x1 + 2.4, y - 2.4, r * .3, '#fff') + C(x2 + 2.4, y - 2.4, r * .3, '#fff');
  const cheeks = (x1, x2, y, col) => `<ellipse cx="${x1}" cy="${y}" rx="13" ry="8" fill="${col}" fill-opacity=".75"/><ellipse cx="${x2}" cy="${y}" rx="13" ry="8" fill="${col}" fill-opacity=".75"/>`;
  const mouth = (x, y) => line(`M${x} ${y - 9} V${y} M${x - 11} ${y} Q${x - 5.5} ${y + 8} ${x} ${y} Q${x + 5.5} ${y + 8} ${x + 11} ${y}`, INK, 3.2);
  const smile = (x, y, w) => line(`M${x - w} ${y} q${w} ${w * .9} ${w * 2} 0`, INK, 3.2);
  const heartPath = (cx, cy, s) =>
    `<path transform="translate(${cx} ${cy}) scale(${s})" d="M0 8 C-12 0 -16 -6 -16 -11 C-16 -17 -11 -20 -7 -20 C-3 -20 -1 -17 0 -15 C1 -17 3 -20 7 -20 C11 -20 16 -17 16 -11 C16 -6 12 0 0 8 Z"`;
  const heart = (cx, cy, s, fill) => `${heartPath(cx, cy, s)} fill="${fill}"/>`;
  const flower = (x, y, petal, center, r = 11) => {
    let s = '';
    for (let i = 0; i < 5; i++) {
      const a = (i * 72 - 90) * Math.PI / 180;
      s += C((x + Math.cos(a) * r * 1.2).toFixed(1), (y + Math.sin(a) * r * 1.2).toFixed(1), r, petal);
    }
    return s + C(x, y, r * .72, center);
  };
  const daisy = (x, y, petal, center) => {
    let s = '';
    for (let i = 0; i < 8; i++) s += `<ellipse cx="${x}" cy="${y - 17}" rx="8.5" ry="16" fill="${petal}" transform="rotate(${i * 45} ${x} ${y})"/>`;
    return s + C(x, y, 11, center);
  };
  const wavyRing = (cx, cy, Ro, Ri, waves, amp) => {
    const pts = (rad, a2, phase) => {
      const out = [];
      for (let i = 0; i <= 120; i++) {
        const t = i / 120 * Math.PI * 2;
        const r = rad + a2 * Math.sin(waves * t + phase);
        out.push(`${(cx + Math.cos(t) * r).toFixed(1)} ${(cy + Math.sin(t) * r).toFixed(1)}`);
      }
      return 'M' + out.join(' L') + ' Z';
    };
    return pts(Ro, amp, 0) + ' ' + pts(Ri, amp * .45, Math.PI);
  };

  /* ---------- Les dessins ---------- */
  const KINDS = {
    bear: ([a, b, c]) =>
      shadow(200, 358, 118) +
      E(150, 336, 36, 25, a, 'st') + E(250, 336, 36, 25, a, 'st') +
      E(200, 286, 90, 74, a, 'st') + E(200, 300, 48, 42, b) +
      E(120, 266, 26, 42, a, 'st', 28) + E(280, 266, 26, 42, a, 'st', -28) +
      E(150, 344, 19, 12, b) + E(250, 344, 19, 12, b) +
      C(126, 104, 34, a, 'st') + C(274, 104, 34, a, 'st') + C(126, 104, 18, b) + C(274, 104, 18, b) +
      C(200, 165, 94, a, 'st') + E(200, 198, 40, 30, b) +
      E(200, 186, 12, 8.5, INK) + mouth(200, 204) +
      eyes(164, 236, 158, 7) + cheeks(146, 254, 192, c) +
      P('M200 250 L166 232 Q160 250 166 268 Z', c) + P('M200 250 L234 232 Q240 250 234 268 Z', c) + C(200, 250, 10, mix(c, -.12)),

    bunny: ([a, b, c]) =>
      shadow(200, 360, 108) +
      E(165, 94, 27, 72, a, 'st', -10) + E(235, 94, 27, 72, a, 'st', 10) +
      E(165, 100, 12, 50, b, null, -10) + E(235, 100, 12, 50, b, null, 10) +
      E(156, 342, 32, 20, a, 'st') + E(244, 342, 32, 20, a, 'st') +
      E(200, 296, 82, 66, a, 'st') + E(200, 306, 44, 40, b) +
      E(128, 284, 22, 36, a, 'st', 24) + E(272, 284, 22, 36, a, 'st', -24) +
      C(200, 182, 84, a, 'st') +
      eyes(170, 230, 180, 6.5) + P('M191 195 L209 195 L200 205 Z', c) + mouth(200, 213) +
      cheeks(148, 252, 204, c) +
      P('M126 244 Q200 274 274 244 L278 262 Q200 294 122 262 Z', c, 'rib') +
      P('M232 266 L260 260 L262 320 L238 318 Z', c, 'rib'),

    beanie: ([a, b, c]) =>
      shadow(200, 356, 124) +
      C(200, 96, 44, c, 'dot') +
      `<circle cx="200" cy="96" r="44" fill="none" stroke="${c}" stroke-width="12" stroke-dasharray="2 6" stroke-linecap="round"/>` +
      P('M100 296 C100 176 146 132 200 132 C254 132 300 176 300 296 Z', a, 'rib') +
      R(88, 276, 224, 68, 18, b, 'rib') +
      heart(254, 314, 0.9, mix(a, -.18)),

    granny: ([a, b, c]) => {
      const ring = (x, w, col, r) =>
        R(x, x, w, w, r, col, 'st') +
        `<rect x="${x + 9}" y="${x + 9}" width="${w - 18}" height="${w - 18}" rx="${r * .6}" fill="none" stroke="${mix(col, -.16)}" stroke-width="3" stroke-dasharray="20 9"/>`;
      return shadow(200, 352, 128) +
        `<g transform="rotate(-7 200 200)">` +
        ring(66, 268, a, 28) + ring(100, 200, b, 20) + ring(132, 136, c, 14) +
        R(160, 160, 80, 80, 10, '#FFF8F2') + flower(200, 200, a, mix(c, -.1), 13) + `</g>`;
    },

    bag: ([a, b, c]) => {
      let rows = '';
      [214, 252, 290, 328].forEach((y) => {
        const left = 104 - (y - 176) * 18 / 154 + 6, right = 296 + (y - 176) * 18 / 154 - 6;
        const n = Math.floor((right - left) / 24), x0 = (left + right) / 2 - n * 12;
        rows += line(`M${x0.toFixed(1)} ${y}` + ' a12 12 0 0 1 24 0'.repeat(n), mix(a, -.2), 3);
      });
      return shadow(200, 360, 124) +
        line('M148 178 C148 82 252 82 252 178', mix(c, -.05), 18) +
        P('M104 176 H296 L314 330 Q316 352 294 352 H106 Q84 352 86 330 Z', a) + rows +
        R(100, 166, 200, 28, 10, b, 'rib') + flower(252, 296, b, mix(c, -.12), 12);
    },

    scrunchie: ([a, b]) => {
      const gathers = (cx, cy, Ro, Ri, waves, col) => {
        let s = '';
        for (let i = 0; i < waves; i++) {
          const t = (i / waves) * Math.PI * 2 + (Math.PI * 1.5) / waves;
          const c1 = Math.cos(t), s1 = Math.sin(t);
          s += line(`M${(cx + c1 * (Ri + 8)).toFixed(1)} ${(cy + s1 * (Ri + 8)).toFixed(1)} L${(cx + c1 * (Ro - 14)).toFixed(1)} ${(cy + s1 * (Ro - 14)).toFixed(1)}`, col, 3);
        }
        return s;
      };
      return shadow(214, 356, 136) +
        `<path d="${wavyRing(266, 262, 80, 34, 15, 5)}" fill="${b}" fill-rule="evenodd"/>` +
        `<path d="${wavyRing(266, 262, 80, 34, 15, 5)}" fill="url(#zsc-st)" fill-rule="evenodd"/>` +
        gathers(266, 262, 80, 34, 15, mix(b, -.16)) +
        `<path d="${wavyRing(164, 170, 104, 44, 18, 6)}" fill="${a}" fill-rule="evenodd"/>` +
        `<path d="${wavyRing(164, 170, 104, 44, 18, 6)}" fill="url(#zsc-st)" fill-rule="evenodd"/>` +
        gathers(164, 170, 104, 44, 18, mix(a, -.16));
    },

    bouquet: ([a, b, c]) =>
      shadow(200, 364, 92) +
      line('M200 300 L200 128 M200 300 L140 156 M200 300 L262 150 M200 300 L120 222 M200 300 L284 212', '#8FBF9A', 7) +
      E(164, 226, 12, 28, '#A8D5B0', null, -38) + E(238, 222, 12, 28, '#A8D5B0', null, 38) +
      C(120, 220, 12, b) + C(284, 210, 12, mix(a, .35)) +
      daisy(140, 152, b, '#F6D27A') + daisy(264, 146, mix(a, .4), '#F6D27A') +
      P('M174 98 Q176 140 200 144 Q224 140 226 98 L213 112 L200 90 L187 112 Z', a, 'st') +
      P('M124 240 L276 240 L224 364 L176 364 Z', c, 'st') +
      P('M124 240 L200 262 L276 240 L270 256 L200 280 L130 256 Z', mix(c, -.1)) +
      E(184, 306, 18, 10, mix(a, -.08), null, -20) + E(216, 306, 18, 10, mix(a, -.08), null, 20) +
      line('M198 310 L186 336 M202 310 L214 336', mix(a, -.08), 6) + C(200, 307, 7, mix(a, -.18)),

    blanket: ([a, b, c]) => {
      const fold = (x, y, w, h, col) =>
        R(x, y, w, h, 22, col, 'st') +
        line(`M${x + 28} ${y + 7} Q${x + 10} ${y + h / 2} ${x + 28} ${y + h - 7}`, mix(col, -.2), 3) +
        line(`M${x + w - 28} ${y + 7} Q${x + w - 10} ${y + h / 2} ${x + w - 28} ${y + h - 7}`, mix(col, -.2), 3);
      let squares = '';
      const cols = [a, c, mix(a, -.12), c];
      for (let i = 0; i < 4; i++) squares += R(132 + i * 36, 210, 26, 26, 5, cols[i]);
      return shadow(200, 352, 138) +
        fold(78, 262, 244, 78, a) + fold(92, 192, 216, 72, b) + squares +
        fold(106, 126, 188, 68, c) + heart(200, 160, 1, mix(a, -.18));
    },

    heart: ([a, b]) =>
      shadow(200, 356, 92) +
      `<circle cx="200" cy="66" r="25" fill="none" stroke="#CDBFC4" stroke-width="7"/>` +
      `<ellipse cx="200" cy="106" rx="7" ry="11" fill="none" stroke="#CDBFC4" stroke-width="5"/>` +
      `<ellipse cx="200" cy="128" rx="7" ry="11" fill="none" stroke="#CDBFC4" stroke-width="5"/>` +
      `<ellipse cx="200" cy="150" rx="8" ry="12" fill="none" stroke="${mix(a, -.1)}" stroke-width="5"/>` +
      P('M200 340 C126 286 88 248 88 204 C88 166 116 142 148 142 C172 142 190 156 200 174 C210 156 228 142 252 142 C284 142 312 166 312 204 C312 248 274 286 200 340 Z', a, 'st') +
      eyes(170, 230, 222, 6.5) + smile(200, 240, 9) + cheeks(148, 252, 242, b),

    cardigan: ([a, b, c]) =>
      shadow(200, 360, 132) +
      P('M106 128 L64 160 Q50 230 46 300 L88 306 Q96 240 106 196 Z', a, 'st') +
      P('M294 128 L336 160 Q350 230 354 300 L312 306 Q304 240 294 196 Z', a, 'st') +
      P('M46 300 L88 306 L86 332 L44 326 Z', b, 'rib') + P('M354 300 L312 306 L314 332 L356 326 Z', b, 'rib') +
      P('M106 128 Q140 114 166 106 L200 172 L234 106 Q260 114 294 128 L300 322 L100 322 Z', a, 'dot') +
      R(124, 248, 48, 44, 8, mix(a, -.05), 'st') + R(228, 248, 48, 44, 8, mix(a, -.05), 'st') +
      R(96, 314, 208, 32, 9, b, 'rib') +
      line('M166 106 L200 172 L200 344 M234 106 L200 172', b, 12) +
      C(200, 200, 7, c) + C(200, 240, 7, c) + C(200, 280, 7, c),

    basket: ([a, b, c]) =>
      shadow(200, 362, 124) +
      C(160, 168, 44, b) + line('M122 156 Q160 136 198 166 M118 180 Q160 158 202 188 M142 128 Q172 158 168 210', mix(b, -.18), 3) +
      C(238, 160, 40, c) + line('M204 150 Q240 132 274 158 M202 174 Q240 154 278 180 M226 124 Q252 152 246 198', mix(c, -.18), 3) +
      line('M282 84 L232 196', '#E8C07A', 7) + C(282, 84, 6, '#E8C07A') +
      P('M106 186 H294 L282 336 Q280 354 262 354 H138 Q120 354 118 336 Z', a, 'st') +
      P('M111 246 H289 L286 276 H114 Z', b, 'st') + P('M115 296 H285 L284 312 H116 Z', c) +
      line('M100 218 q-26 4 -22 24 q4 18 28 12', mix(a, -.12), 10) +
      line('M300 218 q26 4 22 24 q-4 18 -28 12', mix(a, -.12), 10) +
      R(94, 172, 212, 30, 15, mix(a, -.06), 'rib'),

    bucket: ([a, b, c]) => {
      const seeds = [[170, 160], [214, 148], [236, 182], [186, 196], [158, 204], [222, 210], [200, 172], [246, 210]]
        .map(([x, y]) => E(x, y, 3, 5, c)).join('');
      return shadow(200, 344, 142) +
        P('M132 238 C130 156 160 122 200 122 C240 122 270 156 268 238 Z', a, 'st') + seeds +
        P('M200 126 Q176 98 156 112 Q176 118 200 126 Z', '#9ACBA4') + P('M200 126 Q224 98 244 112 Q224 118 200 126 Z', '#9ACBA4') +
        P('M200 126 Q196 104 206 94 Q208 112 200 126 Z', '#8FBF9A') +
        P('M131 214 H269 L270 240 H130 Z', mix(a, -.14), 'rib') +
        P('M70 262 Q200 206 330 262 Q342 288 312 296 Q200 262 88 296 Q58 288 70 262 Z', b, 'st');
    }
  };

  const DEFS = `<svg width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false"><defs>
<pattern id="zsc-st" width="14" height="11" patternUnits="userSpaceOnUse"><path d="M2 2.5 L7 8.5 L12 2.5" fill="none" stroke="${INK}" stroke-opacity=".15" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></pattern>
<pattern id="zsc-rib" width="9" height="12" patternUnits="userSpaceOnUse"><path d="M4.5 0 V12" stroke="${INK}" stroke-opacity=".12" stroke-width="3"/></pattern>
<pattern id="zsc-dot" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="3" fill="#fff" fill-opacity=".45"/><circle cx="13" cy="13" r="3" fill="#fff" fill-opacity=".45"/></pattern>
</defs></svg>`;

  function illus(kind, colors) {
    const f = KINDS[kind] || KINDS.granny;
    return `<svg class="illus" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${f(colors)}</svg>`;
  }
  /* Photo si elle existe, sinon le dessin */
  function media(item, colors) {
    if (item.photo) return `<img class="illus" src="${item.photo}" alt="${item.name}" loading="lazy">`;
    return illus(item.kind, colors || item.colors);
  }
  function mountDefs() {
    if (!document.getElementById('zsc-defs')) {
      const holder = document.createElement('div');
      holder.id = 'zsc-defs';
      holder.innerHTML = DEFS;
      document.body.prepend(holder);
    }
  }
  const catLabel = (id) => (CATS.find((c) => c.id === id) || {}).label || '';
  const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

  return { CATS, CREATIONS, SWATCHES, illus, media, mountDefs, catLabel, mix, esc, KINDS };
})();

