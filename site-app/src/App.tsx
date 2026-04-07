import { useEffect } from 'react';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { HowItWorks } from './sections/HowItWorks';
import { Results } from './sections/Results';
import { Comments } from './sections/Comments';
import { CTA } from './sections/CTA';
import { Footer } from './sections/Footer';
import './App.css';

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-black noise-overlay">
      <Navigation />
      <main>
        <Hero />
        <HowItWorks />
        <Results />
        <Comments />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
