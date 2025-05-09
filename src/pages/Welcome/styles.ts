import {
  StyleSheet,
} from 'react-native'

export const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  inner: { flex: 1 },
  pattern_1: {
    height: 100,
    width: 100,
    borderRadius: 20,
    position: 'absolute',
    top: 10,
  },
  pattern_2: {
    height: 100,
    width: 100,
    borderRadius: 20,
    position: 'absolute',
    top: -30,
    left: 100,
  },
  pattern_3: {
    width: 100,
    height: 100,
    borderRadius: 20,
    position: 'absolute',
    top: 130,
    left: -50,
  },
  pattern_4: {
    height: 200,
    width: 200,
    borderRadius: 20,
    position: 'absolute',
    top: 110,
    left: 100,
  },
  text_container: {
    paddingHorizontal: 22,
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  text_top: {
    fontSize: 50,
    fontWeight: '800',
    color: '#000000',
  },
  text_started: {
    fontSize: 46,
    fontWeight: '800',
    color: '#000000',
  },
  heading_container: { marginVertical: 22 },
  heading_1: {
    fontSize: 16,
    color: '#000000',
    marginVertical: 4,
  },
  heading_2: {
    fontSize: 16,
    color: '#000000',
  },
  button: {
    marginTop: 22,
    width: '100%',
  },
  bottom_section: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'center',
  },
  bottom_text: {
    fontSize: 16,
    color: '#000000',
  },
  login_text: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    marginLeft: 4,
  },
})
