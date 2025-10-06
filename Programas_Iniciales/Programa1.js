let mensaje= "Introduce los segundos: ";
let respuesta = parseInt(prompt(mensaje, "125"));

//Mientras no sea un numero entero, seguira pidiendo.
while(!Number.isInteger(respuesta)) {
    mensaje= "Introduce los segundos: ";
    respuesta = parseInt(prompt(mensaje, "125"));
}

let TotalSegundos=respuesta;

let horas=parseInt(TotalSegundos/3600);
let segundosRestantes=parseInt(TotalSegundos%3600);
let minutos=parseInt(segundosRestantes/60);
let segundos=parseInt(segundosRestantes%60);

alert(`Tus segundos han sido -> Horas: ${horas} Minutos: ${minutos} Segundos: ${segundos}`);



