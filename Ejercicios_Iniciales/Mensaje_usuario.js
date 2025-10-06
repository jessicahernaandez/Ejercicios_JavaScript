let mensaje = "Introduce una cantidad de segundos, porfavor: ";
let segundosUsuario = Number.parseInt(prompt(mensaje));

//Mientras el numero ingresado no sea entero, se lo preguntamos. 
while(!Number.isInteger(segundosUsuario)) {
    mensaje = "Error. Introduce una cantidad de segundos, porfavor";
    segundosUsuario = Number.parseInt(prompt(mensaje)); //utilizamos el parseInt(), porque aunque sea decimal, se queda solo con la parte entera.
}

//Definimos las horas, minutos y segundos.
let horas = Number.parseInt(segundosUsuario / 3600);
let segundosRestantes = Number.parseInt(segundosUsuario % 3600);
let minutos = Number.parseInt(segundosRestantes / 60);
let segundos = Number.parseInt(segundosRestantes % 60);

alert(`Tu cantidad de segundos ha sido -> Horas: ${horas}, Minutos: ${minutos}, Segundos: ${segundos}.`);