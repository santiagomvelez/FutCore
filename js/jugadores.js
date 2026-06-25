function renderizarJugadores(listaEquipos) {
    const div = document.getElementById("main-jugadores");
    div.innerHTML = "";

    listaEquipos.forEach(equipo => {
        const soloJugadores= equipo.jugadores.filter(jugador => jugador.posicion !== "Entrenador" && jugador.posicion !== "Asistente tecnico");

        soloJugadores.forEach(jugador => {
            const card = document.createElement("div");
            card.classList.add("card-jugador");

            const codigoPais = obtenerCodigoPais(jugador.nacionalidad);

            card.innerHTML = `
                <div class="card-jugador-header">
                    <span class="jugador-numero">${jugador.id ?? "-"}</span>
                    <span class="jugador-posicion">${jugador.posicion}</span>
                </div>
                <div class="card-jugador-body">
                    <h3 class="jugador-nombre">${jugador.nombre}</h3>
                    <p class="jugador-edad"><i class="fa-solid fa-cake-candles"></i> ${jugador.edad} años</p>
                    <p class="jugador-nacionalidad">
                        <img src="https://flagcdn.com/24x18/${codigoPais}.png" alt="${jugador.nacionalidad}">
                        ${jugador.nacionalidad}
                    </p>
                    <p class="jugador-equipo">
                        <img src="${equipo.escudo}" alt="${equipo.alt}" class="escudo-mini">
                        ${equipo.nombre}
                    </p>
                </div>
            `;

            div.appendChild(card);
        });
    });
}

function obtenerCodigoPais(pais) {
    const paises = {
        "Argentina": "ar", "Uruguay": "uy", "Brasil": "br", "Colombia": "co",
        "Chile": "cl", "Ecuador": "ec", "Paraguay": "py", "España": "es",
        "Francia": "fr", "Alemania": "de", "Italia": "it", "Inglaterra": "gb-eng",
        "Portugal": "pt", "Polonia": "pl", "Dinamarca": "dk", "Países Bajos": "nl",
        "Bélgica": "be", "Austria": "at", "Croacia": "hr", "Turquía": "tr",
        "Ucrania": "ua", "Rusia": "ru", "Georgia": "ge", "Noruega": "no",
        "Suecia": "se", "Senegal": "sn", "Nigeria": "ng", "Marruecos": "ma",
        "México": "mx", "Estados Unidos": "us", "Canadá": "ca", "Japón": "jp",
        "Corea del Sur": "kr", "Suiza": "ch", "Serbia": "rs", "Eslovenia": "si",
        "Eslovaquia": "sk", "Rumania": "ro", "Armenia": "am", "Ghana": "gh",
        "Costa de Marfil": "ci", "Camerún": "cm", "Argelia": "dz", "Uzbekistán": "uz",
        "Egipto": "eg"
    };
    return paises[pais] ?? "un";
}

document.getElementById("search").addEventListener("input", function() {
    const q = this.value.toLowerCase().trim();
    const filtrados = equipos.map(equipo => ({
        ...equipo,
        jugadores: equipo.jugadores.filter(j =>
            j.posicion !== "Entrenador" && j.posicion !== "Asistente tecnico" && (

            j.nombre.toLowerCase().includes(q) ||
            j.posicion.toLowerCase().includes(q) ||
            j.nacionalidad.toLowerCase().includes(q) ||
            equipo.nombre.toLowerCase().includes(q)
            )
        )
    })).filter(equipo => equipo.jugadores.length > 0);

    renderizarJugadores(filtrados);
});

function cargarOpcionesEquipos() {
    const selectEquipo = document.getElementById("filtro-equipo");
    if (!selectEquipo) return; 

    equipos.forEach(equipo => {
        const option = document.createElement("option");
        option.value = equipo.nombre;
        option.textContent = equipo.nombre;
        selectEquipo.appendChild(option);
    });
}

function aplicarFiltros() {
    // Leemos qué dice el buscador y qué dice el select
    const q = document.getElementById("search").value.toLowerCase().trim();
    const equipoSeleccionado = document.getElementById("filtro-equipo").value;

    const filtrados = equipos.map(equipo => ({
        ...equipo,
        jugadores: equipo.jugadores.filter(j => {
            // A. Filtro para sacar técnicos (la misma de antes)
            const esJugador = j.posicion !== "Entrenador" && j.posicion !== "Asistente tecnico";
            if (!esJugador) return false;

            // B. Filtro del Select (Si dice "todos" pasa de largo, sino tiene que ser igual al equipo)
            const coincideEquipo = equipoSeleccionado === "todos" || equipo.nombre === equipoSeleccionado;

            // C. Filtro del buscador de texto
            const coincideTexto = j.nombre.toLowerCase().includes(q) ||
                                  j.posicion.toLowerCase().includes(q) ||
                                  j.nacionalidad.toLowerCase().includes(q) ||
                                  equipo.nombre.toLowerCase().includes(q);

            // Solo mostramos al jugador si cumple B y C al mismo tiempo
            return coincideEquipo && coincideTexto;
        })
    })).filter(equipo => equipo.jugadores.length > 0);

    renderizarJugadores(filtrados);
}

// 3. Conectamos los "escuchadores" a la función maestra
const inputBuscador = document.getElementById("search");
const selectFiltro = document.getElementById("filtro-equipo");

if (inputBuscador) {
    inputBuscador.addEventListener("input", aplicarFiltros);
}
if (selectFiltro) {
    selectFiltro.addEventListener("change", aplicarFiltros);
}

// 4. Ejecutamos la carga inicial cuando arranca la página
window.addEventListener("load", () => {
    cargarOpcionesEquipos();
    renderizarJugadores(equipos); // Para que de entrada se vean todos (sin técnicos)
});