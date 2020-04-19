import React, { useState } from "react";
import PropTypes from "prop-types";

import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import Comments from "./Comments";
import AddComment from "./AddComment";
import { Modal, Button, Form } from "react-bootstrap";

let EditTask = ({
  editTask,
  deleteTask,
  completeTask,
  boards,
  thisTask,
  thisBoard,
  thisId,
  completed,
  comments,
  thisDescription,
}) => {
  let board;
  let boardInputDOM = React.createRef();

  let task;
  let taskInputDOM = React.createRef();

  let description;
  let descriptionInputDOM = React.createRef();

  const [showModal, setModal] = useState(false);

  const [currentInput, setcurrentInput] = useState(thisTask);
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [currentDescription, setcurrentDescription] = useState(thisDescription);

  let boardSelection = boards.map((elem) => {
    if (thisBoard == elem.board) {
      return (
        <option selected value={elem.board}>
          {elem.board}
        </option>
      );
    } else {
      return <option value={elem.board}>{elem.board}</option>;
    }
  });

  let errorMessage = isInputEmpty ? (
    <div><small className="text-danger">Input shouldn&apos;t be empty</small></div>
  ) : (
    <div></div>
  );

  return (
    <div>
      <div className="task-name d-flex justify-content-between">
        <div>
          <span style={{ textDecoration: completed ? "line-through" : "none" }}>
            {thisTask}
          </span>
        </div>
        <div className="d-flex justify-content-center">
          <div className="task-button">
            <Button
              variant="outline-dark"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 5 + "px",
              }}
              onClick={() => {
                setModal(true);
              }}
            >
              <FaRegEdit size={20} />
            </Button>
          </div>
        </div>
      </div>
      <Modal
        dialogClassName="modal-90w"
        show={showModal}
        onHide={() => setModal(false)}
      >
        <Form className="m-2">
          <Form.Group>
            <Form.Label>Task</Form.Label>
            <Form.Control
              id="task"
              onChange={(evt) => {
                setcurrentInput(evt.target.value);
              }}
              value={currentInput}
              ref={taskInputDOM}
              type="text"
            />
            {errorMessage}
            <Form.Label>Board</Form.Label>
            <Form.Control as="select" id="board" ref={boardInputDOM}>
              {boardSelection}
            </Form.Control>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              ref={descriptionInputDOM}
              rows="5"
              onChange={(evt) => {
                setcurrentDescription(evt.target.value);
              }}
              value={currentDescription}
            />
          </Form.Group>
          <div id="encloseButtons" className="d-flex flex-row">
            <div>
              <Button
                variant="outline-dark"
                onClick={(e) => {
                  e.preventDefault();
                  if (!taskInputDOM.current.value) {
                    setIsInputEmpty(true);
                    return;
                  }

                  setIsInputEmpty(false);
                  task = taskInputDOM.current.value;
                  board = boardInputDOM.current.value;
                  description = descriptionInputDOM.current.value;

                  editTask({
                    task: task,
                    board: board,
                    _id: thisId,
                    description: description,
                  });

                  setModal(false);
                }}
              >
                Save Changes
              </Button>
            </div>

            <div className="mx-2">
              <Button
                variant="outline-dark"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5 + "px",
                }}
                onClick={() => {
                  deleteTask(thisId);
                }}
              >
                Delete Task <MdDelete size={25} />
              </Button>
            </div>

            <div className="mx-2">
              <Button
                variant="outline-dark"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 5 + "px",
                }}
                onClick={() => {
                  completeTask(thisId);
                }}
              >
                Mark as Complete <TiTick size={25} />
              </Button>
            </div>
          </div>
          <br></br>
          <Comments taskId={thisId} comments={comments} />
          <AddComment taskId={thisId} />
        </Form>
      </Modal>
      <br></br>
    </div>
  );
};

EditTask.propTypes = {
  thisTask: PropTypes.string.isRequired,
  boards: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  thisBoard: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  thisId: PropTypes.string.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  completeTask: PropTypes.func.isRequired,
  thisDescription: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      photo: PropTypes.bool.isRequired,
      comment: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default EditTask;
