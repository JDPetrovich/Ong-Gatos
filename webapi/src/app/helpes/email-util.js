import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "e9048125699755",
        pass: "cf33ccf7aa64b2"
    }
});

/**
 * Envia um e-mail
 * @param {string} para - E-mail do destinatário
 * @param {string} assunto - Assunto do e-mail
 * @param {string} texto - Corpo do e-mail (texto simples)
 */
export async function enviarEmail(para, assunto, texto) {
    await transport.sendMail({
        from: '"Equipe Gatos" <no-reply@gatos.com>',
        to: para,
        subject: assunto,
        text: texto
    });
}