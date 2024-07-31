// Clase que representa una carta con dos atributos: número y palo
class Carta {
    constructor(numero, palo) {
        this.numero = numero;
        this.palo = palo;
    }

    // Método que retorna una representación en texto de la carta
    toString() {
        return `${this.numero} de ${this.palo}`;
    }
}

// Clase que genera cartas de una baraja de póker
class GeneradorCarta {
    constructor() {
        this.numBarajaDePoker = [
            "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "As"
        ];
        this.palos = ['trébol', 'diamante', 'picas', 'corazones'];
        this.cartasUsadas = new Set();
    }

    // Genera un número aleatorio entre el total de números disponibles en la baraja
    generarNumeroAleatorio() {
        const indiceAleatorio = Math.floor(Math.random() * this.numBarajaDePoker.length);
        return this.numBarajaDePoker[indiceAleatorio];
    }

    // Elige un palo aleatorio entre los disponibles
    elegirPaloAleatorio() {
        const indiceAleatorio = Math.floor(Math.random() * this.palos.length);
        return this.palos[indiceAleatorio];
    }

    // Genera una nueva carta asegurándose de que no haya sido generada previamente
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


// Clase que representa un jugador con un nombre y una colección de cartas
class Jugador {
    // Agregar cartas como parámetro opcional
    constructor(nombre, cartas = []) {
        this.nombre = nombre;
        this.cartas = cartas;
    }

    // Método para que el jugador reciba una carta y la agregue a su colección
    recibirCarta(carta) {
        this.cartas.push(carta);
    }

    // Muestra las cartas del jugador en formato de texto
    mostrarCartas() {
        return this.cartas.map(carta => carta.toString()).join(', ');
    }

    // Retorna las cartas del jugador
    obtenerCartas() {
        return this.cartas;
    }

    /*
    !IMPLEMENTAR LOS METODOS CHECK, CALL, BET, RAISE, FOLD, Y LEVANTARSE DE LA MESA
    */
}

/*
? Con esta modificación, ahora puedes crear instancias de Jugador con cartas específicas, por ejemplo:
! let jugador = new Jugador('John', [new Carta('As', 'picas'), new Carta('K', 'corazones')]);

*/

// Clase que representa una mano de póker, gestionando jugadores y el reparto de cartas
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
        let mejorMano = [];
    }

    // Crea jugadores con las posiciones definidas
    crearJugadores() {
        return Object.keys(this.posiciones).map(pos => new Jugador(pos));
    }

    // Reparte dos cartas a cada jugador
    repartirCartasAJugadores() {
        for (let jugador of this.jugadores) {
            jugador.recibirCarta(this.generador.generarCarta());
            jugador.recibirCarta(this.generador.generarCarta());
        }
    }

    // Genera las tres cartas del flop
    generarFlop() {
        let flop = [];
        for (let i = 0; i < 3; i++) {
            flop.push(this.generador.generarCarta());
        }
        return flop;
    }

    // Genera la carta del turn
    generarTurn() {
        return this.generador.generarCarta();
    }

    // Genera la carta del river
    generarRiver() {
        return this.generador.generarCarta();
    }

    // Genera el tablero completo y reparte las cartas a los jugadores
    generarBoard() {
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

    // Función para determinar el dealer
    determinarDealer() {
        // Generar una nueva carta para cada jugador
        let cartasParaDeterminarDealer = this.jugadores.map(jugador => {
            const carta = this.generador.generarCarta();
            return { jugador: jugador.nombre, carta: carta };
        });

        // Crear una variable para almacenar la carta más alta
        let cartaMasAlta = { jugador: null, carta: null };

        // Convertir valores de carta a índice para comparación
        const valoresCarta = {
            "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
            "J": 11, "Q": 12, "K": 13, "As": 14
        };

        // Iterar sobre el array y devolver el índice más alto de todas las cartas generadas
        cartasParaDeterminarDealer.forEach(({ jugador, carta }) => {
            const valorCarta = valoresCarta[carta.numero];
            if (!cartaMasAlta.carta || valorCarta > valoresCarta[cartaMasAlta.carta.numero]) {
                cartaMasAlta = { jugador, carta };
            }
        });

        // Mostrar las cartas de los jugadores para determinar el dealer
        cartasParaDeterminarDealer.forEach(({ jugador, carta }) => {
            console.log(`${jugador}: ${carta.toString()}`);
        });

        // Mostrar el dealer determinado
        console.log(`Dealer: ${cartaMasAlta.jugador} con ${cartaMasAlta.carta.toString()}`);
        
        return cartaMasAlta.jugador;
    }
}

// Función para mostrar las cartas de los jugadores y el tablero en formato de texto
function mostrarMano(mano) {
    const flop = mano.flop.map(carta => carta.toString()).join(', ');
    const turn = mano.turn.toString();
    const river = mano.river.toString();
    const jugadores = mano.jugadores.map(jugador => `${jugador.posicion}: ${jugador.cartas.map(carta => carta.toString()).join(', ')}`).join('\n');
    return `Jugadores:\n${jugadores}\n\nFlop: ${flop}\nTurn: ${turn}\nRiver: ${river}`;
}

// Función para generar manos de póker y mostrar las combinaciones de cartas para cada jugador y el tablero
function generarMano(numEjemplos) {
    let manos = [];
    for (let i = 0; i < numEjemplos; i++) {
        let mano = new Mano();
        const manoGenerada = mano.generarBoard();
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



let manox = generarMano(1);
console.log(manox);


























// Uso de generarMano para generar y mostrar en consola las combinaciones de cartas para una mano
/*
let ejemplos = generarMano(1);
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
*/