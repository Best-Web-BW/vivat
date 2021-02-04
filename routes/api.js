var express = require("express");
var router = express.Router();
var path = require("path");

const events = [
    {
        id: 1,
        title: "Мероприятие 1",
        dates: ["2021-02-01", "2021-02-04"],
        desc: "Описание мероприятия 1",
        place: "Некоторый адрес",
        category: "Некоторая категория"
    },
    {
        id: 2,
        title: "Мероприятие 2",
        dates: ["2021-02-02", "2021-02-03"],
        desc: "Описание мероприятия 2",
        place: "Некоторый адрес",
        category: "Некоторая категория"
    },
    {
        id: 3,
        title: "Мероприятие 3",
        dates: ["2021-02-03", "2021-02-03"],
        desc: "Описание мероприятия 3",
        place: "Некоторый адрес",
        category: "Некоторая категория"
    },
    {
        id: 4,
        title: "Мероприятие 4",
        dates: ["2021-02-04", "2021-02-04"],
        desc: "Описание мероприятия 4",
        place: "Некоторый адрес",
        category: "Некоторая категория"
    },
    {
        id: 5,
        title: "Мероприятие 5",
        dates: ["2021-02-05", "2021-02-06"],
        desc: "Описание мероприятия 5",
        place: "Некоторый адрес",
        category: "Некоторая категория"
    },
    {
        id: 6,
        title: "Мероприятие 6",
        dates: ["2021-02-06", "2021-02-09"],
        desc: "Описание мероприятия 6",
        place: "Некоторый адрес",
        category: "Некоторая категория"
    },
    {
        id: 7,
        title: "Мероприятие 7",
        dates: ["2021-02-07", "2021-02-10"],
        desc: "Описание мероприятия 7",
        place: "Некоторый адрес",
        category: "Некоторая категория"
    },
    {
        id: 8,
        title: "Мероприятие 8",
        dates: ["2021-02-08", "2021-03-02"],
        desc: "Описание мероприятия 8",
        place: "Некоторый адрес",
        category: "Некоторая категория"
    },
    {
        id: 9,
        title: "Мероприятие 9",
        dates: ["2021-02-09", "2021-02-12"],
        desc: "Описание мероприятия 9",
        place: "Некоторый адрес",
        category: "Некоторая категория"
    }
];
const images = [
    "akshat-vats-l_GAWl6q7LI-unsplash",
    "augustine-wong-T0BYurbDK_M-unsplash",
    "christine-benton-2dz2-jcfuZY-unsplash",
    "elegant-girl-farm-wiith-horse",
    "karin-zabret-W7vc1_6dQZE-unsplash",
    "kirsten-drew-fQ2n2lRV0dw-unsplash",
    "kirsten-drew-fQ2n2lRV0dw-unsplash2",
    "marylou-fortier-mjXm9gYP4wE-unsplash",
    "olga-thelavart-1nrY9CLAGcI-unsplash",
    "yael-gonzalez-8qqHbE8_SmE-unsplash",
    "yael-gonzalez-jd9UEc8Sc58-unsplash",
    "yael-gonzalez-kr1W1SxjaMA-unsplash"
];
const albums = [
    {
        id: 1,
        title: "Альбом #1",
        desc: "Описание альбомa #1",
        date: "2021-02-01",
        image: images[0],
        images: images
    },
    {
        id: 2,
        title: "Альбом #2",
        desc: "Описание альбомa #2",
        date: "2021-02-02",
        image: images[1],
        images: images
    },
    {
        id: 3,
        title: "Альбом #3",
        desc: "Описание альбомa #3",
        date: "2021-02-03",
        image: images[2],
        images: images
    },
    {
        id: 4,
        title: "Альбом #4",
        desc: "Описание альбомa #4",
        date: "2021-02-04",
        image: images[3],
        images: images
    },
    {
        id: 5,
        title: "Альбом #5",
        desc: "Описание альбомa #5",
        date: "2021-02-05",
        image: images[4],
        images: images
    },
    {
        id: 6,
        title: "Альбом #6",
        desc: "Описание альбомa #6",
        date: "2021-02-06",
        image: images[5],
        images: images
    },
    {
        id: 7,
        title: "Альбом #7",
        desc: "Описание альбомa #7",
        date: "2021-02-07",
        image: images[6],
        images: images
    },
    {
        id: 8,
        title: "Альбом #8",
        desc: "Описание альбомa #8",
        date: "2021-02-08",
        image: images[7],
        images: images
    },
    {
        id: 9,
        title: "Альбом #9",
        desc: "Описание альбомa #9",
        date: "2021-02-09",
        image: images[8],
        images: images
    },
    {
        id: 10,
        title: "Альбом #10",
        desc: "Описание альбомa #10",
        date: "2021-02-10",
        image: images[9],
        images: images
    },
    {
        id: 11,
        title: "Альбом #11",
        desc: "Описание альбомa #11",
        date: "2021-02-11",
        image: images[10],
        images: images
    },
    {
        id: 12,
        title: "Альбом #12",
        desc: "Описание альбомa #12",
        date: "2021-02-12",
        image: images[11],
        images: images
    }
]

const plugs = {
	index: "Hello world! index",
    woppa: (woppa) => `Hello world! ${woppa}`,
    events: JSON.stringify(events.map(event => ({ id: event.id, title: event.title, dates: event.dates }))),
    events_id: (id) => events.find(event => event.id == id),
    albums: JSON.stringify(albums.map(album => ({ id: album.id, title: album.title, image: album.image, date: album.date }))),
    albums_id: (id) => albums.find(album => album.id == id),
};

router.get("/", (_, res) => {
	res.end(plugs.index);
});

router.get("/events", (req, res) => {
    const date = req.query.date;
    if(date) {
        const filtered = events.filter(event => event.dates[0] <= date && date <= event.dates[1]);
        const mapped = filtered.map(event => ({ id: event.id, title: event.title, dates: event.dates }));
        res.end(JSON.stringify(mapped));
    } else {
        res.end(plugs.events);
    }
});

router.get("/events/:id", (req, res) => {
    res.end(JSON.stringify({ ...plugs.events_id(+req.params.id), full: true }));
});

router.get("/albums", (_, res) => {
    res.end(plugs.albums);
});

router.get("/albums/:id", (req, res) => {
    res.end(JSON.stringify({ ...plugs.albums_id(+req.params.id), full: true }));
});

router.get("/cat", (_, res) => {
    res.sendFile(path.join(__dirname + "/cat.html"));
});

router.get("/:woppa", (req, res) => {
	res.end(plugs.woppa(req.params.woppa));
});

module.exports = router;