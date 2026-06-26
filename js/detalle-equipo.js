let paginaActual = 1;
const jugadoresPorPagina = 10;

function renderizarDetalleEquipo() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const equipo = equipos.find(e => e.id == id);

    paginaActual = Math.min(paginaActual, Math.ceil(equipo.jugadores.length / jugadoresPorPagina));

    const main = document.getElementById("detalle-equipo");
    main.classList.add("detalle-equipo");
    main.innerHTML = "";

    if (!equipo) {
        main.innerText = "Equipo no encontrado";
        return;
    }

    const volverLink = document.createElement("a");
    volverLink.href = "../equipo/equipo.html";
    volverLink.classList.add("volver-link");
    volverLink.innerHTML = `<i class="fa-solid fa-chevron-left"></i> Volver a equipos`;
    main.appendChild(volverLink);

    const cabecera = document.createElement("section");
    cabecera.classList.add("cabecera-equipo");

    // * Contenedor Escudo div * // 
    const contenedorEscudo = document.createElement("div");
    contenedorEscudo.classList.add("contenedor-escudo");

    // * Imagen Escudo  * //
    const imgEscudo = document.createElement("img");
    imgEscudo.classList.add("img-escudo");
    imgEscudo.src = corregirRutaImagen(equipo.escudo);
    imgEscudo.alt = equipo.alt;
    
    // * anido la imagen en el div * // 
    contenedorEscudo.appendChild(imgEscudo);


    // * div * que contiene el nombre y descripcion del equipo // 
    const contenedorInfo = document.createElement("div");
    contenedorInfo.classList.add("contenedor-info");

    const titulo = document.createElement("h1");
    titulo.classList.add("titulo");
    titulo.innerText = equipo.nombre;

    const infoFila = document.createElement("div");
    infoFila.classList.add("info-fila");
    infoFila.innerHTML = `<span><i class="fa-solid fa-trophy"></i> ${equipo.liga ?? "Liga Profesional"}</span>
        <span><i class="fa-solid fa-flag"></i> ${equipo.pais}</span>
        <span><i class="fa-regular fa-calendar"></i> Fundado el ${equipo.fundacionClub}</span>
        <span><i class="fa-solid fa-location-dot"></i> ${equipo.ubicacion}</span>`;
    

    const descripcion = document.createElement("p");
    descripcion.classList.add("descripcion");
    descripcion.innerText = equipo.descripcion;

    contenedorInfo.appendChild(titulo);
    contenedorInfo.appendChild(infoFila);
    contenedorInfo.appendChild(descripcion);

    const contenido = document.createElement("section");
    contenido.classList.add("contenido-equipo");


    // * Estadio * //
    const contenedorEstadio = document.createElement("section");
    contenedorEstadio.classList.add("contenedor-estadio");

    const tituloEstadio = document.createElement("h2");
    tituloEstadio.innerHTML = `<i class="fa-solid fa-building"></i> Estadio`;

    const contenedorImg = document.createElement("div");
    contenedorImg.classList.add("contenedor-img");

    const imgEstadio = document.createElement("img");
    imgEstadio.classList.add("img-estadio");
    imgEstadio.src = equipo.estadio;
    imgEstadio.alt = "Imagen Estadio";
    
    contenedorImg.appendChild(imgEstadio);

    const nombreEstadio = document.createElement("p");
    nombreEstadio.innerHTML = `<i class="fa-solid fa-building"></i> <b>Nombre:</b> ${equipo.nombreEstadio}`;

    const capacidadEstadio = document.createElement("p");
    capacidadEstadio.innerHTML =`<i class="fa-solid fa-users"></i> <b>Capacidad:</b> ${equipo.capacidad}`;

    const fundacionEstadio = document.createElement("p");
    fundacionEstadio.innerHTML = `<i class="fa-regular fa-calendar"></i> <b>Fundacion:</b> ${equipo.fundacionEstadio}`;

    const ciudadEstadio = document.createElement("p");
    ciudadEstadio.innerHTML = `<i class="fa-solid fa-location-dot"></i> <b>Ubicacion:</b> ${equipo.ubicacion}`;

    contenedorEstadio.append(tituloEstadio, contenedorImg, nombreEstadio, capacidadEstadio, fundacionEstadio,ciudadEstadio)

    // * PLANTEL * // 
    const plantel = document.createElement("section");
    plantel.classList.add("plantel");

    const cabeceraPlantel = document.createElement("div");
    cabeceraPlantel.classList.add("cabecera-plantel");

    const tituloPlantel = document.createElement("h2");
    tituloPlantel.innerHTML = `<i class="fa-solid fa-users"></i> Plantel`;

    const buscador = document.createElement("input");
    buscador.type = "text";
    buscador.placeholder = "Buscar jugador...";
    buscador.classList.add("buscador-jugador");

    cabeceraPlantel.append(tituloPlantel, buscador);

    const tabla = document.createElement("table");
    tabla.classList.add("tabla-plantilla");

    const filaTitulos = document.createElement("tr");
    ["Nº", "Posición", "Jugador", "Edad", "Nacionalidad"].forEach(texto => {
        const th = document.createElement("th");
        th.innerText = texto;
        filaTitulos.appendChild(th);
    });

    const thead = document.createElement("thead");
    thead.appendChild(filaTitulos);
    tabla.appendChild(thead);

    const tbody = document.createElement("tbody");

    const inicio = (paginaActual - 1) * jugadoresPorPagina;
    const fin = inicio + jugadoresPorPagina
    const jugadoresPagina = equipo.jugadores.slice(inicio, fin);

    jugadoresPagina.forEach(jugador => {
        const fila = document.createElement("tr");

        const numero = document.createElement("td");
        numero.innerText = jugador.id ?? "-";

        const posicion = document.createElement("td");
        posicion.innerText = jugador.posicion;

        const nombre = document.createElement("td");
        nombre.innerText = jugador.nombre;

        const edad = document.createElement("td");
        edad.innerText = jugador.edad;

        const nacionalidad = document.createElement("td");
        const codigoPais  = obtenerCodigoPais(jugador.nacionalidad)
        nacionalidad.innerHTML = `<img src="https://flagcdn.com/24x18/${codigoPais}.png" alt="${jugador.nacionalidad}"> ${jugador.nacionalidad}`;

        fila.append(numero, posicion, nombre, edad, nacionalidad);
        tbody.appendChild(fila);
    })

    tabla.appendChild(tbody);

    cabecera.append( contenedorEscudo, contenedorInfo)
    contenido.append(contenedorEstadio, plantel);

    main.appendChild(volverLink);
    main.append(cabecera, contenido);

    renderizarPaginacion(equipo);

    plantel.append(cabeceraPlantel,tabla,paginacion);

    buscador.addEventListener("keyup", () => {
        const texto = buscador.value.toLowerCase();
        tabla.querySelectorAll("tr").forEach((fila, index) => {
            if(index === 0) return;

            const nombreJugador = fila.children[2].textContent.toLowerCase();
            fila.style.display = nombreJugador.includes(texto)? "" : "none";
        });
    });
}

const paginacion = document.createElement("div");
paginacion.classList.add("paginacion");

function renderizarPaginacion(equipo) {

    console.log("Equipo recibido:", equipo);


    paginacion.innerHTML = "";

    const totalPaginas = Math.ceil(equipo.jugadores.length /jugadoresPorPagina);

    const btnAnterior = document.createElement("button");

    btnAnterior.innerText = "←";

    btnAnterior.disabled =
        paginaActual === 1;

    btnAnterior.onclick = () => {

        paginaActual--;

        renderizarDetalleEquipo();

    };

    paginacion.appendChild(btnAnterior);

    for(let i = 1; i <= totalPaginas; i++) {

        const btn =
            document.createElement("button");

        btn.innerText = i;

        if(i === paginaActual) {
            btn.classList.add("activo");
        }

        btn.onclick = () => {

            paginaActual = i;

            renderizarDetalleEquipo();
        };

        paginacion.appendChild(btn);
    }

    const btnSiguiente =
        document.createElement("button");

    btnSiguiente.innerText = "→";

    btnSiguiente.disabled =
        paginaActual === totalPaginas;

    btnSiguiente.onclick = () => {

        paginaActual++;

        renderizarDetalleEquipo();
    };

    paginacion.appendChild(btnSiguiente);
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