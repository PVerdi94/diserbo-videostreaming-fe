declare var require: any;
declare var process: any;
import { Component, OnInit} from '@angular/core';

var exec = require('exec');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor() {}

  videoRef: any;
  ngOnInit(): void {
    this.videoRef = document.getElementById('video');
    console.log(this.videoRef);
    this.setupCamera();

  }

  setupCamera(){
    exec(['ls', '-lha'], function(err: any, out: any, code: any) {
      if (err instanceof Error)
        throw err;

      console.log(out)
      process.stderr.write(err);
      process.stdout.write(out);
      process.exit(code);
    });

    navigator.mediaDevices.getUserMedia({
      video:{width:300, height:250},
      audio:false
    }).then(videoStream =>{
      console.log(videoStream);
      const track = videoStream.getVideoTracks()[0];
      track.applyConstraints({
        advanced: [
            {}
        ]})
      this.videoRef.srcObject = videoStream;
      
    
    })
  }
}