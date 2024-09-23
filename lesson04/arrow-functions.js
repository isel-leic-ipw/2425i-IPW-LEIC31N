
function isPositiveGrade(n) { return n > 9.5 }

let isPositiveArrowFunction =  n =>  n > 9.5 

isPositiveGrade(12)
isPositiveArrowFunction(13)

const positive = (n => n >= 9.5)

const pos = (n => n >= 9.5)(10)
