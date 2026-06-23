
// DOMContentLoaded espera a que el HTML este listo antes de ejecutar el JS
document.addEventListener('DOMContentLoaded', function () {

    // getElementById busca un elemento del HTML por su id

    const authContainer = document.getElementById('authContainer');
    const btnToggleRegistro = document.getElementById('btnToggleRegistro');
    const btnToggleLogin = document.getElementById('btnToggleLogin');
    const panelRecuperar = document.getElementById('panelRecuperar');

    const formLogin = document.getElementById('formLogin');
    const formRegistro = document.getElementById('formRegistro');
    const formRecuperar = document.getElementById('formRecuperar');

    const loginUsuario = document.getElementById('loginUsuario');
    const loginPassword = document.getElementById('loginPassword');

    const regUsuario = document.getElementById('regUsuario');
    const regEmail = document.getElementById('regEmail');
    const regPassword = document.getElementById('regPassword');

    const recEmail = document.getElementById('recEmail');

    // Mensajes globales de error/exito
    const loginError = document.getElementById('loginError');
    const loginExito = document.getElementById('loginExito');
    const registroError = document.getElementById('registroError');
    const registroExito = document.getElementById('registroExito');
    const recuperarError = document.getElementById('recuperarError');
    const recuperarExito = document.getElementById('recuperarExito');

    // Spans de error individuales por campo
    const regUsuarioError = document.getElementById('regUsuarioError');
    const regEmailError = document.getElementById('regEmailError');
    const regPasswordError = document.getElementById('regPasswordError');
    const loginUsuarioError = document.getElementById('loginUsuarioError');
    const loginPasswordError = document.getElementById('loginPasswordError');
    const recEmailError = document.getElementById('recEmailError');

    // Elementos del checklist de requisitos de contraseña
    const reqMinuscula = document.getElementById('reqMinuscula');
    const reqMayuscula = document.getElementById('reqMayuscula');
    const reqNumero = document.getElementById('reqNumero');
    const reqEspecial = document.getElementById('reqEspecial');
    const reqLargo = document.getElementById('reqLargo');

    // Links de navegacion
    const irARecuperar = document.getElementById('irARecuperar');
    const volverDeRecuperar = document.getElementById('volverDeRecuperar');


    // =========================================================
    // FUNCIONES DE VALIDACION CON REGEX
    // Cada una usa .test() que devuelve true o false
    // =========================================================

    // ^[a-zA-Z]+$ → ^ = inicio, [a-zA-Z] = solo letras, + = una o mas, $ = fin
    function validarUsuario(valor) {
        const regex = /^[a-zA-Z]+$/;
        return regex.test(valor);
    }

    // ^[^\s@]+ → empieza con uno o mas caracteres que NO sean espacio ni @
    // @ → tiene que tener una arroba
    // [^\s@]+ → despues de la @ hay texto sin espacios ni @
    // \. → un punto literal
    // [^\s@]+ → despues del punto hay mas texto (ej: com, net, ar)
    function validarEmail(valor) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(valor);
    }

    // Valida la contraseña chequeando 5 reglas por separado
    // Devuelve un objeto con el resultado de cada una
    function validarPassword(valor) {
        return {
            // [a-z] → busca al menos una letra minuscula en el texto
            tieneMinuscula: /[a-z]/.test(valor),
            // [A-Z] → busca al menos una letra mayuscula
            tieneMayuscula: /[A-Z]/.test(valor),
            // [0-9] → busca al menos un numero
            tieneNumero: /[0-9]/.test(valor),
            // [#$!%=] → busca al menos uno de estos caracteres especiales permitidos
            tieneEspecial: /[#$!%=]/.test(valor),
            // ^.{8,12}$ → el texto completo debe tener entre 8 y 12 caracteres (. = cualquier caracter)
            largoValido: /^.{8,12}$/.test(valor)
        };
    }



    // FUNCIONES AUXILIARES (mostrarErrorCampo, limpiarErrorCampo, mostrarError, mostrarExito, limpiarMensajes, limpiarErroresDeInputs, resetearChecklistPassword)


    // Muestra un mensaje de error en un span debajo del input
    function mostrarErrorCampo(spanError, mensaje, input) {
        spanError.textContent = mensaje;
        input.classList.add('input-error');
        input.classList.remove('input-valido');
    }

    // Limpia el error de un campo especifico
    function limpiarErrorCampo(spanError, input) {
        spanError.textContent = '';
        input.classList.remove('input-error');
    }

    // Muestra un mensaje de error global (el <p> rojo grande)
    function mostrarError(elementoMensaje, texto) {
        elementoMensaje.textContent = texto;
        elementoMensaje.classList.add('visible');
    }

    // Muestra un mensaje de exito global
    function mostrarExito(elementoMensaje, texto) {
        elementoMensaje.textContent = texto;
        elementoMensaje.classList.add('visible');
    }

    // textContent cambia el texto, classList.remove quita la clase visible
    function limpiarMensajes() {
        const mensajes = [loginError, loginExito, registroError, registroExito, recuperarError, recuperarExito];
        for (let i = 0; i < mensajes.length; i++) {
            mensajes[i].textContent = '';
            mensajes[i].classList.remove('visible');
        }
    }

    // Limpia todos los errores de inputs y spans
    function limpiarErroresDeInputs() {
        const todosLosInputs = document.querySelectorAll('.auth-input');
        for (let i = 0; i < todosLosInputs.length; i++) {
            todosLosInputs[i].classList.remove('input-error');
            todosLosInputs[i].classList.remove('input-valido');
        }
        // Tambien limpiamos los spans de error individuales
        const todosLosSpans = document.querySelectorAll('.campo-error');
        for (let i = 0; i < todosLosSpans.length; i++) {
            todosLosSpans[i].textContent = '';
        }
    }

    // Resetea el checklist de password a su estado inicial (todo en X roja)
    function resetearChecklistPassword() {
        const items = [reqMinuscula, reqMayuscula, reqNumero, reqEspecial, reqLargo];
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('requisito-cumplido');
            // Restauramos el icono de X
            items[i].querySelector('i').className = 'fa-solid fa-xmark';
        }
    }



    // FUNCIONES DEL TOGGLE Y PANELES


    // classList.add/remove agrega o quita una clase CSS para controlar el estilo desde JS
    function activarLogin() {
        authContainer.classList.add('login-activo');
        btnToggleRegistro.classList.remove('toggle-activo');
        btnToggleLogin.classList.add('toggle-activo');
        limpiarMensajes();
        limpiarErroresDeInputs();
        resetearChecklistPassword();
    }

    function activarRegistro() {
        authContainer.classList.remove('login-activo');
        btnToggleLogin.classList.remove('toggle-activo');
        btnToggleRegistro.classList.add('toggle-activo');
        limpiarMensajes();
        limpiarErroresDeInputs();
    }

    function mostrarRecuperar() {
        panelRecuperar.classList.add('recuperar-activo');
        limpiarMensajes();
        limpiarErroresDeInputs();
    }

    function ocultarRecuperar() {
        panelRecuperar.classList.remove('recuperar-activo');
        limpiarMensajes();
        limpiarErroresDeInputs();
    }



    // EVENTOS BLUR Y FOCUS — Feedback en tiempo real por campo
    // blur se dispara cuando el usuario sale de un input
    // focus se dispara cuando hace clic en el input


    // --- REGISTRO: blur en Usuario ---
    regUsuario.addEventListener('blur', function () {
        const valor = regUsuario.value.trim();
        if (valor === '') {
            mostrarErrorCampo(regUsuarioError, 'Este campo es obligatorio.', regUsuario);
        } else if (!validarUsuario(valor)) {
            mostrarErrorCampo(regUsuarioError, 'Solo se permiten letras (sin números, espacios ni símbolos).', regUsuario);
        } else {
            limpiarErrorCampo(regUsuarioError, regUsuario);
            regUsuario.classList.add('input-valido');
        }
    });

    regUsuario.addEventListener('focus', function () {
        limpiarErrorCampo(regUsuarioError, regUsuario);
    });

    // --- REGISTRO: blur en Email ---
    regEmail.addEventListener('blur', function () {
        const valor = regEmail.value.trim();
        if (valor === '') {
            mostrarErrorCampo(regEmailError, 'Este campo es obligatorio.', regEmail);
        } else if (!validarEmail(valor)) {
            mostrarErrorCampo(regEmailError, 'El formato del correo no es válido (ej: nombre@correo.com).', regEmail);
        } else {
            limpiarErrorCampo(regEmailError, regEmail);
            regEmail.classList.add('input-valido');
        }
    });

    regEmail.addEventListener('focus', function () {
        limpiarErrorCampo(regEmailError, regEmail);
    });

    // --- REGISTRO: blur en Password ---
    regPassword.addEventListener('blur', function () {
        const valor = regPassword.value.trim();
        if (valor === '') {
            mostrarErrorCampo(regPasswordError, 'Este campo es obligatorio.', regPassword);
        } else {
            const resultado = validarPassword(valor);
            const todoOk = resultado.tieneMinuscula && resultado.tieneMayuscula && resultado.tieneNumero && resultado.tieneEspecial && resultado.largoValido;
            if (!todoOk) {
                mostrarErrorCampo(regPasswordError, 'La contraseña no cumple todos los requisitos.', regPassword);
            } else {
                limpiarErrorCampo(regPasswordError, regPassword);
                regPassword.classList.add('input-valido');
            }
        }
    });

    regPassword.addEventListener('focus', function () {
        limpiarErrorCampo(regPasswordError, regPassword);
    });

    // --- REGISTRO: evento input en Password para actualizar el checklist en tiempo real ---
    // El evento 'input' se dispara cada vez que el usuario escribe o borra algo
    regPassword.addEventListener('input', function () {
        const valor = regPassword.value;
        const resultado = validarPassword(valor);

        // Para cada requisito: si se cumple le ponemos la clase y el icono de check
        actualizarRequisito(reqMinuscula, resultado.tieneMinuscula);
        actualizarRequisito(reqMayuscula, resultado.tieneMayuscula);
        actualizarRequisito(reqNumero, resultado.tieneNumero);
        actualizarRequisito(reqEspecial, resultado.tieneEspecial);
        actualizarRequisito(reqLargo, resultado.largoValido);
    });

    // Funcion auxiliar que agrega o quita la clase del requisito y cambia el icono
    function actualizarRequisito(elemento, cumplido) {
        if (cumplido) {
            elemento.classList.add('requisito-cumplido');
            elemento.querySelector('i').className = 'fa-solid fa-check';
        } else {
            elemento.classList.remove('requisito-cumplido');
            elemento.querySelector('i').className = 'fa-solid fa-xmark';
        }
    }

    // --- LOGIN: blur/focus en los campos ---
    loginUsuario.addEventListener('blur', function () {
        if (loginUsuario.value.trim() === '') {
            mostrarErrorCampo(loginUsuarioError, 'Este campo es obligatorio.', loginUsuario);
        }
    });
    loginUsuario.addEventListener('focus', function () {
        limpiarErrorCampo(loginUsuarioError, loginUsuario);
    });

    loginPassword.addEventListener('blur', function () {
        if (loginPassword.value.trim() === '') {
            mostrarErrorCampo(loginPasswordError, 'Este campo es obligatorio.', loginPassword);
        }
    });
    loginPassword.addEventListener('focus', function () {
        limpiarErrorCampo(loginPasswordError, loginPassword);
    });

    // --- RECUPERAR: blur/focus en email ---
    recEmail.addEventListener('blur', function () {
        const valor = recEmail.value.trim();
        if (valor === '') {
            mostrarErrorCampo(recEmailError, 'Este campo es obligatorio.', recEmail);
        } else if (!validarEmail(valor)) {
            mostrarErrorCampo(recEmailError, 'El formato del correo no es válido.', recEmail);
        }
    });
    recEmail.addEventListener('focus', function () {
        limpiarErrorCampo(recEmailError, recEmail);
    });


    // =========================================================
    // EVENTOS DEL TOGGLE
    // =========================================================

    btnToggleRegistro.addEventListener('click', function () {
        activarRegistro();
    });

    btnToggleLogin.addEventListener('click', function () {
        activarLogin();
    });

    // preventDefault() evita el comportamiento por defecto del enlace
    irARecuperar.addEventListener('click', function (e) {
        e.preventDefault();
        mostrarRecuperar();
    });

    volverDeRecuperar.addEventListener('click', function (e) {
        e.preventDefault();
        ocultarRecuperar();
    });


    // =========================================================
    // SUBMIT DEL REGISTRO
    // Valida formato con RegEx, chequea duplicados en localStorage y guarda
    // =========================================================

    formRegistro.addEventListener('submit', function (e) {
        // preventDefault() frena el envio del form para que no recargue la pagina
        e.preventDefault();
        limpiarMensajes();

        // .value trae lo que escribio el usuario, .trim() le saca espacios de sobra
        const usuario = regUsuario.value.trim();
        const email = regEmail.value.trim();
        const password = regPassword.value.trim();

        // Variable para rastrear si hay algun error
        let hayErrores = false;

        // Validamos el usuario con la regex de solo letras
        if (usuario === '') {
            mostrarErrorCampo(regUsuarioError, 'Este campo es obligatorio.', regUsuario);
            hayErrores = true;
        } else if (!validarUsuario(usuario)) {
            mostrarErrorCampo(regUsuarioError, 'Solo se permiten letras.', regUsuario);
            hayErrores = true;
        }

        // Validamos el email con la regex de formato correo
        if (email === '') {
            mostrarErrorCampo(regEmailError, 'Este campo es obligatorio.', regEmail);
            hayErrores = true;
        } else if (!validarEmail(email)) {
            mostrarErrorCampo(regEmailError, 'El formato del correo no es válido.', regEmail);
            hayErrores = true;
        }

        // Validamos la contraseña con las 5 reglas
        if (password === '') {
            mostrarErrorCampo(regPasswordError, 'Este campo es obligatorio.', regPassword);
            hayErrores = true;
        } else {
            const resultado = validarPassword(password);
            const todoOk = resultado.tieneMinuscula && resultado.tieneMayuscula && resultado.tieneNumero && resultado.tieneEspecial && resultado.largoValido;
            if (!todoOk) {
                mostrarErrorCampo(regPasswordError, 'La contraseña no cumple todos los requisitos.', regPassword);
                hayErrores = true;
            }
        }

        // return corta la funcion aca si hay errores, no sigue ejecutando lo de abajo
        if (hayErrores) {
            mostrarError(registroError, 'Corregí los campos marcados en rojo.');
            return;
        }

        // localStorage.getItem trae datos guardados en el navegador como texto (string)
        const datosGuardados = localStorage.getItem('usuarios');
        let listaUsuarios;

        if (datosGuardados === null) {
            listaUsuarios = [];
        } else {
            // JSON.parse convierte el string del localStorage a un array de JS
            listaUsuarios = JSON.parse(datosGuardados);
        }

        // Recorremos el array con for para ver si ya existe ese usuario o mail
        let usuarioRepetido = false;
        let emailRepetido = false;

        for (let i = 0; i < listaUsuarios.length; i++) {
            // toLowerCase() pasa todo a minusculas para comparar sin importar mayusculas
            if (listaUsuarios[i].user.toLowerCase() === usuario.toLowerCase()) {
                usuarioRepetido = true;
            }
            if (listaUsuarios[i].mail.toLowerCase() === email.toLowerCase()) {
                emailRepetido = true;
            }
        }

        if (usuarioRepetido && emailRepetido) {
            mostrarError(registroError, 'El nombre de usuario y el correo ya están registrados.');
            return;
        }
        if (usuarioRepetido) {
            mostrarError(registroError, 'Ese nombre de usuario ya está en uso. Elegí otro.');
            return;
        }
        if (emailRepetido) {
            mostrarError(registroError, 'Ese correo electrónico ya está registrado.');
            return;
        }

        // Creamos un objeto con los datos del nuevo usuario
        const nuevoUsuario = {
            user: usuario,
            mail: email,
            password: password
        };

        // push() agrega un elemento al final del array
        listaUsuarios.push(nuevoUsuario);
        // JSON.stringify convierte el array de JS a string para guardarlo en localStorage
        localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));

        mostrarExito(registroExito, '¡Cuenta creada con éxito! Cambiando a Iniciar Sesión...');
        // reset() limpia todos los campos del formulario
        formRegistro.reset();
        resetearChecklistPassword();
        limpiarErroresDeInputs();

        // setTimeout ejecuta una funcion despues de los milisegundos que le pasemos
        setTimeout(function () {
            activarLogin();
        }, 2000);
    });


    // =========================================================
    // SUBMIT DEL LOGIN
    // Busca en localStorage si el user/mail existe y si la contraseña coincide
    // =========================================================

    formLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        limpiarMensajes();

        const usuarioOEmail = loginUsuario.value.trim();
        const password = loginPassword.value.trim();

        let hayErrores = false;

        if (usuarioOEmail === '') {
            mostrarErrorCampo(loginUsuarioError, 'Este campo es obligatorio.', loginUsuario);
            hayErrores = true;
        }
        if (password === '') {
            mostrarErrorCampo(loginPasswordError, 'Este campo es obligatorio.', loginPassword);
            hayErrores = true;
        }

        if (hayErrores) return;

        const datosGuardados = localStorage.getItem('usuarios');
        let listaUsuarios;

        if (datosGuardados === null) {
            listaUsuarios = [];
        } else {
            listaUsuarios = JSON.parse(datosGuardados);
        }

        // Buscamos si algun usuario coincide por user o por mail
        let usuarioEncontrado = null;

        for (let i = 0; i < listaUsuarios.length; i++) {
            const coincideUser = listaUsuarios[i].user.toLowerCase() === usuarioOEmail.toLowerCase();
            const coincideMail = listaUsuarios[i].mail.toLowerCase() === usuarioOEmail.toLowerCase();

            if (coincideUser || coincideMail) {
                usuarioEncontrado = listaUsuarios[i];
                // break sale del for porque ya encontramos lo que buscabamos
                break;
            }
        }

        if (usuarioEncontrado === null) {
            mostrarError(loginError, 'Usuario o correo no encontrado.');
            return;
        }

        if (usuarioEncontrado.password !== password) {
            mostrarError(loginError, 'La contraseña es incorrecta.');
            return;
        }

        mostrarExito(loginExito, '¡Bienvenido, ' + usuarioEncontrado.user + '! Redirigiendo...');

        // window.location.href cambia la URL y nos lleva a otra pagina
        setTimeout(function () {
            window.location.href = 'perfil/perfil.html';
        }, 1500);
    });


    // =========================================================
    // SUBMIT DE RECUPERAR CONTRASEÑA
    // Valida formato del mail y chequea si existe en localStorage
    // =========================================================

    formRecuperar.addEventListener('submit', function (e) {
        e.preventDefault();
        limpiarMensajes();

        const email = recEmail.value.trim();

        if (email === '') {
            mostrarErrorCampo(recEmailError, 'Este campo es obligatorio.', recEmail);
            return;
        }

        if (!validarEmail(email)) {
            mostrarErrorCampo(recEmailError, 'El formato del correo no es válido.', recEmail);
            return;
        }

        const datosGuardados = localStorage.getItem('usuarios');
        let listaUsuarios;

        if (datosGuardados === null) {
            listaUsuarios = [];
        } else {
            listaUsuarios = JSON.parse(datosGuardados);
        }

        let emailEncontrado = false;

        for (let i = 0; i < listaUsuarios.length; i++) {
            if (listaUsuarios[i].mail.toLowerCase() === email.toLowerCase()) {
                emailEncontrado = true;
                break;
            }
        }

        if (!emailEncontrado) {
            mostrarError(recuperarError, 'No encontramos una cuenta con ese correo.');
            return;
        }

        mostrarExito(recuperarExito, '¡Enlace de recuperación enviado! Revisá tu bandeja de entrada.');
        formRecuperar.reset();
    });


    // El setTimeout con 0ms hace que se ejecute despues del reset nativo del navegador
    formRecuperar.addEventListener('reset', function () {
        setTimeout(function () {
            limpiarMensajes();
            limpiarErroresDeInputs();
        }, 0);
    });

    formRegistro.addEventListener('reset', function () {
        setTimeout(function () {
            limpiarMensajes();
            limpiarErroresDeInputs();
            resetearChecklistPassword();
        }, 0);
    });

    formLogin.addEventListener('reset', function () {
        setTimeout(function () {
            limpiarMensajes();
            limpiarErroresDeInputs();
        }, 0);
    });

});
