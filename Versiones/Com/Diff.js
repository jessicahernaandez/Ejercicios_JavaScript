// Version mas limpia

export function combatir(jugador) {

    let tropasCPU = generaTropasCPU();
    muestraTropasCombatir(jugador, tropasCPU);

    let derrotadas = 0;

    while (tieneUnidadesConVida(jugador.getTropasJugador) &&
           tieneUnidadesConVida(tropasCPU)) 
    {
        let tropaJ = jugador.getTropasJugador.find(t => !t.getKO);
        let tropaC = tropasCPU.find(t => !t.getKO);

        let turno = 1;

        while (!tropaJ.getKO && !tropaC.getKO) {

            let msg = `TURNO ${turno}\n`;

            // Ataca jugador
            let dañoJ = dañoRealizar(tropaJ, tropaC);
            let esquivaC = realizarAtaque(tropaC, dañoJ);
            msg += `Tu ${tropaJ.getNombre} ataca: ${dañoJ} daño ${esquivaC} -> CPU queda ${tropaC.getPuntosVida} PVs\n`;

            // Respuesta si CPU vive
            if (!tropaC.getKO) {
                let dañoCPU = dañoRealizar(tropaC, tropaJ);
                let esquivaJ = realizarAtaque(tropaJ, dañoCPU);
                msg += `CPU ${tropaC.getNombre} responde: ${dañoCPU} daño ${esquivaJ} -> Tú quedas ${tropaJ.getPuntosVida} PVs`;
            }

            alert(msg);
            turno++;
        }

        if (tropaC.getKO) derrotadas++;
        alert(mensajeFinalTurno(tropaJ, tropaC, tropaC.getKO ? "Jugador" : "CPU"));
    }

    let ganaste = tieneUnidadesConVida(jugador.getTropasJugador);
    let oro = derrotadas * 500;

    jugador.setSumaOro = oro;
    if (ganaste) jugador.setCambiaVictorias = 1;
    else jugador.setCambiaDerrotas = 1;

    alert(`${ganaste ? "¡Has ganado!" : "Has perdido."} Oro ganado: ${oro}`);
    jugador.setUsoRecuperacion = true;
    jugador.restaurarIntentosContratacion = 6;
}

// Combate con nvelocidad
// Añadir a cada clase hija:
// this.velocidad = Math.floor(Math.random() * 10) + 1;
export function combatir(jugador) {

    let tropasCPU = generaTropasCPU();
    muestraTropasCombatir(jugador, tropasCPU);

    while (tieneUnidadesConVida(jugador.getTropasJugador) &&
           tieneUnidadesConVida(tropasCPU)) 
    {
        let tropaJ = jugador.getTropasJugador.find(t => !t.getKO);
        let tropaC = tropasCPU.find(t => !t.getKO);

        while (!tropaJ.getKO && !tropaC.getKO) {

            let primero = tropaJ.velocidad >= tropaC.velocidad ? tropaJ : tropaC;
            let segundo = primero === tropaJ ? tropaC : tropaJ;

            // Ataca el más rápido
            let daño1 = dañoRealizar(primero, segundo);
            realizarAtaque(segundo, daño1);

            if (segundo.getKO) break;

            // Segundo responde
            let daño2 = dañoRealizar(segundo, primero);
            realizarAtaque(primero, daño2);
        }

        alert(mensajeFinalTurno(tropaJ, tropaC, tropaC.getKO ? "Jugador" : "CPU"));
    }
}

// Aquí aunque uno muera en el turno, igual responde.
// Como en RPGs clásicos.

export function combatir(jugador) {

    let tropasCPU = generaTropasCPU();
    muestraTropasCombatir(jugador, tropasCPU);

    while (tieneUnidadesConVida(jugador.getTropasJugador) &&
           tieneUnidadesConVida(tropasCPU)) 
    {
        let J = jugador.getTropasJugador.find(t => !t.getKO);
        let C = tropasCPU.find(t => !t.getKO);

        while (!J.getKO && !C.getKO) {

            let dañoJ = dañoRealizar(J, C);
            let dañoC = dañoRealizar(C, J);

            realizarAtaque(C, dañoJ);
            realizarAtaque(J, dañoC);

            alert(`Ambos atacan:\n${J.getNombre} hace ${dañoJ}\n${C.getNombre} hace ${dañoC}`);
        }

        alert(mensajeFinalTurno(J, C, C.getKO ? "Jugador" : "CPU"));
    }
}

