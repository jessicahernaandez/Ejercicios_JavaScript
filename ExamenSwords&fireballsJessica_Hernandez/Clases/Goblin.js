// ******** MODIFICACION ****** //
// **** CLASE NUEVA -> GOBLIN **** //

import { TipoUnidad } from "./TipoUnidad.js";

export class Goblin extends TipoUnidad {

    constructor () {
        super("Goblin", 500, 250, 40, 50);
        // Sobreescribimos ataque
        this.ataque = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
        this.atributoEspecial = "Preparar huida";
        this.intentosHuir = 2;
    }

    // Recibir Daño. Aplicando los intentos de huir.
    recibirDaño (dañoRival) {

        if(this.intentosHuir > 0) {
            let probabilidad = Math.floor(Math.random() * 100) + 1; //genera randoms entre 1 y 100.
            if(probabilidad <= 60) {
                this.intentosHuir--;
            } else { //Si no saca la probabilidad 35 o menos, recibe el daño.
                super.recibirDaño(dañoRival);
            }
        }      
    }

    recuperarse() {
        super.recuperarse();
        this.intentosHuir = 5;
    }

    get getNumHuidas () {
        return this.intentosHuir;
    }

    set setModificaHuidas (cantidad) {
        this.intentosHuir -= cantidad;
    }
}