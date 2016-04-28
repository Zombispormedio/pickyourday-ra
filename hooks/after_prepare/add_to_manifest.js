#!/usr/bin/env node

// Adds lines to the Android Manifest if they are not already there

const LINES_TO_ADD = [
    {
        text: ' android:installLocation="preferExternal"',
        after: '<manifest'
    }
];

const CAMERA='<uses-permission android:name="android.permission.CAMERA" />';
const VIDEO='<uses-permission android:name="android.permission.RECORD_VIDEO" />';

const MANIFEST = 'platforms/android/AndroidManifest.xml';

var fs = require('fs'),
  manifestText = fs.readFileSync(MANIFEST).toString();

LINES_TO_ADD.forEach(function(lineToAdd) {
  if(manifestText.indexOf(lineToAdd.text) === -1) {
    manifestText = manifestText.replace(lineToAdd.after, lineToAdd.after + lineToAdd.text);
  }
});

if(manifestText.indexOf(CAMERA)===-1){
	
	if(manifestText.indexOf(VIDEO)>-1){
		
		manifestText=manifestText.replace(VIDEO, VIDEO+"\n"+CAMERA);
	}

}

fs.writeFileSync(MANIFEST, manifestText);