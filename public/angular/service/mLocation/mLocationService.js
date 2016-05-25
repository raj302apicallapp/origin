var app=angular.module('app');
app.factory('mLocationService',function ($http,$window) {
return{
	addCountry:function(data)
	{   data.status=1;
		console.log(JSON.stringify(data));
		var add=$http.post('/addCountry',data).then(function(response)
		{
            return response;
		});
		return add;
	},
	getLocation:function()
	{
       var get=$http.get('/getLocation').then(function(response)
       {
        return response;
       });
       return get;
	},
	addState:function(data)
	{
		data.status=1;

		console.log(JSON.stringify(data));
		var add=$http.post('/addState',data).then(function(response)
		{
            return response;
		});
		return add;
	}
}
});