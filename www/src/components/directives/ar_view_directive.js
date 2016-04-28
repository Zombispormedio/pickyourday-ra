angular.module('artoolkit')
    .directive('arView', function(ARUtils, ARCamera, AR, $ionicPlatform) {

    return {
        restrict: 'A',
         scope:{
            actions:"=actions"
        },
        link:function(scope, tElement, attrs){
            var elem=tElement[0];
            
            console.log(scope.actions)
            
            $ionicPlatform.ready(function() {
                ARUtils.size(elem);
                ARUtils. setVideoSize();
                ARCamera.wait(function(){
                    AR.init(elem, scope.actions);
                    AR.tick();
                });

            });

        }
    };

});