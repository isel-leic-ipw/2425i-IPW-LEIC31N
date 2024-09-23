let o1 = {
    n1: 123,
    n2: "Benfica"
}

let p = 'n3'

function f() {
     
}

o1.n3 = { a : 3 }    // Accessing an object binding (aka property) using the "Dot Notation"

o1['n3'] = { a : 3 } // Accessing an object binding (aka property) using the "Subscript Notation"


for(let n in o1) {
    console.log(`Property name is ${n}`)
    console.log(`Property vales is ${o1[n]}`)
}

