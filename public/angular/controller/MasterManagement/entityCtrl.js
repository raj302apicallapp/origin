var app=angular.module('app');

app.controller('entityCtrl',function($scope,$mdToast,tbservice){
  console.log("Entity Controller");
$scope.getHeaders=tbservice.getHeader();
tbservice.getData();
// $scope.getData=
});