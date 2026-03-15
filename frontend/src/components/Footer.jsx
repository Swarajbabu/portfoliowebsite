import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const Footer = () => {
  const footerData = useQuery(api.footer.get);
  const year = new Date().getFullYear();

  // Show a blank footer temporarily while loading to avoid layout shift
  if (footerData === undefined) {
    return (
      <footer className="border-t border-white border-opacity-5 py-12 px-4" style={{ background: '#07070f' }}>
        <div className="max-w-7xl mx-auto min-h-[100px]"></div>
      </footer>
    );
  }

  // Fallback data in case the database is empty
  const defaultData = {
    brandName: "Swaraj Vecha",
    subtitle: "Full-Stack Developer & AI Enthusiast",
    linkedin: "https://www.linkedin.com/in/laxmiswarajbabu/",
    github: "https://github.com/Swarajbabu",
    email: "swarajvecha@gmail.com",
    location: "India"
  };

  const data = footerData || defaultData;

  return (
    <footer className="border-t border-white border-opacity-5 py-12 px-4" style={{ background: '#07070f' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span className="text-xl font-display font-bold gradient-text">{data.brandName}</span>
            {data.subtitle && <p className="text-gray-600 text-sm mt-1">{data.subtitle}</p>}
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Github size={18} />
              </a>
            )}
            {data.email && (
              <a href={`mailto:${data.email}`}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Mail size={18} />
              </a>
            )}
          </div>

          {/* Copyright */}
          <p className="text-gray-600 text-sm flex items-center gap-1 text-center md:text-left">
            © {year} {data.brandName}. Made with <Heart size={12} className="text-red-500 mx-1" /> in {data.location || 'India'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
