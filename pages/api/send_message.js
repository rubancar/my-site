import sendMail from '../../lib/mail'

export default (req, res) => {

    const data = req.body
    console.log("req.params", data)
    sendMail(data)
    res.status(200).send('Message successfully sent!')
}

export const config = {
    api: {
        bodyParser: true,
    },
}

