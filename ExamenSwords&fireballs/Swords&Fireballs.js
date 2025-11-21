
    // Importaciones de las clases de Unidades.
    import { Guerrero } from "./Clases/Guerrero.js";
    import { Ladron } from "./Clases/Ladron.js";
    import { Mago } from "./Clases/Mago.js";
    import { Jugador} from "./Clases/Jugador.js";
    import { esContratable, generarTropa } from "./Funciones/FuncionesExtras.js";
    import { contratarTropas, puedeComprar, tropasMostrar, menuTropasElegir } from "./Funciones/FuncionesContratar.js";
    import { despedirTropas, menuDespedir } from "./Funciones/FuncionesDespedir.js";

    
    //*******Mensaje de Bienvenida******//
    alert(`¡Bienvenido a \"Swords & fire balls\"!`);
    
    //******Dificultad del Juego********//
    let mensajeDificultad = "Elige dificultad \"facil\" o \"dificil\"";
    let respuestaDificultad = prompt(mensajeDificultad).trim().toLowerCase();

    //*******Comprobacion de que la respuesta de la dificultad sea correcta.******//
    while(respuestaDificultad != 'facil' && respuestaDificultad != 'dificil') {
        mensajeDificultad = "Error, opcion invalida.\nElige dificultad \"facil\" o \"dificil\"";
        respuestaDificultad = prompt(mensajeDificultad).trim().toLocaleLowerCase();
    }

    //*******Variables Iniciales********//
    let VictoriasParaGanar = respuestaDificultad == "dificil" ? 4 : 2; //Nos referimos a cada partida, es decir, necesita derrotar x tropas para ganar.
    let DerrotasParaPerder = 2; // Tropas derrotadas.
    let jugador = new Jugador();
    let recuperacionTexto = jugador.getRecuperacion == true ? 'Si' : 'No';
    let numDeCombates = 0;

    // Menu desplegable con opciones para el jugador
    // Dependiendo de la opcion que haya elegido el jugador, haremos x accion.
    while(jugador.getDerrotas != DerrotasParaPerder || jugador.getVictorias != VictoriasParaGanar || (jugador.getIntentosContratacion != 0 && jugador.getTropasJugador.length == 0)) { //Mientras dejamos asi, pero nos queda verfificar que si los intentos de contratacion estan a 0 y no tiene ninguna tropa.

        let menuAcciones = `Oro ${jugador.getOroJugador} | V ${jugador.getVictorias} D ${jugador.getDerrotas}\n\nIntentos contratar restantes: ${jugador.getIntentosContratacion} | Recuperación: ${recuperacionTexto}\n\nElige una acción:\n1) Contratar\n2) Despedir\n3) Combatir\n4) Recuperarse\n5) Ver estado detallado\n0) Salir`;
        let accionJugador = parseInt(prompt(menuAcciones));

        // Comprobacion de que la respuesta del Jugador este entre en rango de opciones.
        while(isNaN(accionJugador) || accionJugador < 0 || accionJugador > 5) {
            menuAcciones = `Error, introduce una opción valida.\nOro ${jugador.getOroJugador} | V ${jugador.getVictorias} / D ${jugador.getDerrotas}\nIntentos contratar restantes: ${jugador.getIntentosContratacion} | Recuperación: ${recuperacionTexto}\n\n\nElige una acción:\n1) Contratar\n2) Despedir\n3) Combatir\n4) Recuperarse\n5) Ver estado detallado\n0) Salir`;
            accionJugador = parseInt(prompt(menuAcciones));
        } 

        switch(accionJugador) {
            case 1:
                
                contratarTropas(jugador);

                break;
            case 2:

                if(jugador.getTropasJugador.length > 0) {
                    despedirTropas(jugador);
                } else {
                    alert(`No tienes unidades para despedir.`);
                }

                break;

            case 3:
                alert(`Caso 3`);
                break;

            case 4:
                alert(`Caso 4`);
                break;

            case 5:
                alert(`Caso 5`);
                break;

            case 0:
                alert(`Caso 6`);
                break;

            default:
        }

    }

    //*****************FUNCIONES DE ESTE FICHERO***********************//




    // Si convertimos este fichero en clase, tener en cuenta:
    // Tendriamos, un contructor donde inicializamos las variables.
    // Una funcion iniciar juego, que esta funcion tendra llamada a las demas funciones, seria la funcion principal (con la llamada a esta funcion tendria que ejecutarse el juego completo, tiene el mensaje de bienvenida.)
    // PedirDificultad -> Que devolveria la dificultad que ha elegido el usuario.
    // Como et VictoriasParaGanar y let recuperacionTexto = jugador.getRecuperacion == true ? 'Si' : 'No'; lo hago a base de respuestas del usuario, tendria que crear una funcion aparte donde controlo esto.
    // Una funcion MenuPrincipal() donde contenga el menu y a base de la respuesta haga cada una de las 5 opciones en el switch
    // El switch del menu principal tendria que tener una llamada a cada una de las funciones de cada case.
    // Cada case del switch se convertiria en una funcion aparte.

    // Ahora lo que quedaria cambiar es: Crear un index.js, donde creo un objeto de la clase juego y por medio de este ibjeto llamo al metodo principal, que es donde estara toda la logica del juego 
    // y ahora en index.html, tendria que llamar en el type=module a index.js.

    // Ya que trabajamos con arrays donde guardamos las tropas. Podemos utilizar el metodo splice(), para cuando queramos despedir uno de nuestras tropas y no queden huecos.
    //splice(indice, cuantosElementos, insertarElemento):
    //*Con el indice indico, cual es el elemento que quiero borrar. (o desde donde quiero modificar el array).
    //*Con cuantos elementos indico, cuantos elementos quiero eliminar.
    //*Con insertarElementos, pongo los elementos que quiero insertar en el array, asi sean 2 o 3, los elementos se insertan desde el indice que hemos puesto.
    //Los ultimos 2 son opcionales. Al utilizar este metodo el array se modifica automaticamente, eliminando el elemento que inique, los elementos restantes se reorganizan y no quedan huecos.
    //Con splice puedo guardar el elemento que he borrado. Devuelve un array con los elementos borrados.
    



