/////////////////////// MODIFICACIÓN 1 ///////////////////////
// Habilidad del mago con daño variable según PV del enemigo
// Archivo: mago.js
// Sustituye el método habilidad() actual en la clase mago
// Explicación: Hace daño proporcional al PV actual del enemigo + un valor aleatorio
habilidad(enemigo) { 
    let porcentaje = 0.5;
    let aleatorio = Math.floor(Math.random() * 11) + 10; // 10-20
    let dano = Math.floor(enemigo.getPv * porcentaje + aleatorio);
    return dano;
}

/////////////////////// MODIFICACIÓN 2 ///////////////////////
// Nueva habilidad para el guerrero: golpe crítico aleatorio
// Archivo: guerrero.js
// 20% de probabilidad de hacer un golpe crítico (+50% daño)
habilidad() {
    let base = this.atk + Math.floor(Math.random() * 6) + 5;
    let crit = Math.random() < 0.2;
    if (crit) {
        base = Math.floor(base * 1.5);
        console.log("¡Golpe crítico!");
    }
    return base;
}

/////////////////////// MODIFICACIÓN 3 ///////////////////////
// Mejora de la habilidad del ladrón: esquiva según clase enemiga
// Archivo: ladron.js
// La probabilidad de esquiva aumenta si el enemigo es guerrero
habilidad(enemigo){
    let baseProb = 0.35; // 35%
    if (enemigo.getNombre === "Guerrero") {
        baseProb += 0.2; // +20% contra guerrero
    }
    return Math.random() < baseProb;
}

/////////////////////// MODIFICACIÓN 4 ///////////////////////
// Añadir nueva tropa: Arquero
// Archivo: archer.js
// ATK medio, PV bajo, habilidad de ataque crítico basado en probabilidad
export class arquero extends tropa{
    constructor(){
        super("Arquero", Math.floor(Math.random() * 21)+40, 1200, 600, 3);
    }

    habilidad(){
        let crit = Math.random() < 0.3; // 30% probabilidad
        let base = this.atk + Math.floor(Math.random() * 6) + 5;
        if (crit) {
            base = Math.floor(base * 1.75); // +75% daño
            console.log("¡Arquero crítico!");
        }
        return base;
    }

    recuperarse(){
        super.recuperarse();
        this.habilidadUsada = 3;
    }
}

/////////////////////// MODIFICACIÓN 5 ///////////////////////
// Cambiar recuperación de tropas al 50% de PV en lugar de 70%
// Archivo: tropa.js
// Se reemplaza el método recuperarse()
recuperarse(){
    let cura = parseInt(this.vidaMax * 0.5);
    this.pv = this.pv + cura;
    if (this.pv > this.vidaMax) this.pv = this.vidaMax;
    this.estado = "OK";
}
/////////////////////// BLOQUE 1: CLASES DE TROPAS ///////////////////////

// ---------------- MODIFICACIÓN: Mago - daño variable según PV enemigo ----------------
// Archivo: mago.js
habilidad(enemigo){ 
    let porcentaje = 0.5;
    let aleatorio = Math.floor(Math.random() * 11) + 10; // 10-20
    let dano = Math.floor(enemigo.getPv * porcentaje + aleatorio);
    return dano;
}

// ---------------- MODIFICACIÓN: Guerrero - golpe crítico aleatorio ----------------
// Archivo: guerrero.js
habilidad(){
    let base = this.atk + Math.floor(Math.random() * 6) + 5;
    let crit = Math.random() < 0.2; // 20% probabilidad
    if (crit) {
        base = Math.floor(base * 1.5);
        console.log("¡Golpe crítico!");
    }
    return base;
}

// ---------------- MODIFICACIÓN: Ladrón - esquiva según clase enemiga ----------------
// Archivo: ladron.js
habilidad(enemigo){
    let baseProb = 0.35; // 35%
    if (enemigo.getNombre === "Guerrero") {
        baseProb += 0.2; // +20% contra guerrero
    }
    return Math.random() < baseProb;
}

// ---------------- MODIFICACIÓN: Recuperación de tropas al 50% PV ----------------
// Archivo: tropa.js
recuperarse(){
    let cura = parseInt(this.vidaMax * 0.5);
    this.pv = this.pv + cura;
    if (this.pv > this.vidaMax) this.pv = this.vidaMax;
    this.estado = "OK";
}

// ---------------- MODIFICACIÓN: Nueva tropa Arquero ----------------
// Archivo: archer.js
export class arquero extends tropa{
    constructor(){
        super("Arquero", Math.floor(Math.random() * 21)+40, 1200, 600, 3);
    }

