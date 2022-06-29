const HttpStatus = require("http-status-codes"); // Pra deixar os status da resposta mais entendível.

let queueData = [];
let current;

module.exports = {
  index() {
    return queueData;
  },

  show() {
    const queueItem = queueData.filter((item) => item.id === req.params.id);

    if (!queueItem) {
      return;
    }

    return queueItem;
  },

  store(data) {
    const { name, selectedOption } = data;

    const created = queueData.push({ name, selectedOption, time: new Date() });

    if (!created) {
      return;
    }

    return created;
  },

  delete(id) {
    const newData = queueData;
    newData.splice(newData.indexOf(id), 1);

    queueData = newData;

    return "ok";
  },

  makeCurrent(id) {
    if (typeof id === "number") {
      current = id;
    }

    if (typeof current === "number") {
      return current;
    }

    return null;
  },
};
