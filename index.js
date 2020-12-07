//stuff we're gonna need globally
const newURL = 'http://localhost:3000/tracks'
const songsURL = 'http://localhost:3000/songs'
let track1 = () => document.querySelector('.track-1')
let track2 = () => document.querySelector('.track-2')
let track1audio = () => track1().childNodes[0].childNodes[0]
let track2audio = () => track2().childNodes[0].childNodes[0]
let track1pTag = () => track1().childNodes[1].childNodes[0]
let track2pTag = () => track2().childNodes[1].childNodes[0]

//when we first load the page:
document.addEventListener('DOMContentLoaded', () => {
    getTracks()
    getSongs()
    const swapButton = document.querySelector('.swap-tracks')
    swapButton.addEventListener('click',() => {
          swapTracks()
    })
    const playAllButton = document.querySelector('.play-all')
    playAllButton.addEventListener('click', ()=>{
        playAll()
    })
    //add event listener to the make songs button
    const makeSong = document.querySelector('.make-song')
    makeSong.addEventListener('click', () => {
        makeSongs()
    })
})


//get all recorded tracks on server
function getTracks(){
    fetch(newURL)
        .then(response => response.json())
        .then(tracks => tracks.forEach(track =>renderTrack(track)))
}

//get all songs on server
function getSongs(){
    fetch(songsURL)
        .then(response => response.json())
        .then(songs => songs.forEach(song => renderSong(song)))
}

//Add the infor for a single track to the track list
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


//currently clears what's in track-1
function clearHeaderContent() { 
    // debugger
    // document.getElementsByClassName('track-1').innerHTML = ""; 
    // clear track 1 audio tag
    document.getElementsByClassName('track-1')[0].childNodes[0].childNodes[0].src=""
    // clear track 1 p tag
    document.getElementsByClassName('track-1')[0].childNodes[1].childNodes[0].value=""
}

//currently, when track is clicked in the list, renders it in track-1
function trackIsClicked(event, track){
    console.log(track.id)
    let clickedTrackArea = document.getElementsByClassName('track-1')
    let clickedTrackTitleTag = clickedTrackArea[0].childNodes[1].childNodes[0]
    let clickedTrackAudio = clickedTrackArea[0].childNodes[0].childNodes[0]
    
    clickedTrackAudio.src = track.bucket_link["url"]
    clickedTrackAudio.controls = true
    clickedTrackTitleTag.id = track.id 
    // debugger
    trackLink = track.link
    clickedTrackTitleTag.innerText = trackLink

    //clickedTrackArea.append(clickedTrack)

} 
    // 

    // let trackFrame = getElementById('header')
    // trackFrame.delete
function renderSong(song){
    // console.log("Hey This is your new song here: " + song)
    let songTable = document.querySelector('#list-of-songs')
    let newSong=document.createElement('li')
    newSong.id = song.id
    newSong.innerHTML = song.title
    songTable.appendChild(newSong)
    // debugger
}


