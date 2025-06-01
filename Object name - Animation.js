let sunY, moonY;
let stars = [], clouds = [], darkClouds = [];
let isDay = false;
let transition = 0;
let cycleStart;
let phase = "transition"; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  sunY = height + 100;
  moonY = height / 2 - 100;
  cycleStart = millis();

  for (let i = 0; i < 150; i++) {
    stars.push({ x: random(width), y: random(height / 2), alpha: random(100, 255) });
  }

  for (let i = 0; i < 5; i++) {
    clouds.push({ x: random(width), y: random(height / 3) });
    darkClouds.push({ x: random(width), y: random(height / 3) });
  }
}

function draw() {
  let elapsed = millis() - cycleStart;

  if (phase === "transition") {
    if (elapsed >= 5000) {
      phase = "pause";
      cycleStart = millis();
    }
    transition = map(elapsed, 0, 5000, isDay ? 0 : 1, isDay ? 1 : 0);
  } else if (phase === "pause") {
    if (elapsed >= 7000) {
      isDay = !isDay;
      phase = "transition";
      cycleStart = millis();
    }
    transition = isDay ? 1 : 0;
  }

  let skyColor = lerpColor(color(10, 10, 40), color(135, 180, 255), transition);
  background(skyColor);

  if (transition < 0.5) {
    for (let s of stars) {
      stroke(255, s.alpha);
      point(s.x, s.y);
    }
    for (let d of darkClouds) {
      fill(30, 30, 30, 180);
      noStroke();
      ellipse(d.x, d.y, 120, 60);
      ellipse(d.x + 30, d.y + 10, 100, 60);
    }
  } else {
    for (let c of clouds) {
      fill(255, 255, 255, 200);
      noStroke();
      ellipse(c.x, c.y, 120, 60);
      ellipse(c.x + 30, c.y + 10, 100, 60);
    }
  }

  noStroke();
  fill(20, 100, 50);
  beginShape();
  vertex(0, height);
  for (let x = 0; x <= width; x += 5) {
    let y = height - 250 + 90 * sin(x * 0.008);
    vertex(x, y);
  }
  vertex(width, height);
  endShape(CLOSE);

  let sunX = width * 0.25;
  let moonX = width * 0.75;
  let sunPosY = lerp(height + 100, height / 2 - 150, transition);
  let moonPosY = lerp(height / 2 - 150, height + 100, transition);

  push();
  translate(sunX, sunPosY);
  fill(255, 204, 0, 100);
  for (let r = 150; r > 80; r -= 10) {
    ellipse(0, 0, r, r);
  }
  fill(255, 204, 0);
  ellipse(0, 0, 80, 80);
  pop();

  push();
  translate(moonX, moonPosY);
  fill(200);
  ellipse(0, 0, 60, 60);
  fill(180);
  ellipse(-10, -10, 10, 10);
  ellipse(10, 5, 8, 8);
  ellipse(0, 15, 6, 6);
  pop();
}
