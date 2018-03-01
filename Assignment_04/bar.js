// data variables
var table;
var park = [];
var crime = [];
// var park_crime = {}; // object

// drawing constants
var colors = ["red", "orange", "yellow", "green", "blue", "purple"];
var margin = 40;
var recHeight = 20;
var textSize = 12;

function preload(){ // display "Loading..." on the screen so we see something's happening
  table = loadTable('NYC_ParkCrime_TotalCount_2017.csv', 'csv', 'header');
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  loadData();
  noStroke();
}

function draw(){
  background(0);
  
  // var park = Object.keys(park_crime);
  // var crime = Object.values(park_crime);

  fill(255);
  text(park[1],100,100);
  text("hello", 100,100);
  
}

function loadData(){
  // var borough = table.getColumn("BOROUGH");
  var park = table.getColumn("PARK");
  var crime = table.getColumn("TOTAL");
}

