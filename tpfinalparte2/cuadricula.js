class Cuadricula {  
  constructor(columnas, filas, cantidadBombas) {
    this.columnas = columnas;
    this.filas = filas;
    this.cantidadBombas = cantidadBombas;

    this.arregloCuadricula = this.crearArreglo2D(columnas, filas);
    this.iniciarCeldas();
    this.plantarMinas();
    this.contarMinasVecinas();
  }

  crearArreglo2D(columnas, filas) {
    let arr = new Array(columnas);
    for (let i = 0; i < columnas; i = i + 1) {
      arr[i] = new Array(filas);
    }
    return arr;
  }

  iniciarCeldas() {
    for (let i = 0; i < this.columnas; i++) {
      for (let j = 0; j < this.filas; j++) {
        this.arregloCuadricula[i][j] = new Celda(i, j, tamañoCeldas);
      }
    }
  }

  plantarMinas() {
    let opciones = [];
    let indiceOpciones = 0;
    
    for (let i = 0; i < this.columnas; i++) {
      for (let j = 0; j < this.filas; j++) {
        opciones[indiceOpciones] = [i, j];
        indiceOpciones = indiceOpciones + 1;
      }
    }
    
    opciones.sort(() => random() - 0.5);

    for (let n = 0; n < this.cantidadBombas; n++) {
      if (indiceOpciones > n) { 
        let i = opciones[n][0]; 
        let j = opciones[n][1];
        this.arregloCuadricula[i][j].esMina = true;
      }
    }
  }

  contarMinasVecinas() {
    for (let i = 0; i < this.columnas; i++) {
      for (let j = 0; j < this.filas; j++) {
        
        if (this.arregloCuadricula[i][j].esMina) {
          this.arregloCuadricula[i][j].minasVecinas = -1;
          continue;
        }
        
        let total = 0;
        for (let xoff = -1; xoff <= 1; xoff++) {
          for (let yoff = -1; yoff <= 1; yoff++) {
            let ni = i + xoff;
            let nj = j + yoff;
            
            if (ni > -1 && ni < this.columnas && nj > -1 && nj < this.filas) {
              if (this.arregloCuadricula[ni][nj].esMina) {
                total++;
              }
            }
          }
        }
        this.arregloCuadricula[i][j].minasVecinas = total;
      }
    }
  }

  dibujar() {
    for (let i = 0; i < this.columnas; i++) {
      for (let j = 0; j < this.filas; j++) {
        this.arregloCuadricula[i][j].dibujar();
      }
    }
  }

  marcar(i, j) {
    this.arregloCuadricula[i][j].alternarMarca();
  }

  revelar(i, j) {
    let celda = this.arregloCuadricula[i][j];

    if (celda.estaRevelada || celda.estaMarcada) {
      return true;
    }

    celda.estaRevelada = true;

    if (celda.esMina) {
      return false;
    }

    if (celda.minasVecinas === 0) {
      this.expansionRecursiva(i, j);
    }
    
    return true;
  }
  
  expansionRecursiva(i, j) {
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        let ni = i + xoff;
        let nj = j + yoff;    
        if (ni > -1 && ni < this.columnas && nj > -1 && nj < this.filas) {
          let vecino = this.arregloCuadricula[ni][nj];
          if (!vecino.estaRevelada) {
            this.revelar(ni, nj);
          }
        }
      }
    }
  }

  revelarTodo() {
    for (let i = 0; i < this.columnas; i++) {
      for (let j = 0; j < this.filas; j++) {
        let celda = this.arregloCuadricula[i][j];
        if (celda.esMina) {
          celda.estaRevelada = true;
        }
      }
    }
  }

  comprobarVictoria() {
    for (let i = 0; i < this.columnas; i++) {
      for (let j = 0; j < this.filas; j++) {
        let celda = this.arregloCuadricula[i][j];
        if (!celda.esMina && !celda.estaRevelada) {
          return false;
        }
      }
    }
    return true;
  }
}
