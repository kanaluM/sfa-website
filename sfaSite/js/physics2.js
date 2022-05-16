document.getElementById("run").addEventListener("click", function(){startGame();});
document.getElementById("stop").addEventListener("click", function(){endGame();});

var myBackground;
var backgroundColor = "#99ccff";
var speed = 1;
var WIDTH2 = document.getElementById("canvas2").getAttribute("width");
var HEIGHT = document.getElementById("canvas2").getAttribute("height");

function startGame2() {
    myBackground2 = new component("background", WIDTH2,HEIGHT,backgroundColor,0,0);
    clockFace2 = new component("circle", 20, 0, "black", 266, HEIGHT/2);
    clockHand2 = new component("hand", 20, 90, "white", 266, HEIGHT/2);
    starTime2 = new component("text", "20px", "Consolas", "black", 459, HEIGHT-20);
    starTimeB2 = new component("", 50, 25, "white", 457, HEIGHT-40);
    sunTime2 = new component("text", "20px", "Consolas", "black", 243, HEIGHT-20);
    sunTimeB2 = new component("", 50, 25, "white", 242, HEIGHT-40);
    shipTime2 = new component("text", "20px", "Consolas", "black", 243, 40);
    shipTimeB2 = new component("", 50, 25, "white", 242, 20);
    sun2 = new component("image", 50, 50, "sun.jpg", 241, HEIGHT/2-25);
    star2 = new component("image", 50, 50, "star.png", 457, HEIGHT/2-25);
    myGameArea2.start();
}

function endGame2() {
    myGameArea2.stop();
    // myGameArea.clear();
}

// JS object
var myGameArea2 = {
    canvas: document.getElementById("canvas2"),
    start: function(){
        this.canvas.width = WIDTH2;
        this.canvas.height = HEIGHT;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;   
        this.interval = setInterval(updateGameArea2, 20);
        },
    drawBoard2 : function() {
        this.context.beginPath();
        for (var x = 56; x <= WIDTH2-30; x += 30) {
            this.context.moveTo(0.5 + x, -5);
            this.context.lineTo(0.5 + x, 5+HEIGHT);
            }
        this.context.strokeStyle = "black";
        this.context.stroke();
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }, 
    stop : function() {
        clearInterval(this.interval);  
    },
}

function component(type, width, height, color, x, y) {
    this.text = 0;
    this.type = type;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = -1;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea.context;
        if (this.type == "circle"){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
            ctx.strokeStyle = this.color;
            ctx.stroke();
            ctx.fillStyle = this.color;
            ctx.fill();
            }
        else if (this.type == "image"){
            this.image = new Image();
            this.image.src = this.color;
            ctx.drawImage(this.image,
            this.x, this.y,
            this.width, this.height);
            }
        else if (this.type == "hand"){
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x+this.width*Math.cos(this.height*Math.PI/180), this.y-this.width*Math.sin(this.height*Math.PI/180));
            ctx.strokeStyle = this.color;
            ctx.stroke();
            }
        else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text.toFixed(2), this.x, this.y);
        } 
        else{
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }

    this.newPos = function() {
        if (this.type == "light"){
            this.speedX = 1.25;
            }
        else if (this.type == "hand"){
            this.height -= 1;
            }
        this.x += this.speedX;
        }
    }

function updateGameArea2() {
    if (myGameArea2.frameNo == 0){
        starTime2.text = 48;
        }
    
    if (myGameArea2.frameNo >= 120 && myGameArea2.frameNo <= 200){
        myGameArea2.frameNo += 1;
        document.getElementById("coords").innerHTML = `KABOOOOOOOM`;
        return;
        }

    else{
        myGameArea2.clear();

        myBackground2.update();

        myGameArea2.drawBoard();

        if (myGameArea2.frameNo <= 120){
            sun2.newPos();
            sun2.update();
            }
        
        star2.newPos();
        star2.update();

        clockFace2.update();

        clockHand2.update();

        if (myGameArea2.frameNo == 119){
            explosion2 = new component("light", 4, HEIGHT+10, "yellow", 144, -5);
            explosion2.update();
            }

        if (myGameArea2.frameNo > 120){
            explosion2.newPos();
            explosion2.update();
            }

        starTime2.newPos();
        starTimeB2.newPos();
        starTimeB2.update();
        starTime2.text += 0.125;
        starTime2.update();

        sunTime2.newPos();
        sunTimeB2.newPos();
        sunTimeB2.update();
        sunTime2.text += 0.125;
        sunTime2.update();

        shipTimeB2.update();
        shipTime2.text += 0.20833;
        shipTime2.update();

        myGameArea2.frameNo += 1;

        if (star2.x <= 241){
            endGame();
            }

        document.getElementById("coords").innerHTML = `Coords are: x = ${clockFace.x}, y = ${clockFace.y} frame = ${myGameArea.frameNo} `;
        }
    }