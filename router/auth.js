const express=require('express');
const router=express.Router();

const contolAuth=require('../controller/conroll-auth');

router.get('/login',contolAuth.getLogin);

router.post('/login',contolAuth.postLogin);

router.get('/register',contolAuth.getregister);

router.post('/register',contolAuth.postregister);



router.post('/logout',contolAuth.logout);

module.exports=router;