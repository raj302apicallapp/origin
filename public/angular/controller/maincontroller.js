var app=angular.module('app',['ngRoute','ngStorage','ngMaterial','ngMessages','ngAnimate','ui.bootstrap','mdPickers']);

app.config(function($routeProvider){
  //set up routes
$routeProvider
.when('/',{
  templateUrl: 'angular/view/home.html',
  controller: 'homecontroller'
})
.when('/posts',{
  templateUrl: 'angular/view/posts.html',
  controller: 'homecontroller'
})
.when('/admin',{
  templateUrl: 'angular/view/admin.html',
  controller: 'homecontroller'
})
.when('/facebook',{
  templateUrl: 'angular/view/facebook.html',
  controller: 'homecontroller'
})
.otherwise({
  redirectTo: '/'
});
})
.run( function($rootScope, $location,$localStorage,$window,$timeout) {
});


app.controller('homecontroller',function($scope,$http,$localStorage,$timeout,$interval,$mdpDatePicker,$mdpTimePicker){
console.log("i am inside the home controller");


})
.config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });

