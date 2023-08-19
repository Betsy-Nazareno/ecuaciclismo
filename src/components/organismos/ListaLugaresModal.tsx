import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import TarjetaLugar from '../templates/Lugares/TarjetaLugar';
import { Lugar } from '../../models/Lugares';
import tw from 'twrnc';
import { BACKGROUND_COLORS } from '../../utils/constants';

interface ListaLugaresModalProps {
  isVisible: boolean;
  onClose: () => void;
  lugares: Lugar[];
}

const ListaLugaresModal = ({ isVisible, onClose, lugares }: ListaLugaresModalProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      swipeDirection="left"
      backdropOpacity={0.5}
      style={tw`flex justify-end m-0`}
    >
      <View style={tw`modalContent ${BACKGROUND_COLORS.WHITE2} p-4 rounded-tl-2xl rounded-tr-2xl w-80 h-full`}>
        {lugares ? (
          <FlatList
            data={lugares}
            renderItem={({ item }) => (
              <TarjetaLugar key={item.token} lugar={item} onClose={onClose} />
            )}
            keyExtractor={(item) => item.token}
          />
        ) : (
          <Text>No hay lugares disponibles.</Text>
        )}
      </View>
    </Modal>
  );
};

export default ListaLugaresModal;


