const HttpStatus = require("http-status-codes"); // Pra deixar os status da resposta mais entendível.

let queueData = [{ name: "Saulo", selectedOption: "teste" }];

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

  delete() {
    const queueItem = queueData.filter((item) => item.id === req.params.id);

    if (!queueItem) {
      return;
    }

    const data = queueData.filter((item) => item.id !== req.params.id);
    queueData = [...data];

    return "ok";
  },
};
