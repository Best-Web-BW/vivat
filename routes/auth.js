const router = require("express").Router();
const ObjectID = require("mongodb").ObjectID;
const SHA1 = require("crypto-js/sha1");
const hmacSHA512 = require("crypto-js/hmac-sha512");
const { v4: UUID } = require("uuid");

const PRIVATE_KEY = "saifjaw3p c5hga2j89~`dj.PR;OTH"; // Kicked my head with keyboard for this, it hurts
const MAX_SESSIONS = 5;
const ACCESS_KEY_MAX_AGE = 1000 * 60 * 15; // 15 minutes in ms
const REFRESH_KEY_MAX_AGE = 1000 * 60 * 60 * 24 * 30; // 30 days in ms
const COOKIE_CONFIG = { path: "/api/auth", secure: true, httpOnly: true, sameSite: "Strict" };

let users/*, events*/;
new require("mongodb").MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true, useNewUrlParser: true }).connect((err, client) => {
    if(err) return console.error(err);

    const db = client.db("vivat");
    users = db.collection("users");
    // events = db.collection("events");
});

router.get("/", (_, res) => {
    res.end("This is not an auth API. :(");
});

router.post("/register", async (req, res) => {
    const { email, name: { first, second, middle }, birthdate } = req.body;
    console.log("Register", { email, name: { first, second, middle }, birthdate });
    
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
    
    const password = SHA1(`${email}${Math.random()}${birthdate}`).toString().slice(-16);
    const passwordHash = hmacSHA512(password, PRIVATE_KEY).toString();
    
    const session = { access_key: UUID(), refresh_key: UUID() };
    const user = { email, name: { first, second, middle }, birthdate, password, password_hash: passwordHash, sessions: [session] };

    await users.insertOne(user);

    res.cookie("user_id", user._id.toString(), { maxAge: REFRESH_KEY_MAX_AGE, ...COOKIE_CONFIG });
    res.cookie("access_key", session.access_key, { maxAge: ACCESS_KEY_MAX_AGE, ...COOKIE_CONFIG });
    res.cookie("refresh_key", session.refresh_key, { maxAge: REFRESH_KEY_MAX_AGE, ...COOKIE_CONFIG });
    const _user = { ...user, sessions: undefined, password_hash: undefined };
    res.json({ status: "success", accessKeyLifetime: ACCESS_KEY_MAX_AGE, user: _user });
    console.log(" - Password", password);
});

router.post("/authenticate", async (req, res) => {
    const { email, password } = req.body;
    const user = await users.findOne({ email });

    console.log("Authenticate", { email, password });
    
    if(!user) return res.json({ status: "error", reason: "invalid_email" });

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

    const { name: { first, second, middle }, birthdate, email, phone, address, sex } = req.body;
    const updater = { name: { first, second, middle }, birthdate, email, phone, address, sex };

    console.log(" - Modified", { ...updater });

    try {
        const user = await users.findOne({ _id: new ObjectID(userID) });

        await users.updateOne({ _id: user._id }, { $set: updater });

        const _user = { ...user, ...updater, sessions: undefined, password_hash: undefined };

        res.json({ status: "success", user: _user });
    } catch(e) { res.json({ status: "error", reason: "unknown_error" }); }
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

module.exports = router;