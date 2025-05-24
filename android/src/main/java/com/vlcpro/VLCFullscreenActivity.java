package com.vlcpro;

import android.app.Activity;
import android.app.PictureInPictureParams;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Rational;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.FrameLayout;

import org.videolan.libvlc.LibVLC;
import org.videolan.libvlc.Media;
import org.videolan.libvlc.MediaPlayer;
import org.videolan.libvlc.util.VLCVideoLayout;

import java.util.ArrayList;

/**
 * Activity dédiée au plein écran vidéo
 * Basée sur l'approche de l'application VLC officielle
 */
public class VLCFullscreenActivity extends Activity implements MediaPlayer.EventListener {
    
    private LibVLC libVLC;
    private MediaPlayer mediaPlayer;
    private VLCVideoLayout videoLayout;
    private String mediaUri;
    private android.widget.LinearLayout controlsLayout;
    
    public static final String EXTRA_MEDIA_URI = "media_uri";
    public static final String EXTRA_CURRENT_TIME = "current_time";
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Configuration du plein écran
        setupFullscreen();
        
        // Récupérer les paramètres
        Intent intent = getIntent();
        mediaUri = intent.getStringExtra(EXTRA_MEDIA_URI);
        long currentTime = intent.getLongExtra(EXTRA_CURRENT_TIME, 0);
        
        if (mediaUri == null) {
            finish();
            return;
        }
        
        // Initialiser VLC
        setupVLC();
        
        // Créer le layout
        setupLayout();
        
