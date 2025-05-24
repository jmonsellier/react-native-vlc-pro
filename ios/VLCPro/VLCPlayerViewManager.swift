import Foundation
import React

/**
 * ViewManager pour VLCPlayerView iOS
 * Phase 1, Semaine 2 : Bridge React Native
 */
@objc(VLCPlayerViewManager)
class VLCPlayerViewManager: RCTViewManager {
    
    override func view() -> UIView! {
        return VLCPlayerView()
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    override func constantsToExport() -> [AnyHashable : Any]! {
        return [
            "ComponentName": "VLCPlayerView",
            "Version": "1.0.0"
        ]
    }
    
    // MARK: - Props
    
    @objc func setSource(_ node: NSNumber, source: NSDictionary) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.source = source
            }
        }
    }
    
    @objc func setAutoPlay(_ node: NSNumber, autoPlay: Bool) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.autoPlay = autoPlay
            }
        }
    }
    
    @objc func setLoop(_ node: NSNumber, loop: Bool) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.loop = loop
            }
        }
    }
    
    @objc func setMuted(_ node: NSNumber, muted: Bool) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.muted = muted
            }
        }
    }
    
    @objc func setVolume(_ node: NSNumber, volume: NSNumber) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.volume = volume
            }
        }
    }
    
    @objc func setRate(_ node: NSNumber, rate: NSNumber) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.rate = rate
            }
        }
    }
    
    @objc func setPaused(_ node: NSNumber, paused: Bool) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.paused = paused
            }
        }
    }
    
    // MARK: - Commands
    
    @objc func play(_ node: NSNumber) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.play()
            }
        }
    }
    
    @objc func pause(_ node: NSNumber) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.pause()
            }
        }
    }
    
    @objc func stop(_ node: NSNumber) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.stop()
            }
        }
    }
    
    @objc func seek(_ node: NSNumber, time: NSNumber) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.seek(to: time)
            }
        }
    }
    
    @objc func getCurrentTime(_ node: NSNumber) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.getCurrentTime()
            }
        }
    }
    
    @objc func getDuration(_ node: NSNumber) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.getDuration()
            }
        }
    }
    
    @objc func getState(_ node: NSNumber) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.getState()
            }
        }
    }
    
    @objc func getVolume(_ node: NSNumber) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.getVolume()
            }
        }
    }
    
    @objc func isMuted(_ node: NSNumber) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.isMuted()
            }
        }
    }
    
    @objc func getRate(_ node: NSNumber) {
        DispatchQueue.main.async {
            if let view = self.bridge.uiManager.view(forReactTag: node) as? VLCPlayerView {
                view.getRate()
            }
        }
    }
} 