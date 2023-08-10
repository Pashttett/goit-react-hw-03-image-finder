import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';


class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchInitialImages();
    }
  }

  handleFormSubmit = query => {
    if (!query) {
      return;
    }

    this.setState({ searchQuery: query, page: 1, images: [] }, () => {
      this.fetchInitialImages();
    });
  };

  fetchInitialImages = () => {
    const { searchQuery, page } = this.state;
    const API_KEY = '38718040-cf73f251e75bc23227b130d01';
    const URL = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        if (data.hits && data.hits.length > 0) {
          const imagesWithLargerSizes = data.hits.map(image => ({
            ...image,
            webformatURL: image.largeImageURL,
          }));
          this.setState({ images: imagesWithLargerSizes });
        }
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
    const API_KEY = '38718040-cf73f251e75bc23227b130d01';
    const URL = `https://pixabay.com/api/?q=${searchQuery}&page=${page + 1}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        if (data.hits && data.hits.length > 0) {
          const imagesWithLargerSizes = data.hits.map(image => ({
            ...image,
            webformatURL: image.largeImageURL,
          }));
          this.setState(prevState => ({
            images: [...prevState.images, ...imagesWithLargerSizes],
            page: prevState.page + 1,
          }));
        }
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
    const { images, isLoading, showModal, selectedImage } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} toggleModal={this.toggleModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.fetchMoreImages} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={selectedImage} />
        )}
      </div>
    );
  }
}

export default App;
