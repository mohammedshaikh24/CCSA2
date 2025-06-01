let particles = [];
let rageMode = false;
let shake = 0;
let trail = [];
let mic, fft;
let clickCount = 0;
let showRageHint = false;
let blueSquares = [];

function setup() {
  createCanvas(1000, 600);
  noStroke();
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  if (shake > 0) {
    translate(random(-shake, shake), random(-shake, shake));
    shake--;
  }

  if (rageMode) {
    background(120, 0, 0, 60);
  } else {
    background(0, 5, 30, 40);
  }

  let spectrum = fft.analyze();
  noStroke();
  for (let i = 0; i < spectrum.length; i += 20) {
    let amp = spectrum[i];
    let radius = map(amp, 0, 256, 10, 200);
    let x = map(i, 0, spectrum.length, 0, width);
    let y = height - radius / 2;
    fill(rageMode ? color(255, 0, 0, 80) : color(0, 150, 255, 80));
    ellipse(x, y, radius);
  }

  let p = {
    x: mouseX,
    y: mouseY,
    vx: random(-1, 1),
    vy: random(-1, 1),
    size: random(4, 8),
    alpha: 255,
    col: rageMode ? color(255, 20, 20) : color(150, 200, 255)
  };
  particles.push(p);

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    fill(p.col.levels[0], p.col.levels[1], p.col.levels[2], p.alpha);
    ellipse(p.x, p.y, p.size);
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 2;
    if (p.alpha <= 0) particles.splice(i, 1);
  }

  trail.push({ x: mouseX, y: mouseY, life: 30 });

  for (let i = trail.length - 1; i >= 0; i--) {
    let t = trail[i];
    let alpha = map(t.life, 0, 30, 0, 255);
    stroke(rageMode ? color(255, 100, 100, alpha) : color(255, 255, 255, alpha));
    strokeWeight(3);
    point(t.x, t.y);
    t.life--;
    if (t.life <= 0) trail.splice(i, 1);
  }

  for (let i = blueSquares.length - 1; i >= 0; i--) {
    let sq = blueSquares[i];
    fill(0, 100, 255, sq.alpha);
    rect(sq.x, sq.y, sq.size, sq.size);
    sq.size += 0.5;
    sq.alpha -= 3;
    if (sq.alpha <= 0) blueSquares.splice(i, 1);
  }

  noStroke();
  fill(rageMode ? 255 : 200);
  textSize(18);
  textAlign(CENTER, TOP);
  text(rageMode ? "SPARTAN RAGE!" : "Wrath of the Leviathan", width / 2, 20);

  if (showRageHint && !rageMode) {
    fill(255, 100, 100);
    textSize(16);
    text("Press 'R' to unleash Spartan Rage!", width / 2, 50);
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    rageMode = !rageMode;
  }
}

function mousePressed() {
  shake = 10;
  clickCount++;
  if (clickCount >= 5) {
    showRageHint = true;
  }
  blueSquares.push({ x: mouseX - 10, y: mouseY - 10, size: 20, alpha: 200 });
}
