// Dart Board
var myDarts = [];
var hits = 0;
var misses = 0;
var WIDTH = document.getElementById("dartsCanvas").getAttribute("width");
var HEIGHT = document.getElementById("dartsCanvas").getAttribute("height");
var dartNum = 0;
var nDarts = 20;
var DB = true;
var speedD = 500;

var c = document.getElementById("dartsCanvas").getContext("2d");
c.beginPath();
c.arc(WIDTH/2, HEIGHT/2, WIDTH/2, 0, 2*Math.PI);
c.strokeStyle = "black";
c.stroke();

document.getElementById("runDarts").addEventListener("click", function(){
    if (DB){
        DB = false;
        createDarts(nDarts)
        document.getElementById("dartsText").innerHTML = `Starting Game...`;
        myGameAreaDB.start();;}
    else{endGameDB();}
    });

document.getElementById("NDS").oninput = function() {
    // document.getElementById("dartsText").innerHTML = `Stopping Game....`;
    endGameDB();
    nDarts = document.getElementById("NDS").value;
    document.getElementById("NDText").innerHTML = `Throwing ${nDarts} darts`;
    }

document.getElementById("DSS").oninput = function() {
    // document.getElementById("dartsText").innerHTML = `Stopping Game...`;
    endGameDB();
    speedD = 1001 - document.getElementById("DSS").value;
    // document.getElementById("DSText").innerHTML = `Throwing one dart per ${(speed/1000).toFixed(3)} second(s)`;
    }

function endGameDB() {
    myGameAreaDB.stop();
    DB = true;
    myDarts = [];
    dartNum = 0;
    hits = 0
    misses = 0
}

// JS object
var myGameAreaDB = {
    canvas: document.getElementById("dartsCanvas"),
    start: function(){
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.context = this.canvas.getContext("2d");
        this.context.beginPath();
        this.context.arc(WIDTH/2, HEIGHT/2, WIDTH/2, 0, 2*Math.PI);
        this.context.stroke();
        this.interval = setInterval(updateGameAreaDB, speedD);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }, 
    stop : function() {
        clearInterval(this.interval);  
    },
}

function componentD(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.update = function(){
        ctx = myGameAreaDB.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, 2*Math.PI);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.fillStyle = this.color;
        ctx.fill();
        }
    }

function createDarts(n){
    /* Creates n randomly placed darts and adds 
    to myDarts list */

    for (i = 0; i < n; i += 1) {
        var x = Math.round(Math.random()*WIDTH*10)/10
        var y = Math.round(Math.random()*WIDTH*10)/10
        if ((x-WIDTH/2)**2 + (y-HEIGHT/2)**2 <= 40000){
            var color = "blue";
            }
        else {
            var color = "red";
            }
        myDarts.push(new componentD(x,y,color));
        }
    }

function updateGameAreaDB() {

    myDarts[dartNum].update();
    dartNum += 1;
    if (myDarts[dartNum-1].color == "blue") {hits += 1;}
    else {misses += 1;}
    document.getElementById("dartsText").innerHTML =
    `Darts Thrown: ${dartNum}<br>
    Darts Hit: ${hits}<br>
    Darts Missed: ${misses}<br>
    Current PI estimate: ${(4*hits/dartNum).toFixed(4)}`;

    if (dartNum == nDarts){
        endGameDB();
        }
    }

//
// Buffon's needle problem
//

var myNeedles = [];
var cross = 0;
var nCross = 0;
var needleNum = 0;
var nNeedle = 20;
var NB = true;
var speedN = 500;
var S = HEIGHT/10;

function drawGrid(){
    var c = document.getElementById("needlesCanvas").getContext("2d");
    for (i = 1; i < 10; i += 1) {
        c.beginPath();
        c.moveTo(0, i*S) 
        c.lineTo(WIDTH, i*S);
        c.strokeStyle = "black";
        c.stroke();
        }
    }
drawGrid();

document.getElementById("runNeedles").addEventListener("click", function(){
    if (NB){
        NB = false;
        createNeedles(nNeedle)
        document.getElementById("needlesText").innerHTML = `Starting Game...`;
        myGameAreaN.start();;}
    else{endGameN();}
    });
    
document.getElementById("NNS").oninput = function() {
    // document.getElementById("dartsText").innerHTML = `Stopping Game....`;
    endGameN();
    nNeedle = document.getElementById("NNS").value;
    document.getElementById("NNText").innerHTML = `Dropping ${nNeedle} needles`;
    }

document.getElementById("NSS").oninput = function() {
    // document.getElementById("dartsText").innerHTML = `Stopping Game...`;
    endGameN();
    speedN = 1001 - document.getElementById("NSS").value;
    // document.getElementById("DSText").innerHTML = `Throwing one dart per ${(speed/1000).toFixed(3)} second(s)`;
    }

function endGameN() {
    myGameAreaN.stop();
    NB = true;
    myNeedles = [];
    needleNum = 0;
    cross = 0;
    nCross = 0;
}

