function setup() {
  createCanvas(1000, 500);
  noLoop();
}

function draw() {
  background(190);
  rainyclouds();
  citybuilding();
  droptopandrain();
  blackline();
  landcruiser(150, 300);
}

function landcruiser(w, z) {
  fill(220);
  rect(w, z - 90, 400, 90, 6);
  fill(220);
  rect(w + 30, z - 160, 340, 70);
  fill(25);
  rect(w + 50, z - 150, 70, 50);
  rect(w + 125, z - 150, 70, 50);
  rect(w + 200, z - 150, 70, 50);
  fill(220);
  rect(w + 120, z - 150, 5, 50);
  rect(w + 195, z - 150, 5, 50);
  fill(40);
  rect(w + 50, z - 165, 300, 5);
  fill(180);
  rect(w + 40, z - 5, 320, 5);
  fill(60);
  rect(w + 40, z + 5, 320, 8, 5);
  fill(180);
  rect(w + 90, z - 60, 25, 6, 3);
  rect(w + 170, z - 60, 25, 6, 3);
  fill(255, 220, 100);
  rect(w + 390, z - 65, 15, 25, 5);
  fill(255, 0, 0);
  rect(w - 5, z - 70, 10, 35, 5);
  fill(190);
  rect(w - 10, z - 90, 10, 90);
  rect(w + 400, z - 90, 10, 90);
  fill(50);
  rect(w + 60, z - 30, 70, 50, 10);
  rect(w + 270, z - 30, 70, 50, 10);
  donutwheel(w + 90, z + 10);
  donutwheel(w + 300, z + 10);
}

function donutwheel(cx, cy) {
  fill(30);
  ellipse(cx, cy, 60, 60);
  fill(200);
  ellipse(cx, cy, 25, 25);
}

function blackline() {
  fill(50);
  rect(0, 320, width, 180);
  stroke(255, 255, 0);
  strokeWeight(4);
  for (let i = 0; i < width; i += 40) {
    line(i, 410, i + 20, 410);
  }
  noStroke();
}

function droptopandrain() {
  stroke(100, 100, 255, 140);
  strokeWeight(2);
  for (let i = 0; i < 400; i++) {
    let rx = random(0, width);
    let ry = random(0, height);
    line(rx, ry, rx, ry + 10);
  }
  noStroke();
}

function rainyclouds() {
  fill(50, 50, 50, 170);
  noStroke();
  for (let x = 0; x < width; x += 150) {
    ellipse(x + 50, 80, 100, 60);
    ellipse(x + 90, 60, 120, 80);
    ellipse(x + 130, 85, 100, 60);
  }
}

function citybuilding() {
  fill(80);
  for (let x = 0; x < width; x += 70) {
    let h = random(100, 250);
    rect(x, height - h - 180, 60, h);
  }
}
