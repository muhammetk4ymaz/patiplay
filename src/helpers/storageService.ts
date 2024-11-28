import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

export enum StorageKeys {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  USER = 'user',
}

class StorageService {
  private static instance: StorageService;

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  async setItem(key: StorageKeys, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);

    console.log('setItem', key, value);
  }

  async getItem(key: StorageKeys): Promise<string | null> {
    const value = await AsyncStorage.getItem(key);

    console.log('getItem', key, value);

    return value;
  }

  removeItem(key: StorageKeys): void {
    AsyncStorage.removeItem(key);

    console.log('removeItem', key);
  }
}

export default StorageService.getInstance();
