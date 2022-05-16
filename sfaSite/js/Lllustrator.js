document.getElementById("add").addEventListener("click", function(){
    var f = document.getElementById("call").value;
    var dims = parse(f);
    if (typeof(dims) == "string"){
        document.getElementById("error").innerHTML = dims;
        }
    else{
        document.getElementById("error").innerHTML = "Errors?";
        var svg = document.getElementById("svg");
        var newL = document.createElementNS("http://www.w3.org/2000/svg", "path");
        if (dims[0] == "True"){
            newL.setAttribute("d", `M ${200+dims[1]} ${200+dims[2]} h ${dims[3]} v ${dims[4]}`);
            }
        else if (dims[0] == "False"){
            newL.setAttribute("d", `M ${200+dims[1]} ${200+dims[2]} v ${dims[4]} h ${dims[3]}`);
            }

        newL.setAttribute("stroke", dims[5]);
        newL.setAttribute("stroke-width", 3);
        newL.setAttribute("fill", "none");
        svg.appendChild(newL);

        var node = document.createElement("LI");   // Create a <li> node
        var textnode = document.createTextNode(f.replaceAll(" ", "").replaceAll(",", ", "));   // Create a text node
        node.appendChild(textnode);   // Append the text to <li>
        var hist = document.getElementById("history");
        hist.insertBefore(node, hist.children[0]);   // Append to <ul>
        if (hist.children.length >= 10){
            hist.removeChild(hist.children[9]);
            svg.removeChild(svg.children[2]);
            }
        // document.getElementById("text").innerHTML = `There are ${hist.children.length} history nodes and ${svg.children.length} svg nodes`

        }
    document.getElementById("call").value = "";
    });

document.getElementById("undo").addEventListener("click", function(){
        var svg = document.getElementById("svg")
        var his = document.getElementById("history")
        // document.getElementById("text").innerHTML = `There are ${svg.children.length} svg nodes: ${svg.children[0]} ${svg.childNodes[1]}`;
        if (svg.children.length <= 2){
            document.getElementById("error").innerHTML = "nothing to remove";
            }
        else{
            svg.removeChild(svg.children[svg.children.length-1]);
            his.removeChild(his.children[0]);
            document.getElementById("call").value = "";
            }
    });

document.getElementById("clear").addEventListener("click", function(){
    document.getElementById("error").innerHTML = "Errors?";
    document.getElementById("svg").innerHTML = `<path id="vGrid" stroke="black" fill="none" opacity="0.2" d="M 40 -15 V 415 M 80 -15 V 415 M 120 -15 V 415 M 160 -15 V 415 M 200 -15 V 415 M 240 -15 V 415 M 280 -15 V 415 M 320 -15 V 415 M 360 -15 V 415"></path>
    <path id="hGrid" stroke="black" fill="none" opacity="0.2" d="M -15 40 H 415 M -15 80 H 415 M -15 120 H 415 M -15 160 H 415 M -15 200 H 415 M -15 240 H 415 M -15 280 H 415 M -15 320 H 415 M -15 360 H 415 "></path>`;
    document.getElementById("call").value = "";
    document.getElementById("history").innerHTML = "";
    });

function parse(f){
    var L = f.replaceAll(" ", "").split(','); 
    if (f == ""){
        return "Syntax Error: Empty Call"
        }

    else if (f.split(',').length != 6){
        return "Syntax Error: Missing Parameters"
        }

    else if (L[0].slice(2) != "True" && L[0].slice(2) != "False"){
        return `Syntax Error: name '${L[0].slice(2)}' is not defined`
        }
    
    else if (L[5][0] != "\'" && L[5][0] != "\""){
        return `Syntax Error: '${L[5].slice(0, L[5].length-2)}' is not defined`
        }

    else if (L[5][0] != L[5][L[5].length-2]){
        return `Syntax Error: EOL string literal`
        }

    else{    
        var flip = L[0].slice(2);
        var x = L[1];
        var y = L[2];
        var ss = L[3];
        var ls = L[4];
        var color = L[5].slice(1,L[5].length-2);

        return [flip, 40*parseInt(x), -40*parseInt(y), 40*parseInt(ss), 40*parseInt(ls), color]
        }
}