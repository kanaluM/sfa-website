document.getElementById("run").addEventListener("click", function(){startGame();});
document.getElementById("stop").addEventListener("click", function(){endGame();});

document.getElementById("run2").addEventListener("click", function(){startGame2();});
document.getElementById("stop2").addEventListener("click", function(){endGame2();});

document.getElementById("power").addEventListener("click", function(){
    startGame();
    startGame2();
    });

// var myBackground;
var backgroundColor = "#99ccff";
var speed = 1;
var WIDTH = document.getElementById("canvas").getAttribute("width");
var HEIGHT = document.getElementById("canvas").getAttribute("height");
// var myBackground2;
var WIDTH2 = document.getElementById("canvas2").getAttribute("width");

function startGame() {
    myBackground = new component("background", WIDTH,HEIGHT,backgroundColor,0,0);
    clockFace = new component("circle", 20, 0, "white", 50, HEIGHT/2);
    clockHand = new component("hand", 20, 90, "black", 50, HEIGHT/2);
    starTime = new component("text", "20px", "Consolas", "black", WIDTH-70, HEIGHT-20);
    starTimeB = new component("", 50, 25, "white", WIDTH-72, HEIGHT-40);
    sunTime = new component("text", "20px", "Consolas", "black", 28, HEIGHT-20);
    sunTimeB = new component("", 50, 25, "white", 26, HEIGHT-40);
    shipTime = new component("text", "20px", "Consolas", "black", 28, 40);
    shipTimeB = new component("", 50, 25, "white", 26, 20);
    sun = new component("image", 50, 50, "../img/sun.jpg", 25, HEIGHT/2-25);
    star = new component("image", 50, 50, "../img/star.png", WIDTH-75, HEIGHT/2-25);
    myGameArea.start();
    }

function endGame() {
    myGameArea.stop();
    // myGameArea.clear();
    }

// JS object
var myGameArea = {
    canvas: document.getElementById("canvas"),
    start: function(){
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;   
        this.interval = setInterval(updateGameArea, 20);
        },
    drawBoard : function() {
        this.context.beginPath();
        for (var x = 50; x <= WIDTH-30; x += 30) {
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
    this.speedX = 1;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea.context;
        if (this.type == "circle"){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
            ctx.strokeStyle = "black";
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

function updateGameArea() {
    
    if (myGameArea.frameNo >= 72 && myGameArea.frameNo <= 152){
        kaboom.update();
        myGameArea.frameNo += 1;
        return;
        }

    else{
        myGameArea.clear();

        myBackground.update();

        // myGameArea.drawBoard();

        if (myGameArea.frameNo < 71){
            sun.update();
            }
        
        star.update();

        clockFace.newPos();
        clockFace.update();

        clockHand.newPos();
        clockHand.update();

        if (myGameArea.frameNo == 71){
            explosion = new component("light", 4, HEIGHT+10, "yellow", 48, -5);
            explosion.update();
            kaboom = new component("image", 100, 100, "../img/kaboom.png", 0, 60);
            kaboom.update();
            }

        if (myGameArea.frameNo > 72){
            explosion.newPos();
            explosion.update();
            }

        starTimeB.update()
        starTime.text += 0.20833
        starTime.update()

        sunTimeB.update()
        sunTime.text += 0.20833
        sunTime.update()

        shipTime.newPos()
        shipTimeB.newPos()
        shipTimeB.update()
        shipTime.text += 0.125
        shipTime.update()

        myGameArea.frameNo += 1;

        if (clockFace.x >= WIDTH-50){
            endGame()
            }

        // document.getElementById("coords").innerHTML = `Coords are: x = ${clockFace.x}, y = ${clockFace.y} frame = ${myGameArea.frameNo} `;
        }
    }

function startGame2() {
    myBackground2 = new component2("background", WIDTH2,HEIGHT,backgroundColor,0,0);
    clockFace2 = new component2("circle", 20, 0, "white", 266, HEIGHT/2);
    clockHand2 = new component2("hand", 20, 90, "black", 266, HEIGHT/2);
    starTime2 = new component2("text", "20px", "Consolas", "black", 459, HEIGHT-20);
    starTimeB2 = new component2("", 50, 25, "white", 457, HEIGHT-40);
    sunTime2 = new component2("text", "20px", "Consolas", "black", 244, HEIGHT-20);
    sunTimeB2 = new component2("", 50, 25, "white", 242, HEIGHT-40);
    shipTime2 = new component2("text", "20px", "Consolas", "black", 244, 40);
    shipTimeB2 = new component2("", 50, 25, "white", 242, 20);
    sun2 = new component2("image", 50, 50, "../img/sun.jpg", 241, HEIGHT/2-25);
    star2 = new component2("image", 50, 50, "../img/star.png", 457, HEIGHT/2-25);
    myGameArea2.start();
    }

function endGame2() {
    myGameArea2.stop2();
    // myGameArea.clear2();
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
    clear2 : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }, 
    stop2 : function() {
        clearInterval(this.interval);  
    },
    }

function component2(type, width, height, color, x, y) {
    this.text = 0;
    this.type = type;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = -1;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea2.context;
        if (this.type == "circle"){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
            ctx.strokeStyle = "black";
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
            this.x += this.speedX;
            }
        else if (this.type == "hand"){
            this.height -= 1.6667;
            }
        else{
            this.x += this.speedX;
            }
        }
    }

function updateGameArea2() {
    if (myGameArea2.frameNo == 0){
        starTime2.text = 48;
        }
    
    if (myGameArea2.frameNo >= 120 && myGameArea2.frameNo <= 200){
        kaboom2.update();
        myGameArea2.frameNo += 1;
        return;
        }

    else{
        myGameArea2.clear2();

        myBackground2.update();

        // myGameArea2.drawBoard2();

        if (myGameArea2.frameNo < 119){
            sun2.newPos();
            sun2.update();
            }
        
        star2.newPos();
        star2.update();

        clockFace2.update();

        clockHand2.newPos();
        clockHand2.update();

        if (myGameArea2.frameNo == 119){
            explosion2 = new component2("light", 4, HEIGHT+10, "yellow", 144, -5);
            explosion2.update();
            kaboom2 = new component2("image", 100, 100, "../img/kaboom.png", 96, 60);
            kaboom2.update();
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
            endGame2();
            }

        // document.getElementById("coords2").innerHTML = `Coords are: x = ${clockFace2.x}, y = ${clockFace2.y} frame = ${myGameArea2.frameNo} `;
        }
    }