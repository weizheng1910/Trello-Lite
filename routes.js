const mongoose = require("mongoose");
// Retrieve Models
const Task = mongoose.model("tasks");
const Board = mongoose.model("boards");
const User = mongoose.model("users");
// Passport
var passport = require("passport");
// Verify middleware
var verify = require("./verify.js");
//
const path = require("path");
var moment = require("moment");

module.exports = (app) => {
  app.get("/", verify.isLoggedIn, (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });

  app.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "login.html"));
  });

  app.get("/logout", function (req, res) {
    res.redirect("/login");
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login"],
      prompt: "select_account",
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/");
    }
  );

  app.get("/api/user", async (req, res) => {
    try {
      const googleId = req.session.passport.user.googleId;
      const currentUser = await User.findOne({ googleId: googleId });
      console.log("currentUser", currentUser);
      res.send(currentUser);
    } catch (e) {
      console.log(e);
    }
  });

  // GET ALL
  app.get("/api/tasks", async (req, res) => {
    try {
      const tasks = await Task.find();

      res.send(tasks);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/boards", async (req, res) => {
    try {
      const boards = await Board.find();
      res.send(boards);
    } catch (e) {
      console.log(e);
      res.redirect("/denied");
    }
  });

  // ADD_TASK
  app.post("/api/tasks", async (req, res) => {
    try {
      const taskObject = req.body;
      const newTask = new Task({
        task: taskObject.task,
        board: taskObject.board,
        completed: false,
        description: "",
        comments: [],
      });
      await newTask.save();

      res.send(newTask);
    } catch (e) {
      console.log(e);
    }
  });

  app.post("/api/tasks/:id/comments/", async (req, res) => {
    try {
      const comment = req.body.comment;
      const taskToBeUpdated = await Task.findById(req.params.id);
      const updateAction = await Task.findOneAndUpdate(
        { _id: req.params.id },
        {
          comments: [
            ...taskToBeUpdated.comments,
            {
              name: req.session.passport.user.name,
              photo: req.session.passport.user.photo,
              comment: comment,
              date: moment().format("LLL"),
            },
          ],
        },
        {
          new: true,
        }
      );
      await updateAction.save();
      res.send(updateAction);
    } catch (e) {
      console.log(e);
    }
  });

  // ADD_BOARD
  app.post("/api/boards/", async (req, res) => {
    try {
      const nameOfBoard = req.body.board;
      const newBoard = new Board({ board: nameOfBoard });
      await newBoard.save();
      res.send(newBoard);
    } catch (e) {
      console.log(e);
    }
  });

  // COMPLETE_TASK
  app.put("/api/tasks/:id", async (req, res) => {
    try {
      const taskToBeUpdated = await Task.findById(req.params.id);
      const updateAction = await Task.findOneAndUpdate(
        { _id: req.params.id },
        { completed: !taskToBeUpdated.completed },
        {
          new: true,
        }
      );
      await updateAction.save();

      res.send(updateAction);
    } catch (e) {
      console.log(e);
    }
  });

  // EDIT_TASK
  app.put("/api/tasks/:id/edit", async (req, res) => {
    try {
      const taskBody = req.body;
      const updateAction = await Task.findOneAndUpdate(
        { _id: req.params.id },
        {
          task: taskBody.task,
          board: taskBody.board,
          description: taskBody.description,
        },
        {
          new: true,
        }
      );
      await updateAction.save();

      res.send(updateAction);
    } catch (e) {
      console.log(e);
    }
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const deleteAction = await Task.findByIdAndDelete(id);
      res.send(deleteAction);
    } catch (e) {
      console.log(e);
    }
  });

  app.delete("/api/boards/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const deleteAction = await Board.findByIdAndDelete(id);
      res.send(deleteAction);
    } catch (e) {
      console.log(e);
    }
  });

  app.delete("/api/tasks/:id/comments/:comment", async (req, res) => {
    try {
      const taskToBeUpdated = await Task.findById(req.params.id);
      const updateAction = await Task.findOneAndUpdate(
        { _id: req.params.id },
        {
          comments: taskToBeUpdated.comments.filter(
            (elem) => elem.comment !== req.params.comment
          ),
        },
        {
          new: true,
        }
      );

      await updateAction.save();

      res.send(updateAction);
    } catch (e) {
      console.log(e);
    }
  });
};
