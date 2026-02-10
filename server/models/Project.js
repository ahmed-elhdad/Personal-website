import mongoose from "mongoose";
const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    images: { type: Array, required: true },
  },
  loves: {
    type: Number,
    default: 0,
  },
  tages: [],
  order: { type: Number, required: false, default: 0 },
  start_data: {
    type: Date,
  },
  end_date: {
    type: Date,
    default: Date.now(),
  },
});
export default mongoose.model("project", projectSchema);
