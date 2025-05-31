let ramphoto;

function preload() {
  ramphoto = loadImage("cc.png");
}

function setup() {
  createCanvas(400, 400);
  background(0);
  noStroke();
  ramphoto.loadPixels();
  noLoop();

  for (let i = 0; i < 5000; i++) {
    let spotX = int(random(width));
    let spotY = int(random(height));
    let tone = ramphoto.get(spotX, spotY);
    fill(tone[0], tone[1], tone[2], 50);
    ellipse(spotX, spotY, 30, 30);
  }
}
