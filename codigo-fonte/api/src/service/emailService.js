const nodemailer = require('nodemailer');
const fs = require('fs')
const path = require('path')

const { host, port, user, pass, from } = require('../config/mail.json');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
});

function renderTemplate(templateName, variables) {
    const templatePath = path.join(__dirname, '..', 'resources', 'emailTemplates', `${templateName}.html`);
    let content = fs.readFileSync(templatePath, 'utf8');

    // Substitui os {{chave}} pelos valores
    for (const key in variables) {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        content = content.replace(regex, variables[key]);
    }

    return content;
}


// Função genérica para envio
const sendEmail = ({ to, subject, html, attachments = [] }) => {
    transport.sendMail(
        {
            from,
            to,
            subject,
            html,
            attachments,
        },
        (error, info) => {
            if (error) console.error('Erro ao enviar e-mail:', error);
            else console.log('E-mail enviado:', info.response);
        }
    );
};

// E-mails específicos
const sendResetPasswordEmail = (token, nome, email) => {
    const html = renderTemplate('forgot_password', { nome, token });
    sendEmail({
        to: email,
        subject: 'Redefinição de Senha',
        html,
        attachments: [
            {
                filename: 'logo.png',
                path: path.join(__dirname, '..', 'resources', 'images', 'logo.png'),
                cid: 'logo',
                contentType: 'image/png'
            },
        ],
    });
};

const sendContatoEmail = (nome, email, telefone, mensagem) => {
    const html = renderTemplate('contato', { nome, email, telefone, mensagem });
    sendEmail({
        to: 'emmylimoraesfotografias@gmail.com',
        replyTo: email,
        subject: 'Contato pelo Site',
        html,
        attachments: [
            {
                filename: 'logo.png',
                path: path.join(__dirname, '..', 'resources', 'images', 'logo.png'),
                cid: 'logo',
                contentType: 'image/png'
            },
        ],
    });
};

module.exports = { sendResetPasswordEmail, sendContatoEmail };