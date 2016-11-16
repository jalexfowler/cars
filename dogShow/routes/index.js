var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var Dog = mongoose.model('Dog');


router.get('/dogs', function(req, res, next) {
	Dog.find(function(err, dogs){
		if(err){return next(err); }
		res.json(dogs);
	});
});

router.post('/dogs', function(req, res, next){
	var dog= new Dog(req.body);
	dog.save(function(err, dog){
		if(err){ return next(errr);}
		res.json(dog);
	});
});

router.param('dogid', function(req, res, next, id){
	var query= Dog.findById(id);
	query.exec(function(err, dog){
	if(err){ return next(err);}
	if(!dog) {return next(new Error("can't find dog"));}
	req.dog=dog;
	return next();
});
});


router.get('/dogs/:dogid', function(req, res){
	res.json(req.dog);
});

router.put('/dogs/:dogid/upvote', function(req, res, next){
	req.dog.upvote(function(err,dog){
		if(err){return next(err);}
		res.json(dog);
	});
});
	
router.delete('/dogs/:dogid', function(req, res){
console.log("in Delete");
console.log(req.dog);
req.dog.remove();

res.json(req.dog);
});
module.exports = router;
