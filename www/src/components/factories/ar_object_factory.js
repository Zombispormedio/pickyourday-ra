angular.module('ar-toolkit')
    .factory('ARObject', function() {

    function createContainer() {
        var model = new THREE.Object3D();
       
        return model;
    }

    function createCube(color) {
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: color} );
        var cube = new THREE.Mesh( geometry, material );
        cube.position.z=-5;
        return cube;
    }

    function createMarkerObject(params) {

        return createCube(params.color);
    }


    return {
        create:createMarkerObject
    }
});