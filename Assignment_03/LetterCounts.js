var headlines = [];
var maxHeadLen, minHeadLen;

function preload() {

  // URL request via API
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  // see: https://developer.nytimes.com
  var apikey = "1c801111dd364dd3ae6e7dbc08742f58";
  url += "?api-key=" + apikey;

  response = loadJSON(url);
  // loadJSON() is asynchronous, but calling it inside preload() guarantees
  // we'll have a response before setup() and draw() is run.
}


function setup() {
  createCanvas(640, 800);
  background(240);

  textSize(12);
  textFont('Helvetica');
  textAlign(LEFT);

  // since we're not animating, one frame is sufficient: run draw() just once
  noLoop();

  extractHeadlines();
}


function draw() {

  background(240);

  // set the left and top margin
  var margin = 40;
  translate(margin, margin); // reset the zero point

  var lineheight = 24;

  for (var i = 0; i < headlines.length; i++) { // i++ = i+1, i-- = i-1

    // draw circle representing headline length
    // normalize the length of headings
    var circleRadius = map(headlines[i].length,minHeadLen, maxHeadLen, margin, width-margin*2);
    noFill();
    stroke(100);
    if (i<30) {ellipse(i*12,i*lineheight,circleRadius/8,circleRadius/8);}

    // draw headline text
    noStroke();
    fill(193,48,108);
    if (i<30) {
      text(i+1,0,i*lineheight);
      text(headlines[i], 20, i*lineheight);
    }
  }
}

function extractHeadlines() {

  for (var i = 0; i < response.results.length; i++) {
    if (i<30) { var h = response.results[i].title; } // prepare 30 rows of record
    // view full API response:
    // see http://developer.nytimes.com/top_stories_v2.json#/Console/GET/%7Bsection%7D.%7Bformat%7D
    // besides .title, other text data available to you include:
    // section, subsection, abstract, url, byline, item_type, update_date ...

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
    append(headlines, h);
  }
}