const {Router} = require('express');
const router = Router();
const nodemailer = require('nodemailer')



const sendEmailUser = async (req, res)=>{
    console.log(req.body)
    const {name, email, subject, message} = req.body;
    try {
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
                pass: '*z*9[{c#yns)'
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
        
        console.log('Message sent', info.messageId);
        console.log("Se envió la solicitud")
        
    } catch (error) {
        console.log("Aquí hay un error")
        console.log(error)
    }
    
}



router.post('/send-email', sendEmailUser)

module.exports = router;