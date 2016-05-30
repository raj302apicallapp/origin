var app=angular.module("app");


app.controller("manageTrainerCtrl",function($scope,$location,$localStorage,$filter,$log,$mdDialog, $mdMedia,$q,$timeout)
{

var trainertype;
$scope.types=['Internal','External','Freelance'];

//chagetype 
$scope.changeType=function()
{

$localStorage.trainertype=$scope.carrymodel.trainertype;
$scope.trainertype=$scope.carrymodel.trainertype;
console.log("local trainertype::"+$localStorage.trainertype)
trainertype=$scope.carrymodel.trainertype;
console.log("trainerType::"+JSON.stringify(trainertype));
}


// add trainer
// 


}); 