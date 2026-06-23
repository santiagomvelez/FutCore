
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

});
