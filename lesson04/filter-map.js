function filter(a, predicate) {
    let ret = []
    for (let index = 0; index < array.length; index++) {
        if(predicate(a[index])) {
            ret.push(a[index])
        }
    }
    return ret
}


function repeat(amount, task) {
    for(let i = 0; i < amount; ++i) {
        task(i+1)
    }    
} 

function map(a, projection) {
    let ret = []
    for(let i = 0; i < a.length; ++i) {
        res[res.length] = projection(a[i])   
    }
    return res
}



// function filter(a, predicate) {
//     let result = []
//     repeat(a.length, testCurrentValue)

//     return result

//     function testCurrentValue(position) {
//         let currValue = a[position-1]
//         if(predicate(currValue, position-1, a)) {
//             result.push(currValue)
//         }
//     }
// }



let a = [1,2,3,4,10, 12, 15, 7, 9.4, 14, 9.5, 12]
let aStr = ["Sport", "Lisboa", "e", "Benfica"]

let sizeStr = map(aStr, s => s.length) 
let sizeStr1 = map(aStr, s => s+s) 

let res = []
for(let i = 0; i < a.length; ++i) {
    if(a[i] >= 9,5) {
        res[res.length] = a[i]
    }
}

let res1 = filter(a, e => e >= 8.5 && e < 9.5)
console.log(res1)

// filter(a, function(e) { return e >= 9 })


// console.log("PositiveGrades")
// let positiveGrades = filter(a, e => e >= 9.5 )
// console.log(positiveGrades)


// console.log("Even numbers")
// let evenNumbers = filter(a, e => e % 2 == 0)

// console.log(evenNumbers)


// function map(a, prejection) {
//     let ret = []
//     for (let index = 0; index < array.length; index++) {
//         ret.push(prejection(a[index]))
//     }
//     return ret

// }


// console.log("Square Numbers")
// let squareNumbers = map(a, e => e*e)
// console.log(squareNumbers)


const students = [
    { number: 233232, grade: 12},
    { number: 434343, grade: 13},
    { number: 440000, grade: 14},
    { number: 233232, grade: 9},
    { number: 233232, grade: 8},
    { number: 233232, grade: 7},
    { number: 233232, grade: 6},
]

students.map = map
students.filter = filter


let positiveGradesStudent = map(
    filter(students, s => s.grade > 9.5), 
    s => s.number)
    
students.
    filter(s => s.grade > 9.5 && s.number > 10000).
    map(s => s.number).filter()

// let res1 = map(filter(students, s => s.number > 40000 && s.number < 45000), s => s.number)
// let res2 = students.filter(s => s.number > 40000 && s.number < 45000)
//                    .map(s => s.number)


// students.filter = function() {

// }


// students.filter(s => s.number > 40000 && s.number < 45000)

