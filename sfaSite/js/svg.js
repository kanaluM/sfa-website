// Hello World
document.getElementById("flip").addEventListener("click", function(){
    var aVal = document.getElementById("aVal").value/10;
    if (document.getElementById("flip").innerHTML == "down"){
        document.getElementById("parabola").setAttribute("d", `M 50 200 Q 200 ${-150*aVal} 350 200`);
        document.getElementById("ball").setAttribute("cy", "350");
        document.getElementById("flip").innerHTML = "up";}
    else if (document.getElementById("flip").innerHTML == "up"){
        document.getElementById("parabola").setAttribute("d", `M 50 200 Q 200 ${550*(0.5*aVal+0.5)} 350 200`);
        document.getElementById("ball").setAttribute("cy", "50");
        document.getElementById("flip").innerHTML = "down";}

    document.getElementById("trajectory").setAttribute("opacity", 0)
    var t = document.getElementById("ballT").value/100;
    var L = document.getElementById("parabola").getAttribute("d").split(" ");
    L = L.slice(1);
    L = L.slice(0,2).concat(L.slice(3));
    var x1=L[0], y1=L[1], x2=L[2], y2=L[3], x3=L[4], y3=L[5];
    var x = ((1-t)**2*x1 + 2*(1-t)*t*x2 + t**2*x3);
    var y = ((1-t)**2*y1 + 2*(1-t)*t*y2 + t**2*y3);
    document.getElementById("ball").setAttribute("cx", x.toFixed(2));
    var dx = (-2*(1-t)*x1 + 2*x2 - 4*t*x2 + 2*t*x3);
    var dy = (-2*(1-t)*y1 + 2*y2 - 4*t*y2 + 2*t*y3);
    var perpSlope = (-dx/dy);
    var m = Math.tan(2*(Math.atan(perpSlope)+Math.PI/2)-Math.PI/2);
    if (x < 200){var xFinal = 420;}
    else if (x > 200){var xFinal = -420;}
    else if (x == 200){var xFinal = 200;}
    var yFinal = (xFinal - x) * m + y;
    document.getElementById("trajectory").setAttribute("d", "M " + x.toFixed(2) + " " + document.getElementById("ball").getAttribute("cy") + " V " + y.toFixed(2) + ` L ${xFinal.toFixed(2)} ${yFinal.toFixed(2)}`);
});

// document.getElementById("control").addEventListener("click", function(){
// var A = parseFloat(document.getElementById("Aval").value);
// var B = parseFloat(document.getElementById("Bval").value);
// var C = parseFloat(document.getElementById("Cval").value);
// controlPoint(A,B,C)
// });

// (-10,100) and (10,100)
// LineOne = -20(x+10)+100
// LineTwo = 20(x-10)+100
// Control point (0,-100)

// Control point
// x1=-B/(2*A)-5, x2=-B/(2*A)+5;
// Cx = (x1+x2)/2, Cy = (x2-x1)*(2*A*x1+B)/2+A*x1**2+B*x1+C;

// var ballTslider = document.getElementById("ballT");
// var outputT = document.getElementById("tValue");
// outputT.innerHTML = ballTslider.value;

// basic frame x1 = (50,200)
// regular frame x1 = (B/(2*A)-5B/(2*A)-5))

