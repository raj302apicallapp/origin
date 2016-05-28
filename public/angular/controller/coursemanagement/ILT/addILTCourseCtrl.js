/***Global Declaration***/
var answerarr=[];
var relanswerarr=[];
var prereqFlag=true;
var relFlag=false;
var MasterResponse=[];
var editableJson={};
var acount=0;//for first time page load

var app=angular.module('app');
app.controller('addILTCourseCtrl',function($scope,$mdDialog, $mdMedia,$q, $log,$timeout,$location,courseService,ILService,$routeParams,$localStorage,$http){
$scope.selectJson=[];

// $scope.carrymodel={};
/********************DECLERATION -AUTOCOMPLETE STARTS****************/
	var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    self.readonly = false;

    //Entity
    self.querySearchEntity = querySearchEntity;
    self.selectedEntityChange = selectedEntityChange;
    self.searchEntityChange   = searchEntityChange;
    // Group
    self.querySearchGroup  = querySearchGroup;
    self.selectedGroupChange = selectedGroupChange;
    self.searchGroupChange   = searchGroupChange;
    // Department
    self.querySearchDepartment  = querySearchDepartment;
    self.selectedDepartmentChange = selectedDepartmentChange;
    self.searchDepartmentChange   = searchDepartmentChange;
    // Function
    self.querySearchFunction    = querySearchFunction;
    self.selectedFunctionChange = selectedFunctionChange;
    self.searchFunctionChange   = searchFunctionChange;
    // JobFamily
    self.querySearchJobFamily   = querySearchJobFamily;
    self.selectedJobFamilyChange = selectedJobFamilyChange;
    self.searchJobFamilyChange   = searchJobFamilyChange;
    // JobRole
    self.querySearchJobRole   = querySearchJobRole;
    self.selectedJobRoleChange = selectedJobRoleChange;
    self.searchJobRoleChange   = searchJobRoleChange;  
  	// Compentency
    self.querySearchCompetency   = querySearchCompetency;
    self.selectedCompetencyChange = selectedCompetencyChange;
    self.searchCompetencyChange   = searchCompetencyChange;
  	// SubCompetency
    self.querySearchSubcompetency   = querySearchSubcompetency;
    self.selectedSubcompetencyChange = selectedSubcompetencyChange;
    self.searchSubcompetencyChange   = searchSubcompetencyChange;

    //Tags
    self.tags=[];
    var skillarr=[];
/********************DECLERATION -AUTOCOMPLETE ENDS******************/

/********************DECLERATION -SKILLS STARTS*****************/
	var pendingSearch, cancelSearch = angular.noop;
    var cachedQuery, lastSearch;
    
    self.asyncContacts = [];
    self.filterSelected = true;
    self.querySearch = querySearch;
    self.delayedQuerySearch = delayedQuerySearch;

/**********************DECIDE ADD/EDIT NAVIGATION STARTS*******************/
if ($location.path()=="/addcourse") {
  if (acount==0) {
    $scope.carrymodel={};
    $scope.carrymodel.induration='hrs';
  }
  acount=acount+1;
}else if($location.path()=='/editcourse'){
  if ($localStorage.currentPath=='/managecourse') {

          console.log("routeParams::"+$scope.getILTCourse);
    courseService.getEditCourse($routeParams.encrypt).then(function(response) {
      if (response) {
                
         
         setTimeout(function() {
          $scope.$apply(function () {
            editableJson=response.data[0]; 
          $localStorage.currentPath=$location.path();
          $scope.carrymodel=editableJson;
        });
       
        console.log("Edit carrymodel::"+JSON.stringify($scope.carrymodel));
        });
      };

    })

  }else{
    $scope.carrymodel=editableJson;
  }
}
if ($localStorage.currentPath=='/editcourse') {
    $scope.carrymodel=editableJson;
}



/**********************DECIDE ADD/EDIT NAVIGATION ENDS*******************/


/*******************DELERATION -SKILLS ENDS*****************/

$scope.compInit=function(){
    if (!angular.isDefined($scope.carrymodel.tags)) {
      $scope.carrymodel.tags=[];
    };
  $scope.getCompetencyMaster(); 
}
$scope.browseClick=function(){
  	$scope.kok=false;
}
$scope.uploadClick=function(carrymodel){
	$scope.kok=true;
	uploadinit();
}
$scope.showAdvanced = function(ev) {
  prereqFlag=true;
  relFlag=false;

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
      for(var i=0;i<answer.length;i++){
         answerarr.push(answer[i]);
      }
      $scope.carrymodel.selectPrereq=answerarr;
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  }
$scope.showAdvanced1 = function(ev) {
 prereqFlag=false;
 relFlag=true;

   var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
     $mdDialog.show({
      controller: addCourseController,
      templateUrl: 'angular/view/CourseManagement/addcourse/relCourse.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      for(var i=0;i<answer.length;i++){
         relanswerarr.push(answer[i]);
      }
      $scope.carrymodel.selectRelCourse=relanswerarr;
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  }
$scope.checkOne=function(vindex){}
$scope.checkAll = function () {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }

        angular.forEach($scope.getILTCourse, function (item) {
          if (prereqFlag==true) {
          	if (answerarr.length==0) {
                  item.Selected = $scope.selectedAll;
                };
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
		          item.relSelected = $scope.selectedAll;
		        };
          for (var i =0; i <relanswerarr.length; i++) {
           if (item.title==relanswerarr[i].title) {
            item.relSelected=false;
            return;
           }else{
            item.relSelected=$scope.selectedAll;
           }
          };
         }
        });
}
$scope.saveAction=function(){
    if (prereqFlag==true) {
         for(var i=0;i<$scope.getILTCourse.length;i++){
        if ($scope.getILTCourse[i].Selected==false || !angular.isDefined($scope.getILTCourse[i].Selected)) {
        }else{
        $scope.selectJson.push($scope.getILTCourse[i]);
        
       	};
        
      }
      $mdDialog.hide($scope.selectJson);
	}
	else if (relFlag==true) {
        for(var i=0;i<$scope.getILTCourse.length;i++){
        	if ($scope.getILTCourse[i].relSelected==false || !angular.isDefined($scope.getILTCourse[i].relSelected)) {
        	}else{
        	$scope.selectJson.push($scope.getILTCourse[i]);
       	};
    }
    $mdDialog.hide($scope.selectJson);
    }
}
$scope.removeCourse=function(vindex){
      $scope.carrymodel.selectPrereq.splice(vindex,1);
}
$scope.removeCourse1=function(vindex){
      $scope.carrymodel.selectRelCourse.splice(vindex,1);
}
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
$scope.submitaction=function(addCourse){
$scope.isLoading=true;
courseService.addCourse(addCourse).then(function(response) {
	$scope.isLoading=false;
	if (response) {
  		$location.path("/managecourse");
	};
})
}
/*******************GETCOURSE STARTS*********************/ 
$scope.getCourse=function(){
  var activestatus=1;
  $scope.isLoading=true;
  if (!angular.isDefined(activestatus)) 
  {
  	activestatus=$scope.activestatus;
  };
 courseService.getCourse(activestatus).then(function(response) {
	$scope.getILTCourse=response.data;//getILTCourse
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
	}else if (relFlag==true) {
		if (response.data.length>0) {
            for (var j=0; j < relanswerarr.length; j++) {
               for (var i = 0; i < $scope.getILTCourse.length; i++) {
               	if (relanswerarr[j].title==$scope.getILTCourse[i].title) {
                	$scope.getILTCourse[i].relChecked=true;
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
$scope.getCourse();//call course
/*******************GETCOURSE ENDS*********************/ 

/**********************MASTER CALLS STARTS********************/
/***************EGDF MASTER STARTS************/

$scope.getEGDFmaster=function () {
    $scope.EntityMasterList=[];
    courseService.getEGDFmaster().then(function(response) {
       $scope.EntityMasterList=response.data;
       console.log("MASTER::getEGDFmaster::"+JSON.stringify($scope.EntityMasterList));
        if ($scope.EntityMasterList) {
  			 $scope.getEGDFEntity($scope.EntityMasterList);
 		return;
		};
	
	})
	$scope.getJRmaster();//call jobrolemaster   
}
/***************EGDF MASTER ENDS************/
/***************JR MASTER STARTS************/
$scope.getJRmaster=function () {
    $scope.JobFmailyList=[];
    courseService.getJRmaster().then(function(response) {
       if (response.data) {
        $scope.JobFmailyMasterList=response.data;
        $scope.getJobFamily($scope.JobFmailyMasterList);
       };
    })      
}
/***************JR MASTER ENDS************/
/***************EGDF ENTITY MASTER STARTS************/
$scope.getEGDFEntity=function(masterList){
	var arrList=[];
	self.entitys=[];
	  for (var l=0; l<masterList.length; l++) {
	    arrList.push(masterList[l].entity);
	  };
	var uniqueNames = [];
	var i=0;
	  $.each(arrList, function(i, el){
	      if($.inArray(el, uniqueNames) === -1){
	        uniqueNames.push(el);
	      }
	      i=i+1;
	  });
	self.entitys=uniqueNames;
	console.log("self.entitys"+self.entitys);
 return;
}
/***************EGDF ENTITY MASTER ENDS************/

/***************EGDF GROUP MASTER STARTS************/
$scope.getEGDFGroup=function(selectedEntity){
   	self.groups=[];
      for (var i =0; i <$scope.EntityMasterList.length; i++) {
        console.log("Entity for Selected::"+$scope.EntityMasterList[i].entity);
        console.log("selectedEntity::"+selectedEntity);
        if ($scope.EntityMasterList[i].entity==selectedEntity) {
          self.groups.push($scope.EntityMasterList[i].group);
        };
      };
 return; 
}
/***************EGDF GROUP MASTER ENDS************/

/***************EGDF DEPARTMENT MASTER STARTS************/
$scope.getEGDFDepartment=function(selectedGroup){
    self.departments=[];
      for (var i =0; i <$scope.EntityMasterList.length; i++) {
        console.log("Group for Selected::"+$scope.EntityMasterList[i].group);
        console.log("selectedGroup::"+selectedGroup);
        if ($scope.EntityMasterList[i].group==selectedGroup) {
          self.departments.push($scope.EntityMasterList[i].department);
          
        };
      };
 return; 
}
/***************EGDF DEPARTMENT MASTER ENDS************/

/***************EGDF FUNCTION MASTER STARTS************/
$scope.getEGDFFunction=function(selectedDepartment){
     self.functions=[];
     for (var i =0; i <$scope.EntityMasterList.length; i++) {
        console.log("Department for Selected::"+$scope.EntityMasterList[i].department);
        console.log("selectedDepartment::"+selectedDepartment);
        if ($scope.EntityMasterList[i].department==selectedDepartment) {
          self.functions.push($scope.EntityMasterList[i].function);
        };
      };
 return; 
}
/***************EGDF FUNCTION MASTER STARTS************/

/***************JOBFAMILY MASTER STARTS************/
$scope.getJobFamily=function(JobFmailyMasterList){   
    var arrList=[];
    self.jobfamilys=[];
      for (var l=0; l<JobFmailyMasterList.length; l++) {
        arrList.push(JobFmailyMasterList[l].jobfamily);
      };
    var uniqueNames = [];
    var i=0;
      $.each(arrList, function(i, el){
          if($.inArray(el, uniqueNames) === -1){
            uniqueNames.push(el);
          }
          i=i+1;
	  });
	self.jobfamilys=uniqueNames;
 return;
}
/***************JOBFAMILY MASTER ENDS************/

/***************JOBROLE MASTER STARTS************/
$scope.getJobRole=function(selectedJobFamily){
    self.jobroles=[];
      for (var i =0; i <$scope.JobFmailyMasterList.length; i++) {
        console.log("JobFmaily for Selected::"+$scope.JobFmailyMasterList[i].jobfamily);
        console.log("selectedJobFamily::"+selectedJobFamily);
        if ($scope.JobFmailyMasterList[i].jobfamily==selectedJobFamily) {
          self.jobroles.push($scope.JobFmailyMasterList[i].jobrole);
        };
      };
 return; 
}
/***************JOBROLE MASTER ENDS************/

/***************COMPETENCY MASTER STARTS************/
$scope.getCompetencyMaster=function(){
  ILService.getCompetency().then(function(response){
    if (response) {
      console.log("Res::"+JSON.stringify(response.data));
      MasterResponse=response.data;
      $scope.getCompetency(response.data);
      console.log("MasterResponse::"+JSON.stringify(MasterResponse));
    };
  })
}
/***************COMPETENCY MASTER ENDS************/

/***************COMPETENCY STARTS************/
$scope.getCompetency=function(getResponse){
  $scope.CompetencyList=[];
  for (var i = 0;i<getResponse.length;i++) {
    if ($scope.CompetencyList.indexOf(getResponse[i].competency) == -1) {
    $scope.CompetencyList.push(getResponse[i].competency);
    }
  };
  self.competencies=$scope.CompetencyList;
}
/***************COMPETENCY ENDS************/

/***************SUBCOMPETENCY STARTS************/
$scope.getSubcompetency=function(SelectedCompetency,getResponse){
  $scope.SubcompetencyList=[];
  for (var i = 0;i<getResponse.length;i++) {
    if (SelectedCompetency==getResponse[i].competency) {
      if ($scope.SubcompetencyList.indexOf(getResponse[i].sub_competency) == -1) {
        $scope.SubcompetencyList.push(getResponse[i].sub_competency);
        }
    };
  };
  self.subcompetencies=$scope.SubcompetencyList;
}
/***************SUBCOMPETENCY ENDS************/

/***************SKILLS STARTS************/
$scope.getSkills=function(SelectedSubcompetency,getResponse){
  $scope.SkillsList=[];
  for (var i = 0;i<getResponse.length;i++) {
    console.log(SelectedSubcompetency+"="+getResponse[i].sub_competency);
    if (SelectedSubcompetency==getResponse[i].sub_competency) {
      if ($scope.SkillsList.indexOf(getResponse[i].skills) == -1) {
        $scope.SkillsList.push(getResponse[i].skills);
        }
    };
  };
  return $scope.SkillsList;
}
/***************SKILLS ENDS************/

/**********************MASTER CALLS ENDS********************/



function uploadinit(){
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
  }
};
xhr.onerror = function(e) {
};
xhr.onload = function() {
  $scope.$apply(function() {
  $scope.showProgress=false;
}); 
};
xhr.send(fd);
var promise = $http.post("/upload", fd,
							 {withCredentials: false,
							 headers: {'Content-Type': undefined},
                             transformRequest: angular.identity,
                             params: {fd},
                            })
                            .success(function(response, status, headers, config) {
                             if (response) {
                             	$scope.carrymodel.filePath=response.imgPath;
                             };
                            })
                            .error(function(error, status, headers, config) {
                             });
          return promise;
}

/********************ENTITY STARTS************************/
function querySearchEntity (query) {
	console.log("query::"+self.entitys);
	var results = query ? self.entitys.filter( createFilterFor(query) ) : self.entitys,
     			  deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      }else {
        return results;
      }
}
function searchEntityChange(text) {
  console.log("search Entity::"+text);
}
function selectedEntityChange(item) {
   if (!angular.isDefined(item) || item=="" || item==null) {
        self.selectedGroup=self.searchGroup="";
        self.selectedDepartment=self.searchDepartment="";
        self.selectedFunction=self.searchFunction="";
    }else{
        $log.info('Item changed to ' + JSON.stringify(item));
        $scope.getEGDFGroup(item);
    }
}

/***********************ENTITY ENDS************************/  
/********************GROUP STARTS************************/
function querySearchGroup (query) {
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
function searchGroupChange(text) {
      $log.info('Text changed to ' + text);
}
function selectedGroupChange(item) {
      if (!angular.isDefined(item) || item=="" || item==null) {
        self.selectedDepartment=self.searchDepartment="";
        self.selectedFunction=self.searchFunction="";
      }else{
         $log.info('Item changed to ' + JSON.stringify(item));
      $scope.getEGDFDepartment(item);
      }  
}
  
/********************GROUP ENDS************************/

/********************DEPARTMENT STARTS************************/
function querySearchDepartment (query) {
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
function searchDepartmentChange(text) {
  $log.info('Text changed to ' + text);
}
function selectedDepartmentChange(item) {
 	  if (!angular.isDefined(item) || item=="" || item==null) {
        self.selectedFunction=self.searchFunction="";
      }else{
         $log.info('Item changed to ' + JSON.stringify(item));
      $scope.getEGDFFunction(item);
      }
     
}
 
/********************DEPARTMENT ENDS************************/

/********************FUNCTION STARTS************************/
function querySearchFunction (query) {
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
function searchFunctionChange(text) {
      $log.info('Text changed to ' + text);
}
function selectedFunctionChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
}

/********************FUNCTION ENDS************************/

/********************JOBFAMILY STARTS************************/
function querySearchJobFamily (query) {
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
function searchJobFamilyChange(text) {
      $log.info('Text changed to ' + text);
}
function selectedJobFamilyChange(item) {
  if (!angular.isDefined(item) || item=="" || item==null) {
        self.selectedJobRole=self.searchJobRole="";
      }else{
           $log.info('Item changed to ' + JSON.stringify(item));
      $scope.getJobRole(item);
      }
}

/********************JOBFAMILY ENDS************************/

/********************JOBROLE STARTS************************/
function querySearchJobRole (query) {
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
function searchJobRoleChange(text) {
      $log.info('Text changed to ' + text);
}
function selectedJobRoleChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
}

/********************JOBROLE ENDS************************/

/********************COMPETENCY STARTS************************/
function querySearchCompetency (query) {
    var results = query ? self.competencies.filter( createFilterFor(query) ) : self.competencies,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
}
function selectedCompetencyChange(item) {
       $scope.carrymodel.competency=$scope.carrymodel.ctrl.selectedCompetency;
       console.log("selectedCompetencyChange"+self.selectedCompetency);
       console.log("selectedCompetencyChange"+$scope.carrymodel.ctrl.selectedCompetency);
}  
function searchCompetencyChange(text) {
      $log.info('Text changed to ' + text);
      if (text=="") {
        self.selectedCompetency=$scope.carrymodel.competency="";
        self.searchCompetency="";
        self.selectedSubcompetency=$scope.carrymodel.sub_competency="";
        self.searchSubcompetency="";
        self.asyncContacts=$scope.carrymodel.skills=[];
       }
       else{
        $scope.carrymodel.competency=self.selectedCompetency;
       }
}
/********************COMPETENCY ENDS************************/

/********************SUBCOMPETENCY STARTS************************/
function querySearchSubcompetency (query) {
	if (query==null || query=="") {
      $scope.getSubcompetency($scope.carrymodel.competency,MasterResponse);
    }
    var results = query ? self.subcompetencies.filter( createFilterFor(query) ) : self.subcompetencies,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      }else{
        return results;
      }
}
function selectedSubcompetencyChange(item) {
      $log.info('Subcompetency changed to ' + JSON.stringify(item));
        $scope.carrymodel.competency=$scope.carrymodel.ctrl.selectedCompetency;
        $scope.carrymodel.sub_competency=item;
        console.log("selected subcompetencies::"+$scope.carrymodel.sub_competency);
}
function searchSubcompetencyChange(text) {
      $log.info('Text changed to ' + text);
      if (text=="") {
       	self.selectedSubcompetency=$scope.carrymodel.sub_competency="";
        self.searchSubcompetency="";
        $scope.carrymodel.ctrl.asyncContacts=$scope.carrymodel.skills=[];
       }else{
        $scope.carrymodel.sub_competency=self.selectedSubcompetency;
       }
}
function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
      return function filterFn(res) {
        console.log("sj::"+lowercaseQuery);
        return (res.indexOf(query) == 0);
      };
}
/********************SUBCOMPETENCY ENDS************************/

/********************SKILLS STARTS - MDCHIP************************/
function querySearch (criteria) {
  	self.allContacts = loadContacts();
    self.contacts = [self.allContacts[0]];
    cachedQuery = cachedQuery || criteria;
    $scope.carrymodel.skills=self.asyncContacts;
    $scope.carrymodel.ctrl.asyncContacts=self.asyncContacts;
    return cachedQuery ? self.allContacts.filter(createFilterForSkills(cachedQuery)) : [];
}
function delayedQuerySearch(criteria) {
      cachedQuery = criteria;
      if ( !pendingSearch || !debounceSearch() )  {
        cancelSearch();
        return pendingSearch = $q(function(resolve, reject) {
          cancelSearch = reject;
          $timeout(function() {
            resolve( self.querySearch() );
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
function createFilterForSkills(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(contact) {
        return (contact._lowername.indexOf(lowercaseQuery) != -1);;
      };
}
function loadContacts() {
      var contacts =$scope.getSkills($scope.carrymodel.sub_competency,MasterResponse);
      return contacts.map(function (c, index) {
        var cParts = c.split(' ');
        var contact = {
          name: c
        };
        contact._lowername = contact.name.toLowerCase();
        return contact;
      });
}
/********************SKILLS ENDS - MDCHIP************************/

/********************MDDIALOG STARTS************************/
function addCourseController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  
}
/********************MDDIALOG ENDS************************/
});//CONTROLLER ENDS