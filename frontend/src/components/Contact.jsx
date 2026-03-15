import { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const Contact = () => {
  const contactInfo = useQuery(api.contact.get);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields');
      return;
    }
    setSending(true);
    try {
      // Call Express backend which sends real email via nodemailer
      const res = await fetch('http://localhost:5000/api/contact/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send');
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      toast.error(err.message || 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const contactLinks = contactInfo ? [
    contactInfo.email && { icon: <Mail size={20} />, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    contactInfo.linkedin && { icon: <Linkedin size={20} />, label: 'LinkedIn', value: '/in/laxmiswarajbabu', href: contactInfo.linkedin },
    contactInfo.github && { icon: <Github size={20} />, label: 'GitHub', value: '/Swarajbabu', href: contactInfo.github },
    contactInfo.location && { icon: <MapPin size={20} />, label: 'Location', value: contactInfo.location, href: null },
  ].filter(Boolean) : [];

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="section-heading">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          {contactInfo?.bio && (
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">{contactInfo.bio}</p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-display font-bold text-white mb-6">Contact Information</h3>
            <div className="space-y-4 mb-8">
              {contactLinks.map((link, idx) => (
                <div key={idx} className="glass-card rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-accent-400"
                    style={{ background: 'rgba(139,92,246,0.1)' }}>
                    {link.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{link.label}</p>
                    {link.href ? (
                       <a href={link.href} target="_blank" rel="noopener noreferrer"
                        className="text-white text-sm font-medium hover:text-accent-400 transition-colors">
                        {link.value}
                      </a>
                    ) : (
                      <p className="text-white text-sm font-medium">{link.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
             <h3 className="text-xl font-display font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
              <div>
                <label className="form-label">Your Name</label>
                <input
                  className="form-input"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Your Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Message</label>
                <textarea
                  className="form-input resize-none"
                  rows={5}
                  placeholder="How can I help you?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="btn-gradient w-full justify-center disabled:opacity-60"
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                   <span className="flex items-center gap-2">
                    <Send size={16} />
                    Send Message
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
