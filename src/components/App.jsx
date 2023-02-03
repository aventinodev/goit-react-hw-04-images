import { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

import { searchImages } from '../services/fetchApi';

import '../index.css';
import css from './App.module.css';

const App = () => {
  const [imageRequest, setImageRequest] = useState('');
  const [page, setPage] = useState(1);
  const [totalPhoto, setTotalPhoto] = useState(1);
  const [arrayPhotos, setArrayPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');

  const perPage = 12;

  useEffect(() => {
    if (!imageRequest) {
      return;
    }
    setLoading(true);
    searchImages(imageRequest, page)
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          setArrayPhotos([]);
          showMessage();
        }

        const arrayPhotosNew = hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => {
            return {
              id,
              webformatURL,
              largeImageURL,
              tags,
            };
          }
        );
        setArrayPhotos(arrayPhotos => [...arrayPhotos, ...arrayPhotosNew]);
        setTotalPhoto(totalHits);
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, [imageRequest, page]);

  const handleFormSubmit = data => {
    if (imageRequest !== data) {
      setImageRequest(data);
      setPage(1);
      setArrayPhotos([]);
      setShowModal(false);
    }
  };

  const loadMore = () => {
    setPage(page => page + 1);
    setLoading(true);
  };

  const showMessage = imageRequest => {
    return toast.error(`We did not find such ${imageRequest} photos`, {
      theme: 'colored',
      position: 'top-center',
    });
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const isImages = arrayPhotos.length > 0;
  const isAddLoadBtn = !loading && totalPhoto - (page - 1) * perPage > perPage;

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />

      {isImages && <ImageGallery images={arrayPhotos} openModal={openModal} />}
      {loading && <Loader />}
      {error && <p className={css.message}>Somthing wrong. Try again</p>}

      {!imageRequest && <p className={css.message}>Enter your request</p>}

      {isAddLoadBtn && <Button onClick={loadMore} />}

      {showModal && (
        <Modal onClose={closeModal} largeImageURL={largeImageURL} />
      )}
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default App;
