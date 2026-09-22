'use strict';
const levels=[
{title:'The second room',kind:'painting',intro:'One room. Three canvases. This is the second. The year has been put out of order.',text:'The light keeps the receipt.',prompt:'Enter the four-digit receipt.'},
{title:'Undelivered',kind:'url',intro:'The courier never entered the room. Everything it carried is still at the address.',text:'CONTENTS: NONE\nATTACHMENTS: NONE\nDELIVERY: COMPLETE',prompt:'Name the consignment.'},
{title:'Peripheral vision',kind:'shapes',intro:'The centre has nothing. The perimeter has an order.',text:'',prompt:'Recover the word.'},
{title:'Carbon negative',kind:'carbon',intro:'A copy can conceal what the original cannot. The negative travelled backwards.',text:'',prompt:'Recover the missing word.'},
{title:'Francis’s dinner',kind:'audio',intro:'Two voices. Five guests to a table. Francis has made room for J and V this time.',text:'',prompt:'What did the guests bring?'},
{title:'The inverted observatory',kind:'braille',intro:'Six stars to a plate. The plates were mounted upside down; their catalogue order survived.',text:'',prompt:'Read the observatory’s six-letter name.'},
{title:'The rests have it',kind:'music',intro:'The conductor filed the bars by the length of their silence, shortest first. Each bar kept a single note.',text:'',prompt:'Name the word left on the staff.'},
{title:'A horse with no rider',kind:'knight',intro:'Begin at b1. Visit every occupied square exactly once. Empty squares are forbidden; ordinary knight moves remain.',text:'',prompt:'Read what the journey spells.'},
{title:'The archivist’s shelf',kind:'books',intro:'Five volumes. One surviving shelf order, left to right.',text:'Amber is not at either end.\nAsh is after Brine, but is not first.\nCopper is immediately after Amber.\nDusk is exactly two places after Brine.',prompt:'Read the spine marks in shelf order.'},
{title:'The late arrival',kind:'seurat',intro:'A companion on a leash joined this Sunday after the first campaign of painting. Its small neighbour is a distraction.',text:'',prompt:'Give the animal’s ordinary English name, then the river beside the scene. Two words.'},
{title:'The unprinted catalogue',kind:'source',intro:'The typesetter left an instruction that the printer could never print.',text:'CATALOGUE 11\n\nNo public entry survives.',prompt:'Recover the catalogue’s name.'},
{title:'An empty outline',kind:'nonogram',intro:'Every run is accounted for. Separate neighbouring runs with at least one empty cell.',text:'',prompt:'Name the shape that remains.'},
{title:'The censor’s stencil',kind:'grille',intro:'The marked corner is the beginning. Four views belong to one sentence; read each view as a page.',text:'',prompt:'What does the sentence ask for?'},
{title:'Yesterday’s witnesses',kind:'clocks',intro:'The records are local. The order is universal. Earliest testimony speaks first.',text:'',prompt:'Read the five witness marks in time order.'},
{title:'The reverse archive',kind:'dna',intro:'A template strand, filed 5′ to 3′. The entire product is five residues long. The standard code applies.',text:'5′—AAG AGC GGT TTC CAT—3′',prompt:'Return the product in one-letter notation.'},
{title:'Unanimous',kind:'circuit',intro:'Six switches. Six statements. The panel speaks only when every statement is true.',text:'',prompt:'Recover the panel’s word.'},
{title:'Replacement parts',kind:'ladder',intro:'Five words from COLD to WARM. One letter changes at each step. Only the newly arriving letters survive.',text:'COLD → ____ → ____ → ____ → WARM\n\nCORD   GOLD   CARD   FOAM\nGOLF   WARD   WORM\n\nA = 1 … Z = 26',prompt:'Concatenate the values of the four arriving letters. No separators.'},
{title:'The far side',kind:'cube',intro:'Fold, don’t follow. The face opposite ★ keeps the word.',text:'',prompt:'Recover the word on the far face.'},
{title:'One failed drive',kind:'parity',intro:'Drive B is gone. The XOR parity survived. Every row was one byte, and the rows were once a word.',text:'',prompt:'Recover the text from drive B.'},
{title:'After everything',kind:'final',intro:'Seven old answers make a key. Read the receipts from top to bottom. The last envelope was encrypted with that repeating key.',text:'XIV : I\nV   : I\nXV  : V\nII  : III\nIII : I\nXVIII : I\nVI  : II\n\nENVELOPE: EHEMGAQEIP\n\nVigenère · A=0 · receipt = transmission : letter',prompt:'Open the last envelope.'}
];
const answerHashes=["d02be05b","dd76c6f2","257d226f","fe93863a","e8e9624a","8f89e802","77801309","53ac4b30","45496baf","dc76d552","a86c592f","b16f10a7","236b7a62","d95b2de6","d756aedc","cfbebd9f","1eb5c9c4","59505833","1a1b9044","f6f5fa8e"];
const baconRecord="LOW LOW LOW HIGH LOW\nLOW HIGH LOW LOW LOW\nLOW HIGH HIGH HIGH HIGH\nLOW LOW HIGH HIGH HIGH\nLOW LOW HIGH LOW LOW\nHIGH LOW LOW LOW HIGH";
const grilleLetters=["T","H","E","N","R","A","S","W","I","S","R","E","M","I","S","P"];
const parityRows=[["2A","31","5E"],["13","55","0B"],["70","0F","3D"],["09","4C","00"],["61","23","10"]];
