const nodemailer = require('nodemailer');

const { host, port, user, pass, from } = require('../config/mail.json');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
});

const sendResetPasswordEmail = (token, nome, email) => {

    transport.sendMail({
        to: email,
        from,
        html: `<p>Ola, ${nome}. Você esqueceu sua senha? Não tem problema, utilize esse token: <a href="http://localhost:5173/AcessandoEmail/${token}">clique aqui para acessar o sistema</a> </p>`,
    }, (error) => {
        if (error)
            console.log(error)
    })

}

module.exports = { sendResetPasswordEmail };