// Esta sera la clase Padre, en la que heredara de ella las clases Guerrero, Ladron y Mago.
// Al tener las 3 Unidades propiedades en comun, se crea esta clase Padre.

// Funcion Math.random, para sacar num Aleatorios entre rangos:
// Math.floor(Math.random() * (rangoMax - rangoMin + 1)) + rangoMin; 

export class TipoUnidad {

    //Constructor
    // *Solo paso por parametro el nombre para diferenciarlos.
    // *La vidaMin y vidaMax, porque dependiendo de la unidad tienen rangos de vida diferentes.
    // *Al igual que la vida, cada uno tiene coste de contratacion y ganancia de retirarlos diferentes.
    // *El ataque lo incializo dentro del contructor, porque todos tienen un ataque entre 10 y 20.
    constructor (nombre, costeContratacion, gananciaRetirarlo, vidaMin, vidaMax,) {
        this.nombre = nombre;
        this.ataque = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        this.costeContratacion = costeContratacion;
        this.gananciaRetirarlo = gananciaRetirarlo;
        this.puntosDeVidaMax = Math.floor(Math.random() * (vidaMax - vidaMin + 1)) + vidaMin; //Para poder generar la recuperacion a base de su vida fija
        this.puntosDeVida = this.puntosDeVidaMax; //Este si que puedo modificarlo.
    }

    //***** Metodos de la clase *****//
    // Metodo Atacar, se sobreescribira en cada una de las clases hijas, dependiendo de sus capacidades especiales.
    atacar () {
        return this.ataque;
    }

    // Metodo recibirDaño, se pasara por parametro el daño que haga la unidad rival, asi, esa cantidad se quita de los puntos de vida.
    recibirDaño (dañoRival) {
        this.puntosDeVida -= dañoRival;

        if(this.puntosDeVida < 0 || this.puntosDeVida == 0) { //Si ha recibido mucho daño y es menor o igual a 0, tiene 0 de vida.
            this.puntosDeVida = 0;
        }
    }

    // Metodo recuperarse, despues de una ronda, cada una de las unidades podran recuperar un 70% de los puntos de vida.
    // ** Falta comprobar mas adelante como puedo llamar a este metodo, o como puedo asegurarme que ya han combatido.
    recuperarse () { // ??? Se recuperan a base de la vida max, reemplazando su valor o se recuperan el 70% a partir de la vida que tenian.
        this.puntosDeVida = this.puntosDeVidaMax * 0.70;
    }

    //Metodos GETTERS
    get nombre () {
        return this.nombre;
    }

    get puntosVida () {
        return this.puntosDeVida;
    }

}