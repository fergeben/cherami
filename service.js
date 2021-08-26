const nodemailer = require("nodemailer");
const config = require("./config");
const merge = require("lodash.merge");

function _send(from, to, subject, text, html, transportOptions, cb) {
    const mergedConfig = merge(config.transport, transportOptions);
    const transport = nodemailer.createTransport(mergedConfig);
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

function send(from, to, subject, text, html, transportOptions) {
    return new Promise((resolve, reject) => {
        _send(from, to, subject, text, html, transportOptions, (err, info) => {
            if (err)
                reject(err);
            resolve(info);
        })
    });
}

exports.send = send;