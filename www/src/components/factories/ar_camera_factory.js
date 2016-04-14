angular.module('ar-toolkit')
    .factory('ARCamera', function( ARUtils) {

    var video= document.createElement('video');
    ARUtils.fullPage(video);

    var getMediaCapture = function(t, onsuccess, onerror) {
        var result = undefined;
        if (navigator.getUserMedia) {
            result = navigator.getUserMedia(t, onsuccess, onerror);
        } else if (navigator.webkitGetUserMedia) {
            result = navigator.webkitGetUserMedia(t, onsuccess, onerror);
        } 
        return result;
    };

    var onSuccess=function(cb){
        return function(stream){
            var vendorURL = window.URL || window.webkitURL;
            video.src = vendorURL.createObjectURL(stream);
            video.play();
            cb();
        }

    }
    var onError=function(err){
        console.log("An error occured! " + err);
    }


    var waitCamera=function(callback){

        getMediaCapture({video: true,audio: false}, onSuccess(callback), onError);

    }

    var getDimensions = function() {
        return {
            width:video.width,
            height:video.height
        }
    }

    var copyToContext=function(context){
        context.drawImage(video, 0,0);
    }

    return {
        wait:waitCamera,
        copyToContext:copyToContext,
        getDimensions:getDimensions
    }

});