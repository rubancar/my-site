import sendMail from '../../lib/mail'

export default (req, res) => {

    const from_url = req.headers.referer || ""
    const response_in_english = from_url.includes('en')
    const data = req.body
    console.log("req.params", data)
    sendMail(data)
    let response_message = 'Mensaje enviado exitosamente!'
    if(response_in_english) response_message = 'Message successfully sent!'
    res.status(200).send(response_message)
}

export const config = {
    api: {
        bodyParser: true,
    },
}

