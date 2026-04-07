import { useState, useEffect } from 'react';
import { Github, Star, GitFork, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stars, setStars] = useState('-');
  const [forks, setForks] = useState('-');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/repos/Wizard-Intelligence-Learning-Lab/SimpleTES')
      .then(r => r.json())
      .then(d => {
        if (d.stargazers_count != null) setStars(String(d.stargazers_count));
        if (d.forks_count != null) setForks(String(d.forks_count));
      })
      .catch(() => {
        setStars('0');
        setForks('0');
      });
  }, []);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Results', href: '#results' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-cyan-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
              SimpleTES
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* GitHub Stats & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
              <a
                href="https://github.com/Wizard-Intelligence-Learning-Lab/SimpleTES"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Star className="w-4 h-4" />
                <span>{stars}</span>
              </a>
              <span className="text-slate-700">|</span>
              <a
                href="https://github.com/Wizard-Intelligence-Learning-Lab/SimpleTES/fork"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <GitFork className="w-4 h-4" />
                <span>{forks}</span>
              </a>
            </div>
            <Button
              size="sm"
              className="bg-cyan-500 text-black hover:bg-cyan-400 font-bold"
              asChild
            >
              <a
                href="https://github.com/Wizard-Intelligence-Learning-Lab/SimpleTES"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" />
                Star
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-cyan-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-cyan-500/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
