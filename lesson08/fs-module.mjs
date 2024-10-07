

import { readFile, writeFile } from 'node:fs/promises'

readFile('./team211.json')          // Promise<Buffer>
    .then(buffer => printTeamInfo(JSON.parse(buffer.toString())))   // Promise<Object>
    .then(writeToFile)
    .then(confirmFileWrittenWithSuccess)    // Promise<undefined>
    .catch(processError)



    function printTeamInfo(data) {
        console.log("Team Name:",data.response[0].team.name)
        console.log("Venue Name:",data.response[0].venue.name)

        return data
    }

    

const fileName = './out.json'

function writeToFile(obj) {
    console.log(`########`, obj)
    const strTeam = JSON.stringify(obj.response[0].team)
    console.log(`File content wil be: \n${strTeam}`)

    return writeFile(
        fileName, 
        strTeam
    )

}


function confirmFileWrittenWithSuccess() {
    console.log(`File ${fileName} created with success`)
}


function processError(e) {
    console.log("An error occurred")
    console.log(e)

}