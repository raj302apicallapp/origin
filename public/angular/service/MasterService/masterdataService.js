var app=angular.module('app');
app.factory('masterdataService',function ($http,$window) {
return{
     addmaster:function(data)
     {

        
           var collection_name=Object.keys(data);
           data.collection_name=collection_name[0];
           alert(JSON.stringify(data));
          var promise = $http.post('/addmaster',data).then(function(response){
        return response;
      });

      return promise;
       }
	}
});
