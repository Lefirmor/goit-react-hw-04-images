import PropTypes from 'prop-types';
import { useState } from 'react';
import { Item, Img } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, alt }) => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Item onClick={handleToggleModal}>
        <Img src={webformatURL} alt={alt} />
      </Item>

      {showModal && (
        <Modal
          toggleModal={handleToggleModal}
          largeImageURL={largeImageURL}
          alt={alt}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
