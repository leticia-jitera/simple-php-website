import NetInfo from '@react-native-community/netinfo';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient, onlineManager } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { MMKV } from 'react-native-mmkv';

export const queryClient = new QueryClient();
const storage = new MMKV({
  id: 'mmkv.react-query',
});

const clientStorage: Parameters<
  typeof createSyncStoragePersister
>[0]['storage'] = {
  setItem: (key, value) => {
    storage.set(key, value);
  },
  getItem: key => {
    const value = storage.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: key => {
    storage.delete(key);
  },
};

const clientPersister = createSyncStoragePersister({ storage: clientStorage });

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

persistQueryClient({
  queryClient,
  persister: clientPersister,
});
