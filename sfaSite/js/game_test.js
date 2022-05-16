document.getElementById("startGame").addEventListener("click", function(){startGame();});
document.getElementById("endGame").addEventListener("click", function(){endGame()});

var myGamePiece;
var myObstaclesAll = [];
var myPathsAll =[];
var myPathsAllNames = []
var myPathTriggersAll =[];
var myScore;
var myBackground;
var swerve = "Wrong";
var backgroundColor = "#99ccff";
var displayPath = false;
var speed = 2;
var score = 0;
var WIDTH = document.getElementById("canvas").getAttribute("width");
var HEIGHT = document.getElementById("canvas").getAttribute("height");
var freq = 300;
var currentTrack = "plasma.mp3";
var scoreSound;

document.getElementById("backgroundMusicVolume").oninput = function() {
    var backgroundMusicVolume = document.getElementById("backgroundMusicVolume").value;
    document.getElementById("backgroundMusic").volume = (backgroundMusicVolume/100).toFixed(2);
    if (backgroundMusicVolume == 100){document.getElementById("backgroundMusicVolumeText").innerHTML = `Music at ${backgroundMusicVolume}% - must be a bop!`;}
    else{document.getElementById("backgroundMusicVolumeText").innerHTML = `Music at ${backgroundMusicVolume}%`;}
    }

document.getElementById("changeTrack").addEventListener("click", function() {
    if (currentTrack == "plasma.mp3"){currentTrack = "legendary.mp3";}
    else if (currentTrack == "legendary.mp3"){currentTrack = "plasma.mp3";}

    document.getElementById("backgroundMusic").pause();
    document.getElementById("backgroundMusic").src = currentTrack;
    document.getElementById("backgroundMusic").load();
    document.getElementById("backgroundMusic").play();
    document.getElementById("currentTrack").innerHTML = `Now playing ${currentTrack}`;
    });


document.getElementById("parabola").addEventListener("click", function(){
    swerve="parabola";
    document.getElementById("path").innerHTML = "PARABOLA";}); 
document.getElementById("e").addEventListener("click", function(){
    swerve="e";
    document.getElementById("path").innerHTML = "E";});
document.getElementById("sin").addEventListener("click", function(){
    swerve="sin";
    document.getElementById("path").innerHTML = "SINE";});
document.getElementById("log").addEventListener("click", function(){
    swerve="log";
    document.getElementById("path").innerHTML = "LOGARITHM";});

function startGame() {
    myBackground = new component(WIDTH,HEIGHT,backgroundColor,0,0,"background");
    myGamePiece = new component(5, 5, "red", 42, 100);
    document.getElementById("backgroundMusic").volume=document.getElementById("backgroundMusicVolume").value/100;
    document.getElementById("backgroundMusic").play();
    myGameArea.start();
}

function endGame() {
    myGameArea.stop();
    myGameArea.clear();
    document.location.reload();
}

// JS object
var myGameArea = {
    canvas: document.getElementById("canvas"),
    start: function(){
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.getElementById("controls"));
        this.frameNo = 0;   
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }, 
    stop : function() {
        clearInterval(this.interval);  
    },
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
  }

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.color = color;
    // this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        }

    this.hitWall = function() {
        if (this.y > myGameArea.canvas.height - this.height) {
            this.y = myGameArea.canvas.height - this.height;
            }
        if (this.y < 0) {
            this.y = 0;
            }
        if (this.x > myGameArea.canvas.width - this.width) {
            this.x = myGameArea.canvas.width - this.width;
            }
        if (this.x < 0) {
            this.x = 0;
            }
        }

    this.newPos = function() {

        // this.speedX = 0;
        // this.speedY = 0;
        // if (myGameArea.keys && myGameArea.keys[37]) {this.speedX = -1; }
        // if (myGameArea.keys && myGameArea.keys[39]) {this.speedX = 1; }
        // if (myGameArea.keys && myGameArea.keys[38]) {this.speedY = -1; }
        // if (myGameArea.keys && myGameArea.keys[40]) {this.speedY = 1; }
        // else{this.speedX = 0; this.speedY = 0;}

        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
                }
            }

        document.getElementById("up").addEventListener("mousedown", function(){myGamePiece.speedY = -1*speed;});
        document.getElementById("up").addEventListener("mouseup", function(){myGamePiece.speedY = 0;});
        document.getElementById("down").addEventListener("mousedown", function(){myGamePiece.speedY = speed;});
        document.getElementById("down").addEventListener("mouseup", function(){myGamePiece.speedY = 0;});
        // document.getElementById("left").addEventListener("mousedown", function(){myGamePiece.speedX = -1;});
        // document.getElementById("left").addEventListener("mouseup", function(){myGamePiece.speedX = 0;});
        // document.getElementById("right").addEventListener("mousedown", function(){myGamePiece.speedX = 1;});
        // document.getElementById("right").addEventListener("mouseup", function(){myGamePiece.speedX = 0;});

        // this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x >= (42+speed)){this.x -= speed; this.color=backgroundColor;}
        else if (this.x > 42 && this.x < 42+speed){this.x -= 1;}
        else if (this.x == 42){displayPath = false; this.color="red";}
        else if (this.x < 42){this.x += speed;}

        this.hitWall();}

    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {crash = false;
            }
        return crash;
        }
}

