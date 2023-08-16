import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { fetchInitialImages, fetchMoreImages } from './Pixabay/Pixabay';

class App extends Component {
  state = {
    searchQuery: '',
    gallery: [],
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.searchQuery !== prevState.searchQuery
    ) {
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    if (!query) {
      return;
    }

    this.setState({ searchQuery: query, gallery: [], page: 1 });
  };

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    if (!searchQuery) {
      return;
    }

    const fetchFunction = page === 1 ? fetchInitialImages : fetchMoreImages;

    this.setState({ isLoading: true });

    fetchFunction(searchQuery, page)
      .then(data => {
        const imagesWithLargerSizes = data.map(image => ({
          ...image,
          webformatURL: image.largeImageURL,
        }));


        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...imagesWithLargerSizes],
        }));
      })
      .catch(error => console.error('Error fetching images:', error))
      .finally(() => {
        this.setState({ isLoading: false });
        if (page === 1) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      });
  };

  toggleModal = (imageURL = '') => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      selectedImage: imageURL,
    }));
  };

  render() {
    const { gallery, isLoading, showModal, selectedImage, loadMore} = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={gallery}
          toggleModal={this.toggleModal}
        />
        {isLoading && <Loader />}
        {showModal && <Modal onClose={this.toggleModal} largeImageURL={selectedImage} />}
        {loadMore &&(
          <Button onClick={this.fetchImages} />
        )}
      </div>
    );
  }
}

export default App;
