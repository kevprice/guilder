// Shared Canvas artwork keeps world sprites and room materials consistent.
import {paintInterior} from './room-personality.js';
export function paintRoom(ctx,camera,x,w,name,restored,details){paintInterior(ctx,camera,x,w,name,restored,0);}
export function paintCharacter(ctx,camera,c,x,y,controlled,facing){
 const sx=x-camera,warrior=c.type==='warrior',mage=c.type==='mage',broad=warrior?13:9,accent=c.undead?'#647b65':c.color||'#76bdb5';ctx.save();ctx.lineJoin='round';
 const shape=(points,color)=>{ctx.fillStyle=color;ctx.beginPath();points.forEach(([px,py],i)=>i?ctx.lineTo(sx+px,y+py):ctx.moveTo(sx+px,y+py));ctx.closePath();ctx.fill();};
 ctx.fillStyle='#090e1455';ctx.beginPath();ctx.ellipse(sx,y+2,17,4,0,0,Math.PI*2);ctx.fill();
 shape([[-9,-17],[-2,-17],[-3,-3],[-13,0],[-13,-4]],'#44372c');shape([[2,-17],[9,-17],[11,-3],[15,0],[2,0]],'#44372c');
 // Cloak silhouettes identify classes before their equipment is inspected.
 shape([[-broad,-37],[broad,-37],[broad+7,-8],[-broad-6,-8]],accent);shape([[-broad,-34],[-broad-6,-8],[-2,-11],[-3,-33]],'#17263177');
 if(mage){shape([[-9,-33],[10,-33],[17,-3],[-15,-3]],accent);ctx.strokeStyle='#d7bd88';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(sx,y-32);ctx.lineTo(sx,y-4);ctx.stroke();}
 if(warrior){shape([[-11,-35],[11,-35],[9,-19],[-9,-19]],'#818884');shape([[-15,-36],[-7,-37],[-6,-29],[-16,-29]],'#bac0b4');shape([[7,-37],[15,-36],[16,-29],[6,-29]],'#bac0b4');}
 ctx.fillStyle='#b99968';ctx.fillRect(sx-broad,y-17,broad*2,3);ctx.fillStyle='#d8c48d';ctx.fillRect(sx-2,y-18,4,5);
 ctx.fillStyle=c.undead?'#b1bfa0':'#e0bd9c';ctx.beginPath();ctx.ellipse(sx,y-43,7,9,0,0,Math.PI*2);ctx.fill();
 const hair=['rowan','oren','maelin'].includes(c.id)?'#cec8b6':c.id==='bryn'?'#9e6242':'#4f3c38';shape([[-8,-44],[-7,-53],[0,-56],[8,-52],[9,-43],[4,-49],[-4,-47],[-5,-37],[-8,-37]],hair);
 if(c.type==='scout'){shape([[-11,-43],[-8,-54],[1,-59],[9,-51],[11,-42],[6,-46],[0,-51],[-6,-45]],accent);}
 ctx.fillStyle=c.undead?'#e5d99a':'#253039';ctx.beginPath();ctx.arc(sx+(controlled?facing:1)*3,y-43,1.2,0,Math.PI*2);ctx.fill();
 shape([[-broad-2,-32],[-broad-5,-23],[-broad-3,-17],[-broad+1,-20]],accent);shape([[broad,-32],[broad+5,-23],[broad+3,-17],[broad-1,-20]],accent);
 ctx.fillStyle=controlled?'#fff0d0':'#dfd3bd';ctx.font='12px Georgia';ctx.textAlign='center';ctx.fillText(c.name,sx,y-66);ctx.textAlign='left';
 if(controlled){ctx.strokeStyle='#e4c580';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(sx,y+3,19,5,0,0,Math.PI*2);ctx.stroke();}ctx.restore();
}

