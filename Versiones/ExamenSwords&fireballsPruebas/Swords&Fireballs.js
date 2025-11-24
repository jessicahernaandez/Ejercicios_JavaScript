
    // Importaciones de las clases de Unidades.
    import { Jugador } from "./Clases/Jugador.js";
    import { contratarTropas } from "./Funciones/FuncionesContratar.js";
    import { despedirTropas } from "./Funciones/FuncionesDespedir.js";
    import { combatir, tieneUnidadesConVida } from "./Funciones/FuncionesCombatir.js";
    import { mostrarEstado } from "./Funciones/FuncionesEstado.js";
    import { recuperacionTropas } from "./Funciones/FuncionesRecuperacion.js";

    
    //*******Mensaje de Bienvenida******//
    alert(`¡Bienvenido a \"Swords & fire balls\"!`);
    
    //******Dificultad del Juego********//
    let mensajeDificultad = "Elige dificultad \"facil\" o \"dificil\"";
    let respuestaDificultad = prompt(mensajeDificultad).trim().toLowerCase();

    //*******Comprobacion de que la respuesta de la dificultad sea correcta.******//
    while(respuestaDificultad != 'facil' && respuestaDificultad != 'dificil') {
        mensajeDificultad = "Error, opcion invalida.\nElige dificultad \"facil\" o \"dificil\"";
        respuestaDificultad = prompt(mensajeDificultad).trim().toLocaleLowerCase();
    }

    //*******Variables Iniciales********//
    let VictoriasParaGanar = respuestaDificultad == "dificil" ? 4 : 2; //Nos referimos a cada partida, es decir, necesita derrotar x tropas para ganar.
    let DerrotasParaPerder = 2; // Tropas derrotadas.
    let jugador = new Jugador();

    // Menu desplegable con opciones para el jugador
    // Dependiendo de la opcion que haya elegido el jugador, haremos x accion.
    let salir = false; // Variable para controlar cuando el jugador quiera salir.

    //Mientras el jugador no quiera salir, mientras no tenga las derrotas y las victorias para ganar o perder la partida y no se de el caso de que el jugador no tengo intentos de contratacion y tropas.
    while(!salir && jugador.getDerrotas < DerrotasParaPerder && jugador.getVictorias < VictoriasParaGanar && !(jugador.getIntentosContratacion === 0 && jugador.getTropasJugador.length == 0)) { 

        let menuAcciones = `Oro ${jugador.getOroJugador} | V ${jugador.getVictorias} D ${jugador.getDerrotas}\n\nIntentos contratar restantes: ${jugador.getIntentosContratacion} | Recuperación: ${jugador.getUsoRecuperacion === true ? 'Si' : 'No'}\n\nElige una acción:\n1) Contratar\n2) Despedir\n3) Combatir\n4) Recuperarse\n5) Ver estado detallado\n0) Salir`;
        let accionJugador = parseInt(prompt(menuAcciones));

        // Comprobacion de que la respuesta del Jugador este entre en rango de opciones.
        while(isNaN(accionJugador) || accionJugador < 0 || accionJugador > 5) {
            menuAcciones = `Error, introduce una opción valida.\nOro ${jugador.getOroJugador} | V ${jugador.getVictorias} / D ${jugador.getDerrotas}\nIntentos contratar restantes: ${jugador.getIntentosContratacion} | Recuperación: ${jugador.getUsoRecuperacion === true ? 'Si' : 'No'}\n\n\nElige una acción:\n1) Contratar\n2) Despedir\n3) Combatir\n4) Recuperarse\n5) Ver estado detallado\n0) Salir`;
            accionJugador = parseInt(prompt(menuAcciones));
        } 

        switch(accionJugador) {
            case 1:
                // Se encuentra en el fichero "FuncionesContratar.js";
                contratarTropas(jugador);
                break;
            case 2:

                // Si el jugador tiene tropas disponibles, entonces llamamos a la funcion.
                if(jugador.getTropasJugador.length > 0) {
                    despedirTropas(jugador); // Se encuentra en el fichero "FuncioncesDespedir.js"
                } else {
                    alert(`No tienes unidades para despedir.`);
                }
                break;

            case 3:

                //Si el jugador tiene ejercito y al menos una unidad disponible con > O PVs 
                if(jugador.getTropasJugador.length != 0 && tieneUnidadesConVida(jugador.getTropasJugador)) {
                    combatir(jugador); // Se encuentra en el ficher "FuncionesCombatir.js"
                } else {
                    alert(`Necesitas al menos una unidad con PVs > 0 para combatir`);
                } 
                break;

            case 4:

                // Si el jugador tiene al menos 1 V o 1 D y tiene la recuperacion disponible. 
                if ((jugador.getVictorias != 0 || jugador.getDerrotas != 0) && jugador.getUsoRecuperacion == true) {
                    recuperacionTropas(jugador); // Se encuentra en el fichero "FuncionesRecuperacion.js";
                } else {
                    alert(`La recuperación solo está disponible después de un combate y una sola vez.`);
                }
                break;

            case 5:

                // Muestro el mensaje del estado de sus tropas.
                let mensajeEstado = mostrarEstado(jugador); // Se encuentra en "FuncionesEstado.js"
                alert(mensajeEstado);
                break;

            case 0:
                // El usuario ha decidido salir.
                alert(`Hasta la proxima`);
                salir = true; 
                break;

            default:
        }

    }

    // Una vez salga de este while de menu de acciones, es porque ha ganado, perdido o se ha quedado sin intentos de contratacion.
    if (jugador.getVictorias === VictoriasParaGanar) {
        alert(`Has ganado la partida`);
    } else if (jugador.getDerrotas === DerrotasParaPerder) {
        alert(`La CPU ha ganado la partida`);
    } else if (jugador.getIntentosContratacion === 0 && jugador.getTropasJugador.length == 0) {
        alert(`Has gastado todos los intentos y no tienes tropas. Creo que esto no es lo tuyo...`);
    }


    // Ya que trabajamos con arrays donde guardamos las tropas. Podemos utilizar el metodo splice(), para cuando queramos despedir uno de nuestras tropas y no queden huecos.
    //splice(indice, cuantosElementos, insertarElemento):
    //*Con el indice indico, cual es el elemento que quiero borrar. (o desde donde quiero modificar el array).
    //*Con cuantos elementos indico, cuantos elementos quiero eliminar.
    //*Con insertarElementos, pongo los elementos que quiero insertar en el array, asi sean 2 o 3, los elementos se insertan desde el indice que hemos puesto.
    //Los ultimos 2 son opcionales. Al utilizar este metodo el array se modifica automaticamente, eliminando el elemento que inique, los elementos restantes se reorganizan y no quedan huecos.
    //Con splice puedo guardar el elemento que he borrado. Devuelve un array con los elementos borrados.
    



