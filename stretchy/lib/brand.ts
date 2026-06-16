// Stretchy brand tokens — matches the design system in the prototype.

export const colors = {
  black: '#1A1A1A',
  cream: '#F5EDE3',
  darkCard: '#2A2A2A',
  lightCard: '#FFF8F4',
  pink: '#B5DDE9',
  blue: '#2C8FE0',
  yellow: '#FFD166',
  orange: '#FF6B35',
  red: '#E63946',
  purple: '#A535C7',
  royal: '#2A3FE0',
  sky: '#4FB8E0',
  olive: '#7A8330',
  green: '#4CAF82',
  hold: '#A8D5E2',
} as const;

export const movement = {
  yoga:    { color: '#A535C7', label: 'YOGA',    initial: 'Y' },
  pilates: { color: '#2A3FE0', label: 'PILATES', initial: 'P' },
  breath:  { color: '#7A8330', label: 'BREATH',  initial: 'B' },
  sound:   { color: '#4FB8E0', label: 'SOUND',   initial: '♪' },
  flow:    { color: '#FF6B35', label: 'FLOW',    initial: '⟡' },
  run:     { color: '#E63946', label: 'RUN',     initial: 'R' },
  hiit:    { color: '#FF4D9E', label: 'HIIT',    initial: '⚡' },
} as const;

export type MovementType = keyof typeof movement;

export const MOVEMENT_TYPES = [
  { id: 'yoga',    emoji: '🧘', color: '#A535C7', label: 'Yoga' },
  { id: 'pilates', emoji: '🤸', color: '#2A3FE0', label: 'Pilates' },
  { id: 'breath',  emoji: '🌬️', color: '#7A8330', label: 'Breathwork' },
  { id: 'sound',   emoji: '🎵', color: '#4FB8E0', label: 'Sound Bath' },
  { id: 'flow',    emoji: '🌊', color: '#FF6B35', label: 'Flow' },
  { id: 'run',     emoji: '🏃', color: '#E63946', label: 'Run Club' },
  { id: 'hiit',    emoji: '⚡', color: '#FF4D9E', label: 'HIIT' },
] as const;
