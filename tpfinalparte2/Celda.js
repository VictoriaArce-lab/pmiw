// PESTAÑA: Celda.js

class Celda {
  
  constructor(i, j, tamano) {
    this.i = i;
    this.j = j;
    this.x = i * tamano;
    this.y = j * tamano;
    this.tamano = tamano;

    this.esMina = false; 
    this.estaRevelada = false; 
    this.estaMarcada = false; 
    this.minasVecinas = 0; 
  }

  dibujar() {
    stroke(0); 
    strokeWeight(1);

    if (this.estaRevelada) {
      fill(173, 216, 230); // Azul claro (agua segura)
      rect(this.x, this.y, this.tamano, this.tamano);
      
      if (this.esMina) {
        image(imgPeligro, this.x + 5, this.y + 5, this.tamano - 10, this.tamano - 10);
      } else if (this.minasVecinas > 0) {
        
        fill('#800000'); // Marrón
        noStroke();
        textSize(this.tamano * 0.6);
        text(this.minasVecinas, this.x + this.tamano / 2, this.y + this.tamano / 2);
        
      } else {
        image(imgMoneda, this.x + 5, this.y + 5, this.tamano - 10, this.tamano - 10);
      }
      
    } else {
      fill(15, 82, 186); // Azul mar
      rect(this.x, this.y, this.tamano, this.tamano);
      
      if (this.estaMarcada) {
        image(imgMarcador, this.x + 5, this.y + 5, this.tamano - 10, this.tamano - 10);
      }
    }
  }

  alternarMarca() {
    if (!this.estaRevelada) {
      this.estaMarcada = !this.estaMarcada;
    }
  }
}
