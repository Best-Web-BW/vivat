const router = require("express").Router();
const ObjectID = require("mongodb").ObjectID;
const hmacSHA512 = require("crypto-js/hmac-sha512");
const { v4: UUID } = require("uuid");
const { sendRegisterEmail, sendForgotPasswordEmail, sendChangePasswordEmail } = require("./mail");
const moment = require("moment");

const isDev = process.env.NODE_ENV !== "production";

// I hit my head on the keyboard for that. It hurts.
// Why is there no another way to create a random string?
const PRIVATE_KEY = "saifjaw3p c5hga2j89~`dj.PR;OTH";
const MAX_SESSIONS = 5;
const ACCESS_KEY_MAX_AGE = 1000 * 60 * 15; // 15 minutes in ms
const REFRESH_KEY_MAX_AGE = 1000 * 60 * 60 * 24 * 30; // 30 days in ms
const COOKIE_CONFIG = { path: "/api/auth", secure: !isDev, httpOnly: true, sameSite: "Strict" };

let users;
new require("mongodb").MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true, useNewUrlParser: true }).connect((err, client) => {
    if(err) return console.error(err);

    const db = client.db("vivat");
    users = db.collection("users");
});

router.get("/", (_, res) => {
    res.end("This is not an auth API. :(");
});

// router.get("/reg_email", async (req, res) => {
//     const { email, password } = req.query;
//     const result = await sendRegisterEmail(email, password);
//     res.json(result);
// });

router.post("/register", async (req, res) => {
    const { email, name: { first, second, middle }, birthdate, password } = req.body;
    console.log("Register", { email, name: { first, second, middle }, birthdate, password });
    
    const emailRegex = /@/;
    const nameRegex = /^[a-zа-яё]{2,}$/gi;
    const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    const errors = [];
    if(!emailRegex.test(email)) errors.push("invalid_email");
    if(!new RegExp(nameRegex).test(first)) errors.push("invalid_first_name");
    if(!new RegExp(nameRegex).test(second)) errors.push("invalid_second_name");
    if(!new RegExp(nameRegex).test(middle)) errors.push("invalid_middle_name");
    if(!birthdateRegex.test(birthdate)) errors.push("invalid_birthdate");
    
    if(errors.length) return res.json({ status: "error_regex", errors });
    
    // const password = SHA1(`${email}${Math.random()}${birthdate}`).toString().slice(-16);
    const passwordHash = hmacSHA512(password, PRIVATE_KEY).toString();
    
    const email_verify_uuid = UUID();
    // const session = { access_key: UUID(), refresh_key: UUID() };
    const user = {
        email_verified: false, email_verify_uuid,
        email, name: { first, second, middle },
        birthdate, password, password_hash: passwordHash//, sessions: [session]
    };
    
    await users.insertOne(user);
    
    const emailVerifyLink = (isDev ? "http://localhost" : "https://kskvivat.com") + `/account/profile?verify_email=1&email=${email}&uuid=${email_verify_uuid}`;
    const sendEmailResult = await sendRegisterEmail(email, emailVerifyLink);
    if(sendEmailResult.status === "success") {
        // res.cookie("user_id", user._id.toString(), { maxAge: REFRESH_KEY_MAX_AGE, ...COOKIE_CONFIG });
        // res.cookie("access_key", session.access_key, { maxAge: ACCESS_KEY_MAX_AGE, ...COOKIE_CONFIG });
        // res.cookie("refresh_key", session.refresh_key, { maxAge: REFRESH_KEY_MAX_AGE, ...COOKIE_CONFIG });
        // const _user = { ...user, sessions: undefined, password_hash: undefined };
        res.json({ status: "success"/*, accessKeyLifetime: ACCESS_KEY_MAX_AGE, user: _user*/ });
        console.log(" - Password", password);
    } else {
        res.json(sendEmailResult);
        console.log("Wtf?", { sendEmailResult });
    }
});

router.post("/verify_email", async (req, res) => {
    const { email, uuid } = req.body;
    console.log("Verify email", { email, uuid });

    let user;
    try { user = await users.findOne({ email }) }
    catch(e) { console.error(e); return res.json({ status: "error", error: "db_error" }) }

    if(!user) return res.json({ status: "error", error: "no_user" });
    if(user.email_verify_uuid !== uuid) return res.json({ status: "error", error: "invalid_uuid" });

    const session = { access_key: UUID(), refresh_key: UUID() };
    try { await users.updateOne({ _id: user._id }, {
        $set: { email_verified: true, sessions: [session] },
        $unset: { email_verify_uuid: "" } 
    })} catch(e) { console.error(e); return res.json({ status: "error", error: "db_error" }) }

    res.cookie("user_id", user._id.toString(), { maxAge: REFRESH_KEY_MAX_AGE, ...COOKIE_CONFIG });
    res.cookie("access_key", session.access_key, { maxAge: ACCESS_KEY_MAX_AGE, ...COOKIE_CONFIG });
    res.cookie("refresh_key", session.refresh_key, { maxAge: REFRESH_KEY_MAX_AGE, ...COOKIE_CONFIG });

    const _user = { ...user, sessions: undefined, password_hash: undefined, email_verified: undefined, email_verify_uuid: undefined };
    res.json({ status: "success", accessKeyLifetime: ACCESS_KEY_MAX_AGE, user: _user });
});

