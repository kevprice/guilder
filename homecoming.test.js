import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import {journeys,records} from './homecoming.js';

test('all playable companions have distinct homecomings; every interior has a personal record',()=>{
 assert.equal(Object.keys(journeys).length,30);
 assert.equal(new Set(records.map(r=>r.id)).size,records.length);
 for(const c of [...D.recruits,...D.sleepers])assert.ok(journeys[c.id],c.id);
 for(const room of [...D.rooms,...D.chambers])assert.ok(records.some(r=>r.id===room.id),room.id);
 assert.deepEqual(D.validateContent(),[]);
});
test('room records cannot be collected early or twice and persist in older saves',()=>{
 const s=D.initial();assert.throws(()=>D.recoverRecord(s,'library'));
 D.recoverRecord(s,'entrance');assert.throws(()=>D.recoverRecord(s,'entrance'));
 assert.ok(D.load(D.save(s)).flags.record_entrance);
 const old=D.initial();assert.equal(D.availableRecords(D.load(D.save(old)))[0].id,'entrance');
});
test('a farewell requires personal evidence and preserves the departed companion and stored equipment',()=>{
 const s=D.initial();D.recruit(s,'bryn');s.flags.brynResolved=true;
 assert.ok(!D.availableChoices(s,'bryn').some(n=>n.id==='homecoming-bryn'));
 D.recoverRecord(s,'home-bryn');s.flags.repaired=true;s.gold=1000;
 D.enterStore(s,'bryn');const uid=D.buyEquipment(s,'shield');D.equipItem(s,'bryn',uid);s.selected='bryn';
 D.narrativeChoice(s,'homecoming-bryn','release');
 assert.equal(s.selected,'rowan');assert.equal(s.inventory.find(i=>i.uid===uid).owner,null);
 assert.equal(s.roster[0].status,'departed');assert.ok(!D.home(s).some(c=>c.id==='bryn'));
 assert.throws(()=>D.dispatch(s,'road',['bryn']));assert.throws(()=>D.narrativeChoice(s,'homecoming-bryn','release'));
 assert.equal(D.load(D.save(s)).roster[0].status,'departed');
});
test('away, wounded and dead companions cannot be released; spirit evidence precedes passing on',()=>{
 const s=D.initial();s.gold=1000;s.flags.fenStep2=true;D.recruit(s,'lark');s.flags.fenStep11=true;
 D.recoverRecord(s,'home-lark');assert.equal(journeys.lark.kind,'spirit');
 for(const status of ['away','injured','dead']){s.roster[0].status=status;assert.throws(()=>D.narrativeChoice(s,'homecoming-lark','release'));}
 s.roster[0].status='home';D.narrativeChoice(s,'homecoming-lark','release');
 assert.match(D.characterArc(s,s.roster[0]),/pass on/);assert.equal(D.load(D.save(s)).roster[0].status,'departed');
});
