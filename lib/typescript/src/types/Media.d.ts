/**
 * Types pour les sources média et configuration VLC
 */
export interface MediaSource {
    /** URI de la source média (locale ou réseau) */
    uri: string;
    /** Headers HTTP optionnels pour les sources réseau */
    headers?: Record<string, string>;
    /** Type MIME optionnel */
    type?: string;
    /** Titre du média */
    title?: string;
    /** Métadonnées additionnelles */
    metadata?: MediaMetadata;
}
export interface MediaMetadata {
    /** Titre du média */
    title?: string;
    /** Artiste */
    artist?: string;
    /** Album */
    album?: string;
    /** Durée en millisecondes */
    duration?: number;
    /** URL de l'artwork */
    artwork?: string;
    /** Description */
    description?: string;
}
export interface MediaInfo {
    /** Durée totale en millisecondes */
    duration: number;
    /** Largeur de la vidéo */
    width?: number;
    /** Hauteur de la vidéo */
    height?: number;
    /** Ratio d'aspect */
    aspectRatio?: string;
    /** Framerate */
    fps?: number;
    /** Bitrate */
    bitrate?: number;
    /** Codec vidéo */
    videoCodec?: string;
    /** Codec audio */
    audioCodec?: string;
    /** Pistes audio disponibles */
    audioTracks?: AudioTrack[];
    /** Pistes de sous-titres disponibles */
    subtitleTracks?: SubtitleTrack[];
}
export interface AudioTrack {
    /** ID de la piste */
    id: number;
    /** Nom de la piste */
    name: string;
    /** Langue (code ISO) */
    language?: string;
    /** Description */
    description?: string;
}
export interface SubtitleTrack {
    /** ID de la piste */
    id: number;
    /** Nom de la piste */
    name: string;
    /** Langue (code ISO) */
    language?: string;
    /** Encodage */
    encoding?: string;
    /** Type (SRT, VTT, etc.) */
    type?: string;
}
export type MediaFormat = 'mp4' | 'avi' | 'mkv' | 'mov' | 'flv' | 'webm' | 'm3u8' | 'mpd' | 'rtmp' | 'rtsp' | 'unknown';
export type StreamingProtocol = 'hls' | 'dash' | 'rtmp' | 'rtsp' | 'http' | 'https';
//# sourceMappingURL=Media.d.ts.map