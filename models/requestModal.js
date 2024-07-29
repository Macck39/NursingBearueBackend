import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  location: { type: String, required: true },
  service: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Request= mongoose.model('Request', requestSchema);