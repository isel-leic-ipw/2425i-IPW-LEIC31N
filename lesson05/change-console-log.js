console.log("SLB", {a: 1}, 123);

// (function () {
//   let oldConsoleLog = console.log
  
//   console.log = function(...args) {
//     oldConsoleLog.apply(this, [new Date(), ...args])
//     //oldConsoleLog.apply(this, [new Date()].concat(args))
//   }
// })()


{
  let oldConsoleLog = console.log
  
  console.log = function(...args) {
    oldConsoleLog.apply(this, [new Date(), ...args])
    //oldConsoleLog.apply(this, [new Date()].concat(args))
  }
}

console.log(oldConsoleLog)





console.log("SLB", {a: 1}, 123)  //  => [2024-09-23T17:26:01.032Z]: SLB { a: 1 } 123

// let a = [1,2,3] 

// let b = [4, a]   // [4, [1,2,3]]
// let b = [4, ...a]   // [4,1,2,3]