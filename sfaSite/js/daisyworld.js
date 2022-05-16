// Kanalu M Summer '21
document.getElementById("musicButton").addEventListener("click", function() {
    document.getElementById("backgroundMusic").load();
    document.getElementById("backgroundMusic").play();
    });

// var currentTrack = "floroamaDay.mp3";
// document.getElementById("backgroundMusic").addEventListener("ended",function(){
//     if (currentTrack == "floroamaDay.mp3"){currentTrack = "floroamaNight.mp3";}
//     else{currentTrack = "floroamaDay.mp3";}
//     document.getElementById("backgroundMusic").src = currentTrack;
//     document.getElementById("backgroundMusic").load();
//     document.getElementById("backgroundMusic").pause();
//     document.getElementById("backgroundMusic").load();
//     document.getElementById("backgroundMusic").play();
//     });

// Simple model
var areaCoveredInitialS = 0.01,   // initial covered area
deathRateS = 0.2,                 // natural death rate
growthRateS = 0.4;                // natural growth rate

// Regular model
var areaUncoveredInitial = 1.0,  // initial amount of uncovered Earth
areaWhiteInitial = 0,        // initial amount of Earth covered by white daisies
areaBlackInitial = 0,        // initial amount of Earth covered by black daisies
albedoUncovered = 0.5,       // albedo of uncovered Earth
albedoWhite = 0.75,          // albedo of white daisies
albedoBlack = 0.25,          // albedo of black daisies
deathRate = 0.3,             // natural death rate
heatAbsorbFactor = 20,       // controls how local temp differs from planet temp
SBConstant = 0.00000005669,  // Stefan-Boltzmann Constant
solarFluxConstant = 917,     // power from sun
optTemp = 22.5,              // optimal temperature for growth factor
range = 17.5;                // temperature range for survival
plague = false               // plague or no plague
plagueRate = 5;              // length of plague = 2*plague rate

document.getElementById("simpleButton").addEventListener("click", function(){
    document.getElementById("gRText").innerHTML = `Growth Rate is 0.40`;
    document.getElementById("gRS").value = 40;
    growthRateS = 0.4;
    document.getElementById("dRText").innerHTML = `Death Rate is 0.20`;
    document.getElementById("dRS").value = 20;
    deathRateS = 0.2;
    update("daisyS", graphSimpleData("daisyS"));
    update("bareS", graphSimpleData("bareS"));
    })

document.getElementById("gRS").oninput = function() {
    var GRS = document.getElementById("gRS").value/100;
    growthRateS = GRS;
    document.getElementById("gRText").innerHTML = `Growth Rate is ${(GRS).toFixed(2)}`;
    update("daisyS", graphSimpleData("daisyS"));
    update("bareS", graphSimpleData("bareS"));
    }

document.getElementById("dRS").oninput = function() {
    var DRS = document.getElementById("dRS").value/100;
    deathRateS = DRS;
    document.getElementById("dRText").innerHTML = `Death Rate is ${(DRS).toFixed(2)}`;
    update("daisyS", graphSimpleData("daisyS"));
    update("bareS", graphSimpleData("bareS"));
    }

document.getElementById("complexButton").addEventListener("click", function(){
    document.getElementById("albedoUncoveredText").innerHTML = `Uncovered land albedo is 0.50`;
    document.getElementById("albedoUncovered").value = 50;
    albedoUncovered = 0.5;

    document.getElementById("albedoBlackText").innerHTML = `Black daisy albedo is 0.25`;
    document.getElementById("albedoBlack").value = 25;
    albedoBlack = 0.25;

    document.getElementById("albedoWhiteText").innerHTML = `White daisy albedo is 0.75`;
    document.getElementById("albedoWhite").value = 75;
    albedoWhite = 0.75;

    document.getElementById("deathRateText").innerHTML = `Death rate is 0.30`;
    document.getElementById("deathRate").value = 30;
    deathRate = 0.3;

    document.getElementById("optTempText").innerHTML = `Optimal temperature is 22.5 C`;
    document.getElementById("optTemp").value = 225;
    optTemp = 22.5;

    document.getElementById("rangeTempText").innerHTML = `Temperature range is 35 C`;
    document.getElementById("rangeTemp").value = 35;
    range = 17.5;

    document.getElementById("heatFactorText").innerHTML = `Heat Absorb Factor is 20`;
    document.getElementById("heatFactor").value = 20;
    heatAbsorbFactor = 20;

    document.getElementById("plagueRateText").innerHTML = `Plagues last for 10 years`;
    document.getElementById("plagueRate").value = 5;
    document.getElementById("plagueButton").innerHTML = "NORMAL";
    plague = false;
    plagueRate = 5;

    update("black", graphData("black"));
    update("white", graphData("white"));
    update("bare", graphData("bare"));
    update("temp", graphData("temp"));
    update("tempD", graphData("tempD"));
    })

