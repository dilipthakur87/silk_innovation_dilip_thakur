import { Dimensions } from 'react-native'

export const width = Dimensions.get('window').width // full width
export const height = Dimensions.get('window').height // full height
/**
 * This file contains metric values that are global to the application.
 */

// Examples of metrics you can define:

export const tiny = 5
export const small = tiny * 2 // 10
export const normal = tiny * 3 // 15
export const medium = normal * 2 // 30

export default {
  tiny,
  small,
  normal,
  medium,
  deviceWidth: width,
  deviceHeight: height,

  defaultMargin: {
    margin: normal,
  },
  tinyHorizontalPadding: {
    paddingHorizontal: tiny,
  },
  smallHorizontalPadding: {
    paddingHorizontal: small,
  },
  horizontalPadding: {
    paddingHorizontal: normal,
  }
}
