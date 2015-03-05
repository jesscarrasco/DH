var app=angular.module('single-page-app',['ngRoute']);



app.controller('cfgController', function ($scope, $http, $q) {

	$scope.getResults = function() {
		$scope.result = [];
		$q.all([
			$http(
				{
					method: 'JSONP',
					url: 'http://strong-window-3577.herokuapp.com/twitter',
					params: {
						'q': encodeURIComponent( $scope.hashtag ),
						'count': 10,
						'callback': 'JSON_CALLBACK'
					}
				}
			)
			.success(
				function(data) {
					$scope.tweets = [];
					angular.forEach(data.tweets, function( tweet, key ){
						$scope.tweets.push( tweet );
					}); 
				}
			),

			$http(
				{
					method: 'JSONP',
					url: 'http://strong-window-3577.herokuapp.com/flickr',
					params: {
						'text': $scope.hashtag,
						'count': 10,
						'callback': 'JSON_CALLBACK'
					}
				}
			)
			.success(
				function(data) {
					$scope.photos = [];
					angular.forEach(data.photos, function( photo, key ){
						$scope.photos.push( photo );
					}); 
				}
			)
		]).then(function(){
			$scope.searchResults = [];
			angular.forEach( $scope.tweets,function( tweet, key ){
				$scope.searchResults.push({
		        	tweet: $scope.tweets[key],
		        	photo: $scope.photos[key]
		    	});				
			});

		});
	}	

});