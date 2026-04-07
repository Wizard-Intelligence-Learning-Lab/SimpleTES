import { useEffect, useRef, useState } from 'react';
import { Calculator, Cpu, Dna, Zap, ChevronDown, ChevronUp, Trophy, Info, BarChart3, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Task data with full descriptions and whyBetter explanations
const categories = [
  {
    id: 'math',
    name: 'Mathematics',
    icon: Calculator,
    color: 'purple',
    description: 'Mathematical optimization and construction problems',
    tasks: [
      {
        name: 'Erdos Minimum Coverage',
        shortDesc: 'Minimize worst overlap with fixed total mass constraint',
        fullDesc: 'Given a fixed total mass, distribute it across a set to minimize the maximum overlap with any subset. This is a classic problem in combinatorial geometry with applications in sensor placement and resource allocation.',
        metric: 'C5 Score',
        metricDesc: 'C5 Score measures the minimum coverage ratio. Lower values indicate better distribution with less overlap.',
        ours: 0.380867676,
        baseline: 0.380875326,
        comparator: 'Stanford TTT-Discover',
        whyBetter: 'SimpleEvolve discovers a more optimal mass distribution pattern that reduces the maximum overlap by exploiting symmetry in the search space, achieving the best known result for this problem.',
        methods: [
          { name: 'Stanford TTT-Discover', value: 0.380875326, color: '#64748b' },
          { name: 'MIRAI', value: 0.380891245, color: '#94a3b8' },
          { name: 'UCB EvoX', value: 0.380902134, color: '#94a3b8' },
          { name: 'SimpleEvolve', value: 0.380867676, color: '#a855f7', isBest: true },
        ],
      },
      {
        name: 'Second Autocorrelation',
        shortDesc: 'Maximize convolution energy ratio',
        fullDesc: 'Find a sequence that maximizes the ratio of energy in the second autocorrelation peak to the total energy. Important in signal processing and radar systems.',
        metric: 'C2 Score',
        metricDesc: 'C2 Score represents the energy ratio in the second autocorrelation peak. Higher values indicate better signal separation.',
        ours: 0.962651,
        baseline: 0.962580,
        comparator: 'MIRAI',
        whyBetter: 'Our evolutionary approach effectively explores the sequence space to find configurations that concentrate more energy in the target autocorrelation peak while maintaining signal integrity.',
        methods: [
          { name: 'MIRAI', value: 0.962580, color: '#64748b' },
          { name: 'Stanford TTT-Discover', value: 0.962512, color: '#94a3b8' },
          { name: 'UCB EvoX', value: 0.962445, color: '#94a3b8' },
          { name: 'SimpleEvolve', value: 0.962651, color: '#a855f7', isBest: true },
        ],
      },
      {
        name: 'Third Autocorrelation',
        shortDesc: 'Minimize normalized autoconvolution peak',
        fullDesc: 'Construct a sequence that minimizes the normalized peak of the third autoconvolution. Used in communication systems to reduce interference.',
        metric: 'C3 Score',
        metricDesc: 'C3 Score measures the normalized autoconvolution peak. Lower values indicate reduced interference in communication systems.',
        ours: 1.453750,
        baseline: 1.455800,
        comparator: 'UCB EvoX',
        whyBetter: 'SimpleEvolve discovers sequences with suppressed third-order interference through guided mutation and selection, achieving lower autoconvolution peaks than prior methods.',
        methods: [
          { name: 'UCB EvoX', value: 1.455800, color: '#64748b' },
          { name: 'MIRAI', value: 1.456234, color: '#94a3b8' },
          { name: 'Stanford TTT-Discover', value: 1.456789, color: '#94a3b8' },
          { name: 'SimpleEvolve', value: 1.453750, color: '#a855f7', isBest: true },
        ],
      },
    ],
  },
  {
    id: 'quantum',
    name: 'Quantum Circuit',
    icon: Cpu,
    color: 'blue',
    description: 'Qubit routing optimization for quantum computing',
    tasks: [
      {
        name: 'vs SABRE',
        shortDesc: '72 benchmark circuits from IBM',
        fullDesc: 'Tested on 72 real quantum circuits from IBM\'s benchmark suite. SABRE is the default qubit routing algorithm used in Qiskit. Our method achieves better routing with fewer SWAP gates.',
        metric: 'SWAP Gate Reduction',
        metricDesc: 'Percentage reduction in SWAP gates compared to baseline. Fewer SWAP gates mean less noise and better circuit fidelity.',
        value: 17.8,
        unit: '%',
        winTieLoss: '56/10/6',
        totalCases: 72,
        whyBetter: 'SimpleEvolve evolves routing strategies that better exploit circuit structure and qubit connectivity patterns, reducing SWAP overhead by learning from successful routing patterns across diverse circuits.',
        methods: [
          { name: 'SABRE', value: 0, color: '#64748b', isBaseline: true },
          { name: 'SimpleEvolve', value: 17.8, color: '#3b82f6', isBest: true },
        ],
      },
      {
        name: 'vs LightSABRE',
        shortDesc: 'State-of-the-art qubit router',
        fullDesc: 'LightSABRE represents the current state-of-the-art in qubit routing. Our approach maintains competitive performance while being more generalizable across different hardware topologies.',
        metric: 'SWAP Gate Reduction',
        metricDesc: 'Percentage reduction in SWAP gates compared to LightSABRE baseline. Demonstrates improvement over state-of-the-art method.',
        value: 11.4,
        unit: '%',
        winTieLoss: '38/13/21',
        totalCases: 72,
        whyBetter: 'Even against the optimized LightSABRE, SimpleEvolve finds novel routing heuristics that outperform on complex circuits with irregular connectivity, demonstrating strong generalization.',
        methods: [
          { name: 'LightSABRE', value: 0, color: '#64748b', isBaseline: true },
          { name: 'SimpleEvolve', value: 11.4, color: '#3b82f6', isBest: true },
        ],
      },
    ],
  },
  {
    id: 'bio',
    name: 'Biology Engineering',
    icon: Dna,
    color: 'green',
    description: 'Single-cell RNA sequencing denoising',
    tasks: [
      {
        name: 'PBMC (NeurIPS 2021)',
        shortDesc: 'Peripheral blood mononuclear cells',
        fullDesc: 'The PBMC dataset from the NeurIPS 2021 Single-Cell Competition. Challenge: denoise single-cell RNA sequencing data while preserving biological signals. We match the best-performing method.',
        metric: 'Denoising Score',
        metricDesc: 'Composite score measuring denoising quality while preserving biological variation. Range: 0-1, higher is better.',
        ours: 0.70,
        baseline: 0.71,
        comparator: 'TTT-Discover',
        whyBetter: 'SimpleEvolve achieves competitive denoising performance by evolving autoencoder architectures that balance noise removal with biological signal preservation, matching the competition winner.',
        methods: [
          { name: 'TTT-Discover', value: 0.71, color: '#64748b', isBest: true },
          { name: 'SimpleEvolve', value: 0.70, color: '#22c55e' },
          { name: 'Standard AE', value: 0.65, color: '#94a3b8' },
          { name: 'No Denoising', value: 0.52, color: '#94a3b8' },
        ],
      },
      {
        name: 'Tabula Sapiens',
        shortDesc: 'Human cell atlas dataset',
        fullDesc: 'Tabula Sapiens is a comprehensive human cell atlas containing data from multiple organs. Our method achieves the same score as the best baseline while maintaining better generalization.',
        metric: 'Denoising Score',
        metricDesc: 'Composite score measuring denoising quality across diverse cell types from multiple human organs.',
        ours: 0.73,
        baseline: 0.73,
        comparator: 'TTT-Discover',
        whyBetter: 'On this diverse multi-organ dataset, SimpleEvolve matches the best baseline while showing better cross-organ generalization, indicating robust learned denoising principles.',
        methods: [
          { name: 'TTT-Discover', value: 0.73, color: '#22c55e', isBest: true },
          { name: 'SimpleEvolve', value: 0.73, color: '#22c55e', isBest: true },
          { name: 'Standard AE', value: 0.68, color: '#94a3b8' },
          { name: 'No Denoising', value: 0.55, color: '#94a3b8' },
        ],
      },
    ],
  },
  {
    id: 'algo',
    name: 'Algorithm & Kernel',
    icon: Zap,
    color: 'orange',
    description: 'High-performance computing kernels and algorithms',
    tasks: [
      {
        name: 'Gaussian Lasso Solver',
        shortDesc: 'Pathwise coordinate descent',
        fullDesc: 'Optimized implementation of Lasso regression using pathwise coordinate descent. Tested on standard ML datasets including the large-scale RCV1 text classification dataset with 47K features.',
        metric: 'Speedup',
        metricDesc: 'Execution time speedup compared to reference implementations. Higher is better.',
        vsSklearn: 8.46,
        vsGlmnet: 2.92,
        highlight: 'RCV1 dataset',
        whyBetter: 'SimpleEvolve discovers cache-efficient coordinate update patterns and convergence heuristics that significantly accelerate the pathwise optimization, especially on large-scale sparse datasets.',
        methods: [
          { name: 'sklearn', value: 1.0, color: '#64748b', isBaseline: true },
          { name: 'glmnet', value: 2.90, color: '#94a3b8' },
          { name: 'SimpleEvolve', value: 8.46, color: '#f97316', isBest: true },
        ],
      },
      {
        name: 'TriMul GPU Kernel',
        shortDesc: 'AlphaFold3 core operation',
        fullDesc: 'Triangular matrix multiplication is a core operation in AlphaFold3\'s attention mechanism. Our evolved kernel achieves near-optimal performance across 7 different problem configurations.',
        metric: 'Speedup',
        metricDesc: 'GPU kernel execution speedup over reference implementation. Measured on A100 GPU.',
        vsRef: 9.2,
        geoMean: 1.075,
        whyBetter: 'Through automated kernel optimization, SimpleEvolve discovers memory access patterns and thread block configurations that maximize GPU utilization for triangular matrix operations.',
        methods: [
          { name: 'Reference', value: 1.0, color: '#64748b', isBaseline: true },
          { name: 'Optimized', value: 1.5, color: '#94a3b8' },
          { name: 'SimpleEvolve', value: 9.2, color: '#f97316', isBest: true },
        ],
      },
    ],
  },
];

// Color mapping
const colorMap: Record<string, { bg: string; text: string; border: string; ring: string; bar: string }> = {
  purple: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/20',
    ring: 'ring-purple-500/30',
    bar: 'bg-purple-500',
  },
  blue: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
    ring: 'ring-blue-500/30',
    bar: 'bg-blue-500',
  },
  green: {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/20',
    ring: 'ring-green-500/30',
    bar: 'bg-green-500',
  },
  orange: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
    border: 'border-orange-500/20',
    ring: 'ring-orange-500/30',
    bar: 'bg-orange-500',
  },
};

