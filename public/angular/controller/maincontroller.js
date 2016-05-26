var app=angular.module('app',['ngRoute','ngStorage','ngMaterial','ngMessages','angularUtils.directives.dirPagination','ngSanitize','ephox.textboxio']);

app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
$routeProvider.
when('/',
{
  templateUrl: 'angular/view/InformalLearning/manage/list.html', 
  controller: 'ILController'
}).
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
  templateUrl:'angular/view/mOrganization/MasterPages/mEntity.html',
  controller:'organizationCtrl'
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
when('/MCompetencylevels',
{
  templateUrl: 'angular/view/MasterManagement/MCompetencylevel.html', 
  controller: 'masterDashCtrl'
}).
when('/mMasterylevels',
{
  templateUrl: 'angular/view/MasterManagement/mMasterylevels.html', 
  controller: 'masterDashCtrl'
}).
when('/mLearningTypeFormal',
{
  templateUrl: 'angular/view/MasterManagement/mLearningTypeFormal.html', 
  controller: 'masterDashCtrl'
}).
when('/mLearningTypeInformal',
{
  templateUrl: 'angular/view/MasterManagement/mLearningTypeInformal.html', 
  controller: 'masterDashCtrl'
}).
when('/mVendortype',
{
  templateUrl: 'angular/view/MasterManagement/mVendortype.html', 
  controller: 'masterDashCtrl'
}).
when('/mTrainertype',
{
  templateUrl: 'angular/view/MasterManagement/mTrainertype.html', 
  controller: 'masterDashCtrl'
}).
when('/mLearningRequestobjective',
{
  templateUrl: 'angular/view/MasterManagement/mLearningRequestObjective.html', 
  controller: 'masterDashCtrl'
}).
when('/mCommunitytype',
{
  templateUrl: 'angular/view/MasterManagement/mCommunityType.html', 
  controller: 'masterDashCtrl'
}).
when('/mSecurityrole',
{
  templateUrl: 'angular/view/MasterManagement/mSecurityRole.html', 
  controller: 'masterDashCtrl'
}).
when('/mAwardtype',
{
  templateUrl: 'angular/view/MasterManagement/mAwardType.html', 
  controller: 'masterDashCtrl'
}).
when('/mAcheivementtype',
{
  templateUrl: 'angular/view/MasterManagement/mAcheivementType.html', 
  controller: 'masterDashCtrl'
}).
when('/mChallengetype',
{
  templateUrl: 'angular/view/MasterManagement/mChallengeType.html', 
  controller: 'masterDashCtrl'
}).
when('/mAssignmentreason',
{
  templateUrl: 'angular/view/MasterManagement/mAssignmentReason.html', 
  controller: 'masterDashCtrl'
}).
when('/mAssignmenttype',
{
  templateUrl: 'angular/view/MasterManagement/mAssignmentType.html', 
  controller: 'masterDashCtrl'
}).
when('/mTickettype',
{
  templateUrl: 'angular/view/MasterManagement/mTicketType.html', 
  controller: 'masterDashCtrl'
}).
when('/mEmployeetype ',
{
  templateUrl: 'angular/view/MasterManagement/mEmployeeType.html', 
  controller: 'masterDashCtrl'
}).
when('/mQuestiontype',
{
  templateUrl: 'angular/view/MasterManagement/mQuestionType.html', 
  controller: 'masterDashCtrl'
}).
when('/mDevicetype',
{
  templateUrl: 'angular/view/MasterManagement/mDeviceType.html', 
  controller: 'masterDashCtrl'
}).
when('/mdeviceOS',
{
  templateUrl: 'angular/view/MasterManagement/mDeviceOS.html', 
  controller: 'masterDashCtrl'
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
$scope.showlearner=function()
{
  console.log("insss")
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
   $scope.showCatalog=true;
  $scope.showLearner=false;
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
  $scope.showAssessment=true;
  $scope.showLearner=false;
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
  $scope.showSuperAdmin=true;
  $scope.showLearner=false;
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