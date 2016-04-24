angular.module('ar-toolkit')
    .factory('ARUtils', function($ionicPlatform) {

    var size=function(elem){
            elem.width=window.innerWidth;
            elem.height=window.innerHeight;
        }
    return {
        size:size, 
        setVideoSize:function(){

            size(document.getElementById('video'));

        }
    }
});

THREE.Matrix4.prototype.setFromArray = function(m) {
    return this.set(
        m[0], m[4], m[8], m[12],
        m[1], m[5], m[9], m[13],
        m[2], m[6], m[10], m[14],
        m[3], m[7], m[11], m[15]
    );
}

THREE.Object3D.prototype.transformFromArray = function(m) {
    this.matrix.setFromArray(m);
    this.matrixWorldNeedsUpdate = true;
}