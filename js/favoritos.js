// ============================================================
// ARCHIVO: favoritos.js
// PROPÓSITO: Manejar la lógica de "Favoritos" en la página de
//            equipos (equipo.html). Permite al usuario marcar y
//            desmarcar equipos como favoritos con un clic,
//            guardando la selección en localStorage para que
//            persista entre recargas de la página.
// ============================================================


// ============================================================
// 1. FUNCIÓN PARA OBTENER LOS FAVORITOS DESDE localStorage
// ============================================================
// Esta función lee la clave 'favoritos' del almacenamiento local.
// Si existe, convierte el string JSON a un array de objetos JS.
// Si no existe (primera vez), devuelve un array vacío [].

function obtenerFavoritosDeStorage() {
    // localStorage.getItem('favoritos') devuelve un STRING o null
    const datosGuardados = localStorage.getItem('favoritos');

    // Si datosGuardados es null (no hay nada guardado), devolvemos []
    if (datosGuardados === null) {
        return []; // Array vacío = no hay favoritos todavía
    }

    // JSON.parse() convierte el string JSON a un array de objetos de JS
    // Ejemplo: '[{"id":1,"nombre":"River"}]' → [{id:1, nombre:"River"}]
    return JSON.parse(datosGuardados);
}


// ============================================================
// 2. FUNCIÓN PARA GUARDAR LOS FAVORITOS EN localStorage
// ============================================================
// Recibe un array de objetos y lo guarda como string JSON
// en localStorage bajo la clave 'favoritos'.

function guardarFavoritosEnStorage(arrayDeFavoritos) {
    // JSON.stringify() convierte el array de JS a un string JSON
    // Ejemplo: [{id:1, nombre:"River"}] → '[{"id":1,"nombre":"River"}]'
    const datosComoTexto = JSON.stringify(arrayDeFavoritos);

    // localStorage.setItem() guarda el string en el navegador
    // Primer parámetro: la "clave" (nombre) con la que guardamos
    // Segundo parámetro: el "valor" (el string que acabamos de crear)
    localStorage.setItem('favoritos', datosComoTexto);
}


// ============================================================
// 3. FUNCIÓN PARA VERIFICAR SI UN EQUIPO YA ES FAVORITO
// ============================================================
// Busca dentro del array de favoritos si existe un equipo
// con el mismo 'id'. Devuelve true o false.

function esFavorito(idDelEquipo) {
    // Obtenemos el array actual de favoritos desde localStorage
    const listaFavoritos = obtenerFavoritosDeStorage();

    // .some() recorre el array y devuelve true si ALGÚN elemento
    // cumple la condición (que su id coincida con el que buscamos)
    const yaExiste = listaFavoritos.some(function (favorito) {
        return favorito.id === idDelEquipo;
    });

    return yaExiste; // true si ya es favorito, false si no lo es
}


// ============================================================
// 4. FUNCIÓN PRINCIPAL: ALTERNAR FAVORITO (agregar o quitar)
// ============================================================
// Esta función se ejecuta cuando el usuario hace CLIC en el
// botón de estrella. Alterna el estado: si ya es favorito lo
// quita, y si no lo es, lo agrega.

