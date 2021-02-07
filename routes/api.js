const router = require("express").Router();
const path = require("path");

let events, albums, posts;
new require("mongodb").MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true, useNewUrlParser: true }).connect((err, client) => {
    if(err) return console.error(err);

    const db = client.db("vivat");
    events = db.collection("events");
    albums = db.collection("albums");
    posts = db.collection("posts");
});

router.get("/", (_, res) => {
	res.end("Hello world! index");
});

router.get("/events", async (req, res) => {
    const { date } = req.query;

    const query = date ? { "dates.0": { $lte: date }, "dates.1": { $gte: date } } : { };
    const projection = { _id: false, id: true, title: true, dates: true };
    
    const result = await events.find(query, { projection }).sort({ id: 1 }).toArray();
    res.json(result);
});

router.get("/events/:id", async (req, res) => {
    const result = await events.findOne({ id: +req.params.id }, { projection: { _id: false } });
    res.json({ ...result, full: true });
});

router.get("/albums", async (_, res) => {
    const projection = { _id: false, id: true, title: true, image: true, date: true };
    const result = await albums.find({ }, { projection }).sort({ id: 1 }).toArray();
    res.json(result);
});

router.get("/albums/:id", async (req, res) => {
    const result = await albums.findOne({ id: +req.params.id }, { projection: { _id: false } });
    res.json({ ...result, full: true });
});

router.get("/posts", async (_, res) => {
    const projection = { _id: false };
    const result = await posts.find({ }, { projection }).sort({ id: 1 }).toArray();
    res.json(result);
});

router.get("/posts/:id", async (req, res) => {
    const result = await posts.findOne({ id: +req.params.id }, { projection: { _id: false } });
    res.json(result);
});

router.get("/cat", (_, res) => {
    res.sendFile(path.join(__dirname + "/cat.html"));
});

router.get("/:woppa", (req, res) => {
	res.end(`Hello world! ${req.params.woppa}`);
});

module.exports = router;