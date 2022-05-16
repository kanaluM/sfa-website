document.getElementById("ballT").oninput = function() {
    var t = document.getElementById("ballT").value*2*Math.PI/100;
    var a = parseInt(document.getElementById("ellipse").getAttribute("rx"));
    var b = parseInt(document.getElementById("ellipse").getAttribute("ry"));
    var c = Math.sqrt(a**2 - b**2);
    var x = a * Math.cos(t) + 200;
    var y = -b * Math.sin(t) + 200;
    var initSlope = (200-y)/(x-(200-c));
    var angle = Math.atan(-(y-200)/(x-200+c))*180/Math.PI;  
        if (angle < 0){angle += 180;}
        if (t >= 3.14){angle += 180;}
    var printX = (x-200).toFixed(2), printY = (-y+200).toFixed(2);
    if (printX == "-0.00"){printX = "0.00";}
    if (printY == "-0.00"){printY = "0.00";}
    document.getElementById("cartCoords").innerHTML = `Rotating by ${(angle).toFixed(2)} degrees<br> t = ${t.toFixed(2)}<br> x = ${printX}<br> y = ${printY}`;
    document.getElementById("flashlight").setAttribute("transform", `rotate(${(-90-angle).toFixed(2)},88.2,200) translate(70, 185) scale(0.6,0.6)`);
    var dx = -a * Math.sin(t);
    var dy = -b * Math.cos(t);
    var perpSlope = (-dx/dy);
    var m = Math.tan(2*Math.atan(perpSlope)+Math.atan(initSlope));
    var yFinal = 200;
    var xFinal = (yFinal - y)/m + x;
    document.getElementById("trajectory").setAttribute("d", `M ${(200-c).toFixed(2)} 200 L ${x.toFixed(2)} ${y.toFixed(2)} L ${xFinal.toFixed(2)} ${yFinal.toFixed(2)}`);
    document.getElementById("trajectory").setAttribute("opacity", 0);
    document.getElementById("ray").value = 0;
    document.getElementById("rayPercent").innerHTML = "0%";
};

document.getElementById("ray").oninput = function() {
    document.getElementById("trajectory").setAttribute("opacity", 1);
    var percent = document.getElementById("ray").value;
    var pathL = document.getElementById("trajectory").getTotalLength();
    document.getElementById("rayPercent").innerHTML = percent;
    document.getElementById("trajectory").setAttribute("stroke-dasharray", `${pathL.toFixed(2)} ${pathL.toFixed(2)}`)
    document.getElementById("trajectory").setAttribute("stroke-dashoffset", pathL*(100-percent)/100);
};