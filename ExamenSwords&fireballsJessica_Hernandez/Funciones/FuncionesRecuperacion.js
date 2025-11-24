import { mostrarEstado } from "./FuncionesEstado.js";

/****************** FUNCIONES DEL MENU PRINCIPAL ***********************/

/************************ CASE 4 -> RECUPERACION *************************/

// Funcion principal que tendra toda la logica del caso de Recuperacion
export function recuperacionTropas (jugador) {

    let mensajeRecuperacion = `Tu compañia descansa: +70% vida a todos y habilidades especiales restauradas.`;

    // Llamamos a la funcion para ver el estado antes de que se restauren.
    let resumenTropas = mostrarEstado (jugador);
    alert(resumenTropas);

    // Mostramos la informacion al usuario
    alert(mensajeRecuperacion);

    // Y por medio de la funcion forEach hacemos que cada una las tropas
    // accedan a la funcion que heredan de la clase padre, para que puedan recuperar
    // un 70% de vida.
    jugador.getTropasJugador.forEach((tropa) => tropa.recuperarse());
    // Una vez dentro, volvemos a poner el uso de Recuperacion en false, despues de haber mostrado el mensaje.
    jugador.setUsoRecuperacion = false;

    // Mostramos un mensaje para ver el cambio
    let tropasDespues = mostrarEstado(jugador);
    alert(tropasDespues);
    
}
