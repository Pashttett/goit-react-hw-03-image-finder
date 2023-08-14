import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { fetchInitialImages, fetchMoreImages } from './Pixabay/Pixabay';

class App extends Component {
  state = {
    value: '',
    gallery: [],
    page: 1,
    isLoading: false,
    modalActive: false,
    clickedImageUrl: '',
    loadMore: false,
    notFoundText: false,
  };

  async componentDidUpdate(_, prevState) {
    const { value, page } = this.state;

    if (prevState.value !== value) {
      this.setState({
        isLoading: true,
        loadMore: false,
        gallery: [],
        notFoundText: false,
        page: 1,
      });

      try {
        const imagesWithLargerSizes = await fetchInitialImages(value, page);
        this.setState({ gallery: imagesWithLargerSizes });

        if (imagesWithLargerSizes.length === 12) {
          this.setState({
            loadMore: true,
            isLoading: false,
          });
        } else if (imagesWithLargerSizes.length === 0) {
          this.setState({
            isLoading: false,
            notFoundText: true,
          });
        } else {
          this.setState({
            loadMore: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        this.setState({
          isLoading: false,
          notFoundText: true,
        });
      }
    }

    if (prevState.page !== page) {
      try {
        const newImagesWithLargerSizes = await fetchMoreImages(value, page);
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...newImagesWithLargerSizes],
        }));
      } catch (error) {
        console.error('Error fetching more images:', error);
      }
    }
  }

  showModal = clickedImageUrl => {
    this.setState({ modalActive: true, clickedImageUrl });
  };

  closeModal = () => {
    this.setState({ modalActive: false, clickedImageUrl: '' });
  };

  handleSubmit = async value => {
    this.setState({ value });
  };

  handleLoadMore = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { gallery, isLoading, modalActive, clickedImageUrl, loadMore, notFoundText } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          images={gallery}
          toggleModal={this.showModal}
          loadMore={loadMore}
          notFoundText={notFoundText}
        />
        {loadMore && <Button onClick={this.handleLoadMore} />}
        {isLoading && <Loader />}
        {modalActive && <Modal onClose={this.closeModal} largeImageURL={clickedImageUrl} />}
      </div>
    );
  }
}

export default App;
