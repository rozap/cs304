var controllers = angular.module('controllers', []);

controllers.controller('GameListControl', ['$scope', '$http',
	function GameListControl($scope, $http) {
		console.log("WHTUASIH")
		$http.get('phones/phones.json').success(function(data) {
			$scope.phones = data;
		});

		$scope.orderProp = 'age';
	}
]);

controllers.controller('GameControl', ['$scope', '$routeParams',
	function($scope, $routeParams) {
		$scope.phoneId = $routeParams.phoneId;
	}
]);