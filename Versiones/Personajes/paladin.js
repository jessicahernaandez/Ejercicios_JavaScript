// Vida alta, daño medio
// Habilidad: “Luz Sagrada” → cura 20 PV al atacar (máx. 2 veces)

export class Paladin extends TipoUnidad {
    constructor() {
        super("Paladin", 2200, 1100, 80, 120);

        this.curaciones = 2;
        this.habilidadEspecial = "Luz Sagrada";
    }

    atacar() {
        let daño = this.ataque;

        if (this.curaciones > 0) {
            this.puntosDeVida += 20;
            if (this.puntosDeVida > this.puntosDeVidaMax)
                this.puntosDeVida = this.puntosDeVidaMax;

            this.curaciones--;
        }

        return daño;
    }

    recuperarse() {
        super.recuperarse();
        this.curaciones = 2;
    }

    get getCuantaHabilidadEspecial() { return this.curaciones; }
    get getNombreHabilidad() { return this.habilidadEspecial; }
}