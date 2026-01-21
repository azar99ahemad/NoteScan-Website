
import React, { useState, useEffect } from 'react';
import {
  Camera,
  Copy,
  ShieldCheck,
  Cpu,
  HardDrive,
  Mail,
  ChevronRight,
  CheckCircle2,
  Menu,
  X,
  ArrowLeft,
  Lock,
  Zap,
  EyeOff,
  Scale,
  ExternalLink
} from 'lucide-react';


// --- Types ---
type Page = 'home' | 'privacy';

const useHashRouting = (): [Page, (p: Page) => void] => {
  const [page, setPage] = React.useState<Page>('home');

  React.useEffect(() => {
    const sync = () => {
      setPage(window.location.hash === '#/privacy' ? 'privacy' : 'home');
      window.scrollTo(0, 0);
    };

    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const navigate = (p: Page) => {
    setPage(p);

    if (p === 'privacy') {
      window.location.hash = '/privacy';
    } else {
      history.replaceState(null, '', window.location.pathname);
    }

    window.scrollTo(0, 0);
  };

  return [page, navigate];
};


const scrollToSection = (id: string) => {
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });
  });
};



// --- Components ---

const Navbar: React.FC<{
  currentPage: Page;
  setPage: (p: Page) => void;
}> = ({ currentPage, setPage }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen
          ? 'bg-white/80 backdrop-blur border-b py-3'
          : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => setPage('home')}
          className="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-slate-100 active:scale-95"
        >
          <img
            src='https://res.cloudinary.com/dxdwmc7ob/image/upload/v1768982864/Gemini_Generated_Image_yyfwsdyyfwsdyyfw_cropped_processed_by_imagy_bx0udg.png'
            className="w-10 h-10 rounded-xl"
            alt="NoteScan"
          />
          <span className="font-black text-2xl">NoteScan</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex gap-10 items-center">
          <button
            onClick={() => setPage('home')}
            className={currentPage === 'home' ? 'text-indigo-600 font-bold' : 'font-bold'}
          >
            Product
          </button>

          <button
            onClick={() => {
              setPage('home');
              scrollToSection('features');
            }}
            className="font-bold"
          >
            Features
          </button>

          <button
            onClick={() => setPage('privacy')}
            className={currentPage === 'privacy' ? 'text-indigo-600 font-bold' : 'font-bold'}
          >
            Privacy
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(v => !v)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-8 space-y-6">
          <button
            onClick={() => {
              setPage('home');
              setIsMenuOpen(false);
            }}
            className="block text-xl font-black"
          >
            Product
          </button>

          <button
            onClick={() => {
              setPage('home');
              setIsMenuOpen(false);
              scrollToSection('features');
            }}
            className="block text-xl font-black"
          >
            Features
          </button>

          <button
            onClick={() => {
              setPage('privacy');
              setIsMenuOpen(false);
            }}
            className="block text-xl font-black"
          >
            Privacy Policy
          </button>
        </div>
      )}
    </nav>
  );
};


const Section: React.FC<{
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  bg?: string;
}> = ({ id, title, children, className = "", bg = "bg-white" }) => (
  <section id={id} className={`py-24 md:py-40 px-6 ${bg} ${className}`}>
    <div className="max-w-6xl mx-auto">
      {title && <h2 className="text-4xl md:text-5xl font-black mb-16 text-slate-900 tracking-tighter text-center">{title}</h2>}
      {children}
    </div>
  </section>
);

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="group flex flex-col p-10 bg-white border border-slate-100 rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] hover:-translate-y-2">
    <div className="w-16 h-16 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-2xl mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
      {icon}
    </div>
    <h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tight">{title}</h3>
    <p className="text-slate-500 leading-relaxed font-medium text-lg">{description}</p>
  </div>
);

// --- Pages ---