function updateGameArea() {
    for (k = 0; k < myObstaclesAll.length; k += 1) {
        for (i = 0; i < myObstaclesAll[k].length; i += 1) {
            if (myGamePiece.crashWith(myObstaclesAll[k][i])) {
                myGameArea.stop();
                myGameArea.clear();
                // document.location.reload()
                return;
                }
            }
        }    

    myGameArea.clear();
    myGameArea.frameNo += 1;

    myBackground.newPos();    
    myBackground.update();

    if (myGameArea.frameNo == 1 || everyinterval(freq)) {
        var num = Math.random();
        createObstacle(num);
        }

    for (k = 0; k < myPathTriggersAll.length; k += 1) {
        for (i = 0; i < myPathTriggersAll[k].length; i += 1) {
            myPathTriggersAll[k][i].x -= speed;
            myPathTriggersAll[k][i].update();
            }
        }

    for (k = 0; k < myPathTriggersAll.length; k += 1) {
        for (i = 0; i < myPathTriggersAll[k].length; i += 1) {
            if (swerve == myPathsAllNames[0] && myGamePiece.crashWith(myPathTriggersAll[0][i])) {
                displayPath = true;
                myGamePiece.x = Math.floor(myPathsAll[0][myPathsAll[0].length-1].x);
                myGamePiece.y = Math.floor(myPathsAll[0][myPathsAll[0].length-1].y);
                myPathTriggersAll.splice(0,1);
                myPathsAllNames.splice(0,1);
                score += 1
                document.getElementById("scoreSound").play();
                swerve = "Wrong";
                document.getElementById("score").innerHTML = score;
                document.getElementById("path").innerHTML = "?";
                break;
                }
            }
        }


    if (myObstaclesAll[0].length == 0){myObstaclesAll.splice(0,1);}

    if (myObstaclesAll.length > 0){
        for (i = 0; i < myObstaclesAll[0].length; i += 1) {
            if (myObstaclesAll[0][i].x < 0){myObstaclesAll[0].splice(i, 1);}}}

    for (k = 0; k < myObstaclesAll.length; k += 1) {
        for (i = 0; i < myObstaclesAll[k].length; i += 1) {
            myObstaclesAll[k][i].x -= speed;
            myObstaclesAll[k][i].update();
            }
        }
    
    myGamePiece.newPos();
    myGamePiece.update();

    if (myPathsAll[0].length == 0){myPathsAll.splice(0,1);}
    
    if (myPathsAll.length > 0){
        for (i = 0; i < myPathsAll[0].length; i += 1) {
            if (myPathsAll[0][i].x < 42){myPathsAll[0].splice(i, 1);}}}

    for (k = 0; k < myPathsAll.length; k += 1) {
        for (i = 0; i < myPathsAll[k].length; i += 1) {
            myPathsAll[k][i].x -= speed;
            myPathsAll[k][i].update(); 
            if (displayPath == true && myPathsAll[k][i].x <= 70 && myPathsAll[k][i].x >= 42){myPathsAll[k][i].color="red";}    
            }
        }

    document.getElementById("coords").innerHTML = `Coords are: x = ${myGamePiece.x}, y = ${myGamePiece.y}. <br>
    There are ${myPathsAll.length} path elements (with ${myPathsAll.flat().length} elements total) and first element ${myPathsAll[0].length}. <br>
    There are ${myPathTriggersAll.length} path triggers (with ${myPathTriggersAll.flat().length} elements). <br>
    There are ${myObstaclesAll.length} obstacle elements (with ${myObstaclesAll.flat().length} elements total) and first element ${myObstaclesAll[0].length}. <br>
    Is ${myPathsAllNames[0]} == ${swerve}?<br>
    Display path? ${displayPath}`;
    }

