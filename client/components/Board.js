import React from "react";
import EditTaskRedux from "../containers/EditTaskReduxContainer";
import TaskInputRedux from "../containers/TaskInputReduxContainer";
import { Card, Row, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";

let Board = ({ deleteBoard, boardId, board, tasks }) => {
  return (
    <Card className="card-board mr-2 mb-2 col-4 d-flex flex-column justify-content-between">
      <div>
        <Row>
          <Col sm={9}>
            <h5>{board}</h5>
          </Col>
          <Col sm={3}>
            <MdClose
              className="remove-board"
              onClick={(e) => {
                e.preventDefault();
                deleteBoard(boardId);
              }}
            />
          </Col>
        </Row>
        {tasks
          .filter((task) => task.board == board)
          .map((task) => (
            <EditTaskRedux
              key={task._id}
              id={task._id}
              task={task.task}
              completed={task.completed}
              comments={task.comments}
              description={task.description}
              board={board}
            />
          ))}
      </div>

      <div
        style={{
          marginLeft: 4 + "px",
          marginBottom: 2 + "px",
          height: 65 + "px",
          overflow: "hidden",
        }}
      >
        <TaskInputRedux board={board} />
      </div>
    </Card>
  );
};

Board.propTypes = {
  board: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      task: PropTypes.string.isRequired,
      board: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  fetchTasks: PropTypes.func.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  boardId: PropTypes.string.isRequired,
};

export default Board;
