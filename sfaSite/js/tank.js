// Hello World
var tankImg = "M 43.748,31.447 C 43.748,31.447 39.577,31.447 39.676,35.519 39.775,39.591 43.648,39.292 43.648,39.292 43.648,39.292 47.82,39.292 47.72,35.617 47.621,31.942 44.443,31.248 43.748,31.447 Z M 57.055,31.249 C 57.055,31.249 52.884,31.249 52.983,35.321 53.082,39.393 56.955,39.094 56.955,39.094 56.955,39.094 61.127,39.094 61.027,35.419 60.928,31.744 57.75,31.05 57.055,31.249 Z M 30.439,31.744 C 30.439,31.744 26.268,31.744 26.367,35.816 26.466,39.888 30.339,39.589 30.339,39.589 30.339,39.589 34.511,39.589 34.411,35.914 34.312,32.239 31.134,31.545 30.439,31.744 Z M 16.784,31.681 C 16.784,31.681 12.613,31.681 12.712,35.753 12.811,39.825 16.684,39.526 16.684,39.526 16.684,39.526 20.856,39.526 20.756,35.851 20.657,32.176 17.479,31.482 16.784,31.681 Z M 4.6677,28.601 69.219,28.503 M 43.796,18.273 V 21.848 L 23.14,22.047 10.626,22.246 4.8662,26.417 5.0649,31.482 10.13,39.526 C 10.13,39.526 12.215,42.01 15.691,42.108 19.167,42.208 57.8,42.306 57.8,42.306 57.8,42.306 62.565,41.513 64.653,38.433 66.738,35.356 69.219,30.686 69.219,30.686 L 69.418,26.318 65.05,22.842 C 65.05,22.842 62.864,22.047 60.679,22.047 58.493,22.047 43.796,21.848 43.796,21.848 M 23.14,18.273 V 22.047 M 46.18,8.9378 C 46.18,8.9378 44.492,4.0719 38.433,4.7669 L 24.828,4.8663 C 24.828,4.8663 19.664,5.1643 19.465,10.329 19.267,15.493 18.969,18.075 22.643,18.274 26.318,18.472 46.28,18.075 46.28,18.075 46.28,18.075 49.158,16.684 47.669,12.811 M 46.18,8.938 69.219,9.0373 69.122,12.613 47.669,12.811 Z"
// Copy Paste
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 50},
    width = 440 - margin.left - margin.right,
    height = 440 - margin.top - margin.bottom;

const arrAvg = arr => (arr.reduce((a,b) => a + b, 0) / arr.length);
const arrMin = arr => Math.min(...arr);
const arrMax = arr => Math.max(...arr);
function arrMed(arr){
    var mid = Math.floor(arr.length/2)
    if (arr.length % 2 == 1){return (arr[mid]+arr[mid-1])/2;}
    else{return arr[mid-1]};}
//////////

var userInputN = document.getElementById("userInputN").value;
var userInputK = document.getElementById("userInputK").value;
var showAvg = false;

document.getElementById("UIbutton2").addEventListener("click", function(){
    if (document.getElementById("UIbutton2").innerHTML == "SHOW AVG"){
        document.getElementById("UIbutton2").innerHTML = "HIDE AVG"
        showAvg = true;}
    else {
        document.getElementById("UIbutton2").innerHTML = "SHOW AVG"
        showAvg = false;}
    });

document.getElementById("UIbutton").addEventListener("click", function(){
    UISvg.selectAll("*").remove();
    userInputN = document.getElementById("userInputN").value;
    userInputK = document.getElementById("userInputK").value;
    var data = UIOneSample();
    graphUIDist(data);
    });

function UIOneSample(){
    var sample = [];
    var printSample = "[";
    for (var i = 0; i < userInputK; i++){
        var addMe = Math.floor(userInputN*Math.random());
        while (addMe > userInputN){
            addMe = Math.floor(userInputN*Math.random());
            }
        sample.push(addMe);
        printSample += `${addMe}, `;
        }
    printSample = printSample.slice(0,printSample.length-2) + "]";
    
    return {"sample": sample, "printSample": printSample}
    };

// append the svg object to the body of the page
var UISvg = d3.select("#UIdistributions")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",`translate(${margin.left}, ${margin.top})`);

