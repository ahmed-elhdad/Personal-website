import mongoose from "mongoose";
const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: True,
  },
  description: {
    type: String,
    required: True,
  },
  images: {
    images: { type: Array, required: true },
  },
  loves: {
    type: Number,
    default: 0,
  },
  tages: [],
  order: { type: Number, required: False, default: 0 },
  start_data: {
    type: Date,
  },
  end_date: {
    type: Date,
    default: Date.now(),
  },
});
