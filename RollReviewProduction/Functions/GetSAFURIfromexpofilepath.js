
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

async function getSAFUriAsync(fileUri) {
  if (Platform.OS === 'android') {
    try {
      const contentUri = await FileSystem.getContentUriAsync(fileUri);
      console.log('contentUri: ', contentUri)
      return contentUri;
    } catch (error) {
      console.error('Error generating content URI:', error);
      return null;
    }
  } else {
    console.warn('Content URIs are only supported on Android.');
    return null;
  }
}

// Usage
const expoFileSystemUri = 'file:///data/user/0/host.exp.exponent/files/1707430008649.mp4';
getSAFUriAsync(expoFileSystemUri).then(contentUri => {
  console.log('Content URI:', contentUri);
});
