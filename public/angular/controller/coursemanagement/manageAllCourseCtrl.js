var app=angular.module('app');
app.controller('manageCourseCtrl',function($scope,courseService,$location,$localStorage){
/*********GET ALL COURSE STARTS************/ 
$scope.getCourse=function(activestatus){
  $scope.isLoading=true;
	if (!angular.isDefined(activestatus)) {
	activestatus=$scope.activestatus;
	};
	console.log("activestatus"+activestatus);
 courseService.getCourse(activestatus).then(function(response) {
	console.log("Get Course List::"+JSON.stringify(response));
	$scope.getILTCourse=response.data;
	$scope.isLoading=false;
 });
}
/*********GET ALL COURSE ENDS************/
if (!angular.isDefined($scope.activestatus)) {
	$scope.activestatus=false;
};
$scope.getCourse($scope.activestatus);//call all course while load by activestatus

/*********REMOVE COURSE STARTS************/
$scope.removeCourse=function(item){
var removeItem=item;
console.log("Clicked::"+JSON.stringify(removeItem));
courseService.removeCourse(removeItem).then(function(response) {
$scope.getCourse();
});	
}
/*********REMOVE COURSE ENDS************/
/*********ACTIVE COURSE FILTER STARTS************/
$scope.activeCourse=function(item){
var activeItem=item;
courseService.activeCourse(activeItem).then(function(response) {
$scope.getCourse();
});	
}
/*********ACTIVE COURSE FILTER ENDS************/
/*********ADD COURSE ACTION STARTS************/
$scope.AddAction=function(){
	console.log("Addaction"+$location.path());
$localStorage.currentPath=$location.path();
$location.path("/addcourse");
}
/*********ADD COURSE ACTION ENDS************/
/*********EDIT COURSE ACTION STARTS************/
$scope.editCourse=function(item){
console.log("Active::"+JSON.stringify(item));
$scope.editILTCourse=item;
$localStorage.currentPath=$location.path();
if (item.coursetype=="ILT") {
	$location.path("/editcourse").search({"encrypt": $scope.editILTCourse._id});
};
}
/*********EDIT COURSE ACTION ENDS************/
/*********SORT ACTION STARTS************/
$scope.vsortTitle=true;
$scope.titleSortIcon="arrow_drop_down";
$scope.sortTitle=function(){
	if ($scope.vsortTitle==true) {
		$scope.orderList = "title";
		$scope.vsortTitle=false;
		$scope.titleSortIcon="arrow_drop_up";
	}else{
		$scope.orderList = "-title";
		$scope.vsortTitle=true;
		$scope.titleSortIcon="arrow_drop_down";
	}
}
$scope.vsortType=true;
$scope.typeSortIcon="arrow_drop_down";
$scope.sortType=function(){
	if ($scope.vsortType==true) {
		$scope.orderList = "Type";
		$scope.vsortType=false;
		$scope.typeSortIcon="arrow_drop_up";
	}else{
		$scope.orderList = "-Type";
		$scope.vsortType=true;
		$scope.typeSortIcon="arrow_drop_down";
	}
}
$scope.vsortDuration=true;
$scope.durationSortIcon="arrow_drop_down";
$scope.sortDuration=function(){

	if ($scope.vsortDuration==true) {
		$scope.orderList = "duration";
		$scope.vsortDuration=false;
		$scope.durationSortIcon="arrow_drop_up";
	}else{
		$scope.orderList = "-duration";
		$scope.vsortDuration=true;
		$scope.durationSortIcon="arrow_drop_down";
	}
}
/*********SORT ACTION ENDS************/
/*********FILTER STARTS************/
$scope.filterSelected=function(item){
	if (!angular.isDefined(item.display) || item.display=="") {
		$scope.typeSelectedFilter="";
	}else{
		var str = item.display.replace(/\s+/g, '');
	$scope.typeSelectedFilter=str;
	console.log("Selected::"+JSON.stringify($scope.typeSelectedFilter));
	}
	
}
/*********FILTER ENDS************/
});//CONTROLLER ENDS