function createPathTriggers(x,y){
    var myPathTriggers = [];
    myPathTriggers.push(new component(1, 5, backgroundColor, x, y-20));
    myPathTriggers.push(new component(1, 5, backgroundColor, x, y-15));
    myPathTriggers.push(new component(1, 5, backgroundColor, x, y-10));
    myPathTriggers.push(new component(1, 5, backgroundColor, x, y-5));
    myPathTriggers.push(new component(1, 5, backgroundColor, x, y));
    myPathTriggers.push(new component(1, 5, backgroundColor, x, y+5));
    myPathTriggers.push(new component(1, 5, backgroundColor, x, y+10));
    myPathTriggers.push(new component(1, 5, backgroundColor, x, y+15));
    return myPathTriggers;
}

function createObstacle(path){
    var myPaths = [], myObstacles =[];
    var xEnd = myGameArea.canvas.width;
    if (path <= 0.25){
        myPathsAllNames.push("parabola");
        for (let i of Array.from(Array(500).keys())){
            var t = i/500;
            var x1=100+xEnd, y1=50, x2=250+xEnd, y2=250, x3=400+xEnd, y3=50;
            var x = ((1-t)**2*x1 + 2*(1-t)*t*x2 + t**2*x3);
            var y = ((1-t)**2*y1 + 2*(1-t)*t*y2 + t**2*y3);
            if (i == 0){myPathTriggersAll.push(createPathTriggers(x,y));}
            else{myPaths.push(new component(3, 3, backgroundColor, x, y));}
            myObstacles.push(new component(2, y-20, "green", x, 0));
            myObstacles.push(new component(2, 200-y, "green", x, y+20));
            }
        }
    else if (path <= 0.5){  
        myPathsAllNames.push("e");
        for (let i of Array.from(Array(500).keys())){
            var t = i/500;
            var x1=75+xEnd, y1=175, x2=250+xEnd, y2=160, x3=300+xEnd, y3=25;
            var x = ((1-t)**2*x1 + 2*(1-t)*t*x2 + t**2*x3);
            var y = ((1-t)**2*y1 + 2*(1-t)*t*y2 + t**2*y3);
            if (i == 0){myPathTriggersAll.push(createPathTriggers(x,y));(x,y);}
            else{myPaths.push(new component(3, 3, backgroundColor, x, y));}
            myObstacles.push(new component(2, y-20, "green", x, 0));
            myObstacles.push(new component(2, 200-y, "green", x, y+20));
            }
        }
    else if (path <= 0.75){  
        var xS = 25; yS = 50;
        var sX = 50;  
        myPathsAllNames.push("sin");
        for (let i of Array.from(Array(6).keys())){
            xS += 50;
            yS += 50;
            if (i%2==0) {var p = 42;}
            else {var p = 142;}
            for (let k of Array.from(Array(100).keys())){
                var t = k/100;
                var x1=sX+xEnd, y1=100, x2=xS+xEnd, y2=p, x3=yS+xEnd, y3=100;
                var x = ((1-t)**2*x1 + 2*(1-t)*t*x2 + t**2*x3);
                var y = ((1-t)**2*y1 + 2*(1-t)*t*y2 + t**2*y3);
                if (i == 0 && k == 0){myPathTriggersAll.push(createPathTriggers(x,y));}
                else{myPaths.push(new component(3, 3, backgroundColor, x, y));}
                myObstacles.push(new component(2, y-20, "green", x, 0));
                myObstacles.push(new component(2, 200-y, "green", x, y+20));
                }
            sX = yS;
            }
        }
    else{    
        myPathsAllNames.push("log");
        for (let i of Array.from(Array(500).keys())){
            var t = i/500;
            var x1=50+xEnd, y1=160, x2=80+xEnd, y2=40, x3=300+xEnd, y3=25;
            var x = ((1-t)**2*x1 + 2*(1-t)*t*x2 + t**2*x3);
            var y = ((1-t)**2*y1 + 2*(1-t)*t*y2 + t**2*y3);
            if (i == 0) {myPathTriggersAll.push(createPathTriggers(x,y));}
            else {myPaths.push(new component(3, 3, backgroundColor, x, y));}
            myObstacles.push(new component(2, y-20, "green", x, 0));
            myObstacles.push(new component(2, 200-y, "green", x, y+20));
            }
        }
    myPathsAll.push(myPaths);
    myObstaclesAll.push(myObstacles);
}

document.getElementById("testB").addEventListener("click", function(){
    drawMe();
})
        
