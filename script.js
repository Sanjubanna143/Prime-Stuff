

console.log("lets go sanju");
let currentsong = new Audio();

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "Invalid input";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getsongs() {

    let a = await fetch("http://127.0.0.1:3000/songs/")     // here we fetch api and pharse inyo response
    let response = await a.text();



    let div = document.createElement("div")    // here we create a new element and name him response = <div class="response">
    div.innerHTML = response;



    let as = div.getElementsByTagName("a")    // here we target all song by <a> anchor tag name which is - a 
    let songs = []   // store the targeted songs into a array
    for (let index = 0; index < as.length; index++) {   // run a for loop so we can get song 1 by 1
        const element = as[index];

        // we placed a condition which says only pick the href which has .mp3 in his name(we are seperate all song from a pharse file)
        //   and whoever has a .mp3 name in his syntax/element/href got pushed into array -element means element named array
        // also added a split function which removes the https;//xyz.com from real frontend output
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}
// via using this we get all the song into console


const playMusic = (track, pause=false) => { // now we are creating function to play the music
    currentsong.src = "/songs/" + track
    if(!pause){
    currentsong.play()
    play.src = "https://img.icons8.com/sf-black-filled/52/circled-pause.png"
}

    let displayName = decodeURIComponent(track)
        .replace(/[_]?\d+\s*kbps/gi, "")
        .replace(/\.mp3.*$/i, "")
        .trim();
    document.querySelector(".songinfo").innerHTML = displayName;
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main() { // here w create a promise which insure songs get in console one by one propely like a list
    let songs = await getsongs()
    console.log(songs)
playMusic(songs[1],true)


    // now we append the song in html
    // so what we do here - we run a queryselector for songlist(available in html) and target ul and then we run a for of loop
    // in for loop we append  a song in older html and also make sure to remove %20 (text available in music directory name /also visible in frontend)
    let songul = document.querySelector(".songlist ul");
    for (let song of songs) {   // here we are removing extra keyword from song name like = .mp3 , 320kbps etc.
        let displayName = decodeURIComponent(song)
            .replace(/[_]?\d+\s*kbps/gi, "")
            .replace(/\.mp3.*$/i, "")
            .trim();    // removes leading/trailing spaces


        songul.innerHTML += `<li data-filename="${song}"> 
<img width="30" height="30" src="https://img.icons8.com/badges/25/playlist.png" alt="playlist" />
    <div class="info">
        <div>${displayName}</div>
    </div>
    <div class="playnow">
        <span>Play Now</span>
     <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAACDUlEQVR4nN2VTWgTURDHI4KC4MdFrch7G7REVBDUXip6rHcPAcGbB8GbB6FQiqCnghTswYMHQRAvoacWvPhVNe7bjStItbU2GmhDTaUR6aa1bNPNT2JeZIuJ0ub14sAcdvfN/N7On5mJxf5LAyQwCLjANWD7RkBeAz6QoWazwCmTgJ1ABbiun7uAx8BZYC9wxgRkj759D6nYZmwxiBLfseVtgmK//vYUOGEGovYfQ0l+u5vwmRt6BJSAELhf1a81SNrqXAWpu3f8C37mCVAGAmCgWmazEKX9bVeWpemX+nwR6Aa2moUo7ROX3rCyOK7jPgJJYJNZiJJgx0Om+tKE5Rkd/xxoMwtR2p3EAl9TI4ThIqA2BqK0F+6VIKwwM7TNPMRNwFQfVH/E98CWDk77DkOQOGSvQKAlmXfAO6n1ss61Dhk7DwvvalFLn2HyMihLA2QeT+5rDVK4Wzu9XIRcLzgHdHKxjC3v8KJtd+ua5HohfwsyRyPvxTBpcXB9feIegumbEMzCWLJBr0gHJU43Tf53SBw+XYWgoEW1weuIJp/ElkmINe/yJvvkxi/I+AWoT4wfWZi4GL39N5Ts5mH7v+dVA1B1I5Yoz3+oiToHuZ6oqAG2GOCZtWvNySMQAaRY8UfJ90PmcL0sFZR4wKu4te7kf8DeH9mCkqO6NCO4osNY8lWg6gp2rcbTdI32EyzgCTgr8euzAAAAAElFTkSuQmCC"
</li>`;

    }


    // here we attcah a event listner how hepls to play song after click on it .

    // first we target html and run foreach lopp so we can  add click event on all song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            let filename = e.dataset.filename; // ✅ uses original filename with .mp3
            console.log("Playing:", filename);
            playMusic(filename);
        });
    });



    // here we add event listner for play nerxt previous button
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "https://img.icons8.com/sf-black-filled/52/circled-pause.png"
        }
        else {
            currentsong.pause()
            play.src = "https://img.icons8.com/sf-black-filled/52/circled-play.png"

        }
    })

    // time update event run while music play

     currentsong.addEventListener("timeupdate", () =>  {  //time update is a event for update the time
        console.log(currentsong.currentTime, currentsong.duration); //we print time and duration 
        // here we are appending the time and duration in html and the -secondsToMinutesSeconds  function change raw seconds in minute format
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}/                   
        ${secondsToMinutesSeconds(currentsong.duration)}`
        // here we move the circle of seekbar with the duration (here *100 is left to move 100)
        document.querySelector(".circle").style.left =(currentsong.currentTime/ currentsong.duration) *100
        + "%";
    })



    // here we make seekbar functional/ clickable
    document.querySelector(".seekbar").addEventListener("click", e=>{    // added click event on seekbar
        let percent =(e.offsetX/e.target.getBoundingClientRect().width) *100;   // calculaye where we clicked( e.offsetX - means how far the click happpened from dimension x)( getBoundingClientRect() - function to calculate total width of seek bar)
        document.querySelector(".circle").style.left = percent +"%"; //  Move the .circle to that percentage point.
        currentsong.currentTime = ((currentsong.duration)* percent)/100 // This actually jumps the song to the clicked position.
    })
}

main()

