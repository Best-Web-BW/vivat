var express = require("express");
var router = express.Router();

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

const plugs = {
	index: "Hello world! index",
    woppa: (woppa) => `Hello world! ${woppa}`,
    events: JSON.stringify(events.map(event => ({ id: event.id, title: event.title, dates: event.dates }))),
    events_id: (id) => JSON.stringify({ ...events.find(event => event.id == id), full: true})
};

router.get("/", (req, res) => {
	res.end(plugs.index);
});

router.get("/events", (req, res) => {
    // console.log("Event list requested");
    const date = req.query.date;
    if(date) {
        // console.log("Date", date);
        const filtered = events.filter(event => event.dates[0] <= date && date <= event.dates[1]);
        // console.log("Filtered", filtered);
        const mapped = filtered.map(event => ({ id: event.id, title: event.title, dates: event.dates }));
        // console.log("Mapped", mapped);
        const json = JSON.stringify(mapped);
        // console.log("JSON", json);
        res.end(json);
    } else {
        res.end(plugs.events);
    }
})

router.get("/events/:id", (req, res) => {
    res.end(plugs.events_id(+req.params.id));
});

router.get("/:woppa", (req, res) => {
	res.end(plugs.woppa(req.params.woppa));
});

module.exports = router;
