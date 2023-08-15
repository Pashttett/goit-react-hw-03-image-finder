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
    loadMore: false,
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

    this.setState({ searchQuery: query, gallery: [], page: 1, loadMore: true });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loadMore: true,
    }));
  };

  fetchImages = () => {
    const { searchQuery, page, loadMore } = this.state;

    if (!searchQuery) {
      return;
    }

    if (loadMore) {
      const fetchFunction = page === 1 ? fetchInitialImages : fetchMoreImages;

      this.setState({ isLoading: true });

      fetchFunction(searchQuery, page)
        .then(imagesWithLargerSizes => {
          this.setState(prevState => ({
            gallery: page === 1 ? imagesWithLargerSizes : [...prevState.gallery, ...imagesWithLargerSizes],
            loadMore: imagesWithLargerSizes.length === 12,
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
    }
  };

  toggleModal = (imageURL = '') => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      selectedImage: imageURL,
    }));
  };

  render() {
    const { gallery, isLoading, showModal, selectedImage, loadMore } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={gallery} toggleModal={this.toggleModal} />
        {gallery.length > 0 && loadMore && (
          <Button onClick={this.handleLoadMore} />
        )}
        {isLoading && <Loader />}
        {showModal && <Modal onClose={this.toggleModal} largeImageURL={selectedImage} />}
      </div>
    );
  }
}

export default App;
