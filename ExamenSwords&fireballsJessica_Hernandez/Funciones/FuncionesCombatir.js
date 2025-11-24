import { tropasMostrar } from "./FuncionesContratar.js";

/****************** FUNCIONES DEL MENU PRINCIPAL ***********************/

/************************ CASE 3 -> COMBATIR *************************/
// Funcion que contiene la logica de los turnos y maneja los mensajes informativos de cuando 
// el usuario tiene ventaja de tipo o habiidades especiales activas.
export function combatir (jugador) {

    //Generamos las tropas Aleatorias de la CPU con la cantidad aleatoria entre 3 y 5,
    let tropasAleatoriasCPU = generaTropasCPU();
    
    //Llamamos a la funcion que muestra el mensaje de las tropas disponibles.
    muestraTropasCombatir(jugador, tropasAleatoriasCPU);

    let tropasDerrotadasJugador = 0;
    //Mientras ambos tengan al menos una unidad viva, se realiza el combate
    while(tieneUnidadesConVida(jugador.getTropasJugador) && tieneUnidadesConVida(tropasAleatoriasCPU)) {

        // Seleccionamos la primer unidad viva del jugador y la primer unidad viva de la CPU.
        // El metodo find() nos devuelve la primer ocurrencia que cumple la condicion que le especificamos
        // Entonces nos devuelve la primer tropa que encuentra que no esta en KO.
        let tropaJugador = jugador.getTropasJugador.find((tropa) => tropa.getKO  == false);
        let tropaCPU = tropasAleatoriasCPU.find((tropa) => tropa.getKO == false);
        let numTurnos = 1;
        let turnoGanado = '';
        
        // Mientras la tropa del jugador y la tropa de la CPU tengan vida, entonces realizamos los turnos.
        while(tropaJugador.getKO != true && tropaCPU.getKO != true) {
            
            // Sacamos las variables necesarias.
            let mensajeTurnos = `TURNO ${numTurnos}\n`;

            // Solo poner el nombre en alguno de estos dos casos. Mago o Guerrero.
            let mensajeHabilidadEspecial = habilidadAtacarMensaje(tropaJugador);
            let mensajeVentaja = tropaJugador.ventajaTipo(tropaCPU.getNombre) ? '[Ventaja de Tipo]' : '';

            //********* ATAQUE DEL JUGADOR **********//
            let dañoFinal = dañoRealizar(tropaJugador, tropaCPU);
                
            // Caso especial ladrón recibiendo daño del Rival
            let mensajeEsquivaCPU = realizarAtaque(tropaCPU, dañoFinal);

            mensajeTurnos += `Tu ${tropaJugador.getNombre} ataca ${mensajeHabilidadEspecial} ${mensajeVentaja}: ${dañoFinal} daño -> `;
            mensajeTurnos += `${mensajeEsquivaCPU} CPU ${tropaCPU.getNombre} queda a ${tropaCPU.getPuntosVida} PVs\n`;

            
            //******** ATAQUE DE LA CPU (Si tiene vida) ********//
            let mensajeRespuesta = "";
            if (tropaCPU.getKO != true) { 
          
                // Lo mismo con la CPU, en el mismo orden llamando a cada funcion correspondiente.
                let mensajeHabilidadEspecialCPU = habilidadAtacarMensaje(tropaCPU);
                let mensajeVentajaCPU = tropaCPU.ventajaTipo(tropaJugador.getNombre) ? '[Ventaja de Tipo]' : '';

                let dañoFinalCPU = dañoRealizar(tropaCPU, tropaJugador);

                // Caso especial ladrón recibiendo daño
                let mensajeEsquivaJugador = realizarAtaque(tropaJugador, dañoFinalCPU);

                mensajeRespuesta = `CPU ${tropaCPU.getNombre} responde ${mensajeHabilidadEspecialCPU} ${mensajeVentajaCPU}: ${dañoFinalCPU} daño -> `;
                mensajeRespuesta += `${mensajeEsquivaJugador} Tu ${tropaJugador.getNombre} queda a ${tropaJugador.getPuntosVida} PVs`;

            } else {
                // Si la tropa no tiene vida es porque el Jugador ha ganado este turno.
                // Entonces generamos un mensaje donde informemos.
                mensajeRespuesta = ` CPU ${tropaCPU.getNombre} no puede responder (KO)`;
            }

            // Uno los dos mensajes.
            mensajeTurnos += mensajeRespuesta;
            alert(mensajeTurnos);

            // Decidir el ganador de turno.
            if (tropaCPU.getKO) {
                turnoGanado = `Tu ${tropaJugador.getNombre}`;
                tropasDerrotadasJugador++;
            }

            if (tropaJugador.getKO) {
                turnoGanado = `CPU ${tropaCPU.getNombre}`;
            }

            numTurnos++;
        } 

        // Si sale del bucle interno es porque alguno se ha quedado sin vida.
        let mensajeFinal = mensajeFinalTurno(tropaJugador, tropaCPU, turnoGanado);
        alert(mensajeFinal);
    }

    // Cuando sale del while principal quiere decir que uno de los 2 se ha quedado sin tropas vivas, entonces decidimos
    let mensajeGanador = '';
    let dineroGanado = tropasDerrotadasJugador * 500;
    if (tieneUnidadesConVida(jugador.getTropasJugador)) {
        mensajeGanador = `¡Has ganado el combate! + ${dineroGanado} oro. (Unidades CPU derrotadas: ${tropasDerrotadasJugador})`;
        jugador.setCambiaVictorias = 1;
    } else {
        mensajeGanador = `¡CPU ha ganado el combate! Mejor suerte la proxima.\nHas recibido ${dineroGanado} oro por las unidades derrotadas.\n`;
        mensajeGanador += `(Unidades CPU derrotadas: ${tropasDerrotadasJugador})`;
        jugador.setCambiaDerrotas = 1;
    }

    alert(mensajeGanador); 
    jugador.setSumaOro = dineroGanado; // Gane o pierda recibe dinero
    jugador.setUsoRecuperacion = true; //Una vez terminado el combate puede hacer una recuperacion.
    jugador.restaurarIntentosContratacion = 6; //Volver a poner los intentos a 6.

}

