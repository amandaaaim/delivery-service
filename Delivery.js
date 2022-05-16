const mongoose = require("mongoose");

mongoose.model("Delivery", {
  order_id: {
    type: String,
  },
  delivery_type: {
    type: String,
  },
  agent: {
    type: String,
  },

  delivery_status: {
    type: String,
  },
  tracking_number: {
    type: String,
  },

  date: {
    type: String,
  },

  destination: {
    type: String,
  },
});