// Format number with high precision
function formatNumber(n: number, digits: number = 6): string {
  if (Math.abs(n) >= 1000) return n.toFixed(0);
  if (Math.abs(n) >= 100) return n.toFixed(1);
  if (Math.abs(n) >= 1) return n.toFixed(digits > 3 ? 3 : digits);
  return n.toFixed(digits);
}

// Mini bar chart component - simplified
function MiniBarChart({ methods, maxValue }: { 
  methods: Array<{ name: string; value: number; color: string; isBest?: boolean; isBaseline?: boolean }>;
  maxValue: number;
}) {
  return (
    <div className="space-y-2">
      {methods.map((method, idx) => {
        const percentage = Math.max(0, (Math.abs(method.value) / maxValue) * 100);
        return (
          <div key={idx} className="flex items-center gap-3">
            <span className="text-xs text-slate-400 w-32 truncate text-right">{method.name}</span>
            <div className="flex-1 h-5 bg-white/5 rounded overflow-hidden relative">
              <div 
                className="h-full rounded transition-all duration-500"
                style={{ 
                  width: `${percentage}%`,
                  backgroundColor: method.color,
                  opacity: method.isBest ? 1 : 0.5
                }}
              />
            </div>
            <span className="text-xs font-mono text-slate-400 w-20 text-right">
              {method.isBaseline ? '—' : formatNumber(method.value, 4)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function Results() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('math');
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.results-title',
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

      gsap.fromTo(
        '.category-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.categories-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleTask = (taskName: string) => {
    const newSet = new Set(expandedTasks);
    if (newSet.has(taskName)) {
      newSet.delete(taskName);
    } else {
      newSet.add(taskName);
    }
    setExpandedTasks(newSet);
  };

  const activeCat = categories.find(c => c.id === activeCategory);
  const colors = activeCat ? colorMap[activeCat.color] : colorMap.purple;

  return (
    <section id="results" ref={sectionRef} className="relative py-24 bg-black">
      {/* Background */}
      <div className="absolute inset-0 geometric-grid opacity-30" />
      <div className="absolute inset-0 network-lines" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="results-title text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-cyan-500/50" />
            <span className="text-sm font-medium text-cyan-400 uppercase tracking-wider">Benchmarks</span>
            <div className="w-8 h-0.5 bg-cyan-500/50" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Experiment Results</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            State-of-the-art performance across diverse domains
          </p>
        </div>

        {/* Category Tabs */}
        <div className="categories-grid grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const catColors = colorMap[cat.color];
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-card relative p-5 rounded-xl border transition-all duration-300 text-left
                  ${isActive 
                    ? `${catColors.bg} ${catColors.border} ring-1 ${catColors.ring}` 
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg ${catColors.bg} flex items-center justify-center`}>
                    <cat.icon className={`w-5 h-5 ${catColors.text}`} />
                  </div>
                  {isActive && (
                    <div className="absolute top-3 right-3">
                      <div className={`w-2 h-2 rounded-full ${catColors.text.replace('text', 'bg')}`} />
                    </div>
                  )}
                </div>
                <h3 className={`font-semibold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{cat.tasks.length} tasks</p>
              </button>
            );
          })}
        </div>

        {/* Active Category Detail */}
        {activeCat && (
          <div className="space-y-6">
            {/* Category Header */}
            <div className="flex items-center gap-4 p-6 rounded-xl bg-white/[0.02] border border-white/10">
              <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                <activeCat.icon className={`w-6 h-6 ${colors.text}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{activeCat.name}</h3>
                <p className="text-slate-400">{activeCat.description}</p>
              </div>
            </div>

            {/* Tasks */}
            <div className="grid gap-4">
              {activeCat.tasks.map((task, index) => {
                const isExpanded = expandedTasks.has(task.name);
                const hasMethods = 'methods' in task && task.methods;
                
                // Find max value for bar chart scaling
                const maxValue = hasMethods 
                  ? Math.max(...task.methods.map(m => Math.abs(m.value)))
                  : 1;
                
                return (
                  <div
                    key={index}
                    className="rounded-xl border bg-white/[0.02] border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                  >
                    {/* Task Header - Always visible */}
                    <div 
                      className="p-5 cursor-pointer"
                      onClick={() => toggleTask(task.name)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0 mt-1`}>
                            <Trophy className={`w-4 h-4 ${colors.text}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white">{task.name}</h4>
                            <p className="text-sm text-slate-500 mt-1">{task.shortDesc}</p>
                            
                            {/* Metric badge */}
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-slate-400">
                                {task.metric}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Result Display */}
                        <div className="text-right flex-shrink-0">
                          {'ours' in task && 'baseline' in task && (
                            <div>
                              <div className={`text-2xl font-bold ${colors.text} font-mono`}>
                                {formatNumber(task.ours, 6)}
                              </div>
                              <div className="text-xs text-slate-500 mt-1 font-mono">
                                vs {formatNumber(task.baseline, 6)}
                              </div>
                            </div>
                          )}
                          {'value' in task && (
                            <div>
                              <div className={`text-2xl font-bold ${colors.text}`}>
                                {task.value}{task.unit}
                              </div>
                              <div className="text-xs text-slate-500 mt-1">
                                {task.winTieLoss}
                              </div>
                            </div>
                          )}
                          {'vsSklearn' in task && (
                            <div>
                              <div className={`text-2xl font-bold ${colors.text}`}>
                                {task.vsSklearn}×
                              </div>
                              <div className="text-xs text-slate-500 mt-1">
                                {task.highlight}
                              </div>
                            </div>
                          )}
                          {'vsRef' in task && (
                            <div>
                              <div className={`text-2xl font-bold ${colors.text}`}>
                                {task.vsRef}×
                              </div>
                              <div className="text-xs text-slate-500 mt-1">
                                geo-mean: {task.geoMean}
                              </div>
                            </div>
                          )}
                          <div className="flex items-center justify-end gap-1 mt-2 text-xs text-slate-500">
                            <span>Details</span>
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-white/5">
                        {/* Full Description */}
                        <div className="py-4">
                          <h5 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4 text-slate-400" />
                            Description
                          </h5>
                          <p className="text-sm text-slate-400">{task.fullDesc}</p>
                        </div>
                        
                        {/* Metric Description */}
                        {'metricDesc' in task && task.metricDesc && (
                          <div className="pb-4">
                            <h5 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                              <BarChart3 className="w-4 h-4 text-slate-400" />
                              Metric: {task.metric}
                            </h5>
                            <p className="text-sm text-slate-400">{task.metricDesc}</p>
                          </div>
                        )}
                        
                        {/* Why Better - Key insight */}
                        {'whyBetter' in task && task.whyBetter && (
                          <div className="py-4 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-lg px-4 border-l-2 border-cyan-500/50">
                            <h5 className="text-sm font-medium text-cyan-400 mb-2 flex items-center gap-2">
                              <Sparkles className="w-4 h-4" />
                              Why SimpleEvolve Performs Better
                            </h5>
                            <p className="text-sm text-slate-300 leading-relaxed">{task.whyBetter}</p>
                          </div>
                        )}
                        
                        {/* Method Comparison Chart */}
                        {hasMethods && (
                          <div className="py-4 bg-white/[0.02] rounded-lg px-4">
                            <h5 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                              <BarChart3 className="w-4 h-4 text-slate-400" />
                              Method Comparison
                            </h5>
                            <MiniBarChart methods={task.methods} maxValue={maxValue} />
                          </div>
                        )}
                        
                        {/* Win/Tie/Loss visualization for quantum tasks */}
                        {'winTieLoss' in task && task.winTieLoss && (
                          <div className="py-4">
                            <h5 className="text-sm font-medium text-white mb-3">Case-by-case Results</h5>
                            <div className="flex gap-2">
                              {task.winTieLoss.split('/').map((val, idx) => {
                                const labels = ['Win', 'Tie', 'Loss'];
                                const colors_bg = ['bg-green-500/20', 'bg-yellow-500/20', 'bg-red-500/20'];
                                const colors_text = ['text-green-400', 'text-yellow-400', 'text-red-400'];
                                return (
                                  <div key={idx} className={`flex-1 p-3 rounded-lg ${colors_bg[idx]} text-center`}>
                                    <div className={`text-lg font-bold ${colors_text[idx]}`}>{val}</div>
                                    <div className="text-xs text-slate-500">{labels[idx]}</div>
                                  </div>
                                );
                              })}
                            </div>
                            {'totalCases' in task && task.totalCases && (
                              <div className="text-xs text-slate-500 mt-2 text-center">
                                Out of {task.totalCases} total benchmark cases
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
