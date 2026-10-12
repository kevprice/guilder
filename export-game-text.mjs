import { readFile, readdir, writeFile } from 'node:fs/promises';
import { parsers } from 'prettier/plugins/babel';

// This catalogue is an editorial snapshot. Source locations identify where edits belong.
const excluded = new Set(['portraits.js', 'player-copy.js', 'revised-copy.js']);
const files = (await readdir('.')).filter(
  (file) => file.endsWith('.js') && !file.endsWith('.test.js') && !excluded.has(file),
);
const narrativeFiles = [
  'narrative.js',
  'resident-discoveries.js',
  'homecoming.js',
  'exploration.js',
  'opening-contracts.js',
  'expansion.js',
  'sprawl.js',
  'story-model.js',
  'domain.js',
  'character-panel.js',
  'classes.js',
  'equipment.js',
  'contracts.js',
  'game.js',
];
files.sort((a, b) => {
  const rank = (file) =>
    narrativeFiles.includes(file) ? narrativeFiles.indexOf(file) : narrativeFiles.length;
  return rank(a) - rank(b) || a.localeCompare(b);
});
const proseKeys = new Set([
  'title',
  'name',
  'desc',
  'description',
  'bio',
  'story',
  'text',
  'body',
  'label',
  'preview',
  'result',
  'arrival',
  'farewell',
  'record',
  'home',
  'problem',
  'method',
  'ability',
  'summary',
  'next',
  'room',
  'author',
]);
const sections = [];
let count = 0;
function visibleText(text) {
  return text
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim();
}
for (const file of files) {
  const source = await readFile(file, 'utf8');
  const ast = await parsers.babel.parse(source);
  const entries = [];
  function visit(node, context = []) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      for (const child of node) visit(child, context);
      return;
    }
    if (node.type === 'ImportDeclaration' || node.type === 'ExportAllDeclaration') return;
    let trail = context;
    if (node.type === 'FunctionDeclaration' && node.id) trail = [...trail, node.id.name];
    if (node.type === 'VariableDeclarator' && node.id?.name) trail = [...trail, node.id.name];
    if (node.type === 'ObjectExpression') {
      const identity = node.properties.find(
        (property) =>
          ['id', 'name', 'title'].includes(property.key?.name) &&
          property.value?.type === 'StringLiteral',
      );
      if (identity) trail = [...trail, identity.value.value];
    }
    if (node.type === 'ObjectProperty' && !node.computed)
      trail = [...trail, node.key?.name || node.key?.value || 'field'];
    if (node.type === 'StringLiteral' || node.type === 'TemplateLiteral') {
      let text =
        node.type === 'StringLiteral'
          ? node.value
          : node.quasis
              .map(
                (part, index) =>
                  (part.value.cooked ?? part.value.raw) +
                  (index < node.expressions.length
                    ? `⟦${source.slice(node.expressions[index].start, node.expressions[index].end)}⟧`
                    : ''),
              )
              .join('');
      const readable = visibleText(text);
      const key = trail.at(-1);
      const isProse =
        proseKeys.has(key) ||
        /[A-Za-z][\s’'.,!?·:→−+]/.test(readable) ||
        /^[A-Z][a-z]+(?:[A-Z][a-z]+)?$/.test(readable) ||
        /^[A-Z][A-Z0-9 /+−·]*$/.test(readable);
      if (
        isProse &&
        /[A-Za-z]/.test(readable) &&
        !/^(data:|https?:|\.\.?\/)/.test(text) &&
        !/^#[\da-f]{3,8}$/i.test(text)
      ) {
        const line = source.slice(0, node.start).split('\n').length;
        const id = `${file}:${line}`;
        entries.push(
          `### ${id}\n\n**Context:** ${trail.join(' → ') || 'Interface / runtime text'}\n\n${text.includes('<') ? '**Display text** (markup removed):\n\n' : ''}${readable}\n\n${text.includes('<') || node.type === 'TemplateLiteral' ? `**Source template:**\n\n\`\`\`text\n${text}\n\`\`\`\n\n` : ''}`,
        );
        count++;
      }
      // Embedded expressions may also contain conditional wording.
      if (node.type === 'TemplateLiteral') visit(node.expressions, trail);
      return;
    }
    for (const [key, child] of Object.entries(node))
      if (!['loc', 'comments', 'tokens', 'extra', 'key'].includes(key)) visit(child, trail);
  }
  visit(ast);
  if (entries.length) sections.push(`## ${file}\n\n${entries.join('\n')}`);
}
const html = await readFile('index.html', 'utf8');
const htmlText = visibleText(html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')).replace(
  /\n\s*\n/g,
  '\n\n',
);
sections.push(`## index.html — permanent interface\n\n${htmlText}\n`);
await writeFile(
  'GAME_TEXT.md',
  `# The Bound House — complete text catalogue\n\nEditorial snapshot of the current runtime source, including spoilers and unfinished or inconsistent wording. This records what is written in the game; it is not a revised story bible.\n\n## How to rewrite this script\n\nEach entry identifies its source file, line and scene or field. Keep those identifiers with your rewritten text so changes can be applied to the right place. Rewrite descriptions as descriptions, and put instructions in objective or action fields. Conditional alternatives are separate entries: review every branch.\n\nDynamic values appear as ⟦expressions⟧. Keep their meaning when rewriting; they supply character names, quantities, chosen outcomes and other changing details. Some short entries are fragments joined at runtime, so read the surrounding entries and source template together. Templates containing markup include both display text and the original template.\n\nThis catalogue covers narrative, discoveries, conversations, diaries, homecomings, quests, choices, reports, descriptions, abilities, equipment, objectives, labels and runtime messages. A few technical fragments are retained where they sit alongside interface wording. Art data, compatibility-only retired prose, tests and developer reference generators are excluded. Existing saves can contain older wording not authored in the current script.\n\n**Editing:** This document is a working copy, not an input loaded by the game. Your rewrites must be applied back to the source. Do not regenerate it over an edited copy; export a fresh snapshot under a different name if needed.\n\n${count} source entries, plus the permanent HTML interface.\n\n## Contents\n\n${files.map((file) => `- ${file}`).join('\n')}\n- index.html\n\n${sections.join('\n')}`,
);
console.log(`Exported ${count} text entries to GAME_TEXT.md`);
