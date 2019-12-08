import nodemailer from "nodemailer";

const createTransporter = async () => {
  // return nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT,
  //   secure: process.env.EMAIL_PORT === 465,
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS
  //   }
  // });
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });
};

export const getTransporter = createTransporter();

export const sendMail = async (option) => {
  const transporter = await getTransporter;
  const mailParam = {
    from: '"The Hypertube Company 🎥 <noreply@hypertube.horse>', // sender address
    ...option
  };

  const info = await transporter.sendMail(mailParam);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return info;
};

export default nodemailer;
