let cartasTablero = []; // Cartas mezcladas en el tablero
let cartasSeleccionadas = []; // Cartas seleccionadas por el jugador actual

function iniciarJuegoMemoria() {
    nombreJugador1 = prompt('Ingrese el nombre del Jugador 1:');
    nombreJugador2 = prompt('Ingrese el nombre del Jugador 2:');

    if (!nombreJugador1 || !nombreJugador2) {
        alert('Por favor, ingrese nombres válidos.');
        return;
    }

    // Reiniciar variables
    puntosJugador1 = 0;
    puntosJugador2 = 0;
    rondaActual = 0;
    turnoJugador = 1;
    cartasSeleccionadas = [];

    // Crear el tablero
    cartasTablero = generarCartasMezcladas();
    mostrarTablero();

    document.querySelector('#resultadoTurno').textContent = `${nombreJugador1}: 0 puntos - ${nombreJugador2}: 0 puntos`;
    document.querySelector('#btnStart').style.display = 'none';
}

function generarCartasMezcladas() {
    const pares = [
        { valor: 'logo1.jpg', pareja: 'logo2.jpg' },
        { valor: 'logo2.jpg', pareja: 'logo1.jpg' },
        { valor: 'logo3.jpg', pareja: 'logo4.jpg' },
        { valor: 'logo4.jpg', pareja: 'logo3.jpg' },
        { valor: 'logo5.jpg', pareja: 'logo6.jpg' },
        { valor: 'logo6.jpg', pareja: 'logo5.jpg' }
    ];

    return pares.sort(() => Math.random() - 0.5); // Mezclar aleatoriamente
}

let turnoJugador = 1; // Inicializamos el turno con el Jugador 1

function cambiarTurno() {
    turnoJugador = turnoJugador === 1 ? 2 : 1; // Cambia entre 1 y 2
    const nombreTurno = turnoJugador === 1 ? nombreJugador1 : nombreJugador2;

    // Actualiza el mensaje en la pantalla para indicar de quién es el turno
    document.querySelector('#turnoActual').textContent = `Turno de: ${nombreTurno}`;
}

let rondaActual = 1; // Contador de rondas

function siguienteRonda() {
    rondaActual++;

    // Reiniciar tablero pero mantener puntajes y turno
    cartasTablero = generarCartasMezcladas();
    mostrarTablero();
    cartasSeleccionadas = [];

    // Desactivar el botón de "Siguiente Ronda"
    document.querySelector('#btnNextRound').disabled = true;

    // Actualizar información en pantalla
    document.querySelector('#resultadoTurno').textContent = `${nombreJugador1}: ${puntosJugador1} puntos - ${nombreJugador2}: ${puntosJugador2} puntos`;
    document.querySelector('#rondaActual').textContent = `Ronda: ${rondaActual}`;
}

function verificarPareja() {
    const [index1, index2] = cartasSeleccionadas;
    const carta1 = cartasTablero[index1];
    const carta2 = cartasTablero[index2];

    if (carta1.pareja === carta2.valor) {
        actualizarPuntaje();
        carta1.descubierta = true;
        carta2.descubierta = true;

        // Si todas las cartas están descubiertas, habilitar el botón de "Siguiente Ronda"
        if (cartasTablero.every(carta => carta.descubierta)) {
            document.querySelector('#btnNextRound').disabled = false;
        }
    } else {
        ocultarCarta(index1);
        ocultarCarta(index2);
        cambiarTurno();
    }

    cartasSeleccionadas = [];
}

function mostrarTablero() {
    const tablero = document.querySelector('#tablero');
    tablero.innerHTML = ''; // Limpiar tablero

    cartasTablero.forEach((carta, index) => {
        const cartaElemento = document.createElement('div');
        cartaElemento.classList.add('carta');
        cartaElemento.dataset.index = index;

        // Crear una imagen oculta por defecto
        const imgElemento = document.createElement('img');
        imgElemento.src = 'img/reverso.jpg'; // Imagen de reverso
        imgElemento.classList.add('reverso');

        cartaElemento.appendChild(imgElemento);
        cartaElemento.addEventListener('click', () => seleccionarCarta(index));
        tablero.appendChild(cartaElemento);
    });
}

function mostrarCarta(index) {
    const cartaElemento = document.querySelector(`.carta[data-index="${index}"] img`);
    cartaElemento.src = `img/${cartasTablero[index].valor}`; // Mostrar imagen
    cartaElemento.classList.add('descubierta');
}

function ocultarCarta(index) {
    const cartaElemento = document.querySelector(`.carta[data-index="${index}"] img`);
    cartaElemento.src = 'img/reverso.jpg'; // Ocultar imagen
    cartaElemento.classList.remove('descubierta');
}


function seleccionarCarta(index) {
    const carta = cartasTablero[index];

    // No permitir seleccionar más de 2 cartas o cartas ya descubiertas
    if (cartasSeleccionadas.length < 2 && !carta.descubierta) {
        cartasSeleccionadas.push(index);
        mostrarCarta(index);

        if (cartasSeleccionadas.length === 2) {
            setTimeout(verificarPareja, 1000); // Espera para mostrar ambas cartas
        }
    }
}


function actualizarPuntaje() {
    if (turnoJugador === 1) {
        puntosJugador1++;
    } else {
        puntosJugador2++;
    }
    document.querySelector('#resultadoTurno').textContent = `${nombreJugador1}: ${puntosJugador1} puntos - ${nombreJugador2}: ${puntosJugador2} puntos`;
}

function finalizarJuego() {
    const mensaje = puntosJugador1 > puntosJugador2
        ? `${nombreJugador1} gana con ${puntosJugador1} puntos!`
        : puntosJugador1 < puntosJugador2
        ? `${nombreJugador2} gana con ${puntosJugador2} puntos!`
        : 'Es un empate!';
        
    alert(mensaje);
    document.querySelector('#btnStart').style.display = 'inline-block';
}

document.querySelector('#btnStart').addEventListener('click', iniciarJuegoMemoria);
document.querySelector('#btnNextRound').addEventListener('click', siguienteRonda);