document.getElementById("albedoBlack").oninput = function() {
    var AB = document.getElementById("albedoBlack").value/100;
    albedoBlack = AB;
    document.getElementById("albedoBlackText").innerHTML = `Black daisy albedo is ${(AB).toFixed(2)}`;
    update("black", graphData("black"));
    update("white", graphData("white"));
    update("bare", graphData("bare"));
    update("temp", graphData("temp"));
    update("tempD", graphData("tempD"));
    }

document.getElementById("albedoWhite").oninput = function() {
    var AW = document.getElementById("albedoWhite").value/100;
    albedoWhite = AW;
    document.getElementById("albedoWhiteText").innerHTML = `White daisy albedo is ${(AW).toFixed(2)}`;
    update("black", graphData("black"));
    update("white", graphData("white"));
    update("bare", graphData("bare"));
    update("temp", graphData("temp"));
    update("tempD", graphData("tempD"));
    }

document.getElementById("albedoUncovered").oninput = function() {
    var AU = document.getElementById("albedoUncovered").value/100;
    albedoUncovered = AU;
    document.getElementById("albedoUncoveredText").innerHTML = `Uncovered land albedo is ${AU}`;
    update("black", graphData("black"));
    update("white", graphData("white"));
    update("bare", graphData("bare"));
    update("temp", graphData("temp"));
    update("tempD", graphData("tempD"));
    }

document.getElementById("deathRate").oninput = function() {
    var DR = document.getElementById("deathRate").value/100;
    deathRate = DR;
    document.getElementById("deathRateText").innerHTML = `Death rate is ${(DR).toFixed(2)}`;
    update("black", graphData("black"));
    update("white", graphData("white"));
    update("bare", graphData("bare"));
    update("temp", graphData("temp"));
    update("tempD", graphData("tempD"));
    }

document.getElementById("optTemp").oninput = function() {
    var OT = document.getElementById("optTemp").value/10;
    optTemp = OT;
    document.getElementById("optTempText").innerHTML = `Optimal temperature is ${OT} C`;
    update("black", graphData("black"));
    update("white", graphData("white"));
    update("bare", graphData("bare"));
    update("temp", graphData("temp"));
    update("tempD", graphData("tempD"));
    }

document.getElementById("rangeTemp").oninput = function() {
    var TR = document.getElementById("rangeTemp").value;
    range = TR/2;
    document.getElementById("rangeTempText").innerHTML = `Temperature range is ${TR} C`;
    update("black", graphData("black"));
    update("white", graphData("white"));
    update("bare", graphData("bare"));
    update("temp", graphData("temp"));
    update("tempD", graphData("tempD"));
    }

document.getElementById("heatFactor").oninput = function() {
    var HAF = document.getElementById("heatFactor").value;
    heatAbsorbFactor = HAF;
    document.getElementById("heatFactorText").innerHTML = `Heat Absorb Factor is ${HAF}`;
    update("black", graphData("black"));
    update("white", graphData("white"));
    update("bare", graphData("bare"));
    update("temp", graphData("temp"));
    update("tempD", graphData("tempD"));
    }

document.getElementById("plagueRate").oninput = function() {
    var pr = document.getElementById("plagueRate").value;
    plagueRate = pr;
    document.getElementById("plagueRateText").innerHTML = `Plagues last for ${2*plagueRate} years`;
    if (plague==true){
    update("black", graphData("black"));
    update("white", graphData("white"));
    update("bare", graphData("bare"));
    update("temp", graphData("temp"));
    update("tempD", graphData("tempD"));}
    }

