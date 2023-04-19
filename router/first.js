const express=require('express');
const router=express.Router();
const contolBlo=require('../controller/controll-blood');

router.get('/',contolBlo.home);

router.post('/contactUs',contolBlo.postContact);

router.get('/contactUs',function(req,res){
    res.render('contactUs');
});

router.get('/whyDonate',function(req,res){
    res.render('whyDonate');
});
router.get('/aboutUs',function(req,res){
    res.render('aboutUs');
});

router.get('/confirm',function(req,res){
    res.render('confirm');
});

module.exports=router;