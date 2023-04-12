const nodemailer = require('nodemailer')
// const {google}  = require('googleapis')
// const oAuth2Client = new google.auth.OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     process.env.redirect_uris)
// oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})

module.exports.sendMailWithMy = async (receiver, subject, message) => {

    //     const accessToken = await oAuth2Client.getAccessToken()

    let transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });


    /*     let transport = nodemailer.createTransport({
            service:"gmail",
            auth:{
                type:"OAuth2",
                user:process.env.SENDER_MAIL,
                clientId:process.env.CLIENT_ID,
                clientSecret:process.env.CLIENT_SECRET,
                refreshToken:process.env.REFRESH_TOKEN,
                accessToken:accessToken
            }
        }) */
    const mailData = {
        from: process.env.MAIL_FROM,
        to: ['abduljabber1532002@gmail.com', 'admin@abduljabbar.xyz'],
        subject: subject,
        text: message
        // html:"data.html"
    }

    let info = await transport.sendMail(mailData)
    return info

}