//https://youtu.be/A7aK8hhCeWM?si=kir0k9ap7Y8xYX2p

let opart;
let clickCA = false;
let clickCR = 0;
let CR;
let cambioC1 = 0, cambioC2 = 1, cambioC3 = 2;

function preload() {
  opart = loadImage('data/opart.jpeg');
}

function setup() {
  createCanvas(800, 400);
  opart.resize(400, 400);
  CR = color(216, 36, 36);
}

function draw() {
  background(0, 165, 193);
  image(opart, 0, 0);
  noStroke();

  CirculoAmarillo();
  bordes();
  CirculoRojo();
  rectangulos(cambioC1, cambioC2, cambioC3);
  fill(0);
}

function mousePressed() {
  if (Boton(621, 50, 150, 152)) {
    clickCA = !clickCA;
  }
  if (dist(mouseX, mouseY, 695, 280) < 100 / 2) {
    clickCR++;
    if (clickCR === 1) {
      CR = color(36, 216, 36);
    }
    if (clickCR === 2) {
      CR = color(36, 36, 216);
    }
    if (clickCR === 3) {
      CR = color(216, 36, 36);
      clickCR = 0;
    }
  }
  if (mouseX <= 400) {
    clickCA = false;
    clickCR = 0;
    CR = color(216, 36, 36);
    cambioC1 = 0;
    cambioC2 = 1;
    cambioC3 = 2;
  }
}

function keyPressed() {
  if (key === 'w') {
    cambioC1--;
    cambioC2--;
    cambioC3--;
    if (cambioC1 === -1) {
      cambioC1 = 2;
    }
    if (cambioC2 === -1) {
      cambioC2 = 2;
    }
    if (cambioC3 === -1) {
      cambioC3 = 2;
    }
  }
  if (key === 's') {
    cambioC1++;
    cambioC2++;
    cambioC3++;
    if (cambioC1 === 3) {
      cambioC1 = 0;
    }
    if (cambioC2 === 3) {
      cambioC2 = 0;
    }
    if (cambioC3 === 3) {
      cambioC3 = 0;
    }
  }
}

function CirculoRojo() {
  fill(17);
  rect(621, 212, 150, 133);
  fill(CR);
  circle(695, 280, 100);
}

function CirculoAmarillo() {
  fill(234);
  rect(621, 50, 150, 152);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      push();
      rectMode(CENTER);
      fill(240, 222, 2);
      if (!clickCA) {
        translate(645 + i * 52, 75 + j * 52);
        circle(0, 0, 52);
      }
      if (clickCA) {
        translate(646 + i * 50, 76 + j * 50);
        rotate(0.80);
        rect(0, 0, 40, 40, 10);
      }
      rectMode(CORNER);
      pop();
    }
  }
}

function Boton(x, y, ancho, alto) {
  return mouseX >= x && mouseX <= x + ancho &&
         mouseY >= y && mouseY <= y + alto;
}

function bordes() {
  fill(255);
  rect(430, 30, 341, 20);
  rect(430, 345, 341, 25);
  rect(611, 50, 10, 295);
  rect(430, 145, 190, 10);
  rect(430, 245, 190, 10);
  rect(611, 202, 160, 10);
  fill(0, 165, 193);
  rect(771, 30, 13, 172);
}

function rectangulos(rect1, rect2, rect3) {
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        if ((j + k) % 2 === 0) {
          fill(176, 45, 37);
        } else {
          fill(255, 93, 94);
        }
        if (k > 0 && (j + k) % 2 === 0) {
          fill(254, 76, 74);
        } else if (k > 0) {
          fill(218, 55, 48);
        }
        rect(430 + j * 90, 50 + k * 47.5 + i * 100, 91, 48.5);
      }
    }
  }

  for (let j = 0; j < 2; j++) {
    for (let k = 0; k < 2; k++) {
      push();
      translate(0, rect1 * 100);
      if ((j + k) % 2 === 0) {
        fill(255, 101, 53);
      } else {
        fill(255, 146, 79);
      }
      if (k > 0 && (j + k) % 2 === 0) {
        fill(253, 133, 72);
      } else if (k > 0) {
        fill(251, 110, 54);
      }
      rect(486 + j * 34, 75 + k * 23, 34, 23.75);
      pop();
    }
  }

  for (let j = 0; j < 2; j++) {
    for (let k = 0; k < 2; k++) {
      push();
      translate(0, rect2 * 100);
      if ((j + k) % 2 === 0) {
        fill(83, 63, 62);
      } else {
        fill(137, 117, 119);
      }
      if (k > 0 && (j + k) % 2 === 0) {
        fill(137, 97, 98);
      } else if (k > 0) {
        fill(85, 73, 73);
      }
      rect(486 + j * 34, 75 + k * 23, 34, 23.75);
      pop();
    }
  }

  for (let j = 0; j < 2; j++) {
    for (let k = 0; k < 2; k++) {
      push();
      translate(0, rect3 * 100);
      if ((j + k) % 2 === 0) {
        fill(13, 111, 158);
      } else {
        fill(103, 173, 199);
      }
      if (k > 0 && (j + k) % 2 === 0) {
        fill(74, 156, 193);
      } else if (k > 0) {
        fill(31, 122, 166);
      }
      rect(486 + j * 34, 75 + k * 23, 34, 23.75);
      pop();
    }
  }
}
