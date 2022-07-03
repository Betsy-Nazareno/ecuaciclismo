import * as React from 'react'
import { Text, View } from 'react-native'
import tw from 'twrnc'

interface ErrorMessageProps {
  message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <View style={tw` py-2 w-10/12 mx-auto bg-opacity-50 -mt-4`}>
      <Text style={tw`text-red-500 font-bold text-xs text-center`}>
        {message}
      </Text>
    </View>
  )
}

export default ErrorMessage
