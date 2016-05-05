angular.module('artoolkit')
    .controller('ARCtrl', function($rootScope, $scope, ARObject, $ionicLoading, CustomerService, $timeout, $ionicModal) {

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
    var default_duration=10;

    var clock = new THREE.Clock();

    $scope.onUpdate=function(){
        THREE.AnimationHandler.update( clock.getDelta() );
    }






    $scope.actions={

        onCreate:function(view, marker){


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
                    var data=res.data;

                    next(null,{url:data.collada, message:data.message, duration:data.duration});
                })
            }, function(worker, next){

                loader.load(worker.url, function(collada){
                    worker.collada=collada;
                    next(null, worker); 
                });



            }, function(worker, next){
                var collada=worker.collada;
                collada.scene.rotation.x=degInRad(-90);
                collada.scene.traverse( function ( child ) {


                    if ( child instanceof THREE.SkinnedMesh ) {

                        var animation = new THREE.Animation( child, child.geometry.animation );
                        animation.play();

                        view.camera.lookAt( child.position );

                        worker.scene=collada.scene;
                        worker.animation=animation;

                        next(null, worker);
                    }

                } );

                view.add( collada.scene );

            }


        ], function(_, result){
            onFinished(result, view);
        });
    }




    var onFinished=function(result, view){
        $scope.message=result.message;
        
        var duration=(result.duration||default_duration)*1000;

        $timeout(function(){

            result.animation.stop();
            view.remove(result.scene);
            openModal();
        }, duration)

        hideLoading();
    }


    $ionicModal.fromTemplateUrl('modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    var openModal = function() {
        $rootScope.onModal=true;
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $rootScope.onModal=false;
        starting=false;
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });














});



