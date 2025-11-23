//Clase del Jugador, donde guardaremos toda su informacion sobre la partidas.

export class Jugador {

    //Variables del usuario.
    //let recuperacionTexto = recuperacion == true ? 'Si' : 'No';

    //Contructor 
    constructor () {
        this.oroJugador = 5000;
        this.victorias = 0;
        this.derrotas = 0;
        this.intentosContratar = 6;
        this.recuperacion = false;
        this.tropasJugador = [];
        this.maxTropas = 5;
        this.usoRecuperacion = false; //No podra hacer uso de la recuperacion a menos que haya hecho un combate y una sola vez.
    }

    //GETTERS
    get getOroJugador() {
        return this.oroJugador;
    }

    get getVictorias() {
        return this.victorias;
    }

    get getDerrotas() {
        return this.derrotas;
    }

    get getIntentosContratacion () {
        return this.intentosContratar;
    }

    get getTropasJugador () {
        return this.tropasJugador;
    }

    get getMaxTropas () {
        return this.maxTropas;
    }

    get getUsoRecuperacion () {
        return this.usoRecuperacion;
    }

    //SETTERS
    set setRestaOro (cambioOro) {
        this.oroJugador -= cambioOro;
        if(this.oroJugador < 0) {
            this.oroJugador = 0;
        }
    }

    set setSumaOro (sumaOro) {
        this.oroJugador += sumaOro;
    }

    set setCambiaVictorias (cambioVictorias) {
        this.victorias += cambioVictorias;
    }

    set setCambiaDerrotas (cambioDerrotas) {
        this.derrotas += cambioDerrotas;
    }

    set setIntentosContratacion (cambioContratacion) {
        this.intentosContratar -= cambioContratacion; 
    }

    set setTropasJugador (nuevaTropa) {
        this.tropasJugador.push(nuevaTropa);
    }

    set setUsoRecuperacion (trueFalse) {
        this.usoRecuperacion = trueFalse;
    }

    set restaurarIntentosContratacion (intentos) {
        this.intentosContratar = intentos;
    }
    
}