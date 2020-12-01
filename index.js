const URL = 'http://localhost:3000/tracks'

document.addEventListener('DOMContentLoaded', () => {
    getTracks()


})


function getTracks(){
    fetch(URL)
        .then(response => response.json())
        .then(tracks => tracks.forEach(track =>renderTrack(track)))
}

function renderTrack(track){
let trackTable=document.getElementById('list-of-tracks')

let newTrack= document.createElement('tr')
    newTrack.id = track.id 
    
    trackLink = track.link
    newTrack.innerText = trackLink
    console.log(trackLink)
    newTrack.addEventListener('click', event => {
        console.log("hey")
     })
    
console.log(newTrack)

trackTable.append(newTrack)

}