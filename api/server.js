const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

const userRouter = require("../user/member-router");
const authRouter = require("../auth/auth-router");
const messagesRouter = require("../messages/messages-router");
const topicRouter = require("../topic/topic-router")

server.use(helmet());
server.use(express.json());
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
server.use("/member", userRouter);
server.use("/messages", messagesRouter);
server.use("/api", authRouter);
server.use("/topic", topicRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
