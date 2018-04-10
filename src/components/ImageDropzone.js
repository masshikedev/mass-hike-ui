import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { uploadImage } from '../api/imageUploads';
import { P } from '../style';

const dropzoneStyle = {
  width: 400,
  height: 100,
  border: '3px solid #000000',
  backgroundColor: '#dddddd',
  paddingTop: 84,
  marginTop: 10,
  textAlign: 'center',
  fontSize: 16,
  marginBottom: 10,
};

class ImageDropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    const { onUploadAttempt, onUploadSuccess, onUploadError } = this.props;
    onUploadAttempt();
    if (rejectedFiles.length > 0) {
      onUploadError();
      return this.setState({
        error: 'Invalid file. Please select a jpeg or png.',
      });
    }
    this.setState({
      error: '',
    });
    const file = acceptedFiles[0];
    const data = new FormData();
    data.append('image', file);
    uploadImage(data)
      .then(response => {
        onUploadSuccess(response.data.imageUrl);
      })
      .catch(() => {
        onUploadError();
        this.setState({ error: 'Error uploading image' });
      });
  };

  render() {
    const { children } = this.props;
    const { error } = this.state;
    return (
      <Dropzone
        onDrop={this.onDrop}
        style={dropzoneStyle}
        accept="image/jpeg, image/png"
      >
        <P error>{error}</P>
        {children}
      </Dropzone>
    );
  }
}

export default ImageDropzone;
