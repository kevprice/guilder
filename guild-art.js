import {
  furnishings,
  facilitySite,
  facilityAvailable,
  utilityDefinition,
  dailyWork,
  productionPause,
  furniturePlacement,
} from './guild-management.js';

const art = {
  forge:
    '<path d="M16 54V25h32v29M20 25l4-12h16l4 12" fill="#535d67"/><path d="M24 48V33h16v15" fill="#211e23"/><path d="M29 46q-9-7 1-14-1 6 5 8 2-4 2-7 10 13-8 13" fill="#eaa763"/>',
  outfitter:
    '<path d="M10 37h44v7H10zm5 7h5v13h-5zm29 0h5v13h-5z" fill="#b69467"/><path d="M24 13l-8 7 6 8 4-4v13h14V24l4 4 5-8-10-7z" fill="#769aa1"/>',
  raisedBeds:
    '<path d="M8 37h48v18H8z" fill="#98724d"/><path d="M14 35l4-21 8 6-8 9m16 7V13l-10 7 10 5 10-10-1 14" stroke="#95bc87" fill="none" stroke-width="4"/>',
  cloche:
    '<path d="M12 52V35a20 20 0 0140 0v17z" fill="#8fced633" stroke="#b1dce0" stroke-width="3"/><path d="M8 53h48M30 48V30l-8 3 8 7 8-8" fill="none" stroke="#87bc84" stroke-width="4"/>',
  treatmentBed:
    '<path d="M8 34h48v17H8z" fill="#d4d3b9"/><path d="M8 20v38m48-28v28" stroke="#889ba4" stroke-width="4"/><path d="M13 28h13v8H13" fill="#eae4cd"/><path d="M39 31v14m-7-7h14" stroke="#a25f63" stroke-width="3"/>',
  medicalCabinet:
    '<path d="M14 10h36v46H14z" fill="#738c8b"/><path d="M18 14h28v17H18zm0 22h28v15H18z" fill="#24333e"/><path d="M31 15v14m-7-7h14" stroke="#cda6a0" stroke-width="3"/><path d="M23 40h6v8h-6m12-8h6v8h-6" fill="#b4ccba"/>',
  banner:
    '<path d="M17 8h30v38L32 58 17 46z" fill="#789f9c"/><path d="M32 20l8 10-8 12-8-12z" fill="#ecd7a6"/>',
  rug: '<path d="M10 16h44v38H10z" fill="#985c60"/><path d="M15 21h34v28H15zM32 24l10 11-10 11-10-11z" fill="none" stroke="#d4b787" stroke-width="2"/>',
  plant:
    '<path d="M20 43h24l-4 14H24z" fill="#b48c66"/><path d="M32 43V17m0 16Q10 33 16 16q19 0 16 17m0-7Q54 24 48 10q-17 0-16 16" stroke="#a6ca8e" fill="#668969" stroke-width="2"/>',
  shelf:
    '<path d="M10 8h44v49H10z" fill="#91714f"/><path d="M15 13h34v14H15zm0 19h34v18H15z" fill="#263443"/><path d="M20 14v12m6-12v12m7-12v12m8-12v12m-22 8v15m8-15v15m8-15v15m8-15v15" stroke="#b7c5ac" stroke-width="4"/>',
  jailerFaceplate:
    '<path d="M18 9h28l7 27-21 22-21-22z" fill="#98a5af"/><path d="M18 28l10 2m8 0l10-2M24 42h16" stroke="#26313a" stroke-width="4"/>',
  ratTrophy:
    '<path d="M14 51h36v8H14z" fill="#a88760"/><path d="M17 45l4-19 21-1 8 18-17 10z" fill="#94816e"/><circle cx="21" cy="22" r="8" fill="#b09885"/><circle cx="42" cy="21" r="8" fill="#b09885"/><path d="M23 32h3m11 0h3" stroke="#241e23" stroke-width="4"/><path d="M28 42h7l-4 5z" fill="#cfc3a5"/>',
};
export function furnitureIcon(id, esc = (s) => s) {
  const def = furnishings.find((f) => f.id === id);
  return `<svg class="furniture-icon" viewBox="0 0 64 64" role="img" aria-label="${esc(def?.name || 'Furniture')}">${art[def?.baseArt || id] || ''}${def?.upgrade ? '<path d="M12 49h40M15 53h34" stroke="#ddbb74" stroke-width="3"/>' : ''}${def?.id === 'hornboundForge' ? '<path d="M16 27l-7-13 4-9m35 22 7-13-4-9" stroke="#e0c596" stroke-width="3" fill="none"/>' : ''}${def?.enchantment ? '<path d="M32 18l7 10-7 10-7-10z" fill="none" stroke="#8bd2dc" stroke-width="2"/>' : ''}</svg>`;
}
export function renderGuildRewards(ids, esc, s = null) {
  return (ids || [])
    .map((id) => {
      const f = furnishings.find((f) => f.id === id);
      const available = s?.guild.furniture
        .filter((i) => i.id === id && !furniturePlacement(s, i.uid))
        .at(-1);
      return `<div class="guild-reward">${furnitureIcon(id, esc)}<div><strong>${esc(f.name)}</strong><p>${esc(f.effect)}</p>${available ? `<p>Added to furniture storage · ready to place.</p><button data-action="rewardFurniture:${available.uid}">Place ${esc(f.name)} →</button>` : ''}</div></div>`;
    })
    .join('');
}

// Fixed back-wall zones leave walkways, doorways, stairs and story interaction points clear.
export function furnishingZones(s, rooms) {
  const zones = [];
  for (const id of ['workshop', 'garden', 'infirmary']) {
    const site = facilitySite(s, id);
    if (!site) continue;
    const r = rooms.find((r) => r.id === site);
    const x =
      site === 'service' ? 814 : r.x + (site === 'garden' && id === 'infirmary' ? 104 : 188);
    zones.push({
      id,
      site,
      x,
      y: 231,
      w: site === 'service' ? 102 : site === 'garden' && id === 'infirmary' ? 76 : 90,
      h: 18,
    });
  }
  return zones;
}
export function furnitureFootprints(zone) {
  if (zone.site === 'service')
    return [
      { x: 818, y: 327, w: 28, h: 50 },
      { x: 817, y: 250, w: 25, h: 45 },
      { x: 891, y: 249, w: 25, h: 45 },
    ];
  const roomX = zone.id === 'infirmary' && zone.site === 'garden' ? zone.x - 104 : zone.x - 188;
  if (zone.site === 'garden' && zone.id === 'infirmary')
    return [
      { x: roomX + 48, y: 304, w: 32, h: 42 },
      { x: roomX + 16, y: 250, w: 25, h: 45 },
      { x: roomX + 83, y: 250, w: 25, h: 45 },
    ];
  return [
    { x: roomX + 249, y: 326, w: 32, h: 51 },
    { x: roomX + 110, y: 250, w: 25, h: 45 },
    { x: roomX + 153, y: 250, w: 25, h: 45 },
  ];
}
export function paintFurniture(ctx, id, footprint, camera, time = 0, active = false) {
  const definition = furnishings.find((f) => f.id === id);
  id = definition?.baseArt || id;
  ctx.save();
  ctx.translate(footprint.x - camera, footprint.y);
  ctx.scale(footprint.w / 64, footprint.h / 64);
  const box = (x, y, w, h, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  };
  const line = (points, color, width = 3) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke();
  };
  if (id === 'forge') {
    box(18, 5, 28, 20, '#6d7882');
    box(8, 25, 48, 36, '#5b6570');
    box(18, 35, 28, 20, '#212730');
    box(25, 42, 16, 11, '#dfa468');
    line(
      [
        [28, 48],
        [32, 36],
        [36, 48],
      ],
      '#f2d48c',
      4,
    );
  } else if (id === 'outfitter') {
    box(5, 37, 54, 8, '#b29162');
    box(10, 45, 5, 16, '#856b51');
    box(49, 45, 5, 16, '#856b51');
    box(23, 7, 19, 30, '#81999d');
    line(
      [
        [18, 11],
        [10, 22],
        [19, 27],
      ],
      '#9bb2ad',
      7,
    );
    box(45, 32, 9, 5, '#e0c98f');
  } else if (id === 'raisedBeds' || id === 'plant') {
    box(id === 'plant' ? 14 : 4, 42, id === 'plant' ? 36 : 56, 19, '#a57c52');
    for (const x of id === 'plant' ? [32] : [16, 33, 48]) {
      line(
        [
          [x, 42],
          [x, 10],
        ],
        '#739568',
        3,
      );
      line(
        [
          [x, 22],
          [x - 9, 13],
          [x - 10, 21],
          [x, 30],
          [x + 9, 20],
        ],
        '#9fbd7e',
        5,
      );
    }
  } else if (id === 'cloche') {
    ctx.fillStyle = '#8cd4d32b';
    ctx.beginPath();
    ctx.roundRect(6, 7, 52, 49, [26, 26, 0, 0]);
    ctx.fill();
    ctx.strokeStyle = '#b1d4cc';
    ctx.lineWidth = 3;
    ctx.stroke();
    box(4, 55, 56, 6, '#ac946c');
    line(
      [
        [31, 55],
        [31, 26],
        [23, 35],
        [39, 38],
      ],
      '#83b57b',
      4,
    );
  } else if (id === 'treatmentBed') {
    box(5, 24, 54, 22, '#b6bba5');
    box(8, 19, 17, 10, '#e3dcc6');
    line(
      [
        [4, 12],
        [4, 61],
      ],
      '#879b9a',
      5,
    );
    line(
      [
        [60, 24],
        [60, 61],
      ],
      '#879b9a',
      5,
    );
    line(
      [
        [37, 28],
        [37, 42],
      ],
      '#a46b65',
      4,
    );
    line(
      [
        [30, 35],
        [44, 35],
      ],
      '#a46b65',
      4,
    );
  } else if (id === 'medicalCabinet' || id === 'shelf') {
    box(8, 3, 48, 58, '#8f947e');
    box(13, 9, 38, 20, '#293b44');
    box(13, 34, 38, 20, '#293b44');
    if (id === 'medicalCabinet') {
      line(
        [
          [32, 12],
          [32, 26],
        ],
        '#e0bfaa',
        4,
      );
      line(
        [
          [24, 19],
          [40, 19],
        ],
        '#e0bfaa',
        4,
      );
      box(19, 42, 6, 9, '#8ca993');
      box(34, 39, 9, 12, '#d2c9a3');
    } else
      for (const x of [19, 29, 39]) {
        box(x, 12, 6, 16, '#b6c396');
        box(x, 38, 6, 15, '#a99780');
      }
  } else if (id === 'banner') {
    line(
      [
        [8, 3],
        [56, 3],
      ],
      '#c3b289',
      4,
    );
    ctx.fillStyle = '#629691';
    ctx.beginPath();
    ctx.moveTo(12, 6);
    ctx.lineTo(52, 6);
    ctx.lineTo(52, 46);
    ctx.lineTo(32, 61);
    ctx.lineTo(12, 46);
    ctx.fill();
    line(
      [
        [32, 18],
        [41, 31],
        [32, 45],
        [23, 31],
        [32, 18],
      ],
      '#e0ce9c',
      3,
    );
  } else if (id === 'rug') {
    box(4, 8, 56, 49, '#925d63');
    ctx.strokeStyle = '#c9aa7b';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 14, 44, 37);
    line(
      [
        [32, 19],
        [44, 32],
        [32, 47],
        [20, 32],
        [32, 19],
      ],
      '#d7b780',
      3,
    );
  } else if (id === 'jailerFaceplate') {
    ctx.fillStyle = '#8d9ca7';
    ctx.beginPath();
    [
      [16, 4],
      [48, 4],
      [57, 37],
      [32, 61],
      [7, 37],
    ].forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.fill();
    line(
      [
        [17, 27],
        [28, 30],
      ],
      '#27323b',
      5,
    );
    line(
      [
        [36, 30],
        [47, 27],
      ],
      '#27323b',
      5,
    );
    line(
      [
        [24, 45],
        [40, 45],
      ],
      '#27323b',
      3,
    );
  } else if (id === 'ratTrophy') {
    box(9, 52, 46, 9, '#a58762');
    ctx.fillStyle = '#9a8777';
    ctx.beginPath();
    ctx.ellipse(32, 36, 18, 21, 0, 0, Math.PI * 2);
    ctx.fill();
    for (const x of [17, 47]) {
      ctx.beginPath();
      ctx.arc(x, 17, 9, 0, Math.PI * 2);
      ctx.fill();
    }
    box(23, 28, 4, 5, '#2c2930');
    box(38, 28, 4, 5, '#2c2930');
    box(29, 43, 7, 5, '#d1c5a6');
  }
  if (definition?.upgrade) {
    if (id === 'forge') {
      box(10, 28, 5, 31, '#a5b3be');
      box(49, 28, 5, 31, '#a5b3be');
      box(14, 54, 36, 4, '#c2a36e');
    } else if (id === 'raisedBeds') {
      line(
        [
          [6, 43],
          [6, 37],
          [57, 37],
          [57, 43],
        ],
        '#95bdc5',
        3,
      );
      box(52, 23, 7, 18, '#7796a0');
    }
  }
  if (definition?.id === 'hornboundForge') {
    line(
      [
        [18, 26],
        [11, 16],
        [11, 8],
        [5, 13],
      ],
      '#d8c091',
      3,
    );
    line(
      [
        [46, 26],
        [53, 16],
        [53, 8],
        [59, 13],
      ],
      '#d8c091',
      3,
    );
  }
  if (definition?.enchantment) {
    const pulse = active ? 0.68 + Math.sin(time * 2.4) * 0.2 : 0.45;
    const y = id === 'forge' ? 43 : id === 'raisedBeds' || id === 'plant' ? 51 : 30;
    ctx.globalAlpha = pulse;
    ctx.shadowColor = '#8bd2dc';
    ctx.shadowBlur = active ? 7 : 0;
    line(
      [
        [32, y - 6],
        [37, y],
        [32, y + 6],
        [27, y],
        [32, y - 6],
      ],
      '#a4e4dc',
      2,
    );
    if (id === 'forge' && active) box(27, 43, 10, 8, '#a4e4dc');
    if ((id === 'raisedBeds' || id === 'plant') && active)
      for (const x of [19, 34, 46]) box(x, 17 + Math.sin(time + x) * 2, 3, 3, '#d8ebb6');
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }
  ctx.restore();
}
export function paintGuildFurnishings(ctx, camera, s, rooms, time, labels = true) {
  for (const zone of furnishingZones(s, rooms)) {
    const f = s.guild.facilities[zone.id],
      sx = zone.x - camera;
    const symbols = [
      utilityDefinition(s, zone.id)?.id,
      ...f.decorations.map((uid) => s.guild.furniture.find((i) => i.uid === uid)?.id),
    ];
    const footprints = furnitureFootprints(zone);
    ctx.save();
    symbols.forEach((id, i) => {
      if (id)
        paintFurniture(
          ctx,
          id,
          footprints[i],
          camera,
          time,
          !!f.project &&
            dailyWork(
              s,
              zone.id,
              f.project ? { category: zone.id === 'garden' ? 'crop' : undefined } : null,
            ) > 0,
        );
    });
    if (!labels) {
      ctx.restore();
      continue;
    }
    // Work labels sit above wall decorations and leave door captions and interaction points clear.
    ctx.fillStyle = '#11262bcc';
    ctx.fillRect(sx, zone.y, zone.w, 8);
    ctx.fillRect(sx, zone.y + 10, zone.w, 8);
    ctx.font = '7px sans-serif';
    ctx.fillStyle = '#e4d3ae';
    ctx.fillText(zone.id.toUpperCase() + ' · T' + f.tier, sx + 4, zone.y + 7);
    ctx.fillStyle = facilityAvailable(s, zone.id) ? '#b1d9cc' : '#d2a597';
    const active = !!f.project,
      paused = productionPause(s, zone.id);
    ctx.fillText(
      paused
        ? zone.id === 'garden' && paused === 'Supply reserve met'
          ? 'RESERVE READY'
          : 'WORK PAUSED'
        : active
          ? facilityAvailable(s, zone.id)
            ? 'WORK ' + f.project.progress + '/' + f.project.work
            : 'WORK PAUSED'
          : zone.id === 'garden'
            ? 'NEXT CROP READY'
            : 'READY FOR WORK',
      sx + 4,
      zone.y + 17,
    );
    if (active && dailyWork(s, zone.id) > 0) {
      ctx.fillStyle = '#e6c78b';
      ctx.beginPath();
      ctx.arc(sx + zone.w - 7, zone.y + 4, 2 + Math.sin(time * 3) * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}
