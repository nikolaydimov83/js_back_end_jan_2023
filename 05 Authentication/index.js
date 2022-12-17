const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const session=require('express-session');


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
        
        res.send(`<p>Hello, ${user}. Please login <a href="/login">here</a></p>`);

    }else{

        res.send(`<p>Hello, ${user}</p>`);
    }

    app.get('/login',(req,res)=>{
        res.send(`<form method="post">
        <input type="text" name="username">
        <input type="password" name="password">
        <input type="submit" value="Log in">
        </form>`)
    })

    app.post('/login',(req,res)=>{
      if(users[req.body.username]==req.body.password){
        req.session.user=req.body.username
        res.redirect(301,'/');
      }else{
        res.status(401).send('Incorrect username or password!');
      }
        
    })

    app.get('/register',(req,res)=>{
        res.send(`<form method="post">
        <input type="text" name="username">
        <input type="password" name="password">
        <input type="re-pass" name="password">
        <input type="submit" value="Log in">
        </form>`)
    })

    app.post('/register',(req,res)=>{
      if(users[req.body.username]==req.body.password){
        req.session.user=req.body.username
        res.redirect(301,'/');
      }else{
        res.status(401).send('Incorrect username or password!');
      }
        
    })

}).listen(3000);