// get the data
function graphUIDist(data){
    var avg = Math.round(arrAvg(data["sample"]))
    document.getElementById("UIresultsText").innerHTML = 
    `Setting total number of tanks to ${userInputN}...<br>
    Setting sample size to ${userInputK}...<br><br>
    Captured Tanks: ${data["printSample"]}<br>
    Minimum: ${arrMin(data["sample"])}<br>
    Maximum: ${arrMax(data["sample"])}<br>
    Average: ${avg}<br>
    Median: ${Math.round(arrMed(data["sample"]))}<br>`
  
    // add the x Axis
    var x = d3.scaleLinear()
        .domain([0, 1.1*arrMax([userInputN, 2*avg])])
        .range([0, width]);
    UISvg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // // add the y Axis
    // var y = d3.scaleLinear()
    //     .range([height, 0])
    //     .domain([0, 1]);
    // UISvg.append("g")
    //     .call(d3.axisLeft(y));

    // Plot the area
    UISvg.append("path") // N
        .attr("class", "mypath")
        .attr("fill", "none")
        .attr("opacity", "1")
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("d", `M ${x(userInputN)} 0 V 380`);

    if (showAvg == true){
    UISvg.append("path") // avg
        .attr("class", "mypath")
        .attr("fill", "none")
        .attr("opacity", "1")
        .attr("stroke", "red")
        .attr("stroke-width", 2)
        .attr("d", `M ${x(avg)} 0 V 380`);

    UISvg.append("path") // 2*avg
        .attr("class", "mypath")
        .attr("fill", "none")
        .attr("opacity", "1")
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("d", `M ${x(2*avg)} 0 V 380`);}

    var tankHeight = 25
    for (let val in data["sample"]){
        var xCoord = x(data["sample"][val]);
        UISvg.append("path")
        .attr("class", "mypath")
        .attr("fill", "none")
        .attr("opacity", "1")
        .attr("stroke", "purple")
        .attr("stroke-width", 1)
        .attr("d", `M ${x(data["sample"][val])} 380 V 200`);
        UISvg.append("path")
        .attr("class", "mypath")
        .attr("fill", "black")
        .attr("transform", `translate(${xCoord-15}, ${tankHeight}) scale(0.4,0.4)`)
        .attr("opacity", "1")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("d", tankImg);
        tankHeight += 25;
    }
        }

//////////

var SAMPLE_SIZE = 7,
SAMPLES = 2000;

// document.getElementById("exampleButton").addEventListener("click", function(){
//     var sample = [];
//     var tanks = Math.floor(4900*Math.random())+100;
//     var printSample = "[";
//     for (let i of Array.from(Array(SAMPLE_SIZE).keys())){
//         var addMe = Math.floor(5000*Math.random());
//         while (addMe > tanks){
//             addMe = Math.floor(5000*Math.random());
//             }
//         sample.push(addMe)
//         printSample += `${addMe}, `;
//         }
//     printSample = printSample.slice(0,printSample.length-2) + "]"
//     var Nf = Math.max(...sample) + Math.max(...sample)/sample.length - 1;
//     var Nd = Math.max(...sample) + Math.max(...sample)*Math.log(2)/(sample.length - 1);
//     var Nm = (Math.max(...sample)-1) * (sample.length-1)/(sample.length-2);
//     document.getElementById("example").innerHTML = 
//     `There are ${tanks} tanks... but we don't know this!<br>
//     Our captured tanks have numbers ${printSample}<br>
//     Using the frequentist prediction, our estimate is ${Nf.toFixed(2)}<br>
//     Using the Bayesian median, our estimate is ${Nd.toFixed(2)}<br>
//     Using the Bayesian mean, our estimate is ${Nm.toFixed(2)}`
//     })

function oneTrial(max){
    var sample = [];
    for (let i of Array.from(Array(7).keys())){
        var addMe = Math.floor(5000*Math.random());
        while (addMe > max){
            addMe = Math.floor(5000*Math.random());
            }
        sample.push(addMe)
        }
    var Nf = Math.max(...sample) + Math.max(...sample)/sample.length - 1;
    var Nd = Math.max(...sample) + Math.max(...sample)*Math.log(2)/(sample.length - 1);
    var Nm = (Math.max(...sample)-1) * (sample.length-1)/(sample.length-2);
    return [Math.ceil(Nf), Math.ceil(Nd), Math.ceil(Nm)]
    }

var MAX = 0;
function createEstimates(n){
    /* Generates a random number of tanks and generates max
    estimates using different methods. Returns object */
    var returnMe = {Nf: [], Nd: [], Nm: []};
    MAX = Math.floor(4900*Math.random())+100;
    var sample = [];
    var printSample = "[";
    for (let k of Array.from(Array(7).keys())){
        var addMe = Math.floor(5000*Math.random());
        while (addMe > MAX){
            addMe = Math.floor(5000*Math.random());
            }
        sample.push(addMe);
        printSample += `${addMe}, `;
        }
    printSample = printSample.slice(0,printSample.length-2) + "]";
    returnMe["sample"] = sample;
    returnMe["printSample"] = printSample;
    for (let i of Array.from(Array(1500).keys())){
        var trial = oneTrial(MAX);
        returnMe["Nf"].push(trial[0]);
        returnMe["Nd"].push(trial[1]);
        returnMe["Nm"].push(trial[2]);
        }
    // document.getElementById("real").innerHTML = 
    // `Lists are: <br> 
    // ${returnMe["Nf"]}<br>
    // ${returnMe["Nd"]}<br>
    // ${returnMe["Nm"]}<br>`

    return returnMe;
    }

