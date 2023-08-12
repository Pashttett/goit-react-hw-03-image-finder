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
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: '',
    hasMoreImages: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ page: 1, images: [], hasMoreImages: false }, () => {
        this.fetchInitialImages();
      });
    }
  }

  handleFormSubmit = query => {
    if (!query) {
      return;
    }

    this.setState({ searchQuery: query }, () => {
      this.fetchInitialImages();
    });
  };

  fetchInitialImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({ isLoading: true });

    fetchInitialImages(searchQuery, page)
      .then(imagesWithLargerSizes => {
        this.setState({
          images: imagesWithLargerSizes,
          hasMoreImages: imagesWithLargerSizes.length === 12,
        });
      })
      .catch(error => console.error('Error fetching images:', error))
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  fetchMoreImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({ isLoading: true });

    fetchMoreImages(searchQuery, page + 1)
      .then(newImagesWithLargerSizes => {
        this.setState(prevState => ({
          images: [...prevState.images, ...newImagesWithLargerSizes],
          page: prevState.page + 1,
          hasMoreImages: newImagesWithLargerSizes.length === 12,
        }));
      })
      .catch(error => console.error('Error fetching images:', error))
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  toggleModal = (imageURL = '') => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      selectedImage: imageURL,
    }));
  };

  render() {
    const { images, isLoading, showModal, selectedImage, hasMoreImages } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} toggleModal={this.toggleModal} />
        {hasMoreImages && <Button onClick={this.fetchMoreImages} />}
        {isLoading && <Loader />}
        {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={selectedImage} />
        )}
      </div>
    );
  }
}

export default App;
