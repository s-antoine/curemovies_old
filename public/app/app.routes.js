angular.module('cureMovie')
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		redirectTo: '/auth'
	})
	.when('/movie', {
		templateUrl: 'app/components/home/homeView.html',
		controller: 'homeController'
	})
	.when('/auth', {
		templateUrl: 'app/components/auth/authView.html',
		controller: 'authController'
	})
	.otherwise({redirectTo: '/'}); 

	$locationProvider.html5Mode(true);
}])
.run(function($rootScope, $http, $location, $localStorage) {
	if($localStorage.currentUser) {
		$http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
	}

	$rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/auth'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/auth');
            }
    });	
});