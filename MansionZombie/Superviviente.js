import { Combatientes } from "./Combatientes.js";

export class Superviviente extends Combatientes {

    constructor() {
        super(20,4); // Vida actual 20, puntos de ataque 4.
        this.vidaMaxima = 20;
        this.tieneBotiquin = false;
        this.cantidadArmas = 0;
        this.cantidadProtecciones = 0;
    }

    // Sobreescribe el metodo de recibirDanio, porque dependiendo de si tiene protecciones o no, se maneja diferente.
    recibirDanio(danio) {
        let danioReal = danio - this.cantidadProtecciones; // Si no tiene da 0, asi que no afecta al daño.

        if(this.cantidadProtecciones > danio) { // REVISAR
            this.cantidadProtecciones -= danio; // Por ejemplo, si tengo 5 protecciones y me han hecho 4 de daño, solo restare las 4 pociones que ocupare para prevenir el daño.
        } 

        if (danioReal < 0) {
            danioReal = 0;
        }
        
        // Si tiene protecciones ya ha sido aplicado antes, y asi si se aplica el daño al jugador.
        // Y asi, llamamos al metodo de la clase padre.
        super.recibirDanio(danioReal);

    }

    // Sobreescribe el metodo atacar para añadir las armas.
    atacar() {
        // El superviviente ataca con un dado.
        let danio = super.atacar(); // Las caras el igual a su atributo de puntos de Ataque.
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

    toString() {
        return `Puntos de vida: ${this.vidaActual}/${this.vidaMaxima}\nArmas: ${this.cantidadArmas}\nProtección: ${this.cantidadProtecciones}\nBotiquin disponible: ${(this.getTieneBotiquin ? "Si" : "No")}\nPuntos de Ataque: ${this.getPuntosAtaque}`;
    }

    /* GETTERS */
    get getVidaMaxima() {
        return this.vidaMaxima;
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

    /* SETTERS */
    set setCambiaBotiquin (valor) {
        this.tieneBotiquin = valor;
    }
}