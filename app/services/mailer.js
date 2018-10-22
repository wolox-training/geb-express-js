// Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer'),
  nodeoutlook = require('nodejs-nodemailer-outlook'),
  settings = require('./mailerconfig').account,
  logger = require('../logger');

exports.send = message => {
  const transporter = nodemailer.createTransport({
    service: settings.service,
    auth: {
      user: settings.user,
      pass: settings.pwd
    }
  });

  return transporter.sendMail(message, (err, info) => {
    if (err) logger.info(err)
    else logger.info(`Sending email to: ${info}`);
  });
};
