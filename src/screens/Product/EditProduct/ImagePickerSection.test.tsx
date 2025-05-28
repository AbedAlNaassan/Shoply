// ImagePickerSection.test.tsx

import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ImagePickerSection from './ImagePickerSection'; // Adjust path if needed

describe('ImagePickerSection', () => {
  const mockStyles = {
    imagePickerButtons: {},
    link: {},
    imagesContainer: {},
    image: {width: 50, height: 50},
  };

  const mockOnPickImage = jest.fn();

  it('renders without crashing', () => {
    const {getByText} = render(
      <ImagePickerSection
        images={[]}
        existingImageUrls={[]}
        onPickImage={mockOnPickImage}
        styles={mockStyles}
      />,
    );

    expect(getByText('Pick from Gallery')).toBeTruthy();
  });

  it('calls onPickImage when button is pressed', () => {
    const {getByText} = render(
      <ImagePickerSection
        images={[]}
        existingImageUrls={[]}
        onPickImage={mockOnPickImage}
        styles={mockStyles}
      />,
    );

    fireEvent.press(getByText('Pick from Gallery'));
    expect(mockOnPickImage).toHaveBeenCalled();
  });

  it('renders existing images', () => {
    const {getAllByTestId} = render(
      <ImagePickerSection
        images={[]}
        existingImageUrls={['https://example.com/image.jpg']}
        onPickImage={mockOnPickImage}
        styles={mockStyles}
      />,
    );

    const images = getAllByTestId('existing-image');
    expect(images.length).toBe(1);
  });

  it('renders newly picked images', () => {
    const {getAllByTestId} = render(
      <ImagePickerSection
        images={[{uri: 'file://local-image.jpg'}]}
        existingImageUrls={[]}
        onPickImage={mockOnPickImage}
        styles={mockStyles}
      />,
    );

    const images = getAllByTestId('picked-image');
    expect(images.length).toBe(1);
  });
});
