import { connect } from "react-redux";
import { addTask } from "../actions";
import TaskInput from "../components/TaskInput";

const mapStateToProps = (state, ownProps) => {
  console.log("TaskInput is fetching state, taskInput is of", ownProps.board);
  return {
    boards: state.boards,
    currentBoard: ownProps.board,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addTask: (task) => dispatch(addTask(task)),
});

const TaskInputRedux = connect(mapStateToProps, mapDispatchToProps)(TaskInput);
export default TaskInputRedux;
