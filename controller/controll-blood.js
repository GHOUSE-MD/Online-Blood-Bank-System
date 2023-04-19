const mongodb=require('mongodb');
const ObjectId=mongodb.ObjectId;
const Double = require("mongodb").Double;
const db=require('../data/database');


async function getneedBlood(req,res){
    const bgs = await db.getdb().collection('bg').find().toArray();
    const mandals = await db.getdb().collection('mandals').find().toArray();

    res.render('needBlood',{bgs:bgs,mandals:mandals});
}

async function postneedBlood(req,res){
    const bgId=new ObjectId(req.body.bloodgroup);
    const mandalId=new ObjectId(req.body.mandal);

    const bg = await db.getdb().collection('bg').findOne({ _id: bgId });
    const mandal=await db.getdb().collection('mandals').findOne({_id:mandalId});

    const why = {
      loc:{
        type:"Point",
        coordinates:[new Double(req.body.demo2),new Double(req.body.demo1)],
      },
      bg: {
        id: bgId,
        name: bg.name,
      },
      mandal:{
        id:mandalId,
        name:mandal.name
      },
      reason: req.body.reason,
    };
    
    const result=await db.getdb().collection('reasonWhy').insertOne(why);
    res.redirect('/donarList');
}


async function needBloodId(req,res){
    const bId=req.params.id;
    const info=await db.getdb().collection('donorInfo').findOne({_id: new ObjectId(bId)},{mandal:0});
    
    res.render('viewMore',{info:info});
}

async function getDonar(req,res){
    const bgs = await db.getdb().collection('bg').find().toArray();
    const mandals = await db.getdb().collection('mandals').find().toArray();

    res.render('donate',{bgs:bgs,mandals:mandals});
}


async function postDonar(req,res){
    const bgId=new ObjectId(req.body.bloodgroup);
    const mandalId=new ObjectId(req.body.mandal);

    const bg=await db.getdb().collection('bg').findOne({_id:bgId});
    const mandal=await db.getdb().collection('mandals').findOne({_id:mandalId});
    clat=new Double(req.body.demo2);
    clong=new Double(req.body.demo1);
    const newDonar ={
      name: req.body.fullname,
      mobileNo: req.body.mobileno,
      email:req.body.email,
      age:req.body.age,
      gender:req.body.gender,
      bg:{
        id:bgId,
        name:bg.name,
      },
      location:{
            type:"Point",
            coordinates:[new Double(req.body.demo2),new Double(req.body.demo1)],
      },
      
      date:new Date("<YYYY-mm-dd>"),
      address:req.body.address,
    };

    await db.getdb().collection("donorInfo").createIndex({'location':"2dsphere"});
    await db.getdb().collection('donorInfo').insertOne(newDonar);
    res.redirect('/confirm');
}

async function postContact(req,res){

    const newQuery = {
      name: req.body.fullname,
      mobileNo: req.body.mobileno,
      email:req.body.email,
      date:new Date(),
      subject:req.body.subject,
      message:req.body.message
    };
    await db.getdb().collection('donorQuery').insertOne(newQuery)
    res.redirect('/confirm');
}

async function home(req,res){
    const collection=await db.getdb().collection('donorInfo')
  
    const q1={"bg.name":'A+'};
    const Ap= await collection.countDocuments(q1);
  
    const q2={"bg.name":'A-'};
    const An=  await collection.countDocuments(q2);
  
    const q3={"bg.name":'B+'};
    const Bp=  await collection.countDocuments(q3);
  
    const q4={"bg.name":'B-'};
    const Bn=  await collection.countDocuments(q4);
  
    const q5={"bg.name":'O+'};
    const Op=  await collection.countDocuments(q5);
  
    const q6={"bg.name":'O-'};
    const On=  await collection.countDocuments(q6);
  
    const q7={"bg.name":'AB+'};
    const ABp=  await collection.countDocuments(q7);
  
    const q8={"bg.name":'AB-'};
    const ABn= await collection.countDocuments(q8);
    
    res.render('home',{Ap:Ap,An:An,Bp:Bp,Bn:Bn,Op:Op,On:On,ABp:ABp,ABn:ABn});
}

async function getDonarList(req,res){
  const reasons=await db
  .getdb()
  .collection('reasonWhy')
  .find().sort({_id:-1}).limit(1)
  .toArray();

  const a =JSON.stringify(reasons);
  const b=JSON.parse(a);
  const c=(b[0].loc.coordinates);
  console.log(c);
  const coor=c;

  const query = {
    location: {
      $geoWithin: { 
        $centerSphere: [ coor, 15 / 3963.2] 
      },
    },
  };

    const infos = await db
      .getdb()
      .collection("donorInfo")
      .find(query)
      .toArray();
    res.render('donarList',{infos:infos,reasons:reasons});
  }

module.exports={
    getneedBlood:getneedBlood,
    postneedBlood:postneedBlood,
    needBloodId:needBloodId,
    getDonar:getDonar,
    postDonar:postDonar,
    getDonarList:getDonarList,
    postContact:postContact,
    home:home
}