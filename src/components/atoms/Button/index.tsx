import { memo } from 'react'
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native'

export const Button = memo(({ children, style, ...rest }: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style
      ]}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  button: {
    paddingBottom: 16,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
