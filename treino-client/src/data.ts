import { Exercise } from './app/utils/interfaces';

const types = {
  triceps: 'triceps',
  biceps: 'biceps',
  chest: 'peitoral',
  quads: 'quadriceps',
};

export const equipaments = [
  { value: 'halteres', label: 'Halteres' },
  { value: 'barra', label: 'Barra' },
  { value: 'barra w', label: 'Barra W' },
  { value: 'polia', label: 'Polia' },
  { value: 'peso corporal', label: 'Peso Corporal' },
  { value: 'máquina', label: 'Máquina' },
  { value: 'smith', label: 'Smith' },
];

export const muscles = [
  { value: 'triceps', label: 'Tríceps' },
  { value: 'bíceps', label: 'Bíceps' },
  { value: 'peito', label: 'Peitoral' },
  { value: 'costas', label: 'Costas' },
  { value: 'ombros', label: 'Ombros' },
  { value: 'quadriceps', label: 'Quadríceps' },
  { value: 'panturrilha', label: 'Panturrilha' },
  { value: 'abdômen', label: 'Abdômen' },
  { value: 'trapézio', label: 'Trapézio' },
  { value: 'glúteos', label: 'Glúteos' },
  { value: 'antebraço', label: 'Antebraço' },
];

const difficulty = {
  novice: 'FRANGO',
  bigginer: 'iniciante',
  intermediary: 'intermediário',
  advance: 'avançado',
};

export const goals = [
  { value: 'STRENGTH_GAIN', label: 'Ganho de Força' },
  { value: 'CARDIO', label: 'Cardio' },
  { value: 'MUSCLE_GAIN', label: 'Ganho de Massa' },
  { value: 'WEIGHT_LOSS', label: 'Perda de Gordura' },
];
