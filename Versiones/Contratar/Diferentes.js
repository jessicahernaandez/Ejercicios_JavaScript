// Solo se generan tropas con nombres distintos.

// Sigue el límite de 3 mercenarios.

export function tropasMostrar (cantidad, jugador) {
    let tropasAleatorias = [];

    while (tropasAleatorias.length < cantidad) {
        let tropa = generarTropa();

        // No añadir repetidas
        if (!tropasAleatorias.some(t => t.getNombre === tropa.getNombre)) {
            tropasAleatorias.push(tropa);
        }
    }

    return tropasAleatorias;
}

// Contratar solo tropas que el jugador pueda pagar
export function tropasMostrar(cantidad, jugador) {
    let tropas = [];

    while (tropas.length < cantidad) {
        let tropa = generarTropa();

        if (tropa.getCosteContratacion <= jugador.getOroJugador) {
            tropas.push(tropa);
        }
    }

    return tropas;
}

// Version mas ligera

export function contratarTropas(jugador) {

    while (puedeComprar(jugador, 5)) {

        const tropas = tropasMostrar(3, jugador);
        const opcion = parseInt(menuTropasElegir(jugador, tropas));

        // Opción inválida
        if (isNaN(opcion) || opcion < 0 || opcion > 3) {
            jugador.setIntentosContratacion = 1;
            alert(`Opción incorrecta. Intentos restantes: ${jugador.getIntentosContratacion}`);
            continue;
        }

        // Opción 0 = salir
        if (opcion === 0) {
            jugador.setIntentosContratacion = 1;
            alert(`Sales de la tienda. Intentos restantes: ${jugador.getIntentosContratacion}`);
            break;
        }

        // Tropas llenas (por seguridad extra)
        if (jugador.getTropasJugador.length === 5) {
            alert("Ya no tienes huecos.");
            break;
        }

        let elegida = tropas[opcion - 1];

        if (jugador.getOroJugador >= elegida.getCosteContratacion) {
            jugador.setTropasJugador = elegida;
            jugador.setRestaOro = elegida.getCosteContratacion;
            jugador.setIntentosContratacion = 1;

            mostrarTropasCompradas(jugador);

        } else {
            jugador.setIntentosContratacion = 1;
            alert(`No tienes suficiente oro.`);
        }
    }
}

function mostrarTropasCompradas(jugador) {
    let msg = "Tropas actuales:\n";
    jugador.getTropasJugador.forEach((t, i) => {
        msg += `${i+1}) ${t.getNombre} | ATK: ${t.getAtaque} | PVs: ${t.getPuntosVida}/${t.getPuntosVidaMax}\n`;
    });
    alert(msg);
}

// El jugador paga oro para refrescar las tropas generadas.

export function contratarTropas(jugador) {

    let continueShop = true;

    while (continueShop && puedeComprar(jugador, 5)) {

        let tropas = tropasMostrar(3, jugador);
        let opcion = prompt(
            mostrarMenuTropas(jugador, tropas) + 
            "\n\n4) Refrescar tropas (-100 oro)"
        );

        opcion = parseInt(opcion);

        if (opcion === 4) {
            if (jugador.getOroJugador >= 100) {
                jugador.setRestaOro = 100;
                alert("Tropas refrescadas.");
                continue;
            } else {
                alert("No tienes 100 de oro.");
                continue;
            }
        }

        // resto igual que la versión normal...
    }
}

// Generar un tipo especifico

export function tropasMostrar(cantidad, jugador, tipoDeseado = null) {
    let tropas = [];

    while (tropas.length < cantidad) {
        let tropa = generarTropa();

        if (!tipoDeseado || tropa.getNombre.toLowerCase() === tipoDeseado.toLowerCase()) {
            tropas.push(tropa);
        }
    }

    return tropas;
}


// En modo difícil, generar tropas que complementen la composición del jugador.
export function tropasMostrar(cantidad, jugador) {

    let tropas = [];

    while (tropas.length < cantidad) {
        let tropa = generarTropa();
        let tiposJugador = jugador.getTropasJugador.map(t => t.getNombre);

        // Evitar duplicados excesivos
        if (tiposJugador.filter(t => t === tropa.getNombre).length < 2) {
            tropas.push(tropa);
        }
    }

    return tropas;
}


/// Rareza

export function tropasMostrar(cantidad, jugador) {
    let tropas = [];

    const probabilidadesTipo = [
        { tipo: "Guerrero", p: 50 },
        { tipo: "Ladron", p: 30 },
        { tipo: "Mago", p: 20 }
    ];

    const probabilidadesRareza = [
        { nombre: "Común", p: 60, vida: 1.00, ataque: 0 },
        { nombre: "Poco Común", p: 30, vida: 1.10, ataque: 2 },
        { nombre: "Raro", p: 10, vida: 1.25, ataque: 5 }
    ];

    function elegirSegunProbabilidad(lista) {
        let rnd = Math.random() * 100;
        let acumulado = 0;

        for (let item of lista) {
            acumulado += item.p;
            if (rnd <= acumulado) return item;
        }
    }

    while (tropas.length < cantidad) {

        // 1. Escoger tipo (Guerrero / Ladrón / Mago)
        let tipoElegido = elegirSegunProbabilidad(probabilidadesTipo);

        // 2. Crear tropa base con el tipo elegido
        let tropa = generarTropa(tipoElegido.tipo);  // necesitas que tu función soporte este parámetro

        // 3. Escoger rareza (Común / Poco común / Raro)
        let rareza = elegirSegunProbabilidad(probabilidadesRareza);

        // 4. Aplicar rareza
        tropa.setPuntosDeVidaMax = parseInt(tropa.getPuntosVidaMax * rareza.vida);
        tropa.setPuntosVida = tropa.getPuntosVidaMax;
        tropa.setAtaque = tropa.getAtaque + rareza.ataque;

        // 5. Guardar la tropa
        tropas.push(tropa);

        // (Opcional) puedes añadir el nombre de rareza en la clase:
        tropa.rareza = rareza.nombre;
    }

    return tropas;
}

//`${indice+1}) ${tropa.toString()} | Rareza: ${tropa.rareza}`