// Funcion que compruebe si el jugador tiene al menos una unidad con vida para poder combatir.
export function tieneUnidadesConVida (tropasArray) {

    // Mientras que el usuario tenga una unidad disponible sin estar KO, entonces
    // utilizo el metodo some, que me dice si algun objeto del array cumple con la condicion entonces
    // puede combatir. Si necesitara que todos y cada uno tienen que estar sin KO lo cambio
    // por la funcion every().
    let tieneVida = tropasArray.some((tropa) => tropa.getKO != true);

    return tieneVida;
}
// Funcion que generara el ejercito de la CPU utilizaremos la funcion en el fichero FuncionesContratar, 
// ya que genera un array con objetos de Mago, Guerrero o Ladron dependiendo de la cantidad.
export function generaTropasCPU () {

    let rangoMin = 3;
    let rangoMax = 5;
    let cantidad = Math.floor(Math.random() * (rangoMax - rangoMin + 1)) + rangoMin;

    let tropasAleatoriasCPU = tropasMostrar(cantidad); // Esta funcion se encuentra en funciones contratar, la he reutilizado.

    return tropasAleatoriasCPU;
}

// Esta funcion mostrara al usuario las unidades que tiene disponible para conbatir.
export function muestraTropasCombatir (jugador, tropasAleatoriasCPU) {

    //Primera parte del mensaje
    let mensajeCombatir = `Vas a combatir. Tus unidades disponibles:\n`;

    jugador.getTropasJugador.forEach((tropa, indice) => mensajeCombatir += `${indice + 1}) ${tropa.getNombre} ATK ${tropa.getAtaque} PVs ${tropa.getPuntosVida}/${tropa.getPuntosVidaMax}\n`);

    //Se tiene que pasar la informacion que tiene sobre las tropas de la CPU para concatenarlo al mensaje.
    mensajeCombatir += `\nLa CPU tiene ${tropasAleatoriasCPU.length} unidades`;
    alert(mensajeCombatir);

    // Le muestro las tropas de jugador //PRUEBA PARA VER LAS TROPAS RIVALES.
    let muestraTropasCPU = `Unidades CPU a combatir:\n`;
    tropasAleatoriasCPU.forEach((tropa, indice) => muestraTropasCPU += `${indice + 1}) ${tropa.getNombre} ATK ${tropa.getAtaque} PVs ${tropa.getPuntosVida}/${tropa.getPuntosVidaMax}\n`);
    alert(muestraTropasCPU);
}

