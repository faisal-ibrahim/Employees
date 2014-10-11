
// var EmployeeListCtrl = ('$scope', 'Employees', function($scope, Employees) {
// 	$scope.employees = Employees.query();	/* finds all employees in the system */
// 	$scope.orderProp = "firstname";
// 	$scope.ascending = false;
// });

var EmployeeListCtrl = ('$scope', '$http', 'Employees', function($scope, $http, Employees) {
	var loadData = function() {
		$http.get("employees/").success(function(data) {
			$scope.employees = data;
		});
	};

	loadData();

	$scope.orderProp = "firstname";
	$scope.ascending = false;
	$scope.removeEmployee = function(employeeId) {
		if (confirm("Delete employee? Are you sure?")) {
			Employees.remove({ id: employeeId });
			//Employees.delete({ id: employeeId });	/* does the exact same thing as the code above */

			loadData();
		}
	}
});

var EditEmployeeCtrl = ('$scope', 'Employees', '$routeParams', '$location', function($scope, Employees, $routeParams, $location) {
	if ($routeParams.id) {
		$scope.employee = Employees.get({ id: $routeParams.id }, function(employee) {
			$scope.updateEmployee = function() {
				Employees.update({ id: employee._id }, employee, function() {
					$location.path("/");
				});
			};
			$scope.removeEmployee = function() {
				if (confirm("Delete employee? Are you sure?")) {
					Employees.remove({ id: employee._id });
					//Employees.delete({ id: employee._id });	/* does the exact same thing as the code above */

					$location.path("/");	/* redirect to home */
				}
			}
		});
	}

	$scope.addEmployee = function() {
		Employees.save($scope.employee);
		$location.path("/");
	};
});
