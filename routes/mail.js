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
                <h2>Контактная информация</h2>
                <p>Имя: <b>${name}</b><br /></p>
                <p>Email: <b>${email}</b><br /></p>
                <p>Номер телефона:<b>${phone}</b><br /></p>
                <p>Вопрос:</p> <p>${question}</p>
            </div>
        `
    }),
    register: (email, password) => ({
        from: `Аренда времени <${address}>`,
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
    }),
    rent: (email, phone, service, time, date) => ({
        from: `КСК "Виват, Россия!" <${address}>`,
        to: address,
        subject: `Заказ услуги ${time}`,
        html: `
            <div>
                <h2>Заказана услуга</h2>
                <p>
                    Email пользователя: ${email}<br />
                    Телефон пользователя: ${phone}<br />
                    Услуга: "${service}"<br />
                    Выбранное время: ${time} ${date}
                </p>
            </div>
        `
    })
};

router.get("/", cors(), (_, res) => {
	res.end("Please help me they force me to send email to users i am not a robot");
});

router.post("/feedback", async (req, res) => {
    const { name, email, phone, question } = req.body;
    try{
        const result = await mailer.transporter.sendMail(mailer.feedback(name, email, phone, question));
        res.json({ status: "success", result });
    } catch(e) { console.log(e); res.json({ status: "error", error: e }); }
    
});

router.post("/rent", async (req, res) => {
    const { email, phone, service, time, date } = req.body;
    try{
        const result = await mailer.transporter.sendMail(mailer.rent(email, phone, service, time, date));
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