import React from "react";
import { FiCheck, FiEdit3, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { removeTodo, toggleDone } from "../../../store/todo/reducer";
import styles from "../../../styles/todo.module.scss";
import IconButton from "../../IconButton";
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
    <li className={styles.ToDo} key={createdAt}>
      <span>
        <strong>{title}</strong>
        <p>{description}</p>
      </span>
      <IconButton done={done} onClick={handleDone}>
        <FiCheck />
      </IconButton>
      <IconButton onClick={() => handleEditModalToggle(createdAt)}>
        <FiEdit3 />
      </IconButton>
      <IconButton onClick={handleRemove}>
        <FiTrash2 />
      </IconButton>
    </li>
  );
};

export default ToDo;
