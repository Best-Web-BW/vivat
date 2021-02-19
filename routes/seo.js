const path = require("path");
const fs = require("fs");

const robots = async (_, res) => res.sendFile(path.join(__dirname + "/robots.txt"));
module.exports.robots = robots;

let events, albums, posts;
new require("mongodb").MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true, useNewUrlParser: true }).connect((err, client) => {
    if(err) return console.error(err);
    
    const db = client.db("vivat");
    events = db.collection("events");
    albums = db.collection("albums");
    posts = db.collection("posts");
});

const getURLObject = (loc, lastmod, priority) => ({ loc, lastmod, priority });

const getStaticSitemapPart = async () => {
    const pages = [
        "about", "contacts", "privacy-policy",
        "services",
        "services/rent-main",
        "services/rent-guest",
        "services/personal-lessons"
    ];

    return await Promise.all(pages.map(async page => {
        const filename = path.join(__dirname, "..", "pages", `${page}.js`);
        const modifytime = (await fs.promises.stat(filename)).mtime.toISOString();
        return getURLObject(page, modifytime, 0.6);
    }));
};

const getDatas = async collection => (await collection.find().toArray()).map(({ id, mdate }) => ({ id, mdate }));
const getDynamicDatas = async () => {
    try { return { events: await getDatas(events), albums: await getDatas(albums), posts: await getDatas(posts) }; }
    catch(e) { console.error(e); return { events: [], albums: [], posts: [] }; }
}

const getDynamicSitemapPart = async () => {
    const listToXML = (list, name) => {
        let lastModifyDate = new Date("1970-01-01").toISOString();
        const listToAdd = list.map(({ id, mdate }) => {
            if(mdate > lastModifyDate) lastModifyDate = mdate;
            return getURLObject(`${name}/${id}`, mdate, 0.75);
        });
        return [lastModifyDate, listToAdd];
    }
    
    const xmled = [];
    const { events, albums, posts } = await getDynamicDatas();
    
    const [lastEventModifyDate, eventListToAdd] = listToXML(events, "events");
    xmled.push(getURLObject("home", lastEventModifyDate, 0.8));
    xmled.push(getURLObject("events", lastEventModifyDate, 0.7), ...eventListToAdd);

    const [lastAlbumModifyDate, albumListToAdd] = listToXML(albums, "gallery");
    xmled.push(getURLObject("gallery", lastAlbumModifyDate, 0.7), ...albumListToAdd);

    const [lastPostModifyDate, postListToAdd] = listToXML(posts, "news");
    xmled.push(getURLObject("news", lastPostModifyDate, 0.7), ...postListToAdd);

    return xmled;
};

const getFullSitemap = async () => [...await getStaticSitemapPart(), ...await getDynamicSitemapPart()];
const sitemap = async (_, res) => {
    res.header("Content-Type", "application/xml");
    res.write('<?xml version="1.0" encoding="UTF-8"?>');
    res.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

    for(const { loc, lastmod, priority } of await getFullSitemap()) res.write(`
        <url>
            <loc>https://kskvivat.com/${loc}</loc>
            <lastmod>${lastmod}</lastmod>
            <priority>${priority}</priority>
        </url>
    `);

    res.write("</urlset>");
    res.end();
};

module.exports.sitemap = sitemap;