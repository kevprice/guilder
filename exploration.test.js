import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import {guildStairs} from './exploration.js';
test('dormant residents require discovery and capabilities, awaken once, and persist with personal dialogue',()=>{
 const s=D.initial();s.flags.stairs=true;s.flags.anchor=true;s.gold=500;D.recruit(s,'bryn');s.selected='bryn';
 assert.throws(()=>D.awaken(s,'oren'),/Investigate/);D.discoverSleeper(s,'oren');assert.throws(()=>D.awaken(s,'oren'),/Strength/);s.roster[0].str=10;D.awaken(s,'oren');assert.throws(()=>D.awaken(s,'oren'),/Already/);
 assert.equal(s.roster.find(c=>c.id==='oren').level,4);assert.ok(D.risk(s,'quarry',['oren']).threat<D.profiles.quarry.threat);D.narrativeChoice(s,'orenRemember','choice');
 const before=s.gold;D.interact(s,'tower');assert.equal(before-s.gold,40);D.interact(s,'labyrinth');D.recruit(s,'ivo');const ivo=s.roster.find(c=>c.id==='ivo');ivo.level=3;ivo.points=2;D.advance(s,'ivo','literacy');s.selected='ivo';
 D.visitFloor(s,-100);D.visitFloor(s,1020);for(const id of ['maelin','ysra']){D.discoverSleeper(s,id);D.awaken(s,id);}
 const saved=D.load(D.save(s));assert.equal(saved.roster.length,5);assert.equal(saved.choices.orenRemember,'choice');assert.ok(saved.roster.find(c=>c.id==='maelin').skills.includes('echoSight'));assert.ok(D.risk(saved,'road',['ysra']).safe);
});
test('vertical routes preserve floors and gate the labyrinth false stair',()=>{
 const s=D.initial(),c=D.home(s)[0];assert.match(guildStairs({x:350,y:380,floor:380},'up',s,c).error,/Repair/);s.flags.tower=true;
 assert.deepEqual(guildStairs({x:350,y:380,floor:380},'up',s,c),{x:350,y:140});assert.deepEqual(guildStairs({x:350,y:140,floor:140},'up',s,c),{x:350,y:-100});assert.deepEqual(guildStairs({x:350,y:-100,floor:-100},'down',s,c),{x:350,y:140});
 assert.match(guildStairs({x:530,y:790,floor:790},'down',s,c).error,/Tracking/);c.skills.push('echoSight');assert.deepEqual(guildStairs({x:530,y:790,floor:790},'down',s,c),{x:530,y:1020});assert.deepEqual(guildStairs({x:530,y:1020,floor:1020},'up',s,c),{x:535,y:790});
});

test('concealed floor discoveries are recorded once and require connected rooms',()=>{
 const s=D.initial();assert.throws(()=>D.visitFloor(s,-100),/not connected/);s.flags.tower=true;D.visitFloor(s,-100);const count=s.journal.length;D.visitFloor(s,-100);assert.equal(s.journal.length,count);assert.ok(s.flags.towerCrown);assert.throws(()=>D.visitFloor(s,1020),/not connected/);
});
