var app = angular.module('app');
   var prereqFlag;
   var PreCourseFlag;
   var PostCourseFlag;

app.controller('addElearnCtrl',function($scope,$mdDialog, $mdMedia,$q, $log,$timeout,$location,$routeParams,$http,courseService){


//AUTOCOMPLETE STARTS
var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    self.readonly = false;
    self.internals     = loadInternal();
    self.vendors     = loadvendor();
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
     self.querySearchinternal   = querySearchinternal;
    self.querySearchvendor   = querySearchvendor;
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


    var skillarr=[];
//AUTOCOMPLETE ENDS
//AUTOCOMPLETE CHIPS STARTS

//AUTOCOMPLETE CHIPS ENDS



  $scope.JsonResult=[
  {"id":"101","title":"OOPS","type":"ILT","duration":"70Hrs"},
  {"id":"102","title":"RDBMS","type":"ILT","duration":"50Hrs"}
  ];
  $scope.selectJson=[];
  $scope.preCourseJson=[];
  $scope.postCourseJson=[];





$scope.showAdvanced = function(ev) {
  console.log(JSON.stringify($scope.JsonResult));
   prereqFlag=true;
   PreCourseFlag=false;
   PostCourseFlag=false;
  
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: addElearnController,
      templateUrl: 'angular/view/ElearnManagement/dialog1.tmpl.html',
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
  
$scope.showPreCourse = function(ev) {
console.log("inside show pre_course")
  console.log(JSON.stringify($scope.JsonResult));
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: addElearnController,
      templateUrl: 'angular/view/ElearnManagement/preCourse.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {      
      $scope.carrymodel.selectPre_course=answer;
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
   


    $scope.showPostCourse = function(ev) {

  console.log(JSON.stringify($scope.JsonResult));
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: addElearnController,
      templateUrl: 'angular/view/ElearnManagement/postCourse.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      console.log("ok"+JSON.stringify(answer));
      $scope.carrymodel.selectPost_course=answer;
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
  
   $scope.showRelatedCourse = function(ev) {

  console.log(JSON.stringify($scope.JsonResult));
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: addElearnController,
      templateUrl: 'angular/view/ElearnManagement/relatedCourse.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      console.log("ok"+JSON.stringify(answer));
      $scope.carrymodel.selectRelCourse = answer;
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
   

  /**/
$scope.checkOne=function(vindex){
console.log(JSON.stringify($scope.getILTCourse));
}
$scope.checkAll = function () {
  console.log("checkAll::"+prereqFlag);
        if ($scope.selectedAll) {
            $scope.selectedAll = true;

        } else {
            $scope.selectedAll = false;
        }

    //     angular.forEach($scope.getILTCourse, function (item) {
    //       if (prereqFlag==true) {

    //                  if (answerarr.length==0) {
    //               item.Selected = $scope.selectedAll;
    //             };
    //               console.log("Checked TEM::"+JSON.stringify(item));
    //               console.log("answerarr TEM::"+JSON.stringify(answerarr));
    //               for (var i =0; i <answerarr.length; i++) {
    //                if (item.title==answerarr[i].title) {
    //                 item.Selected=false;
    //                 return;
    //                }else{
    //                 item.Selected=$scope.selectedAll;
    //                }
    //               };
                    
                


    //       }else if (relFlag==true) {


    //          if (relanswerarr.length==0) {
    //       item.Selected = $scope.selectedAll;
    //     };
    //       console.log("Checked TEM::"+JSON.stringify(item));
    //       console.log("answerarr TEM::"+JSON.stringify(relanswerarr));
    //       for (var i =0; i <relanswerarr.length; i++) {
    //        if (item.title==relanswerarr[i].title) {
    //         item.Selected=false;
    //         return;
    //        }else{
    //         item.Selected=$scope.selectedAll;
    //        }
    //       };
            
       


    //       }
         
        
    // });
}
     $scope.saveAction=function(){
      console.log(JSON.stringify($scope.getILTCourse));
      for(var i=0;i<$scope.getILTCourse.length;i++){
         console.log("Final Result::"+JSON.stringify($scope.getILTCourse[i].Selected));
        if ($scope.getILTCourse[i].Selected==false || !angular.isDefined($scope.getILTCourse[i].Selected)) {}else{
        $scope.selectJson.push($scope.getILTCourse[i]);
      };
        
      }
      console.log("Final Result::"+JSON.stringify($scope.selectJson));
       $scope.jj="jjjj";
      $mdDialog.hide($scope.selectJson);

    }
    
    $scope.saveAction2=function(){
      console.log(JSON.stringify($scope.getILTCourse));
      for(var i=0;i<$scope.getILTCourse.length;i++){
         console.log("Final Result::"+JSON.stringify($scope.getILTCourse[i].Selected));
        if ($scope.getILTCourse[i].preSelected==false || !angular.isDefined($scope.getILTCourse[i].preSelected)) {}else{
        $scope.preCourseJson.push($scope.getILTCourse[i]);
        
      };
        
      }
      console.log("Final Result::"+JSON.stringify($scope.preCourseJson));
       $scope.jj="jjjj";
      $mdDialog.hide($scope.preCourseJson);

    }
    
    $scope.saveAction3=function(){
      console.log(JSON.stringify($scope.getILTCourse));
      for(var i=0;i<$scope.getILTCourse.length;i++){
         console.log("Final Result::"+JSON.stringify($scope.getILTCourse[i].Selected));
        if ($scope.getILTCourse[i].postSelected==false || !angular.isDefined($scope.getILTCourse[i].postSelected)) {}else{
        $scope.postCourseJson.push($scope.getILTCourse[i]);
        
      };
        
      }
      console.log("Final Result::"+JSON.stringify($scope.postCourseJson));
       $scope.jj="jjjj";
      $mdDialog.hide($scope.postCourseJson);

    }
    
     $scope.saveAction4=function(){
      console.log(JSON.stringify($scope.getILTCourse));
      for(var i=0;i<$scope.getILTCourse.length;i++){
         console.log("Final Result::"+JSON.stringify($scope.getILTCourse[i].Selected));
        if ($scope.getILTCourse[i].relSelected==false || !angular.isDefined($scope.getILTCourse[i].relSelected)) {}else{
        $scope.postCourseJson.push($scope.getILTCourse[i]);
        
      };
        
      }
      console.log("Final Result::"+JSON.stringify($scope.postCourseJson));
       $scope.jj="jjjj";
      $mdDialog.hide($scope.postCourseJson);

    }
    
    
    
   
    $scope.removeCourse=function(vindex){
      $scope.carrymodel.selectPrereq.splice(vindex,1);
    }
    $scope.removePreCourse=function(vindex){
      $scope.carrymodel.selectPre_course.splice(vindex,1);
    }
     $scope.removePostCourse=function(vindex){
      $scope.carrymodel.selectPost_course.splice(vindex,1);
    }
     $scope.removeRelCourse=function(vindex){
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
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }




//INITIAL LOADS


//Internally Developed Load
function loadInternal() {
      var allStates = ' internal developed 1,\
                        internal developed 2,\
                        internal developed 3,\
                        internal developed 4,\
                        internal developed 5';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

// Selected Vendor Load
function loadvendor() {
      var allStates = ' vendor developed 1,\
                        vendor developed 2,\
                        vendor developed 3,\
                        vendor developed 4,\
                        vendor developed 5';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

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



// Internally Developed Courses
     function querySearchinternal (query) {
      console.log("query::"+query);
      var results = query ? self.internals.filter( createFilterFor(query) ) : self.internals,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    // Vendor Developed Course
      function querySearchvendor (query) {
      console.log("query::"+query);
      var results = query ? self.vendors.filter( createFilterFor(query) ) : self.vendors,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
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
         $scope.addElearn.skills=arrUnique;
        
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
  if ($scope.addElearn.regapprove==true) {
    $scope.addElearn.reglevel=1;
  };
}
$scope.exmchange=function(){
  if ($scope.addElearn.exmapprove==true) {
    $scope.addElearn.exmlevel=1;
  };
}
$scope.costchange=function(){
  if ($scope.addElearn.costapprove==true) {
    $scope.addElearn.costlevel=1;
  };
}

//Submit Course

$scope.submitaction=function(addCourse){
console.log("SubmitCOurse");
$scope.isLoading=true;
courseService.addCourse(addCourse).then(function(response) {
console.log("Insert Response::"+response);
$scope.isLoading=false;
if (response) {
  $location.path("/managecourse");
};
})
}



//Get Course 
$scope.getCourse=function(){
  var activestatus=1;
  $scope.isLoading=true;
  if (!angular.isDefined(activestatus)) {
  activestatus=$scope.activestatus;
};
  console.log("activestatus"+activestatus);
  courseService.getCourse(activestatus).then(function(response) {

$scope.getILTCourse=response.data;
$scope.isLoading=false;
 if (prereqFlag==true) {


        if (response.data.length>0) {
           for (var j=0; j < answerarr.length; j++) {
              for (var i = 0; i < $scope.getILTCourse.length; i++) {
             if (answerarr[j].title==$scope.getILTCourse[i].title) {
              $scope.getILTCourse[i].Checked=true;
            }
              
          };
          
        }

        }


 }else if (PreCourseFlag==true) {


          if (response.data.length>0) {
             for (var j=0; j < answerarr.length; j++) {
                for (var i = 0; i < $scope.getILTCourse.length; i++) {
               if (answerarr[j].title==$scope.getILTCourse[i].title) {
                $scope.getILTCourse[i].preChecked=true;
              }
                
            };
            
          }

          }



 }
 else if (PostCourseFlag==true) {

          if (response.data.length>0) {
             for (var j=0; j < answerarr.length; j++) {
                for (var i = 0; i < $scope.getILTCourse.length; i++) {
               if (answerarr[j].title==$scope.getILTCourse[i].title) {
                $scope.getILTCourse[i].postChecked=true;
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
$scope.getCourse();

  });
  




function addElearnController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };

   $scope.courses='';
    $scope.isShown = function(courses) {
        return courses === $scope.courses;
    };

    $scope.courses='one';
  
}
