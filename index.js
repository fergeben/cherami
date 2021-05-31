const config = require("./config");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = config.port;
const service = require("./service");

app.get("/", (_, res) => {
    res.send("Nothing to do here");
}).get("/health", (_, res) => {
    res.send({ status: "UP" });
}).post("/api/v1/send", async ({ body }, res) => {
    let errors = "";
    if (!body.from) {
        errors += '"from" is missing\n';
    }
    const from = body.from;

    if (!body.to) {
        errors += '"to" is missing\n';
    }
    const to = body.to;

    if (!body.subject) {
        errors += '"subject" is missing\n';
    }
    const subject = body.subject;

    const text = body.text ?? undefined;
    const html = body.html ?? undefined;
    if (!text && !html) {
        errors += 'Please specify "text" or "html"\n';
    }

    if (errors) {
        res.statusCode = 400;
        res.send(errors);
        return;
    }

    const info = await service.send(from, to, subject, text, html);
    res.send(info);
}).listen(port, () => {
    console.log(`CherAmi listening at http://localhost:${port}`);
});