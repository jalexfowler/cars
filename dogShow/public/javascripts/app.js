angular.module('dogshow',[])

.controller('MainCtrl', [
	'$scope', '$http',
	function($scope, $http){
	$scope.dogs=[];
	$scope.addDog=function(){
		console.log("add dog");
		var newdog= {name: $scope.name, breed: $scope.breed, upvotes: 0};
		$scope.name='';
		$scope.breed='';
		$http.post('/dogs', newdog).success(function(data){
			$scope.dogs.push(data);
		});
	};
	$scope.delete= function(dog){
		$http.delete('/dogs/' +dog._id)
			.success(function(data){
				console.log("delete worked");
			});
		$scope.getAll();
	};
	$scope.upvote = function(dog){
		return $http.put('/dogs/' + dog._id +'/upvote')
			.success(function(data){
				console.log("upvote worked");
				dog.upvotes=data.upvotes;
			});
		};
		$scope.incrementUpvotes = function(dog) {
			$scope.upvote(dog);
		};
		$scope.getAll = function(){
			return $http.get('/dogs').success(function(data){
				angular.copy(data, $scope.dogs);
			});
		};
		$scope.getAll();
	}
]);