// var svgf = d3.select("#distributions").append("g").attr("id", "Nf");
// var svgd = d3.select("#distributions").append("g").attr("id", "Nd");
// var svgm = d3.select("#distributions").append("g").attr("id", "Nm");

// function update(color, data) {
//     if (color=="red"){var svg = svgf; stroke = "red"; data}
//     if (color=="green"){var svg = svgd; stroke = "green";}
//     if (color=="blue"){var svg = svgm; stroke = "blue";}
//     var u = svg.selectAll(".lineData")
//     .data([data], function(d){ return d.x });
//     u.enter()
//     .append("path")
//     .attr("class","lineData")
//     // .merge(u)
//     // .transition()
//     // .duration(10)
//     .attr("d", d3.line()
//     .x(function(d) { return d.x; })
//     .y(function(d) { return d.y; }))
//     .attr("fill", "none")
//     .attr("stroke", stroke)
//     .attr("stroke-width", "3")
//     }

document.getElementById("testB").addEventListener("click", function(){
    svg.selectAll("*").remove();
    var data = createEstimates(7);
    graphDist(data);
    });

// append the svg object to the body of the page
var svg = d3.select("#distributions")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",`translate(${margin.left}, ${margin.top})`);

// get the data
function graphDist(data){
    var maX = Math.max(...[arrMax(data["Nf"]), arrMax(data["Nd"]), arrMax(data["Nm"])])

    document.getElementById("disText").innerHTML = 
    `The maximum value is actually ${MAX}<br>
    Our captured tanks have numbers ${data["printSample"]}<br>
    The maximum of our sample is ${arrMax(data["sample"])}<br>
    Nf:{avg: ${arrAvg(data["Nf"]).toFixed(0)}, min: ${arrMin(data["Nf"]).toFixed(0)}, max: ${arrMax(data["Nf"]).toFixed(0)}} (red)<br>
    Nd:{avg: ${arrAvg(data["Nd"]).toFixed(0)}, min: ${arrMin(data["Nd"]).toFixed(0)}, max: ${arrMax(data["Nd"]).toFixed(0)}} (green)<br>
    Nm:{avg: ${arrAvg(data["Nm"]).toFixed(0)}, min: ${arrMin(data["Nm"]).toFixed(0)}, max: ${arrMax(data["Nm"]).toFixed(0)}} (blue)<br>`

    // add the x Axis
    var x = d3.scaleLinear()
        .domain([0, maX+500])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 0.005]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Compute kernel density estimation
    var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(15))
    var density1 =  kde(data["Nf"]);
    var density2 =  kde(data["Nd"]);
    var density3 =  kde(data["Nm"]);

    // Plot the area
    curve1 = svg.append("path")
        .attr("class", "mypath")
        .datum(density1)
        .attr("fill", "none")
        .attr("opacity", "1")
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d", d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); })
        // .y0(y(0))
        );

    // Plot the area
    curve2 = svg.append("path")
        .attr("class", "mypath")
        .datum(density2)
        .attr("fill", "none")
        .attr("opacity", "1")
        .attr("stroke", "green")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d",  d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); })
        // .y0(y(0))
        ); 

    // Plot the area
    curve3 = svg.append("path")
        .attr("class", "mypath")
        .datum(density3)
        .attr("fill", "none")
        .attr("opacity", "1")
        .attr("stroke", "blue")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d",  d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); })
        // .y0(y(0))
        ); 

    curve4 = svg.append("path")
        .attr("class", "mypath")
        .attr("fill", "none")
        .attr("opacity", "1")
        .attr("stroke", "purple")
        .attr("stroke-width", 1)
        .attr("d", `M ${x(MAX)} 0 V 380`); 
      
    // A function that update the chart when slider is moved?
    function updateChart(binNumber) {
        // recompute density estimation
        kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(binNumber))
        var density1 =  kde(data["Nf"]);
        var density2 =  kde(data["Nd"]);
        var density3 =  kde(data["Nm"]);

        // update the chart
        curve1
        .datum(density1)
        .transition()
        .duration(10)
        .attr("d",  d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); })); 

        // update the chart
        curve2
        .datum(density2)
        .transition()
        .duration(10)
        .attr("d",  d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); })); 

        // update the chart
        curve3
        .datum(density3)
        .transition()
        .duration(10)
        .attr("d",  d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); })
        );} 

    };

