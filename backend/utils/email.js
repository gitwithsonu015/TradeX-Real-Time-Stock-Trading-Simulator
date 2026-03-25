const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Gmail transporter (use app password)
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // Gmail App Password
    }
  });

  const message = {
    from: `"TradeX" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('✅ Email sent:', info.messageId);
  } catch (error) {
    console.error('❌ Email error:', error);
    throw error;
  }
};

module.exports = sendEmail;
