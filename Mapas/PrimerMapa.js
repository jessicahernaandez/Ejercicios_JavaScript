let mapa = new Map([['id1', 'nombre1'], ['id2', 'nombre2'], ['id3', 'nombre2']]);
console.log(mapa);

for(let [clave,valor] of mapa) {
    console.log(`La clave es ${clave} y el valor es ${valor}`);
}

//Metodo keys
//Metodo values

for(let clave of mapa.keys()) {
    console.log(`El valor es ${clave}`);
}

//Encadenar con los sets
mapa.set('id1', 'Jessica').set('id4', 'Andrea');

//Para saber si existe -> Has

//Para borrar elementos -> delete(), para borrar un elemento lo haces por medio de la clave.

//Para borrarlo todo con clear().

//Con get() podemos conseguir el valor asociado a una clave, pasandole como parrametro la clave.

