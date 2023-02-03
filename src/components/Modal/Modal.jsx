import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, largeImageURL }) => {
  useEffect(() => {
    const handleClickByEscape = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleClickByEscape);

    return () => {
      window.removeEventListener('keydown', handleClickByEscape);
    };
  }, [onClose]);

  const handleClickByOverlay = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleClickByOverlay}>
      <div className={css.modal}>
        {/* {this.props.children} */}
        <img alt="" src={largeImageURL} className={css.image} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
