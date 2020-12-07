function makeSongs(){
    //get the ids of the open tracks from the p tags
    let track1Id = track1pTag().id
    let track2Id = track2pTag().id

    //prompt user for a name for the song
    let songName = prompt("All right!  Enter a name for your song: ", "My New Sesh")
    //in the future maaaaaaaaaaybe we'll make tags?

    //make an object for a fetch post
    let songData = {}
        songData.song = songName
        songData.track1id = track1Id
        songData.track2id = track2Id

    let postObj = {}
        postObj.method = 'post'
        postObj.headers = {'Content-Type': 'application/json'}
        postObj.body = JSON.stringify(songData)

        // debugger
    
        //post to songs
        fetch(songsURL, postObj).then(resp => resp.json()).then(song => renderSong(song))
}