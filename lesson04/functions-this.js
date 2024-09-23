"use strict"

function f(a) {
  console.log(`this =`, this)
}

function Point(x, y) {
  this.x = x
  this.y = y

  this.add = function (p) {
    return new Point(this.x + p.x, this.y + p.y)
  }

  console.log(`this =`, this)
}

// // Point.prototype.add = function(p) {
// //   return new Point(this.x+p.x, this.y+p.y)
// // }

// // 1st way: As a global function
// // this refers to the Global Object
// console.log(`1st way: As a global function`)
// f()

// // 2nd way: As a method
// // this refers to the object with the method
// console.log(`2nd way: As a method`)
// let o = {
//   m: f
// }


// o.m()

// // // 3rd way: As a constructor
// // // this refers to the newly created object
// console.log(`3rd way: As a constructor`)

// let o1 = new f()
// let p1 = new Point(2, 3)
// let p11 = new Point(3, 4)

// p1.x = 10
// let p2 = p1.add(p11)

// console.log(p2)
// // console.log(p2)

// let f2 = p1.add
//f2(p11)

// // //Point(2,3) // Don't call constructor function in a global way. Raises an error in strict mode
// // // Don't call method as a global function

// // 4th way: Using methods call or apply
// // this will be the first argument passed to one of this functions
// console.log(`4th way: Using methods call or apply`)

// let str = "SLB"
// f.call(str, 2)

// let o2 = new Object()  //  {}
// let a = new Array() //[]
// let str = new String("Benfica") //"Benfica"
// let f1 = new Function("a, b", "return a+b")
// let f1 = function(a,b) {
//   return a+b
// }

//console.log(f1(2,5))

// let p3 = Point.call({}, 2, 3)     // = new Point(2,3)
// Point.apply(new Object(), [4,5])  // = new Point(2,3)


// var str = "Benfica"
// console.log(str.substring(1,3))
// // console.log(str.substring.call(str, [1,3]))
// // console.log(str.substring.apply(str, [1,3]))


function add(a,b) {
  return a+b;
}

function times(a,b) {
  return a*b;
}



// function showArguments(f) {
//   return function(...args) {
//     console.log(`arguments: ${args}`)

//     let ret = f.apply(this, args)
//     console.log(`return: ${ret}`)
//     return ret
//   }
// }

function showArguments(f) {
  return function(...args) {
    console.log(args)
    return f.apply(this, args)
  }
}
let saAdd = showArguments(add)
let saTimes = showArguments(times)


console.log(saAdd(2,3))
console.log(saTimes(2,3))

// // // const validator = {name : "p1" , validators: [s => s instanceof String && s.length > 2, s => s[0]=="a"]  }


// // change console.console.log()

var d = new Date()
console.log(d)
console.log("SLB", {a: 1}, 123)  //  => [2024-09-23T17:26:01.032Z]: SLB { a: 1 } 123