    habilidad(){
        let crit = Math.random() < 0.3;
        let base = this.atk + Math.floor(Math.random() * 6) + 5;
        if (crit) {
            base = Math.floor(base * 1.75);
            console.log("¡Arquero crítico!");
        }
        return base;
    }

    recuperarse(){
        super.recuperarse();
        this.habilidadUsada = 3;
    }
}

// ---------------- MODIFICACIÓN: Nueva tropa Clérigo (cura al ejército) ----------------
// Archivo: clerigo.js
export class clerigo extends tropa{
    constructor(){
        super("Clérigo", 50, 1500, 700, 2);
    }

    habilidad(ejercito){
        // Cura 30% PV a todas las tropas aliadas
        ejercito.forEach(t => {
            let cura = Math.floor(t.getVidaMax * 0.3);
            t.setPv = Math.min(t.getPv + cura, t.getVidaMax);
        });
        console.log("¡Clérigo ha curado al ejército!");
        return true;
    }

    recuperarse(){
        super.recuperarse();
        this.habilidadUsada = 2;
    }
}

/////////////////////// BLOQUE 2: CLASE JUGADOR ///////////////////////

// ---------------- MODIFICACIÓN: Limitar maxTropas según dificultad ----------------
// Archivo: jugador.js
constructor(dificultad){
    this.oro=5000;
    this.victorias=0;
    this.derrotas=0;
    this.intentosContr=6;
    this.recuperacion=0;
    this.ejercito=[];
    this.maxTropas = (dificultad=="facil")?5:3; // menos tropas en difícil
}

// ---------------- MODIFICACIÓN: Añadir inventario y experiencia ----------------
constructor(dificultad){
    this.inventario = {pociones:0, objetos:[]};
    this.experiencia = 0;
    this.nivel = 1;
}

// ---------------- MODIFICACIÓN: Ordenar ejército por ATK ----------------
ordenarEjercitoPorAtk(){
    this.ejercito.sort((a,b)=>b.getAtk - a.getAtk);
}

// ---------------- MODIFICACIÓN: Ordenar ejército por PV ----------------
ordenarEjercitoPorPv(){
    this.ejercito.sort((a,b)=>b.getPv - a.getPv);
}

// ---------------- MODIFICACIÓN: Añadir restricciones al añadirTropa ----------------
añadirTropa(tropa){
    if(this.numTropas() >= this.maxTropas){
        console.log("No puedes añadir más tropas");
        return false;
    }
    if(tropa.getCoste > this.getOro){
        console.log("No tienes suficiente oro");
        return false;
    }
    this.ejercito.push(tropa);
    this.setOro = this.getOro - tropa.getCoste;
    return true;
}

/////////////////////// BLOQUE 3: FUNCIONES AUXILIARES ///////////////////////

// ---------------- MODIFICACIÓN: Calcular bonus con nuevas relaciones ----------------
// Archivo: funcionesDeTropas.js
export function calcuBonus(tropa1, tropa2){
    if(tropa1.getNombre=="Mago" && tropa2.getNombre=="Guerrero") return 1.5;
    if(tropa1.getNombre=="Guerrero" && tropa2.getNombre=="Ladrón") return 1.5;
    if(tropa1.getNombre=="Ladrón" && tropa2.getNombre=="Mago") return 1.5;
    if(tropa1.getNombre=="Arquero" && tropa2.getNombre=="Mago") return 1.4;
    return 1;
}

// ---------------- MODIFICACIÓN: Tipo de daño basado en PV y turnos ----------------
// Archivo: funcionesCombate.js
export function tipoDeDaño(tropaAtk, tropaDef){
    let tipo = "atkNormal";
    if(tropaAtk.getHabilidadUsada>0 && tropaAtk.getPv < tropaAtk.getVidaMax*0.5){
        tipo = "habilidad";
    }
    if(tropaDef.getNombre=="Ladrón" && tropaDef.habilidad()){
        tipo = "esquivaAtk";
    }
    return tipo;
}

// ---------------- MODIFICACIÓN: Generar tropas con probabilidades por dificultad ----------------
export function generarTropas(dificultad){
    let rand = Math.floor(Math.random()*100)+1;
    if(rand <= (dificultad=="facil"?20:15)) return new mago();
    if(rand <= (dificultad=="facil"?50:40)) return new ladron();
    if(rand <= (dificultad=="facil"?80:70)) return new guerrero();
    return new arquero(); // nueva tropa
}

