console.log("BEGIN")

// (Number) -> String
function longOperation(a) {
    // Assume that the following instructions execution time, was spent in I/O
    for(i = 0; i < a; ++i);
    return a.toString()
}


// (Number, (String) -> undefined) -> undefined

function longOperationAsyncWithCallback(a, cb) {
    // Asynchronous function with synchronous implementation
    // let res = longOperation(a)
    // cb(res)

    // Asynchronous function with asynchronous implementation
    setTimeout(() => cb(a.toString()), 3000)
}


// (Number) -> Promise<String>
function longOperationAsyncWithPromise(a) {
    return new Promise(function(resolve, reject) {
        if(!Number(a)) {
            reject("A must be a number")
        }
        setTimeout(() => resolve(a.toString()), 3000)    
    })
}

function processResult0(result) {
    console.log("processResult0")
    return result*result
}

function processResult1(result) {
    console.log("processResult1")
    console.log(result)
    //return result
}

function processResult2(result) {
    console.log("processResult2")
    console.log(result)
    longOperationAsyncWithPromise(Number(result)+20)
}

// Main code
const VAL = 200000000
// Sync model

console.log("Synchronous function")
let res = longOperation(VAL)
processResult1(res)
console.log("Synchronous function END")

console.log("Asynchronous function with callback")
// // // Async model with callback
// // //longOperationA(10, res => processResult(res))
//longOperationAsyncWithCallback(VAL, processResult1)
console.log("Asynchronous function with callback END")

console.log("Asynchronous function with promise")

// // // Async model with Promise
var pres = longOperationAsyncWithPromise(VAL+10)

pres
    .then(processResult2)
    .then(processResult1)

// // longOperationAsyncWithPromise("abc")
// //     .then(processResult1)
// //     .catch(processResult0)


// // // let p = longOperationAsyncWithPromise("abc")
// // // p.then(processResult1)
// // // p.catch(processResult0)


// //    // Promise<Number>
// // //p.then(function (res) { processResult(res) })
// // //p.then(processResult)
// //  //.catch(err => console.log(err))
// // // longOperationAsyncWithPromise(10)
// // //     .then(processResult0)                             // Promise<Number>
// // //     .then(res => longOperationAsyncWithPromise(res))  // Promise<Promise<Number>>  => Promise<Number>
// // //     .then(processResult1)                             // Promise<undefined> 
// // // console.log("Nothing more to start doing")

console.log("END")
