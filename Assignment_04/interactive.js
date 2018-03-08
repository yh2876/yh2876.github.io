// data variables
var table;
var park=[];
var crime=[];
var borough=[];
var murder=[];
var rape=[];
var robbery=[];
var felonyAssault=[];
var burglary=[];
var grandLarceny=[];
var grandLarceny_motor=[];


// drawing constants
var colors = ["red", "orange", "yellow", "green", "blue", "purple"];
var margin = 40;
var recHeight = 20;
var textSize = 12;


function preload(){ // display "Loading..." on the screen so we see something's happening
  table = loadTable('NYC_ParkCrime_TotalCount_2017.csv', 'csv', 'header');
  // console.log(table);
}


function setup(){
  createCanvas(windowWidth,windowHeight);
  loadData();
  noStroke();

  input = createInput();
  input.position(30,60);

  button = createButton('SEARCH THIS PARK');
  button.position(180, 60);
  button.mousePressed(search);
}

function search(){
  var keyword = input.value();
  // text(keyword, 400,75);
  // console.log(keyword);
  var index = park.indexOf(keyword);
  textSize(12);
  fill(255);
  // console.log(index);
  if (index!=-1){
    text("CRIME NUMBER IN "+keyword+" is "+crime[index]+".", 350,75);
  } else {
    text("Failed to find "+keyword+" ...", 350, 75);
  }
  input.value('');
}

// function draw(){
//   fill(255);
//   textSize(14);
//   text("SEARCH A PARK", 30,75);
// }


// set excute interval
setInterval(function draw(){ // change the displayed park names every 3 seconds
  background(0);

  // pick a random starting row of 100 park names
  var i = Math.floor((Math.random()*1152-100)+1);
  // console.log(i);

  var textHeight = 30;
  var textSpace = 30;
  var row = int(windowHeight/30)-3; // determine rows displayed by windowHeight
  // console.log(row);

  // label
  textSize(20);
  fill('255');
  text('NYC PARK CRIME (JAN - SEP)', 30,40);
  textSize(14);
  fill('red');
  text("There is at least one crime.", 380, 40);
  fill(170);
  text("There is no crime.", 600, 40);
  stroke(255);
  line(30,50,windowWidth-30,50);

  for (var j=0; j<=row; j++){ // ++ = +1 
    noStroke();
    var textX_1 = Math.floor((Math.random()*((windowWidth-60)/2-textWidth(park[i+j])))+0);
    var textX_2 = Math.floor((Math.random()*((windowWidth-60)/2-textWidth(park[i+j*2])))+0)+(windowWidth-60)/2;
    // console.log(textX);
    var textY = (j+2)*30+40;
    if (crime[i+j]!=0) {
      fill('red');
      textSize(16);
    } else {
      fill(170);
      textSize(12);
    }
    text(park[i+j], textX_1, textY);
    // console.log(park[i+j]);
    if (crime[i+j*2]!=0) {
      fill('red');
      textSize(16);
    } else {
      fill(170);
      textSize(12);
    }
    text(park[i+j*2], textX_2, textY);
  }
},2000); // 2000ms = 2sec


function loadData(){
  var borough = table.getColumn("BOROUGH");
  park = table.getColumn("PARK");
  // console.log(park)
  crime = table.getColumn("TOTAL");
  // murder = table.getColumn("MURDER");
  // rape = table.getColumn("RAPE");
  // robbery = table.getColumn("ROBBERY");
  // felonyAssault = table.getColumn("FELONY ASSULT");
  // burglary = table.getColumn("BURGLARY");
  // grandLarceny = table.getColumn("GRAND LARENCY");
  // grandLarceny_motor = table.getColumn("GRAND LARCENY OF MOTOR VEHICLE");
}