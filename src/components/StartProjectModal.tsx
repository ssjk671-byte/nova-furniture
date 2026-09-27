import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Calendar, Sparkles, Building2, Phone, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartProjectModal: React.FC<StartProjectModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [projectData, setProjectData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Full Residence Furnishing & Design',
    timeline: 'Within 1-3 Months',
    budget: '$25,000 - $50,000',
    location: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectData.name || !projectData.email) {
      showToast('Please provide your name and email');
      return;
    }
    setSubmitted(true);
    showToast('Consultation request received! Our senior design director will reach out within 24 hours.');
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-2xl bg-[#FBF9F5] shadow-2xl rounded-xs overflow-hidden border border-[#DCD3C5] my-8 animate-fade-in text-[#1A1A1A]">
          {/* Header */}
          <div className="px-6 py-5 bg-[#F4EFEA] border-b border-[#E8DFD1] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#C5A880]" />
              <div>
                <h2 className="font-serif text-xl font-semibold tracking-tight text-[#1A1A1A]">
                  Start an Interior Design Project
                </h2>
                <p className="text-[11px] text-[#7A7163] uppercase tracking-wider font-mono">
                  The Nova Studio & Bespoke Atelier
                </p>
              </div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="p-1.5 text-[#5F584C] hover:text-[#1A1A1A] hover:bg-[#EAE3D6] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="p-8 sm:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-[#E5F2EA] text-[#2E6B47] flex items-center justify-center mx-auto mb-4 border border-[#BDE0CB]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#7D766A]">
                Inquiry Submitted
              </span>
              <h3 className="font-serif text-3xl font-medium text-[#1A1A1A] mt-1 mb-3">
                Thank You, {projectData.name}
              </h3>
              <p className="text-sm text-[#6A6357] max-w-md mx-auto mb-8 font-light leading-relaxed">
                Your architectural design brief has been assigned to our senior interior director. We will review your vision and arrange an introductory showroom or virtual consultation.
              </p>
              <button
                onClick={handleResetAndClose}
                className="px-8 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#333333] transition-colors"
              >
                Return to Studio
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectData.name}
                    onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                    placeholder="e.g. Julianne Sterling"
                    className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={projectData.email}
                    onChange={(e) => setProjectData({ ...projectData, email: e.target.value })}
                    placeholder="e.g. julianne@residence.com"
                    className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={projectData.phone}
                    onChange={(e) => setProjectData({ ...projectData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                    Project Location / City
                  </label>
                  <input
                    type="text"
                    value={projectData.location}
                    onChange={(e) => setProjectData({ ...projectData, location: e.target.value })}
                    placeholder="e.g. Tribeca, New York or Marin County"
                    className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                    Scope of Work
                  </label>
                  <select
                    value={projectData.projectType}
                    onChange={(e) => setProjectData({ ...projectData, projectType: e.target.value })}
                    className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs focus:outline-none focus:border-[#1A1A1A]"
                  >
                    <option value="Full Residence Furnishing & Design">Full Residence Furnishing & Design</option>
                    <option value="Single Room Curation (Living/Dining)">Single Room Curation (Living/Dining)</option>
                    <option value="Custom Bespoke Millwork & Furniture">Custom Bespoke Millwork & Furniture</option>
                    <option value="Commercial / Hospitality Architecture">Commercial / Hospitality Architecture</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                    Target Budget Range
                  </label>
                  <select
                    value={projectData.budget}
                    onChange={(e) => setProjectData({ ...projectData, budget: e.target.value })}
                    className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs focus:outline-none focus:border-[#1A1A1A]"
                  >
                    <option value="$15,000 - $25,000">$15,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000+">$100,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold tracking-wider text-[#554E44] mb-1">
                  Tell Us About Your Space & Vision
                </label>
                <textarea
                  rows={3}
                  value={projectData.notes}
                  onChange={(e) => setProjectData({ ...projectData, notes: e.target.value })}
                  placeholder="Share details about your architectural style, room dimensions, natural lighting, or special heirloom requirements..."
                  className="w-full bg-white border border-[#D5CDBD] p-2.5 rounded-xs text-xs focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>

              <div className="pt-3 border-t border-[#E8DFD1] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-[#7A7163] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Complimentary 45-minute architectural consultation</span>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#333333] text-white text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Submit Project Brief</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
