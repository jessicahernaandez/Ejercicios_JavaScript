// Daño base normal
//  Habilidad: “Furia” → cuando su vida baja del 30%, daño ×2

export class Berserker extends TipoUnidad {
    constructor() {
        super("Berserker", 1800, 900, 70, 110);

        this.habilidadEspecial = "Furia";
    }

    atacar() {
        let daño = this.ataque;

        if (this.puntosDeVida <= this.puntosDeVidaMax * 0.30) {
            daño *= 2;
        }

        return daño;
    }

    get getCuantaHabilidadEspecial() {
        return this.puntosDeVida <= this.puntosDeVidaMax * 0.30 ? 1 : 0;
    }

    get getNombreHabilidad() {
        return this.habilidadEspecial;
    }
}