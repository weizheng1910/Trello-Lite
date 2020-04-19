import React, { useState } from "react";
import PropTypes from "prop-types";
import { addComment } from "../actions";
import { connect } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";

let AddComment = ({ addComment, taskId }) => {
  let comment;
  let commentInputDOM = React.createRef();
  let errorMessage = isInputEmpty ? (
    <small className="text-danger">Input shouldn&apos;t be empty</small>
  ) : (
    <div></div>
  );

  const [isInputEmpty, setIsInputEmpty] = useState(false);

  return (
    <div className="mx-2">
      <Form class="mx-2">
        <Form.Group as={Row}>
          <Col>
            <Form.Control placeholder="Comment..." ref={commentInputDOM} />
            {errorMessage}
          </Col>
          <Col>
            <Button
              variant="outline-dark"
              onClick={(e) => {
                e.preventDefault();

                if (!commentInputDOM.current.value) {
                  setIsInputEmpty(true);
                  return;
                }

                setIsInputEmpty(false);
                comment = commentInputDOM.current.value.trim();
                console.log("taskId", taskId);
                console.log("comment", comment);
                addComment(taskId, comment);
                commentInputDOM.current.value = "";
              }}
            >
              Save
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    taskId: ownProps.taskId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addComment: (taskId, comment) => dispatch(addComment(taskId, comment)),
});

AddComment.propTypes = {
  taskId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
};

AddComment = connect(mapStateToProps, mapDispatchToProps)(AddComment);
export default AddComment;
