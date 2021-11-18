import React from "react";
import { useDispatch } from "react-redux";
import { removeTodo, toggleDone } from "../../../store/todo/reducer";
import { IToDo } from "../../../store/todo/types/IToDo";

type ToDoListItemProps = IToDo & {
  handleEditModalToggle: (key: string) => void;
};

const ToDo: React.FC<ToDoListItemProps> = ({
  title,
  description,
  done,
  createdAt,
  handleEditModalToggle,
}) => {
  const dispatch = useDispatch();

  const handleDone = () => dispatch(toggleDone(createdAt));
  const handleRemove = () => dispatch(removeTodo(createdAt));

  return (
    <li key={createdAt}>
      <strong>{title}</strong>
      <p>{description}</p>
      <button onClick={handleDone}>{done ? "Done" : "Not Done"}</button>
      <button onClick={() => handleEditModalToggle(createdAt)}>edit</button>
      <button onClick={handleRemove}>remove</button>
    </li>
  );
};

export default ToDo;
