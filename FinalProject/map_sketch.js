var mapimg;
var zoom = 11;
var mn1, mn2, mn3, mn4, mn5, mn6, mn7, mn8, mn9, mn10, mn11, mn12, mn13, mn14, mn15, mn_other;
var count;
var ww = 800;
var hh = 780;
var clat = 40.797865;
var clon = -73.960783;

var state = 0;

var mn1_x=[];
var mn1_y=[];
var mn2_x=[];
var mn2_y=[];
var mn3_x=[];
var mn3_y=[];
var mn4_x=[];
var mn4_y=[];
var mn5_x=[];
var mn5_y=[];
var mn6_x=[];
var mn6_y=[];
var mn7_x=[];
var mn7_y=[];
var mn8_x=[];
var mn8_y=[];
var mn9_x=[];
var mn9_y=[];
var mn10_x=[];
var mn10_y=[];
var mn11_x=[];
var mn11_y=[];
var mn12_x=[];
var mn12_y=[];
var mn13_x=[];
var mn13_y=[];
var mn14_x=[];
var mn14_y=[];
var mn15_x=[];
var mn15_y=[];

var mn1_x_05=[];
var mn1_y_05=[];
var mn2_x_05=[];
var mn2_y_05=[];
var mn3_x_05=[];
var mn3_y_05=[];
var mn4_x_05=[];
var mn4_y_05=[];
var mn5_x_05=[];
var mn5_y_05=[];
var mn6_x_05=[];
var mn6_y_05=[];
var mn7_x_05=[];
var mn7_y_05=[];
var mn8_x_05=[];
var mn8_y_05=[];
var mn9_x_05=[];
var mn9_y_05=[];
var mn10_x_05=[];
var mn10_y_05=[];
var mn11_x_05=[];
var mn11_y_05=[];
var mn12_x_05=[];
var mn12_y_05=[];
var mn13_x_05=[];
var mn13_y_05=[];
var mn14_x_05=[];
var mn14_y_05=[];
var mn15_x_05=[];
var mn15_y_05=[];

var count2005 = [];

var slider;
var val;
var step = 653/14;


// https://www.mapbox.com/help/how-access-tokens-work/
var ACCESS_TOKEN = "pk.eyJ1IjoiaHlvb2MiLCJhIjoiY2oyc25hYmN0MDA1MTJxbGN3aXhoNG8ybSJ9.ObpFTIqmSkDFzISIRjXPrQ";