// ---------------- MODIFICACIÓN: verEstado mostrando estadísticas adicionales ----------------
export function verEstado(jugador){
    let totalAtk = jugador.ejercito.reduce((sum,t)=>sum+t.getAtk,0);
    let totalPv = jugador.ejercito.reduce((sum,t)=>sum+t.getPv,0);
    let promedioPv = (jugador.ejercito.length>0)?Math.floor(totalPv/jugador.ejercito.length):0;
    alert(`Victorias:${jugador.getVictorias} | Derrotas:${jugador.getDerrotas}\nOro:${jugador.getOro}\nEjército: ${jugador.ejercito.length} tropas\nTotal ATK:${totalAtk} | PV promedio:${promedioPv}`);
}

/////////////////////// BLOQUE 4: FLUJO PRINCIPAL (index.js) ///////////////////////

// ---------------- MODIFICACIÓN: Menú de pociones ----------------
// Archivo: index.js, dentro del switch principal
/*
case 6: // Comprar pociones
*/
if(player.getOro < 100) {
    alert("Necesitas al menos 100 de oro para comprar pociones");
} else {
    let cantidad = parseInt(prompt("¿Cuántas pociones quieres comprar? (100 oro cada una)"));
    if(!isNaN(cantidad) && cantidad > 0) {
        let costeTotal = cantidad * 100;
        if(costeTotal <= player.getOro){
            player.setOro = player.getOro - costeTotal;
            player.inventario.pociones += cantidad;
            alert(`Has comprado ${cantidad} pociones. Pociones totales: ${player.inventario.pociones}`);
        } else {
            alert("No tienes suficiente oro");
        }
    } else {
        alert("Cantidad inválida");
    }
}

// ---------------- MODIFICACIÓN: Usar poción en combate ----------------
// En la parte del combate, dentro del while de turno de jugador

if(player.inventario.pociones > 0){
    let usar = prompt("¿Deseas usar una poción para curar esta tropa? (sí/no)").toLowerCase().trim();
    if(usar === "sí" || usar === "si"){
        let cura = Math.floor(firstAlive.getVidaMax * 0.5);
        firstAlive.setPv = Math.min(firstAlive.getPv + cura, firstAlive.getVidaMax);
        player.inventario.pociones -= 1;
        alert(`Has curado a ${firstAlive.getNombre} +${cura} PVs. Pociones restantes: ${player.inventario.pociones}`);
    }
}


// ---------------- MODIFICACIÓN: Turnos basados en velocidad ----------------
// Archivo: tropa.js añadir atributo velocidad y getter/setter

this.velocidad = Math.floor(Math.random()*10)+1; // 1-10
get getVelocidad() { return this.velocidad; }
set setVelocidad(valor) { this.velocidad = valor; }


// Antes de ejecutar luchar(), ordenar tropas por velocidad

let tropasOrdenadas = [firstAlive, firstEnemyAlive].sort((a,b)=>b.getVelocidad - a.getVelocidad);
let atacante = tropasOrdenadas[0];
let defensor = tropasOrdenadas[1];
let tipoDañoAtacante = tipoDeDaño(atacante, defensor);
let tipoDañoDefensor = tipoDeDaño(defensor, atacante);
let mensaje = luchar(atacante, defensor, tipoDañoAtacante, tipoDañoDefensor);


// ---------------- MODIFICACIÓN: Estadísticas post-juego ----------------
// Al final del juego, después del while principal

let totalTropas = player.ejercito.length;
let tropaFuerte = player.ejercito.reduce((max, t) => t.getAtk > max.getAtk ? t : max, player.ejercito[0]);
let totalPv = player.ejercito.reduce((sum, t) => sum + t.getPv,0);
let promedioPv = totalTropas > 0 ? Math.floor(totalPv/totalTropas) : 0;
let porcentajeVictorias = player.getVictorias*100 / (player.getVictorias + player.getDerrotas);

alert(`Estadísticas finales:
% victorias: ${porcentajeVictorias.toFixed(2)}%
Tropa con mayor ATK: ${tropaFuerte.getNombre} (${tropaFuerte.getAtk})
PV promedio ejército: ${promedioPv}`);
/////////////////////// BLOQUE COMBATE MODIFICADO ///////////////////////
// Archivo: index.js (sólo el bucle de combate)
// Reemplaza el while de combate por este bloque para examen

// Supongamos que firstAlive = primera tropa del jugador viva
// firstEnemyAlive = primera tropa enemiga viva

let allDead = player.ejercito.every(t => t.getEstado == "KO");
let allEnemyDead = enemyArmy.every(t => t.getEstado == "KO");
let contTurnos = 1;

