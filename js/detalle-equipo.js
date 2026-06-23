function renderizarDetalleEquipo() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const equipo = equipos.find(e => e.id == id);

    const main = document.querySelector("main");
    main.innerHTML = "";

    if (!equipo) {
        main.innerText = "Equipo no encontrado";
        return;
    }

    // * Contenedor Escudo div * // 
    const contenedorEscudo = document.createElement("div");
    contenedorEscudo.classList.add("contenedor-escudo");

    // * Imagen Escudo  * //
    const imgEscudo = document.createElement("img");
    imgEscudo.classList.add("img-escudo");
    imgEscudo.src = equipo.escudo;
    imgEscudo.alt = equipo.alt;
    
    // * anido la imagen en el div * // 
    contenedorEscudo.appendChild(imgEscudo);


    // * div * que contiene el nombre y descripcion del equipo // 
    const contenedorInfo = document.createElement("div");
    contenedorInfo.classList.add("contenedor-info");

    const titulo = document.createElement("h1");
    titulo.classList.add("titulo");
    titulo.innerText = equipo.nombre;

    const descripcion = document.createElement("p");
    descripcion.classList.add("descripcion");
    descripcion.innerText = equipo.descripcion;

    contenedorInfo.appendChild(titulo);
    contenedorInfo.appendChild(descripcion);

    // * Estadio * //
    const contenedorEstadio = document.createElement("section");
    contenedorEstadio.classList.add("contenedor-estadio");

    const tituloEstadio = document.createElement("h2");
    tituloEstadio.innerText = "Estadio";

    const contenedorImg = document.createElement("div");
    contenedorImg.classList.add("contenedor-img");

    const imgEstadio = document.createElement("img");
    imgEstadio.classList.add("img-estadio");
    imgEstadio.src = equipo.estadio;
    imgEstadio.alt = "Imagen Estadio";
    
    contenedorImg.appendChild(imgEstadio);

    const nombreEstadio = document.createElement("p");
    nombreEstadio.innerHTML = "<b>Nombre del Estadio:</b> " + equipo.nombreEstadio;

    const capacidadEstadio = document.createElement("p");
    capacidadEstadio.innerHTML = "<b>Capacidad:</b> " + equipo.nombreEstadio;

    const fundacionEstadio = document.createElement("p");
    fundacionEstadio.innerHTML = "<b>Fundacion:</b> " + equipo.fundacion;

    const ciudadEstadio = document.createElement("p");
    ciudadEstadio.innerHTML = "<b>Ubicacion:</b> " + equipo.ubicacion;

    contenedorEstadio.append(tituloEstadio, contenedorImg, nombreEstadio, capacidadEstadio, fundacionEstadio,ciudadEstadio)


    // * PLANTEL * // 

    const plantel = document.createElement("section");
    plantel.classList.add("plantel");

    const tituloPlantel = document.createElement("h2");
    tituloPlantel.innerText = "Plantel";

    const tabla = document.createElement("table");
    tabla.classList.add("tabla-plantilla");

    const filaTitulos = document.createElement("tr");
    ["Numero", "Posición", "Nombre", "Edad", "Nacionalidad"].forEach(texto => {
        const th = document.createElement("th");
        th.innerText = texto;
        filaTitulos.appendChild.th;
    })

    tabla.appendChild(filaTitulos);

    equipo.jugadores.forEach(jugador => {
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
        nacionalidad.innerText = jugador.nacionalidad;

        fila.append(numero, posicion, nombre, edad, nacionalidad);
        tabla.appendChild(fila);
    })

    plantel.append(tituloPlantel, tabla);

    main.append(contenedorEscudo, contenedorInfo, contenedorEstadio, plantel);

}

