angular.module('ar-toolkit')
    .factory('ARObject', function() {

    function createContainer() {
        var model = new THREE.Object3D();
       
        return model;
    }

    function createMarkerMesh(color) {
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: color} );
        var cube = new THREE.Mesh( geometry, material );
        cube.position.z=-5;
        return cube;
    }

    function createMarkerObject(params) {

        var modelMesh = createMarkerMesh(params.color);
           

        return {
           
            model: modelMesh
        }
    }


    return {
        create:createMarkerObject
    }
});