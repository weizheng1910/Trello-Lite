import axios from "axios";

export const fetchTasks = () => async (dispatch) => {
  const result = await axios.get("api/tasks");
  dispatch({ type: "FETCH_TASKS", payload: result.data });
};

export const fetchBoards = () => async (dispatch) => {
  const result = await axios.get("api/boards");
  dispatch({ type: "FETCH_BOARDS", payload: result.data });
};

export const fetchUser = () => async (dispatch) => {
  const result = await axios.get("api/user");
  dispatch({ type: "FETCH_USER", payload: result.data });
};

export const addTask = (task) => async (dispatch) => {
  const result = await axios.post("api/tasks", task);
  dispatch({ type: "ADD_TASK", payload: result.data });
};

export const editTask = (task) => async (dispatch) => {
  const result = await axios.put(`api/tasks/${task._id}/edit`, task);
  dispatch({ type: "EDIT_TASK", payload: result.data });
};

export const deleteTask = (id) => async (dispatch) => {
  const result = await axios.delete(`api/tasks/${id}`);
  dispatch({ type: "DELETE_TASK", payload: result.data });
};

export const completeTask = (id) => async (dispatch) => {
  const result = await axios.put(`api/tasks/${id}`);
  dispatch({ type: "COMPLETE_TASK", payload: result.data });
};

export const addBoard = (board) => async (dispatch) => {
  const result = await axios.post(`api/boards`, { board });
  dispatch({ type: "ADD_BOARD", payload: result.data });
};

export const addComment = (taskId, comment) => async (dispatch) => {
  const result = await axios.post(`/api/tasks/${taskId}/comments/`, {
    comment,
  });
  dispatch({ type: "ADD_COMMENT", payload: result.data });
};

export const deleteBoard = (id) => async (dispatch) => {
  const result = await axios.delete(`api/boards/${id}`);
  dispatch({ type: "DELETE_BOARD", payload: result.data });
};

export const deleteComment = (taskId, comment) => async (dispatch) => {
  const result = await axios.delete(`api/tasks/${taskId}/comments/${comment}`);
  dispatch({ type: "DELETE_COMMENT", payload: result.data });
};
