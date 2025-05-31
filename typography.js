let bathspaPhrase = "WELCOME TO BATHSPA";
let spaColors = [];

function setup() {
  createCanvas(800, 400);
  textAlign(CENTER, CENTER);
  textSize(56);
  noStroke();
  
  for (let roman = 0; roman < bathspaPhrase.length; roman++) {
    spaColors[roman] = color(random(100, 255), random(100, 255), random(100, 255));
  }
}

function draw() {
  background(240, 240, 255);
  let abbeyX = width / 2;
  let crescentY = height / 2;
  let stoneSpacing = 42;
  let minervaX = abbeyX - (bathspaPhrase.length / 2) * stoneSpacing;

  let spaTwirl = sin(frameCount * 0.05) * PI / 6; 

  for (let roman = 0; roman < bathspaPhrase.length; roman++) {
    let spaX = minervaX + roman * stoneSpacing;
    let spaY = crescentY;

    push();
    translate(spaX, spaY);
    rotate(spaTwirl);
    fill(spaColors[roman]);
    text(bathspaPhrase[roman], 0, 0);
    pop();
  }
}
