import * as D from './domain.js';
import { missionCategory } from './mission-categories.js';
function storyChoices(s) {
  return [...D.availableChoices(s), ...s.roster.flatMap((c) => D.availableChoices(s, c.id))];
}
function seen(s) {
  s.navigationSeen ||= {};
  return s.navigationSeen;
}
function contractKey(s, def) {
  return def.id + ':' + s.missions.filter((m) => m.id === def.id && m.status === 'resolved').length;
}
function unseen(keys, read) {
  return keys.filter((key) => !Array.isArray(read) || !read.includes(key)).length;
}
export function acknowledgeNavigation(s, tab, contractTab = 'all') {
  const read = seen(s);
  if (tab === 'Contracts') {
    const keys = D.availableContracts(s)
      .filter((d) => contractTab === 'all' || missionCategory(d) === contractTab)
      .map((d) => contractKey(s, d));
    read.contracts = [
      ...new Set([...(Array.isArray(read.contracts) ? read.contracts : []), ...keys]),
    ];
  }
  if (tab === 'Stories') read.stories = storyChoices(s).map((n) => n.id);
  if (tab === 'Rooms') s.guild.readCompletion = s.guild.nextCompletion;
  if (tab === 'Reports') read.reports = s.reports.length;
  if (tab === 'Journal') read.journal = s.journal.length;
}
export function navigationNotices(s) {
  const read = seen(s);
  const levels = s.roster
    .filter((c) => !['dead', 'departed'].includes(c.status))
    .reduce((sum, c) => sum + D.unspentLevels(c).length, 0);
  const awaiting = D.activeMissions(s).filter(
    (m) => m.status === 'decision' || m.pendingEvent,
  ).length;
  return {
    Contracts: {
      count:
        unseen(
          D.availableContracts(s).map((d) => contractKey(s, d)),
          read.contracts,
        ) + awaiting,
      label: 'new contracts or reports awaiting a decision',
    },
    Rooms: {
      count: s.guild.nextCompletion - s.guild.readCompletion,
      label: 'completed room projects',
    },
    Training: { count: levels, label: 'unspent level choices' },
    Characters: {
      count: s.roster.filter(
        (c) => !['dead', 'departed'].includes(c.status) && D.unspentLevels(c).length,
      ).length,
      label: 'characters ready to train',
    },
    Stories: {
      count: unseen(
        storyChoices(s).map((n) => n.id),
        read.stories,
      ),
      label: 'new story leads',
    },
    Diaries: {
      count: D.availableRecords(s).filter((r) => !s.flags['record_' + r.id]).length,
      label: 'unread records',
    },
    Reports: {
      count: Math.max(0, s.reports.length - (Number.isInteger(read.reports) ? read.reports : 0)),
      label: 'unread reports',
    },
    Journal: {
      count: Math.max(0, s.journal.length - (Number.isInteger(read.journal) ? read.journal : 0)),
      label: 'unread journal entries',
    },
  };
}