const LandingPage: React.FC<{ setPage: (p: Page) => void }> = ({ setPage }) => {
  return (
    <div className="animate-in fade-in duration-1000">
      <header className="relative pt-48 pb-32 px-6 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-200/40 rounded-full blur-[160px] animate-pulse"></div>
          <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[140px]"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/50 backdrop-blur-md text-indigo-700 text-sm font-extrabold uppercase tracking-widest mb-10 border border-indigo-100/50 shadow-sm animate-in slide-in-from-bottom-2">
            <Zap size={16} className="fill-indigo-600" /> Powered by On-Device AI
          </div>
          <h1 className="text-7xl md:text-[100px] font-black text-slate-900 tracking-[-0.05em] mb-10 leading-[0.9] animate-in slide-in-from-bottom-4 duration-500">
            Scan images. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 bg-[length:200%_auto] animate-gradient">Extract text.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-14 font-medium animate-in slide-in-from-bottom-6 duration-700">
            NoteScan turns the physical world into digital data instantly. High-precision OCR that never compromises your privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in slide-in-from-bottom-8 duration-900">
            <button className="w-full sm:w-auto px-12 py-6 bg-slate-900 text-white font-black rounded-3xl shadow-2xl shadow-slate-200 hover:bg-indigo-600 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 text-xl">
              Get NoteScan <ChevronRight size={24} strokeWidth={3} />
            </button>
            <button
              onClick={() => {
                setPage('home');
                scrollToSection('features');
              }}
              className="w-full sm:w-auto px-12 py-6 bg-white/50 backdrop-blur-md border border-slate-200 text-slate-700 font-bold rounded-3xl hover:bg-white hover:border-slate-300 transition-all flex items-center justify-center text-xl"
            >
              How it works
            </button>

          </div>


        </div>
      </header>

      {/* Features Section */}
      <Section id="features" title="Engineered for Privacy" bg="bg-slate-50/40">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <FeatureCard
            icon={<ShieldCheck size={32} />}
            title="Local Processing"
            description="Our AI models run entirely on your phone. Images are scanned in memory and never touch a hard drive or cloud."
          />
          <FeatureCard
            icon={<Lock size={32} />}
            title="Zero Tracking"
            description="We don't collect usage data, device IDs, or location info. NoteScan is a pure utility that respects your space."
          />
          <FeatureCard
            icon={<EyeOff size={32} />}
            title="Offline First"
            description="Works perfectly in airplane mode. Extract text in remote locations or secure facilities without internet access."
          />
          <FeatureCard
            icon={<Cpu size={32} />}
            title="Hardware Optimized"
            description="Specifically tuned for Neural Engines and GPUs to ensure lightning-fast extraction without draining your battery."
          />
          <FeatureCard
            icon={<Copy size={32} />}
            title="Smart Actions"
            description="Extract URLs, emails, and phone numbers with specific action buttons. Go from scan to action in one tap."
          />
          <FeatureCard
            icon={<Zap size={32} />}
            title="Instant Export"
            description="Share scanned text to Notion, Slack, or Notes. Perfectly formatted plain text ready for your workflow."
          />
        </div>
      </Section>

      {/* Privacy Teaser */}
      <Section bg="bg-indigo-600">
        <div className="flex flex-col md:flex-row items-center gap-16 text-white text-center md:text-left">
          <div className="flex-1 space-y-8">
            <h2 className="text-5xl font-black tracking-tight leading-[1.1]">Privacy isn't an option. <br /> It's the standard.</h2>
            <p className="text-indigo-100 text-xl leading-relaxed font-medium">
              Most OCR apps send your documents to their servers to "improve the model". We don't. Your sensitive data stays where it belongs—with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 pt-4 justify-center md:justify-start">
              <button
                onClick={() => setPage('privacy')}
                className="px-10 py-5 bg-white text-indigo-600 font-black rounded-3xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 group"
              >
                View Privacy Policy <ArrowLeft size={20} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="w-72 h-72 bg-white/10 backdrop-blur-2xl rounded-[3rem] flex items-center justify-center border border-white/20 shadow-2xl">
            <Lock size={120} strokeWidth={1} className="text-white/80" />
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px]"></div>
          <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto text-white mb-6 shadow-2xl shadow-indigo-500/40">
            <Mail size={40} />
          </div>
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-white">Have a question?</h3>
            <p className="text-slate-400 text-xl font-medium max-w-xl mx-auto">
              We're a small team dedicated to building great tools. Reach out if you need help.
            </p>
          </div>
          <a href="mailto:az99ahemad@gmail.com" className="inline-flex items-center gap-3 text-3xl md:text-5xl font-black text-white hover:text-indigo-400 transition-colors group">
            az99ahemad@gmail.com
            <ExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
          </a>
        </div>
      </Section>
    </div>
  );
};

