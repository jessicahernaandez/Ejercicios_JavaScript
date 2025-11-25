/* Rol

Unidad de apoyo.
No hace gran daño, pero cura a sí mismo automáticamente durante el combate.

Habilidad especial: Sanación Divina

Tiene 2 cargas.

Cada vez que ataca, si le quedan cargas, cura 25 PV.

Como siempre, solo recupera las cargas al usar la acción Recuperarse. */

import { TipoUnidad } from "./TipoUnidad.js";

export class Clerigo extends TipoUnidad {

    constructor() {
        // Nombre, coste, ganancia al retirar, vida min, vida max
        super("Clérigo", 1600, 800, 60, 90);

        this.sanaciones = 2; 
        this.habilidadEspecial = "Sanación Divina";
    }

    // Sobreescribimos atacar igual que en otras clases
    atacar() {
        let daño = this.ataque;

        // Si tiene cargas de sanación, cura 25 puntos de vida
        if (this.sanaciones > 0) {
            this.puntosDeVida += 25;

            if (this.puntosDeVida > this.puntosDeVidaMax) {
                this.puntosDeVida = this.puntosDeVidaMax; 
            }

            this.sanaciones--;
        }

        return daño;
    }

    // Igual que las otras clases, al recuperarse vuelve a tener sus cargas
    recuperarse() {
        super.recuperarse();
        this.sanaciones = 2;
    }

    // GETTERS y SETTERS de la habilidad especial
    get getCuantaHabilidadEspecial() {
        return this.sanaciones;
    }

    get getNombreHabilidad() {
        return this.habilidadEspecial;
    }

    set setSanaciones(nuevoValor) {
        this.sanaciones = nuevoValor;
    }
}
