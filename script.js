// Element selectors
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const audio = document.getElementById('audio');
const progressBar = document.getElementById('progress');
const currentTimeEl = document.querySelector('.flex span:first-child');
const durationTimeEl = document.querySelector('.flex span:last-child');
const imgEl = document.querySelector('img');
const titleEl = document.querySelector('h1');
const artistEl = document.querySelector('p');
const prevBtn = document.querySelectorAll('.fa-angle-left')[0].parentElement;
const nextBtn = document.querySelectorAll('.fa-angle-right')[0].parentElement;

let isPlaying = false;
let currentIndex = 0;

// Playlist
const songs = [
  {
    title: "Deva Shree Ganesha",
    artist: "Ajay Gogavale (Ajay–Atul)",
    src: "./Music/song1.mp3",
    img: "./Images/img1.jpg",
  },
  {
    title: "Hanuman Chalisa",
    artist: "Traditional (Commonly sang by devotional artists)",
    src: "./Music/song2.mp3",
    img: "./Images/img2.jpg",
  },
  {
    title: "Aaj Ki Raat",
    artist: "Madhubanti Bagchi & Divya Kumar",
    src: "./Music/song3.mp3",
    img: "./Images/img3.jpg",
  },
  {
    title: "Apna Bana Le Piya",
    artist: "Arijit Singh (Sachin–Jigar)",
    src: "./Music/song4.mp3",
    img: "./Images/img4.jpg",
  },
  {
    title: "Saiyaara",
    artist: "Tanishk Bagchi, Sachet–Parampara",
    src: "./Music/song5.mp3",
    img: "./Images/img5.jpg",
  },
];


// Load song
function loadSong(index) {
  const song = songs[index];
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  audio.src = song.src;
  imgEl.src = song.img;
  resetProgress();
}

// Reset progress UI
function resetProgress() {
  progressBar.value = 0;
  currentTimeEl.textContent = "0:00";
  durationTimeEl.textContent = "0:00";
  progressBar.style.background = `linear-gradient(to right, white 0%, white 0%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%)`;
}

// Format time
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

// Play/pause toggle
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    playIcon.classList.replace("fa-play", "fa-pause");
    isPlaying = true;
  } else {
    audio.pause();
    playIcon.classList.replace("fa-pause", "fa-play");
    isPlaying = false;
  }
});

// Update progress and time
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
  progressBar.style.background = `linear-gradient(to right, white 0%, white ${progress}%, rgba(255,255,255,0.1) ${progress}%, rgba(255,255,255,0.1) 100%)`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationTimeEl.textContent = formatTime(audio.duration);
});

// Seek
progressBar.addEventListener("input", () => {
  const newTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = newTime;
});

// Song end
audio.addEventListener("ended", () => {
  playIcon.classList.replace("fa-pause", "fa-play");
  isPlaying = false;
  // Auto-play next song
  nextSong();
});

// Previous button
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  audio.play();
  playIcon.classList.replace("fa-play", "fa-pause");
  isPlaying = true;
});

// Next button
nextBtn.addEventListener("click", () => {
  nextSong();
});

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  audio.play();
  playIcon.classList.replace("fa-play", "fa-pause");
  isPlaying = true;
}

// Load first song on page load
loadSong(currentIndex);