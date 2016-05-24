var app=angular.module("app");


app.controller("addTrainerCtrl",function($scope,$location,$localStorage,$filter,$log,$mdDialog, $mdMedia,$q,$timeout,trainerService)
{ 

var answerarr=[];
var prereqFlag=true;
var finJSon;
var relanswerarr=[];
var relFlag=false;
$scope.selectJson=[];
// dialog to pick employee
$scope.showAdvanced = function(ev) {
var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
$mdDialog.show({
 controller: addTrainerController,
templateUrl: 'angular/view/TrainerManagement/Internal/dialog1.tmpl.html',
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
console.log(JSON.stringify($scope.JsonResult));
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
if (item.title==answerarr[i].title) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}else if (relFlag==true) {
if (relanswerarr.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answerarr TEM::"+JSON.stringify(relanswerarr));
for (var i =0; i <relanswerarr.length; i++) {
if (item.title==relanswerarr[i].title) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}
});
}
$scope.saveAction=function(){
console.log(JSON.stringify($scope.getInternalTrainer));
for(var i=0;i<$scope.getInternalTrainer.length;i++){
console.log("Final Result::"+JSON.stringify($scope.getInternalTrainer[i].Selected));
if ($scope.getInternalTrainer[i].Selected==false || !angular.isDefined($scope.getInternalTrainer[i].Selected)) {}else{
$scope.selectJson.push($scope.getInternalTrainer[i]);
};
}
console.log("Final Result::"+JSON.stringify($scope.selectJson));
$scope.jj="jjjj";
$mdDialog.hide($scope.selectJson);

}



//Get Course 
$scope.getTrainer=function(){
var activestatus=1;
$scope.isLoading=true;
if (!angular.isDefined(activestatus)) {
activestatus=$scope.activestatus;
};
console.log("activestatus"+activestatus);
trainerService.getTrainer(activestatus).then(function(response) {

$scope.getInternalTrainer=response.data;
$scope.isLoading=false;
if (prereqFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answerarr.length; j++) {
for (var i = 0; i < $scope.getInternalTrainer.length; i++) {
if (answerarr[j].title==$scope.getInternalTrainer[i].title) {
$scope.getInternalTrainer[i].Checked=true;
}

};

}

}


}else if (relFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answerarr.length; j++) {
for (var i = 0; i < $scope.getInternalTrainer.length; i++) {
if (answerarr[j].title==$scope.getInternalTrainer[i].title) {
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

// competency
// dialog to pick competency
$scope.showAdvancedCompetency = function(ev) {
var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
$mdDialog.show({
 controller: addTrainerController,
templateUrl: 'angular/view/TrainerManagement/Internal/dialog2.tmpl.html',
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
$scope.carrymodel.selectcompetency=answerarr;
console.log("Answer::"+JSON.stringify($scope.carrymodel.selectcompetency));
},function() {
$scope.status = 'You cancelled the dialog.';
});
$scope.$watch(function() {
return $mdMedia('xs') || $mdMedia('sm');
}, function(wantsFullScreen) {
$scope.customFullscreen = (wantsFullScreen === true);
});
};
$scope.checkOneComp=function(vindex){
console.log(JSON.stringify($scope.JsonResult));
}
$scope.checkAllComp = function () {
console.log("checkAll::"+prereqFlag);
if ($scope.selectedAll) {
$scope.selectedAll = true;

} else {
$scope.selectedAll = false;
}

angular.forEach($scope.getInternalCompetency, function (item) {
if (prereqFlag==true) {

if (answerarr.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answerarr TEM::"+JSON.stringify(answerarr));
for (var i =0; i <answerarr.length; i++) {
if (item.title==answerarr[i].title) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}else if (relFlag==true) {
if (relanswerarr.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answerarr TEM::"+JSON.stringify(relanswerarr));
for (var i =0; i <relanswerarr.length; i++) {
if (item.title==relanswerarr[i].title) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}
});
}
$scope.saveActionCompetency=function(){
console.log(JSON.stringify($scope.getInternalCompetency));
for(var i=0;i<$scope.getInternalCompetency.length;i++){
console.log("Final Result::"+JSON.stringify($scope.getInternalCompetency[i].Selected));
if ($scope.getInternalCompetency[i].Selected==false || !angular.isDefined($scope.getInternalCompetency[i].Selected)) {}else{
$scope.selectJson.push($scope.getInternalCompetency[i]);
};
}
console.log("Final Result::"+JSON.stringify($scope.selectJson));
$scope.jj="jjjj";
$mdDialog.hide($scope.selectJson);

}



//Get Course 
$scope.getCompetency=function(){
var activestatus=1;
$scope.isLoading=true;
if (!angular.isDefined(activestatus)) {
activestatus=$scope.activestatus;
};
console.log("activestatus"+activestatus);
trainerService.getCompetency(activestatus).then(function(response) {

$scope.getInternalCompetency=response.data;
$scope.isLoading=false;
if (prereqFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answerarr.length; j++) {
for (var i = 0; i < $scope.getInternalCompetency.length; i++) {
if (answerarr[j].title==$scope.getInternalCompetency[i].title) {
$scope.getInternalCompetency[i].Checked=true;
}

};

}

}


}else if (relFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answerarr.length; j++) {
for (var i = 0; i < $scope.getInternalCompetency.length; i++) {
if (answerarr[j].title==$scope.getInternalCompetency[i].title) {
$scope.getInternalCompetency[i].relChecked=true;
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
$scope.getCompetency();

$scope.removeCompetency=function(vindex){
      $scope.carrymodel.selectcompetency.splice(vindex,1);
    }

    
});





function addTrainerController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  
}
