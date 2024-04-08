APP GENERADOR BOARDS TEXAS  HOLDEM:

Objetivo --> Crear una función que genere boards aleatorios de 5 cartas cada una con un num y un palo, y reparta 2 cartas aleatorias a cada jugador donde:
–	Una carta no se puede repetir en numero y palo
–	La función genere un flop y sólo cuando nosotros hagamos clic en un botón, genere el turn y sólo cuando hagamos clic de nuevo genere el river.

La  función sólo generará el flop, y seremos nosotros los que, haciendo clic generemos el turn y volviendo a hacer clic generaremos el river.

Consideraciones:
- para generar un turn tiene que haber un flop, y para generar un river tiene que haber un flop y turn.
- La idea clave es q podamos cambiar la carta que ha salido en la ultima calle para poder abordar diferentes opciones de juego.

Función que genere turn y river si todos los jugadores pasan o apuestan y hacen call
