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
    constructor (nombre, costeContratacion, gananciaRetirarlo, vidaMin, vidaMax) {
        this.nombre = nombre;
        this.costeContratacion = costeContratacion;
        this.gananciaRetirarlo = gananciaRetirarlo;
        this.puntosDeVidaMax = Math.floor(Math.random() * (vidaMax - vidaMin + 1)) + vidaMin; //Para poder generar la recuperacion a base de su vida fija.
        this.puntosDeVida = this.puntosDeVidaMax; //Este si que puedo modificarlo.
        this.ko = false; //Significa que aun no ha sido derrotado
    }

    //***** Metodos de la clase *****//
    // Metodo Atacar, se sobreescribira en cada una de las clases hijas, dependiendo de sus capacidades especiales.
    atacar () {
        return this.ataque;
    }

    // Metodo ventajaTipo, este metodo lo heredan las hijas, pero es para que a la hora del combate saber si la unidad
    // que esta peleando tiene ventaja sobre la rival, me devuelve true si es asi y en el caso contrario false.
    ventajaTipo (nombreRival) {

        let tieneVentaja = false;

        let ventajas = new Map([['Mago', 'Guerrero'], ['Guerrero', 'Ladron'], ['Ladron', 'Mago']]);

        if(ventajas.get(this.getNombre) === nombreRival) {
            tieneVentaja = true;
        }

        return tieneVentaja;

    }

    sistemaClima (climaCombate) {

        let ventajaODesventaja = false;

        let climas = new Map([['Mago', 'Lluvia'], ['Guerrero', 'Viento'], ['Ladron', 'Niebla']]);

        if(climas.get(this.getNombre) === climaCombate) {
            ventajaODesventaja = true;
        }

        return ventajaODesventaja;
    }

    // Ahora, a base del metodo anterior, si nos devuelve true, al daño base de la tropa aplicamos
    // lo multiplicamos por 1.5 de daño.
    calcularDañoVentaja (dañoBase, nombreRival) {

        let dañoFinal = dañoBase;
        if (this.ventajaTipo(nombreRival)) {
            dañoBase *= 1.5;
            dañoFinal = Math.floor(dañoBase);
        } 

        return dañoFinal;
    }

    calcularVentajaClima(daño, clima) {

        let dañoFinal = daño;
        if(this.sistemaClima(clima)) {
            if(this.getNombre === "Mago") {
                daño -= daño * 0.2; 
                dañoFinal = Math.floor(daño);
            } else if (this.getNombre === "Guerrero") {
                daño += daño * 0.2;
                dañoFinal = Math.floor(daño);
            } 
        }

        return dañoFinal;
    }

    // Metodo recibirDaño, se pasara por parametro el daño que haga la unidad rival, asi, esa cantidad se quita de los puntos de vida.
    recibirDaño (dañoRival) {
        this.puntosDeVida -= dañoRival;

        if(this.puntosDeVida < 0 || this.puntosDeVida == 0) { //Si ha recibido mucho daño y es menor o igual a 0, tiene 0 de vida.
            this.puntosDeVida = 0;
            this.ko = true; // Se ha quedado sin vida
        }
    }

    // Metodo recuperarse, despues de una ronda, cada una de las unidades podran recuperar un 70% de los puntos de vida.
    // ** Falta comprobar mas adelante como puedo llamar a este metodo, o como puedo asegurarme que ya han combatido.
    recuperarse () { 
        this.puntosDeVida += this.puntosDeVidaMax * 0.70;
        if(this.puntosDeVida > this.puntosDeVidaMax) {
            this.puntosDeVida = this.puntosDeVidaMax;
        }
        //this.puntosDeVida = parseFloat(this.puntosDeVida.toFixed(2)); // Para que se redondee a 2 decimales. //Puedo ponerlo a parseInt
        this.puntosDeVida = parseInt(this.puntosDeVida);
        this.ko = false; //Esta otra vez con vida.
    }

    //Metodos GETTERS -> Las clases hijas heredan estos metodos, por lo cual no necesito escribir mas getters y setters en las clases.
    get getNombre () {
        return this.nombre;
    }

    get getAtaque () {
        return this.ataque;
    }

    get getCosteContratacion () {
        return this.costeContratacion;
    }

    get getRetirarlo () {
        return this.gananciaRetirarlo;
    }

    get getPuntosVidaMax () {
        return this.puntosDeVidaMax;
    }

    get getPuntosVida () {
        return this.puntosDeVida;
    }

    get getKO () {
        return this.ko;
    }

    //Metodos SETTERS de las propiedad. Como las 3 unidades comparten estas mismas propiedades, entonces lo heredan.
    set setNombre (nuevoNombre) {
        this.nombre = nuevoNombre;
    }

    set setAtaque (nuevoAtaque) {
        this.ataque = nuevoAtaque;
    }

    set setCosteContratacion (nuevoCoste) {
        this.costeContratacion = nuevoCoste;
    }

    set setGananciaRetirarlo (nuevaGanancia) {
        this.gananciaRetirarlo = nuevaGanancia;
    }

    set setPuntosDeVidaMax (nuevaVidaMax) {
        this.puntosDeVidaMax = nuevaVidaMax;
    }

    set setPuntosVida (nuevaVida) {
        this.puntosDeVida = nuevaVida;
    }

    set setKO (truOfalse) {
        this.ko = truOfalse;
    }


    //Metodo toString, que podran sobreescribir las demas clases.
    toString () {
        return `${this.getNombre} | ATK ${this.ataque} | PVs ${this.getPuntosVida} | Coste ${this.getCosteContratacion}`;
    }

}