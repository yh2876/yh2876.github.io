function setup() {
  createCanvas(640, 480);
}

function draw() {
  background(235);

  noStroke();

  // clock
  fill(243,193,216);
  rect(width/2-250,height/2-100,500,200);
  fill(239,162,193);
  // hour_left
  rect(width/2-230,height/2-85,150,170);
  // minute_right
  rect(width/2-50,height/2-85,280,170);
  // seperation
  rect(width/2-70,height/2-85,10,70);
  rect(width/2-70,height/2+15,10,70);

  // second bar
  fill(243,193,216);
  rect(width/2-250,height/2+110,500,40);

  var h=hour();
  var m=minute();
  var s=second();

  textSize(12);
  noStroke();
  fill(193,43,108);
  text('TIME RIGHT NOW :\n' + h + ': '+ m +': '+ s,50, 50);


  var hour_var=map(h,0,24,0,150)
  var minute_var=map(m,0,60,0,280)
  var second_var=map(s,0,60,width/2-250,width/2+250)

  // hour
  noStroke();
  fill(193,48,108);
  rect(width/2-230,height/2-85,hour_var,170);
  // minute
  rect(width/2-50,height/2-85,minute_var,170);
  // second
  stroke(193,48,108)
  strokeWeight(2)
  line(second_var,height/2+115,second_var,height/2+145)

  // show a line at the bottom when it hits 59 seconds
  if (s==59){
  line(width/2-250,height/2+160,width/2+250,height/2+160);}
  
}