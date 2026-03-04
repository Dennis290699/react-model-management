import { create } from 'zustand';
import { Theme, Model, ViewType } from '../types';

interface AppState {
  theme: Theme;
  toggleTheme: () => void;
  
  // Navigation
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;

  // Model Selection / Casting
  selectedModels: string[];
  toggleModelSelection: (id: string) => void;
  clearSelection: () => void;
  
  // Overlays
  viewingModel: Model | null;
  setViewingModel: (model: Model | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
  isCastingOpen: boolean;
  setIsCastingOpen: (isOpen: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
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
  
  currentView: 'home',
  setCurrentView: (view) => set({ currentView: view, viewingModel: null }),

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
  
  viewingModel: null,
  setViewingModel: (model) => set({ viewingModel: model }),
  
  isSearchOpen: false,
  setIsSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  isCastingOpen: false,
  setIsCastingOpen: (isOpen) => set({ isCastingOpen: isOpen }),
}));
