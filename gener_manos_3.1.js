class Carta {
    constructor(numero, palo) {
        this.numero = numero;
        this.palo = palo;
    }

    toString() {
        return `${this.numero} de ${this.palo}`;
    }
}

class GeneradorCarta {
    constructor() {
        this.numBarajaDePoker = [
            "As", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
        ];
        this.palos = ['trébol', 'diamante', 'picas', 'corazones'];
        this.cartasUsadas = new Set();
    }

    generarNumeroAleatorio() {
        const indiceAleatorio = Math.floor(Math.random() * this.numBarajaDePoker.length);
        return this.numBarajaDePoker[indiceAleatorio];
    }

    elegirPaloAleatorio() {
        const indiceAleatorio = Math.floor(Math.random() * this.palos.length);
        return this.palos[indiceAleatorio];
    }

    generarCarta() {
        let nuevaCarta;
        do {
            const numero = this.generarNumeroAleatorio();
            const palo = this.elegirPaloAleatorio();
            nuevaCarta = new Carta(numero, palo);
        } while (this.cartasUsadas.has(nuevaCarta.toString()));

        this.cartasUsadas.add(nuevaCarta.toString());
        return nuevaCarta;
    }
}

class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.cartas = [];
    }

    recibirCarta(carta) {
        this.cartas.push(carta);
    }

    mostrarCartas() {
        return this.cartas.map(carta => carta.toString()).join(', ');
    }

    obtenerCartas() {
        return this.cartas;
    }
}

class Mano {
    constructor() {
        this.generador = new GeneradorCarta();
        this.posiciones = {
            BU: "Button",
            SB: "Small Blind",
            BB: "Big Blind",
            UTG: "Under the Gun",
            MP: "Middle Position",
            CO: "Cutoff"
        };
        this.jugadores = this.crearJugadores();
    }

    crearJugadores() {
        return Object.keys(this.posiciones).map(pos => new Jugador(pos));
    }

    repartirCartasAJugadores() {
        for (let jugador of this.jugadores) {
            jugador.recibirCarta(this.generador.generarCarta());
            jugador.recibirCarta(this.generador.generarCarta());
        }
    }

    generarFlop() {
        let flop = [];
        for (let i = 0; i < 3; i++) {
            flop.push(this.generador.generarCarta());
        }
        return flop;
    }

    generarTurn() {
        return this.generador.generarCarta();
    }

    generarRiver() {
        return this.generador.generarCarta();
    }

    generarMano() {
        this.repartirCartasAJugadores();
        const flop = this.generarFlop();
        const turn = this.generarTurn();
        const river = this.generarRiver();
        return {
            jugadores: this.jugadores.map(jugador => ({
                posicion: jugador.nombre,
                cartas: jugador.obtenerCartas()
            })),
            flop,
            turn,
            river
        };
    }
}

function mostrarMano(mano) {
    const flop = mano.flop.map(carta => carta.toString()).join(', ');
    const turn = mano.turn.toString();
    const river = mano.river.toString();
    const jugadores = mano.jugadores.map(jugador => `${jugador.posicion}: ${jugador.cartas.map(carta => carta.toString()).join(', ')}`).join('\n');
    return `Jugadores:\n${jugadores}\n\nFlop: ${flop}\nTurn: ${turn}\nRiver: ${river}`;
}

// Generar las manos y combinaciones
function generarCombinacionesDeCartas(numEjemplos) {
    let manos = [];
    for (let i = 0; i < numEjemplos; i++) {
        let mano = new Mano();
        const manoGenerada = mano.generarMano();
        let combinaciones = {};
        
        manoGenerada.jugadores.forEach(jugador => {
            combinaciones[jugador.posicion] = [
                ...jugador.cartas,
                ...manoGenerada.flop,
                manoGenerada.turn,
                manoGenerada.river
            ];
        });
        
        combinaciones['vacio'] = [];
        manos.push(combinaciones);
    }
    return manos;
}

// Uso de generarCombinacionesDeCartas para generar y mostrar en consola las combinaciones
let ejemplos = generarCombinacionesDeCartas();
ejemplos.forEach((combinaciones, index) => {
    console.log(`Mano ${index + 1}:`);
    for (const [posicion, cartas] of Object.entries(combinaciones)) {
        if (cartas.length === 0) {
            console.log(`${posicion}: Vacío`);
        } else {
            console.log(`${posicion}: ${cartas.map(carta => carta.toString()).join(', ')}`);
        }
    }
    console.log('\n');
});

console.log(generarCombinacionesDeCartas(1));