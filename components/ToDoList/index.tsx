import React, { useState } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo } from "../../store/todo/reducer";
import { IToDo, IToDoEssencial } from "../../store/todo/types/IToDo";
import ToDo from "./ToDo";

type IModalData = IToDoEssencial & { key?: string };

const TodoList: React.FC = () => {
  const todoList = useSelector((state: { todo: IToDo[] }) => state.todo);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [modalData, setModalData] = useState<IModalData>({} as IModalData);

  const handleModalToggle = () => setIsModalOpen(!isModalOpen);

  const handleModalClose = () => {
    setModalData({ title: "", description: "", key: "" });
    setIsModalOpen(false);
    setModalType("add");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setModalData({ ...modalData, [e.target.name]: e.target.value });

  const handleAddToDo = () => {
    dispatch(addTodo({ ...modalData }));
    handleModalToggle();
  };

  const handleEditToDo = () => {
    console.log(modalData);
    dispatch(
      editTodo({
        title: modalData.title,
        description: modalData.description,
        key: modalData.key || "", // bad implementation but needed because I use the created at as key
      })
    );
    handleModalClose();
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <section>
      <header>
        <strong>To Do List</strong>
        <button onClick={handleModalToggle}>+</button>
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
      <ReactModal isOpen={isModalOpen} onAfterClose={handleModalClose}>
        <form onSubmit={handleFormSubmit}>
          <label>
            <strong>Title</strong>
            <input
              name="title"
              value={modalData.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <strong>Description</strong>
            <textarea
              name="description"
              value={modalData.description}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Add</button>
        </form>
      </ReactModal>
    </section>
  );
};

export default TodoList;
