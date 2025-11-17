import { TelefonoMovil } from "./classTelefono.js";

class Persona {

    constructor (nombre, edad, peso, TelefonoMovil) {
        this.nombre = nombre;
        this.edad = edad;
        this.peso = peso;
        this.TelefonoMovil = new TelefonoMovil(12,5,250,25,30,4);
    }

    //GETTERS
    get nombre () {
        return this.nombre;
    }

    get edad () {
        return this.edad;
    }

    get peso () {
        return this.peso;
    }

    get TelefonoMovil () {
        return TelefonoMovil.toString();
    }

    //SETTERS
    set cambiaNombre (nuevoNombre) {
        this.nombre = nuevoNombre;
    }

    set cambiaEdad (nuevaEdad) {
        this.edad = nuevaEdad;
    }

    set cambiaPeso (nuevoPeso) {
        this.peso = nuevoPeso;
    }

}

export {Persona};

let telefono1 = new TelefonoMovil(12,5,250,25,30,4);
let persona1 = new Persona("Jessica", 21, 68,telefono1);

console.log(persona1);