import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  location: { type: String, required: true },
  message: { type: String, required: true },
  service: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Enquiry= mongoose.model('enquiry', enquirySchema);