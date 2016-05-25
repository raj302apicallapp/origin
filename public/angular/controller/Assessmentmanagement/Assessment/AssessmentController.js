var app=angular.module('app');
app.controller('assessmentCtrl',function($scope,$localStorage,$location,$filter,$mdMedia,$mdDialog,vendorService)
{  
	$localStorage.currentPath=$location.path();
	$scope.dis_SubCompetency=true;
    $scope.dis_skills=true;
    $scope.question_type = ['Fixed Questions','Random Questions'];
    var self = this;
    // Competency
    self.querySearchCompetency   = querySearchCompetency;
    self.selectedCompetencyChange = selectedCompetencyChange;
    self.searchCompetencyChange   = searchCompetencyChange;
    // Sub Competency
    self.querySearchSubCompetency   = querySearchSubCompetency;
    self.selectedSubCompetencyChange = selectedSubCompetencyChange;
    self.searchSubCompetencyChange   = searchSubCompetencyChange;
    // Skills
    self.querySearchSkills   = querySearchSkills;
    self.selectedSkillsChange = selectedSkillsChange;
    self.searchSkillsChange   = searchSkillsChange
   /*Tags*/
    var pendingSearch, cancelSearch = angular.noop;
    var cachedQuery, lastSearch;
    self.allTags = loadTags();
    self.Tags = [self.allTags[0]];
    self.asyncSkills = [];
    self.filterSelected = true;
     self.querySearchTags = querySearchTags;
    self.delayedQuerySearchTags = delayedQuerySearchTags;

    function querySearchTags (criteria) {

      cachedQuery = cachedQuery || criteria;

      var k= cachedQuery ? self.allTags.filter(createFilterForTags(cachedQuery)) : [];
      var arrUnique = unique(tagarr);
         $scope.carrymodel.tags=arrUnique;
        
      return k;
    }
    
    function delayedQuerySearchTags(criteria) {
      cachedQuery = criteria;
      if ( !pendingSearch || !debounceSearch() )  {
        cancelSearch();
        return pendingSearch = $q(function(resolve, reject) {
          cancelSearch = reject;
          $timeout(function() {
            resolve( self.querySearchTags() );
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
function createFilterForTags(query) {

      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(tags) {
         if (angular.isDefined(tags.$$hashKey)) {
          tagarr.push(tags);
         };
        return (tags._lowername.indexOf(lowercaseQuery) != -1);
      };
    }
    // $scope.getTags=function()
    // {
    //    vendorService.getTags().then(function(response)
    //    {
    //       if(response)
    //       { console.log("response tags"+JSON.stringify(response.data))
           
    //           $scope.getTagsList(response.data);
    //       };
    //    });
    // }
  // $scope.getTags();
    function loadTags() {
      // $scope.getTags();
      vendorService.getTags().then(function(response)
       {
          if(response)
          { 
            console.log("response tags"+JSON.stringify(response.data));
             var getResponse= response.data;
             $scope.TagsList=[];
             for(var i=0;i<getResponse.length;i++)
           {
               if($scope.TagsList.indexOf(getResponse[i].Tags) == -1)
               {
                   $scope.TagsList.push(getResponse[i].Tags);
               }
             } 
          }
          else{
                alert("undefined data")
          }
       });
      if($scope.TagsList== undefined)
      {
        var ltags = [
        'Tags 1',
        'Tags 2',
        'Tags 3',
        'Tags 4',
        'Tags 5'
      ];

      return ltags.map(function (c, index) {
        var cParts = c.split(' ');
        var tag = {
          name: c
        };
        tag._lowername = tag.name.toLowerCase();
        return tag;
      });
      }
      else
      {
      
       alert(JSON.stringify($scope.TagsList))

      var ltags = $scope.TagsList;

      return ltags.map(function (c, index) {
        var cParts = c.split(' ');
        var tag = {
          name: c
        };
        tag._lowername = tag.name.toLowerCase();
        return tag;
      });

    }
    }
     $scope.getTagsList=function(getResponse)
     {
       $scope.TagsList=[];
  		for(var i=0;i<getResponse.length;i++)
  		{
   		 if($scope.TagsList.indexOf(getResponse[i].Tags) == -1)
    		{
    		  $scope.TagsList.push(getResponse[i].Tags);
    		}
  		}                
  // ltags=$scope.TagsList;
    }

    $scope.getCompetency=function()
 {  
   vendorService.getCompetency().then(function(response) {
   $scope.Competency=response.data;
    competencyResponse=response.data;
   $scope.getCompetencydata(response.data);
    console.log("competencyResponse::"+JSON.stringify(competencyResponse));
    }); 
  }
  $scope.getCompetency();
  
   /*bhuvanesh*/
   $scope.getCompetencydata=function(getResponse)
   {
      $scope.CompetencyList=[];
       for (var i = 0;i<getResponse.length;i++)
     {
       if ($scope.CompetencyList.indexOf(getResponse[i].competency) == -1) 
        {
          // console.log("CompetencyList"+JSON.stringify($scope.CompetencyList.push(getResponse[i].competency)))
         $scope.CompetencyList.push(getResponse[i].competency);
        }
     }
       console.log("Competency List::"+$scope.CompetencyList);
      self.competencydata=$scope.CompetencyList;
   }

   function querySearchCompetency (query) 
 {     
  

  console.log("datas::"+JSON.stringify(self.competencydata));
      
       console.log("sr::"+query); 
      var results = query ? self.competencydata.filter( createFilterFor(query) ) : self.competencydata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchCompetencyChange(text)
    {    $scope.Competency=competencyResponse;
              console.log('Text changed to ' + text);
              // this.searchSubCompetency="";
      
    }
  function selectedCompetencyChange(item) {
    console.log("Item"+JSON.stringify(item));
    if(item ==undefined)
    {    
          $scope.Competency=competencyResponse;
         // self.subcompetency="";
         
         self.searchSubCompetency="";
         self.searchSkills="";
         $scope.dis_SubCompetency=true;
         $scope.dis_skills=true;
    }
      else{
        $scope.carrymodel.Competency=item;
      self.selectedCompetency=item;
      $scope.dis_SubCompetency=false;
       $scope.Competency=($filter('filter')($scope.Competency, {competency: item}));
       $scope.Competencyfliter=$scope.Competency;
       console.log(JSON.stringify($scope.Competency))
       $scope.getSubCompetencydata(item,competencyResponse);
       console.log()
     }
    }


    $scope.getSubCompetencydata=function(selectedCompetency,getResponse)
    {    $scope.Competency=$scope.Competencyfliter;
      console.log("selectedCompetency::"+JSON.stringify(selectedCompetency))
    console.log("competencyResponse"+JSON.stringify(getResponse))
      // console.log("subcompetency competency get::"+selectedCompetency);
      /*bhuvanesh*/
      
      $scope.SubCompetencyList=[];
      for (var i = 0;i<getResponse.length;i++) {
        // console.log(selectedCompetency+"="+getResponse[i].competency);
        if (selectedCompetency==getResponse[i].competency) {
          if ($scope.SubCompetencyList.indexOf(getResponse[i].sub_competency) == -1) {
            $scope.SubCompetencyList.push(getResponse[i].sub_competency);
            }
        };
        
      };
      self.subcompetency=$scope.SubCompetencyList;
      
      console.log("SubCompetency List::"+self.subcompetency);
  }
   
   function querySearchSubCompetency (query) {
    console.log("SubCompetency::"+query); 
      var results = query ? self.subcompetency.filter( createFilterFor(query) ) : self.subcompetency,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchSubCompetencyChange(text) {
      console.log('Text changed to ' + text);
      
    }
    function selectedSubCompetencyChange(item) {
    if(item == undefined)
    {  
      $scope.Competency=$scope.Competencyfliter;
       this.searchSkills=""; 
       $scope.dis_skills=true;    
    } 
   else{
       $scope.dis_skills=false;
       $scope.carrymodel.Sub_Competency=item;
       self.selectedSubCompetency=item;
      console.log("Sub competencyResponse"+JSON.stringify(self.selectedSubCompetency))
      $scope.Competency= ($filter('filter')($scope.Competencyfliter,{sub_competency:self.selectedSubCompetency})); 
        $scope.SubCompetencyfilter=$scope.Competency;
      $scope.getSkills(self.selectedSubCompetency,competencyResponse);
     }
    }
    $scope.getSkills=function(selectedSubCompetency,getResponse)
    { $scope.Competency=$scope.SubCompetencyfilter;
        console.log('slected subcompetency ' + JSON.stringify(selectedSubCompetency));
        console.log("Response data"+JSON.stringify(getResponse))
      $scope.SkillListdata=[];
      for (var i = 0;i<getResponse.length;i++) {
        
        if (selectedSubCompetency==getResponse[i].sub_competency) {
          console.log("selectedSubCompetency skills"+getResponse[i].skills);        
          if ($scope.SkillListdata.indexOf(getResponse[i].skills) == -1) {
            $scope.SkillListdata.push(getResponse[i].skills);
               console.log("skills::"+JSON.stringify($scope.SkillListdata));
            }
        };
      };
      self.SkillSet=$scope.SkillListdata;
      
   }

   function querySearchSkills (query) {
    console.log("SubCompetency::"+query); 
      var results = query ? self.SkillSet.filter( createFilterFor(query) ) : self.SkillSet,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchSkillsChange(text) {
      console.log('Text changed to ' + text);
      if (text=="") {
        $scope.Competency=$scope.SubCompetencyfilter;
        
       };
    }
    function selectedSkillsChange(item) {
            // $scope.carrymodel.City=item;
            $scope.carrymodel.Skills=item;
            self.selectedSkills=item;
            $scope.Competency=($filter('filter')($scope.SubCompetencyfilter,{skills:item}))
            $scope.skillsfilter=$scope.Competency;
  // console.log("selectedCity::"+JSON.stringify($scope.carrymodel.City))
    console.log('Skills changed to ' + JSON.stringify(item));
      // $scope.getBuilding(item,LocationResponse);
    }
     function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(res) {
          res=angular.lowercase(res);
          console.log("sj::"+lowercaseQuery);
          return (res.indexOf(lowercaseQuery) == 0);
        };
    }
$scope.getQuestiondata=function()
{
$scope.questions=[{"question":"question1"},
				 {"question":"question2"},
				 {"question":"question3"},
				 {"question":"question4"},
				 {"question":"question5"},
				 {"question":"question6"},
				 {"question":"question7"},
				 {"question":"question8"},
				 {"question":"question9"},
				 {"question":"question10"}];
	}

    $scope.select_Question=[];
 $scope.Pick_questions = function(ev) {
   console.log(JSON.stringify($scope.questions));
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller :AssessmentController,
      templateUrl: 'angular/view/dialog_pick_questions_tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
      locals: {
        items: $scope.questions
     }
    })
    .then(function(answer) {
      console.log("ok"+JSON.stringify(answer));
      if($scope.carrymodel.number_of_questions==answer.length)
      {
      	$scope.carrymodel.Question_data=answer;
      }
      else
      {
      	alert("Number of Selected Questions Should be"+$scope.carrymodel.number_of_questions)
      }
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
$scope.Question_checkOne=function(vindex){
console.log(JSON.stringify($scope.questions));
}
$scope.Question_checkAll = function () {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;

        } else {
            $scope.selectedAll = false;
        }
        
        angular.forEach($scope.questions, function (item) {
            item.Selected = $scope.selectedAll;
        });
        console.log("$scope.Competency::"+JSON.stringify($scope.questions));
    };
    $scope.Question_saveAction=function()
    {
      console.log(JSON.stringify($scope.questions));
      for(var i=0;i<$scope.questions.length;i++){
         console.log("Final Result::"+JSON.stringify($scope.questions[i].Selected));
        if ($scope.questions[i].Selected==true || angular.isDefined($scope.questions[i].Selected) ) {

               $scope.select_Question.push($scope.questions[i]);
        };
        
      }
      console.log("Final Result::"+JSON.stringify($scope.select_Question));
       $scope.jj="jjjj";
      $mdDialog.hide($scope.select_Question);
    }
    $scope.removeQuestion=function(vindex){
      $scope.carrymodel.select_Question.splice(vindex,1);
    }
function AssessmentController($scope, $mdDialog)
 {
		  $scope.hide = function() {
		    $mdDialog.hide();
		  };
		  $scope.cancel = function() {
		    $mdDialog.cancel();
		  };
  }

  });