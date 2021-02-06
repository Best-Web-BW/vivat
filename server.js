const express = require("express");
const next = require("next");

process.env.NODE_ENV = "development";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const api = require('./routes/api.js');

(async () => {
	try {
		await app.prepare();
        const server = express();
		
		server.use("/api", api);
		server.get("*", (request, response) => handle(request, response));
		
		server.listen(port, (error) => {
			if(error) throw error;
			console.log(`> Ready on localhost:${port}; raw env: '${process.env.NODE_ENV}'; server env: '${dev ? "development" : "production"}'`);
		});
	} catch(exception) {
		console.error(exception.stack);
		process.exit(1);
	}
})();