function alternarFavorito(equipoObjeto, botonEstrella) {
    // Paso 1: Leemos los favoritos actuales del localStorage
    let listaFavoritos = obtenerFavoritosDeStorage();

    // Paso 2: Buscamos si este equipo ya está en la lista
    // .findIndex() devuelve la POSICIÓN del elemento en el array,
    // o -1 si no lo encuentra
    const indiceEncontrado = listaFavoritos.findIndex(function (favorito) {
        return favorito.id === equipoObjeto.id;
    });

    // Paso 3: Decidimos qué hacer según si ya existe o no
    if (indiceEncontrado !== -1) {
        // --- CASO A: El equipo YA era favorito → lo QUITAMOS ---

        // .splice(posición, cantidad) elimina elementos del array
        // Eliminamos 1 elemento en la posición donde lo encontramos
        listaFavoritos.splice(indiceEncontrado, 1);

        // Cambiamos el estilo visual del botón: quitamos la clase 'favorito-activo'
        // classList.remove() quita una clase CSS del elemento HTML
        botonEstrella.classList.remove('favorito-activo');

        // También podemos cambiar el texto del botón para que diga "Añadir"
        botonEstrella.innerHTML = '☆ Añadir a Favoritos';

    } else {
        // --- CASO B: El equipo NO era favorito → lo AGREGAMOS ---

        // Creamos un objeto con las propiedades básicas que queremos guardar
        // (no guardamos TODO el equipo, solo lo necesario)
        const nuevoFavorito = {
            id: equipoObjeto.id,           // Identificador único del equipo
            nombre: equipoObjeto.nombre,   // Nombre del equipo (ej: "River Plate")
            pais: equipoObjeto.pais,       // País del equipo (ej: "Argentina")
            liga: equipoObjeto.liga || 'Sin liga especificada', // Liga (con valor por defecto)
            imagen: equipoObjeto.escudo    // URL del escudo/imagen
        };

        // .push() agrega el nuevo objeto al final del array
        listaFavoritos.push(nuevoFavorito);

        // Cambiamos el estilo visual: agregamos la clase 'favorito-activo'
        // classList.add() agrega una clase CSS al elemento HTML
        botonEstrella.classList.add('favorito-activo');

        // Cambiamos el texto del botón para indicar que ya está marcado
        botonEstrella.innerHTML = '★ Favorito';
    }

    // Paso 4: Guardamos el array actualizado en localStorage
    guardarFavoritosEnStorage(listaFavoritos);
}


// ============================================================
// 5. FUNCIÓN PARA CREAR EL BOTÓN DE ESTRELLA EN CADA TARJETA
// ============================================================
// Esta función crea un elemento <button> con el ícono de estrella,
// lo configura con el evento click, y lo devuelve listo para
// insertarlo en la tarjeta del equipo.

function crearBotonFavorito(equipoObjeto) {
    // Creamos un elemento <button> en el DOM
    const botonEstrella = document.createElement('button');

    // Le asignamos la clase CSS base para darle estilo
    botonEstrella.classList.add('boton-favorito');

    // Verificamos si este equipo ya es favorito (al cargar la página)
    // para mostrar el botón en el estado correcto desde el inicio
    if (esFavorito(equipoObjeto.id)) {
        // Si YA es favorito, le ponemos la clase activa y el texto "★ Favorito"
        botonEstrella.classList.add('favorito-activo');
        botonEstrella.innerHTML = '★ Favorito';
    } else {
        // Si NO es favorito, mostramos el texto "☆ Añadir a Favoritos"
        botonEstrella.innerHTML = '☆ Añadir a Favoritos';
    }

    // --- EVENTO DE MOUSE: CLICK ---
    // Cuando el usuario haga clic en este botón, se ejecuta alternarFavorito()
    botonEstrella.addEventListener('click', function (evento) {
        // evento.stopPropagation() evita que el clic "suba" al elemento padre
        // (para que no se active el hover de la tarjeta al mismo tiempo)
        evento.stopPropagation();

        // Llamamos a la función que agrega o quita el favorito
        alternarFavorito(equipoObjeto, botonEstrella);
    });

    // --- EVENTO DE MOUSE: MOUSEENTER (cuando el ratón entra al botón) ---
    // Agregamos un efecto visual sutil al pasar el mouse por encima
    botonEstrella.addEventListener('mouseenter', function () {
        // Modificamos el estilo directamente con element.style.propiedadCss
        botonEstrella.style.transform = 'scale(1.1)';
    });

    // --- EVENTO DE MOUSE: MOUSELEAVE (cuando el ratón sale del botón) ---
    // Restauramos el tamaño original cuando el mouse se va
    botonEstrella.addEventListener('mouseleave', function () {
        botonEstrella.style.transform = 'scale(1)';
    });

    // Devolvemos el botón ya configurado para que se pueda agregar a la tarjeta
    return botonEstrella;
}
