(function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;
    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();


var express=require('express');
var app=express();
var router=express.Router();
var path=require('path');
// var router=express.Router();
var bodyPaser=require('body-parser');
var http = require('http');
var mongojs=require('mongojs');
var collections=['register'];

// python code starts here

// var PythonShell = require('python-shell');

// PythonShell.run('test.py', function (err) {
//   if (err) throw err;
//   console.log('finished');
// });


var PythonShell = require('python-shell');
shell.send('message');

var options = {
  mode: 'text',
  pythonPath: 'C:/Users/rajeev/AppData/Local/Programs/Python/Python35-32/python.exe',
  pythonOptions: ['-u'],
};

PythonShell.run('test.py', options, function (err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  console.log("finished executing python script");
  console.log(results);
});


// var PythonShell = require('python-shell');

// var options = {
//   mode: 'text',
//   pythonPath: 'C:\Users\rajeev\AppData\Local\Programs\Python\Python35-32',
//   pythonOptions: ['-u'],
//   scriptPath: 'F:\website\ipl5th_sem_working'
//   // args: ['value1', 'value2', 'value3']
// };

// PythonShell.run('my_script.py', options, function (err, results) {
//   if (err) throw err;
//   // results is an array consisting of messages collected during execution
//   console.log('results: %j', results);
// });


// PythonShell.run('test.py', function (err) {
//   if (err) throw err;
//   console.log('finished');
// });

// var spawn = require("child_process").spawn;


// python code ends here
// var db = mongojs('mongodb://dev.frugaltek.com:27017/flms', ['register']);
 // var db = mongojs('mongodb://bhuvanesh:123@ds023398.mlab.com:23398/heroku_461p1j1s', collections);
var port = Number(process.env.PORT || 3000)
var session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.use('/', express.static(__dirname+'/public'));
app.listen(port,function(){
})

