/* Original low-resolution perspective renderer for Super Dan Kart. */
(function(){
'use strict';
const W=256,H=176,HORIZON=44,FOCAL=108,CAM_HEIGHT=25,CAM_BACK=24,FAR=228,BW=640,BH=360,BX=320,BY=330;
const palette={
country:{sky:'#a9ccec',far:'#68a05b',ground:'#78ad55',fleck:'#99c36b',road:'#c3a06a',shadow:'#ab8552',edge:['#f7d66d','#cc5545','#f6ead0','#507cb0'],kind:'tree'},
court:{sky:'#f0d7aa',far:'#b78a60',ground:'#d8b583',fleck:'#e9c99c',road:'#99704d',shadow:'#795638',edge:['#fff0ce','#b95a3d','#e7bd75','#875b43'],kind:'pillar'},
spain:{sky:'#a9d4e8',far:'#be9d68',ground:'#d8b16e',fleck:'#edcb91',road:'#bf8052',shadow:'#a56b45',edge:['#fff3ce','#c55d43','#edb94f','#fff3ce'],kind:'house'},
bath:{sky:'#b7cbc2',far:'#839d90',ground:'#9eb5a9',fleck:'#c8d9c9',road:'#7c9085',shadow:'#687c72',edge:['#e6eee0','#b66d63','#d8e4d7','#7798ae'],kind:'soap'},
space:{sky:'#29294f',far:'#655782',ground:'#6e608f',fleck:'#a393c8',road:'#4d476c',shadow:'#3d395a',edge:['#e3c1e9','#bd82cb','#f7d67c','#7daacf'],kind:'crystal'}
};
let cache=new WeakMap(),rot=null,driver=null,driverKey=null,driverReady=false;
const rnd=(n)=>{let x=n|0;return ()=>{x=(x*1664525+1013904223)>>>0;return x/4294967296}};
const rect=(c,x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h))};
function poly(c,pts,color){c.fillStyle=color;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(Math.round(p[0]),Math.round(p[1])):c.moveTo(Math.round(p[0]),Math.round(p[1])));c.closePath();c.fill()}
function line(c,pts,color,width=1){c.strokeStyle=color;c.lineWidth=width;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(Math.round(p[0]),Math.round(p[1])):c.moveTo(Math.round(p[0]),Math.round(p[1])));c.stroke()}
function canvas(w,h){const a=document.createElement('canvas');a.width=w;a.height=h;return a}
function routePath(c,t){c.beginPath();for(let i=0;i<t.route.arr.length;i++){let p=t.route.arr[i];if(i)c.lineTo(p.x,p.y);else c.moveTo(p.x,p.y)}c.closePath()}
function trackTexture(t,at){
 if(cache.has(t))return cache.get(t);
 const p=palette[t.decor]||palette.country,map=canvas(380,410),c=map.getContext('2d');if(!c)throw Error('ground canvas unavailable');
 const random=rnd(t.route.arr.length*71+Math.round(t.route.total));
 rect(c,0,0,380,410,p.ground);
 for(let i=0;i<2600;i++){let x=random()*380,y=random()*410;rect(c,x,y,1+random()*3,1+random()*2,i%4?p.fleck:p.far)}
 if(t.decor==='bath'){for(let x=0;x<380;x+=22)line(c,[[x,0],[x,410]],'#819a90',1);for(let y=0;y<410;y+=22)line(c,[[0,y],[380,y]],'#819a90',1)}
 if(t.decor==='country'){const a=at(t,t.route.total*.38,47);c.fillStyle='#72a9c1';c.beginPath();c.ellipse(a.x,a.y,23,18,0,0,Math.PI*2);c.fill()}
 if(t.decor==='space'){for(let i=0;i<50;i++){let x=random()*380,y=random()*410;rect(c,x,y,2,2,'#ebd6a4')}}
 c.lineCap='round';c.lineJoin='round';
 function stroke(color,width,dash=[],offset=0){routePath(c,t);c.strokeStyle=color;c.lineWidth=width;c.setLineDash(dash);c.lineDashOffset=offset;c.stroke();c.setLineDash([])}
 stroke(p.far,65);stroke(p.edge[0],58);
 for(let i=1;i<4;i++)stroke(p.edge[i],58,[6,18],-i*6);
 stroke(p.road,47);
 // Speckles and cross-planks follow the route itself.
 for(let i=0;i<1500;i++){const q=at(t,random()*t.route.total,(random()-.5)*43);rect(c,q.x,q.y,1+random()*2,1,p.shadow)}
 for(let d=3;d<t.route.total;d+=12){let a=at(t,d,-21),b=at(t,d,21);if(t.decor==='court'||t.decor==='bath'||(t.decor==='country'&&d>t.route.total*.32&&d<t.route.total*.42))line(c,[[a.x,a.y],[b.x,b.y]],p.shadow,1.4)}
 // A thin segmented center marking, plus the physical start/finish stripe.
 stroke(p.edge[0],1.5,[3,12]);
 const s=at(t,0),ang=s.angle*Math.PI/180;c.save();c.translate(s.x,s.y);c.rotate(ang);for(let i=0;i<10;i++)for(let j=0;j<2;j++)rect(c,-4+j*4,-25+i*5,4,5,(i+j)%2?'#483b30':'#fff2d1');c.restore();
 const props=[];
 for(let d=22,j=0;d<t.route.total;d+=39,j++){
   let side=j%2?1:-1,lane=side*(34+random()*12),a=at(t,d,lane);
   if(a.x<5||a.y<5||a.x>375||a.y>405)continue;
   // Do not place a roadside object on a neighboring section of track.
   let nearest=Infinity;for(let i=0;i<t.route.arr.length;i+=3){let q=t.route.arr[i];nearest=Math.min(nearest,Math.hypot(q.x-a.x,q.y-a.y))}
   if(nearest<29)continue;
   props.push({x:a.x,y:a.y,kind:j%5===0?'sign':p.kind,variant:j%3});
 }
 // Signature landmarks occupy the same interior region as the course map.
 const landmark={country:{x:183,y:161,kind:'pond'},court:{x:187,y:215,kind:'bench'},spain:{x:181,y:192,kind:'villa'},bath:{x:188,y:219,kind:'baby'},space:{x:184,y:215,kind:'planet'}}[t.decor];
 if(landmark)props.push({...landmark,variant:0});
 const a={map,props,p};cache.set(t,a);return a
}
function skyline(c,t,p,heading){
 rect(c,0,0,W,HORIZON,p.sky);const shift=Math.round(heading*19);
 if(t.decor==='space'){
  for(let i=0;i<30;i++){let x=((i*67-shift)%W+W)%W,y=(i*19+7)%36;rect(c,x,y,1+(i%4===0),1,'#fff2d0')}
  let x=158+Math.round(Math.sin(heading)*25);poly(c,[[x-17,19],[x-11,6],[x+8,4],[x+18,14],[x+17,29],[x-8,34]],'#b398ce');line(c,[[x-28,26],[x+30,11]],'#f3cc83',4)
 }else if(t.decor==='bath'){
  for(let x=-30;x<W+30;x+=30){let n=x+((shift%30)+30)%30;rect(c,n,0,1,HORIZON,'#91a99f')}for(let y=8;y<HORIZON;y+=15)rect(c,0,y,W,1,'#91a99f');
  rect(c,83,4,90,5,'#f5f7de');rect(c,88,10,80,2,'#dbe7ca')
 }else if(t.decor==='court'){
  rect(c,0,0,W,5,'#a77b51');rect(c,0,35,W,9,'#c49b6b');
  for(let x=-38;x<W+38;x+=42){let n=x+((shift%42)+42)%42;rect(c,n+7,8,12,29,'#fff0ce');rect(c,n+8,10,3,25,'#d6b990');rect(c,n+4,5,18,5,'#e8c99b');rect(c,n+4,35,18,5,'#e8c99b')}
 }else{
  for(let i=-1;i<6;i++){let x=i*53-((shift%53)+53)%53;poly(c,[[x-19,44],[x-10,26],[x+4,18],[x+26,18],[x+43,27],[x+53,44]],p.far);poly(c,[[x-4,31],[x+4,22],[x+22,22],[x+32,29]],t.decor==='country'?'#88b965':'#d3b27d')}
  for(let i=0;i<3;i++){let x=((i*97-shift/2+19)%W+W)%W;rect(c,x,7+i%2*6,25,5,'#e9f2df');rect(c,x+5,4+i%2*6,17,5,'#e9f2df')}
 }
 rect(c,0,HORIZON,W,H-HORIZON,p.ground)
}
function basis(t,player,at){
 const pos=at(t,player.d,player.lane),ahead=at(t,player.d+8,player.lane),back=at(t,player.d-6,player.lane);
 let dx=ahead.x-back.x,dy=ahead.y-back.y,len=Math.hypot(dx,dy)||1,fx=dx/len,fy=dy/len,rx=-fy,ry=fx;
 return {cx:pos.x-fx*CAM_BACK,cy:pos.y-fy*CAM_BACK,fx,fy,rx,ry,heading:Math.atan2(fy,fx),player:pos}
}
function project(b,x,y){const dx=x-b.cx,dy=y-b.cy,z=dx*b.fx+dy*b.fy;if(z<8||z>FAR)return null;const scale=FOCAL/z;return {x:W/2+(dx*b.rx+dy*b.ry)*scale,y:HORIZON+CAM_HEIGHT*scale,z,scale}}
function ground(c,asset,b){
 if(!rot)rot=canvas(BW,BH);const rc=rot.getContext('2d');if(!rc)throw Error('rotation canvas unavailable');
 rc.setTransform(1,0,0,1,0,0);rc.imageSmoothingEnabled=false;rect(rc,0,0,BW,BH,asset.p.ground);
 rc.setTransform(b.rx,-b.fx,b.ry,-b.fy,BX-b.rx*b.cx-b.ry*b.cy,BY+b.fx*b.cx+b.fy*b.cy);
 rc.drawImage(asset.map,0,0);rc.setTransform(1,0,0,1,0,0);
 for(let y=HORIZON+1;y<H;y++){
  const z=CAM_HEIGHT*FOCAL/(y-HORIZON+.5);if(z>FAR)continue;
  const width=W*z/FOCAL,sy=BY-z;
  c.drawImage(rot,BX-width/2,sy,width,Math.max(1,z-CAM_HEIGHT*FOCAL/(y-HORIZON+1.5)),0,y,W,1);
 }
}
function scenery(c,q,kind,variant){
 const k=q.scale*.64;c.save();c.translate(Math.round(q.x),Math.round(q.y));c.scale(k,k);
 const dark='#473b32';
 rect(c,-11,-2,22,3,'#554d3e66');
 if(kind==='tree'){rect(c,-2,-18,5,18,'#936b47');poly(c,[[-14,-16],[-14,-28],[-8,-36],[7,-36],[14,-29],[14,-16]],'#426a38');poly(c,[[-11,-19],[-10,-28],[-4,-33],[7,-33],[11,-26],[8,-18]],'#79ae53');rect(c,-9,-28,8,4,'#a0c96a')}
 else if(kind==='pond'){poly(c,[[-25,1],[-28,-5],[-19,-13],[16,-13],[28,-5],[25,1]],'#6599ae');poly(c,[[-19,-4],[-12,-9],[13,-9],[20,-4]],'#92c4cc');rect(c,-10,-7,12,1,'#d5e9df')}
 else if(kind==='bench'){rect(c,-23,-22,46,22,'#704e35');rect(c,-21,-19,42,16,'#b78858');rect(c,-25,-26,50,5,'#e0b67c');rect(c,-10,-16,20,6,'#fff0ce');rect(c,-5,-37,10,11,'#a69a8e');rect(c,-7,-35,14,5,'#e7ddc7')}
 else if(kind==='villa'){rect(c,-23,-28,46,28,'#fff0ce');poly(c,[[-27,-28],[0,-45],[27,-28]],'#b75f40');rect(c,-15,-21,10,11,'#91bbc4');rect(c,5,-21,10,11,'#91bbc4');rect(c,-4,-13,9,13,'#986846')}
 else if(kind==='baby'){rect(c,-29,-6,58,7,'#718e82');rect(c,-27,-26,54,24,'#e6ecdb');rect(c,-24,-25,48,16,'#a5b9aa');poly(c,[[-22,-13],[-24,-30],[-16,-43],[15,-43],[24,-31],[25,-13]],'#60676b');poly(c,[[-20,-15],[-21,-31],[-14,-40],[14,-40],[21,-29],[22,-15]],'#9da5ad');poly(c,[[-16,-38],[-17,-49],[-7,-41]],'#9da5ad');poly(c,[[16,-38],[17,-49],[7,-41]],'#9da5ad');rect(c,-14,-24,28,10,'#f2ebdc');line(c,[[-12,-32],[-8,-29],[-4,-32]],'#473b32',2);line(c,[[4,-32],[8,-29],[12,-32]],'#473b32',2);rect(c,-2,-25,4,2,'#c89197');rect(c,-28,-12,56,9,'#d5e0d4');rect(c,-25,-11,50,2,'#f5f4e8')}
 else if(kind==='planet'){poly(c,[[-23,-23],[-20,-42],[-8,-51],[11,-51],[24,-38],[24,-22],[12,-12],[-9,-12]],'#b39bcf');poly(c,[[-17,-36],[-8,-45],[7,-45],[17,-36]],'#d2b3d8');line(c,[[-34,-20],[33,-43]],'#f1d9aa',5);rect(c,-10,-30,7,5,'#8b72a7')}
 else if(kind==='pillar'){rect(c,-10,-30,20,30,'#a47a55');rect(c,-7,-29,14,26,'#f4e0b8');rect(c,-6,-28,3,25,'#e6c392');rect(c,-13,-34,26,5,'#b28a60');rect(c,-12,-4,24,5,'#b28a60')}
 else if(kind==='house'){rect(c,-13,-21,26,21,'#fff0ce');poly(c,[[-16,-21],[0,-35],[16,-21]],'#a84a31');rect(c,-7,-15,6,8,'#84b5c4');rect(c,5,-15,5,8,'#84b5c4');rect(c,-3,-10,7,10,'#966345')}
 else if(kind==='soap'){rect(c,-13,-13,26,13,'#607f73');rect(c,-12,-15,24,13,variant===1?'#e6b3b2':'#ecedcf');rect(c,-9,-12,18,2,'#fff4d8')}
 else if(kind==='crystal'){poly(c,[[-12,-4],[-11,-19],[0,-35],[12,-18],[10,-4],[0,0]],'#8f6cb6');poly(c,[[-7,-17],[0,-32],[1,-4],[-7,-4]],'#d2b1e5')}
 else{rect(c,-2,-19,4,19,'#8b6845');rect(c,-11,-33,22,16,dark);rect(c,-9,-31,18,12,'#f4b74c');poly(c,[[-6,-21],[0,-29],[7,-21]],'#fff2c9')}
 c.restore()
}
function pickup(c,q,type){
 const k=q.scale*.7;c.save();c.translate(Math.round(q.x),Math.round(q.y));c.scale(k,k);
 if(type==='chip'){rect(c,-6,0,12,2,'#73512f66');poly(c,[[-6,-2],[0,-14],[7,-2]],'#875026');poly(c,[[-4,-3],[0,-11],[5,-3]],'#f8c34e');rect(c,-1,-6,2,2,'#bd8031')}
 else if(type==='oil'){poly(c,[[-10,0],[-8,-4],[2,-6],[10,-3],[12,1],[4,3],[-8,2]],'#494641');rect(c,-5,-3,5,1,'#b7a99b')}
 else{poly(c,[[-10,1],[-8,-8],[8,-8],[10,1]],'#73b7c9');line(c,[[-6,-1],[0,-6],[6,-1]],'#fff4d8',2)}
 c.restore()
}
function driverImage(key,markup){
 if(key===driverKey)return;driverKey=key;driverReady=false;driver=null;
 if(typeof Image==='undefined'||!markup)return;
 try{const img=new Image();driver=img;img.onload=()=>{if(driver===img)driverReady=true};img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="80" height="72" viewBox="-42 -40 84 80">'+markup+'</svg>')}catch(e){}
}
function vehicle(c,r,car,player,lean,boost,tick){
 const ink='#3d3028',color=car?.color||r.color||'#e96122',type=car?.type||'',id=Number(r.car)||0;
 const hover=/hover|rocket|saucer|shuttle|imperial|galactic|infinite|zeppelin|helicopter|yacht/.test(type),tall=/truck|van|bus|camper|fire|train|steam|dozer|babytruck/.test(type),two=/bike|scooter/.test(type),wide=/limo|wagon|rover|race/.test(type);
 const width=two?11:wide?37:32,roof=tall?-23:-13;
 c.save();c.transform(1,0,lean*.09,1,0,0);
 rect(c,-19,-2,38,4,'#372d2866');
 if(hover){rect(c,-width/2-2,-3,width+4,4,'#456b80');rect(c,-width/2,-4,width,2,'#9ed6df')}
 else{rect(c,-width/2-3,-8,8,12,ink);rect(c,width/2-5,-8,8,12,ink);rect(c,-width/2-2,-6,5,7,'#605a52');rect(c,width/2-4,-6,5,7,'#605a52')}
 // Driver silhouette is visible above the rear body, not a copied game sprite.
 if(player){rect(c,-9,roof-14,18,14,ink);rect(c,-7,roof-13,14,12,'#df5033');rect(c,-1,roof-13,2,12,'#9c2c20');rect(c,-5,roof-11,3,3,'#f8c34e');rect(c,3,roof-8,3,3,'#9c2c20');line(c,[[-4,roof-14],[-7,roof-19],[-10,roof-18]],ink,2);line(c,[[4,roof-14],[7,roof-19],[10,roof-18]],ink,2);
 if(driverReady&&driver)c.drawImage(driver,-12,roof-20,24,22)}
 else if(r.name==='Baby'){rect(c,-10,roof-13,20,14,'#66686d');rect(c,-8,roof-14,16,12,'#a5a8ad');poly(c,[[-9,roof-12],[-9,roof-20],[-3,roof-15]],'#a5a8ad');poly(c,[[9,roof-12],[9,roof-20],[3,roof-15]],'#a5a8ad');rect(c,-5,roof-6,10,4,'#e7dfce')}
 else{rect(c,-8,roof-12,16,13,ink);rect(c,-7,roof-11,14,12,r.color);rect(c,-7,roof-15,5,5,r.color);rect(c,2,roof-15,5,5,r.color);rect(c,-4,roof-10,8,3,'#fff2d1')}
 poly(c,[[-width/2-1,-5],[-width/2,roof+4],[-width/2+5,roof],[width/2-5,roof],[width/2,roof+4],[width/2+1,-5],[width/2-2,1],[-width/2+2,1]],ink);
 rect(c,-width/2+2,roof+3,width-4,Math.abs(roof)-4,color);rect(c,-width/2+4,roof+4,width-8,2,'#fff4d8');rect(c,-width/2+3,-7,width-6,5,'#694536');rect(c,-width/2+4,-6,4,3,'#ef9d74');rect(c,width/2-8,-6,4,3,'#ef9d74');rect(c,-4,-6,8,4,'#d8c4a0');
 if(tall){rect(c,-width/2+4,roof+7,width-8,8,'#728f9b');rect(c,-1,roof+7,2,8,ink)}else if(wide||id%3===0)rect(c,-2,roof+4,4,Math.abs(roof)-12,'#e9d7b8');
 if(/fire/.test(type))rect(c,-5,roof-3,10,3,'#ed6b4d');if(/infinite|imperial|galactic/.test(type))poly(c,[[-6,roof+1],[0,roof-5],[6,roof+1]],'#f8c34e');
 if(boost){let l=5+tick%4;poly(c,[[-8,0],[-6,l+6],[-2,0]],'#e96122');poly(c,[[2,0],[6,l+6],[8,0]],'#f8c34e')}
 c.restore()
}
function render(canvasEl,t,g,at,garage,driverMarkup,look){
 if(!canvasEl||typeof canvasEl.getContext!=='function')return false;let c=canvasEl.getContext('2d');if(!c)return false;
 try{
 const p=g.racers[0],asset=trackTexture(t,at),b=basis(t,p,at);driverImage(look,driverMarkup);
 c.setTransform(1,0,0,1,0,0);c.imageSmoothingEnabled=false;skyline(c,t,asset.p,b.heading);ground(c,asset,b);
 const sprites=[];
 for(const o of asset.props){let q=project(b,o.x,o.y);if(q&&q.x>-50&&q.x<W+50&&q.y<H+20)sprites.push({q,draw:()=>scenery(c,q,o.kind,o.variant)})}
 const len=t.route.total;
 for(const o of g.objects){let dist=modDistance(o.d-p.d,len),lap=Math.floor((p.d+dist)/len);if(o.lap===lap)continue;let a=at(t,o.d,o.lane),q=project(b,a.x,a.y);if(q&&q.x>-20&&q.x<W+20&&q.y<H+14)sprites.push({q,draw:()=>pickup(c,q,o.type)})}
 for(let i=1;i<g.racers.length;i++){let r=g.racers[i],a=at(t,r.d,r.lane),q=project(b,a.x,a.y);if(q&&q.x>-35&&q.x<W+35&&q.y<H+10)sprites.push({q,draw:()=>{c.save();c.translate(Math.round(q.x),Math.round(q.y));let z=Math.min(2.1,q.scale*.46);c.scale(z,z);vehicle(c,r,garage.find(v=>v.id===r.car),false,0,false,0);c.restore()}})}
 sprites.sort((a,b)=>b.q.z-a.q.z);
 const playerQ=project(b,b.player.x,b.player.y)||{x:W/2,y:156,z:CAM_BACK};
 sprites.push({q:playerQ,draw:()=>{let lean=clampLean((p.target-p.lane)*.19);c.save();c.translate(Math.round(playerQ.x),Math.round(Math.min(H-12,playerQ.y)));c.scale(1.55,1.55);vehicle(c,p,g.v,true,lean,g.boost>0,Math.floor(g.time*24));if(g.drifting){for(let i=0;i<4;i++)rect(c,(i%2?-1:1)*(13+i*2),2+i%3,2,2,i%2?'#fff4d8':'#f8c34e')}c.restore()}});
 sprites.sort((a,b)=>b.q.z-a.q.z);for(const s of sprites)s.draw();
 return true
 }catch(e){return false}
}
function modDistance(n,m){return ((n%m)+m)%m}
function clampLean(n){return Math.max(-1,Math.min(1,n))}
globalThis.danKartRetro={render,project,basis,width:W,height:H};
})();