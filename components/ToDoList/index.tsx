import React, { useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo } from "../../store/todo/reducer";
import ToDo from "./ToDo";
import styles from "../../styles/todo-list.module.scss";
import Button from "../IconButton";
import { FiPlus } from "react-icons/fi";
import ModalForm from "./ModalForm";

const emptyTodo: IModalData = { description: "", title: "" };

const TodoList: React.FC = () => {
  const todoList = useSelector((state: { todo: IToDo[] }) => state.todo);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<IModalType>("add");
  const [modalData, setModalData] = useState<IModalData>(emptyTodo);

  const emptyForm = useMemo(
    () =>
      (modalData.title === "" && modalData.description === "") ||
      modalData === emptyTodo ||
      modalData === Object.assign(emptyTodo, { key: "" }),
    [modalData]
  );
  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  const handleModalClose = () => {
    setModalData(emptyTodo);
    setIsModalOpen(false);
    setModalType("add");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setModalData({ ...modalData, [e.target.name]: e.target.value });

  const handleAddToDo = () => {
    dispatch(addTodo({ ...modalData }));
    handleModalClose();
  };

  const handleEditToDo = () => {
    dispatch(
      editTodo({
        title: modalData.title,
        description: modalData.description,
        // bad implementation but needed because I use createdAt property as key, in a real app I would use a real key with UUID
        key: modalData.key || "",
      })
    );
    handleModalClose();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emptyForm) return;
    modalType === "add" ? handleAddToDo() : handleEditToDo();
  };

  const handleEditModalToggle = (key: string) => {
    setModalType("edit");
    const { title, description } = todoList.find(
      (todo) => todo.createdAt === key
    )!;
    setModalData({ title, description, key });
    handleModalToggle();
  };

  return (
    <section className={styles.ToDoList}>
      <header>
        <h1>To Do List</h1>
        <Button onClick={handleModalToggle}>
          <FiPlus />
        </Button>
      </header>
      <ul>
        {todoList.map((item) => (
          <ToDo
            {...item}
            handleEditModalToggle={handleEditModalToggle}
            key={item.createdAt}
          />
        ))}
      </ul>
      <ModalForm
        type={modalType}
        isModalOpen={isModalOpen}
        data={modalData}
        enableSubmit={!emptyForm}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        handleModalClose={handleModalClose}
      />
    </section>
  );
};

export default TodoList;
