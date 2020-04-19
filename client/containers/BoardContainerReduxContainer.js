import { fetchBoards, fetchTasks } from "../actions";
import BoardContainer from "../components/BoardContainer";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  console.log("Board Container Fetching boards:state from redux", state.boards);
  return {
    boards: state.boards,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchBoards: () => dispatch(fetchBoards()),
  fetchTasks: () => dispatch(fetchTasks()),
});

const BoardContainerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer);
export default BoardContainerRedux;
