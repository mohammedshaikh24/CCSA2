let img;

function preload() {
  img = loadImage('pictures/cc.png');
}

function setup() {
  createCanvas(img.width, img.height);
  noSmooth();
  pixelDensity(1);
}

function draw() {
  let pixelSize = 10;
  img.loadPixels();

  for (let y = 0; y < img.height; y += pixelSize) {
    for (let x = 0; x < img.width; x += pixelSize) {
      let c = img.get(x, y);
      fill(c);
      noStroke();
      rect(x, y, pixelSize, pixelSize);
    }
  }
}
