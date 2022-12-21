const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const session=require('express-session');
const mongoose=require('mongoose');
const User = require('./User');
const { hash } = require('bcrypt');
const { comparePass, hashPass } = require('./hashing');
const connection=mongoose.connect(`mongodb://localhost:27017/login`,{
  useUnifiedTopology:true,
  useNewUrlParser:true,
  
});

app.use(cookieParser());
app.use(session({
secret:'My se$Cret# key! 1848',
saveUninitialized:true,
resave:false,
cookie:{secure:false}
}));

app.use(express.urlencoded());

const users={
    pesho:'123456',
    gosho:'qwerty'
}

app.get('/',(req,res)=>{
    let user=req.session.user||'guest';
    
    if (user=='guest'){
        
        res.send(`<p>Hello, ${user}. Please login <a href="/login">here</a></p>
        <p>If you are not logged in - you can register <a href="/register">here</a></p>`);

    }else{

        res.send(`<p>Hello, ${user}</p>`);
    }

    app.get('/login',(req,res)=>{
        res.send(`<form method="post">
        <input type="text" name="username">
        <input type="password" name="password">
        <input type="submit" value="Log in">
        </form>`);
    })

    app.post('/login',async (req,res)=>{
      try{
        let user=await User.findOne({username:req.body.username});
          if (!user){
            throw new Error('Incorrect username or Password')
          }
      let passesMatch=await comparePass(req.body.password, user.hashPass)
      if (!passesMatch){
        throw new Error('Incorrect username or Password')
      }
      req.session.user=user.username;
      
      res.redirect(301,'/');
      }catch(err){
        res.status(401).send(err.message)
        
      }


        
    });

    app.get('/register',(req,res)=>{
        res.send(`<form method="post">
        <input type="text" name="username">
        <input type="password" name="password">
        <input type="re-pass" name="re-pass">
        <input type="submit" value="Log in">
        </form>`)
    });

    app.post('/register',async (req,res)=>{

      try {
          let user=await User.findOne({username:req.body.username});
        if (user){
          throw new Error('User already exists!')
        }
        let pass=await hashPass(req.body.password)
        await User.create({
          username:req.body.username,
          hashPass:pass
        })
        req.session.user=req.body.username;
        res.redirect(301,'/');
      } catch (err) {
        res.status(401).send(err.message)
      }

        
    })

}).listen(3000);