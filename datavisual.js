let gameList = [
  { name: "GoW (2005)", power: 4.6, barColor: ['#4E0214', '#DA0014'] },
  { name: "GoW II (2007)", power: 4.2, barColor: ['#016D0F', '#00DA2F'] },
  { name: "GoW III (2010)", power: 5.2, barColor: ['#AF9802', '#DADA00'] },
  { name: "Ascension (2013)", power: 3.0, barColor: ['#001D86', '#007EDF'] },
  { name: "GoW (2018)", power: 23.0, barColor: ['#E25F02', '#D66D02'] },
  { name: "Ragnarök (2022)", power: 15.0, barColor: ['#660268', '#8602D6'] },
  { name: "Chains of Olympus", power: 3.2, barColor: ['#000000', '#0089C9'] },
  { name: "Ghost of Sparta", power: 1.2, barColor: ['#5C0257', '#C000A9'] }
];

function setup() {
  createCanvas(1000, 550);
  textAlign(CENTER, BOTTOM);
  textSize(14);
}

function draw() {
  background('#AFBBFF');
  fill(0);
  textSize(20);
  text("God of War Game Sales (in millions)", width / 2, 40);

  let arena = 400;
  let ground = height - 80;
  let barWidth = 70;
  let space = 25;
  let maxPower = 25;

  stroke(0);
  strokeWeight(2);
  line(40, ground, width - 40, ground);
  noStroke();

  for (let i = 0; i < gameList.length; i++) {
    let x = 60 + i * (barWidth + space);
    let baseHeightBar = map(gameList[i].power, 0, maxPower, 0, arena);

    let isHovering = mouseX > x && mouseX < x + barWidth && mouseY > ground - baseHeightBar && mouseY < ground;

    let heightBar = isHovering ? baseHeightBar * 1.2 : baseHeightBar;
    let topY = ground - heightBar;
    let bottomY = ground;

    fill(0, 50);
    rect(x + 5, bottomY - heightBar + 5, barWidth, heightBar);

    for (let y = 0; y < heightBar; y++) {
      let inter = map(y, 0, heightBar, 0, 1);
      let gradColor = lerpColor(color(gameList[i].barColor[0]), color(gameList[i].barColor[1]), inter);
      fill(gradColor);
      rect(x, bottomY - y, barWidth, 1);
    }

    fill(0);
    textSize(13);
    text(gameList[i].power + "M", x + barWidth / 2, topY - 5);
    textSize(11);
    text(gameList[i].name, x + barWidth / 2, ground + 15);

    if (isHovering) {
      push();
      translate(x + barWidth / 2, topY - 30);
      fill('#654321');
      rectMode(CENTER);
      rect(0, 10, 30, 20);
      fill('#B22222');
      triangle(-15, 10, 15, 10, 0, -10);
      pop();
    }
  }
}
