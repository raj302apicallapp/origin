var app=angular.module("app");
var vendortype;
var editableJSon={};
var activestatus;
var cot=0;
var Competency={};
var ltags;
// var tax=0;
var checkcheck={};
var Checktax={};

app.controller("vendorCtrl",function($scope,$location,$localStorage,$filter,$log,$mdDialog, $mdMedia,$q,$timeout,vendorService)
{ 
  $scope.pageSize=['5','10','15','20']
$scope.types=['Equipment Vendor','ILT Vendor','ELearn Vendor','MLearn Vendor','Stationary Vendor','Printing Vendor','f&b Vendor','Travel Vendor'];
    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    this.dis_subcompetency=true;
    this.dis_Country=true;
    this.dis_Building=true;
    this.dis_Floor=true;
    this.dis_skills=true;
    $scope.isLoading=false;

    
    var skillarr=[];

      $scope.getVendorType=function(getResponse)
    {
      $scope.vendorTypeList=[];
      
      for(var i= 0;i<getResponse.length;i++)
      {
        if($scope.vendorTypeList.indexOf(getResponse[i].vendortype) == -1)
        {
          $scope.vendorTypeList.push(getResponse[i].vendortype);
        }
      }
      console.log("Vendor List::"+$scope.vendorTypeList);
      self.vendortypedatas=$scope.vendorTypeList;
    }

    function querySearchType (query) 
 {
      console.log("sr::"+query); 
      var results = query ? self.vendortypedatas.filter( createFilterFor(query) ) : self.vendortypedatas,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
  }
  function searchTypeChange(text) 
  {
      $log.info('Text changed to ' + text);
   }
    function selectedTypeChange(item) 
    {
      $log.info('Type changed to ' + JSON.stringify(item));  
      if(item==undefined)
      {
        $scope.getVendorList=vendorResponse;
        // this.dis_Country=true;
        this.dis_State=true;
        this.dis_City=true;
        self.selectedvendorCountry="";
        self.searchvendorCountry="";
        self.vendorCountry="";
        self.selectedvendorState="";
        self.searchvendorState="";
        self.vendorState="";
        self.selectedvendorCity="";
        self.searchvendorCity="";
        self.vendorCity="";
      }
      else{
        // this.dis_Country=false;
        
      self.selectedType=item;
      console.log("SelectedType::"+JSON.stringify(self.selectedType))
      $scope.getVendorList = ($filter('filter')($scope.getVendorList, {vendortype: self.selectedType}));
      $scope.vendortypedatas=$scope.getVendorList;
      // alert(JSON.stringify($scope.vendortypedatas));
       console.log("Vendor Data"+JSON.stringify($scope.vendortypedatas))
       // $scope.getCountryList(item,vendorResponse);
     }
    }

    
function createFilterForTags(query) {

      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(tags) {
         if (angular.isDefined(tags.$$hashKey)) {
          skillarr.push(tags);
         };
         // console.log(JSON.stringify(skillarr));
        return (tags._lowername.indexOf(lowercaseQuery) != -1);
      };
    }
    $scope.getTags=function()
    {
       vendorService.getTags().then(function(response)
       {
          if(response)
          { console.log("response tags"+JSON.stringify(response.data))
           
              $scope.getTagsList(response.data);
          };
       });
    }
  $scope.getTags();
    function loadTags() {
      // $scope.getTags();
       // alert(JSON.stringify($scope.TagsList))
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

  // get Vendor
  $scope.getVendor=function()
   {
      console.log("get Vendor");
     if (!angular.isDefined(activestatus) || !$scope.activestatus)
      {
        console.log("undefined");
        activestatus=false;
      }
      else
      {
       activestatus=$scope.activestatus;
      }
       console.log("activestatus"+activestatus);
       vendorService.getVendor(activestatus).then(function(response) 
       {   
          $scope.isLoading=true;
          
         $scope.getVendorList=response.data;
         vendorResponse=response.data;
         $scope.getVendorType(response.data);
         $scope.getCountryList(response.data);
         console.log("Get Vendor List::"+JSON.stringify($scope.getVendorList));
         $scope.isLoading=false;
       });
   }

 // //chagetype 
 //   $scope.changeType=function()
 //   {
      
 //      $localStorage.vendortype=$scope.carrymodel.vendortype;
 //      console.log("local vendortype::"+$localStorage.vendortype)
 //       vendortype=$scope.carrymodel.vendortype;
 //       console.log("vendorType::"+JSON.stringify(vendortype));
 //    }

    
  
 // submit
   $scope.submitaction=function(savedata)
   {
    console.log("submitaction"+JSON.stringify(savedata));
    console.log("location path"+$location.path());
    if($location.path()=="/add_ilt_vendor")
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.addVendor(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendormanagement");
            };
        })
    }
    
    else if ($location.path()=="/add_equipmentVendor") 
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.addVendor(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendormanagement");
            };
        })
    }
    else if($location.path()=="/add_elearn_vendor")
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.addVendor(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendormanagement");
            };
        })
    }
     else if($location.path()=="/add_mlearn_vendor")
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.addVendor(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendormanagement");
            };
        })
    }
    else if($location.path()=="/add_stationary_vendor")
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.addVendor(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendormanagement");
            };
        })
    }
    else if($location.path()=="/add_printing_vendor")
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.addVendor(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendormanagement");
            };
        })
    }
    else if($location.path()=="/edit_ilt_vendor")
    {                                        
      console.log("edit vendor::"+JSON.stringify($scope.carrymodel));
      vendorService.updateVendordatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/vendormanagement");
           };
       })
     }
     else if($location.path()=="/edit_equipement_vendor")
    {                                        
      console.log("edit vendor::"+JSON.stringify($scope.carrymodel));
      vendorService.updateVendor($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/vendormanagement");
           };
       })
     }
    else if($location.path()=="/edit_elearn_vendor")
    {                                        
      console.log("edit vendor::"+JSON.stringify($scope.carrymodel));
      vendorService.updateVendordatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/vendormanagement");
           };
       })
     }
      else if($location.path()=="/edit_mlearn_vendor")
    {                                        
      console.log("edit vendor::"+JSON.stringify($scope.carrymodel));
      vendorService.updateVendordatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/vendormanagement");
           };
       })
     }
     else if($location.path()=="/edit_mlearn_vendor")
    {                                        
      console.log("edit vendor::"+JSON.stringify($scope.carrymodel));
      vendorService.updateVendordatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/vendormanagement");
           };
       })
     }
 else if($location.path()=="/edit_stationary_vendor")
    {                                        
      console.log("edit vendor::"+JSON.stringify($scope.carrymodel));
      vendorService.updateVendordatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/vendormanagement");
           };
       })
     }

      else if($location.path()=="/edit_printing_vendor")
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.updateVendordata(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendormanagement");
            };
        })
    }
    else if($location.path()=="/add_f&b_vendor")
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.addVendor(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendormanagement");
            };
        })
    }
    else if($location.path()=="/add_Travel_vendor")
    {
         console.log("vendor::"+vendortype);
         savedata.vendortype=vendortype;   
         console.log("ci"+JSON.stringify(savedata));
         vendorService.addVendor(savedata).then(function(response) 
        {
          console.log(response);
          if (response) 
           {
            $location.path("/vendormanagement");
            };
        })
    }
    else if($location.path()=="/edit_f&b_vendor")
    {                                        
      console.log("edit vendor::"+JSON.stringify($scope.carrymodel));
      vendorService.updateVendordatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/vendormanagement");
           };
       })
     }
     else if($location.path()=="/edit_Travel_vendor")
    {                                        
      console.log("edit vendor::"+JSON.stringify($scope.carrymodel));
      vendorService.updateVendordatas($scope.carrymodel).then(function(response) 
      {
          console.log(response);
         if (response) {
             $location.path("/vendormanagement");
           };
       })
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
  /*Bhuvanesh*/
  // alert(JSON.stringify($scope.TagsList)); 
  ltags=$scope.TagsList;
  // alert(JSON.stringify(ltags))
  /*Bhuvanesh*/
 }
   
     

   // active vendor
  $scope.activeVendor=function(item)
  {
    var activeItem=item;
    vendorService.activeVendor(activeItem).then(function(response) {
    $scope.getVendor();
    }); 
  }

