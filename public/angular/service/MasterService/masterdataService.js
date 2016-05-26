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
       },
       OnCheckExist:function(data)
       {
     
       	var promise = $http.post('/OnCheckExist',data).then(function(response)
          {
            return response;
          });

           return promise;
       },
       getHospital:function()
       {
        var promise=$http.get('/getHospital').then(function(response)
        {
          return response;
        });
        return promise;
       }
	}
});
