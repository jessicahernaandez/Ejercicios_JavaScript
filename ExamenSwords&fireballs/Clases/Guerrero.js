// Clase Guerrero, hereda de la clase TipoUnidad.

import { TipoUnidad } from "./TipoUnidad.js";

export class Guerrero extends TipoUnidad {

    //Constructor
    constructor () { 
        //llamamos al constructor padre
        super("Guerrero", 1000, 500, 60, 100);

        //Guerrero tiene una habilidad especial
        this.ataquesConcentrados = 3;
    }

    //Sobreescribimos el metodo atacar de la clase Padre gracias a su habilidad especial.
    atacar () {
        let daño = this.ataque;

        if(this.ataquesConcentrados > 0) { //Si tiene daños contrados, atacara con un daño entre entre 5 y 10.
            let dañoExtra = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
            daño += dañoExtra;
            this.ataquesConcentrados--;
        }

        return daño;
    }

    //Sobreescribimos el metodo recuperarse para que asi podamos volver a restablecer sus ataques concentrados.
    recuperarse () {
        super.recuperarse(); //LLamo al metodo recuperarse del Padre.
        this.ataquesConcentrados = 3;
    }

    //Como hereda todos los get y set de la clase Padre, solo escribire el get y set de la habilidad especial.
    //GET Y SET HABILIDAD ESPECIAL.
    get getAtaquesConcentrados () {
        return this.ataquesConcentrados;
    }

    set setAtaqueConcentrado (nuevoAtaque) {
        this.ataquesConcentrados = nuevoAtaque;
    }
}