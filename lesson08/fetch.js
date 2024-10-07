
// fetch("http://www.isel.pt")
//     .then(rsp => rsp.text())
//     .then(txt => console.log(txt))


// fetch('https://api.chucknorris.io/jokes/random')
//     // .then(res => res.text())
//     // .then(txt => console.log(JSON.parse(txt).value))
//     .then(res => res.json())
//     .then(obj => console.log(obj.value))


// // //https://httpbin.org/delay/t
// function printGetWithDelay(t){
//     return fetch('https://httpbin.org/delay/' + t) 
//         .then(resp => resp.json())
//         .then(body => console.log(body))
// }

//printGetWithDelay(1)

// function printGoodJokes(){
//     return fetch("https://api.sampleapis.com/jokes/goodJokes") 
//         .then(resp => {
//             console.log(resp.status)
//             return resp.json()
//         }) 
//         .then(data => console.log(data))
// }

// //printGoodJokes()

function getTeam(){
    return fetch("https://v3.football.api-sports.io/teams?id=211"
        ,{
            headers: {
              "x-apisports-key" : "37eb60d963f1cbea94a0544563e4e0ea"
            }
        }
        ) 
        .then(resp => resp.json()) 
        //.then(data => console.log("Data",data))
        .then(printTeamInfo)

        function printTeamInfo(data) {
            console.log("Team Name:",data.response[0].team.name)
            console.log("Venue Name:",data.response[0].venue.name)
        }
}

getTeam()
     .then(()=>console.log("Done"))
    

// const json = ' {"name":"Filipe" , "text" : "txt" }'
// const parsed = JSON.parse(json)
// const inString = JSON.stringify(parsed)
// console.log(parsed)
// console.log(inString)