var express = require('express');
var router = express.Router();

/* GET empreendimentos listing. */
router.get('/', function(req, res, next) {
	res.locals.connection.query('SELECT * from empreendimentos', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

/* GET empreendimento listing. */
router.get('/:id', function(req, res, next) {
	res.locals.connection.query('SELECT * from empreendimentos WHERE id = ' + req.params.id, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

module.exports = router;
