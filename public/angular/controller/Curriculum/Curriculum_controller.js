var app=angular.module('app');
var answerarr=[];
var employeedata=[];
app.controller('curriculumCtrl',function($localStorage,$location,$scope,$mdMedia,$mdDialog,$filter,$q,$timeout,$http,mOrgService,vendorService,curriculumService,courseService)
{    

$scope.courseDataListCount=[];
 console.log($location.path())

    $localStorage.currentPath="add_curriculum";
    console.log("add_curriculum");
    var self = this;
    $scope.dis_entity=false; 
   $scope.dis_group=true;
   $scope.dis_function=true;
    $scope.dis_SubCompetency=true;
    $scope.dis_skills=true;
    $scope.dis_department=true;
    $scope.dis_cost=true;
    $scope.dis_curriculumOwner=true;
    $scope.dis_pickemployee=false;
    var tagarr=[];
    $scope.approvals = ['Individual Course','Whole Course'];
    $scope.individual_Cost_type = ['Sum Of Individual Course Cost'];
    $scope.flat_fixed_cost=['Flat Fixed Cost-First Time']
     $scope.Course=[{"course":"C Program","cost":"1000","description":"C Program"},
                   {"course":"C++ Program","cost":"2000","description":"C++ Program"},
                   {"course":"Java Program","cost":"3000","description":"Java Program"},
                   {"course":"Introduction to HTML","cost":"1500","description":"Html Program"},
                   {"course":"Introduction to CSS","cost":"2500","description":"Css Program"},
                   {"course":"Introduction to JS","cost":"3000","description":"js Program"},
                   {"course":"Introduction to Angular JS","cost":"3500","description":"Angularjs Program"},
                   {"course":"Introduction to Node JS","cost":"4000","description":"Nodejs Program"}];
   $scope.Coursedata=$scope.Course;
     // Entity
    self.querySearchEntity   = querySearchEntity;
    self.selectedEntityChange = selectedEntityChange;
    self.searchEntityChange   = searchEntityChange;
   
    // Group
    self.querySearchGroup   = querySearchGroup;
    self.selectedGroupChange = selectedGroupChange;
    self.searchGroupChange   = searchGroupChange;
    // Function
    self.querySearchFunction   = querySearchFunction;
    self.selectedFunctionChange = selectedFunctionChange;
    self.searchFunctionChange   = searchFunctionChange;
   // Department
    self.querySearchDepartment   = querySearchDepartment;
    self.selectedDepartmentChange = selectedDepartmentChange;
    self.searchDepartmentChange   = searchDepartmentChange;
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
    self.searchSkillsChange   = searchSkillsChange;
    // Course
    self.querySearchCourse   = querySearchCourse;
    self.selectedCourseChange = selectedCourseChange;
    self.searchCourseChange   = searchCourseChange;
    // Currency
   self.querySearchCurrency   = querySearchCurrency;
    self.selectedCurrencyChange = selectedCurrencyChange;
    self.searchCurrencyChange   = searchCurrencyChange;
// employee
    self.querySearchUser   = querySearchUser;
    self.selectedUserChange = selectedUserChange;
    self.searchUserChange   = searchUserChange;

    /*Tags*/
    var pendingSearch, cancelSearch = angular.noop;
    var cachedQuery, lastSearch;
    self.allTags = loadTags();
    self.Tags = [self.allTags[0]];
    self.asyncSkills = [];
    self.filterSelected = true;
     self.querySearchTags = querySearchTags;
    self.delayedQuerySearchTags = delayedQuerySearchTags;
  

  if($scope.carrymodel)
  {
    self.selectedEntity=$scope.carrymodel.Entity;
    self.selectedGroup=$scope.carrymodel.Group;
    self.selectedFunction=$scope.carrymodel.Function;
    self.selectedDepartment=$scope.carrymodel.Department;
    self.selectedCompetency=$scope.carrymodel.Competency;
    self.selectedSubCompetency=$scope.carrymodel.Sub_Competency;
    self.selectedSkills=$scope.carrymodel.Skills;
  }
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
// Course

$scope.getCoursedata=function()
   {
      var getResponse=$scope.Course;
      $scope.CourseList=[];
       for (var i = 0;i<getResponse.length;i++)
     {
       if ($scope.CourseList.indexOf(getResponse[i].course) == -1) 
        {
         $scope.CourseList.push(getResponse[i].course);
        }
     }
       console.log("Course List::"+$scope.CourseList);
      self.Coursedata=$scope.CourseList;

   }

   function querySearchCourse (query) 
 {     
  console.log("datas::"+JSON.stringify(self.Coursedata));
      console.log("sr::"+query); 
      var results = query ? self.Coursedata.filter( createFilterFor(query) ) : self.Coursedata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchCourseChange(text)
   {
              console.log('Text changed to ' + text);
      $scope.Course=$scope.Coursedata;
    }
  function selectedCourseChange(item) {
    console.log("Item"+JSON.stringify(item));
    if(item ==undefined)
    {         
         $scope.Course=$scope.Coursedata;
    }
      else{
        self.selectedCourse=item;
       $scope.Course=($filter('filter')($scope.Course, {course: item}));
       console.log(JSON.stringify($scope.Course))
       console.log()
     }
    }


// Currency

$scope.getCurrencydata=function()
   {
      var getResponse=$scope.Currency;
      $scope.CurrencyList=[];
       for (var i = 0;i<getResponse.length;i++)
     {
       if ($scope.CurrencyList.indexOf(getResponse[i].Currency) == -1) 
        {
         $scope.CurrencyList.push(getResponse[i].Currency);
        }
     }
       console.log("Currency List::"+$scope.CurrencyList);
      self.Currencydata=$scope.CurrencyList;

   }

   function querySearchCurrency (query) 
 {     
  console.log("datas::"+JSON.stringify(self.Currencydata));
      console.log("sr::"+query); 
      var results = query ? self.Currencydata.filter( createFilterFor(query) ) : self.Currencydata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchCurrencyChange(text)
   {
              console.log('Text changed to ' + text);
      $scope.Currency=$scope.Currencydata;
    }
  function selectedCurrencyChange(item) {
    console.log("Item"+JSON.stringify(item));
    if(item ==undefined)
    {         
         $scope.Currency=$scope.Currencydata;
    }
      else{
        self.selectedCurrency=item;
       // $scope.Course=($filter('filter')($scope.Course, {course: item}));
       // console.log(JSON.stringify($scope.Currency))

     }
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

    // org
 $scope.getOrganization=function()
 {  
   mOrgService.getOrganization().then(function(response) {
    if(response)
    {
   $scope.mOrganization=response.data;
    // $scope.mOrganizationdata= $scope.mOrganization;
    // $scope.contentdata();
    OrganizationResponse=response.data;
    $scope.getEntitydata(response.data);
    $scope.contentdata(response.data)
     }  
    console.log("OrganizationResponse::"+JSON.stringify(OrganizationResponse));
    }); 
  }
  $scope.getOrganization();

  
   /*bhuvanesh*/
   $scope.getEntitydata=function(getResponse)
   {
      $scope.EntityList=[];
       for (var i = 0;i<getResponse.length;i++)
     {  
       if ($scope.EntityList.indexOf(getResponse[i].mentity) == -1) 
        {
         $scope.EntityList.push(getResponse[i].mentity);
        }
     }
       console.log("Entity List::"+$scope.EntityList);
      self.Entitydata=$scope.EntityList;
   }

   function querySearchEntity (query) 
 {     
  console.log("datas::"+JSON.stringify(self.Entitydata));
      console.log("sr::"+query); 
      var results = query ? self.Entitydata.filter( createFilterFor(query) ) : self.Entitydata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchEntityChange(text)
    {    
      $scope.Entity=OrganizationResponse;
              console.log('Text changed to ' + text);
       
    }
  function selectedEntityChange(item) {
    console.log("Item"+JSON.stringify(item));
    $scope.selectedEntitydata=item;
    if(item ==undefined)
    {    
          $scope.Entity=OrganizationResponse;
           
           $scope.dis_group=true;
           $scope.dis_function=true;   
           self.selectedGroup="";
           self.searchGroup="";
           $scope.GroupList="";
           $scope.mOrg="";
           self.selectedFunction="";
          self.searchFunction="";
          self.selectedDepartment="";
          self.searchDepartment="";

    }
   else
      { 
        
          $scope.dis_group=false;
       $scope.carrymodel.Entity=item;
      self.selectedEntity=item;
       $scope.getGroupdata(self.selectedEntity,OrganizationResponse)
     }
    }

    /*Group*/
     $scope.getGroupdata=function(Selecteditem,getResponse)
   {
      $scope.GroupList=[];
       for (var i = 0;i<getResponse.length;i++)
     {  
      console.log(JSON.stringify(Selecteditem))
      if(getResponse[i].mentity==Selecteditem)
      { 
       
        
         if (getResponse[i].mgroup) 
          {  
             console.log("Group length::"+JSON.stringify(getResponse[i].mgroup.length))
            for(j=0;j<getResponse[i].mgroup.length;j++)
            { 
               console.log("mgroup"+JSON.stringify(getResponse[i].mgroup[j].mgroup))
              $scope.GroupList.push(getResponse[i].mgroup[j].mgroup);
             }
          }
       }
       console.log("Group List data::"+JSON.stringify($scope.GroupList));
     }
       

       self.Groupdata=$scope.GroupList;
   }

   function querySearchGroup (query) 
 {     
  console.log("datas::"+JSON.stringify(self.Groupdata));
      console.log("sr::"+query); 
      var results = query ? self.Groupdata.filter( createFilterFor(query) ) : self.Groupdata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchGroupChange(text)
    { 

      $scope.Group=OrganizationResponse;
      console.log('Text changed to ' + text);
       
    }
  function selectedGroupChange(item) {
    console.log("Item"+JSON.stringify(item));
    $scope.selectedGroupdata=item;
    if(item ==undefined)
    {    
          $scope.Group=OrganizationResponse;   
          self.selectedGroup="";
          self.searchGroup="";
          self.selectedFunction="";
          self.searchFunction="";
          self.selectedDepartment="";
          self.searchDepartment="";
           $scope.dis_function=true; 
    }
   else
      {  
        
          $scope.dis_function=false; 
        $scope.carrymodel.Group=item; 
        $scope.selectedGroupdata=item;
        self.selectedGroup=item;
        $scope.getFunctiondata(self.selectedGroup,OrganizationResponse)
     }
    }

    /*Function*/
     
     $scope.getFunctiondata=function(Selecteditem,getResponse)
   {  
    console.log(JSON.stringify(Selecteditem))
      $scope.FunctionList=[];
       for (var i = 0;i<getResponse.length;i++)
     {  
      console.log("response data::"+JSON.stringify(getResponse[i])); 
      if(getResponse[i].mfunction)
      {   
        
      console.log("function length::"+JSON.stringify(getResponse[i].mfunction.length));
           for(j=0;j<getResponse[i].mfunction.length;j++)
           { 
            if(getResponse[i].mfunction[j].mgroup==Selecteditem)
            {
            $scope.FunctionList.push(getResponse[i].mfunction[j].mfunction);
            }
           }
         
       
       }
     }
       console.log("Function List::"+JSON.stringify($scope.FunctionList));

       self.Functiondata=$scope.FunctionList;
   }

   function querySearchFunction (query) 
 {     
  console.log("datas::"+JSON.stringify(self.Functiondata));
      console.log("sr::"+query); 
      var results = query ? self.Functiondata.filter( createFilterFor(query) ) : self.Functiondata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchFunctionChange(text)
    {    
      $scope.Function=OrganizationResponse;
     console.log('Text changed to ' + text); 
    }
  function selectedFunctionChange(item) {
    console.log("Item"+JSON.stringify(item));
    $scope.selectedFunctiondata=item;
    if(item ==undefined)
    {    
          $scope.Function=OrganizationResponse;   
          $scope.dis_department=true;
          self.selectedDepartment="";
          self.searchDepartment="";
    }
   else
      { 
          $scope.carrymodel.Function=item;
        $scope.selectedFunctiondata=item;
        $scope.dis_department=false;
       self.selectedFunction=item;
       $scope.getDepartmentdata(self.selectedFunction,OrganizationResponse)
     }
    }

   function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(res) {
          console.log("sj::"+lowercaseQuery);
          return (res.indexOf(query) == 0);
        };

    }


    // Department

      $scope.getDepartmentdata=function(Selecteditem,getResponse)
   {  
    console.log(JSON.stringify(Selecteditem))
      $scope.DepartmentList=[];
       for (var i = 0;i<getResponse.length;i++)
     {  
      console.log("response data::"+JSON.stringify(getResponse[i])); 
      if(getResponse[i].mdepartment)
      {   
        
      console.log("Department length::"+JSON.stringify(getResponse[i].mdepartment.length));
           for(j=0;j<getResponse[i].mdepartment.length;j++)
           { 
            if(getResponse[i].mdepartment[j].mfunction==Selecteditem)
            {
              
            $scope.DepartmentList.push(getResponse[i].mdepartment[j].mdepartment);
            }
           }
       }
     }
     self.Departmentdata=$scope.DepartmentList;
   }
    function querySearchDepartment (query) 
 {     
  console.log("datas::"+JSON.stringify(self.Departmentdata));
      console.log("sr::"+query); 
      var results = query ? self.Departmentdata.filter( createFilterFor(query) ) : self.Departmentdata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchDepartmentChange(text)
    {    
      $scope.Department=OrganizationResponse;
     console.log('Text changed to ' + text); 
    }
  function selectedDepartmentChange(item) {
    console.log("Item"+JSON.stringify(item));
    $scope.selectedDepartmentdata=item;
    if(item ==undefined)
    {    
          $scope.Department=OrganizationResponse;   
    }
   else
      {
        $scope.carrymodel.Department=item;
        $scope.selectedDepartmentdata=item;
       self.selectedDepartment=item;
     }
    }

   function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(res) {
          res=angular.lowercase(res);
          return (res.indexOf(lowercaseQuery) == 0);
        };

    }

     function UpperCase(string) 
    {  
          if(string == null)
          {

          }
          else
          {
              string = string.toLowerCase();
             return string.replace(/([^ -])([^ -]*)/gi,function(v,v1,v2){ return v1.toUpperCase()+v2; })
              // return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(); 
          } 
    } 


    $scope.contentdata=function(data)
{  console.log("Inside contet data")

  $scope.mResponsedata=data;
  $scope.Groupdata=[];
  $scope.Functiondata=[];
  $scope.Departmentdata=[];
  for(var i=0;i<$scope.mResponsedata.length;i++)
   {     
           console.log("data id::"+JSON.stringify($scope.mResponsedata[i]._id));
           // console.log("id::"+JSON.stringify($scope.entity_id))
       
     if($scope.mResponsedata[i].mgroup)
     {   
      for(var j=0;j<$scope.mResponsedata[i].mgroup.length;j++)
      { 
       $scope.Groupdata.push($scope.mResponsedata[i].mgroup[j]);
       
      }
        
      }
      if($scope.mResponsedata[i].mfunction)
      {
        for(var k=0;k<$scope.mResponsedata[i].mfunction.length;k++)
        {
          $scope.Functiondata.push($scope.mResponsedata[i].mfunction[k]);
        }
      }
      if($scope.mResponsedata[i].mdepartment)
      {
        for(var l=0;l<$scope.mResponsedata[i].mdepartment.length;l++)
        {
          
          $scope.Departmentdata.push($scope.mResponsedata[i].mdepartment[l]);
        }
      }
   
    }
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
  
   
    /*add Courses*/
    $scope.selectCourse_data=[];
    $scope.selectCourse=[];
    $scope.clickCount=[];
   var count=0;
 $scope.addCourses = function(ev) {
     $scope.clickCount.push({"count":count = count + 1});
     $scope.clickCountLength=$scope.clickCount.length;
     console.log("array"+JSON.stringify($scope.clickCount));
  // $scope.carrymodel.addcomp=true;
  console.log(JSON.stringify($scope.Course));
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller :CurriculumController,
      templateUrl: 'angular/view/dialog_add_Course.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
      locals: {
        items: $scope.Course
     }
    })
    .then(function(answer) {

      console.log("ok"+JSON.stringify(answer));
      $scope.selectCourse_data.push(answer);
     console.log($scope.selectCourse_data.length)
     $scope.findMandatory=[];
  // add courses
     if($scope.carrymodel.selectCourse_data == undefined)
     {
         for(var i=0;i<$scope.selectCourse_data.length;i++)
     { 
       for(var j=0;j<$scope.selectCourse_data[i].length;j++)
       {
        $scope.selectCourse_data[i][j].Selected=false;
       }
     }
     }
     else
     { 

       var length=$scope.carrymodel.selectCourse_data.length-1;
       for(var i=length;i<$scope.selectCourse_data.length;i++)
     {  
      for(var j=0;j<$scope.selectCourse_data[i].length;j++)
       {

        $scope.selectCourse_data[i][j].Selected=false;
       }
     }
     }
      $scope.carrymodel.selectCourse_data= $scope.selectCourse_data;

      $scope.carrymodel.Section_number=$scope.selectCourse_data.length;
      $scope.CourseCost();
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
$scope.Course_checkOne=function(vindex){
console.log(JSON.stringify($scope.Course));
}
$scope.Course_checkAll = function () {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;

        } else {
            $scope.selectedAll = false;
        }
        
        angular.forEach($scope.Course, function (item) {
            item.Selected = $scope.selectedAll;
        });
        console.log("$scope.Course::"+JSON.stringify($scope.Course));
    };
    $scope.Course_saveAction=function(){
      console.log(JSON.stringify($scope.Course));
      for(var i=0;i<$scope.Course.length;i++){
         console.log("Final Result::"+JSON.stringify($scope.Course[i].Selected));
        if ($scope.Course[i].Selected==false || !angular.isDefined($scope.Course[i].Selected)) {}else{
        $scope.selectCourse.push($scope.Course[i]);
      };
        
      }
      console.log("Final Result::"+JSON.stringify($scope.selectCourse));
       $scope.jj="jjjj";
      $mdDialog.hide($scope.selectCourse);
    }
    $scope.removeCourse=function(parentIndex,index){
      $scope.carrymodel.selectCourse_data[parentIndex].splice(index,1);
    }

 function CurriculumController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  } 
 
 /*move array*/
 $scope.CourseMoveup=function(parentIndex,index)
 { 
    console.log(JSON.stringify(parentIndex));
    console.log(JSON.stringify(index));
 
  if(index== 0)
  {
   
  }
   else{
  $scope.carrymodel.selectCourse_data[parentIndex].move(index,index-1);
   }
    
 }
 $scope.CourseMovedown=function(parentIndex,index)
 {    
    console.log(JSON.stringify(index))
    $scope.carrymodel.selectCourse_data[parentIndex].move(index,index+1);  
    console.log(JSON.stringify($scope.selectCourse_data[index]));
 }
Array.prototype.move = function(from,to){

  this.splice(to,0,this.splice(from,1)[0]);
  return this;
};
  /*add section*/
  $scope.addSection=function(parentIndex)
{ 
  $scope.addCourses();
}
  /*remove*/
$scope.removeSection=function(parentIndex)
{
   $scope.carrymodel.selectCourse_data.splice(parentIndex,1); 
   $scope.carrymodel.Section_number=$scope.selectCourse_data.length; 
}
/*remove*/
$scope.removeCourses=function()
{
  $scope.clickCount.pop();
$scope.selectCourse_data.pop();
$scope.carrymodel.Section_number=$scope.selectCourse_data.length;
  console.log("remove"+JSON.stringify($scope.clickCount));
}



 $scope.select_related_Curriculum=[];
 $scope.relatedCurriculum = function(ev) {
   console.log(JSON.stringify($scope.Course));
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller :CurriculumController,
      templateUrl: 'angular/view/dialog_add_Related_Course.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
      locals: {
        items: $scope.Course
     }
    })
    .then(function(answer) {
      console.log("ok"+JSON.stringify(answer));
      $scope.carrymodel.relatedCurriculum_data=answer;
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
$scope.Related_Course_checkOne=function(vindex){
console.log(JSON.stringify($scope.Course));
}
$scope.Related_Course_checkAll = function () {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;

        } else {
            $scope.selectedAll = false;
        }
        
        angular.forEach($scope.Course, function (item) {
            item.Selected = $scope.selectedAll;
        });
        console.log("$scope.Competency::"+JSON.stringify($scope.Course));
    };
    $scope.Related_Course_saveAction=function(){
      console.log(JSON.stringify($scope.Course));
      for(var i=0;i<$scope.Course.length;i++){
         console.log("Final Result::"+JSON.stringify($scope.Course[i].Selected));
        if ($scope.Course[i].Selected==false || !angular.isDefined($scope.Course[i].Selected)) {}else{
        $scope.select_related_Curriculum.push($scope.Course[i]);
      }; 
      }
      console.log("Final Result::"+JSON.stringify($scope.select_related_Curriculum));
       $scope.jj="jjjj";
      $mdDialog.hide($scope.select_related_Curriculum);
    }
    $scope.Related_removeCourse=function(vindex){
      $scope.carrymodel.select_related_Curriculum.splice(vindex,1);
    }
    $scope.loadCurrency = function() {

    // Use timeout to simulate a 650ms request.
    return $timeout(function() {

      $scope.Currency =  $scope.Currency  || [
        { code: 'AED', Currency_Name: 'United Arab Emirates Dirham' },
        { code:'AFN',Currency_Name:'Afghan Afghani' },
        {  code:'BDT',Currency_Name:'Bangladeshi Taka' },
         { code:'INR',Currency_Name:'Indian Rupee'  },
        { code:'PKR',Currency_Name:'Pakistani Rupee'  }, 
        {  code:'USD',Currency_Name:'US Dollar' },
        { code:'ZAR',Currency_Name:'South African Rand'}
      
      ];

    }, 650);
  };

$scope.CourseCost=function()
{  
   $scope.Course_total_cost=0;
      for(var i=0;i<$scope.selectCourse_data.length;i++)
     { 
       for(var j=0;j<$scope.selectCourse_data[i].length;j++)
       {  
         
         $scope.Course_total_cost=parseInt($scope.selectCourse_data[i][j].cost)+parseInt($scope.Course_total_cost);
       }
     }
     $scope.carrymodel.sum_of_individual_total_course_cost="INR"+$scope.Course_total_cost;
     // $scope.Currenyresult=angular.extend({}, $scope.selectedcurrency, $scope.Course_total_cost);
     
     // $scope.carrymodel.sum_of_individual_total_course_cost=$scope.Currenyresult;
    $scope.dis_total_cost=true;
}

  $scope.ChangeCurrency=function(data)
  {
    // alert(JSON.stringify(data))
    // $scope.selectedcurrency=data.code;
    // $scope.CourseCost();
  }


  $scope.pickemployee=function()
  {
     curriculumService.pickemployee().then(function(response)
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
      controller :CurriculumController,
      templateUrl: 'angular/view/dialog_add_employee.tmpl.html',
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
      $scope.dis_curriculumOwner=false;
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
      
      $mdDialog.hide($scope.carrymodel.curriculum_owner);
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

});