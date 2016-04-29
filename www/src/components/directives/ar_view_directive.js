angular.module('artoolkit')
    .directive('arView', function(ARUtils, ARCamera, AR, $ionicPlatform) {

    return {
        restrict: 'A',
         scope:{
            actions:"=actions",
             onUpdate:"=onUpdate",
             onInit:"=onInit"
        },
        link:function(scope, tElement, attrs){
            var elem=tElement[0];
            
          
            $ionicPlatform.ready(function() {
                ARUtils.size(elem);
                ARUtils. setVideoSize();
                ARCamera.wait(function(){
                    AR.init(elem, scope.actions, scope.onInit, scope.onUpdate);
                    AR.tick();
                });

            });

        }
    };

});