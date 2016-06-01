var app=angular.module('app');
app.factory('trainerService',function ($http,$window) {
return{

    updatetrainerdatas:function(savedata){
   // alert("datass"+JSON.stringify(savedata));
      console.log("trainerService"+JSON.stringify(savedata));
    var promise = $http.post('/updateVendordatas',savedata).then(function(response){
        console.log("Service response"+JSON.stringify(response));
        return response;
      });
      return promise; 

    },

addTrainer:function(savedata){
  savedata.trainerstatus=1;
     savedata.addeddate=new Date();
  var services = $http.post('/addtrainerdata',savedata).then(function(response)
  { 
    
      return response;
      console.log("service"+JSON.stringify(response))
  });
   return services;
},
removeTrainermgnt:function(id){
  console.log(id);
        var remove=$http.post('/removeTrainermgnttype',id).then(function(response){
           console.log("removeVendor response"+JSON.stringify(response));
           return response;
        });
        return remove;
},
 

getTrainermgnt:function(activestatus){
  console.log("Service::"+activestatus);
  if (activestatus==false) {
    var promise = $http.get('/getTrainermgntdata').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }else{
      var promise = $http.get('/getallTrainermgnt').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }
  
},


removeTrainer:function(removeitem){
  var promise = $http.post('/removetrainer',removeitem).then(function(response){
        return response;
      });
      // Return the promise to the controller
      return promise; 
},
activeTrainer:function(activeitem){
  var promise = $http.post('/statustrainer',activeitem).then(function(response){
        return response;
      });
      // Return the promise to the controller
      return promise; 
},


getTrainer:function(activestatus){
  console.log("Service::"+activestatus);
  if (activestatus==false) {
    var promise = $http.get('/gettrainer').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }else{
      var promise = $http.get('/getalltrainer').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }
	
},
getCompetency:function(activestatus){
  console.log("Service::"+activestatus);
  if (activestatus==false) {
    var promise = $http.get('/getcompetency').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }else{
      var promise = $http.get('/getallcompetency').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }
  
},

getCertification:function(activestatus){
  console.log("Service::"+activestatus);
  if (activestatus==false) {
    var promise = $http.get('/getcertification').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }else{
      var promise = $http.get('/getallcertification').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }
  
},


getVendor:function(activestatus){
  console.log("Service::"+activestatus);
  if (activestatus==false) {
    var promise = $http.get('/getvendor').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }else{
      var promise = $http.get('/getallvendor').then(function(response){
        // console.log("Service response"+JSON.stringify(response));
        return response;
      });
      // Return the promise to the controller
      return promise; 
    }
  
},
}
});