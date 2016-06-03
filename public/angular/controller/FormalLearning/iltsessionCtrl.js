var app=angular.module("app");
var answerarr=[];
var answercer=[];
var answerarrv=[];
var answerarrt=[];
var answerarrs=[];
var employeedata=[];

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
$scope.dis_curriculumowner=true;
$scope.dis_curriculumemail=true;
    $scope.dis_pickemployee=false;
    var tagarr=[];
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
       $scope.pickemployee=function()
  {
     iltsessionService.pickemployee().then(function(response)
     {           
        if (answerarr.length==0) {
           $scope.Emplyoee=response.data;
           console.log(JSON.stringify($scope.Emplyoee))
            }
            else{
              $scope.Emplyoee=employeedata;
            }
        $scope.Employeedata=response.data;
        $scope.getUserdata();
     });
  }
 $scope.pickemployee();

  $scope.select_employee=[];
 $scope.pick_employee_details = function(ev) {
   console.log(JSON.stringify($scope.Emplyoee));
  employeedata =$scope.Emplyoee;
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      
      templateUrl: 'angular/view/CourseManagement/iltsession/add/dialog4.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
      locals: {
        items: $scope.Emplyoee
     }
    })
    .then(function(answer) {  
         $scope.carrymodel.curriculum_owner=answer;
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
$scope.Employee_checkOne=function(vindex){

console.log(JSON.stringify($scope.Emplyoee));
}
    $scope.Employee_saveAction=function(){
            $mdDialog.hide($scope.curriculum_owner);
    }
    
 // image upload
 
   $scope.submitaction=function(data)
   {


      // alert(JSON.stringify(data));
      courseService.addCurriculum(data).then(function(response)
      {
        console.log(JSON.stringify(response));
        if(response)
        {
          $location.path('/managecourse');
        }
      });
   }
   $scope.onEmployeeSelect=function(data)
   {
    // alert("Seleted"+JSON.stringify(data));
    $scope.curriculum_owner=data;
   }
// employee
    self.querySearchUser   = querySearchUser;
    self.selectedUserChange = selectedUserChange;
    self.searchUserChange   = searchUserChange;
// employee

$scope.pickemployee=function()
  {
     iltsessionService.pickemployee().then(function(response)
     {           
        if (answerarr.length==0) {
           $scope.Emplyoee=response.data;
           console.log(JSON.stringify($scope.Emplyoee))
            }
            else{
              $scope.Emplyoee=employeedata;
            }
        $scope.Employeedata=response.data;
        $scope.getUserdata();
     });
  }
 // employee


$scope.getUserdata=function()
   {
      var getResponse=$scope.Emplyoee;
      $scope.UserList=[];
       for (var i = 0;i<getResponse.length;i++)
     {
       if ($scope.UserList.indexOf(getResponse[i].firstname) == -1) 
        {
         $scope.UserList.push(getResponse[i].firstname);
        }
     }
       console.log("User List::"+$scope.UserList);
      self.Userdata=$scope.UserList;

   }
     function querySearchUser (query) 
 {     
  console.log("datas::"+JSON.stringify(self.Userdata));
      console.log("sr::"+query); 
      var results = query ? self.Userdata.filter( createFilterFor(query) ) : self.Userdata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchUserChange(text)
   {
              console.log('Text changed to ' + text);
      $scope.User=$scope.Userdata;
    }
  function selectedUserChange(item) {
    console.log("Item"+JSON.stringify(item));
    if(item ==undefined)
    {         
         $scope.Emplyoee=$scope.Employeedata;
    }
      else{
        self.selectedUser=item;
       $scope.Emplyoee=($filter('filter')($scope.Emplyoee, {firstname: item}));
      
     }
    }







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
//SORT
$scope.vsorttrainer=true;
$scope.trainerSortIcon="arrow_drop_down";
$scope.sorttrainer=function(){
  if ($scope.vsorttrainer==true) {
    $scope.orderList = "selectemployee[0].firstname";
    $scope.vsorttrainer=false;
    $scope.trainerSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-selectemployee[0].firstname";
    $scope.vsorttrainer=true;
    $scope.trainerSortIcon="arrow_drop_down";
  }
}

$scope.vsorttrainertype=true;
$scope.trainertypeSortIcon="arrow_drop_down";
$scope.sorttrainertype=function(){
  if ($scope.vsorttrainertype==true) {
    $scope.orderList = "trainertype";
    $scope.vsorttrainertype=false;
    $scope.trainertypeSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-trainertype";
    $scope.vsorttrainertype=true;
    $scope.trainerSortIcon="arrow_drop_down";
  }
}

$scope.vsortSkills=true;
$scope.trainerSkillsSortIcon="arrow_drop_down";
$scope.sortSkills=function(){
  if ($scope.vsortSkills==true) {
    $scope.orderList = "selectcompetency[0].skills";
    $scope.vsortSkills=false;
    $scope.trainerSkillsSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-selectcompetency[0].skills";
    $scope.vsortSkills=true;
    $scope.trainerSkilllsSortIcon="arrow_drop_down";
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

 

});
