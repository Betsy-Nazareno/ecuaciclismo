import * as React from 'react'
import { Text, Pressable } from 'react-native'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../utils/constants'

interface TextoExpandibleProps {
  text: string
  maxLength: number
}

const TextoExpandible = ({ text, maxLength }: TextoExpandibleProps) => {
  const [hasMoreText, setHasMoreText] = React.useState(false)
  const [textRender, setTextRender] = React.useState('')

  React.useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (text && text.length > 200) {
        setHasMoreText(true)
        setTextRender(text.substring(0, maxLength) + '...')
      } else {
        setTextRender(text)
      }
    }
    return () => {
      isMounted = false
    }
  }, [text])

  const handleDisplayText = () => {
    if (text && hasMoreText) {
      setTextRender(text)
      setHasMoreText(false)
    } else if (text) {
      setTextRender(text.substring(0, maxLength) + '...')
      setHasMoreText(true)
    }
  }

  return (
    <Text style={tw`text-sm ${TEXT_COLORS.DARK_BLUE}`}>
      {textRender}
      {text.length > 200 && (
        <Pressable onPress={handleDisplayText}>
          <Text style={tw`text-sm font-bold ${TEXT_COLORS.ORANGE}`}>
            {hasMoreText ? 'Ver más' : 'Ver menos'}
          </Text>
        </Pressable>
      )}
    </Text>
  )
}

export default TextoExpandible
