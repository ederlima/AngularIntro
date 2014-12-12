// JavaScript Document

(function(){
		//app 
		var app = angular.module('myApp', ['ngRoute']);

        app.config(function($routeProvider, $locationProvider){
				//$locationProvider.html5Mode(true);
				$routeProvider.when('/', {'templateUrl' : 'partials/list.html'}).
				when('/new', {'templateUrl':'partials/new.html'}).
				when('/edit/:id', {'templateUrl':'partials/edit.html'}).
				when('/remove/:id', {'templateUrl':'partials/remove.html'})
				;
			});

		//modules
		var simpleController = app.controller('SimpleController', ['$scope','$http', function($scope, $http){
				
				
				$scope.team = [ ];
				$http.get('team.json').success(function(data){
						$scope.team = data;
					});
			}]);
		
		//directives
		var includeForm = app.directive('includeForm', function($location){
				return {
					restrict : 'E',
					templateUrl : 'partials/include-form.html',
					controller: function($scope){
							$scope.people = {};
							$scope.addMember = function(team){
									$scope.team.push($scope.people);
									$scope.people = {};
									$location.path('/');
								};		
							//
						},
					controllerAs : 'peopleCtrl'
				}
			});
		var editForm = app.directive('editForm', function($location, $routeParams, $location){
				return {
					restrict: 'E',
					templateUrl : 'partials/edit-form.html',
					controller: function($scope) {
						$scope.editpeople = {};
						$scope.editpeople.name = $scope.team[$routeParams.id].name;
						$scope.editpeople.age = $scope.team[$routeParams.id].age;
						$scope.editpeople.specialization = $scope.team[$routeParams.id].specialization;
						//$scope.people = $scope.team[$routeParams.id];
						$scope.update = function()
						{
							$scope.team[$routeParams.id] = $scope.editpeople;
							$location.path('/');
						}
					},
					controllerAs : 'peopleEditCtrl'
				}
				
			});
		var removeForm = app.directive('removeForm', function(){
				return {
					restrict: 'E', 
					templateUrl: 'partials/remove-form.html', 
					controller: function($scope, $routeParams, $location) {
						$scope.people = $scope.team[$routeParams.id];
						$scope.remove = function()
						{
							$scope.team.splice($routeParams.id, 1);
							$location.path('/');
						}
					}
					
				}
			});
		var filterForm = app.directive('filterForm', function(){ //<filter-form>
				return {
					restrict: 'E', //<> //a <e attr>
					templateUrl: 'partials/filter-form.html',
					controller: function(){
						
						}
//					controllerAs
				}
			});
		
	})();