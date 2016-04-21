angular.module('ar-toolkit')
    .factory('ARObject', function() {

     function createContainer() {
        var model = new THREE.Object3D();
        model.matrixAutoUpdate = false;
        return model;
    }

    function createMarkerMesh(color) {
        var geometry = new THREE.CubeGeometry( 100,100,100 );
        var material = new THREE.MeshPhongMaterial( {color:color, side:THREE.DoubleSide } );

        var mesh = new THREE.Mesh( geometry, material );                      
        mesh.position.z = -50;

        return mesh;
    }

    function createMarkerObject(params) {
        var modelContainer = createContainer();

        var modelMesh = createMarkerMesh(params.color);
        modelContainer.add( modelMesh );

        function transform(matrix) {
            modelContainer.transformFromArray( matrix );
        }

        return {
            transform: transform,
            model: modelContainer
        }
    }


    return {
        create:createMarkerObject
    }
});