document.getElementById("plagueButton").addEventListener("click", function(){
    pb = document.getElementById("plagueButton");
    if (pb.innerHTML == "NORMAL"){
        plague=true;
        pb.innerHTML = "PLAGUE";}
    else{plague=false;
        pb.innerHTML = "NORMAL";}
    update("black", graphData("black"));
    update("white", graphData("white"));
    update("bare", graphData("bare"));
    update("temp", graphData("temp"));
    update("tempD", graphData("tempD"));
    })

var parameters = 
{"t": 0, "solarLuminosity": 1, "albedoPlanet": 2, "tempPlanet": 3, "tempPlanetD": 4, 
"tempLocalBlack": 5, "tempLocalWhite": 6, "growthFactorBlack": 7, "growthFactorWhite": 8, "growthRateBlack": 9, 
"growthRateWhite": 10, "areaBlack": 11, "areaWhite": 12, "areaUncovered": 13}

function simpleModel(area,deathRateS,growthRateS){
    /* Calculates the new covered area after a time step */
    var returnMe = area;
    var areaUncovered = 1 - area;   // total area sum to 1
    var areaChange = area*(areaUncovered)*(growthRateS-deathRateS);   // change in area
    returnMe += areaChange;   // add change to get new area
    return returnMe;
    }

function graphSimpleData(p){
    /* Creates data for simple model */
    var data = [];
    var area = areaCoveredInitialS;
    if (p == "daisyS"){
        for (let i of Array.from(Array(51).keys())){
            var yVal = simpleModel(area,deathRateS,growthRateS);
            area = yVal;
            data.push({x: (i*8+30).toFixed(2), y: ((1-yVal)*200+10).toFixed(2)});
            }
        }
    if (p == "bareS"){
        for (let i of Array.from(Array(51).keys())){
            var yVal = simpleModel(area,deathRateS,growthRateS);
            area = yVal;
            data.push({x: (i*8+30).toFixed(2), y: (yVal*200+10).toFixed(2)})
            }
        }
    return data
    }

function growthRate(areaCovered,areaUncovered,growthFactor,deathRate){
    /*Returns the growth rate of a daisy population*/
    var areaChange = areaCovered*(areaUncovered*growthFactor-deathRate)+0.001   // formula for change in area
    return areaChange;
    }

function growthFactor(tempLocal){
    /*Returns the growth factor of daisies at a given temperature
       Returns 0 instead of negative numbers...*/

    var GF = 1-0.003265*(optTemp-tempLocal)**2;   // formula for growth factor 
    if (tempLocal <= optTemp - range || tempLocal >= optTemp + range){   // daisies can't grow outside this range
        return 0;}
    else{
        return GF;}   // it's a parabola...
    }

function averageTempPlanet(solarLuminosity,solarFluxConstant,albedoPlanet){
    /*Returns average planet temperature (in Celsius!)*/
    var temp = ((solarLuminosity*solarFluxConstant*(1-albedoPlanet)/SBConstant)**0.25) - 273
    return temp;
    }

function averageTempPlanetD(solarLuminosity,solarFluxConstant){
    /*Returns average planet temperature (in Celsius!) for a static planet with no daisies*/
    var temp = ((solarLuminosity*solarFluxConstant*(1-albedoUncovered)/SBConstant)**0.25) - 273
    return temp;
    }

function planetaryAlbedo(fracUncovered,fracWhite,fracBlack){
    /*Returns the albedo of the planet as a function of
       fracUncovered = fraction of uncovered land
       fracWhite = fraction of land with white daisies
       fracBlack = fraction of land with black daisies*/
        
    var albedoPlanet = (fracUncovered*albedoUncovered)+(fracWhite*albedoWhite)+(fracBlack*albedoBlack)   // total albedo formula
    return albedoPlanet;
    }

function localTemperature(albedoPlanet,tempPlanet,color){
    /*Returns local temperture for a given daisy*/

    if (color == 'black'){
        var albedoDaisy = albedoBlack;}   // Albedo for different color daisies
    else if (color == 'white'){
        var albedoDaisy = albedoWhite;}
        
    var localTemp = heatAbsorbFactor * (albedoPlanet-albedoDaisy) + tempPlanet   // the formula
    return localTemp;
    }

function solarLuminosityConstant(currentTime){
    /*Returns the solar luminosity at time t
    Starts at 0.6 at t=0 and ends at 1.8 at t=200 */
    
    return (1.2/200)*currentTime+0.6;   // I hope you remember how to do algebra...
    }

