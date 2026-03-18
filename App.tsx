import React, { useEffect, useState } from 'react';
import { useStore } from './store/useStore';
import { Header } from './components/layout/header';
import { Footer } from './components/layout/footer';
import { Hero } from './components/sections/hero';
import { PopularModels } from './components/sections/popular-models';
import { ElleFeature } from './components/sections/elle-feature';
import { Categories } from './components/sections/categories';
import { Testimonials } from './components/sections/testimonials';
import { ModelPortfolio } from './components/pages/portfolio';
import { SearchOverlay } from './components/layout/search-overlay';
import { CastingOverlay } from './components/layout/casting-overlay';
import { CategoryPage } from './components/pages/category-page';
import { Preloader } from './components/layout/preloader';
import { AnimatePresence } from 'framer-motion';
import { models } from './data/mock-models';
import { ViewType } from './types';


const App: React.FC = () => {
  const { theme, viewingModel, currentView } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Handle URL syncing
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const store = useStore.getState();
      
      if (path.startsWith('/model/')) {
        const id = path.split('/')[2];
        const model = models.find(m => m.id === id) || null;
        if (model) {
          store.setViewingModel(model);
        } else {
          store.setCurrentView('home');
        }
      } else {
        const view = path === '/' ? 'home' : path.substring(1);
        // Only set view if it's a valid category or home to avoid random paths breaking it
        const validViews = ['home', 'women', 'men', 'new-faces', 'direct', 'curve', 'creatives'];
        if (validViews.includes(view)) {
          store.setCurrentView(view as ViewType);
        } else {
          store.setCurrentView('home');
          window.history.replaceState(null, '', '/');
        }
      }
    };

    // Call on mount to handle initial deep link
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Render logic for main content area
  const renderMainContent = () => {
    if (currentView === 'home') {
      return (
        <div key="home">
          <Hero />
          <PopularModels />
          <ElleFeature />
          <Categories />
          <Testimonials />
        </div>
      );
    }
    
    // Render specific category page
    return <CategoryPage key={currentView} category={currentView} />;
  };

  return (
    <>
      {/* Preloader launches once on mount */}
      <AnimatePresence>
        {isLoading && (
           <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 overflow-x-hidden font-sans selection:bg-gold-500 selection:text-white">
        
        <SearchOverlay />
        <CastingOverlay />
        
        <AnimatePresence mode="wait">
          {viewingModel ? (
            <ModelPortfolio key="portfolio" model={viewingModel} />
          ) : (
            <div key="main-app" className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                 <AnimatePresence mode="wait">
                    {renderMainContent()}
                 </AnimatePresence>
              </main>
              <Footer />
            </div>
          )}
        </AnimatePresence>
        
      </div>
    </>
  );
};

export default App;
