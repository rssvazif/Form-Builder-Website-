const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const differentText = {
  wellcome: `<div style="background-color:#f3f3fe;padding:40px 0;text-align:center;font-family:sans-serif;">
  <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:10px;box-shadow:0 0 8px #ccc;">
    <tr>
      <td style="padding:20px;text-align:center;">
        <img src="https://ci3.googleusercontent.com/meips/ADKq_Na73cNY2jBXnodsMtaRlelhqZJKNc_PLtZYWg0LiDZ1Y1RhTiS7AYUFTc2-MtVP5hMMHa2I9MVZv43JsmTDbXk42fvPzp6e04YEK3G68Y3_I0hL=s0-d-e1-ft#https://emails.jotform.com/img/common/ui-kit/jotform-logo.png" height="34" alt="Jotform" border="0" style="height:34px;width:auto;background:none;font-size:15px;line-height:15px;color:#0a1551;display:block" class="m_-959173140856612684center CToWUd" data-bit="iit">
      </td>
    </tr>
    <tr>
      <td style="padding:30px;text-align:right;direction:rtl;">
        <h3 style="margin:0 0 10px 0;">سلام دوست عزیز 👋</h3>
        <p style="margin:0 0 15px 0;line-height:1.6;">
          خیلی ممنونم که به گروه <b>جات فرم</b> پیوستی 🌸  
          امیدواریم لحظات خوشی رو در کنار هم داشته باشیم.
        </p>
        <small style="display:block;margin-bottom:10px;">با تشکر</small>
        <hr style="border:none;border-top:1px solid #ddd;">
        <b>تیم پشتیبانی جات فرم</b>
      </td>
    </tr>
  </table>
</div>
`,
};

class Gmail {
  async sendResetPasswordGmail(targetGmail, token) {
    try {
      await transporter.sendMail({
        from: `"جات فرم"<${process.env.GMAIL_USER}>`,
        to: targetGmail,
        subject: "سایت فرم ساز ایرانی جات فرم",
        html: `<div
  style="
    background-color: #f3f3fe;
    padding: 40px 0;
    text-align: center;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  "
>
  <table
    align="center"
    width="600"
    cellpadding="0"
    cellspacing="0"
    style="
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 8px #ccc;
    "
  >
    <tr>
      <td style="padding: 20px; text-align: center;">
        <img src="https://ci3.googleusercontent.com/meips/ADKq_Na73cNY2jBXnodsMtaRlelhqZJKNc_PLtZYWg0LiDZ1Y1RhTiS7AYUFTc2-MtVP5hMMHa2I9MVZv43JsmTDbXk42fvPzp6e04YEK3G68Y3_I0hL=s0-d-e1-ft#https://emails.jotform.com/img/common/ui-kit/jotform-logo.png" height="34" alt="Jotform" border="0" style="height:34px;width:auto;background:none;font-size:15px;line-height:15px;color:#0a1551;display:block" class="m_-959173140856612684center CToWUd" data-bit="iit">
      </td>
    </tr>
    <tr>
      <td style="padding: 30px; text-align: right; direction: rtl;">
        <h3 style="margin: 0 0 10px 0;">سلام دوست عزیز 👋</h3>
        <p style="margin: 0 0 20px 0; line-height: 1.6;">
          برای بازیابی رمز عبور حساب خود، لطفاً روی دکمه زیر کلیک کن تا به صفحه‌ی
          تغییر رمز منتقل شوی.
        </p>

        <div style="text-align: center; margin: 25px 0;">
          <a
            href="http://localhost:5173/password?token=${token}"
            style="
              background-color: #ff6100;
              color: #fff;
              text-decoration: none;
              padding: 12px 28px;
              border-radius: 6px;
              font-size: 16px;
              font-weight: bold;
              display: inline-block;
            "
          >
            بازیابی رمز عبور
          </a>
        </div>

        <p style="font-size: 14px; color: #555; line-height: 1.5;">
          اگر این درخواست از طرف شما نبوده، این ایمیل را نادیده بگیرید. لینک بالا
          پس از مدت کوتاهی منقضی می‌شود.
        </p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 25px 0;" />

        <b style="display: block; text-align: right;">تیم پشتیبانی جات فرم</b>
      </td>
    </tr>
  </table>
</div>
`,
      });
    } catch (err) {
      console.log("error in sendResetPasswordGmail service");
      throw new Error("error: in send reset password gmail");
    }
  }
}

module.exports = new Gmail();