// JS object
var myGameAreaN = {
    canvas: document.getElementById("needlesCanvas"),
    start: function(){
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.context = this.canvas.getContext("2d");
        for (i = 0; i < 5; i += 1) {
            this.context.beginPath();
            this.context.rect(0, i*2*S, WIDTH, S);
            this.context.strokeStyle = "black";
            this.context.stroke();
            }
        this.interval = setInterval(updateGameAreaN, speedN);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }, 
    stop : function() {
        clearInterval(this.interval);  
    },
}

function componentN(x, y, t, color) {
    this.x = x;
    this.y = y;
    this.t = t;
    this.color = color;
    this.update = function(){
        ctx = myGameAreaN.context;
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x+S*Math.cos(this.t)/2, this.y+S*Math.sin(this.t)/2);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        }
    }
    
function crossOrNot(y1, y2){
    /* Returns true if a needle crosses the line
    Otherwise returns false */
    if (y1 > y2){var bY = y1, sY = y2;}
    else {var bY = y2, sY = y1;}
    for (k = 0; k < 11; k += 1) {  
        if (sY <= k*S && k*S <= bY){
            return true;
            }
        }
    return false
    }

function createNeedles(n){
    /* Creates n randomly placed needles and adds 
    to myNeedles list*/

    for (i = 0; i < n; i += 1) {
        var x = Math.round(Math.random()*WIDTH*10)/10;
        var y = Math.round(Math.random()*HEIGHT*10)/10;
        var t = Math.round(Math.random()*Math.PI*20)/10;
        if (crossOrNot(y, y+S*Math.sin(t)/2)){
            var color = "blue";
            }
        else {
            var color = "red";
            }
        myNeedles.push(new componentN(x,y,t,color));
        }
    }

function updateGameAreaN() {

    myNeedles[needleNum].update();
    // document.getElementById("needlesText").innerHTML += `y1 = ${myNeedles[needleNum].y} and y2 = ${myNeedles[needleNum].y+S*Math.sin(myNeedles[needleNum].t)} <br>`
    needleNum += 1;
    if (myNeedles[needleNum-1].color == "blue") {cross += 1;}
    else {nCross += 1;}
    document.getElementById("needlesText").innerHTML =
    `Needles Dropped: ${needleNum}<br>
    Crossing: ${cross}<br>
    Not Crossing: ${nCross}<br>
    Current PI estimate is ${(needleNum/cross).toFixed(4)}`;

    if (needleNum == nNeedle){
        endGameN();
        }
    }

//
// Estimating e
//
var mySequences = [];
var EB = true;
var speedE = 500;
var numSequences = 20;
var sNum = 0;
var sumTotal = 0;

document.getElementById("runEList").addEventListener("click", function(){
    if (EB){
        NB = false;
        createSequences(numSequences);
        document.getElementById("eListText").innerHTML = `Starting Game...`;
        myGameAreaE.start();;}
    else{endGameE();}
    });
    
document.getElementById("ENS").oninput = function() {
    // document.getElementById("dartsText").innerHTML = `Stopping Game....`;
    endGameE();
    numSequences = document.getElementById("ENS").value;
    document.getElementById("ENText").innerHTML = `Generating ${numSequences} sequences`;
    }

document.getElementById("ESS").oninput = function() {
    // document.getElementById("dartsText").innerHTML = `Stopping Game...`;
    endGameE();
    speedE = 1001 - document.getElementById("ESS").value;
    // document.getElementById("DSText").innerHTML = `Throwing one dart per ${(speed/1000).toFixed(3)} second(s)`;
    }

function endGameE() {
    myGameAreaE.stop();
    EB = true;
    mySequences = [];
    sNum = 0;
    sumTotal = 0;
}

// JS object
var myGameAreaE = {
    canvas: document.getElementById("eCanvas"),
    start: function(){
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameAreaE, speedE);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }, 
    stop : function() {
        clearInterval(this.interval);  
    },
}

// function componentE(x, y, color) {
//     this.x = x;
//     this.y = y;
//     this.color = color;
//     this.update = function(){
//         ctx = myGameAreaE.context;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, 2, 0, 2*Math.PI);
//         ctx.strokeStyle = this.color;
//         ctx.stroke();
//         ctx.fillStyle = this.color;
//         ctx.fill();
//         }
//     }

function createSequenceHelper(){
    var k = 0, sum = 0;
    while (sum <= 1){
        sum += Math.random();
        k += 1;
        }
    return k;
    }

var colorsList = ["white", "white", "red", "orange", "green", "blue", "purple", "black", "black", "black", "black", "black", "black", "black", "black"]

// function createSequences(n){
//     /* Creates n random sequences and adds 
//     to mySequences list*/
//     for (i = 0; i < n; i += 1){
//         var len = createSequenceHelper();
//         var x = Math.random()*400;
//         var y = Math.random()*400;
//         var color = colorsList[len];
//         mySequences.push(new componentE(x,y,color));
//         }
//     }