while(!allDead && !allEnemyDead){

    firstAlive = player.ejercito.find(t => t.getEstado == "OK");
    firstEnemyAlive = enemyArmy.find(t => t.getEstado == "OK");

    // ---------------- USO DE POCIÓN ----------------
    if(player.inventario && player.inventario.pociones > 0){
        let usar = prompt(`¿Deseas usar una poción en ${firstAlive.getNombre}? (sí/no)`).toLowerCase().trim();
        if(usar === "sí" || usar === "si"){
            let cura = Math.floor(firstAlive.getVidaMax * 0.5);
            firstAlive.setPv = Math.min(firstAlive.getPv + cura, firstAlive.getVidaMax);
            player.inventario.pociones -= 1;
            alert(`¡Has curado a ${firstAlive.getNombre} +${cura} PVs! Pociones restantes: ${player.inventario.pociones}`);
        }
    }

    // ---------------- ORDENAR POR VELOCIDAD ----------------
    // Se asume que tropa tiene getVelocidad
    let tropasOrdenadas = [firstAlive, firstEnemyAlive].sort((a,b) => b.getVelocidad - a.getVelocidad);
    let atacante = tropasOrdenadas[0];
    let defensor = tropasOrdenadas[1];

    // ---------------- DETERMINAR TIPO DE DAÑO ----------------
    let tipoDañoAtacante = tipoDeDaño(atacante, defensor);
    let tipoDañoDefensor = tipoDeDaño(defensor, atacante);

    // ---------------- REALIZAR COMBATE ----------------
    let mensaje = `TURNO ${contTurnos}:\n`;
    mensaje += luchar(atacante, defensor, tipoDañoAtacante, tipoDañoDefensor);
    alert(mensaje);

    contTurnos++;

    // ---------------- ACTUALIZAR ESTADO ----------------
    allDead = player.ejercito.every(t => t.getEstado == "KO");
    allEnemyDead = enemyArmy.every(t => t.getEstado == "KO");
}

// ---------------- BONIFICACIONES AL FINAL DEL COMBATE ----------------
let contDerrotados = enemyArmy.filter(t => t.getEstado == "KO").length;
let bonusOro = 500 * contDerrotados;

if(allEnemyDead){
    player.setOro = player.getOro + bonusOro;
    player.setVictorias = player.getVictorias + 1;
    player.setRecuperacion = 1;
    player.setIntentosContr = 6;
    alert(`¡Victoria! Oro ganado: ${bonusOro}`);
} else {
    player.setOro = player.getOro + bonusOro;
    player.setDerrotas = player.getDerrotas + 1;
    player.setRecuperacion = 1;
    player.setIntentosContr = 6;
    alert(`Has perdido. Oro ganado: ${bonusOro}`);
}
/////////////////////// MODIFICACIÓN 2 ///////////////////////
// Archivo: index.js (combat loop)
// Explicación: Cada 2 turnos, las tropas recuperan un porcentaje de su ATK original
// Cómo usar: Reemplazar el while de combate o integrarlo dentro del bucle de combate

let turnos = 1;

while(!allDead && !allEnemyDead){
    firstAlive = player.ejercito.find(t => t.getEstado == "OK");
    firstEnemyAlive = enemyArmy.find(t => t.getEstado == "OK");

    // ---------------- REGENERACIÓN DE ATAQUE ----------------
    // Cada 2 turnos, recuperan 20% del ATK original (getAtkMax)
    if(turnos % 2 === 0){
        let recuperarPorcentaje = 0.2;
        [firstAlive, firstEnemyAlive].forEach(tropa => {
            let atkOriginal = tropa.getAtkMax || tropa.getAtk; // si se define getAtkMax en la clase tropa
            let incremento = Math.floor(atkOriginal * recuperarPorcentaje);
            tropa.setAtk = tropa.getAtk + incremento;
        });
    }

    // ---------------- DETERMINAR ORDEN ----------------
    let tropasOrdenadas = [firstAlive, firstEnemyAlive].sort((a,b) => b.getVelocidad - a.getVelocidad);
    let atacante = tropasOrdenadas[0];
    let defensor = tropasOrdenadas[1];

    // ---------------- DETERMINAR TIPO DE DAÑO ----------------
    let tipoDañoAtacante = tipoDeDaño(atacante, defensor);
    let tipoDañoDefensor = tipoDeDaño(defensor, atacante);

    // ---------------- REALIZAR COMBATE ----------------
    let mensaje = `TURNO ${turnos}:\n`;
    mensaje += luchar(atacante, defensor, tipoDañoAtacante, tipoDañoDefensor);
    alert(mensaje);

    turnos++;

    // ---------------- ACTUALIZAR ESTADO ----------------
    allDead = player.ejercito.every(t => t.getEstado == "KO");
    allEnemyDead = enemyArmy.every(t => t.getEstado == "KO");
}
/////////////////////// MODIFICACIÓN 3 ///////////////////////
// Archivo: guerrero.js
// Explicación: El guerrero ahora puede hacer un golpe crítico aleatorio (10%-30% más daño)
// Cómo usar: Reemplazar el método habilidad() o añadir un nuevo método critico()

