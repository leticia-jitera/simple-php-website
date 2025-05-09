import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { i18n } from 'i18n';
import { Page } from 'components/atoms/Page';
import { Button } from 'components/atoms/Button';
import { UnAuthenticatedStackParamList } from 'routes';
import { useExampleAuthenticationMutation } from 'services/authentication';

export const LoginPage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<UnAuthenticatedStackParamList>>();
  const loginMutation = useExampleAuthenticationMutation();

  const handleLogin = async () => {
    await loginMutation.mutateAsync({
      table: 'user',
      username: '',
    });
  };

  return (
    <Page style={styles.page}>
      <View style={styles.inner}>
        <View style={styles.bottom}>
          <Button disabled={loginMutation.isPending} onPress={handleLogin}>
            <Text>
              {loginMutation.isPending
                ? i18n.t('common.loading')
                : i18n.t('common.login')}
            </Text>
          </Button>
          <Button
            onPress={navigation.goBack}
            disabled={loginMutation.isPending}>
            <Text>{i18n.t('common.go_back')}</Text>
          </Button>
        </View>
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottom: { padding: 10, gap: 10 },
});
