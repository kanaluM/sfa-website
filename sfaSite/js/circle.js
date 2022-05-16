var angle = 180;
document.getElementById("angle").oninput = function() {
    angle = document.getElementById("angle").value;
    document.getElementById("angleText").innerHTML = 
    `Actual Angle (degrees)= ${angle}<br>
    Actual Angle (radians) = ${(angle*Math.PI/180).toFixed(2)} <br> 
    Reduced Angle (degrees)= ${angle % 360}<br>
    Reduced Angle (radians) = ${((angle % 360)*Math.PI/180).toFixed(2)}<br>`;
}

document.getElementById("startWalk").addEventListener("click", function(){
    var path = document.getElementById("circle");
    var pathL = path.getTotalLength();
    var percent = pathL*(360-angle)/360;
    path.style.transition = path.style.WebkitTransition = 'none';
    path.style.strokeDasharray = `${pathL.toFixed(2)} ${pathL.toFixed(2)}`;
    path.style.strokeDashoffset = `${pathL.toFixed(2)}`;
    path.getBoundingClientRect();
    path.style.transition = path.style.WebkitTransition = `stroke-dashoffset 2s linear`;
    path.style.strokeDashoffset = `${percent.toFixed(2)}`;

    var walker = document.getElementById("animateHere");
    // walker.setAttribute("path", `${pointPath}`)
    walker.innerHTML = 
    `<animateMotion id="walkerMove" xlink:href="#walker" dur="${2*360/angle}s" repeatCount="${angle/360}" fill="freeze" path="m 0 0 a 150 150 0 1 0 -300 0 a 150 150 0 1 0 300 0"/>
     <animateMotion id="circleMove" xlink:href="#circle" dur="${2*angle/360}s" repeatCount="1" fill="freeze" d="M 350 200 a 150 150 0 1 0 -300 0 a 150 150 0 1 0 300 0"/>`
    // walker.getBoundingClientRect();

    // document.getElementById("pathLength").innerHTML = `The path is ${count} steps long ... `;
    // if (count == 42){document.getElementById("pathLength").innerHTML += "you feel Prof Dodds's presence somewhere on this page..."}
    document.getElementById("walkerMove").beginElement();
    document.getElementById("circleMove").beginElement();

});