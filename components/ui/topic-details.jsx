import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  X, 
  Link as LinkIcon, 
  Paperclip, 
  MessageSquare,
  ExternalLink,
  Loader2,
  Eye,
  Edit3,
  Upload,
  FileText,
  Download
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import { saveTopicResources, getTopicResources, uploadTopicFile } from '@/firestoreUtils';

export const TopicDetails = ({ topicId, topicTitle, userId, onBack }) => {
  const [resources, setResources] = useState({ notes: '', links: [], attachments: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'
  const [newLink, setNewLink] = useState('');
  const fileInputRef = useRef(null);

  // Normalize topic ID for Firestore keys
  const normalizedTopicId = topicId.replace(/\s+/g, '-').toLowerCase();

  useEffect(() => {
    const fetchResources = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const data = await getTopicResources(userId, normalizedTopicId);
        setResources(data);
      } catch (error) {
        console.error('Error loading resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [userId, normalizedTopicId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveTopicResources(userId, normalizedTopicId, resources);
    } catch (error) {
      console.error('Error saving resources:', error);
    } finally {
      setSaving(false);
    }
  };

  const addLink = () => {
    if (!newLink) return;
    const url = newLink.startsWith('http') ? newLink : `https://${newLink}`;
    setResources(prev => ({
      ...prev,
      links: [...prev.links, { id: Date.now(), url }]
    }));
    setNewLink('');
  };

  const removeLink = (id) => {
    setResources(prev => ({
      ...prev,
      links: prev.links.filter(l => l.id !== id)
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    try {
      const downloadURL = await uploadTopicFile(userId, normalizedTopicId, file, (progress) => {
        setUploadProgress(progress);
      });
      
      setResources(prev => ({
        ...prev,
        attachments: [...prev.attachments, { 
          id: Date.now(), 
          name: file.name, 
          url: downloadURL,
          size: (file.size / 1024).toFixed(1) + ' KB'
        }]
      }));
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload file. Please ensure Firebase Storage is set up.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (id) => {
    setResources(prev => ({
      ...prev,
      attachments: prev.attachments.filter(a => a.id !== id)
    }));
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="mx-auto max-w-7xl space-y-10 py-12 px-6 pb-32"
    >
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-8">
        <div>
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-gray-400 hover:text-black transition-all mb-2"
          >
            <ArrowLeft size={18} />
            <span className="font-semibold">Back to Dashboard</span>
          </button>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{topicTitle}</h1>
        </div>
        
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-3 rounded-xl bg-green-600 px-8 py-4 text-white shadow-lg shadow-green-100 hover:bg-green-700 hover:shadow-green-200 disabled:opacity-50 transition-all font-bold text-lg"
        >
          {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Main Editor Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-3xl bg-white shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[700px]">
            {/* GitHub Style Tabs */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/30 px-6 py-2">
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all",
                    activeTab === 'edit' 
                      ? "bg-white text-green-600 shadow-sm border border-gray-100" 
                      : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  <Edit3 size={16} />
                  Write
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all",
                    activeTab === 'preview' 
                      ? "bg-white text-green-600 shadow-sm border border-gray-100" 
                      : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  <Eye size={16} />
                  Preview
                </button>
              </div>
              <div className="text-xs text-gray-400 font-medium hidden sm:block">
                Markdown is supported
              </div>
            </div>

            <div className="flex-1 p-6 sm:p-10">
              {activeTab === 'edit' ? (
                <textarea
                  className="w-full h-full min-h-[500px] resize-none border-none bg-transparent p-0 text-lg leading-relaxed text-gray-800 placeholder:text-gray-400 focus:ring-0 outline-none"
                  placeholder="## What did you learn?
- Key concepts...
- Examples...
- Challenges faced..."
                  value={resources.notes}
                  onChange={(e) => setResources(prev => ({ ...prev, notes: e.target.value }))}
                />
              ) : (
                <div className="prose prose-lg prose-green max-w-none text-gray-800">
                  {resources.notes ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {resources.notes}
                    </ReactMarkdown>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                      <FileText size={48} strokeWidth={1} className="mb-4 opacity-20" />
                      <p>Nothing to preview yet</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Compact Right Sidebar */}
        <div className="space-y-6">
          {/* External Links */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="mb-4 flex items-center gap-2 text-gray-900">
              <LinkIcon size={18} className="text-purple-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Links</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste URL..."
                  className="flex-1 rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500/20"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addLink()}
                />
                <button
                  onClick={addLink}
                  className="rounded-xl bg-gray-900 p-2 text-white hover:bg-black transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              
              <div className="space-y-2">
                {resources.links.map((link) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group flex items-center justify-between rounded-xl bg-gray-50/50 p-2.5 text-xs"
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="truncate flex-1 font-semibold text-gray-600 hover:text-blue-600 flex items-center gap-1.5">
                      <ExternalLink size={12} />
                      {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                    <button onClick={() => removeLink(link.id)} className="text-gray-300 hover:text-red-500 ml-2 opac-0 group-hover:opacity-100 transition-opacity">
                      <X size={14} />
                    </button>
                  </motion.div>
                ))}
                {resources.links.length === 0 && (
                  <p className="text-xs text-center py-4 text-gray-400 italic">No external links</p>
                )}
              </div>
            </div>
          </div>

          {/* Local Attachments */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="mb-4 flex items-center gap-2 text-gray-900">
              <Paperclip size={18} className="text-orange-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Materials</h2>
            </div>
            
            <div className="space-y-4">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileUpload}
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 bg-gray-50/50 py-4 text-sm font-bold text-gray-500 hover:bg-gray-100 hover:border-gray-300 transition-all disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-orange-600" />
                    <span>{Math.round(uploadProgress)}%</span>
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    <span>Upload File</span>
                  </>
                )}
              </button>

              <div className="space-y-2">
                {resources.attachments.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group flex items-center justify-between rounded-xl bg-gray-50/50 p-2.5 text-xs"
                  >
                    <div className="flex flex-col truncate flex-1">
                      <span className="font-bold text-gray-700 truncate">{file.name}</span>
                      <span className="text-[10px] text-gray-400 capitalize">{file.size || 'Unknown size'}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {file.url && (
                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-600 p-1">
                          <Download size={14} />
                        </a>
                      )}
                      <button onClick={() => removeAttachment(file.id)} className="text-gray-300 hover:text-red-500 p-1">
                        <X size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
                {resources.attachments.length === 0 && (
                  <p className="text-xs text-center py-4 text-gray-400 italic">No study materials</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
