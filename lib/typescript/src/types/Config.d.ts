/**
 * Types pour la configuration du lecteur VLC
 */
export interface VLCPlayerConfig {
    /** Lecture automatique */
    autoPlay?: boolean;
    /** Lecture en boucle */
    loop?: boolean;
    /** Son coupé par défaut */
    muted?: boolean;
    /** Volume initial (0-100) */
    volume?: number;
    /** Vitesse de lecture initiale (0.25-4.0) */
    rate?: number;
    /** Cache réseau en millisecondes */
    networkCaching?: number;
    /** Reconnexion automatique HTTP */
    httpReconnect?: boolean;
    /** Timeout de connexion en millisecondes */
    connectionTimeout?: number;
    /** User-Agent personnalisé */
    userAgent?: string;
    /** Afficher les contrôles */
    showControls?: boolean;
    /** Timeout des contrôles en millisecondes */
    controlsTimeout?: number;
    /** Autoriser le plein écran */
    allowFullscreen?: boolean;
    /** Thème de l'interface */
    theme?: 'light' | 'dark' | 'auto';
    /** Décodage matériel */
    hardwareDecoding?: boolean;
    /** Encodage des sous-titres */
    subtitleEncoding?: string;
    /** Taille des sous-titres */
    subtitleSize?: number;
    /** Couleur des sous-titres */
    subtitleColor?: string;
    /** Normalisation audio */
    audioNormalization?: boolean;
    /** Égaliseur audio */
    audioEqualizer?: AudioEqualizerConfig;
    /** Ratio d'aspect forcé */
    aspectRatio?: string;
    /** Mode de redimensionnement */
    resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
    /** Rotation de la vidéo */
    rotation?: 0 | 90 | 180 | 270;
    /** Nombre de threads de décodage */
    decodingThreads?: number;
    /** Taille du buffer en millisecondes */
    bufferSize?: number;
    /** Préchargement */
    preload?: 'none' | 'metadata' | 'auto';
}
export interface AudioEqualizerConfig {
    /** Activer l'égaliseur */
    enabled: boolean;
    /** Préréglage */
    preset?: string;
    /** Bandes de fréquences (en dB) */
    bands: number[];
}
export interface ControlsConfig {
    /** Afficher le bouton play/pause */
    showPlayPause?: boolean;
    /** Afficher la barre de progression */
    showProgress?: boolean;
    /** Afficher les contrôles de volume */
    showVolume?: boolean;
    /** Afficher le bouton plein écran */
    showFullscreen?: boolean;
    /** Afficher les boutons de saut */
    showSkip?: boolean;
    /** Afficher le temps */
    showTime?: boolean;
    /** Position des contrôles */
    position?: 'top' | 'bottom' | 'overlay';
    /** Style personnalisé */
    style?: ControlsStyle;
}
export interface ControlsStyle {
    /** Couleur de fond */
    backgroundColor?: string;
    /** Couleur du texte */
    textColor?: string;
    /** Couleur des boutons */
    buttonColor?: string;
    /** Couleur de la barre de progression */
    progressColor?: string;
    /** Couleur du buffer */
    bufferColor?: string;
    /** Opacité */
    opacity?: number;
    /** Bordures arrondies */
    borderRadius?: number;
}
export interface SubtitleConfig {
    /** Piste de sous-titres par défaut */
    defaultTrack?: number;
    /** Encodage par défaut */
    encoding?: string;
    /** Taille de police */
    fontSize?: number;
    /** Couleur du texte */
    color?: string;
    /** Couleur de fond */
    backgroundColor?: string;
    /** Position verticale (0-1) */
    position?: number;
    /** Police */
    fontFamily?: string;
    /** Style de police */
    fontWeight?: 'normal' | 'bold';
}
export interface NetworkConfig {
    /** Headers HTTP par défaut */
    defaultHeaders?: Record<string, string>;
    /** Certificats SSL personnalisés */
    sslCertificates?: string[];
    /** Ignorer les erreurs SSL */
    ignoreSslErrors?: boolean;
    /** Proxy configuration */
    proxy?: ProxyConfig;
}
export interface ProxyConfig {
    /** Type de proxy */
    type: 'http' | 'socks4' | 'socks5';
    /** Hôte du proxy */
    host: string;
    /** Port du proxy */
    port: number;
    /** Nom d'utilisateur */
    username?: string;
    /** Mot de passe */
    password?: string;
}
//# sourceMappingURL=Config.d.ts.map