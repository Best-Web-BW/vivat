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

router.get("/events", async (req, res) => res.json(await getEventList(req.query.date)));
const getEventList = async date => {
    const query = date ? { "dates.0": { $lte: date }, "dates.1": { $get: date } } : { };
    const projection = { _id: 0, id: 1, title: 1, dates: 1, tags: 1, category: 1, cdate: 1 };
    try { return await events.find(query, { projection }).sort({ id: 1 }).toArray() }
    catch(e) { return [] }
};

router.get("/events/stats", async (_, res) => res.json(await getEventStats()));
const getEventStats = async () => {
    let result;
    try { result = await events.find({ }, { projection: { _id: 0, tags: 1, category: 1 } }).toArray() }
    catch(e) { return { tags: [], categories: [] } }
    
    const uniqueTags = new Set(), uniqueCategories = new Set();
    for(const { tags, category } of result) {
        for(const tag of tags) uniqueTags.add(tag);
        uniqueCategories.add(category);
    }
    return { tags: [...uniqueTags], categories: [...uniqueCategories] };
};

router.get("/events/:id", async (req, res) => res.json({ ...(await getEventDetails(+req.params.id)), full: true }));
const getEventDetails = async id => {
    try { return await events.findOne({ id }, { projection: { _id: 0 } }) }
    catch(e) { return { id: 0, title: "", contents: "", documents: [], tags: [] } }
}

router.get("/albums", async (_, res) => res.json(await getAlbumList()));
const getAlbumList = async () => {
    const projection = { _id: 0, id: 1, title: 1, cover: 1, cdate: 1 };
    try { return await albums.find({ }, { projection }).sort({ id: 1 }).toArray() }
    catch(e) { return [] }
};

router.get("/albums/stats", async (_, res) => res.json(await getAlbumStats()));
const getAlbumStats = async () => {
    let result;
    try { result = await albums.find({ }, { projection: { _id: 0, tags: 1, category: 1 } }).toArray() }
    catch(e) { return { tags: [], categories: [] } }
    
    const uniqueTags = new Set(), uniqueCategories = new Set();
    for(const { tags, category } of result) {
        for(const tag of tags) uniqueTags.add(tag);
        uniqueCategories.add(category);
    }
    return { tags: [...uniqueTags], categories: [...uniqueCategories] };
};

router.get("/albums/:id", async ({ params: { id } }, res) => res.json({ ...(await getAlbumDetails(+id)), full: true }));
const getAlbumDetails = async id => {
    try { return await albums.findOne({ id }, { projection: { _id: 0 } }) }
    catch(e) { return { id: 0, title: "", images: [], desc: "", tags: [], category: ""} }
}

router.get("/posts", async ({ query: { categories, tags, search } }, res) => res.json(await getPostList(categories, tags, search)));
const getPostList = async (categories, tags, search) => {
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

    try { return await posts.find(query, { projection: { _id: false } }).sort({ id: 1 }).toArray() }
    catch(e) { return [] }
};

router.get("/posts/stats", async (_, res) => res.json(await getPostStats()));
const getPostStats = async () => {
    let result;
    try { result = await posts.find({ }, { projection: { _id: false, tags: true, category: true } }).toArray() }
    catch(e) { return { tags: [], counts: { } } }
    
    const uniqueTags = new Set();
    const counts = result.reduce((acc, { tags, category }) => {
        for(let tag of tags) uniqueTags.add(tag);
        return { ...acc, [category]: (acc[category] ?? 0) + 1 };
    }, { });

    return { tags: [...uniqueTags], counts };
}

router.get("/posts/:id", async ({ params: { id } }, res) => res.json({ success: true, result: await getPostDetails(+id) }));
const getPostDetails = async id => {
    try { return await posts.findOne({ id }, { projection: { _id: 0 } }) }
    catch(e) { return { id: 0, title: "", contents: "", tags: [], category: "" } }
};

router.get("/cat", (_, res) => {
    res.sendFile(path.join(__dirname + "/cat.html"));
});

router.get("/:woppa", (req, res) => {
	res.end(`Hello world! ${req.params.woppa}`);
});

module.exports = router;
module.exports.getEventList = getEventList;
module.exports.getEventStats = getEventStats;
module.exports.getEventDetails = getEventDetails;
module.exports.getAlbumList = getAlbumList;
module.exports.getAlbumStats = getAlbumStats;
module.exports.getAlbumDetails = getAlbumDetails;
module.exports.getPostList = getPostList;
module.exports.getPostStats = getPostStats;
module.exports.getPostDetails = getPostDetails;