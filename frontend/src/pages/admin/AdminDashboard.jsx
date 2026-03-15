import { Code2, FolderKanban, BookOpen, Award, GraduationCap, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const StatCard = ({ icon, label, count, color, path }) => (
  <Link to={path} className="glass-card rounded-2xl p-6 flex items-start gap-4 hover:scale-105 transition-transform block">
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-3xl font-display font-bold text-white">{count ?? '—'}</p>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  </Link>
);

const AdminDashboard = () => {
  const skills = useQuery(api.skills.getAll);
  const projects = useQuery(api.projects.getAll);
  const training = useQuery(api.training.getAll);
  const certs = useQuery(api.certificates.getAll);
  const edu = useQuery(api.education.getAll);

  const loading = 
    skills === undefined || 
    projects === undefined || 
    training === undefined || 
    certs === undefined || 
    edu === undefined;

  const stats = {
    skills: skills?.length,
    projects: projects?.length,
    training: training?.length,
    certificates: certs?.length,
    education: edu?.length,
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here's your portfolio overview.</p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          <StatCard
            icon={<Code2 size={28} className="text-white" />}
            label="Skills"
            count={stats.skills}
            color="bg-gradient-to-br from-blue-500 to-cyan-500"
            path="/admin/skills"
          />
          <StatCard
            icon={<FolderKanban size={28} className="text-white" />}
            label="Projects"
            count={stats.projects}
            color="bg-gradient-to-br from-violet-500 to-purple-500"
            path="/admin/projects"
          />
          <StatCard
            icon={<BookOpen size={28} className="text-white" />}
            label="Training & Experience"
            count={stats.training}
            color="bg-gradient-to-br from-green-500 to-emerald-500"
            path="/admin/training"
          />
          <StatCard
            icon={<Award size={28} className="text-white" />}
            label="Certificates"
            count={stats.certificates}
            color="bg-gradient-to-br from-yellow-500 to-orange-500"
            path="/admin/certificates"
          />
          <StatCard
            icon={<GraduationCap size={28} className="text-white" />}
            label="Education"
            count={stats.education}
            color="bg-gradient-to-br from-pink-500 to-rose-500"
            path="/admin/education"
          />
        </div>
      )}

      {/* Quick actions */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-display font-bold text-white mb-5 flex items-center gap-2">
          <TrendingUp size={20} className="text-accent-400" />
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Add Skill', path: '/admin/skills' },
            { label: 'Add Project', path: '/admin/projects' },
            { label: 'Add Certificate', path: '/admin/certificates' },
            { label: 'Update Resume', path: '/admin/resume' },
            { label: 'Edit Footer', path: '/admin/footer' },
          ].map((action) => (
            <Link
              key={action.label}
              to={action.path}
              className="block text-center py-3 px-4 rounded-xl text-sm font-medium transition-all text-white"
              style={{
                background: 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(139,92,246,0.2))',
                border: '1px solid rgba(139,92,246,0.2)',
              }}
            >
              + {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
