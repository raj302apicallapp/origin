var app=angular.module("app");


app.controller("manageTrainerCtrl",function($scope,$location,trainerService,$localStorage,$filter,$log,$mdDialog, $mdMedia,$q,$timeout)
{



// add trainer

$scope.getTrainer=function(activestatus){
	if (!angular.isDefined(activestatus)) {
	activestatus=$scope.activestatus;
};
	console.log("activestatus"+activestatus);
	trainerService.getTrainer(activestatus).then(function(response) {
console.log("Get Course List::"+JSON.stringify(response));
$scope.getTrainerdata=response.data;
});
}
if (!angular.isDefined($scope.activestatus)) {
	$scope.activestatus=false;
};
$scope.getTrainer($scope.activestatus);
$scope.removeTrainer=function(item){
var removeItem=item;
console.log("Clicked::"+JSON.stringify(removeItem));
trainerService.removeTrainer(removeItem).then(function(response) {
$scope.getTrainer();
});	
}
$scope.activeTrainer=function(item){
var activeItem=item;
trainerService.activeTrainer(activeItem).then(function(response) {
$scope.getTrainer();
});	
}
$scope.AddAction=function(){
	console.log("Addaction"+$location.path());
$localStorage.currentPath=$location.path();
$location.path("/addcourse");
}


}); 