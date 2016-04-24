angular.module('ar-toolkit')
    .controller('ARController', function($scope, ARObject) {


    var object= ARObject.createIcosahedron();


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

});
