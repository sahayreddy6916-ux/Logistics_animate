import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mode: 'Ocean Freight',
    origin: '',
    destination: '',
    notes: '',
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.includes('@') || !form.origin.trim() || !form.destination.trim()) {
      setError('Please provide your name, a valid email address, origin, and destination.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setError('');
    setForm({
      name: '',
      email: '',
      mode: 'Ocean Freight',
      origin: '',
      destination: '',
      notes: '',
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div className="w-full max-w-lg rounded-xl bg-white text-[#111318] border border-slate-200 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 id="quote-modal-title" className="font-display text-lg font-bold tracking-tight">
            Request Freight Quote
          </h2>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close quote form"
            className="p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="w-11 h-11 text-[#0644B2] mx-auto" />
            <h3 className="font-display text-xl font-bold">Consignment Request Logged</h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Your {form.mode.toLowerCase()} inquiry from {form.origin} to {form.destination} has been
              assigned to an APAC account specialist.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-2 px-6 py-2.5 rounded-md bg-[#111318] text-white text-sm font-medium hover:bg-[#0644B2] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-slate-700">Full Name</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Chris Evans"
                  className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:border-[#0644B2]"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-slate-700">Work Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="logistics@company.com"
                  className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:border-[#0644B2]"
                />
              </label>
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-slate-700">Freight Mode</span>
              <select
                value={form.mode}
                onChange={(e) => setForm({ ...form, mode: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 bg-white focus:outline-none focus:border-[#0644B2]"
              >
                <option>Air Freight</option>
                <option>Ocean Freight</option>
                <option>Customs Brokerage</option>
                <option>Warehousing &amp; 3PL</option>
                <option>Project Cargo</option>
                <option>Domestic &amp; Interstate Transport</option>
              </select>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-slate-700">Origin Port / City</span>
                <input
                  type="text"
                  value={form.origin}
                  onChange={(e) => setForm({ ...form, origin: e.target.value })}
                  placeholder="Singapore / Shanghai"
                  className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:border-[#0644B2]"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-medium text-slate-700">Destination Port / City</span>
                <input
                  type="text"
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  placeholder="Melbourne / Sydney"
                  className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:border-[#0644B2]"
                />
              </label>
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-slate-700">Cargo Details (Optional)</span>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="40ft FCL container, target ETD, or temperature requirements"
                className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:border-[#0644B2]"
              />
            </label>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wide rounded-md bg-[#111318] text-white hover:bg-[#0644B2] transition-colors cursor-pointer"
              >
                Submit Quote Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
