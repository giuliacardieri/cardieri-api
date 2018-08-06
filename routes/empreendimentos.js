var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'cardieri2018.mysql.uhserver.com',
  user            : 'giulia93',
  password        : 'INC.2018',
  database        : 'cardieri2018'
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
	pool.query('SELECT * from empreendimentos WHERE id = ' + req.params.id, function (error, results, fields) {
		if (error) throw error;
		res.json(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

module.exports = router;
