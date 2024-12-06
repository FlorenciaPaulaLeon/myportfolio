

// Seleccionamos el reproductor de audio
const audioPlayer = document.querySelector('#audioPlayer');

// Función para reproducir el audio
function playAudio() {
   audioPlayer.play();
}

// Función para pausar el audio
function pauseAudio() {
   audioPlayer.pause();
}

// Agregar un evento para escuchar cuando el audio se reproduzca
audioPlayer.addEventListener('play', playAudio);

// Agregar un evento para escuchar cuando el audio se pause
audioPlayer.addEventListener('pause', pauseAudio);
