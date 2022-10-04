import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ searchResults, toggle, openModal }) {
  return (
    <ul className={s.imageGallery}>
      {searchResults.map(({ id, webformatURL, user }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          webformatURL={webformatURL}
          user={user}
          toggle={toggle}
          openModal={openModal}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggle: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
