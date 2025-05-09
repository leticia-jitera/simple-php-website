import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { i18n } from 'i18n';
import { Page } from 'components/atoms/Page';

export const HomePage = () => {
  return (
    <Page style={styles.page}>
      <View style={styles.inner}>
        <View style={styles.content}>
          <Text>{i18n.t('home_page.title')}</Text>
        </View>
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  inner: { flex: 1, justifyContent: 'flex-end' },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
