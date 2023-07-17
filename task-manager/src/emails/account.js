const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomEmail = (email, name) => {
    sgMail
        .send({
            to: email, // Change to your recipient
            from: 'easypinex@gmail.com', // Change to your verified sender
            subject: 'Thanks for joining in!',
            text: `Welcome to the app, ${name}, Let me know how you get along with the app`,
        })
}

module.exports = {
    sendWelcomEmail
}