import { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, Loader2, RefreshCw } from 'lucide-react'
import Layout from '../components/layout/Layout'
import HeroBanner from '../components/layout/HeroBanner'
import { getLLMProviders, checkLLMHealth } from '../services/api'

const PROVIDERS = [
  { id: 'ollama', name: 'Ollama (Local)', desc: 'Run models locally — no API key required', fields: ['base_url', 'model'] },
  { id: 'groq', name: 'Groq', desc: 'Fast cloud inference with vision support', fields: ['api_key', 'model'] },
  { id: 'gemini', name: 'Google Gemini', desc: 'Multimodal LLM with strong OCR', fields: ['api_key', 'model'] },
  { id: 'openai', name: 'OpenAI / Compatible', desc: 'GPT-4o or any OpenAI-compatible endpoint', fields: ['api_key', 'base_url', 'model'] },
]

export default function SettingsPage() {
  const [config, setConfig] = useState(null)
  const [health, setHealth] = useState(null)
  const [healthLoading, setHealthLoading] = useState(false)

  useEffect(() => {
    getLLMProviders().then(setConfig).catch(() => {})
  }, [])

  const handleTestConnection = async () => {
    setHealthLoading(true)
    setHealth(null)
    try {
      const result = await checkLLMHealth()
      setHealth(result)
    } catch (e) {
      setHealth({ status: 'error', error: 'Could not reach backend' })
    } finally {
      setHealthLoading(false)
    }
  }

  const currentProvider = config?.current_provider || 'ollama'
  const providerMeta = PROVIDERS.find((p) => p.id === currentProvider)

  return (
    <Layout>
      <HeroBanner eyebrow="DED Smart Services" title="AI Provider Settings" />

      <div className="section-card">
        <div className="section-title">Active LLM Provider</div>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>
          Configure which vision-capable AI model is used for document extraction.
          Switch providers by changing <code style={{ background: '#f3f4f8', padding: '2px 6px', borderRadius: 4 }}>LLM_PROVIDER</code> in your backend <code style={{ background: '#f3f4f8', padding: '2px 6px', borderRadius: 4 }}>.env</code> file.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {PROVIDERS.map((p) => (
            <div
              key={p.id}
              className={`settings-provider-card ${currentProvider === p.id ? 'selected' : ''}`}
            >
              <div>
                <div className="settings-provider-name">{p.name}</div>
                <div className="settings-provider-desc">{p.desc}</div>
              </div>
              {currentProvider === p.id && (
                <span style={{ fontSize: 12, background: '#eff6ff', color: '#2457a4', padding: '4px 12px', borderRadius: 12, fontWeight: 600, flexShrink: 0 }}>
                  Active
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Config */}
      {config && (
        <div className="section-card">
          <div className="section-title" style={{ marginBottom: 12 }}>Current Configuration</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              ['Provider', config.current_provider],
              ['Model', config.config?.[currentProvider]?.model || '—'],
              ['Base URL', config.config?.[currentProvider]?.base_url || '—'],
              ['API Key', config.config?.[currentProvider]?.has_key ? '● ● ● ● ● ● ● ●' : 'Not set'],
            ].map(([k, v]) => v && v !== '—' && (
              <div key={k} style={{ display: 'flex', padding: '10px 0', borderBottom: '1px solid #e5e7eb', gap: 16, fontSize: 13 }}>
                <span style={{ color: '#6b7280', minWidth: 100 }}>{k}</span>
                <span style={{ fontWeight: 500, color: '#1a1a2e', fontFamily: k === 'API Key' ? 'monospace' : 'inherit' }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              className="btn btn-outline"
              onClick={handleTestConnection}
              disabled={healthLoading}
              style={{ height: 38, fontSize: 13 }}
            >
              {healthLoading ? <Loader2 size={15} className="spin" /> : <RefreshCw size={15} />}
              Test Connection
            </button>

            {health && (
              <span className={`health-badge ${health.status === 'ok' ? 'ok' : 'error'}`}>
                {health.status === 'ok'
                  ? <><CheckCircle2 size={13} /> Connected</>
                  : <><XCircle size={13} /> {health.error || 'Error'}</>
                }
              </span>
            )}
          </div>

          {health?.available_models?.length > 0 && (
            <div style={{ marginTop: 12, fontSize: 12.5, color: '#6b7280' }}>
              Available models: {health.available_models.slice(0, 5).join(', ')}
            </div>
          )}
        </div>
      )}

      <div className="section-card">
        <div className="section-title" style={{ marginBottom: 10 }}>How to Switch Providers</div>
        <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.8 }}>
          <p>Edit <code style={{ background: '#f3f4f8', padding: '2px 6px', borderRadius: 4 }}>backend/.env</code> and set:</p>
          <pre style={{ background: '#1a2744', color: '#93c5fd', padding: '14px 18px', borderRadius: 8, marginTop: 10, fontSize: 12.5, overflowX: 'auto', lineHeight: 1.7 }}>
{`LLM_PROVIDER=ollama          # or: groq | gemini | openai | openai_compatible

# For Ollama (local):
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5vl:7b

# For Groq:
GROQ_API_KEY=gsk_...
GROQ_MODEL=meta-llama/llama-4-maverick-17b-128e-instruct

# For Gemini:
GEMINI_API_KEY=AIza...
GEMINI_MODEL=gemini-1.5-flash`}
          </pre>
          <p style={{ marginTop: 10 }}>Restart the backend server after changing <code style={{ background: '#f3f4f8', padding: '2px 6px', borderRadius: 4 }}>.env</code>.</p>
        </div>
      </div>
    </Layout>
  )
}
