
// DOMContentLoaded espera a que el HTML este listo antes de ejecutar el JS
document.addEventListener('DOMContentLoaded', function () {

    // getElementById busca un elemento del HTML por su id y nos lo guarda en una variable

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

    const loginError = document.getElementById('loginError');
    const loginExito = document.getElementById('loginExito');
    const registroError = document.getElementById('registroError');
    const registroExito = document.getElementById('registroExito');
    const recuperarError = document.getElementById('recuperarError');
    const recuperarExito = document.getElementById('recuperarExito');

    const irARecuperar = document.getElementById('irARecuperar');
    const volverDeRecuperar = document.getElementById('volverDeRecuperar');


    // classList.add/remove agrega o quita una clase CSS del elemento, asi controlamos el estilo desde JS
    function activarLogin() {
        authContainer.classList.add('login-activo');
        btnToggleRegistro.classList.remove('toggle-activo');
        btnToggleLogin.classList.add('toggle-activo');
        limpiarMensajes();
        limpiarErroresDeInputs();
    }

    function activarRegistro() {
        authContainer.classList.remove('login-activo');
        btnToggleLogin.classList.remove('toggle-activo');
        btnToggleRegistro.classList.add('toggle-activo');
        limpiarMensajes();
        limpiarErroresDeInputs();
    }

    // Estas funciones muestran u ocultan el panel de recuperar agregando/quitando la clase
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

    // textContent cambia el texto de un elemento, y con classList.remove le sacamos la clase visible
    function limpiarMensajes() {
        const mensajes = [loginError, loginExito, registroError, registroExito, recuperarError, recuperarExito];

        for (let i = 0; i < mensajes.length; i++) {
            mensajes[i].textContent = '';
            mensajes[i].classList.remove('visible');
        }
    }

    // querySelectorAll selecciona todos los elementos que coincidan con el selector CSS
    function limpiarErroresDeInputs() {
        const todosLosInputs = document.querySelectorAll('.auth-input');

        for (let i = 0; i < todosLosInputs.length; i++) {
            todosLosInputs[i].classList.remove('input-error');
        }
    }

    // Recibe un elemento <p> y un texto, lo muestra en pantalla agregandole la clase visible
    function mostrarError(elementoMensaje, texto) {
        elementoMensaje.textContent = texto;
        elementoMensaje.classList.add('visible');
    }

    function mostrarExito(elementoMensaje, texto) {
        elementoMensaje.textContent = texto;
        elementoMensaje.classList.add('visible');
    }


    // blur se dispara cuando el usuario sale de un input, focus cuando hace clic en el
    const todosLosInputs = document.querySelectorAll('.auth-input');

    for (let i = 0; i < todosLosInputs.length; i++) {
        const inputActual = todosLosInputs[i];

        // hasAttribute('required') chequea si el input tiene el atributo required en el HTML
        inputActual.addEventListener('blur', function () {
            const esObligatorio = inputActual.hasAttribute('required');
            // trim() saca los espacios en blanco del inicio y el final del texto
            const estaVacio = inputActual.value.trim() === '';

            if (esObligatorio && estaVacio) {
                inputActual.classList.add('input-error');
            }
        });

        inputActual.addEventListener('focus', function () {
            inputActual.classList.remove('input-error');
        });
    }


    // addEventListener('click') ejecuta una funcion cada vez que el usuario hace clic
    btnToggleRegistro.addEventListener('click', function () {
        activarRegistro();
    });

    btnToggleLogin.addEventListener('click', function () {
        activarLogin();
    });

    // preventDefault() evita el comportamiento por defecto del enlace (que seria recargar la pagina)
    irARecuperar.addEventListener('click', function (e) {
        e.preventDefault();
        mostrarRecuperar();
    });

    volverDeRecuperar.addEventListener('click', function (e) {
        e.preventDefault();
        ocultarRecuperar();
    });


    // addEventListener('submit') intercepta el envio del formulario para validar antes
    formRegistro.addEventListener('submit', function (e) {
        // preventDefault() frena el envio real del form para que no se recargue la pagina
        e.preventDefault();
        limpiarMensajes();

        // .value trae lo que escribio el usuario en el input, .trim() le saca espacios de sobra
        const usuario = regUsuario.value.trim();
        const email = regEmail.value.trim();
        const password = regPassword.value.trim();

        if (usuario === '' || email === '' || password === '') {
            mostrarError(registroError, 'Todos los campos son obligatorios.');

            if (usuario === '') regUsuario.classList.add('input-error');
            if (email === '') regEmail.classList.add('input-error');
            if (password === '') regPassword.classList.add('input-error');

            // return corta la funcion aca, no sigue ejecutando lo de abajo
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
        // JSON.stringify convierte el array de JS a string para poder guardarlo en localStorage
        localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));

        mostrarExito(registroExito, '¡Cuenta creada con éxito! Cambiando a Iniciar Sesión...');
        // reset() limpia todos los campos del formulario
        formRegistro.reset();

        // setTimeout ejecuta una funcion despues de los milisegundos que le pasemos (2000ms = 2seg)
        setTimeout(function () {
            activarLogin();
        }, 2000);
    });


    // Aca validamos el login: buscamos en localStorage si el user/mail existe y si la contraseña coincide
    formLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        limpiarMensajes();

        const usuarioOEmail = loginUsuario.value.trim();
        const password = loginPassword.value.trim();

        if (usuarioOEmail === '' || password === '') {
            mostrarError(loginError, 'Completá todos los campos para ingresar.');

            if (usuarioOEmail === '') loginUsuario.classList.add('input-error');
            if (password === '') loginPassword.classList.add('input-error');

            return;
        }

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


    // Recuperar contraseña: verificamos que el mail exista y simulamos el envio
    formRecuperar.addEventListener('submit', function (e) {
        e.preventDefault();
        limpiarMensajes();

        const email = recEmail.value.trim();

        if (email === '') {
            mostrarError(recuperarError, 'Ingresá tu correo electrónico.');
            recEmail.classList.add('input-error');
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

});
