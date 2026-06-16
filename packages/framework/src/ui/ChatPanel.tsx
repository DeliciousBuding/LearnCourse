import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Loader2, Settings, Trash2, Quote } from 'lucide-react';

interface Message { role: 'user' | 'assistant'; content: string; }
interface ChatSettings { apiKey: string; baseUrl: string; model: string; }

const DEFAULT_SETTINGS: ChatSettings = {
  apiKey: '',
  baseUrl: 'https://api.openai.com/v1',
  model: 'gpt-4o-mini',
};

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>(() => {
    try { const s = localStorage.getItem('lc-chat-settings'); return s ? { ...DEFAULT_SETTINGS, ...JSON.parse(s) } : DEFAULT_SETTINGS; }
    catch { return DEFAULT_SETTINGS; }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const saveSettings = (s: ChatSettings) => {
    setSettings(s);
    localStorage.setItem('lc-chat-settings', JSON.stringify(s));
  };

  // Listen for text selection events from main content
  useEffect(() => {
    const handler = (e: Event) => {
      const text = (e as CustomEvent).detail?.text;
      if (text) {
        setInput(prev => prev + (prev ? '\n\n' : '') + `> ${text}\n\n`);
        inputRef.current?.focus();
      }
    };
    window.addEventListener('lc-quote-text', handler);
    return () => window.removeEventListener('lc-quote-text', handler);
  }, []);

  // Auto-scroll
  useEffect(() => { listRef.current?.scrollTo(0, listRef.current.scrollHeight); }, [messages]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (!settings.apiKey) { setSettingsOpen(true); return; }

    setInput('');
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(`${settings.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` },
        body: JSON.stringify({
          model: settings.model,
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          stream: true,
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '));
        for (const line of lines) {
          const data = line.slice(6);
          if (data === '[DONE]') break;
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantContent += delta;
              setMessages(prev => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: 'assistant', content: assistantContent };
                return copy;
              });
            }
          } catch {}
        }
      }
    } catch (err: unknown) {
      if ((err as Error).name !== 'AbortError') {
        setMessages(prev => [...prev, { role: 'assistant', content: `❌ 请求失败: ${(err as Error).message}` }]);
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }, [input, loading, settings, messages]);

  const clear = () => setMessages([]);

  return (
    <div style={{
      position: 'fixed', top: 56, right: 0, bottom: 0, zIndex: 25,
      width: 420, display: 'flex', flexDirection: 'column',
      background: 'var(--color-surface)', borderLeft: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-lg)', animation: 'slideInRight 200ms cubic-bezier(0.4,0,0.2,1)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.7rem 1rem', borderBottom: '1px solid var(--color-border)', flexShrink: 0 }}>
        <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text)' }}>🤖 AI 助手</span>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={clear} title="清空对话" style={iconBtn}><Trash2 size={15} /></button>
          <button onClick={() => setSettingsOpen(!settingsOpen)} title="设置" style={iconBtn}><Settings size={15} /></button>
          <button onClick={onClose} title="关闭" style={iconBtn}><X size={15} /></button>
        </div>
      </div>

      {/* Settings */}
      {settingsOpen && (
        <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid var(--color-border)', fontSize: '0.8rem', background: 'var(--color-code-bg)' }}>
          <label style={labelStyle}>API Key</label>
          <input type="password" value={settings.apiKey} onChange={e => saveSettings({ ...settings, apiKey: e.target.value })} placeholder="sk-..." style={inputStyle} />
          <label style={labelStyle}>Base URL</label>
          <input value={settings.baseUrl} onChange={e => saveSettings({ ...settings, baseUrl: e.target.value })} style={inputStyle} />
          <label style={labelStyle}>Model</label>
          <input value={settings.model} onChange={e => saveSettings({ ...settings, model: e.target.value })} style={inputStyle} />
          <p style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)', marginTop: 4 }}>
            🔒 Key 仅存储在浏览器本地，不会上传到任何服务器
          </p>
        </div>
      )}

      {/* Messages */}
      <div ref={listRef} style={{ flex: 1, overflowY: 'auto', padding: '0.8rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {messages.length === 0 && (
          <div style={{ color: 'var(--color-text-tertiary)', fontSize: '0.85rem', textAlign: 'center', marginTop: '2rem' }}>
            <p>👈 在左侧正文选中文字可自动引用</p>
            <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>粘贴或输入你的问题开始对话</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '90%', padding: '0.5rem 0.75rem', borderRadius: 10,
            fontSize: '0.85rem', lineHeight: 1.55, whiteSpace: 'pre-wrap',
            background: m.role === 'user' ? 'var(--color-accent-soft)' : 'var(--color-code-bg)',
            color: 'var(--color-text)',
          }}>
            {m.content || (loading && m.role === 'assistant' ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : null)}
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 6, padding: '0.6rem 0.8rem', borderTop: '1px solid var(--color-border)', flexShrink: 0 }}>
        <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder={settings.apiKey ? '输入问题...' : '请先设置 API Key'} disabled={loading}
          style={{ flex: 1, padding: '0.45rem 0.7rem', borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', fontSize: '0.85rem', outline: 'none' }} />
        <button onClick={send} disabled={loading} style={{
          width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 8, border: 'none', background: 'var(--color-accent)', color: '#fff',
          cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.5 : 1, flexShrink: 0,
        }}><Send size={15} /></button>
      </div>
    </div>
  );
}

const iconBtn: React.CSSProperties = { width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: 'none', background: 'var(--color-code-bg)', cursor: 'pointer', color: 'var(--color-text-secondary)' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)', margin: '4px 0 2px' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.35rem 0.5rem', borderRadius: 6, border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', fontSize: '0.8rem', outline: 'none', marginBottom: 4, boxSizing: 'border-box' };
