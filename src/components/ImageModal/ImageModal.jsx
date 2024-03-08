import Modal from "react-modal";
import css from "./ImageModal.module.css";

export default function ImageModal({ isOpen, onRequestClose, imageUrl }) {
  return (
    <div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          className={css.modal}
          overlayClassName={css.overlay}
        >
          <img src={imageUrl} className={css.img} />
        </Modal>
      )}
    </div>
  );
}
