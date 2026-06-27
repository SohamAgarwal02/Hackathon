import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  dueDate: {
    type: Date,
  },
});

const goalSchema = new mongoose.Schema(
  {
   
    name: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    deadline: {
      type: Date,
      required: true,
    },

    hoursPerDay: {
      type: Number,
      required: true,
    },

    level: {
      type: String,
    },

    roadmap: {
      monthlyPlan: {
        type: Array,
        default: [],
      },

      weeklyPlan: {
        type: Array,
        default: [],
      },

      dailyPlan: {
        type: Array,
        default: [],
      },
    },

    tasks: [taskSchema],

    progress: {
      type: Number,
      default: 0,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;