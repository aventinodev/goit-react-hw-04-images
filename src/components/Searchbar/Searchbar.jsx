import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import css from './SearchBar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [imageRequest, setImageRequest] = useState('');

  const handleChange = e => {
    setImageRequest(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (imageRequest.trim() === '') {
      return toast.warn('Enter your regust', {
        theme: 'colored',
        position: 'top-center',
      });
    }

    onSubmit(imageRequest);

    // setImageRequest('');
    e.target.reset();
  };

  return (
    <header className={css.bar}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <ImSearch color="#212121" size={16} />
        </button>

        <input
          onChange={handleChange}
          className={css.input}
          name="imageRequest"
          value={imageRequest}
          type="text"
          autoComplete="on"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