function drawMe() {
    var canvas = document.getElementById('canvasTest1');
    var ctx = canvas.getContext('2d');
    // linear space
    ctx.beginPath();
    for (let i of Array.from(Array(21).keys())){
        var x = 50+i*10;
        ctx.moveTo(x, 10);
        ctx.fillRect(x, 0, 2, 200);
        // document.getElementById("test").innerHTML += ` ${x}`
        }
    ctx.stroke();

    var canvas = document.getElementById('canvasTest6');
    var ctx = canvas.getContext('2d');
    // linear color
    ctx.beginPath();
    for (let i of Array.from(Array(50).keys())){
        var x = 50+i*5;
        ctx.moveTo(x, 10);
        ctx.fillStyle =`rgb(0, 0, ${255*(i/49)})`
        ctx.fillRect(x, 0, 5, 200);
        // document.getElementById("test").innerHTML += ` ${x}`
        }
    ctx.stroke();


    var canvas = document.getElementById('canvasTest2');
    var ctx = canvas.getContext('2d');
    // quadratic space
    ctx.beginPath();
    for (let i of Array.from(Array(21).keys())){
        var x = (50+(i**2/2)).toFixed(2);
        ctx.moveTo(x, 10);
        ctx.fillRect(x, 0, 2, 200);
        // document.getElementById("test").innerHTML += ` ${x}`
        }
    ctx.stroke();

    var canvas = document.getElementById('canvasTest7');
    var ctx = canvas.getContext('2d');
    // quadratic color
    ctx.beginPath();
    for (let i of Array.from(Array(50).keys())){
        var x = 50+i*5;
        ctx.moveTo(x, 10);
        ctx.fillStyle =`rgb(0, 0, ${255*((i/49)**2)})`
        ctx.fillRect(x, 0, 5, 200);
        // document.getElementById("test").innerHTML += ` ${x}`
        }
    ctx.stroke();

    var canvas = document.getElementById('canvasTest3');
    var ctx = canvas.getContext('2d');
    // log space
    ctx.beginPath();
    for (let i of Array.from(Array(21).keys())){
        var x = (50+(200/(Math.log(21*Math.E)-1))*(Math.log(Math.E*i+Math.E)-1)).toFixed(2);
        ctx.moveTo(x, 10);
        ctx.fillRect(x, 0, 2, 200);
        // document.getElementById("test").innerHTML += ` ${x}`
        }
    ctx.stroke();

    var canvas = document.getElementById('canvasTest8');
    var ctx = canvas.getContext('2d');
    // log color
    ctx.beginPath();
    for (let i of Array.from(Array(50).keys())){
        var x = 50+i*5;
        ctx.moveTo(x, 10);
        ctx.fillStyle =`rgb(0, 0, ${255*Math.log(i+1/49)/Math.log(49)})`
        ctx.fillRect(x, 0, 5, 200);
        // document.getElementById("test").innerHTML += ` ${x}`
        }
    ctx.stroke();

    var canvas = document.getElementById('canvasTest4');
    var ctx = canvas.getContext('2d');
    // e space
    ctx.beginPath();
    for (let i of Array.from(Array(21).keys())){
        var x = (40+10*Math.E**(Math.log(21)*i/20)).toFixed(2);
        ctx.moveTo(x, 10);
        ctx.fillRect(x, 0, 2, 200);
        // document.getElementById("test").innerHTML += ` ${x}`
        }
    ctx.stroke();

    var canvas = document.getElementById('canvasTest9');
    var ctx = canvas.getContext('2d');
    // e color
    ctx.beginPath();
    for (let i of Array.from(Array(50).keys())){
        var x = 50+i*5;
        ctx.moveTo(x, 10);
        ctx.fillStyle =`rgb(0, 0, ${255*Math.exp(i/49)/Math.E})`
        ctx.fillRect(x, 0, 5, 200);
        // document.getElementById("test").innerHTML += ` ${x}`
        }
    ctx.stroke();

    var canvas = document.getElementById('canvasTest5');
    var ctx = canvas.getContext('2d');
    // sin space
    ctx.beginPath();
    for (let i of Array.from(Array(20).keys())){
        var x = (150+100*Math.sin(i*Math.PI/10)).toFixed(2);
        ctx.moveTo(x, 10);
        ctx.fillRect(x, 0, 2, 200);
        // document.getElementById("test").innerHTML += ` ${x}`
        }
    ctx.stroke();

    var canvas = document.getElementById('canvasTest10');
    var ctx = canvas.getContext('2d');
    // sin color
    ctx.beginPath();
    for (let i of Array.from(Array(50).keys())){
        var x = 50+i*5;
        ctx.moveTo(x, 10);
        ctx.fillStyle =`rgb(0, 0, ${127+127*Math.sin(i/20*Math.PI)})`
        ctx.fillRect(x, 0, 5, 200);
        // document.getElementById("test").innerHTML += ` ${x}`
        }
    ctx.stroke();
    }

