angular.module('ar-toolkit')
    .factory('ARUtils', function() {

    return {
        fullPage:function(elem){
            elem.width=window.innerWidth;
            elem.height=window.innerHeight;
        }
    }
});