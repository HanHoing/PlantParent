const express = require('express');
const path = require('path');
const app = express();
const dbconfig = require('./config/database.js');

//mysql연동 관련
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);

//--------------------------------------------------------------------
//node.js ajax요청 관련
//다른 도메인 주소 3000-8080끼리 ajax 요청 주고받을시 필요 
app.use(express.json());
var cors = require('cors');
const { table } = require('console');
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', function(요청, 응답){
  응답.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});


app.set('port', process.env.PORT || 8080);


//=====================================User CRUD===================================

//UserCreate
app.post('/userInsert', function(req,res){
  var params = [req.body.id, req.body.pwd];
  connection.query('INSERT INTO users (id, pwd) VALUES (?, ?)',params, (error, rows, fields) => {
    if (error) throw error;
    console.log('User insert is: ', rows);
  });
})

//UserRead  ==> 전체 회원정보 
app.get('/userSelect', (req, res) => {
  connection.query('SELECT * from Users', (error, rows, fields) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});


//UserUpdate  ==> 일단 pwd 변경만 
app.post('/userUpdate', function(req,res){
  var params = [req.body.pwd, req.body.id];
  connection.query('UPDATE users SET pwd = ? WHERE id = ?', params, (error, rows, fields) => {
    if (error) throw error;
    console.log('User update is: ', rows);
  });
})

//UserDelete   ==> id, pwd 모두 동일하면 삭제되게 
app.post('/userDelete', function(req,res){
  var params = [req.body.id, req.body.pwd];
  connection.query('DELETE FROM users WHERE id = ? AND pwd = ? ',params, (error, rows, fields) => {
    if (error) throw error;
    console.log('User delete is: ', rows);
  });
})

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})




