var speciesData, statusData;
var bronxSpecies=[], brooklynSpecies=[], manhattanSpecies=[], queensSpecies=[], statenSpecies=[];
var bronxStatus=[], brooklynStatus=[], manhattanStatus=[], queensStatus=[], statenStatus=[];
var species=[], status=[];
var i, j;
var data;
var maxSpeciesCount=34886;
var maxStatusCount=194005;

var r=[], g=[], b=[];
var statusColor=['LimeGreen', 'Gold', 'Red', 'Black'];
var barLength;
var pointX_BX=[], pointX_BK=[], pointX_MN=[], pointX_QN=[], pointX_SI=[]
var pointY=[];
var pointSize;
var state=0;

 // area measured in sq. mi
var bronxArea=42.47;
var brooklynArea=69.5;
var manhattanArea=22.82;
var queensArea=108.1;
var statenArea=58.69;

function preload(){
	speciesData = loadStrings('allSpecies2015.csv', 'csv', 'header');
	statusData = loadStrings('StatusAndHealth2015.csv', 'csv', 'header');
}

function setup(){
	createCanvas(1450,700);

	for (i=0; i<speciesData.length; i++){
		// load data
		data = speciesData[i].split(/,/);
		j = data[1];
		append(species, j);
		j = data[2];
		append(bronxSpecies, j);
		j = data[3];
		append(brooklynSpecies, j);
		j = data[4];
		append(manhattanSpecies, j);
		j = data[5];
		append(queensSpecies, j);
		j = data[6];
		append(statenSpecies, j);
		// random color
		j = random(255);
		append(r, j);
		j = random(255);
		append(g, j);
		j = random(255);
		append(b, j);
		// random point x, y
		barLength = map(bronxArea, 0, queensArea, 0, 1200);
		j = random(barLength);
		append(pointX_BX, j);
		barLength = map(brooklynArea, 0, queensArea, 0, 1200);
		j = random(barLength);
		append(pointX_BK, j);
		barLength = map(manhattanArea, 0, queensArea, 0, 1200);
		j = random(barLength);
		append(pointX_MN, j);
		j = random(1200);
		append(pointX_QN, j);
		barLength = map(statenArea, 0, queensArea, 0, 1200);
		j = random(barLength);
		append(pointX_SI, j);
		j = random(100);
		append(pointY, j);
	}
	// console.log(bronxSpecies);
	// console.log(pointY);

	for (i=0; i<statusData.length; i++){
		data  = statusData[i].split(/,/);
		j = data[1];
		append(bronxStatus, j);
		j = data[2];
		append(brooklynStatus, j);
		j = data[3];
		append(manhattanStatus, j);
		j = data[4];
		append(queensStatus, j);
		j = data[5];
		append(statenStatus, j);
	}
	// console.log(queensStatus);

	// noLoop();
	textFont('Helvetica');

	button = createButton('RAW');
	button.position(60,680);
	button.mousePressed(speciesRawView);

	button = createButton('AGGREGATE');
	button.position(120,680);
	button.mousePressed(speciesAggregateView);

	button = createButton('RAW');
	button.position(320,680);
	button.mousePressed(statusRawView);

	button = createButton('AGGRETATE');
	button.position(380,680);
	button.mousePressed(statusAggregateView);
}

