import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const SKILL_ICONS = {
  'c': '🔵', 'c++': '🔷', 'python': '🐍', 'javascript': '⚡', 'js': '⚡',
  'sql': '🗄️', 'react.js': '⚛️', 'react': '⚛️', 'node.js': '🟢', 'node': '🟢',
  'html': '🌐', 'css': '🎨', 'mysql': '🐬', 'git': '📋', 'mongodb': '🍃',
  'express': '🚂', 'typescript': '🔷', 'docker': '🐳', 'aws': '☁️',
};

const CATEGORY_COLORS = {
  'Languages': 'from-blue-500 to-cyan-500',
  'Frontend': 'from-violet-500 to-purple-500',
  'Backend': 'from-green-500 to-emerald-500',
  'Database': 'from-orange-500 to-amber-500',
  'Tools': 'from-pink-500 to-rose-500',
  'Data Science': 'from-indigo-500 to-blue-500',
  'Other': 'from-gray-500 to-slate-500',
};

const Skills = () => {
  const skillsData = useQuery(api.skills.getAll);
  const loading = skillsData === undefined;

  // Group by category
  const grouped = (skillsData || []).reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section-padding" style={{ background: '#0d0d1a' }}>
      <div className="max-w-7xl mx-auto">
        <div className="section-heading">
          <span className="section-label">My Skills</span>
          <h2 className="section-title">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(grouped).map(([category, categorySkills]) => {
              const gradient = CATEGORY_COLORS[category] || CATEGORY_COLORS['Other'];
              return (
                <div key={category} className="glass-card rounded-2xl p-6">
                  {/* Category header */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${gradient} bg-opacity-20 text-white text-sm font-semibold mb-5`}
                    style={{ background: 'rgba(79, 70, 229, 0.15)' }}>
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient}`} />
                    {category}
                  </div>
                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => {
                      const icon = SKILL_ICONS[skill.name.toLowerCase()] || '✨';
                      return (
                        <span key={skill._id} className="skill-badge">
                          <span>{icon}</span>
                          <span>{skill.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
