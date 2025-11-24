// Importaciones de las clases de Unidades.
import { esContratable, generarTropa} from "./FuncionesExtras.js";


/****************** FUNCIONES DEL MENU PRINCIPAL ***********************/

/************************ CASE 1 -> CONTRATAR *************************/
// Funcion principal quien contiene la logica y la llamada a funciones necesarias
// para que el usuario pueda contratar una tropa.
export function contratarTropas (jugador) {

    let seguirContratando = true; // Variable con la que controlo para que el usuario se mantenga o no en la tienda.
    while(seguirContratando) {
                    
        let cantidadMaxTropas = 5; //Tropas Max que puede tener el jugador.

        // Si alguna verificacion falla, entonces no puede seguir contratando.
        if(!puedeComprar(jugador, cantidadMaxTropas)) {
            seguirContratando = false;
        } else { 

            // NUEVA FUNCION, PREGUNTO QUE TROPAS QUIERE //
            let queTropa = queTropaQuieres();

            //Genero la cantidad de tropas que queremos mostrar
            let cantidadTropas = 3;

            // Llamo a la funcion que genera un array con la cantidad de tropas aleatorias, y me lo devuelve.
            let tropasAleatorias = tropasMostrar(cantidadTropas, jugador, queTropa);

            // Llamo a la funcion que muestra el menu con las tropas generadas, para esto le paso el array como parametro
            // y me deevuelve la opcion del usuario.
            let tropaElegidaJugador = menuTropasElegir(jugador, tropasAleatorias);

            //Si el usuario introduce alguna de las opciones invalidas, entonces mostramos un mensaje informativo y restamos los intentos de contratacion.
            if(isNaN(tropaElegidaJugador) || tropaElegidaJugador < 0 || tropaElegidaJugador >=4) {
                jugador.setIntentosContratacion = 1;
                alert(`La opcion que has introducido es incorrecta. Has perdido un intento de contratacion.\nIntentos restantes: ${jugador.getIntentosContratacion}`);
            } else {
                //Una recibida una opcion, dependiendo de la que elija lo guardo.
                if(jugador.getTropasJugador.length != cantidadMaxTropas && tropaElegidaJugador != 0) {
                    //Verificar que tenga el dinero suficiente para que pueda comprar la tropa.
                    if(jugador.getOroJugador >= tropasAleatorias[tropaElegidaJugador - 1].getCosteContratacion) {
                        let tropaElegida = tropasAleatorias[tropaElegidaJugador - 1];
                        jugador.setTropasJugador = tropaElegida; //Agrego la tropa a las tropas del jugador.
                        jugador.setRestaOro = tropaElegida.getCosteContratacion; //Resto el dinero.
                        jugador.setIntentosContratacion = 1; //Resto los intentos.
                        let mensajeTropaCompradas = `Tropas Compradas:\n`;
                        jugador.getTropasJugador.forEach((tropa,indice) => mensajeTropaCompradas += `${indice + 1}) ${tropa.getNombre} | ATK ${tropa.getAtaque} | PVs ${tropa.getPuntosVida}/${tropa.getPuntosVidaMax}\n`);
                        alert(mensajeTropaCompradas);
                        } else {
                            jugador.setIntentosContratacion = 1;
                            alert(`No tienes dinero suficiente para comprar esta tropa.\nTus intentos restan. Intentos restantes: ${jugador.getIntentosContratacion}`);
                        }          
                    } else if (tropaElegidaJugador == 0) { //Si elije la opcion 0, muestro un mensaje informativo y resto los intentos.
                        seguirContratando = false;
                        jugador.setIntentosContratacion = 1;
                        alert(`Has elegido la opcion 0, sales de la tienda pero tus intentos de contratacion restan. \nIntentos restantes: ${jugador.getIntentosContratacion}`);   
                    }     
            }
        }
    }
}

