'use client';

import { useState, useCallback } from 'react';
import { Upload, FileText, X, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';

interface Props {
  file: File | null;
  onFileChange: (file: File | null) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepUpload({ file, onFileChange, onNext, onBack }: Props) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (f: File) => {
    setError('');
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (!allowed.includes(f.type) && !f.name.match(/\.(pdf|docx|doc)$/i)) {
      setError('Only PDF or Word files (.pdf, .docx, .doc) are supported.');
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB.');
      return;
    }
    onFileChange(f);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-10">
        <div className="bg-emerald-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Upload className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Upload your contract</h1>
        <p className="text-white/50">
          Drop a PDF or Word file below.<br />
          Your file is discarded immediately after analysis.
        </p>
      </div>

      {!file ? (
        <div
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
            dragging ? 'border-emerald-400 bg-emerald-500/10' : 'border-white/15 hover:border-white/30 hover:bg-white/3'
          }`}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".pdf,.docx,.doc"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <Upload className={`w-12 h-12 mx-auto mb-4 transition-colors ${dragging ? 'text-emerald-400' : 'text-white/20'}`} />
          <p className="text-white/60 font-medium mb-1">Drag & drop your contract here</p>
          <p className="text-white/30 text-sm mb-4">or</p>
          <div className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/12 border border-white/15 rounded-lg px-4 py-2 text-sm font-medium transition-all">
            Browse files
          </div>
          <p className="text-white/20 text-xs mt-4">PDF, DOCX, DOC · Max 10MB</p>
        </div>
      ) : (
        <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{file.name}</p>
              <p className="text-white/40 text-sm">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <button onClick={() => onFileChange(null)} className="text-white/30 hover:text-white/60 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 mt-3 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="mt-6 bg-yellow-500/5 border border-yellow-500/15 rounded-xl p-4">
        <p className="text-yellow-400/70 text-sm leading-relaxed">
          ⚠ <strong>Disclaimer:</strong> The contents of your contract will be sent to the Claude API (Anthropic) for analysis.
          For high-stakes contracts, always consult a qualified attorney.
          This tool does not provide legal advice.
        </p>
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/8 border border-white/10 font-medium px-6 py-4 rounded-xl transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={() => { if (!file) { setError('Please select a file first.'); return; } onNext(); }}
          disabled={!file}
          className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl transition-all group"
        >
          Start AI Analysis
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
