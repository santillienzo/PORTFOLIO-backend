const {Router} = require('express');
const router = Router();
const nodemailer = require('nodemailer')

const sendMail = async (req, res)=>{
    console.log("Email Enviado")
    // const {name, email, subject, message} = req.body;
    // console.log(req.body)
    // contentHTML = `
    //     <h1>Información de usuario</h1>
    //     <ul>
    //         <li>Nombre: ${name}</li>
    //         <li>Email: ${email}</li>
    //     </ul>
    //     <br />
    //     <br />
    //     <p>
    //     ${message}
    //     </p>
    // `
    // let transporter= nodemailer.createTransport({
    //     host: 'mail.enzosantilli.com.ar',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: 'enzosantilli@enzosantilli.com.ar',
    //         pass: `${process.env.PASSWORD}`
    //     },
    //     tls: {
    //         rejectUnauthorized: false
    //     }
    // });

    // let info = await transporter.sendMail({
    //     from: "'Enzo Santilli Server' <enzosantilli@enzosantilli.com.ar>",
    //     to: 'enzo.santilli16@gmail.com',
    //     subject: `${subject}`,
    //     html: contentHTML
    // });

    // console.log('Message sent', info.messageId);
}

router.post('/send-email', sendMail)

module.exports = router;