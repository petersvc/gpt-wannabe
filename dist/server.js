import express from 'express';
const server = express();
const port = 3000;
server.get("/", (req, res) => {
    res.send("bot is running");
});
export function keepAlive() {
    server.listen(port, () => {
        console.log("server is ready!");
    });
}
//# sourceMappingURL=server.js.map