document.getElementById("ballT").oninput = function() {
    var t = document.getElementById("ballT").value/100;
    var L = document.getElementById("parabola").getAttribute("d").split(" ");
    L = L.slice(1);
    L = L.slice(0,2).concat(L.slice(3));
    var x1=L[0], y1=L[1], x2=L[2], y2=L[3], x3=L[4], y3=L[5];
    var x = ((1-t)**2*x1 + 2*(1-t)*t*x2 + t**2*x3);
    var y = ((1-t)**2*y1 + 2*(1-t)*t*y2 + t**2*y3);
    document.getElementById("ball").setAttribute("cx", x.toFixed(2));
    document.getElementById("flashlight").setAttribute("transform", `translate(${(175+x-200).toFixed(2)}, 40) scale(0.8,0.8)`);
    var dx = (-2*(1-t)*x1 + 2*x2 - 4*t*x2 + 2*t*x3);
    var dy = (-2*(1-t)*y1 + 2*y2 - 4*t*y2 + 2*t*y3);
    var perpSlope = (-dx/dy);
    var m = Math.tan(2*(Math.atan(perpSlope)+Math.PI/2)-Math.PI/2);
    if (x < 200){var xFinal = 420;}
    else if (x > 200){var xFinal = -420;}
    else if (x == 200){var xFinal = 200;}
    var yFinal = (xFinal - x) * m + y;
    document.getElementById("cartCoords").innerHTML = `t = ${t.toFixed(2)}, x = ${x.toFixed(2)}, y = ${y.toFixed(2)}`;
    document.getElementById("trajectory").setAttribute("d", "M " + x.toFixed(2) + " " + document.getElementById("ball").getAttribute("cy") + " V " + y.toFixed(2) + ` L ${xFinal.toFixed(2)} ${yFinal.toFixed(2)}`);
    document.getElementById("trajectory").setAttribute("opacity", 0);
    document.getElementById("ray").value = 0;
};

document.getElementById("ray").oninput = function() {
    document.getElementById("trajectory").setAttribute("opacity", 1);
    var percent = document.getElementById("ray").value;
    var pathL = document.getElementById("trajectory").getTotalLength();
    document.getElementById("rayPercent").innerHTML = percent;
    document.getElementById("trajectory").setAttribute("stroke-dasharray", `${pathL.toFixed(2)} ${pathL.toFixed(2)}`)
    document.getElementById("trajectory").setAttribute("stroke-dashoffset", pathL*(100-percent)/100);
};

document.getElementById("aVal").oninput = function() {
    document.getElementById("trajectory").setAttribute("opacity", 0);
    var aVal = document.getElementById("aVal").value/10;
    document.getElementById("pAVal").innerHTML = aVal.toFixed(2);

    if (document.getElementById("flip").innerHTML == "down"){
        document.getElementById("parabola").setAttribute("d", `M 50 200 Q 200 ${550*(0.5*aVal+0.5)} 350 200`)
        document.getElementById("trajectory").setAttribute("opacity", 0);
;}
    else if (document.getElementById("flip").innerHTML == "up"){
        document.getElementById("parabola").setAttribute("d", `M 50 200 Q 200 ${-150*aVal} 350 200`);
        document.getElementById("trajectory").setAttribute("opacity", 0);}

        var t = document.getElementById("ballT").value/100;
        var L = document.getElementById("parabola").getAttribute("d").split(" ");
        L = L.slice(1);
        L = L.slice(0,2).concat(L.slice(3));
        var x1=L[0], y1=L[1], x2=L[2], y2=L[3], x3=L[4], y3=L[5];
        var x = ((1-t)**2*x1 + 2*(1-t)*t*x2 + t**2*x3);
        var y = ((1-t)**2*y1 + 2*(1-t)*t*y2 + t**2*y3);
        document.getElementById("ball").setAttribute("cx", x.toFixed(2));
        var dx = (-2*(1-t)*x1 + 2*x2 - 4*t*x2 + 2*t*x3);
        var dy = (-2*(1-t)*y1 + 2*y2 - 4*t*y2 + 2*t*y3);
        var perpSlope = (-dx/dy);
        var m = Math.tan(2*(Math.atan(perpSlope)+Math.PI/2)-Math.PI/2);
        if (x < 200){var xFinal = 420;}
        else if (x > 200){var xFinal = -420;}
        else if (x == 200){var xFinal = 200;}
        var yFinal = (xFinal - x) * m + y;
        document.getElementById("trajectory").setAttribute("d", "M " + x.toFixed(2) + " " + document.getElementById("ball").getAttribute("cy") + " V " + y.toFixed(2) + ` L ${xFinal.toFixed(2)} ${yFinal.toFixed(2)}`);
};

