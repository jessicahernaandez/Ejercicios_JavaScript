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

    get getRecuperacion () {
        return this.recuperacion;
    }

    //SETTERS
    set setCambiaOro (cambioOro) {
        this.oroJugador -= cambioOro;
    }

    set setCambiaVictorias (cambioVictorias) {
        this.victorias = cambioVictorias;
    }

    set setCambiaDerrotas (cambioDerrotas) {
        this.derrotas = cambioDerrotas;
    }

    set setIntentosContratacion (cambioContratacion) {
        this.intentosContratar -= cambioContratacion; 
    }

    set setRecuperacion (cambioRecuperacion) {
        this.recuperacion = cambioRecuperacion;
    }


}