#import "AppDelegate.h"

#import <RNKakaoLogins.h>
#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h"
#import <NaverThirdPartyLogin/NaverThirdPartyLoginConnection.h>
#import "RNCConfig.h"

@implementation AppDelegate
- (BOOL)application:(UIApplication *)app
     openURL:(NSURL *)url
     options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
 if([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
    return [RNKakaoLogins handleOpenUrl: url];
 }

 NSString *naverScheme = [RNCConfig envFor:@"NAVER_URL_SCHEME"];

 if ([url.scheme isEqualToString:naverScheme]) {
    return [[NaverThirdPartyLoginConnection getSharedInstance] application:app openURL:url options:options];
 }
 return NO;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"MOIM";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  [super application:application didFinishLaunchingWithOptions:launchOptions];
  [RNSplashScreen show];
  return YES;

}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
