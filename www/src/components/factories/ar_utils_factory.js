angular.module('artoolkit')
    .factory('ARUtils', function($ionicPlatform) {

    var size=function(elem){
            elem.width=window.innerWidth;
            elem.height=window.innerHeight;
        }
    return {
        size:size, 
        setVideoSize:function(){

            size(document.getElementById('video'));

        }
    }
});
