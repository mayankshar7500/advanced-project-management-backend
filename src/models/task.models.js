import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true
    },

    description: {
      type: String,
      trim: true
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo"
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return !value || value > new Date();
        },
        message: "Due date must be in the future"
      }
    },

    subtasks: [
      {
        title: String,
        isCompleted: {
          type: Boolean,
          default: false
        }
      }
    ],

    attachments: [String],

    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const Task = mongoose.model("Task", TaskSchema);