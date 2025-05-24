/**
 * Tests pour les utilitaires de formatage de temps
 * Phase 1, Semaine 4 : Tests des fonctions utilitaires
 */

import { formatTime, formatDuration, parseTime } from '../../src/utils/formatTime';

describe('formatTime', () => {
  it('should format time in milliseconds correctly', () => {
    expect(formatTime(0)).toBe('00:00');
    expect(formatTime(30000)).toBe('00:30');
    expect(formatTime(60000)).toBe('01:00');
    expect(formatTime(90000)).toBe('01:30');
    expect(formatTime(3661000)).toBe('01:01:01');
  });

  it('should handle negative values', () => {
    expect(formatTime(-30000)).toBe('00:00');
    expect(formatTime(-3661000)).toBe('00:00');
  });

  it('should handle large values', () => {
    expect(formatTime(7200000)).toBe('02:00:00');
    expect(formatTime(86400000)).toBe('24:00:00');
  });

  it('should handle decimal values', () => {
    expect(formatTime(30500)).toBe('00:30');
    expect(formatTime(90900)).toBe('01:30');
  });

  it('should format minutes and seconds without hours', () => {
    expect(formatTime(120000)).toBe('02:00');
    expect(formatTime(3599000)).toBe('59:59');
  });

  it('should format with hours when needed', () => {
    expect(formatTime(3600000)).toBe('01:00:00');
    expect(formatTime(3661000)).toBe('01:01:01');
  });
});

describe('formatDuration', () => {
  it('should format duration in short format', () => {
    expect(formatDuration(3661000)).toBe('1h 1m');
    expect(formatDuration(3600000)).toBe('1h');
    expect(formatDuration(120000)).toBe('2m');
    expect(formatDuration(45000)).toBe('45s');
  });

  it('should handle zero duration', () => {
    expect(formatDuration(0)).toBe('0s');
  });

  it('should handle minutes only', () => {
    expect(formatDuration(120000)).toBe('2m');
    expect(formatDuration(180000)).toBe('3m');
  });

  it('should handle seconds only', () => {
    expect(formatDuration(45000)).toBe('45s');
    expect(formatDuration(30000)).toBe('30s');
  });

  it('should handle hours and minutes', () => {
    expect(formatDuration(7200000)).toBe('2h');
    expect(formatDuration(7320000)).toBe('2h 2m');
  });

  it('should handle minutes and seconds', () => {
    expect(formatDuration(125000)).toBe('2m 5s');
    expect(formatDuration(65000)).toBe('1m 5s');
  });

  it('should handle negative values', () => {
    expect(formatDuration(-30000)).toBe('0s');
    expect(formatDuration(-3661000)).toBe('0s');
  });
});

describe('parseTime', () => {
  it('should parse MM:SS format', () => {
    expect(parseTime('01:30')).toBe(90000);
    expect(parseTime('00:45')).toBe(45000);
    expect(parseTime('10:00')).toBe(600000);
  });

  it('should parse HH:MM:SS format', () => {
    expect(parseTime('01:30:45')).toBe(5445000);
    expect(parseTime('02:00:00')).toBe(7200000);
    expect(parseTime('00:01:30')).toBe(90000);
  });

  it('should handle invalid formats', () => {
    expect(parseTime('invalid')).toBe(0);
    expect(parseTime('')).toBe(0);
    expect(parseTime('1:2:3:4')).toBe(0);
  });

  it('should handle edge cases', () => {
    expect(parseTime('00:00')).toBe(0);
    expect(parseTime('59:59')).toBe(3599000);
    expect(parseTime('23:59:59')).toBe(86399000);
  });
});

describe('Edge Cases and Error Handling', () => {
  it('should handle NaN values', () => {
    expect(formatTime(NaN)).toBe('00:00');
    expect(formatDuration(NaN)).toBe('0s');
  });

  it('should handle Infinity values', () => {
    expect(formatTime(Infinity)).toBe('00:00');
    expect(formatDuration(Infinity)).toBe('0s');
  });

  it('should handle null and undefined', () => {
    expect(formatTime(null as any)).toBe('00:00');
    expect(formatTime(undefined as any)).toBe('00:00');
    expect(formatDuration(null as any)).toBe('0s');
    expect(formatDuration(undefined as any)).toBe('0s');
  });
}); 