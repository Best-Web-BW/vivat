const router = require("express").Router();
const cwebp = require("webp-converter").cwebp;
const path = require("path");
const { v4: UUID } = require("uuid");
const fs = require("fs");

let events, albums, posts, users;
new require("mongodb").MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true, useNewUrlParser: true }).connect((err, client) => {
    if(err) return console.error(err);

    const db = client.db("vivat");
    events = db.collection("events");
    albums = db.collection("albums");
    posts = db.collection("posts");
    users = db.collection("users");
});

async function getMaxID(collection) {
    const max = await collection.find().sort({ id: -1 }).limit(1);
    return max;
}

router.get("/", (_, res) => res.end("Are you my adminny?"));

const getRawImagePath = (type, fullName) => path.join("public", "images", type, "tmp", fullName);
const getWebpImagePath = (type, name) => path.join("public", "images", type, "webp", name);
const getWebpImageUrl = (type, name) => `/images/${type}/webp/${name}`;

const getImageSize = async path => (await fs.promises.stat(path)).size;

router.post("/load_image/:type", async (req, res) => {
    const { type } = req.params;
    if(["events", "gallery", "news"].includes(type)) {
        try {
            const { "file-0": rawImage } = req.files;
            console.log(type, { rawImage }); // Print arguments (just for debug);

            const rawPath = getRawImagePath(type, rawImage.name);
            rawImage.mv(rawPath);
    
            const webpName = UUID() + ".webp";
            const webpPath = getWebpImagePath(type, webpName);
            await cwebp(rawPath, webpPath, "-quiet -mt");
    
            const webpUrl = getWebpImageUrl(type, webpName);
            const webpSize = await getImageSize(webpPath);
            
            const result = { result: [{ url: webpUrl, name: webpName, size: webpSize }] };
            console.log("Image loaded, result is", JSON.stringify(result.result[0]));
            
            fs.promises.unlink(rawPath);
            return res.json(result);
        } catch(e) { console.log(e); res.end(); }
    }
    else return res.json({ errorMessage: "Invalid load type" });
});

router.post("/event/:action", async (req, res) => {
    const { action } = req.params;
    const { data } = req.body;
    console.log(`--- Admin (event): ${action}`, data);
    const SUCCESS = { status: "success" };
    const DB_ERROR = { status: "error", error: "db_error" };
    const EVENT_NOT_EXIST = { status: "error", error: "event_not_exist" };
    let id, event;
    switch(action) {
        case "create":
            id = await getMaxID(events) + 1;
            try {
                await events.insertOne({ ...data, id });
                return res.json(SUCCESS);
            } catch(e) { return res.json(DB_ERROR) }
        case "edit":
            id = data.id;
            try {
                event = await events.findOne({ id });
                if(!event) return res.json(EVENT_NOT_EXIST);
            } catch(e) { return res.json(DB_ERROR); }

            event = { ...event, ...data };
            try {
                await events.replaceOne({ _id: event._id }, event);
                return res.json(SUCCESS);
            } catch(e) { return res.json(DB_ERROR); }
        case "remove":
            id = data.id;
            try {
                event = await events.findOne({ id });
                if(!event) return res.json(EVENT_NOT_EXIST);

                await events.deleteOne({ _id: event._id });
                return res.json(SUCCESS);
            } catch(e) { return res.json(DB_ERROR); }
        default: return res.json({ status: "error", error: "invalid_request" });
    }
});

router.post("/album/:action", async (req, res) => {
    const { action } = req.params;
    const { data } = req.body;
    console.log(`--- Admin (album): ${action}`, data);
    const SUCCESS = { status: "success" };
    const DB_ERROR = { status: "error", error: "db_error" };
    const ALBUM_NOT_EXIST = { status: "error", error: "album_not_exist" };
    let id, album;
    switch(action) {
        case "create":
            id = await getMaxID(albums) + 1;
            try {
                await albums.insertOne({ ...data, id });
                return res.json(SUCCESS);
            } catch(e) { return res.json(DB_ERROR) }
        case "edit":
            id = data.id;
            try {
                album = await albums.findOne({ id });
                if(!album) return res.json(ALBUM_NOT_EXIST);
            } catch(e) { return res.json(DB_ERROR); }

            album = { ...album, ...data };
            try {
                await albums.replaceOne({ _id: album._id }, album);
                return res.json(SUCCESS);
            } catch(e) { return res.json(DB_ERROR); }
        case "remove":
            id = data.id;
            try {
                album = await albums.findOne({ id });
                if(!album) return res.json(ALBUM_NOT_EXIST);

                await albums.deleteOne({ _id: album._id });
                return res.json(SUCCESS);
            } catch(e) { return res.json(DB_ERROR); }
        default: return res.json({ status: "error", error: "invalid_request" });
    }
});

router.post("/post/:action", async (req, res) => {
    const { action } = req.params;
    const { data } = req.body;
    console.log(`--- Admin (post): ${action}`, data);
    const SUCCESS = { status: "success" };
    const DB_ERROR = { status: "error", error: "db_error" };
    const POST_NOT_EXIST = { status: "error", error: "post_not_exist" };
    let id, post;
    switch(action) {
        case "create":
            id = await getMaxID(posts) + 1;
            try {
                await posts.insertOne({ ...data, id });
                return res.json(SUCCESS);
            } catch(e) { return res.json(DB_ERROR) }
        case "edit":
            id = data.id;
            try {
                post = await posts.findOne({ id });
                if(!post) return res.json(POST_NOT_EXIST);
            } catch(e) { return res.json(DB_ERROR); }

            post = { ...post, ...data };
            try {
                await posts.replaceOne({ _id: post._id }, post);
                return res.json(SUCCESS);
            } catch(e) { return res.json(DB_ERROR); }
        case "remove":
            id = data.id;
            try {
                post = await posts.findOne({ id });
                if(!post) return res.json(POST_NOT_EXIST);

                await posts.deleteOne({ _id: post._id });
                return res.json(SUCCESS);
            } catch(e) { return res.json(DB_ERROR); }
        default: return res.json({ status: "error", error: "invalid_request" });
    }
});

router.post("/user/:action", async (req, res) => {
    // Creating/editing/removing users
    const { action } = req.params;
    return res.end("No code there. :/");
});

module.exports = router;