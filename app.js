const app = require('express')();
const http = require('http').Server(app);
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const mssql = require('mssql');

app.use(express.static('.'));
app.use(bodyParser.json());

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
})

app.post('/dbaccess/mysql', function(req, res){
    data = req.body;
    const connection = mysql.createConnection(data.login);
    connection.query(`select * from ${data.table}`, function(err, results, fields){
        if(err){
            res.status(err.status).send(err);
            return;
        }
        res.send(results);
    });
});

app.post('/dbaccess/mssql', function(req, res){
    data = req.body;
    mssql.connect(data.login, err => {
        // ... error checks
        if(err)
            res.status(err.status).send(err);
        // Query
        new mssql.Request().query(`select * from ${data.table}`, (err, result) => {
            // ... error checks
            if(err)
                throw err;
            res.send(result);
        })
    })
    mssql.on('error', err => res.status(err.status).send(err))
});

app.listen(8080, function(){
    console.log('app listening on server 8080 ...');
})