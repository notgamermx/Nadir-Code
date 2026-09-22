const fs=require('fs');
const answers=['8198','orion','palimpsest','negative','cipher','vector','decade','obsidian','vault','monkeyseine','lantern','diamond','prism','epoch','metal','halo','1812313','seam','ember','afterimage'];
const h=v=>{let x=2166136261;for(const c of v)x=Math.imul(x^c.charCodeAt(0),16777619);return(x>>>0).toString(16)};
const bits=[...'cipher'].map(c=>(c.charCodeAt(0)-97).toString(2).padStart(5,'0'));
const record=bits.map(s=>s.split('').map(b=>b==='0'?'LOW':'HIGH').join(' ')).join('\n');
const holes=[[0,0],[0,1],[0,2],[1,1]],letters=Array(16),sentence='THEANSWERISPRISM';
for(let t=0;t<4;t++){const p=holes.map(([r,c])=>{for(let j=0;j<t;j++)[r,c]=[c,3-r];return r*4+c}).sort((a,b)=>a-b);p.forEach((pos,i)=>letters[pos]=sentence[t*4+i])}
const parity=[...'EMBER'].map((c,i)=>{let a=[0x2a,0x13,0x70,0x09,0x61][i],b=[0x31,0x55,0x0f,0x4c,0x23][i];return[a,b,a^b^c.charCodeAt(0)].map(n=>n.toString(16).padStart(2,'0').toUpperCase())});
let cipher=[...'AFTERIMAGE'].map((c,i)=>String.fromCharCode(65+(c.charCodeAt(0)-65+'ECLIPSE'[i%7].charCodeAt(0)-65)%26)).join('');
let cases=fs.readFileSync('dist/cases.js','utf8').replace('ANSWER_HASHES',JSON.stringify(answers.map(h))).replace('BACON_RECORD',JSON.stringify(record)).replace('GRILLE_LETTERS',JSON.stringify(letters)).replace('PARITY_ROWS',JSON.stringify(parity)).replace('FINAL_CIPHER',cipher);
fs.writeFileSync('dist/cases.js',cases);
let html=fs.readFileSync('dist/index.html','utf8').replace('Twelve original puzzles. Hidden signals, layered ciphers, and a descent into the unknown. Play Nadir Code.','Twenty original cases. Paintings, hidden interactions, sound, and a descent without hints. Play Nadir Code.').replaceAll(' / 12',' / 20').replace('12 levels. No shortcuts.','20 cases. No hints.').replace('VOL. 01','HARD EDITION').replace(/<div class="puzzle-actions">[\s\S]*?<div id="hints" class="hints"><\/div>/,'<div class="puzzle-actions"><span class="muted">CASE, SPACES & PUNCTUATION DON’T MATTER</span></div>').replace('Two optional hints are available per level. There is no timer or penalty.','There are no hints. Research, notes, and external tools are welcome. There is no timer.').replace('Read every part of the transmission. Structure can matter as much as words.','The page itself is part of the puzzle. Some clues require interaction or inspecting the page. Desktop is recommended.').replace('Your progress stays in this browser. Clearing browser storage removes it.','Hard Edition progress stays in this browser and is separate from the old 12-level edition. Clearing browser storage removes it.').replace('all solved levels and hints','all solved cases').replace('<script src="app.js"></script>','<script src="cases.js"></script><script src="mechanisms.js"></script><script src="app.js"></script>').replace('<span>NADIR CODE © 2026</span>','<span>NADIR CODE © 2026</span><button id="creditsButton" class="text-button">Artwork credits</button>').replace('</body>','<dialog id="credits"><div class="dialog-top"><span>ARTWORK SOURCES</span><button id="closeCredits" aria-label="Close artwork credits">✕</button></div><h2>From the collection.</h2><p>Public-domain paintings, sourced through the Art Institute of Chicago’s open collection and Wikimedia Commons. Source pages contain facts that may help identify the artworks.</p><p><a href="https://www.artic.edu/artworks/28560/the-bedroom" target="_blank" rel="noopener noreferrer">Vincent van Gogh — The Bedroom (1889) ↗</a></p><p><a href="https://www.artic.edu/artworks/27992/a-sunday-on-la-grande-jatte-1884" target="_blank" rel="noopener noreferrer">Georges Seurat — A Sunday on La Grande Jatte — 1884 ↗</a></p><p>Original paintings are unaltered. Interactive markers belong to Nadir Code.</p></dialog></body>');
fs.writeFileSync('dist/index.html',html);
let mechanisms=fs.readFileSync('dist/mechanisms.js','utf8').replace("['C','22 SEP 00:25'","['O','22 SEP 00:25'").replace("['O','21 SEP 11:35'","['C','21 SEP 11:35'");fs.writeFileSync('dist/mechanisms.js',mechanisms);
fs.writeFileSync('dist/archive/ledger.txt','ARCHIVE / CATALOGUE 11\nThe left edge survived the press.\n\nLacquer, box 19\nAsh, box 04\nNickel, box 22\nTin, box 08\nEbony, box 31\nResin, box 12\nNacre, box 07\n');
// Two pitches, 30 grouped notes. A finite local audio asset, with no audio permission needed.
const sampleRate=22050,samples=[];
const silence=seconds=>{for(let i=0;i<Math.round(sampleRate*seconds);i++)samples.push(0)};
silence(.35);for(const group of bits){for(const bit of group){const n=Math.round(sampleRate*.18),freq=bit==='0'?440:880;for(let i=0;i<n;i++){const fade=Math.min(1,i/220,(n-i)/220);samples.push(Math.round(Math.sin(2*Math.PI*freq*i/sampleRate)*8000*fade))}silence(.12)}silence(.65)}
const wave=Buffer.alloc(44+samples.length*2);wave.write('RIFF');wave.writeUInt32LE(wave.length-8,4);wave.write('WAVEfmt ',8);wave.writeUInt32LE(16,16);wave.writeUInt16LE(1,20);wave.writeUInt16LE(1,22);wave.writeUInt32LE(sampleRate,24);wave.writeUInt32LE(sampleRate*2,28);wave.writeUInt16LE(2,32);wave.writeUInt16LE(16,34);wave.write('data',36);wave.writeUInt32LE(samples.length*2,40);samples.forEach((v,i)=>wave.writeInt16LE(v,44+i*2));fs.writeFileSync('dist/assets/dinner.wav',wave);
const explanations=[
'Identify Chicago’s second Bedroom, 1889. Click its rear window. Receipt 3·1·4·2 reorders the year to 8198.',
'The level URL contains parcel=6f.72.69.6f.6e. Decode hexadecimal ASCII: ORION.',
'Click the four polygon markers. Order by 3,4,5,6 sides, then A1Z26: PALIMPSEST.',
'Select the dark text, or hold its strip by mouse/touch/keyboard. Reverse EVITAGEN.',
'Bacon, modern 26-letter alphabet: LOW=A/0; HIGH=B/1. Six groups of five decode CIPHER. The non-audio record is equivalent.',
'Rotate each six-dot Braille cell 180 degrees, preserving cell order: VECTOR.',
'Read treble-clef pitches, order by silence 1–6: D E C A D E.',
'Unique route: b1,c3,d5,f4,h5,g7,f5,h6. Letters: OBSIDIAN.',
'Unique order Brine,Ash,Dusk,Amber,Copper. Spine marks VAULT.',
'Seurat added the monkey later; the scene is on the Seine. Accept combined MONKEY SEINE.',
'Inspect the live evidence DOM comment, open archive/ledger.txt relative to the site root, read entry initials: LANTERN.',
'Solve the 7×7 nonogram. Its outline is a DIAMOND.',
'Read grille holes left to right, top to bottom, in four clockwise positions. THE ANSWER IS PRISM.',
'Convert all records to UTC on 21 September. E15:10, P15:20, O15:25, C15:35, H16:40. EPOCH.',
'Reverse-complement template to mRNA AUG GAA ACC GCU CUU; translate standard code M E T A L.',
'Switches A,C,D,F on; B,E off. All XOR equations true. Panel reveals HALO.',
'COLD,CORD,CARD,WARD,WARM. Arriving letters R,A,W,M → 18,1,23,13 → 1812313.',
'Face opposite star has 19 5 1 13; A1Z26 gives SEAM.',
'For each row, B=A XOR C XOR parity. Decode ASCII: EMBER.',
'Extract E,C,L,I,P,S,E from the specified previous answers. Decrypt '+cipher+' with repeating Vigenère key ECLIPSE: AFTERIMAGE.'
];
fs.writeFileSync('SOLUTIONS.md','# Creator-only solutions — Hard Edition\n\nSPOILERS. This file is outside the published dist folder.\n\n'+answers.map((a,i)=>`## ${String(i+1).padStart(2,'0')} — ${a.toUpperCase()}\n\n${explanations[i]}`).join('\n\n')+'\n');
fs.writeFileSync('hard-edition-answers.json',JSON.stringify(answers));
console.log('Generated twenty answer checks, grille, parity data, audio and creator-only solution notes.');
