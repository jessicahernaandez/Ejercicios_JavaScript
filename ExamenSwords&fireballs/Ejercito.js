//Clase Ejercito, donde guardaremos el ejercito completo del usuario.

export class Ejercito {

    //Contructor
    // A primeras, tendra la oportunidad de de tener 5 tropas, pero estaran vacias.
    constructor () {
        this.tropa1 = null;
        this.tropa2 = null;
        this.tropa3 = null;
        this.tropa4 = null;
        this.tropa5 = null;
        this.numTropas = 0;
    }

    // Metodo que guarda la tropa que recibe por parametro si hay espacio diponible.
    guardaEjercito (tropa) {
        let tropaGuardada = false;
        if(this.tropa1 != null) {
            this.tropa1 = tropa;
            tropaGuardada = true;
            this.numTropas++;
        } else if (this.tropa2 != null) {
            this.tropa2 = tropa;
            tropaGuardada = true;
            this.numTropas++;
        } else if (this.tropa2 != null) {
            this.tropa3 = tropa;
            tropaGuardada = true;
            this.numTropas++;
        } else if (this.tropa2 != null) {
            this.tropa4 = tropa;
            tropaGuardada = true;
            this.numTropas++;
        } else if (this.tropa2 != null) {
            this.tropa5 = tropa;
            tropaGuardada = true;
            this.numTropas++;
        } 

        return tropa;
    }

    //Metodo Get para poder modificar el numero de tropas.
    get getNumTropas () {
        return this.numTropas;
    }

    //Metodo Set para modificar numero de tropas.
    set setNumTropas (NuevoNumTropas) {
        this.numTropas = NuevoNumTropas;
    }
}

