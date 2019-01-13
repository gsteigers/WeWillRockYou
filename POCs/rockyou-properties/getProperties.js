require('./index');
var PropertiesReader = require('properties-reader');
var ffmpeg = require('fluent-ffmpeg');

var properties = PropertiesReader('./assets/test1.MOV');
var length = properties.length;

// ffmpeg.setFfprobePath("c:\\program files\\ffmpeg\\bin\\ffprobe.exe");
ffmpeg.ffprobe('./assets/test1.MOV',function(err, metadata) {
    if(err) {
        console.log(err);
    }
    console.log("--------------- Video1.MOV ---------------")
    console.log(metadata);
    console.log("------------------------------------------")
  });

  ffmpeg.ffprobe('./assets/test2.mp4',function(err, metadata) {
      if(err) {
          console.log(err);
      }
      console.log("--------------- Video2.mp4 ---------------")
      console.log(metadata);
      console.log("------------------------------------------")
  });