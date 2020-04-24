import React from "react";
import AddBoard from "./AddBoard";
import BoardContainerRedux from "../containers/BoardContainerReduxContainer";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <br></br>
      <AddBoard />
      <br></br>
      <div className="row mx-3">
        <BoardContainerRedux />
      </div>
    </div>
  );
};

if (module.hot) {
 module.hot.accept('./AddBoard', function() {
   console.log('AddBOARD!');
 })
}

export default App;