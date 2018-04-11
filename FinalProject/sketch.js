var mapimg;
var zoom = 11;
var tree2015;
var ww = 1250;
var hh = 900;
var clat = 40.792673;
var clon = -74.019668;

// https://www.mapbox.com/help/how-access-tokens-work/
var ACCESS_TOKEN = "pk.eyJ1IjoiaHlvb2MiLCJhIjoiY2oyc25hYmN0MDA1MTJxbGN3aXhoNG8ybSJ9.ObpFTIqmSkDFzISIRjXPrQ";

function preload() {
	mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' + clon + ',' + clat + ',' + zoom + '/' + ww + 'x' + hh + '?access_token=' + ACCESS_TOKEN);
  	tree2015 = loadTable('2015TreeCensus.csv', 'csv', 'header');
}

// Web Mercator Math
// https://en.wikipedia.org/wiki/Web_Mercator
function mercX(lon) {
	lon = radians(lon);
	return (256/PI) * pow(2, zoom) * (lon + PI);
}

function mercY(lat) {
	lat = radians(lat);
	return (256 / PI) * pow(2, zoom) * (PI - log(tan((PI / 4.0) + (lat / 2.0))));
}

function webMercX(lon, zoom) {
	lon = radians(lon);
	var w = 256; //width / 2;
	var a = (w / PI) * pow(2, zoom);
	var b = (lon + PI);
	return a * b;
}

function webMercY(lat, zoom) {
  lat = radians(lat);
  var w = 256; //height / 2;
  var a = (w / PI) * pow(2, zoom);
  var c = tan(PI / 4 + lat / 2);
  var b = PI - log(c)
  return a * b;
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(RADIANS);
	translate(width/2, height/2);
	imageMode(CENTER);
	image(mapimg, 0,0);

	var cx = webMercX(clon, zoom);
	var cy = webMercY(clat, zoom);

	for (var i=1; i<tree2015.length;)
}