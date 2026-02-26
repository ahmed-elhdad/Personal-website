const mongoose = require('mongoose');

const skillCategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true, unique: true, trim: true },
    icon:     { type: String, default: '💡' },
    skills:   { type: [String], default: [] },
  },
  {
    timestamps: false,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('SkillCategory', skillCategorySchema);
