const inputBusqueda = document.getElementById("search");

function renderizarGrilla(lista) {
    const div = document.getElementById("div-placeholder");
    div.classList.add("contenedor-items");
    div.innerHTML = "";

    
    lista.forEach(equipo => {
        const seccionCards = document.createElement("section");
        seccionCards.classList.add("card-paises");
        

        const escudoImagen = document.createElement("img");
        escudoImagen.src = equipo.escudo;
        escudoImagen.alt = equipo.alt;
        escudoImagen.classList.add("img-bandera");

        // ============================================================
        // NUEVO: Creamos el botón de favorito para esta tarjeta
        // La función crearBotonFavorito() viene de favoritos.js
        // Le pasamos el objeto 'equipo' completo para que sepa
        // qué datos guardar en localStorage cuando hagan clic
        // ============================================================
        const botonDeFavorito = crearBotonFavorito(equipo);

        const contenidoPaises = document.createElement("div");
        contenidoPaises.classList.add("card-contenido-paises");

        const tituloCard = document.createElement("h2");
        tituloCard.innerText = "Equipo: " + equipo.nombre;
        tituloCard.classList.add("titulo-card-paises");

        const ligaEquipo = document.createElement("p");
        ligaEquipo.innerText = "Liga: " + equipo.liga;
        ligaEquipo.classList.add("card-info-paises-1");

        const paisEquipo = document.createElement("p");
        paisEquipo.innerText = "Pais: " + equipo.pais;
        paisEquipo.classList.add("card-info-paises-2");

        const verEquipo = document.createElement("a");
        verEquipo.innerText = "Ver más...";
        verEquipo.href = "../equipo/detalle-equipo.html?id=" + equipo.id;
        verEquipo.classList.add("boton-conocer-mas");



        contenidoPaises.appendChild(tituloCard);
        contenidoPaises.appendChild(ligaEquipo);
        contenidoPaises.appendChild(paisEquipo);
        contenidoPaises.appendChild(verEquipo);

        // ============================================================
        // NUEVO: Agregamos el botón de favorito a la tarjeta
        // Lo ponemos FUERA del overlay (contenidoPaises) para que
        // siempre sea visible, incluso sin hacer hover en la tarjeta
        // ============================================================
        seccionCards.append(escudoImagen, botonDeFavorito, contenidoPaises);

        div.appendChild(seccionCards);
    });

}

inputBusqueda.addEventListener("keyup", (e) => {
    const textoBuscado = e.target.value.toLowerCase();

    const equipoFiltrado = equipos.filter(equipo =>
        equipo.nombre.toLowerCase().includes(textoBuscado) ||
        equipo.pais.toLowerCase().includes(textoBuscado) ||
        (equipo.liga && equipo.liga.toLowerCase().includes(textoBuscado))
    );

    renderizarGrilla(equipoFiltrado);

});

