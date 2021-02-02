var express = require("express");
var router = express.Router();

const plugs = {
	index: "Hello world! index",
    woppa: (woppa) => `Hello world! ${woppa}`,
    events: JSON.stringify([
        {
            id: 1,
            title: "Мероприятие 1",
            date: "2021-02-1"
        },
        {
            id: 2,
            title: "Мероприятие 2",
            date: "2021-02-2"
        },
        {
            id: 3,
            title: "Мероприятие 3",
            date: "2021-02-3"
        },
        {
            id: 4,
            title: "Мероприятие 4",
            date: "2021-02-4"
        },
        {
            id: 5,
            title: "Мероприятие 5",
            date: "2021-02-5"
        },
        {
            id: 6,
            title: "Мероприятие 6",
            date: "2021-02-6"
        },
        {
            id: 7,
            title: "Мероприятие 7",
            date: "2021-02-7"
        },
        {
            id: 8,
            title: "Мероприятие 8",
            date: "2021-02-8"
        },
        {
            id: 9,
            title: "Мероприятие 9",
            date: "2021-02-9"
        },
        {
            id: 10,
            title: "Мероприятие 10",
            date: "2021-02-10"
        },
        {
            id: 11,
            title: "Мероприятие 11",
            date: "2021-02-11"
        },
        {
            id: 12,
            title: "Мероприятие 12",
            date: "2021-02-12"
        },
        {
            id: 13,
            title: "Мероприятие 13",
            date: "2021-02-13"
        },
        {
            id: 14,
            title: "Мероприятие 14",
            date: "2021-02-14"
        },
        {
            id: 15,
            title: "Мероприятие 15",
            date: "2021-02-15"
        },
        {
            id: 16,
            title: "Мероприятие 16",
            date: "2021-02-16"
        },
        {
            id: 17,
            title: "Мероприятие 17",
            date: "2021-02-17"
        },
        {
            id: 18,
            title: "Мероприятие 18",
            date: "2021-02-18"
        },
        {
            id: 19,
            title: "Мероприятие 19",
            date: "2021-02-19"
        },
        {
            id: 20,
            title: "Мероприятие 20",
            date: "2021-02-20"
        },
        {
            id: 21,
            title: "Мероприятие 21",
            date: "2021-02-21"
        },
        {
            id: 22,
            title: "Мероприятие 22",
            date: "2021-02-22"
        },
        {
            id: 23,
            title: "Мероприятие 23",
            date: "2021-02-23"
        },
        {
            id: 24,
            title: "Мероприятие 24",
            date: "2021-02-24"
        },
        {
            id: 25,
            title: "Мероприятие 25",
            date: "2021-02-25"
        },
        {
            id: 26,
            title: "Мероприятие 26",
            date: "2021-02-26"
        },
        {
            id: 27,
            title: "Мероприятие 27",
            date: "2021-02-27"
        },
        {
            id: 28,
            title: "Мероприятие 28",
            date: "2021-02-28"
        }
    ])
};

/* GET home page. */
router.get("/", (req, res) => {
	res.end(plugs.index);
});

router.get("/events", (req, res) => {
    console.log("Event list requested");
    res.end(plugs.events);
})

router.get("/:woppa", (req, res) => {
	res.end(plugs.woppa(req.params.woppa));
});

module.exports = router;
