    class Animal {
        constructor(nombre,tipo) {
            this.nombre = nombre;
            this.tipo = tipo;
            console.log("Ejecutanto constructor");
        }

        sonido(sonido) {
            return `${this.nombre} es un ${this.tipo} y dice: ${sonido}`;
        }

        static despedirse() {
            return "Adios";
        }
    }

    const unGatito = new Animal("Zuri", "gato");
    console.log(unGatito.sonido("MIAUUUU"));

    console.log(Animal.despedirse());

    class TelefonoMovil {

        constructor(CPU,RAM,almacenamiento,ancho,alto, numCamaras) {
            this.CPU = CPU;
            this.RAM = RAM;
            this.almacenamiento = almacenamiento;
            this.ancho = ancho;
            this.alto = alto;
            this.numCamaras = numCamaras;
        }

        // Propiedades Computadas
        // GETTERS
        get numCPU () {
            return this.CPU;
        }

        get numRAM () {
            return this.RAM;
        }

        get numAlmacenamiento () {
            return this.almacenamiento;
        }

        get numAncho () {
            return this.ancho;
        }

        get numAlto () {
            return this.alto;
        }

        get numeroCamaras () {
            return this.numCamaras;
        }

        // SETTERS
        set cambiaCPU (nuevoCPU) {
            this.CPU = nuevoCPU;
        }

        set cambiaRAM (nuevoRAM) {
            this.RAM = nuevoRAM;
        }

        set cambiaAlmacenamiento (nuevoAlmacenamiento) {
            this.almacenamiento = nuevoAlmacenamiento;
        }

        set cambiaAncho (nuevoAncho) {
            this.ancho = nuevoAncho;
        }

        set cambiaAlto (nuevoAlto) {
            this.alto = nuevoAlto;
        }

        set cambiaCamaras (nuevaCamara) {
            this.numCamaras = nuevaCamara;
        }

        toString () {
            return `Este telefono movil tiene:\nCPU:${this.CPU}\nRAM:${this.RAM}\nAlmacenamiento:${this.almacenamiento}\nAncho:${this.ancho}\nAlto:${this.alto}\nNumero de Camaras:${this.numCamaras}`;
        }
}

    let telefono1 = new TelefonoMovil(12,5,250,25,30,4);
    console.log(telefono1.toString());

    console.log(`Numero de Almacenamiento: ${telefono1.numAlmacenamiento}`);
    telefono1.cambiaAncho = 56;
    console.log(`Cambio el Ancho:${telefono1.numAncho}`);

    let telefono2 = new TelefonoMovil(20,25,1224,50,55,5);
    console.log(telefono2.toString());

    let telefono3 = new TelefonoMovil(39,34,100,23,23,1);
    console.log(telefono3.toString());

    let telefono4 = new TelefonoMovil(200,250,1223,504,550,2);
    console.log(telefono4.toString());

