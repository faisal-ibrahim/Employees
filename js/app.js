angular.module("empMgr", ['employeeServices'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(false).hashPrefix('!');
		$routeProvider
			.when("/", {
				templateUrl: "templates/employee-list.html",
				controller: EmployeeListCtrl
			})
			.when("/new", {
				templateUrl: "templates/edit-employee.html",
				controller: EditEmployeeCtrl
			})
			.when("/edit/:id", {
				templateUrl: "templates/edit-employee.html",
				controller: EditEmployeeCtrl
			})
			.otherwise({
				redirectTo: "/"
			});
	}]);

