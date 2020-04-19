import { connect } from "react-redux";
import { editTask, deleteTask, completeTask } from "../actions";
import EditTask from "../components/EditTask";

const mapStateToProps = (state, ownProps) => {
  return {
    thisTask: ownProps.task,
    boards: state.boards,
    thisBoard: ownProps.board,
    thisId: ownProps.id,
    completed: ownProps.completed,
    thisDescription: ownProps.description,
    comments: ownProps.comments,
  };
};

const mapDispatchToProps = (dispatch) => ({
  editTask: (task) => dispatch(editTask(task)),
  deleteTask: (id) => dispatch(deleteTask(id)),
  completeTask: (id) => dispatch(completeTask(id)),
});

const EditTaskRedux = connect(mapStateToProps, mapDispatchToProps)(EditTask);
export default EditTaskRedux;
