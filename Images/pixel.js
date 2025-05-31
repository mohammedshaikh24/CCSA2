let img, x, y;

function preload() {
  img = loadImage('pictures/cc.png');
}

function setup() {
  createCanvas(img.width, img.height);
  background(0);
  noStroke();
}

function draw() {
  background(0);
  x = mouseX;
  y = mouseY;
  image(img, 0, 0);
  let c = get(x, y);
  fill(c);
  ellipse(x, y, 100, 100);
}
