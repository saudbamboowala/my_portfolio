import { useState, useEffect } from 'react';

const LandingPage = () => {
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [bootSequence, setBootSequence] = useState<string[]>([]);
  
  const bootMessages = [
    'SYSTEM BOOT SEQUENCE INITIATED...',
    'LOADING DEVELOPER.EXE...',
    'CHECKING SYSTEM RESOURCES...',
    'CPU: PENTIUM 486DX - OK',
    'RAM: 16MB - OK',
    'SKILLS.DAT LOADED SUCCESSFULLY',
    'INITIALIZING PORTFOLIO v1.0',
    'WELCOME TO SAUD.SYS',
    'READY FOR INPUT...'
  ];

  const welcomeText = 'C:\\PORTFOLIO> HELLO WORLD!';

  useEffect(() => {
    // Boot sequence animation
    let bootIndex = 0;
    const bootInterval = setInterval(() => {
      if (bootIndex < bootMessages.length) {
        setBootSequence(prev => [...prev, bootMessages[bootIndex]]);
        bootIndex++;
      } else {
        clearInterval(bootInterval);
        // Start typing welcome text
        setTimeout(() => {
          let textIndex = 0;
          const typeInterval = setInterval(() => {
            if (textIndex <= welcomeText.length) {
              setCurrentText(welcomeText.slice(0, textIndex));
              textIndex++;
            } else {
              clearInterval(typeInterval);
            }
          }, 100);
        }, 1000);
      }
    }, 300);

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(bootInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-x-hidden">
      {/* Scanlines Effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/5 to-transparent animate-pulse"></div>
      </div>

      {/* Header Bar */}
      <div className="bg-gray-800 border-b-2 border-green-400 p-2">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="bg-green-400 text-black px-2 py-1">SAUD.EXE</span>
            <span>FILE</span>
            <span>EDIT</span>
            <span>VIEW</span>
            <span>HELP</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 border border-white"></div>
            <div className="w-3 h-3 bg-yellow-500 border border-white"></div>
            <div className="w-3 h-3 bg-green-500 border border-white"></div>
          </div>
        </div>
      </div>

      {/* Boot Screen */}
      <section className="min-h-screen bg-black p-8">
        <div className="max-w-4xl mx-auto">
          {/* ASCII Art Logo */}
          <div className="text-center mb-8">
            <pre className="text-green-400 text-xs md:text-sm leading-tight">
{`
 ██████  █████  ██    ██ ██████      ██████  ███████ ██    ██ 
██      ██   ██ ██    ██ ██   ██     ██   ██ ██      ██    ██ 
███████ ███████ ██    ██ ██   ██     ██   ██ █████   ██    ██ 
     ██ ██   ██ ██    ██ ██   ██     ██   ██ ██       ██  ██  
███████ ██   ██  ██████  ██████  ██  ██████  ███████   ████   
                                 ██                           
                                 ██                           
`}
            </pre>
          </div>

          {/* Boot Sequence */}
          <div className="bg-black border-2 border-green-400 p-6 mb-8 min-h-64">
            <div className="text-green-400 text-sm">
              {bootSequence.map((message, index) => (
                <div key={index} className="mb-1">
                  <span className="text-yellow-400">[{String(index + 1).padStart(2, '0')}]</span> {message}
                </div>
              ))}
            </div>
          </div>

          {/* Command Line */}
          <div className="bg-black border-2 border-green-400 p-4">
            <div className="text-green-400 text-lg">
              {currentText}
              {showCursor && <span className="bg-green-400 text-black">█</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Main Interface */}
      <section className="bg-gray-900 border-t-4 border-green-400 p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Window Header */}
          <div className="bg-gray-700 border-2 border-gray-500 mb-8">
            <div className="bg-gray-600 p-2 border-b border-gray-500 flex justify-between items-center">
              <span className="text-white font-bold">PORTFOLIO.EXE - SAUD BAMBOOWALA</span>
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-gray-400 border border-black flex items-center justify-center text-xs">_</div>
                <div className="w-4 h-4 bg-gray-400 border border-black flex items-center justify-center text-xs">□</div>
                <div className="w-4 h-4 bg-red-500 border border-black flex items-center justify-center text-xs text-white">×</div>
              </div>
            </div>

            {/* Toolbar */}
            <div className="bg-gray-600 p-1 border-b border-gray-500 flex space-x-4 text-sm text-white">
              <button className="px-2 py-1 hover:bg-gray-500">ABOUT.EXE</button>
              <button className="px-2 py-1 hover:bg-gray-500">SKILLS.DAT</button>
              <button className="px-2 py-1 hover:bg-gray-500">PROJECTS.DIR</button>
              <button className="px-2 py-1 hover:bg-gray-500">CONTACT.TXT</button>
            </div>

            {/* Content Area */}
            <div className="bg-gray-800 p-6">
              
              {/* About Section */}
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-yellow-400 border border-black mr-2"></div>
                  <h2 className="text-xl text-white font-bold">AUTOEXEC.BAT - ABOUT</h2>
                </div>
                
                <div className="bg-black border border-green-400 p-4 text-green-400 text-sm">
                  <div className="mb-2">@ECHO OFF</div>
                  <div className="mb-2">REM DEVELOPER PROFILE INITIALIZED</div>
                  <div className="mb-2">SET NAME=SAUD BAMBOOWALA</div>
                  <div className="mb-2">SET ROLE=FULL-STACK DEVELOPER</div>
                  <div className="mb-2">SET LOCATION=MUMBAI, INDIA</div>
                  <div className="mb-2">SET PASSION=BUILDING AWESOME SOFTWARE</div>
                  <div className="mb-2">ECHO SYSTEM READY FOR COLLABORATION</div>
                  <div>GOTO :PROJECTS</div>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-blue-400 border border-black mr-2"></div>
                  <h2 className="text-xl text-white font-bold">SYSTEM.INI - SKILLS</h2>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'JAVASCRIPT.EXE', version: 'v2024.1', size: '2.1MB' },
                    { name: 'REACT.DLL', version: 'v18.2', size: '847KB' },
                    { name: 'NODE.SYS', version: 'v20.0', size: '1.8MB' },
                    { name: 'PYTHON.COM', version: 'v3.11', size: '3.2MB' },
                    { name: 'MONGODB.DAT', version: 'v7.0', size: '945KB' },
                    { name: 'AWS.CFG', version: 'v2024', size: '1.2MB' }
                  ].map((skill, index) => (
                    <div key={index} className="bg-black border border-gray-500 p-3">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-blue-500 border border-white mr-2 flex items-center justify-center text-white text-xs">
                          📁
                        </div>
                        <div>
                          <div className="text-white text-sm font-bold">{skill.name}</div>
                          <div className="text-gray-400 text-xs">{skill.version} • {skill.size}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-red-400 border border-black mr-2"></div>
                  <h2 className="text-xl text-white font-bold">C:\PROJECTS\</h2>
                </div>
                
                <div className="bg-black border border-green-400 p-4">
                  <div className="text-green-400 text-sm mb-4">
                    Directory of C:\PROJECTS\
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    {[
                      { name: 'ECOMMERCE', ext: 'PRJ', date: '01-15-25', size: '12,847', desc: 'Full-stack e-commerce platform' },
                      { name: 'CHATAPP', ext: 'PRJ', date: '12-20-24', size: '8,493', desc: 'Real-time messaging application' },
                      { name: 'TASKMAN', ext: 'PRJ', date: '11-05-24', size: '5,621', desc: 'Project management tool' }
                    ].map((project, index) => (
                      <div key={index} className="flex justify-between items-center hover:bg-green-400 hover:text-black p-1 cursor-pointer">
                        <div className="flex space-x-4">
                          <span>{project.date}</span>
                          <span>{project.size}</span>
                          <span className="text-yellow-400">{project.name}.{project.ext}</span>
                        </div>
                        <span className="text-gray-300 text-xs">{project.desc}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-green-400 text-sm">
                    3 File(s) &nbsp;&nbsp;&nbsp;&nbsp; 26,961 bytes
                  </div>
                </div>
              </div>

              {/* System Stats */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-4 h-4 bg-purple-400 border border-black mr-2"></div>
                    <h3 className="text-lg text-white font-bold">SYSTEM.CFG</h3>
                  </div>
                  
                  <div className="bg-black border border-gray-500 p-4 text-green-400 text-sm">
                    <div className="mb-2">[DEVELOPER]</div>
                    <div className="mb-1">Status=AVAILABLE</div>
                    <div className="mb-1">Experience=5+ Years</div>
                    <div className="mb-1">Specialty=Full-Stack</div>
                    <div className="mb-1">Coffee_Level=HIGH</div>
                    <div className="mb-2">Debugging_Mode=ON</div>
                    <div className="mb-2">[CONTACT]</div>
                    <div className="mb-1">Email=saud@example.com</div>
                    <div className="mb-1">GitHub=github.com/saud</div>
                    <div>LinkedIn=linkedin.com/in/saud</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-4 h-4 bg-cyan-400 border border-black mr-2"></div>
                    <h3 className="text-lg text-white font-bold">MEMCHECK.EXE</h3>
                  </div>
                  
                  <div className="bg-black border border-gray-500 p-4 text-green-400 text-sm">
                    <div className="mb-2">Memory Usage Report:</div>
                    <div className="mb-1">Creativity: ████████████ 100%</div>
                    <div className="mb-1">Problem Solving: ██████████░░ 95%</div>
                    <div className="mb-1">Code Quality: ███████████░ 98%</div>
                    <div className="mb-1">Team Work: ██████████░░ 90%</div>
                    <div className="mb-1">Learning: ████████████ 100%</div>
                    <div className="mt-2 text-yellow-400">Total Available: UNLIMITED</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-600 border-t-2 border-gray-400 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center text-white text-sm">
            <div className="flex items-center space-x-4">
              <span>Ready</span>
              <span>|</span>
              <span>CAPS</span>
              <span>|</span>
              <span>NUM</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>© 1995-2025 SAUD.SYS</span>
              <span>|</span>
              <span>Build 2025.08.03</span>
            </div>
            <div>
              <span>12:34 PM</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Retro Popup */}
      <div className="fixed bottom-8 right-8 bg-gray-600 border-2 border-gray-400 p-4 max-w-sm">
        <div className="bg-gray-500 p-1 border-b border-gray-400 flex justify-between items-center mb-2">
          <span className="text-white text-sm font-bold">💡 TIP.EXE</span>
          <button className="w-4 h-4 bg-red-500 border border-black text-white text-xs">×</button>
        </div>
        <div className="text-white text-sm">
          <p>Welcome to my retro portfolio! This design is inspired by classic 80s-90s computer interfaces. Navigate using the toolbar above!</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;