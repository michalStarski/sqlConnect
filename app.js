const app = require('express')();
const http = require('http').Server(app);
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

app.use(express.static('.'));
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
})

app.post('/dbaccess', function(req, res){
    data = req.body;
    const connection = mysql.createConnection(data.login);
    connection.query(`select * from ${data.table}`, function(err){
        if(err){
            console.error('error connecting: ' + err.stack);
            res.status(404).send(err.stack);
            return;
        }
        console.log('connected!');
    });
});

app.listen(8080, function(){
    console.log('app listening on server 8080 ...');
})