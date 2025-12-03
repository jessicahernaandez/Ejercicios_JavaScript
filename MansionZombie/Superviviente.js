export class Superviviente {

    constructor() {
        this.vidaMaxima = 20;
        this.vidaActual = 20;
        this.puntosAtaque = 4;
        this.tieneBotiquin = true;
        this.cantidadArmas = 0;
        this.cantidadProtecciones = 0;
    }

    recibirDanio(danio) {
        let danioReal = danio - this.cantidadProtecciones; // Si no tiene da 0, asi que no afecta al daño.

        if (danioReal < 0) {
            danioReal = 0;
        }
        this.vidaActual -= danioReal; // Si tiene protecciones ya ha sido aplicado antes, y asi si se aplica el daño al jugador.
        
        if (this.vidaActual < 0) {
            this.vidaActual = 0;
        }

        return danioReal;
    }

    atacar() {
        // El superviviente ataca con un dado.
        let danio = this.lanzarDado(this.puntosAtaque); // Las caras el igual a su atributo de puntos de Ataque.
        danio += this.cantidadArmas; // Si tiene armas se le suma al daño, no al valor del dado.
        return danio;
    }

    curarse() {
        let cura = false;

        if (this.tieneBotiquin) { // Si tiene botiquin, se puede curar.
            // Un botiquín cura 4 puntos de vida
            this.vidaActual += 4;
            if (this.vidaActual > this.vidaMaxima) { // Control de que no pase la vida max.
                this.vidaActual = this.vidaMaxima;
            }
            this.tieneBotiquin = false; // Quitamos el botiquien
            cura = true;
        }
        
        return cura;
    }

    encontrarArma() {
        this.cantidadArmas++;
    }

    encontrarProteccion() {
        this.cantidadProtecciones++;
    }

    // El metodo que ocupa el superviviente para lanzar el dado a la hora de atacar.
    lanzarDado(caras) {
        return Math.floor(Math.random() * caras) + 1;
    }

    mostrarEstado() {
        return `** PV: ${this.vidaActual} #MAX(${this.vidaMaxima}); ARMAS: ${this.cantidadArmas}; PROTECCIÓN: ${this.cantidadProtecciones}`;
    }


    /* GETTERS */
    get getVidaMaxima() {
        return this.vidaMaxima;
    }

    get getVidaActual() {
        return this.vidaActual;
    }

    get getPuntosAtaque() {
        return this.puntosAtaque;
    }

    get getTieneBotiquin() {
        return this.tieneBotiquin;
    }

    get getCantidadArmas() {
        return this.cantidadArmas;
    }

    get getCantidadProtecciones() {
        return this.cantidadProtecciones;
    }

    get estaVivo() {
        $vivo = this.vidaActual > 0 ? true : false;
        return $vivo;
    }
}