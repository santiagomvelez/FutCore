

function renderizarGrilla(lista) {
    const div = document.getElementById("div-placeholder");

    if (!div) return;

    div.classList.add("contenedor-items");
    div.innerHTML = "";

    
    lista.forEach(equipo => {
        const seccionCards = document.createElement("section");
        seccionCards.classList.add("card-paises");
        

        const escudoImagen = document.createElement("img");
        escudoImagen.src = corregirRutaImagen(equipo.escudo);
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

/*inputBusqueda.addEventListener("keyup", (e) => {
    const textoBuscado = e.target.value.toLowerCase();

    const equipoFiltrado = equipos.filter(equipo =>
        equipo.nombre.toLowerCase().includes(textoBuscado) ||
        equipo.pais.toLowerCase().includes(textoBuscado) ||
        (equipo.liga && equipo.liga.toLowerCase().includes(textoBuscado))
    );

    renderizarGrilla(equipoFiltrado);
});*/

function cargarOpcionesFiltros() {
    const selectPais = document.getElementById("filtro-pais");

    // A. Llenamos el select de Países (sin repetir)
    if (selectPais) {
        // Obtenemos todos los países, usamos Set para eliminar repetidos y sort() para ordenarlos de la A a la Z
        const paisesUnicos = [...new Set(equipos.map(eq => eq.pais))].sort();
        
        paisesUnicos.forEach(pais => {
            const option = document.createElement("option");
            option.value = pais;
            option.textContent = pais;
            selectPais.appendChild(option);
        });
    }
}


function aplicarFiltros() {
    const q = document.getElementById("search").value.toLowerCase().trim();
    
    // Usamos 'todos' como valor por defecto por si algún select no existe en la página
    const paisSeleccionado = document.getElementById("filtro-pais") ? document.getElementById("filtro-pais").value : "todos";


    // Filtramos el array de equipos original
    const filtrados = equipos.filter(equipo => {
        // A. Filtro del Select de País
        const coincidePais = paisSeleccionado === "todos" || equipo.pais === paisSeleccionado;


        // B. Filtro de Texto (Busca en nombre, país o liga)
        const coincideTexto = equipo.nombre.toLowerCase().includes(q) ||
                              equipo.pais.toLowerCase().includes(q) ||
                              (equipo.liga && equipo.liga.toLowerCase().includes(q));

        // Solo devuelve TRUE si el equipo cumple con LOS TRES filtros a la vez
        return coincidePais && coincideTexto;
    });

    // Renderizamos la grilla con los resultados
    renderizarGrilla(filtrados);
}

// ============================================================
// 4. INICIALIZACIÓN Y EVENTOS
// ============================================================
// Atrapamos los elementos del HTML
const inputBusqueda = document.getElementById("search");
const selectPais = document.getElementById("filtro-pais");


// Les pegamos los escuchadores apuntando a la función maestra
// Nota: Usamos "input" en vez de "keyup" para detectar también cuando borran con la crucecita o pegan con el mouse
if (inputBusqueda) inputBusqueda.addEventListener("input", aplicarFiltros);
if (selectPais) selectPais.addEventListener("change", aplicarFiltros);


// Cuando la página termina de cargar, llenamos los combos y dibujamos todo
window.addEventListener("load", () => {
    cargarOpcionesFiltros();
    renderizarGrilla(equipos); 
});
