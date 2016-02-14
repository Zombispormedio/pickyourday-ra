#Pick Your Day

##Realidad Aumentada en Aplicaciones Híbridas

npm install ionic cordova -g 

###Start Ionic App
ionic start myApp blank
cd myApp
npm install
bower install
ionic serve --lab

####Preconfiguration Android

ionic platform add android
cordova plugin add cordova-custom-config
#####Config.xml 
`<preference name="android-manifest/@android:installLocation" value="preferExternal"/> `

adb devices
ionic run android


###Crosswalk

cordova plugin add cordova-plugin-crosswalk-webview
ionic run android 
chrome://inpect/#devices

###Camera
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-media-capture

  `<preference name="android-manifest/uses-permission/@android:name" value="android.permission.CAMERA" />`

