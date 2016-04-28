angular.module('artoolkit')
    .config(function($stateProvider, $urlRouterProvider, $httpProvider){
    
     $stateProvider
        .state("login", {
        url: "/login",
        onEnter: function ($rootScope) {
            if (getJSONLocal("user")) {

                $rootScope.go("app.ar");
            }
        },
        templateUrl: 'src/views/login/main.html',
        controller: 'LoginCtrl'      

    })
        .state("app", {
        url: '/',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        templateUrl: 'src/views/main.html',
        controller: 'AppCtrl',
        abstract:true

    })
         .state("app.ar", {
        url: 'ar',
        onEnter: function ($rootScope) {
            if (!getJSONLocal("user")) {

                $rootScope.go("login");
            }
        },
        views: {
            content: {
                templateUrl: 'src/views/ar/main.html',
                controller: 'ARCtrl'
            }
        }  
    })
    
     $urlRouterProvider.otherwise("/login");

    $httpProvider.interceptors.push('AuthInterceptor');
});