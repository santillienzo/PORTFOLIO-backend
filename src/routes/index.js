const {Router} = require('express');
const router = Router();
const nodemailer = require('nodemailer')

const sendMailFunction = async (req, res)=>{
    const {name, email, subject, message} = req.body;
    console.log(req.body)
    contentHTML = `
        <h1>Información de usuario</h1>
        <ul>
            <li>Nombre: ${name}</li>
            <li>Email: ${email}</li>
        </ul>
        <br />
        <br />
        <p>
        ${message}
        </p>
    `
    let transporter= nodemailer.createTransport({
        host: 'mail.enzosantilli.com.ar',
        port: 465,
        secure: true,
        auth: {
            user: 'enzosantilli@enzosantilli.com.ar',
            pass: `${process.env.PASSWORD}`
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: "'Enzo Santilli Server' <enzosantilli@enzosantilli.com.ar>",
        to: 'enzo.santilli16@gmail.com',
        subject: `${subject}`,
        html: contentHTML
    });
    transporter.sendMail(info, (error, data)=>{
        if (error){
            res.status(500).send(error.message)
        }else{
            console.log('Message sent', info.messageId);
            res.status(200).json(req.body)
        }
    });



}

router.post('/send-email', sendMailFunction)

module.exports = router;