import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Loader2, Settings, Trash2, BookOpen, Brain, HelpCircle, FileText } from 'lucide-react';

interface Message { role: 'user' | 'assistant'; content: string; }
interface ChatSettings { apiKey: string; baseUrl: string; model: string; }

const DEFAULT_SETTINGS: ChatSettings = {
  apiKey: '',
  baseUrl: 'https://api.openai.com/v1',
  model: 'gpt-4o-mini',
};

const QUICK_ACTIONS = [
  { icon: BookOpen, label: '总结本节', prompt: '请用3-5个要点总结当前章节的核心内容。' },
  { icon: Brain, label: '解释概念', prompt: '请用通俗易懂的方式解释当前章节的关键概念，用生活类比帮助理解。' },
  { icon: HelpCircle, label: '出题测验', prompt: '根据当前章节内容，出3道选择题并给出答案和解析。' },
  { icon: FileText, label: '简化讲解', prompt: '请用最简单的语言重新讲解当前章节，假设我是完全零基础。' },
];

/** Get the current visible section title for context */
function getCurrentContext(): string {
  const sections = document.querySelectorAll<HTMLElement>('section[id^="s"]');
  for (const s of sections) {
    const r = s.getBoundingClientRect();
    if (r.top < window.innerHeight / 2 && r.bottom > 0) {
      const h2 = s.querySelector('h2');
      const h3s = s.querySelectorAll('h3');
      let context = h2?.textContent?.trim() || '';
      for (const h3 of h3s) {
        const hr = h3.getBoundingClientRect();
        if (hr.top < window.innerHeight / 2 && hr.bottom > 0) {
          context += ' > ' + h3.textContent?.trim();
        }
      }
      // Also grab prose text from visible section
      const prose = s.querySelectorAll('.study-content p, .study-content li');
      let textSample = '';
      for (const p of prose) {
        const pr = p.getBoundingClientRect();
        if (pr.top > 0 && pr.top < window.innerHeight) {
          textSample += p.textContent + ' ';
          if (textSample.length > 800) break;
        }
      }
      return textSample ? `${context}\n\n内容摘录：${textSample.slice(0, 1500)}` : context;
    }
  }
  return '';
}

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>(() => {
    try { return { ...DEFAULT_SETTINGS, ...JSON.parse(sessionStorage.getItem('lc-chat-settings') || '{}') }; }
    catch { return DEFAULT_SETTINGS; }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [context, setContext] = useState('');

  const saveSettings = (s: ChatSettings) => {
    setSettings(s);
    sessionStorage.setItem('lc-chat-settings', JSON.stringify({ apiKey: s.apiKey, baseUrl: s.baseUrl, model: s.model }));
  };

  // Update context periodically
  useEffect(() => {
    const update = () => setContext(getCurrentContext());
    update();
    const timer = setInterval(update, 3000);
    return () => clearInterval(timer);
  }, []);

  // Listen for text selection events
  useEffect(() => {
    const handler = (e: Event) => {
      const text = (e as CustomEvent).detail?.text;
      if (text) setInput(prev => prev + (prev ? '\n\n> ' : '> ') + text + '\n\n');
      inputRef.current?.focus();
    };
    window.addEventListener('lc-quote-text', handler);
    return () => window.removeEventListener('lc-quote-text', handler);
  }, []);

  // Auto-scroll
  useEffect(() => { listRef.current?.scrollTo(0, listRef.current.scrollHeight); }, [messages]);

  const send = useCallback(async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    if (!settings.apiKey) { setSettingsOpen(true); return; }

    if (!text) setInput('');
    const userMsg: Message = { role: 'user', content: msg };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;
    let assistantContent = '';

    try {
      // Build system message with context
      const sysMsg = context
        ? `你是 LearnCourse 的 AI 学习助手。用户正在复习以下内容：

${context}

请基于以上内容回答用户的问题。如果用户问的是课程相关的问题，优先引用上述内容。回答要清晰、结构化，适合学习复习。`
        : '你是 LearnCourse 的 AI 学习助手。请帮助用户学习和复习。回答要清晰、结构化。';

      const res = await fetch(`${settings.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` },
        body: JSON.stringify({
          model: settings.model,
          messages: [
            { role: 'system', content: sysMsg },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: msg },
          ],
          stream: true,
        }),
        signal: controller.signal,
      });

      if (!res.ok) throw new Error(`API Error ${res.status}`);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') break;
          try {
            assistantContent += JSON.parse(data).choices?.[0]?.delta?.content || '';
            setMessages(prev => {
              const copy = [...prev];
              copy[copy.length - 1] = { role: 'assistant', content: assistantContent };
              return copy;
            });
          } catch {}
        }
      }
    } catch (err: unknown) {
      if ((err as Error).name !== 'AbortError') {
        setMessages(prev => [...prev, { role: 'assistant', content: `❌ ${(err as Error).message.includes('401') ? 'API Key 无效，请检查设置' : (err as Error).message.includes('fetch') ? '网络连接失败，请检查 API 地址' : `请求失败: ${(err as Error).message}`}` }]);
      }
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }, [input, loading, settings, messages, context]);

  const handleQuickAction = (prompt: string) => send(prompt);
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
        <div>
          <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text)' }}>🤖 AI 学习助手</span>
          {context && (
            <div style={{ fontSize: '0.68rem', color: 'var(--color-text-tertiary)', marginTop: 1, maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              📍 {context.split('\n')[0].slice(0, 50)}...
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={clear} title="清空对话" style={iconBtn}><Trash2 size={15} /></button>
          <button onClick={() => setSettingsOpen(!settingsOpen)} title="设置" style={{ ...iconBtn, color: settings.apiKey ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}><Settings size={15} /></button>
          <button onClick={onClose} title="关闭" style={iconBtn}><X size={15} /></button>
        </div>
      </div>

      {/* Settings */}
      {settingsOpen && (
        <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid var(--color-border)', fontSize: '0.8rem', background: 'var(--color-code-bg)' }}>
          <label style={labelStyle}>API Key <span style={{ color: 'var(--color-text-tertiary)' }}>(仅存当前会话)</span></label>
          <input type="password" value={settings.apiKey} onChange={e => saveSettings({ ...settings, apiKey: e.target.value })} placeholder="sk-..." style={inputStyle} />
          <label style={labelStyle}>Base URL</label>
          <input value={settings.baseUrl} onChange={e => saveSettings({ ...settings, baseUrl: e.target.value })} style={inputStyle} />
          <label style={labelStyle}>Model</label>
          <input value={settings.model} onChange={e => saveSettings({ ...settings, model: e.target.value })} style={inputStyle} />
          <p style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)', marginTop: 4 }}>
            🔒 Key 仅存储在当前浏览器会话中，关闭标签页即清除
          </p>
        </div>
      )}

      {/* Messages */}
      <div ref={listRef} style={{ flex: 1, overflowY: 'auto', padding: '0.8rem 1rem' }}>
        {messages.length === 0 && (
          <div style={{ padding: '1rem 0' }}>
            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: '1rem' }}>
              {QUICK_ACTIONS.map(action => (
                <button key={action.label} onClick={() => handleQuickAction(action.prompt)} disabled={loading} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '0.5rem 0.65rem', borderRadius: 8,
                  border: '1px solid var(--color-border)', background: 'var(--color-surface)',
                  color: 'var(--color-text-secondary)', fontSize: '0.78rem',
                  cursor: loading ? 'default' : 'pointer', textAlign: 'left',
                  opacity: loading ? 0.5 : 1, transition: 'all 120ms ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                >
                  <action.icon size={14} />
                  {action.label}
                </button>
              ))}
            </div>
            <div style={{ textAlign: 'center', color: 'var(--color-text-tertiary)', fontSize: '0.8rem' }}>
              <p>👈 选中正文可自动引用</p>
              <p style={{ fontSize: '0.72rem', marginTop: 4 }}>或直接输入问题开始对话</p>
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{
            marginBottom: '0.6rem',
            padding: '0.5rem 0.75rem', borderRadius: 10,
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
          placeholder={settings.apiKey ? '输入问题，或点击上方快捷操作...' : '请先设置 API Key'} disabled={loading}
          style={{ flex: 1, padding: '0.45rem 0.7rem', borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)', fontSize: '0.85rem', outline: 'none' }} />
        <button onClick={() => send()} disabled={loading} style={{
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