function preload() {
	mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' + clon + ',' + clat + ',' + zoom + '/' + ww + 'x' + hh + '?access_token=' + ACCESS_TOKEN);
  	mn1 = loadStrings('MN1_Honeylocust_2015.csv', 'csv', 'head');
  	mn2 = loadStrings('MN2_CalleryPear_2015.csv', 'csv', 'head');
  	mn3 = loadStrings('MN3_Ginkgo_2015.csv', 'csv', 'head');
  	mn4 = loadStrings('MN4_PinOak_2015.csv', 'csv', 'head');
  	mn5 = loadStrings('MN5_JapanesePagodaTree_2015.csv', 'csv', 'head');
  	mn6 = loadStrings('MN6_LondonPlanetree_2015.csv', 'csv', 'head');
  	mn7 = loadStrings('MN7_JapaneseZelkova_2015.csv', 'csv', 'head');
  	mn8 = loadStrings('MN8_LittleleafLinden_2015.csv', 'csv', 'head');
  	mn9 = loadStrings('MN9_AmericanElm_2015.csv', 'csv', 'head');
  	mn10 = loadStrings('MN10_AmericanLinden_2015.csv', 'csv', 'head');
  	mn11 = loadStrings('MN11_NorthernRedOak_2015.csv', 'csv', 'head');
  	mn12 = loadStrings('MN12_WillowOak_2015.csv', 'csv', 'head');
  	mn13 = loadStrings('MN13_Cherry_2015.csv', 'csv', 'head');
  	mn14 = loadStrings('MN14_ChineseElm_2015.csv', 'csv', 'head');
  	mn15 = loadStrings('MN15_GreenAsh_2015.csv', 'csv', 'head');
  	count = loadStrings('manhattanCount2015_top15.csv', 'csv', 'head');
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
	createCanvas(ww,hh);
	angleMode(RADIANS);

	button = createButton('2005');
	button.position(20,70);
	button.mousePressed(before);

	button = createButton('2015');
	button.position(70,70);
	button.mousePressed(after);
	
	var cx = webMercX(clon, zoom);
	var cy = webMercY(clat, zoom);

	for (var i = 1; i<count.length; i++) {
		var data = count[i].split(/,/);
		var j = data[2];
		append(count2005,j);
	}

	for (i = 1; i < mn1.length; i++) {
		// console.log(mn1[1]);
		data = mn1[i].split(/,/);
		// console.log(data[1]);
		var lat = data[0];
		var lon = data[1];
		var x = webMercX(lon, zoom) - cx;
		var y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn1_x,x);
		append(mn1_y,y);

		lat = data[2];
		lon = data[3];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn1_x_05,x);
		append(mn1_y_05,y);
	}

	for (i = 1; i < mn2.length; i++) {
		// console.log(mn1[1]);
		data = mn2[i].split(/,/);
		// console.log(data[1]);
		lat = data[0];
		lon = data[1];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn2_x,x);
		append(mn2_y,y);

		lat = data[2];
		lon = data[3];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn2_x_05,x);
		append(mn2_y_05,y);
	}

	for (i = 1; i < mn3.length; i++) {
		// console.log(mn1[1]);
		data = mn3[i].split(/,/);
		// console.log(data[1]);
		lat = data[0];
		lon = data[1];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn3_x,x);
		append(mn3_y,y);

		lat = data[2];
		lon = data[3];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn3_x_05,x);
		append(mn3_y_05,y);
	}

	for (i = 1; i < mn4.length; i++) {
		// console.log(mn1[1]);
		data = mn4[i].split(/,/);
		// console.log(data[1]);
		lat = data[0];
		lon = data[1];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn4_x,x);
		append(mn4_y,y);

		lat = data[2];
		lon = data[3];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn4_x_05,x);
		append(mn4_y_05,y);
	}

	for (i = 1; i < mn5.length; i++) {
		// console.log(mn1[1]);
		data = mn5[i].split(/,/);
		// console.log(data[1]);
		lat = data[0];
		lon = data[1];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn5_x,x);
		append(mn5_y,y);

		lat = data[2];
		lon = data[3];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn5_x_05,x);
		append(mn5_y_05,y);
	}

	for (i = 1; i < mn6.length; i++) {
		// console.log(mn1[1]);
		data = mn6[i].split(/,/);
		// console.log(data[1]);
		lat = data[0];
		lon = data[1];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn6_x,x);
		append(mn6_y,y);

		lat = data[2];
		lon = data[3];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn6_x_05,x);
		append(mn6_y_05,y);
	}

	for (i = 1; i < mn7.length; i++) {
		// console.log(mn1[1]);
		data = mn7[i].split(/,/);
		// console.log(data[1]);
		lat = data[0];
		lon = data[1];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn7_x,x);
		append(mn7_y,y);

		lat = data[2];
		lon = data[3];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn7_x_05,x);
		append(mn7_y_05,y);
	}

	for (i = 1; i < mn8.length; i++) {
		// console.log(mn1[1]);
		data = mn8[i].split(/,/);
		// console.log(data[1]);
		lat = data[0];
		lon = data[1];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn8_x,x);
		append(mn8_y,y);

		lat = data[2];
		lon = data[3];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn8_x_05,x);
		append(mn8_y_05,y);
	}

	for (i = 1; i < mn9.length; i++) {
		// console.log(mn1[1]);
		data = mn9[i].split(/,/);
		// console.log(data[1]);
		lat = data[0];
		lon = data[1];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn9_x,x);
		append(mn9_y,y);

		lat = data[2];
		lon = data[3];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn9_x_05,x);
		append(mn9_y_05,y);
	}

	for (i = 1; i < mn10.length; i++) {
		// console.log(mn1[1]);
		data = mn10[i].split(/,/);
		// console.log(data[1]);
		lat = data[0];
		lon = data[1];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn10_x,x);
		append(mn10_y,y);

		lat = data[2];
		lon = data[3];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn10_x_05,x);
		append(mn10_y_05,y);
	}

	for (i = 1; i < mn11.length; i++) {
		// console.log(mn1[1]);
		data = mn11[i].split(/,/);
		// console.log(data[1]);
		lat = data[0];
		lon = data[1];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn11_x,x);
		append(mn11_y,y);

		lat = data[2];
		lon = data[3];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn11_x_05,x);
		append(mn11_y_05,y);
	}

	for (i = 1; i < mn12.length; i++) {
		// console.log(mn1[1]);
		data = mn12[i].split(/,/);
		// console.log(data[1]);
		lat = data[0];
		lon = data[1];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn12_x,x);
		append(mn12_y,y);

		lat = data[2];
		lon = data[3];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn12_x_05,x);
		append(mn12_y_05,y);
	}

	for (i = 1; i < mn13.length; i++) {
		// console.log(mn1[1]);
		data = mn13[i].split(/,/);
		// console.log(data[1]);
		lat = data[0];
		lon = data[1];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn13_x,x);
		append(mn13_y,y);

		lat = data[2];
		lon = data[3];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn13_x_05,x);
		append(mn13_y_05,y);
	}

	for (i = 1; i < mn14.length; i++) {
		// console.log(mn1[1]);
		data = mn14[i].split(/,/);
		// console.log(data[1]);
		lat = data[0];
		lon = data[1];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn14_x,x);
		append(mn14_y,y);

		lat = data[2];
		lon = data[3];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn14_x_05,x);
		append(mn14_y_05,y);
	}

	for (i = 1; i < mn15.length; i++) {
		// console.log(mn1[1]);
		data = mn15[i].split(/,/);
		// console.log(data[1]);
		lat = data[0];
		lon = data[1];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn15_x,x);
		append(mn15_y,y);

		lat = data[2];
		lon = data[3];
		x = webMercX(lon, zoom) - cx;
		y = webMercY(lat, zoom) - cy;
		// console.log(x);
		// console.log(y);
		append(mn15_x_05,x);
		append(mn15_y_05,y);
	}

	// for (i = 1; i < mn_other.length; i++) {
	// 	// console.log(mn1[1]);
	// 	data = mn_other[i].split(/,/);
	// 	// console.log(data[1]);
	// 	lat = data[0];
	// 	lon = data[1];
	// 	x = webMercX(lon, zoom) - cx;
	// 	y = webMercY(lat, zoom) - cy;
	// 	// console.log(x);
	// 	// console.log(y);
	// 	append(mn_other_x,x);
	// 	append(mn_other_y,y);
	// }

	// createSlider(min, max, default value, step size)
	slider = createSlider(1,15,1,1);
	slider.position(80,40);
	slider.style('width', '670px');
}	

