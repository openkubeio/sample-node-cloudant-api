
var express = require("express");
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var request = require('request');

var Q = require("q");

var debug = '[DEBUG]  ' ;


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//enable CORS
 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT");
  next();
}); 

//START SERVER
var port = process.env.PORT || 5000;
app.listen(port, "0.0.0.0", function () {
    console.log("[DEBUG] Cloudant Api Service started on " + port);
	
  });
  

app.get('/',function(req, res){
	res.send("Cloudant Service started on " + port );
});



//ROUTES FOR OUR API
var router = express.Router(); 
router.use(bodyParser.urlencoded({ extended: true }));

//MIDDLEWARE to use for all requests
router.use(function(req, res, next) {
   console.log(debug + '/api'+req.url);	
   console.log(debug + 'req params ' +JSON.stringify(req.params,null,2));
   console.log(debug + 'req body ' +JSON.stringify(req.body,null,2));
   next(); 
});
app.use('/api', router);



/*===== Router functions ============================================*/
	
Test=function(req,res){
	res.send('/api is up and running ');
}

/*===== Router routes ===============================================*/

router.route('/').get(Test);

/*===================================================================*/

