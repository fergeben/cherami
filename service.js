const nodemailer = require("nodemailer");
const config = require("./config");

const transport = nodemailer.createTransport(config.transport);

function _send(from, to, subject, text, html, cb) {
    const mailOptions = {
        from,
        to,
        subject,
        text,
        html,
    };

    transport.sendMail(mailOptions, function (error, info) {
        cb(error, info);
    });
}

function send(from, to, subject, text, html) {
    return new Promise((resolve, reject) => {
        _send(from, to, subject, text, html, (err, info) => {
            if (err)
                reject(err);
            resolve(info);
        })
    });
}

exports.send = send;