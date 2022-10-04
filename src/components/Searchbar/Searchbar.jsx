import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import s from './Searchbar.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [name, setName] = useState('');
  // const [page, setPage] = useState(1);

  const inputChange = e => {
    setName(e.currentTarget.value.toLowerCase());
  };

  const resetForm = () => {
    setName('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (name.trim() === '') {
      return toast.error('Input search images and photos', {
        position: 'top-center',
        autoClose: 2000,
      });
    }

    onSubmit(name, 1);
    resetForm();
  };

  return (
    <>
      <header>
        <div className={s.searchbar}>
          <form className={s.searchForm} onSubmit={handleSubmit}>
            <button type="submit" className={s.searchForm_button}>
              <span className={s.searchForm_button_label}>
                <ImSearch size={14} />
              </span>
            </button>

            <input
              className={s.searchForm_input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={name}
              onChange={inputChange}
            />
          </form>
        </div>
      </header>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
