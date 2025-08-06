import { useState, useEffect } from 'react';
import CV from '../assets/Resume.docx (2).pdf';

const LandingPage = () => {
  const [currentCode, setCurrentCode] = useState('');
  const [terminalText, setTerminalText] = useState('');
  const [projectImages, setProjectImages] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const codeSnippets = [
    ' const developer = "Saud";',
    ' function buildAmazingThings() {',
    '  return creativity + code;',
    ' }',
    ' console.log("Hello World!");'
  ];

  const terminalCommands = [
    '$ whoami',
    ' saud@developer',
    '$ ls skills/',
    ' react typescript node python...',
    '$ git status',
    ' Ready to commit awesome code ✨'
  ];

  useEffect(() => {
    let codeIndex = 0;
    let charIndex = 0;
    const timeouts: NodeJS.Timeout[] = [];
    
    const typeCode = () => {
      try {
        if (codeIndex < codeSnippets.length) {
          if (charIndex < codeSnippets[codeIndex].length) {
            setCurrentCode(prev => prev + codeSnippets[codeIndex][charIndex]);
            charIndex++;
            const timeout = setTimeout(typeCode, 100);
            timeouts.push(timeout);
          } else {
            setCurrentCode(prev => prev + '\n');
            codeIndex++;
            charIndex = 0;
            const timeout = setTimeout(typeCode, 500);
            timeouts.push(timeout);
          }
        }
      } catch (error) {
        console.error('Error in typeCode animation:', error);
      }
    };

    const typeTerminal = () => {
      try {
        let terminalIndex = 0;
        let terminalCharIndex = 0;
        
        const typeTerminalText = () => {
          try {
            if (terminalIndex < terminalCommands.length) {
              if (terminalCharIndex < terminalCommands[terminalIndex].length) {
                setTerminalText(prev => prev + terminalCommands[terminalIndex][terminalCharIndex]);
                terminalCharIndex++;
                const timeout = setTimeout(typeTerminalText, 50);
                timeouts.push(timeout);
              } else {
                setTerminalText(prev => prev + '\n');
                terminalIndex++;
                terminalCharIndex = 0;
                const timeout = setTimeout(typeTerminalText, 800);
                timeouts.push(timeout);
              }
            }
          } catch (error) {
            console.error('Error in typeTerminalText animation:', error);
          }
        };
        
        const timeout = setTimeout(typeTerminalText, 2000);
        timeouts.push(timeout);
      } catch (error) {
        console.error('Error in typeTerminal animation:', error);
      }
    };

    typeCode();
    typeTerminal();

    // Cleanup function to clear timeouts
    return () => {
      timeouts.forEach((timeout: NodeJS.Timeout) => clearTimeout(timeout));
    };
  }, []);

  const handleDownloadCV = () => {
    try {
      const link = document.createElement('a');
      link.href = CV; // File path relative to public folder
      link.download = 'Saud_Bamboowala_CV.pdf'; // Optional rename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Error downloading CV. Please try again.');
    }
  };

  const projects = [
    { 
      name: 'Bake My Cake', 
      tech: ['React', 'Node.js', 'JavaScript'], 
      status: 'Production',
      source: 'https://github.com/saudbamboowala/Bake-My-Cake',
      description: 'A full-featured cake ordering platform with customization options and live filtering.'
    },
    { 
      name: 'To-Do Tracker', 
      tech: ['Java', 'Spring-Boot', 'JWT', 'React', 'JavaScript', 'MongoDB', 'MySQL'], 
      status: 'Beta',
      source: 'https://github.com/saud/task-manager',
      description: 'A task management tool built with Java and React.'
    },
    { 
      name: 'Eat Up', 
      tech: ['JavaScript', 'React.js', 'HTML', 'CSS'], 
      status: 'Development',
      demo: 'https://eat-up-by-saud.netlify.app',
      source: 'https://github.com/saudbamboowala/Snake_game',
      description: 'A classic Snake game built with JavaScript and HTML5 Canvas.'
    }
  ];

  const getGitHubImageUrl = (githubUrl: string) => {
    try {
      const url = new URL(githubUrl);
      const pathParts = url.pathname.split('/').filter(Boolean);
      if (pathParts.length >= 2) {
        const owner = pathParts[0];
        const repo = pathParts[1];
        // GitHub's Open Graph image URL format
        return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
      }
    } catch (error) {
      console.error('Invalid GitHub URL:', githubUrl, error);
    }
    return null;
  };

  // Load project images
  useEffect(() => {
    const loadProjectImages = async () => {
      try {
        const imagePromises = projects.map(async (project) => {
          try {
            const imageUrl = getGitHubImageUrl(project.source);
            if (imageUrl) {
              return new Promise<{name: string, url: string}>((resolve) => {
                const img = new Image();
                img.onload = () => resolve({ name: project.name, url: imageUrl });
                img.onerror = (error) => {
                  console.error(`Failed to load image for ${project.name}:`, error);
                  resolve({ name: project.name, url: '' });
                };
                img.src = imageUrl;
              });
            }
            return { name: project.name, url: '' };
          } catch (error) {
            console.error(`Error processing image for ${project.name}:`, error);
            return { name: project.name, url: '' };
          }
        });

        const results = await Promise.all(imagePromises);
        const imageMap: {[key: string]: string} = {};
        results.forEach(result => {
          if (result.url) {
            imageMap[result.name] = result.url;
          }
        });
        setProjectImages(imageMap);
      } catch (error) {
        console.error('Error loading project images:', error);
      }
    };

    loadProjectImages();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Reset form on success
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    try {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    } catch (error) {
      console.error('Error handling input change:', error);
    }
  };

  const smoothScrollTo = (elementId: string) => {
    try {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn(`Element with id "${elementId}" not found`);
      }
    } catch (error) {
      console.error('Error scrolling to element:', error);
    }
  };

  const handleExternalLink = (url: string) => {
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening external link:', error);
      alert('Unable to open link. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-green-500/30 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-green-400 font-bold text-xl">
              <span className="text-gray-500">~$</span> saud.dev
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'contact'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => smoothScrollTo(item)}
                  className="hover:text-green-300 transition-colors duration-300"
                >
                  ./{item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <p className="text-green-500 mb-2">// Welcome to my digital workspace</p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-gray-500">const</span>{' '}
                  <span className="text-blue-400">developer</span>{' '}
                  <span className="text-gray-500">=</span>{' '}
                  <span className="text-yellow-400">"Saud"</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Full-stack developer who turns{' '}
                  <span className="text-purple-400 bg-purple-400/10 px-2 py-1 rounded">coffee</span>{' '}
                  into{' '}
                  <span className="text-green-400 bg-green-400/10 px-2 py-1 rounded">code</span>{' '}
                  and ideas into digital reality.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={() => smoothScrollTo('projects')}
                  className="bg-green-500 text-black px-8 py-4 rounded-md font-semibold hover:bg-green-400 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
                >
                  <span className="mr-2">🚀</span> View Projects
                </button>
                <button 
                  onClick={handleDownloadCV}
                  className="border border-green-500 text-green-400 px-8 py-4 rounded-md font-semibold hover:bg-green-500/10 transition-all duration-300"
                >
                  <span className="mr-2">📄</span> Download CV
                </button>
              </div>

              {/* Status indicator */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span>Status: Available for hire</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Location: Mumbai, IN</span>
                </div>
              </div>
            </div>

            {/* Code Terminal */}
            <div className="bg-black border border-green-500/30 rounded-lg overflow-hidden shadow-2xl">
              <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-4">saud@terminal</span>
              </div>
              <div className="p-6 h-64 overflow-hidden">
                <pre className="text-green-400 text-sm whitespace-pre-wrap">
                  {currentCode}<span className="animate-pulse">|</span>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-gray-500">/*</span>{' '}
              <span className="text-green-400">About Me</span>{' '}
              <span className="text-gray-500">*/</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl">
              I'm a passionate developer who believes in clean code, elegant solutions, and the power of technology to solve real-world problems.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/50 border border-green-500/20 rounded-lg p-8 hover:border-green-500/50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-green-400 text-2xl mb-4">{'<>'}</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Frontend.dev</h3>
              <p className="text-gray-300 text-sm">
                React, TypeScript, JavaScript, Next.js - Building responsive, interactive UIs that users love to interact with.
              </p>
              <div className="mt-4 text-xs text-green-500">
                // Modern frameworks & libraries
              </div>
            </div>
            
            <div className="bg-black/50 border border-purple-500/20 rounded-lg p-8 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-purple-400 text-2xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2 text-purple-400">Backend.js</h3>
              <p className="text-gray-300 text-sm">
                Java, Spring Boot, JWT, Node.js, APIs - Crafting robust server-side applications that scale and perform.
              </p>
              <div className="mt-4 text-xs text-purple-500">
                // Server-side architecture
              </div>
            </div>
            
            <div className="bg-black/50 border border-yellow-500/20 rounded-lg p-8 hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-yellow-400 text-2xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">DevOps.sh</h3>
              <p className="text-gray-300 text-sm">
                Docker, AWS, CI/CD - Automating deployments and managing cloud infrastructure.
              </p>
              <div className="mt-4 text-xs text-yellow-500">
                // Infrastructure as code
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-gray-500">class</span>{' '}
              <span className="text-blue-400">Skills</span>{' '}
              <span className="text-gray-500">{'{'}</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Tech Stack */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-green-400">// Tech Stack</h3>
              <div className="space-y-4">
                {[
                  { name: 'Java/Spring', level: 80, color: 'bg-purple-500' },
                  { name: 'JavaScript/TypeScript', level: 95, color: 'bg-yellow-500' },
                  { name: 'React/Next.js', level: 90, color: 'bg-blue-500' },
                  { name: 'Node.js/Express', level: 85, color: 'bg-green-500' },
                  { name: 'MongoDB/MySQL', level: 85, color: 'bg-red-500' },
                  { name: 'AWS/Docker', level: 50, color: 'bg-orange-500' }
                ].map((skill) => (
                  <div key={skill.name} className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`${skill.color} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal */}
            <div className="bg-black border border-green-500/30 rounded-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-4">terminal</span>
              </div>
              <div className="p-6 h-64 overflow-hidden">
                <pre className="text-green-400 text-sm whitespace-pre-wrap">
                  {terminalText}<span className="animate-pulse">_</span>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
       <section id="projects" className="py-20 bg-gray-800/50">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="mb-16">
             <h2 className="text-3xl font-bold mb-4">
               <span className="text-gray-500">const</span>{' '}
               <span className="text-green-400">projects</span>{' '}
               <span className="text-gray-500">=</span>{' '}
               <span className="text-yellow-400">[</span>
             </h2>
           </div>

           {/* Project Cards */}
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {projects.map((project, index) => (
               <div key={index} className="bg-black/50 border border-gray-700 rounded-lg p-6 hover:border-green-500/50 transition-all duration-300 group">
                 <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-blue-400 group-hover:text-green-400 transition-colors">
                    {project.name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    project.status === 'Production' ? 'bg-green-500/20 text-green-400' :
                    project.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="relative h-48 bg-gray-900 rounded border border-gray-600 mb-4 overflow-hidden group-hover:border-green-500/30 transition-colors">
                  {projectImages[project.name] ? (
                    <img 
                      src={projectImages[project.name]} 
                      alt={`${project.name} preview`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        console.error(`Failed to load image for ${project.name}`);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <div className="text-3xl mb-2 animate-pulse">{'</>'}</div>
                        <div className="text-sm">Loading preview...</div>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="text-sm text-gray-400">// Built with:</div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs bg-gray-800 text-green-400 px-2 py-1 rounded border border-gray-600">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-4 text-sm">
                  <button 
                    onClick={() => handleExternalLink(project.source)}
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <span className="mr-1">💻</span> Source Code
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-500 text-lg">
              <span className="text-yellow-400">]</span>; <span className="text-gray-500">// More projects on GitHub</span>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-gray-500">function</span>{' '}
              <span className="text-green-400">getInTouch</span>
              <span className="text-gray-500">() {'{'}</span>
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              <span className="text-blue-400">return</span>{' '}
              <span className="text-yellow-400">"Ready to collaborate on your next project!"</span>;
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-black/50 border border-green-500/30 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-6 text-green-400">// Contact Information</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-green-400 font-semibold mb-2">Email</div>
                  <div className="text-gray-300">bamboowalasaud639@gmail.com</div>
                </div>
                <div>
                  <div className="text-blue-400 font-semibold mb-2">Social</div>
                  <div className="space-y-1">
                    <div className="text-gray-300">github.com/saudbamboowala</div>
                    <div className="text-gray-300">linkedin.com/in/saudbamboowala</div>
                  </div>
                </div>
                <div>
                  <div className="text-purple-400 font-semibold mb-2">Status</div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <span className="text-gray-300">Open to opportunities</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-black/50 border border-green-500/30 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-6 text-green-400">// Send Message</h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-md text-green-400 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-md text-green-400 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder="bamboowalasaud639@gmail.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-md text-green-400 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 rounded-md font-semibold transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-green-500 text-black hover:bg-green-400 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400 mr-2"></div>
                      Sending...
                    </span>
                  ) : (
                    <span>
                      <span className="mr-2">📧</span> Send Message
                    </span>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="text-green-400 text-sm text-center p-3 bg-green-500/10 rounded-md border border-green-500/30">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="text-red-400 text-sm text-center p-3 bg-red-500/10 rounded-md border border-red-500/30">
                    ❌ Failed to send message. Please try again or email me directly.
                  </div>
                )}
                
                <p className="text-xs text-gray-500 text-center">
                  * Required fields
                </p>
              </form>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={() => window.open('https://calendly.com/saudbamboowala', '_blank')}
                className="border border-green-500 text-green-400 px-8 py-4 rounded-md font-semibold hover:bg-green-500/10 transition-all duration-300"
              >
                <span className="mr-2">📅</span> Schedule Call
              </button>
            </div>
            <p className="text-gray-500">
              <span className="text-gray-500">{'}'}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-green-500/30 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="text-green-400 mb-4">
              <span className="text-gray-500">~$</span> saud.dev <span className="text-gray-500">--version</span>
            </div>
            <p className="text-gray-400 mb-6">v2025.1.0 - Full-stack Developer</p>
            <div className="flex justify-center space-x-8 mb-8">
              {[
                { name: 'LinkedIn', url: 'https://linkedin.com/in/saudbamboowala' },
                { name: 'GitHub', url: 'https://github.com/saudbamboowala' },
                { name: 'Email', url: 'https://mail.google.com/mail/u/0/?fs=1&tf=1&to=bamboowalasaud639@gmail.com' }
              ].map((social) => (
                <a 
                  key={social.name} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-green-400 transition-colors duration-300"
                >
                  ./{social.name.toLowerCase()}
                </a>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-600 text-sm">
                <span className="text-gray-500">//</span> © 2025 Saud Bamboowala. Built with React & lots of ☕
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
