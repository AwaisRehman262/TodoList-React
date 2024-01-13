import { Fragment } from "react";
import "./App.css";
import { Todolist } from "./components/Todo-list/Todo-list";

function App() {
  return (
    <Fragment>
      <Todolist />
      <p className="coderName">Created by:AwaisRehman</p>
    </Fragment>
  );
}

export default App;
