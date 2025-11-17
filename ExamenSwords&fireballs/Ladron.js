// Clase Ladron que hereda de la clase Padre Unidad.

import { TipoUnidad } from "./TipoUnidad.js";

export class Ladron extends TipoUnidad {

    //Constructor
    constructor () {
        super("Ladron", 1500, 750, 50, 80);

        //Habilidad especial de los ladrones.
        this.esquivas = 2;
    }

    //En esta clase sobreescribimos el metodo de recibir daño, gracias a sus habilidad especial de esquivar.
    recibirDaño (dañoRival) {

        if(this.esquivas > 0) {
            let probabilidad = Math.random(); //Como Math.random saca numeros entre 0 (incluido) y 1 (excluido), entonces no necesitamos poner mas numeros.
            if(probabilidad <= 0.35) {
                this.esquivas--;
            } else { //Si no saca la probabilidad 0,35 o menos, recibe el daño.
                super.recibirDaño(dañoRival);
            }
        } else {
            //Si ya no tiene mas esquivas, recibe el daño.
            super.recibirDaño(dañoRival);
        }  
    }

    //Sobreescribo el metodo recuperarse, para que ademas pueda reeestablecer sus esquivas.
    recuperarse() {
        super.recuperarse();
        this.esquivas = 2;
    }
}