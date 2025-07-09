# spotify
 
Spotify UI Clone

A modern, responsive, and visually-rich clone of the Spotify web player interface. This project uses pure HTML and CSS for the layout and is brought to life with JavaScript for dynamic song loading and audio playback controls.

✨ Preview

![image alt](https://github.com/bhautik2005/spotify/blob/2ea0189718444dbe052ac3a0ed6fbaa7195c8647/Screenshot%202025-07-09%20194227.png)

![image alt](https://github.com/bhautik2005/spotify/blob/c707ab1aa141644b2102e9cb6a902b64f8a011d3/Screenshot%202025-07-09%20194447.png)

Here's a look at the finished user interface, showcasing the main content area with dynamically loaded songs and the interactive player.

📋 Table of Contents

Features

Tech Stack

File Structure

Getting Started

🚀 Dynamic Functionality with JavaScript

Prerequisites: Running a Local Server

JavaScript Code (app.js)

Required CSS for JavaScript

Code Walkthrough

In-Depth CSS Highlights

Future Improvements

🚀 Features

Dynamic Song Loading: Fetches and lists all .mp3 files from a local directory.

Full Audio Playback Controls:

Play, pause, and seek functionality.

Real-time updates for the current song name and time display.

Clickable playlist items to change songs instantly.

Responsive Three-Column Layout: A classic sidebar, main content area, and a fixed bottom player that adapts to different screen sizes.

Modern UI/UX: Glassmorphism, interactive hover effects, and custom animations.

Component-like Structure: The HTML is organized into logical, reusable sections.

Mobile-Friendly Sidebar: A slide-in/slide-out navigation sidebar for smaller screens.

🛠 Tech Stack

HTML5: For the semantic structure of the web page.

CSS3: For all styling, layout, animations, and responsiveness.

Flexbox & CSS Grid: For robust and responsive page layouts.

JavaScript (ES6+): For DOM manipulation, event handling, audio playback, and fetching local data (async/await).

📂 File Structure

For this project to work, you'll need the following structure:

Generated code
/
├── Song/                 <-- FOLDER
│   ├── song1.mp3
│   ├── song2.mp3
│   └── ...
├── index.html            <-- Main HTML file
└── app.js                <-- JavaScript file

🏁 Getting Started

Because the JavaScript fetches songs from your file system, you cannot simply open index.html in the browser. You must run a local web server.

Install Node.js: If you don't have it, download and install it from nodejs.org.

Set Up Your Project:

Create a project folder.

Inside it, create a subfolder named Song and place your .mp3 files there.

Save the HTML code as index.html in the main project folder.

Save the JavaScript code as app.js in the main project folder.

Run the Local Server:

Open a terminal or command prompt in your main project folder.

Install a simple server package by running:

Generated bash
npm install -g serve
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Start the server:

Generated bash
serve
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

The terminal will give you a local address, usually http://localhost:3000.

View the App: Open your web browser and navigate to the address provided by the server (e.g., http://localhost:3000).

🚀 Dynamic Functionality with JavaScript

As requested, "ram ram ji"! The app.js file is the brain of this application. It handles everything from loading your songs to managing the audio player.

Prerequisites: Running a Local Server

The getSongs() function in the script uses fetch('http://127.0.0.1:3000/Song/'). This means it expects a local server to be running and serving a directory listing at the /Song/ path. The serve package mentioned in the "Getting Started" section does this automatically.

JavaScript Code (app.js)

This is the code that powers the application's interactivity.

Generated javascript
// app.js

console.log("ram ram ji");

const currentSong = new Audio();
let songs; // To store the list of songs globally

// Fetches songs from the local server directory
async function getSongs() {
    // Note: The URL must match your local server address
    let a = await fetch('http://localhost:3000/Song/');
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songList = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songList.push(element.href.split("/Song/")[1]);
        }
    }
    return songList;
}

// Plays a selected track
function playMusic(track, pause = false) {
    currentSong.src = "/Song/" + track;
    if (!pause) {
        currentSong.play();
        play.src = "pause.svg"; // Assumes a 'play' element exists
    }
    document.querySelector(".songname").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

// Formats time from seconds to MM:SS format
function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

async function main() {
    // Get the list of songs
    songs = await getSongs();
    if (songs.length > 0) {
        playMusic(songs[0], true); // Load the first song but don't play it
    }

    // Populate the song list in the UI
    let songUL = document.querySelector(".songlist ul");
    songUL.innerHTML = ""; // Clear existing list
    for (const song of songs) {
        songUL.innerHTML += `<li>
            <img class="invert" width="34" src="music.svg" alt="">
            <div class="info">
                <div>${decodeURI(song)}</div>
                <div>Artist</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="play.svg" alt="">
            </div>
        </li>`;
    }

    // Add click listeners to each song in the list
    Array.from(document.querySelectorAll(".songlist li")).forEach(e => {
        e.addEventListener("click", () => {
            let trackName = e.querySelector(".info").firstElementChild.innerHTML.trim();
            playMusic(trackName);
        });
    });

    // Main play/pause button listener
    const play = document.getElementById("play"); // Ensure your play button has id="play"
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        } else {
            currentSong.pause();
            play.src = "play.svg";
        }
    });

    // Time update listener for the seek bar
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
        document.querySelector(".cri").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Seek bar click listener
    document.querySelector(".bar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".cri").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    // Mobile sidebar toggle: Show
    document.querySelector(".eqal").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    // Mobile sidebar toggle: Hide
    document.querySelector(".cros").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });
}

