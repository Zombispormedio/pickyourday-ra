angular.module('ar-toolkit')
    .controller('ARController', function($scope) {


    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshPhongMaterial( { color: 0x7FCC19, shininess:230, wireframe:true} );
    var cube = new THREE.Mesh( geometry, material );
     cube.position.x=-1;
    cube.position.z=-5;

    
    $scope.actions={

        onCreate:function(view, marker){
            console.log("create")
            view.add(cube);
        },
        onUpdate:function(view, marker){
            console.log("update")
            cube.rotation.x += 0.1;
            cube.rotation.y += 0.1;

        },
        onDestroy:function(view, marker){
            console.log("remove")
            view.remove(cube);
        }     


    }

});