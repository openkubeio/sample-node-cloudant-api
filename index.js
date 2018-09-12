
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



//CONNECT TO CLOUDANT	
var url = 'https://username:password@myhost.cloudant.com';



var database01 = 'recdb-01user-resume-detail'
var conn01r = require('cloudant-quickstart')(url,database01);


var database02 = 'recdb-02user-schedule-detail'
var conn02s = require('cloudant-quickstart')(url,database02);

var database03 = 'recdb-03user-exam-detail'
var conn03e = require('cloudant-quickstart')(url,database02);

var database04 = 'recdb-04user-recomendation-detail'
var conn04r = require('cloudant-quickstart')(url,database02);

//ROUTES FOR OUR API
var router = express.Router(); 
router.use(bodyParser.urlencoded({ extended: true }));

//MIDDLEWARE to use for all requests
router.use(function(req, res, next) {
   console.log(debug + '/api'+req.url);	
   next(); 
});
app.use('/api', router);


	
	
Test=function(req,res){
	res.send('Cloudant API Service /api is up and running ');
}


function conection(dbname){
	if(dbname=='recdb-01user-resume-detail')
		return conn01r ;
	else if(dbname=='recdb-02user-schedule-detail')
		return conn02s ;
	else if(dbname=='recdb-03user-exam-detail')
		return conn03e ;
	else if(dbname=='recdb-04user-recomendation-detail')
		return conn04r ;
}



/*==================================================================*/

getDocCountByParam=function(req,res){
	
	console.log(debug + 'getDocs');
	
	DocCountByParam(req,conection(req.params.db-name))
		.then(function(abcSuccessRsp)
			{
				res.send(JSON.stringify(abcSuccessRsp,null,2));
			})
		.catch(function(abcErrorRsp)
			{
				res.send(JSON.stringify(abcErrorRsp,null,2));
			});
}

function DocCountByParam(req, con)
{
	console.log(debug + 'Counting docs with param ' + req.params.xparam ) ;
	var deferred = Q.defer();
	
	con.count(req.params.xparam)
		.then(function(data){
			console.log(debug + JSON.stringify(data));
			deferred.resolve(data);
		})
		.catch(function(err){
			console.log(debug  + JSON.stringify(err));
			deferred.resolve(err);
		});
		
	return deferred.promise;
}

/*==================================================================*/

getDocByID=function(req,res){
	
	console.log(debug + 'getDocByParam');
	
	gtDocByID(req,conn01r)
		.then(function(abcSuccessRsp)
			{
				res.send(JSON.stringify(abcSuccessRsp,null,2));
			})
		.catch(function(abcErrorRsp)
			{
				res.send(JSON.stringify(abcErrorRsp,null,2));
			});
}

function gtDocByID(req, con)
{
	console.log(debug + 'Counting docs with param ' + req.params.id ) ;
	var deferred = Q.defer();
	
	con.get(req.params.id)
		.then(function(data){
			console.log(debug + JSON.stringify(data));
			deferred.resolve(data);
		})
		.catch(function(err){
			console.log(debug  + JSON.stringify(err));
			deferred.resolve(err);
		});
		
	return deferred.promise;
}

/*==================================================================*/

updateDocByID=function(req,res){
	
	console.log(debug + 'getDocByParam');
	
	UpdtDocByID(req,conn01r)
		.then(function(abcSuccessRsp)
			{
				res.send(JSON.stringify(abcSuccessRsp,null,2));
			})
		.catch(function(abcErrorRsp)
			{
				res.send(JSON.stringify(abcErrorRsp,null,2));
			});
}

function UpdtDocByID(req, con)
{
	console.log(debug + 'Counting docs with param ' + req.params.id ) ;
	var deferred = Q.defer();
	
	con.update(req.params.id, req.body, true)
		.then(function(data){
			console.log(debug + JSON.stringify(data));
			deferred.resolve(data);
		})
		.catch(function(err){
			console.log(debug  + JSON.stringify(err));
			deferred.resolve(err);
		});
		
	return deferred.promise;
}

/*====================================================================================*/

deleteDocByID=function(req,res){
	
	console.log(debug + 'getDocByParam');
	
	DelDocByID(req,conn01r)
		.then(function(abcSuccessRsp)
			{
				res.send(JSON.stringify(abcSuccessRsp,null,2));
			})
		.catch(function(abcErrorRsp)
			{
				res.send(JSON.stringify(abcErrorRsp,null,2));
			});
}

function DelDocByID(req, con)
{
	console.log(debug + 'Counting docs with param ' + req.params.id ) ;
	var deferred = Q.defer();
	
	con.del(req.params.id)
		.then(function(data){
			console.log(debug + JSON.stringify(data));
			deferred.resolve(data);
		})
		.catch(function(err){
			console.log(debug  + JSON.stringify(err));
			deferred.resolve(err);
		});
		
	return deferred.promise;
}





