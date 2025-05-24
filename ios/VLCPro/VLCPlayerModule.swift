import Foundation
import React

/**
 * Module natif VLCPlayer pour iOS
 * Phase 1, Semaine 2 : Intégration MobileVLCKit complète
 */
@objc(VLCPlayerModule)
class VLCPlayerModule: RCTEventEmitter {
    
    // MARK: - Properties
    
    private var hasListeners = false
    
    // MARK: - React Native Module
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    override func supportedEvents() -> [String]! {
        return [
            "VLCPlayerStateChanged",
            "VLCPlayerProgress",
            "VLCPlayerError",
            "VLCPlayerReady",
            "VLCPlayerEnd"
        ]
    }
    
    override func startObserving() {
        hasListeners = true
    }
    
    override func stopObserving() {
        hasListeners = false
    }
    
    // MARK: - Utility Methods
    
    /**
     * Obtient les informations de version VLC
     */
    @objc
    func getVLCVersion(_ resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        let version = VLCLibrary.shared().version
        let result: [String: Any] = [
            "version": version,
            "platform": "iOS",
            "framework": "MobileVLCKit"
        ]
        resolver(result)
    }
    
    /**
     * Vérifie si VLC est disponible
     */
    @objc
    func isVLCAvailable(_ resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        let available = VLCLibrary.shared() != nil
        resolver(available)
    }
    
    // MARK: - Event Emission
    
    private func sendEvent(name: String, body: Any?) {
        if hasListeners {
            sendEvent(withName: name, body: body)
        }
    }
} 