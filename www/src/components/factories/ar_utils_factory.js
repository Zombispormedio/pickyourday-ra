angular.module('ar-toolkit')
    .factory('ARUtils', function($ionicPlatform) {

    return {
        size:function(elem){
            elem.width=window.innerWidth;
            elem.height=window.innerHeight;

            $ionicPlatform.ready(function() {
                 elem.width=window.innerWidth;
            elem.height=window.innerHeight;
            });
        }
    }
});