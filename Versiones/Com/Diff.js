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