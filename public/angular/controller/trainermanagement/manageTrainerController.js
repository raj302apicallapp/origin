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
$scope.addTrainer=function()
{  
console.log("Add Trainer");
console.log("localStorage::"+$localStorage.currentPath)
$localStorage.currentPath=$location.path();
console.log("location path::"+$location.path());
if($scope.carrymodel.trainertype=="Internal"){
console.log("trainertype::"+$scope.carrymodel.trainertype)
$location.path("/addtrainerinternal");
}else if($scope.carrymodel.trainertype=="External"){
$location.path("/addtrainerexternal");
}else if($scope.carrymodel.trainertype=="Freelance"){
$location.path("/addtrainerfreelance");
}
}


}); 