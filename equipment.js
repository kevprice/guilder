// Every purchased item is one physical object. Equipped objects remain in the guild inventory.
export const equipment=[
 ['shield','Oak shield',25,{end:2},0,'A dependable shield from Mara’s workshop.'],
 ['boots','Trail boots',25,{agi:2},0,'Dry soles and firm footing.'],
 ['emberBlade','Ember blade',120,{str:5},0,'A warm blade forged from the furnace’s recovered iron.'],
 ['moonBow','Moon bow',140,{agi:5},3,'Its silver string reveals moving shadows.'],
 ['wardStaff','Ward staff',160,{int:5},5,'A portable circle of protection.'],
 ['stoneMail','Stone mail',180,{end:7},3,'Flexible plates carved with Oren’s craft marks.'],
 ['riverCharm','River charm',100,{end:3,agi:2},4,'Keeps its wearer steady on flooded roads.'],
 ['echoLens','Echo lens',130,{int:4},8,'Shows a second image where an illusion stands.'],
 ['thornSpear','Thorn spear',150,{str:4,agi:2},3,'Living thorns turn toward approaching danger.'],
 ['frostCloak','Frost cloak',170,{end:4,int:2},8,'Absorbs the heat of hostile spells.'],
 ['sunHammer','Sun hammer',240,{str:8},4,'Breaks armour and lights sealed passages.'],
 ['starCompass','Star compass',220,{int:5,agi:3},8,'Always points toward the last safe camp.'],
 ['phoenixPin','Phoenix pin',350,{end:4},12,'Reduces daily harm risk; it cannot resurrect the dead.'],
 ['mistBoots','Mist boots',200,{agi:7},5,'Steps leave a trail of blue vapour.'],
 ['oathShield','Oath shield',260,{end:9},8,'Inscribed with the names of the people it protects.'],
 ['rootCrown','Root crown',230,{int:6,end:3},5,'Whispers when living roots are disturbed.'],
 ['glassDagger','Glass dagger',180,{agi:5,str:3},3,'Its edge reflects the nearest threat.'],
 ['stormRod','Storm rod',300,{int:9},6,'Stores lightning collected above the tower.'],
 ['ironHeart','Iron heart',320,{end:10,str:2},6,'A clockwork breastplate made for long journeys.'],
 ['lanternSpear','Lantern spear',280,{str:7,int:3},7,'Carries a small, steady flame through the dark.'],
 ['threadRing','Thread ring',210,{agi:4,int:4},7,'Marks the path back without binding its wearer.']
].map(([id,name,cost,stats,protection,desc])=>({id,name,cost,stats,protection,desc}));
export function itemDefinition(id){return equipment.find(e=>e.id===id);}
export const injuryNames=['Fit','Hurt','Injured','Incapacitated','Unconscious','Dead'];
export function injuryLevel(c){return c.status==='dead'?5:c.injury||0;}
export function conscious(c){return injuryLevel(c)<4;}
export function workFactor(c){return [1,.85,.6,.2,0,0][injuryLevel(c)]||0;}
