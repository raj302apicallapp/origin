var app=angular.module('app');
app.factory('masterdataService',function ($http,$window) {
return{
     addmaster:function(data)
     {

            
          var promise = $http.post('/addmaster',data).then(function(response)
          {
            return response;
          });

           return promise;
       }
	}
});
