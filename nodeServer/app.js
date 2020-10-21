var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { dirname } = require('path');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/getJsonData',async (req,res)=>{
    try{
        const {data} = require('./Api.json')
        return res.status(200).json({
            status:true,
            data: data
        })

    }catch(err){
        return res.status(200).json({
            status:false,
            message : "No Data Found" 
        })
    }
})
app.use(express.static(path.join(__dirname, "..", "build")));
app.get('/*',async (req,res)=>{
    return res.sendFile(path.join(__dirname, "..", "build",'index.html'))
})
app.use(express.static("public"));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;
