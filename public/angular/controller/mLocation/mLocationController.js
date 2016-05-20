var app=angular.module("app");
app.controller("locationCtrl",function($scope,$location,$filter,mLocationService)
{  
 $scope.masters=['Country','State','City','Building','Wing','Floor'];

$scope.editcountry=1;
 var self = this; 
$scope.dis_state=true;
$scope.editstate=1;
$scope.action_name="Add";
// Country
    self.querySearchCountry   = querySearchCountry;
    self.selectedCountryChange = selectedCountryChange;
    self.searchCountryChange   = searchCountryChange;
$scope.addCountry=function(mcountry)
  {
    console.log("mcountry"+JSON.stringify(mcountry));
    if($scope.action_name=="Add")
    { 
      console.log("Add");
      var data={};
      data.mcountry=mcountry;
        mLocationService.addCountry(data).then(function(response)
        {   $scope.mcountry="";
            $scope.getLocation();  
            console.log(JSON.stringify(response));
        });
   }
   else
   { 
  //   console.log("Update")
  //  $scope.mOrganizationdata= $scope.mOrganization;
  // // $scope.mOrganization.mentity
  //  for(var i=0;i<$scope.mOrganizationdata.length;i++)
  //  {     
  //   console.log("data id::"+JSON.stringify($scope.mOrganizationdata[i]._id));
  //      if($scope.mOrganizationdata[i]._id == $scope.entity_id)
  //      {
  //     $scope.mOrganizationdata[i].mentity=mentity;
  //    if($scope.mOrganizationdata[i].mgroup)
  //    {  
  //     for(var j=0;j<$scope.mOrganizationdata[i].mgroup.length;j++)
  //     { 
  //       console.log("Group enttity data"+JSON.stringify($scope.mOrganizationdata[i].mgroup[j].mentity))
  //       $scope.mOrganizationdata[i].mgroup[j].mentity=mentity;
  //       $scope.changed=$scope.mOrganizationdata[i].mgroup;
  //     }

  //     }
  //     if($scope.mOrganizationdata[i].mfunction)
  //     {
  //       for(var k=0;k<$scope.mOrganizationdata[i].mfunction.length;k++)
  //       {
  //         console.log("Function enttity data"+JSON.stringify($scope.mOrganizationdata[i].mfunction[k].mentity))
  //       $scope.mOrganizationdata[i].mfunction[k].mentity=mentity;
  //       }
  //     }
  //     if($scope.mOrganizationdata[i].mdepartment)
  //     {
  //       for(var l=0;l<$scope.mOrganizationdata[i].mdepartment.length;l++)
  //       {
  //         console.log("Department enttity data"+JSON.stringify($scope.mOrganizationdata[i].mdepartment[l].mentity))
  //       $scope.mOrganizationdata[i].mdepartment[l].mentity=mentity;
  //       $scope.changeddata=$scope.mOrganizationdata[i];
       
  //       }
  //     }
      
  //  console.log("changeddata"+JSON.stringify($scope.changeddata)); 
  //   mOrgService.updatedata($scope.changeddata).then(function(response)
  //   {
  //     console.log(JSON.stringify(response));
  //      $scope.getOrganization();
  //     $scope.mentity="";
  //     $scope.action_name="Add";
  //     $scope.editentity=1;
  //    });
  //    };
      
    // }
   }
   

   }



/*2*/
/*ADD State*/
 $scope.getCountrydata=function(getResponse)
   {
      $scope.CountryList=[];
       for (var i = 0;i<getResponse.length;i++)
     {  
       if ($scope.CountryList.indexOf(getResponse[i].mcountry) == -1) 
        {
         $scope.CountryList.push(getResponse[i].mcountry);
        }
     }
       console.log("Country List::"+$scope.CountryList);
      self.Countrydata=$scope.CountryList;
   }
function querySearchCountry (query) 
 {     
  console.log("datas::"+JSON.stringify(self.Countrydata));
      console.log("sr::"+query); 
       // query=UpperCase(query);
      var results = query ? self.Countrydata.filter( createFilterFor(query) ) : self.Countrydata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchCountryChange(text)
    {    
      $scope.Country=LocationResponse;
              console.log('Text changed to ' + text);
       
    }
  function selectedCountryChange(item) {
    console.log("Item"+JSON.stringify(item));
    $scope.selectedCountrydata=item;
    if(item ==undefined)
    {    
          $scope.Country=LocationResponse;
           
           // $scope.dis_state=true;
           // $scope.dis_function=true;   
           // self.selectedState="";
           // self.searchState="";
           // $scope.StateList="";
           $scope.mState="";
           // self.selectedFunction="";
          // self.searchFunction="";

    }
   else
      { 
        // if($scope.editfunction==0 || $scope.editdepartment==0)
        // {
          $scope.dis_state=true;
        // }
        // else
        // {
          $scope.dis_state=false;
        // }
       
      self.selectedCountry=item;
       // $scope.getStatedata(self.selectedCountry,OrganizationResponse)
     }
    }
 $scope.addState=function()
  {  
    if($scope.action_name=="Add")
    {
    var data={};
   data.mcountry=$scope.selectedCountrydata;
   data.mstate=$scope.mstate;
   console.log("AddGroup::"+JSON.stringify(data));
    mLocationService.addState(data).then(function(response)
    {    self.searchCountry="";
        self.selectedCountry="";
        $scope.mstate="";
        console.log(JSON.stringify(response));
        $scope.getLocation();
    });
   }
   else
   {
    $scope.getid($scope.passgroupdata);
    $scope.mOrganizationdata= $scope.mOrganization;
    $scope.mOrganizationdata.id=$scope.data_id;
     console.log("Update data"+JSON.stringify($scope.mOrganizationdata));
   // $scope.mOrganization.mentity
   for(var i=0;i<$scope.mOrganizationdata.length;i++)
   {     
    console.log("data id::"+JSON.stringify($scope.mOrganizationdata[i]._id));
    console.log("id::"+JSON.stringify($scope.data_id))
       if($scope.mOrganizationdata[i]._id == $scope.data_id)
       {  
     if($scope.mOrganizationdata[i].mgroup)
     {  
      for(var j=0;j<$scope.mOrganizationdata[i].mgroup.length;j++)
      { 
        if($scope.mOrganizationdata[i].mgroup[j].mgroup==$scope.GroupEditdata)
        {
          $scope.mOrganizationdata[i].mgroup[j].mgroup=$scope.mgroup;
        } 
      }
      }
      if($scope.mOrganizationdata[i].mfunction)
      {
        for(var k=0;k<$scope.mOrganizationdata[i].mfunction.length;k++)
        {
          if($scope.mOrganizationdata[i].mfunction[k].mgroup==$scope.GroupEditdata)
        {
          $scope.mOrganizationdata[i].mfunction[k].mgroup=$scope.mgroup;
        }
        }
      }
      if($scope.mOrganizationdata[i].mdepartment)
      {
        for(var l=0;l<$scope.mOrganizationdata[i].mdepartment.length;l++)
        {
           if($scope.mOrganizationdata[i].mdepartment[l].mgroup==$scope.GroupEditdata)
        {
          $scope.mOrganizationdata[i].mdepartment[l].mgroup=$scope.mgroup;
        }
        $scope.changeddata=$scope.mOrganizationdata[i];
       
        }
      }
    mOrgService.updatedata($scope.changeddata).then(function(response)
    {
      console.log(JSON.stringify(response));
       $scope.getOrganization();
        $scope.editgroup=1;
        self.searchEntity="";
        self.selectedEntity="";
        $scope.mgroup=""; 
        $scope.dis_entity=false;
     });
     };      
  }
   }
  }
   function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(res) {
          console.log("sj::"+lowercaseQuery);
          return (res.indexOf(query) == 0);
        };

    }
 $scope.getLocation=function()
 {  
   mLocationService.getLocation().then(function(response) {
    if(response)
    {
    $scope.mLocation=response.data;
    LocationResponse=response.data;
    $scope.getCountrydata(response.data);
    $scope.contentdata(response.data)
     }  
    }); 
  }
$scope.getLocation();
 $scope.addMasterdata=function(masterType)
  {
       console.log(JSON.stringify(masterType));
  if(masterType == 'Country')
  {
     $location.path('/mCountry');
  }
  else if(masterType == 'State')
  {
        $location.path('/mState');
  }
  else if(masterType == 'City')
  {     
           $location.path('/mCity');
  }
  else if(masterType == 'Building')
  {
           $location.path('/mBuilding');
       
  }
   else if(masterType == 'Floor')
  {
            $location.path('/mFloor');
  }
   else if(masterType == 'Wing')
  {
            $location.path('/mWing');
  }
  }

  /*get all array into data*/
   $scope.contentdata=function(data)
{ 
  console.log("Inside contet data")
  $scope.mResponsedata=data;
  $scope.Statedata=[];
  for(var i=0;i<$scope.mResponsedata.length;i++)
   {     
     if($scope.mResponsedata[i].mstate)
     {   
      for(var j=0;j<$scope.mResponsedata[i].mstate.length;j++)
      { 
       $scope.Statedata.push($scope.mResponsedata[i].mstate[j]);
       
      }
        
      }
    }
}
});