golpeCritico(){
    let porcentaje = Math.floor(Math.random() * 21) + 10; // 10 a 30%
    return Math.floor(this.getAtk * (1 + porcentaje / 100));
}

//////////////////////////////////////////////////////////////

/////////////////////// MODIFICACIÓN 4 ///////////////////////
// Archivo: ladron.js
// Explicación: La esquiva del ladrón ahora depende de la clase enemiga
// Cómo usar: Modificar el método habilidad()

habilidad(enemigo){
    let base = Math.floor(Math.random() * 100) + 1;
    let chance = 0;
    if(enemigo.getNombre === "Mago") chance = 50; // más fácil esquivar magos
    else if(enemigo.getNombre === "Guerrero") chance = 30;
    else chance = 40;
    return base <= chance;
}

//////////////////////////////////////////////////////////////

/////////////////////// MODIFICACIÓN 5 ///////////////////////
// Archivo: tropa.js
// Explicación: Cambiar porcentaje de recuperación al 80%
// Cómo usar: Modificar método recuperarse()

recuperarse(){
    let cura = Math.floor(this.vidaMax * 0.8);
    this.pv = Math.min(this.pv + cura, this.vidaMax);
    this.estado = "OK";
}

//////////////////////////////////////////////////////////////

/////////////////////// MODIFICACIÓN 6 ///////////////////////
// Archivo: tropa.js
// Explicación: Limitar recuperación solo 1 vez por combate
// Cómo usar: Añadir propiedad recuperacionUsada y condicional en recuperarse()

recuperarse(){
    if(this.recuperacionUsada) return;
    let cura = Math.floor(this.vidaMax * 0.7);
    this.pv = Math.min(this.pv + cura, this.vidaMax);
    this.estado = "OK";
    this.recuperacionUsada = true;
}

//////////////////////////////////////////////////////////////

/////////////////////// MODIFICACIÓN 7 ///////////////////////
// Archivo: index.js
// Explicación: Añadir nueva tropa “Arquero” con daño a distancia
// Cómo usar: Crear clase nueva arquero.js y añadir en generarTropas()

export class arquero extends tropa{
    constructor(){
        super("Arquero", Math.floor(Math.random() * 21)+50, 1200, 600,2);
        this.velocidad = Math.floor(Math.random()*5)+10;
    }
    habilidad(){
        return this.getAtk + Math.floor(Math.random()*10)+10; // daño variable
    }
}

//////////////////////////////////////////////////////////////

/////////////////////// MODIFICACIÓN 8 ///////////////////////
// Archivo: index.js
// Explicación: Añadir “Clerigo” que cura al ejército
// Cómo usar: Clase clerigo.js, método habilidad() cura aliados

habilidad(aliados){
    aliados.forEach(t => {
        if(t.getEstado !== "KO"){
            t.setPv = Math.min(t.getPv + 30, t.getVidaMax);
        }
    });
    this.habilidadUsada--;
}

//////////////////////////////////////////////////////////////

/////////////////////// MODIFICACIÓN 9 ///////////////////////
// Archivo: jugador.js
// Explicación: Limitar maxTropas según dificultad
// Cómo usar: Añadir setter que valide según dificultad

setMaxTropas(dificultad){
    if(dificultad === "facil") this.maxTropas = 5;
    else this.maxTropas = 3;
}

//////////////////////////////////////////////////////////////

/////////////////////// MODIFICACIÓN 10 ///////////////////////
// Archivo: jugador.js
// Explicación: Añadir inventario con pociones
// Cómo usar: Añadir propiedad inventario en constructor y métodos para usar

constructor(){
    this.oro=5000;
    this.victorias=0;
    this.derrotas=0;
    this.intentosContr=6;
    this.recuperacion=0;
    this.ejercito=[];
    this.maxTropas=5;
    this.inventario = { pociones: 2 }; // por defecto 2 pociones
}

usarPocion(tropa){
    if(this.inventario.pociones <=0) return false;
    let cura = Math.floor(tropa.getVidaMax*0.5);
    tropa.setPv = Math.min(tropa.getPv + cura, tropa.getVidaMax);
    this.inventario.pociones--;
    return true;
}

//////////////////////////////////////////////////////////////

/////////////////////// MODIFICACIÓN 11 ///////////////////////
// Archivo: funcionesDeTropas.js
// Explicación: Ajustar calcuBonus con nueva tropa “Arquero”
// Cómo usar: Modificar condicionales

