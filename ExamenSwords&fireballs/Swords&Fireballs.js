    // Importaciones de las clases de Unidades.
    import { Guerrero } from "./Guerrero.js";
    import { Ladron } from "./Ladron.js";
    import { Mago } from "./Mago.js";
    import { Jugador } from "./Jugador.js";
    import { Ejercito } from "./Ejercito.js";
    import { esContratable, generarTropa } from "./Funciones.js";

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

    // Variables Iniciales
    let VictoriasParaGanar = respuestaDificultad == "dificil" ? 4 : 2;
    let DerrotasParaPerder = 2;
    let jugador = new Jugador();
    let ejercitoJugador = new Ejercito();
    let recuperacionTexto = jugador.getRecuperacion == true ? 'Si' : 'No';
    let numDeCombates = 0;


    // let tropaPrueba = generarTropa();
    // alert(tropaPrueba.toString());
    // Menu desplegable con opciones para el jugador
    
    //Dependiendo de la opcion que haya elegido el jugador, haremos x accion.
    while(jugador.getDerrotas != DerrotasParaPerder || jugador.getVictorias != VictoriasParaGanar || jugador.getIntentosContratacion != 0) {

        let menuAcciones = `Oro ${jugador.getOroJugador} | V ${jugador.getVictorias} D ${jugador.getDerrotas}\n\nIntentos contratar restantes: ${jugador.getIntentosContratacion} | Recuperación: ${recuperacionTexto}\n\nElige una acción:\n1) Contratar\n2) Despedir\n3) Combatir\n4) Recuperarse\n5) Ver estado detallado\n0) Salir`;
        let accionJugador = parseInt(prompt(menuAcciones));

        // Comprobacion de que la respuesta del Jugador este entre en rango de opciones.
        while(isNaN(accionJugador) || accionJugador < 0 || accionJugador > 5) {
            menuAcciones = `Error, introduce una opción valida.\nOro ${jugador.getOroJugador} | V ${jugador.getVictorias} / D ${jugador.getDerrotas}\nIntentos contratar restantes: ${jugador.getIntentosContratacion} | Recuperación: ${recuperacionTexto}\n\n\nElige una acción:\n1) Contratar\n2) Despedir\n3) Combatir\n4) Recuperarse\n5) Ver estado detallado\n0) Salir`;
            accionJugador = parseInt(prompt(menuAcciones));
        } 

        switch(accionJugador) {
            case 1:
                //Contratar.
                //Comprobaciones para saber si puede contratar a tropa en su ejercito.
                if (jugador.getOroJugador < 1000) {
                    alert(`Necesitas al menos 1000 de oro para ver mercenarios.`);
                } else if (jugador.getIntentosContratacion == 0) {
                    alert(`Ya has agotado los intentos de contratación.`);
                } else if (ejercitoJugador.getNumTropas == 5) {
                    alert(`Ya no tienes huecos disponibles en tu ejercito.`);
                } else {
                    //Mostramos el menu
                    let tropa1 = generarTropa();
                    let tropa2 = generarTropa();
                    let tropa3 = generarTropa();

                    let mensajeTropa = `Mercenarios disponibles (oro: ${jugador.getOroJugador})\n1)${tropa1.toString()} -> ${esContratable(jugador.getOroJugador, tropa1.costeContratacion)}\n2)${tropa2.toString()} -> ${esContratable(jugador.getOroJugador, tropa2.getCosteContratacion)}\n3)${tropa3.toString()} -> ${esContratable(jugador.getOroJugador, tropa3.getCosteContratacion)}\n\nElige 1-3 para contratar, 0 para cancelar:`;
                    let tropaElegidaJugador = prompt(mensajeTropa);

                    while(isNaN(tropaElegidaJugador) || tropaElegidaJugador < 0 || tropaElegidaJugador >=4) {
                        mensajeTropa = `Error, introduce una opcion válida\nMercenarios disponibles (oro: ${jugador.getOroJugador})\n1)${tropa1.toString()} -> ${esContratable(jugador.getOroJugador, tropa1.costeContratacion)}\n2)${tropa2.toString()} -> ${esContratable(jugador.getOroJugador, tropa2.getCosteContratacion)}\n3)${tropa3.toString()} -> ${esContratable(jugador.getOroJugador, tropa3.getCosteContratacion)}\n\nElige 1-3 para contratar, 0 para cancelar:`;
                        tropaElegidaJugador = parseInt(prompt(mensajeTropa));
                    }
                        if (tropaElegidaJugador == 1) {
                            ejercitoJugador.guardaEjercito(tropa1);
                            jugador.setCambiaOro = (tropa1.getCosteContratacion);
                        } else if (tropaElegidaJugador == 2) {
                            ejercitoJugador.guardaEjercito(tropa2);
                            jugador.setCambiaOro = (tropa2.getCosteContratacion);
                        } else if (tropaElegidaJugador == 3) {
                            ejercitoJugador.guardaEjercito(tropa3);
                            jugador.setCambiaOro = (tropa3.getCosteContratacion);
                        } 

                        jugador.setIntentosContratacion = 1;
                }
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

    }
    



