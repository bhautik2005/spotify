console.log("ram ram ji");

const currentSong = new Audio();

async function getSongs(params) {
    let a = await fetch('http://127.0.0.1:3000/Song/');
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3"))
            songs.push(element.href.split("/Song/")[1]);
    }
    //  console.log(songs);
    return songs;

}


function playMusic(track, pause = false) {
    currentSong.src = "/Song/" + track;
    if (!pause) {

        currentSong.play();
        play.src = "pause.svg";
    }

    document.querySelector(".songname").innerHTML = track;
    document.querySelector(".songtime").innerHTML = " 00:00 / 00:00";

}
async function main() {
    let songs = await getSongs();
    // console.log(songs);

    playMusic(songs[0], true)

    let SongUl = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        SongUl.innerHTML = SongUl.innerHTML +
            `<li><img class="invert" width="34" src="music.svg" alt="">
        <div class="info">
            <div> ${song}</div>
            <div>Bhautik</div>
        </div>
        <div class="playnow">
            <span>Play Now</span>
            <img class="invert" src="play.svg" alt="">
        </div> </li>`;
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        console.log(e);
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        });

    });

    //seekbar

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";

        } else {
            currentSong.pause();
            play.src = "play.svg";
        }

    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    currentSong.addEventListener("timeupdate", () => {
        let current = currentSong.currentTime;
        let total = currentSong.duration;
        document.querySelector(".songtime").innerHTML = `${formatTime(current)} / ${formatTime(total)}`;


        document.querySelector(".cri").style.left = (currentSong.currentTime / currentSong.duration) * 96.9 + "%";

    });

    document.querySelector(".bar").addEventListener("click", e => {
        let per = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".cri").style.left = per + "%";
        if (per >= 0 && per <= 100) {
            currentSong.currentTime = (currentSong.duration * per) / 100;
        } else {
            console.error('Percentage must be between 0 and 100');
        }
    });

    //eqap for lerf 

    document.querySelector(".eqal").addEventListener("click", (e) => {
        document.querySelector(".left").style.left = "0";

    })
    // cros for lerf
    document.querySelector(".cros").addEventListener("click", (e) => {
  document.querySelector(".left").style.left = "-100%" 
})




}
main();