import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBoard } from "../actions";

import { Button, Form, Row, Col } from "react-bootstrap";

let AddBoard = ({ dispatch }) => {
  let board;
  let boardInputDOM = React.createRef();
  let errorMessage = isInputEmpty ? (
    <small className="text-danger">Input shouldn&apos;t be empty</small>
  ) : (
    <div></div>
  );

  const [isInputEmpty, setIsInputEmpty] = useState(false);

  return (
    <div className="mx-3 row">
      <Form class="mx-3 col-6">
        <Row>
          <Col sm={10}>
            <Form.Control
              placeholder="New Board..."
              id="board"
              ref={boardInputDOM}
            />
            {errorMessage}
          </Col>

          <Col sm={2}>
            <Button
              variant="outline-dark"
              onClick={(e) => {
                e.preventDefault();

                if (!boardInputDOM.current.value) {
                  setIsInputEmpty(true);
                  return;
                }

                setIsInputEmpty(false);
                board = boardInputDOM.current.value;
                dispatch(addBoard(board));
                boardInputDOM.current.value = "";
              }}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

AddBoard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

AddBoard = connect()(AddBoard);
export default AddBoard;