// var yPerp = (xFinal - x) * perpSlope + y;
// document.getElementById("fall").setAttribute("d", "M " + x.toFixed(2) + " 50 V " + y.toFixed(2));
// document.getElementById("perp").setAttribute("d", `M ${x.toFixed(2)} ${y.toFixed(2)} L ${xFinal.toFixed(2)} ${yPerp.toFixed(2)}`);
// document.getElementById("bounce").setAttribute("d", `M ${x.toFixed(2)} ${y.toFixed(2)} L ${xFinal.toFixed(2)} ${yFinal.toFixed(2)}`);

document.getElementById("point").addEventListener("click", function(){
    document.getElementById("focus").setAttribute("fill", "red");
    myGamePiece = new component(200,200);
    setInterval(update, 20);
});

document.getElementById("up").addEventListener("mousedown", function(){myGamePiece.speedY = -1;});
document.getElementById("up").addEventListener("mouseup", function(){myGamePiece.speedY = 0;});

document.getElementById("down").addEventListener("mousedown", function(){myGamePiece.speedY = 1;});
document.getElementById("down").addEventListener("mouseup", function(){myGamePiece.speedY = 0;});

document.getElementById("left").addEventListener("mousedown", function(){myGamePiece.speedX = -1;});
document.getElementById("left").addEventListener("mouseup", function(){myGamePiece.speedX = 0;});

document.getElementById("right").addEventListener("mousedown", function(){myGamePiece.speedX = 1;});
document.getElementById("right").addEventListener("mouseup", function(){myGamePiece.speedX = 0;});

function update(){
    myGamePiece.x += myGamePiece.speedX;
    myGamePiece.y += myGamePiece.speedY;
    
    document.getElementById("focus").setAttribute("cx", `${myGamePiece.x}`);
    document.getElementById("focus").setAttribute("cy", `${myGamePiece.y}`);       
};

function component(x, y) {
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;  
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}

// document.getElementById("point").addEventListener("click", function(){
//     document.getElementById("focus").setAttribute("fill", "red");
//     setInterval(newPos(),10);
// });

// function newPos(){

// document.getElementById("up").addEventListener("mousedown", function(){var Vy = -1;});
// document.getElementById("up").addEventListener("mouseup", function(){var Vy = 0;});

// document.getElementById("down").addEventListener("mousedown", function(){Vy = 1;});
// document.getElementById("down").addEventListener("mouseup", function(){Vy = 0;});

// document.getElementById("left").addEventListener("mousedown", function(){Vx = -1;});
// document.getElementById("left").addEventListener("mouseup", function(){Vx = 0;});

// document.getElementById("right").addEventListener("mousedown", function(){Vx = 1;});
// document.getElementById("right").addEventListener("mouseup", function(){Vx = 0;});

// document.getElementById("test").innerHTML = `Vy is ${Vy}`

// var newX = parseInt(document.getElementById("focus").getAttribute("cx")) + Vx,
// newY = parseInt(document.getElementById("focus").getAttribute("cy")) + Vy;

// document.getElementById("focus").setAttribute("cx", `${newX}`);
// document.getElementById("focus").setAttribute("cy", `${newY}`);
// };

// function start(){
//     myGamePiece = new component(200,200)
// };

// function component(x, y) {
//     this.speedX = 0;
//     this.speedY = 0;
//     this.x = x;
//     this.y = y;    
//     this.newPos = function() {
//         this.x += this.speedX;
//         this.y += this.speedY;        
//     }    
// }

// function update() {
//     myGamePiece.newPos();    
// }

// function moveup() {
//     myGamePiece.speedY = -1; 
// }

// function movedown() {
//     myGamePiece.speedY = 1; 
// }

// function moveleft() {
//     myGamePiece.speedX = -1; 
// }

// function moveright() {
//     myGamePiece.speedX = 1; 
// }

// function clearmove() {
//     myGamePiece.speedX = 0; 
//     myGamePiece.speedY = 0; 
// }