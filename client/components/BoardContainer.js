import React, { useEffect } from "react";
import BoardRedux from "../containers/BoardReduxContainer";

let BoardContainer = ({ fetchTasks, fetchBoards, boards }) => {
  useEffect(() => {
    fetchTasks();
    fetchBoards();
  }, []);

  return boards.map((board) => (
    <BoardRedux key={board._id} iden={board._id} board={board.board} />
  ));
};

export default BoardContainer;
