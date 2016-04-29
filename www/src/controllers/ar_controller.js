angular.module('artoolkit')
    .controller('ARCtrl', function($scope, ARObject) {


    var object= ARObject.createIcosahedron();
    var clock = new THREE.Clock();

    $scope.onUpdate=function(){
        THREE.AnimationHandler.update( clock.getDelta() );
    }


    $scope.actions={

        onCreate:function(view, marker){
            console.log("create")
            view.add(object);
        },
        onUpdate:function(view, marker){
            console.log("update")


        },
        onDestroy:function(view, marker){
            console.log("remove")
            view.remove(object);
        }


    }

    $scope.onInit=function(view){
        var loader = new THREE.ColladaLoader();
       
        loader.load( "./assets/models/collada/avatar.dae", function ( collada ) {

            collada.scene.traverse( function ( child ) {

                if ( child instanceof THREE.SkinnedMesh ) {

                    var animation = new THREE.Animation( child, child.geometry.animation );
                    animation.play();

                    view.camera.lookAt( child.position );

                }

            } );

            view.add( collada.scene );

        } );

    }

});
