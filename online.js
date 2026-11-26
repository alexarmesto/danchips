
(function(){
const URL='https://gosjseehlrdalasaoomf.supabase.co',KEY='sb_publishable_JYeB8bY1-_k9Aejq3Qrgtg_sKqOyJTj';
const db=globalThis.supabase?.createClient(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
let user=null,me=null,players=[],relations=[],mode='global',notice='',busy=false,ready=false,channel=null,refreshTimer,saveTimer,dirty=false,refreshing=false,again=false,epoch=0,visiting=null,flushing=false;
const fields=['crumbs','xp','fed','owned','selected','outfit','lesson','learned','read','courtWins','houses','cars','wardrobe','house','car','shopAt'];
const publicFields='id,username,chips,display_home,display_car,display_outfit,display_chip';
const snapshot=()=>{globalThis.danShopNormalize?.(s);return JSON.parse(JSON.stringify(Object.fromEntries(fields.map(k=>[k,s[k]]))))};
const valid=p=>p&&Number.isSafeInteger(p.fed)&&p.fed>=0&&Number.isSafeInteger(p.xp)&&p.xp>=0&&Number.isSafeInteger(p.crumbs)&&p.crumbs>=0&&Array.isArray(p.owned)&&p.owned.includes(0)&&p.owned.every(n=>Number.isInteger(n)&&n>=0&&n<chips.length)&&p.owned.includes(p.selected)&&Number.isInteger(p.outfit)&&p.outfit>=0&&p.outfit<outfits.length&&Number.isInteger(p.lesson)&&p.lesson>=0&&p.lesson<lessons.length&&Array.isArray(p.learned)&&p.learned.every(n=>Number.isInteger(n)&&n>=0&&n<lessons.length)&&Array.isArray(p.read)&&p.read.every(n=>Number.isInteger(n)&&n>=0&&n<chapters.length)&&(p.courtWins===undefined||(Array.isArray(p.courtWins)&&p.courtWins.length<=13&&new Set(p.courtWins).size===p.courtWins.length&&p.courtWins.every(n=>Number.isInteger(n)&&n>=0&&n<13)))&&(!globalThis.danShopValid||globalThis.danShopValid(p));
const refreshUI=()=>{if(tab===5&&!document.querySelector('main input:focus'))render()};
const say=t=>{notice=t;refreshUI()};
const action=(a,label,cls='secondary')=>'<button class="'+cls+'" data-online="'+a+'" '+(busy?'disabled':'')+'>'+label+'</button>';
const inp=(id,placeholder,type='text',extra='')=>'<input class="socialinput" id="'+id+'" type="'+type+'" placeholder="'+placeholder+'" aria-label="'+placeholder+'" '+extra+'>';
const get=id=>document.getElementById(id)?.value||'';
const check=r=>{if(r.error)throw r.error;return r.data};
const person=id=>players.find(p=>p.id===id);
const relation=id=>relations.find(r=>r.sender===id||r.recipient===id);
const visit=p=>'<button class="player-visit" data-online="visit:'+esc(p.id)+'">Visit →</button>';
function row(p,i){return '<div class="friendrow"><div class="ranknum">'+(i===0?'🥇':i===1?'🥈':i===2?'🥉':'#'+(i+1))+'</div><div class="avatar">🐞</div><div style="flex:1;min-width:0"><strong>'+esc(p.username)+(p.id===user?.id?' (you)':'')+'</strong></div><strong>'+Number(p.chips).toLocaleString()+' 🥔</strong>'+visit(p)+'</div>'}
function onlineSocial(){
let top=head('The Chip Club','A very serious competition for very unserious bugs.');
if(!db)return top+'<div class="panel">Online service unavailable. Reconnect to the internet and reload.</div>';
if(!ready)return top+'<div class="panel">Connecting to the Chip Club…</div>';
if(!user)return top+'<div class="panel"><h3>Join the Chip Club</h3><p class="muted">Create an account to compete online and save your progress. Your email is private; your username, chip total, and equipped home, vehicle, look and snack are visible to other signed-in players.</p>'+inp('onlineEmail','Email','email','autocomplete="email"')+inp('onlinePassword','Password (at least 8 characters)','password','autocomplete="current-password" minlength="8"')+action('login','Sign in','primary')+'<div style="margin-top:10px">'+action('signup','Create account')+'</div><p class="muted">New accounts may require email confirmation. You can keep playing without an account.</p></div><div class="toast">'+esc(notice)+'</div>';
if(!me)return top+'<div class="panel"><h3>Choose a username</h3><p class="muted">3–24 lowercase letters, numbers, or underscores.</p>'+inp('onlineName','e.g. hunny_blanket','text','maxlength="24" autocomplete="off"')+action('name','Join leaderboard','primary')+'</div>'+action('logout','Sign out')+'<div class="toast">'+esc(notice)+'</div>';
let out=top+'<div class="panel split"><div><strong>@'+esc(me.username)+'</strong><div class="muted">Online · '+s.fed.toLocaleString()+' chips</div></div>'+action('logout','Sign out')+'</div><div class="socialtabs" style="grid-template-columns:repeat(3,1fr)">'+action('global','🌎 Global',mode==='global'?'primary':'secondary')+action('friendsboard','🏆 Friends',mode==='friendsboard'?'primary':'secondary')+action('friends','🐞 Add friends',mode==='friends'?'primary':'secondary')+'</div>';
if(visiting){const v=person(visiting);return out+action('leavevisit','← Back to Chip Club','link')+(v?(globalThis.danShowcase?.(v,'@'+v.username+'’s estate')||'<div class="panel">Collection preview unavailable.</div>')+'<div class="panel"><strong>'+Number(v.chips).toLocaleString()+' lifetime chips eaten</strong><p class="muted">Equipped items only. Private saves and crumb balances are not shared.</p></div>':'<div class="panel">This player is not available right now.</div>')+action('refresh','Refresh collection')+'<div class="toast">'+esc(notice)+'</div>'}
if(mode!=='friends'){
const ids=new Set([user.id,...relations.filter(r=>r.status==='accepted').map(r=>r.sender===user.id?r.recipient:r.sender)]);
const list=players.filter(p=>mode==='global'||ids.has(p.id)).sort((a,b)=>b.chips-a.chips||a.username.localeCompare(b.username));
const champion=list[0];out+='<div class="panel" style="text-align:center;background:#f5dfb4"><div style="font-size:38px">🏆</div><small>THE CRUNCH CHAMPION</small><h2>'+esc(champion?.username||me.username)+'</h2><strong style="font-size:26px">'+Number(champion?.chips||0).toLocaleString()+'</strong><div class="muted">Lifetime chips eaten</div></div><div class="panel"><h3>'+(mode==='global'?'Global leaderboard · Top 100':'Friends leaderboard')+'</h3>'+list.map(row).join('')+'</div>'+action('refresh','Refresh scores')+'<p class="muted">Live updates when connected, with periodic refresh as a fallback. Scores are self-reported by the game.</p>';
}else{
out+='<div class="panel"><h3>Find a player</h3>'+inp('onlineSearch','Exact username','text','maxlength="24" autocomplete="off"')+action('find','Send friend request','primary')+'</div>';
const incoming=relations.filter(r=>r.recipient===user.id&&r.status==='pending'),outgoing=relations.filter(r=>r.sender===user.id&&r.status==='pending'),accepted=relations.filter(r=>r.status==='accepted');
const relRow=(r,kind)=>{let id=r.sender===user.id?r.recipient:r.sender;return '<div class="friendrow"><div class="avatar">🐞</div><div style="flex:1"><strong>'+esc(person(id)?.username||'Player')+'</strong></div>'+((kind==='friend'&&person(id))?visit(person(id)):'')+(kind==='in'?action('accept:'+r.sender,'Accept'):'')+action('remove:'+r.sender+':'+r.recipient,kind==='in'?'Decline':kind==='out'?'Cancel':'Remove')+'</div>'};
out+='<div class="panel"><h3>Incoming requests · '+incoming.length+'</h3>'+(incoming.map(r=>relRow(r,'in')).join('')||'<p class="muted">No pending requests.</p>')+'</div><div class="panel"><h3>Sent requests · '+outgoing.length+'</h3>'+(outgoing.map(r=>relRow(r,'out')).join('')||'<p class="muted">No sent requests.</p>')+'</div><div class="panel"><h3>My friends · '+accepted.length+'</h3>'+(accepted.map(r=>relRow(r,'friend')).join('')||'<p class="muted">No friends yet.</p>')+'</div>';
}
return out+'<div class="toast" aria-live="polite">'+esc(notice)+'</div><p class="muted">Cloud saves sync while signed in. Your account data is protected by database access rules.</p>'
}
globalThis.danOnlineSocial=onlineSocial;
globalThis.danKartPublish=async(track,time_ms,finish_place,car)=>{
if(!db||!user||!me)return {status:'offline'};
try{const player_id=user.id,p={player_id,track,time_ms,finish_place,car};
check(await db.from('chip_kart_records').upsert(p,{onConflict:'player_id,track',ignoreDuplicates:true}));
check(await db.from('chip_kart_records').update({time_ms,finish_place,car,updated_at:new Date().toISOString()}).eq('player_id',player_id).eq('track',track).gt('time_ms',time_ms));
return {status:'ok'}}catch(e){return {status:'error'}}
};
globalThis.danKartBoard=async(track)=>{
if(!db||!user||!me)return {status:'offline',rows:[]};
try{const rows=check(await db.from('chip_kart_records').select('time_ms,finish_place,car,chip_players(username)').eq('track',track).order('time_ms',{ascending:true}).limit(20));return {status:'ok',rows:rows||[]}}catch(e){return {status:'error',rows:[]}}
};
async function refresh(){
if(!db||!user||!me)return;if(refreshing){again=true;return}refreshing=true;const token=epoch;
try{
let rel=check(await db.from('chip_friendships').select('sender,recipient,status'));
let list=check(await db.from('chip_players').select(publicFields).order('chips',{ascending:false}).limit(100));
let ids=[...new Set([user.id,...rel.map(r=>r.sender===user.id?r.recipient:r.sender)])].filter(id=>!list.some(p=>p.id===id));
if(ids.length){let more=check(await db.from('chip_players').select(publicFields).in('id',ids));list.push(...more)}
if(token!==epoch)return;relations=rel;players=list;let latest=person(user.id);if(latest)me=latest;refreshUI();
}catch(e){if(token===epoch)say('Unable to refresh scores. Check your connection.')}finally{refreshing=false;if(again){again=false;refresh()}}
}
function schedule(){clearTimeout(refreshTimer);refreshTimer=setTimeout(refresh,350)}
async function flush(){clearTimeout(saveTimer);if(!db||!user||!me||!dirty||flushing)return;flushing=true;const token=epoch,id=user.id,p=snapshot(),display=globalThis.danShopPayload?.()||{};dirty=false;try{check(await db.from('chip_saves').upsert({id,progress:p,updated_at:new Date().toISOString()}));check(await db.from('chip_players').update({chips:Math.max(p.fed,me.chips||0),...display,updated_at:new Date().toISOString()}).eq('id',id));if(token===epoch)schedule()}catch(e){if(token===epoch){dirty=true;say('Cloud save pending. Reconnect to sync.')}}finally{flushing=false;if(dirty&&user&&me&&token===epoch){clearTimeout(saveTimer);saveTimer=setTimeout(flush,15000)}}}
const originalSave=save;
globalThis.danCloudChanged=()=>{if(user&&me){dirty=true;clearTimeout(saveTimer);saveTimer=setTimeout(flush,700)}};
async function activate(u){
const token=++epoch;clearTimeout(saveTimer);dirty=false;if(channel){db.removeChannel(channel);channel=null}user=u;me=null;players=[];relations=[];visiting=null;ready=true;if(!u){refreshUI();return}
try{
const p=check(await db.from('chip_players').select(publicFields).eq('id',u.id).maybeSingle());
const cloud=check(await db.from('chip_saves').select('progress').eq('id',u.id).maybeSingle());
if(token!==epoch)return;
const previous=s.cloudOwner;
if(cloud&&valid(cloud.progress)){if(previous!==u.id||cloud.progress.fed>s.fed||cloud.progress.fed===s.fed&&(cloud.progress.shopAt||0)>=(s.shopAt||0)){Object.assign(s,{courtWins:[],houses:[0],cars:[0],wardrobe:[],house:0,car:0,shopAt:0},cloud.progress)}}
else if(previous&&previous!==u.id){for(const k of fields)s[k]=Array.isArray(defaults[k])?[...defaults[k]]:defaults[k]}
globalThis.danShopNormalize?.(s);s.cloudOwner=u.id;originalSave();me=p;
if(me){dirty=true;await flush();if(token!==epoch)return;channel=db.channel('dan-chip-club-'+u.id).on('postgres_changes',{event:'*',schema:'public',table:'chip_players'},schedule).on('postgres_changes',{event:'*',schema:'public',table:'chip_friendships'},schedule).subscribe();await refresh()}
if(token===epoch)render()
}catch(e){if(token===epoch)say('Could not load account: '+(e.message||'connection error'))}
}
async function onlineClick(e){
const b=e.target.closest('[data-online]');if(!b||b.disabled)return;e.preventDefault();e.stopImmediatePropagation();if(busy)return;let a=b.dataset.online;notice='';
if(a.startsWith('visit:')){let id=a.slice(6);if(person(id)){visiting=id;render();window.scrollTo(0,0)}return}
if(a==='leavevisit'){visiting=null;render();return}
if(['global','friendsboard','friends'].includes(a)){visiting=null;mode=a;render();refresh();return}
if(a==='refresh'){refresh();return}
busy=true;
try{
if(a==='signup'||a==='login'){
let email=get('onlineEmail').trim(),password=get('onlinePassword');if(!email||password.length<8)throw Error('Enter an email and a password of at least 8 characters.');
let result=a==='signup'?await db.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}}):await db.auth.signInWithPassword({email,password});let data=check(result);if(data.session)await activate(data.session.user);else notice='Check your email to confirm your account, then sign in.';
}else if(a==='logout'){await flush();check(await db.auth.signOut());await activate(null);notice='Signed out. Your local game is still available.'}
else if(a==='name'){let username=get('onlineName').trim().toLowerCase();if(!/^[a-z0-9_]{3,24}$/.test(username))throw Error('Choose 3–24 letters, numbers, or underscores.');check(await db.from('chip_players').insert({id:user.id,username,chips:s.fed}));await activate(user);notice='Welcome to the Chip Club!'}
else if(a==='find'){let name=get('onlineSearch').trim().toLowerCase();let p=check(await db.from('chip_players').select('id,username').eq('username',name).maybeSingle());if(!p)throw Error('Player not found. Check their exact username.');if(p.id===user.id)throw Error('Dan appreciates self-love, but that is your own account.');if(relation(p.id))throw Error('You already have a friendship or pending request with this player.');check(await db.from('chip_friendships').insert({sender:user.id,recipient:p.id,status:'pending'}));notice='Friend request sent to @'+p.username;await refresh()}
else if(a.startsWith('accept:')){check(await db.from('chip_friendships').update({status:'accepted'}).eq('sender',a.split(':')[1]).eq('recipient',user.id).eq('status','pending'));notice='Friend accepted!';await refresh()}
else if(a.startsWith('remove:')){let [,sender,recipient]=a.split(':');check(await db.from('chip_friendships').delete().eq('sender',sender).eq('recipient',recipient));notice='Request or friendship removed.';await refresh()}
}catch(e){notice=e.code==='23505'?'That username or friendship already exists.':e.message||'Something went wrong.'}finally{busy=false;render()}
}
root.addEventListener('click',onlineClick,true);
if(db){
db.auth.getSession().then(r=>activate(r.data?.session?.user||null)).catch(()=>{ready=true;notice='Unable to connect. Try again online.';refreshUI()});
db.auth.onAuthStateChange((event,session)=>{if(event==='SIGNED_IN'&&session?.user?.id!==user?.id)setTimeout(()=>activate(session.user),0);if(event==='SIGNED_OUT'&&user)setTimeout(()=>activate(null),0)});
setInterval(()=>{if(user&&me){if(dirty)flush();refresh()}},15000);
window.addEventListener('online',()=>{flush();refresh()});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')flush();else refresh()});
}else{ready=true}
render()
})();
