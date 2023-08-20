import React, { useState } from 'react';
import { Text,View, TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import FieldFormulario from '../moleculas/FieldFormulario'
import tw from 'twrnc';
import { CustomText } from '../atomos/CustomText';
import { TEXT_COLORS } from '../../utils/constants';
import PreviewDocuments from './PreviewDocuments';
import { Alert } from 'react-native';

interface MediaPickerProps {
  field: string
  values: ImagePicker.ImagePickerResult[]
  icon: ImageSourcePropType
  placeholder: string
  setFieldValue: (field: string, files: ImagePicker.ImagePickerResult[]) => void
}
const MediaPicker = ({ 
  field, 
  setFieldValue, 
  values, 
  icon, 
  placeholder 
}:MediaPickerProps) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //Permite eliminar un archivo de la lista de archivos seleccionados
  const deleteFile = (uri: string) => {
    setFieldValue(field, [
      ...(values || []).filter((file: any) => {
        if(file.assets) {
          const uriFile = file.assets[0].uri
          return uriFile !== uri
        }
      }),
    ])
  }
  const imageAndVideo = (file: any) => {
    if(file.assets[0].type === 'image' || file.assets[0].type=== 'video') {
      return true
    }
    else {
      //variable para mostrar que solo acepta imagenes y videos
      //De momento nunca entra a este else por una validacion interna de la libreria
      const onlyImageAndVideo = 'Solo se aceptan imagenes y videos'
      Alert.alert(onlyImageAndVideo)
      return false
    }
  }
  const handleOpenGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      if(imageAndVideo(result)) {
        setFieldValue(field, [...(values || []), result]);
      }
      
    }

    toggleModal();
  };

  const handleOpenCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFieldValue(field, [...(values || []), result]);
    }

    toggleModal();
  };

  const handleOpenVideo = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFieldValue(field, [...(values || []), result]);
    }

    toggleModal();
  };


  return (
    <>
    <PreviewDocuments values={values} handleDelete={deleteFile} />
    <FieldFormulario>
      <TouchableOpacity onPress={toggleModal}>
        <View style={tw`flex flex-row items-center`}>
          <View style={tw`mx-auto py-2 w-3/12`}>
            <Image source={icon} style={styles.icon} />
          </View>
          <View style={tw`mx-auto py-2 w-8/12`}>
            <CustomText style={`${TEXT_COLORS.DARK_GRAY} text-xs`} containerProps={{ textAlign: 'center' }}>
              {placeholder}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalOption} onPress={handleOpenGallery}>
            <View><Image
              source={require('../../../assets/gallery_icon.png')} 
              style={{ width: 40, height: 40 }}
            />
            <Text>Galeria</Text></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption} onPress={handleOpenCamera}>
            <View><Image
                source={require('../../../assets/camera.png')} 
                style={{ width: 40, height: 40 }}
              />
            <Text>Camara</Text></View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption} onPress={handleOpenVideo}>
            <View><Image
              source={require('../../../assets/video.png')} 
              style={{ width: 40, height: 40 }}
            />
            <Text>Video</Text></View>
          </TouchableOpacity>
        </View>
      </Modal>
    </FieldFormulario>
    </>
  )
}
const styles = StyleSheet.create({
  icon: {
    width: 80,
    height: 80,
    opacity: 0.5,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalOption: {
    alignItems: 'center',
  },
});

export default MediaPicker;
