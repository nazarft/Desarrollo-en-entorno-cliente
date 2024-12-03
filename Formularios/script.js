
const nombre = document.getElementById('nombre')
const correo = document.getElementById('correo')
const formulario = document.querySelector('.formulario');


formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    validarFormulario();
});

function validarFormatoEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


function validarNombre(nombre) {
    if (nombre.length === 0) {
        alert('No puedes introducir un nombre vacío');
        return true
    } else if (nombre.length < 5) {
        alert('Tu nombre debe contener al menos 5 caracteres');
        return false;
    }
    return true
}


function validarEmail(correo) {
    if (correo.length === 0) {
        alert('No puedes introducir un correo vacío');
        return false;
    }
    return true
}

function validarFormulario() {
    const email = correo.value;
    const name = nombre.value;
    let esValido = true;
    if (!validarNombre(name)) {
        esValido = false;
    }
    if (!validarFormatoEmail(email)) {
        alert('El formato del correo no es válido');
        esValido = false;
    } else if (!validarEmail(email)) {
        esValido = false;
    }
    if (esValido) {
        alert('Formulario enviado correctamente');
        return true
        formulario.submit() // Enviamos desde aqui o desde el boton
    }
}

let enviarBtn = document.querySelector('.enviar');
enviarBtn.addEventListener('click', () => {
    if (validarFormulario()) {
        formulario.submit();
    }
})
