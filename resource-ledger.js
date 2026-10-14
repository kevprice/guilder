import { resources } from './resource-catalogue.js';

const topLevel = ['gold', 'salvage', 'supplies'];
const definition = (id) => {
  const resource = resources.find((r) => r.id === id);
  if (!resource) throw Error('Unknown resource: ' + id);
  return resource;
};
export function resourceStock(s, id) {
  definition(id);
  return id === 'gold' ? s.gold : topLevel.includes(id) ? s.guild[id] : s.guild.house.materials[id];
}
function writeStock(s, id, value) {
  if (id === 'gold') s.gold = value;
  else if (topLevel.includes(id)) s.guild[id] = value;
  else s.guild.house.materials[id] = value;
}
export function recipeCosts(inputs, quantity = 1) {
  if (!Number.isSafeInteger(quantity) || quantity < 1)
    throw Error('Choose a positive whole quantity.');
  const costs = {};
  const add = (id, amount) => {
    definition(id);
    if (!Number.isSafeInteger(amount) || amount < 0 || !Number.isSafeInteger(amount * quantity))
      throw Error('Invalid resource quantity: ' + id);
    if (amount) costs[id] = amount * quantity;
  };
  for (const id of topLevel) add(id, inputs[id] === undefined ? 0 : inputs[id]);
  if (
    inputs.materials !== undefined &&
    (!inputs.materials || Array.isArray(inputs.materials) || typeof inputs.materials !== 'object')
  )
    throw Error('Invalid material costs.');
  for (const [id, amount] of Object.entries(inputs.materials || {})) {
    if (topLevel.includes(id)) throw Error('Use the main cost field for ' + id);
    add(id, amount);
  }
  return costs;
}
export function resourceShortfalls(s, costs) {
  return Object.entries(costs).flatMap(([id, needed]) => {
    const have = resourceStock(s, id);
    if (!Number.isSafeInteger(needed) || needed < 0 || !Number.isSafeInteger(have) || have < 0)
      throw Error('Invalid resource balance: ' + id);
    return needed > have ? [{ resource: id, amount: needed - have }] : [];
  });
}
export function tradeResources(s, spent = {}, gained = {}, hooks = {}, reason = 'Production') {
  const ids = new Set([...Object.keys(spent), ...Object.keys(gained)]);
  const next = [...ids].map((id) => {
    const out = spent[id] === undefined ? 0 : spent[id],
      incoming = gained[id] === undefined ? 0 : gained[id],
      stock = resourceStock(s, id);
    if (
      !Number.isSafeInteger(out) ||
      out < 0 ||
      !Number.isSafeInteger(incoming) ||
      incoming < 0 ||
      !Number.isSafeInteger(stock) ||
      stock < 0 ||
      stock < out ||
      !Number.isSafeInteger(stock - out + incoming)
    )
      throw Error('Invalid resource transaction: ' + id);
    return [id, stock - out + incoming];
  });
  // Validate every balance before touching stock or recording a gold payment.
  if (spent.gold && hooks.pay) hooks.pay(s, spent.gold, reason);
  if (gained.gold && hooks.earn) hooks.earn(s, gained.gold, reason);
  for (const [id, value] of next) writeStock(s, id, value);
}
function changeResources(s, costs, direction, hooks, reason) {
  tradeResources(s, direction < 0 ? costs : {}, direction > 0 ? costs : {}, hooks, reason);
}
export function spendResources(s, inputs, hooks = {}, reason = 'Crafting') {
  const costs = recipeCosts(inputs),
    missing = resourceShortfalls(s, costs);
  if (missing.length)
    throw Error(
      'Need ' +
        missing.map((m) => m.amount + ' ' + definition(m.resource).name.toLowerCase()).join(' + ') +
        '.',
    );
  changeResources(s, costs, -1, hooks, reason);
}
export function refundResources(s, inputs, hooks = {}, reason = 'Crafting refund') {
  changeResources(s, recipeCosts(inputs), 1, hooks, reason);
}
export function creditResources(s, outputs, hooks = {}, reason = 'Production') {
  changeResources(s, outputs, 1, hooks, reason);
}
