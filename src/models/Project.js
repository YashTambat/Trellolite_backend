import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  assignedTo: [
    {
      member: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      task: { type: String }, // what to do
      deadline: { type: Date },
      status: { type: String, enum: ["incomplete", "complete"], default: "incomplete" },
      issues: [{ type: String }],
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