export function calcuBonus(tropa1, tropa2){
    if(tropa1.getNombre == "Mago" && tropa2.getNombre == "Guerrero") return 1.5;
    else if(tropa1.getNombre == "Guerrero" && tropa2.getNombre == "Ladrón") return 1.5;
    else if(tropa1.getNombre == "Ladrón" && tropa2.getNombre == "Mago") return 1.5;
    else if(tropa1.getNombre == "Arquero" && tropa2.getNombre == "Clerigo") return 1.5;
    return 1;
}

//////////////////////////////////////////////////////////////

/////////////////////// MODIFICACIÓN 12 ///////////////////////
// Archivo: funcionesDeTropas.js
// Explicación: tipoDeDaño ahora depende de PV del enemigo
export function tipoDeDaño(tropaAtk, tropaDef){
    if(tropaAtk.getNombre === "Mago" && tropaDef.getPv < 30) return "habilidad";
    return "atkNormal";
}

//////////////////////////////////////////////////////////////

/////////////////////// MODIFICACIÓN 13 ///////////////////////
// Archivo: funcionesDeTropas.js
// Explicación: generarTropas ajusta probabilidades según dificultad
export function generarTropas(dificultad="facil"){
    let rand = Math.floor(Math.random()*100)+1;
    if(dificultad==="facil"){
        if(rand<=30) return new mago();
        else if(rand<=60) return new ladron();
        else return new guerrero();
    } else {
        if(rand<=20) return new mago();
        else if(rand<=50) return new ladron();
        else if(rand<=70) return new guerrero();
        else return new arquero();
    }
}

//////////////////////////////////////////////////////////////

/////////////////////// MODIFICACIÓN 14 ///////////////////////
// Archivo: funcionesDeTropas.js
// Explicación: verEstado muestra total ATK y PV promedio
export function verEstado(jugador){
    let totalAtk = jugador.ejercito.reduce((sum,t)=>sum+t.getAtk,0);
    let totalPv = jugador.ejercito.reduce((sum,t)=>sum+t.getPv,0);
    let promedioPv = jugador.ejercito.length ? Math.floor(totalPv/jugador.ejercito.length) : 0;
    alert(`Victorias: ${jugador.getVictorias} | Derrotas: ${jugador.getDerrotas}
Intentos: ${jugador.getIntentosContr} | Recuperación: ${jugador.getRecuperacion}
Total ATK: ${totalAtk} | PV promedio: ${promedioPv}`);
}

//////////////////////////////////////////////////////////////

/////////////////////// MODIFICACIÓN 15 ///////////////////////
// Archivo: index.js
// Explicación: Estadísticas post-juego: porcentaje de victorias y tropa más fuerte
function mostrarEstadisticas(player){
    let total = player.getVictorias + player.getDerrotas;
    let porcentajeVictorias = total ? Math.floor(player.getVictorias/total*100) : 0;
    let tropaFuerte = player.ejercito.reduce((prev, curr) => prev.getAtk > curr.getAtk ? prev : curr, player.ejercito[0]);
    alert(`Porcentaje de victorias: ${porcentajeVictorias}%
Tropa más fuerte: ${tropaFuerte.getNombre} (ATK ${tropaFuerte.getAtk})`);
}

//////////////////////////////////////////////////////////////
/////////////////////// MODIFICACIÓN 16 ///////////////////////
// Archivo: funcionesCombate.js o donde tengas luchar()
// Explicación: Calcular daño normal o crítico con probabilidad
// Cómo usar: Llamar a esta función desde luchar() o desde cualquier ataque

export function calcularDanioConCritico(atk, probCritico=20, multiplicador=1.5){
    // probCritico: % de probabilidad de crítico (por defecto 20%)
    // multiplicador: cuánto aumenta el daño en crítico (por defecto x1.5)
    
    let crit = Math.random() * 100 < probCritico; // true si crítico
    let danio = atk;
    if(crit) danio = Math.floor(atk * multiplicador);
    return {danio, crit}; // devuelve daño real y si fue crítico
}

