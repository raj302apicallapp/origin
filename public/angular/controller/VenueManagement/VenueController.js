var app=angular.module("app");
var cot=0;
var venuetype;
var editableJSon={};
var addJSon={};
var LocationResponse=[];
//Controller
app.controller("venueCtrl",function($scope,$location,$localStorage,venueService,$routeParams,$q,$log){

    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;

    $scope.isLoading=false;
    
    self.querySearchCountry   = querySearchCountry;
    self.selectedCountryChange = selectedCountryChange;
    self.searchCountryChange   = searchCountryChange;
	
  	self.querySearchState   = querySearchState;
  	self.selectedStateChange = selectedStateChange;
    self.searchStateChange   = searchStateChange;

    self.querySearchCity   = querySearchCity;
	  self.selectedCityChange = selectedCityChange;
    self.searchCityChange   = searchCityChange;

    self.querySearchBuilding   = querySearchBuilding;
	  self.selectedBuildingChange = selectedBuildingChange;
    self.searchBuildingChange   = searchBuildingChange;

    self.querySearchFloor   = querySearchFloor;
	  self.selectedFloorChange = selectedFloorChange;
    self.searchFloorChange   = searchFloorChange;

    self.querySearchWing   = querySearchWing;
    self.selectedWingChange = selectedWingChange;
    self.searchWingChange   = searchWingChange;


    console.log("Venue controller triggered");
    
    $scope.rooms=['Ball Room','Meeting Room'];



    self.types        = $scope.types;
    self.querySearchTypes   = querySearchTypes;
    self.selectedTypesChange = selectedTypesChange;
    self.searchTypesChange   = searchTypesChange;







	
//for initial trigger
// if (cot==0) {
// 	$scope.carrymodel.projector=false;
// 	$scope.carrymodel.whiteboard=false;
// 	$scope.carrymodel.flipboard=false;
// 	$scope.carrymodel.internet=false;
// 	$scope.carrymodel.activestatus=false;
// 	cot=1;
// };
//check for editable mode
//This line is for Show and hide Wing Autocomplete
if($location.path()=="/editinternalvenue" || $location.path()=="/addinternalvenue"){
  $scope.InternalWing=true;
}else{
  $scope.InternalWing=false;
}
if($location.path()=="/editexternalvenue" || $location.path()=="/editinternalvenue"){
	if (angular.isDefined(editableJSon)) {
		$scope.carrymodel=editableJSon;
		self.selectedCountry=$scope.carrymodel.country;
		self.selectedState=$scope.carrymodel.state;
		self.selectedCity=$scope.carrymodel.city;
      	self.selectedBuilding=$scope.carrymodel.building;
      	self.selectedFloor=$scope.carrymodel.floor;
        self.selectedWing=$scope.carrymodel.wing;
	}
}

//allow edit action while it is in editablemode
console.log("LocalStorage::"+$localStorage.editonlypass);
  if($localStorage.editonlypass==$location.path()){
  	console.log("External localStorage");
        $location.path($localStorage.editonlypass);
      } else if($location.path()=="/addexternalvenue" || $location.path()=="/addinternalvenue"){
      	$localStorage.editonlypass="";
      	console.log("VENUE TYPE CHECK::"+$scope.carrymodel.venuetype);
      	if ($scope.carrymodel.venuetype) {
      	}else{
      	$location.path("/venue");
      	}
      }
      else{
      	$localStorage.editonlypass="";
      	$location.path("/venue");
      }


//Active status
$scope.changeActiveStatus=function(){
	// $scope.carrymodel.activestatus=!$scope.carrymodel.activestatus;
	$scope.getVenue();
}
//getVenue list
$scope.getVenue=function(){
	// console.log("activestatus"+$scope.carrymodel.activestatus);
$scope.isLoading=true;
venueService.getVenue(1).then(function(response) {
$scope.getVenueList=response.data;
console.log("Get Venue List::"+JSON.stringify($scope.getVenueList));
$scope.isLoading=false;
});

}






$scope.editVenue=function(item){
	//THis is for url check (unique roll pass)
	console.log("edit Venue");
	var activeItem=item;

editableJSon=activeItem;
$localStorage.currentPath=$location.path();
if(editableJSon.venuetype=="Internal"){
$localStorage.editonlypass="/editinternalvenue";
	$scope.carrymodel=editableJSon;
    console.log("Active::"+JSON.stringify(editableJSon));
		$location.path("/editinternalvenue");
	}else if(editableJSon.venuetype=="External"){
    $localStorage.editonlypass="/editexternalvenue";
		$scope.carrymodel=editableJSon;
		console.log("Active::"+JSON.stringify(editableJSon));
		$location.path("/editexternalvenue");

	}

}

$scope.removeVenue=function(item){
	console.log("Remove Venue");
	var removeItem=item;
console.log("Clicked::"+JSON.stringify(removeItem));

venueService.removeVenue(removeItem).then(function(response) {
$scope.getVenue();
});
}
$scope.submitaction=function(addVenue){
	if ($location.path()=="/addexternalvenue" || $location.path()=="/addinternalvenue") {
		console.log("venu::"+venuetype);
	addVenue.venuetype=venuetype;
	console.log("ci"+JSON.stringify(addVenue));
  $scope.isLoading=true;
venueService.addVenue(addVenue).then(function(response) {
console.log(response);
$scope.isLoading=false;
if (response) {
	$location.path("/venue");
};
})
}else if($location.path()=="/editexternalvenue" || $location.path()=="/editinternalvenue"){
	console.log("edit venue::"+JSON.stringify($scope.carrymodel));
 $scope.isLoading=true;
	venueService.updateVenue($scope.carrymodel).then(function(response) {
console.log(response);
$scope.isLoading=false;
if (response) {
	$location.path("/venue");
};
})
}
}
$scope.activeVenue=function(item){
var activeItem=item;
console.log("Active/Inactive::"+JSON.stringify(activeItem));
venueService.activeVenue(activeItem).then(function(response) {
$scope.getVenue();
});	
}


//SORT
$scope.vsortVenue=true;
$scope.venueSortIcon="arrow_drop_down";
$scope.sortvenue=function(){
	if ($scope.vsortVenue==true) {
		$scope.orderList = "venue";
		$scope.vsortVenue=false;
		$scope.venueSortIcon="arrow_drop_up";
	}else{
		$scope.orderList = "-venue";
		$scope.vsortVenue=true;
		$scope.venueSortIcon="arrow_drop_down";
	}
}
$scope.vsortRoom=true;
$scope.roomSortIcon="arrow_drop_down";
$scope.sortroom=function(){
	if ($scope.vsortRoom==true) {
		$scope.orderList = "room";
		$scope.vsortRoom=false;
		$scope.roomSortIcon="arrow_drop_up";
	}else{
		$scope.orderList = "-room";
		$scope.vsortRoom=true;
		$scope.roomSortIcon="arrow_drop_down";
	}
}
$scope.vsortType=true;
$scope.typeSortIcon="arrow_drop_down";
$scope.sorttype=function(){

	if ($scope.vsortType==true) {
		$scope.orderList = "venuetype";
		$scope.vsortType=false;
		$scope.typeSortIcon="arrow_drop_up";
	}else{
		$scope.orderList = "-venuetype";
		$scope.vsortType=true;
		$scope.typeSortIcon="arrow_drop_down";
	}
}



$scope.getLocation=function(){
	
	venueService.getCSCLocation().then(function(response){
		// console.log("Get CSCLocation Data::"+JSON.stringify(response));
		if (response) {
			// $scope.CSCLocationSelect=['s','t','g'];
			console.log("Res::"+JSON.stringify(response.data));
			LocationResponse=response.data;
			$scope.getCountry(response.data);
			console.log("LocationResponse::"+JSON.stringify(LocationResponse));
			
		};

	})
	
}
$scope.getLocation();
$scope.getCountry=function(getResponse){
	$scope.CountryList=[];
	for (var i = 0;i<getResponse.length;i++) {
		if ($scope.CountryList.indexOf(getResponse[i].Country) == -1) {
		$scope.CountryList.push(getResponse[i].Country);
		}
	};

	console.log("Country List::"+$scope.CountryList);
	console.log("selectedItem");
	self.countries=$scope.CountryList;


}

$scope.getState=function(SelectedCountry,getResponse){
	console.log("Statte get::"+JSON.stringify(getResponse));
	console.log("state Country get::"+SelectedCountry);
	$scope.StateList=[];
	for (var i = 0;i<getResponse.length;i++) {
		console.log(SelectedCountry+"="+getResponse[i].Country);
		if (SelectedCountry==getResponse[i].Country) {
			if ($scope.StateList.indexOf(getResponse[i].State) == -1) {
				$scope.StateList.push(getResponse[i].State);
				}
		};
		
	};
	self.states=$scope.StateList;
	console.log("State List::"+self.states);
}
$scope.getCity=function(SelectedState,getResponse){
	$scope.CityList=[];
	for (var i = 0;i<getResponse.length;i++) {
		if (SelectedState==getResponse[i].State) {
			console.log(SelectedState+"="+getResponse[i].State);
			if ($scope.CityList.indexOf(getResponse[i].City) == -1) {
				$scope.CityList.push(getResponse[i].City);
				}
		};
	};
	self.Cities=$scope.CityList;
	console.log("City List::"+$scope.CityList);
}
$scope.getBuilding=function(SelectedCity,getResponse){
	$scope.BuildingList=[];
	for (var i = 0;i<getResponse.length;i++) {
		if (SelectedCity==getResponse[i].City) {
			console.log(SelectedCity+"="+getResponse[i].City);
			if ($scope.BuildingList.indexOf(getResponse[i].Building) == -1) {
				$scope.BuildingList.push(getResponse[i].Building);
				}
		};
	};
	self.Buildings=$scope.BuildingList;
	console.log("Build List::"+$scope.BuildingList);
}
$scope.getFloor=function(SelectedBuilding,getResponse){
	$scope.FloorList=[];
	for (var i = 0;i<getResponse.length;i++) {
		if (SelectedBuilding==getResponse[i].Building) {
			console.log(SelectedBuilding+"="+getResponse[i].Building);
			if ($scope.FloorList.indexOf(getResponse[i].Floor) == -1) {
				$scope.FloorList.push(getResponse[i].Floor);
				}
		};
	};
	self.Floors=$scope.FloorList;
	console.log("Floor List::"+$scope.FloorList);
}
$scope.getWing=function(SelectedFloor,getResponse){
  $scope.WingList=[];
  for (var i = 0;i<getResponse.length;i++) {
    if (SelectedFloor==getResponse[i].Floor) {
      console.log(SelectedFloor+"="+getResponse[i].Floor);
      if ($scope.WingList.indexOf(getResponse[i].Wing) == -1) {
        $scope.WingList.push(getResponse[i].Wing);
        }
    };
  };
  self.Wings=$scope.WingList;
  console.log("Wing List::"+$scope.WingList);
}
 function querySearchCountry (query) {
	  console.log("sr::"+query); 

      var results = query ? self.countries.filter( createFilterFor(query) ) : self.countries,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function querySearchState (query) {
	  console.log("state::"+query); 
	  if (query==null || query=="") {
	  	$scope.getState($scope.carrymodel.country,LocationResponse);
	  }
	  
	  	var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
	  
      
    }
    function querySearchCity (query) {
	  console.log("state::"+query); 
	  if (query==null || query=="") {
	  	$scope.getCity($scope.carrymodel.state,LocationResponse);
	  }
      var results = query ? self.Cities.filter( createFilterFor(query) ) : self.Cities,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function querySearchBuilding (query) {
	  console.log("state::"+query); 
	  if (query==null || query=="") {
	  	$scope.getBuilding($scope.carrymodel.city,LocationResponse);
	  }
      var results = query ? self.Buildings.filter( createFilterFor(query) ) : self.Buildings,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function querySearchFloor (query) {
    	if (query==null || query=="") {
	  	$scope.getFloor($scope.carrymodel.building,LocationResponse);
	  }
	  console.log("state::"+query); 
      var results = query ? self.Floors.filter( createFilterFor(query) ) : self.Floors,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
     function querySearchWing (query) {
      if (query==null || query=="") {
      $scope.getWing($scope.carrymodel.floor,LocationResponse);
    }
    console.log("state::"+query); 
      var results = query ? self.Wings.filter( createFilterFor(query) ) : self.Wings,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function searchCountryChange(text) {

      $log.info('Text changed to ' + text);
      if (text=="") {
      	self.selectedCountry=$scope.carrymodel.country="";
      	self.searchCountry="";
      	self.selectedState=$scope.carrymodel.state="";
      	self.searchState="";
      	self.selectedCity=$scope.carrymodel.city="";
      	self.searchCity="";
      	self.selectedBuilding=$scope.carrymodel.building="";
      	self.searchBuilding="";
      	self.selectedFloor=$scope.carrymodel.floor="";
      	self.searchFloor="";
        self.selectedWing=$scope.carrymodel.wing="";
        self.searchWing="";
       }
       else{
       	$scope.carrymodel.state=self.selectedState;
      	$scope.carrymodel.city=self.selectedCity;
        $scope.carrymodel.building=self.selectedBuilding;
      	$scope.carrymodel.floor=self.selectedFloor;
        $scope.carrymodel.wing=self.selectedWing;

       }
    }
    function selectedCountryChange(item) {
      
        $scope.countryFilter=item;
      
      $log.info('Country changed to ' + JSON.stringify(item));
      	$scope.carrymodel.country=self.selectedCountry;
      	$scope.carrymodel.state=self.selectedState;
      	$scope.carrymodel.city=self.selectedCity;
        $scope.carrymodel.building=self.selectedBuilding;
      	$scope.carrymodel.floor=self.selectedFloor;
        $scope.carrymodel.wing=self.selectedWing;
    }
    
    function searchStateChange(text) {
      $log.info('Text changed to ' + text);
      if (text=="") {
      	self.selectedState=$scope.carrymodel.state="";
      	self.searchState="";
      	self.selectedCity=$scope.carrymodel.city="";
      	self.searchCity="";
      	self.selectedBuilding=$scope.carrymodel.building="";
      	self.searchBuilding="";
      	self.selectedFloor=$scope.carrymodel.floor="";
      	self.searchFloor="";
        self.selectedWing=$scope.carrymodel.wing="";
        self.searchWing="";
        }
       	else{
      	$scope.carrymodel.city=self.selectedCity;
        $scope.carrymodel.building=self.selectedBuilding;
      	$scope.carrymodel.floor=self.selectedFloor;
        $scope.carrymodel.wing=self.selectedWing;
       }
       
    }
    function selectedStateChange(item) {
      $scope.stateFilter=item;
      $log.info('State changed to ' + JSON.stringify(item));
      if (!angular.isDefined(item) || item==null) {
      	$scope.getState($scope.carrymodel.country,LocationResponse);
      }else{
      	$scope.getCity(item,LocationResponse);
      	
      }
      	$scope.carrymodel.state=self.selectedState;
      	$scope.carrymodel.city=self.selectedCity;
        $scope.carrymodel.building=self.selectedBuilding;
      	$scope.carrymodel.floor=self.selectedFloor;
        $scope.carrymodel.wing=self.selectedWing;

    }
    function searchCityChange(text) {
      $log.info('Text changed to ' + text);
      if (text=="") {
      	self.selectedCity=$scope.carrymodel.city="";
      	self.searchCity="";
      	self.selectedBuilding=$scope.carrymodel.building="";
      	self.searchBuilding="";
      	self.selectedFloor=$scope.carrymodel.floor="";
      	self.searchFloor="";
        self.selectedWing=$scope.carrymodel.wing="";
        self.searchWing="";
       }
       else{
        $scope.carrymodel.building=self.selectedBuilding;
      	$scope.carrymodel.floor=self.selectedFloor;
        $scope.carrymodel.wing=self.selectedWing;
       }
       
       $scope.carrymodel.city=self.selectedCity;
        $scope.carrymodel.building=self.selectedBuilding;
      	$scope.carrymodel.floor=self.selectedFloor;
        $scope.carrymodel.wing=self.selectedWing;
    }
    function selectedCityChange(item) {
      $scope.cityFilter=item;
      $log.info('City changed to ' + JSON.stringify(item));
       if (!angular.isDefined(item) || item==null) {
       	$scope.getCity($scope.carrymodel.state,LocationResponse);
      }else{
      	$scope.getBuilding(item,LocationResponse);
      	
      }
      $scope.carrymodel.city=self.selectedCity;
        $scope.carrymodel.building=self.selectedBuilding;
      	$scope.carrymodel.floor=self.selectedFloor;
        $scope.carrymodel.wing=self.selectedWing;
    }
    function searchBuildingChange(text) {
      $log.info('Text changed to ' + text);
      if (text=="") {

        self.selectedBuilding=$scope.carrymodel.building="";
        self.searchBuilding="";
        self.selectedFloor=$scope.carrymodel.floor="";
        self.searchFloor="";
        self.selectedWing=$scope.carrymodel.wing="";
        self.searchWing="";
       }else{
        $scope.carrymodel.floor=self.selectedFloor;
       }
        $scope.carrymodel.building=self.selectedBuilding;
        $scope.carrymodel.floor=self.selectedFloor;
        $scope.carrymodel.wing=self.selectedWing;
    }
    function selectedBuildingChange(item) {
      $scope.buildingFilter=item;
      $log.info('City changed to ' + JSON.stringify(item));
      if (!angular.isDefined(item) || item==null) {
        $scope.getBuilding($scope.carrymodel.city,LocationResponse);
      }else{
        $scope.getFloor(item,LocationResponse);
      }
        $scope.carrymodel.building=self.selectedBuilding;
        $scope.carrymodel.floor=self.selectedFloor;
        $scope.carrymodel.wing=self.selectedWing;
    }

    function searchFloorChange(text) {
      $log.info('Text changed to ' + text);
       console.log("Seleeee::"+JSON.stringify($scope.carrymodel));
       if (text=="") {
       	self.selectedFloor=$scope.carrymodel.floor="";
      	self.searchFloor="";
        self.selectedWing=$scope.carrymodel.wing="";
        self.searchWing="";
       }else{
          $scope.carrymodel.wing=self.selectedWing;
       }
       $scope.carrymodel.floor=self.selectedFloor;
       $scope.carrymodel.wing=self.selectedWing;
       console.log("Carry::"+JSON.stringify($scope.carrymodel));
    }
    function selectedFloorChange(item) {
      $scope.floorFilter=item;
      $log.info('Floor changed to ' + JSON.stringify(item));
       if (!angular.isDefined(item) || item==null) {
       	$scope.getFloor($scope.carrymodel.building,LocationResponse);
      }else{
      	$scope.getWing(item,LocationResponse);
      }
      	$scope.carrymodel.floor=self.selectedFloor;
        $scope.carrymodel.wing=self.selectedWing;
    }
     function searchWingChange(text) {
      $log.info('Text changed to ' + text);
       console.log("Seleeee::"+JSON.stringify($scope.carrymodel));
       if (text="") {
        self.selectedWing=$scope.carrymodel.wing="";
        self.searchWing="";
       };
       $scope.carrymodel.wing=self.selectedWing;
    }
    function selectedWingChange(item) {
      $scope.wingFilter=item;
      $log.info('Wing changed to ' + $scope.carrymodel.wing);
       if (!angular.isDefined(item) || item==null) {
        $scope.getWing($scope.carrymodel.wing,LocationResponse);
      }else{
        
      }
        $scope.carrymodel.wing=self.selectedWing;
           console.log("Seleeee::"+JSON.stringify($scope.carrymodel));
    }
    
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(res) {
      	console.log("sj::"+lowercaseQuery);
        return (res.indexOf(query) == 0);
      };
  }




 function searchTypesChange(text) {

 }
 function selectedTypesChange(item) {
      $scope.changeTypeFilter=item;
     
  }
    function querySearchTypes(query) {
      
    console.log("state::"+query); 
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
})