// Function to compute density
function kernelDensityEstimator(kernel, X) {
    return function(V) {
        return X.map(function(x) {
            return [x, d3.mean(V, function(v) { return kernel(x - v); })];
            });
        };
    }

function kernelEpanechnikov(k) {
    return function(v) {
        return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
        };
    }

var userFunc = "";
var F
document.getElementById("inputFB").addEventListener("click", function(){
    userFunc = document.getElementById("newFunc").value;
    userFunc = parseFunction(userFunc);
    F = new Function("sample", userFunc);
    // myOneTrial();
    mySvg.selectAll("*").remove();
    var data = createMyEstimates(7);
    graphMyDist(data);
    });

var MYMAX = 0
function myOneTrial(){
    var sample = [];
    var printSample = "[";
    for (let k of Array.from(Array(SAMPLE_SIZE).keys())){
        var addMe = Math.floor(5000*Math.random());
        while (addMe > MYMAX){
            addMe = Math.floor(5000*Math.random());
            }
        sample.push(addMe);
        printSample += `${addMe}, `;
        }
    printSample = printSample.slice(0,printSample.length-2) + "]";

    // document.getElementById("myFunc").innerHTML = 
    // `There are ${MYMAX} tanks... but we don't know this!<br>
    // Our captured tanks have numbers ${printSample}<br>
    // The maximum of our sample is ${Math.max(...sample)}<br>
    // Using my custom function, our estimate is ${F(sample).toFixed(0)}<br>`

    return F(sample)
    }

function createMyEstimates(n){
    /* Generates a random number of tanks and generates max
    estimates using different methods. Returns object */
    var returnMe = [];
    MYMAX = Math.floor(4900*Math.random())+100;
    var sample = [];
    var printSample = "[";
    for (let k of Array.from(Array(SAMPLE_SIZE).keys())){
        var addMe = Math.floor(5000*Math.random());
        while (addMe > MYMAX){
            addMe = Math.floor(5000*Math.random());
            }
        sample.push(addMe);
        printSample += `${addMe}, `;
        }
    printSample = printSample.slice(0,printSample.length-2) + "]";
    returnMe["sample"] = sample;
    returnMe["printSample"] = printSample;
    for (let i of Array.from(Array(SAMPLES).keys())){
        var trial = myOneTrial();
        returnMe.push(trial);
        }
    
    return returnMe;
    }

// append the svg object to the body of the page
var mySvg = d3.select("#myDist")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",`translate(${margin.left}, ${margin.top})`);

// get the data
function graphMyDist(data){

    document.getElementById("myFunc").innerHTML = 
    `There are ${MYMAX} tanks... but we don't know this!<br>
    Captured Tanks: ${data["printSample"]}<br>
    The maximum of our sample is ${arrMax(data["sample"])}<br>
    Using my custom function, our point estimate is ${F(data["sample"]).toFixed(0)}<br>
    Aggregated Data:
    N:{avg: ${arrAvg(data).toFixed(0)}, min: ${arrMin(data).toFixed(0)}, max: ${arrMax(data).toFixed(0)}}<br>`

    // add the x Axis
    var x = d3.scaleLinear()
        .domain([0, parseInt(arrMax(data))+500])
        .range([0, width]);
    mySvg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 0.005]);
    mySvg.append("g")
        .call(d3.axisLeft(y));

    // Compute kernel density estimation
    var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(15))
    var density =  kde(data);

    // Plot the area
    curve1 = mySvg.append("path")
        .attr("class", "mypath")
        .datum(density)
        .attr("fill", "none")
        .attr("opacity", "1")
        .attr("stroke", "blue")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d", d3.line()
        .curve(d3.curveBasis)
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); })
        // .y0(y(0))
        );

    curve2 = mySvg.append("path")
        .attr("class", "mypath")
        .attr("fill", "none")
        .attr("opacity", "1")
        .attr("stroke", "purple")
        .attr("stroke-width", 1)
        .attr("d", `M ${x(MYMAX)} 0 V 380`); 
    }

function parseFunction(string){
    /* Parses user input to create function string */

    var newS = string.replace(/max/g, "arrMax(sample)");
    newS = newS.replace(/k/g, "sample.length");
    newS = newS.replace(/min/g, "arrMin(sample)");
    newS = newS.replace(/avg/g, "arrAvg(sample)");

    return "return " + newS;}