router.post("/authenticate", async (req, res) => {
    const { email, password } = req.body;
    const user = await users.findOne({ email });

    console.log("Authenticate", { email, password });
    
    if(!user) return res.json({ status: "error", reason: "invalid_email" });
    if(!user.email_verified) return res.json({ status: "error", reason: "not_verified" });

    const requestSHA = hmacSHA512(password, PRIVATE_KEY).toString();
    const currentSHA = user.password_hash;
    // console.log(`Requested with email ${email} and password ${password}`);
    // console.log(`Are they equal: ${requestSHA === currentSHA}`);

    if(requestSHA !== currentSHA) return res.json({ status: "error", reason: "invalid_password" });
    
    const accessKey = UUID();
    const refreshKey = UUID();
    const session = { access_key: accessKey, refresh_key: refreshKey };
    
    res.cookie("user_id", user._id.toHexString(), { maxAge: REFRESH_KEY_MAX_AGE, ...COOKIE_CONFIG });
    res.cookie("access_key", accessKey, { maxAge: ACCESS_KEY_MAX_AGE, ...COOKIE_CONFIG });
    res.cookie("refresh_key", refreshKey, { maxAge: REFRESH_KEY_MAX_AGE, ...COOKIE_CONFIG });
    const _user = { ...user, sessions: undefined, password_hash: undefined };
    res.json({ status: "success", accessKeyLifetime: ACCESS_KEY_MAX_AGE, user: _user });

    users.updateOne({ _id: user._id }, { $set: { sessions: [...user.sessions, session].slice(-MAX_SESSIONS) } });
});

router.post("/authorize", async (req, res) => {
    const { user_id: userID, access_key: accessKey } = req.cookies;
    console.log("Authorize", { userID, accessKey });

    const user = await users.findOne({ _id: new ObjectID(userID) }, { projection: { sessions: 1 } });

    if(!user) return res.json({ status: "error", reason: "invalid_access_key" });

    for(let session of user.sessions) if(session.access_key === accessKey) return res.json({ status: "success" });

    res.json({ status: "error", reason: "invalid_access_key" });
});

router.post("/refresh_tokens", async (req, res) => {
    const { user_id: userID, refresh_key: refreshKey } = req.cookies;
    console.log("Refresh tokens", { userID, refreshKey });

    const user = await users.findOne({ _id: new ObjectID(userID) });

    if(!user) return res.json({ status: "error", reason: "invalid_refresh_key" });

    for(let i = 0; i < user.sessions.length; i++) {
        if(user.sessions[i].refresh_key !== refreshKey) continue;

        user.sessions[i] = { ...user.sessions[i], access_key: UUID() };
        res.cookie("access_key", user.sessions[i].access_key, { maxAge: ACCESS_KEY_MAX_AGE, ...COOKIE_CONFIG });
        const _user = { ...user, sessions: undefined, password_hash: undefined };
        res.json({ status: "success", accessKeyLifetime: ACCESS_KEY_MAX_AGE, user: _user });

        return users.updateOne({ _id: user._id }, { $set: { sessions: user.sessions } });
    }

    res.json({ status: "error", reason: "invalid_refresh_key" });
});

router.post("/deauthenticate", async (req, res) => {
    const { user_id: userID, refresh_key: refreshKey } = req.cookies;
    console.log("Deauthenticate", { userID, refreshKey });

    const user = await users.findOne({ _id: new ObjectID(userID) }, { rejection: { sessions: 1 } });
    const sessions = user.sessions.filter(session => session.refresh_key !== refreshKey);

    const config = { maxAge: -1, ...COOKIE_CONFIG };
    res.cookie("user_id", "", config);
    res.cookie("access_key", "", config);
    res.cookie("refresh_key", "", config);
    res.send({ status: "success" });

    users.updateOne({ _id: user._id }, { $set: { sessions } });
});

