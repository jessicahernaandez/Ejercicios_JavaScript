let mensajeInicial= "Introduce la inicial del día a consultar: ";
let respuestaInicial = prompt(mensajeInicial);

//L,M,X,J,V,S,D
respuestaInicial = respuestaInicial.toUpperCase();
while(respuestaInicial !="L" && respuestaInicial !="M" && respuestaInicial !="X" && respuestaInicial !="J" && respuestaInicial !="V" && respuestaInicial !="S" && respuestaInicial !="D") {
    mensajeInicial= "Incorrecto, letras disponibles: (L,M,X,J,V,S,D): ";
    respuestaInicial = prompt(mensajeInicial);
    respuestaInicial = respuestaInicial.toUpperCase();
}

switch(respuestaInicial) {
    case "L":
        alert(`Has elegido el dia LUNES. Horario: 10:00-20:00`);
        break;
    
    case "M":
        alert(`Has elegido el dia MARTES. Horario: 10:00-19:00`);
        break;

    case "X":
        alert(`Has elegido el dia MIÉRCOLES. Horario: 10:00-16:00`);
        break;

    case "J":
        alert(`Has elegido el dia JUEVES. Horario: 10:00-15:00`);
        break;

    case "V":
        alert(`Has elegido el dia VIERNES. Horario: 10:00-14:00`);
        break;

    case "S":
        alert(`Has elegido el dia SABADO. Horario: 10:00-13:00`);
        break;
    
    case "D":
        alert(`Has elegido el dia DOMINGO. Horario: Cerrado`);
        break;     
}