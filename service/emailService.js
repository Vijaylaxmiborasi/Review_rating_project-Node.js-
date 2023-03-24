var nodemailer = require("nodemailer")
require('dotenv').config();

const sender = process.env.EMAIL;
const password = process.env.PASS;

const sendEmail = (email, token, userID) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: sender,
            pass: password

        }
    });
    //send out email through nodemailer
    var mailOptions = {
        from: sender,
        to: email,
        subject: "Password reset",

    }

    
    transporter.sendEmail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent successfully" + info.response);
        }
    })
}
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "borasivijaylaxmi2000@gmail.com",
        pass: "yaolwqfaoiggpsqx"
    }
});

//send out email through nodemiler
var mailOptions = {
    from: "borasivijaylaxmi2000@gmail.com",
    to: "vijaylaxmiborasi1526@gmail.com",
    subject: "Hye this is test mail",
    text: "hye this body part"
}

module.exports = {
    mailOptions,
    transporter,
    sendEmail

}
