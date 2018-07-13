var express=require("express");
var bodyParser=require('body-parser');
var session = require('express-session');
 
var connection = require('./config');
var app = express();
app.use(session({
secret: 'ssshhhhh',
}));
 
var authenticateController=require('./authenticate-controller');
var registerController=require('./register-controller');
var enterController=require('./enterdate');
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
var sess;
app.get('/',function(req,res){
res.sendFile( __dirname + "/" + "index.html" );
});
 
app.get('/login.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "login.html" );  
});  

app.post('/login.html',function(req,res){
  sess = req.session;
//In this we are assigning email to sess.email variable.
//email comes from HTML page.
  sess.email=req.body.email;
  res.end('');
});
app.get('/calendarform.html',function(req,res){
  sess = req.session;
if(sess.email) {
res.sendFile( __dirname + "/" + "calendarform.html" );

} 
else {
      res.sendFile( __dirname + "/" + "login.html" );  
}
});
/* route to handle login and registration */
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
app.post('/api/enter',enterController.enter);


console.log(authenticateController);
app.post('/register-controller', registerController.register);
app.post('/authenticate-controller', authenticateController.authenticate);
app.post('/enterdate', enterController.enter);
app.listen(8012);

