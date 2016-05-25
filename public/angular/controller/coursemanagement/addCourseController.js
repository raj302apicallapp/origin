var app=angular.module('app');
var CoordinatorResponse=[];
var finJSon;
app.controller('addCourseCtrl',function($scope,$mdDialog, $mdMedia,$q, $log,$timeout,$location,courseService,$routeParams,$localStorage,$http){
if ($location.path()=="/editcourse") {
console.log(finJSon);
if (!angular.isDefined(finJSon)) {
  console.log("LocalStorage:"+$localStorage.currentPath);
  console.log("Addco"+angular.isDefined(finJSon));
  console.log("Enter into editcourse page"+$routeParams.encrypt);
console.log($routeParams.encrypt);
courseService.getEditCourse($routeParams.encrypt).then(function(response) {
if (response) {
// console.log("Get Course List::"+JSON.stringify(response));
finJSon=response.data[0];

};
$scope.carrymodel=finJSon;
console.log("Get Course List::"+JSON.stringify($scope.carrymodel));
});

};


};

//AUTOCOMPLETE STARTS
var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    self.readonly = false;
    //Assign
    self.entitys        = loadEntity();
    self.groups         = loadGroup();
    self.departments    = loadDepartment();
    self.functions      = loadFunction();
    self.jobfamilys     = loadJobFamily();
    self.jobroles       = loadJobRole();
    self.competencys    = loadCompetency();
    self.subcompetencys = loadsubcompetency();


    //search
    self.querySearchEntity = querySearchEntity;
    self.querySearchGroup  = querySearchGroup;
    self.querySearchDepartment  = querySearchDepartment;
    self.querySearchFunction    = querySearchFunction;
    self.querySearchJobFamily   = querySearchJobFamily;
    self.querySearchJobRole   = querySearchJobRole;
    self.querySearchCompetency   = querySearchCompetency;
    self.querySearchsubcompetency   = querySearchsubcompetency;

    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.newState = newState;

    //Tags
    self.tags=[];

$scope.browsefile=false;
    var skillarr=[];
//AUTOCOMPLETE ENDS
//AUTOCOMPLETE CHIPS STARTS

//AUTOCOMPLETE CHIPS ENDS



  $scope.JsonResult=[
	{"id":"101","title":"OOPS","type":"ILT","duration":"70Hrs"},
	{"id":"102","title":"RDBMS","type":"ILT","duration":"50Hrs"}
	];
  $scope.selectJson=[];
$scope.compInit=function(){
    if (!angular.isDefined($scope.carrymodel.tags)) {
      $scope.carrymodel.tags=[];
    }; 
  }
$scope.browseClick=function(){
  console.log("browse");
	$scope.kok=false;
  $scope.browsefile=true;
	console.log(JSON.stringify($scope.carrymodel));
}
$scope.uploadClick=function(carrymodel){
	$scope.kok=true;
  // $scope.browsefile=true;
	console.log(JSON.stringify(carrymodel));
	console.log(carrymodel.localfile);

var fd = new FormData();
  fd.append('images', carrymodel.localfile);
  
  var xhr = new XMLHttpRequest();
  xhr.open('post', '/upload', true);
  
  xhr.upload.onprogress = function(e) {
  if (e.lengthComputable) {
  var percentage = (e.loaded / e.total) * 100;
    $scope.$apply(function() {
    $scope.progressValue=percentage.toFixed(1);
    if ($scope.progressValue>0 && $scope.progressValue<=100) {
      $scope.showProgress=true;
    }else{
      $scope.showProgress=false;
    }
    }); 
    console.log("Percentage::"+$scope.progressValue);
  }
};

xhr.onerror = function(e) {
  // showInfo('An error occurred while submitting the form. Maybe your file is too big');
  console.log("error");
};

xhr.onload = function() {
  // showInfo(this.statusText);
  console.log("onload");
  console.log(this.statusText);
  console.log(JSON.stringify(this));
  $scope.$apply(function() {
  $scope.showProgress=false;

}); 

  
};

xhr.send(fd);
 



 var promise = $http.post("/upload", fd, {
                              withCredentials: false,
                              headers: {
                                'Content-Type': undefined
                              },
                              transformRequest: angular.identity,
                              params: {
                                fd
                              },
                              // responseType: "arraybuffer"
                            })
                            .success(function(response, status, headers, config) {
                             console.log(JSON.stringify(response));
                             if (response) {
                              $scope.carrymodel.filePath=response.imgPath;
                               console.log("Upload Server URL::"+$scope.carrymodel.filePath);

                              
                             };
                            })
                            .error(function(error, status, headers, config) {
                              console.log(error);
                            });
          // Return the promise to the controller
          return promise;
 
  








}
$scope.showAdvanced = function(ev) {
  console.log("ho");
  console.log(JSON.stringify($scope.JsonResult));
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: addCourseController,
      templateUrl: 'angular/view/CourseManagement/addcourse/dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      console.log("ok"+JSON.stringify(answer));
      $scope.carrymodel.selectPrereq=answer;
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
  $scope.showAdvanced1 = function(ev) {
  console.log(JSON.stringify($scope.JsonResult));
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: addCourseController,
      templateUrl: 'angular/view/CourseManagement/addcourse/dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      console.log("ok"+JSON.stringify(answer));
      $scope.carrymodel.selectRelCourse=answer;
    }, function() {
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
        if ($scope.selectedAll) {
            $scope.selectedAll = true;

        } else {
            $scope.selectedAll = false;
        }
        
        angular.forEach($scope.JsonResult, function (item) {
            item.Selected = $scope.selectedAll;
        });
        console.log("$scope.JsonResult::"+JSON.stringify($scope.JsonResult));
    };
    $scope.saveAction=function(){
      console.log(JSON.stringify($scope.JsonResult));
      for(var i=0;i<$scope.JsonResult.length;i++){
         console.log("Final Result::"+JSON.stringify($scope.JsonResult[i].Selected));
        if ($scope.JsonResult[i].Selected==false || !angular.isDefined($scope.JsonResult[i].Selected)) {}else{
        $scope.selectJson.push($scope.JsonResult[i]);
      };
        
      }
      console.log("Final Result::"+JSON.stringify($scope.selectJson));
       $scope.jj="jjjj";
      $mdDialog.hide($scope.selectJson);
    }
    $scope.removeCourse=function(vindex){
      $scope.carrymodel.selectPrereq.splice(vindex,1);
    }
    $scope.removeCourse1=function(vindex){
      $scope.carrymodel.selectRelCourse.splice(vindex,1);
    }







//MD AUTOCOMPLETE

function newState(state) {
      alert("Sorry! You'll need to create a Constituion for " + state + " first!");
}
function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }
    
   
   
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        console.log("FILTER::"+JSON.stringify(state));
        return (state.indexOf(lowercaseQuery) === 0);
      };
    }




