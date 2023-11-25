import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import Notiflix from 'notiflix';

export const ImageGallery = ({ totalHits, images, loader, onNextPage }) => {
  return (
    <>
      {totalHits === 0 && Notiflix.Notify.failure('no images found')}

      {images && (
        <ImageGalleryList>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              alt={image.tags}
            />
          ))}
        </ImageGalleryList>
      )}

      {loader && <Loader />}

      {totalHits > images.length && <Button onClick={onNextPage} />}
    </>
  );
};

ImageGallery.propTypes = {
  totalHits: PropTypes.number,
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      largeImageURL: PropTypes.string,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
  loader: PropTypes.bool,
  onNextPage: PropTypes.func,
};
