
async function showTeam(idTeam) {
    return fetch(`https://v3.football.api-sports.io/players/squads?team=${idTeam}`
    ,{
        headers: {
            'x-apisports-key': '37eb60d963f1cbea94a0544563e4e0ea'
        }
    }
    )
    .then(resp => resp.json())
    .then(processResponse)
    function processResponse(obj) {
        const respTeam = obj.response[0]
        console.log(`Squad for team ${respTeam.team.name}`)
        let str = respTeam.players
            .sort((p1, p2) => p1.number - p2.number )
            .map(p => `${p.number}  -  ${p.name}`)
            //.join('\n')
            .reduce((prev, curr) => `${prev}\n${curr}`, "")

        console.log(str)
        return str
    }
}


// showTeam(211).then(str => str.split('\n').length)
//     //.then(numPlayers = console.log(numPlayers))
//     .then(console.log)

let teamIds = [211, 213, 214, 215]



// Promise.all(teamIds.map(id => showTeam(id)))
// .then(arrStr => arrStr.flatMap(str => str.split('\n')).length)
// .then(console.log)

let arrStr = await Promise.all(teamIds.map(id => showTeam(id)))
let numPlayers = arrStr.flatMap(str => str.split('\n')).length
console.log(numPlayers)
