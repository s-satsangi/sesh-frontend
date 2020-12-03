const newURL = 'http://localhost:3000/tracks'

document.addEventListener('DOMContentLoaded', () => {
    getTracks()

    const stopButton = document.getElementById('stop'); 
    stopButton.disabled = true;
})


function getTracks(){
    fetch(newURL)
        .then(response => response.json())
        .then(tracks => tracks.forEach(track =>renderTrack(track)))
}

function renderTrack(track){
let trackTable=document.getElementById('list-of-tracks')

let newTrack= document.createElement('li')
    newTrack.id = track.id 
    
    trackLink = track.link
    newTrack.innerText = trackLink
    console.log(trackLink)
    newTrack.addEventListener('click', event => {
        console.log("hey")
        clearHeaderContent()
        trackIsClicked(event,track)
     })
    
console.log(newTrack)

trackTable.append(newTrack)

}



function clearHeaderContent() { 
    document.getElementById('clear').innerHTML = ""; 
}

function trackIsClicked(event, track){
    console.log(track.id)

    let clickedTrackArea=document.getElementById('clear')
    
    let clickedTrack= document.createElement('p')
    clickedTrack.id = track.id 
    
    trackLink = track.link
    clickedTrack.innerText = trackLink

    clickedTrackArea.append(clickedTrack)

    } 
    // 

    // let trackFrame = getElementById('header')
    // trackFrame.delete



