var app=angular.module('app');

app.controller('entityCtrl',function($scope,$mdToast){
  console.log("Entity Controller");
    $scope.saveRowCallback = function(row){
            $mdToast.show(
                $mdToast.simple()
                    .content('Row changed to: '+row)
                    .hideDelay(3000)
            );
        };
  $scope.entitys = [
            {
                name: 'Entity1',
            },
            {
                name: 'Entity2',
            },
            {
                name: 'Entity3',
            },
            {
                name: 'Entity4',
            },
            {
                name: 'Entity5',
            }
        ];
});