
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



//CONNECT TO CLOUDANT	

var url = 'https://username:password@myhost.cloudant.com';


var database01 = 'recdb-01user-resume-detail'
var conn01r = require('cloudant-quickstart')(url,database01);


var database02 = 'recdb-02user-schedule-detail'
var conn02s = require('cloudant-quickstart')(url,database02);

var database03 = 'recdb-03user-exam-detail'
var conn03e = require('cloudant-quickstart')(url,database03);

var database04 = 'recdb-04user-recomendation-detail'
var conn04r = require('cloudant-quickstart')(url,database04);

var database05 = 'recdb-05user-questionnaire-detail'
var conn05r = require('cloudant-quickstart')(url,database05);



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


	
	
Test=function(req,res){
	res.send('Cloudant API Service /api is up and running ');
}


function conection(dbname){
	
	
	
	if(dbname=='recdb-01user-resume-detail'){
		console.log(debug + 'returning connection...  conn01r');
		return conn01r ;
	}
	else if(dbname=='recdb-02user-schedule-detail'){
		console.log(debug + 'returning connection...  conn02s');
		return conn02s ;
	}
	else if(dbname=='recdb-03user-exam-detail'){
		console.log(debug + 'returning connection...  conn03e');
		return conn03e ;
	}
	else if(dbname=='recdb-04user-recomendation-detail'){
		console.log(debug + 'returning connection...  conn04r');
		return conn04r ;
	}
	else if(dbname=='recdb-05user-questionnaire-detail'){
		console.log(debug + 'returning connection...  conn05r');
		return conn05r ;
	}
}



/*==================================================================*/

getDocCountByParam=function(req,res){
	
	console.log(debug + 'getDocCountByParam '  + req.params.xparam   );
	console.log(debug + 'getDocCountByParam '  + req.params.bdxname  );
	
	
	DocCountByParam(req,conection(req.params.bdxname))
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
			deferred.resolve({success:true, data:data});
		})
		.catch(function(err){
			console.log(debug  + JSON.stringify(err));
			deferred.resolve({succes:false, error:err});
		});
		
	return deferred.promise;
}

/*==================================================================*/

getDocByID=function(req,res){
	
	console.log(debug + 'getDocByID '  + req.params.id     );
	console.log(debug + 'getDocByID '  + req.params.bdxname  );
	
	gtDocByID(req,conection(req.params.bdxname))
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
	console.log(debug + 'Fetching Doc by Id ' + req.params.id ) ;
	var deferred = Q.defer();
	
	con.get(req.params.id)
		.then(function(data){
			console.log(debug + JSON.stringify(data));
			deferred.resolve({success:true, data:data});
		})
		.catch(function(err){
			console.log(debug  + JSON.stringify(err));
			deferred.resolve({succes:false, error:err});
		});
		
	return deferred.promise;
}

/*==================================================================*/

updateDocByID=function(req,res){
	
	console.log(debug + 'updateDocByID '  + req.params.id     );
	console.log(debug + 'updateDocByID '  + req.params.bdxname  );
	
	UpdtDocByID(req,conection(req.params.bdxname))
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
	console.log(debug + 'Updating docs with param ' + req.params.id ) ;
	var deferred = Q.defer();
	
	con.update(req.params.id, req.body, true)
		.then(function(data){
			console.log(debug + JSON.stringify(data));
			deferred.resolve({success:true, data:data});
		})
		.catch(function(err){
			console.log(debug  + JSON.stringify(err));
			deferred.resolve({succes:false, error:err});
		});
		
	return deferred.promise;
}



/*====================================================================================*/

deleteDocByID=function(req,res){
	
	console.log(debug + 'deleteDocByID '  + req.params.id     );
	console.log(debug + 'deleteDocByID '  + req.params.bdxname  );
	
	DelDocByID(req,conection(req.params.bdxname))
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
	console.log(debug + 'Deletimg docs with param ' + req.params.id ) ;
	var deferred = Q.defer();
	
	con.del(req.params.id)
		.then(function(data){
			console.log(debug + JSON.stringify(data));
			deferred.resolve({success:true, data:data});
		})
		.catch(function(err){
			console.log(debug  + JSON.stringify(err));
			deferred.resolve({succes:false, error:err});
		});
		
	return deferred.promise;
}





/*====================================================================================*/
getDocByParam=function(req,res){
	
	console.log(debug + 'getDocByParam '  + req.params.ppam + ' ' + req.params.pval );
	console.log(debug + 'getDocByParam '  + req.params.bdxname  );
	
	DocByParam(req,conection(req.params.bdxname))
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
	console.log(debug + 'Fetching docs with param ' + req.params.ppam + ' ' + req.params.pval  ) ;
	var deferred = Q.defer();
	
	con.query({[req.params.ppam]:req.params.pval})
		.then(function(data){
			console.log(debug + JSON.stringify(data));
			deferred.resolve({success:true, data:data});
		})
		.catch(function(err){
			console.log(debug  + JSON.stringify(err));
			deferred.resolve({succes:false, error:err});
		});
		
	return deferred.promise;
}


/*================================================================================================*/

getDocs=function(req,res){
	
	console.log(debug + 'getDocByParam');
	
	gtDocs(req,conection(req.params.bdxname))
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
	
	pstDocs(req,conection(req.params.bdxname))
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



router.route('/:bdxname/docs/:xparam/count').get(getDocCountByParam);	
router.route('/:bdxname/docs/:id').get(getDocByID)
router.route('/:bdxname/docs/:id').put(updateDocByID)
router.route('/:bdxname/docs/:id').delete(deleteDocByID)
router.route('/:bdxname/docs/:ppam/:pval/').get(getDocByParam)
router.route('/:bdxname/docs').get(getDocs)
router.route('/:bdxname/docs').post(postDocs)

router.route('/').get(Test);








