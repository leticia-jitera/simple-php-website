import React from 'react'
import {
  View,
  Image,
} from 'react-native'
import Animated, { Easing, RollInLeft, RollOutLeft, SlideInDown, SlideOutUp, StretchInX, StretchOutX, ZoomInRotate, ZoomOutRotate, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import { images } from 'assets'

import { styles } from '../styles'


const AnimatedHeader = () => {
  return (
    <View>
      <Animated.Image
        source={images('placeholder')}
        entering={ZoomInRotate.duration(3000).delay(0)}
        exiting={ZoomOutRotate}
        style={styles.pattern_1}
      />
      <Animated.Image
        source={images('placeholder')}
        entering={StretchInX.duration(3000).delay(300)}
        exiting={StretchOutX}
        style={styles.pattern_2}
      />

      <Animated.Image
        source={images('placeholder')}
        entering={SlideInDown.duration(3000).delay(600)}
        exiting={SlideOutUp}
        style={styles.pattern_3}
      />

      <Animated.Image
        source={images('placeholder')}
        entering={RollInLeft.duration(3000).delay(900)}
        exiting={RollOutLeft}
        style={styles.pattern_4}
      />
    </View>
  )
}

export default AnimatedHeader
