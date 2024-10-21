
// fetch('https://v3.football.api-sports.io/players/squads?team=211'
//     ,{
//         headers: {
//             'x-apisports-key': '37eb60d963f1cbea94a0544563e4e0ea'
//         }
//     }
// )
// .then(resp => resp.json())
// .then(processResponse)
//.then(() => console.log("END"))



async function f(){
    let rsp = await fetch('https://v3.football.api-sports.io/players/squads?team=211'
        ,{
            headers: {
                'x-apisports-key': '37eb60d963f1cbea94a0544563e4e0ea'
            }
        }
    )
    let obj = await rsp.json()
    processResponse(obj)

}

f()
console.log("END")

function processResponse(obj) {
    console.log(obj
        .response[0].players
        .sort((p1, p2) => p1.number - p2.number )
        .map(p => `${p.number}  -  ${p.name}`)
        //.join('\n')
        .reduce((prev, curr) => `${prev}\n${curr}`, "")

    )
}
