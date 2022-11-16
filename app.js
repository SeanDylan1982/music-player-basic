let nowPlaying = document.querySelector('.now-playing');
let trackArt = document.querySelector('.track-art');
let trackName = document.querySelector('.track-name');
let trackArtist = document.querySelector('.track-artist');

let playPauseBtn = document.querySelector('.playpause-track');
let nextBtn = document.querySelector('.next-track');
let prevBtn = document.querySelector('.prev-track');

let seekSlider = document.querySelector('.seek-slider');
let volumeSlider = document.querySelector('.volume-slider');
let currentTime = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let currentTrack = document.createElement('audio');

let trackIndex = [0];
let isPlaying = false;
let isRandom = false;
let updateTimer;

const playlist = [
  {
    img : './img/profile-1.png',
    name: 'Its OK',
    artist: 'Just_Sean_Really',
    music : `./music/JohnXsmith - It's OK.mp3`
  },
  {
    img : './img/profile-1.png',
    name: 'Bass Discovery',
    artist: 'Just_Sean_Really',
    music : './music/Bass Discovery.mp3'
  },
  {
    img : './img/profile-1.png',
    name: 'EMC',
    artist: 'Just_Sean_Really',
    music : './music/EMC.mp3'
  },
  {
    img : './img/profile-1.png',
    name: 'Flyby',
    artist: 'Just_Sean_Really',
    music : './music/Flyby.mp3'
  },
  {
    img : './img/profile-1.png',
    name: 'For you',
    artist: 'Just_Sean_Really',
    music : './music/For you.mp3'
  },
  {
    img : './img/profile-1.png',
    name: 'Gutter Trance',
    artist: 'Just_Sean_Really',
    music : './music/Gutter Trance.ogg'
  },
  {
    img : './img/profile-1.png',
    name: 'Hip Hop Base',
    artist: 'Just_Sean_Really',
    music : './music/Hip Hop Base.ogg'
  },
  {
    img : './img/profile-1.png',
    name: 'In the morning',
    artist: 'Just_Sean_Really',
    music : './music/In the morning.mp3'
  },
  {
    img : './img/profile-1.png',
    name: 'Distracted',
    artist: 'Just_Sean_Really',
    music : './music/JohnXsmith - Distracted.ogg'
  },
  {
    img : './img/profile-1.png',
    name: 'Hip Hotness',
    artist: 'Just_Sean_Really',
    music : './music/JohnXsmith - Hip Hotness (Call it Steve if you like!) PREVIEW.mp3'
  },
  {
    img : './img/profile-1.png',
    name: 'Jazz it up',
    artist: 'Just_Sean_Really',
    music : `./music/JohnXsmith - Jazz it up.MP3`
  },
  {
    img : './img/profile-1.png',
    name: 'Mystic Filigree',
    artist: 'Just_Sean_Really',
    music : './music/JohnXsmith - Mystic Filigree.mp3'
  },
  {
    img : './img/profile-1.png',
    name: 'On the beat',
    artist: 'Just_Sean_Really',
    music : './music/JohnXsmith - On the beat.mp3'
  },
  {
    img : './img/profile-1.png',
    name: 'Unsettled',
    artist: 'Just_Sean_Really',
    music : './music/JohnXsmith - Unsettled.mp3'
  },
  {
    img : './img/profile-1.png',
    name: 'Immoral Man',
    artist: 'Just_Sean_Really',
    music : './music/JohnXsmith28 feat Fazyl Toffie, Helen Suzman & Dimitri Tsafendis - Immoral Man.MP3'
  },
  {
    img : './img/profile-1.png',
    name: 'Kiack A$$ Beats',
    artist: 'Just_Sean_Really',
    music : './music/Kick A$$ Beat$.mp3'
  },
  {
    img : './img/profile-1.png',
    name: 'Let it go',
    artist: 'Just_Sean_Really',
    music : './music/Let it go.ogg'
  },
  {
    img : './img/profile-1.png',
    name: 'Want a fork',
    artist: 'Just_Sean_Really',
    music : './music/Want a fork.mp3'
  },
  {
    img : './img/profile-1.png',
    name: `That's it`,
    artist: 'Just_Sean_Really',
    music : `That's It (You've Got To Push It Baby).MP3`
  },
  {
    img : './img/profile-1.png',
    name: 'Rock the EDM',
    artist: 'Just_Sean_Really',
    music : './music/Rock the EDM.ogg'
  }
];

loadTrack(trackIndex);

function loadTrack(trackIndex) {
  clearInterval(updateTimer);
  reset();

currentTrack.src = playlist[trackIndex].music;
currentTrack.load();

trackArt.style.backgroundImage = "url(" + playlist[trackIndex].img + ")";
trackName.textContent = playlist[trackIndex].name;
trackArtist.textContent = playlist[trackIndex].artist;
nowPlaying.textContent = "Now Playing... " + (trackIndex + 1) + " of " + playlist.length;

updateTimer = setInterval(setUpdate, 1000);
currentTrack.addEventListener('ended', nextTrack);
random_bg_color();

};

function random_bg_color() {
  let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
  let a;

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let Color1 = populate('#');
  let Color2 = populate('#');
  var angle = '55deg';

  let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ')';
  document.body.style.background = gradient;
};

function reset() {
  currentTime.textContent = "00:00";
  totalDuration.textContent = "00:00";
  seekSlider.value = 0;
};

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
};

function playRandom() {
  isRandom = true;
  randomIcon.classList.add('randomActive');
};

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove('randomActive');
};

function repeatTrack() {
  let currentIndex = trackIndex;
  loadTrack(currentIndex);
  playTrack();
};

function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
};

function playTrack() {
  currentTrack.play();
  isPlaying = true;
  trackArt.classList.add('rotate');
  wave.classList.add('loader');
  playPauseBtn.innerHTML = `<i class="fa fa-pause-circle fa-5x"></i>`;
};

function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  trackArt.classList.remove('rotate');
  wave.classList.remove('loader');
  playPauseBtn.innerHTML = `<i class="fa fa-play-circle fa-5x"></i>`;
};

function nextTrack() {
  if (trackIndex < playlist.length - 1 && isRandom === false) {
    trackIndex += 1;
  } else if (trackIndex < playlist.length - 1 && isRandom === true) {
    let randomIndex = Number.parseInt(Math.random() * playlist.length);
    trackIndex = randomIndex;
  } else {
    trackIndex = 0;
  }
  loadTrack(trackIndex);
  playTrack();
};

function prevTrack() {
  if (trackIndex > 0) {
    trackIndex -= 1;
  } else {
    trackIndex = playlist.length -1;
  }
  loadTrack();
  playTrack();
};

function seekTo() {
  let seekto = currentTrack.duration * (seekSlider.value / 100);
  currentTrack.currentTime = seekto;
};

function setVolume() {
  currentTrack.volume = volumeSlider.value / 100;
};

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(currentTrack.duration)) {
    seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
    seekSlider.value = seekPosition;

    let currentMinutes = Math.floor(currentTrack.currentTime / 60);
    let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currentTrack.duration / 60);
    let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);

    if (currentSeconds < 10) {currentSeconds = "0" + currentSeconds};
    if (durationSeconds < 10) {durationSeconds = "0" + durationSeconds};
    if (currentMinutes < 10) {currentMinutes = "0" + currentMinutes};
    if (durationMinutes < 10) {durationMinutes = "0" + durationMinutes};

    currentTime.textContent = currentMinutes + ":" + currentSeconds;
    totalDuration.textContent = durationMinutes + ":" + durationSeconds;
  }
}