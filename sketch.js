const celdas = []; // 4x4
const RETICULA = 8

const azulejos = [];
const NA = 11; //numero de azulejos

const reglas = [
  //reglas de los bordes de cada azulejo
  {
    //tile 0
    UP: 0,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 1,
  },
  {
    //tile 1
    UP: 1,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 1,
  },
  {
    //tile 2
    UP: 1,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 1,
  },
  {
    //tile 3
    UP: 1,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 0,
  },
  {
    //tile 4
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },
  {
    //tile 5
    UP: 1,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 1,
  },
  {
    //tile 6
    UP: 0,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 0,
  },
  {
    //tile 7
    UP: 0,
    RIGHT: 0,
    DOWN: 1,
    LEFT: 1,
  },
  {
    //tile 8
    UP: 1,
    RIGHT: 0,
    DOWN: 0,
    LEFT: 1,
  },
  {
    //tile 9
    UP: 0,
    RIGHT: 1,
    DOWN: 1,
    LEFT: 0,
  },
  {
    //tile 10
    UP: 1,
    RIGHT: 1,
    DOWN: 0,
    LEFT: 0,
  },

]

let ancho //ancho de celda
let alto //alto de celda


function preload() {
  for (let i = 0; i < NA; i++) {
    azulejos[i] = loadImage(`tiles/tile${i}.png`);
  }

}

function setup() {

  createCanvas(1080, 1080);

  ancho = width / RETICULA;
  alto = height / RETICULA;

  let opcionesI = []
  for (let i = 0; i < azulejos.length; i++) {
    opcionesI.push(i);
  }

  for (let i = 0; i < RETICULA * RETICULA; i++) {
    celdas[i] = {
      colapsada: false,
      opciones: opcionesI,
    };
  }


}

function draw() {
  // background(111);



  const celdasDisponibles = celdas.filter((celda) => {
    return celda.colapsada == false;
  });

  if (celdasDisponibles.length > 0) {
    celdasDisponibles.sort((a, b) => {
      return a.opciones.length - b.opciones.length;
    });

    const celdasPorColapsar = celdasDisponibles.filter((celda) => {
      return celda.opciones.length == celdasDisponibles[0].opciones.length

    });


    const celdaSeleccionada = random(celdasPorColapsar);
    celdaSeleccionada.colapsada = true;


    const opcionSelec = random(celdaSeleccionada.opciones);
    celdaSeleccionada.opciones = [opcionSelec]

    // print(celdaSeleccionada);


    for (let x = 0; x < RETICULA; x++) {
      for (let y = 0; y < RETICULA; y++) {
        const celdaIndex = x + y * RETICULA;
        const celdaActual = celdas[celdaIndex];
        if (celdaActual.colapsada) {
          const indiceDeAzulejo = celdaActual.opciones[0];
          const reglasActuales = reglas[indiceDeAzulejo];
          print(reglasActuales);
          image(
            azulejos[indiceDeAzulejo], x * ancho, y * alto, ancho, alto);

          //monitorear UP
          if (y > 0) {
            const indiceUp = x + (y - 1) * RETICULA;
            const celdaUp = celdas[indiceUp];
            if (!celdaUp.colapsada) {

              controlentropia(celdaUp, reglasActuales['UP'], 'DOWN')
            }
          }

          //monitorear right
          if (x < RETICULA - 1) {
            const indiceRight = x + 1 + y * RETICULA;
            const celdaRight = celdas[indiceRight];
            if (!celdaRight.colapsada) {
              controlentropia(celdaRight, reglasActuales['RIGHT'], 'LEFT')
            }
          }

          //monitorear down
          if (y < RETICULA - 1) {
            const indiceDown = x + (y + 1) * RETICULA;
            const celdaDown = celdas[indiceDown];
            if (!celdaDown.colapsada) {
              controlentropia(celdaDown, reglasActuales['DOWN'], 'UP');
            }
          }

          //monitorear left
          if (x > 0) {
            const indiceLeft = x - 1 + y * RETICULA;
            const celdaLeft = celdas[indiceLeft];
            if (!celdaLeft.colapsada) {
              controlentropia(celdaLeft, reglasActuales['LEFT'], 'RIGHT');
            }
          }
        }
        else {
          strokeWeight(1);
          rect(x * ancho, y * alto, ancho, alto);
        }
      }
    }
    // noLoop();


    // activa esto para hacer el loop
  }
  // else {
  //   let opcionesI = []
  //   for (let i = 0; i < azulejos.length; i++) {
  //     opcionesI.push(i);
  //   }

  //   for (let i = 0; i < RETICULA * RETICULA; i++) {
  //     celdas[i] = {
  //       colapsada: false,
  //       opciones: opcionesI,
  //     };
  //   }
  // }
}

function controlentropia(_celda, _regla, _opuesto) {
  const nuevasOpciones = []
  for (let i = 0; i < _celda.opciones.length; i++) {
    if (
      _regla ==
      reglas[_celda.opciones[i]][_opuesto]
    ) {
      const celdaCompatible = _celda.opciones[i];
      nuevasOpciones.push(celdaCompatible);
    }
  }
  _celda.opciones = nuevasOpciones;
  print(nuevasOpciones);
}