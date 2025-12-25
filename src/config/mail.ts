import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.ethereal.email",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.SMTP_USER || "maddison53@ethereal.email",
    pass: process.env.SMTP_PASSWORD || "jn7jnAPss4f63QBp6D",
  },
});

export const sendMail = async (to: string, subject: string, body: string) => {
    let data =  await transporter.sendMail({
    from: process.env.FROM_EMAIL || "no-reply@gmail.com",
    to: to,
    subject: subject,
    html: body, // HTML version of the message
  });
 console.log({data})
}

