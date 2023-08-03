// src/components/CustomImagePicker.tsx
import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {CustomButton} from './CustomButton';
import {CustomDeleteButton} from './CustomDeleteButton';
import {CustomImage} from './CustomImage';
import {CustomText} from './CustomText';
import {CustomView} from './CustomView';

interface CustomImagePickerProps {
  images: string[];
  setImages: (images: string[]) => void;
}

export const CustomImagePicker: React.FC<CustomImagePickerProps> = ({
  images,
  setImages,
}) => {
  const handleSelectImages = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 4,
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          setImages(response.assets.map(asset => asset.uri));
        }
      },
    );
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <CustomView>
      <CustomText type="normal">Images:</CustomText>
      <CustomView style={{flexDirection: 'row'}}>
        {images.map((image, index) => (
          <CustomView key={index}>
            <CustomImage source={{uri: image}} />
            <CustomDeleteButton onPress={() => handleRemoveImage(index)} />
          </CustomView>
        ))}
      </CustomView>
      <CustomButton
        type="secondary"
        title="Select Images"
        onPress={handleSelectImages}
      />
    </CustomView>
  );
};
