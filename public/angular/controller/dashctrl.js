var app=angular.module('app');
//Wizard- width calculation in percentage - directives
app.directive('wizardCalc',['$location', function ($compile,location) {
var i=0;var k=0;var l=0;var arr=[];
return { 
link: function(scope, element, attributes){
i=0;k=0;l=0;arr=[];
scope.$watch('$location.path()', function(locationPath) {
i=i+1;k=k+element.width();l=element.width();arr[i]=l;
if (i<scope.menuList.length) {}else
{
scope.getcalc(k,arr);
}
})

}
}
}]);
//Wizard Menu Button property randaomization -by index increament 
app.directive('btnStatus',['$location', function ($compile,location) {
var i=0;
return { 
link: function(scope, element, attributes){
	i=0;
	scope.$watch('$location.path()', function(locationPath) {
		console.log("jj"+i);
if (i==0) {
console.log("hh");
}else
{
// if (locationPath=="/addcourse") {
	element.attr('disabled','disabled');
// };

}
i=i+1;
});
	 
}
}
}]);

//Dashboard controller starts
app.controller('dashctrl',function($scope,$localStorage,$http,$timeout,$window,$interval,$location,$routeParams,WizardService){

//localstorage for show current login user
$scope.displayName=$localStorage.User;
$scope.nextName="Next";
$scope.carrymodel={};

//Calculate percentage of each wizard elment from window width 
$scope.getcalc = function (total,arr) {
	console.log("getcalc");
//Percentage calculation
var r=total/$scope.menuList.length;
var perc=(r-10)/total*100;		
//get the window width
var windowwidth = $(window).width();
//while window width >960 applu the style--while load the window
if (windowwidth>960) {
var el =angular.element('.wizardClass').attr('style', 'width:'+perc.toFixed(1)+'%');
}else{
var el =angular.element('.wizardClass').attr('style', 'width:'+perc.toFixed(1)+'%');
}
//Resize window event
$(window).resize(function(){
if($(this).width() != windowwidth){
windowwidth = $(this).width();
console.log(windowwidth);
//while window width >960 apply the style--while shrink the window
if (windowwidth>960) {
	if ($scope.currentIndex==0) {
		console.log("1");
	};
var el =angular.element('.wizardClass').attr('style', 'width:'+perc.toFixed(1)+'%');
}else{
var el =angular.element('.wizardClass').attr('style', 'width:'+perc.toFixed(1)+'%');
}
}
});
};

//Next button action
$scope.nextaction=function(add){
	// console.log("dashctrl"+JSON.stringify(add))
	console.log("nextaction")
	
var mergeObj= angular.extend($scope.carrymodel, add);
$scope.carrymodel=mergeObj;


var resultJson=WizardService.nextaction(add,$scope.currentIndex,$scope.menuList,$scope.currentPath);
console.log("HJL"+JSON.stringify(resultJson));
if (angular.isDefined(resultJson))	 {
$scope.templatepath=resultJson.templatepath;
$scope.currentIndex=resultJson.currentindex;
$scope.nextName=resultJson.buttonname;
console.log("templatepath::"+resultJson.templatepath);
}

}
//Previous button action
$scope.prevaction=function(add){
var resultJson=WizardService.prevaction(add,$scope.currentIndex,$scope.menuList,$scope.currentPath);
$scope.templatepath=resultJson.templatepath;
$scope.currentIndex=resultJson.currentindex;
$scope.nextName=resultJson.buttonname;
}

//move from one step to another step--this common function get trigger
$scope.stepAction=function(vindex,add){
var resultJson=WizardService.stepaction(add,vindex,$scope.menuList,$scope.currentPath);
$scope.templatepath=resultJson.templatepath;
$scope.currentIndex=resultJson.currentindex;
console.log("templatepath"+resultJson.templatepath);
$scope.nextName=resultJson.buttonname;
}

$scope.logout=function(){
$window.localstorage.clear();
$window.location.href="http://localhost:3000";
}


//Configure wizard
$scope.ConfigureWizard = function (a1,a2) {
$scope.menuList=a1;
console.log("ConfigureWizard");
$scope.currentIndex=0;
$scope.templatepath=a2+$scope.currentIndex+".html";
};
if($location.path()=="/add_curriculum")
{
	console.log("location path"+$location.path())
  $localStorage.currentPath=$location.path();

}
else if($location.path()=="/addelearn")
{
	console.log("location path"+$location.path());
    $localStorage.currentPath=$location.path();
}
else if($location.path()=="/addassessment")
{
  console.log("location path"+$location.path());
    $localStorage.currentPath=$location.path();
}
else if($location.path()=="/iltsession")
{
  console.log("location path"+$location.path());
    $localStorage.currentPath=$location.path();
}


else if($location.path()=="/add_equipmentVendor")
{
    $localStorage.type="Equipment Vendor";
    $localStorage.currentPath=$location.path();
    $scope.carrymodel.vendortype=$localStorage.type;
}
else if($location.path()=="/add_ilt_vendor")
{
    $localStorage.type="ILT Vendor";
    $localStorage.currentPath=$location.path();
    $scope.carrymodel.vendortype=$localStorage.type;
}
else if($location.path()=="/add_stationary_vendor")
{
  
    $localStorage.type="Stationary Vendor";
    $localStorage.currentPath=$location.path();
    $scope.carrymodel.vendortype=$localStorage.type;
}
else if($location.path()=="/add_printing_vendor")
{
  
    $localStorage.type="Printing Vendor";
    $localStorage.currentPath=$location.path();
    $scope.carrymodel.vendortype=$localStorage.type;
}
else if($location.path()=="/add_f&b_vendor")
{
  
    $localStorage.type="f&b Vendor";
    $localStorage.currentPath=$location.path();
    $scope.carrymodel.vendortype=$localStorage.type;
}
else if($location.path()=="/add_Travel_vendor")
{
  
    $localStorage.type="Travel Vendor";
    $localStorage.currentPath=$location.path();
    $scope.carrymodel.vendortype=$localStorage.type;
}
/**/
else if($location.path()=="/add_elearn_vendor")
{
  
    $localStorage.type="ELearn Vendor";
    $localStorage.currentPath=$location.path();
    $scope.carrymodel.vendortype=$localStorage.type;
}
else if($location.path()=="/add_mlearn_vendor")
{
  
    $localStorage.type="MLearn Vendor";
    $localStorage.currentPath=$location.path();
    $scope.carrymodel.vendortype=$localStorage.type;
}
else if($location.path()=="/addexternalvenue")
{
  $localStorage.currentPath=$location.path();
  $localStorage.type="External";
  $scope.carrymodel.venuetype="External";
}
else if($location.path()=="/addinternalvenue")
{
  $localStorage.currentPath=$location.path();
  $localStorage.type="Internal";
  $scope.carrymodel.venuetype="Internal";
}
else if($location.path()=="/iladd")
{
  console.log("location path"+$location.path());
    $localStorage.currentPath=$location.path();
}
else if($location.path()=="/addtrainerinternal")
{
  
    $localStorage.trainertype="Internal";
    $localStorage.currentPath=$location.path();
    $scope.carrymodel.trainertype=$localStorage.trainertype;
}
else if($location.path()=="/addtrainerexternal")
{
  
    $localStorage.trainertype="External";
    $localStorage.currentPath=$location.path();
    $scope.carrymodel.trainertype=$localStorage.trainertype;
}
else if($location.path()=="/addtrainerfreelance")
{
  
    $localStorage.trainertype="Freelance";
    $localStorage.currentPath=$location.path();
    $scope.carrymodel.trainertype=$localStorage.trainertype;
}
console.log("LocalStorage:"+$localStorage.currentPath);

console.log("vendor type::"+$localStorage.vendortype);
console.log("trainer type::"+$localStorage.trainertype);


 // $localStorage.currentPath=$location.path();
//EDIT THIS or
//Wizard-- configure your wizard by call this function with the parameters
if ($localStorage.currentPath=="/dashboard") {
var a1=['Basic Info','Pre/Post Work','TargetAudience','Competency & tags','Approval','Related Course'];
var a2="angular/view/CourseManagement/addcourse/";
$scope.currentPath=a2;
$scope.ConfigureWizard(a1,a2);//a1,a2 are your parameters
}else if($localStorage.currentPath=="/iltsession"){
var a1=['Schedule','Seats','Contact','Vendor','Trainer','Venue','Agenda','Cost'];
var a2="angular/view/CourseManagement/iltsession/add/";
$scope.currentPath=a2;
$scope.ConfigureWizard(a1,a2);//a1,a2 are your parameters
}else if($localStorage.currentPath=="/addinternalvenue"){
var a1=['Basic Info','Equipment Info','Location Info','Contact Info'];
var a2="angular/view/VenueManagement/addinternal/";
$scope.currentPath=a2;
$scope.ConfigureWizard(a1,a2);//a1,a2 are your parameters
} 
else if($localStorage.currentPath=="/addexternalvenue"){
var a1=['Basic Info','Equipment Info','Location Info','Contact Info'];
var a2="angular/view/VenueManagement/addinternal/";
$scope.currentPath=a2;
$scope.ConfigureWizard(a1,a2);//a1,a2 are your parameters
}   

	else if($localStorage.currentPath=="/add_equipmentVendor" || $localStorage.currentPath=="/edit_equipement_vendor"){
   	    console.log("type::Equipement Vendor")
	    var a1=['Basic Info','Services Info','Tax Information','Contact Details'];
		var a2="angular/view/vendorManagement/EquipementVendor/";
		$scope.currentPath=a2;
		$scope.ConfigureWizard(a1,a2);//a1,a2 are your parameters
	}
	
   else if($localStorage.currentPath== "/add_ilt_vendor" || $localStorage.currentPath=="/edit_ilt_vendor" )
	{   
		console.log("type::ILT Vendor");
		var a1=['Basic Info','Competency Info','Tax Information','Contact Details'];
	    var a2="angular/view/vendorManagement/ILT_Vendor/";
		$scope.currentPath=a2;
		$scope.ConfigureWizard(a1,a2);
   }
   
   // stationary vendor
   else if($localStorage.currentPath=="/add_stationary_vendor" || $localStorage.currentPath=="/edit_stationary_vendor" ){
   	console.log("type::Stationary Vendor");
   var a1=['Basic Info','Tax info','Contact Details'];
   var a2="angular/view/VendorManagement/StationaryVendor/";
   $scope.currentPath=a2;
   $scope.ConfigureWizard(a1,a2);//a1,a2 are your parameters
   }
// End stationary vendor
// Printing vendor
   else if($localStorage.currentPath=="/add_printing_vendor" || $localStorage.currentPath=="/edit_printing_vendor" ){
   var a1=['Basic Info','Services info','Tax info','Contact Details'];
   var a2="angular/view/VendorManagement/PrintingVendor/";
   $scope.currentPath=a2;
   $scope.ConfigureWizard(a1,a2);//a1,a2 are your parameters
   }
// End Printing  vendor
else if($localStorage.currentPath=="/add_f&b_vendor"  || $localStorage.currentPath=="/edit_f&b_vendor" )
	{   
		console.log("type::f&b Vendor");
		var a1=['Basic Info','Services Info','Tax Information','Contact Details'];
	    var a2="angular/view/vendorManagement/f&bvendor/";
		$scope.currentPath=a2;
		$scope.ConfigureWizard(a1,a2);
   }
   else if($localStorage.currentPath == "/add_Travel_vendor" || $localStorage.currentPath=="/edit_Travel_vendor" )
	{   
		console.log("type::Travel Vendor");
		var a1=['Basic Info','Services Info','Tax Information','Contact Details'];
	    var a2="angular/view/vendorManagement/TravelVendor/";
		$scope.currentPath=a2;
		$scope.ConfigureWizard(a1,a2);
   }

else if($localStorage.currentPath=="/add_curriculum"){
	console.log("add_curriculum");
		var a1=['Basic Info','Design Info','Target Audience','Approval','Related Curriculum','Cost Curriculum'];
	    var a2="angular/view/Curriculum/";
		$scope.currentPath=a2;
		$scope.ConfigureWizard(a1,a2);
	}
  else if($localStorage.currentPath == "/add_elearn_vendor" || $localStorage.currentPath=="/edit_elearn_vendor" )
  {   
    console.log("vendortype::ELearn Vendor");
    var a1=['Basic Info','Competency Info','Tax Information','Contact Details'];
      var a2="angular/view/vendorManagement/ILT_Vendor/";
    $scope.currentPath=a2;
    $scope.ConfigureWizard(a1,a2);
   }
   else if($localStorage.currentPath == "/add_mlearn_vendor" || $localStorage.currentPath=="/edit_mlearn_vendor" )
  {   
    console.log("vendortype::MLearn Vendor");
    var a1=['Basic Info','Competency Info','Tax Information','Contact Details'];
      var a2="angular/view/vendorManagement/ILT_Vendor/";
    $scope.currentPath=a2;
    $scope.ConfigureWizard(a1,a2);
   }
else if($localStorage.currentPath=="/managetrainer"){
  if($localStorage.type=="Internal"){
        console.log("type::Internal")
      var a1=['Basic Info','Competency Info'];
    var a2="angular/view/TrainerManagement/Internal/";
    $scope.currentPath=a2;
    $scope.ConfigureWizard(a1,a2);//a1,a2 are your parameters
  }
  
   else if($localStorage.type == "External")
  {   
    console.log("type::External");
    var a1=['Basic Info','Competency Info','Vendor Info'];
      var a2="angular/view/TrainerManagement/External/";
    $scope.currentPath=a2;
    $scope.ConfigureWizard(a1,a2);
   }
   else if($localStorage.type == "Freelance")
  {   
    console.log("type::Freelance");
    var a1=['Basic Info','Competency Info','Vendor Info'];
      var a2="angular/view/TrainerManagement/Freelance/";
    $scope.currentPath=a2;
    $scope.ConfigureWizard(a1,a2);
   }
}


//Course Management
else if($localStorage.currentPath=="/managecourse"){
		var a1=['Basic Info','Pre/Post Work','TargetAudience','Competency & tags','Approval','Related Course'];
var a2="angular/view/CourseManagement/addcourse/";
$scope.currentPath=a2;
$scope.ConfigureWizard(a1,a2);//a1,a2 are your parameters
	}	
else if($localStorage.currentPath=="/addelearn"){
	console.log("addelearn");
		var a1=['Basic Info','Pre/Post Work','TargetAudience','Approval','Related Course','Upload'];
		var a2="angular/view/ElearnManagement/";
		$scope.currentPath=a2;
		$scope.ConfigureWizard(a1,a2);
	}
  else if($localStorage.currentPath=="/addassessment"){
  console.log("addassessment");
    var a1=['Basic Info','Assessment Questions','Assessment Options'];
    var a2="angular/view/AssessmentManagement/Assessment/";
    $scope.currentPath=a2;
    $scope.ConfigureWizard(a1,a2);
  }
//QuestionBank
else if($location.path()=="/addquestion"){
    var a1=['Category','Question','Answer'];
    var a2="angular/view/QuestionBank/AddQuestion/templates/";
    $scope.currentPath=a2;
    $scope.ConfigureWizard(a1,a2);
  }





$scope.browseClick=function(){
  console.log("browse");
  $scope.kok=false;
  console.log(JSON.stringify($scope.carrymodel));
}
$scope.uploadClick=function(carrymodel){
  $scope.kok=true;
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



});

