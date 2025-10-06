let mensaje="Introduce una cantidad de segundos, porfavor: ";
let segundosUsuario= Number.parseInt(prompt(mensaje));

//Mientras el numero ingresado no sea entero, se lo preguntamos. 
while(!Number.isInteger(segundosUsuario)) {
    mensaje="Introduce una cantidad de segundos, porfavor: ";
    segundosUsuario= Number.parseInt(prompt(mensaje));
}

let horas = 0;
let minutos = 0;
let segundos = segundosUsuario;

//Mientras hayan mas de 3600 segs, aumentamos 1 hora y restamos los segundos.
while(segundos >= 3600) {
    horas += 1;
    segundos -= 3600;
}

//Una vez asignadas las horas correspondientes, los segundos que quedan, los asignamos a los minutos.
while (segundos >= 60) {
    minutos += 1;
    segundos -= 60;
}

//Y llegados a este punto, los segundos que han quedado, corresponden a los segundos.

alert(`Tu cantidad en segundos ha sido -> Horas: ${horas}, Minutos: ${minutos}, Segundos: ${segundos}`);
