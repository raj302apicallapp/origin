
var app=angular.module('app')
app.controller('masterDashCtrl', function($scope) {
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

})
  
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