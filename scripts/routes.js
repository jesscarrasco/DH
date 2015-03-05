var app=angular.module('single-page-app',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/result',{
			templateUrl: 'result.html'
		});
});



app.controller('cfgController',function($scope){
	//(...)
});