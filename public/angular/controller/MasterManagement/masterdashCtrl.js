var app=angular.module('app')
app.controller('masterDashCtrl', function($scope,masterdataService) {
 console.log("masterDashCtrl");

//get the window width
var windowwidth = $(window).width();
//while window width >960 apply the style--while load the window
if (windowwidth>960) {
$scope.widthEle=5;
}else{
$scope.widthEle=1;
}
//Resize window event
$(window).resize(function(){
if($(this).width() != windowwidth){
windowwidth = $(this).width();
console.log(windowwidth);
//while window width >960 apply the style--while shrink the window
if (windowwidth>960) {
$scope.widthEle=5;
}else{
$scope.widthEle=1;
}
}

});

$scope.action_name="Add";
$scope.savedata=function(data)
{

	var Senddata={};
            Senddata.data=data;
           var collection_name=Object.keys(data);
           Senddata.collection_name=collection_name[0];
           alert(JSON.stringify(Senddata)); 
    masterdataService.addmaster(Senddata).then(function(response)
    {
       $scope.masterdata.mVenuetype="";
    });
}
});
  
