
// Hey hey it's our code to record stuff!
// thanks in huge part to https://github.com/mdn/web-dictaphone

// set up some stuff we're gonna use below
//const seshHomeURL = "http://localhost:3000"
const recordingDeck = document.querySelector('.recording-deck')
const canvas = document.querySelector('.visualizer')
const record = document.querySelector('.record')
const stop = document.querySelector('.stop')
//we wanna have stop unclickable till we start recording
stop.disabled = 'true'

// setup for the visualizer function.  setting a context for web audio api context
let audioContext
const canvasContext = canvas.getContext('2d')

// if the browser supports getUserMedia, it should support our app 
if (navigator.mediaDevices.getUserMedia) {
    //browser supported!

    //setting up the chunks array for saving the media stream
    let chunks = []

    const userAgree = function (stream) {
        //great! user agrees to give us microphone access,
        //this chunk initializes the mediaRecorder object,
        //and calls the visualizer so it runs when we press recorder 
        const mediaRecorder = new MediaRecorder(stream)
        visualize(stream)

        //everything that happens when you press start sesh goes here
        record.addEventListener('click', () => {
            mediaRecorder.start()

            //disable the record button, enable the stop button
            record.disabled = true
            stop.disabled = false
        })

        //everything that happens when you press stop sesh goes here
        stop.addEventListener('click', () => {
            mediaRecorder.stop()

            //disable stop button, enable play button
            record.disabled = false
            stop.disabled = true
        })

        //when a user clicks stop, do all the stuff to save the file
        mediaRecorder.addEventListener('stop', () => {
            //prompt user for filename
            //if user doesn't enter a filename, set it to untitled track!
            let trackName = prompt("Name your track: ", "Untitled Track")
            console.log(trackName)

            //create the audio blob from chunks array be sure to set the codec! { 'type' : 'audio/ogg; codecs=opus' }
            const tempBinaryAudio = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' } )
            //get the url for the temp audio file from the blob
            const audioURL = window.URL.createObjectURL(tempBinaryAudio)
            //make a formData object to send to rails through fetch!
            const formData = new FormData();
            formData.append("bucket_link", tempBinaryAudio, trackName)

            //set up the postObject (don't add headers because we are passing formdata!) and then do the fetch
            const postObj = {}
            postObj.method = "POST"
            postObj.body = formData
            //newURL is from index.js
            fetch(`${newURL}`, postObj).then(resp=>resp.json()).then(track=>renderTrack(track))
        })

        mediaRecorder.addEventListener('dataavailable', stream => {
            chunks.push(stream.data)
        })
    }

    const userDisagree = function (error) {
        alert("Aww, that's ok, I understand :( " + error)
    }

    // ok!  we've defined all our funcs, ask the user if we can use their mic
    navigator.mediaDevices.getUserMedia( {audio:true} ).then( userAgree, userDisagree )
} else {
// they should come back with a supported browser
 alert("Sorry, Sesh doesnn't support your browser, try using Chrome or Firefox")
}

// >>>>>>>>>>>>>>> visualizer pretty much copied and pasted from mdn
function visualize(stream) {
    if(!audioContext) {
      audioContext = new AudioContext();
    }
  
    const source = audioContext.createMediaStreamSource(stream);
  
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
  
    source.connect(analyser);
    //analyser.connect(audioContext.destination);
  
    draw()
  
    function draw() {
      const WIDTH = canvas.width
      const HEIGHT = canvas.height;
  
      requestAnimationFrame(draw);
  
      analyser.getByteTimeDomainData(dataArray);
  
      canvasContext.fillStyle = 'rgb(0, 0, 0)';
      canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
  
      canvasContext.lineWidth = 7;
      canvasContext.strokeStyle = 'rgb(255, 255, 0)';
  
      canvasContext.beginPath();
  
      let sliceWidth = WIDTH * 1.0 / bufferLength;
      let x = 0;
  
  
      for(let i = 0; i < bufferLength; i++) {
  
        let v = dataArray[i] / 128.0;
        let y = v * HEIGHT/2;
  
        if(i === 0) {
          canvasContext.moveTo(x, y);
        } else {
          canvasContext.lineTo(x, y);
        }
  
        x += sliceWidth;
      }
  
      canvasContext.lineTo(canvas.width, canvas.height/2);
      canvasContext.stroke();
  
    }
}
  
        window.onresize = function() {
          canvas.width = recordingDeck.offsetWidth;
        }
          
        window.onresize();
