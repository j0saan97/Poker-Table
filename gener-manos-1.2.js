

class Carta {
    constructor(numero, palo) {
        this.numero = numero;
        this.palo = palo;
    }
}

/* Clase GeneradorCarta: Encapsula la lógica para generar números y palos aleatorios,
 así como para generar cartas asegurando que no se repitan consecutivamente. */
class GeneradorCarta {
    constructor() {
        this.ultimaCarta = null;
        this.numBarajaDePoker = [
            "As", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
        ];
    }

    generarNumeroAleatorio() {
        const numBarajaDePoker = [
            "As", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
        ];
        //return Math.floor(Math.random() * numBarajaDePoker.length);
        const indiceAleatorio = Math.floor(Math.random() * this.numBarajaDePoker.length);
        return this.numBarajaDePoker[indiceAleatorio];
    }

    

    elegirPaloAleatorio() {
        const palos = ['trébol', 'diamante', 'picas', 'corazones'];
        const indiceAleatorio = Math.floor(Math.random() * palos.length);
        return palos[indiceAleatorio];
    }

    generarCarta() {
        const nuevaCarta = new Carta(this.generarNumeroAleatorio(), this.elegirPaloAleatorio());

        if (this.ultimaCarta !== null && nuevaCarta.numero === this.ultimaCarta.numero && nuevaCarta.palo === this.ultimaCarta.palo) {
            return this.generarCarta(); // Si las cartas son iguales, genera una nueva.
        } else {
            this.ultimaCarta = nuevaCarta; // Actualiza la última carta generada.
            return nuevaCarta; // Devuelve la nueva carta.
        }
    }
}

/* Clase Mano: Utiliza una instancia de GeneradorCarta para crear una mano de cartas 
que incluye el flop, el turno y el river. */
class Mano {
    constructor() {
        this.generador = new GeneradorCarta();
    }

    // Función para generar el flop (tres cartas)
    generarFlop() {
        let flop = [];
        for (let i = 0; i < 3; i++) {
            flop.push(this.generador.generarCarta());
        }
        return flop;
    }

    // Función para generar el turn (una carta)
    generarTurn() {
        return this.generador.generarCarta();
    }

    // Función para generar el river (una carta)
    generarRiver() {
        return this.generador.generarCarta();
    }

    // Función para generar la mano completa
    generarMano() {
        const flop = this.generarFlop();
        const turn = this.generarTurn();
        const river = this.generarRiver();

        return { flop, turn, river };
    }
}

/* Función testHand(numEjemplos): Genera varias manos de cartas, 
según el número especificado, utilizando las clases definidas. */

function testHand(numEjemplos) {
    // Genera y muestra en consola numEjemplos manos de cartas.
    let manos = [];
    for (let i = 0; i < numEjemplos; i++) {
        let mano = new Mano();
        manos.push(mano.generarMano());
    }
    return manos;
}

// Uso de testHand para generar y mostrar en consola las manos de cartas.
let ejemplos = testHand(7);
console.log(ejemplos);

// Función para generar un número aleatorio y mostrar el valor correspondiente de la baraja de poker
function testNumBaraja(numEjemplos) {
    const numBarajaDePoker = [
        "As", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
    ];

    for (let i = 0; i < numEjemplos; i++) {
        const numeroAleatorio = Math.floor(Math.random() * numBarajaDePoker.length);
        console.log(numBarajaDePoker[numeroAleatorio]);
    }
}

// Uso de la función testNumBaraja para generar y mostrar en consola números de la baraja de poker
testNumBaraja(10);


/*

class mesa {
    constructor() {
        this.generador = new GeneradorMesa();
    }
}
    /* PROPIEDADES que debe tener: numJugadores, stake, ante, pozo,

            numJugadores: el num d jugadores que hay en la mesa en un momento dado( cada mesa tiene un minimo y un máximo)
                - mínJugadores.: el mínimo de jugadores necesario para que la mesa esté abierta.
                - máxJugadores: el máximo de jugadores que puede haber en una mesa

            stake: tiene un minimo y un máximo ( no se puede entrar con menos del mínimo ni más del máximo). 
                    ej: NL2 el ante es el 7% del pozo, en NL20 es el 5% del pozo..

            apuestas totales: es el total de bb o dinero +  antes en una mano

            ANTE: % del pozo que la casa gana en cada mano
                NL2 = ante = 7
                NL10 = ante = 6
                NL20 = ante = 5

            pozo: es el dinero total en bb o dinero real (cada bb tiene su asignación en dinero real segun el stake)
            la formula pa calcularlo es = ante + apuestasTotales

            ej instancia mesa: new mesa = NL20 (numJugadores, stake, ante, pozo)
                new mesa = NL20(5, 20, ante, pozo)


            class jugador(){
            
                propiedades: 
                    - banca ( es el dinero total que tiene para jugar en su cuenta)
                    - bancaEnMesa (el dinero con el que el jugador ha entrado en una mesa)
                    - 2 cartas

                metodos: 
                    - apostar
                    - checkear
                    - foldea

                    - entrarEnMesa
                    - salirDeMesa
                    - ausentarse

            
            }*/