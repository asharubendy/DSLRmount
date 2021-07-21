let video;
let detector;
let detections = [];
//preloading the model
function preload() {  
  detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}
//setting up the canvas
function setup() {
  //creates small canvas
  createCanvas(640, 480);
  //creates a new html5 video element that contains the visual feed from a webcam
  video = createCapture(VIDEO);
  //sets size
  video.size(640, 480);
  video.hide();
  //calls the detection function in the model
  detector.detect(video, gotDetections);
}
//drawing tracking boxes and labels
function draw() {
  image(video, 0, 0);

  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
    if(object.label == "bird"){

    }
  }
}

