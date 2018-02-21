var headlines = [];
var abstract = [];
var section = [];
var maxHeadLen, minHeadLen;

function preload() {

  // Assemble url for API call
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  var apikey = "1c801111dd364dd3ae6e7dbc08742f58"; // see: https://developer.nytimes.com
  url += "?api-key=" + apikey;

  response = loadJSON(url);
  // loadJSON() is asynchronous, but calling it inside preload() guarantees
  // we'll have a response before setup() and draw() is run.
}

function setup() {
  createCanvas(640, 800);
  background(240);

  textFont('Helvetica');
  textSize(12);
  textAlign(LEFT);

  extractHeadlines();
  extractAbstract();
  extractSection();
}

function draw() {
  background(240);

  var lineheight = 24;
  var margin = 40;
  translate(margin, margin);

  for (var i = 0; i < headlines.length; i++) { // i++ = i+1, i-- = i-1

    // draw circle representing headline length
    // normalize the length of headings
    var circleRadius = map(headlines[i].length,minHeadLen, maxHeadLen, margin, width-margin*2);
    noFill();
    stroke(100);
    if (i<30) {ellipse(i*12,i*lineheight,circleRadius/8,circleRadius/8);}

    // draw headline
    if(i < 30) { // show only 30 rows
      noStroke();
      fill(193,48,108);
      text(i+1,0,i*lineheight); // show row number
      text(headlines[i], 20, i*lineheight);
    }
  }

  for (var i = 0; i < headlines.length; i++) { // i++ = i+1, i-- = i-1
    // draw abstracts and url
    if(i < 30) {
      if (mouseX >= 40 && mouseX-40-20<textWidth(headlines[i]) && mouseY-40 >= (i-1)*lineheight && mouseY-40 < i*lineheight) {
          fill(100);
          rect(mouseX-40-5,mouseY-40+12,width-mouseX-30+5,lineheight*(2+int(textWidth(abstract[i])/(width-mouseX-30))));
          fill(255);
          text('Abstract:  '+abstract[i],mouseX-40,mouseY-40+lineheight*2,width-mouseX-30);
          fill('yellow')
          text('Section:  '+section[i],mouseX-40,mouseY-40+lineheight,width-mouseX-30);
      }
    }
  }
}


function extractHeadlines() {

  for (var i = 0; i < response.results.length; i++) {
    var h = response.results[i].title;
    append(headlines, h);

    if (!maxHeadLen) {
      maxHeadLen = h.length;
    } else if (h.length > maxHeadLen) {
      maxHeadLen = h.length;
    }

    if (!minHeadLen) {
      minHeadLen = h.length;
    } else if (h.length < minHeadLen) {
      minHeadLen = h.length;
    }
  }
}

function extractAbstract() {
  for (var i = 0; i < response.results.length; i++) {
    var a = response.results[i].abstract;
    append(abstract, a);
  }
}

function extractSection() {
  for (var i = 0; i < response.results.length; i++) {
    var s = response.results[i].section;
    append(section, s);
  }
}