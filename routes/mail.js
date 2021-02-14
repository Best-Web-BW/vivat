const cors = require("cors");
const router = require("express").Router();
const nodemailer = require("nodemailer");
const { address, password } = require("./secure").emailData;
const ksk = "КСК «Виват, Россия!»";
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
    register: (email, password) => ({
        from: `Успешная регистрация на сайте ${ksk} <${address}>`,
        to: email,
        subject: `Успешная регистрация на сайте`,
        html: `
            <div>
                <h2> Вы успешно зарегистрировались на сайте <a href="https://kskvivat.com">${ksk}</a> </h2>
                <p>
                    Указанный email: ${email}<br />
                    Сгенерированный пароль: ${password}
                </p>
                <p>Пожалуйста, запишите этот пароль. Он сгенерирован автоматически и предотвратит несанкционированный доступ к Вашему аккаунту</p>
                <br />
                <p>Это сообщение сгенерировано сервером. Пожалуйста, не отвечайте на него</p>
            </div>
        `
    }),
    forgotPassword: ({ email, name, link }) => ({
        from: `BLANK FIELD <${address}>`,
        to: email,
        subject: `Смена пароля на ${ksk}`,
        html: `
            <div>
                <h2>Здравствуйте, ${name}!</h2>
                <p>Мы получили запрос изменения пароля на сайте <a href="kskvivat.com">${ksk}</a>.</p>
                <br />
                <p>Если это были Вы, пожалуйста, перейдите по ссылке ниже для изменения пароля.</p>
                <a href="${link}">${link}</a>
                <br />
                <p>Если это были не Вы, мы советуем сменить пароль вашего профиля.</p>
                <br />
                <br />
                <p>С уважением, <br /> команда ${ksk}</p>
            </div>
        `
    }),
    changePassword: ({ email, name }) => ({
        from: `BLANK FIELD <${address}>`,
        to: email,
        subject: `Смена пароля на ${ksk}`,
        html: `
            <div>
                <h2>Здравствуйте, ${name}!</h2>
                <br />
                <p>Ваш пароль на сайте <a href=”kskvivat.com”>${ksk}</a> был успешно изменен.</p>
                <br />
                <p>Если это были Вы, ничего делать не нужно.</p>
                <p>Если это были не Вы, срочно воспользуйтесь функцией восстановления пароля через форму «забыли пароль»! </p>
                <br />
                <br />
                <p>С уважением, <br /> команда ${ksk}</p>
            </div>
        `
    }),
    feedback: (name, email, phone, question) => ({
        from: `Обратная связь на сайте ${ksk} <${address}>`,
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
    rent: (email, phone, service, time, date) => ({
        from: `${ksk} <${address}>`,
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
const SUCCESS = result => ({ status: "success", result });
const ERROR = error => ({ status: "error", error });

router.get("/", cors(), (_, res) => {
	res.end("Please help me they force me to send email to users i am not a robot");
});

router.post("/feedback", async (req, res) => {
    const { name, email, phone, question } = req.body;
    try {
        const result = await mailer.transporter.sendMail(mailer.feedback(name, email, phone, question));
        res.json({ status: "success", result });
    } catch(e) { console.log(e); res.json({ status: "error", error: e }); }
});

router.post("/rent", async (req, res) => {
    const { email, phone, service, time, date } = req.body;
    try {
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

const emailPassword = async (type, data) => {
    try { return SUCCESS(await mailer.transporter.sendMail(mailer[type](data))); }
    catch(e) { console.error(type, e); return ERROR(e); }
}

module.exports.sendForgotPasswordEmail = async data => await emailPassword("forgotPassword", data);
module.exports.sendChangePasswordEmail = async data => await emailPassword("changePassword", data);
