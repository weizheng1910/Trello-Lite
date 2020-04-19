import { connect } from "react-redux";
import Board from "../components/Board";
import { deleteBoard } from "../actions";

const mapStateToProps = (state, ownProps) => {
  console.log("Fetching board details of:", ownProps.board);
  console.log(state);
  return {
    tasks: state.tasks,
    board: ownProps.board,
    boardId: ownProps.iden,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteBoard: (id) => dispatch(deleteBoard(id)),
});

const BoardRedux = connect(mapStateToProps, mapDispatchToProps)(Board);
export default BoardRedux;