// Funcion que realiza las comprobaciones para que el usuario pueda mantenerse en el
// menu de contratacion, devuelve true en caso de que pueda seguir en menu, de lo contrario false.
//*****Paso como parametro el objeto jugador, ya que necesitamos acceder a sus atributos.****//
export function puedeComprar(jugador, maxTropas) {

    let puedeRealizarlo = true;

    //Comprobaciones para saber si puede contratar a tropa en su ejercito.
    if (jugador.getOroJugador < 1000) {
        alert(`Necesitas al menos 1000 de oro para ver mercenarios.`);
        puedeRealizarlo = false;
    } else if (jugador.getIntentosContratacion == 0) {
        alert(`Ya has agotado los intentos de contratación.`);
        puedeRealizarlo = false;
    } else if (jugador.getTropasJugador.length == maxTropas) { 
        alert(`Ya no tienes huecos disponibles en tu ejercito.`);
        puedeRealizarlo = false;
    }

    return puedeRealizarlo;
}

// Funcion que genera las tropas por medio de la funcion generarTropas() en el fichero "FuncionesExtras.js", pero
// devuelve un array con la cantidad de tropas que pasemos como parametro.
export function tropasMostrar (cantidad, jugador, queTropa) {
    let tropasAleatorias = [];

    //Con el buclo genero las tropas aleatorias y las guardo en el array.
    //******* NUEVA FUNCIONALIDAD, GENEREN TROPAS QUE NO SEAN REPETIDAS. *******//

    /*
    let elemento = 0;
    for(let indice=0;elemento<cantidad;indice++) { 
        let tropaGenerada = generarTropa();
        if(tropasAleatorias.every((tropa) => tropa.getNombre != tropaGenerada.getNombre)) {
            tropasAleatorias.push(tropaGenerada);
            elemento++;
        }
    }*/

    /*// QUE SOLO SALGAN TROPAS CONTRATABLES
    let elementos = 0;
    for(let indice=0; elementos < cantidad;indice++) {
        let tropaGenerada = generarTropa();
        if(tropaGenerada.getCosteContratacion < jugador.getOroJugador) { //NO TENGO EL SEGUNDO PARAMETRO PUESTO.
            tropasAleatorias.push(tropaGenerada);
            elementos++;
        }
    }*/

    let elementos = 0;
    for(let indice = 0; elementos < cantidad; indice ++) {
        let tropaGenerada = generarTropa();
        let nombreTropa = tropaGenerada.getNombre.toLocaleLowerCase();
        if(nombreTropa == queTropa) {
            tropasAleatorias.push(tropaGenerada);
            elementos++;
        }
    }

    return tropasAleatorias;
}

// Funcion que mostrara al jugador las tropas que se han generado, devuelve
// la opcion que ha elegido el jugador.
export function menuTropasElegir (jugador, tropasGeneradas) {
    // Una vez tengo las 3 tropas generadas de manera aleatoria, tengo que generar el mensaje donde muestro la informacion de cada una de ellas.
    // Para poder mostrar el mensaje, utilizo la funcion para arrays forEach() que no devuelve nada, pero nos permite poder
    // ejecutar una funcion para cada uno de los elementos del array. forEach(elemento,indice,array) -> valor obligatorio, es el primero, el indice.
    
    // Me genero la primera parte del mensaje.
    let mensajeTropa = `Mercenarios disponibles (oro: ${jugador.getOroJugador})\n`;
    //Ahora, utilizo la funcion por medio del array donde estan las tropas temporales.
    tropasGeneradas.forEach((tropa,indice) => mensajeTropa += `${indice + 1}) ${tropa.toString()} -> ${esContratable(jugador.getOroJugador, tropa.getCosteContratacion)}\n`); //Le agrego al mensaje, el la informacion de la tropa.
    mensajeTropa += `\n\nElige 1-3 para contratar, 0 para cancelar:`; //Termino de agregarle a la cadena el resto del mensaje.
    let tropaElegidaJugador = prompt(mensajeTropa);

    return tropaElegidaJugador;
}

//Nueva Funcion, que el usuario pueda elegir la tropa que quiere que le salgan
function queTropaQuieres () {

    let mensajeCualQuieres = `Elige la tropa que quieres que te salga:\n1)Mago\n2)Guerrero\n3)Ladron`;
    let respuesta = prompt(mensajeCualQuieres).toLocaleLowerCase();

    while(!isNaN(respuesta) && (respuesta != "mago" || respuesta != "guerrero" || respuesta != "ladron")) {
        mensajeCualQuieres = `Error\nElige la tropa que quieres que te salga:\n1)Mago\n2)Guerrero\n3)Ladron`;
        respuesta = prompt(mensajeCualQuieres).toLocaleLowerCase();
    }

    return respuesta;
}
