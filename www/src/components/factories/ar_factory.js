angular.module('ar-toolkit')
    .factory('AR', function(ARCamera, ARDetector, AR3D, ARMarker) {

    var canvas, context, detector, view, actions;
    var init=function(glCanvas, marker_actions){

        marker_actions=marker_actions ||{}
        actions={}; 

        canvas=document.createElement("canvas");
        var cameraDimensions=ARCamera.getDimensions();

        canvas.width = cameraDimensions.width;
        canvas.height = cameraDimensions.height;

        context=canvas.getContext("2d");

        detector=ARDetector.create(canvas);

        view=AR3D.create(glCanvas, cameraDimensions, canvas);

        actions.onCreate=ARMarker.Primitive(view, marker_actions.onCreate||ARMarker.onCreate);
        actions.onUpdate=ARMarker.Primitive(view, marker_actions.onUpdate||ARMarker.onUpdate);
        actions.onDestroy=ARMarker.Primitive(view, marker_actions.onDestroy||ARMarker.onDestroy);

    }

    var tick=function(){
        ARCamera.copyToContext(context);
        canvas.changed=true;

        detector.detect(actions.onCreate, actions.onUpdate, actions.onDestroy);

        view.update();
        view.render();


        window.requestAnimationFrame(tick);
    }

    return {
        init:init,
        tick:tick
    }

});