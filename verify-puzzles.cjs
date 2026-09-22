const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const ctx=vm.createContext({});vm.runInContext(fs.readFileSync('dist/cases.js','utf8')+';globalThis.data={levels,answerHashes,baconRecord,grilleLetters,parityRows}',ctx);const data=ctx.data;
assert.equal(data.levels.length,20);assert.equal(new Set(data.levels.map(l=>l.kind)).size,20);
assert(!fs.readFileSync('dist/index.html','utf8').includes('hintButton'));
const expected=JSON.parse(fs.readFileSync('hard-edition-answers.json'));
const hash=v=>{let x=2166136261;for(const c of v)x=Math.imul(x^c.charCodeAt(0),16777619);return(x>>>0).toString(16)};
expected.forEach((v,i)=>assert.equal(hash(v),data.answerHashes[i]));
assert.equal([3,1,4,2].map(i=>'1889'[i-1]).join(''),expected[0]);
assert.equal(Buffer.from('6f72696f6e','hex').toString(),expected[1]);
assert.equal(data.baconRecord.split('\n').map(g=>String.fromCharCode(97+parseInt(g.split(' ').map(x=>x==='HIGH'?1:0).join(''),2))).join(''),expected[4]);
const occupied=[1,18,35,29,39,54,37,47],solutions=[];
const knight=(a,b)=>Math.abs(a%8-b%8)*Math.abs((a/8|0)-(b/8|0))===2;
function walk(path){if(path.length===8){solutions.push(path);return}for(const next of occupied)if(!path.includes(next)&&knight(path.at(-1),next))walk([...path,next])}walk([1]);assert.equal(solutions.length,1);assert.deepEqual(solutions[0],occupied);
let order=[];function perm(p,r){if(!r.length){let ix=n=>p.indexOf(n);if(ix('Amber')>0&&ix('Amber')<4&&ix('Ash')>ix('Brine')&&ix('Copper')===ix('Amber')+1&&ix('Dusk')===ix('Brine')+2&&ix('Ash')!==0)order.push(p);return}r.forEach((x,i)=>perm([...p,x],r.filter((_,j)=>j!==i)))}perm([],['Ash','Brine','Copper','Dusk','Amber']);assert.equal(order.length,1);assert.deepEqual(order[0],['Brine','Ash','Dusk','Amber','Copper']);
// Exhaustively solve the seven-row nonogram, pruning column runs.
const runs=[1,3,5,7,5,3,1];let count=0,solution;
function rowOptions(n){return Array.from({length:8-n},(_,start)=>Array.from({length:7},(_,i)=>Number(i>=start&&i<start+n)))}
function nono(rows){if(rows.length===7){if(runs.every((n,c)=>{let s=rows.map(r=>r[c]).join('');return s.replace(/^0+|0+$/g,'')==='1'.repeat(n)})){count++;solution=rows}return}for(const row of rowOptions(runs[rows.length])){const next=[...rows,row];if(runs.every((n,c)=>{let s=next.map(r=>r[c]).join(''),ones=s.replaceAll('0','').length;return ones<=n&&!/10+1/.test(s)&&(!s.endsWith('0')||!s.includes('1')||ones===n)}))nono(next)}}nono([]);assert.equal(count,1);assert.deepEqual(solution,runs.map(n=>Array.from({length:7},(_,c)=>Number(Math.abs(c-3)<=(n-1)/2))));
let text='';for(let t=0;t<4;t++){let indexes=[[0,0],[0,1],[0,2],[1,1]].map(([r,c])=>{for(let n=0;n<t;n++)[r,c]=[c,3-r];return r*4+c}).sort((a,b)=>a-b);text+=indexes.map(i=>data.grilleLetters[i]).join('')}assert.equal(text,'THEANSWERISPRISM');
const template='AAGAGCGGTTTCCAT',comp={A:'U',T:'A',G:'C',C:'G'};assert.equal([...template].reverse().map(c=>comp[c]).join(''),'AUGGAAACCGCUCUU');
const masks=[[0,1],[1,2],[2,3],[3,4],[4,5],[0,2,4]],want=[1,1,0,1,1,0];let circuits=[];for(let n=0;n<64;n++){const b=Array.from({length:6},(_,i)=>(n>>i)&1);if(masks.every((m,i)=>m.reduce((a,j)=>a^b[j],0)===want[i]))circuits.push(b)}assert.equal(circuits.length,1);assert.deepEqual(circuits[0],[1,0,1,1,0,1]);
const ladder=['COLD','CORD','CARD','WARD','WARM'];let incoming='';for(let i=1;i<ladder.length;i++){const changed=[...ladder[i]].filter((c,j)=>c!==ladder[i-1][j]);assert.equal(changed.length,1);incoming+=changed[0].charCodeAt(0)-64}assert.equal(incoming,expected[16]);
assert.equal(data.parityRows.map(r=>String.fromCharCode(parseInt(r[0],16)^parseInt(r[1],16)^parseInt(r[2],16))).join('').toLowerCase(),expected[18]);
const key=[[14,1],[5,1],[15,5],[2,3],[3,1],[18,1],[6,2]].map(([l,c])=>expected[l-1][c-1]).join('');assert.equal(key,'eclipse');const cipher=data.levels[19].text.match(/ENVELOPE: ([A-Z]+)/)[1];assert.equal([...cipher].map((c,i)=>String.fromCharCode(97+(c.charCodeAt(0)-65-(key.charCodeAt(i%key.length)-97)+26)%26)).join(''),expected[19]);
for(const p of ['room-study.jpg','sunday-study.jpg','dinner.wav'])assert(fs.statSync('dist/assets/'+p).size>1000);
assert(fs.readFileSync('dist/archive/ledger.txt','utf8').includes('Nacre'));
console.log('PASS: 20 distinct case types; answer checks; audio encoding; unique knight, shelf, nonogram and circuit solutions; grille; DNA; ladder; parity; final meta; required assets.');
