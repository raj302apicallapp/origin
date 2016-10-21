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

$scope.myDate = new Date();
$scope.minDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth(),
      $scope.myDate.getDate());
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
$scope.disableactualtimerbutton = false;
$scope.inputcountdownstatusled1 = true;
$scope.inputcountupstatusled1 = true;
$scope.led1sliderstatus = true;
$scope.countindownstatusled1 = true;
$scope.countingupstatusled1 = true;
$scope.bulbsliderstatus = true;
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
  $scope.disableactualtimerbutton = true;
  $scope.counterbuttonstatus = true;
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
         $scope.bulbsliderstatus = false;
       });

}
$scope.bulboff = function()
{
  console.log("bulboff called");
  $http.post('/glowbulboff').success(function(response){
         console.log(response);
         $scope.disableonbutton = false;
         $scope.disabledoffbutton = true;
         $scope.bulbsliderstatus = true;
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
  $scope.bulbon();
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
        }}, 1000, $scope.countdownvalue);
  test.then(executebulboff);
}
$scope.setcountup = function()
{
  $scope.bulboff()
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
},1000,$scope.countupvalue);
  test1.then(executebulbon);
}
$scope.$on('$destroy',function(){

});
function countdown()
{
  $scope.countingdown = $scope.countingdown-1;
}
function executebulboff()
{
  console.log("executebulboff function is called after finish");
  $scope.bulboff();
}
function executebulbon()
{
  console.log("executebulbon function is called after finish");
  $scope.bulbon();
}
$scope.datepickerselected = function()
{
  console.log("today's date is"+$scope.myDate);
}
$scope.varybrightnessbulb = function()
{
  if($scope.valueofbulb == 0)
  {
    $http.post('/brightbulb0').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofbulb == 10)
  {
    $http.post('/brightbulb10').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofbulb == 20)
  {
    $http.post('/brightbulb20').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofbulb == 30)
  {
    $http.post('/brightbulb30').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofbulb == 40)
  {
    $http.post('/brightbulb40').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofbulb == 50)
  {
    $http.post('/brightbulb50').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofbulb == 60)
  {
    $http.post('/brightbulb60').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofbulb == 70)
  {
    $http.post('/brightbulb70').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofbulb == 80)
  {
    $http.post('/brightbulb80').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofbulb == 90)
  {
    $http.post('/brightbulb90').success(function(response){
         console.log(response);
       });
  }
   if($scope.valueofbulb == 100)
  {
    $http.post('/brightbulb100').success(function(response){
         console.log(response);
       });
  }
}


//functionality for led 1 starts here.
$scope.countdownled1 = function()
{
  $scope.inputcountdownstatusled1 = false;
}
$scope.countdownled1 = function()
{
  $scope.inputcountupstatusled1 = false;
}
$scope.led1on = function()
{
  $scope.led1sliderstatus = false;
  console.log("bulbon called");
  $http.post('/glowled1').success(function(response){
         console.log(response);
       });
}
$scope.led1off = function()
{
  $scope.led1sliderstatus = true;
  $http.post('/led1off').success(function(response){
         console.log(response);
       });

}
$scope.cancelcountdowntimerled1 = function()
{
  $scope.inputcountdownstatusled1 = true;
}
$scope.cancelcountuptimerled1 = function()
{
  $scope.inputcountupstatusled1 = true;
}
$scope.setcountdownled1 = function()
{
  $scope.led1on();
  $scope.countindownstatusled1 = false;
  $scope.countingdownled1 = $scope.countdownvalueled1;
  ledoff1 = $interval(function() 
    {if($scope.countingdownled1>0)
      {
        $scope.countingdownled1 = $scope.countingdownled1-1;
      }
      else
        {
          $scope.countingdownled1 = $scope.countingdownled1;
        }}, 1000, $scope.countdownvalueled1);
  ledoff1.then(offled1);
}
$scope.setcountupled1 = function()
{
  $scope.led1off();
  $scope.countingupstatusled1 = false;
  $scope.countingupled1 = 0;
   ledon1 = $interval(function(){
    if($scope.countingupled1<$scope.countupvalueled1)
    {
      $scope.countingupled1 = $scope.countingupled1+1;
    }
    else
    {
      $scope.countingupled1 = $scope.countingupled1;
    }
},1000,$scope.countupvalueled1);
  ledon1.then(onled1);
}
function offled1()
{
  console.log("glow led 1 is called");
  $scope.led1off();
}
function onled1()
{
  console.log("off led 1 is called");
  $scope.led1on();
}
$scope.cancelcountdowntimerled1 = function()
{
  $scope.inputcountdownstatusled1 = true;
  $interval.cancel(ledoff1);
  $scope.countindownstatusled1 = true;
  $scope.countingupstatusled1 = true;
  $scope.countingdownled1 = null;
  $scope.countingupled1 = null;
}
$scope.cancelcountuptimerled1 = function()
{
  $scope.inputcountupstatusled1 = true;
  $interval.cancel(ledon1);
  $scope.countindownstatusled1 = true;
  $scope.countingupstatusled1 = true;
  $scope.countingdownled1 = null;
  $scope.countingupled1 = null;
}
$scope.flickerled1on = function()
{
  $http.post('/flickerled1on').success(function(response){
         console.log(response);
       });
}
$scope.flickerled1off = function()
{
  $http.post('/flickerled2off').success(function(response){
         console.log(response);
       });
}
$scope.varyled1brightness = function()
{
  if($scope.valueofled1 == 0)
  {
    $http.post('/1led0').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofled1 == 10)
  {
    $http.post('/1led10').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofled1 == 20)
  {
    $http.post('/1led20').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofled1 == 30)
  {
    $http.post('/1led30').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofled1 == 40)
  {
    $http.post('/1led40').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofled1 == 50)
  {
    $http.post('/1led50').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofled1 == 60)
  {
    $http.post('/1led60').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofled1 == 70)
  {
    $http.post('/1led70').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofled1 == 80)
  {
    $http.post('/1led80').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofled1 == 90)
  {
    $http.post('/1led90').success(function(response){
         console.log(response);
       });
  }
  if($scope.valueofled1 == 100)
  {
    $http.post('/1led100').success(function(response){
         console.log(response);
       });
  }
}
//functionality for led1 ends here

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

