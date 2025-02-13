import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { CustomText } from './CustomText'

import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IconBadgeProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  size: number;
  title: string;
}

const IconBadge: React.FC<IconBadgeProps> = ({ icon, size, title }) => {
  return (
    <View
      style={style.container}
    >
      <MaterialCommunityIcons name={icon} size={size} style={style.icon} />
      <CustomText>
        {title}
      </CustomText>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    marginTop: 5,
    marginBottom: 10   
  },
  icon: {
    marginEnd: 5
  }
});

export default IconBadge;
