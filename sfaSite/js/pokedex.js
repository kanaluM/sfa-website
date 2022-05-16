document.getElementById("langButton").addEventListener("click", function(){
    if (document.getElementById("langButton").innerHTML == "English"){
        document.getElementById("langButton").innerHTML = "Japanese";}
    else if (document.getElementById("langButton").innerHTML == "Japanese"){
        document.getElementById("langButton").innerHTML = "English";}
    });

document.getElementById("buttonMain").addEventListener("click", function(){
    var name = document.getElementById("name").value;
    if (document.getElementById("langButton").innerHTML == "English"){
        PokedexEN(name);}
    else if (document.getElementById("langButton").innerHTML == "Japanese"){ 
        PokedexJP(name)};
});

function PokedexEN(name){
    var nameL = name.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameL}/`)
    // Handle success
    .then(response => response.json())
    .then(function(json){  // convert to json    
    var printMe = "";
    for (let x of json.flavor_text_entries){
        if (x.language.name == 'en'){
            var text = x.flavor_text;
            text = text.replace("\n",' ');
            text = text.replace("\x0c",' ');
            text += "<br>";
            var gameName = x.version.name.slice(0,1).toUpperCase() + x.version.name.slice(1), 
            index = gameName.indexOf('-');
            gameName = gameName.slice(0,index+1) + gameName.slice(index+1,index+2).toUpperCase() + gameName.slice(index+2);
            if (gameName.slice(0,8) == "Lets-Go-"){
                gameName = gameName.slice(0,8) + gameName.slice(8,9).toUpperCase() + gameName.slice(9);
            }
            text = `Pokemon ${gameName}: ` + text;
            printMe += text;}}
    nameL = nameL.slice(0,1).toUpperCase() + nameL.slice(1); 
    var genus = json.genera[7].genus;
    document.getElementById("pokedex").innerHTML = `${nameL}, the ${genus}:<br>` + printMe;
        })
    .catch(err => console.error(err))
};

function PokedexJP(name){
    var nameL = name.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameL}/`)
    // Handle success
    .then(response => response.json())
    .then(function(json){  // convert to json    
    var printMe = "";
    for (let x of json.flavor_text_entries){
        if (x.language.name == 'ja-Hrkt'){
            var text = x.flavor_text;
            text = text.replace("\n",' ');
            text = text.replace("\x0c",' ');
            text += "<br>";
            var gameName = x.version.name.slice(0,1).toUpperCase() + x.version.name.slice(1), index = gameName.indexOf('-');
            gameName = gameName.slice(0,index+1) + gameName.slice(index+1,index+2).toUpperCase() + gameName.slice(index+2);
            text = `Pokemon ${gameName}: ` + text;
            printMe += text;}
        // else if (x.language.name == 'ja'){
        //     var text = x.flavor_text;
        //     text = text.replace("\n",' ');
        //     text = text.replace("\x0c",' ');
        //     text += "<br><br>";
        //     text = `Pokemon ${x.version.name}: ` + text;
        //     printMe += text;}
    };
    for (let y of json.names){
        if (y.language.name == "ja-Hrkt"){
            var nameJP = y.name;};
    };
    var genus = json.genera[0].genus;
    document.getElementById("pokedex").innerHTML = `${genus}, ${nameJP}:<br>` + printMe;
        })
    .catch(err => console.error(err))
};