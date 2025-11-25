import { tropasMostrar } from "./FuncionesContratar.js";

/****************** FUNCIONES DEL MENU PRINCIPAL ***********************/

/************************ CASE 3 -> COMBATIR *************************/
// Funcion que contiene la logica de los turnos y maneja los mensajes informativos de cuando 
// el usuario tiene ventaja de tipo o habiidades especiales activas.

//***************DOS NUEVAS FUNCIONALIDADES,*****************/
/*********************** QUE EMPIECE LA RONDA QUIEN A GANADO LA ANTERIOR.*********************************/
/*********************** QUE EMPIECE LA RONDA QUIEN A PERDIDO LA ANTERIOR.*********************************/
/*********************** QUE EMPIECE PERSONA ALEATORIA.*********************************/
export function combatir (jugador) {

    //Generamos las tropas Aleatorias de la CPU con la cantidad aleatoria entre 3 y 5,
    let tropasAleatoriasCPU = generaTropasCPU();
    
    //Llamamos a la funcion que muestra el mensaje de las tropas disponibles.
    muestraTropasCombatir(jugador, tropasAleatoriasCPU);

    let tropasDerrotadasJugador = 0;
    //Mientras ambos tengan al menos una unidad viva, se realiza el combate
    let turnoAleatorio = Math.random() < 0.5 ? "Jugador" : "CPU";
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

            alert(`Empieza ${turnoAleatorio}`);
            let mensajeRespuesta = "";
            let mensajeTurnos = `TURNO ${numTurnos}\n`;
            //Dependiendo de haya empezado la primer ronda de manera aleatoria
            if (turnoAleatorio === "Jugador") {
                /*******************Llamada al ataque del Jugador**********************/
                mensajeTurnos += ataqueJugador(tropaJugador, tropaCPU, numTurnos, true);

                //******** ATAQUE DE LA CPU (Si tiene vida) ********//
                if (tropaCPU.getKO != true) { 
                    mensajeRespuesta = ataqueCPU(tropaCPU, tropaJugador, numTurnos, false);

                } else {
                    // Si la tropa no tiene vida es porque el Jugador ha ganado este turno.
                    // Entonces generamos un mensaje donde informemos.
                    mensajeRespuesta = ` CPU ${tropaCPU.getNombre} no puede responder (KO)`;
                }
            } else if (turnoAleatorio === "CPU") {
                
                // Empieza la CPU
                mensajeTurnos += ataqueCPU(tropaCPU, tropaJugador, numTurnos, true);

                //Responde el jugador si sigue vivo
                if(tropaJugador.getKO != true) {
                    mensajeRespuesta = ataqueJugador(tropaJugador, tropaCPU, numTurnos, false);
                } else {
                    mensajeRespuesta = `Tropa ${tropaJugador.getNombre} no puede responder (KO)`;
                }
            }

            // Uno los dos mensajes.
            mensajeTurnos += mensajeRespuesta;
            alert(mensajeTurnos);

            // Decidir el ganador de turno.
            if (tropaCPU.getKO) {
                turnoGanado = `Tu ${tropaJugador.getNombre}`;
                tropasDerrotadasJugador++;
                turnoAleatorio = "CPU";
            }

            if (tropaJugador.getKO) {
                turnoGanado = `CPU ${tropaCPU.getNombre}`;
                turnoAleatorio = "Jugador";
            }

            numTurnos++;
            mensajeTurnos = "";
        } 

        // Si sale del bucle interno es porque alguno se ha quedado sin vida.
        let mensajeFinal = mensajeFinalTurno(tropaJugador, tropaCPU, turnoGanado);
        alert(mensajeFinal);
        alert(`Este turno lo ha perdido: ${turnoAleatorio} asi que empieza él.`);
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

// Funcion en la que contiene todo lo necesario al ataque del jugador
// Para que empiece o no, paso unj boolean que este en true, en caso de que empieza
function ataqueJugador (tropaJugador, tropaCPU, numTurnos, empieza) {

    // Sacamos las variables necesarias.

    let empiezaOno = empieza ? "ataca" : "responde";

    // Solo poner el nombre en alguno de estos dos casos. Mago o Guerrero.
    let mensajeHabilidadEspecial = habilidadAtacarMensaje(tropaJugador);
    let mensajeVentaja = tropaJugador.ventajaTipo(tropaCPU.getNombre) ? '[Ventaja de Tipo]' : '';

    //********* ATAQUE DEL JUGADOR **********//
    let dañoFinal = dañoRealizar(tropaJugador, tropaCPU);
                
    // Caso especial ladrón recibiendo daño del Rival
    let mensajeEsquivaCPU = realizarAtaque(tropaCPU, dañoFinal);

    let mensajeTurnos = "";
    mensajeTurnos += `Tu ${tropaJugador.getNombre} ${empiezaOno} ${mensajeHabilidadEspecial} ${mensajeVentaja}: ${dañoFinal} daño -> `;
    mensajeTurnos += `${mensajeEsquivaCPU} CPU ${tropaCPU.getNombre} queda a ${tropaCPU.getPuntosVida} PVs\n`;

    return mensajeTurnos;

}


function ataqueCPU (tropaCPU, tropaJugador, mensajeRespuesta, empieza) {
    // Lo mismo con la CPU, en el mismo orden llamando a cada funcion correspondiente.
    let mensajeHabilidadEspecialCPU = habilidadAtacarMensaje(tropaCPU);
    let mensajeVentajaCPU = tropaCPU.ventajaTipo(tropaJugador.getNombre) ? '[Ventaja de Tipo]' : '';

    let empiezaOno = empieza ? "ataca" : "responde";

    let dañoFinalCPU = dañoRealizar(tropaCPU, tropaJugador);

    // Caso especial ladrón recibiendo daño
    let mensajeEsquivaJugador = realizarAtaque(tropaJugador, dañoFinalCPU);

    mensajeRespuesta = `CPU ${tropaCPU.getNombre} ${empiezaOno} ${mensajeHabilidadEspecialCPU} ${mensajeVentajaCPU}: ${dañoFinalCPU} daño -> `;
    mensajeRespuesta += `${mensajeEsquivaJugador} Tu ${tropaJugador.getNombre} queda a ${tropaJugador.getPuntosVida} PVs\n`;

    return mensajeRespuesta;
}

/* if (numTurnos % 3 === 0) {
    dañoFinal = Math.floor(dañoFinal * 1.2);
}
    
if (Math.random() < 0.20) {
    tropaJugador.recibirDaño(10);
    tropaCPU.recibirDaño(10);

    // sANGRADO
    tropaJugador.estado = { tipo: "sangrado", turnos: 2 };

    if (tropaJugador.estado?.tipo === "sangrado") {
    tropaJugador.recibirDaño(5);
    tropaJugador.estado.turnos--;

    if (tropaJugador.estado.turnos <= 0) tropaJugador.estado = null;
}

if (jugador.inventario.pociones > 0) {
    tropaJugador.curar(30);
    jugador.inventario.pociones--;
}

jugador.inventario = { pociones: 2 };


}*/