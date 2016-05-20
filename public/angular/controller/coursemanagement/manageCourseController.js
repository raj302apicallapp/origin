var app=angular.module('app');
app.controller('manageCourseCtrl',function($scope,courseService,$location,$localStorage){
console.log("Course Manage controller");
 

	var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    self.readonly = false;
    self.types        		= loadTypes();
	self.competencys         = loadCompetency();
    self.subcompetencys        = loadsubcompetency();

 //search
 	self.querySearchType	  = querySearchType;
 	self.querySearchCompetency   = querySearchCompetency;
    self.querySearchsubcompetency   = querySearchsubcompetency;
   



//MD AUTOCOMPLETE

function newState(state) {
      alert("Sorry! You'll need to create a Constituion for " + state + " first!");
}
function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
function selectedItemChange(item) {
	console.log("ITEM");
      $log.info('Item changed to ' + JSON.stringify(item));
    }
    
   
   
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }

//Type Load
function loadTypes() {

      var allStates = ' ILT,\
                        ELearn';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
//Competency Load
function loadCompetency() {

      var allStates = ' Competency 1,\
                        Competency 2,\
                        Competency 3,\
                        Competency 4,\
                        Competency 5';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
//SubCompetency Load
function loadsubcompetency() {
      var allStates = ' SubCompetency 1,\
                        SubCompetency 2,\
                        SubCompetency 3,\
                        SubCompetency 4,\
                        SubCompetency 5';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
//Type
     function querySearchType (query) {
      // console.log("query::"+query);
      var results = query ? self.types.filter( createFilterFor(query) ) : self.types,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
//Competency
     function querySearchCompetency (query) {
      console.log("query::"+query);
      var results = query ? self.competencys.filter( createFilterFor(query) ) : self.competencys,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

//SubCompetency
     function querySearchsubcompetency (query) {
      var results = query ? self.subcompetencys.filter( createFilterFor(query) ) : self.subcompetencys,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }


//Get Course 
$scope.getCourse=function(activestatus){
	if (!angular.isDefined(activestatus)) {
	activestatus=$scope.activestatus;
};
	console.log("activestatus"+activestatus);
	courseService.getCourse(activestatus).then(function(response) {
console.log("Get Course List::"+JSON.stringify(response));
$scope.getILTCourse=response.data;
});
}
if (!angular.isDefined($scope.activestatus)) {
	$scope.activestatus=false;
};
$scope.getCourse($scope.activestatus);
$scope.removeCourse=function(item){
var removeItem=item;
console.log("Clicked::"+JSON.stringify(removeItem));
courseService.removeCourse(removeItem).then(function(response) {
$scope.getCourse();
});	
}
$scope.activeCourse=function(item){
var activeItem=item;
courseService.activeCourse(activeItem).then(function(response) {
$scope.getCourse();
});	
}
$scope.AddAction=function(){
	console.log("Addaction"+$location.path());
$localStorage.currentPath=$location.path();
$location.path("/addcourse");
}
$scope.editCourse=function(item){
var activeItem=item;
console.log("Active::"+JSON.stringify(item));
$scope.editILTCourse=activeItem;
$localStorage.currentPath=$location.path();
$location.path("/editcourse").search({"encrypt": $scope.editILTCourse._id});

}

//SORT
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
$scope.filterSelected=function(item){
	if (!angular.isDefined(item.display) || item.display=="") {
		$scope.typeSelectedFilter="";
	}else{
		var str = item.display.replace(/\s+/g, '');
	$scope.typeSelectedFilter=str;
	console.log("Selected::"+JSON.stringify($scope.typeSelectedFilter));
	}
	
}

});
