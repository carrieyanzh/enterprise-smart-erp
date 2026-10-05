import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

export default function TransactionModal({ isOpen, onClose, onTransactionAdded }) {
  const [formData, setFormData] = useState({
    transaction_ref: '',
    type: 'REVENUE',
    category: 'SALES',
    amount: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('http://localhost:5000/api/financial-ledger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recorded_by_user_id: 1 }) // Defaults to Admin account audit key
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit transaction data record.');
      }

      // Success sequence
      onTransactionAdded(`Logged ${formData.transaction_ref} successfully!`);
      setFormData({ transaction_ref: '', type: 'REVENUE', category: 'SALES', amount: '', description: '' });
      onClose();
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      {/* Dynamic White Border Card Architecture Frame */}
      <div className="w-full max-w-md bg-slate-900 border-2 border-white/30 rounded-2xl p-6 shadow-2xl space-y-6 text-slate-100">
        
        {/* Header Block */}
        <div className="flex items-center justify-between border-bottom border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold tracking-tight">Log Treasury Transaction</h3>
            <p className="text-xs text-slate-400 mt-0.5">Post an entry directly to the SQL database ledger</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
            Error: {errorMessage}
          </div>
        )}

        {/* Input Form System */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Reference Code *</label>
            <input
              type="text"
              required
              placeholder="e.g., TX-REV-94822"
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              value={formData.transaction_ref}
              onChange={(e) => setFormData({ ...formData, transaction_ref: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Flow Type *</label>
              <select
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value, category: e.target.value === 'REVENUE' ? 'SALES' : 'SUPPLIER_PAYMENT' })}
              >
                <option value="REVENUE">📥 REVENUE (Inflow)</option>
                <option value="EXPENSE">📤 EXPENSE (Outflow)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Category *</label>
              <select
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {formData.type === 'REVENUE' ? (
                  <>
                    <option value="SALES">SALES</option>
                    <option value="INTEREST">INTEREST</option>
                    <option value="ASSET_LIQUIDATION">ASSET SALE</option>
                  </>
                ) : (
                  <>
                    <option value="SUPPLIER_PAYMENT">SUPPLIER PO</option>
                    <option value="LOGISTICS">LOGISTICS</option>
                    <option value="TAX">TAX DISBURSEMENT</option>
                    <option value="UTILITIES">UTILITIES</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Amount (USD) *</label>
            <input
              type="number"
              required
              step="0.01"
              min="0.01"
              placeholder="0.00"
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[10px]">Memo / Description</label>
            <textarea
              rows="2"
              placeholder="Operational description lines..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Action Trigger Elements */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-slate-800 disabled:opacity-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Posting...
                </>
              ) : (
                'Commit Entry'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
