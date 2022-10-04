import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import FetchImages from '../axiosCongif';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import s from './App.module.css';

export default function App() {
  const [name, setName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    FetchImages(name, page)
      .then(res => {
        setSearchResults(
          page === 1 ? res.data.hits : [...searchResults, ...res.data.hits]
        );
        setStatus('resolved');
        setTotalPages(Math.ceil(res.data.totalHits / 12));
      })
      .catch(error => console.log(error))
      .finally(() => {
        if (page === 1) window.scrollTo(0, 0);
      });
  }, [name, page]);

  const getSubmitName = (name, page) => {
    setName(name);
    setPage(page);
    setStatus('pending');
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
    setStatus('pending');
  };

  const openModal = idName => {
    const URL = searchResults.find(({ id }) => id === idName);
    setUrl(URL?.largeImageURL);
  };

  const handleToggleModal = () => {
    setShowModal(prev => !prev);
    // return this.setState(prev => ({
    //   showModal: !prev.showModal,
    // }));
  };

  return (
    <div>
      <Searchbar onSubmit={getSubmitName} />
      {totalPages === 0 && <p className={s.text}>Enter the correct name</p>}
      <ImageGallery
        searchResults={searchResults}
        toggle={handleToggleModal}
        openModal={openModal}
      />

      {totalPages !== 0 && page !== totalPages && status === 'resolved' && (
        <Button onClick={loadMore} />
      )}

      {status === 'pending' && <Loader />}
      {showModal && (
        <Modal getFind={url} onClose={handleToggleModal}>
          <img src={url} alt="" />
        </Modal>
      )}
    </div>
  );
}