function createData(){

    var df = [] // data
    var areaBlack = areaBlackInitial;
    var areaWhite = areaWhiteInitial;
    var areaUncovered = 1-areaBlackInitial-areaWhiteInitial;

    for (let i of Array.from(Array(801).keys())){
        var t = i/4;   // time
        if (i==320-4*plagueRate && plague==true){
            deathRate = 0.9;}
        if (i==320+4*plagueRate && plague==true){
            deathRate = document.getElementById("deathRate").value/100;}
        // var solarLuminosity = Math.round(solarLuminosityConstant(t)*100)/100;
        // var albedoPlanet = Math.round(planetaryAlbedo(areaUncovered,areaWhite,areaBlack)*100)/100;
        // var tempPlanet = Math.round(averageTempPlanet(solarLuminosity,solarFluxConstant,albedoPlanet)*100)/100;
        // var tempPlanetD = Math.round(averageTempPlanetD(solarLuminosity,solarFluxConstant)*100)/100;
        // var tempLocalBlack = Math.round(localTemperature(albedoPlanet,tempPlanet,'black')*100)/100;
        // var tempLocalWhite = Math.round(localTemperature(albedoPlanet,tempPlanet,'white')*100)/100;
        // var growthFactorBlack = Math.round(growthFactor(tempLocalBlack)*100)/100;
        // var growthFactorWhite = Math.round(growthFactor(tempLocalWhite)*100)/100;
        // var growthRateBlack = Math.round(growthRate(areaBlack,areaUncovered,growthFactorBlack,deathRate)*100)/100;
        // var growthRateWhite = Math.round(growthRate(areaWhite,areaUncovered,growthFactorWhite,deathRate)*100)/100;
        var solarLuminosity = solarLuminosityConstant(t);
        var albedoPlanet = planetaryAlbedo(areaUncovered,areaWhite,areaBlack);
        var tempPlanet = averageTempPlanet(solarLuminosity,solarFluxConstant,albedoPlanet);
        var tempPlanetD = averageTempPlanetD(solarLuminosity,solarFluxConstant);
        var tempLocalBlack = localTemperature(albedoPlanet,tempPlanet,'black');
        var tempLocalWhite = localTemperature(albedoPlanet,tempPlanet,'white');
        var growthFactorBlack = growthFactor(tempLocalBlack);
        var growthFactorWhite = growthFactor(tempLocalWhite);
        var growthRateBlack = growthRate(areaBlack,areaUncovered,growthFactorBlack,deathRate);
        var growthRateWhite = growthRate(areaWhite,areaUncovered,growthFactorWhite,deathRate);
        areaBlack += growthRateBlack;
        areaWhite += growthRateWhite;
        areaUncovered = 1-areaBlack-areaWhite;
        
        // df.push([t,solarLuminosity,albedoPlanet,tempPlanet,tempPlanetD,tempLocalBlack,tempLocalWhite,
        //         growthFactorBlack,growthFactorWhite,growthRateBlack,growthRateWhite,
        //         areaBlack,areaWhite,areaUncovered]);

        df.push([200-200*areaBlack, 200-200*areaWhite, 200-200*areaUncovered, 180-2*tempPlanet, 180-2*tempPlanetD]);
        }
    return df;
    }

function graphData(p){
    if (p == "black"){var num = 0;}
    if (p == "white"){var num = 1;}
    if (p == "bare"){var num = 2;}
    if (p == "temp"){var num = 3;}
    if (p == "tempD"){var num = 4;}
    var rawData = createData();
    var data = [];
    for (k = 0; k < rawData.length; k += 1) {
        if (isNaN(rawData[k][num])){continue;}
        else{data.push({x: k/2+30, y: (rawData[k][num]+10).toFixed(2)});}
        }
    // document.getElementById("test").innerHTML += ` For ${p}: ymin is ${d3.min(data, function(d) { return d.y })} ymax is ${d3.max(data, function(d) { return d.y  })}`
    return data
    }

// // helper function
// var curveFunc = d3.line()
// .curve(d3.curveBasis) // curveStep makes jags
// .x(function(d) { return d.x })
// .y(function(d) { return d.y })

