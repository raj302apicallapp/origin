var app=angular.module('app',['ngRoute','ngStorage','ngMaterial','ngMessages','ngAnimate','ui.bootstrap']);

app.config(function($routeProvider){
  //set up routes
$routeProvider
.when('/',{
  templateUrl: 'angular/view/home.html',
  controller: 'homecontroller'
})
.otherwise({
  redirectTo: '/'
});
})
.run( function($rootScope, $location,$localStorage,$window,$timeout) {
});


app.controller('homecontroller',function($scope,$http,$localStorage,$timeout){
console.log("i am inside the home controller");
var slides = [
  {image: 'image/r1.png', description: 'image 0'},
  {image: 'image/r5.jpg', description: 'image 1'},
  {image: 'image/r6.jpg', description: 'image 2'},
  {image: 'image/r7.jpg', description: 'image 3'}];
  $scope.currentIndex = 0;

  var INTERVAL = 3000;

  function setCurrentSlideIndex(index) {
    $scope.currentIndex = index;
}
function isCurrentSlideIndex(index) {
    return $scope.currentIndex === index;
}
function nextSlide() {
    $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
    $timeout(nextSlide, INTERVAL);
}
function loadSlides() {
    $timeout(nextSlide, INTERVAL);
}
$scope.slides = slides;
$scope.currentIndex = 0;
$scope.setCurrentSlideIndex = setCurrentSlideIndex;
$scope.isCurrentSlideIndex = isCurrentSlideIndex;
loadSlides();
$scope.bulbcontrol = function()
{
  if($scope.isbulbActive == true)
  {
    alert("bulb is switched on");
    console.log("value of bulb is"+$scope.isbulbActive);
     $http.post('/glowbulbon').success(function(response){
         console.log(response);
       });
  }
  if($scope.isbulbActive == false)
  {
    alert("bulb is switched off");
    $http.post('/glowbulboff').success(function(response){
         console.log(response);
       });
  }
}
$scope.fancontrol = function()
{
  if($scope.isfanActive == true)
  {
    alert("fan is switched on");
    console.log("value of bulb is"+$scope.isbulbActive);
     $http.post('/glowfanon').success(function(response){
         console.log(response);
       });
  }
  if($scope.isfanActive == false)
  {
    alert("bulb is switched off");
    $http.post('/glowfanoff').success(function(response){
         console.log(response);
       });
  }
}
});