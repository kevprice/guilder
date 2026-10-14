import { affinity } from './household-social.js';
import { equipmentBonus } from './equipment.js';
import { classWorkFactor, talentValue } from './classes.js';
export function effectiveWorkStat(c, stat) {
  return Math.floor(
    (c[stat] + equipmentBonus(c, stat) + talentValue(c, stat)) * classWorkFactor(c),
  );
}
export function workerContribution(c, stat, away = false) {
  const effective = effectiveWorkStat(c, stat),
    fit =
      (c.status === 'home' && !c.injury) || (away && c.status === 'away' && (c.injury || 0) < 3);
  return {
    id: c.id,
    name: c.name,
    status: c.status,
    stat: effective,
    fit,
    work: fit ? 1 + Math.min(4, Math.floor(effective / 10)) : 0,
  };
}

// The same contextual calculation serves forecasts, production and expedition labour.
export function crewContribution(s, residents, stat, { supervision = true, away = false } = {}) {
  const actual = residents.filter(Boolean);
  const workers = actual.map((c) => workerContribution(c, stat, away));
  const fit = actual.filter((c, i) => workers[i].fit);
  const supervisor =
    supervision && fit.find((c) => !c.injury && !c.undead && c.specialisation === 'necromancer');
  const supervised = supervisor
    ? fit
        .filter((c) => c.undead)
        .slice(0, 2)
        .map((c) => c.id)
    : [];
  const bonus = workers
    .filter((c) => supervised.includes(c.id))
    .reduce((n, c) => n + c.work * 2, 0);
  const living = fit.filter((c) => !c.undead);
  const opinions = living.flatMap((a, i) =>
    living.slice(i + 1).map((b) => affinity(s, a.id, b.id)),
  );
  const average = opinions.length ? opinions.reduce((a, b) => a + b, 0) / opinions.length : 0;
  const relationship = opinions.length ? (average >= 25 ? 1 : average <= -25 ? -1 : 0) : 0;
  const base = workers.reduce((n, c) => n + c.work, 0);
  const trainingPercent = away
    ? fit.reduce(
        (n, c) =>
          n +
          talentValue(c, 'work') +
          (fit.some((p) => p.undead) ? talentValue(c, 'zombieWork') : 0),
        0,
      )
    : 0;
  const training = Math.floor(((base + bonus) * trainingPercent) / 100);
  return {
    workers,
    base,
    training,
    supervision: bonus,
    relationship,
    affinity: average,
    supervisor: supervisor?.id || null,
    supervised,
    total: base ? Math.max(1, base + bonus + relationship + training) : 0,
  };
}
