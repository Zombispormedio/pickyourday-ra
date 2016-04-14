angular.module('ar-toolkit')
    .factory('AR', function(ARCamera, ARDetector, AR3D) {

    var canvas, context, detector, view;
    var init=function(glCanvas){

        canvas=document.createElement("canvas");
        var cameraDimensions=ARCamera.getDimensions();
        canvas.width = cameraDimensions.width;
        canvas.height = cameraDimensions.height;

        context=canvas.getContext("2d");
        
        detector=ARDetector.create(canvas);
        
        view=AR3D.create(glCanvas, cameraDimensions, canvas);

    }

    return {
        init:init
    }

});