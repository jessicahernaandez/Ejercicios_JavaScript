    // Importaciones de las clases de Unidades.
    import { Guerrero } from "./Guerrero.js";
    import { Ladron } from "./Ladron.js";
    import { Mago } from "./Mago.js";
    import { Jugador } from "./Jugador.js";
    import { esContratable, generarTropa } from "./Funciones.js";


    // Mensaje de Bienvenida
    alert(`¡Bienvenido a \"Swords & fire balls\"!`);
    
    // Dificultad del Juego
    let mensajeDificultad = "Elige dificultad \"facil\" o \"dificil\"";
    let respuestaDificultad = prompt(mensajeDificultad).trim().toLowerCase();

    // Comprobacion de que la respuesta de la dificultad sea correcta.
    while(respuestaDificultad != 'facil' && respuestaDificultad != 'dificil') {
        mensajeDificultad = "Error, opcion invalida.\nElige dificultad \"facil\" o \"dificil\"";
        respuestaDificultad = prompt(mensajeDificultad).trim().toLocaleLowerCase();
    }

    // Variables Iniciales
    let VictoriasParaGanar = respuestaDificultad == "dificil" ? 4 : 2; //Nos referimos a cada partida, es decir, necesita derrotar x tropas para ganar.
    let DerrotasParaPerder = 2; // Tropas derrotadas.
    let jugador = new Jugador();
    let recuperacionTexto = jugador.getRecuperacion == true ? 'Si' : 'No';
    let numDeCombates = 0;
    


    // Menu desplegable con opciones para el jugador
    //Dependiendo de la opcion que haya elegido el jugador, haremos x accion.
    while(jugador.getDerrotas != DerrotasParaPerder || jugador.getVictorias != VictoriasParaGanar || jugador.getIntentosContratacion != 0) { //Mientras dejamos asi, pero nos queda verfificar que si los intentos de contratacion estan a 0 y no tiene ninguna tropa.

        let menuAcciones = `Oro ${jugador.getOroJugador} | V ${jugador.getVictorias} D ${jugador.getDerrotas}\n\nIntentos contratar restantes: ${jugador.getIntentosContratacion} | Recuperación: ${recuperacionTexto}\n\nElige una acción:\n1) Contratar\n2) Despedir\n3) Combatir\n4) Recuperarse\n5) Ver estado detallado\n0) Salir`;
        let accionJugador = parseInt(prompt(menuAcciones));

        // Comprobacion de que la respuesta del Jugador este entre en rango de opciones.
        while(isNaN(accionJugador) || accionJugador < 0 || accionJugador > 5) {
            menuAcciones = `Error, introduce una opción valida.\nOro ${jugador.getOroJugador} | V ${jugador.getVictorias} / D ${jugador.getDerrotas}\nIntentos contratar restantes: ${jugador.getIntentosContratacion} | Recuperación: ${recuperacionTexto}\n\n\nElige una acción:\n1) Contratar\n2) Despedir\n3) Combatir\n4) Recuperarse\n5) Ver estado detallado\n0) Salir`;
            accionJugador = parseInt(prompt(menuAcciones));
        } 

        switch(accionJugador) {
            case 1:
                //Contratar. //Controlar el flujo, que el usuario no se pueda salir, hasta que cumpla una de estas funciones. Que siga en el menu.
                //Comprobaciones para saber si puede contratar a tropa en su ejercito.
                if (jugador.getOroJugador < 1000) {
                    alert(`Necesitas al menos 1000 de oro para ver mercenarios.`);
                } else if (jugador.getIntentosContratacion == 0) {
                    alert(`Ya has agotado los intentos de contratación.`);
                } else if (jugador.getTropasJugador.length == 5) { 
                    alert(`Ya no tienes huecos disponibles en tu ejercito.`);
                } else {
                    //Mostramos el menu 
                    //Genero la cantidad de tropas que queremos mostrar
                    let tropasMostrar = 3;
                    let tropasAleatorias = [];

                    //Con el buclo genero las tropas aleatorias y las guardo en el array.
                    for(let indice=0;indice<tropasMostrar;indice++) {
                        tropasAleatorias.push(generarTropa());
                    }

                    //Una vez tengo las 3 tropas generadas de manera aleatoria, tengo que generar el mensaje donde muestro la informacion de cada una de ellas.
                    //Para poder mostrar el mensaje, utilizo la funcion para arrays forEach() que no devuelve nada, pero nos permite poder
                    //ejecutar una funcion para cada uno de los elementos del array. forEach(elemento,indice,array) -> valor obligatorio, es el primero, el indice.
                    //Me genero la primera parte del mensaje.
                    let mensajeTropa = `Mercenarios disponibles (oro: ${jugador.getOroJugador})\n`;
                    //Ahora, utilizo la funcion por medio del array donde estan las tropas temporales.
                    tropasAleatorias.forEach((tropa,indice) => mensajeTropa += `${indice + 1}) ${tropa.toString()} -> ${esContratable(jugador.getOroJugador, tropa.getCosteContratacion)}\n`); //Le agrego al mensaje, el la informacion de la tropa.
                    mensajeTropa += `\n\nElige 1-3 para contratar, 0 para cancelar:`; //Termino de agregarle a la cadena el resto del mensaje.
                    let tropaElegidaJugador = prompt(mensajeTropa);

                    while(isNaN(tropaElegidaJugador) || tropaElegidaJugador < 0 || tropaElegidaJugador >=4) {
                        //Mensaje repetido.
                        

                        //Respuesta
                        tropaElegidaJugador = parseInt(prompt(mensajeTropa));
                    }
                        
                    //Una vez muestro el mensaje, dependiendo de la opcion que elija lo guardo.
                    if(jugador.getTropasJugador.length != 5 && tropaElegidaJugador != 0) {
                        //Verificar que tenga el dinero suficiente para que pueda comprar la tropa.
                        if(jugador.getOroJugador > tropasAleatorias[tropaElegidaJugador - 1].getCosteContratacion) {
                            let tropaElegida = tropasAleatorias[tropaElegidaJugador - 1];
                            jugador.setTropasJugador = tropaElegida;
                            jugador.setCambiaOro = tropaElegida.getCosteContratacion;
                        } else {
                            alert(`No tienes dinero suficiente para comprar esta tropa.`);
                        }
                        
                    }

                    //Muestro lo que tiene el jugador. PRUEBA.
                    alert(jugador.getTropasJugador);

                    jugador.setIntentosContratacion = 1;
                }
                break;
            
            case 2:
                //Despedir
                if(jugador.getTropasJugador.length > 0) {
                    let mensajeDespedir = `Elige índice para despedir (oro: ${jugador.getOroJugador})\n`;
                    //Ahora al mensaje agrego la informacion de las tropas
                    jugador.getTropasJugador.forEach((tropa,indice) => mensajeDespedir += `#${indice + 1}: ${tropa.getNombre} (ATK ${tropa.getAtaque} PVs ${tropa.getPuntosVida}/${tropa.getPuntosVidaMax})\n`);

                    //Ahora, como no siempre habran 5 tropas, tengo que mostrar el vacia de las demas
                    let tropasVacias = 5 - jugador.getTropasJugador.length;

                    //A base de esa cantidad, agrego al mensaje por medio de un for, las unidades vacias.
                    for(let unidadVacia=jugador.getTropasJugador.length + 1;unidadVacia<=5;unidadVacia++) {
                        mensajeDespedir += `#${unidadVacia}: [vacío]\n`;
                    }

                    //Y por ultimo concateno la ultima linea del mensaje.
                    mensajeDespedir += `0 para cancelar:`;
                    let respuestaDespedir = parseInt(prompt(mensajeDespedir));

                    
                    while(isNaN(respuestaDespedir) && respuestaDespedir < 0 && respuestaDespedir > 5) {
                        //Mensaje
                        mensajeDespedir = `Error, introduce una opcion válida.\nElige índice para despedir (oro: ${jugador.getOroJugador})\n`;
                        jugador.getTropasJugador.forEach((tropa,indice) => mensajeDespedir += `#${indice + 1}: ${tropa.getNombre} (ATK ${tropa.getAtaque} PVs ${tropa.getPuntosVida}/${tropa.getPuntosVidaMax})\n`);
                        
                        tropasVacias = 5 - jugador.getTropasJugador.length;
                        for(let unidadVacia=jugador.getTropasJugador.length + 1;unidadVacia<=5;unidadVacia++) {
                            mensajeDespedir += `#${unidadVacia}: [vacío]\n`;
                        }
                        mensajeDespedir += `0 para cancelar:`;
                        //Respuesta
                        respuestaDespedir = parseInt(prompt(mensajeDespedir));
                    }

                    if(respuestaDespedir != 0) {
                        //Una vez hecha las comprobaciones, procedo a eliminar las tropas.
                        let tropaDespedida = jugador.getTropasJugador.splice(respuestaDespedir - 1, 1); //Lo elimino y lo guardo. //Me devuelve un array.
                        alert(tropaDespedida);
                        //alert(`Unidad retirada. Recuperas ${tropaDespedida[0].getRecuperacion} oro. Oro: ${jugador.sumaOro = tropaDespedida[0].getRecuperacion}`);
                    } 
                    
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
    



