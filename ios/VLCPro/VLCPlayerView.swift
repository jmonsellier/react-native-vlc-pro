import Foundation
import UIKit
import React
import MobileVLCKit

/**
 * Vue native VLCPlayer pour iOS
 * Phase 1, Semaine 2 : Intégration MobileVLCKit complète
 */
@objc(VLCPlayerView)
class VLCPlayerView: RCTView {
    
    // MARK: - Properties
    
    private var mediaPlayer: VLCMediaPlayer?
    private var vlcLibrary: VLCLibrary?
    private var currentMedia: VLCMedia?
    
    // React Native props
    @objc var source: NSDictionary? {
        didSet {
            if let source = source {
                loadMedia(from: source)
            }
        }
    }
    
    @objc var autoPlay: Bool = false {
        didSet {
            if autoPlay && mediaPlayer?.media != nil {
                play()
            }
        }
    }
    
    @objc var loop: Bool = false
    @objc var muted: Bool = false {
        didSet {
            mediaPlayer?.audio?.isMuted = muted
        }
    }
    
    @objc var volume: NSNumber = 100 {
        didSet {
            let volumeValue = Int32(volume.intValue)
            mediaPlayer?.audio?.volume = volumeValue
        }
    }
    
    @objc var rate: NSNumber = 1.0 {
        didSet {
            mediaPlayer?.rate = rate.floatValue
        }
    }
    
    @objc var paused: Bool = false {
        didSet {
            if paused {
                pause()
            } else {
                play()
            }
        }
    }
    
    // Event callbacks
    @objc var onReady: RCTDirectEventBlock?
    @objc var onPlay: RCTDirectEventBlock?
    @objc var onPause: RCTDirectEventBlock?
    @objc var onStop: RCTDirectEventBlock?
    @objc var onEnd: RCTDirectEventBlock?
    @objc var onError: RCTDirectEventBlock?
    @objc var onProgress: RCTDirectEventBlock?
    @objc var onLoad: RCTDirectEventBlock?
    @objc var onBuffer: RCTDirectEventBlock?
    @objc var onStateChange: RCTDirectEventBlock?
    @objc var onGetCurrentTime: RCTDirectEventBlock?
    @objc var onGetDuration: RCTDirectEventBlock?
    @objc var onGetState: RCTDirectEventBlock?
    @objc var onGetVolume: RCTDirectEventBlock?
    @objc var onIsMuted: RCTDirectEventBlock?
    @objc var onGetRate: RCTDirectEventBlock?
    
