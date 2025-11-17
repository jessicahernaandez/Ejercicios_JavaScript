    // Importaciones de las clases de Unidades.
    import { Guerrero } from "./Guerrero.js";
    import { Ladron } from "./Ladron.js";
    import { Mago } from "./Mago.js";

    // Mensaje de Bienvenida
    alert(`¡Bienvenido a \"Swords & fire balls\"!`);
    
    // Dificultad del Juego
    let mensajeDificultad = "Elige dificultad \"facil\" o \"dificil\"";
    let respuestaDificultad = prompt(mensajeDificultad).trim().toLowerCase();

    // Comprobacion de que la respuesta de la dificultad sea correcta.
    while(respuestaDificultad != 'facil' && respuestaDificultad != 'dificil') {
        mensajeDificultad = "Error, opcion invalida.\nElige dificultad \"facil\" o \"dificil\"";
        respuestaDificultad = prompt(mensajeDificultad).trim().toLocaleLowerCase();
    }

    // Prueba
    if(respuestaDificultad == 'facil') {
        alert(`El objetivo del juego es derrotar a 2 adversarios, que serán generados con ejércitos aleatorios.\nSi el jugador es derrotado 2 veces pierde la partida.`);
    } else {
        alert(`El objetivo del juego es derrotar a 4 adversarios que serán generados con ejércitos aleatorios.\nSi el jugador es derrotado 2 veces pierde la partida.`);
    }

    // Variables Iniciales
    let oroJugador = 5000;
    let victorias = 0;
    let derrotas = 0;
    let intentosContratar = 5;
    let recuperacion = false;
    let recuperacionTexto = recuperacion == true ? 'Si' : 'No';

    // Menu desplegable con opciones para el jugador
    let menuAcciones = `Oro ${oroJugador} | V ${victorias} D ${derrotas}\n\nIntentos contratar restantes: ${intentosContratar} | Recuperación: ${recuperacionTexto}\n\nElige una acción:\n1) Contratar\n2) Despedir\n3) Combatir\n4) Recuperarse\n5) Ver estado detallado\n0) Salir`;
    let accionJugador = parseInt(prompt(menuAcciones));

    // Comprobacion de que la respuesta del Jugador este entre en rango de opciones.
    while(isNaN(accionJugador) || accionJugador < 0 || accionJugador > 5) {
        menuAcciones = `Error, introduce una opción valida.\nOro ${oroJugador} | V ${victorias} / D ${derrotas}\nIntentos contratar restantes: ${intentosContratar} | Recuperación: ${recuperacionTexto}\n\n\nElige una acción:\n1) Contratar\n2) Despedir\n3) Combatir\n4) Recuperarse\n5) Ver estado detallado\n0) Salir`;
        accionJugador = parseInt(prompt(menuAcciones));
    } 
    
    //Dependiendo de la opcion que haya elegido el jugador, haremos x accion.
    switch(accionJugador) {
        case 1:
            alert(`Caso 1`);
            break;
        
        case 2:
            alert(`Caso 2`);
            break;

        case 3:
            alert(`Caso 3`);
            break;

        case 4:
            alert(`Caso 4`);
            break;

        case 5:
            alert(`Caso 5`);
            break;

        case 0:
            alert(`Caso 6`);
            break;

        default:
    }



