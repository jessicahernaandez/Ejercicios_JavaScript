import { Superviviente } from "./Superviviente.js";
import { Zombie } from "./Zombie.js";

export class Mansion {

    constructor (dificultad) { // Se pasa por parametro la doficultad que devuelve el metodo estatico, que es el metodo que se ejecuta de primero.
        this.numHabitacionMax = dificultad == 1 ? 5 : 10;
        this.intentosBusqueda = 3;
        this.habitacionActual = 1;
        this.numZombies = 1;
        this.superviviente = new Superviviente(); // Tiene como atributo un objeto superviviente // NO ES SEGURO.
    }


    // Metodo que da la bienvenida -> Devuelve la dificultad que elige el superviviente.
    // Estatico, porque necesito ejecutar el metodo sin necesidad que haya un objeto existente.
    static bienvenidaDificultad () {

        // Bienvenida para el jugador
        let mensajeBienvenida = "¡Bienvenido a la Mansion Zombie!\nElige la dificultad:\n1.Fácil(5 habitaciones)\n2.Dificil(10 habitaciones)";
        let respuesta = parseInt(prompt(mensajeBienvenida));

        while(isNaN(respuesta) || (respuesta <=0 && respuesta >=3)) {
            mensajeBienvenida = "Error, introduce una opcion correcta\n¡Bienvenido a la Mansion Zombie!\nElige la dificultad:1.Fácil(5 habitaciones)\n2.Dificil(10 habitaciones)";
            respuesta = parseInt(prompt(mensajeBienvenida));
        }

        return respuesta;
    }

    // Metodo principal -> Se ejecuta este metodo con el objeto mansion y es quien contiene la logica de todo el juego.
    mensajeMenu () { 
        let mensajeMenu = `La habitación ${this.habitacionActual} contiene ${this.numZombies}\nTus elecciones disponibles:\n`;
        let opcionNum = 1; // Esta variable es solo para llevar un orden en el menu.
        let mensajeyOpcion = [];
        let opcionesDisponibles = [];
        let opcionCadena = ''; // La variable que ocupamos para ejecutar las opciones es esta.

        // Estas dos opciones van juntas, porque si se cumple una no tiene porque cumplirse la otra.
        if(this.numZombies >= 1) { // Si hay zombies, entonces mostramos la opcion 1.
            mensajeMenu += `${opcionNum})Combatir contra un zombie.\n`;
            opcionNum++;
            opcionCadena = "combatir";
            opcionesDisponibles.push(opcionCadena);
        } else if (this.numZombies == 0 && this.intentosBusqueda > 0) {
            mensajeMenu += `${opcionNum})Buscar por la habitación (Tienes ${this.intentosBusqueda} intentos)\n`;
            opcionNum++;
            opcionCadena = "buscar";
            opcionesDisponibles.push(opcionCadena);
        } 

        // Aparte, para saber si tengo que mostrar Avanzar o Salir de la Mansion.
        if(this.numZombies == 0 && this.habitacionActual < this.numHabitacionMax) {
            mensajeMenu += `${opcionNum})Avanzar a otra habitación.\n`;
            opcionNum++;
            opcionCadena = "avanzar";
            opcionesDisponibles.push(opcionCadena);
        } else if (this.numZombies == 0 && this.numHabitacionMax == this.numHabitacionMax) {
            mensajeMenu += `${opcionNum})Salir de la mansión (No hay mas habitaciones por ver)\n`;
            opcionNum++;
            opcionCadena = "salir";
            opcionesDisponibles.push(opcionCadena);
        }

        //Opcion de curarse.
        if(this.numZombies == 0 && this.superviviente.getTieneBotiquin == true) {
            mensajeMenu += `${opcionNum})Curarse.\n`;
            opcionNum++;
            opcionCadena = "curarse";
            opcionesDisponibles.push(opcionCadena);
        }
        
        mensajeyOpcion.push(mensajeMenu); // Mensaje a mostrar
        mensajeyOpcion.push(opcionesDisponibles); // Array con las opciones disponibles.
        mensajeyOpcion.push(opcionNum); // Para validar que este dentro del rango. 
        
        return mensajeyOpcion;
    }

    // Metodo que valida la respuesta del mensaje anterior, mientras sea incorrecta preguntara al jugador.
    validaOpcion (mensajeyOpcion) {
        
        // Guardo variables.
        let mensajeMostrar = mensajeyOpcion[0];
        let opcionesDisponibles = mensajeyOpcion[1];
        let opcionMax = mensajeyOpcion[2] - 1; 
        
        let respuestaMenu = parseInt(prompt(mensajeMostrar));

        // Verifico que el numero que me de el usuario este en el rango correcto.
        while(isNaN(respuestaMenu) || respuestaMenu <= 0 || respuestaMenu > opcionMax) {
            mensajeError = `Porfavor, esta vez introduce una opcion que este dentro del rango.`;
            mensajeMostrar += mensajeError;
            respuestaMenu = parseInt(prompt(mensajeMostrar));
            mensajeError = ``;
        }

        // Una vez validado, dependiendo del array con las opciones disponibles, elijo la opcion para devolverla.
        let accionEjecutar = opcionesDisponibles[respuestaMenu - 1];

        return accionEjecutar;

    }

    // Metodo principal, es quien se encarga de ejecutar toda la logica del juego.
    iniciarJuego(respuesta) {

        alert(`Respuesta Elegida: ${respuesta}`);
    }

    // Metodo to string para mostrar los datos.
    toString() {
        return `Numero de habitaciones: ${this.numHabitacionMax}\nIntentos de Busqueda: ${this.intentosBusqueda}\nHabitacion actual: ${this.habitacionActual}\nNumero de Zombies:${this.numZombies}`;
    }

}


let dificultad = Mansion.bienvenidaDificultad();
let mansion = new Mansion(dificultad);
alert(mansion.toString());
let arrayOpcion = mansion.mensajeMenu();
let respuestaElegida = mansion.validaOpcion(arrayOpcion);
mansion.iniciarJuego(respuestaElegida);


