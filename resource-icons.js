const paths = {
  gold: '<circle cx="12" cy="12" r="8"/><path d="M12 7v10m3-8h-4a2 2 0 000 4h2a2 2 0 010 4H9"/>',
  timber: '<path d="M3 8l15-4 3 4-15 4zm3 4v7l15-4V8M3 8v7l3 4m4-7 7-2m-7 6 7-2"/>',
  ore: '<path d="M6 4h12l4 8-10 9L2 12zm0 0 6 17 6-17M2 12h20"/>',
  herbs:
    '<path d="M12 21V5m0 8C3 14 3 5 4 4c7 0 8 5 8 9zm0-3c0-7 7-8 9-7 0 7-4 8-9 7zm0 7c0-5 6-6 8-5-1 6-4 7-8 5z"/>',
  cloth: '<path d="M6 3h13l-2 17H4zm0 0L3 7v13m6-12h6m-7 4h6m-7 4h6"/>',
  aether: '<path d="M12 2l4 8 6 2-6 2-4 8-4-8-6-2 6-2z"/>',
  components:
    '<path d="M9 3h6l1 4 4-1 2 5-3 3 1 4-5 3-3-3-4 2-4-4 2-4-3-3 3-5 4 1z"/><circle cx="12" cy="12" r="3"/>',
  salvage: '<path d="M3 8h18v13H3zm4 0V4h10v4M3 12h18m-11 0v4h4v-4"/>',
  supplies: '<path d="M4 5h16v16H4zm4 0V2h8v3m-4 5v7m-4-3h8"/>',
  guard: '<path d="M12 2l8 4v7c0 5-8 9-8 9S4 18 4 13V6zm-4 9 3 3 5-6"/>',
  care: '<path d="M4 7h16v14H4V7zm4 0V3h8v4m-4 3v7m-4-3h8"/>',
  craft: '<path d="M14 3l-4 5 6 6 5-4-2-6zm-4 5L3 18l3 3 10-7"/>',
};
export function resourceIcon(id, label = id) {
  return `<svg class="resource-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${label}">${paths[id] || paths.craft}</svg>`;
}
