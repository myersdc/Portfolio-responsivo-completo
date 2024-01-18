const playPauseButton = document.getElementById('play-pause-button');
const audio = document.getElementById('audio');
const trackName = document.getElementById('track-name');
const timeElapsed = document.getElementById('time-elapsed');
const progressoBar = document.querySelector('.progresso-bar');
const progressIndicator = document.getElementById('progress-indicator');

playPauseButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseButton.classList.add('playing');
  } else {
    audio.pause();
    playPauseButton.classList.remove('playing');
  }
});

audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  document.getElementById('progresso').style.width = progress + '%';
  progressIndicator.style.left = progress + '%';

  const minutesElapsed = Math.floor(audio.currentTime / 60);
  const secondsElapsed = Math.floor(audio.currentTime % 60);
  const minutesTotal = Math.floor(audio.duration / 60);
  const secondsTotal = Math.floor(audio.duration % 60);
  timeElapsed.textContent =
      `${minutesElapsed}:${secondsElapsed < 10 ? '0' : ''}${secondsElapsed}` +
      ` / ${minutesTotal}:${secondsTotal < 10 ? '0' : ''}${secondsTotal}`;
});

let isDragging = false;

progressIndicator.addEventListener('mousedown', () => {
  isDragging = true;
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    const barWidth = progressoBar.clientWidth;
    const newProgress = (event.clientX - progressoBar.getBoundingClientRect().left) / barWidth;
    audio.currentTime = newProgress * audio.duration;
  }
});

document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const barWidth = progressoBar.clientWidth;
    const newProgress = (event.clientX - progressoBar.getBoundingClientRect().left) / barWidth;
    progressIndicator.style.left = `${Math.min(100, Math.max(0, newProgress * 100))}%`;
  }
});

progressoBar.addEventListener('click', (event) => {
  const barWidth = progressoBar.clientWidth;
  const newProgress = (event.clientX - progressoBar.getBoundingClientRect().left) / barWidth;
  audio.currentTime = newProgress * audio.duration;
});

const playlist = [
  { name: 'chamber of reflection', src: '/assets/images/music/chamber of reflection - sped up_hVf6EIWSCKQ.mp3' },
  { name: 'Space Song', src: '/assets/images/music/space song.mp3' },
  { name: 'Swing Lynn', src: '/assets/images/music/Swing Lynn.mp3' },
];

let currentTrackIndex = 0;

function playCurrentTrack() {
  audio.src = playlist[currentTrackIndex].src;
  audio.currentTime = 0;
  trackName.textContent = playlist[currentTrackIndex].name;
  audio.play(); 
  playPauseButton.classList.add('playing');
}

audio.addEventListener('ended', () => {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  playCurrentTrack();
});

playCurrentTrack();