// document.getElementById("testB1").addEventListener("click", function(){
//     draw1();
// })

// function draw1() {
//     var canvas = document.getElementById('canvas1');
//     var ctx = canvas.getContext('2d');
  
//     // Quadratric curves example
//     ctx.beginPath();
//     ctx.moveTo(100, 50);
//     ctx.quadraticCurveTo(250, 250, 400, 50);

//     for (let i of Array.from(Array(41).keys())){
//         var t = i/40;
//         var x1=100, y1=50, x2=250, y2=250, x3=400, y3=50;
//         var x = ((1-t)**2*x1 + 2*(1-t)*t*x2 + t**2*x3);
//         var y = ((1-t)**2*y1 + 2*(1-t)*t*y2 + t**2*y3);
//         ctx.fillRect(x, 0, 1, y-20);
//         ctx.fillRect(x, y+20, 1, 175-y,);
//         }
    
//     ctx.stroke();
//     }

// document.getElementById("testB2").addEventListener("click", function(){
//     draw2();
// })
    
// function draw2() {
//     var canvas = document.getElementById('canvas2');
//     var ctx = canvas.getContext('2d');
    
//     // Quadratric curves example
//     ctx.beginPath();
//     ctx.moveTo(75, 175);
//     ctx.quadraticCurveTo(250, 160, 300, 25);
//     for (let i of Array.from(Array(40).keys())){
//         var t = i/40;
//         var x1=75, y1=175, x2=250, y2=160, x3=300, y3=25;
//         var x = ((1-t)**2*x1 + 2*(1-t)*t*x2 + t**2*x3);
//         var y = ((1-t)**2*y1 + 2*(1-t)*t*y2 + t**2*y3);
//         ctx.fillRect(x, 0, 1, y-20);
//         ctx.fillRect(x, y+20, 1, 175-y,);
//         }
//     ctx.stroke();
//     }
    
// document.getElementById("testB3").addEventListener("click", function(){
//     draw3();
// })
    
// function draw3() {
//     var canvas = document.getElementById('canvas3');
//     var ctx = canvas.getContext('2d');
    
//     // Quadratric curves example
//     ctx.beginPath();
//     var xS = 25; yS = 50;
//     var sX = 50;
//     ctx.moveTo(sX, 100);
//     for (let i of Array.from(Array(6).keys())){
//         xS += 50;
//         yS += 50;
//         if (i%2==0) {var p = 42;}
//         else {var p = 142;}
//         ctx.quadraticCurveTo(xS, p, yS, 100);
//         for (let i of Array.from(Array(10).keys())){
//             var t = i/10;
//             var x1=sX, y1=100, x2=xS, y2=p, x3=yS, y3=100;
//             var x = ((1-t)**2*x1 + 2*(1-t)*t*x2 + t**2*x3);
//             var y = ((1-t)**2*y1 + 2*(1-t)*t*y2 + t**2*y3);
//             ctx.fillRect(x, 0, 1, y-20);
//             ctx.fillRect(x, y+20, 1, 175-y,);
//             }
//         sX = yS;
//         }
//     ctx.stroke();
//     }
    
// document.getElementById("testB4").addEventListener("click", function(){
//     draw4();
// })
        
// function draw4() {
//     var canvas = document.getElementById('canvas4');
//     var ctx = canvas.getContext('2d');
    
//     // Quadratric curves example
//     ctx.beginPath();
//     ctx.moveTo(50, 160);
//     ctx.quadraticCurveTo(80, 40, 300, 25);
//     for (let i of Array.from(Array(500).keys())){
//         var t = i/500;
//         var x1=50, y1=160, x2=80, y2=40, x3=300, y3=25;
//         var x = ((1-t)**2*x1 + 2*(1-t)*t*x2 + t**2*x3);
//         var y = ((1-t)**2*y1 + 2*(1-t)*t*y2 + t**2*y3);
//         ctx.fillRect(x, 0, 1, y-20);
//         ctx.fillRect(x, y+20, 1, 175-y,);
//         }
//     ctx.stroke();
//     }



