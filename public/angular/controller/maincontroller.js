var app=angular.module('app',['ngRoute','ngStorage','ngMaterial','ngMessages','angularUtils.directives.dirPagination','ngSanitize','mdDataTable']);

app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
$routeProvider.
when('/',
{
  templateUrl: 'angular/view/dash1.html', 
  controller: 'dashCtrl1'
}).
/*templateUrl: 'angular/view/InformalLearning/manage/list.html', 
  controller: 'ILController'*/
when('/dash1',
{
  templateUrl: 'angular/view/dash1.html', 
  controller: 'dashCtrl1'
}).
when('/vendormanagement',
{
 templateUrl:'angular/view/vendormanagement/vendormanagement.html',
 controller:'vendorCtrl'
}).
when('/add_equipmentVendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/edit_equipement_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/add_ilt_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/edit_ilt_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/add_elearn_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/edit_elearn_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/add_mlearn_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/edit_mlearn_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
// start of Stationary vendor
 when('/add_stationary_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
 when('/edit_stationary_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
 // end of stationary vendor
 // Start of Printing vendor
 when('/add_printing_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
 when('/edit_printing_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
 when('/add_f&b_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/edit_f&b_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/add_Travel_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/edit_Travel_vendor',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
 // End of Printing vendor
 /*Organization */
when('/mastermOrganization',
{
  templateUrl:'angular/view/mOrganization/Content.html',
  controller:'organizationCtrl'
}).
when('/mEntity',
{
  templateUrl:'angular/view/MasterManagement/Organization/entity.html',
  controller:'entityCtrl'
}).
when('/mGroup',
{
  templateUrl:'angular/view/mOrganization/MasterPages/mGroup.html',
  controller:'organizationCtrl'
}).
when('/mFunction',
{
  templateUrl:'angular/view/mOrganization/MasterPages/mFunction.html',
  controller:'organizationCtrl'
}).
when('/mDepartment',
{
  templateUrl:'angular/view/mOrganization/MasterPages/mDepartment.html',
  controller:'organizationCtrl'
}).
/*mOrganization Master end*/
when('/mastermLocation',
{
  templateUrl:'angular/view/mLocation/mLocation.html',
  controller:'locationCtrl'
}).
when('/mCountry',
{
 templateUrl:'angular/view/mLocation/Pages/mCountry.html',
 controller:'locationCtrl'
}).
when('/mState',
{
 templateUrl:'angular/view/mLocation/Pages/mState.html',
 controller:'locationCtrl'
}).

// add curriculum
when('/add_curriculum',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).





//Venue
when('/venue',
{
  templateUrl: 'angular/view/VenueManagement/list.html', 
  controller: 'venueCtrl'
}).
when('/addinternalvenue',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/editinternalvenue',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/addexternalvenue',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/editexternalvenue',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).

// trainer management
when('/addtrainerinternal',
{
  templateUrl: 'angular/view/TrainerManagement/Internal/addtrainerinternal.html', 
  controller: 'dashctrl'
}).
when('/addtrainerexternal',
{
  templateUrl: 'angular/view/TrainerManagement/External/addtrainerexternal.html', 
  controller: 'dashctrl'
}).
when('/addtrainerfreelance',
{
  templateUrl: 'angular/view/TrainerManagement/Freelance/addtrainerfreelance.html', 
  controller: 'dashctrl'
}).
when('/edittrainerinternal',
{
   templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/edittrainerexternal',
{
   templateUrl: 'angular/view/wizard.html',
  controller: 'dashctrl'
}).
when('/edittrainerfreelance',
{
   templateUrl: 'angular/view/wizard.html',
  controller: 'dashctrl'
}).
when('/managetrainer',
{
  templateUrl: 'angular/view/TrainerManagement/managetrainer/trainerlist.html', 
  controller: 'dashctrl'
}).

//Informal Learning
when('/ilmanage',
{
  templateUrl: 'angular/view/InformalLearning/manage/list.html', 
  controller: 'dashctrl'
}).
when('/iladd',
{
  templateUrl: 'angular/view/InformalLearning/add/tabs.html', 
  controller: 'dashctrl'
}).
when('/iledit',
{
  templateUrl: 'angular/view/InformalLearning/add/tabs.html', 
  controller: 'dashctrl'
}).
when('/addelearn',{
 templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).



//CourseManagement
when('/iltsession',
{
  templateUrl: 'angular/view/wizard.html', 
  controller: 'dashctrl'
}).
when('/addcourse',
{
  templateUrl: 'angular/view/CourseManagement/addcourse/addcourse.html', 
  controller: 'dashctrl'
}).
when('/editcourse',
{
  templateUrl: 'angular/view/CourseManagement/addcourse/addcourse.html', 
  controller: 'dashctrl'
}).
when('/managecourse',
{
  templateUrl: 'angular/view/CourseManagement/managecourse/courselist.html', 
  controller: 'dashctrl'
}).
when('/addassessment',
  {
    templateUrl: 'angular/view/wizard.html', 
    controller: 'dashctrl'  
}).

when('/assignassessment',
  {
    templateUrl: 'angular/view/wizard.html', 
    controller: 'dashctrl'  
}).

//QuestionBank
when('/addquestion',
{
  templateUrl: 'angular/view/QuestionBank/AddQuestion/addquestion.html', 
  controller: 'dashctrl'
}).



//MasterManagement
when('/masterdash',
{
  templateUrl: 'angular/view/MasterManagement/masterDashboard.html', 
  controller: 'masterDashCtrl'
}).
when('/MVenuetype',
{
  templateUrl: 'angular/view/MasterManagement/MVenuetype.html', 
  controller: 'masterDashCtrl'
}).

when('/MRoomtype',
{
  templateUrl: 'angular/view/MasterManagement/MRoomtype.html', 
  controller: 'masterDashCtrl'
}).

when('/MSeattype',
{
  templateUrl: 'angular/view/MasterManagement/MSeattype.html', 
  controller: 'masterDashCtrl'
}).

when('/MEquipment',
{
  templateUrl: 'angular/view/MasterManagement/MEquipment.html', 
  controller: 'masterDashCtrl'
}).

when('/MTag',
{
  templateUrl: 'angular/view/MasterManagement/MTag.html', 
  controller: 'masterDashCtrl'
}).
when('/MLanguage',
{
  templateUrl: 'angular/view/MasterManagement/mLanguage.html', 
  controller: 'masterDashCtrl'
}).
when('/mAcheivementType',
{
  templateUrl: 'angular/view/MasterManagement/mAcheivementType.html', 
  controller: 'masterDashCtrl'
}).
when('/mAssignmentReason',
{
  templateUrl: 'angular/view/MasterManagement/mAssignmentReason.html', 
  controller: 'masterDashCtrl'
}).
when('/mAssignmentReason',
{
  templateUrl: 'angular/view/MasterManagement/mAssignmentReason.html', 
  controller: 'masterDashCtrl'
}).
when('/mAssignmentReason',
{
  templateUrl: 'angular/view/MasterManagement/mAssignmentReason.html', 
  controller: 'masterDashCtrl'
}).
/*masters*/
when('/home',
{
  templateUrl: 'angular/view/home.html', 
  controller: 'maincontroller'
}).
when('/myteamlearning',
{
  templateUrl: 'angular/view/Peoplemanager/myteamlearning.html', 
  controller: 'maincontroller'
}).
when('/announcements',
{
  templateUrl: 'angular/view/announcements.html', 
  controller: 'maincontroller'
}).

otherwise({
        redirectTo: '/'
      });

}]);
app.controller('maincontroller',function($scope){
console.log("maincontroller");

$scope.showLearner=true;
$scope.showLearnerOps=false;
$scope.showPeople=false;
$scope.showCatalog=false;
$scope.showLearnerPartner=false;
$scope.showAssessment=false;
$scope.showSurvey=false;
$scope.showSecurity=false;
$scope.showSuperAdmin=false;
$scope.showReportAdmin=false;
$scope.SelectedRole="";
$scope.showlearner=function()
{
  
  $scope.showLearner=true;
  $scope.showLearnerOps=false;
  $scope.showPeople=false;
  $scope.showCatalog=false;
  $scope.showLearnerPartner=false;
  $scope.showAssessment=false;
  $scope.showSurvey=false;
  $scope.showSecurity=false;
  $scope.showSuperAdmin=false;
  $scope.showReportAdmin=false;
}

$scope.showlearnerOps=function()
{
  $scope.SelectedRole="Learn Ops Admin";
  $scope.showLearnerOps=true;
  $scope.showLearner=true;
  $scope.showPeople=false;
  $scope.showCatalog=false;
  $scope.showLearnerPartner=false;
  $scope.showAssessment=false;
  $scope.showSurvey=false;
  $scope.showSecurity=false;
  $scope.showSuperAdmin=false;
  $scope.showReportAdmin=false;
}

$scope.showpeople=function()
{
  $scope.SelectedRole="People Manager";
  $scope.showPeople=true;
  $scope.showLearner=true;
  $scope.showLearnerOps=false;
  $scope.showCatalog=false;
  $scope.showLearnerPartner=false;
  $scope.showAssessment=false;
  $scope.showSurvey=false;
  $scope.showSecurity=false;
  $scope.showSuperAdmin=false;
  $scope.showReportAdmin=false;
}

$scope.showcatalog=function()
{ 
  $scope.SelectedRole="Catalog Admin";
   $scope.showCatalog=true;
  $scope.showLearner=true;
  $scope.showLearnerOps=false;
  $scope.showPeople=false;
  $scope.showLearnerPartner=false;
  $scope.showAssessment=false;
  $scope.showSurvey=false;
  $scope.showSecurity=false;
  $scope.showSuperAdmin=false;
  $scope.showReportAdmin=false;
}
$scope.showlearingPartner=function()
{
  $scope.SelectedRole="Learning Partner";
  $scope.showLearnerPartner=true;
  $scope.showLearner=true;
  $scope.showLearnerOps=false;
  $scope.showPeople=false;
  $scope.showCatalog=false;
  $scope.showAssessment=false;
  $scope.showSurvey=false;
  $scope.showSecurity=false;
  $scope.showSuperAdmin=false;
  $scope.showReportAdmin=false;
}
$scope.showassessment=function()
{  
  $scope.SelectedRole="Assessment Admin";
  $scope.showAssessment=true;
  $scope.showLearner=true;
  $scope.showLearnerOps=false;
  $scope.showPeople=false;
  $scope.showCatalog=false;
  $scope.showLearnerPartner=false;
  $scope.showSurvey=false;
  $scope.showSecurity=false;
  $scope.showSuperAdmin=false;
  $scope.showReportAdmin=false;
}
$scope.showsecurity=function()
{
  $scope.SelectedRole="Security Admin";
  $scope.showSecurity=true;
  $scope.showLearner=true;
  $scope.showLearnerOps=false;
  $scope.showPeople=false;
  $scope.showCatalog=false;
  $scope.showLearnerPartner=false;
  $scope.showAssessment=false;
  $scope.showSurvey=false;
  $scope.showSuperAdmin=false;
  $scope.showReportAdmin=false;
}
$scope.showsuperAdmin=function()
{
  $scope.SelectedRole="Super Admin";
  $scope.showSuperAdmin=true;
  $scope.showLearner=true;
  $scope.showLearnerOps=false;
  $scope.showPeople=false;
  $scope.showCatalog=false;
  $scope.showLearnerPartner=false;
  $scope.showAssessment=false;
  $scope.showSurvey=false;
  $scope.showSecurity=false;
  $scope.showReportAdmin=false;
}
$scope.showreportAdmin=function()
{
  $scope.SelectedRole="Report Admin";
  $scope.showReportAdmin=true;
  $scope.showLearner=true;
  $scope.showLearnerOps=false;
  $scope.showPeople=false;
  $scope.showCatalog=false;
  $scope.showLearnerPartner=false;
  $scope.showAssessment=false;
  $scope.showSurvey=false;
  $scope.showSecurity=false;
  $scope.showSuperAdmin=false;
}

})