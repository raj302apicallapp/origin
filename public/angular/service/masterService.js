var app=angular.module('app');
app.factory('masterService',function ($http,$window) {
return{
addSingleMaster:function(tablename,savedata){ 
	var passJson={"tablename":"MRoomtype","savedata":{"room":"room32"}};
 var promise = $http.post('/addmasters',passJson).then(function(response){
        console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise;
},
//get getLanguageMaster
  getLanguageMaster:function(){
      console.log("getLanguageMaster");
  var promise = $http.get('/getLanguageMaster').then(function(response){
        console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
},
	}

});