angular.module('ar-toolkit')
    .directive('arView', function(ARUtils, ARCamera, AR) {

    return {
        restrict: 'A',
        link:function(scope, tElement, attrs){
            var elem=tElement[0];
            
            ARCamera.wait(function(){
                /*AR.init(elem);
                AR.tick();*/
            });
            
            
        }
    };

});