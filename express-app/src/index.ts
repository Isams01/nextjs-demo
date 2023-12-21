import express from "express";
import expressWs from "express-ws";

const port = 3001;
const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

const wsApp = expressWs(app);

wsApp.app.ws("/", (ws) => {
  ws.on("message", (msg) => {
    // just a string
    console.log(msg);
    // Check for "close <code>"
    ws.send(msg);
  });
  ws.on("open", () => {
    ws.send("hello");
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
