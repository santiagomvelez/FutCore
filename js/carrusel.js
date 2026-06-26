// La función que llamás desde el HTML
/* function renderizarCarrusel() {
    const pista = document.getElementById('pista');
    
    // Validamos que la pista exista en la página (para que no tire error en otras páginas)
    if (!pista) return;

    // 1. Array de datos
    const equiposDestacados = [
        { nombre: "River Plate", logo: "img/river.png" },
        { nombre: "Boca Juniors", logo: "img/boca.png" },
        { nombre: "Vélez Sarsfield", logo: "img/velez.png" },
        { nombre: "Barcelona", logo: "img/barcelona.png" } // Podés agregar más acá
    ];

    // 2. Limpiamos la pista por si acaso
    pista.innerHTML = "";

    // 3. Generamos las tarjetas dinámicamente
    equiposDestacados.forEach(equipo => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-carrusel");

        // Usamos template literals (` `) para escribir el HTML más fácil
        tarjeta.innerHTML = `
            <img src="${equipo.logo}" alt="${equipo.nombre}">
            <h3>${equipo.nombre}</h3>
        `;

        pista.appendChild(tarjeta);
    });

    // 4. Activamos los botones para mover el carrusel
    activarBotonesCarrusel(pista);
}

// Función auxiliar para los botones (se llama automáticamente desde la función de arriba)
function activarBotonesCarrusel(pista) {
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');

    if (!btnAnterior || !btnSiguiente) return;

    btnSiguiente.addEventListener('click', () => {
        // Busca la primera tarjeta para saber cuánto mide
        const primeraTarjeta = pista.querySelector('.tarjeta-carrusel');
        if (primeraTarjeta) {
            const anchoTarjeta = primeraTarjeta.offsetWidth;
            pista.scrollBy({ left: anchoTarjeta + 20, behavior: 'smooth' }); // +20 por el gap de CSS
        }
    });

    btnAnterior.addEventListener('click', () => {
        const primeraTarjeta = pista.querySelector('.tarjeta-carrusel');
        if (primeraTarjeta) {
            const anchoTarjeta = primeraTarjeta.offsetWidth;
            pista.scrollBy({ left: -(anchoTarjeta + 20), behavior: 'smooth' });
        }
    });
}  */


// ==================================================
// 1. FUNCIÓN PARA OBTENER ELEMENTOS AL AZAR
// ==================================================
function obtenerAleatorios(arrayOriginal, cantidad) {
    const copia = [...arrayOriginal];
    copia.sort(() => Math.random() - 0.5);
    return copia.slice(0, cantidad);
}

// ==================================================
// 2. FUNCIÓN FÁBRICA PARA CONSTRUIR CARRUSELES
// ==================================================
function construirCarrusel(datos, idPista, idBtnAnt, idBtnSig) {
    const pista = document.getElementById(idPista);
    if (!pista) return;

    pista.innerHTML = ""; 

    datos.forEach(item => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("carrusel-tarjeta"); 

        const textoExtra = item.extra ? `<p style="color: #666; font-size: 0.9rem; margin-top: 5px;">${item.extra}</p>` : "";

        tarjeta.innerHTML = `
            <img src="${corregirRutaImagen(item.imagen)}" alt="${item.nombre}">
            <h3>${item.nombre}</h3>
            ${textoExtra}
        `;

        pista.appendChild(tarjeta);
    });

    activarBotones(pista, idBtnAnt, idBtnSig);
}

function activarBotones(pista, idBtnAnt, idBtnSig) {
    const btnAnterior = document.getElementById(idBtnAnt);
    const btnSiguiente = document.getElementById(idBtnSig);

    if (!btnAnterior || !btnSiguiente) return;

    btnSiguiente.addEventListener('click', () => {
        const primeraTarjeta = pista.querySelector('.carrusel-tarjeta');
        if (primeraTarjeta) {
            const ancho = primeraTarjeta.offsetWidth;
            pista.scrollBy({ left: ancho + 20, behavior: 'smooth' });
        }
    });

    btnAnterior.addEventListener('click', () => {
        const primeraTarjeta = pista.querySelector('.carrusel-tarjeta');
        if (primeraTarjeta) {
            const ancho = primeraTarjeta.offsetWidth;
            pista.scrollBy({ left: -(ancho + 20), behavior: 'smooth' });
        }
    });
}

// ==================================================
// 3. LÓGICA PRINCIPAL (AL CARGAR LA PÁGINA)
// ==================================================
window.addEventListener("load", () => {
    
    // --- ARMADO DEL CARRUSEL DE EQUIPOS ---
    const equiposRandom = obtenerAleatorios(equipos, 4); // Tu array "equipos" original
    
    // Adaptamos los datos para que la fábrica los entienda
    const datosParaEquipos = equiposRandom.map(eq => ({
        nombre: eq.nombre,
        imagen: eq.escudo // Le decimos que use "escudo" como imagen
    }));
    
    construirCarrusel(datosParaEquipos, "pista-equipos", "btn-ant-equipos", "btn-sig-equipos");


    // --- ARMADO DEL CARRUSEL DE JUGADORES ---
    let todosLosJugadores = [];
    
    // Recorremos todos los equipos para sacar a los jugadores
    equipos.forEach(equipo => {
        if (equipo.jugadores) {
            equipo.jugadores.forEach(jugador => {
                // Filtramos para que no entren los DTs ni Asistentes
                if (jugador.posicion !== "Entrenador" && jugador.posicion !== "Asistente tecnico") {
                    todosLosJugadores.push({
                        nombre: jugador.nombre,
                        // Como no tienen foto en tu array, usamos un avatar genérico de internet
                        imagen: "https://cdn-icons-png.flaticon.com/512/149/149071.png", 
                        extra: `${jugador.posicion} - ${equipo.nombre}` // Mostramos posición y equipo
                    });
                }
            });
        }
    });

    // Mezclamos la bolsa gigante de jugadores y sacamos 4
    const jugadoresRandom = obtenerAleatorios(todosLosJugadores, 4);
    
    construirCarrusel(jugadoresRandom, "pista-jugadores", "btn-ant-jugadores", "btn-sig-jugadores");
});