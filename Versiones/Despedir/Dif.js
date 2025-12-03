// Esta modificación evita que el jugador pueda despedir unidades que estén derribadas (KO). 
// Solo podrá despedir tropas activas.

export function despedirTropas(jugador) {
    let respuestaDespedir = menuDespedir(jugador);
    let tropaDespedida = [];

    if(respuestaDespedir != 0) {
        let tropaSeleccionada = jugador.getTropasJugador[respuestaDespedir - 1];
        
        if (tropaSeleccionada.getKO) {
            alert("No puedes despedir una unidad que está KO.");
            return [];
        }

        tropaDespedida = jugador.getTropasJugador.splice(respuestaDespedir - 1, 1);
        alert(tropaDespedida[0]);
        jugador.setSumaOro = tropaDespedida[0].getRetirarlo;
        alert(`Unidad retirada. Recuperas ${tropaDespedida[0].getRetirarlo} oro. Oro: ${jugador.getOroJugador}`);
    }

    return tropaDespedida;
}

// Aquí añadimos un prompt de confirmación, para evitar despidos accidentales:

export function despedirTropas(jugador) {
    let respuestaDespedir = menuDespedir(jugador);
    let tropaDespedida = [];

    if(respuestaDespedir != 0) {
        let tropaSeleccionada = jugador.getTropasJugador[respuestaDespedir - 1];

        let confirmar = confirm(`¿Seguro que quieres despedir a ${tropaSeleccionada.getNombre}?`);
        if(!confirmar) return [];

        tropaDespedida = jugador.getTropasJugador.splice(respuestaDespedir - 1, 1);
        alert(tropaDespedida[0]);
        jugador.setSumaOro = tropaDespedida[0].getRetirarlo;
        alert(`Unidad retirada. Recuperas ${tropaDespedida[0].getRetirarlo} oro. Oro: ${jugador.getOroJugador}`);
    }

    return tropaDespedida;
}

// Si quieres que solo se puedan despedir unidades sin haber recibido daño, podemos validar que puntosDeVida sea igual al máximo:
export function despedirTropas(jugador) {
    let respuestaDespedir = menuDespedir(jugador);
    let tropaDespedida = [];

    if(respuestaDespedir != 0) {
        let tropaSeleccionada = jugador.getTropasJugador[respuestaDespedir - 1];

        if (tropaSeleccionada.getPuntosVida < tropaSeleccionada.getPuntosVidaMax) {
            alert("No puedes despedir una unidad que ha recibido daño.");
            return [];
        }

        tropaDespedida = jugador.getTropasJugador.splice(respuestaDespedir - 1, 1);
        alert(tropaDespedida[0]);
        jugador.setSumaOro = tropaDespedida[0].getRetirarlo;
        alert(`Unidad retirada. Recuperas ${tropaDespedida[0].getRetirarlo} oro. Oro: ${jugador.getOroJugador}`);
    }

    return tropaDespedida;
}

// Si quieres que el jugador nunca se quede sin tropas, puedes bloquear el despido si es la última unidad:

export function despedirTropas(jugador) {
    if(jugador.getTropasJugador.length <= 1) {
        alert("No puedes despedir la última unidad.");
        return [];
    }

    let respuestaDespedir = menuDespedir(jugador);
    let tropaDespedida = [];

    if(respuestaDespedir != 0) {
        tropaDespedida = jugador.getTropasJugador.splice(respuestaDespedir - 1, 1);
        alert(tropaDespedida[0]);
        jugador.setSumaOro = tropaDespedida[0].getRetirarlo;
        alert(`Unidad retirada. Recuperas ${tropaDespedida[0].getRetirarlo} oro. Oro: ${jugador.getOroJugador}`);
    }

    return tropaDespedida;
}