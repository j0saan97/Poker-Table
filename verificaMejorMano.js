function verificaRoyalStraightFlush(mano) {
    let royalStraightFlush = false;

    // Valores y palos necesarios para una Royal Straight Flush
    const valoresNecesarios = ["10", "J", "Q", "K", "As"];
    const palosNecesarios = new Set();

    // Contar las cartas que coinciden con los valores necesarios y almacenar sus palos
    mano.forEach(carta => {
        if (valoresNecesarios.includes(carta.numero)) {
            palosNecesarios.add(carta.palo);
        }
    });

    // Verificar que todas las cartas necesarias están presentes y son del mismo palo
    if (palosNecesarios.size === 1 && valoresNecesarios.every(valor => mano.some(carta => carta.numero === valor))) {
        royalStraightFlush = true;
    }

    return royalStraightFlush;
}


function verificaStraightFlush(){
    let straightFlush = false;
    //si hay 5 elementos correlativos (con el indice seguido Ej. 7,8,9,10,J) y estos 5 elementos tienen el mismo palo --> straighFlush = True;
}

function verificaPoker(mano) {
    let poker = false;

    // Contar la frecuencia de cada valor de carta
    const frecuenciaValores = mano.reduce((acc, carta) => {
        acc[carta.numero] = (acc[carta.numero] || 0) + 1;
        return acc;
    }, {});

    // Verificar si algún valor aparece exactamente 4 veces
    for (let valor in frecuenciaValores) {
        if (frecuenciaValores[valor] === 4) {
            poker = true;
            break;
        }
    }

    return poker;
}

// VERIFICAMOS QUE FUNCIONA
const mano = [
    new Carta('10', 'trébol'),
    new Carta('10', 'diamante'),
    new Carta('10', 'picas'),
    new Carta('10', 'corazones'),
    new Carta('2', 'trébol')
];

console.log(verificaPoker(mano)); // true


function verificaFullHouse(mano) {
    let fullHouse = false;

    // Contar la frecuencia de cada valor de carta
    const frecuenciaValores = mano.reduce((acc, carta) => {
        acc[carta.numero] = (acc[carta.numero] || 0) + 1;
        return acc;
    }, {});

    // Contar cuántos valores tienen una frecuencia de 3 y cuántos tienen una frecuencia de 2
    let tieneTrio = false;
    let tienePareja = false;

    for (let valor in frecuenciaValores) {
        if (frecuenciaValores[valor] === 3) {
            tieneTrio = true;
        } else if (frecuenciaValores[valor] === 2) {
            tienePareja = true;
        }
    }

    // Verificar si hay un trío y una pareja
    if (tieneTrio && tienePareja) {
        fullHouse = true;
    }

    return fullHouse;
}


function verificaStraight(mano) {
    let straight = false;

    // Valores en orden para comparación

    const ordenValores = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "As"];
    const valoresCarta = mano.map(carta => carta.numero);

    // Convertir los valores a índices en la lista ordenada
    const indices = valoresCarta
        .map(valor => ordenValores.indexOf(valor))
        .filter(indice => indice !== -1); // Filtrar valores no válidos (en caso de errores en la entrada)

    // Eliminar duplicados y ordenar los índices
    const indicesUnicos = [...new Set(indices)].sort((a, b) => a - b);

    // Verificar secuencias consecutivas de 5 cartas
    for (let i = 0; i <= indicesUnicos.length - 5; i++) {
        const subsecuencia = indicesUnicos.slice(i, i + 5);
        if (subsecuencia.every((val, idx, arr) => idx === 0 || val === arr[idx - 1] + 1)) {
            straight = true;
            break;
        }
    }

    // Considerar el caso especial: As-2-3-4-5
    if (!straight) {
        // As como el valor más bajo en la secuencia (2, 3, 4, 5, As)
        const indicesConAs = indicesUnicos.concat(ordenValores.indexOf("As"));
        const subsecuenciaConAs = indicesConAs.sort((a, b) => a - b);

        for (let i = 0; i <= subsecuenciaConAs.length - 5; i++) {
            const subsecuencia = subsecuenciaConAs.slice(i, i + 5);
            if (subsecuencia.join() === [0, 1, 2, 3, 4].join()) {
                straight = true;
                break;
            }
        }
    }

    return straight;
}


function verificaTrio(mano) {
    let trio = false;

    // Contar la frecuencia de cada valor de carta
    const frecuenciaValores = mano.reduce((acc, carta) => {
        acc[carta.numero] = (acc[carta.numero] || 0) + 1;
        return acc;
    }, {});

    // Verificar si algún valor aparece exactamente 3 veces
    for (let valor in frecuenciaValores) {
        if (frecuenciaValores[valor] === 3) {
            trio = true;
            break;
        }
    }

    return trio;
}


function verificaTwoPair(mano) {
    let twoPair = false;

    // Contar la frecuencia de cada valor de carta
    const frecuenciaValores = mano.reduce((acc, carta) => {
        acc[carta.numero] = (acc[carta.numero] || 0) + 1;
        return acc;
    }, {});

    // Contar cuántos valores tienen una frecuencia de 2
    let pares = 0;

    for (let valor in frecuenciaValores) {
        if (frecuenciaValores[valor] === 2) {
            pares++;
        }
    }

    // Verificar si hay exactamente dos pares
    if (pares === 2) {
        twoPair = true;
    }

    return twoPair;
}

function verificaPair(mano) {
    let pair = false;

    // Contar la frecuencia de cada valor de carta
    const frecuenciaValores = mano.reduce((acc, carta) => {
        acc[carta.numero] = (acc[carta.numero] || 0) + 1;
        return acc;
    }, {});

    // Contar cuántos valores tienen una frecuencia de 2
    let pares = 0;

    for (let valor in frecuenciaValores) {
        if (frecuenciaValores[valor] === 2) {
            pares++;
        }
    }

    // Verificar si hay exactamente un par
    if (pares === 1) {
        pair = true;
    }

    return pair;
}


function cartaAlta(){
    // Determina la carta mas alta de las cartas pasadas como argumento (será la que tenga mayor índice)
}

