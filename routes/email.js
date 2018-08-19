var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport( {
    host: "smtp.cardieri.com.br", // hostname
    secureConnection: true, // use SSL
    port: 587, // port for secure SMTP
    auth: {
        user: "your-email",
        pass: "your-password"
    }
});

/* GET email listing. */
router.post('/', function(req, res) {
	var email = req.body; 
	var mailOptions = {
	  from: 'your-email',
	  to: 'recipient-email',
	  subject: 'Contato - Cardieri INC',
	  text: `Olá! O site da Cardieri INC recebeu uma nova mensagem de contato.\n Nome: ${ email.nome }\n E-mail: ${ email.email }\n Telefone: ${ email.telefone }\n Mensagem: ${ email.mensagem }`
	};

	if (email.assunto) {
		mailOptions.text = `Olá! O site da Cardieri INC recebeu uma nova mensagem de contato.\n Nome: ${ email.nome }\n E-mail: ${ email.email }\n Telefone: ${ email.telefone }\n Mensagem: ${ email.mensagem } \n Assunto: ${ email.assunto }`
	}

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
