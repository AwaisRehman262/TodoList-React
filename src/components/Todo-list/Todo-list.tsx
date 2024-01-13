import { FC } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import "./style.css";

export const Todolist: FC = () => {
  interface Todo {
    id: string;
    todo: string;
  }

  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  let [todoArray, setTodoArray] = useState<Todo[]>([]);
  let [inputValue, setInputValue] = useState<string>("");
  let [isAlerted, setIsAlerted] = useState<boolean>(false);

  const addTodo = (todo: string) => {
    if (todo.trim() !== "") {
      const newTodo: Todo = {
        id: uuidv4(),
        todo: todo,
      };

      setTodoArray([...todoArray, newTodo]);
      setInputValue("");
      setIsAlerted(false);
    } else {
      setIsAlerted(true);
    }
  };

  const startEditing = (id: string) => {
    const todoToEdit = todoArray.find((todo: Todo) => todo.id === id);
    if (todoToEdit) {
      setEditingTodoId(id);
      setEditedTodoText(todoToEdit.todo);
    }
  };
  const saveEditedTodo = (id: string) => {
    const updatedTodoArray = todoArray.map((todo: Todo) =>
      todo.id === id ? { ...todo, todo: editedTodoText } : todo
    );

    setTodoArray(updatedTodoArray);
    setEditingTodoId(null);
    setEditedTodoText("");
  };

  const delTodo = (id: string) => {
    const newtodoArray = todoArray.filter((todo: Todo) => {
      return todo.id !== id;
    });

    setTodoArray(newtodoArray);
  };

  return (
    <div className="mainDiv">
      <div className="headerWrapper">
        <h3>TodoList</h3>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button onClick={() => addTodo(inputValue)} className="addButton">
          <AddIcon />{" "}
        </button>
        <p
          style={{
            color: "red",
            fontWeight: "600",
            display: isAlerted ? "block" : "none",
          }}
        >
          Todo field can't be empty
        </p>
      </div>
      <ul>
        {todoArray.map((todo: any) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                />
                <button
                  onClick={() => saveEditedTodo(todo.id)}
                  className="saveButton"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {todo.todo}
                <div className="buttonDiv">
                  <button
                    onClick={() => delTodo(todo.id)}
                    className="addEditButton"
                  >
                    <DeleteIcon />{" "}
                  </button>
                  <button
                    onClick={() => startEditing(todo.id)}
                    className="addEditButton"
                  >
                    <EditIcon />{" "}
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
