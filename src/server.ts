import express, { Request, Response, Application } from 'express';

const server: Application = express()
const port = 3000

server.get("/", (req: Request, res: Response) => {
  res.send("bot is running")
})

export function keepAlive() {
  server.listen(port, () => {
    console.log("server is ready!")
  })
}