// Llamar dentro de luchar() cuando calculas daño
export function criticoPorVelocidad(atacante) {
    let prob = Math.min(atacante.velocidad * 5, 50); 
    let crit = Math.random() * 100 < prob;
    return {
        crit,
        dano: crit ? Math.floor(atacante.getAtk * 1.5) : atacante.getAtk
    };
}
// Dentro del constructor de tropa
this.efectos = []; // [{tipo:"sangrado", turnos:3, daño:5}]
export function aplicarEfectos(tropa){
    tropa.efectos = tropa.efectos.filter(ef => {
        tropa.setPv = tropa.getPv - ef.daño;
        ef.turnos--;
        return ef.turnos > 0;
    });
}
export function bonusPorEstado(tropa, danioBase){
    if (tropa.getPv < tropa.vidaMax * 0.3){
        return Math.floor(danioBase * 1.2);
    }
    return danioBase;
}
export function recuperarPasivo(tropa){
    if(tropa.getNombre === "Guerrero") tropa.setPv = tropa.getPv + 5;
    if(tropa.getNombre === "Mago") tropa.habilidadUsada = Math.max(tropa.habilidadUsada - 1, 0);
    if(tropa.getNombre === "Ladrón") tropa.esquiva += 5;
}
export function dañoVerdadero(atk){
    return atk; // no aplica bonus ni defensas
}
// Arcgivo luchar
if(defensor.getNombre === "Guerrero" && defensor.getPv > defensor.vidaMax * 0.5){
    if(Math.random() < 0.25){
        let dano = defensor.getAtk;
        atacante.setPv = atacante.getPv - dano;
        mensaje += `\n${defensor.getNombre} contraataca con ${dano} daño!`;
    }
}
//archivo luchar
if(defensor.getNombre === "Ladrón" && esquivo){
    if(Math.random() < 0.4){
        let dano = defensor.getAtk;
        atacante.setPv = atacante.getPv - dano;
        mensaje += `\n${defensor.getNombre} hace un ataque doble de ${dano}!`;
    }
}
//Escudo
this.escudoArcano = true; // en constructor
//en luchar
if(defensor.getNombre === "Mago" && defensor.escudoArcano){
    if(daño >= defensor.getPv){
        daño = Math.floor(daño / 2);
        defensor.escudoArcano = false;
    }
}
//en funciones varias
export function calcuBonus(atk, def){
    let dif = atk.getPv - def.getPv;

    if(dif > 20) return 1.5;
    if(dif > 0) return 1.2;
    return 1;
}

//MORAL DEL EJERCITO
this.racha = 0; // en constructor
if(ganado){
    player.racha++;
    if(player.racha >= 2){
        player.ejercito.forEach(t => t.setAtk = t.getAtk + 2);
    }
} else player.racha = 0;
//ordenar
player.ejercito.sort((a,b) => b.getPv - a.getPv);
////////////////// MODIFICACIÓN DIFÍCIL 1 ///////////////////
// IA avanzada: el enemigo analiza el ejército del jugador
// y escoge la mejor tropa según el tipo que le da ventaja.
//
// Archivo: index.js
// Uso: Sustituir la selección aleatoria del enemigo
// Explicación: El enemigo escoge la tropa que tenga bonus
//              contra la tropa del jugador.

function elegirMejorTropaEnemiga(enemigo, tropaJugador) {
    let mejores = enemigo.ejercito.filter(t => {
        return calcuBonus(t, tropaJugador) > 1; // tiene ventaja
    });

    if (mejores.length === 0) {
        // Si ninguna tiene ventaja, escoger la más fuerte
        return enemigo.ejercito.sort((a,b)=>b.getAtk - a.getAtk)[0];
    }

    return mejores[0]; // devolver la primera con ventaja
}
/////////////////////////////////////////////////////////////
////////////////// MODIFICACIÓN DIFÍCIL 2 ///////////////////
// Añadir un sistema completo de estados alterados.
//
// Archivo: tropa.js
// Añadir al constructor de la clase tropa

constructor(...) {
    ...
    this.estados = []; 
}

// Añadir función para aplicar efectos por turno
aplicarEstados() {
    this.estados.forEach(e => {
        if (e.tipo === "veneno") this.pv -= e.potencia;
        if (e.tipo === "sangrado") this.pv -= e.potencia;
        if (e.tipo === "paralizado") this.paralizado = true;

        e.turnos--;
    });

    // eliminar estados que ya acabaron
    this.estados = this.estados.filter(e => e.turnos > 0);
}
/////////////////////////////////////////////////////////////
////////////////// MODIFICACIÓN DIFÍCIL 3 ///////////////////
// Sistema de nivel de tropas
// Archivo: tropa.js

constructor(...) {
    ...
    this.nivel = 1;
    this.exp = 0;
}

ganarExp(cantidad) {
    this.exp += cantidad;
    if (this.exp >= 100) {
        this.nivel++;
        this.exp = 0;
        this.pv += 10;
        this.atk += 2;
    }
}
/////////////////////////////////////////////////////////////
////////////////// MODIFICACIÓN DIFÍCIL 4 ///////////////////
// Sistema de inventario del jugador.
// Archivo: jugador.js

constructor() {
    ...
    this.inventario = {
        pocionPV: 2,
        aumentarATK: 1,
        revivir: 1
    };
}

