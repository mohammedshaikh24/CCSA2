let tileSize = 60;

function setup() {
  createCanvas(600, 600);
  noLoop();
  rectMode(CENTER);
}

function draw() {
  background(250);
  
  for (let offsetY = tileSize / 2; offsetY < height; offsetY += tileSize) {
    for (let offsetX = tileSize / 2; offsetX < width; offsetX += tileSize) {
      
      let boxWidth = random(20, tileSize);
      let boxHeight = random(20, tileSize);
      let baseHue = random(0, 360);
      let lightness = random(40, 90);

      push();
      translate(offsetX, offsetY);
      
      if (int(offsetX + offsetY) % 120 === 0) {
        rotate(PI / 4); // rotate diagonally
      }

      fill(baseHue, 80, lightness);
      noStroke();

      if ((offsetX + offsetY) % 2 === 0) {
        rect(0, 0, boxWidth, boxWidth); 
      } else {
        rect(0, 0, boxWidth, boxHeight); 
      }

      pop();
    }
  }
}
