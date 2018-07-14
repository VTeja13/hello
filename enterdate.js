var express=require("express");
var connection = require('./config');
module.exports.enter=function(req,res){
//console.log("hello",req.session);
    var users={
        
        "email":(req.session.email||"123"),
        "date":req.body.date,
        "event":req.body.event,
        "start":req.body.start,
        "endt":req.body.endt
    }
    connection.query('INSERT INTO calendar SET ?',users, function (error, results, fields) {
      if (error) {throw (error);
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
          res.json({
            status:true,
            data:results,
            message:'event added'
        })
      }
    });
}

