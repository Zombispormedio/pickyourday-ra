angular.module('ar-toolkit')
    .factory('ARMarker', function() {


    var onCreate=function(marker){
        console.log(marker);
    }

    var onUpdate=function(marker){
        console.log(marker);
    }

    var onDestroy=function(marker){
        console.log(marker);
    }
    return {
        onCreate:onCreate,
        onUpdate:onUpdate,
        onDestroy:onDestroy
    }
});