$scope.changeProjector=function(){
    checkcheck.Projector=$scope.carrymodel.Projector;
  $scope.checkboxs();
}
$scope.changeProjector_Screen=function(){
  checkcheck.Projector_Screen=$scope.carrymodel.Projector_Screen;
  $scope.checkboxs();
}
$scope.changeAudio_Equipments=function(){
   checkcheck.Audio_Equipments=$scope.carrymodel.Audio_Equipments;
  $scope.checkboxs();
}
$scope.changePrinting_Photo_Copy_Machine=function(){
    checkcheck.Printing_Photo_Copy_Machine=$scope.carrymodel.Printing_Photo_Copy_Machine;
    $scope.checkboxs();
}
$scope.changechangeFlip_Board=function(){
   checkcheck.changeFlip_Board=$scope.carrymodel.changeFlip_Board;
  $scope.checkboxs();
}

  // check box 
  $scope.checkboxs=function()
  { 
    console.log(JSON.stringify(checkcheck));
    var arrcheck=[];
    var getArrCheck=[];
    var kjson=checkcheck;
    for(var keyName in kjson)
    {        
     var key=keyName ;
     var value= kjson[keyName];
     arrcheck.push(value);
    }
      for(var i=0;i<arrcheck.length;i++)
    {
       console.log(arrcheck[i]);
      if (arrcheck[i] == true) 
       {
         getArrCheck.push(arrcheck[i]);
       }
    }
   console.log("Length::"+getArrCheck.length);
    if (getArrCheck.length>=1) 
    {
        console.log("Now enable the button");
        $scope.nexts=false;
    }else
    {
        console.log("Disable the button now!");
        $scope.nexts=true;
    } 
}
 // tax inforrmation

