
alert(`¡Bienvenido a \"Swords & fire balls\"!`);
let mensajeDificultad = "Elige dificultad \"facil\" o \"dificil\"";
let respuestaDificultad = prompt(mensajeDificultad).trim().toLowerCase();

while(respuestaDificultad != 'facil' && respuestaDificultad != 'dificil') {
    mensajeDificultad = "Error, opcion invalida.\nElige dificultad \"facil\" o \"dificil\"";
    respuestaDificultad = prompt(mensajeDificultad).trim().toLocaleLowerCase();
}

if(respuestaDificultad == 'facil') {
    alert(`El objetivo del juego es derrotar a 2 adversarios, que serán generados con ejércitos aleatorios.\nSi el jugador es derrotado 2 veces pierde la partida.`);
} else {
    alert(`El objetivo del juego es derrotar a 4 adversarios que serán generados con ejércitos aleatorios.\nSi el jugador es derrotado 2 veces pierde la partida.`);
}

