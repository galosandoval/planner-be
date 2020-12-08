const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("../user/member-router");
const server = express();

server.use(helmet());
server.use(express.json());
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
server.use("/member", userRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
