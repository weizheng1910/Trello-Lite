const initialState = {
  tasks: [],
  boards: [],
  user: {},
};

function taskReducer(state = [], action) {
  switch (action.type) {
    case "FETCH_TASKS":
      return action.payload;

    case "ADD_TASK":
      return [...state, action.payload];

    case "EDIT_TASK":
      return state.map((elem) =>
        elem._id == action.payload._id
          ? {
              ...elem,
              task: action.payload.task,
              board: action.payload.board,
              description: action.payload.description,
            }
          : elem
      );

    case "DELETE_TASK":
      return state.filter((elem) => elem._id !== action.payload._id);

    case "COMPLETE_TASK":
      return state.map((elem) =>
        elem._id == action.payload._id
          ? { ...elem, completed: !elem.completed }
          : elem
      );

    case "ADD_COMMENT":
      return state.map((elem) =>
        elem._id == action.payload._id
          ? { ...elem, comments: action.payload.comments }
          : elem
      );

    case "DELETE_COMMENT":
      return state.map((elem) =>
        elem._id == action.payload._id
          ? { ...elem, comments: action.payload.comments }
          : elem
      );

    default:
      return state;
  }
}

function boardReducer(state = [], action) {
  switch (action.type) {
    case "DELETE_BOARD":
      return state.filter((elem) => elem._id !== action.payload._id);

    case "FETCH_BOARDS":
      return action.payload;

    case "ADD_BOARD":
      return [...state, action.payload];

    default:
      return state;
  }
}

function userReducer(state = {}, action) {
  switch (action.type) {
    case "FETCH_USER":
      return {
        ...state,
        name: action.payload.name,
        photo: action.payload.photo,
      };

    default:
      return state;
  }
}

export default function Reducer(state = initialState, action) {
  return {
    tasks: taskReducer(state.tasks, action),
    boards: boardReducer(state.boards, action),
    user: userReducer(state.user, action),
  };
}
