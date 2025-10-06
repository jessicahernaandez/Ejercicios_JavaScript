let mensajeAdivina= "Introduce la letra a adivinar: ";
let respuestaAdivina = prompt(mensajeAdivina);

//Mientras sea una palabra o un numero, mostrara la ventana.
while(respuestaAdivina.length != 1  || Number.parseInt(respuestaAdivina)) {
    if(Number.parseInt(respuestaAdivina)) {
        mensajeAdivina= "No introduzcas numeros, solo UNA letra: ";
        respuestaAdivina = prompt(mensajeAdivina);
    } else {
        mensajeAdivina= "Es solo UNA letra: ";
        respuestaAdivina = prompt(mensajeAdivina);  
    }  
}

//Una vez fuera del bucle tenemos la letra del usuario.
let mensajeUsuario = "Adivina la letra: ";
let respuestaUsuario = prompt(mensajeUsuario);

//Mientras sean distintas, le seguimos pidiendo letras al usuario.
while(respuestaUsuario.toUpperCase() != respuestaAdivina.toUpperCase()) {
    mensajeUsuario = "Incorrecto. Adivina la letra: ";
    respuestaUsuario = prompt(mensajeUsuario);
}


alert('¡Felicidades, haz acertado!');

