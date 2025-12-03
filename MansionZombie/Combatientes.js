// Al tener losa dos personajes del juego (Superviviente y Zombie) atributos y acciones
// en comun, he decidido crear una clase padre con dichos atributos y metodos.

export class Combatientes {

    constructor(vidaActualPersonaje, puntosAtaquePersonaje) {
        this.vidaActual = vidaActualPersonaje;
        this.puntosAtaque = puntosAtaquePersonaje;
    }

    estaVivo () {
        let vivo = this.vidaActual > 0 ? true : false;

        return vivo;
    }

    recibirDanio(danio) {
        
        this.vidaActual -= danio;
        if (this.vidaActual < 0) {
            this.vidaActual = 0;
        }
    }

    atacar() {
        // Lanza un dado según sus puntos de ataque (Los dos combatientes tienen la misma funcionalidad al atacar.)
        let danio = this.lanzarDado(this.puntosAtaque);

        return danio;
    }

    lanzarDado(caras) {
        let puntos = Math.floor(Math.random() * caras) + 1;
        
        return puntos;
    }

    // Metodos getters
    get getVidaActual() {
        return this.vidaActual;
    }

    get getPuntosAtaque() {
        return this.puntosAtaque;
    }

    // Metodos Setters
    set setvidaActual (cambioVida) {
        this.vidaActual -= cambioVida;
    }

}