// Método para usar objetos
usarObjeto(tipo, tropa) {
    switch(tipo) {
        case "pocionPV":
            tropa.pv += 30;
            break;
        case "aumentarATK":
            tropa.atk += 5;
            break;
        case "revivir":
            if (tropa.pv <= 0) tropa.pv = tropa.vidaMax / 2;
            break;
    }
    this.inventario[tipo]--;
}
/////////////////////////////////////////////////////////////
////////////////// MODIFICACIÓN DIFÍCIL 5 ///////////////////
// Crítico basado en nivel.
// Archivo: funcionesVarias.js → tipoDeDaño()

let prob = 10 + (tropaAtk.nivel - tropaDef.nivel) * 2;
if (Math.random() * 100 < prob) {
    return { tipo: "critico", daño: dañoAtk * 2 };
}
/////////////////////////////////////////////////////////////
////////////////// MODIFICACIÓN DIFÍCIL 6 ///////////////////
// Sistema de velocidad para decidir turnos.
// Archivo: tropa.js

constructor(...) {
    ...
    this.velocidad = Math.floor(Math.random()*6)+5;
}
/////////////////////////////////////////////////////////////

// Archivo: funcionesVarias.js → luchar()

if (tropa1.velocidad >= tropa2.velocidad) {
    // tropa1 ataca primero
} else {
    // tropa2 ataca primero
}
////////////////// MODIFICACIÓN DIFÍCIL 7 ///////////////////
// Nueva clase Clérigo.
// Archivo: clerigo.js

import { tropa } from "./tropa.js";

export class clerigo extends tropa {
    constructor() {
        super("Clérigo", 50, 150, false, "Normal", 1);
    }

    habilidad(ejercitoAliado) {
        ejercitoAliado.forEach(t => t.pv += Math.floor(t.vidaMax * 0.3));
        return 0;
    }
}
/////////////////////////////////////////////////////////////
////////////////// MODIFICACIÓN DIFÍCIL 8 ///////////////////
// Fatiga por PV bajo.
// Archivo: funcionesVarias.js → luchar()

if (tropa1.getPv < tropa1.vidaMax * 0.35) tropa1.velocidad -= 2;
if (tropa2.getPv < tropa2.vidaMax * 0.35) tropa2.velocidad -= 2;
/////////////////////////////////////////////////////////////
////////////////// MODIFICACIÓN DIFÍCIL 9 ///////////////////
// Afinidades elementales.
// Archivo: tropa.js

constructor(...) {
    ...
    this.elemento = "fuego"; // fuego, hielo, rayo
}

/////////////////////////////////////////////////////////////

// Archivo: funcionesVarias.js

function calcuBonus(a, b) {
    if (a.elemento === "fuego" && b.elemento === "hielo") return 1.5;
    if (a.elemento === "hielo" && b.elemento === "rayo") return 1.5;
    if (a.elemento === "rayo" && b.elemento === "fuego") return 1.5;

    return 1;
}
////////////////// MODIFICACIÓN DIFÍCIL 10 ///////////////////
// Bonus por equipo equilibrado.
// Archivo: index.js

function bonusEquipo(player) {
    let clases = player.ejercito.map(t=>t.getNombre);
    if (clases.includes("Mago") && clases.includes("Guerrero") && clases.includes("Ladrón")) {
        player.ejercito.forEach(t => t.atk += 10);
    }
}
////////////////// MODIFICACIÓN DIFÍCIL 11 ///////////////////
// Sistema de clima.
// Archivo: funcionesVarias.js

let clima = ["sol", "lluvia", "tormenta"][Math.floor(Math.random()*3)];

if (clima === "lluvia") daño *= 0.9;
if (clima === "tormenta") daño *= 1.2;
////////////////// MODIFICACIÓN DIFÍCIL 12 ///////////////////
if (tropaAtk.pv === 1) daño *= 5;
////////////////// MODIFICACIÓN DIFÍCIL 13 ///////////////////
// Archivo: jugador.js

this.racha = 0;

victoria() {
    this.racha++;
    if (this.racha % 3 === 0) {
        this.ejercito.forEach(t => t.atk += 3);
    }
}
////////////////// MODIFICACIÓN DIFÍCIL 14 ///////////////////
// Archivo: hibrido.js

export class hibrido extends tropa {
    constructor() {
        super("Híbrido", 100, 200, false, "Especial", 1);
        this.elemento = "rayo";
    }

    habilidad() {
        return this.getAtk + 20;
    }
}
////////////////// MODIFICACIÓN DIFÍCIL 15 ///////////////////
// Archivo: generarTropas()

if (player.ejercito.filter(t=>t.getNombre==="Mago").length > 2) {
    probLadron += 20;
}
