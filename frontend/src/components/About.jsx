import { MapPin, GraduationCap, Code2, Heart } from 'lucide-react';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const DEFAULT = {
  heading: 'Passionate about Data & Code',
  bio1: 'I am a Computer Science Engineering student passionate about Data Analytics, Web Development, and AI-based applications. I enjoy building interactive dashboards, intelligent systems, and full-stack applications.',
  bio2: "I focus on problem-solving, automation, and creating user-friendly digital experiences. Whether it's analyzing complex datasets or building a responsive web app, I love turning ideas into reality.",
  location: 'India',
  degree: 'B.Tech CSE',
  focus: 'Full-Stack & AI',
  passion: 'Problem Solving',
  photoUrl: '',
};

const About = () => {
  const aboutData = useQuery(api.about.get);
  const data = aboutData || DEFAULT;

  const [headingMain, headingHighlight] = (() => {
    const parts = (data.heading || DEFAULT.heading).split(' about ');
    return parts.length === 2
      ? [parts[0] + ' about ', parts[1]]
      : [data.heading || DEFAULT.heading, ''];
  })();

  const infoItems = [
    { icon: <MapPin size={18} />, label: 'Location', value: data.location || DEFAULT.location },
    { icon: <GraduationCap size={18} />, label: 'Degree', value: data.degree || DEFAULT.degree },
    { icon: <Code2 size={18} />, label: 'Focus', value: data.focus || DEFAULT.focus },
    { icon: <Heart size={18} />, label: 'Passion', value: data.passion || DEFAULT.passion },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Profile Photo / Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 blur-2xl opacity-30 scale-110" />
              {/* Photo card */}
              <div
                className="relative w-80 h-80 md:w-96 md:h-96 rounded-3xl glass-card overflow-hidden flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(139,92,246,0.2))' }}
              >
                {data.photoUrl ? (
                  <img
                    src={data.photoUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-7xl mb-2 animate-float">👨‍💻</div>
                    <p className="text-accent-400 font-display font-semibold">Full-Stack Dev</p>
                  </div>
                )}
                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-accent-500 opacity-60" />
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary-500 opacity-60" />
                <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-primary-500 opacity-60" />
                <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-accent-500 opacity-60" />
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <span className="section-label">About Me</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {headingHighlight ? (
                 <>
                  {headingMain}
                  <span className="gradient-text">{headingHighlight}</span>
                </>
              ) : (
                data.heading || DEFAULT.heading
              )}
            </h2>
             <p className="text-gray-400 text-lg mb-6 leading-relaxed">{data.bio1 || DEFAULT.bio1}</p>
             <p className="text-gray-500 mb-8 leading-relaxed">{data.bio2 || DEFAULT.bio2}</p>

            {/* Quick info grid */}
            <div className="grid grid-cols-2 gap-4">
               {infoItems.map((item) => (
                 <div key={item.label} className="glass-card rounded-xl p-4 flex items-start gap-3">
                  <span className="text-accent-400 mt-1 flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-semibold text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
