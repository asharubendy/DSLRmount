//requires filepath for gphoto
var fs = require('fs');
//requires the ghpto library
var gphoto2 = require('gphoto2');
//creates a new instance of gphoto
var GPhoto = new gphoto2.GPhoto2();
//camera initalisation
var camera;
//requires johnny five library
const { Board, Servo}= require("johnny-five");
//creates new instance of the arduino
const board = new Board();
//function to return a list of attached cameras
//(note to self: remember to write a script that kills off the local gphoto process to prevent conflicts)
GPhoto.list(function (list) {
//if the list has 0 items, return camera not found  
    if (list.length === 0) return console.log("camera not found");
//else set the camera variable to the camera found at list position 0     
    camera = list[0];
//lists the model of camera    
    console.log('Found', camera.model)});
//function that takes the photo
function capture(){
    camera.takePicture({
      //downloads to the attached device (raspberry pi in this case)
        download: true,
      //keeps local copy on the camera for redundency  
        keep: true
      }, function (er, data) {
        //writes the file
        fs.writeFileSync(__dirname + '/picture.jpg', data);
      });
}
//simple wait function, this is to make sure the camera is actually set before the photo is taken. eventually will be changed so it simply waits for the camera but this is a simple solution whilst in development 
function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }

  async function takephoto() {
    console.log('calling');
    const result = await resolveAfter2Seconds();
    capture();
  }
  
  takephoto();