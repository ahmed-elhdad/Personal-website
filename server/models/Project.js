const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    tech:        { type: [String], default: [] },
    github:      { type: String, default: null },
    live:        { type: String, default: null },
    emoji:       { type: String, default: '💻' },
    thumbnail:   { type: String, default: null },
  },
  {
    timestamps: true,          // adds createdAt + updatedAt automatically
    versionKey: false,
    toJSON: {
      // expose _id as id in every response
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('Project', projectSchema);
