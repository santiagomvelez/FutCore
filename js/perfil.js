
// DOMContentLoaded espera a que el HTML este listo para buscar los elementos
document.addEventListener('DOMContentLoaded', function () {

    // Traemos el formulario y todos los inputs
    const formPerfil = document.getElementById('formPerfil');

    const perfilNombre = document.getElementById('perfilNombre');
    const perfilEmail = document.getElementById('perfilEmail');
    const perfilDni = document.getElementById('perfilDni');
    const perfilTelefono = document.getElementById('perfilTelefono');
    const perfilPosicion = document.getElementById('perfilPosicion');
    const perfilLiga = document.getElementById('perfilLiga');

    // Spans de error individuales debajo de cada input
    const perfilNombreError = document.getElementById('perfilNombreError');
    const perfilEmailError = document.getElementById('perfilEmailError');
    const perfilDniError = document.getElementById('perfilDniError');
    const perfilTelefonoError = document.getElementById('perfilTelefonoError');

    // Mensajes globales de error/exito
    const perfilError = document.getElementById('perfilError');
    const perfilExito = document.getElementById('perfilExito');


    // FUNCIONES DE VALIDACION CON REGEX
    // Cada regex usa .test() que devuelve true o false

    // ^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$ → permite letras (incluyendo acentos y ñ) y espacios
    // ^ = inicio, $ = fin, + = una o mas veces, \s = espacio
    function validarNombre(valor) {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return regex.test(valor);
    }

    // ^[^\s@]+@[^\s@]+\.[^\s@]+$ → formato texto@texto.texto
    function validarEmail(valor) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(valor);
    }

    // ^\d+$ → solo digitos numericos (0-9), uno o mas
    // \d es lo mismo que [0-9]
    function validarDni(valor) {
        const regex = /^\d+$/;
        return regex.test(valor);
    }

    // ^[\d\s\-\+]+$ → permite numeros (\d), espacios (\s), guiones (\-) y el signo mas (\+)
    // Ejemplo valido: +54 9 11 1234-5678
    function validarTelefono(valor) {
        const regex = /^[\d\s\-\+]+$/;
        return regex.test(valor);
    }


    // FUNCIONES AUXILIARES

    // Muestra un mensaje de error debajo del input
    function mostrarErrorCampo(span, mensaje, input) {
        span.textContent = mensaje;
        input.classList.add('input-error');
        input.classList.remove('input-valido');
    }

    // Limpia el error de un campo
    function limpiarErrorCampo(span, input) {
        span.textContent = '';
        input.classList.remove('input-error');
    }

    // Muestra un mensaje global de error
    function mostrarError(elemento, texto) {
        elemento.textContent = texto;
        elemento.classList.add('visible');
    }

    // Muestra un mensaje global de exito
    function mostrarExito(elemento, texto) {
        elemento.textContent = texto;
        elemento.classList.add('visible');
    }

    // Limpia todos los mensajes globales
    function limpiarMensajes() {
        perfilError.textContent = '';
        perfilError.classList.remove('visible');
        perfilExito.textContent = '';
        perfilExito.classList.remove('visible');
    }

    // Limpia todos los errores de todos los campos
    function limpiarTodosLosErrores() {
        const inputs = document.querySelectorAll('.auth-input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove('input-error');
            inputs[i].classList.remove('input-valido');
        }
        const spans = document.querySelectorAll('.campo-error');
        for (let i = 0; i < spans.length; i++) {
            spans[i].textContent = '';
        }
    }


    // CARGAR DATOS GUARDADOS AL ABRIR LA PAGINA
    // Si hay datos en localStorage los ponemos en los inputs

    function cargarDatosGuardados() {
        // localStorage.getItem trae datos guardados como texto
        const datosGuardados = localStorage.getItem('perfil');

        if (datosGuardados !== null) {
            // JSON.parse convierte el texto guardado a un objeto de JS
            const perfil = JSON.parse(datosGuardados);

            // Ponemos los valores en cada input (si existen en el objeto guardado)
            if (perfil.nombre) perfilNombre.value = perfil.nombre;
            if (perfil.email) perfilEmail.value = perfil.email;
            if (perfil.dni) perfilDni.value = perfil.dni;
            if (perfil.telefono) perfilTelefono.value = perfil.telefono;
            if (perfil.posicion) perfilPosicion.value = perfil.posicion;
            if (perfil.liga) perfilLiga.value = perfil.liga;
        }
    }

    // Llamamos a la funcion apenas carga la pagina
    cargarDatosGuardados();



    // EVENTOS BLUR Y FOCUS — Feedback en tiempo real
    // blur se dispara cuando el usuario sale del input
    // focus se dispara cuando hace clic en el input

    // --- Nombre: solo letras y espacios ---
    perfilNombre.addEventListener('blur', function () {
        const valor = perfilNombre.value.trim();
        if (valor === '') {
            mostrarErrorCampo(perfilNombreError, 'Este campo es obligatorio.', perfilNombre);
        } else if (!validarNombre(valor)) {
            mostrarErrorCampo(perfilNombreError, 'Solo se permiten letras y espacios (sin números ni símbolos).', perfilNombre);
        } else {
            limpiarErrorCampo(perfilNombreError, perfilNombre);
            perfilNombre.classList.add('input-valido');
        }
    });
    perfilNombre.addEventListener('focus', function () {
        limpiarErrorCampo(perfilNombreError, perfilNombre);
    });

    // --- Email: formato valido ---
    perfilEmail.addEventListener('blur', function () {
        const valor = perfilEmail.value.trim();
        if (valor === '') {
            mostrarErrorCampo(perfilEmailError, 'Este campo es obligatorio.', perfilEmail);
        } else if (!validarEmail(valor)) {
            mostrarErrorCampo(perfilEmailError, 'El formato del correo no es válido (ej: nombre@correo.com).', perfilEmail);
        } else {
            limpiarErrorCampo(perfilEmailError, perfilEmail);
            perfilEmail.classList.add('input-valido');
        }
    });
    perfilEmail.addEventListener('focus', function () {
        limpiarErrorCampo(perfilEmailError, perfilEmail);
    });

    // --- DNI: solo numeros ---
    perfilDni.addEventListener('blur', function () {
        const valor = perfilDni.value.trim();
        if (valor === '') {
            mostrarErrorCampo(perfilDniError, 'Este campo es obligatorio.', perfilDni);
        } else if (!validarDni(valor)) {
            mostrarErrorCampo(perfilDniError, 'El DNI debe contener solamente números.', perfilDni);
        } else {
            limpiarErrorCampo(perfilDniError, perfilDni);
            perfilDni.classList.add('input-valido');
        }
    });
    perfilDni.addEventListener('focus', function () {
        limpiarErrorCampo(perfilDniError, perfilDni);
    });

    // --- Telefono: numeros, espacios, guiones y + ---
    perfilTelefono.addEventListener('blur', function () {
        const valor = perfilTelefono.value.trim();
        // El telefono no es obligatorio, pero si escriben algo lo validamos
        if (valor !== '' && !validarTelefono(valor)) {
            mostrarErrorCampo(perfilTelefonoError, 'Solo se permiten números, espacios, guiones (-) y el signo +.', perfilTelefono);
        } else if (valor !== '') {
            limpiarErrorCampo(perfilTelefonoError, perfilTelefono);
            perfilTelefono.classList.add('input-valido');
        }
    });
    perfilTelefono.addEventListener('focus', function () {
        limpiarErrorCampo(perfilTelefonoError, perfilTelefono);
    });


    // SUBMIT DEL PERFIL — Validar todo y guardar en localStorage

    formPerfil.addEventListener('submit', function (e) {
        // preventDefault() frena el envio real para que no se recargue la pagina
        e.preventDefault();
        limpiarMensajes();

        // .value trae lo que escribio el usuario, .trim() saca espacios de sobra
        const nombre = perfilNombre.value.trim();
        const email = perfilEmail.value.trim();
        const dni = perfilDni.value.trim();
        const telefono = perfilTelefono.value.trim();
        const posicion = perfilPosicion.value;
        const liga = perfilLiga.value;

        let hayErrores = false;

        // Validamos cada campo con su regex correspondiente
        if (nombre === '') {
            mostrarErrorCampo(perfilNombreError, 'Este campo es obligatorio.', perfilNombre);
            hayErrores = true;
        } else if (!validarNombre(nombre)) {
            mostrarErrorCampo(perfilNombreError, 'Solo se permiten letras y espacios.', perfilNombre);
            hayErrores = true;
        }

        if (email === '') {
            mostrarErrorCampo(perfilEmailError, 'Este campo es obligatorio.', perfilEmail);
            hayErrores = true;
        } else if (!validarEmail(email)) {
            mostrarErrorCampo(perfilEmailError, 'El formato del correo no es válido.', perfilEmail);
            hayErrores = true;
        }

        if (dni === '') {
            mostrarErrorCampo(perfilDniError, 'Este campo es obligatorio.', perfilDni);
            hayErrores = true;
        } else if (!validarDni(dni)) {
            mostrarErrorCampo(perfilDniError, 'El DNI debe contener solamente números.', perfilDni);
            hayErrores = true;
        }

        // El telefono es opcional, pero si tiene algo lo validamos
        if (telefono !== '' && !validarTelefono(telefono)) {
            mostrarErrorCampo(perfilTelefonoError, 'Formato de teléfono inválido.', perfilTelefono);
            hayErrores = true;
        }

        // return corta la funcion si hay errores
        if (hayErrores) {
            mostrarError(perfilError, 'Corregí los campos marcados en rojo antes de guardar.');
            return;
        }

        // Creamos un objeto con todos los datos del perfil
        const datosPerfil = {
            nombre: nombre,
            email: email,
            dni: dni,
            telefono: telefono,
            posicion: posicion,
            liga: liga
        };

        // JSON.stringify convierte el objeto de JS a string para guardarlo en localStorage
        localStorage.setItem('perfil', JSON.stringify(datosPerfil));

        mostrarExito(perfilExito, '¡Perfil guardado con éxito!');
    });



    // EVENTO RESET — Limpia errores visuales cuando presionan "Limpiar"


    formPerfil.addEventListener('reset', function () {
        // setTimeout con 0ms se ejecuta despues del reset nativo del navegador
        setTimeout(function () {
            limpiarMensajes();
            limpiarTodosLosErrores();
        }, 0);
    });


    // ============================================================
    // ============================================================
    //        SECCIÓN NUEVA: MOSTRAR FAVORITOS EN EL PERFIL
    // ============================================================
    // ============================================================
    // Esta sección lee los favoritos guardados en localStorage
    // y los muestra dinámicamente en la grilla del perfil.
    // También permite eliminar favoritos desde esta página.
    // ============================================================


    // ============================================================
    // A. FUNCIÓN PARA CARGAR Y MOSTRAR LOS FAVORITOS EN LA GRILLA
    // ============================================================
    // Lee el array de favoritos desde localStorage y crea una
    // tarjeta HTML por cada equipo guardado. Si no hay favoritos,
    // muestra un mensaje indicándolo.

    function cargarFavoritosEnPerfil() {

        // Paso 1: Buscamos el contenedor HTML donde vamos a inyectar las tarjetas
        // getElementById() busca un elemento por su atributo id="grilla-favoritos"
        const grillaFavoritos = document.getElementById('grilla-favoritos');

        // Paso 2: Buscamos el párrafo del mensaje "sin favoritos"
        const mensajeSinFavoritos = document.getElementById('mensaje-sin-favoritos');

        // Paso 3: Limpiamos la grilla por si ya tenía contenido previo
        // innerHTML = "" borra todo el HTML que haya dentro del elemento
        grillaFavoritos.innerHTML = '';

        // Paso 4: Leemos los favoritos guardados en localStorage
        // localStorage.getItem('favoritos') devuelve un STRING o null
        const datosGuardados = localStorage.getItem('favoritos');

        // Paso 5: Convertimos el string a un array de objetos
        // Si datosGuardados es null (no hay nada), usamos un array vacío []
        let listaFavoritos = [];
        if (datosGuardados !== null) {
            // JSON.parse() convierte el string JSON a un array de JS
            listaFavoritos = JSON.parse(datosGuardados);
        }

        // Paso 6: Verificamos si hay favoritos o no
        if (listaFavoritos.length === 0) {
            // --- NO hay favoritos guardados ---
            // Mostramos el mensaje y ocultamos la grilla vacía
            mensajeSinFavoritos.style.display = 'block';
            grillaFavoritos.style.display = 'none';
            return; // Cortamos la ejecución acá, no hay nada más que hacer
        }

        // --- SÍ hay favoritos guardados ---
        // Ocultamos el mensaje y mostramos la grilla
        mensajeSinFavoritos.style.display = 'none';
        grillaFavoritos.style.display = 'grid';

        // Paso 7: Recorremos el array de favoritos con forEach
        // Por cada favorito, creamos una tarjeta HTML y la agregamos a la grilla
        listaFavoritos.forEach(function (favorito) {

            // --- Creamos el elemento <article> que será la tarjeta ---
            // document.createElement() crea un nuevo elemento HTML en memoria
            const tarjeta = document.createElement('article');

            // Le asignamos las clases CSS que ya existen en nuestro proyecto
            // para que tenga el mismo estilo que las tarjetas anteriores
            tarjeta.classList.add(
                'fondo-gris',           // Fondo gris oscuro
                'radio-mediano',        // Bordes redondeados
                'ocultar-excedente',    // overflow: hidden
                'escala-hover',         // Efecto de elevación al pasar el mouse
                'borde-gris',           // Borde gris sutil
                'caja-flexible',        // display: flex
                'flex-columna',         // flex-direction: column
                'estirar',              // align-items: stretch
                'tarjeta-favorito-perfil'  // Clase nueva para animación de entrada
            );

            // --- Creamos el contenedor de la imagen del escudo ---
            const contenedorImagen = document.createElement('div');
            contenedorImagen.classList.add('imagen-cubrir', 'alto-150', 'borde-inf-azulado');

            // --- Creamos el elemento <img> para el escudo ---
            const imagenEscudo = document.createElement('img');
            imagenEscudo.src = corregirRutaImagen(favorito.imagen);              // URL del escudo guardada en localStorage
            imagenEscudo.alt = favorito.nombre;              // Texto alternativo = nombre del equipo
            imagenEscudo.classList.add('ancho-100', 'alto-100'); // Clases de tamaño
            // Aplicamos estilos inline para que el escudo se vea centrado
            imagenEscudo.style.objectFit = 'contain';        // Mantiene la proporción de la imagen
            imagenEscudo.style.background = '#fff';          // Fondo blanco detrás del escudo
            imagenEscudo.style.padding = '10px';             // Espacio alrededor del escudo

            // Metemos la imagen dentro de su contenedor
            contenedorImagen.appendChild(imagenEscudo);

            // --- Creamos el contenedor del texto (nombre, liga, botón) ---
            const contenedorTexto = document.createElement('div');
            contenedorTexto.classList.add(
                'relleno-15',          // Padding de 15px
                'caja-flexible',       // display: flex
                'flex-columna',        // flex-direction: column
                'alinear-centro',      // align-items: center
                'texto-centrado',      // text-align: center
                'crecer-1'             // flex: 1 (ocupa el espacio disponible)
            );

            // --- Creamos el título con el nombre del equipo ---
            const nombreEquipo = document.createElement('h4');
            nombreEquipo.classList.add('texto-mediano', 'margen-abajo-5', 'texto-esmeralda');
            nombreEquipo.textContent = favorito.nombre;  // Ej: "River Plate"

            // --- Creamos el párrafo con la liga y país ---
            const infoLiga = document.createElement('p');
            infoLiga.classList.add('texto-secundario', 'texto-chico', 'margen-abajo-15');
            infoLiga.textContent = favorito.liga + ' (' + favorito.pais + ')';  // Ej: "Liga Profesional (Argentina)"

            // --- Creamos el botón para ELIMINAR el favorito ---
            const botonEliminar = document.createElement('button');
            botonEliminar.classList.add('boton', 'boton-eliminar-favorito', 'ancho-100', 'margen-sup-auto');
            botonEliminar.innerHTML = '<i class="fa-solid fa-trash-can"></i> Quitar de Favoritos';

            // --- EVENTO CLICK: Eliminar el favorito ---
            // Cuando el usuario hace clic en "Quitar de Favoritos":
            botonEliminar.addEventListener('click', function () {
                // Llamamos a la función que elimina este favorito
                eliminarFavoritoDesdePerfil(favorito.id, tarjeta);
            });

            // --- Armamos la estructura: metemos todo dentro de cada contenedor ---
            contenedorTexto.appendChild(nombreEquipo);
            contenedorTexto.appendChild(infoLiga);
            contenedorTexto.appendChild(botonEliminar);

            // Metemos imagen + texto dentro de la tarjeta
            tarjeta.appendChild(contenedorImagen);
            tarjeta.appendChild(contenedorTexto);

            // Finalmente, agregamos la tarjeta completa a la grilla del DOM
            // appendChild() inserta el elemento al final del contenedor padre
            grillaFavoritos.appendChild(tarjeta);
        });
    }


    // ============================================================
    // B. FUNCIÓN PARA ELIMINAR UN FAVORITO DESDE EL PERFIL
    // ============================================================
    // Cuando el usuario hace clic en "Quitar de Favoritos",
    // esta función lo elimina del localStorage y lo quita
    // visualmente de la grilla con una animación.

    function eliminarFavoritoDesdePerfil(idDelEquipo, elementoTarjeta) {

        // Paso 1: Leemos el array actual de favoritos desde localStorage
        const datosGuardados = localStorage.getItem('favoritos');
        let listaFavoritos = [];

        if (datosGuardados !== null) {
            listaFavoritos = JSON.parse(datosGuardados);
        }

        // Paso 2: Filtramos el array para QUITAR el equipo con el id indicado
        // .filter() crea un NUEVO array que solo incluye los elementos
        // que cumplen la condición (todos los que NO tengan el id a eliminar)
        const listaActualizada = listaFavoritos.filter(function (favorito) {
            return favorito.id !== idDelEquipo;
        });

        // Paso 3: Guardamos el array actualizado (sin el equipo eliminado)
        // en localStorage, sobrescribiendo el anterior
        localStorage.setItem('favoritos', JSON.stringify(listaActualizada));

        // Paso 4: Animación visual de desaparición
        // Usamos element.style.propiedadCss para modificar el estilo directamente
        elementoTarjeta.style.transition = 'all 0.4s ease';   // Transición suave de 0.4 segundos
        elementoTarjeta.style.opacity = '0';                   // Se vuelve transparente
        elementoTarjeta.style.transform = 'scale(0.8)';       // Se encoge un poco

        // Paso 5: Después de que termina la animación (400ms),
        // eliminamos el elemento del DOM y recargamos la grilla
        setTimeout(function () {
            // .remove() elimina el elemento HTML del DOM por completo
            elementoTarjeta.remove();

            // Verificamos si quedan más favoritos
            // Si la lista quedó vacía, volvemos a llamar cargarFavoritosEnPerfil
            // para que muestre el mensaje "No tenés equipos favoritos"
            if (listaActualizada.length === 0) {
                cargarFavoritosEnPerfil();
            }
        }, 400); // 400 milisegundos = el mismo tiempo que dura la transición CSS
    }


    // ============================================================
    // C. EJECUTAMOS LA CARGA DE FAVORITOS AL ABRIR LA PÁGINA
    // ============================================================
    // Llamamos a la función para que apenas cargue la página del
    // perfil, se lean los favoritos del localStorage y se muestren.

    cargarFavoritosEnPerfil();


});
