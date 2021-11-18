import React from "react";
import { FiX } from "react-icons/fi";
import ReactModal from "react-modal";
import styles from "../../../styles/modal.module.scss";
import IconButton from "../../IconButton";

interface ModalFormProps {
  isModalOpen: boolean;
  enableSubmit: boolean;
  handleModalClose: () => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  data: IModalData;
  type: IModalType;
}

const ModalForm: React.FC<ModalFormProps> = ({
  type,
  data,
  isModalOpen,
  enableSubmit,
  handleInputChange,
  handleFormSubmit,
  handleModalClose,
}) => {
  return (
    <ReactModal
      isOpen={isModalOpen}
      onAfterClose={handleModalClose}
      className={styles.Modal}
    >
      <form onSubmit={handleFormSubmit}>
        <header>
          <h2>{type} To Do</h2>
          <IconButton>
            <FiX onClick={handleModalClose} />
          </IconButton>
        </header>
        <label>
          <strong>Title</strong>
          <input name="title" value={data.title} onChange={handleInputChange} />
        </label>
        <label>
          <strong>Description</strong>
          <textarea
            name="description"
            value={data.description}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" disabled={!enableSubmit}>
          {type}
        </button>
      </form>
    </ReactModal>
  );
};

export default ModalForm;
