import React, { useState } from "react";
import PropTypes from "prop-types";

import { FaPlus } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";

let TaskInput = ({ currentBoard, addTask }) => {
  let task;
  let inputDOM = React.createRef();

  const [showModal, setModal] = useState(false);

  const [isInputEmpty, setIsInputEmpty] = useState(false);
  let errorMessage = isInputEmpty ? (
    <small className="text-danger">Input shouldn&apos;t be empty</small>
  ) : (
    <div></div>
  );

  return (
    <div>
      <br></br>
      <Button
        variant="outline-dark"
        onClick={() => {
          setModal(true);
        }}
      >
        <FaPlus size={15} /> New Task
      </Button>
      <Modal show={showModal} onHide={() => setModal(false)}>
        <Form className="m-2">
          <Form.Group>
            <Form.Label for="task">Task</Form.Label>
            <Form.Control id="task" ref={inputDOM} />
            {errorMessage}
          </Form.Group>

          <Button
            variant="outline-dark"
            onClick={(evt) => {
              evt.preventDefault();
              if (!inputDOM.current.value) {
                setIsInputEmpty(true);
                return;
              }

              setIsInputEmpty(false);
              task = inputDOM.current.value;

              addTask({
                task: task,
                board: currentBoard,
              });

              setModal(false);
            }}
          >
            Submit task
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

TaskInput.propTypes = {
  currentBoard: PropTypes.string.isRequired,
  addTask: PropTypes.func.isRequired,
};

export default TaskInput;
