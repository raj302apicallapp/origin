var app=angular.module("app");
app.service('tbservice', function($http){
   this.getHeader=function(){
   	var getHeaders=["Column 1","Column 2","Column 3","Column 4","Column 5"];
   	return getHeaders;
   }
   this.getData=function(){
   	var promise = $http.get('/getcourse').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise;
   
   	// var getData=[
   	// {
   	// 	"Column1":"Data11","Column2":"Data12","Column3":"Data13","Column4":"Data14","Column5":"Data15"
   	// },
   	// {
   	// 	"Column1":"Data21","Column2":"Data22","Column3":"Data23","Column4":"Data24","Column5":"Data25"
   	// },
   	// {
   	// 	"Column1":"Data31","Column2":"Data32","Column3":"Data33","Column4":"Data34","Column5":"Data35"
   	// },
   	// {
   	// 	"Column1":"Data41","Column2":"Data42","Column3":"Data43","Column4":"Data44","Column5":"Data45"
   	// },
   	// {
   	// 	"Column1":"Data51","Column2":"Data52","Column3":"Data53","Column4":"Data54","Column5":"Data55"
   	// }
   	// ];
   	// return getData;
   }
});