// Funcion que devuelve el mensaje de la habilidad especial
// Recibe como parametro la tropa y devuelve su respectivo mensaje.
export function habilidadAtacarMensaje (tropa) {

    let mensajeHabilidadEspecial = ''; 

    // Si es Mago o Guerrero, al atacar tienen una habilidad especial que queremos informar al jugador.
    if(tropa.getNombre === "Mago" && tropa.getCuantaHabilidadEspecial > 0) {
        mensajeHabilidadEspecial = ` (${tropa.getNombreHabilidad})`;
    } else if (tropa.getNombre === "Guerrero" && tropa.getCuantaHabilidadEspecial > 0) {
        mensajeHabilidadEspecial = ` (${tropa.getNombreHabilidad})`;
    }

    return mensajeHabilidadEspecial;
}

// Funcion que devuelve el daño final. recibe como parametro la tropa
// Y devuelve el daño generado, controlamos el flujo de, que en el caso que exista ventaja
// se calcula y nos devuelve el valor aumentado, si no existe mensaje simplemente tendremos el
// mismo valor que el de daño base.
export function dañoRealizar (tropaDaño, tropaRivalDañar) {

    let dañoBase = tropaDaño.atacar(); // FUNCION
    let dañoFinal = tropaDaño.calcularDañoVentaja(dañoBase, tropaRivalDañar.getNombre);

    return dañoFinal;
}

// Funcion que realiza el ataque por medio del daño que se pasa como parametro a la tropa enemiga.
// Pero, tenemos que verificar si la tropa Rival es un ladron, de ser asi, tengo que verificar si ha 
// tenido la posibilidad de esquivar el daño y devolver un mensaje con esta informacion.
export function realizarAtaque (tropaDañar, dañoHacer) {

    let mensajeEsquiva = ""; 

    if (tropaDañar.getNombre === "Ladron") {
        let dañoAntes = tropaDañar.getPuntosVida;
        tropaDañar.recibirDaño(dañoHacer);
        let dañoDespues = tropaDañar.getPuntosVida;

        if(dañoAntes == dañoDespues) {
            mensajeEsquiva= " ¡Esquivado!";
        }
    } else {
        tropaDañar.recibirDaño(dañoHacer);
    }

    return mensajeEsquiva;

}

// Funcion que genera el mensaje final, una vez acaba el turno, ya sea porque la tropa del jugador quedo en KNO
// o la tropa de la CPU quedo en KO.
function mensajeFinalTurno (tropaJugador, tropaCPU, turnoGanado) {

    let mensajeFinal = `Tu ${tropaJugador.getNombre} (${tropaJugador.getPuntosVidaMax} PVs) vs CPU ${tropaCPU.getNombre} (${tropaCPU.getPuntosVidaMax} PVs)\n`;
    mensajeFinal += `-> Gana ${turnoGanado}\n`;
    mensajeFinal += `Tu ${tropaJugador.getNombre}: ${tropaJugador.getPuntosVida}/${tropaJugador.getPuntosVidaMax} PVs | `;
    mensajeFinal += `CPU ${tropaCPU.getNombre}: ${tropaCPU.getPuntosVida}/${tropaCPU.getPuntosVidaMax} PVs`;

    return mensajeFinal;

}