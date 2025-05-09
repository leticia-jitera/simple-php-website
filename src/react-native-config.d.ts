declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL: string
    API_KEY: string
    APP_CLIENT_ID: string
    APP_CLIENT_SECRET: string
  }
  
  export const Config: NativeConfig
  export default Config
}
