//https://youtu.be/Ayk7-7OM6Rk

const columnas = 6;
const filas = 6;
const tamañoCeldas = 80;
const cantidadBombas = 5; 

let cuadricula; 
let gestorDeJuego; 
let botonReiniciar; 

let imgPeligro, imgMarcador, imgMoneda; // Añadimos imgMoneda
let sonidoAgua, sonidoNaufragio, sonidoTesoro;


function preload() {
  imgPeligro = loadImage('data/craneo.png'); 
  imgMarcador = loadImage('data/cruz.png'); 
  imgMoneda = loadImage('data/monedaoro.png');
  soundFormats('mp3', 'wav');
  sonidoAgua = loadSound('data/click.mp3');
  sonidoNaufragio = loadSound('data/hundido.mp3');
  sonidoTesoro = loadSound('data/win31.mp3');
}

function setup() {
  createCanvas(columnas * tamañoCeldas, filas * tamañoCeldas + 80);
  
  textAlign(CENTER, CENTER);
  textSize(16);

  sonidoAgua.setVolume(0.5);
  sonidoNaufragio.setVolume(0.4);
  sonidoTesoro.setVolume(0.6);

  gestorDeJuego = new GestorDeJuego();

  let btnX = width / 2 - 60;
  let btnY = height - 60;
  botonReiniciar = new Boton(btnX, btnY, 120, 40, "Nueva Travesía", reiniciarJuego);
}

function draw() {
  background(20, 40, 80); 

  gestorDeJuego.dibujar();

  if (gestorDeJuego.estado === "playing") {
    cuadricula.dibujar();
  }
}

function mousePressed() {
  gestorDeJuego.manejarMousePresionado(mouseX, mouseY);

  if (gestorDeJuego.estado === "playing") {
    if (cuadricula) {
      let i = floor(mouseX / tamañoCeldas);
      let j = floor(mouseY / tamañoCeldas);

      if (i >= 0 && i < columnas && j >= 0 && j < filas) {
        
        if (mouseButton === LEFT) {
          let seguro = cuadricula.revelar(i, j);
          
          if (!seguro) {
            gestorDeJuego.estado = "lose";
            sonidoNaufragio.play(); 
            cuadricula.revelarTodo(); 
          } else {
            if (cuadricula.arregloCuadricula[i][j].estaRevelada) {
               sonidoAgua.play(); 
            }
          }
          
        } else if (mouseButton === RIGHT) {
          cuadricula.marcar(i, j);
        }
      }
    }
  }

  if (cuadricula && gestorDeJuego.estado === "playing" && cuadricula.comprobarVictoria()) {
    gestorDeJuego.estado = "win";
    sonidoTesoro.play();
  }

  return false;
}

function reiniciarJuego() {
  cuadricula = new Cuadricula(columnas, filas, cantidadBombas);
  gestorDeJuego.estado = "playing";
}