    // MARK: - Lifecycle
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupVLC()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupVLC()
    }
    
    deinit {
        cleanup()
    }
    
    // MARK: - VLC Setup
    
    private func setupVLC() {
        // Initialiser VLCLibrary
        vlcLibrary = VLCLibrary.shared()
        
        // Créer le media player
        mediaPlayer = VLCMediaPlayer(library: vlcLibrary)
        
        // Configurer la vue de sortie
        if let mediaPlayer = mediaPlayer {
            mediaPlayer.drawable = self
            mediaPlayer.delegate = self
            
            // Configuration par défaut
            mediaPlayer.audio?.isMuted = muted
            mediaPlayer.audio?.volume = Int32(volume.intValue)
            mediaPlayer.rate = rate.floatValue
        }
        
        // Configuration de la vue
        backgroundColor = UIColor.black
        clipsToBounds = true
    }
    
    // MARK: - Media Loading
    
    private func loadMedia(from source: NSDictionary) {
        guard let uri = source["uri"] as? String else {
            sendError(message: "URI manquante dans la source", code: "INVALID_SOURCE")
            return
        }
        
        var media: VLCMedia?
        
        if uri.hasPrefix("http://") || uri.hasPrefix("https://") {
            // URL réseau
            if let url = URL(string: uri) {
                media = VLCMedia(url: url)
                
                // Ajouter les headers si présents
                if let headers = source["headers"] as? [String: String] {
                    for (key, value) in headers {
                        media?.addOption("\(key)=\(value)")
                    }
                }
            }
        } else if uri.hasPrefix("file://") {
            // Fichier local
            if let url = URL(string: uri) {
                media = VLCMedia(url: url)
            }
        } else {
            // Chemin relatif dans le bundle
            if let path = Bundle.main.path(forResource: uri, ofType: nil) {
                media = VLCMedia(path: path)
            }
        }
        
        guard let validMedia = media else {
            sendError(message: "Impossible de créer le média à partir de l'URI: \(uri)", code: "MEDIA_CREATION_FAILED")
            return
        }
        
        currentMedia = validMedia
        mediaPlayer?.media = validMedia
        
        // Démarrer la lecture automatique si activée
        if autoPlay {
            play()
        }
    }
    
    // MARK: - Playback Controls
    
    @objc func play() {
        guard let mediaPlayer = mediaPlayer else { return }
        
        if mediaPlayer.media == nil {
            sendError(message: "Aucun média chargé", code: "NO_MEDIA")
            return
        }
        
        mediaPlayer.play()
    }
    
    @objc func pause() {
        mediaPlayer?.pause()
    }
    
    @objc func stop() {
        mediaPlayer?.stop()
    }
    
    @objc func seek(to time: NSNumber) {
        guard let mediaPlayer = mediaPlayer else { return }
        
        let timeMs = time.doubleValue
        let timeSeconds = timeMs / 1000.0
        let duration = mediaPlayer.media?.length.doubleValue ?? 0
        
        if duration > 0 {
            let position = Float(timeSeconds / (duration / 1000.0))
            mediaPlayer.position = min(max(position, 0.0), 1.0)
        }
    }
    
    // MARK: - Information Methods
    
    @objc func getCurrentTime() {
        guard let mediaPlayer = mediaPlayer else { return }
        
        let currentTime = mediaPlayer.time.doubleValue
        let data: [String: Any] = ["currentTime": currentTime]
        sendEvent("onGetCurrentTime", data: data)
    }
    
    @objc func getDuration() {
        guard let mediaPlayer = mediaPlayer else { return }
        
        let duration = mediaPlayer.media?.length.doubleValue ?? 0
        let data: [String: Any] = ["duration": duration]
        sendEvent("onGetDuration", data: data)
    }
    
    @objc func getState() {
        let state = getCurrentState()
        let data: [String: Any] = ["state": state]
        sendEvent("onGetState", data: data)
    }
    
    @objc func getVolume() {
        guard let mediaPlayer = mediaPlayer else { return }
        
        let volume = mediaPlayer.audio?.volume ?? 100
        let data: [String: Any] = ["volume": volume]
        sendEvent("onGetVolume", data: data)
    }
    
    @objc func isMuted() {
        guard let mediaPlayer = mediaPlayer else { return }
        
        let muted = mediaPlayer.audio?.isMuted ?? false
        let data: [String: Any] = ["muted": muted]
        sendEvent("onIsMuted", data: data)
    }
    
    @objc func getRate() {
        guard let mediaPlayer = mediaPlayer else { return }
        
        let rate = mediaPlayer.rate
        let data: [String: Any] = ["rate": rate]
        sendEvent("onGetRate", data: data)
    }
    
    // MARK: - State Management
    
    private func getCurrentState() -> String {
        guard let mediaPlayer = mediaPlayer else { return "idle" }
        
        switch mediaPlayer.state {
        case .stopped:
            return "stopped"
        case .opening:
            return "loading"
        case .buffering:
            return "buffering"
        case .playing:
            return "playing"
        case .paused:
            return "paused"
        case .ended:
            return "ended"
        case .error:
            return "error"
        default:
            return "idle"
        }
    }
    
    // MARK: - Event Handling
    
    private func sendEvent(_ eventName: String, data: [String: Any] = [:]) {
        var eventData = data
        eventData["target"] = reactTag
        
        switch eventName {
        case "onReady":
            onReady?(eventData)
        case "onPlay":
            onPlay?(eventData)
        case "onPause":
            onPause?(eventData)
        case "onStop":
            onStop?(eventData)
        case "onEnd":
            onEnd?(eventData)
        case "onError":
            onError?(eventData)
        case "onProgress":
            onProgress?(eventData)
        case "onLoad":
            onLoad?(eventData)
        case "onBuffer":
            onBuffer?(eventData)
        case "onStateChange":
            onStateChange?(eventData)
        case "onGetCurrentTime":
            onGetCurrentTime?(eventData)
        case "onGetDuration":
            onGetDuration?(eventData)
        case "onGetState":
            onGetState?(eventData)
        case "onGetVolume":
            onGetVolume?(eventData)
        case "onIsMuted":
            onIsMuted?(eventData)
        case "onGetRate":
            onGetRate?(eventData)
        default:
            break
        }
    }
    
    private func sendError(message: String, code: String) {
        let errorData: [String: Any] = [
            "error": [
                "code": code,
                "message": message,
                "domain": "VLCPlayer"
            ]
        ]
        sendEvent("onError", data: errorData)
    }
    
    // MARK: - Cleanup
    
    private func cleanup() {
        mediaPlayer?.stop()
        mediaPlayer?.delegate = nil
        mediaPlayer = nil
        currentMedia = nil
    }
}

// MARK: - VLCMediaPlayerDelegate

extension VLCPlayerView: VLCMediaPlayerDelegate {
    
    func mediaPlayerStateChanged(_ aNotification: Notification) {
        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            
            let state = self.getCurrentState()
            let stateData: [String: Any] = [
                "state": state,
                "previousState": "unknown" // TODO: Track previous state
            ]
            
            self.sendEvent("onStateChange", data: stateData)
            
            // Envoyer des événements spécifiques
            switch state {
            case "playing":
                self.sendEvent("onPlay")
            case "paused":
                self.sendEvent("onPause")
            case "stopped":
                self.sendEvent("onStop")
            case "ended":
                if self.loop {
                    self.play()
                } else {
                    self.sendEvent("onEnd")
                }
            case "error":
                self.sendError(message: "Erreur de lecture VLC", code: "PLAYBACK_ERROR")
            default:
                break
            }
        }
    }
    
    func mediaPlayerTimeChanged(_ aNotification: Notification) {
        DispatchQueue.main.async { [weak self] in
            guard let self = self,
                  let mediaPlayer = self.mediaPlayer else { return }
            
            let currentTime = mediaPlayer.time.doubleValue
            let duration = mediaPlayer.media?.length.doubleValue ?? 0
            let position = mediaPlayer.position
            
            let progressData: [String: Any] = [
                "currentTime": currentTime,
                "duration": duration,
                "position": Double(position),
                "remainingTime": max(0, duration - currentTime)
            ]
            
            self.sendEvent("onProgress", data: progressData)
        }
    }
    
    func mediaPlayerMediaChanged(_ aNotification: Notification) {
        DispatchQueue.main.async { [weak self] in
            guard let self = self,
                  let mediaPlayer = self.mediaPlayer,
                  let media = mediaPlayer.media else { return }
            
            let loadData: [String: Any] = [
                "duration": media.length.doubleValue,
                "canPlayFast": true,
                "canPlaySlow": true,
                "canPause": true,
                "canSeek": true
            ]
            
            self.sendEvent("onLoad", data: loadData)
            self.sendEvent("onReady")
        }
    }
} 