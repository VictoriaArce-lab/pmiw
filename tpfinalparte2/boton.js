class Boton {
  
  constructor(x, y, w, h, texto, alHacerClic) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.texto = texto;
    this.alHacerClic = alHacerClic;
  }

  dibujar() {
    let mx = mouseX;
    let my = mouseY;
    
    if (this.estaMouseEncima(mx, my)) {
      fill(200); 
    } else {
      fill(230); 
    }
    
    stroke(0);
    strokeWeight(1);
    rect(this.x, this.y, this.w, this.h, 5);
    
    fill(0);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text(this.texto, this.x + this.w / 2, this.y + this.h / 2);
  }

  estaMouseEncima(mx, my) {
    return (mx > this.x && mx < this.x + this.w && 
            my > this.y && my < this.y + this.h);
  }

  manejarMousePresionado(mx, my) {
    if (this.estaMouseEncima(mx, my)) {
      this.alHacerClic();
    }
  }
}
