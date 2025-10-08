let mensajeUsuario= "Introduce el precio a calcular: ";
let respuestaUsuario = prompt(mensajeUsuario);

while(isNaN(respuestaUsuario) || respuestaUsuario < 0) {
    mensajeUsuario= "Error. Introduce un numero correcto:";
    respuestaUsuario = prompt(mensajeUsuario);
}

const IVA = 1.21
respuestaUsuario = respuestaUsuario + IVA;

alert(`Tu precio con IVA incluido es: ${respuestaUsuario}`);