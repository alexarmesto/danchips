(function(){
const homes=[
['Cardboard Cottage',0,'#e0ad70','#b97642','cottage'],['Chip Bungalow',60,'#f6df9d','#df7540','cottage'],['Hunny Blanket Cabin',120,'#c79158','#9b5b34','cabin'],['Spanish Casita',190,'#fff0cf','#c65c3c','spanish'],['Toad Hall',280,'#b6c78e','#6a985c','manor'],['Dan’s Law Office',380,'#e0c4a2','#6f8795','office'],['Midcentury Crunch House',520,'#f5dfb6','#83a69b','modern'],['Ethnuffy Tower',720,'#c9b6df','#8871b0','tower'],['Domino Manor',950,'#f7e8c8','#4d4b47','manor'],['Lighthouse of Chips',1250,'#f7edd5','#e26a39','light'],['Cosmic Observatory',1700,'#b1c9da','#627da8','dome'],['The Grand Crunch Palace',2500,'#f5d38a','#bc8739','palace']];
const cars=[['Little Scooter',0,'#e7b34d','scooter'],['Crunch Kart',40,'#e96122','kart'],['Toad’s Beetle',95,'#83a96c','beetle'],['Chip Coupe',160,'#d96f58','coupe'],['Hunny Wagon',240,'#e5b04d','wagon'],['Danmobile',340,'#8baec3','sports'],['Domino Limousine',480,'#4e4b48','limo'],['Snack Delivery Van',600,'#e9c98b','van'],['Ethnuffy Hovercar',800,'#a18bcf','hover'],['Attorney’s Roadster',1050,'#813b31','sports'],['Little Trash Truck',1400,'#81a85f','truck'],['Cosmic Cruiser',1900,'#7296c6','rocket'],['Golden Crunchmobile',2800,'#efbd4b','limo']];
const looks=[['Detective Dan',45,'#9b704a','detective'],['Cowboy Dan',65,'#c68b52','cowboy'],['Beach Dan',90,'#6fb5be','beach'],['Artist Dan',120,'#a18bcf','artist'],['Astronaut Dan',160,'#dbe7e3','astronaut'],['Pirate Dan',210,'#4c4951','pirate'],['Knight Dan',270,'#a5b3b9','knight'],['Frog Friend Dan',340,'#83a96c','frog'],['DJ Crunch',420,'#7296c6','dj'],['Wizard Dan',520,'#9276c7','wizard'],['Disco Dan',650,'#e5b04d','disco'],['Chef Supreme',800,'#fff4d8','chef'],['Dragon Dan',1000,'#79a369','dragon'],['Golden Dan',1350,'#efbd4b','gold'],['Galactic Dan',1800,'#7296c6','galaxy'],['Emperor Crunch',2500,'#bd4f40','emperor']];
looks.push(...[["Raincoat Dan",55,"#e9be50","hood/drop","drop","Everyday"],["Pajama Dan",70,"#91acd4","nightcap/moon","moon","Everyday"],["Gardener Dan",85,"#8aaa67","straw/leaf","leaf","Everyday"],["Skater Dan",100,"#e96122","cap/board","board","Everyday"],["Librarian Dan",125,"#ad8c67","glasses/book","book","Everyday"],["Coffee Dan",150,"#936849","apron/cup","cup","Everyday"],["Rainforest Explorer",180,"#b7a279","safari/compass","compass","Everyday"],["Hunny Bear Dan",220,"#d6a86a","bear/heart","heart","Everyday"],["Firefighter Dan",95,"#d6533c","helmet/flame","flame","Careers"],["Construction Dan",120,"#f0b947","hardhat/hammer","hammer","Careers"],["Doctor Dan",160,"#e0e7da","medic/cross","cross","Careers"],["Professor Dan",190,"#756f89","graduate/book","book","Careers"],["Mailbug Dan",215,"#759dbb","cap/envelope","envelope","Careers"],["Captain Dan",280,"#e6e4d7","captain/anchor","anchor","Careers"],["Film Director Dan",340,"#363b4a","beret/clapper","clapper","Careers"],["Master Architect Dan",450,"#8ba3ad","glasses/ruler","ruler","Careers"],["Mountain Dan",125,"#719b8f","beanie/mountain","mountain","Adventure"],["Deep Sea Dan",240,"#bf955c","diver/bubble","bubble","Adventure"],["Safari Ranger Dan",300,"#9caa68","safari/paw","paw","Adventure"],["Arctic Dan",370,"#91b6da","hood/snow","snow","Adventure"],["Ninja Dan",480,"#45424b","mask/star","star","Adventure"],["Samurai Dan",600,"#ba5443","samurai/fan","fan","Adventure"],["Viking Dan",750,"#c4b6a0","viking/shield","shield","Adventure"],["Captain Crunchbeard",950,"#7a4667","tricorn/skull","skull","Adventure"],["Popcorn Dan",75,"#e86d4b","popcorn/corn","corn","Food"],["Pizza Dan",110,"#e9b34c","pizza/pepperoni","pepperoni","Food"],["Taco Dan",145,"#e4b759","taco/leaf","leaf","Food"],["Baguette Dan",195,"#c38d51","bread/wheat","wheat","Food"],["Sushi Dan",250,"#526e5c","sushi/fish","fish","Food"],["Donut Dan",320,"#d998b3","donut/sprinkle","sprinkle","Food"],["Ice Cream Dan",410,"#b8d5cb","icecream/star","star","Food"],["King of Tortillas",850,"#e9bc58","pizza/crown","crown","Food"],["Bunny Dan",120,"#e8b8c7","bunny/carrot","carrot","Creatures"],["Cat Dan",180,"#9da5ad","cat/fish","fish","Creatures"],["Toad Dan",230,"#87ad68","toad/leaf","leaf","Creatures"],["Penguin Dan",300,"#647586","penguin/fish","fish","Creatures"],["Moth Dan",400,"#b9a4c8","moth/moon","moon","Creatures"],["Bat Dan",500,"#716582","bat/moon","moon","Creatures"],["Unicorn Dan",700,"#e5bfdd","unicorn/star","star","Creatures"],["Phoenix Dan",1100,"#e66b3d","phoenix/flame","flame","Creatures"],["Mime Dan",140,"#f1ead7","beret/stripe","stripe","Entertainment"],["Rockstar Dan",220,"#53505b","mohawk/guitar","guitar","Entertainment"],["Jazz Dan",270,"#b88a58","fedora/note","note","Entertainment"],["Magician Dan",360,"#595478","tophat/wand","wand","Entertainment"],["Ringmaster Dan",470,"#bc4f43","tophat/star","star","Entertainment"],["Clown Dan",550,"#e1a3aa","clown/bow","bow","Entertainment"],["Superhero Dan",750,"#537fae","hero/bolt","bolt","Entertainment"],["Movie Star Dan",1000,"#d6aa57","shades/star","star","Entertainment"],["Alchemist Dan",300,"#729a88","hood/flask","flask","Fantasy"],["Forest Druid Dan",450,"#7b9c5f","antlers/leaf","leaf","Fantasy"],["Moon Priest Dan",650,"#9296c5","halo/moon","moon","Fantasy"],["Crystal Knight Dan",900,"#9ec9d9","crystal/shield","shield","Fantasy"],["Clockwork Dan",1200,"#b48750","goggles/gear","gear","Fantasy"],["Ghost Dan",1450,"#d5dce6","ghost/star","star","Fantasy"],["Stormcaller Dan",1850,"#697ca7","crown/bolt","bolt","Fantasy"],["Ethnuffy Archmage",2400,"#8c67b5","archmage/orb","orb","Fantasy"],["Solar Dan",1500,"#efb747","sun/flame","flame","Legendary"],["Lunar Dan",1750,"#aebbe5","crescent/moon","moon","Legendary"],["Nebula Dan",2100,"#9c78ba","orbit/star","star","Legendary"],["Diamond Dan",2800,"#9ed9dc","crystal/diamond","diamond","Legendary"],["The Honorable Baby",3500,"#a0a1a9","cat/gavel","gavel","Legendary"],["The Eternal Crunch",5000,"#ebbc4e","radiant/infinity","infinity","Legendary"]]);

function expandedHat(a){
const c=a[2],t=a[3].split('/')[0],em=a[4],ink='#452416',gold='#f8c34e',cream='#fff4d8',blue='#b9dce5';
const path=(d,f=c,extra='')=>'<path d="'+d+'" fill="'+f+'" '+extra+'/>';
const circ=(x,y,r,f=c)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+f+'"/>';
const rect=(x,y,w,h,f=c,rx=4)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+rx+'" fill="'+f+'"/>';
const star=(x,y,r=12,f=gold)=>path(Array.from({length:10},(_,i)=>{const a=i*Math.PI/5-Math.PI/2,k=i%2?r*.45:r;return(i?'L':'M')+(x+Math.cos(a)*k).toFixed(1)+' '+(y+Math.sin(a)*k).toFixed(1)}).join('')+'Z',f);
const cap=()=>path('M78 40Q75 9 112 10Q145 10 149 39L168 45Q141 52 103 43Z')+path('M112 12V40','none','stroke-width="2"');
const hood=()=>path('M75 71Q65 32 78 14Q110 -9 147 15Q164 39 151 72L141 49Q111 28 86 50Z')+path('M86 50Q80 80 81 119L98 137L107 120','none');
const brim=()=>path('M65 39Q111 20 159 39L150 46H74Z')+path('M87 34L92 9Q112 2 133 9L139 34Z')+path('M90 27H136','none');
const crown=()=>path('M77 42L70 6L96 24L112 -5L131 24L155 6L148 42Z')+circ(112,27,6,gold);
const suit=()=>path('M145 76Q193 58 238 89L244 116Q198 142 149 119Z',c)+path('M151 81L234 113','none','stroke="'+cream+'" stroke-width="3"');
let h='';
switch(t){
case 'hood':h=hood();break;
case 'nightcap':h=path('M78 44Q86 4 126 3Q151 0 155 25L136 16L148 44Z')+circ(156,27,7,cream)+path('M80 42H148','none','stroke="'+cream+'" stroke-width="6"');break;
case 'straw':h=brim()+path('M80 38L144 38','none','stroke="#d6a249" stroke-dasharray="3 3"');break;
case 'cap':h=cap();break;
case 'glasses':h=rect(81,76,34,26,blue,6)+rect(119,76,34,26,blue,6)+path('M115 88H119','none')+path('M99 117L115 129L131 117L127 144H103Z');break;
case 'apron':h=path('M96 115L139 116L144 151H94Z',c)+path('M99 116L88 95M137 116L148 95','none')+rect(108,133,19,13,cream);break;
case 'safari':h=path('M67 40Q79 23 146 25L160 40Q113 52 67 40Z')+path('M81 32Q87 0 114 0Q140 4 145 32Z')+path('M84 25H141','none','stroke-width="5"');break;
case 'bear':h=circ(83,18,15)+circ(142,18,15)+circ(83,18,7,cream)+circ(142,18,7,cream)+path('M78 43Q80 13 112 13Q144 13 148 43Z');break;
case 'helmet':h=path('M73 40Q74 4 112 4Q150 4 152 40L165 46H65Z')+rect(102,14,22,20,gold)+path('M112 5V14','none');break;
case 'hardhat':h=path('M76 41Q79 6 112 6Q148 6 151 41L160 45H66Z')+path('M99 7V39M125 7V39','none')+path('M68 45H158','none','stroke-width="6"');break;
case 'medic':h=rect(83,12,60,30,cream)+path('M106 17H118V23H124V31H118V37H106V31H100V23H106Z','#d6533c','stroke="none"');break;
case 'graduate':h=rect(88,23,50,22,c)+path('M64 21L112 0L161 21L112 42Z')+path('M155 24V51','none','stroke="'+gold+'"')+circ(155,52,4,gold);break;
case 'captain':h=path('M76 34Q72 4 112 4Q152 4 148 34Z')+path('M76 30H148L156 44H69Z','#304c65')+circ(112,22,8,gold);break;
case 'beret':h=path('M76 30Q67 6 100 6Q151 -2 151 27L137 40H83Z')+path('M109 6V-1','none');break;
case 'beanie':h=path('M77 42V27Q77 0 112 0Q148 0 148 27V42Z')+rect(76,31,73,13,cream)+circ(112,-1,9);break;
case 'diver':h=circ(117,92,59,c)+circ(117,92,45,blue)+circ(117,92,34,'none')+path('M117 49V135M72 92H162','none','stroke-width="2"')+rect(100,139,35,12,c);break;
case 'mask':h=path('M75 53Q76 20 112 20Q150 20 155 53L145 72H85Z')+path('M75 106Q114 117 155 106L146 128Q111 143 86 128Z')+path('M146 49L170 28L160 60Z');break;
case 'samurai':h=path('M67 43L76 16L92 25L112 1L133 25L149 16L160 43Z')+path('M73 33H151M80 43L73 66M146 43L153 66','none')+path('M104 20L112 7L120 20Z',gold);break;
case 'viking':h=path('M76 42Q76 7 112 7Q148 7 148 42Z')+path('M83 29Q57 35 56 3Q70 21 93 17ZM142 29Q168 35 169 3Q155 21 132 17Z',cream)+path('M112 8V42','none','stroke-width="7"');break;
case 'tricorn':h=path('M66 44L79 6L111 22L148 6L160 44Z')+path('M79 12L111 27L146 12','none','stroke="'+gold+'"')+circ(112,33,7,cream);break;
case 'popcorn':h=path('M82 20H145L135 46H91Z','#fff4d8')+path('M94 23L101 45M122 23L119 45','none','stroke="#e96122" stroke-width="9"')+[89,105,122,138].map((x,i)=>circ(x,17-i%2*5,10,gold)).join('');break;
case 'pizza':h=path('M69 42L111 -6L157 42Z',gold)+path('M69 42H157','none','stroke="#c38d51" stroke-width="8"')+circ(111,15,5,'#d6533c')+circ(96,30,5,'#d6533c')+circ(127,30,5,'#d6533c');break;
case 'taco':h=path('M67 42Q74 -5 112 -5Q150 -5 157 42Z')+path('M76 30L90 17L103 25L114 13L128 24L143 18L151 33','none','stroke="#7b9c5f" stroke-width="8"');break;
case 'bread':h=path('M75 39Q49 12 75 2L148 17Q169 27 148 45Z')+path('M86 9L77 24M106 13L96 29M126 17L116 33','none','stroke="'+cream+'"');break;
case 'sushi':h=rect(78,13,71,30,c,8)+rect(83,8,61,14,cream,7)+rect(95,5,36,10,'#e88d75',4);break;
case 'donut':h=circ(112,22,32,'#b9854d')+circ(112,22,26,c)+circ(112,22,10,cream)+path('M90 10L96 14M126 8L131 13M93 34L99 29M130 30L135 34','none','stroke="'+cream+'"');break;
case 'icecream':h=path('M90 16H135L112 46Z','#c38d51')+circ(101,12,16,c)+circ(125,11,16,'#e1a3aa')+circ(113,-4,15,cream);break;
case 'bunny':h=path('M85 34Q65 -13 83 -23Q100 -19 104 33ZM122 33Q128 -20 144 -23Q160 -12 140 34Z')+path('M86 17L83 -10M138 17L145 -10','none','stroke="#d8799b" stroke-width="6"')+path('M78 43Q83 21 112 21Q143 21 148 43Z');break;
case 'cat':h=path('M77 42L76 -4L100 15L124 15L149 -4L148 42Z')+path('M83 6L97 20H83ZM141 6L127 20H141Z','#d998a3')+path('M80 108L58 102M80 118L58 121M151 108L173 102M151 118L173 121','none','stroke-width="2"');break;
case 'toad':h=path('M76 43Q76 10 112 10Q148 10 148 43Z')+circ(91,12,14)+circ(135,12,14)+circ(91,12,6,cream)+circ(135,12,6,cream)+circ(112,34,4,'#64834b');break;
case 'penguin':h=path('M77 43Q75 8 112 8Q149 8 148 43Z')+path('M95 39Q112 17 130 39Z',cream)+path('M104 37L121 37L112 47Z',gold)+suit();break;
case 'moth':h=path('M149 72Q169 22 214 33Q260 44 232 86Q260 108 218 139Q177 136 149 104Z')+path('M163 72L213 43M165 96L220 126','none','stroke="'+cream+'"')+circ(208,76,10,cream)+path('M89 29L75 9M133 29L150 9','none','stroke-width="6"');break;
case 'bat':h=path('M145 86L163 38L194 64L222 39L252 82L241 123L213 107L190 129L170 111Z')+path('M81 42L79 7L103 26L123 26L147 7L147 42Z');break;
case 'unicorn':h=path('M75 43L79 10L103 23L124 23L145 10L149 43Z')+path('M101 24L112 -21L124 24Z',gold)+path('M105 8L120 15M109 -5L116 0','none','stroke-width="2"')+path('M150 64Q203 38 244 87L241 120L217 111L200 130L184 115L151 123Z',c);break;
case 'phoenix':h=path('M76 43L79 12L95 25L112 -13L130 25L146 12L149 43Z')+path('M145 75Q181 24 240 33L216 57L253 62L227 86L250 96L219 126L153 120Z',c)+path('M165 88L229 49M169 103L238 79','none','stroke="'+gold+'"');break;
case 'mohawk':h=path('M83 43L81 9L94 15L105 -12L118 12L129 -7L142 16L148 43Z')+path('M101 26L119 4','none','stroke="#e96122" stroke-width="6"');break;
case 'fedora':h=brim()+path('M97 9L112 16L127 9','none')+path('M90 26H137','none','stroke="#4e3f38" stroke-width="7"');break;
case 'tophat':h=rect(84,-3,57,43,c,5)+path('M66 40H160V47H66Z')+rect(85,27,55,9,'#bd4f40',1);break;
case 'clown':h=[80,96,112,128,144].map((x,i)=>circ(x,23+(i%2)*-10,14,['#e96122','#e9be50','#91acd4'][i%3])).join('')+circ(116,107,9,'#e96122')+path('M96 119L114 128L135 119V145L114 135L96 145Z');break;
case 'hero':h=path('M80 77H150L145 103L125 105L115 94L104 105H85Z',c)+path('M149 81Q200 50 249 83L235 137L215 126L193 144L153 115Z')+star(199,96,14);break;
case 'shades':h=rect(79,77,35,23,'#304c65',6)+rect(121,77,35,23,'#304c65',6)+path('M114 86H121','none')+path('M86 82L105 79M128 82L147 79','none','stroke="'+cream+'"');break;
case 'antlers':h=path('M91 39V10L74 -10M91 10L100 -7M132 39V10L150 -10M132 10L123 -7','none','stroke="'+c+'" stroke-width="7"')+path('M77 42Q112 19 148 42Z');break;
case 'halo':h='<ellipse cx="112" cy="12" rx="43" ry="12" fill="none" stroke="'+gold+'" stroke-width="6"/>'+suit();break;
case 'crystal':h=path('M75 42L81 12L98 22L112 -12L130 22L145 12L151 42Z')+path('M112 -12V42M81 12L98 42M145 12L129 42','none','stroke="'+cream+'"')+suit();break;
case 'goggles':h=rect(78,74,77,32,c,9)+circ(97,90,12,blue)+circ(136,90,12,blue)+path('M77 91H64M155 91H168','none','stroke-width="6"');break;
case 'ghost':h=path('M71 111Q68 15 112 7Q162 10 163 112L151 131L139 117L128 136L116 119L104 136L92 117L80 131Z',c,'opacity=".72"')+circ(100,85,8,ink)+circ(133,85,8,ink);break;
case 'crown':h=crown()+suit();break;
case 'archmage':h=path('M67 44H159L135 24L115 -24L92 25Z')+star(114,16,13)+path('M150 69Q200 43 249 87L235 138L208 125L183 142L150 115Z');break;
case 'sun':h=Array.from({length:12},(_,i)=>{let a=i*Math.PI/6;return path('M'+(117+Math.cos(a)*50)+' '+(92+Math.sin(a)*50)+'L'+(117+Math.cos(a)*70)+' '+(92+Math.sin(a)*70),'none','stroke="'+gold+'" stroke-width="6"')}).join('')+crown();break;
case 'crescent':h=path('M137 -4Q87 -20 85 25Q86 57 132 44Q102 35 106 16Q111 0 137 -4Z',c)+star(145,8,9);break;
case 'orbit':h='<ellipse cx="117" cy="92" rx="70" ry="42" transform="rotate(-24 117 92)" fill="none" stroke="'+c+'" stroke-width="6"/>'+star(67,35,11)+star(162,17,10)+suit();break;
case 'radiant':h=crown()+suit()+[[-8,48],[58,18],[171,12],[265,63],[260,129]].map(([x,y])=>star(x,y,11)).join('');break;
default:h=crown();
}
// Tiny original emblem on the shell; each costume has its own prop silhouette.
let badge='';
switch(em){
case 'drop':badge=path('M199 81Q186 99 190 107Q199 119 208 107Q213 99 199 81Z',blue);break;
case 'moon':badge=path('M209 82Q180 80 187 104Q193 118 212 110Q196 106 199 95Q202 86 209 82Z',cream);break;
case 'leaf':badge=path('M183 107Q181 81 213 81Q214 109 183 107Z','#9fbd73')+path('M184 107L207 86','none');break;
case 'board':badge=rect(181,96,40,10,c,5)+circ(188,110,4,cream)+circ(214,110,4,cream);break;
case 'book':badge=path('M178 84Q190 81 200 88Q211 81 223 84V110Q211 107 200 114Q190 107 178 110Z',cream)+path('M200 88V114','none');break;
case 'cup':badge=rect(188,88,24,23,cream)+path('M212 92Q228 91 222 104L212 106','none')+path('M194 82V76M205 82V76','none');break;
case 'compass':badge=circ(200,98,17,cream)+path('M191 109L196 92L211 87L205 103Z','#e96122');break;
case 'heart':badge=path('M200 113Q173 95 186 84Q194 77 200 89Q208 77 216 84Q229 95 200 113Z','#e68b91');break;
case 'flame':badge=path('M200 78Q207 93 216 99Q224 115 200 119Q177 115 185 99Q194 95 200 78Z','#e96122')+path('M200 97L207 111L193 111Z',gold);break;
case 'hammer':badge=rect(195,90,9,29,'#9b704a')+rect(182,82,35,12,'#a5b3b9');break;
case 'cross':badge=path('M194 82H206V92H216V104H206V115H194V104H184V92H194Z','#d6533c');break;
case 'envelope':badge=rect(181,85,38,28,cream)+path('M181 85L200 100L219 85','none');break;
case 'anchor':badge=circ(200,84,5,'none')+path('M200 89V115M184 101Q184 115 200 115Q216 115 216 101M190 94H210','none');break;
case 'clapper':badge=rect(180,91,40,23,'#304c65')+path('M180 90L218 78L221 87L183 99Z',cream)+path('M190 87L197 93M207 82L214 88','none');break;
case 'ruler':badge=path('M181 83L220 112H181Z',gold)+path('M186 95L197 105H186Z',cream);break;
case 'mountain':badge=path('M178 113L194 84L206 99L214 89L227 113Z',blue)+path('M188 96L194 84L201 95Z',cream);break;
case 'bubble':badge=circ(191,103,10,blue)+circ(210,86,8,blue)+circ(217,108,5,cream);break;
case 'paw':badge=circ(200,104,12,cream)+[184,194,206,216].map((x,i)=>circ(x,88-i%2*4,5,cream)).join('');break;
case 'snow':badge=path('M200 80V116M184 89L216 107M184 107L216 89','none','stroke="'+cream+'" stroke-width="5"');break;
case 'fan':badge=path('M200 115L179 89Q200 73 221 89Z',cream)+path('M200 115L188 86M200 115L200 82M200 115L212 86','none','stroke-width="2"');break;
case 'shield':badge=path('M181 83H219V104L200 120L181 104Z',cream)+path('M200 85V114M184 97H216','none');break;
case 'skull':badge=circ(200,96,15,cream)+rect(192,104,16,11,cream)+circ(194,94,4,ink)+circ(206,94,4,ink);break;
case 'corn':badge=path('M191 115Q178 99 189 84Q207 76 217 94L207 115Z',gold)+path('M188 93L212 98M187 104L209 108M198 84L196 114','none','stroke-width="2"');break;
case 'pepperoni':badge=circ(200,98,17,'#d6533c')+circ(194,92,3,cream)+circ(206,104,3,cream);break;
case 'wheat':badge=path('M200 117V81M200 97L188 88M200 103L212 94M200 110L188 101','none','stroke="'+gold+'" stroke-width="5"');break;
case 'fish':badge=path('M181 98Q195 81 211 98L223 88V108L211 98Q195 115 181 98Z',blue)+circ(191,96,2,ink);break;
case 'sprinkle':badge=path('M184 85L190 91M201 82L206 88M214 94L219 100M184 107L190 113M201 105L206 111','none','stroke="'+cream+'" stroke-width="5"');break;
case 'crown':badge=path('M180 110L176 85L190 96L200 81L210 96L224 85L220 110Z',gold);break;
case 'carrot':badge=path('M186 91L213 104L185 118Z','#e96122')+path('M205 100L216 84M205 100L225 97','none','stroke="#83a96c" stroke-width="5"');break;
case 'stripe':badge=rect(180,85,40,28,cream)+path('M181 92H219M181 105H219','none','stroke-width="5"');break;
case 'guitar':badge=circ(190,106,13,'#e96122')+rect(193,83,9,25,cream)+path('M199 84L218 75L223 82L204 91Z',gold);break;
case 'note':badge=circ(192,110,8,cream)+path('M200 109V81L220 86V95L200 89','none','stroke="'+cream+'" stroke-width="5"');break;
case 'wand':badge=path('M184 113L213 84','none','stroke-width="7"')+star(216,81,10);break;
case 'bow':badge=path('M181 85L200 98L219 85V111L200 98L181 111Z',cream)+circ(200,98,5,gold);break;
case 'bolt':badge=path('M202 80L181 102H197L193 118L220 93H205L212 80Z',gold);break;
case 'flask':badge=path('M194 81H206V94L220 115H180L194 94Z',blue)+path('M187 106H213','none','stroke-width="5"');break;
case 'gear':badge=star(200,98,21,gold)+circ(200,98,8,cream);break;
case 'orb':badge=circ(200,98,19,'#aa97d4')+star(196,94,9,cream);break;
case 'diamond':badge=path('M181 91L190 81H210L219 91L200 118Z',blue)+path('M181 91H219M190 81L200 118L210 81','none','stroke-width="2"');break;
case 'gavel':badge=rect(195,95,7,24,'#9b704a')+rect(181,81,38,16,'#c79158');break;
case 'infinity':badge=path('M200 98C180 73 169 105 187 110Q199 111 213 87Q231 82 231 99Q228 118 213 110Z','none','stroke="'+gold+'" stroke-width="5"');break;
default:badge=star(200,98,15,gold);
}
return '<g stroke="#452416" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">'+h+badge+'</g>';
}
const validIndex=(n,a)=>Number.isInteger(n)&&n>=0&&n<a.length?n:0;
const safeArray=(a,max)=>Array.isArray(a)?[...new Set(a.filter(n=>Number.isInteger(n)&&n>=0&&n<max))]:[];
function normalize(p){p.houses=[...new Set([0,...safeArray(p.houses,homes.length)])];p.cars=[...new Set([0,...safeArray(p.cars,cars.length)])];p.wardrobe=safeArray(p.wardrobe,looks.length);p.house=p.houses.includes(p.house)?p.house:0;p.car=p.cars.includes(p.car)?p.car:0;p.shopAt=Number.isSafeInteger(p.shopAt)&&p.shopAt>=0?p.shopAt:0;if(p.outfit>=15&&!p.wardrobe.includes(p.outfit-15))p.outfit=0;return p}
function valid(p){return ['houses','cars','wardrobe'].every((k,i)=>p[k]===undefined||(Array.isArray(p[k])&&p[k].length<=[homes.length,cars.length,looks.length][i]&&p[k].every(n=>Number.isInteger(n)&&n>=0&&n<[homes.length,cars.length,looks.length][i])))&&['house','car','shopAt'].every(k=>p[k]===undefined||(Number.isSafeInteger(p[k])&&p[k]>=0))}
const svg=(w,h,body,alt)=>'<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+esc(alt)+'" xmlns="http://www.w3.org/2000/svg">'+body+'</svg>';
function houseBody(i){const a=homes[validIndex(i,homes)],c=a[2],r=a[3],type=a[4];const box=(x,y,w,h,fill)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4" fill="'+fill+'"/>';
const win=(x,y,w=23,h=27)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="3" fill="#b9dce5"/><path d="M'+(x+w/2)+' '+y+'V'+(y+h)+'M'+x+' '+(y+h/2)+'H'+(x+w)+'" fill="none" stroke-width="2"/>';
const door=(x,y,w=26,h=43)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="5" fill="#a87545"/><circle cx="'+(x+w-7)+'" cy="'+(y+h/2)+'" r="2.5" fill="#f8c34e" stroke="none"/>';
let art;
if(type==='tower')art=box(77,28,86,114,c)+'<path d="M60 30L120 0L180 30Z" fill="'+r+'"/>'+win(106,43,28,28)+win(106,81,28,25)+door(107,107,26,35)+'<path d="M120 1V-10" fill="none"/>';
else if(type==='light')art='<path d="M97 143L109 36H147L162 143Z" fill="'+c+'"/><path d="M106 60H151L154 79H103ZM100 103H158L160 120H98Z" fill="'+r+'"/>'+box(103,18,51,23,'#b9dce5')+'<path d="M94 20L129 1L163 20Z" fill="'+r+'"/><path d="M128 18V41M98 42H159" fill="none"/>'+door(116,112,26,31)+'<path d="M154 26L218 7V49Z" fill="#f8c34e" opacity=".42" stroke="none"/>';
else if(type==='dome')art=box(36,82,168,62,c)+'<path d="M42 81Q42 12 120 12Q198 12 198 81Z" fill="'+r+'"/><path d="M120 12V81M82 25Q65 49 65 81M158 25Q175 49 175 81" fill="none"/><path d="M120 53L165 7L187 26L140 73Z" fill="#f5dfb6"/>'+win(53,95,32,23)+win(155,95,32,23)+door(107,103,26,41);
else if(type==='palace'||type==='manor')art=box(34,54,172,90,c)+box(23,34,47,110,c)+box(170,34,47,110,c)+'<path d="M17 36L46 8L76 36ZM164 36L194 8L223 36ZM66 55L120 14L175 55Z" fill="'+r+'"/>'+win(34,48,24,29)+win(182,48,24,29)+win(81,68,27,27)+win(132,68,27,27)+win(34,100,24,24)+win(182,100,24,24)+door(106,102,28,42)+(type==='palace'?'<circle cx="120" cy="32" r="9" fill="#f8c34e"/><path d="M120 14V-1L141 4L120 9" fill="#df693b"/>':'');
else if(type==='office')art=box(36,29,168,115,c)+'<path d="M29 29H211V42H29Z" fill="'+r+'"/>'+win(51,48,35,35)+win(103,48,35,35)+win(154,48,35,35)+box(46,88,148,23,'#875026')+'<text x="120" y="103" text-anchor="middle" font-size="10" font-weight="900" fill="#fff8e9" stroke="none">DAN · LAW</text>'+door(105,110,30,34);
else if(type==='modern')art=box(29,64,182,80,c)+box(99,35,104,45,c)+'<path d="M19 62L113 45L220 63V75H19Z" fill="'+r+'"/>'+win(44,84,49,41)+win(145,84,48,41)+door(108,101,25,43)+'<path d="M99 35H203" stroke="'+r+'" stroke-width="8"/>';
else if(type==='spanish')art=box(32,57,176,87,c)+'<path d="M20 58L120 17L220 58Z" fill="'+r+'"/><path d="M43 47L197 47M66 37H174" fill="none" stroke="#a84a20" stroke-width="2"/>'+win(49,77,29,35)+win(162,77,29,35)+'<path d="M98 144V105Q120 73 142 105V144Z" fill="#a87545"/>';
else art=box(43,60,154,84,c)+'<path d="M31 63L120 10L209 63Z" fill="'+r+'"/>'+win(57,81,29,34)+win(154,81,29,34)+door(106,101,28,43)+(type==='cabin'?'<path d="M43 72H197M43 94H197M43 116H197M43 137H197" stroke="#8d613e" stroke-width="2" opacity=".55"/>':'')+(i===0?'<path d="M43 63V144M197 63V144" stroke="#b5814e" stroke-dasharray="4 4"/><path d="M109 20L120 10L131 20" fill="none"/>':'');
return '<g stroke="#875026" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'+art+'</g>'}
function carBody(i){const a=cars[validIndex(i,cars)],c=a[2],type=a[3];const wheels=(x1,x2)=>'<circle cx="'+x1+'" cy="63" r="13" fill="#403b36"/><circle cx="'+x2+'" cy="63" r="13" fill="#403b36"/><circle cx="'+x1+'" cy="63" r="5" fill="#d8c6a1"/><circle cx="'+x2+'" cy="63" r="5" fill="#d8c6a1"/>';
let art;
if(type==='scooter')art='<path d="M27 58H75L95 25H113M75 58H125" fill="none" stroke="#875026" stroke-width="5"/><path d="M42 50H80L91 33H102L96 59H42Z" fill="'+c+'"/><rect x="42" y="36" width="30" height="9" rx="4" fill="#634936"/>'+wheels(29,124);
else if(type==='hover'||type==='rocket')art='<path d="M12 47Q45 33 64 20H113L145 39L171 45L175 59H13Z" fill="'+c+'"/><path d="M68 24H110L131 38H49Z" fill="#b9dce5"/><path d="M22 63H160" stroke="#9ed6df" stroke-width="7"/>'+(type==='rocket'?'<path d="M16 48L2 29L38 40M150 47L170 27L180 45" fill="#e96122"/>':'')+'<path d="M25 76H157" stroke="#9ed6df" opacity=".6" stroke-width="4"/>';
else if(type==='truck'||type==='van')art='<rect x="13" y="18" width="108" height="43" rx="5" fill="'+c+'"/><path d="M121 27H151L173 46V61H121Z" fill="#e96122"/><path d="M129 30H149L164 46H129Z" fill="#b9dce5"/><path d="M29 22V58M49 22V58M69 22V58M89 22V58" stroke="#875026" opacity=".35"/>'+wheels(43,146);
else {let roof=type==='beetle'?'M21 40Q29 10 67 12Q111 10 137 40':type==='wagon'?'M26 38L46 17H125L147 38':type==='kart'?'M38 39L55 31H95L120 39':type==='limo'?'M23 38L44 17H143L157 38':type==='sports'?'M22 39L75 19H121L153 39':'M24 39L58 16H115L146 39';art='<path d="'+roof+'L168 44L176 59H9L12 48Z" fill="'+c+'"/><path d="M60 23H112L134 38H43Z" fill="#b9dce5"/><path d="M88 23V38" fill="none"/><path d="M19 50H169" stroke="#fff4d8" opacity=".7" stroke-width="2"/>'+wheels(38,146)}
return '<g stroke="#452416" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'+art+'</g>'}
function hat(i){const a=looks[i-15];if(!a)return '';if(i>=31)return expandedHat(a);let c=a[2],t=a[3],art='';
if(t==='detective'||t==='cowboy')art='<path d="M68 39Q112 22 156 39L146 45H76Z" fill="'+c+'"/><path d="M88 33L93 12Q112 1 132 12L139 34Z" fill="'+c+'"/><path d="M92 27H136" stroke="#452416"/>';
else if(t==='beach')art='<path d="M72 38Q112 15 152 38L143 45H81Z" fill="#e5b04d"/><path d="M95 31Q112 1 132 31Z" fill="#f8c34e"/><path d="M82 86H116M118 86H149" stroke="#304c65" stroke-width="11"/><path d="M117 111L139 124L133 143H104L97 123Z" fill="'+c+'"/>';
else if(t==='artist')art='<ellipse cx="111" cy="23" rx="39" ry="17" fill="'+c+'"/><path d="M111 8V0" fill="none"/><path d="M99 117L135 119L128 146H106Z" fill="#fff4d8"/><circle cx="119" cy="132" r="6" fill="#e96122"/>';
else if(t==='astronaut')art='<circle cx="117" cy="92" r="58" fill="#b9dce5" fill-opacity=".23" stroke="#dbe7e3" stroke-width="8"/><path d="M81 44L94 33H141" fill="none" stroke="#fff4d8" stroke-width="5"/><path d="M95 145H142" stroke="#dbe7e3" stroke-width="12"/>';
else if(t==='pirate')art='<path d="M69 41L83 13L111 25L141 13L157 41Z" fill="'+c+'"/><circle cx="112" cy="32" r="8" fill="#fff4d8"/><path d="M102 89H146" stroke="#452416" stroke-width="4"/><ellipse cx="133" cy="91" rx="14" ry="12" fill="#452416"/>';
else if(t==='knight')art='<path d="M78 47V18Q113 -7 149 18V47Z" fill="'+c+'"/><path d="M89 22H138M90 31H138" stroke="#677780"/><path d="M110 11V-4" stroke="#e96122" stroke-width="8"/><path d="M146 112L164 100L183 112V135L164 149L146 135Z" fill="#a5b3b9"/>';
else if(t==='frog')art='<path d="M76 43Q76 12 112 12Q148 12 148 43Z" fill="'+c+'"/><circle cx="91" cy="15" r="13" fill="'+c+'"/><circle cx="135" cy="15" r="13" fill="'+c+'"/><circle cx="91" cy="13" r="5" fill="#fff4d8"/><circle cx="135" cy="13" r="5" fill="#fff4d8"/>';
else if(t==='dj')art='<path d="M69 81Q62 16 112 16Q162 16 156 81" fill="none" stroke="#304c65" stroke-width="8"/><rect x="62" y="73" width="14" height="28" rx="5" fill="'+c+'"/><rect x="149" y="73" width="14" height="28" rx="5" fill="'+c+'"/>';
else if(t==='wizard')art='<path d="M65 44H160L137 30L113 -12L89 31Z" fill="'+c+'"/><path d="M114 11L118 21L129 23L120 29L122 39L114 33L105 39L108 29L99 23L110 21Z" fill="#f8c34e"/>';
else if(t==='disco')art='<path d="M79 84H151L145 101H123L114 92L105 101H84Z" fill="#304c65"/><path d="M88 90L103 86M127 90L142 86" stroke="#e5b04d"/><path d="M96 114L117 129L141 114L137 148H100Z" fill="'+c+'"/>';
else if(t==='chef')art='<path d="M80 42V24Q61 4 90 -3Q112 -19 130 -3Q157 -5 153 20L145 42Z" fill="#fff4d8"/><path d="M81 35H146" stroke="#e96122"/><path d="M101 117L114 130L127 117" fill="#e96122"/>';
else if(t==='dragon')art='<path d="M78 45L70 12L98 27L111 5L128 27L152 11L146 45Z" fill="'+c+'"/><path d="M166 73L187 46L203 66L223 52L242 89Z" fill="#79a369"/><path d="M167 74L203 66L242 89" fill="none"/>';
else if(t==='gold'||t==='emperor')art='<path d="M77 39L72 7L97 24L112 -4L127 24L153 7L147 39Z" fill="#efbd4b"/><circle cx="112" cy="22" r="6" fill="'+(t==='emperor'?'#bd4f40':'#fff4d8')+'"/><path d="M145 68Q201 46 246 90L242 126Q190 150 147 119Z" fill="'+(t==='emperor'?'#bd4f40':'#efbd4b')+'"/><path d="M153 78L238 113" stroke="#fff4d8"/>';
else art='<circle cx="117" cy="92" r="60" fill="none" stroke="#7296c6" stroke-width="6"/><path d="M77 39L93 15L112 27L132 5L150 39Z" fill="'+c+'"/><circle cx="93" cy="28" r="4" fill="#fff4d8"/><circle cx="133" cy="21" r="4" fill="#fff4d8"/>';
return '<g stroke="#452416" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">'+art+'</g>'}
function danBody(i){i=validIndex(i,outfits);const raw=dan(i,i===11,false),a=raw.indexOf('<g class='),b=i===11?raw.indexOf('<path d="M8 163'):raw.indexOf('</g><g transform=',a)+4;return a>=0&&b>a?raw.slice(a,b):''}
function scenery(h,c,o,chip){return svg(340,230,'<rect width="340" height="230" fill="#f7e4b9"/><circle cx="285" cy="35" r="26" fill="#ffedb0"/><path d="M0 133Q53 85 119 125T243 114T340 125V230H0Z" fill="#b9cb92"/><path d="M0 160Q94 144 180 165T340 151V230H0Z" fill="#e7c18a"/><path d="M0 195Q110 182 340 196V230H0Z" fill="#c8a77a"/><path d="M0 210H340" stroke="#f8e8c2" stroke-width="3" stroke-dasharray="20 13"/><g transform="translate(8 9) scale(.95)">'+houseBody(h)+'</g><g transform="translate(192 98) scale(.70)">'+carBody(c)+'</g><svg x="20" y="107" width="143" height="99" viewBox="'+(o>=31?'-16 -30 295 195':'15 0 270 170')+'" overflow="visible">'+danBody(o)+'</svg><svg x="176" y="172" width="35" height="35" viewBox="0 0 106 94">'+chipArt(chip,true).replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')+'</svg>','Dan with '+homes[h][0]+', '+cars[c][0]+', '+outfits[o][0])}
function showcase(h,c,o,k,name='Dan’s estate'){h=validIndex(h,homes);c=validIndex(c,cars);o=validIndex(o,outfits);k=validIndex(k,chips);return '<div class="estate-card"><div class="estate-heading"><strong>'+esc(name)+'</strong><small>THE CRUMB LIFE</small></div>'+scenery(h,c,o,k)+'<div class="estate-details"><div><small>HOME</small><strong>'+esc(homes[h][0])+'</strong></div><div><small>GARAGE</small><strong>'+esc(cars[c][0])+'</strong></div><div><small>LOOK</small><strong>'+esc(outfits[o][0])+'</strong></div><div><small>SNACK</small><strong>'+esc(chips[k][0])+'</strong></div></div></div>'}
let cat='houses',ownedOnly=false,notice='',styleGroup='All';
const styleGroups=['All','Original',...["Everyday","Careers","Adventure","Food","Creatures","Entertainment","Fantasy","Legendary"]];
function styleFilter(){return cat!=='wardrobe'?'':'<div class="style-filter" aria-label="Costume collections">'+styleGroups.map(g=>btn('group:'+g,esc(g),styleGroup===g?'primary':'secondary')).join('')+'</div>'}
const btn=(a,label,cls='secondary',disabled=false)=>'<button class="'+cls+'" data-shop="'+a+'" '+(disabled?'disabled':'')+'>'+label+'</button>';
function items(){return cat==='houses'?homes:cat==='cars'?cars:looks}
function owns(i){return s[cat].includes(i)}
function equipped(i){return cat==='houses'?s.house===i:cat==='cars'?s.car===i:s.outfit===i+15}
function art(i){return cat==='houses'?svg(240,155,houseBody(i),'Home preview'):cat==='cars'?svg(185,82,carBody(i),'Vehicle preview'):svg(300,195,'<g transform="translate(0 22)">'+danBody(i+15)+'</g>','Outfit preview')}
function market(){normalize(s);return '<div class="shop-top"><h2>Crumb Emporium</h2><span class="tag">🟡 '+s.crumbs.toLocaleString()+'</span></div><p class="muted">Make Dan’s little universe yours. All purchases use in-game crumbs.</p>'+showcase(s.house,s.car,s.outfit,s.selected,'Your estate')+'<div class="shop-tabs">'+[['houses','🏠 Homes'],['cars','🚗 Garage'],['wardrobe','🐞 Styles']].map(a=>btn('category:'+a[0],a[1],cat===a[0]?'primary':'secondary')).join('')+'</div>'+styleFilter()+'<div class="split"><small>'+s[cat].length+' / '+items().length+' collected</small>'+btn('filter',ownedOnly?'Show all':'Owned only','link')+'</div><div class="shop-grid">'+items().map((a,i)=>{if(ownedOnly&&!owns(i))return '';if(cat==='wardrobe'&&styleGroup!=='All'&&(a[5]||'Original')!==styleGroup)return '';return '<div class="shop-item '+(equipped(i)?'equipped':'')+'"><div class="shop-art">'+art(i)+'</div><strong>'+esc(a[0])+'</strong><small>'+ (owns(i)?'Owned':a[1].toLocaleString()+' crumbs')+'</small>'+btn('item:'+i,equipped(i)?'✓ Equipped':owns(i)?'Equip':'Buy · '+a[1].toLocaleString(),equipped(i)?'secondary':'primary',equipped(i)||!owns(i)&&s.crumbs<a[1])+'</div>'}).join('')+'</div><div class="toast" role="status">'+esc(notice)+'</div><button class="secondary" data-tab="4">All Dan appearances →</button>'}
function select(i){const a=items()[i];if(!a||!Number.isInteger(i))return;const owned=owns(i);if(!owned){if(s.crumbs<a[1]){notice='Not enough crumbs.';return} s.crumbs-=a[1];s[cat].push(i)}if(cat==='houses')s.house=i;else if(cat==='cars')s.car=i;else s.outfit=i+15;s.shopAt=Date.now();notice=(owned?'Equipped ':'Purchased and equipped ')+a[0]+'!';save();render()}
globalThis.danShopView=market;globalThis.danShopHat=hat;globalThis.danShopNormalize=normalize;globalThis.danShopValid=valid;
globalThis.danShowcase=(p,name)=>showcase(p.display_home,p.display_car,p.display_outfit,p.display_chip,name);
globalThis.danEstateHome=()=>{normalize(s);return showcase(s.house,s.car,s.outfit,s.selected,'Your estate')+'<button class="secondary estate-shop-link" data-tab="7">Visit the Crumb Emporium →</button>'};
globalThis.danShopPayload=()=>{normalize(s);return {display_home:s.house,display_car:s.car,display_outfit:s.outfit,display_chip:s.selected}};
normalize(s);
root.addEventListener('click',e=>{const b=e.target.closest('[data-shop]');if(!b||b.disabled)return;e.preventDefault();e.stopImmediatePropagation();const [cmd,arg]=b.dataset.shop.split(':');if(cmd==='category'&&['houses','cars','wardrobe'].includes(arg)){cat=arg;ownedOnly=false;notice='';render()}else if(cmd==='group'&&styleGroups.includes(arg)){styleGroup=arg;render()}else if(cmd==='filter'){ownedOnly=!ownedOnly;render()}else if(cmd==='item')select(Number(arg))},true);
render();
})();