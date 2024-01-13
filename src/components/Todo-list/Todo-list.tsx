import { FC } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./style.css";

export const Todolist: FC = () => {
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  let [todoArray, setTodoArray] = useState<object[]>([]);
  let [inputValue, setInputValue] = useState<string>("");

  const addTodo = (todo: string) => {
    const newTodo = {
      id: uuidv4(),
      todo: todo,
    };

    setTodoArray([...todoArray, newTodo]);

    setInputValue("");
  };
  const startEditing = (id: number) => {
    const todoToEdit = todoArray.find((todo: any) => todo.id === id);
    if (todoToEdit) {
      setEditingTodoId(id);
      setEditedTodoText(todoToEdit.todo);
    }
  };
  const saveEditedTodo = (id: number) => {
    const updatedTodoArray = todoArray.map((todo: any) =>
      todo.id === id ? { ...todo, todo: editedTodoText } : todo
    );

    setTodoArray(updatedTodoArray);
    setEditingTodoId(null);
    setEditedTodoText("");
  };

  const delTodo = (id: number) => {
    const newtodoArray = todoArray.filter((todo: object) => {
      return todo.id !== id;
    });

    setTodoArray(newtodoArray);
  };

  return (
    <div className="mainDiv">
      <h3>TodoList</h3>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={() => addTodo(inputValue)}>Add</button>
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
                <button onClick={() => saveEditedTodo(todo.id)}>Save</button>
              </>
            ) : (
              <>
                {todo.todo}
                <button onClick={() => delTodo(todo.id)}>&times;</button>
                <button onClick={() => startEditing(todo.id)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
