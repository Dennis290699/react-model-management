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
import { Routes, Route, useLocation, useParams, useMatch, Navigate } from 'react-router-dom';


const CategoryPageWrapper = () => {
  const { category } = useParams();
  const validViews = ['women', 'men', 'new-faces', 'direct', 'curve', 'creatives'];
  if (!category || !validViews.includes(category)) {
    return <Navigate to="/" replace />;
  }
  return <CategoryPage key={category} category={category as ViewType} />;
};

const App: React.FC = () => {
  const { theme } = useStore();
  const location = useLocation();
  
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof sessionStorage !== 'undefined') {
      return !sessionStorage.getItem('hasSeenPreloader');
    }
    return true;
  });

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('hasSeenPreloader', 'true');
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Scroll to top when navigating to a new category or top-level page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const modelMatch = useMatch('/model/:id');
  const viewingModelId = modelMatch?.params.id;
  const viewingModel = viewingModelId ? models.find(m => m.id === viewingModelId) : null;

  return (
    <>
      <AnimatePresence>
        {isLoading && (
           <Preloader onComplete={handlePreloaderComplete} />
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
                    {/* @ts-expect-error key is valid in React but missing in RRD types */}
                    <Routes location={location} key={location.pathname}>
                       <Route path="/" element={
                          <div key="home">
                            <Hero />
                            <PopularModels />
                            <ElleFeature />
                            <Categories />
                            <Testimonials />
                          </div>
                       } />
                       <Route path="/:category" element={<CategoryPageWrapper />} />
                    </Routes>
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
