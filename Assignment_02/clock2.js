function setup() {
  createCanvas(640, 480);
}

function draw() {
  // WEEK1: 1 WORD, 2 SHAPES, 3 COLORS
  background('yellow');
  // see https://p5js.org/reference/#/p5/fill
  noStroke()
  fill(10,150,255);
  // ellipse(locationX, locationY, width, height)
  // see https://p5js.org/reference/#/p5/ellipse
  ellipse(width/2,height/2,50,50);
  // rect(locationX, locationY, width, height)
  // see https://p5js.org/reference/#/p5/rect
  rect(width/2-40,height/2+40,80,5);

  // WEEK2: ADD TIME
  // see https://p5js.org/reference/#/p5/second
  // see https://p5js.org/reference/#/p5/rotate
  var s = second();
  translate(width/2,height/2+15)
  rotate(PI * s / 30);
  strokeWeight(1)
  stroke(50)
  noFill()
  // rectangle radius: top-left, top-right, bottom-right, bottom-left
  // when rotate, locationX,Y calculated from the translate location
  rect(-70,-70,140,140,20,20,20,50);
  // see https://p5js.org/reference/#/p5/text
  textSize(20);
  fill(50,50,100);
  text('Hi! Yuan is trying to code!',-120,110);
}
