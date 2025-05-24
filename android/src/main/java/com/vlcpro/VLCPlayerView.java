package com.vlcpro;

import android.content.Context;
import android.net.Uri;
import android.util.AttributeSet;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import org.videolan.libvlc.LibVLC;
import org.videolan.libvlc.Media;
import org.videolan.libvlc.MediaPlayer;
import org.videolan.libvlc.util.VLCVideoLayout;

import java.util.ArrayList;

/**
 * Vue native VLCPlayer pour Android
 * Phase 1, Semaine 2 : Intégration libVLC complète
 */
public class VLCPlayerView extends ViewGroup implements MediaPlayer.EventListener {
    
    // VLC Components
    private LibVLC libVLC;
    private MediaPlayer mediaPlayer;
    private VLCVideoLayout videoLayout;
    private SurfaceView surfaceView;
    
    // React Native props
    private ReadableMap source;
    private boolean autoPlay = false;
    private boolean loop = false;
    private boolean muted = false;
    private int volume = 100;
    private float rate = 1.0f;
    private boolean paused = false;
    
    // State
    private String currentState = "idle";
    private long currentTime = 0;
    private long duration = 0;
    
    public VLCPlayerView(Context context) {
        super(context);
        init();
    }
    
    public VLCPlayerView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }
    
    private void init() {
        setupVLC();
        setupVideoLayout();
    }
    
    private void setupVLC() {
        try {
            // Initialiser libVLC
            ArrayList<String> options = new ArrayList<>();
            options.add("--aout=opensles");
            options.add("--audio-time-stretch");
            options.add("-vvv");
            
            libVLC = new LibVLC(getContext(), options);
            
            // Créer le media player
            mediaPlayer = new MediaPlayer(libVLC);
            mediaPlayer.setEventListener(this);
            
        } catch (Exception e) {
            sendError("VLC_INIT_ERROR", "Erreur lors de l'initialisation de VLC: " + e.getMessage());
        }
    }
    
    private void setupVideoLayout() {
        // Créer le layout vidéo
        videoLayout = new VLCVideoLayout(getContext());
        
        // Créer la surface view
        surfaceView = new SurfaceView(getContext());
        videoLayout.addView(surfaceView);
        
        // Ajouter à la vue
        addView(videoLayout);
        
        // Attacher le media player à la surface
        if (mediaPlayer != null) {
            mediaPlayer.attachViews(videoLayout, null, false, false);
        }
    }
    
    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        if (videoLayout != null) {
            videoLayout.layout(0, 0, r - l, b - t);
        }
    }
    
    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        if (videoLayout != null) {
            videoLayout.measure(widthMeasureSpec, heightMeasureSpec);
        }
    }
    
    // MARK: - Props Setters
    
    public void setSource(ReadableMap source) {
        this.source = source;
        loadMedia();
    }
    
    public void setAutoPlay(boolean autoPlay) {
        this.autoPlay = autoPlay;
        if (autoPlay && mediaPlayer != null && mediaPlayer.getMedia() != null) {
            play();
        }
    }
    
    public void setLoop(boolean loop) {
        this.loop = loop;
    }
    
    public void setMuted(boolean muted) {
        this.muted = muted;
        if (mediaPlayer != null) {
            mediaPlayer.setVolume(muted ? 0 : volume);
        }
    }
    
    public void setVolume(int volume) {
        this.volume = volume;
        if (mediaPlayer != null && !muted) {
            mediaPlayer.setVolume(volume);
        }
    }
    
    public void setRate(float rate) {
        this.rate = rate;
        if (mediaPlayer != null) {
            mediaPlayer.setRate(rate);
        }
    }
    
    public void setPaused(boolean paused) {
        this.paused = paused;
        if (paused) {
            pause();
        } else {
            play();
        }
    }
    
    // MARK: - Media Loading
    
    private void loadMedia() {
        if (source == null || !source.hasKey("uri")) {
            sendError("INVALID_SOURCE", "URI manquante dans la source");
            return;
        }
        
        String uri = source.getString("uri");
        if (uri == null || uri.isEmpty()) {
            sendError("INVALID_SOURCE", "URI vide");
            return;
        }
        
        try {
            Media media;
            
            if (uri.startsWith("http://") || uri.startsWith("https://")) {
                // URL réseau
                media = new Media(libVLC, Uri.parse(uri));
            } else if (uri.startsWith("file://")) {
                // Fichier local
                media = new Media(libVLC, Uri.parse(uri));
            } else {
                // Asset ou chemin relatif
                String assetPath = "android_asset://" + uri;
                media = new Media(libVLC, Uri.parse(assetPath));
            }
            
            // Ajouter les options si présentes
            if (source.hasKey("headers")) {
                ReadableMap headers = source.getMap("headers");
                if (headers != null) {
                    // Support des headers HTTP pour les streams réseau
                    ReadableMapKeySetIterator iterator = headers.keySetIterator();
                    while (iterator.hasNextKey()) {
                        String key = iterator.nextKey();
                        String value = headers.getString(key);
                        if (value != null) {
                            // Mapper les headers selon les options VLC
                            if (key.equalsIgnoreCase("User-Agent")) {
                                media.addOption(":http-user-agent=" + value);
                            } else if (key.equalsIgnoreCase("Authorization")) {
                                media.addOption(":http-password=" + value);
                            } else if (key.equalsIgnoreCase("Referer")) {
                                media.addOption(":http-referrer=" + value);
                            } else if (key.equalsIgnoreCase("Cookie")) {
                                media.addOption(":http-cookies=" + value);
                            } else {
                                // Headers personnalisés via http-forward-cookies
                                media.addOption(":http-forward-cookies");
                                media.addOption(":http-" + key.toLowerCase().replace("-", "") + "=" + value);
                            }
                        }
                    }
                }
            }
            
            mediaPlayer.setMedia(media);
            media.release();
            
            // Démarrer la lecture automatique si activée
            if (autoPlay) {
                play();
            }
            
        } catch (Exception e) {
            sendError("MEDIA_CREATION_FAILED", "Impossible de créer le média: " + e.getMessage());
        }
    }
    
    // MARK: - Playback Controls
    
    public void play() {
        if (mediaPlayer != null) {
            if (mediaPlayer.getMedia() == null) {
                sendError("NO_MEDIA", "Aucun média chargé");
                return;
            }
            mediaPlayer.play();
        }
    }
    
    public void pause() {
        if (mediaPlayer != null) {
            mediaPlayer.pause();
        }
    }
    
    public void stop() {
        if (mediaPlayer != null) {
            mediaPlayer.stop();
        }
    }
    
    public void seek(long timeMs) {
        if (mediaPlayer != null && duration > 0) {
            float position = (float) timeMs / duration;
            mediaPlayer.setPosition(Math.max(0.0f, Math.min(1.0f, position)));
        }
    }
    
    // MARK: - Information Methods
    
    public void getCurrentTime() {
        if (mediaPlayer != null) {
            currentTime = mediaPlayer.getTime();
            WritableMap data = Arguments.createMap();
            data.putDouble("currentTime", currentTime);
            sendEvent("onGetCurrentTime", data);
        }
    }
    
    public void getDuration() {
        if (mediaPlayer != null) {
            duration = mediaPlayer.getLength();
            WritableMap data = Arguments.createMap();
            data.putDouble("duration", duration);
            sendEvent("onGetDuration", data);
        }
    }
    
    public void getState() {
        WritableMap data = Arguments.createMap();
        data.putString("state", currentState);
        sendEvent("onGetState", data);
    }
    
    public void getVolume() {
        WritableMap data = Arguments.createMap();
        data.putInt("volume", volume);
        sendEvent("onGetVolume", data);
    }
    
    public void isMuted() {
        WritableMap data = Arguments.createMap();
        data.putBoolean("muted", muted);
        sendEvent("onIsMuted", data);
    }
    
    public void getRate() {
        WritableMap data = Arguments.createMap();
        data.putDouble("rate", rate);
        sendEvent("onGetRate", data);
    }
    
    // MARK: - State Management
    
    private String getStateFromVLC(int vlcState) {
        switch (vlcState) {
            case MediaPlayer.Event.Stopped:
                return "stopped";
            case MediaPlayer.Event.Opening:
                return "loading";
            case MediaPlayer.Event.Buffering:
                return "buffering";
            case MediaPlayer.Event.Playing:
                return "playing";
            case MediaPlayer.Event.Paused:
                return "paused";
            case MediaPlayer.Event.EndReached:
                return "ended";
            case MediaPlayer.Event.EncounteredError:
                return "error";
            default:
                return "idle";
        }
    }
    
    // MARK: - Event Handling
    
    @Override
    public void onEvent(MediaPlayer.Event event) {
        String newState = getStateFromVLC(event.type);
        
        switch (event.type) {
            case MediaPlayer.Event.MediaChanged:
                sendEvent("onLoad", createLoadData());
                sendEvent("onReady", null);
                break;
                
            case MediaPlayer.Event.Playing:
                currentState = "playing";
                sendEvent("onPlay", null);
                sendStateChangeEvent(newState);
                break;
                
            case MediaPlayer.Event.Paused:
                currentState = "paused";
                sendEvent("onPause", null);
                sendStateChangeEvent(newState);
                break;
                
            case MediaPlayer.Event.Stopped:
                currentState = "stopped";
                currentTime = 0;
                sendEvent("onStop", null);
                sendStateChangeEvent(newState);
                break;
                
            case MediaPlayer.Event.EndReached:
                currentState = "ended";
                if (loop) {
                    play();
                } else {
                    sendEvent("onEnd", null);
                }
                sendStateChangeEvent(newState);
                break;
                
            case MediaPlayer.Event.TimeChanged:
                currentTime = mediaPlayer.getTime();
                duration = mediaPlayer.getLength();
                sendEvent("onProgress", createProgressData());
                break;
                
            case MediaPlayer.Event.EncounteredError:
                currentState = "error";
                sendError("PLAYBACK_ERROR", "Erreur de lecture VLC");
                sendStateChangeEvent(newState);
                break;
        }
    }
    
    private void sendEvent(String eventName, @Nullable WritableMap data) {
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class)
                .receiveEvent(getId(), eventName, data);
    }
    
    private void sendStateChangeEvent(String newState) {
        WritableMap data = Arguments.createMap();
        data.putString("state", newState);
        data.putString("previousState", currentState);
        sendEvent("onStateChange", data);
    }
    
    private void sendError(String code, String message) {
        WritableMap error = Arguments.createMap();
        error.putString("code", code);
        error.putString("message", message);
        error.putString("domain", "VLCPlayer");
        
        WritableMap data = Arguments.createMap();
        data.putMap("error", error);
        
        sendEvent("onError", data);
    }
    
    private WritableMap createProgressData() {
        WritableMap data = Arguments.createMap();
        data.putDouble("currentTime", currentTime);
        data.putDouble("duration", duration);
        data.putDouble("position", duration > 0 ? (double) currentTime / duration : 0);
        data.putDouble("remainingTime", Math.max(0, duration - currentTime));
        return data;
    }
    
    private WritableMap createLoadData() {
        WritableMap data = Arguments.createMap();
        data.putDouble("duration", mediaPlayer.getLength());
        data.putBoolean("canPlayFast", true);
        data.putBoolean("canPlaySlow", true);
        data.putBoolean("canPause", true);
        data.putBoolean("canSeek", true);
        return data;
    }
    
    // MARK: - Cleanup
    
    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        cleanup();
    }
    
    private void cleanup() {
        if (mediaPlayer != null) {
            mediaPlayer.stop();
            mediaPlayer.detachViews();
            mediaPlayer.release();
            mediaPlayer = null;
        }
        
        if (libVLC != null) {
            libVLC.release();
            libVLC = null;
        }
    }
} 