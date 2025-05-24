package com.vlcpro;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

/**
 * ViewManager pour VLCPlayerView Android
 * Phase 1, Semaine 2 : Bridge React Native
 */
public class VLCPlayerViewManager extends SimpleViewManager<VLCPlayerView> {
    
    private static final String REACT_CLASS = "VLCPlayerView";
    
    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }
    
    @NonNull
    @Override
    protected VLCPlayerView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new VLCPlayerView(reactContext);
    }
    
    // MARK: - Props
    
    @ReactProp(name = "source")
    public void setSource(VLCPlayerView view, @Nullable ReadableMap source) {
        if (source != null) {
            view.setSource(source);
        }
    }
    
    @ReactProp(name = "autoPlay", defaultBoolean = false)
    public void setAutoPlay(VLCPlayerView view, boolean autoPlay) {
        view.setAutoPlay(autoPlay);
    }
    
    @ReactProp(name = "loop", defaultBoolean = false)
    public void setLoop(VLCPlayerView view, boolean loop) {
        view.setLoop(loop);
    }
    
    @ReactProp(name = "muted", defaultBoolean = false)
    public void setMuted(VLCPlayerView view, boolean muted) {
        view.setMuted(muted);
    }
    
    @ReactProp(name = "volume", defaultInt = 100)
    public void setVolume(VLCPlayerView view, int volume) {
        view.setVolume(volume);
    }
    
    @ReactProp(name = "rate", defaultFloat = 1.0f)
    public void setRate(VLCPlayerView view, float rate) {
        view.setRate(rate);
    }
    
    @ReactProp(name = "paused", defaultBoolean = false)
    public void setPaused(VLCPlayerView view, boolean paused) {
        view.setPaused(paused);
    }
    
    // MARK: - Events
    
    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put("onReady", MapBuilder.of("registrationName", "onReady"))
                .put("onPlay", MapBuilder.of("registrationName", "onPlay"))
                .put("onPause", MapBuilder.of("registrationName", "onPause"))
                .put("onStop", MapBuilder.of("registrationName", "onStop"))
                .put("onEnd", MapBuilder.of("registrationName", "onEnd"))
                .put("onError", MapBuilder.of("registrationName", "onError"))
                .put("onProgress", MapBuilder.of("registrationName", "onProgress"))
                .put("onLoad", MapBuilder.of("registrationName", "onLoad"))
                .put("onBuffer", MapBuilder.of("registrationName", "onBuffer"))
                .put("onStateChange", MapBuilder.of("registrationName", "onStateChange"))
                .put("onGetCurrentTime", MapBuilder.of("registrationName", "onGetCurrentTime"))
                .put("onGetDuration", MapBuilder.of("registrationName", "onGetDuration"))
                .put("onGetState", MapBuilder.of("registrationName", "onGetState"))
                .put("onGetVolume", MapBuilder.of("registrationName", "onGetVolume"))
                .put("onIsMuted", MapBuilder.of("registrationName", "onIsMuted"))
                .put("onGetRate", MapBuilder.of("registrationName", "onGetRate"))
                .build();
    }
    
    // MARK: - Commands
    
    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.<String, Integer>builder()
                .put("play", 1)
                .put("pause", 2)
                .put("stop", 3)
                .put("seek", 4)
                .put("getCurrentTime", 5)
                .put("getDuration", 6)
                .put("getState", 7)
                .put("getVolume", 8)
                .put("isMuted", 9)
                .put("getRate", 10)
                .build();
    }
    
    @Override
    public void receiveCommand(@NonNull VLCPlayerView view, String commandId, @Nullable ReadableArray args) {
        switch (commandId) {
            case "play":
                view.play();
                break;
            case "pause":
                view.pause();
                break;
            case "stop":
                view.stop();
                break;
            case "seek":
                if (args != null && args.size() > 0) {
                    long timeMs = (long) args.getDouble(0);
                    view.seek(timeMs);
                }
                break;
            case "getCurrentTime":
                view.getCurrentTime();
                break;
            case "getDuration":
                view.getDuration();
                break;
            case "getState":
                view.getState();
                break;
            case "getVolume":
                view.getVolume();
                break;
            case "isMuted":
                view.isMuted();
                break;
            case "getRate":
                view.getRate();
                break;
        }
    }
} 