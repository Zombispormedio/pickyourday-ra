angular.module('ar-toolkit')
    .directive('arView', function(ARUtils, ARCamera, AR, $ionicPlatform) {

    return {
        restrict: 'A',
        link:function(scope, tElement, attrs){
            var elem=tElement[0];
            $ionicPlatform.ready(function() {
                ARUtils.size(elem);
                ARUtils. setVideoSize();
                ARCamera.wait(function(){
                    AR.init(elem);
                    AR.tick();
                });

            });







        }
    };

});