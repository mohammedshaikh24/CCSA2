let trail = [];
let heartColors;

function setup() {
  createCanvas(1000, 1000);
  noStroke();
  background(0);
  heartColors = [
    color(255, 0, 0),
    color(255, 105, 180),
    color(128, 0, 128)
  ];
}

function draw() {
  background(0, 50);

  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    if (frameCount % 2 === 0) {
      let heart = {
        x: mouseX,
        y: mouseY,
        size: random(20, 35),
        grow: 0,
        col: random(heartColors)
      };
      trail.push(heart);
    }
  }

  for (let i = 0; i < trail.length; i++) {
    fill(trail[i].col);
    let s = map(trail[i].grow, 0, 10, 0, trail[i].size);
    drawHeart(trail[i].x, trail[i].y, s);
    trail[i].grow++;
  }

  if (trail.length > 60) {
    trail.shift();
  }
}

function drawHeart(x, y, s) {
  push();
  translate(x, y);
  scale(s / 100);
  beginShape();
  vertex(0, -30);
  bezierVertex(-50, -80, -60, -10, 0, 20);
  bezierVertex(60, -10, 50, -80, 0, -30);
  endShape(CLOSE);
  pop();
}
