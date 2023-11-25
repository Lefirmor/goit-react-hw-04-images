import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query && page === 1) {
      setImages([]);
      setTotalHits(null);
      setLoader(true);

      fetch(
        `https://pixabay.com/api/?q=${query}&page=1&key=33669758-051ccdd3e1f8c77fcf59fb873&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          return res.json();
        })
        .then(images => {
          const { hits, totalHits } = images;
          const shortenHits = shortenData(hits);

          setImages(shortenHits);
          setTotalHits(totalHits);
        })
        .finally(() => setLoader(false));
    }
    if (page > 1) {
      fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=33669758-051ccdd3e1f8c77fcf59fb873&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(images => {
          const { hits } = images;
          const shortenHits = shortenData(hits);

          setImages(prev => [...prev, ...shortenHits]);
        });
    }
  }, [query, page]);

  const shortenData = array =>
    array.map(({ id, tags, webformatURL, largeImageURL }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
    }));

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handleSubmit = queryValue => {
    setQuery(queryValue);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />

      <ImageGallery
        loader={loader}
        images={images}
        totalHits={totalHits}
        onNextPage={handleNextPage}
      />
    </>
  );
};
