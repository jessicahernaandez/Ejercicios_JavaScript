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

export {TelefonoMovil}; 