import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { fetchImages } from "../../images-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEndOfCollection, setIsEndOfCollection] = useState(false);

  useEffect(() => {
    if (query === "") {
      return;
    }
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchImages(query, page);
        setImages((prevImages) => {
          return [...prevImages, ...data];
        });
        if (data.length === 0) {
          setIsEndOfCollection(true);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  function openModal(image) {
    setSelectedImage(image);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setSelectedImage(null);
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && (
        <ImageGallery openModal={openModal} images={images} />
      )}
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && !isEndOfCollection && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        imageUrl={selectedImage}
      />
    </div>
  );
}
