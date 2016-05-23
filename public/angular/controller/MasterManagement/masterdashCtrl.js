var app=angular.module("app");
app.controller("masterDashCtrl",function($scope,masterdataService){
console.log("Master Dashboard");
$scope.action_name="Add";
$scope.savedata=function(data)
{
    masterdataService.addmaster(data).then(function(response)
    {
       
    });
}
})