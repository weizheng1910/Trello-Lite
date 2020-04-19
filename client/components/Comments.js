import React from "react";
import { connect } from "react-redux";
import { Toast, Form } from "react-bootstrap";
import { FaList } from "react-icons/fa";
import { deleteComment } from "../actions";
import PropTypes from "prop-types";

let Comments = ({ taskId, comments, deleteComment }) => {
  console.log(comments);
  return (
    <div className="mx-2 my-4">
      <Form.Label>
        <FaList size={20} /> Activities
      </Form.Label>
      {comments.map((elem) => (
        <div key={elem.comment} className="d-flex flex-row my-2">
          <div>
            <img className="comment-image" src={elem.photo} />
          </div>
          <Toast
            className="mx-2"
            onClose={() => {
              deleteComment(taskId, elem.comment);
            }}
            style={{ minWidth: 400 + "px" }}
          >
            <Toast.Header closeButton={true}>
              <strong className="mr-auto">{elem.name}</strong>
              <small>{elem.date}</small>
            </Toast.Header>
            <Toast.Body>{elem.comment}</Toast.Body>
          </Toast>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    comments: ownProps.comments,
    taskId: ownProps.taskId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (taskId, comment) =>
      dispatch(deleteComment(taskId, comment)),
  };
};

Comments.propTypes = {
  taskId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      photo: PropTypes.bool.isRequired,
      comment: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  deleteComment: PropTypes.func.isRequired,
};

Comments = connect(mapStateToProps, mapDispatchToProps)(Comments);
export default Comments;