/*====================================================================================*/
getDocByParam=function(req,res){
	
	console.log(debug + 'getDocByParam');
	
	DocByParam(req,conn01r)
		.then(function(abcSuccessRsp)
			{
				res.send(JSON.stringify(abcSuccessRsp,null,2));
			})
		.catch(function(abcErrorRsp)
			{
				res.send(JSON.stringify(abcErrorRsp,null,2));
			});
}

function DocByParam(req, con)
{
	console.log(debug + 'Counting docs with param ' + req.params.id ) ;
	var deferred = Q.defer();
	
	con.query({[req.params.ppam]:req.params.pval})
		.then(function(data){
			console.log(debug + JSON.stringify(data));
			deferred.resolve(data);
		})
		.catch(function(err){
			console.log(debug  + JSON.stringify(err));
			deferred.resolve(err);
		});
		
	return deferred.promise;
}


/*================================================================================================*/

getDocs=function(req,res){
	
	console.log(debug + 'getDocByParam');
	
	gtDocs(req,conn01r)
		.then(function(abcSuccessRsp)
			{
				res.send(JSON.stringify(abcSuccessRsp,null,2));
			})
		.catch(function(abcErrorRsp)
			{
				res.send(JSON.stringify(abcErrorRsp,null,2));
			});
}

function gtDocs(req, con)
{
	console.log(debug + 'Counting docs with param ' + req.params.id ) ;
	var deferred = Q.defer();
	
	con.all()
		.then(function(data){
			console.log(debug + JSON.stringify(data));
			deferred.resolve(data);
		})
		.catch(function(err){
			console.log(debug  + JSON.stringify(err));
			deferred.resolve(err);
		});
		
	return deferred.promise;
}


/*================================================================================================*/

postDocs=function(req,res){
	
	console.log(debug + 'getDocByParam');
	
	pstDocs(req,conn01r)
		.then(function(abcSuccessRsp)
			{
				res.send(JSON.stringify(abcSuccessRsp,null,2));
			})
		.catch(function(abcErrorRsp)
			{
				res.send(JSON.stringify(abcErrorRsp,null,2));
			});
}

function pstDocs(req, con)
{
	console.log(debug + 'Counting docs with param ' + req.params.id ) ;
	var deferred = Q.defer();
	
	con.insert(req.body)
		.then(function(data){
			console.log(debug + JSON.stringify(data));
			deferred.resolve(data);
		})
		.catch(function(err){
			console.log(debug  + JSON.stringify(err));
			deferred.resolve(err);
		});
		
	return deferred.promise;
}


/*================================================================================================*/



router.route('/').get(Test);	


router.route('/:db-name/docs/:xparam/count').get(getDocCountByParam);	
router.route('/:db-name/docs/:id').get(getDocByID)
router.route('/:db-name/docs/:id').put(updateDocByID)
router.route('/:db-name/docs/:id').delete(deleteDocByID)
router.route('/:db-name/docs/:ppam/:pval/').get(getDocByParam)
router.route('/:db-name/docs').get(getDocs)
router.route('/:db-name/docs').post(postDocs)













/*

//	var url = 'https://username:password@myhost.cloudant.com';
	var url = 'https://888a621e-5a1c-4f99-9a47-e82a51dd3433-bluemix:81abdecc0c6da96ab107dcb5c28433f5811210766cb4eeafce17d6390b18002f@888a621e-5a1c-4f99-9a47-e82a51dd3433-bluemix.cloudant.com'
	var database = 'user-profile'

	var conn = require('cloudant-quickstart')(url,database);
	
	
	conn.insert({username:'Jay S', useraddress:'178 Grren Park', uesracctnumber:6236353, userstatus:'Actve', loopback__model__name: 'model_user_profile'})
        .then(console.log)
		.catch(console.log);
	
	
	conn.get('1829024825344')
		.then(console.log)
		.catch(console.log);
		
		
	var id = '1829024825344';
	var newdoc = {username:'Jay Rosa', useraddress:'200 Grren Park', uesracctnumber:6236353, userstatus:'Actve', loopback__model__name: 'model_user_profile'};
	conn.update(id, newdoc)
		.then(console.log)
		.catch(console.log);

	
	var id = '7635491149053952';
	conn.del(id)
		.then(console.log)
		.catch(console.log) ;
		
	
//	conn.all({skip:300})
/*	conn.all()
		.then(console.log)
		.catch(console.log) ;
*/
	


/*	
	conn.query({username: 'Jayy'})
		.then(console.log)
		.catch(console.log) ;
		
		
	conn.count()
		.then(console.log)
		.catch(console.log) ;
		
		
	conn.count('loopback__model__name')
		.then(console.log)
		.catch(console.log) ;
	
*/
	
