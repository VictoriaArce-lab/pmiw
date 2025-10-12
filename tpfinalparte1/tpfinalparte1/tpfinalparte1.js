let estadoActual = 0; 
let historia;
let imagenes = [];
let musicaFondo;
let musicaIniciada = false;
let lineasHistoria;

function preload() {
  lineasHistoria = loadStrings("data/historia.txt")
    for (let i = 0; i <= 18; i++) {
       imagenes[0] = loadImage(`data/imagen_0.png`);
       imagenes[1] = loadImage(`data/imagen_1.png`);
       imagenes[2] = loadImage(`data/imagen_2.png`);
       imagenes[3] = loadImage(`data/imagen_3.png`);
       imagenes[4] = loadImage(`data/imagen_4.png`);
       imagenes[5] = loadImage(`data/imagen_5.png`);
       imagenes[6] = loadImage(`data/imagen_6.png`);
       imagenes[7] = loadImage(`data/imagen_6.png`);
       imagenes[8] = loadImage(`data/imagen_8.png`);
       imagenes[9] = loadImage(`data/imagen_9.png`);
       imagenes[10] = loadImage(`data/imagen_10.png`);
       imagenes[11] = loadImage(`data/imagen_12.png`); 
       imagenes[12] = loadImage(`data/imagen_13.png`); 
       imagenes[13] = loadImage(`data/imagen_14.png`);
       imagenes[14] = loadImage(`data/imagen_15.png`);
       imagenes[15] = loadImage(`data/imagen_13.png`); 
       imagenes[16] = loadImage(`data/imagen_17.png`); 
       imagenes[17] = loadImage(`data/imagen_18.png`); 
       imagenes[18] = loadImage(`data/imagen_0.png`); 
    }

    musicaFondo = loadSound('data/musicaFondo.mp3');
}

function setup() {
    createCanvas(640, 480);
    crearHistoria();
    musicaFondo.setLoop(true);
}

function draw() {
    let escenaActual = historia.find(escena => escena.id === estadoActual);

    if (escenaActual) {
        dibujarImagen(escenaActual);
        dibujarTexto(escenaActual);
        dibujarOpciones(escenaActual);
    } else {
        background(10, 25, 47);
        fill(255, 0, 0);
        textAlign(CENTER, CENTER);
        textSize(24);
        text("Error: Estado de historia no encontrado (ID: " + estadoActual + ")", width / 2, height / 2);
    }
}

function mousePressed() {
  if(!musicaIniciada){
    if (musicaFondo.isLoaded() && !musicaFondo.isPlaying()){
      musicaFondo.loop();
      musicaIniciada = true;
    }
  }
    let escenaActual = historia.find(escena => escena.id === estadoActual);
    if (!escenaActual || !escenaActual.opciones) return; 

    let numOpciones = escenaActual.opciones.length; 
    for (let i = 0; i < numOpciones; i++) {
        let opcion = escenaActual.opciones[i];
        let botonAncho = 300;
        let botonAlto = 40;
        let espacioEntreBotones = 50;
        let x = width / 2 - botonAncho / 2;
        let y = 380 + i * espacioEntreBotones;

        if (mouseX > x && mouseX < x + botonAncho && mouseY > y && mouseY < y + botonAlto) {
            estadoActual = opcion.siguienteEstado;
              break; 
        }
    }
}
function dibujarImagen(escena) {
    if (imagenes[escena.id] && imagenes[escena.id].width > 0) { 
        image(imagenes[escena.id], 0, 0, width, height);
    } else {
        background(10, 25, 47);
        noStroke();
        fill(150);
        textAlign(CENTER, CENTER);
        textSize(16);
    }
}

function dibujarTexto(escena) {
    noStroke();
    fill(0, 0, 0, 170); 
    rect(40, 250, width - 80, 93, 10);
    fill(230);
    textAlign(CENTER, TOP);
    textSize(18);
    text(escena.texto, 60, 260, width - 120, 120);
}

function dibujarOpciones(escena) {
    if (!escena.opciones) return;

    let numOpciones = escena.opciones.length;
    
    for (let i = 0; i < numOpciones; i++) {
        let opcion = escena.opciones[i];
        
        let botonAncho = 300;
        let botonAlto = 40;
        let espacioEntreBotones = 50;
        let x = width / 2 - botonAncho / 2;
        let y = 380 + i * espacioEntreBotones;
        
        //efecto hover
        if (mouseX > x && mouseX < x + botonAncho && mouseY > y && mouseY < y + botonAlto) {
            fill(150, 120, 80);
        } else {
            fill(100, 80, 50); 
        }
        
        stroke(200, 160, 100);
        strokeWeight(1);
        rect(x, y, botonAncho, botonAlto, 10);
        
        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(16);
        text(opcion.textoOpcion, x + botonAncho / 2, y + botonAlto / 2);
    }
}

function crearHistoria() {
    historia = []; 
    let escenaActual = null; 

    for (let i = 0; i < lineasHistoria.length; i++) {
        let linea = lineasHistoria[i].trim(); 

        if (linea === "") continue; 

        if (linea === '---') {
            if (escenaActual) {
                historia.push(escenaActual);
            }
            escenaActual = null;
            continue;
        }

        let partes = linea.split('|'); 

        if (escenaActual === null) {
            escenaActual = {
                id: parseInt(partes[0]),
                texto: partes[1],
                opciones: []
            };
        } else {
            escenaActual.opciones.push({
                textoOpcion: partes[0],
                siguienteEstado: parseInt(partes[1]) 
            });
        }
    }

    if (escenaActual) {
        historia.push(escenaActual);
    }
}
