var app=angular.module("app");
var answerarr=[];
var answercer=[];
var answerarrv=[];
var answerarrt=[];
var answerarrs=[];

var relanswerarr=[];
var relanswercer=[];
var relanswerarrt=[];
var relanswerarrv=[];
var relanswerarrs=[];
var CoordinatorResponse=[];
var venuetype;

var prereqFlag=true;
var relFlag=false;
var finJSon;
app.controller("iltsessionCtrl",function($scope,$location,$localStorage,$filter,$log,$mdDialog, $mdMedia,$q,$timeout,iltsessionService)
{ 
  $scope.selectJson=[];
  $scope.selectJsonven=[];

  // vendor
// competency
// dialog to pick competency
$scope.showAdvancedVendor = function(ev) {
var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
$mdDialog.show({
 
templateUrl: 'angular/view/CourseManagement/iltsession/add/dialog1.tmpl.html',
parent: angular.element(document.body),
targetEvent: ev,
clickOutsideToClose:true,
fullscreen: useFullScreen
})
.then(function(answer) {
console.log("ok"+JSON.stringify(answer));
for(var i=0;i<answer.length;i++){
answerarrv.push(answer[i]);
}
$scope.carrymodel.selectvendor=answerarrv;
console.log("Answer::"+JSON.stringify($scope.carrymodel.selectvendor));
},function() {
$scope.status = 'You cancelled the dialog.';
});
$scope.$watch(function() {
return $mdMedia('xs') || $mdMedia('sm');
}, function(wantsFullScreen) {
$scope.customFullscreen = (wantsFullScreen === true);
});
};
$scope.checkOneVendor=function(vindex){
console.log(JSON.stringify($scope.getInternalVendor));
}
$scope.checkAllVendor = function () {
console.log("checkAll::"+prereqFlag);
if ($scope.selectedAll) {
$scope.selectedAll = true;

} else {
$scope.selectedAll = false;
}

angular.forEach($scope.getInternalVendor, function (item) {
if (prereqFlag==true) {

if (answerarrv.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answerarrt TEM::"+JSON.stringify(answerarrv));
for (var i =0; i <answerarrv.length; i++) {
if (item.Firstname==answerarrv[i].Firstname) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}else if (relFlag==true) {
if (relanswerarrv.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answerarrt TEM::"+JSON.stringify(relanswerarrv));
for (var i =0; i <relanswerarrv.length; i++) {
if (item.Firstname==relanswerarrv[i].Firstname) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}
});
}
$scope.saveActionVendor=function(){
console.log(JSON.stringify($scope.getInternalVendor));
for(var i=0;i<$scope.getInternalVendor.length;i++){
console.log("Final Result::"+JSON.stringify($scope.getInternalVendor[i].Selected));
if ($scope.getInternalVendor[i].Selected==false || !angular.isDefined($scope.getInternalVendor[i].Selected)) {}else{
$scope.selectJsonven.push($scope.getInternalVendor[i]);
};
}
console.log("Final Result::"+JSON.stringify($scope.selectJsonven));
$scope.jj="jjjj";
$mdDialog.hide($scope.selectJsonven);

}
//SORT
$scope.vsortvendor=true;
$scope.vendorSortIcon="arrow_drop_down";
$scope.sortvendor=function(){
  if ($scope.vsortvendor==true) {
    $scope.orderList = "Firstname";
    $scope.vsortvendor=false;
    $scope.vendorSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-Firstname";
    $scope.vsortvendor=true;
    $scope.vendorSortIcon="arrow_drop_down";
  }
}

$scope.vsortType=true;
$scope.typeSortIcon="arrow_drop_down";
$scope.sorttype=function(){

  if ($scope.vsortType==true) {
    $scope.orderList = "vendortype";
    $scope.vsortType=false;
    $scope.typeSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-vendortype";
    $scope.vsortType=true;
    $scope.typeSortIcon="arrow_drop_down";
  }
}
$scope.vsortLocation=true;
$scope.locationSortIcon="arrow_drop_down";
$scope.sortlocation=function(){

  if ($scope.vsortLocation==true) {
    $scope.orderList = "Country";
    $scope.vsortLocation=false;
    $scope.locationSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-Country";
    $scope.vsortLocation=true;
    $scope.locationSortIcon="arrow_drop_down";
  }
}
 

// ILT SESSION
// $scope.addsession.minimum=5;
// $scope.carrymodel.startDate = new Date(); 
//   $scope.minDate = new Date(
//       $scope.carrymodel.startDate.getFullYear(),
//       $scope.carrymodel.startDate.getMonth(),
//       $scope.carrymodel.startDate.getDate());

//   $scope.endDate = new Date(); 
//   $scope.endDate = new Date(
//       $scope.endDate.getFullYear(),
//       $scope.endDate.getMonth(),
//       $scope.endDate.getDate()); 
       


// //Decleration
//     //Program Coordinator
    self.Coordinators=[];
    self.querySearchCoordinator   = querySearchCoordinator;
    self.selectedCoordinatorChange = selectedCoordinatorChange;
    self.searchCoordinatorChange   = searchCoordinatorChange;

//Get Program Coordinator-ServiceCall
$scope.getProgramCoordinator=function(){
  iltsessionService.getProgramCoordinator().then(function(response){
    if (response) {
      CoordinatorResponse=response.data;
      console.log("Coordinators::"+JSON.stringify(CoordinatorResponse));
      for (var i = 0; i < CoordinatorResponse.length; i++) {
        self.Coordinators.push(response.data[i].name);
      };
    };
  });
}
$scope.getProgramCoordinator();




//Coordinator Functions
function querySearchCoordinator (query) {
    console.log("sr::"+query); 

      var results = query ? self.Coordinators.filter( createFilterFor(query) ) : self.Coordinators,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

 function searchCoordinatorChange(text) {
    
      $log.info('Text changed to ' + text);
      
    }
    function selectedCoordinatorChange(item) {
      console.log(JSON.stringify(CoordinatorResponse));
      if (angular.isDefined(item)) {
    for (var i = 0; i < CoordinatorResponse.length; i++) {
    if (CoordinatorResponse[i].name==item) {
      console.log("changed::"+CoordinatorResponse[i].name);
      $scope.carrymodel.email=CoordinatorResponse[i].email;
      $scope.carrymodel.phone=CoordinatorResponse[i].phone;
    }
  }
      }else{
    $scope.carrymodel.email="";
      $scope.carrymodel.phone="";
  }
        
      $log.info('Country changed to ' + JSON.stringify(item));
       
    }



//     

//Get Course 
$scope.getVendor=function(){
var activestatus=1;
$scope.isLoading=true;
if (!angular.isDefined(activestatus)) {
activestatus=$scope.activestatus;
};
console.log("activestatus"+activestatus);
iltsessionService.getVendor(activestatus).then(function(response) {

$scope.getInternalVendor=response.data;
$scope.isLoading=false;
if (prereqFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answerarrv.length; j++) {
for (var i = 0; i < $scope.getInternalVendor.length; i++) {
if (answerarrv[j].Firstname==$scope.getInternalVendor[i].Firstname) {
$scope.getInternalVendor[i].Checked=true;
}

};

}

}


}else if (relFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answerarrv.length; j++) {
for (var i = 0; i < $scope.getInternalVendor.length; i++) {
if (answerarrv[j].Firstname==$scope.getInternalVendor[i].Firstname) {
$scope.getInternalVendor[i].relChecked=true;
}

};

}

}



}


});


}
if (!angular.isDefined($scope.activestatus)) {
$scope.activestatus=false;
};
$scope.getVendor();

$scope.cancel = function() {
    $mdDialog.cancel();
  };

$scope.removeVendor=function(vindex){
      $scope.carrymodel.selectvendor.splice(vindex,1);
    }
// dialog to pick employee
$scope.showAdvanced = function(ev) {
var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
$mdDialog.show({
 templateUrl: 'angular/view/CourseManagement/iltsession/add/dialog2.tmpl.html',

parent: angular.element(document.body),
targetEvent: ev,
clickOutsideToClose:true,
fullscreen: useFullScreen
})
.then(function(answer) {
console.log("ok"+JSON.stringify(answer));
for(var i=0;i<answer.length;i++){
answerarr.push(answer[i]);
}
$scope.carrymodel.selectemployee=answerarr;
console.log("Answer::"+JSON.stringify($scope.carrymodel.selectemployee));
},function() {
$scope.status = 'You cancelled the dialog.';
});
$scope.$watch(function() {
return $mdMedia('xs') || $mdMedia('sm');
}, function(wantsFullScreen) {
$scope.customFullscreen = (wantsFullScreen === true);
});
};
$scope.checkOne=function(vindex){
console.log(JSON.stringify($scope.getInternalTrainer));
}
$scope.checkAll = function () {
console.log("checkAll::"+prereqFlag);
if ($scope.selectedAll) {
$scope.selectedAll = true;

} else {
$scope.selectedAll = false;
}

angular.forEach($scope.getInternalTrainer, function (item) {
if (prereqFlag==true) {

if (answerarr.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answerarr TEM::"+JSON.stringify(answerarr));
for (var i =0; i <answerarr.length; i++) {
if (item.firstname==answerarr[i].firstname) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}
else if (relFlag==true) {
if (relanswerarr.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answerarr TEM::"+JSON.stringify(relanswerarr));
for (var i =0; i <relanswerarr.length; i++) {
if (item.firstname==relanswerarr[i].firstname) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}
});
}
$scope.saveActionemployee=function(){
    if (prereqFlag==true) {
         for(var i=0;i<$scope.getInternalTrainer.length;i++){
        if ($scope.getInternalTrainer[i].Selected==false || !angular.isDefined($scope.getInternalTrainer[i].Selected)) {
        }else{
        $scope.selectJson.push($scope.getInternalTrainer[i]);
        alert("ddd"+JSON.stringify($scope.selectJson))
        };
        
      }
      $mdDialog.hide($scope.selectJson);
  }
  else if (relFlag==true) {
        for(var i=0;i<$scope.getInternalTrainer.length;i++){
          if ($scope.getInternalTrainer[i].relSelected==false || !angular.isDefined($scope.getInternalTrainer[i].relSelected)) {
          }else{
          $scope.selectJson.push($scope.getInternalTrainer[i]);
        };
    }
    $mdDialog.hide($scope.selectJson);
    }
}



//Get Course 
$scope.getTrainer=function(){
var activestatus=1;
$scope.isLoading=true;
if (!angular.isDefined(activestatus)) {
activestatus=$scope.activestatus;
};
console.log("activestatus"+activestatus);
iltsessionService.getTrainer(activestatus).then(function(response) {

$scope.getInternalTrainer=response.data;
$scope.isLoading=false;
if (prereqFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answerarr.length; j++) {
for (var i = 0; i < $scope.getInternalTrainer.length; i++) {
if (answerarr[j].firstname==$scope.getInternalTrainer[i].firstname) {
$scope.getInternalTrainer[i].Checked=true;
}

};

}

}
}else if (relFlag==true) {
if (response.data.length>0) {
for (var j=0; j < answerarr.length; j++) {
for (var i = 0; i < $scope.getInternalTrainer.length; i++) {
if (answerarr[j].firstname==$scope.getInternalTrainer[i].firstname) {
$scope.getInternalTrainer[i].relChecked=true;
}
};
}

}



}


});


}
if (!angular.isDefined($scope.activestatus)) {
$scope.activestatus=false;
};
$scope.getTrainer();

$scope.removeTrainer=function(vindex){
      $scope.carrymodel.selectemployee.splice(vindex,1);
    }
// venue
$scope.showAdvancedvenue = function(ev) {
var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
$mdDialog.show({
 templateUrl: 'angular/view/CourseManagement/iltsession/add/dialog3.tmpl.html',

parent: angular.element(document.body),
targetEvent: ev,
clickOutsideToClose:true,
fullscreen: useFullScreen
})
.then(function(answer) {
console.log("ok"+JSON.stringify(answer));
for(var i=0;i<answer.length;i++){
answerarrs.push(answer[i]);
}
$scope.carrymodel.venuetype=answerarrs;
console.log("Answer::"+JSON.stringify($scope.carrymodel.venuetype));
},function() {
$scope.status = 'You cancelled the dialog.';
});
$scope.$watch(function() {
return $mdMedia('xs') || $mdMedia('sm');
}, function(wantsFullScreen) {
$scope.customFullscreen = (wantsFullScreen === true);
});
};
$scope.checkOne=function(vindex){
console.log(JSON.stringify($scope.getVenueList));
}
$scope.checkAll = function () {
console.log("checkAll::"+prereqFlag);
if ($scope.selectedAll) {
$scope.selectedAll = true;

} else {
$scope.selectedAll = false;
}

angular.forEach($scope.getVenueList, function (item) {
if (prereqFlag==true) {

if (answerarrs.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answerarrs TEM::"+JSON.stringify(answerarrs));
for (var i =0; i <answerarrs.length; i++) {
if (item.venue==answerarrs[i].venue) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}
else if (relFlag==true) {
if (relanswerarrs.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answerarrs TEM::"+JSON.stringify(relanswerarrs));
for (var i =0; i <relanswerarrs.length; i++) {
if (item.venue==relanswerarrs[i].venue) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}
});
}
$scope.saveActionvenue=function(){

    if (prereqFlag==true) {
         for(var i=0;i<$scope.getVenueList.length;i++){
        if ($scope.getVenueList[i].Selected==false || !angular.isDefined($scope.getVenueList[i].Selected)) {
        }else{
        $scope.selectJson.push($scope.getVenueList[i]);
        alert("ddd"+JSON.stringify($scope.selectJson))
        };
        
      }
      $mdDialog.hide($scope.selectJson);
  }
  else if (relFlag==true) {
        for(var i=0;i<$scope.getVenueList.length;i++){
          if ($scope.getVenueList[i].relSelected==false || !angular.isDefined($scope.getVenueList[i].relSelected)) {
          }else{
          $scope.selectJson.push($scope.getVenueList[i]);
        };
    }
    $mdDialog.hide($scope.selectJson);
    }
}

// //getVenue list
// $scope.getVenue=function(){
//   // console.log("activestatus"+$scope.carrymodel.activestatus);
// $scope.isLoading=true;
// iltsessionService.getVenue(1).then(function(response) {
// $scope.getVenueList=response.data;
// console.log("Get Venue List::"+JSON.stringify($scope.getVenueList));
// $scope.isLoading=false;
// });

// }



//Get Course 
$scope.getVenue=function(){
var activestatus=1;
$scope.isLoading=true;
if (!angular.isDefined(activestatus)) {
activestatus=$scope.activestatus;
};
console.log("activestatus"+activestatus);
iltsessionService.getVenue(activestatus).then(function(response) {

$scope.getVenueList=response.data;
$scope.isLoading=false;
if (prereqFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answerarrs.length; j++) {
for (var i = 0; i < $scope.getVenueList.length; i++) {
if (answerarrs[j].venue==$scope.getVenueList[i].venue) {
$scope.getVenueList[i].Checked=true;
}
};
}
}
}else if (relFlag==true) {
if (response.data.length>0) {
for (var j=0; j < answerarrs.length; j++) {
for (var i = 0; i < $scope.getVenueList.length; i++) {
if (answerarrs[j].venue==$scope.getVenueList[i].venue) {
$scope.getVenueList[i].relChecked=true;
}
};
}
}
}
});
}
if (!angular.isDefined($scope.activestatus)) {
$scope.activestatus=false;
};
$scope.getVenue();


$scope.removevenue=function(vindex){
      $scope.carrymodel.venuetype.splice(vindex,1);
    }


});