router.post("/change", async (req, res) => {
    const { user_id: userID } = req.cookies;
    console.log("Change user settings", { userID });

    const { name: { first, second, middle }, birthdate, email, phone, address, sex, password } = req.body;
    const updater = { name: { first, second, middle }, birthdate, email, phone, address, sex };

    console.log(" - Modified", { ...req.body });

    try {
        const user = await users.findOne({ _id: new ObjectID(userID) });

        let isPasswordChanged = false;
        if(password.current.length && password.new1.length) {
            const currentPasswordHash = hmacSHA512(password.current, PRIVATE_KEY).toString();
            const newPasswordHash = hmacSHA512(password.new1, PRIVATE_KEY).toString();

            if(user.password_hash === currentPasswordHash) {
                updater.password_hash = newPasswordHash;
                isPasswordChanged = true;
            } else return res.json({ status: "error", error: "invalid_current_password" });
        }

        console.log("Pass change updater", { updater });

        await users.updateOne({ _id: user._id }, { $set: updater });

        const _user = { ...user, ...updater, sessions: undefined, password_hash: undefined };
        if(isPasswordChanged) await sendChangePasswordEmail({ email: _user.email, name: _user.name.first });
        res.json({ status: "success", user: _user });
    } catch(e) { console.error(e); res.json({ status: "error", reason: "unknown_error" }); }
});

router.post("/register_to_event", async (req, res) => {
    const { user_id: userID } = req.cookies;
    console.log("Register to event", { userID });

    const { event_id, rider: { name, birthdate }, region, trainer_name, delegate_phone, horse: { nickname, birthyear, sex }, fskr: { passport, number }, wait_needed } = req.body;
    const participant = { event_id, rider: { name, birthdate }, region, trainer_name, delegate_phone, horse: { nickname, birthyear, sex }, fskr: { passport, number }, wait_needed };

    try {
        const user = await users.findOne({ _id: new ObjectID(userID) });
        user.events.push({ event_id, participant });

        await users.updateOne({ _id: user._id }, { $set: { events: user.events } });

        res.json({ status: "success", events: user.events });
    } catch(e) { console.log(e); res.json({ status: "error", reason: "unknown_error" }); }
});

router.post("/forgot_password/mail", async (req, res) => {
    const { email } = req.body;
    console.log("Forgot password", { email });

    const uuid = UUID();
    try {
        const user = await users.findOne({ email });
        if(!user) return res.json({ status: "success" });

        const forgot_password = { uuid, expires: moment().add(1, "minutes").toISOString() };
        await users.updateOne({ _id: user._id }, { $set: { forgot_password } });

        const link = (isDev ? "http://localhost" : "https://kskvivat.com") + `/forgot-password?email=${email}&uuid=${uuid}`;
        await sendForgotPasswordEmail({ email, name: user.name.first, link });
        res.json({ status: "success" });
    } catch(e) { res.json({ status: "error", error: "db_error" }) }
});

router.post("/forgot_password/check", async (req, res) => {
    const { email, uuid } = req.body;
    console.log("Check forgot password", { email, uuid });

    let user;
    try { user = await users.findOne({ email }) }
    catch(e) { console.error(e); return res.json({ status: "error", error: "db_error" }) }
    if(!user) return res.json({ status: "error", error: "no_user_found" });

    const record = user.forgot_password;
    if(!record) return res.json({ status: "error", error: "user_not_forgot" });
    if(record.uuid !== uuid) return res.json({ status: "error", error: "invalid_uuid" });
    if(record.expires <= moment().toISOString()) return res.json({ status: "error", error: "uuid_expired" });

    return res.json({ status: "success" });
});

router.post("/forgot_password/reset", async (req, res) => {
    const { email, uuid, password } = req.body;
    console.log("Reset password", { email, uuid, password });

    let user;
    try { user = await users.findOne({ email }) }
    catch(e) { console.error(e); return res.json({ status: "error", error: "db_error" }) }
    if(!user) return res.json({ status: "error", error: "no_user_found" });

    const record = user.forgot_password;
    if(!record) return res.json({ status: "error", error: "user_not_forgot" });
    if(record.uuid !== uuid) return res.json({ status: "error", error: "invalid_uuid" });
    if(record.expires <= moment().toISOString()) return res.json({ status: "error", error: "uuid_expired" });

    const password_hash = hmacSHA512(password, PRIVATE_KEY).toString();

    try { await users.updateOne({ _id: user._id }, { $set: { password_hash, sessions: [] }, $unset: { forgot_password: "" } }) }
    catch(e) { console.error(e); return res.json({ status: "error", error: "db_error" }) }

    await sendChangePasswordEmail({ email, name: user.name.first });

    return res.json({ status: "success" });
});

module.exports = router;