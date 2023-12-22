// import {html2canvas} from "html2canvas"
// const html2canvas = require('html2canvas');

const fifthfret = "720px"
const estring = "-95px"
const fretwidth = 124
const stringspace = 95
const ordinals = ['open', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth', 'twentyFirst', 'twentySecond', 'twentyThird', 'twentyFourth']


class NoteButton{
    constructor(note, fret, string){

        this.id = note;
        this.fret = fret;
        this.string = string;
        this.blue = true;
        
        if (note[1] == 's' || note[1] == 'b'){
            this.note = note[0] + note[1]
        } else {
            this.note = note[0]
        }
         
        this.visible = false;
        note.length > 3 ? this.accidental = true : this.accidental = false; 
        this.elem = document.getElementById(note);
        if(this.accidental){
            this.source = "images/notes/".concat(this.id[0].concat(this.id[1].concat('.png') ) );
            this.respelled = false;
        }
        else {
            this.source = "images/notes/".concat(this.id[0].concat('.png'));
        }
        this.elem.addEventListener("click", (e) => noteClick(this, e) );
        this.elem.addEventListener("mouseover", () => noteHover(this)  );
        this.elem.addEventListener("mouseout", () => endHover(this) );

        // if (this.accidental){
        //     this.elem.addEventListener("dblclick", () => enharmonicEquivalent(this))
        // }
        
    }

}


const lowEStringNotes = ['e0E', 'f1E', 'fs1E', 'g1E', 'gs1E', 'a1E', 'as1E', 'b1E', 'c1E', 'cs1E', 'd1E', 'ds1E', 'e1E', 'f2E', 'fs2E', 'g2E', 'gs2E', 'a2E', 'as2E', 'b2E', 'c2E', 'cs2E', 'd2E', 'ds2E', 'e2E']
var lowEStringNoteObjects = []

const aStringNotes = [ 'a0a', 'as1a', 'b1a', 'c1a', 'cs1a', 'd1a', 'ds1a', 'e1a', 'f1a', 'fs1a', 'g1a', 'gs1a', 'a1a', 'as2a', 'b2a', 'c2a', 'cs2a', 'd2a', 'ds2a', 'e2a', 'f2a', 'fs2a', 'g2a', 'gs2a', 'a2a']
var aStringNoteObjects = []

const dStringNotes = [ 'd0d', 'ds1d', 'e1d', 'f1d', 'fs1d', 'g1d', 'gs1d', 'a1d', 'as1d', 'b1d', 'c1d', 'cs1d', 'd1d', 'ds2d', 'e2d', 'f2d', 'fs2d', 'g2d', 'gs2d', 'a2d', 'as2d', 'b2d', 'c2d', 'cs2d', 'd2d']
var dStringNoteObjects = []

const gStringNotes = [ 'g0g', 'gs1g', 'a1g', 'as1g', 'b1g', 'c1g', 'cs1g', 'd1g', 'ds1g', 'e1g', 'f1g', 'fs1g', 'g1g', 'gs2g', 'a2g', 'as2g', 'b2g', 'c2g', 'cs2g', 'd2g', 'ds2g', 'e2g', 'f2g', 'fs2g', 'g2g']
var gStringNoteObjects = []

const bStringNotes = ['b0b', 'c1b', 'cs1b', 'd1b', 'ds1b', 'e1b', 'f1b', 'fs1b', 'g1b', 'gs1b', 'a1b', 'as1b', 'b1b', 'c2b', 'cs2b', 'd2b', 'ds2b', 'e2b', 'f2b', 'fs2b', 'g2b', 'gs2b', 'a2b', 'as2b', 'b2b']
var bStringNoteObjects = []

const highEStringNotes = ['e0e' ,'f1e', 'fs1e', 'g1e', 'gs1e', 'a1e', 'as1e', 'b1e', 'c1e', 'cs1e', 'd1e', 'ds1e', 'e1e', 'f2e', 'fs2e', 'g2e', 'gs2e', 'a2e', 'as2e', 'b2e', 'c2e', 'cs2e', 'd2e', 'ds2e', 'e2e']
var highEStringNoteObjects = []

var allNoteObjects = []

// Major Scale
const majorScale = [2, 2, 1, 2, 2, 2, 1]

// Major Triads
const majorTriad = [4, 3]

// Minor Scales
const minorScale = [2, 1, 2, 2, 1, 2, 2]

// Minor Triads
const minorTriad = [3, 4]

// Minor Pentatonic
const minorPent = [3, 2, 2, 3, 2]

// Major Pentatonic
const majorPent = [2, 2, 3, 2, 3]

// Major Modes //

// Ionian
const ionian = majorScale

// Dorian
const dorian = [2, 1, 2, 2, 2, 1, 2]

// Phrygian
const phrygian = [1, 2, 2, 2, 1, 2, 2]

// Lydian
const lydian = [2, 2, 2, 1, 2, 2, 1]

// Mixolydian
const mixolydian = [2, 2, 1, 2, 2, 1, 2]

// Aeolian
const aeolian = minorScale

// Locrian
const locrian = [1, 2, 2, 1, 2, 2, 2]

// Chromatic Scale
const chromaticSharpsArray = ['a', 'as', 'b', 'c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs']
const chromaticFlatsArray =  ['a', 'bb', 'b', 'c', 'db', 'd', 'eb', 'e', 'f', 'gb', 'g', 'ab']

var chromaticSharpsDict = {
    'a' : 0,
    'as' : 1,
    'b' : 2,
    'c' : 3,
    'cs' : 4,
    'd' : 5,
    'ds' : 6,
    'e' : 7,
    'f' : 8,
    'fs' : 9,
    'g' : 10,
    'gs' : 11
}

var chromaticFlatsDict = {
    'a' : 0,
    'bb' : 1,
    'b' : 2,
    'c' : 3,
    'db' : 4,
    'd' : 5,
    'eb' : 6,
    'e' : 7,
    'f' : 8,
    'gb' : 9,
    'g' : 10,
    'ab' : 11
}

var enharmonicEquivalents = {
    "as" : "bb",
    "bs" : "c",
    "cs" : "db",
    "ds" : "eb",
    "es" : "f",
    "fs" : "gb",
    "gs" : "ab",

    "ab" : "gs",
    "bb" : "as",
    "cb" : "b",
    "db" : "cs",
    "eb" : "ds",
    "fb" : "e",
    "gb" : "fs"

}

var scaleAccidentals = {
    'c' : 'sharp',
    'g' : 'sharp',
    'd' : 'sharp',
    'a' : 'sharp',
    'e' : 'sharp',
    'b' : 'sharp',
    'fs' : 'sharp',

    'f' : 'flat',
    'bb' : 'flat',
    'eb' : 'flat',
    'ab' : 'flat',
    'db' : 'flat',
    'gb' : 'flat'
}

var scaleFormulas = {
    "'majorScale'" : majorScale,
    "'minorScale'" : minorScale,
    "'minorPent'" : minorPent,
    "'majorPent'" : majorPent,
    "'majorTriad'" : majorTriad,
    "'minorTriad'" : minorTriad,

    "'ionian'" : majorScale,
    "'dorian'" : dorian,
    "'phrygian'" : phrygian,
    "'lydian'" : lydian, 
    "'mixolydian'" : mixolydian,
    "'aeolian'" : aeolian,
    "'locrian'" : locrian
}

var scaleNames = {
    "'majorScale'" : 'Major Scale',
    "'minorScale'" : 'Minor Scale',
    "'minorPent'" : 'Minor Pentatonic Scale',
    "'majorPent'" : 'Major Pentatonic Scale',
    "'majorTriad'" : 'Major Triad',
    "'minorTriad'" : 'Minor Triad',
    "'ionian'" : 'Ionian Scale',
    "'dorian'" : 'Dorian Scale',
    "'phrygian'" : 'Phrygian Scale',
    "'lydian'" : 'Lydian Scale',
    "'mixolydian'" : 'Mixolydian Scale',
    "'aeolian'" : 'Aeolian Scale',
    "'locrian'" : 'Locrian Scale'
}

var modePosition = {
    "'majorScale'" : 0,
    "'majorPent'" : 0,
    "'ionian'" : 0,
    "'dorian'" : 1,
    "'phrygian'" : 2,
    "'lydian'" : 3,
    "'mixolydian'" : 4,
    "'aeolian'" : 5,
    "'minorScale'" : 5,
    "'minorPent'" : 5,
    "'locrian'" : 6
}

var modeOffset = {
    "'majorScale'" : 0,
    "'majorTriad'" : 0,
    "''majorPent" : 0,
    "'ionian'" : 0,
    "'dorian'" : -2,
    "'phrygian'" : -4,
    "'lydian'" : -5,
    "'mixolydian'" : -7,
    "'aeolian'" : -9,
    "'minorScale'" : -9,
    "'minorTriad'" : -9,
    "'minorPent'" : -9,
    "'locrian'" : -11
}

var stringCheckboxes = [document.getElementById("includeLowEString"), document.getElementById("includeAString"), document.getElementById("includeDString"), document.getElementById("includeGString"), document.getElementById("includeBString"), document.getElementById("includeHighEString")]

function noteClick(note, e) {

    if (note.visible == true){
        
        if (e.shiftKey){
            noteColour(note)
        }

        else if (note.accidental && !note.respelled){
            note.respelled = true;
            enharmonicEquivalent(note);
        } 
        
        else {
        note.elem.style.opacity = 0.0;
        note.visible = false;
        }
        
    }
    else {
        if (e.shiftKey){
            noteColour(note)
        }

        if (note.accidental){
            note.respelled = false
            // enharmonicEquivalent(note);
        } 
        note.elem.style.opacity = 1.0;
        note.visible = true;

        // note.elem.style.border = 'solid'
        // note.elem.style.borderRadius = '50%';
        // note.elem.style.borderColor = '#ff0000'
        // console.log(note.elem)

    }

}


function noteHover(note) {

    if (note.visible == false){
        note.elem.style.opacity = 0.5;
    }
}


function endHover(note) {
    
    if (note.visible == false){
        note.elem.style.opacity = 0;
    }
}


function enharmonicEquivalent(note){

    // change sharp to flat
    if (note.note[1] == 's'){
        // G sharp handled seperately
        if (note.note == 'gs'){
            note.note = 'ab'
            note.source = "images/notes/".concat(note.note[0].concat(note.note[1].concat('.png') ) );
            note.elem.innerHTML = "<img src='".concat(note.source).concat("'>");
        } else {
            charCode = (note.note.charCodeAt(0) + 1)
            note.note = String.fromCharCode(charCode).concat('b')
            if (note.blue){
                note.source = "images/notes/".concat(note.note[0].concat(note.note[1].concat('.png') ) );
            } else {
                note.source = "images/red_notes/".concat(note.note[0].concat(note.note[1].concat('_red.png') ) );
            }
            note.elem.innerHTML = "<img src='".concat(note.source).concat("'>");
        }

    }

    // change flat to sharp
    else if (note.note[1] == 'b'){
        // A flat handled seperately
        if (note.note[0] == 'a'){
            note.note = 'gs'
            note.source = "images/notes/".concat(note.note[0].concat(note.note[1].concat('.png') ) );
            note.elem.innerHTML = "<img src='".concat(note.source).concat("'>");
        } else {
            charCode = (note.note.charCodeAt(0) - 1)
            note.note = String.fromCharCode(charCode).concat('s')
            // note.note = (note.note.charCodeAt(0) - 1).fromCharCode().concat('b')
            if (note.blue){
                note.source = "images/notes/".concat(note.note[0].concat(note.note[1].concat('.png') ) );
            } else {
                note.source = "images/red_notes/".concat(note.note[0].concat(note.note[1].concat('_red.png') ) );
            }
            note.elem.innerHTML = "<img src='".concat(note.source).concat("'>")
            // console.log(note.src)
        }

    }
}

function noteColour(note){

    if (note.blue) {
        note.source = "images/red_notes/".concat(note.note.concat('_red.png') );
        note.elem.innerHTML = "<img src='".concat(note.source).concat("'>");
        note.blue = false;

    } else {
        note.source = "images/notes/".concat(note.note.concat('.png') );
        note.elem.innerHTML = "<img src='".concat(note.source).concat("'>");
        note.blue = true;

    }
}


function clearNotes(){

    // console.log('clear notes')
    document.getElementById('scaleName').innerText = ''

    for (let i = 0; i < allNoteObjects.length; i++){

        if (!(allNoteObjects[i].blue)){
            noteColour(allNoteObjects[i])
        }

        allNoteObjects[i].elem.style.opacity = 0;
        allNoteObjects[i].visible = false;
    }

}

function resetStringCheckboxes(){

    for (let k = 0; k < 6; k++){
        if (!stringCheckboxes[k].checked){
            stringCheckboxes[k].checked = true
        }
    }
}


function showScale(scaleNotes, scaleName){
    // console.log(scaleNotes)
    // console.log(scaleName)
    clearNotes()    
    document.getElementById('scaleName').innerText = scaleName;
    var lowerFretRange = document.getElementById("fretRangeLower").value;
    var upperFretRange = document.getElementById("fretRangeUpper").value;
    var limitGstring = document.getElementById("limitGString");

    for (let i = 0; i < allNoteObjects.length; i++) {

        var currentFret = Math.floor(i / 6)
        var currentString = i % 6 // lowEstring = 0, highEString = 5

        if (!(stringCheckboxes[currentString].checked)){
            continue
        }

        for (let j = 0; j < scaleNotes.length; j++) {

            if (currentFret >= lowerFretRange && currentFret <= upperFretRange && !(limitGstring.checked && currentString == 3 && currentFret == upperFretRange)) { // note position is in fret range

                if (allNoteObjects[i].note == scaleNotes[j]){ // note is in scale
                    allNoteObjects[i].elem.style.opacity = 1;
                    allNoteObjects[i].visible = true;

                    if (j == 0){ // if note is the root note
                        noteColour( allNoteObjects[i])
                    }

                }

                if (allNoteObjects[i].accidental && enharmonicEquivalents[allNoteObjects[i].note] == scaleNotes[j]){
                    allNoteObjects[i].elem.style.opacity = 1;
                    allNoteObjects[i].visible = true;
                    enharmonicEquivalent(allNoteObjects[i])
                    allNoteObjects[i].respelled = !allNoteObjects[i].respelled

                    if (j == 0){ // if note is the root note
                        noteColour(allNoteObjects[i])
                    }

                }
            }
        }
    }
}

function showTriad(scaleNotes, triadName){

    clearNotes()
    document.getElementById('scaleName').innerText = triadName
    
    for (let i = 0; i < allNoteObjects.length; i++) {

        for (let j = 0; j < 5; j = j+2) {
            if (allNoteObjects[i].note == scaleNotes[j]){
                allNoteObjects[i].elem.style.opacity = 1;
                allNoteObjects[i].visible = true;

            }

            if (allNoteObjects[i].accidental && enharmonicEquivalents[allNoteObjects[i].note] == scaleNotes[j]){
                allNoteObjects[i].elem.style.opacity = 1;
                allNoteObjects[i].visible = true;
                enharmonicEquivalent(allNoteObjects[i])
                allNoteObjects[i].respelled = !allNoteObjects[i].respelled
            }
        }

    }
}

function buildScaleFromIntervals(scaleFormula, rootNote, accidental){
    // console.log(scaleFormula)
    // console.log(rootNote)
    // console.log(accidental)

    if (accidental == 'sharp'){
        chromaticScale = chromaticSharpsArray
        var chromaticIndex = chromaticSharpsDict[rootNote]
    } else {
        chromaticScale = chromaticFlatsArray 
        var chromaticIndex = chromaticFlatsDict[rootNote]
    }

    scale = [rootNote]
    count = 0

    
    for (let i = 0; i < scaleFormula.length; i++){

        // console.log(chromaticIndex)
        chromaticIndex = (chromaticIndex + scaleFormula[i]) % 12;

        scale.push(chromaticScale[chromaticIndex]);
        
    }

    return scale
}

function buildScaleFromType(scaleType, rootNote, accidental){
    // console.log(scaleType)
    // console.log(rootNote)
    // console.log(accidental)


    const scaleFormula = scaleFormulas[scaleType];
    console.log(scaleFormula)

    const homeKeyPosition = findHomeKey(scaleType, rootNote);
    console.log(homeKeyPosition)

    homeKeyRoot = String.fromCharCode( 104 - (7 - (rootNote.charCodeAt(0) - (modePosition[scaleType] + 97))) % 7 )
    console.log(homeKeyRoot);


    homeKey = chromaticFlatsArray[homeKeyPosition]
    console.log(homeKey);

    if (homeKeyRoot[0] != homeKey[0]){
        homeKey = enharmonicEquivalents[homeKey]
    }

    console.log(homeKey)

    accidental = scaleAccidentals[homeKey]

    if (accidental == 'sharp'){
        chromaticScale = chromaticSharpsArray
        var chromaticIndex = chromaticSharpsDict[rootNote]
    } else {
        chromaticScale = chromaticFlatsArray 
        var chromaticIndex = chromaticFlatsDict[rootNote]
    }

    scale = [rootNote]
    count = 0

    
    for (let i = 0; i < scaleFormula.length; i++){

        // console.log(chromaticIndex)
        chromaticIndex = (chromaticIndex + scaleFormula[i]) % 12;

        scale.push(chromaticScale[chromaticIndex]);
        
    }

    return scale
}

function findHomeKey(scaleName, rootNote){

    // console.log(scaleName)
    offset = modeOffset[scaleName]
    // console.log(offset)

    chromaticPosition = chromaticSharpsDict[rootNote]
    homeKeyChromaticPosition = chromaticPosition + offset

    if (homeKeyChromaticPosition < 0){
        homeKeyChromaticPosition = 12 + homeKeyChromaticPosition
    }

    if (rootNote.length > 1){
        homeKey = homeKey + rootNote[1];
    }

    return homeKeyChromaticPosition

}

// console.log(buildScaleFromIntervals([4,3], 'db', 'flat'))

function generateNotes() {

    for (let i = 0; i < 25; i++) {
        
        var noteName

        // Low E String
        if (lowEStringNotes[i].length > 3){
            var noteName = lowEStringNotes[i][0] + lowEStringNotes[i][1]
        }
        else {
            var noteName = lowEStringNotes[i][0]
        }


        var imgsrc = "images/notes/".concat(noteName.concat(".png") )
        // console.log(imgsrc)
        document.getElementById("lowEString")
        .innerHTML += "<div class='".concat(ordinals[i].concat("Fret'> <button class='btn' id='".concat(lowEStringNotes[i].concat("'><img src='images/notes/".concat(noteName.concat(".png' ></button></div></div>" ) ) ) ) ) )
        // .innerHTML += "<div class='".concat(ordinals[i].concat( "Fret'> <button class='btn' style='opacity: 0; background-img = url('" + imgsrc + "');' id='".concat(lowEStringNotes[i].concat("'></button></div></div>" ) ) ) ) 
        // .innerHTML += "<div class='" + ordinals[i] + "Fret'> <button class='btn' style='opacity: 0; background-image=url(" + ") id=" + "'" + lowEStringNotes[i] + "'" + "></button></div></div>" 

    

        // A String
        if (aStringNotes[i].length > 3){
            var noteName = aStringNotes[i][0] + aStringNotes[i][1]
        }
        else {
            var noteName = aStringNotes[i][0]
        }

        document.getElementById("aString")
        .innerHTML += "<div class='".concat(ordinals[i].concat("Fret'> <button class='btn' id='".concat(aStringNotes[i].concat("'><img src='images/notes/".concat(noteName.concat(".png' ></button></div></div>" ) ) ) ) ) )
    

        // D String
        if (dStringNotes[i].length > 3){
            var noteName = dStringNotes[i][0] + dStringNotes[i][1]
        }
        else {
            var noteName = dStringNotes[i][0]
        }

        document.getElementById("dString")
        .innerHTML += "<div class='".concat(ordinals[i].concat("Fret'> <button class='btn' id='".concat(dStringNotes[i].concat("'><img src='images/notes/".concat(noteName.concat(".png' ></button></div></div>" ) ) ) ) ) )
    
        
        // G String
        if (gStringNotes[i].length > 3){
            var noteName = gStringNotes[i][0] + gStringNotes[i][1]
        }
        else {
            var noteName = gStringNotes[i][0]
        }

        document.getElementById("gString")
        .innerHTML += "<div class='".concat(ordinals[i].concat("Fret'> <button class='btn' id='".concat(gStringNotes[i].concat("'><img src='images/notes/".concat(noteName.concat(".png' ></button></div></div>" ) ) ) ) ) )
    

        // B String
        if (bStringNotes[i].length > 3){
            var noteName = bStringNotes[i][0] + bStringNotes[i][1]
        }
        else {
            var noteName = bStringNotes[i][0]
        }

        document.getElementById("bString")
        .innerHTML += "<div class='".concat(ordinals[i].concat("Fret'> <button class='btn' id='".concat(bStringNotes[i].concat("'><img src='images/notes/".concat(noteName.concat(".png' ></button></div></div>" ) ) ) ) ) )
    

        // High E String
        if (highEStringNotes[i].length > 3){
            var noteName = highEStringNotes[i][0] + highEStringNotes[i][1]
        }
        else {
            var noteName = highEStringNotes[i][0]
        }

        document.getElementById("highEString")
        .innerHTML += "<div class='".concat(ordinals[i].concat("Fret'> <button class='btn' id='".concat(highEStringNotes[i].concat("'><img src='images/notes/".concat(noteName.concat(".png' ></button></div></div>" ) ) ) ) ) )
        
    }

    for (let i = 0; i < lowEStringNotes.length; i++){

        // Low E String
        var temp = new NoteButton(lowEStringNotes[i], i, 'lowEString')
        lowEStringNoteObjects.push(temp)
        allNoteObjects.push(temp)

        // A String
        temp = new NoteButton(aStringNotes[i], i, 'aString')
        aStringNoteObjects.push(temp)
        allNoteObjects.push(temp)

        // D String
        temp = new NoteButton(dStringNotes[i], i, 'dString')
        dStringNoteObjects.push(temp)
        allNoteObjects.push(temp)

        // G String
        temp = new NoteButton(gStringNotes[i], i, 'gString')
        gStringNoteObjects.push(temp)
        allNoteObjects.push(temp)

        // B String
        temp = new NoteButton(bStringNotes[i], i, 'bString')
        bStringNoteObjects.push(temp)
        allNoteObjects.push(temp)

        // High E String
        temp = new NoteButton(highEStringNotes[i], i, 'highEString')
        highEStringNoteObjects.push(temp)
        allNoteObjects.push(temp)

    }
}

function downloadURI(uri, name) {
    var link = document.createElement("a");

    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();   
    //after creating link you should delete dynamic link
    //clearDynamicLink(link); 
}

function downloadImage(div){
    hashDiv = '#' + div
    document.getElementById('scaleName').innerText == '' ? filename = 'GuitarFretboard.png' : filename = document.getElementById('scaleName').innerText + '.png'

    html2canvas(document.querySelector(hashDiv)).then(canvas => {
        downloadURI(canvas.toDataURL(), filename)
    });
}

function updateScaleName(scaleNameInput) {
    document.getElementById('scaleName').innerText = scaleNameInput
}