function componentE(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.update = function(){
        ctx = myGameAreaE.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }

function createSequences(n){
    /* Creates n random sequences and adds 
    to mySequences list*/
    var lenCounter = {2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0};
    for (i = 0; i < n; i += 1){
        var len = createSequenceHelper();
        lenCounter[len] += 1; 
        var basex = 30 + 60*(len-2);
        var basey = 3*lenCounter[len];
        var height = 3;
        var width = 5;
        var color = colorsList[len];
        if (basey > 380) {
            x = 30+5*(Math.ceil(basey/395)-1)+60*(len-2);
            y = 400*(Math.ceil(basey/395)) - 3*lenCounter[len];
            mySequences.push(new componentE(x,y,width,height,color));
            }
        else{mySequences.push(new componentE(basex,400-basey,width,height,color));}
        }
    }

function updateGameAreaE() {

    mySequences[sNum].update();
    // document.getElementById("needlesText").innerHTML += `y1 = ${myNeedles[needleNum].y} and y2 = ${myNeedles[needleNum].y+S*Math.sin(myNeedles[needleNum].t)} <br>`
    sNum += 1;
    sumTotal += colorsList.indexOf(mySequences[sNum-1].color)
    document.getElementById("eListText").innerHTML =
    `Sequences Generated: ${sNum}<br>
    Current E estimate: ${(sumTotal/sNum).toFixed(4)}`;

    if (sNum == numSequences){
        endGameE();
        }
    }

// // Crickets
// var myCricket = [];
// var WIDTH = document.getElementById("cricketCanvas").getAttribute("width");
// var HEIGHT = document.getElementById("cricketCanvas").getAttribute("height");
// var cricketNum = 0;
// var nCricket = 20;
// var CJ = true;
// var speedC = 500;

// var c = document.getElementById("cricketCanvas").getContext("2d");
// c.beginPath();
// c.arc(WIDTH/2, HEIGHT/2, WIDTH/2, 0, 2*Math.PI);
// c.strokeStyle = "black";
// c.stroke();

// document.getElementById("runDarts").addEventListener("click", function(){
//     if (DB){
//         DB = false;
//         createDarts(nDarts)
//         document.getElementById("dartsText").innerHTML = `Starting Game...`;
//         myGameAreaDB.start();;}
//     else{endGameDB();}
//     });

// document.getElementById("NDS").oninput = function() {
//     // document.getElementById("dartsText").innerHTML = `Stopping Game....`;
//     endGameDB();
//     nDarts = document.getElementById("NDS").value;
//     document.getElementById("NDText").innerHTML = `Throwing ${nDarts} darts`;
//     }

// document.getElementById("DSS").oninput = function() {
//     // document.getElementById("dartsText").innerHTML = `Stopping Game...`;
//     endGameDB();
//     speedD = 1001 - document.getElementById("DSS").value;
//     // document.getElementById("DSText").innerHTML = `Throwing one dart per ${(speed/1000).toFixed(3)} second(s)`;
//     }

// function endGameDB() {
//     myGameAreaDB.stop();
//     DB = true;
//     myDarts = [];
//     dartNum = 0;
//     hits = 0
//     misses = 0
// }

// // JS object
// var myGameAreaDB = {
//     canvas: document.getElementById("dartsCanvas"),
//     start: function(){
//         this.canvas.width = WIDTH;
//         this.canvas.height = HEIGHT;
//         this.context = this.canvas.getContext("2d");
//         this.context.beginPath();
//         this.context.arc(WIDTH/2, HEIGHT/2, WIDTH/2, 0, 2*Math.PI);
//         this.context.stroke();
//         this.interval = setInterval(updateGameAreaDB, speedD);
//         },
//     clear : function() {
//         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//         }, 
//     stop : function() {
//         clearInterval(this.interval);  
//     },
// }

// function componentD(x, y, color) {
//     this.x = x;
//     this.y = y;
//     this.color = color;
//     this.update = function(){
//         ctx = myGameAreaDB.context;
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, 2, 0, 2*Math.PI);
//         ctx.strokeStyle = this.color;
//         ctx.stroke();
//         ctx.fillStyle = this.color;
//         ctx.fill();
//         }
//     }

// function createDarts(n){
//     /* Creates n randomly placed darts and adds 
//     to myDarts list */

//     for (i = 0; i < n; i += 1) {
//         var x = Math.round(Math.random()*WIDTH*10)/10
//         var y = Math.round(Math.random()*WIDTH*10)/10
//         if ((x-WIDTH/2)**2 + (y-HEIGHT/2)**2 <= 40000){
//             var color = "blue";
//             }
//         else {
//             var color = "red";
//             }
//         myDarts.push(new componentD(x,y,color));
//         }
//     }

// function updateGameAreaDB() {

//     myDarts[dartNum].update();
//     dartNum += 1;
//     if (myDarts[dartNum-1].color == "blue") {hits += 1;}
//     else {misses += 1;}
//     document.getElementById("dartsText").innerHTML =
//     `Darts Thrown: ${dartNum}<br>
//     Darts Hit: ${hits}<br>
//     Darts Missed: ${misses}<br>
//     Current PI estimate: ${(4*hits/dartNum).toFixed(4)}`;

//     if (dartNum == nDarts){
//         endGameDB();
//         }
//     }