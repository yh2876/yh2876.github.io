var headlines = [];
var abstract = [];

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
}

function draw() {
  background(240);

  var lineheight = 24;
  var margin = 40;
  translate(margin, margin);

  for (var i = 0; i < headlines.length; i++) { // i++ = i+1, i-- = i-1
    // draw headline
    if(i < 30) { // show only 30 rows
      fill(193,48,108);
      text(i+1,0,i*lineheight); // show row number
      text(headlines[i], 20, i*lineheight);
      if (mouseX >= 40 && mouseX-40-20<textWidth(headlines[i]) && mouseY-40 >= (i-1)*lineheight && mouseY-40 < i*lineheight) {
        fill(0);
        rect(mouseX-40-5,mouseY-40+12,width-mouseX-30+5,12+lineheight*(int(textWidth(abstract[i])/(width-mouseX-30))));
        fill(255);
        text(abstract[i],mouseX-40,mouseY-40+lineheight,width-mouseX-30);
      }
    }
  }
}


function extractHeadlines() {

  for (var i = 0; i < response.results.length; i++) {
    var h = response.results[i].title;
    // view full API response:
    // see http://developer.nytimes.com/top_stories_v2.json#/Console/GET/%7Bsection%7D.%7Bformat%7D
    // besides .title, other text data available to you include:
    // section, subsection, abstract, url, byline, item_type, update_date ...
    append(headlines, h);
  }
}

function extractAbstract() {
  for (var i = 0; i < response.results.length; i++) {
    var a = response.results[i].abstract;
    // view full API response:
    // see http://developer.nytimes.com/top_stories_v2.json#/Console/GET/%7Bsection%7D.%7Bformat%7D
    // besides .title, other text data available to you include:
    // section, subsection, abstract, url, byline, item_type, update_date ...
    append(abstract, a);
  }
}