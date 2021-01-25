var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(request, response) {
	response.end("Hello world! index");
});
router.get("/:woppa", function(request, response) {
	response.end(`Hello world! ${request.params.woppa}`);
});

module.exports = router;
