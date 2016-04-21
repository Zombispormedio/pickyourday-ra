angular.module('ar-toolkit')
    .factory('ARUtils', function() {

    return {
        size:function(elem){
            elem.width=window.innerWidth;
            elem.height=window.innerHeight;
        }
    }
});