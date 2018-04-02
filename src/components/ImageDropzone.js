import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

const dropzoneStyle = {
  width: 400,
  height: 100,
  border: '3px solid #000000',
  backgroundColor: '#999999',
  paddingTop: 84,
  marginTop: 10,
  textAlign: 'center',
  fontSize: 16,
};

export default function ImageDropzone(props) {
  return (
    <Dropzone {...props} style={dropzoneStyle} accept="image/jpeg, image/png" />
  );
}
