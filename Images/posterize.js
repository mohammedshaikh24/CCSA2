let ramphoto;

function preload() {
  ramphoto = loadImage("cc.png");
}

function setup() {
  createCanvas(400, 400);
  image(ramphoto, 0, 0, width, height);
  filter(POSTERIZE,2.5);
  noLoop();
}
