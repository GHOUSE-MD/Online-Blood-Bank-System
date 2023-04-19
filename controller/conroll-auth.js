const db=require('../data/database');
const bcrypt=require('bcrypt');

function getLogin(req,res){
    let sessionInput=req.session.inputData;
    if(!sessionInput) {
        sessionInput={
        hasError:false,
        email:'',
        password:''
        }
    }
    req.session.inputData=null;
    res.render('login',{InputData:sessionInput});
}

async function postLogin(req,res){
    const userData=req.body;
    const enterednemail=userData.email;
    const enteredpassword=userData.password;

    const existingUser=await db.getdb().collection('users').findOne({email : enterednemail});
    if(!existingUser){
        req.session.inputData={
            hasError:true,
            message:'Sign in first baka',
            email:enterednemail,
            password:enteredpassword
        }
        req.session.save(function(){

            res.redirect('/login');
        })
        return;
    }
    const passEqual=await bcrypt.compare(enteredpassword,existingUser.password);
    if(!passEqual){
        req.session.inputData={
            hasError:true,
            message:'Wrong Password You idiot',
            email:enterednemail,
            password:enteredpassword
        }
        req.session.save(function(){

            res.redirect('/login');
        })

        return;
    }
    req.session.user={ id:existingUser._id,email:existingUser.email};
    req.session.isAuthenticated=true;
    req.session.save(function(){
       return res.redirect('/');
    })

}

function getregister(req,res){

    let sessionInput=req.session.inputData;
    if(!sessionInput) {
        sessionInput={
        hasError:false,
        email:'',
        password:'',
        repassword:''
        }
    }
    req.session.inputData=null;
    res.render('register',{InputData:sessionInput});
}

async function postregister(req,res){
    const userData=req.body;
    const enterednemail=userData.email;
    const enteredpassword=userData.password;
    const enterrepassword=userData.repassword;

    const existingUser=await db.getdb().collection('users').findOne({email : enterednemail});
    if(existingUser){
        req.session.inputData={
            hasError:true,
            message:'You have already sign in bro',
            email:enterednemail,
            password:enteredpassword,
            repassword:enterrepassword
        }
        req.session.save(function(){
            res.redirect('/register');
        });
        return ;
    }

    if (
      !enterednemail ||
      !enteredpassword ||
      !enterrepassword ||
      enteredpassword !== enterrepassword ||
      enteredpassword.trim() < 6 ||
      !enterednemail.includes('@')
    ) {
        req.session.inputData={
            hasError:true,
            message:'Check your data properly',
            email:enterednemail,
            password:enteredpassword,
            repassword:enterrepassword
        }
        req.session.save(function(){
            res.redirect('/register');
        });
        return ;
    }

    const hashedpassword=await bcrypt.hash(enteredpassword,12);

    const user={
        email:enterednemail,
        password:hashedpassword
    }
    await db.getdb().collection('users').insertOne(user);
    res.redirect('/login');
}

function logout(req,res){
    req.session.user=null;
    req.session.isAuthenticated=false;
    res.redirect('/');
}
module.exports={
    getLogin:getLogin,
    postLogin:postLogin,
    getregister:getregister,
    postregister:postregister,
    logout:logout
}
