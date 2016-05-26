var app=angular.module('app');
app.factory('curriculumService',function ($http,$window) {
return{
  pickemployee:function()
  {
  	   var employee = $http.get('/getemployee').then(function(response){
        return response;
      });
  	   return employee;
  }

	}
});