function setup() {
  createCanvas(640, 480);
}

function draw() {
  background(235);

  var h=hour();
  var m=minute();
  var s=second();

  textSize(12);
  fill(193,43,108);
  text('TIME RIGHT NOW :\n' + h + ': '+ m +': '+ s,50, 50)

  noStroke();
  // clock
  fill(244,190,214);
  ellipse(width/2,height/2,250,250);
  // center
  fill(228,134,173);
  ellipse(width/2,height/2,20,20);

  var second_angle=map(s,0,60,0,2*PI)
  var minute_angle=map(m,0,60,0,2*PI)
  if (h>=12){h=h-12}
  var hour_angle=map(h,0,12,0,2*PI)

  translate(width/2,height/2);
  // second pointer
  push();
  rotate(second_angle - (PI/2))
  stroke('white');
  strokeWeight(1)
  line(0,0,140,0)
  pop();
  // minute pointer
  push();
  rotate(minute_angle - (PI/2))
  stroke(193,43,108);
  strokeWeight(2)
  line(0,0,100,0)
  pop();
  // hour pointer
  push();
  rotate(hour_angle - (PI/2))
  stroke(193,43,108);
  strokeWeight(4)
  line(0,0,60,0)
  pop();
  
}
