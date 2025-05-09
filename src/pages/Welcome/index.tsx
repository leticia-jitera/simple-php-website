import React from 'react'
import {
  View,
  Text,
  Pressable,
} from 'react-native'
import { i18n } from 'i18n'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'components/atoms/Button'
import { UnAuthenticatedStackParamList } from 'routes'

import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { UNAUTHENTICATED_STACK_PAGES } from 'routes/UnAuthenticated'

import { styles } from './styles'
import AnimatedHeader from './components/AnimatedHeader'
import { Page } from 'components/atoms/Page'

export const WelcomePage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<UnAuthenticatedStackParamList>>()
  return (
    <Page
      style={styles.page}
    >
      <View style={styles.inner}>
        <AnimatedHeader />

        <View
          style={styles.text_container}
        >
          <Text
            style={styles.text_top}>
            {i18n.t('welcome_page.let_get')}
          </Text>
          <Text
            style={styles.text_started}>
            {i18n.t('welcome_page.started')}
          </Text>

          <View style={styles.heading_container}>
            <Text
              style={styles.heading_1}>
              {i18n.t('welcome_page.connect_eachother')}
            </Text>
            <Text
              style={styles.heading_2}>
              {i18n.t('welcome_page.calling_and_private')}
            </Text>
          </View>

          <Button
            onPress={() => {
              navigation.navigate(UNAUTHENTICATED_STACK_PAGES.LOGIN)
            }}
            style={styles.button}>
            <Text>{i18n.t('common.login')}</Text>
          </Button>

          <View
            style={styles.bottom_section}>
            <Text
              style={styles.bottom_text}>
              {i18n.t('welcome_page.already_have_account')}
            </Text>
            <Pressable onPress={() => {}}>
              <Text
                style={styles.login_text}>
                {i18n.t('common.login')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Page>
  )
}
