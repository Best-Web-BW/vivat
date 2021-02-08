const forceSSL = require("express-force-ssl");
const server = require("express")();
const https = require("https");
const http = require("http");
const next = require("next");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const HTTPS_PORT = process.env.HTTPS_PORT || 443;
const HTTP_PORT = process.env.HTTP_PORT || 80;

const api = require('./routes/api.js');

(async () => {
	try {
		await app.prepare();

        const options = {
            key: fs.readFileSync("ssl/private.key"),
            cert: fs.readFileSync("ssl/cert.crt"),
            ca: fs.readFileSync("ssl/ca.crt")
        }
        
        https.createServer(options, server).listen(HTTPS_PORT);
        http.createServer(server).listen(HTTP_PORT);

        server.use(forceSSL);
		
		server.use("/api", api);
		server.get("*", (request, response) => handle(request, response));

        console.log(`--> Process environment: '${process.env.NODE_ENV}'`);
        console.log(`--> App environment: '${dev ? "development" : "production"}'`);
        console.log(`-> Ready on port ${HTTP_PORT} for HTTP`);
        console.log(`-> Ready on port ${HTTPS_PORT} for HTTPS`);
	} catch(e) {
		console.error(e.stack);
		process.exit(1);
	}
})();