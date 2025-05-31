let sound;
let fft;
let started = false;
let pulses = [];

function preload() {
  sound = loadSound('hob.mp3');
}

function setup() {
  createCanvas(1000, 500);
  fft = new p5.FFT();
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(32);
  angleMode(DEGREES);
}

function draw() {
  if (!started) {
    background(0);
    fill(255);
    text("Click to start", width / 2, height / 2);
    return;
  }

  background(0, 30);

  let waveform = fft.waveform();
  let spectrum = fft.analyze();
  let mid = fft.getEnergy("mid");

  if (mid > 140 && frameCount % 10 === 0) {
    pulses.push({
      size: 10,
      type: random(["circle", "square"]),
      lifespan: 60
    });
  }

  push();
  translate(width / 2, height / 2);
  let numTriangles = 60;
  let radius = 150;
  let spinSpeed = frameCount * 0.5;
  for (let i = 0; i < numTriangles; i++) {
    let angle = map(i, 0, numTriangles, 0, 360) + spinSpeed;
    let col = color(
      map(sin(angle + frameCount), -1, 1, 100, 255),
      map(sin(angle + frameCount * 0.5), -1, 1, 50, 200),
      map(cos(angle + frameCount * 0.7), -1, 1, 150, 255)
    );
    fill(col);
    let x1 = cos(angle) * radius;
    let y1 = sin(angle) * radius;
    let x2 = cos(angle + 6) * (radius + 20);
    let y2 = sin(angle + 6) * (radius + 20);
    let x3 = cos(angle - 6) * (radius + 20);
    let y3 = sin(angle - 6) * (radius + 20);
    triangle(x1, y1, x2, y2, x3, y3);
  }

  noFill();
  stroke(255);
  strokeWeight(1.5);
  for (let i = pulses.length - 1; i >= 0; i--) {
    let p = pulses[i];
    if (p.type === "circle") {
      ellipse(0, 0, p.size);
    } else {
      rectMode(CENTER);
      rect(0, 0, p.size, p.size);
    }
    p.size += 4;
    p.lifespan--;
    if (p.lifespan <= 0) {
      pulses.splice(i, 1);
    }
  }
  pop();

  noStroke();
  let barWidth = width / waveform.length * 5;
  for (let i = 0; i < waveform.length; i += 5) {
    let amp = waveform[i] * 2.5;
    let x = i * barWidth;
    let y = map(amp, -1, 1, height - 200, height);
    let col = color(
      map(i, 0, waveform.length, 100, 255),
      map(waveform[i], -1, 1, 50, 200),
      255
    );
    fill(col);
    rect(x, y, barWidth - 1, height - y);
  }
}

function mousePressed() {
  if (!started) {
    userStartAudio();
    sound.play();
    started = true;
  }
}
