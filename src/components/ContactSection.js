import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, ArrowRight, Target, Users } from 'lucide-react';
import { useInView } from '../hooks';

// Enhanced Contact Section with custom gradients
function ContactSection() {
  const [ref, isInView] = useInView();
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 800));
    
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'usaamaizm@gmail.com', href: 'mailto:usaamaizm@gmail.com', color: 'from-red-500 to-pink-500' },
    { icon: Phone, label: 'Phone', value: '(92) 301-6194648', href: 'tel:+923016194648', color: 'from-green-500 to-emerald-500' },
    { icon: MapPin, label: 'Location', value: 'Sheikhupura, Pakistan', href: '#', color: 'from-[#517fa4] to-[#6a8fb5]' }
  ];

  const socialLinks = [
    { href: "https://github.com/usaamaizm", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/mianusama8748", icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:usaamaizm@gmail.com", icon: Mail, label: "Email" }
  ];

  return (
    <section ref={ref} id="contact" className="py-16 bg-gradient-to-b from-[#302b63] to-[#24243e] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#517fa4]/5 via-[#243949]/5 to-[#517fa4]/5"></div>
        <div className="absolute top-10 right-10 w-48 h-48 bg-gradient-to-r from-[#517fa4]/20 to-[#243949]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-r from-[#243949]/20 to-[#517fa4]/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-150 ${
          isInView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Start a <span className="bg-gradient-to-r from-[#517fa4] to-[#6a8fb5] bg-clip-text text-transparent">Conversation</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#517fa4] to-[#243949] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Ready to discuss your next project or opportunity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className={`transition-all duration-150 ${
            isInView ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
          }`}>
            <div className="h-full flex flex-col card-gradient backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#517fa4]/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="text-[#517fa4]" size={28} />
                Contact Information
              </h3>
              
              <div className="space-y-4 mb-6 flex-1">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#517fa4]/10 hover:to-[#243949]/10 transition-all duration-150 group hover:scale-[1.02]"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-150`}>
                      <item.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">{item.label}</p>
                      <p className="text-white font-semibold group-hover:text-[#6a8fb5] transition-colors duration-150 text-sm">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-[#517fa4]/30">
                <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <Users size={18} />
                  Social Networks
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map(({ href, icon: Icon, label }, index) => (
                    <a
                      key={href}
                      href={href}
                      className="w-12 h-12 card-gradient border border-[#517fa4]/30 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-[#517fa4] hover:to-[#243949] transition-all duration-150 hover:scale-110 hover:shadow-lg hover:-translate-y-0.5 group"
                      title={label}
                    >
                      <Icon size={20} className="group-hover:scale-110 transition-transform duration-150" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-150 ${
            isInView ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'
          }`}>
            <div className="h-full flex flex-col card-gradient backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#517fa4]/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Send className="text-[#6a8fb5]" size={28} />
                Quick Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-gray-200 font-medium mb-2 group-focus-within:text-[#517fa4] transition-colors duration-150 text-sm">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 border border-[#517fa4]/30 rounded-xl focus:ring-2 focus:ring-[#517fa4]/20 focus:border-[#517fa4] bg-[#243949]/20 text-white transition-all duration-150 placeholder-gray-400 text-sm backdrop-blur-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-gray-200 font-medium mb-2 group-focus-within:text-[#517fa4] transition-colors duration-150 text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 border border-[#517fa4]/30 rounded-xl focus:ring-2 focus:ring-[#517fa4]/20 focus:border-[#517fa4] bg-[#243949]/20 text-white transition-all duration-150 placeholder-gray-400 text-sm backdrop-blur-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-gray-200 font-medium mb-2 group-focus-within:text-[#517fa4] transition-colors duration-150 text-sm">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 border border-[#517fa4]/30 rounded-xl focus:ring-2 focus:ring-[#517fa4]/20 focus:border-[#517fa4] bg-[#243949]/20 text-white transition-all duration-150 placeholder-gray-400 text-sm backdrop-blur-sm"
                    placeholder="Project collaboration, job opportunity..."
                  />
                </div>
                
                <div className="group flex-1 flex flex-col">
                  <label className="block text-gray-200 font-medium mb-2 group-focus-within:text-[#517fa4] transition-colors duration-150 text-sm">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="w-full px-3 py-2.5 border border-[#517fa4]/30 rounded-xl focus:ring-2 focus:ring-[#517fa4]/20 focus:border-[#517fa4] bg-[#243949]/20 text-white transition-all duration-150 resize-none placeholder-gray-400 text-sm flex-1 backdrop-blur-sm"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 !m-0 px-8 py-4 rounded-xl text-white card-gradient backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="group-hover:translate-x-0.5 transition-transform duration-150" />
                      Send Message
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-150" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;