// Antes de cada ronda, CPU cambia a una tropa que tenga ventaja contra la del jugador.
export function combatir(jugador) {

    let CPU = generaTropasCPU();
    muestraTropasCombatir(jugador, CPU);

    while (tieneUnidadesConVida(jugador.getTropasJugador) &&
           tieneUnidadesConVida(CPU)) 
    {
        let J = jugador.getTropasJugador.find(t => !t.getKO);

        // Inteligencia: CPU escoge tropa con ventaja si existe
        let candidata = CPU.find(t => !t.getKO && t.ventajaTipo(J.getNombre));
        let C = candidata || CPU.find(t => !t.getKO);

        while (!J.getKO && !C.getKO) {

            let dañoJ = dañoRealizar(J, C);
            realizarAtaque(C, dañoJ);

            if (!C.getKO) {
                let dañoC = dañoRealizar(C, J);
                realizarAtaque(J, dañoC);
            }
        }

        alert(mensajeFinalTurno(J, C, C.getKO ? "Jugador" : "CPU"));
    }
}

// VERSIÓN E — Daño progresivo (estilo “furia”)
// Cada turno aumenta el ataque base.

export function combatir(jugador) {

    let CPU = generaTropasCPU();
    muestraTropasCombatir(jugador, CPU);

    while (tieneUnidadesConVida(jugador.getTropasJugador) &&
           tieneUnidadesConVida(CPU)) 
    {
        let J = jugador.getTropasJugador.find(t => !t.getKO);
        let C = CPU.find(t => !t.getKO);

        let bonusJ = 0;
        let bonusC = 0;

        while (!J.getKO && !C.getKO) {

            let dañoJ = dañoRealizar(J, C) + bonusJ;
            let dañoC = dañoRealizar(C, J) + bonusC;

            bonusJ += 2;
            bonusC += 2;

            realizarAtaque(C, dañoJ);
            if (!C.getKO) realizarAtaque(J, dañoC);

            alert(`Daño aumentado por furia: +${bonusJ}`);
        }

        alert(mensajeFinalTurno(J, C, C.getKO ? "Jugador" : "CPU"));
    }
}

// Daño crítico 20%, fallo 10%.

function aplicarCriticoOFallo(daño) {
    let rnd = Math.random();
    if (rnd < 0.10) return 0;      // fallo
    if (rnd < 0.30) return daño * 2; // crítico
    return daño;
}

export function combatir(jugador) {

    let CPU = generaTropasCPU();
    muestraTropasCombatir(jugador, CPU);

    while (tieneUnidadesConVida(jugador.getTropasJugador) &&
           tieneUnidadesConVida(CPU)) 
    {
        let J = jugador.getTropasJugador.find(t => !t.getKO);
        let C = CPU.find(t => !t.getKO);

        while (!J.getKO && !C.getKO) {

            let dañoJ = aplicarCriticoOFallo(dañoRealizar(J, C));
            let dañoC = aplicarCriticoOFallo(dañoRealizar(C, J));

            realizarAtaque(C, dañoJ);
            if (!C.getKO) realizarAtaque(J, dañoC);

            alert(`Daño J: ${dañoJ} | Daño CPU: ${dañoC}`);
        }
    }
}

// Turno simultáneo estilo Pokémon
// Ambos atacan simultáneamente, aunque uno muera también golpea.

export function combatir(jugador) {

    let CPU = generaTropasCPU();
    muestraTropasCombatir(jugador, CPU);

    while (tieneUnidadesConVida(jugador.getTropasJugador) &&
           tieneUnidadesConVida(CPU)) 
    {
        let J = jugador.getTropasJugador.find(t => !t.getKO);
        let C = CPU.find(t => !t.getKO);

        while (!J.getKO && !C.getKO) {

            let dañoJ = dañoRealizar(J, C);
            let dañoC = dañoRealizar(C, J);

            // Ataques simultáneos
            realizarAtaque(C, dañoJ);
            realizarAtaque(J, dañoC);

            alert(`Simultáneo:\nTú haces ${dañoJ}\nCPU hace ${dañoC}`);
        }
    }
}

// Ataques por unidades aleatorias en vez de la primera viva:
let tropaJugador = jugador.getTropasJugador.filter(u => !u.getKO)[Math.floor(Math.random()*n)];


/****************** FUNCIONES DEL COMBATE MEJORADAS ***********************/

