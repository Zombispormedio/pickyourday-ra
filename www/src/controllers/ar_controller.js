angular.module('artoolkit')
    .controller('ARCtrl', function($scope, ARObject, $ionicLoading, CustomerService, $timeout) {

    var loader = new THREE.ColladaLoader();
    var showLoading=function(){
        $ionicLoading.show({
            template: 'Loading...'
        });
    }

    var hideLoading=function(){
        $ionicLoading.hide();
    }

    var starting=false;

    var clock = new THREE.Clock();

    $scope.onUpdate=function(){
        THREE.AnimationHandler.update( clock.getDelta() );
    }
    
   


    $scope.actions={

        onCreate:function(view, marker){
            console.log("create")
            console.log(starting)
            if(!starting){
                starting=true;
                showLoading();
                startCollada(marker.id, view)
            }


        }


    }
    
    
   
    var startCollada=function(id, view){
        async.waterfall([
            function(next){
                CustomerService.AR().collada({marker_id:id}, function(res){

                    next(null, res.data.collada);
                })
            }, function(url, next){
             
                loader.load(url, function(collada){
                  
                    next(null, collada); 
                });



            }, function(collada, next){

                collada.scene.rotation.x=degInRad(-90);
                collada.scene.traverse( function ( child ) {
                 

                    if ( child instanceof THREE.SkinnedMesh ) {

                        var animation = new THREE.Animation( child, child.geometry.animation );
                        animation.play();

                        view.camera.lookAt( child.position );
                        next(null, {scene:collada.scene, animation:animation});
                    }

                } );

                view.add( collada.scene );

            }


        ], function(_, result){
            
            $timeout(function(){
                console.log("stop");
                result.animation.stop();
                view.remove(result.scene);
                starting=false;
            }, 1000)
            
            hideLoading();
        });
    }
    
    });



