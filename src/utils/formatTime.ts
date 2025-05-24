/**
 * Utilitaires de formatage du temps
 */

/**
 * Formate un temps en millisecondes vers un format lisible (HH:MM:SS ou MM:SS)
 */
export const formatTime = (timeMs: number): string => {
  // Vérification des valeurs invalides
  if (timeMs == null || !isFinite(timeMs) || isNaN(timeMs) || timeMs < 0) {
    return '00:00';
  }

  const totalSeconds = Math.floor(timeMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};

/**
 * Parse un temps formaté vers des millisecondes
 */
export const parseTime = (timeString: string): number => {
  const parts = timeString.split(':').map(Number);

  if (parts.length === 2) {
    // MM:SS
    const [minutes, seconds] = parts;
    return (minutes * 60 + seconds) * 1000;
  } else if (parts.length === 3) {
    // HH:MM:SS
    const [hours, minutes, seconds] = parts;
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  }

  return 0;
};

/**
 * Formate une durée en format court (ex: "1h 23m", "45s")
 */
export const formatDuration = (timeMs: number): string => {
  // Vérification des valeurs invalides
  if (timeMs == null || !isFinite(timeMs) || isNaN(timeMs) || timeMs < 0) {
    return '0s';
  }

  const totalSeconds = Math.floor(timeMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }

  if (minutes > 0) {
    return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  }

  return `${seconds}s`;
};
