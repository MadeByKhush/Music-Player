  const playBtn = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  const audio = document.getElementById('audio');

  let isPlaying = false;

  playBtn.addEventListener('click', () => {
    if (!isPlaying) {
      audio.play();
      playIcon.classList.remove('fa-play');
      playIcon.classList.add('fa-pause');
      isPlaying = true;
    } else {
      audio.pause();
      playIcon.classList.remove('fa-pause');
      playIcon.classList.add('fa-play');
      isPlaying = false;
    }
  });

