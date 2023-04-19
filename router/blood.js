const express=require('express');

const router=express.Router();

const contolBlo=require('../controller/controll-blood');

router.get('/needBlood',contolBlo.getneedBlood);

router.post('/needBlood', contolBlo.postneedBlood);

router.get('/needBlood/:id',contolBlo.needBloodId,);

router.get('/donate',contolBlo.getDonar);

router.post('/donate',contolBlo.postDonar);

router.get('/donarList',contolBlo.getDonarList);

module.exports=router;