function draw() {
	translate(width/2, height/2);
	imageMode(CENTER);
	image(mapimg, 0,0);

	val = slider.value()

	noStroke();
	fill('gold');
	rect(-400,-370,800,40);

	textSize(16);
	fill(14);
	text("RANK", -380, -335);
	fill(20);
	textSize(12);
	text("1", -315, -350);
	text("2", -315+step, -350);
	text("3", -315+step*2, -350);
	text("4", -315+step*3, -350);
	text("5", -315+step*4, -350);
	text("6", -315+step*5, -350);
	text("7", -315+step*6, -350);
	text("8", -315+step*7, -350);
	text("9", -315+step*8, -350);
	text("10", -315+step*9, -350);
	text("11", -315+step*10, -350);
	text("12", -315+step*11, -350);
	text("13", -315+step*12, -350);
	text("14", -315+step*13, -350);
	text("15", -315+step*14, -350);


	if (state==0) {
		stroke('gold');
		strokeWeight(2);
		line(-325,-300,-290,-300);

		noStroke();
		fill('gold');
		textSize(20)

		if (val==1) {
			text("Honeylocust:  "+mn1_x.length, -380,-270);
			for (i = 1; i < mn1_x.length; i++) {
				ellipse(mn1_x[i],mn1_y[i],1,1);
			}
		}

		if (val==2) {
			text("Callery Pear:  "+mn2_x.length, -380,-270);
			for (i = 1; i < mn2_x.length; i++) {
				ellipse(mn2_x[i],mn2_y[i],1,1);
			}
		}

		if (val==3) {
			text("Ginkgo:  "+mn3_x.length, -380,-270);
			for (i = 1; i < mn3_x.length; i++) {
				ellipse(mn3_x[i],mn3_y[i],1,1);
			}
		}

		if (val==4) {
			text("Pin Oak:  "+mn4_x.length, -380,-270);
			for (i = 1; i < mn4_x.length; i++) {
				ellipse(mn4_x[i],mn4_y[i],1,1);
			}
		}

		if (val==5) {
			text("Japanese Zelkova:  "+mn5_x.length, -380,-270);
			for (i = 1; i < mn5_x.length; i++) {
				ellipse(mn5_x[i],mn5_y[i],1,1);
			}
		}

		if (val==6) {
			text("London Planetree:  "+mn6_x.length, -380,-270);
			for (i = 1; i < mn6_x.length; i++) {
				ellipse(mn6_x[i],mn6_y[i],1,1);
			}
		}

		if (val==7) {
			text("Japanese Pagoda Tree:  "+mn7_x.length, -380,-270);
			for (i = 1; i < mn7_x.length; i++) {
				ellipse(mn7_x[i],mn7_y[i],1,1);
			}
		}

		if (val==8) {
			text("Littleleaf Linden:  "+mn8_x.length, -380,-270);
			for (i = 1; i < mn8_x.length; i++) {
				ellipse(mn8_x[i],mn8_y[i],1,1);
			}
		}

		if (val==9) {
			text("American Elm:  "+mn9_x.length, -380,-270);
			for (i = 1; i < mn9_x.length; i++) {
				ellipse(mn9_x[i],mn9_y[i],1,1);
			}
		}

		if (val==10) {
			text("American Linden:  "+mn10_x.length, -380,-270);
			for (i = 1; i < mn10_x.length; i++) {
				ellipse(mn10_x[i],mn10_y[i],1,1);
			}
		}

		if (val==11) {
			text("Northern Red Oak:  "+mn11_x.length, -380,-270);
			for (i = 1; i < mn11_x.length; i++) {
				ellipse(mn11_x[i],mn11_y[i],1,1);
			}
		}

		if (val==12) {
			text("Willow Oak:  "+mn12_x.length, -380,-270);
			for (i = 1; i < mn12_x.length; i++) {
				ellipse(mn12_x[i],mn12_y[i],1,1);
			}
		}

		if (val==13) {
			text("Cherry:  "+mn13_x.length, -380,-270);
			for (i = 1; i < mn13_x.length; i++) {
				ellipse(mn13_x[i],mn13_y[i],1,1);
			}
		}

		if (val==14) {
			text("Chinese Elm:  "+mn14_x.length, -380,-270);
			for (i = 1; i < mn14_x.length; i++) {
			ellipse(mn14_x[i],mn14_y[i],1,1);
			}
		}

		if (val==15) {
			text("Green Ash:  "+mn15_x.length, -380,-270);
			for (i = 1; i < mn15_x.length; i++) {
				ellipse(mn15_x[i],mn15_y[i],1,1);
			}
		}
	} else {

		stroke('gold');
		strokeWeight(2);
		line(-375,-300,-340,-300);

		noStroke();
		fill('gold');
		textSize(20)

		if (val==1) {
			text("Honeylocust:  "+count2005[val], -380,-270);
			for (i = 1; i < mn1_x.length; i++) {
				ellipse(mn1_x_05[i],mn1_y_05[i],1,1);
			}
		}

		if (val==2) {
			text("Callery Pear:  "+count2005[val], -380,-270);
			for (i = 1; i < mn2_x.length; i++) {
				ellipse(mn2_x_05[i],mn2_y_05[i],1,1);
			}
		}

		if (val==3) {
			text("Ginkgo:  "+count2005[val], -380,-270);
			for (i = 1; i < mn3_x.length; i++) {
				ellipse(mn3_x_05[i],mn3_y_05[i],1,1);
			}
		}

		if (val==4) {
			text("Pin Oak:  "+count2005[val], -380,-270);
			for (i = 1; i < mn4_x.length; i++) {
				ellipse(mn4_x_05[i],mn4_y_05[i],1,1);
			}
		}

		if (val==5) {
			text("Japanese Zelkova:  "+count2005[val], -380,-270);
			for (i = 1; i < mn5_x.length; i++) {
				ellipse(mn5_x_05[i],mn5_y_05[i],1,1);
			}
		}

		if (val==6) {
			text("London Planetree:  "+count2005[val], -380,-270);
			for (i = 1; i < mn6_x.length; i++) {
				ellipse(mn6_x_05[i],mn6_y_05[i],1,1);
			}
		}

		if (val==7) {
			text("Japanese Pagoda Tree:  "+count2005[val], -380,-270);
			for (i = 1; i < mn7_x.length; i++) {
				ellipse(mn7_x_05[i],mn7_y_05[i],1,1);
			}
		}

		if (val==8) {
			text("Littleleaf Linden:  "+count2005[val], -380,-270);
			for (i = 1; i < mn8_x.length; i++) {
				ellipse(mn8_x_05[i],mn8_y_05[i],1,1);
			}
		}

		if (val==9) {
			text("American Elm:  "+count2005[val], -380,-270);
			for (i = 1; i < mn9_x.length; i++) {
				ellipse(mn9_x_05[i],mn9_y_05[i],1,1);
			}
		}

		if (val==10) {
			text("American Linden:  "+count2005[val], -380,-270);
			for (i = 1; i < mn10_x.length; i++) {
				ellipse(mn10_x_05[i],mn10_y_05[i],1,1);
			}
		}

		if (val==11) {
			text("Northern Red Oak:  "+count2005[val], -380,-270);
			for (i = 1; i < mn11_x.length; i++) {
				ellipse(mn11_x_05[i],mn11_y_05[i],1,1);
			}
		}

		if (val==12) {
			text("Willow Oak:  "+count2005[val], -380,-270);
			for (i = 1; i < mn12_x.length; i++) {
				ellipse(mn12_x_05[i],mn12_y_05[i],1,1);
			}
		}

		if (val==13) {
			text("Cherry:  "+count2005[val], -380,-270);
			for (i = 1; i < mn13_x.length; i++) {
				ellipse(mn13_x_05[i],mn13_y_05[i],1,1);
			}
		}

		if (val==14) {
			text("Chinese Elm:  "+count2005[val], -380,-270);
			for (i = 1; i < mn14_x.length; i++) {
				ellipse(mn14_x_05[i],mn14_y_05[i],1,1);
			}
		}

		if (val==15) {
			text("Green Ash:  "+count2005[val], -380,-270);
			for (i = 1; i < mn15_x.length; i++) {
				ellipse(mn15_x_05[i],mn15_y_05[i],1,1);
			}
		}
	}
}

function after() {
	state = 0
}

function before() {
	state = 1
}