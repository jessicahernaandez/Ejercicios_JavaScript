// Clase Mago que hereda de la clase Padre TipoUnidad.

import { TipoUnidad } from "./TipoUnidad.js";

export class Mago extends TipoUnidad {

    //Constructor
    constructor() {
        super("Mago", 2000, 1000, 40, 60);

        //Habilidad especial
        this.bolaDeFuego = 1;
        this.habilidadEspecial = "Bola de Fuego";
    }

    //Sobreescribimos el metodo atacar, gracias a su habilidad especial
    atacar () {
        let daño = this.ataque;
        
        if(this.bolaDeFuego > 0) { //Si tiene 1 bola fuego entonces tirara su primer ataque a 60.
            daño = 60;
            this.bolaDeFuego--;
        }
        return daño;
    }

    //Sobreescribimos el metodo de recuperarse, para que pueda reestablecer la bola de fuego.
    recuperarse () {
        super.recuperarse();
        this.bolaDeFuego = 1;
    }

    //METODOS GET Y SET DE LA HABILIDAD ESPECIAL.
    get getCuantaHabilidadEspecial () {
        return this.bolaDeFuego;
    }

    get getNombreHabilidad () {
        return this.habilidadEspecial;
    }

    set setBolaFuego (nuevoValor) {
        this.bolaDeFuego = nuevoValor;
    }
}