function grid(){
  var x = 40;
  var vGrid = `M ${x.toFixed(1)} 0`;
  while (x < 400){
      x += 40;
      vGrid += ` V 400 M ${x.toFixed(1)} 0`;
  }
  document.getElementById("testv").setAttribute("d", vGrid);
  var y = 40;
  var hGrid = `M 0 ${y.toFixed(1)}`;
  while (y < 400){
      y += 40;
      hGrid += ` H 400 M 0 ${y.toFixed(1)}`;
  }
  document.getElementById("testh").setAttribute("d", hGrid);
}

var svgB = d3.select("#complexGraph").append("g").attr("id", "black");
var svgW = d3.select("#complexGraph").append("g").attr("id", "white");
var svgR = d3.select("#complexGraph").append("g").attr("id", "bare");
var svgT = d3.select("#tGraph").append("g").attr("id", "temp");
var svgD = d3.select("#tGraph").append("g").attr("id", "tempD");
var svgDS = d3.select("#simpleGraph").append("g").attr("id", "daisyS");
var svgBS = d3.select("#simpleGraph").append("g").attr("id", "bareS");

function update(color, data) {
    if (color=="black"){var svg = svgB; stroke = "black";}
    if (color=="white"){var svg = svgW; stroke = "white";}
    if (color=="bare"){var svg = svgR; stroke = "brown";}
    if (color=="temp"){var svg = svgT; stroke = "purple";}
    if (color=="tempD"){var svg = svgD; stroke = "orange";}
    if (color=="daisyS"){var svg = svgDS; stroke = "pink";}
    if (color=="bareS"){var svg = svgBS; stroke = "blue";}
    var u = svg.selectAll(".lineData")
    .data([data], function(d){ return d.x });
    u.enter()
    .append("path")
    .attr("class","lineData")
    .merge(u)
    .transition()
    .duration(10)
    .attr("d", d3.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; }))
    .attr("fill", "none")
    .attr("stroke", stroke)
    .attr("stroke-width", "3")
    .attr("transform", "translate(30,0)")
    }

update("black", graphData("black"));
update("white", graphData("white"));
update("bare", graphData("bare"));
update("temp", graphData("temp"));
update("tempD", graphData("tempD"));
update("daisyS", graphSimpleData("daisyS"));
update("bareS", graphSimpleData("bareS"));

function visData(){

    var df = [] // data
    var areaBlack = areaBlackInitial;
    var areaWhite = areaWhiteInitial;
    var areaUncovered = 1-areaBlackInitial-areaWhiteInitial;

    for (let i of Array.from(Array(801).keys())){
        var t = i/4;   // time
        if (i==320-4*plagueRate && plague==true){
            deathRate = 0.9;}
        if (i==320+4*plagueRate && plague==true){
            deathRate = document.getElementById("deathRate").value/100;}
        // var solarLuminosity = Math.round(solarLuminosityConstant(t)*100)/100;
        // var albedoPlanet = Math.round(planetaryAlbedo(areaUncovered,areaWhite,areaBlack)*100)/100;
        // var tempPlanet = Math.round(averageTempPlanet(solarLuminosity,solarFluxConstant,albedoPlanet)*100)/100;
        // var tempPlanetD = Math.round(averageTempPlanetD(solarLuminosity,solarFluxConstant)*100)/100;
        // var tempLocalBlack = Math.round(localTemperature(albedoPlanet,tempPlanet,'black')*100)/100;
        // var tempLocalWhite = Math.round(localTemperature(albedoPlanet,tempPlanet,'white')*100)/100;
        // var growthFactorBlack = Math.round(growthFactor(tempLocalBlack)*100)/100;
        // var growthFactorWhite = Math.round(growthFactor(tempLocalWhite)*100)/100;
        // var growthRateBlack = Math.round(growthRate(areaBlack,areaUncovered,growthFactorBlack,deathRate)*100)/100;
        // var growthRateWhite = Math.round(growthRate(areaWhite,areaUncovered,growthFactorWhite,deathRate)*100)/100;
        var solarLuminosity = solarLuminosityConstant(t);
        var albedoPlanet = planetaryAlbedo(areaUncovered,areaWhite,areaBlack);
        var tempPlanet = averageTempPlanet(solarLuminosity,solarFluxConstant,albedoPlanet);
        var tempPlanetD = averageTempPlanetD(solarLuminosity,solarFluxConstant);
        var tempLocalBlack = localTemperature(albedoPlanet,tempPlanet,'black');
        var tempLocalWhite = localTemperature(albedoPlanet,tempPlanet,'white');
        var growthFactorBlack = growthFactor(tempLocalBlack);
        var growthFactorWhite = growthFactor(tempLocalWhite);
        var growthRateBlack = growthRate(areaBlack,areaUncovered,growthFactorBlack,deathRate);
        var growthRateWhite = growthRate(areaWhite,areaUncovered,growthFactorWhite,deathRate);
        areaBlack += growthRateBlack;
        areaWhite += growthRateWhite;
        areaUncovered = 1-areaBlack-areaWhite;
        
        // df.push([t,solarLuminosity,albedoPlanet,tempPlanet,tempPlanetD,tempLocalBlack,tempLocalWhite,
        //         growthFactorBlack,growthFactorWhite,growthRateBlack,growthRateWhite,
        //         areaBlack,areaWhite,areaUncovered]);

        df.push([(100*areaBlack).toFixed(0), (100*areaWhite).toFixed(0)]);
        }
    return df;
    }

