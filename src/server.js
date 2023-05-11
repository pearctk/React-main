var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mydb'
});
 
var app = express()
app.use(cors())
app.use(express.json())
 
app.get('/howto', function (req, res, next) {
    connection.query(
        'SELECT * FROM `howto`',
        function(err, results, fields) {
            res.json(results);
        }
      );
})

app.get('/howto/:id', function (req, res, next) {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM `howto` WHERE `id` = ?',
        [id],
        function(err, results) {
            res.json(results);
        }
      );
})

app.post('/howto', function (req, res, next) {
    connection.query(
        'INSERT INTO `howto`(`image`, `name`, `detail`, `location`) VALUES (?, ?, ?, ?)',
        [req.body.image, req.body.name, req.body.detail, req.body.location],
        function(err, results) {
            res.json(results);
        }
      );
})

app.put('/howto', function (req, res, next) {
    connection.query(
        'UPDATE `howto` SET `image`=?, `name`=?, `detail`=?, `location`=? WHERE `id`=?',
        [req.body.image, req.body.name, req.body.detail, req.body.location, req.body.id],
        function(err, results) {
            res.json(results);
        }
      );
})

app.delete('/howto', function (req, res, next) {
    connection.query(
        'DELETE * FROM `howto` WHERE `id` = ?',
        [req.body.id],
        function(err, results) {
            res.json(results);
        }
      );
})


app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})