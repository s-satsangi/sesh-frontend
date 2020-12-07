function playAll(){
    console.log('Play All')
    // debugger
      
    track1audio().play()

    track2audio().play()
}
      
function swapTracks(){
            // debugger
            //set what's in track-1 to swap vars
    let swap = track1().innerHTML
            //set track-1 to track-2
    track1().innerHTML = track2().innerHTML
            //set track-2 to what's in the swap vars
    track2().innerHTML = swap
}

function recAndPlayTrack(trackAudio){
    console.log("I have a wanna to record some audio and play " + trackAudio)
    let record = document.querySelector('.record')
    // let hello = async () => { return "Hello" };
    let pressRecord = async () => {record.click()}
    // record.click()
    // trackAudio().play()
    pressRecord().then(trackAudio().play())
}
