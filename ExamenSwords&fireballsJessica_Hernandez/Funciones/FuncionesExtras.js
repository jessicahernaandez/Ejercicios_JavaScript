//Fichero con funciones que ocuparemos en el fichero principal del juego.
import { Goblin } from "../Clases/Goblin.js";
import { Guerrero } from "../Clases/Guerrero.js";
import { Ladron } from "../Clases/Ladron.js";
import { Mago } from "../Clases/Mago.js";

export function generarTropa () { //Devuelve 1 tropa por cada vez que se llama.

    let probabilidad = Math.floor(Math.random() * 100) + 1; //Probabilidad entre 0 y 1.
    if(probabilidad <=20) {
        let tropa1 = new Goblin ();
        return tropa1;
    } else if (probabilidad > 20 && probabilidad <=40) {
        let tropa2 = new Mago();
        return tropa2;
    } else if (probabilidad > 40 && probabilidad <= 65) {
        let tropa3 = new Ladron();
        return tropa3;
    } else {
        let tropa4 = new Guerrero();
        return tropa4;
    }
}

// Funcion para saber si es contratable o no.
export function esContratable (oroJugador, CosteTropa) {

    let contratable = oroJugador >= CosteTropa ? 'Contratable' : 'NO contratable';

    return contratable;
}






