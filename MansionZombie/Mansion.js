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
        alert(`¡Bienvenido a la Mansion Zombie!`);
        let mensajeBienvenida = "Elige la dificultad:\n1. Fácil (5 habitaciones)\n2. Dificil (10 habitaciones)";
        let respuesta = parseInt(prompt(mensajeBienvenida));

        while(isNaN(respuesta) || respuesta <=0 || respuesta >=3) {
            mensajeBienvenida = "Error, introduce una opcion correcta\nElige la dificultad:\n1. Fácil (5 habitaciones)\n2. Dificil (10 habitaciones)";
            respuesta = parseInt(prompt(mensajeBienvenida));
        }

        return respuesta;
    }

    // Metodo principal, es quien se encarga de ejecutar toda la logica del juego.
    iniciarJuego() {

        let respuestaElegida = ``;
        // Llamamos al menu donde pasamos la accion elegida y se ejecuta.
        while(this.superviviente.estaVivo() && (respuestaElegida != "salirMansion" && respuestaElegida != "salirJuego")) {
            // Llamada al metodo que muestra el mensaje y devuelve un array con las opciones disponible y el mensaje.
            let arrMensajeOpciones = this.mensajeMenu();

            // Pasamos ese array al metodo que validara la opcion y nos devolvera la opcion para ejecutarlo en el switch.
            respuestaElegida = this.validaOpcion(arrMensajeOpciones);

            this.menuAcciones(respuestaElegida);
        }       

        // Si sale es porque ha logrado salir de la mansion o porque se ha quedado sin puntos de vida.
        if(!this.superviviente.estaVivo()) {
            alert(`Te has quedado sin vida. GAME OVER`);
        } 
    }

    // Metodo principal -> Se ejecuta este metodo con el objeto mansion y es quien contiene la logica de todo el juego.
    mensajeMenu () { 
        // Mensaje en 3 partes para que se pueda leer mejor.
        let mensajeMenu = `Vida: ${this.superviviente.getVidaActual}/${this.superviviente.getVidaMaxima} | Botiquin disponible: ${(this.superviviente.getTieneBotiquin ? "Si" : "No")}\n`;
        mensajeMenu += `Armas: ${this.superviviente.getCantidadArmas} | Protecciones: ${this.superviviente.getCantidadProtecciones}\nIntentos de Busqueda: ${this.intentosBusqueda}\n\n`;
        mensajeMenu += `La habitación ${this.habitacionActual} contiene ${this.numZombies} zombie.\n\nTus elecciones disponibles:\n`;
        
        let opcionNum = 1; // Esta variable es solo para llevar un orden en el menu.
        let opcionesDisponibles = []; // Guardara las opciones que esten disponibles para el superviviente.

        // Estas dos opciones van juntas, porque si se cumple una no tiene porque cumplirse la otra.
        if(this.numZombies >= 1) { // Si hay zombies, entonces mostramos la de combatir.
            mensajeMenu += `${opcionNum}) Combatir contra un zombie.\n`;
            opcionesDisponibles.push("combatir");
            opcionNum++;
        } else if (this.numZombies == 0 && this.intentosBusqueda > 0) { // Si no hay zombies y tiene intentos de busqueda, se muestra buscar.
            mensajeMenu += `${opcionNum}) Buscar por la habitación (Tienes ${this.intentosBusqueda} intentos)\n`;
            opcionesDisponibles.push("buscar");
            opcionNum++;
        } 

        // Para saber si tengo que mostrar Avanzar o Salir de la Mansion.
        if(this.numZombies == 0 && this.habitacionActual < this.numHabitacionMax) {
            mensajeMenu += `${opcionNum}) Avanzar a otra habitación.\n`;
            opcionesDisponibles.push("avanzar");
            opcionNum++;
        } else if (this.numZombies == 0 && this.habitacionActual == this.numHabitacionMax) { // Si esta en la última habitacion, mostrara salir.
            mensajeMenu += `${opcionNum}) Salir de la mansión (No hay mas habitaciones por ver)\n`;
            opcionesDisponibles.push("salirMansion");
            opcionNum++;
        }

        // Estara disponible la opcion de curarse siempre que no hayan zombies y tenga botiquin.
        if(this.numZombies == 0 && this.superviviente.getTieneBotiquin == true) {
            mensajeMenu += `${opcionNum}) Curarse.\n`;
            opcionesDisponibles.push("curarse");
            opcionNum++;
        }

        // La opcion de ver estado y salir siempre estarán disponibles.
        mensajeMenu += `${opcionNum}) Ver estado.\n`;
        opcionesDisponibles.push("verEstado");
        opcionNum++;
        mensajeMenu += `${opcionNum}) Salir del juego.`;
        opcionesDisponibles.push("salirJuego");
        
        return [mensajeMenu, opcionesDisponibles]; // Devuelvo directamente el array.
    }

    // Metodo que valida la respuesta del mensaje que nos devuelve la funcion anterior, mientras sea incorrecta preguntara al jugador.
    validaOpcion (mensajeyOpcion) {
        
        // Guardo variables.
        let mensajeMostrar = mensajeyOpcion[0];
        let opcionesDisponibles = mensajeyOpcion[1];
        let opcionMax = opcionesDisponibles.length; 
        
        let respuestaMenu = parseInt(prompt(mensajeMostrar));

        // Verifico que el numero que me de el usuario este en el rango correcto.
        while(isNaN(respuestaMenu) || respuestaMenu <= 0 || respuestaMenu > opcionMax) {
            let mensajeError = `Porfavor, introduce una opcion que este dentro del rango.\n\n`;
            respuestaMenu = parseInt(prompt(mensajeError + mensajeMostrar));
        }

        // Una vez validado, dependiendo del array con las opciones disponibles, elijo la opcion para devolverla.
        let accionEjecutar = opcionesDisponibles[respuestaMenu - 1];

        return accionEjecutar;

    }

    // Metodo que contiene el switch con cada accion, dependiendo la que tenga disponible.
    menuAcciones (respuestaElegida) {

        switch(respuestaElegida) {
            case "combatir":
                this.combatir();
                break;
            
            case "buscar":
                this.buscarHabitacion();
                break;
            
            case "avanzar":
                this.avanzarHabitacion();
                break;

            case "salirMansion":
                alert("¡¡¡¡VICTORIA!!!!\n¡Has llegado al final, muchas felicidades!\n");
                break;

            case "curarse":
                // Asi el superviviente tenga el maximo de vida, dejaremos que use su botiquin mientras tenga uno y no hayan zombies activos.
                // Esta opcion no aparecera en el menu mientras hayan zombies o no tenga botiquin, pero de todas formas hago un control al llamarla.
                if(this.superviviente.getTieneBotiquin) {
                    if(this.superviviente.getVidaActual == this.superviviente.getVidaMaxima) {
                        alert(`Tienes la vida al maximo, tu vida no aumento nada.\nAhora ya no tienes botiquin...`);
                    } else {
                        alert(`Tu botiquin te cura con 4 PVs.`);
                    }
                    this.superviviente.curarse();
                    this.superviviente.setCambiaBotiquin = false;
                } else {
                    alert(`No tienes botiquin, no puedes curarte.`);
                }
                break;

            case "verEstado":
                alert(`Estado de la Mansión:\n${this.toString()}\n\nTu Estado:\n${this.superviviente.toString()}`);
                break;

            case "salirJuego":
                alert(`¡Hasta luego!`);
                break;
        }
    }

    // Metodo Combatir -> Se combate a un solo zombie, independientemente del numero de zombies que haya en cada habitación.
    combatir () {
        // Generamos a un zombie.
        let zombie = new Zombie(this.habitacionActual);

        alert(`Caracteristicas del Zombie:\n${zombie.toString()}`);
        let turno = 1;

        // Mientras esten vivos, realizan el combate.
        while(this.superviviente.estaVivo() && zombie.estaVivo()) {
            let mensajeArma = `(Suma 1 punto por cada arma. Puntos sumados: ${this.superviviente.getCantidadArmas})`; // En caso de que tenga armas, se le informara al jugador.
            let mensajeCombate = `TURNO ${turno}\nRealizas el primer ataque ${(this.superviviente.cantidadArmas > 0 ? mensajeArma : ``)}: `;
            let dañoSuperviviente = this.superviviente.atacar(); // El superviviente ataca
            zombie.recibirDanio(dañoSuperviviente); // El zombie recibe el daño.
            mensajeCombate += `${dañoSuperviviente} daño -> Zombie queda a ${zombie.getVidaActual} PVs\n`;

            // Si el zombie esta vivo responde.
            if(zombie.getVidaActual > 0) {
                let ataqueZombie = zombie.atacar(); // El zombie ataca
                let mensajeProteccion = `(Resta un punto de daño por cada proteccion. Protecciones: ${this.superviviente.getCantidadProtecciones}), solo recibes ${(ataqueZombie - this.superviviente.getCantidadProtecciones)} daño.\n`;
                mensajeCombate += `Zombie responde: ${ataqueZombie} daño -> ${(this.superviviente.getCantidadProtecciones > 0 ? mensajeProteccion : ``)}`;
                this.superviviente.recibirDanio(ataqueZombie); // Recibe el daño.
                mensajeCombate += `Tu vida queda a ${this.superviviente.getVidaActual} puntos.`;
            } else {
                mensajeCombate += `Zombie no puede responder ¡Lo has matado!`;
                this.numZombies--;
            }  

            alert(mensajeCombate);
            turno++;
        }
     
    }

    // Metodo Buscar -> Permitira buscar por la habitacion una vez se hayan matado los zombies de la habitacion.
    buscarHabitacion () {
        //Restamos los intentos.
        this.intentosBusqueda--;

        // Lanzamos el dado de 100 caras.
        let resultado = this.lanzarDado(100);

        let mensajeResultado = ``;
        if(resultado <= 75) {
            mensajeResultado = `¡has hecho ruido!, ¡Cuidado!...\n`;
            // Volvemos a tirar el dado
            let resultadoRuido = this.lanzarDado(100);
            mensajeResultado += this.resultadoDadoRuido(resultadoRuido);

        } else if (resultado >= 76 && resultado <= 90) { 
            let mensajeBotiquin = ``;
            if(!this.superviviente.getTieneBotiquin) {
                this.superviviente.setCambiaBotiquin = true;
                mensajeBotiquin = ` Ahora ya tienes uno.`;
            } else {
                mensajeBotiquin = ` Pero como ya tienes uno, no lo puedes coger...`;
            }
            mensajeResultado += `¡Has encontrado un botiquin!`;
            mensajeResultado += mensajeBotiquin;
            
        } else if (resultado >= 91 && resultado <= 95) {
            this.superviviente.encontrarProteccion();
            mensajeResultado = `¡Has encontrado protección! +1`;

        } else {
            this.superviviente.encontrarArma();
            mensajeResultado = `¡Has encontrado un arma! +1`;
        }

        alert(mensajeResultado);
    }

    // Este metodo recibe como parametro el resultado del dado cuando hace ruido y dependiendo de el, nos devuelve la accion correspondiente.
    resultadoDadoRuido (resultadoRuido) {

        let mensajeRuido = ``;
        if(resultadoRuido <= 40) {
            mensajeRuido += `...Por suerte nadie te ha escuchado al otro lado esta vez.`;
        } else if (resultadoRuido >= 41 && resultadoRuido <= 80) {
            mensajeRuido += `...Te has encontrado a un zombie.`; 
            this.numZombies += 1;
        } else {
            mensajeRuido += `... Te has encontrado a 2 zombies.`;
            this.numZombies += 2;
        }
            
        return mensajeRuido;
    }

    // Metodo lanzar dado, el juego lanza un dado de 100 caras en buscar.
    lanzarDado (caras) {
        let dado = Math.floor(Math.random() * caras) + 1;

        return dado;
    }

    // Metodo avanzarHabitacion -> Preparamos la habitacion, actualizando el numero actual, numeros de zombie y los intentos de busqueda.
    avanzarHabitacion () {
        this.habitacionActual++;
        this.numZombies = 1;
        this.intentosBusqueda = 3;
        alert(`¡Avanzas a la siguiente habitación!\nAhora te encuentras en la habitacion ${this.habitacionActual}. Se reestablecen tus intentos de busqueda.`);
    }


    // Metodo to string para mostrar los datos.
    toString() {
        return `Numero de habitaciones: ${this.numHabitacionMax}\nIntentos de Busqueda: ${this.intentosBusqueda}\nHabitacion actual: ${this.habitacionActual}\nNumero de Zombies: ${this.numZombies}`;
    }

}

// La funcion de bienvenida es static, para poder ejecutarse sin necesidad que haya un objeto de clase mansion.
let dificultad = Mansion.bienvenidaDificultad();
// Luego se crea el objeto, pasandole la dificultad al constructor.
let mansion = new Mansion(dificultad);
// Ahora, todo el juego se ejecuta por medio del metodo iniciarJuego();
mansion.iniciarJuego();


