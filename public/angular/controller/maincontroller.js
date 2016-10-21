var app=angular.module('app',['ngRoute','ngStorage','ngMaterial','ngMessages','ngAnimate','ui.bootstrap','mdPickers']);

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


app.controller('homecontroller',function($scope,$http,$localStorage,$timeout,$interval,$mdpDatePicker,$mdpTimePicker){
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

var test;
$scope.countdownstatus = true;
$scope.countupstatus = true;
$scope.cancelcountstatus = true;
$scope.counterbuttonstatus = false;
$scope.actualtimestatus = false;
$scope.fulltimerstatus = true;
$scope.cancelalltimerstatus = true;
$scope.inputcountdownstatus = true;
$scope.inputcountupstatus = true;
$scope.bulbonbuttonstatus = false;
$scope.bulboffbuttonstatus = false;
$scope.timerbuttonstatus = false;
$scope.datetimestatus = true;
$scope.flickerstatus = false;
$scope.countindownstatus = true;
$scope.countingupstatus = true;
$scope.disableonbutton = false;
$scope.disabledoffbutton = true;
$scope.disablecountdown = false;
$scope.disablecountup = false;
$scope.disablecounterbutton = true;
$scope.disablesetcountdowntimer = true;
$scope.disableflickeron = false;
$scope.disableflickeroff = true;
$scope.disabletimerbutton = false;
$scope.statusoffulltimer = function(){
  $scope.flickerstatus = true;
  $scope.bulbonbuttonstatus = true;
$scope.bulboffbuttonstatus = true;
$scope.timerbuttonstatus = true;
  $scope.fulltimerstatus = false;
  $scope.cancelalltimerstatus = false;
  $scope.fulltimerstatus = false;
   $scope.countdownstatus = true;
$scope.countupstatus = true;
$scope.cancelcountstatus = true;
$scope.actualtimestatus = false;
$scope.counterbuttonstatus = false;
$scope.cancelalltimerstatus = false;
}
$scope.counterbutton = function()
{
  $scope.countdownstatus = false;
$scope.countupstatus = false;
$scope.cancelcountstatus = false;
$scope.actualtimestatus = true;
$scope.counterbuttonstatus = true;
}
$scope.cancelcounterbutton = function()
{
  $scope.disablecountdown = false;
  $scope.disablecountup = false;
  $scope.countindownstatus = true;
  $scope.countingupstatus = true;
  $scope.inputcountdownstatus = true;
  $scope.inputcountupstatus = true;
  $scope.countdownstatus = true;
$scope.countupstatus = true;
$scope.actualtimestatus = false;
$scope.cancelcountstatus = true;
$scope.counterbuttonstatus = false;
if (angular.isDefined(test)) {
            $interval.cancel(test);
            test = undefined;
          }
  $scope.countingdown = null;
  $scope.countingup = null;
  $scope.countdownvalue = undefined;
  $scope.countupvalue = null;
}
$scope.cancelalltimer = function()
{
  $scope.disablecountdown = false;
  $scope.disablecountup = false;
  $scope.countindownstatus = true;
  $scope.countingupstatus = true;
   if (angular.isDefined(test)) {
            $interval.cancel(test);
            test = undefined;
          }
  $scope.countingdown = null;
  $scope.countingup = null;
  $scope.countdownvalue = undefined;
  $scope.countupvalue = null;
  $scope.flickerstatus = false;
  $scope.datetimestatus = true;
  $scope.bulbonbuttonstatus = false;
$scope.bulboffbuttonstatus = false;
$scope.timerbuttonstatus = false;
  $scope.fulltimerstatus = true;
   $scope.countdownstatus = true;
$scope.countupstatus = true;
$scope.cancelcountstatus = true;
$scope.actualtimestatus = true;
$scope.counterbuttonstatus = true;
$scope.cancelalltimerstatus = true;
$scope.inputcountupstatus = true;
$scope.inputcountdownstatus = true;
}
$scope.countdowntimerbutton = function()
{
  $scope.disablesetcountdowntimer = false;
  $scope.disablecountdown = true;
  $scope.inputcountdownstatus = false;
  $scope.countupstatus = true;
}
$scope.countuptimerbutton = function()
{
  $scope.disablecountup = true;
  $scope.inputcountupstatus = false;
  $scope.countdownstatus = true;
}
$scope.activatedatetime = function()
{
  $scope.datetimestatus = false;
}
$scope.bulbcontrol = function()
{
  if($scope.isbulbActive == true)
  {
    console.log("value of bulb is"+$scope.isbulbActive);
     $http.post('/glowbulbon').success(function(response){
         console.log(response);
       });
  }
  if($scope.isbulbActive == false)
  {
    $http.post('/glowbulboff').success(function(response){
         console.log(response);
       });
  }
}
$scope.bulbon = function()
{
  console.log("bulbon called");
  $http.post('/glowbulbon').success(function(response){
         console.log(response);
         $scope.disabledoffbutton = false;
         $scope.disableonbutton = true;
       });

}
$scope.bulboff = function()
{
  console.log("bulboff called");
  $http.post('/glowbulboff').success(function(response){
         console.log(response);
         $scope.disableonbutton = false;
         $scope.disabledoffbutton = true;
       });

}
$scope.bulbflicker = function()
{
  $scope.disableonbutton = true;
  $scope.disabletimerbutton = true;
  $http.post('/bulbflicker').success(function(response){
         console.log(response);
         $scope.disableflickeron = true;
         $scope.disableflickeroff = false;
       });
}
$scope.bulbflickeroff = function()
{
  $scope.disableonbutton = false;
  $scope.disabletimerbutton = false;
  $http.post('/bulbflickeroff').success(function(response){
         console.log(response);
         $scope.disableflickeron = false;
         $scope.disableflickeroff = true;
       });
}
$scope.fancontrol = function()
{
  if($scope.isfanActive == true)
  {
    console.log("value of bulb is"+$scope.isbulbActive);
     $http.post('/glowfanon').success(function(response){
         console.log(response);
       });
  }
  if($scope.isfanActive == false)
  {
    $http.post('/glowfanoff').success(function(response){
         console.log(response);
       });
  }
}
// $scope.countingdown = 0;
$scope.setcountdown = function()
{
  $scope.disablecounterbutton = false;
  $scope.countindownstatus = false;
  $scope.countingdown = $scope.countdownvalue;
  test = $interval(function() 
    {if($scope.countdownvalue>0)
      {
        $scope.countingdown = $scope.countingdown-1;
      }
      else
        {
          $scope.countingdown = $scope.countingdown;
        }}, 100, $scope.countdownvalue);
  test.then(executebulbon);
}
$scope.setcountup = function()
{
  $scope.disablecounterbutton = false;
  $scope.countingupstatus = false;
  $scope.countingup = 0;
  test1 = $interval(function(){
    if($scope.countingup<$scope.countupvalue)
    {
      $scope.countingup = $scope.countingup+1;
    }
    else
    {
      $scope.countingup = $scope.countingup;
    }
},100,$scope.countupvalue);
  test1.then(executebulboff);
}
$scope.$on('$destroy',function(){

});
function countdown()
{
  $scope.countingdown = $scope.countingdown-1;
}
function executebulbon()
{
  console.log("executebulbon function is called after finish");
}
function executebulboff()
{
  console.log("executebulboff function is called after finish");
}


    // $scope.currentDate = new Date();
    // this.showDatePicker = function(ev) {
    //   $mdpDatePicker($scope.currentDate, {
    //     targetEvent: ev
    //   }).then(function(selectedDate) {
    //     $scope.currentDate = selectedDate;
    //   });;
    // };
    
    // this.filterDate = function(date) {
    //   return moment(date).date() % 2 == 0;
    // };
    
    // this.showTimePicker = function(ev) {
    //   $mdpTimePicker($scope.currentTime, {
    //     targetEvent: ev
    //   }).then(function(selectedDate) {
    //     $scope.currentTime = selectedDate;
    //   });;
    // }  





})
.config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

  });

