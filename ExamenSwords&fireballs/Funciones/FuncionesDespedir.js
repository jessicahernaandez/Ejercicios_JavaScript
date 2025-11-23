import { Guerrero } from "../Clases/Guerrero.js";
import { Ladron } from "../Clases/Ladron.js";
import { Mago } from "../Clases/Mago.js";
import { Jugador} from "../Clases/Jugador.js";

/****************** FUNCIONES DEL MENU PRINCIPAL ***********************/

/************************ CASE 2 -> DESPEDIR *************************/
// Funcion principal, despide a las tropas, llama a una funcion que muestra el 
// menu de las tropas que puede despedir y segun el valor, elimina esa tropa y la devuelve.
export function despedirTropas(jugador) {
              
    let respuestaDespedir = menuDespedir(jugador);
    let tropaDespedida = [];

    if(respuestaDespedir != 0) {
        //Una vez hecha las comprobaciones, procedo a eliminar las tropas.
        tropaDespedida = jugador.getTropasJugador.splice(respuestaDespedir - 1, 1); //Lo elimino y lo guardo. //Splice me devuelve un array.
        alert(tropaDespedida[0]);
        //Sumo el oro al jugador
        jugador.setSumaOro = tropaDespedida[0].getRetirarlo;
        alert(`Unidad retirada. Recuperas ${tropaDespedida[0].getRetirarlo} oro. Oro: ${jugador.getOroJugador}`);
    }
    

    return tropaDespedida;
}

// Funcion que muestra el menu al usuario de las tropas que tiene
// para que pueda despedir alguna de elllas.
// Devuelve la respuesta del jugador
export function menuDespedir(jugador) {

    let mensajeDespedir = `Elige índice para despedir (oro: ${jugador.getOroJugador})\n`;
    //Ahora al mensaje agrego la informacion de las tropas
    jugador.getTropasJugador.forEach((tropa,indice) => mensajeDespedir += `#${indice + 1}: ${tropa.getNombre} (ATK ${tropa.getAtaque} PVs ${tropa.getPuntosVida}/${tropa.getPuntosVidaMax})\n`);

    //A base de esa cantidad, agrego al mensaje por medio de un for, las unidades vacias.
    for(let unidadVacia=jugador.getTropasJugador.length + 1;unidadVacia<=5;unidadVacia++) {
        mensajeDespedir += `#${unidadVacia}: [vacío]\n`;
    }

    //Y por ultimo concateno la ultima linea del mensaje.
    mensajeDespedir += `0 para cancelar:`;

    let respuestaDespedir = parseInt(prompt(mensajeDespedir));
 
    while(isNaN(respuestaDespedir) || respuestaDespedir < 0 || respuestaDespedir > 5) {
        //Mensaje
        mensajeDespedir = `Error, introduce una opcion válida.\nElige índice para despedir (oro: ${jugador.getOroJugador})\n`;
        jugador.getTropasJugador.forEach((tropa,indice) => mensajeDespedir += `#${indice + 1}: ${tropa.getNombre} (ATK ${tropa.getAtaque} PVs ${tropa.getPuntosVida}/${tropa.getPuntosVidaMax})\n`);
                        
        for(let unidadVacia=jugador.getTropasJugador.length + 1;unidadVacia<=5;unidadVacia++) {
            mensajeDespedir += `#${unidadVacia}: [vacío]\n`;
        }
        mensajeDespedir += `0 para cancelar:`;

        //Respuesta
        respuestaDespedir = parseInt(prompt(mensajeDespedir));
    }

    return respuestaDespedir;
}