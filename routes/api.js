const router = require("express").Router();
const path = require("path");

const DO_LOG = false;

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
    const projection = { _id: 0, id: 1, title: 1, dates: 1, tags: 1, category: 1, cdate: 1 };
    
    const result = await events.find(query, { projection }).sort({ id: 1 }).toArray();
    res.json(result);
});

router.get("/events/stats", async (_, res) => {
    const result = await events.find({ }, { projection: { _id: 0, tags: 1, category: 1 } }).toArray();
    
    const uniqueTags = new Set(), uniqueCategories = new Set();
    for(const { tags, category } of result) {
        for(const tag of tags) uniqueTags.add(tag);
        uniqueCategories.add(category);
    }

    res.json({ tags: [...uniqueTags], categories: [...uniqueCategories] });
});

router.get("/events/:id", async (req, res) => {
    const result = await events.findOne({ id: +req.params.id }, { projection: { _id: 0 } });
    res.json({ ...result, full: true });
});

router.get("/albums", async (_, res) => {
    const projection = { _id: 0, id: 1, title: 1, cover: { url: 1 }, cdate: 1 };
    const result = await albums.find({ }, { projection }).sort({ id: 1 }).toArray();
    res.json(result);
});

router.get("/albums/stats", async (_, res) => {
    const result = await albums.find({ }, { projection: { _id: 0, tags: 1, category: 1 } }).toArray();
    
    const uniqueTags = new Set(), uniqueCategories = new Set();
    for(const { tags, category } of result) {
        for(const tag of tags) uniqueTags.add(tag);
        uniqueCategories.add(category);
    }

    res.json({ tags: [...uniqueTags], categories: [...uniqueCategories] });
});

router.get("/albums/:id", async (req, res) => {
    const result = await albums.findOne({ id: +req.params.id }, { projection: { _id: 0 } });
    res.json({ ...result, full: true });
});

router.get("/posts", async (req, res) => {
    const { categories, tags, search } = req.query;
    const query = { };

    DO_LOG && console.log(categories, tags, search);
    
    if(categories) query.category = { $in: JSON.parse(categories) };
    if(tags) query.tags = { $all: JSON.parse(tags) };
    if(search) {
        const words = JSON.parse(search).replace(/[^\w\dа-яё ]/gi, "").toLowerCase().split(" ");
        const condition = { $regex: new RegExp(words.join("|"), "gi") }
        query.$or = [
            { title: condition },
            { desc: condition },
            { paragraphs: { $elemMatch: { text: condition } } }
        ];
    }

    DO_LOG && console.log(query, query.$or);

    const result = await posts.find(query, { projection: { _id: false } }).sort({ id: 1 }).toArray();
    res.json(result);
});

router.get("/posts/stats", async (_, res) => {
    const result = await posts.find({ }, { projection: { _id: false, tags: true, category: true } }).toArray();
    
    const uniqueTags = new Set();
    const counts = result.reduce((acc, { tags, category }) => {
        for(let tag of tags) uniqueTags.add(tag);
        return { ...acc, [category]: (acc[category] ?? 0) + 1 };
    }, { });

    res.json({ tags: [...uniqueTags], counts })
});

router.get("/posts/:id", async (req, res) => {
    const { id } = req.params;
    let result;

    try { result = await posts.findOne({ id: +id }); }
    catch(e) { return res.json({ success: false, reason: "no_post_found" }); }

    res.json({ success: true, result: { ...result, _id: undefined } });
});

router.get("/cat", (_, res) => {
    res.sendFile(path.join(__dirname + "/cat.html"));
});

router.get("/:woppa", (req, res) => {
	res.end(`Hello world! ${req.params.woppa}`);
});

module.exports = router;