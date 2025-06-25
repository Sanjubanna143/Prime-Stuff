// this is for education purpose / via this we can only play 1st song(also good for testing music /checks api)

   // via this query we can play song
    var audio = new Audio(songs[1]);
     audio.play();  

     // we saw audio duration in console
    audio.addEventListener("loadeddata", () => {
        console.log(audio.duration, audio.currentTime, audio.currentSrc);
    });
