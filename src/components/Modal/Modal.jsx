import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export default function Modal({ children, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyUp);

    return function cleanup() {
      window.removeEventListener('keydown', handleKeyUp);
    };
  }, []);

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyUp);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyUp);
  // }

  const handleKeyUp = e => {
    if (e.code === 'Escape') {
      onClose();
      window.removeEventListener('keyup', handleKeyUp, false);
    }
  };

  const handleOutsideClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.overlay} onClick={handleOutsideClick}>
      <div className={s.modal}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
