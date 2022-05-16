document.getElementById("startGame").addEventListener("click", function(){startGame()});
document.getElementById("endGame").addEventListener("click", function(){endGame()});

var myGamePiece;
var myObstacles = [];
var myScore;
var myBackground;

function startGame() {
    myBackground = new component(480,270,"#99ccff",0,0,"background");
    myGamePiece = new component(30, 30, "red", 10, 120);
    myScore = new component("20px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

function endGame() {
    myGameArea.stop();
    myGameArea.clear();
    document.location.reload();
}

// JS object
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.width = 480;
        this.canvas.height = 270;
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
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } 
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            }
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

        document.getElementById("up").addEventListener("mousedown", function(){myGamePiece.speedY = -1;});
        document.getElementById("up").addEventListener("mouseup", function(){myGamePiece.speedY = 0;});
        document.getElementById("down").addEventListener("mousedown", function(){myGamePiece.speedY = 1;});
        document.getElementById("down").addEventListener("mouseup", function(){myGamePiece.speedY = 0;});
        document.getElementById("left").addEventListener("mousedown", function(){myGamePiece.speedX = -1;});
        document.getElementById("left").addEventListener("mouseup", function(){myGamePiece.speedX = 0;});
        document.getElementById("right").addEventListener("mousedown", function(){myGamePiece.speedX = 1;});
        document.getElementById("right").addEventListener("mouseup", function(){myGamePiece.speedX = 0;});

        this.x += this.speedX;
        this.y += this.speedY;
        this.hitWall();

        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
                }
            }
        }

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
    var x;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            myGameArea.clear();
            document.location.reload()
            return;
            }
        }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    myBackground.newPos();    
    myBackground.update();
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
        }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
        }
    
    var score = Math.floor(myGameArea.frameNo/150-2);
        if (score < 0){score = 0}
    myScore.text = "SCORE: " + score
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
    }