const PrivacyPolicyPage: React.FC<{ setPage: (p: Page) => void }> = ({ setPage }) => {
  return (
    <div className="animate-in fade-in duration-500 pt-48 pb-32 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setPage('home')}
          className="flex items-center gap-3 text-indigo-600 font-black mb-16 hover:text-indigo-700 transition-colors group text-lg"
        >
          <ArrowLeft size={24} strokeWidth={3} className="group-hover:-translate-x-2 transition-transform" /> Back to Home
        </button>

        <div className="bg-white rounded-[3.5rem] p-10 md:p-20 shadow-[0_20px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="max-w-3xl mx-auto space-y-16">
            <header className="border-b border-slate-100 pb-12 text-center md:text-left">
              <div className="inline-block p-4 bg-indigo-50 text-indigo-600 rounded-3xl mb-8">
                <ShieldCheck size={40} />
              </div>
              <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-6">Privacy Policy</h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-400 font-bold uppercase tracking-widest text-xs">
                <span>Version 1.2</span>
                <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                <span>Effective May 2026</span>
              </div>
            </header>

            <div className="space-y-20">
              <section className="space-y-6">
                <div className="flex items-center gap-4 text-slate-900">
                  <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                  <h2 className="text-3xl font-black tracking-tight">Radical Transparency</h2>
                </div>
                <p className="text-xl text-slate-500 leading-relaxed font-medium">
                  At NoteScan, privacy isn't just a legal requirement—it's the core of our engineering philosophy. We built this app because we were tired of tools that trade functionality for user data.
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="p-10 bg-slate-50 rounded-[2.5rem] space-y-4">
                  <h3 className="text-xl font-black text-slate-900">No Collection</h3>
                  <p className="text-slate-500 font-medium">We do not collect personal identifiers, device data, or scan metadata. We have no way to identify you.</p>
                </div>
                <div className="p-10 bg-slate-50 rounded-[2.5rem] space-y-4">
                  <h3 className="text-xl font-black text-slate-900">No Analytics</h3>
                  <p className="text-slate-500 font-medium">Zero tracking. We don't track buttons clicks, session times, or crash reports through third parties.</p>
                </div>
              </div>

              <section className="space-y-8">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Permissions & Data</h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Camera size={20} />,
                      title: "Camera",
                      desc: "Used strictly for scanning. No images are saved without your command, and none are ever uploaded."
                    },
                    {
                      icon: <HardDrive size={20} />,
                      title: "Storage",
                      desc: "Allows you to import local photos or save extracted text files. Only used per user request."
                    },
                    // { 
                    //   icon: <Scale size={20} />, 
                    //   title: "Compliance", 
                    //   desc: "NoteScan is fully GDPR, CCPA, and COPPA compliant by design through zero-collection." 
                    // }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start p-8 border border-slate-100 rounded-3xl group hover:border-indigo-100 transition-colors">
                      <div className="mt-1 p-3 bg-white shadow-md rounded-2xl text-slate-400 group-hover:text-indigo-600 transition-colors">
                        {item.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-slate-900 text-lg">{item.title}</h4>
                        <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-slate-900 text-white p-12 rounded-[3rem] text-center space-y-6">
                <h3 className="text-2xl font-black">Data Security</h3>
                <p className="text-slate-400 font-medium leading-relaxed max-w-lg mx-auto">
                  Even though we don't store your data, we recommend using device-level security like FaceID/Passcode to protect your local scans.
                </p>
                <div className="pt-6">
                  <a href="mailto:az99ahemad@gmail.com" className="text-indigo-400 font-black hover:underline underline-offset-4">az99ahemad@gmail.com</a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useHashRouting();

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900 bg-white">
      <Navbar currentPage={page} setPage={setPage} />

      <main className="flex-grow">
        {page === 'home' ? (
          <LandingPage setPage={setPage} />
        ) : (
          <PrivacyPolicyPage setPage={setPage} />
        )}
      </main>

      <footer className="bg-slate-50 pt-32 pb-16 px-6 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-20 mb-24">
            <div className="col-span-2 space-y-8">
              <div className="flex items-center gap-3">
                <img
                  src="https://res.cloudinary.com/dxdwmc7ob/image/upload/v1768982864/Gemini_Generated_Image_yyfwsdyyfwsdyyfw_cropped_processed_by_imagy_bx0udg.png"
                  alt="NoteScan Logo"
                  className="w-10 h-10 border-none rounded-xl"
                />
                <span className="font-black text-2xl tracking-tighter text-slate-900">NoteScan</span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed font-bold text-lg">
                Privacy-first OCR technology built for the modern user. Extract text with confidence.
              </p>
            </div>
            <div className="space-y-8">
              <h4 className="font-black text-slate-400 uppercase tracking-[0.2em] text-xs">Product</h4>
              <ul className="space-y-5">
                <li>
                  <button
                    onClick={() => setPage('home')}
                    className="text-slate-600 hover:text-indigo-600 transition-colors font-bold text-lg"
                  >
                    Home
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setPage('home');
                      scrollToSection('features');
                    }}
                    className="text-slate-600 hover:text-indigo-600 transition-colors font-bold text-lg"
                  >
                    Features
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setPage('home');
                      scrollToSection('contact');
                    }}
                    className="text-slate-600 hover:text-indigo-600 transition-colors font-bold text-lg"
                  >
                    Support
                  </button>
                </li>
              </ul>

            </div>
            <div className="space-y-8">
              <h4 className="font-black text-slate-400 uppercase tracking-[0.2em] text-xs">Legal</h4>
              <ul className="space-y-5">
                <li><button onClick={() => setPage('privacy')} className="text-slate-600 hover:text-indigo-600 transition-colors font-bold text-lg">Privacy Policy</button></li>
                {/* <li><a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors font-bold text-lg">Terms</a></li>
                <li><a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors font-bold text-lg">Cookie Policy</a></li> */}
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 font-bold tracking-tight">
            <div>&copy; 2026 NoteScan. All rights reserved.</div>
            <div className="flex gap-10">
              <span className="flex items-center gap-2"><ShieldCheck size={16} /> Encryption Enabled</span>
              <span className="flex items-center gap-2"><Lock size={16} /> 100% On-Device</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
