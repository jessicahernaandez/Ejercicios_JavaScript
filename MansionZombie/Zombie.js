export class Zombie {
    
    // Le pasamos al constructor el numero de habitacion, para poder generar la formukla.
    constructor(habitacionActual) {
        // Fórmula: numeroAleatorio(2) + 2 + (habitacion - 1)
        this.vidaActual = Math.floor(Math.random() * 2) + 2 + (habitacionActual - 1);
        this.puntosAtaque = Math.floor(Math.random() * 2) + 2 + (habitacionActual - 1);
    }

    estaVivo() {
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
        // Lanza un dado según sus puntos de ataque
        return this.lanzarDado(this.puntosAtaque);
    }

    // Igual que en clase superviviente
    lanzarDado(caras) {
        return Math.floor(Math.random() * caras) + 1;
    }

    mostrarInfo() {
        return `El zombie tiene ${this.puntosAtaque} puntos de ataque.\nEl zombie tiene ${this.vidaActual} puntos de vida.`;
    }

    // Getters
    get getVidaActual() {
        return this.vidaActual;
    }

    get getPuntosAtaque() {
        return this.puntosAtaque;
    }
}