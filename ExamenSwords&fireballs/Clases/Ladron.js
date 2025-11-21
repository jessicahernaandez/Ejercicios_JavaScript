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
            let probabilidad = Math.floor(Math.random() * 100) + 1; //genera randoms entre 1 y 100.
            if(probabilidad <= 35) {
                this.esquivas--;
            } else { //Si no saca la probabilidad 35 o menos, recibe el daño.
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

    //Igual que las otras clases, hereda los GET y SET de la clase Padre, escribo solo el de la habilidad especial.
    //METODOS GET Y SET DE LA HABILIDAD ESPECIAL
    get getEsquivas () {
        return this.esquivas;
    }

    set setEsquivas (nuevoValor) {
        this.esquivas = nuevoValor;
    }

}