// Importaciones de las clases de Unidades.

/****************** FUNCIONES DEL MENU PRINCIPAL ***********************/

/************************ CASE 5 -> VER ESTADO DETALLADO *************************/

// Aqui solo tenemos una funcion que muestra el estado actual de la tropa del jugador.
// Esta funcion tambien es utilizada y llamada en el caso 5, para mostrar el estado de un ejercito
// despues de combatir y luego cuando se ha aplicado la recuperacion.
export function mostrarEstado (jugador) {

    let mensajeEstado = `Victorias ${jugador.getVictorias} | Derrotas: ${jugador.getDerrotas}\nIntentos de contratar: ${jugador.getIntentosContratacion}\n`;
    mensajeEstado += `Recuperación disponible: ${(jugador.getUsoRecuperacion ? 'Sí' : 'No')}\n\n`;
    if (jugador.getTropasJugador.length > 0) {
        mensajeEstado += `EJÉRCITO:\n`;
        jugador.getTropasJugador.forEach((tropa, indice) => mensajeEstado += `${indice + 1}: ${tropa.getNombre} (ATK ${tropa.getAtaque}) PVs ${tropa.getPuntosVida}/${tropa.getPuntosVidaMax} ${(tropa.getPuntosVida == 0 ? '[KO]' : '')}\n`);
    } else {
        mensajeEstado += `Aún no tienes ejercito.`;
    }
    
    return mensajeEstado;
}