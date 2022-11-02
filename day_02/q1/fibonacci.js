const numsForFib = [33, -30];

function fibonacci(number){
    if(number <= 2){
        return 1;
    }else{
        return fibonacci(number - 1) + fibonacci(number - 2);
    }
}

//preparation function for fibonacci

function initFibo(numsForFib){
    for(let i = 0; i < numsForFib.length; i++){
        let tempNegative = 1;
        let tempFib = 0;
        let arrayElem = numsForFib[i];

        if( arrayElem < 0) {
            tempNegative = -1;
            arrayElem *= tempNegative;
        }
        tempFib = fibonacci(arrayElem);
        console.log("Fibonacci of " + arrayElem + " is " + tempFib * tempNegative);
    }
}

initFibo(numsForFib);