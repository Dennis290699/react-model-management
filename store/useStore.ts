import { create } from 'zustand';
import { Theme, Model, ViewType } from '../types';

interface AppState {
  theme: Theme;
  toggleTheme: () => void;

  // Model Selection / Casting
  selectedModels: string[];
  toggleModelSelection: (id: string) => void;
  clearSelection: () => void;
  
  // Overlays
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
  isCastingOpen: boolean;
  setIsCastingOpen: (isOpen: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  theme: 'dark', 
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    if (typeof document !== 'undefined') {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    return { theme: newTheme };
  }),
  selectedModels: [],
  toggleModelSelection: (id) => set((state) => {
    const exists = state.selectedModels.includes(id);
    return {
      selectedModels: exists 
        ? state.selectedModels.filter(mId => mId !== id)
        : [...state.selectedModels, id]
    };
  }),
  clearSelection: () => set({ selectedModels: [] }),
  
  isSearchOpen: false,
  setIsSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  isCastingOpen: false,
  setIsCastingOpen: (isOpen) => set({ isCastingOpen: isOpen }),
}));
