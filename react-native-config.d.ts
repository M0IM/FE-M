declare module 'react-native-config' {
  export interface NativeConfig {
    KAKAO_NATIVE_APP_KEY?: string;
    KAKAO_REST_API_KEY?: string;
    KAKAO_JS_KEY?: string;
    KAKAO_ADMIN_KEY?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
