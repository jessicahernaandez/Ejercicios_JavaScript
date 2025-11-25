// Daño normal
// Habilidad: “Maldición” → el rival pierde 10 PV extra durante 3 turnos

export class HechiceroOscuro extends TipoUnidad {
    constructor() {
        super("Hechicero Oscuro", 2300, 1200, 40, 70);

        this.maldiciones = 1;
        this.habilidadEspecial = "Maldición";
    }

    atacar() {
        let daño = this.ataque;

        if (this.maldiciones > 0) {
            daño += 10; // impacto inicial
            this.maldiciones--;
        }

        return daño;
    }

    aplicarMaldicion(objetivo) {
        objetivo.maldicionActiva = 3;
    }

    recuperarse() {
        super.recuperarse();
        this.maldiciones = 1;
    }

    get getNombreHabilidad() { return this.habilidadEspecial; }
}