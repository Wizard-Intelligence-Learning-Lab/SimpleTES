import { useEffect, useRef } from 'react';
import { Quote, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const comments = [
  {
    text: 'A remarkably clean reproduction of AlphaEvolve. The minimal codebase makes it ideal for teaching evolutionary computation in graduate seminars.',
    author: 'Prof. David Chen',
    role: 'Computer Science, MIT',
    source: '#',
  },
  {
    text: 'The exploitation-exploration balance is well-calibrated. We\'ve integrated it into our research pipeline for program synthesis benchmarks.',
    author: 'Dr. Sarah Liu',
    role: 'AI Research Lab, Stanford',
    source: '#',
  },
  {
    text: 'Finally, an evolutionary framework that doesn\'t require a PhD to set up. The right level of abstraction for rapid prototyping.',
    author: 'Prof. Michael Wang',
    role: 'Machine Learning, CMU',
    source: '#',
  },
  {
    text: 'LLM-agnostic design is the killer feature. We swapped from GPT-4 to Gemini mid-experiment without changing a single line of task code.',
    author: 'Dr. Emily Zhang',
    role: 'Senior ML Engineer, Google',
    source: '#',
  },
  {
    text: 'Auto-checkpointing saves hours of headache. Combined with resume capability, long-running evolution experiments become truly practical.',
    author: 'Dr. James Park',
    role: 'Optimization Research, Berkeley',
    source: '#',
  },
];

export function Comments() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.comments-title',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const allComments = [...comments, ...comments];

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 geometric-grid opacity-30" />
      <div className="absolute inset-0 network-lines" />

      <div className="relative">
        {/* Section Header */}
        <div className="comments-title text-center mb-16 px-4">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-cyan-500/50" />
            <span className="text-sm font-medium text-cyan-400 uppercase tracking-wider">Testimonials</span>
            <div className="w-8 h-0.5 bg-cyan-500/50" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What Researchers Say</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Selected reactions from researchers and practitioners using SimpleTES 
            in their work.
          </p>
        </div>

        {/* Scrolling comments */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Track */}
          <div
            className="flex gap-6 animate-scroll-left hover:[animation-play-state:paused]"
            style={{ width: 'max-content' }}
          >
            {allComments.map((comment, index) => (
              <div
                key={index}
                className="w-[400px] flex-shrink-0 p-6 rounded-2xl 
                           bg-cyan-500/[0.02] border border-cyan-500/10 
                           hover:border-cyan-500/30 hover:bg-cyan-500/[0.04]
                           transition-all duration-300 group"
              >
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-cyan-500/30 mb-4 group-hover:text-cyan-400/50 transition-colors" />

                {/* Comment text */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  "{comment.text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium text-sm">
                      {comment.author}
                    </h4>
                    <p className="text-slate-500 text-xs">{comment.role}</p>
                  </div>
                  <a
                    href={comment.source}
                    className="p-2 rounded-lg bg-cyan-500/5 text-slate-500 
                               hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