//INITIAL LOADS

//Entity load
function loadEntity() {
      var allStates = ' Entity 1,\
                        Entity 2,\
                        Entity 3,\
                        Entity 4,\
                        Entity 5';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
//Group Load
function loadGroup() {
      var allStates = ' Group 1,\
                        Group 2,\
                        Group 3,\
                        Group 4,\
                        Group 5';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
//Department Load
function loadDepartment() {
      var allStates = ' Department 1,\
                        Department 2,\
                        Department 3,\
                        Department 4,\
                        Department 5';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
//Function Load
function loadFunction() {
      var allStates = ' Function 1,\
                        Function 2,\
                        Function 3,\
                        Function 4,\
                        Function 5';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

//JobFamily Load
function loadJobFamily() {
      var allStates = ' JobFamily 1,\
                        JobFamily 2,\
                        JobFamily 3,\
                        JobFamily 4,\
                        JobFamily 5';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
//JobRole Load
function loadJobRole() {
      var allStates = ' JobRole 1,\
                        JobRole 2,\
                        JobRole 3,\
                        JobRole 4,\
                        JobRole 5';
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


//Entity Fetch
function querySearchEntity (query) {
      console.log("query::"+query);
      var results = query ? self.entitys.filter( createFilterFor(query) ) : self.entitys,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
//Group Fetch
     function querySearchGroup (query) {
      console.log("query::"+query);
      var results = query ? self.groups.filter( createFilterFor(query) ) : self.groups,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
//Department
     function querySearchDepartment (query) {
      console.log("query::"+query);
      var results = query ? self.departments.filter( createFilterFor(query) ) : self.departments,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
//Function
     function querySearchFunction (query) {
      console.log("query::"+query);
      var results = query ? self.functions.filter( createFilterFor(query) ) : self.functions,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
//Job Family
     function querySearchJobFamily (query) {
      console.log("query::"+query);
      var results = query ? self.jobfamilys.filter( createFilterFor(query) ) : self.jobfamilys,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
//Job Role
     function querySearchJobRole (query) {
      console.log("query::"+query);
      var results = query ? self.jobroles.filter( createFilterFor(query) ) : self.jobroles,
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
//MD CHIPS
//SkillSets
    var pendingSearch, cancelSearch = angular.noop;
    var cachedQuery, lastSearch;
    self.allSkills = loadSkills();
    self.Skills = [self.allSkills[0]];
    self.asyncSkills = [];
    self.filterSelected = true;
    self.querySearchSkills = querySearchSkills;
    self.delayedQuerySearchSkills = delayedQuerySearchSkills;

    function querySearchSkills (criteria) {

      cachedQuery = cachedQuery || criteria;

      var k= cachedQuery ? self.allSkills.filter(createFilterForSkills(cachedQuery)) : [];
      // console.log("k="+JSON.stringify(k));
      // console.log("arr="+JSON.stringify(skillarr));

      var arrUnique = unique(skillarr);
         // console.log("sek:"+JSON.stringify(arrUnique));
         $scope.carrymodel.skills=arrUnique;
        
      return k;
    }
    
    function delayedQuerySearchSkills(criteria) {
      cachedQuery = criteria;
      if ( !pendingSearch || !debounceSearch() )  {
        cancelSearch();
        return pendingSearch = $q(function(resolve, reject) {
          cancelSearch = reject;
          $timeout(function() {
            resolve( self.querySearchSkills() );
            refreshDebounce();
          }, Math.random() * 500, true)
        });
      }
      return pendingSearch;
    }
    function refreshDebounce() {
      lastSearch = 0;
      pendingSearch = null;
      cancelSearch = angular.noop;
    }
   
    function debounceSearch() {
      var now = new Date().getMilliseconds();
      lastSearch = lastSearch || now;
      return ((now - lastSearch) < 300);
    }
  

var unique = function(origArr) {
    var newArr = [],
        origLen = origArr.length,
        found, x, y;

    for (x = 0; x < origLen; x++) {
        found = undefined;
        for (y = 0; y < newArr.length; y++) {
            if (origArr[x] === newArr[y]) {
                found = true;
                break;
            }
        }
        if (!found) {
            newArr.push(origArr[x]);
        }
    }
    return newArr;
}
function createFilterForSkills(query) {

      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(skills) {
         if (angular.isDefined(skills.$$hashKey)) {
          skillarr.push(skills);
         };
         // console.log(JSON.stringify(skillarr));
        return (skills._lowername.indexOf(lowercaseQuery) != -1);
      };
    }
function loadSkills() {

      var lskills = [
        'Skills 1',
        'Skills 2',
        'Skills 3',
        'Skills 4',
        'Skills 5'
      ];
      return lskills.map(function (c, index) {
        var cParts = c.split(' ');
        var skill = {
          name: c
        };
        skill._lowername = skill.name.toLowerCase();
        return skill;
      });
    }





//4.html
$scope.regchange=function(){
  if ($scope.carrymodel.regapprove==true) {
    $scope.carrymodel.reglevel=1;
  };
}
$scope.exmchange=function(){
  if ($scope.carrymodel.exmapprove==true) {
    $scope.carrymodel.exmlevel=1;
  };
}
$scope.costchange=function(){
  if ($scope.carrymodel.costapprove==true) {
    $scope.carrymodel.costlevel=1;
  };
}






//ILT SESSION
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
   
    
//Decleration
    //Program Coordinator
    self.Coordinators=[];
    self.querySearchCoordinator   = querySearchCoordinator;
    self.selectedCoordinatorChange = selectedCoordinatorChange;
    self.searchCoordinatorChange   = searchCoordinatorChange;



    self.VendorTypes = loadVendorTypes();
    self.TrainerVendors = loadTrainerVendors();
    self.ContentVendors = loadContentVendors();
    self.EmailIDs = loadEmailID();
    self.Rooms = loadRoom();
    
    self.querySearchVendorTypes = querySearchVendorTypes;
    self.querySearchTrainerVendors = querySearchTrainerVendors;
    self.querySearchContentVendors = querySearchContentVendors;
    self.querySearchEmailID = querySearchEmailID;
    self.querySearchRoom = querySearchRoom;


//INITIAL LOADS






  //Vendor load
function loadVendorTypes() {
      var allStates = ' Internal,\
                        External';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
//Vendor Type
     function querySearchVendorTypes (query) {
      console.log("query::"+query);
      var results = query ? self.VendorTypes.filter( createFilterFor(query) ) : self.VendorTypes,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }  

//Trainer Vendor load
function loadTrainerVendors() {
      var allStates = ' Trainer 1,\
                        Trainer 2,\
                        Trainer 3,\
                        Trainer 4,\
                        Trainer 5';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
//Trainer Vendor Type
     function querySearchTrainerVendors (query) {
      console.log("query::"+query);
      var results = query ? self.TrainerVendors.filter( createFilterFor(query) ) : self.TrainerVendors,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }  


  //Content Vendor load
function loadContentVendors() {
      var allStates = ' ContentVendor 1,\
                        ContentVendor 2,\
                        ContentVendor 3,\
                        ContentVendor 4,\
                        ContentVendor 5';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
//Content Vendor Type
     function querySearchContentVendors (query) {
      console.log("query::"+query);
      var results = query ? self.ContentVendors.filter( createFilterFor(query) ) : self.ContentVendors,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }  

  //EmailID load
function loadEmailID() {
      var allStates = ' email1@mail.com,\
                        email2@mail.com,\
                        email3@mail.com,\
                        email4@mail.com,\
                        email5@mail.com';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
//EmailID
     function querySearchEmailID (query) {
      console.log("query::"+query);
      var results = query ? self.EmailIDs.filter( createFilterFor(query) ) : self.EmailIDs,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }  



 //Room load
function loadRoom() {
      var allStates = ' Room 1,\
                        Room 2,\
                        Room 3,\
                        Room 4,\
                        Room 5';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
//Room
     function querySearchRoom(query) {
      console.log("query::"+query);
      var results = query ? self.Rooms.filter( createFilterFor(query) ) : self.Rooms,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }  






//Get Program Coordinator-ServiceCall
$scope.getProgramCoordinator=function(){
  courseService.getProgramCoordinator().then(function(response){
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


$scope.submitaction=function(addCourse){
console.log("Submit");
}

  });




function addCourseController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  
}









