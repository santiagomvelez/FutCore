
// DOMContentLoaded espera a que el HTML este listo para buscar los elementos
document.addEventListener('DOMContentLoaded', function () {

    // Traemos los elementos del formulario
    const formRecuperar = document.getElementById('formRecuperar');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const mensajeError = document.getElementById('mensajeError');
    const mensajeExito = document.getElementById('mensajeExito');

    // ^[^\s@]+ → empieza con caracteres que no sean espacio ni @
    // @ → tiene arroba
    // [^\s@]+\.[^\s@]+ → despues del @ tiene texto.texto (ej: correo.com)
    function validarEmail(valor) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(valor);
    }

    // Muestra un error debajo del input
    function mostrarErrorCampo(span, mensaje, input) {
        span.textContent = mensaje;
        input.classList.add('input-error');
        input.classList.remove('input-valido');
    }

    // Limpia el error del campo
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
        mensajeError.textContent = '';
        mensajeError.classList.remove('visible');
        mensajeExito.textContent = '';
        mensajeExito.classList.remove('visible');
    }


    // blur valida cuando el usuario sale del campo
    emailInput.addEventListener('blur', function () {
        const valor = emailInput.value.trim();
        if (valor === '') {
            mostrarErrorCampo(emailError, 'Este campo es obligatorio.', emailInput);
        } else if (!validarEmail(valor)) {
            mostrarErrorCampo(emailError, 'El formato del correo no es válido (ej: nombre@correo.com).', emailInput);
        } else {
            limpiarErrorCampo(emailError, emailInput);
            emailInput.classList.add('input-valido');
        }
    });

    // focus limpia el error cuando el usuario vuelve a hacer clic
    emailInput.addEventListener('focus', function () {
        limpiarErrorCampo(emailError, emailInput);
    });


    // submit intercepta el envio del formulario para validar antes
    formRecuperar.addEventListener('submit', function (e) {
        // preventDefault() frena el envio real para que no se recargue la pagina
        e.preventDefault();
        limpiarMensajes();

        const email = emailInput.value.trim();

        // Validamos que no este vacio
        if (email === '') {
            mostrarErrorCampo(emailError, 'Ingresá tu correo electrónico.', emailInput);
            return;
        }

        // Validamos el formato con la regex
        if (!validarEmail(email)) {
            mostrarErrorCampo(emailError, 'El formato del correo no es válido.', emailInput);
            return;
        }

        // localStorage.getItem trae los datos guardados en el navegador
        const datosGuardados = localStorage.getItem('usuarios');
        let listaUsuarios;

        if (datosGuardados === null) {
            listaUsuarios = [];
        } else {
            // JSON.parse convierte el string del localStorage a un array de JS
            listaUsuarios = JSON.parse(datosGuardados);
        }

        // Recorremos el array para ver si algún mail coincide
        let emailEncontrado = false;

        for (let i = 0; i < listaUsuarios.length; i++) {
            // toLowerCase() pasa a minusculas para comparar sin importar mayusculas
            if (listaUsuarios[i].mail.toLowerCase() === email.toLowerCase()) {
                emailEncontrado = true;
                break;
            }
        }

        // Si no encontramos el mail mostramos error, si lo encontramos mostramos exito
        if (!emailEncontrado) {
            mostrarError(mensajeError, 'No encontramos una cuenta registrada con ese correo.');
            return;
        }

        mostrarExito(mensajeExito, '¡Enlace de recuperación enviado! Revisá tu bandeja de entrada.');
        formRecuperar.reset();
        limpiarErrorCampo(emailError, emailInput);
    });

    // reset limpia los errores visuales cuando el usuario presiona "Limpiar"
    formRecuperar.addEventListener('reset', function () {
        setTimeout(function () {
            limpiarMensajes();
            limpiarErrorCampo(emailError, emailInput);
        }, 0);
    });

});
