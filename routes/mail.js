const cors = require("cors");
const router = require("express").Router();
const nodemailer = require("nodemailer");
const { address, password } = require("./secure").emailData;
const mailer = {
    transporter: nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: address,
            pass: password
        },
    }),
    feedback: (name, email, phone, question) => ({
        from: `Обратная связь на сайте КСК "Виват, Россия!" <${address}>`,
        to: address,
        subject: `${name}, ${email}, ${phone}`,
        html: `
            <div>
                <h2 style:"text-align: center;">Контактная информация</h2>
                <p style:"font-weight: bold;">Имя:</p> <b>${name}</b><br />
                <p style:"font-weight: bold;>Email:</p> <b>${email}</b><br />
                <p style:"font-weight: bold;>Номер телефона:</p> <b>${phone}</b><br />
                <p style:"font-weight: bold;>Вопрос:</p> <p>${question}</p>
            </div>
        `
    }),
    register: (email, password) => ({
        from: `КСК "Виват, Россия!" <${address}>`,
        to: email,
        subject: `Успешная регистрация на сайте`,
        html: `
            <div>
                <h2> Вы успешно зарегистрировались на сайте <a href="https://kskvivat.com>"КСК "Виват, Россия!"</a> </h2>
                <p>
                    Указанный email: ${email}<br />
                    Сгенерированный пароль: ${password}
                </p>
                <p>Пожалуйста, запишите этот пароль. Он сгенерирован автоматически и предотвратит несанкционированный доступ к Вашему аккаунту</p>
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