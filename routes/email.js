var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport('smtps://giulia.cardieri%40gmail.com:Pretty.Odd.srgoogle2017@smtp.gmail.com');

/* GET email listing. */
router.post('/', function(req, res) {
	var email = req.body; 
	var mailOptions = {
	  from: 'giulia@cardieri.com.br',
	  to: 'dinokikiteam@gmail.com',
	  subject: 'Contato - Cardieri INC',
	  text: `Olá! O site da Cardieri INC recebeu uma nova mensagem de contato.\n Nome: ${ email.nome }\n E-mail: ${ email.email }\n Telefone: ${ email.telefone }\n Mensagem: ${ email.mensagem }`
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
		res.json(JSON.stringify({"response": 0}));
	  } else {
	    console.log('Email sent: ' + info.response);
		res.json(JSON.stringify({"response": 1}));
	  }
	});
});

module.exports = router;
