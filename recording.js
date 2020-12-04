const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start();

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, play });
        });

        mediaRecorder.stop();
      });

    
    resolve({ start, stop });
    
  });

const sleep = time => new Promise(resolve => setTimeout(resolve, time));


const handleAction = async () => {
 recorder = await recordAudio();
  const actionButton = document.getElementById('action'); 
  actionButton.disabled = true;
  const stopButton = document.getElementById('stop'); 
  stopButton.disabled = false;
  recorder.start();
  //await sleep(8000);
}

const stopRecording = async () => {
  //const recorder = await recordAudio();
  const audio = await recorder.stop();
  audio.play();
  console.log(audio);
  //await sleep(8000);
  const actionButton = document.getElementById('action'); 
  actionButton.disabled = false;
  const stopButton = document.getElementById('stop'); 
  stopButton.disabled = true;
}