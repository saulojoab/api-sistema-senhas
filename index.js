require("dotenv").config();
const app = require("./src/app");
const http = require("http");
const socketIo = require("socket.io");
const queue = require("./src/controllers/queue");
const cors = require("cors");

const port = process.env.PORT || "4321";
app.set("port", port);
app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");

  interval = setInterval(() => {
    console.log(`Sent data! [${new Date()}]`);
    socket.emit("sendData", queue.index());
  }, 1000);

  socket.on("addData", (data) => {
    const id = queue.store(data);
    socket.emit("created", id);
    console.log("data added");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () =>
  console.log(
    `[OK COMPUTER] Running at port ${port}! - ${
      process.env.NODE_ENV || "development"
    } mode.`
  )
);