$scope.pancardCheck=function()
{
   Checktax.Pan_Card=$scope.carrymodel.Pan_Card;
   $scope.taxs();
}
$scope.tinnumberCheck=function()
{
  Checktax.TIN_Number=$scope.carrymodel.TIN_Number;
  $scope.taxs();
}
$scope.tannumberCheck=function()
{
  Checktax.TAN_Number=$scope.carrymodel.TAN_Number;
  $scope.taxs();
}
$scope.servicetaxnumberCheck=function()
{
  Checktax.Service_Tax_Number=$scope.carrymodel.Service_Tax_Number;
  $scope.taxs();
}

$scope.taxs=function()
  { 
    console.log(JSON.stringify(Checktax));
    var arrcheck=[];
    var getArrCheck=[];
    var kjson=Checktax;
    for(var keyName in kjson)
    {        
     var key=keyName ;
     var value= kjson[keyName];
     arrcheck.push(value);
    }
      for(var i=0;i<arrcheck.length;i++)
    {  console.log("arrcheck"+arrcheck.length)
       console.log(arrcheck[i]);
      if (arrcheck[i] !== " " || arrcheck[i] == "undefined" ) 
       {
         getArrCheck.push(arrcheck[i]);
       }
    }
   console.log("Length::"+getArrCheck.length);
    if (getArrCheck.length>=2) 
    {
        console.log("Now enable the button");
        $scope.nextTax=false;
    }else
    {
        console.log("Disable the button now!");
        $scope.nextTax=true;
    } 
}
//SORT
$scope.vsortvendor=true;
$scope.vendorSortIcon="arrow_drop_down";
$scope.sortvendor=function(){
  if ($scope.vsortvendor==true) {
    $scope.orderList = "Vendor_Company";
    $scope.vsortvendor=false;
    $scope.vendorSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-Vendor_Company";
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
    $scope.orderList = "City";
    $scope.vsortLocation=false;
    $scope.locationSortIcon="arrow_drop_up";
  }else{
    $scope.orderList = "-City";
    $scope.vsortLocation=true;
    $scope.locationSortIcon="arrow_drop_down";
  }
}
 

