import nodemailer from 'nodemailer'

const nodemailerMailgun = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // use TLS
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
},
tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
}
})

const parseData = data => {
    if(typeof data === "object")  {
        const result = Object.entries(data).map(([key, value]) => `<p><strong>${key}:</strong>${value}</p>`).join("")
        return `<div>${result}</div>`
    } else {
        console.log('data', data)
        return `<p>Nothing to show!!</p>`
    }
}

export default function(data) {
    const html = parseData(data)
    console.log('html', html)
    nodemailerMailgun.sendMail({
        from: 'My Webpage <me@rubencarvajal.com>',
        to: 'rubenandres92@gmail.com',
        subject: 'Hey you, someone is trying to reach you!',
        html: html,
    }, (err, info) => {
        if (err) {
            console.log('Error sending email', err)
        }
        else {
            console.log('Response from mailgun', info)
        }
    })
}
