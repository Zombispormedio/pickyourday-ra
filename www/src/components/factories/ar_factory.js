angular.module('artoolkit')
    .factory('AR', function(ARCamera, ARDetector, AR3D, ARMarker) {

    var canvas, context, detector, view, actions, update;
    var init=function(glCanvas, marker_actions, onInit, onUpdate){

        marker_actions=marker_actions ||{}
        actions={}; 

        update=onUpdate;

        canvas=document.createElement("canvas");
        var cameraDimensions=ARCamera.getDimensions();

        canvas.width = cameraDimensions.width;
        canvas.height = cameraDimensions.height;

        context=canvas.getContext("2d");

        detector=ARDetector.create(canvas);

        view=AR3D.create(glCanvas, cameraDimensions, canvas);

        actions.onCreate=ARMarker.Primitive(view, marker_actions.onCreate||ARMarker.onCreate);
        if( (marker_actions.onCreate &&  marker_actions.onUpdate && marker_actions.onDestroy) || !marker_actions.onCreate){
            actions.onUpdate=ARMarker.Primitive(view, marker_actions.onUpdate||ARMarker.onUpdate);
            actions.onDestroy=ARMarker.Primitive(view, marker_actions.onDestroy||ARMarker.onDestroy); 
        }


        if(onInit)onInit(view);

    }

    var tick=function(){
        ARCamera.copyToContext(context);
        canvas.changed=true;

        detector.detect(actions.onCreate, actions.onUpdate, actions.onDestroy);

        view.update();

        if(update)update();

        view.render();


        window.requestAnimationFrame(tick);
    }

    return {
        init:init,
        tick:tick,
        view:view
    }

});