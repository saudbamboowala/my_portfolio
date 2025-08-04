import { useState, useEffect, useRef } from 'react';

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Floating parchment particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
      color: string;
    }
    
    const particles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 2,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1,
        color: `rgba(184, 134, 67, ${Math.random() * 0.3 + 0.1})`
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);

  const projects = [
    {
      title: "Codex Digitalis",
      description: "An illuminated manuscript of interactive data visualization, where ancient wisdom meets modern analytics",
      tech: ["Three.js", "D3.js", "React"],
      color: "from-amber-900 to-yellow-900",
      accent: "border-amber-600",
      year: "MMXXIV",
      symbol: "📜"
    },
    {
      title: "Bibliotheca Quantica",
      description: "A digital repository of knowledge with physics-inspired search algorithms and scholarly interfaces",
      tech: ["TypeScript", "Node.js", "WebGL"],
      color: "from-red-900 to-rose-900",
      accent: "border-red-600",
      year: "MMXXIV",
      symbol: "⚗️"
    },
    {
      title: "Academia Mercantilis",
      description: "An e-commerce platform designed with the elegance of classical architecture and scholarly precision",
      tech: ["Next.js", "Tailwind", "Stripe"],
      color: "from-emerald-900 to-green-900",
      accent: "border-emerald-600",
      year: "MMXXIII",
      symbol: "🏛️"
    }
  ];

  const skills = [
    { name: "Scholarly Research", level: 95, icon: "📚", discipline: "Investigatio" },
    { name: "Classical Design", level: 90, icon: "🎭", discipline: "Aesthetica" },
    { name: "Digital Manuscripts", level: 98, icon: "✒️", discipline: "Scriptoria" },
    { name: "Academic Systems", level: 85, icon: "⚖️", discipline: "Architectura" },
    { name: "Ancient Algorithms", level: 92, icon: "🔮", discipline: "Arithmetica" },
    { name: "Visual Philosophy", level: 88, icon: "🌙", discipline: "Philosophia" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-stone-900 to-amber-900 text-amber-50 overflow-x-hidden relative">
      {/* Parchment texture overlay */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b8864357' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Animated Background Canvas */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.4 }}
      />

      {/* Elegant Cursor */}
      <div 
        className="fixed w-8 h-8 border-2 border-amber-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-200"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
          boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)'
        }}
      >
        <div className="w-2 h-2 bg-amber-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Scholarly Navigation */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-slate-900/80 backdrop-blur-lg rounded-lg px-8 py-4 border border-amber-600/30 shadow-2xl">
          <div className="flex space-x-8">
            {['Opus', 'Portfolio', 'Vita', 'Epistola'].map((item, index) => (
              <a 
                key={item} 
                href={`#${['home', 'work', 'about', 'contact'][index]}`}
                className="text-amber-200/80 hover:text-amber-100 transition-all duration-300 text-sm font-serif tracking-wider relative group"
              >
                {item}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-600 to-yellow-600 group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section - Scholar's Study */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="text-center z-10 max-w-6xl">
          <div className={`transform transition-all duration-2000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            {/* Ornate Header */}
            <div className="mb-8">
              <div className="text-amber-600 text-2xl font-serif mb-4">~ Scholar of Digital Arts ~</div>
              <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 leading-tight tracking-wider">
                SAUD
              </h1>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-600"></div>
                <div className="text-amber-400 text-3xl">⚜</div>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-600"></div>
              </div>
            </div>
            
            <h2 className="text-xl md:text-3xl font-serif font-light mb-8 text-amber-100/90 italic">
              Magister Artium Digitalium & Philosophus Technicus
            </h2>
            
            <p className="text-lg text-amber-200/80 max-w-3xl mx-auto mb-12 leading-relaxed font-serif">
              In the hallowed halls of digital academia, I pursue the ancient art of transforming ethereal concepts into tangible interactive experiences, where classical wisdom meets contemporary innovation.
            </p>
            
            {/* Scholarly CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-800 to-yellow-800 rounded-lg text-amber-50 font-serif font-semibold border border-amber-600/50 overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-amber-900/50">
                <span className="relative z-10">Peruse My Manuscripts</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-700 to-yellow-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
              <button className="px-8 py-4 border-2 border-amber-600/50 rounded-lg text-amber-100 font-serif font-semibold hover:bg-amber-900/30 transition-all duration-300 backdrop-blur-sm">
                Curriculum Vitae
              </button>
            </div>
          </div>
        </div>

        {/* Floating Academic Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-amber-600/20 text-2xl animate-pulse"
              style={{
                left: `${15 + i * 12}%`,
                top: `${25 + (i % 4) * 15}%`,
                animationDelay: `${i * 0.7}s`,
                transform: `translateY(${Math.sin(scrollY * 0.008 + i) * 15}px) rotate(${Math.sin(scrollY * 0.01 + i) * 10}deg)`
              }}
            >
              {['📖', '🖋️', '📐', '🔍', '⚖️', '🌙', '⭐', '🎭'][i]}
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Section - The Grand Library */}
      <section id="work" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-amber-600 text-xl font-serif mb-4 tracking-widest">~ MAGNUM OPUS ~</div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-300">
              The Digital Codex
            </h2>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-amber-600"></div>
              <div className="text-amber-400 text-2xl">📜</div>
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-amber-600"></div>
            </div>
            <p className="text-lg text-amber-200/80 max-w-3xl mx-auto font-serif leading-relaxed">
              A curated collection of scholarly works where classical methodology meets modern digital artistry, each project a treatise in interactive philosophy.
            </p>
          </div>

          {/* Project Manuscripts */}
          <div className="relative min-h-[600px]">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`transform transition-all duration-1000 ${
                  index === activeProject 
                    ? 'opacity-100 translate-x-0 scale-100 relative z-10' 
                    : 'opacity-0 translate-x-8 scale-95 absolute inset-0 z-0'
                }`}
              >
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className={`aspect-video bg-gradient-to-br ${project.color} rounded-2xl relative overflow-hidden group cursor-pointer border-2 ${project.accent} shadow-2xl`}>
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500" />
                    
                    {/* Ornate frame overlay */}
                    <div className="absolute inset-4 border border-amber-400/30 rounded-lg"></div>
                    <div className="absolute inset-2 border border-amber-400/20 rounded-xl"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg">
                          {project.symbol}
                        </div>
                        <div className="text-amber-100 font-serif font-bold text-xl tracking-wider">
                          {project.title}
                        </div>
                        <div className="text-amber-300/80 font-serif text-sm mt-2 tracking-widest">
                          {project.year}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="text-sm text-amber-400 font-serif tracking-widest">
                      {project.year} • MANUSCRIPT {['I', 'II', 'III'][index]}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-amber-100 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-lg text-amber-200/80 leading-relaxed font-serif italic">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-4 py-2 bg-slate-800/50 rounded-lg text-sm font-serif border border-amber-600/30 backdrop-blur-sm text-amber-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-4 pt-4">
                      <button className="px-6 py-3 bg-gradient-to-r from-amber-800 to-yellow-800 rounded-lg text-amber-50 font-serif font-semibold hover:shadow-lg hover:shadow-amber-900/25 transform hover:scale-105 transition-all duration-300 border border-amber-600/50">
                        Examine Manuscript
                      </button>
                      <button className="px-6 py-3 border border-amber-600/50 rounded-lg text-amber-100 font-serif font-semibold hover:bg-amber-900/20 transition-all duration-300">
                        View Annotations
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Scrolls */}
            <div className="flex justify-center mt-16 space-x-6">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`relative transform transition-all duration-300 ${
                    index === activeProject 
                      ? 'scale-125' 
                      : 'hover:scale-110'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                    index === activeProject 
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 border-amber-400 shadow-lg shadow-amber-600/50' 
                      : 'bg-slate-800 border-amber-600/50 hover:border-amber-400'
                  }`}>
                    <div className="absolute inset-2 rounded-full bg-amber-400/20"></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - The Academy */}
      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-amber-600 text-xl font-serif mb-4 tracking-widest">~ DISCIPLINAE ~</div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-300">
              Scholarly Pursuits
            </h2>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-amber-600"></div>
              <div className="text-amber-400 text-2xl">⚜</div>
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-amber-600"></div>
            </div>
            <p className="text-lg text-amber-200/80 max-w-3xl mx-auto font-serif leading-relaxed">
              The classical trivium and quadrivium, reimagined for the digital age - where ancient wisdom guides modern innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={skill.name}
                className="group p-8 bg-slate-900/40 backdrop-blur-lg rounded-2xl border border-amber-600/20 hover:border-amber-600/50 transition-all duration-500 hover:transform hover:scale-105 shadow-lg hover:shadow-amber-900/20"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-amber-100 mb-2">
                    {skill.name}
                  </h3>
                  <div className="text-sm text-amber-400 font-serif italic mb-4 tracking-wide">
                    {skill.discipline}
                  </div>
                  
                  {/* Illuminated Progress */}
                  <div className="relative">
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-amber-600/30">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full transform origin-left transition-all duration-1500 delay-300 shadow-inner"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <div className="text-xs text-amber-300 mt-2 font-serif">
                      {skill.level}% Mastery
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scholarly Biography */}
          <div className="mt-20 text-center">
            <div className="max-w-4xl mx-auto bg-slate-900/30 backdrop-blur-lg rounded-2xl p-12 border border-amber-600/20 shadow-2xl">
              <div className="text-amber-400 text-3xl mb-6">📚</div>
              <h3 className="text-3xl font-serif font-bold text-amber-100 mb-8">
                The Scholar's Testament
              </h3>
              <div className="space-y-6 text-lg text-amber-200/80 leading-relaxed font-serif">
                <p>
                  <span className="text-2xl text-amber-400 font-bold float-left mr-2 mt-1">I</span>
                  n the great tradition of Renaissance polymaths, I believe that true mastery emerges from the intersection of classical wisdom and contemporary innovation. My scholarly journey began in the traditional halls of web development, but quickly evolved into something more profound.
                </p>
                <p>
                  Like the illuminated manuscripts of old, each project I undertake is carefully crafted with attention to both form and function. I don't merely build digital products - I compose symphonies of code, design treatises in interactive media, and craft experiences that honor both the classical principles of beauty and the cutting-edge possibilities of technology.
                </p>
                <p className="italic">
                  "Per aspera ad astra" - Through adversity to the stars. This ancient motto guides my approach to every challenge, ensuring that complexity becomes elegance, and problems become opportunities for innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - The Correspondence */}
      <section id="contact" className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-amber-600 text-xl font-serif mb-4 tracking-widest">~ EPISTOLAE ~</div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-300">
            Scholarly Exchange
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-amber-600"></div>
            <div className="text-amber-400 text-2xl">✒️</div>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-amber-600"></div>
          </div>
          <p className="text-lg text-amber-200/80 mb-12 max-w-2xl mx-auto font-serif leading-relaxed">
            Seeking collaboration on groundbreaking digital ventures? Let us engage in scholarly discourse and forge something extraordinary together.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { label: "Epistola Electronica", value: "saud@scholarly.academy", icon: "📧" },
              { label: "Academia Locus", value: "Mumbai, Bharat", icon: "🏛️" },
              { label: "Status Academicus", value: "Available for Commission", icon: "📜" }
            ].map((contact) => (
              <div key={contact.label} className="p-6 bg-slate-900/40 backdrop-blur-lg rounded-2xl border border-amber-600/20 hover:border-amber-600/50 transition-all duration-300 shadow-lg">
                <div className="text-3xl mb-3 filter drop-shadow-lg">{contact.icon}</div>
                <div className="text-sm text-amber-400 mb-2 font-serif tracking-wide">{contact.label}</div>
                <div className="text-amber-100 font-serif font-semibold">{contact.value}</div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-amber-800 to-yellow-800 rounded-lg text-amber-50 font-serif font-semibold transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/25 border border-amber-600/50">
              Commence Collaboration
            </button>
            <button className="px-8 py-4 border-2 border-amber-600/50 rounded-lg text-amber-100 font-serif font-semibold hover:bg-amber-900/20 transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer - The Colophon */}
      <footer className="py-16 px-6 border-t border-amber-600/20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-amber-400 text-2xl mb-4">⚜</div>
            <div className="text-amber-200/60 font-serif text-sm tracking-widest mb-4">
              ~ COLOPHON ~
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-amber-200/60 mb-4 md:mb-0 font-serif">
              © MMXXV Saud Bamboowala - Crafted in the Classical Tradition
            </div>
            <div className="flex space-x-8">
              {['GitHub', 'LinkedIn', 'Academia', 'Portfolio'].map((social) => (
                <a key={social} href="#" className="text-amber-200/60 hover:text-amber-200 transition-colors duration-300 transform hover:scale-110 font-serif text-sm tracking-wide">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;