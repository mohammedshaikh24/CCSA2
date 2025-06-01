let started = false;
let initialMessage = "Click To Start";
let mainMessage = "WELCOME TO BATHSPA UNIVERSITY";
let message = initialMessage;

let letters = [];
let circles = [];
let waves = [];
let shapes = [];
let particles = [];

let scatterMode = false;
let scatterBack = false;
let clickCount = 0;

let bgColor, textColor;
let colorPairs = [
  { bg: [10, 10, 50], text: [255, 200, 200] },
  { bg: [30, 0, 50], text: [200, 255, 255] },
  { bg: [0, 50, 30], text: [255, 255, 200] },
  { bg: [0, 0, 0], text: [0, 255, 255] },
  { bg: [15, 10, 40], text: [255, 150, 255] },
  { bg: [25, 0, 40], text: [255, 220, 180] },
  { bg: [0, 0, 100], text: [255, 255, 100] },
  { bg: [80, 0, 80], text: [255, 255, 255] }
];

let song, fft;

function preload() {
  song = loadSound("song.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(48);
  textStyle(BOLD);
}

function draw() {
  if (!started) {
    background(0);
    fill(255);
    text(initialMessage, width / 2, height / 2);
    return;
  }

  background(bgColor[0], bgColor[1], bgColor[2]);

  noStroke();
  for (let p of particles) {
    fill(255, p.alpha);
    circle(p.x, p.y, p.r);
    p.y -= p.speed;
    if (p.y < 0) {
      p.y = height;
      p.x = random(width);
    }
  }

  for (let w of waves) {
    stroke(w.color);
    noFill();
    beginShape();
    for (let x = 0; x < width; x += 10) {
      let y = w.baseY + sin(x * 0.01 + frameCount * 0.05 + w.offset) * 20;
      y += sin(frameCount * 0.1 + x * 0.05) * 5;
      vertex(x, y);
    }
    endShape();
  }

  for (let shape of shapes) {
    push();
    translate(shape.x, shape.y);
    rotate(frameCount * 0.02);
    stroke(shape.color);
    strokeWeight(2);
    noFill();
    if (shape.type === "triangle") {
      triangle(-10, 10, 0, -10, 10, 10);
    } else if (shape.type === "square") {
      rectMode(CENTER);
      rect(0, 0, 20, 20);
    }
    pop();
  }

  let spectrum = fft.analyze();
  let wave = fft.waveform();

  noFill();
  stroke(255, 100);
  beginShape();
  for (let i = 0; i < wave.length; i++) {
    let x = map(i, 0, wave.length, 0, width);
    let y = map(wave[i], -1, 1, height / 2 + 200, height / 2 - 200);
    vertex(x, y);
  }
  endShape();

  let bass = fft.getEnergy("bass");
  let mid = fft.getEnergy("mid");
  let treble = fft.getEnergy("treble");
  let radius = map(bass + mid + treble, 0, 800, 50, 400);

  noStroke();
  fill(textColor[0], textColor[1], textColor[2], 30);
  ellipse(width / 2, height / 2, radius * 1.5);

  for (let i = 0; i < letters.length; i++) {
    let l = letters[i];
    let d = dist(mouseX, mouseY, l.x, l.y);

    if (!scatterMode && !scatterBack) {
      if (d < 20) {
        l.targetSize = 64;
        l.glow = 255;
      } else {
        l.targetSize = 48;
        l.glow = 0;
      }
    } else {
      l.targetSize = 48;
      l.glow = 0;
    }

    l.size = lerp(l.size, l.targetSize, 0.1);

    if (scatterMode) {
      l.vx += random(-0.3, 0.3);
      l.vy += random(-0.3, 0.3);
      l.vx *= 0.98;
      l.vy *= 0.98;
      l.x += l.vx;
      l.y += l.vy;

      if (l.x < 0 || l.x > width) {
        l.vx *= -1;
        l.x = constrain(l.x, 0, width);
      }
      if (l.y < 0 || l.y > height) {
        l.vy *= -1;
        l.y = constrain(l.y, 0, height);
      }
    } else if (scatterBack) {
      l.x = lerp(l.x, l.originX, 0.1);
      l.y = lerp(l.y, l.originY, 0.1);
      if (abs(l.x - l.originX) < 0.5 && abs(l.y - l.originY) < 0.5) {
        l.x = l.originX;
        l.y = l.originY;
      }
    }

    fill(textColor[0], textColor[1], textColor[2]);
    stroke(255, l.glow);
    strokeWeight(2);
    textSize(l.size);
    textStyle(BOLD);
    text(l.char, l.x, l.y);
  }

  noFill();
  stroke(240);
  strokeWeight(2);
  for (let i = circles.length - 1; i >= 0; i--) {
    let c = circles[i];
    ellipse(c.x, c.y, c.size);
    c.size += 2;
    c.alpha -= 3;
    if (c.alpha <= 0) {
      circles.splice(i, 1);
    }
  }
}

function mousePressed() {
  if (!started) {
    started = true;
    message = mainMessage;
    setupVisuals();
    song.loop();
    return;
  }

  clickCount++;

  if (clickCount % 6 === 5) {
    scatterLetters();
  } else if (clickCount % 6 === 0) {
    scatterBackLetters();
  } else if (clickCount % 2 === 0) {
    message = mainMessage;
    setupLetters();
    generateWaves();
  } else {
    message = shuffle(mainMessage.split(" ")).join(" ");
    setupLetters();
    generateWaves();
  }

  setRandomColorPair();

  circles.push({ x: mouseX, y: mouseY, size: 10, alpha: 255 });
  shapes.push({
    x: mouseX,
    y: mouseY,
    type: random(["triangle", "square"]),
    color: color(random(100, 255), random(100, 255), random(100, 255))
  });
}

function setupVisuals() {
  setupLetters();
  generateWaves();
  fft = new p5.FFT(0.8, 1024);
  setRandomColorPair();
  for (let i = 0; i < 200; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      r: random(1, 3),
      alpha: random(50, 150),
      speed: random(0.2, 1)
    });
  }
}

function setupLetters() {
  letters = [];
  let chars = message.split("");
  let spacing = 55;
  let startX = width / 2 - (chars.length / 2 * spacing);
  for (let i = 0; i < chars.length; i++) {
    let x = startX + i * spacing;
    let y = height / 2;
    letters.push({
      char: chars[i],
      x: x,
      y: y,
      originX: x,
      originY: y,
      vx: 0,
      vy: 0,
      size: 48,
      targetSize: 48,
      glow: 0
    });
  }
}

function generateWaves() {
  waves = [];
  for (let i = 0; i < 10; i++) {
    waves.push({
      baseY: random(height),
      offset: random(TWO_PI),
      color: color(random(100, 255), random(100, 255), random(100, 255), 150)
    });
  }
}

function scatterLetters() {
  scatterMode = true;
  scatterBack = false;
  for (let l of letters) {
    l.vx = random(-12, 12);
    l.vy = random(-12, 12);
  }
}

function scatterBackLetters() {
  scatterBack = true;
  scatterMode = false;
}

function setRandomColorPair() {
  let pair;
  do {
    pair = random(colorPairs);
  } while (
    bgColor && textColor &&
    bgColor.toString() === pair.bg.toString() &&
    textColor.toString() === pair.text.toString()
  );
  bgColor = pair.bg;
  textColor = pair.text;
}
