var app=angular.module('app')
app.controller('masterDashCtrl', function($scope,masterdataService) {
 console.log("masterDashCtrl");
$scope.notexist=true;
$scope.checkmsg="";
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
           Senddata.status=1;
    masterdataService.addmaster(Senddata).then(function(response)
    {
      console.log("response"+JSON.stringify(response));
      if(response.data){
        if(response.data.mVenuetype)
        {
          $scope.masterdata.mVenuetype="";
        }
        else if(response.data.mRoomType)
        {
          $scope.masterdata.mRoomType="";
        }
        else if(response.data.mTags)
        {
             $scope.masterdata.mTags="";
        }
        else if(response.data.mSeatType)
        {
          $scope.masterdata.mSeatType="";
        }
        else if(response.data.mEquipment)
        {
          $scope.masterdata.mEquipment="";
        }
        else if(response.data.mLanguage)
        {
          $scope.masterdata.mLanguage="";
        }

      }
       
    });
}


$scope.OnCheckExist=function(data)
{
  $scope.notexist=true;
       $scope.checkmsg="";
          var Senddata={};
            Senddata.data=data;
           var collection_name=Object.keys(data);
           Senddata.collection_name=collection_name[0];
  masterdataService.OnCheckExist(Senddata).then(function(response)
  {
    $scope.notexist=true;
     if(response.data=="Not Exists")
     { 

      $scope.checkmsg="";
      $scope.notexist=false;
     }
     else 
     {  
      $scope.checkmsg="Value Already Exists";
      $scope.notexist=true;
     }
  })

}
$scope.flipped = false;

  $scope.flip = function() {
    $scope.flipped = !$scope.flipped;
  };
});




app.directive("flipper", function() {
  return {
    restrict: "E",
    template: "<div class='flipper' ng-transclude ng-class='{ flipped: flipped }'></div>",
    transclude: true,
    scope: {
      flipped: "="
    }
  };
});

app.directive("front", function() {
  return {
    restrict: "E",
    template: "<div class='front tile' ng-transclude></div>",
    transclude: true
  };
});

app.directive("back", function() {
  return {
    restrict: "E",
    template: "<div class='back tile' ng-transclude></div>",
    transclude: true
  }
});

  
  app.directive("flipPanel", function(){
  return {
    restrict : "E",
    // require : "^masterDashCtrl",
    transclusion : true,
    link: function(scope, element, attrs, flipCtr){
      if(!flipCtr.front) {flipCtr.front = element;}
      else if(!flipCtr.back) {flipCtr.back = element;}
      else {
        console.error("FLIP: Too many panels.");
      }
    }
  }
});