var visDATA;
document.getElementById("runSim").addEventListener("click", function(){
    if (buttonPress){
        visDATA = visData();
        dVis();
        startGame();
        document.getElementById("testText").innerHTML = `
        The maximum amount of black daisies is ${bDaisy.length}% <br><br>
        The maximum amount of white daisies is ${wDaisy.length}%`;}
    else{endGame();}
    });

var bDaisy = [];
var wDaisy =[];
var WIDTH = document.getElementById("canvas").getAttribute("width");
var HEIGHT = document.getElementById("canvas").getAttribute("height");
var gen = 0;

function startGame() {
    myGameArea.start();
    buttonPress = false;
}

function endGame() {
    myGameArea.stop();
    myGameArea.clear();
    bDaisy = [];
    wDaisy = [];
    buttonPress = true;
    document.getElementById("testCanvas").innerHTML = `Current Time: 0`;
    document.getElementById("testText").innerHTML = `
    The maximum amount of black daisies is ? <br><br>
    The maximum amount of white daisies is ?`;
    gen = 0;
}

// JS object
var myGameArea = {
    canvas: document.getElementById("canvas"),
    start: function(){
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.context = this.canvas.getContext("2d");
        // document.body.insertBefore(this.canvas, document.getElementById("controls"));  
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }, 
    stop : function() {
        clearInterval(this.interval);  
    },
}

function component(width, height, url, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = url;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width, this.height);}
    }

var buttonPress = true
function updateGameArea() {

    document.getElementById("testCanvas").innerHTML = `Current Time: ${(gen/4).toFixed(2)}`;
    myGameArea.clear();

    numBDaisy = parseInt(visDATA[gen][0]);
    numWDaisy = parseInt(visDATA[gen][1]);

    for (i = 0; i < numBDaisy; i += 1) {
        if (bDaisy[i].t <= gen){
        bDaisy[i].d.update();}
        }
    for (i = 0; i < numWDaisy; i += 1) {
        if (wDaisy[i].t <= gen){
        wDaisy[i].d.update();}
        }
    gen += 1

    if (gen == 801){endGame();}
    }

var s = 25; 
function dVis(){
    var bDaisyCount = 0, bx = 0, by = 0;
    var wDaisyCount = 0, wx = 0, wy = 0;
    var totalCount = 0;
    var b1 = true, w1 = true;
    for (let i of Array.from(Array(800).keys())){
        numBDaisy = parseInt(visDATA[i][0]);
        numWDaisy = parseInt(visDATA[i][1]);
        // document.getElementById("test").innerHTML += `t = ${i/4}: ${numBDaisy} black and ${numWDaisy} white <br>`
        if (numBDaisy == 1 && b1){
            totalCount += 1;
            bDaisyCount += 1;
            var x = 360*Math.random()+20, y = 360*Math.random()+20;
            bDaisy.push({t: i, d: new component(s, s, "../img/bDaisy.png", x, y)});
            bx = x;
            by = y;
            b1 = false;
            }
        if (numWDaisy == 1 && w1){
            totalCount += 1;
            wDaisyCount += 1;
            var x = 360*Math.random()+20, y = 360*Math.random()+20;
            wDaisy.push({t: i, d: new component(s, s, "../img/wDaisy.png", x, y)});
            wx = x;
            wy = y;
            w1 = false;
            }
        if (numBDaisy > bDaisyCount){
            var addB = numBDaisy - bDaisyCount;
            for (let k of Array.from(Array(addB).keys())){
                totalCount += 1;
                bDaisyCount += 1;
                var x = 100*Math.random()-50+bx, y = 100*Math.random()-50+by;
                while (x < 20 || x > 380){var x = Math.random()*100-50+bx;}
                while (y < 20 || y > 380){var y = Math.random()*100-50+by;}
                bDaisy.push({t: i, d: new component(s, s, "../img/bDaisy.png", x, y)});
                }
            bx = x;
            by = y;
            }
        if (numWDaisy > wDaisyCount){
            var addW = numWDaisy - wDaisyCount;
            for (let k of Array.from(Array(addW).keys())){
                totalCount += 1;
                wDaisyCount += 1;
                var x = Math.random()*100-50+wx, y = Math.random()*100-50+wy;
                while (x < 20 || x > 380){var x = Math.random()*100-50+wx;}
                while (y < 20 || y > 380){var y = Math.random()*100-50+wy;}
                wDaisy.push({t: i, d: new component(s, s, "../img/wDaisy.png", x, y)});
                }
            wx = x;
            wy = y;
            }
        }
    }

