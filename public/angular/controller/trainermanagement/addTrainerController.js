var app=angular.module("app");
var answerarr=[];
var answercer=[];
var answerarrt=[];
var prereqFlag=true;
var relFlag=false;
var finJSon;
var relanswerarr=[];
var relanswercer=[];
var relanswerarrt=[];
app.controller("addTrainerCtrl",function($scope,$location,$localStorage,$filter,$log,$mdDialog, $mdMedia,$q,$timeout,trainerService)
{ 


$scope.selectJson=[];

$scope.selectJsoncomp=[];
$scope.selectJsoncert=[];
// dialog to pick employee

//Tags
self.tags=[];
var skillarr=[];
self.item=[];
$scope.compInit=function(){
    if (!angular.isDefined($scope.carrymodel.tags)) {
      $scope.carrymodel.tags=[];
    }; 
  }
$scope.browseClick=function(){
  $scope.kok=false;
  console.log(JSON.stringify($scope.carrymodel));
}


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
$scope.saveAction=function(){
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
trainerService.getTrainer(activestatus).then(function(response) {

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
// auto complete


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
answercer.push(answer[i]);
}
$scope.carrymodel.selectcompetency=answercer;
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
console.log(JSON.stringify($scope.getInternalCompetency));
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

if (answercer.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answercer TEM::"+JSON.stringify(answercer));
for (var i =0; i <answercer.length; i++) {
if (item.skills==answercer[i].skills) {
item.Selected=false;
return;
}else{
item.Selected=$scope.selectedAll;
}
};
}else if (relFlag==true) {
if (relanswercer.length==0) {
item.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answercer TEM::"+JSON.stringify(relanswercer));
for (var i =0; i <relanswercer.length; i++) {
if (item.skills==relanswercer[i].skills) {
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
    if (prereqFlag==true) {
         for(var i=0;i<$scope.getInternalCompetency.length;i++){
        if ($scope.getInternalCompetency[i].Selected==false || !angular.isDefined($scope.getInternalCompetency[i].Selected)) {
        }else{
        $scope.selectJsoncomp.push($scope.getInternalCompetency[i]);
        alert("ddd"+JSON.stringify($scope.selectJsoncomp))
        };
        
      }
      $mdDialog.hide($scope.selectJsoncomp);
  }
  else if (relFlag==true) {
        for(var i=0;i<$scope.getInternalCompetency.length;i++){
          if ($scope.getInternalCompetency[i].relSelected==false || !angular.isDefined($scope.getInternalCompetency[i].relSelected)) {
          }else{
          $scope.selectJsoncomp.push($scope.getInternalCompetency[i]);
        };
    }
    $mdDialog.hide($scope.selectJsoncomp);
    }
}
$scope.saveActionCompetency=function(){
    if (prereqFlag==true) {
         for(var i=0;i<$scope.getInternalCompetency.length;i++){
        if ($scope.getInternalCompetency[i].Selected==false || !angular.isDefined($scope.getInternalCompetency[i].Selected)) {
        }else{
        $scope.selectJsoncomp.push($scope.getInternalCompetency[i]);
        alert("ddd"+JSON.stringify($scope.selectJsoncomp))
        };
        
      }
      $mdDialog.hide($scope.selectJsoncomp);
  }
  else if (relFlag==true) {
        for(var i=0;i<$scope.getInternalCompetency.length;i++){
          if ($scope.getInternalCompetency[i].relSelected==false || !angular.isDefined($scope.getInternalCompetency[i].relSelected)) {
          }else{
          $scope.selectJsoncomp.push($scope.getInternalTrainer[i]);
        };
    }
    $mdDialog.hide($scope.selectJsoncomp);
    }
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
for (var j=0; j < answercer.length; j++) {
for (var i = 0; i < $scope.getInternalCompetency.length; i++) {
if (answercer[j].skills==$scope.getInternalCompetency[i].skills) {
$scope.getInternalCompetency[i].Checked=true;
}

};

}

}


}else if (relFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answercer.length; j++) {
for (var i = 0; i < $scope.getInternalCompetency.length; i++) {
if (answercer[j].skills==$scope.getInternalCompetency[i].skills) {
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

// certification


// competency
// dialog to pick competency
$scope.showAdvancedCertification = function(ev) {
var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
$mdDialog.show({
 controller: addTrainerController,
templateUrl: 'angular/view/TrainerManagement/Internal/dialog3.tmpl.html',
parent: angular.element(document.body),
targetEvent: ev,
clickOutsideToClose:true,
fullscreen: useFullScreen
})
.then(function(answer) {
console.log("ok"+JSON.stringify(answer));
for(var i=0;i<answer.length;i++){
answerarrt.push(answer[i]);
}
$scope.carrymodel.selectcertification=answerarrt;
console.log("Answer::"+JSON.stringify($scope.carrymodel.selectcertification));
},function() {
$scope.status = 'You cancelled the dialog.';
});
$scope.$watch(function() {
return $mdMedia('xs') || $mdMedia('sm');
}, function(wantsFullScreen) {
$scope.customFullscreen = (wantsFullScreen === true);
});
};
$scope.checkOneCertf=function(vindex){
console.log(JSON.stringify($scope.getInternalCertification));
}
$scope.checkAllCertf = function () {
console.log("checkAll::"+prereqFlag);
if ($scope.selectedAll) {
$scope.selectedAll = true;

} else {
$scope.selectedAll = false;
}

angular.forEach($scope.getInternalCertification, function (items) {
if (prereqFlag==true) {

if (answerarrt.length==0) {
items.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(items));
console.log("answerarrt TEM::"+JSON.stringify(answerarrt));
for (var i =0; i <answerarrt.length; i++) {
if (items.Certification==answerarrt[i].Certification) {
items.Selected=false;
return;
}else{
items.Selected=$scope.selectedAll;
}
};
}else if (relFlag==true) {
if (relanswerarrt.length==0) {
items.Selected = $scope.selectedAll;
};
console.log("Checked TEM::"+JSON.stringify(item));
console.log("answerarrt TEM::"+JSON.stringify(relanswerarrt));
for (var i =0; i <relanswerarrt.length; i++) {
if (items.Certification==relanswerarrt[i].Certification) {
items.Selected=false;
return;
}else{
items.Selected=$scope.selectedAll;
}
};
}
});
}
$scope.saveActionCertification=function(){
console.log(JSON.stringify($scope.getInternalCertification));
for(var i=0;i<$scope.getInternalCertification.length;i++){
console.log("Final Result::"+JSON.stringify($scope.getInternalCertification[i].Selected));
if ($scope.getInternalCertification[i].Selected==false || !angular.isDefined($scope.getInternalCertification[i].Selected)) {}else{
$scope.selectJsoncert.push($scope.getInternalCertification[i]);
};
}
console.log("Final Result::"+JSON.stringify($scope.selectJsoncert));
$scope.jj="jjjj";
$mdDialog.hide($scope.selectJsoncert);

}



//Get Course 
$scope.getCertification=function(){
var activestatus=1;
$scope.isLoading=true;
if (!angular.isDefined(activestatus)) {
activestatus=$scope.activestatus;
};
console.log("activestatus"+activestatus);
trainerService.getCertification(activestatus).then(function(response) {

$scope.getInternalCertification=response.data;
$scope.isLoading=false;
if (prereqFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answerarrt.length; j++) {
for (var i = 0; i < $scope.getInternalCertification.length; i++) {
if (answerarrt[j].Certification==$scope.getInternalCertification[i].Certification) {
$scope.getInternalCertification[i].Checked=true;
}

};

}

}


}else if (relFlag==true) {


if (response.data.length>0) {
for (var j=0; j < answerarrt.length; j++) {
for (var i = 0; i < $scope.getInternalCertification.length; i++) {
if (answerarrt[j].Certification==$scope.getInternalCertification[i].Certification) {
$scope.getInternalCertification[i].relChecked=true;
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
$scope.getCertification();

$scope.removeCertification=function(vindex){
      $scope.carrymodel.selectcertification.splice(vindex,1);
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
