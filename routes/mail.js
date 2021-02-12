const cors = require("cors");
const router = require("express").Router();
const nodemailer = require("nodemailer");
const emailData = require("./secure").emailData;
const address = emailData.address;
const mailer = {
    transporter: nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: emailData.address,
            pass: emailData.password
        },
    }),
    feedback: (name, email, phone, question) => ({
        from: `Обратная связь <${emailData.address}>`,
        to: emailData.address,
        subject: `${name}, ${email}, ${phone}`,
        html: `
            <div>
                Имя: <b>${name}</b><br />
                Email: <b>${email}</b><br />
                Номер телефона: <b>${phone}</b><br />
                Вопрос: <p>${question}</p>
            </div>
        `
    }),
    register: (email, password) => ({
        from: `КСК "Виват, Россия!" <${emailData.address}>`,
        to: email,
        subject: `Успешная регистрация на сайте`,
        html: `
            <div>
                <p>
                    Вы успешно зарегистрировались на сайте конно-спортивного комплекса "Виват, Россия!".<br /><br />
                    Указанный email: ${email}<br />
                    Сгенерированный пароль: ${password}
                </p>
            </div>
        `
    }) 
};

router.get("/", cors(), (_, res) => {
	res.end("Please help me they force me to send email to users i am not a robot");
});

router.get("/feedback", async (req, res) => {
    const { name, email, phone, question } = req.query;
    // const { name, email, phone, question } = req.body;
    try{
        const result = await mailer.transporter.sendMail(mailer.feedback(name, email, phone, question));
        res.json({ status: "success", result });
    } catch(e) { console.log(e); res.json({ status: "error", error: e }); }
    
});

module.exports = router;
module.exports.sendRegisterEmail = async (email, password) => {
    try {
        const result = await mailer.transporter.sendMail(mailer.register(email, password));
        return { status: "success", result };
    } catch(e) { console.log(e); return { status: "error", error: e }; }
};