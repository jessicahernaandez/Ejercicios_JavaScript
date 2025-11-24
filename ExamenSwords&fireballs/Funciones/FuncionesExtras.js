//Fichero con funciones que ocuparemos en el fichero principal del juego.
import { Guerrero } from "../Clases/Guerrero.js";
import { Ladron } from "../Clases/Ladron.js";
import { Mago } from "../Clases/Mago.js";

export function generarTropa () { //Devuelve 1 tropa por cada vez que se llama.

    let probabilidad = Math.floor(Math.random() * 100) + 1; //Probabilidad entre 0 y 1.
    if(probabilidad <=20) {
        let tropa1 = new Mago ();
        return tropa1;
    } else if (probabilidad > 20 && probabilidad <=50) {
        let tropa2 = new Ladron();
        return tropa2;
    } else {
        let tropa3 = new Guerrero();
        return tropa3;
    }
}

// Funcion para saber si es contratable o no.
export function esContratable (oroJugador, CosteTropa) {

    let contratable = oroJugador >= CosteTropa ? 'Contratable' : 'NO contratable';

    return contratable;
}






