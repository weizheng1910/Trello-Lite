const mongoose = require("mongoose");
const { Schema } = mongoose;
var findOrCreate = require("mongoose-findorcreate");


module.exports = {

const taskSchema = new Schema({
  task: {
    type: String,
    required: "Name cannot be blank!",
    unique: true,
  },
  board: {
    type: String,
    required: "Name cannot be blank!",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: "",
  },
  comments: {
    type: [
      {
        name: String,
        photo: String,
        comment: String,
        date: String,
      },
    ],
    default: [],
  },
});

const boardSchema = new Schema({
  board: {
    type: String,
    required: "Board cannot be blank!",
    unique: true,
  },
});

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

userSchema.plugin(findOrCreate);

mongoose.model("users", userSchema);
mongoose.model("tasks", taskSchema);
mongoose.model("boards", boardSchema);


}