main();
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
JavaScript
IGNORE_WHEN_COPYING_END
Required CSS for JavaScript

For the mobile sidebar toggle to work smoothly, you need to add the following CSS to your stylesheet.

Generated css
/* Add this inside the @media (max-width: 768px) block */

.left {
    position: fixed;
    left: -120%; /* Start off-screen */
    top: 0;
    bottom: 0;
    z-index: 300;
    transition: left 0.3s ease-in-out;
    background: #000; /* Solid background for visibility */
    width: 100%;
}
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Css
IGNORE_WHEN_COPYING_END
Code Walkthrough

Fetching Songs (getSongs):

The script sends a fetch request to the /Song/ directory on your local server.

The server returns an HTML page listing all files in that directory.

The script parses this HTML, finds all anchor tags (<a>) that end with .mp3, and extracts the filenames.

Populating the Playlist:

The main function calls getSongs().

It then loops through the returned song array.

For each song, it dynamically creates an <li> element using a template literal and injects it into the "Your Library" sidebar.

Core Player Controls:

playMusic(track): This function sets the src of the global Audio object and calls .play(). It also updates the song name in the player UI.

Playlist Clicks: An event listener on each <li> calls playMusic with the corresponding song name.

Main Play/Pause: The central play button toggles between currentSong.play() and currentSong.pause() and swaps its icon between play.svg and pause.svg.

Seek Bar Synchronization:

An event listener on currentSong.timeupdate fires repeatedly as the song plays.

It updates the 00:00 / 00:00 time display.

It calculates the playback progress as a percentage (currentTime / duration) and updates the left CSS property of the seek bar's handle (.cri), moving it across the bar.

A click listener on the .bar itself allows the user to click anywhere to "seek" to that position in the song.

Mobile Sidebar Toggle:

On smaller screens, the left sidebar is hidden off-screen (left: -120%).

Clicking the hamburger icon (.eqal) sets left: 0, sliding it into view.

Clicking the close icon (.cros) sets left: -120%, sliding it back out.

💡 In-Depth CSS Highlights

(This section remains the same as before, detailing the CSS techniques for layout, glassmorphism, and hover effects.)

🔮 Future Improvements

(This section remains the same, as the JS implementation is a great step towards these goals.)