// Test
// function graphData(p){
//     var rawData = createData();
//     var data = [];
//     if (p == "colors"){
//         for (k = 0; k < rawData.length; k += 1) {
//             if (isNaN(rawData[k][num])){continue;}
//             else{
//                 data.push({x: k/4, y: rawData[k][0]});
//                 data.push({x: k/4, y: rawData[k][1]});
//                 data.push({x: k/4, y: rawData[k][2]});
//                 }
//             }
//         }
//     else if (p == "temp"){
//         for (k = 0; k < rawData.length; k += 1) {
//             if (isNaN(rawData[k][num])){continue;}
//             else{
//                 data.push({x: k/4, y: rawData[k][3]});
//                 data.push({x: k/4, y: rawData[k][4]});
//                 }
//             }
//         }
//     return data
//     }

// var svgB = d3.select("#complexGraph").append("g").attr("id", "black");
// // var svgW = d3.select("#complexGraph").append("g").attr("id", "white");
// // var svgR = d3.select("#complexGraph").append("g").attr("id", "bare");
// var svgT = d3.select("#tGraph").append("g").attr("id", "temp");
// // var svgD = d3.select("#tGraph").append("g").attr("id", "tempD");

// function update(color, data) {

//     if (color=="color"){var svg = svgB; stroke = "red";}
//     if (color=="temp"){var svg = svgT; stroke = "green";}
//     // if (color=="bare"){var svg = svgR; stroke = "blue";}
//     // if (color=="temp"){var svg = svgT; stroke = "purple";}
//     // if (color=="tempD"){var svg = svgD; stroke = "orange";}

//     // Initialise a X axis:
//     var x = d3.scaleLinear().range([0,400]);
//     var xAxis = d3.axisBottom().scale(x);
//     svg.append("g")
//     .attr("transform", "translate(0," + 200 + ")")
//     .attr("class","myXaxis")
    
//     // Initialize an Y axis
//     var y = d3.scaleLinear().range([200, 0]);
//     var yAxis = d3.axisLeft().scale(y);
//     svg.append("g")
//     .attr("class","myYaxis")
 
//    // Create the X axis:
//    x.domain([d3.min(data, function(d) { return d.x }) , d3.max(data, function(d) { return d.x }) ]);
//    svg.selectAll(".myXaxis")
//      .transition()
//      .duration(3000)
//      .call(xAxis);
 
//    // create the Y axis
//    y.domain([d3.min(data, function(d) { return d.y }) , d3.max(data, function(d) { return d.y  }) ]);
//    svg.selectAll(".myYaxis")
//      .transition()
//      .duration(3000)
//      .call(yAxis);

//      document.getElementById("testText").innerHTML = `xmin is ${d3.min(data, function(d) { return d.x })} xmax is ${d3.max(data, function(d) { return d.x })} ymin is ${d3.min(data, function(d) { return d.y })} ymax is ${d3.max(data, function(d) { return d.y  })}`
//  }

// update("black", graphData("black"));
// update("white", graphData("white"));
// update("bare", graphData("bare"));
// update("temp", graphData("temp"));
// update("tempD", graphData("tempD"));