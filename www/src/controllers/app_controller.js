angular.module('artoolkit')
    .controller('AppCtrl', function($rootScope, $scope,  OauthService) {

      $rootScope.onModal=false;
   $scope.logout = function () {

		OauthService.logout().Session(function(result){
            var res = result;
            if (!res.error) {       
              	deleteLocal("user");
			 $rootScope.go("login");
            }

        });

	}
});
