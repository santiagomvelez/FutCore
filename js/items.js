function renderizarGrilla(lista) {
    const main = document.getElementById("main-placeholder");
    main.classList.add("main");
    main.innerHTML = "";

    
    lista.forEach(equipo => {
        const seccionCards = document.createElement("section");
        seccionCards.classList.add("card-paises");
        

        const escudoImagen = document.createElement("img");
        escudoImagen.src = equipo.escudo;
        escudoImagen.alt = equipo.alt;
        escudoImagen.classList.add("img-bandera");

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
        verEquipo.href = "../equipo/equipo.html?id=" + equipo.id;
        verEquipo.classList.add("boton-conocer-mas");



        contenidoPaises.appendChild(tituloCard);
        contenidoPaises.appendChild(ligaEquipo);
        contenidoPaises.appendChild(paisEquipo);
        contenidoPaises.appendChild(verEquipo);

        seccionCards.append(escudoImagen, contenidoPaises);

        main.appendChild(seccionCards);
    });

}
