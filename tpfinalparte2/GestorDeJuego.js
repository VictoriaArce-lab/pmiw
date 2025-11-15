class GestorDeJuego {

  constructor() {
    this.estado = "menu";
  }

  dibujar() {
    fill(255); 
    noStroke();
    textSize(24);
    text("LA AVENTURA DE SIMBAD", width / 2, height - 60);

    if (this.estado === "menu") {
      this.dibujarMenu();
    } else if (this.estado === "win") {
      this.dibujarPantallaVictoria();
    } else if (this.estado === "lose") {
      this.dibujarPantallaDerrota();
    }
  }

  dibujarMenu() {
    fill(0, 0, 0, 200); 
    rect(0, 0, width, height - 80); 

    fill(255);
    textSize(32);
    text("LA TRAVESÍA DE SIMBAD", width / 2, height * 0.2);

    textSize(16);
    textAlign(LEFT, TOP);
    let instructions = 
      "Instrucciones:\n\n" +
      " - Clic Izquierdo: Arrancar a explorar las aguas.\n" +
      " - Clic Derecho: Marcar zona peligrosa.\n" +
      " - Los números (Avisos del Vigía) te guían.\n" +
      " - ¡Encuentra las 'Rutas Seguras' (celdas vacías) \n" +
      "   para recoger las 'Monedas de Oro'!\n\n" +
      "Créditos:\n" +
      " - Juego creado a base de Simbad el Marino \n" +
      " - Programado por Bautista Merlo & Victoria Arce\n\n\n" +
      "¡HAZ CLIC PARA ZARPAR!";
      
    text(instructions, width * 0.1, height * 0.3);
    textAlign(CENTER, CENTER);
  }

  dibujarPantallaVictoria() {
    fill(50, 200, 50, 200);
    rect(0, 0, width, height - 80);

    fill(255);
    stroke(0);
    strokeWeight(2);
    textSize(40);
    text("¡TESORO ENCONTRADO!", width / 2, height / 3);

    botonReiniciar.dibujar();
  }

  dibujarPantallaDerrota() {
    fill(200, 50, 50, 200);
    rect(0, 0, width, height - 80);

    fill(255);
    stroke(0);
    strokeWeight(2);
    textSize(40);
    text("¡HAS NAUFRAGADO!", width / 2, height / 3);
    
    botonReiniciar.dibujar();
  }

  manejarMousePresionado(mx, my) {
    if (this.estado === "menu") {
      reiniciarJuego();
    } else if (this.estado === "win" || this.estado === "lose") {
      botonReiniciar.manejarMousePresionado(mx, my);
    }
  }
}
