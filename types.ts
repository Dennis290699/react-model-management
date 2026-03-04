
export interface ModelStats {
  height: string;
  dress: string;
  bust: string;
  waist: string;
  hips: string;
  shoe: string;
  hair: string;
  eyes: string;
}

export type CategoryType = 'women' | 'men' | 'new-faces' | 'direct' | 'curve' | 'creatives';

export interface Model {
  id: string;
  name: string;
  location: string;
  image: string;
  category?: CategoryType;
  badges?: string[];
  stats: ModelStats;
  isNew?: boolean;
  brands?: string[]; // List of brands the model has worked with
  bio?: string;
  quote?: string;
  portfolio?: string[]; // Dynamic gallery images
  compCard?: string; // Specific downloadable comp card image
}

export interface Category {
  id: string;
  title: string;
  image: string;
}

export type Theme = 'light' | 'dark';
export type ViewType = 'home' | CategoryType;