function setup() {
  createCanvas(640, 480);
}

function draw() {
  background('yellow');
  // see https://p5js.org/reference/#/p5/fill
  noStroke()
  fill(10,150,255);
  // ellipse(locationX, locationY, width, height)
  // see https://p5js.org/reference/#/p5/ellipse
  ellipse(320,100,50,50);
  // rect(locationX, locationY, width, height)
  // see https://p5js.org/reference/#/p5/rect
  rect(280,150,80,5);
  strokeWeight(1)
  stroke(50)
  noFill()
  rect(250,50,140,140,50);
  // see https://p5js.org/reference/#/p5/text
  textSize(20);
  fill(50,50,100);
  text('Hi! Yuan is trying to code!', 240,300);
}
