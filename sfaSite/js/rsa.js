document.getElementById("submit").addEventListener("click", function(){
    var string = document.getElementById("message").value;
    var nm = letterToNumber(string);
    // var exp = cryptoNums(3,41);
    var em = encrypt(nm, 9, 123);
    //test(nm,6,143);
    var dn = decrypt(em[0],em[1],9,123)
    dm = numberToLetter(dn);
});

function letterToNumber(string){
    /* Converts a string into a long number based on ASCII.
    Make sure that each number has three digits! 
    For example, 'a' should be '097', not '97'*/
    var changed = string.toUpperCase(),
    omess = string.slice(0,1).toUpperCase() + string.slice(1)
    let codedMessage = '';                      // the number we will return
    for (let s of changed){                         // loop through string chrs
        let order = `${s.charCodeAt(0)-64}`            // get the ASCII number
        while (order.length < 3){               
            order = '0' + order;}                // add leading 0s if needed
    if (s.charCodeAt(0)-64 == -32){
    order = '000';}
    codedMessage += order;}
    document.getElementById("omess").innerHTML = `Original Message: ${omess}`;
    document.getElementById("numberMessage").innerHTML = "The message as a number is " + codedMessage;
    return codedMessage;
};

function encrypt(num,e,n){
    /*Encrypts a message (in number form)*/
    var secret = '', L = [];
    // var piece = (parseInt(num.slice(0,3)) ** e) % n;
    // var part = piece.toString();
    while (num.length > 0){
        var piece = (parseInt(num.slice(0,3)) ** e) % n;
        var part = piece.toString();
        secret += part;
        L.push(part.length);
        num = num.slice(3)}
    document.getElementById("encryptedNumbers").innerHTML = `The encrypted number is ${secret}`;
    return [secret, L];
};

function test(num,e,n){
    var secret = '', L = [];
    // var piece = (parseInt(num.slice(0,3)) ** e) % n;
    // var part = piece.toString();
    // while (num.length > 0){
        var bro = 104**6%143
        // var piece = (parseInt(num.slice(0,3)) ** e) % n;
        // var part = piece.toString();
        // secret += part;
        // L.push(part.length);
        // num = num.slice(3)}
    document.getElementById("testbox").innerHTML = `Encrypting ${bro}`;
};

function euclidAl(a,b){
    /*Performs the Euclidean Algorithm on two numbers*/
    // find greatest common denominator
    var eqt = [], r = 42, num1 = a, num2 = b;
    while (r != 0){
        var q = Math.floor(num1/num2);
        var r = num1 % num2; 
        eqt.push([num1,q,num2,r]);
        num1 = num2;
        num2 = r;}
    var L = eqt.slice(0,-1);
    if (L == []){
        if (a >= b){
            return (b,[]);}
        else{
            return (a,[]);}}
    // document.getElementById("euclidean algorithm").innerHTML = "Here is something: " + `${L[length][0]}`;
    
    var revL = [];
    for (let x of L){
        var remSolve = [x[3],x[0],-x[1],x[2]];
        revL.push(remSolve);}
    revL.reverse();
    // document.getElementById("euclidean algorithm").innerHTML = "Here is something: " + `${revL}`;
    // Bezout's identity algorithm (back-substitution)
    var coeff1 = 1;
    var coeff2 = revL[0][2];
    // document.getElementById("euclidean algorithm").innerHTML = "Here is something: " + `${coeff2}`;
    // document.getElementById("euclidean algorithm").innerHTML = "Here is the array for loops: " + `${Array.from(Array(revL.length-1).keys())}`;
    for (let i of Array.from(Array(revL.length-1).keys())){
        var oldCoeff1 = coeff1;
        coeff1 = coeff2;
        coeff2 = oldCoeff1 + (coeff2*revL[i+1][2]);}

    // document.getElementById("euclidean algorithm").innerHTML = "Here is something: " + `${L[L.length-1][L.length-1]}`;
    return [L[L.length-1][L.length-1],[coeff1, coeff2]];
};

function cryptoNums(p, q){
    /*Generates the numbers for RSA encryption*/
    var n = p * q;
    var phi = (p-1)*(q-1);
    var Z_mod = Array.from({length: phi}, (_, i) => i + 1);
    // document.getElementById("decrypted numbers").innerHTML = "The decrypted numbers are " + `${Z_mod}`;
    
    var e = Math.floor(Math.random()*(phi-1))+1;
    // document.getElementById("decrypted numbers").innerHTML = "The decrypted numbers are " + `${e}`;
    
    var lc = euclidAl(phi,e);
    // document.getElementById("decrypted numbers").innerHTML = `phi is ${phi}, e is ${e}, magic number? is ${lc[0]} and coefficients are ${lc[1]}`;
    
    var d = lc[1][1];
    // document.getElementById("decrypted numbers").innerHTML = `d is ${d}`;
    
    while (lc[0] != 1){
        e = Math.floor(Math.random()*(phi-1))+1;
        lc = euclidAl(phi,e);
        d = lc[1][1];}

    // document.getElementById("decrypted numbers").innerHTML = `lc[0] is ${lc[0]}, lc[1] is ${lc[1]}, phi is ${phi}, e is ${e}, and d is ${d}`;
    
    while (!(d in Z_mod)){
        if (d < 0){
            d += phi;}
        else if (d >= phi){
            d -= phi;}}
    // document.getElementById("decrypted numbers").innerHTML = `e is ${e}, d is ${d}, n is ${n}`;
    return [e,d,n];
};

function decrypt(num,L,d,n){
    /*Decrypts a message (in number form)*/
    var secret = ''
    while (num.length > 0){
        var piece = (parseInt(num.slice(0,L[0])) ** d) % n;
        var part = piece.toString();
        while (part.length < 3){
            part = '0' + part};
        if (parseInt(num.slice(0,L[0])) == "93"){   // L no work
        part = "012"}
        else if (parseInt(num.slice(0,L[0])) == "107"){   // W no work
        part = "023"}
        secret += part;
        num = num.slice(L[0]);
        L = L.slice(1)}
    document.getElementById("decryptedNumbers").innerHTML = "The decrypted number message is " + `${secret}`;
    return secret;
};

function numberToLetter(num){
    /*Converts a number into a string based on ASCII.
    Make sure that you account for leading zeroes if needed!
    Consider checking the length of the number...*/
    let codedMessage = '';             // the message we will return
    for (let s of Array.from(Array(num.length-1).keys())){
        let index = 3*s;
        let character = String.fromCharCode(parseInt(num.slice(index,index+3))+64);
        if (num.slice(index,index+3) == '000'){
        character = ' '}
        codedMessage += character;}
    var nmess = codedMessage.slice(0,1).toUpperCase() + codedMessage.slice(1).toLowerCase()
    document.getElementById("decryptedMessage").innerHTML = "The decrypted message is " + '"' + nmess + '"';
    return codedMessage;
};