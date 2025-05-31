function setup() {
  createCanvas(400, 400);
  background(15);
  noLoop();
  noStroke();

  shinystars();
  alternateplanet();
  ufo();
}

function shinystars() {
  fill(255);
  for (let i = 0; i < 40; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(1, 2.5);
    ellipse(x, y, size, size);
  }
}

function alternateplanet() {
  let px = 200;
  let py = 350;
  let prX = 300;
  let prY = 110;

  fill(20, 90, 180);
  ellipse(px, py, prX * 2, prY * 2);

  noFill();
  for (let i = 0; i < 15; i++) {
    stroke(100, 180, 255, map(i, 0, 14, 60, 0));
    strokeWeight(2 + i);
    ellipse(px, py, prX * 2 + i * 4, prY * 2 + i * 1.5);
  }

  noStroke();

  fill(100, 170, 220, 120);
  ellipse(px, py - prY * 0.25, prX * 2, prY * 0.5);

  fill(30, 150, 60);
  ellipse(px - 110, py - 10, 90, 50);
  ellipse(px - 70, py + 20, 50, 30);
  ellipse(px + 80, py + 20, 110, 60);
  ellipse(px + 120, py - 10, 70, 40);

  fill(20, 130, 40);
  ellipse(px - 90, py, 40, 20);
  ellipse(px + 130, py + 10, 40, 20);
}

function ufo() {
  let x = 200;
  let y = 120;

  stroke(130, 180, 130);
  strokeWeight(2);
  line(x - 20, y - 110, x - 30, y - 140);
  line(x + 20, y - 110, x + 30, y - 140);
  noStroke();
  fill(160, 100, 220);
  ellipse(x - 30, y - 140, 6);
  ellipse(x + 30, y - 140, 6);

  fill(160, 100, 220);
  ellipse(x, y - 60, 80, 100);

  fill(120, 80, 190);
  ellipse(x - 25, y - 70, 20, 35);
  ellipse(x + 25, y - 70, 20, 35);
  fill(200, 120, 250);
  ellipse(x - 12, y - 50, 10, 8);
  ellipse(x + 12, y - 50, 10, 8);

  fill(0);
  ellipse(x - 12, y - 50, 4, 4);
  ellipse(x + 12, y - 50, 4, 4);

  fill(180, 120, 240);
  rect(x - 10, y - 20, 20, 20, 5);

  fill(90, 160, 90);
  ellipse(x, y + 50, 110, 140);

  stroke(70, 120, 70);
  strokeWeight(2);
  for (let i = 0; i < 5; i++) {
    let yLine = y + 20 + i * 25;
    line(x - 55, yLine, x + 55, yLine);
  }
  noStroke();

  fill(100, 130, 160);
  ellipse(x, y + 150, 240, 60);

  fill(180, 200, 220);
  ellipse(x, y + 120, 140, 50);

  fill(70, 100, 130);
  ellipse(x, y + 140, 200, 20);

  fill(50);
  ellipse(x - 80, y + 165, 20, 10);
  ellipse(x, y + 170, 20, 10);
  ellipse(x + 80, y + 165, 20, 10);
}
