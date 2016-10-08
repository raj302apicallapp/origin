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
})
.animation('.slide-animation', function () {
        return {
            addClass: function (element, className, done) {
                if (className == 'ng-hide') {
                    // ANIMATION CODE GOES HERE
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                if (className == 'ng-hide') {
                    // ANIMATION CODE GOES HERE
                }
                else {
                    done();
                }
            }
        };
      });
