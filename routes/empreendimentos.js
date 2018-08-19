var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool  = mysql.createPool({
  multipleStatements: true,
  connectionLimit : 1000,
  connectTimeout  : 60 * 60 * 1000,
  aquireTimeout   : 60 * 60 * 1000,
  timeout         : 60 * 60 * 1000,
  host            : 'host',
  user            : 'user',
  password        : 'password',
  database        : 'db'
});

/* GET empreendimentos listing. */
router.get('/', function(req, res, next) {
  pool.query('SELECT * from empreendimentos', function (error, results, fields) {
    if (error) throw error;
    res.json(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

/* GET empreendimento listing. */
router.get('/:id', function(req, res, next) {

  pool.query('SELECT * from empreendimentos WHERE id = ' + req.params.id 
    + '; SELECT * from fotos WHERE empreendimentos_id = ' + req.params.id, function (error, results, fields) {
    if (error) throw error;
    res.json(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

module.exports = router;