// Combate principal con mejoras
export function combatir(jugador) {
    let tropasCPU = generaTropasCPU();
    muestraTropasCombatir(jugador, tropasCPU);

    let tropasDerrotadasJugador = 0;

    while (tieneUnidadesConVida(jugador.getTropasJugador) && tieneUnidadesConVida(tropasCPU)) {
        // Selección de unidades activas
        let tropaJugador = jugador.getTropasJugador.find(u => !u.getKO);
        let tropaCPU = tropasCPU.find(u => !u.getKO);

        let numTurnos = 1;
        let turnoGanado = '';

        while (!tropaJugador.getKO && !tropaCPU.getKO) {
            let mensajeTurno = `TURNO ${numTurnos}\n`;

            // Determinar orden de ataque aleatorio
            let jugadorPrimero = Math.random() < 0.5;

            if (jugadorPrimero) {
                mensajeTurno += ejecutarTurno(tropaJugador, tropaCPU, 'Jugador');
                if (!tropaCPU.getKO) mensajeTurno += ejecutarTurno(tropaCPU, tropaJugador, 'CPU');
            } else {
                mensajeTurno += ejecutarTurno(tropaCPU, tropaJugador, 'CPU');
                if (!tropaJugador.getKO) mensajeTurno += ejecutarTurno(tropaJugador, tropaCPU, 'Jugador');
            }

            alert(mensajeTurno);

            if (tropaCPU.getKO) {
                turnoGanado = `Tu ${tropaJugador.getNombre}`;
                tropasDerrotadasJugador++;
            } else if (tropaJugador.getKO) {
                turnoGanado = `CPU ${tropaCPU.getNombre}`;
            }

            numTurnos++;
        }

        let mensajeFinal = mensajeFinalTurno(tropaJugador, tropaCPU, turnoGanado);
        alert(mensajeFinal);
    }

    // Mensaje final de combate
    let mensajeGanador = '';
    let dineroGanado = tropasDerrotadasJugador * 500;

    if (tieneUnidadesConVida(jugador.getTropasJugador)) {
        mensajeGanador = `¡Has ganado el combate! +${dineroGanado} oro. (Unidades CPU derrotadas: ${tropasDerrotadasJugador})`;
        jugador.setCambiaVictorias = 1;
    } else {
        mensajeGanador = `¡CPU ha ganado el combate! Mejor suerte la próxima.\nHas recibido ${dineroGanado} oro por las unidades derrotadas.`;
        jugador.setCambiaDerrotas = 1;
    }

    alert(mensajeGanador);
    jugador.setSumaOro = dineroGanado;
    jugador.setUsoRecuperacion = true;
    jugador.restaurarIntentosContratacion = 6;
}

// Función que ejecuta un turno de ataque de una unidad sobre otra
function ejecutarTurno(atacante, defensor, tipo) {
    let mensaje = '';
    
    // Aplicar efectos de estado antes del ataque
    if (defensor.estado === 'paralizado') {
        mensaje += `${tipo === 'Jugador' ? 'Tu' : 'CPU'} ${defensor.getNombre} está paralizado y no puede atacar este turno.\n`;
        defensor.estado = null; // Se quita paralizado después de un turno
    }

    // Determinar daño base
    let daño = atacante.atacar();
    
    // Crítico aleatorio
    if (Math.random() < 0.15) {
        daño *= 1.5;
        mensaje += `¡Crítico! `;
    }

    // Aplicar ventaja de tipo
    daño = atacante.calcularDañoVentaja(daño, defensor.getNombre);

    // Aplicar daño y verificar esquiva
    let mensajeEsquiva = realizarAtaque(defensor, daño);

    // Aplicar daño por estado envenenado
    if (atacante.estado === 'envenenado') {
        let dañoVeneno = 5;
        defensor.recibirDaño(dañoVeneno);
        mensaje += `${defensor.getNombre} recibe ${dañoVeneno} de daño por veneno. `;
    }

    // Mensajes de habilidades
    let mensajeHabilidad = habilidadAtacarMensaje(atacante);

    mensaje += `${tipo === 'Jugador' ? 'Tu' : 'CPU'} ${atacante.getNombre}${mensajeHabilidad} ataca ${defensor.getNombre}${mensajeEsquiva}: ${daño} daño -> ${defensor.getPuntosVida}/${defensor.getPuntosVidaMax} PVs\n`;

    return mensaje;
}

// Función actualizar: agregar estado a una unidad
export function aplicarEstado(tropa, estado) {
    tropa.estado = estado; // 'envenenado', 'paralizado', etc.
}

// Mantiene resto de funciones: tieneUnidadesConVida, generaTropasCPU, muestraTropasCombatir, habilidadAtacarMensaje, dañoRealizar, realizarAtaque, mensajeFinalTurno