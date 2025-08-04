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

  // Animated background particles
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
      color: string;
    }
    
    const particles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
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
      title: "Digital Symphony",
      description: "An interactive music visualization platform that turns code into art",
      tech: ["Three.js", "Web Audio API", "React"],
      color: "from-purple-500 to-pink-500",
      year: "2024"
    },
    {
      title: "Quantum Dashboard",
      description: "Real-time data visualization with physics-inspired animations",
      tech: ["D3.js", "Node.js", "WebGL"],
      color: "from-blue-500 to-cyan-500",
      year: "2024"
    },
    {
      title: "Morphic Commerce",
      description: "E-commerce platform with fluid, shape-shifting interfaces",
      tech: ["Next.js", "Framer Motion", "Stripe"],
      color: "from-green-500 to-teal-500",
      year: "2023"
    }
  ];

  const skills = [
    { name: "Creative Coding", level: 95, icon: "🎨" },
    { name: "UI/UX Design", level: 90, icon: "✨" },
    { name: "Frontend Magic", level: 98, icon: "🪄" },
    { name: "Backend Wizardry", level: 85, icon: "⚡" },
    { name: "Animation", level: 92, icon: "🎭" },
    { name: "3D Graphics", level: 80, icon: "🌌" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-x-hidden">
      {/* Animated Background Canvas */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.3 }}
      />

      {/* Custom Cursor */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
        }}
      />

      {/* Floating Navigation */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-white/10 backdrop-blur-lg rounded-full px-8 py-4 border border-white/20">
          <div className="flex space-x-8">
            {['Home', 'Work', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-white/80 hover:text-white transition-all duration-300 text-sm font-medium relative group"
              >
                {item}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="text-center z-10">
          <div className={`transform transition-all duration-2000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h1 className="text-7xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              SAUD
            </h1>
            <div className="relative">
              <h2 className="text-2xl md:text-4xl font-light mb-8 text-white/90">
                Creative Developer & Digital Artist
              </h2>
              <div className="absolute -top-4 -right-8 text-6xl animate-bounce">✨</div>
            </div>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
              I blend code with creativity to build digital experiences that inspire, engage, and transform ideas into interactive reality.
            </p>
            
            {/* Animated CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold overflow-hidden transform hover:scale-105 transition-all duration-300">
                <span className="relative z-10">Explore My Universe</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
              <button className="px-8 py-4 border-2 border-white/30 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Download Resume
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                transform: `translateY(${Math.sin(scrollY * 0.01 + i) * 20}px)`
              }}
            />
          ))}
        </div>
      </section>

      {/* Creative Projects Section */}
      <section id="work" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Digital Playground
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Where imagination meets innovation - a collection of interactive experiences that push the boundaries of web development.
            </p>
          </div>

          {/* Project Carousel */}
          <div className="relative">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`transform transition-all duration-1000 ${
                  index === activeProject 
                    ? 'opacity-100 translate-x-0 scale-100' 
                    : 'opacity-30 translate-x-8 scale-95'
                } ${index !== activeProject ? 'absolute inset-0' : ''}`}
              >
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className={`aspect-video bg-gradient-to-br ${project.color} rounded-3xl relative overflow-hidden group cursor-pointer`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                          {index === 0 ? '🎵' : index === 1 ? '🌊' : '🛒'}
                        </div>
                        <div className="text-white font-bold text-xl">{project.title}</div>
                      </div>
                    </div>
                    
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-3xl border-4 border-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                         style={{ padding: '4px', margin: '-4px' }}>
                      <div className={`w-full h-full bg-gradient-to-br ${project.color} rounded-3xl`} />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="text-sm text-cyan-400 font-semibold tracking-wider">
                      {project.year} • PROJECT {index + 1}
                    </div>
                    <h3 className="text-4xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="text-xl text-white/80 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/20 backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-4">
                      <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                        Live Demo
                      </button>
                      <button className="px-6 py-3 border border-white/30 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300">
                        View Code
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Project Navigation */}
            <div className="flex justify-center mt-16 space-x-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === activeProject 
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Creative Skills Section */}
      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Creative Arsenal
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Tools and technologies I use to craft digital magic and bring wild ideas to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={skill.name}
                className="group p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:transform hover:scale-105"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {skill.name}
                  </h3>
                  
                  {/* Animated Progress Bar */}
                  <div className="relative">
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transform origin-left transition-all duration-1000 delay-300"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <div className="text-sm text-white/70 mt-2">
                      {skill.level}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Creative Bio */}
          <div className="mt-20 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-8">
                The Story Behind the Code
              </h3>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                I believe that the best digital experiences happen when technology meets artistry. My journey started with traditional web development, but I quickly discovered my passion for pushing boundaries and creating interactive experiences that surprise and delight users.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Every project is an opportunity to experiment with new technologies, challenge conventional design patterns, and create something that hasn't been seen before. I don't just build websites - I craft digital experiences that leave lasting impressions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
            Let's Create Magic
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Ready to bring your wildest digital dreams to life? Let's collaborate and create something extraordinary together.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { label: "Email", value: "saud@example.com", icon: "📧" },
              { label: "Location", value: "Mumbai, India", icon: "🌍" },
              { label: "Status", value: "Available for Projects", icon: "✅" }
            ].map((contact) => (
              <div key={contact.label} className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300">
                <div className="text-3xl mb-3">{contact.icon}</div>
                <div className="text-sm text-white/60 mb-2">{contact.label}</div>
                <div className="text-white font-semibold">{contact.value}</div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white font-semibold transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25">
              Start a Project
            </button>
            <button className="px-8 py-4 border-2 border-white/30 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300">
              Schedule a Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 mb-4 md:mb-0">
              © 2025 Saud Bamboowala - Crafted with ❤️ and lots of ☕
            </div>
            <div className="flex space-x-6">
              {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((social) => (
                <a key={social} href="#" className="text-white/60 hover:text-white transition-colors duration-300 transform hover:scale-110">
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