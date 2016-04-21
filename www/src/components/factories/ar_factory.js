angular.module('ar-toolkit')
    .factory('AR', function(ARCamera, ARDetector, AR3D, ARMarker) {

    var canvas, context, detector, view;
    var init=function(glCanvas){

        canvas=document.createElement("canvas");
        var cameraDimensions=ARCamera.getDimensions();
        console.log(cameraDimensions)
        canvas.width = cameraDimensions.width;
        canvas.height = cameraDimensions.height;

        context=canvas.getContext("2d");

        detector=ARDetector.create(canvas);

        view=AR3D.create(glCanvas, cameraDimensions, canvas);

        view.setCameraMatrix( detector.getCameraMatrix(10,1000) );

    }

    var tick=function(){
        ARCamera.copyToContext(context);
        canvas.changed=true;

        detector.detect(ARMarker.onCreate, ARMarker.onUpdate, ARMarker.onDestroy);
        
        view.update();
        view.render();


        window.requestAnimationFrame(tick);
    }

    return {
        init:init,
        tick:tick,
        getView:view
    }

});