let mensajeNombre= "Introduce tu nombre: ";
let respuestaNombre = (prompt(mensajeNombre));

let mensajeEdad = "Introduce tu edad: ";
let respuestaEdad = Number.parseInt(prompt(mensajeEdad));

while(!Number.parseInt(respuestaEdad) || respuestaEdad<1) {
    mensajeEdad = "Introduce tu edad: ";
    respuestaEdad = Number.parseInt(prompt(mensajeEdad));
}

let franja= '';
if(respuestaEdad <= 12) {
    franja = "Niño";
} else if (respuestaEdad >= 13 && respuestaEdad <= 17) {
    franja = "Adolescente";
} else if (respuestaEdad >= 18 && respuestaEdad <= 64) {
    franja = "Trabajador";
} else {
    franja = "Jubilado";
}

alert(`El usuario ${respuestaNombre} tiene ${respuestaEdad} años y por lo tanto es ${franja}`);