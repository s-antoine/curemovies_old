angular.module('cureMovie').controller('authController',  ['$scope', '$http', '$localStorage', '$location', function($scope, $http, $localStorage, $location) {
	$scope.firstname = "";
	$scope.lastname = "";
	$scope.mail = "";
	$scope.password = "";

	$scope.register = function() {
		var data = {
			firstname: $scope.firstname,
			lastname: $scope.lastname,
			mail: $scope.mail,
			password: $scope.password	
		};

		$http.post('/api/register', data)
			.then(function(response) {
				console.log('Success:' + response);

				if(response.data.token) {
					$localStorage.currentUser = { mail: $scope.mail, token: response.data.token };
					$http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
				
					$location.path('/movie');
				}
			})
			.catch(function(response) {
				console.log('Error:' + response);
			});
	};

	$scope.login = function() {
		var data = {
			mail: $scope.mail,
			password: $scope.password	
		};

		$http.post('/api/login', data)
			.then(function(response) {
				console.log('Success:' + response.data);
					
				if(response.data.token) {
					$localStorage.currentUser = { mail: $scope.mail, token: response.data.token };
					$http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
				
					$location.path('/movie');
				}
			})
			.catch(function(response) {
				console.log('Error:' + response);
			});
	};
}]);