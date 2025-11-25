// Daño constante + “Disparo preciso” ocasional
// Fuerte contra: podrías encajarlo en el ciclo si quieres crear un ciclo de 4, o dejarlo sin ventaja de tipo.
// Falta la importacion

export class Arquero extends TipoUnidad {
    constructor() {
        super("Arquero", 1700, 850, 50, 90);

        this.disparosPrecisos = 2;
        this.habilidadEspecial = "Disparo Preciso";
    }

    atacar() {
        let daño = this.ataque;

        if (this.disparosPrecisos > 0) {
            daño += 15; // daño estable, no aleatorio
            this.disparosPrecisos--;
        }

        return daño;
    }

    recuperarse() {
        super.recuperarse();
        this.disparosPrecisos = 2;
    }

    get getCuantaHabilidadEspecial() { return this.disparosPrecisos; }
    get getNombreHabilidad() { return this.habilidadEspecial; }
}