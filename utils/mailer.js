// require our mailgun dependencies
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

// Setup mailgun
const auth = {
	auth: {
		api_key: process.env.MAILGUN_API_KEY,
		domain: process.env.EMAIL_DOMAIN,
	},
};

// create a mailer
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

// export our send mail function
module.exports.sendMail = (user, req, res) => {
	// send an email to the user's email with a provided template
	nodemailerMailgun
		.sendMail({
			from: "no-reply@example.com",
			to: user.email, // An array if you have multiple recipients.
			subject: "Pet Purchased!",
			template: {
				name: "email.handlebars",
				engine: "handlebars",
				context: user,
			},
			// Once mail is sent, redirect to the purchased pet's page
		})
		.then((info) => {
			console.log("Response: " + info);
			res.redirect(`/pets/${req.params.id}`);
			// Catch error and redirect to the purchased pet's page
		})
		.catch((err) => {
			console.log("Error: " + err);
			res.redirect(`/pets/${req.params.id}`);
		});
};