function draw(){

	print(state);	

	if (state==1){ // aggregateView

		clear();
		noLoop();
		noStroke();

		textSize(12);
		// bronx
		fill(r[3], g[3], b[3]);
		text("Honeylocust: 9,691", map(bronxArea, 0, queensArea, 0, 1200)+80, 40-4)
		fill(r[5], g[5], b[5]);
		text("London Planetree: 7,511", map(bronxArea, 0, queensArea, 0, 1200)+80, 60-4)
		fill(r[2], g[2], b[2]);
		text("Pin Oak: 6,445", map(bronxArea, 0, queensArea, 0, 1200)+80, 80-4)
		fill(r[26], g[26], b[26]);
		text("Callery Pear: 4,947", map(bronxArea, 0, queensArea, 0, 1200)+80, 100-4)
		fill(r[30], g[30], b[30]);
		text("Japanese Zelkova: 9,691", map(bronxArea, 0, queensArea, 0, 1200)+80, 120-4)
		// brooklyn
		fill(r[5], g[5], b[5]);
		text("London Planetree: 34,886", map(brooklynArea, 0, queensArea, 0, 1200)+80, 160-4)
		fill(r[3], g[3], b[3]);
		text("Honeylocust: 16,921", map(brooklynArea, 0, queensArea, 0, 1200)+80, 180-4)
		fill(r[2], g[2], b[2]);
		text("Pin Oak: 12,343", map(brooklynArea, 0, queensArea, 0, 1200)+80, 200-4)
		fill(r[30], g[30], b[30]);
		text("Japanese Zelkova: 9,659", map(brooklynArea, 0, queensArea, 0, 1200)+80, 220-4)
		fill(r[26], g[26], b[26]);
		text("Callery Pear: 9,081", map(brooklynArea, 0, queensArea, 0, 1200)+80, 240-4)
		// manhattan
		fill(r[3], g[3], b[3]);
		text("Honeylocust: 13,176", map(manhattanArea, 0, queensArea, 0, 1200)+80, 280-4)
		fill(r[26], g[26], b[26]);
		text("Callery Pear: 7,297", map(manhattanArea, 0, queensArea, 0, 1200)+80, 300-4)
		fill(r[6], g[6], b[6]);
		text("Ginkgo: 5,859", map(manhattanArea, 0, queensArea, 0, 1200)+80, 320-4)
		fill(r[2], g[2], b[2]);
		text("Pin Oak: 4,584", map(manhattanArea, 0, queensArea, 0, 1200)+80, 340-4)
		fill(r[22], g[22], b[22]);
		text("Japanese Pagoda Tree: 4,453", map(manhattanArea, 0, queensArea, 0, 1200)+80, 360-4)
		// queens
		fill(r[5], g[5], b[5]);
		text("London Planetree: 31,111", 1200+80, 400-4)
		fill(r[2], g[2], b[2]);
		text("Pin Oak: 22,610", 1200+80, 420-4)
		fill(r[3], g[3], b[3]);
		text("Honeylocust: 20,290", 1200+80, 440-4)
		fill(r[18], g[18], b[18]);
		text("Norway Maple: 19,407", 1200+80, 460-4)
		fill(r[26], g[26], b[26]);
		text("Callery Pear: 16,547", 1200+80, 480-4)
		// staten
		fill(r[26], g[26], b[26]);
		text("Callery Pear: 21,059", map(statenArea, 0, queensArea, 0, 1200)+80, 520-4)
		fill(r[5], g[5], b[5]);
		text("London Planetree: 9,384", map(statenArea, 0, queensArea, 0, 1200)+80, 540-4)
		fill(r[0], g[0], b[0]);
		text("Red Maple: 7,373", map(statenArea, 0, queensArea, 0, 1200)+80, 560-4)
		fill(r[2], g[2], b[2]);
		text("Pin Oak: 7,203", map(statenArea, 0, queensArea, 0, 1200)+80, 580-4)
		fill(r[41], g[41], b[41]);
		text("Cherry: 5115", map(statenArea, 0, queensArea, 0, 1200)+80, 600-4)

		// print(species);
		// print(bronxSpecies);

		for (i=0; i<species.length; i++){

			// loop through each species
			fill(r[i], g[i], b[i]);

			// scale by max count in five boroughs
			pointSize = map(bronxSpecies[i], 0, maxSpeciesCount, 5, 80);
			ellipse(60+pointX_BX[i], 20+pointY[i], pointSize, pointSize);

			pointSize = map(brooklynSpecies[i], 0, maxSpeciesCount, 5, 80);
			ellipse(60+pointX_BK[i], 140+pointY[i], pointSize, pointSize);

			pointSize = map(manhattanSpecies[i], 0, maxSpeciesCount, 5, 80);
			ellipse(60+pointX_MN[i], 260+pointY[i], pointSize, pointSize);

			pointSize = map(queensSpecies[i], 0, maxSpeciesCount, 5, 80);
			ellipse(60+pointX_QN[i], 380+pointY[i], pointSize, pointSize);

			pointSize = map(statenSpecies[i], 0, maxSpeciesCount, 5, 80);
			ellipse(60+pointX_SI[i], 500+pointY[i], pointSize, pointSize);

			// // scale by max count in each borough
			// pointSize = map(bronxSpecies[i], 0, max(bronxSpecies), 5, 50);
			// ellipse(60+pointX_BX[i], 20+pointY[i], pointSize, pointSize);

			// pointSize = map(brooklynSpecies[i], 0, max(brooklynSpecies), 5, 50);
			// ellipse(60+pointX_BK[i], 140+pointY[i], pointSize, pointSize);

			// pointSize = map(manhattanSpecies[i], 0, max(manhattanSpecies), 5, 50);
			// ellipse(60+pointX_MN[i], 260+pointY[i], pointSize, pointSize);

			// pointSize = map(queensSpecies[i], 0, max(queensSpecies), 5, 50);
			// ellipse(60+pointX_QN[i], 380+pointY[i], pointSize, pointSize);

			// pointSize = map(statenSpecies[i], 0, max(statenSpecies), 5, 50);
			// ellipse(60+pointX_SI[i], 500+pointY[i], pointSize, pointSize);
		}
	}
	
	if (state==0) { // rawView

		clear();
		noLoop();
		noStroke();

		rotate(PI/2);
		textSize(16);
		fill('black');
		text('80,550', 20, -(map(bronxArea, 0, queensArea, 0, 1200)+70));
		text('169,594', 140, -(map(brooklynArea, 0, queensArea, 0, 1200)+70));
		text('62,428', 260, -(map(manhattanArea, 0, queensArea, 0, 1200)+70));
		text('237,866', 380, -1270);
		text('101,419', 500, -(map(statenArea, 0, queensArea, 0, 1200)+70));
		rotate(-PI/2);

		for (i=0; i<species.length; i++){

			// loop through each species
			fill(r[i], g[i], b[i]);

			// x = random(500);
			// y = random(100);

			// loop through the count: draw points
			for (j=1; j<bronxSpecies[i]; j++){
				barLength = map(bronxArea, 0, queensArea, 0, 1200);
				ellipse(60+random(barLength), 20+random(100), 1, 1);
			}

			for (j=1; j<brooklynSpecies[i]; j++){
				barLength = map(brooklynArea, 0, queensArea, 0, 1200);
				ellipse(60+random(barLength), 140+random(100), 1, 1);
			}

			for (j=1; j<manhattanSpecies[i]; j++){
				barLength = map(manhattanArea, 0, queensArea, 0, 1200);
				ellipse(60+random(barLength), 260+random(100), 1, 1);
			}

			for (j=1; j<queensSpecies[i]; j++){
				ellipse(60+random(1200), 380+random(100), 1, 1);
			}

			for (j=1; j<statenSpecies[i]; j++){
				barLength = map(statenArea, 0, queensArea, 0, 1200);
				ellipse(60+random(barLength), 500+random(100), 1, 1);
			}
		}
	}

	if (state==2) {
		
		clear();
		noLoop();
		noStroke();
		// print(statusColor);

		for (i=0; i<4; i++){

			fill(statusColor[i]);

			for (j=1; j<bronxStatus[i]; j++){
				barLength = map(bronxArea, 0, queensArea, 0, 1200);
				ellipse(60+random(barLength), 20+random(100), 1, 1);
			}

			for (j=1; j<brooklynStatus[i]; j++){
				barLength = map(brooklynArea, 0, queensArea, 0, 1200);
				ellipse(60+random(barLength), 140+random(100), 1, 1);
			}

			for (j=1; j<manhattanStatus[i]; j++){
				barLength = map(manhattanArea, 0, queensArea, 0, 1200);
				ellipse(60+random(barLength), 260+random(100), 1, 1);
			}

			for (j=1; j<queensStatus[i]; j++){
				ellipse(60+random(1200), 380+random(100), 1, 1);
			}

			for (j=1; j<statenStatus[i]; j++){
				barLength = map(statenArea, 0, queensArea, 0, 1200);
				ellipse(60+random(barLength), 500+random(100), 1, 1);
			}
		}	
	}

	if (state==3){ // aggregateView

		clear();
		noStroke();

		for (i=0; i<4; i++){

			fill(statusColor[i]);

			pointSize = map(bronxStatus[i], 0, maxStatusCount, 5, 80);
			ellipse(100*(i+1), 70, pointSize, pointSize);

			pointSize = map(brooklynStatus[i], 0, maxStatusCount, 5, 80);
			ellipse(100*(i+1), 190, pointSize, pointSize);

			pointSize = map(manhattanStatus[i], 0, maxStatusCount, 5, 80);
			ellipse(100*(i+1), 310, pointSize, pointSize);

			pointSize = map(queensStatus[i], 0, maxStatusCount, 5, 80);
			ellipse(100*(i+1), 430, pointSize, pointSize);

			pointSize = map(statenStatus[i], 0, maxStatusCount, 5, 80);
			ellipse(100*(i+1), 550, pointSize, pointSize);
		}

		for (i=0; i<4; i++){

			fill(statusColor[i]);
			textSize(10);

			if ((mouseY>20)&&(mouseY<120)) {
				text(bronxStatus[i], 100*(i+1)-15, 30-5);
			}

			if ((mouseY>140)&&(mouseY<240)) {
				text(brooklynStatus[i], 100*(i+1)-15, 150-5);
			}

			if ((mouseY>260)&&(mouseY<360)) {
				text(manhattanStatus[i], 100*(i+1)-15, 270-5);
			}

			if ((mouseY>380)&&(mouseY<480)) {
				text(queensStatus[i], 100*(i+1)-15, 390-5);
			}

			if ((mouseY>500)&&(mouseY<600)) {
				text(statenStatus[i], 100*(i+1)-15, 510-5);
			}			
		}

		textSize(12);
		fill(statusColor[0]);
		text('Health', 100*(0+1)-15, 630);
		fill(statusColor[1]);
		text('Fair', 100*(1+1)-15, 630);
		fill(statusColor[2]);
		text('Poor', 100*(2+1)-15, 630);
		fill(statusColor[3]);
		text('Dead', 100*(3+1)-15, 630);
	}

	fill(220);
	rect(55,650,155, 50);
	rect(315,650,155, 50);
	fill('Black');
	textSize(14);
	text("SPECIES", 98, 665);
	text("STATUS", 368, 665);

	rotate(PI/2);
	textSize(16);
	fill('black');
	text("BRONX", 20, -30);
	text("BROOKLYN", 140, -30);
	text("MANHATTAN", 260, -30);
	text("QUEENS", 380, -30);
	text("STATEN ISLAND", 490, -30);
}

function speciesRawView(){
	state = 0;
	loop();
}

function speciesAggregateView(){
	state = 1;
	loop();
}

function statusRawView(){
	state = 2;
	loop();
}

function statusAggregateView(){
	state = 3;
	loop();
}