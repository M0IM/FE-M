declare module 'react-native-config' {
  export interface NativeConfig {
    KAKAO_NATIVE_APP_KEY?: string;
    KAKAO_WITH_NATIVE_APP_KEY?: string;
    KAKAO_REST_API_KEY?: string;
    KAKAO_JS_KEY?: string;
    KAKAO_ADMIN_KEY?: string;
    NAVER_CLIENT_ID: string;
    NAVER_CLIENT_SECRET: string;
    NAVER_URL_SCHEME: string;
    NAVER_APP_NAME: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
