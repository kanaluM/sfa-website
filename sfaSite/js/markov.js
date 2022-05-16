document.getElementById("oneOrTwo").addEventListener("click", function(){
if (document.getElementById("oneOrTwo").innerHTML == "one"){
    document.getElementById("oneOrTwo").innerHTML = "two";}
else if (document.getElementById("oneOrTwo").innerHTML == "two"){
    document.getElementById("oneOrTwo").innerHTML = "one";}
});

document.getElementById("submit").addEventListener("click", function(){
    var text = document.getElementById("message").value;
    // document.getElementById("test").innerHTML = document.getElementById("oneOrTwo").innerHTML;
    if (document.getElementById("oneOrTwo").innerHTML == "one"){
        var dict = createDictionary1(text);
        generateText1(dict,100);}
    if (document.getElementById("oneOrTwo").innerHTML == "two")
        var dict = createDictionary2(text);
        generateText2(dict,100);
});

function createDictionary1(text){
    /*First order Markov Generator: Accepts a string of text and creates a 
    dictionary whose entries are a list of words that may legally follow the key word*/
    
    var d = {}, pw = '$', stext = text.replace(/\n/g," ").split(" ");
    for (let nw of stext){
        if (nw == ""){
        continue}
        if (!(pw in d)){
            d[pw] = [nw];}
        else if (pw in d){
            d[pw].push(nw);}
        pw = nw;
        if ('!.?'.includes(nw[nw.length-1])){
            pw = '$';}
        else if (':;'.includes(nw[nw.length-1])){
            pw = '&';}}
    // document.getElementById("test").innerHTML = JSON.stringify(d);
    return d
};

function generateText1(d, N){
/*takes in a dictionary of word transitions d and a positive integer, n. 
Then, generateText should print a string of N words.*/
var L = d['$'], returnMe = "";
for (let i of Array.from(Array(N).keys())){
    var index = Math.floor(Math.random() * L.length);
    var nw = L[index];     
    returnMe += nw + " "; 
    // document.getElementById("test").innerHTML += `Index is ${index} and L[index] is ${nw} and returnMe is ${returnMe}<br>`;
    // document.getElementById("generatedText").innerHTML += nw + " ";
    if ('!.?'.includes(nw[nw.length-1])){
        L = d['$'];}
    else if (':;'.includes(nw[nw.length-1])){
        L = d['&'];}
    else {L = d[nw]}};
// document.getElementById("test").innerHTML = `Index is ${Math.floor(Math.random() * d["$"].length)} and L[index] is ${d["$"][index]}`;
document.getElementById("generatedText").innerHTML = returnMe;
return;
};

function createDictionary2(text){
    /*Second order Markov Generator: Accepts a string of text and creates a 
    dictionary whose entries are a list of words that may legally follow the key word*/
    
    var d = {}, ppw = '$', pw = "#", stext = text.replace(/\n/g," ").split(" ");
    for (let nw of stext){
        if (nw == ""){
            continue}
        if (!(ppw + " " + pw in d)){
            d[ppw + " " + pw] = [nw];}
        else if (ppw + " " + pw in d){
            d[ppw + " " + pw].push(nw);}
        ppw = pw;
        pw = nw;
        // if ('!.?'.includes(nw[nw.length-1])){
        //     ppw = '$';
        //     pw = '#'}
        // if (':;'.includes(nw[nw.length-1])){
        //     ppw = '&';
        //     pw = '#'}
    }
    // document.getElementById("test").innerHTML = JSON.stringify(d);
    return d
};

function generateText2(d, N){
    /*takes in a dictionary of word transitions d and a positive integer, n. 
    Then, generateText should print a string of N words.*/
    var currentKey = d['$ #'], ppw = '$', pw = '#', returnMe = "";
    for (let i of Array.from(Array(N).keys())){
        var index = Math.floor(Math.random() * currentKey.length);
        var nw = currentKey[index];     
        returnMe += nw + " "; 
        // document.getElementById("test").innerHTML += `Index is ${index} and L[index] is ${nw}<br>`;
        // document.getElementById("generatedText").innerHTML += L[index]+ " ";
        ppw = pw
        pw = nw
        currentKey = d[ppw + " " + pw];
        // if ('!.?'.includes(nw[nw.length-1])){
        //     L = d['$'];}
        // else if (':;'.includes(nw[nw.length-1])){
        //     L = d['&'];}
        // else {L = d[nw]}};
    }
    document.getElementById("generatedText").innerHTML = returnMe;
    return;
    };