/*2*/

 /*ILT Vendor*/
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
              $log.info('Text changed to ' + text);
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
         this.dis_subcompetency=true;
         this.dis_skills=true;
    }
      else{
        this.dis_subcompetency=false;
      self.selectedCompetency=item;
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
      $log.info('Text changed to ' + text);
      
    }
    function selectedSubCompetencyChange(item) {
    if(item == undefined)
    {  
      $scope.Competency=$scope.Competencyfliter;
       this.searchSkills=""; 
       this.dis_skills=true;    
    } 
   else{
       this.dis_skills=false;
       self.selectedSubCompetency=item;
      console.log("Sub competencyResponse"+JSON.stringify(self.selectedSubCompetency))
      $scope.Competency= ($filter('filter')($scope.Competencyfliter,{sub_competency:self.selectedSubCompetency})); 
        $scope.SubCompetencyfilter=$scope.Competency;
      $scope.getSkills(self.selectedSubCompetency,competencyResponse);
     }
    }
    $scope.getSkills=function(selectedSubCompetency,getResponse)
    { $scope.Competency=$scope.SubCompetencyfilter;
        $log.info('slected subcompetency ' + JSON.stringify(selectedSubCompetency));
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
      $log.info('Text changed to ' + text);
      if (text=="") {
        $scope.Competency=$scope.SubCompetencyfilter;
        
       };
    }
    function selectedSkillsChange(item) {
            // $scope.carrymodel.City=item;
            self.selectedSkills=item;
            $scope.Competency=($filter('filter')($scope.SubCompetencyfilter,{skills:item}))
            $scope.skillsfilter=$scope.Competency;
  // console.log("selectedCity::"+JSON.stringify($scope.carrymodel.City))
      $log.info('Skills changed to ' + JSON.stringify(item));
      // $scope.getBuilding(item,LocationResponse);
    }
  $scope.selectCompetency=[];
 $scope.showAdvanced = function(ev) {

  $scope.carrymodel.addcomp=true;
  console.log(JSON.stringify($scope.Competency));
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller :VendorController,
      templateUrl: 'angular/view/dialog_iltcompetency_vendor.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen,
      locals: {
        items: $scope.Competency
     }
    })
    .then(function(answer) {
      console.log("ok"+JSON.stringify(answer));
      $scope.carrymodel.selectCompetency_data=answer;
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
$scope.Competency_checkOne=function(vindex){
console.log(JSON.stringify($scope.Competency));
}
$scope.Competency_checkAll = function () {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;

        } else {
            $scope.selectedAll = false;
        }
        
        angular.forEach($scope.Competency, function (item) {
            item.Selected = $scope.selectedAll;
        });
        console.log("$scope.Competency::"+JSON.stringify($scope.Competency));
    };
    $scope.Competency_saveAction=function(){
      console.log(JSON.stringify($scope.Competency));
      for(var i=0;i<$scope.Competency.length;i++){
         console.log("Final Result::"+JSON.stringify($scope.Competency[i].Selected));
        if ($scope.Competency[i].Selected==false || !angular.isDefined($scope.Competency[i].Selected)) {}else{
        $scope.selectCompetency.push($scope.Competency[i]);
      };
        
      }
      console.log("Final Result::"+JSON.stringify($scope.selectCompetency));
       $scope.jj="jjjj";
      $mdDialog.hide($scope.selectCompetency);
    }
    $scope.removeCompetency=function(vindex){
      $scope.carrymodel.selectCompetency_data.splice(vindex,1);
    }


 // skill buttton
  $scope.add_skills=function()
  {
    $scope.addskill=true;
  }  


  // certification
  
  
  $scope.selectCertification=[];
 $scope.showAdvanced1 = function(ev) {
  $scope.carrymodel.addcert=true;
  console.log(JSON.stringify($scope.Certification));
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller :VendorController,
      templateUrl: 'angular/view/dialog_iltcertification_vendor.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      console.log("ok"+JSON.stringify(answer));
      $scope.carrymodel.selectCertification_data=answer;
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
console.log(JSON.stringify($scope.Certification));
}
$scope.checkAll = function () {
        if ($scope.selectedAll) {
            $scope.selectedAll = true;

        } else {
            $scope.selectedAll = false;
        }
        
        angular.forEach($scope.Certification, function (item) {
            item.Selected = $scope.selectedAll;
        });
        console.log("$scope.Certification::"+JSON.stringify($scope.Certification));
    };
    $scope.saveAction=function(){
      console.log(JSON.stringify($scope.Certification));
      for(var i=0;i<$scope.Certification.length;i++){
         console.log("Final Result::"+JSON.stringify($scope.Certification[i].Selected));
        if ($scope.Certification[i].Selected==false || !angular.isDefined($scope.Certification[i].Selected)) {}else{
        $scope.selectCertification.push($scope.Certification[i]);
      };
        
      }
      console.log("Final Result::"+JSON.stringify($scope.selectCertification));
       $scope.jj="jjjj";
      $mdDialog.hide($scope.selectCertification);
    }
    $scope.removeCertification=function(vindex){
      $scope.carrymodel.selectCertification_data.splice(vindex,1);
    }
    
     /*uppercase first letter*/
    function UpperCase(string) 
    {  
          if(string == null)
          {

          }
          else
          {
          return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(); 
          }
    } 
    
    function VendorController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  } 


 $scope.getCertification=function()
  {
    vendorService.getCertification().then(function(response){
      $scope.Certification=response.data;
      CertificateResponse=response.data;
     $scope.getCertifying_authoritydata(response.data)
    });
  }
  $scope.getCertification();
   /*Certifying Authority*/
   $scope.getCertifying_authoritydata=function(getResponse)
   {  console.log("getResponse"+JSON.stringify(getResponse));
      $scope.Certifying_authorityList=[];
       for (var i = 0;i<getResponse.length;i++)
     {
       if ($scope.Certifying_authorityList.indexOf(getResponse[i].Certifying_Authority) == -1) 
        {
         $scope.Certifying_authorityList.push(getResponse[i].Certifying_Authority);
        }
     }
       console.log("Certifying_authority List::"+$scope.Certifying_authorityList);
      self.Certifying_authoritydata=$scope.Certifying_authorityList;
   }

   function querySearchCertifying_authority (query) 
 {     
    console.log("datas::"+JSON.stringify(self.Certifying_authoritydata));
      console.log("sr::"+query); 
      var results = query ? self.Certifying_authoritydata.filter( createFilterFor(query) ) : self.Certifying_authoritydata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    
  }
   function searchCertifying_authorityChange(text)
    {   
      $scope.Certification=CertificateResponse;
      $log.info('Text changed to ' + text);
    }
  function selectedCertifying_authorityChange(item) {
    console.log("Item"+JSON.stringify(item));
    if(item ==undefined)
    {      this.searchCertification="";
          this.dis_Certification=true;
          $scope.Certification=CertificateResponse;
         
         
    }
      else{
        this.dis_Certification=false;
      self.selectedCertifying_authority=item;
       $scope.Certification=($filter('filter')($scope.Certification, {Certifying_Authority: item}));
       $scope.Certifying_authorityfliter=$scope.Certification;
       $scope.getCertificationdata(self.selectedCertifying_authority,CertificateResponse);

       console.log()
     }
    }

  


  /*certification*/
  $scope.getCertificationdata=function(selectedCertifying_authority,getResponse)
    {         
      $scope.CertificationList=[];
      for (var i = 0;i<getResponse.length;i++) 
      {
        if (selectedCertifying_authority==getResponse[i].Certifying_Authority)
         {
          if ($scope.CertificationList.indexOf(getResponse[i].Certification) == -1)
           {
             $scope.CertificationList.push(getResponse[i].Certification);
          }
        };  
      };
      self.Certificationdata=$scope.CertificationList;
      console.log("Certification List::"+self.Certification);
  }
   
   function querySearchCertification (query) {
    console.log("Certification::"+query); 
      var results = query ? self.Certificationdata.filter( createFilterFor(query) ) : self.Certificationdata,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

   
}); 