let mensajeUsuario= "Introduce un número entre el 1 y 9: ";
let respuestaUsuario = prompt(mensajeUsuario);

//Comprobamos que sea un numero y este comprendido entre 1 y 9.
while(isNaN(respuestaUsuario) || respuestaUsuario < 1 || respuestaUsuario > 9) {
    mensajeUsuario = "Error. Introduce un número entre el 1 y 9:";
    respuestaUsuario = prompt(mensajeUsuario);
}

console.log(`Multiplos de ${respuestaUsuario}:`);

//Mostramos los multiplos de ese numero hasta el 200.
for(let num=1;num <=200;num++) {
    if(num % respuestaUsuario === 0) {
        console.log(num);
    }
}

