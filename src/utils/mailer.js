import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST,
  port: process.env.EMAIL_SMTP_PORT,
  auth: {
    user: process.env.EMAIL_SMTP_USERNAME,
    pass: process.env.EMAIL_SMTP_PASSWORD,
  },
})

export const send = (from, to, subject, html) => {
  transporter.sendMail({
    from: 'no-reply@xyz.com',
    to: 'baz@example.com',
    subject: "'Hello ✔'",
    text: 'Hello world?',
    html: '<b>Hello world?</b>',
  })
}
