import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {windowReducer, initialWindows} from '../src/lib/web/windows.ts';
import {askIntelligence} from '../src/lib/intelligence/ai.functions.ts';
const root = new URL('../', import.meta.url);
const provenance = JSON.parse(await readFile(new URL('provenance.json', root), 'utf8'));
let verified = 0;
for (const entry of provenance.files) {
  if (['src/components/web/shell.tsx', 'src/lib/intelligence/ai.functions.ts'].includes(entry.path)) continue;
  const bytes = await readFile(new URL(entry.path, root));
  const sha = value => createHash('sha256').update(value).digest('hex');
  const candidates = [sha(bytes)];
  // Git may normalize text line endings between platforms.
  if (!entry.path.startsWith('src/assets/')) {
    const text = bytes.toString('utf8').replace(/\r\n/g, '\n');
    candidates.push(sha(text), sha(text.replace(/\n/g, '\r\n')));
  }
  assert.ok(candidates.includes(entry.sha256), 'Reference drift: ' + entry.path);
  verified++;
}
const before = JSON.stringify(initialWindows);
let windows = windowReducer(initialWindows, {type:'open', appId:'studio'});
assert.equal(windows.length, initialWindows.length, 'Opening an existing app must not duplicate it');
assert.equal(windows.find(w => w.appId === 'studio').mode, 'normal');
windows = windowReducer(windows, {type:'maximize', appId:'studio'});
windows = windowReducer(windows, {type:'minimize', appId:'studio'});
windows = windowReducer(windows, {type:'restore', appId:'studio'});
assert.equal(windows.find(w => w.appId === 'studio').mode, 'maximized', 'Restore preserves maximized state');
windows = windowReducer(windows, {type:'maximize', appId:'studio'});
windows = windowReducer(windows, {type:'geometry', appId:'studio', x:1000, y:-1000, width:50, height:40});
const studio = windows.find(w => w.appId === 'studio');
assert.ok(studio.x >= 0 && studio.y >= 0 && studio.x + studio.width <= 100 && studio.y + studio.height <= 100, 'Window remains inside workspace');
windows = windowReducer(windows, {type:'close', appId:'studio'});
assert.ok(!windows.some(w => w.appId === 'studio'));
windows = windowReducer(windows, {type:'open', appId:'studio'});
assert.equal(windows.filter(w => w.appId === 'studio').length, 1);
assert.equal(JSON.stringify(initialWindows), before, 'Interactions preserve initial state');
const result = await askIntelligence({message:'verification'});
assert.equal(result.ok, false);
assert.equal(result.status, 503, 'Visual preview must not execute a model');
console.log('PASS: ' + verified + ' original files/assets; window lifecycle, geometry and disabled AI');
