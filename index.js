require("dotenv").config();
const app = require("./src/app");
const http = require("http");
const socketIo = require("socket.io");
const orders = require("./src/controllers/orders");
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
  console.log("[CONNECTION] New client connected");

  interval = setInterval(() => {
    console.log(`[SENT] Sent updated data! [${new Date()}]`);
    socket.emit("sendData", orders.index());
    socket.emit("sendCurrent", orders.makeCurrent());
  }, 1000);

  socket.on("addData", (data) => {
    const id = orders.store(data);
    socket.emit("created", id);
    console.log("[CREATED] New order with id: " + id);
  });

  socket.on("makeCurrent", (id) => {
    orders.makeCurrent(id);
    console.log("[CURRENT] Current order: " + id);
  });

  socket.on("delete", (id) => {
    orders.delete(id);
    console.log("[DELETED] Order with id: " + id);
  });

  socket.on("disconnect", () => {
    console.log("[DISCONNECTION] Client disconnected");
  });
});

server.listen(port, () =>
  console.log(
    `[OK COMPUTER] Running at port ${port}! - ${
      process.env.NODE_ENV || "development"
    } mode.`
  )
);
