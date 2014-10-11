angular.module("employeeServices", ["ngResource"])
	.factory("Employees", ['$resource', function($resource) {
		return $resource("employees/:id", { }, {
			//getAll: { method: 'GET', params: { id: "" }, isArray: true },
			update: { method: 'PUT', isArray: false }
		});
	}]);

