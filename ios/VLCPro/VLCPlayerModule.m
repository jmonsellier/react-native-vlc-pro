//
//  VLCPlayerModule.m
//  VLCPro
//
//  Phase 1, Semaine 2 : Bridge Objective-C pour Module Swift
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(VLCPlayerModule, RCTEventEmitter)

// Utility methods
RCT_EXTERN_METHOD(getVLCVersion:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(isVLCAvailable:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end 