        // Charger et lire le média
        loadAndPlayMedia(currentTime);
    }
    
    private void setupFullscreen() {
        // Masquer la barre de titre
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        
        // Configuration du plein écran immersif
        Window window = getWindow();
        window.setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON,
            WindowManager.LayoutParams.FLAG_FULLSCREEN | WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
        );
        
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            window.getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            );
        }
    }
    
    private void setupVLC() {
        try {
            ArrayList<String> options = new ArrayList<>();
            options.add("--aout=opensles");
            options.add("--audio-time-stretch");
            options.add("-vvv");
            
            libVLC = new LibVLC(this, options);
            mediaPlayer = new MediaPlayer(libVLC);
            mediaPlayer.setEventListener(this);
            
        } catch (Exception e) {
            android.util.Log.e("VLCFullscreenActivity", "Erreur d'initialisation VLC", e);
            finish();
        }
    }
    
    private void setupLayout() {
        // Créer le layout vidéo
        videoLayout = new VLCVideoLayout(this);
        
        // Créer un FrameLayout pour contenir la vidéo et les contrôles
        FrameLayout mainLayout = new FrameLayout(this);
        
        // Ajouter la vidéo au layout principal
        FrameLayout.LayoutParams videoParams = new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT
        );
        mainLayout.addView(videoLayout, videoParams);
        
        // Créer les contrôles overlay
        createOverlayControls(mainLayout);
        
        // Configurer pour occuper tout l'écran
        FrameLayout.LayoutParams layoutParams = new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.MATCH_PARENT,
            FrameLayout.LayoutParams.MATCH_PARENT
        );
        
        setContentView(mainLayout, layoutParams);
        
        // Attacher le media player
        mediaPlayer.attachViews(videoLayout, null, true, false);
    }
    
    private void createOverlayControls(FrameLayout parentLayout) {
        // Créer un layout pour les contrôles en haut à droite
        controlsLayout = new android.widget.LinearLayout(this);
        controlsLayout.setOrientation(android.widget.LinearLayout.HORIZONTAL);
        controlsLayout.setBackgroundColor(0x80000000); // Fond semi-transparent
        controlsLayout.setPadding(16, 16, 16, 16);
        
        // Bouton Picture-in-Picture
        android.widget.Button pipButton = new android.widget.Button(this);
        pipButton.setText("📺");
        pipButton.setTextSize(20);
        pipButton.setBackgroundColor(0x80FFFFFF);
        pipButton.setOnClickListener(v -> activatePictureInPicture());
        
        // Bouton sortir du plein écran
        android.widget.Button exitButton = new android.widget.Button(this);
        exitButton.setText("❌");
        exitButton.setTextSize(20);
        exitButton.setBackgroundColor(0x80FFFFFF);
        exitButton.setOnClickListener(v -> finish());
        
        // Ajouter les boutons au layout des contrôles
        controlsLayout.addView(pipButton);
        controlsLayout.addView(exitButton);
        
        // Positionner les contrôles en haut à droite
        FrameLayout.LayoutParams controlsParams = new FrameLayout.LayoutParams(
            FrameLayout.LayoutParams.WRAP_CONTENT,
            FrameLayout.LayoutParams.WRAP_CONTENT
        );
        controlsParams.gravity = android.view.Gravity.TOP | android.view.Gravity.END;
        controlsParams.setMargins(0, 50, 20, 0); // Marge pour éviter la barre de statut
        
        parentLayout.addView(controlsLayout, controlsParams);
        
        // Masquer les contrôles après 3 secondes
        new android.os.Handler().postDelayed(() -> {
            if (controlsLayout != null) {
                controlsLayout.setVisibility(View.GONE);
            }
        }, 3000);
        
        // Afficher les contrôles au tap sur la vidéo
        videoLayout.setOnClickListener(v -> {
            if (controlsLayout.getVisibility() == View.VISIBLE) {
                controlsLayout.setVisibility(View.GONE);
            } else {
                controlsLayout.setVisibility(View.VISIBLE);
                // Masquer à nouveau après 3 secondes
                new android.os.Handler().postDelayed(() -> {
                    if (controlsLayout != null) {
                        controlsLayout.setVisibility(View.GONE);
                    }
                }, 3000);
            }
        });
    }
    
    private void loadAndPlayMedia(long startTime) {
        try {
            Media media = new Media(libVLC, android.net.Uri.parse(mediaUri));
            mediaPlayer.setMedia(media);
            media.release();
            
            android.util.Log.d("VLCFullscreenActivity", "Chargement média avec startTime: " + startTime + "ms");
            
            // Démarrer la lecture
            mediaPlayer.play();
            
            // Aller au temps spécifié si nécessaire
            if (startTime > 0) {
                android.util.Log.d("VLCFullscreenActivity", "Positionnement à " + startTime + "ms");
                
                // Attendre que le média soit prêt avant de chercher
                new android.os.Handler().postDelayed(() -> {
                    if (mediaPlayer != null && mediaPlayer.getLength() > 0) {
                        float position = (float) startTime / mediaPlayer.getLength();
                        position = Math.max(0.0f, Math.min(1.0f, position));
                        
                        android.util.Log.d("VLCFullscreenActivity", "Seek vers position: " + position + 
                            " (temps: " + startTime + "ms / durée: " + mediaPlayer.getLength() + "ms)");
                        
                        mediaPlayer.setPosition(position);
                        
                        // Vérifier que le seek a fonctionné
                        new android.os.Handler().postDelayed(() -> {
                            if (mediaPlayer != null) {
                                long actualTime = mediaPlayer.getTime();
                                android.util.Log.d("VLCFullscreenActivity", "Position après seek: " + actualTime + "ms");
                            }
                        }, 500);
                    } else {
                        android.util.Log.w("VLCFullscreenActivity", "Impossible de positionner - durée: " + 
                            (mediaPlayer != null ? mediaPlayer.getLength() : "N/A"));
                    }
                }, 1500); // Augmenter le délai pour s'assurer que le média est prêt
            }
            
        } catch (Exception e) {
            android.util.Log.e("VLCFullscreenActivity", "Erreur de chargement du média", e);
            finish();
        }
    }
    
    @Override
    public void onEvent(MediaPlayer.Event event) {
        switch (event.type) {
            case MediaPlayer.Event.EndReached:
            case MediaPlayer.Event.EncounteredError:
                finish();
                break;
        }
    }
    
    @Override
    protected void onDestroy() {
        super.onDestroy();
        
        // Nettoyer VLC
        if (mediaPlayer != null) {
            mediaPlayer.stop();
            mediaPlayer.detachViews();
            mediaPlayer.release();
        }
        
        if (libVLC != null) {
            libVLC.release();
        }
    }
    
    @Override
    public void onBackPressed() {
        // Retourner le temps actuel à l'activité principale
        Intent resultIntent = new Intent();
        if (mediaPlayer != null) {
            resultIntent.putExtra("current_time", mediaPlayer.getTime());
        }
        setResult(RESULT_OK, resultIntent);
        finish();
    }
    
    @Override
    public void onUserLeaveHint() {
        super.onUserLeaveHint();
        // Entrer automatiquement en Picture-in-Picture quand l'utilisateur quitte l'app
        activatePictureInPicture();
    }
    
    private void activatePictureInPicture() {
        // Vérifier si PiP est supporté (API 24+)
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.N) {
            android.util.Log.w("VLCFullscreenActivity", "Picture-in-Picture non supporté sur cette version d'Android");
            return;
        }
        
        try {
            // Créer les paramètres PiP
            PictureInPictureParams.Builder pipBuilder = new PictureInPictureParams.Builder();
            
            // Définir le ratio d'aspect (16:9 par défaut)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                pipBuilder.setAspectRatio(new Rational(16, 9));
                
                // Optimisations pour une transition fluide
                pipBuilder.setSourceRectHint(new android.graphics.Rect(0, 0, 
                    videoLayout.getWidth(), videoLayout.getHeight()));
            }
            
            // S'assurer que la vidéo continue de jouer pendant la transition
            if (mediaPlayer != null && !mediaPlayer.isPlaying()) {
                mediaPlayer.play();
            }
            
            android.util.Log.d("VLCFullscreenActivity", "Activation PiP - Position: " + 
                (mediaPlayer != null ? mediaPlayer.getTime() : "N/A") + "ms");
            
            // Entrer en mode Picture-in-Picture
            boolean success = enterPictureInPictureMode(pipBuilder.build());
            
            if (success) {
                android.util.Log.d("VLCFullscreenActivity", "Picture-in-Picture activé depuis le plein écran");
            } else {
                android.util.Log.w("VLCFullscreenActivity", "Échec de l'activation du Picture-in-Picture");
            }
            
        } catch (Exception e) {
            android.util.Log.e("VLCFullscreenActivity", "Erreur lors de l'activation du Picture-in-Picture", e);
        }
    }
    
    @Override
    public void onPictureInPictureModeChanged(boolean isInPictureInPictureMode) {
        super.onPictureInPictureModeChanged(isInPictureInPictureMode);
        
        if (isInPictureInPictureMode) {
            android.util.Log.d("VLCFullscreenActivity", "Entré en mode Picture-in-Picture");
            // En mode PiP, masquer les contrôles overlay
            hideOverlayControls();
            
            // NE PAS recharger le média - continuer la lecture existante
            if (mediaPlayer != null) {
                long currentTime = mediaPlayer.getTime();
                android.util.Log.d("VLCFullscreenActivity", "PiP activé - Position maintenue: " + currentTime + "ms");
                
                // S'assurer que la lecture continue
                if (!mediaPlayer.isPlaying()) {
                    mediaPlayer.play();
                    android.util.Log.d("VLCFullscreenActivity", "Lecture relancée en mode PiP");
                }
            }
        } else {
            android.util.Log.d("VLCFullscreenActivity", "Sorti du mode Picture-in-Picture");
            // Restaurer l'interface normale
            showOverlayControls();
            
            // Vérifier que la lecture continue après sortie du PiP
            if (mediaPlayer != null && !mediaPlayer.isPlaying()) {
                mediaPlayer.play();
                android.util.Log.d("VLCFullscreenActivity", "Lecture relancée après sortie PiP");
            }
        }
    }
    
    private void hideOverlayControls() {
        if (controlsLayout != null) {
            controlsLayout.setVisibility(View.GONE);
        }
    }
    
    private void showOverlayControls() {
        if (controlsLayout != null) {
            controlsLayout.setVisibility(View.VISIBLE);
            // Masquer à nouveau après 3 secondes
            new android.os.Handler().postDelayed(() -> {
                if (controlsLayout != null) {
                    controlsLayout.setVisibility(View.GONE);
                }
            }, 3000);
        }
    }
} 