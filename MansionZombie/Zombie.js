import { Combatientes } from "./Combatientes.js";

export class Zombie extends Combatientes {
    
    // Le pasamos al constructor el numero de habitacion, para poder generar la formukla.
    constructor(habitacionActual) {

        // Fórmula: numeroAleatorio(2) + 2 + (habitacion - 1)
        let vida = Math.floor(Math.random() * 2) + 2 + (habitacionActual - 1);
        let ataque = Math.floor(Math.random() * 2) + 2 + (habitacionActual - 1);

        super(vida, ataque); // Una vez creada la vida y el ataque con la formula, lo paso como parametro al constructor.
    }

    toString() {
        return `El zombie tiene ${this.puntosAtaque} ATK | ${this.vidaActual} PVs.`;
    }

}